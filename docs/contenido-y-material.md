# Contenido y material

## Reglas de texto

- Todo el texto vive en **`src/data/site.ts`**. Es la fuente de verdad.
- Los textos los redactó Valentina y son **definitivos**: no reescribir ni "mejorar"
  sin que lo pida.
- **Nunca inventar datos** sobre ella, sus clientes o sus resultados.
- Primera persona, español colombiano neutro, tuteo.
- Son **cinco** años de experiencia, no cuatro.
- Botones en primera persona e imperativo cercano: *Escríbeme*, no *Escribir*.
- Cifras en dígitos, de forma coherente en toda la página.

## Privacidad

El repositorio es **público**.

**Nunca publicar**
- De Valentina: cédula, dirección, fecha de nacimiento, estado civil, EPS, firma,
  teléfonos de terceros.
- De los clientes: tarifas, presupuestos e inversión publicitaria.
- En la documentación: correos o cuentas personales de terceros.

**Excepción autorizada**
La pieza `public/piezas/ciudad-manhattan/campana-02-resultados.jpg` muestra el
**importe gastado** de la campaña. Valentina lo autorizó de forma expresa por ser el
respaldo de la cifra de la tarjeta. Está anotado junto a la pieza en `site.ts`.
**No revertir sin consultarla.**

**Permisos de clientes**
- Dra. Natalia Garnica: autorizó aparecer con su nombre.
- Dondi y Ciudad Manhattan: pendiente confirmar.

**Antes de publicar material de un cliente**, revisarlo pieza por pieza buscando
precios, presupuestos o inversión. Y antes de publicar el PDF, confirmar que solo
lleve correo, celular, ciudad y LinkedIn.

## Agregar fotos o videos

### Regla de oro
**Nunca subir un video o una foto sin optimizar.** Los originales pesan entre 10 MB
y 500 MB. La carga inicial de la página debe mantenerse cerca de **450 KB**; los
videos se descargan solo cuando se van a ver.

### Flujo
1. Valentina descarga de Google Drive (carpeta *landing CV valentina*) solo las piezas que quiere.
2. Las deja en **`material-vale/`**, dentro de la carpeta del área. Tal cual: pesadas,
   con tildes o espacios, da igual. No inventar otras rutas.
3. Se optimizan (abajo) hacia `public/piezas/<carpeta>/`.
4. Se declaran en `src/data/site.ts`.
5. Se verifica que todo lo referenciado exista y que no haya datos de clientes.

`material-vale/` está ignorada por git: nada de ahí se publica.

### Carpetas de `material-vale/`
| Carpeta | Destino en el sitio |
|---|---|
| `Dirección creativa y estrategia de marketing` | Tarjeta 01 |
| `Construcción de marca de belleza` | Tarjeta 02 |
| `Estrategia de contenido y narrativa` | Tarjeta 03 |
| `Datos, CRM y comunicación corporativa` | Tarjeta 04 |
| `Pauta digital y análisis de resultados` | Tarjeta 05 |
| `Producción audiovisual y fotografía` | Tarjeta 06 |
| `ventana conoce más` | Ventana "Conoce más de mi trabajo" |
| `logos herramientas` | Fichas de herramientas |

### Especificaciones
| Tipo | Salida |
|---|---|
| Reel vertical | 720×1280, recortado a 9:16, 12 s, 24 fps, sin audio, H.264 CRF 30 + póster JPG |
| Video panorámico | 1280 de ancho, 12 s, sin audio + póster |
| Foto | Máximo 1200 px, JPG calidad 82, sin metadatos |
| PNG con transparencia | Se mantiene PNG: a JPG le queda fondo negro |
| Logo | 128 px, PNG |

Nombres de salida en minúsculas, sin tildes ni espacios, con guiones.
Se eligió 720 y no 1080 porque los videos de la ventana cargan juntos al abrirla.

### Comandos (Windows, PowerShell)
Si FFmpeg, ImageMagick o Poppler no responden, refrescar el `PATH` en la sesión:
`$env:PATH = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`

```powershell
# Reel vertical
ffmpeg -nostdin -y -i "ENTRADA.mp4" -t 12 -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=24" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an -movflags +faststart "SALIDA.mp4"

# Póster (obligatorio)
ffmpeg -nostdin -y -i "SALIDA.mp4" -vframes 1 -q:v 4 "SALIDA.jpg"

# Foto
magick "ENTRADA.jpg" -auto-orient -resize "1200x1200>" -strip -quality 82 "SALIDA.jpg"

# Logo
magick "ENTRADA.png" -auto-orient -resize "128x128>" -strip "SALIDA.png"

# Páginas de un PDF
pdftoppm -jpeg -r 110 -jpegopt quality=82 "ENTRADA.pdf" "PREFIJO"
```

En WSL existe `bash scripts/optimizar-material.sh`.

Si faltan las herramientas en un equipo nuevo:
`winget install Gyan.FFmpeg ImageMagick.ImageMagick oschwartz10612.Poppler`
y reabrir VS Code.

## Dónde se declara cada cosa en `site.ts`

| Qué | Objeto | Notas |
|---|---|---|
| Datos generales, cargo, contacto, PDF | `site` | `linkedin` y `cvPdf` activan sus botones solo si tienen valor |
| Inicio | `hero` | |
| Sobre mí | `sobreMi.bloques` | Tramos `{ t, fuerte }` para resaltar una frase |
| Tarjetas de área | `projects` | `media`: `image`, `video` (con `poster`) o `duo`. Sin `media` → portada tipográfica |
| Ventana | `masTrabajo.piezas` | `reel(slug, rótulo, enlace)`; la panorámica lleva `ancho: true` |
| Capacidades | `capacidades` | |
| Herramientas | `herramientas` | `logo` si hay archivo; si no, monograma sobre `bg`/`fg` |
| Experiencia | `trayectoria`, `educacion` | |
| Contacto | `contacto` | |

## Conectores

Para el trabajo normal no hace falta ninguno. El conector de Google Drive sirve
para **ubicar** material y decirle a Valentina qué archivo bajar; descargar archivos
de cientos de MB desde el agente es lento. No conectar herramientas de otros proyectos.
