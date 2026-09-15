# Material en alta resolución

Plan de trabajo para reemplazar las fuentes de las fotos por versiones en alta
resolución. **Este archivo es la guía de una tarea concreta y pendiente**: cuando
se termine, se resume en `historial.md` y este archivo se borra.

Las reglas generales de material (tamaños, nombres, privacidad) siguen en
[contenido-y-material.md](contenido-y-material.md). Aquí solo está lo que cambia.

## Por qué

Medición con Playwright sobre el sitio compilado (septiembre 2026):

- En celular (390 px de ancho, pantalla de 3x), **12 de 19 fotos se muestran a más
  resolución de la que tienen**. Una foto de 675 px de ancho se dibuja en 1044 px
  reales: por eso se ve borrosa. La causa es el tope de 1200 px del lado largo:
  en una foto vertical ese tope lo consume el alto y el ancho queda en 675–800 px.
- En escritorio pasa lo contrario: 16 de 20 tienen más del doble de la resolución
  necesaria, así que se descarga peso de más.

Ambos problemas se resuelven igual: **fuentes grandes + que el compilador genere
los tamaños**. Astro (`astro:assets`) crea al compilar cada versión en AVIF y WebP
y el navegador baja la que le sirve. Eso exige que la fuente sea grande; hoy no lo es.

El peso ya dejó de ser el problema: la carga diferida (ver "Problemas resueltos"
en [tecnico.md](tecnico.md)) bajó la carga inicial de 4761 KB a 1285 KB.

## Qué NO se toca

- **`src/data/site.ts` y los componentes de `src/components/`.** El código sigue
  leyendo `public/piezas/` hasta que se haga la migración (ver el final).
- **`public/piezas/`**: no borrar ni reemplazar nada. Las fuentes nuevas van a otra
  carpeta y conviven con las actuales.
- **Encuadres, recortes y nombres de archivo.** Cada archivo nuevo debe ser la misma
  imagen, con el mismo nombre exacto, solo que más grande. Lo publicado ya lo aprobó
  Valentina: esto es calidad, no rediseño.
- **Los videos.** Ver "Fase C", que está en espera.

## Dónde van las fuentes nuevas

```
src/assets/piezas/<misma carpeta>/<mismo nombre>.jpg
```

Mismo árbol y mismos nombres que `public/piezas/`. Ejemplo:
`public/piezas/alamedas/alamedas-cc-portada.jpg` → `src/assets/piezas/alamedas/alamedas-cc-portada.jpg`.

Especificación de las fuentes: **2400 px de lado largo, JPG calidad 90**. Son
fuentes, no archivos publicados: el compilador saca de ahí las versiones finales.
Los logos de `public/logos/` se quedan donde están (128 px, ya sobran).

## Fase A — Fotos reales (hacer ahora)

18 archivos. Son fotos y capturas, no fotogramas de video. El original sale de la
carpeta de Google Drive *landing CV valentina*.

| Archivo (dentro de `piezas/`) | Hoy | Se ve borrosa en celular | Nota sobre el original |
|---|---|---|---|
| `palmareca-rebranding/menu-palmareca-01.jpg` | 739×1021 | **sí, la peor** | Sale de un PDF: regenerar con `pdftoppm -r 220` |
| `produccion-audiovisual/copia-de-dsc03106.jpg` | 675×1200 | **sí** | Foto de cámara |
| `palmareca-rebranding/moodboard-palmareca.jpg` | 800×1200 | **sí** | |
| `produccion-audiovisual/copia-de-dsc01228.jpg` | 800×1200 | **sí** | Foto de cámara |
| `produccion-audiovisual/copia-de-dsc00908.jpg` | 675×1200 | **sí** | Foto de cámara |
| `produccion-audiovisual/copia-de-dsc01217.jpg` | 800×1200 | **sí** | Foto de cámara |
| `produccion-audiovisual/dsc06003.jpg` | 800×1200 | **sí** | Foto de cámara |
| `produccion-audiovisual/dsc09850.jpg` | 800×1200 | **sí** | Foto de cámara |
| `ciudad-manhattan/campana-01-estructura.jpg` | 960×1200 | sí | Si el original es una captura de pantalla, exportarla al mayor tamaño que exista |
| `ciudad-manhattan/campana-02-resultados.jpg` | 960×1200 | sí | Igual. Lleva el importe autorizado: no recortarlo |
| `ciudad-manhattan/campana-03-publico.jpg` | 960×1200 | sí | Igual |
| `alamedas/alamedas-cc-portada.jpg` | 1000×667 | sí | |
| `palmareca-rebranding/manual-02.jpg` … `manual-07.jpg` (6 archivos) | 1200×675 | no | Salen de un PDF: `pdftoppm -r 220` |

En `material-vale/` de este repositorio ya hay originales de `palmareca-fotos/`
(6000×4000) y de `palmareca-rebranding/`. **Verificar si alguno corresponde a las
fotos de `produccion-audiovisual/`** (los nombres `dsc*` sugieren que sí) antes de
volver a bajar nada del Drive.

### Los dos retratos

`public/valentina.png` (861×900, el del inicio) y `public/valentina-sobre-mi.png`
(834×900) son **PNG con fondo transparente**, recortados a mano. No se regeneran
desde un JPG: hace falta el PNG transparente original en mayor tamaño.

- Si existe: guardarlo en `src/assets/valentina.png` y `src/assets/valentina-sobre-mi.png`,
  hasta 2400 px de lado largo, **sin aplanar la transparencia** (`-strip` sí, pero
  nunca `-background white -flatten`).
- Si no existe: dejarlos como están y decirlo en el reporte. El del inicio pesa
  738 KB y es lo más pesado de la página; aun sin original nuevo, la migración lo
  va a comprimir bastante.

