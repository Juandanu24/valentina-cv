#!/usr/bin/env bash
# Optimiza el material bruto de material-vale/ y lo deja listo en public/piezas/.
#
# Requisitos:  sudo apt install ffmpeg imagemagick poppler-utils
# Uso:         bash scripts/optimizar-material.sh
#
# Qué hace:
#   - Videos  → clip de 12 s, 720p, SIN audio, H.264 CRF 30 + póster JPG
#   - Fotos   → 1200px de ancho, JPG calidad 82 (de ~15 MB a ~250 KB)
#   - PDFs    → primeras páginas exportadas como JPG
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORIGEN="$RAIZ/material-vale"
DESTINO="$RAIZ/public/piezas"

DURACION=12   # segundos por clip
ALTURA=720    # resolución de salida
CRF=30        # 28 = más calidad/peso · 32 = más liviano

# ImageMagick 7 trae 'magick'; la 6 (la de Ubuntu) trae 'convert' e 'identify'.
if command -v magick >/dev/null 2>&1; then
  IM_CONVERT="magick"; IM_IDENTIFY="magick identify"
elif command -v convert >/dev/null 2>&1; then
  IM_CONVERT="convert"; IM_IDENTIFY="identify"
else
  echo "✗ Falta ImageMagick. Instala con: sudo apt install imagemagick"
  exit 1
fi

for cmd in ffmpeg pdftoppm; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "✗ Falta '$cmd'. Instala con: sudo apt install ffmpeg poppler-utils"
    exit 1
  }
done

[ -d "$ORIGEN" ] || { echo "✗ No existe $ORIGEN"; exit 1; }

echo "▸ Origen:  $ORIGEN"
echo "▸ Destino: $DESTINO"
echo ""

# Nombre de archivo seguro para web: minúsculas, sin tildes ni espacios.
slug() {
  echo "$1" \
    | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

total_antes=0
total_despues=0

find "$ORIGEN" -mindepth 1 -maxdepth 1 -type d | sort | while read -r carpeta; do
  nombre="$(basename "$carpeta")"

  # 'retratos' se procesa aparte al final (necesita conservar transparencia).
  [ "$nombre" = "retratos" ] && continue

  destino_dir="$DESTINO/$(slug "$nombre")"
  mkdir -p "$destino_dir"
  echo "── $nombre"

  # ---- Videos ----
  find "$carpeta" -maxdepth 1 -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.m4v' \) \
    | sort | while read -r v; do
    base="$(slug "$(basename "${v%.*}")")"
    salida="$destino_dir/$base.mp4"
    poster="$destino_dir/$base.jpg"

    ffmpeg -nostdin -y -loglevel error -i "$v" \
      -t "$DURACION" \
      -vf "scale=-2:$ALTURA,fps=24" \
      -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p \
      -an -movflags +faststart \
      "$salida"

    # Póster: primer fotograma, para mostrar mientras el video carga.
    ffmpeg -nostdin -y -loglevel error -i "$salida" -vframes 1 -vf "scale=-2:600" -q:v 4 "$poster"

    antes=$(stat -c%s "$v"); despues=$(stat -c%s "$salida")
    printf "   🎬 %-34s %5s MB → %4s KB\n" "$base.mp4" \
      "$((antes/1048576))" "$((despues/1024))"
  done

  # ---- Imágenes ----
  # Un PNG con transparencia se mantiene PNG: pasarlo a JPG le pondría fondo negro.
  find "$carpeta" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) \
    | sort | while read -r img; do
    base="$(slug "$(basename "${img%.*}")")"

    if [ "$($IM_IDENTIFY -format '%[opaque]' "$img[0]" 2>/dev/null)" = "false" ]; then
      salida="$destino_dir/$base.png"
      $IM_CONVERT "$img" -auto-orient -resize '1200x1200>' -strip "$salida"
    else
      salida="$destino_dir/$base.jpg"
      $IM_CONVERT "$img" -auto-orient -resize '1200x1200>' -strip -quality 82 "$salida"
    fi

    antes=$(stat -c%s "$img"); despues=$(stat -c%s "$salida")
    printf "   🖼  %-34s %5s MB → %4s KB\n" "$(basename "$salida")" \
      "$((antes/1048576))" "$((despues/1024))"
  done

  # ---- PDFs: primeras 4 páginas como imagen ----
  find "$carpeta" -maxdepth 1 -type f -iname '*.pdf' | sort | while read -r pdf; do
    base="$(slug "$(basename "${pdf%.*}")")"
    pdftoppm -jpeg -r 110 -f 1 -l 4 -jpegopt quality=82 "$pdf" "$destino_dir/$base"
    for p in "$destino_dir/$base"-*.jpg; do
      [ -f "$p" ] && $IM_CONVERT "$p" -resize '1200x1200>' -strip -quality 82 "$p"
    done
    printf "   📄 %-34s → páginas exportadas\n" "$base"
  done

  echo ""
done

# ---- Retrato del hero: conserva transparencia, va a public/ ----
if [ -d "$ORIGEN/retratos" ]; then
  echo "── retratos"
  recorte="$(find "$ORIGEN/retratos" -maxdepth 1 -type f -iname '*.png' | head -1)"
  if [ -n "$recorte" ]; then
    # -trim recorta el sobrante transparente para que la figura llene el marco.
    $IM_CONVERT "$recorte" -auto-orient -trim +repage -resize '900x900>' -strip \
      "$RAIZ/public/valentina.png"
    antes=$(stat -c%s "$recorte"); despues=$(stat -c%s "$RAIZ/public/valentina.png")
    printf "   👤 %-34s %5s MB → %4s KB\n" "valentina.png (sin fondo)" \
      "$((antes/1048576))" "$((despues/1024))"
  else
    echo "   ⚠ No hay PNG en retratos/ — el hero necesita la versión sin fondo."
  fi
  echo ""
fi

echo "▸ Listo. Resultado en public/piezas/"
du -sh "$DESTINO" 2>/dev/null || true