### Comandos (Windows, PowerShell)

Los comandos base están en [contenido-y-material.md](contenido-y-material.md).
Cambian dos cosas: el tope (2400 en vez de 1200), la calidad (90 en vez de 82) y el
destino (`src\assets\piezas\` en vez de `public\piezas\`).

```powershell
# Una foto
magick "ORIGEN.jpg" -auto-orient -resize "2400x2400>" -strip -quality 90 `
  "src\assets\piezas\CARPETA\NOMBRE.jpg"

# Páginas de un PDF (manual de marca, menú)
pdftoppm -jpeg -r 220 -f 1 -l 4 -jpegopt quality=90 "ORIGEN.pdf" "src\assets\piezas\CARPETA\NOMBRE"
```

`-resize "2400x2400>"` solo achica: si el original ya es más chico, lo deja igual.
**Nunca agrandar una foto pequeña**: no gana nitidez y engorda el repositorio.

## Fase B — Portadas de los videos (hacer ahora)

Las 33 imágenes de 720×1280 de `conoce-mas/`, `dondi/`, `dra-natalia/` y
`produccion-audiovisual/` no son fotos: son el fotograma que se ve antes de que
arranque cada video. Se sacan del video **original** (el de alta calidad del Drive),
no del video publicado.

Además hay un error que corregir: **cuatro portadas son el mismo archivo**, un
fotograma genérico de 5.620 bytes repetido en piezas de clientes distintos:

- `conoce-mas/caipirina-de-maracuya.jpg`
- `conoce-mas/nueva-camara-intraoral.jpg`
- `conoce-mas/vendes-tu-carro.jpg`
- `dra-natalia/nctf.jpg`

A esas cuatro hay que sacarles un fotograma de verdad, que represente la pieza.

```powershell
# Fotograma del segundo 2, a 1080 px de ancho (vertical 9:16)
ffmpeg -ss 00:00:02 -i "ORIGINAL.mp4" -frames:v 1 -vf "scale=1080:-2" -q:v 3 `
  "src\assets\piezas\CARPETA\SLUG.jpg"
```

El segundo 2 es solo un punto de partida: **abrir cada imagen generada y comprobar
que no salió negra ni borrosa**; si pasa, probar otro segundo. El nombre del archivo
debe ser idéntico al del video (`SLUG.mp4` → `SLUG.jpg`), o la página no lo encuentra.

Excepción: `conoce-mas/maiz-sv-1035.jpg` es la pieza panorámica (1280×270), no un
vertical. Mantener su proporción.

## Fase C — Videos a 1080p (EN ESPERA, no ejecutar)

Los videos están a 720p con compresión fuerte (CRF 30), y se eligió así cuando la
ventana descargaba los 22 de golpe. Eso ya se corrigió, así que subirlos de calidad
es posible. **Pero falta una decisión de Juan**: 33 videos a 1080p pesarían entre 70
y 150 MB dentro del repositorio, contra los 27 MB de hoy, y cada nueva versión queda
para siempre en el historial de git. La alternativa es sacar los videos a un
alojamiento externo. Hasta que Juan lo decida, **no reconvertir videos**.

## Verificar antes de dar por terminado

```powershell
magick identify -format "%f %wx%h %b`n" src\assets\piezas\*\*.jpg   # tamaños y pesos
pnpm build                                                          # debe pasar limpio
pnpm dev                                                            # y revisar el sitio
node scripts/revisar-ui.mjs                                         # capturas + OK
```

El sitio debe verse **exactamente igual que antes**: en esta tarea el código todavía
no usa las fuentes nuevas. Si algo cambió, es un error.

Revisar también que ninguna imagen nueva contenga datos privados (ver
[contenido-y-material.md](contenido-y-material.md)): nada de cédula, dirección, EPS,
tarifas ni presupuestos de clientes. La única cifra autorizada es el importe gastado
de Ciudad Manhattan.

## Qué reportar al terminar

1. Qué archivos se regeneraron, con su resolución nueva.
2. **Cuáles no se pudieron regenerar y por qué** (no se encontró el original, el
   original resultó ser más chico, etc.). Esto es lo más importante: define qué
   fotos van a seguir viéndose igual.
3. Cuánto pesa en total `src/assets/`.

## Qué sigue después (no es parte de esta tarea)

La migración del código la hace la sesión de Juan. Diseño ya definido:

- `src/lib/piezas.ts` mapea las rutas `"/piezas/…"` de `site.ts` a las fuentes de
  `src/assets/piezas/` con `import.meta.glob(..., { eager: true })`, y lanza error en
  compilación si falta una: así nunca se publica una imagen rota.
- `getImage()` para los `poster` de video y los fondos difuminados;
  `<Picture formats={["avif","webp"]}>` para los retratos, que llevan transparencia.
- Anchos por componente: tarjetas de áreas `widths=[360, 540, 720, 1080]` con
  `sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"`; ventana
  "Conoce más" `widths=[300, 450, 600, 900]` con `sizes="(min-width: 768px) 33vw, 45vw"`.
- El JS de carruseles y ventana usa `data-src`; la migración debe copiar también
  `data-srcset` al elemento, no reemplazar ese patrón.
- `sharp` ya funciona en este proyecto (llega con Astro), pero conviene declararlo
  como dependencia de desarrollo para que un `pnpm install` no lo deje fuera.
- Cuando el sitio ya use `src/assets/`, se borran las fotos de `public/piezas/`
  (los videos se quedan ahí) y se actualiza la tabla de `CLAUDE.md` y las
  especificaciones de `contenido-y-material.md`.
