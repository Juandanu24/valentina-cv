# CONTEXTO.md — memoria entre sesiones

Complemento de `AGENTS.md`. Ahí está **qué es** el proyecto y **cómo se construye**
(diseño, paleta, tipografías, privacidad, flujo de git). Aquí está lo que se pierde
al cerrar una sesión: **por qué se decidió lo que se decidió** y cómo hacer las
tareas que no son código.

> Al empezar una sesión: leer `AGENTS.md` primero, luego este archivo.
> Al terminar algo que valga la pena recordar: anotarlo aquí.

## Estado

El sitio está **en producción**: <https://valentinagarciaflorez.vercel.app>
Versión 2 ("tablero de trabajo"), con el material real de los seis proyectos ya
integrado y optimizado.

**Todo lo que está funcionando ya fue revisado y aprobado por Valentina.**
No rehacer nada por iniciativa propia.

## Quién trabaja acá

- **Valentina** — dueña del proyecto, probablemente quien escriba. No es técnica y
  **no usa la terminal**: cuando quiera ver algo, levantarle el servidor y pasarle
  <http://localhost:4321>. Pide cambios en lenguaje de diseño ("más pequeño", "ese
  verde más oscuro"), no de código. Explicarle todo sin jerga.
- **Juan** — desarrollador, dueño del repositorio, aprueba lo que se publica.
  Trabaja en WSL; Valentina en Windows nativo.

## Decisiones ya tomadas — no proponerlas de nuevo

Esto se probó y se descartó. Es la parte que no se puede deducir leyendo el código:

- **La v1 era "sticker energy"** (magenta/violeta, stickers rotados, tipografía
  Unbounded). Se descartó por completo: no encajaba con el objetivo de buscar
  empleo in-house.
- **Tipografías rechazadas por Valentina:** Anton y Syne ("muy rudas"), Bricolage
  Grotesque, Instrument Serif ("muy delgada"). La actual, **Fraunces**, sí le
  gustó. Ella había pedido Brasika Display o Dorris, que son de pago; Fraunces es
  la alternativa libre más cercana.
- **El fondo difuminado para piezas horizontales no le gustó.** La solución
  aprobada es apilar dos horizontales (tipo de pieza `duo`). El difuminado quedó
  solo en el video de S Ingeniería, que por ser uno solo no se puede apilar.
- **El carrusel** iba a cambiar cada 1 s; quedó en **2.5 s imágenes / 7 s videos**,
  con flechas, puntos clicables y gestos táctiles.
- **El CTA del portafolio ampliado** estaba en marino y pasó a **oliva**, porque las
  tarjetas de Experiencia ya usan marino al pasar el mouse.
- **Preferencias de Valentina:** esquinas redondeadas y sombras suaves en todo.
- **Ciudad Manhattan:** de las 16 diapositivas del reporte solo se publican la 1, 8,
  9 y 13. Las demás traen tarifas del cliente, presupuesto e importe invertido.

## Agregar fotos o videos nuevos

Pasa seguido. El material bruto **no está en el repositorio**: son 2.4 GB en el
Google Drive de Valentina, carpeta *landing CV valentina*, con una subcarpeta por
cliente. **No copiarlo completo al disco**, no hace falta.

**Regla de oro:** nunca meter al sitio un video o una foto sin optimizar. Los
originales pesan entre 10 MB y 500 MB cada uno; la carga inicial de la página debe
mantenerse cerca de **450 KB**.

**Flujo:**

1. Valentina elige en Drive qué piezas quiere y las **descarga a `material-vale/`**.
2. Le avisa al agente: *"ya dejé material nuevo"* y de qué proyecto es.
3. Se optimizan (abajo).
4. El resultado va a `public/piezas/<proyecto>/` y se declara en el array `media`
   del proyecto en `src/data/site.ts`.

**`material-vale/` es la carpeta de entrada**, en la raíz del repo e ignorada por
git (`.gitignore`). Ahí Valentina deja los originales tal cual: pesados, con
tildes o espacios en el nombre, da igual. Contiene un `LEEME.txt` escrito para
ella. **Usar siempre esta carpeta**, no inventar rutas temporales: si cada sesión
elige un sitio distinto, el material termina disperso.

El conector de Drive sirve para *ubicar* material y decirle a Valentina qué
archivo bajar y de qué subcarpeta — útil porque son 2.4 GB. Bajar archivos de
cientos de MB desde el agente es lento: preferir que los descargue ella.

### En WSL (Juan)

```bash
bash scripts/optimizar-material.sh
```

### En Windows (Valentina)

El script es bash y **no corre en Windows nativo**, pero los comandos sí.

**Ya están instaladas en el equipo de Valentina** (verificadas el 2026-08-05 con
material real: FFmpeg 9.0, ImageMagick 7.1.2-29, Poppler 25.07.0). Si en una
máquina nueva faltan, se instalan una vez y **se reabre VS Code** — winget cambia
el `PATH` y una terminal ya abierta no lo toma:

```powershell
winget install Gyan.FFmpeg
winget install ImageMagick.ImageMagick
winget install oschwartz10612.Poppler
```

```powershell
# Video → clip de 12 s, 720p, sin audio (~700 KB)
ffmpeg -nostdin -y -i "ENTRADA.mp4" -t 12 -vf "scale=-2:720,fps=24" `
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -an `
  -movflags +faststart "SALIDA.mp4"

# Póster del video — obligatorio, es lo que se ve mientras carga
ffmpeg -nostdin -y -i "SALIDA.mp4" -vframes 1 -vf "scale=-2:600" -q:v 4 "SALIDA.jpg"

# Foto → 1200 px (de ~15 MB a ~150 KB)
magick "ENTRADA.jpg" -auto-orient -resize "1200x1200>" -strip -quality 82 "SALIDA.jpg"

# Páginas de un PDF como imagen
pdftoppm -jpeg -r 110 -f 1 -l 4 -jpegopt quality=82 "ENTRADA.pdf" "PREFIJO"
```

**Cuidado:** un PNG con transparencia (como el retrato del hero) **nunca** se
convierte a JPG — le quedaría fondo negro. Se mantiene PNG.

Nombres de archivo en minúsculas, sin tildes ni espacios (usar guiones).

**Antes de publicar piezas nuevas de un cliente:** revisar que no muestren precios,
presupuestos ni datos de inversión.

## Conectores (MCP)

Para el trabajo normal —diseño, textos, colores, orden de secciones— **no hace falta
ninguno**: todo está en el repositorio.

El único útil es el conector de **Google Drive** de claude.ai, y solo para ubicar
material nuevo. Se autoriza desde la configuración de conectores de claude.ai, con
la cuenta que tenga acceso a la carpeta. Si no está autorizado, no insistir: pedir
que descarguen los archivos a una carpeta local.

**No conectar MCPs de otros proyectos** (Encore, Linear…). Este proyecto es personal
y no tiene relación con ellos.

## Notas de entorno

- **No hay secretos ni variables de entorno.** El sitio es estático: después de
  `pnpm install` ya funciona, no falta ningún `.env`.
- Al clonar no vienen `node_modules/`, `dist/`, `.astro/` ni `material-vale/`. Los
  tres primeros se generan solos; el último se crea vacío y lo llena Valentina con
  lo que baje de Drive.
- Windows descomprime ZIP de forma nativa, no hace falta instalar nada.
- Al descomprimir en WSL algo bajado de Windows aparecen archivos `Zone.Identifier`:
  son basura de Windows, se borran sin riesgo.

## Pendientes

- [ ] Permiso de Dondi y Ciudad Manhattan para aparecer en el portafolio
- [ ] Enlace de LinkedIn (`site.linkedin`) — el botón aparece solo si existe
- [ ] PDF de la hoja de vida (hoy el botón avisa "pronto disponible")
- [ ] Dominio propio y correo profesional (el actual es de Hotmail)
- [ ] Analítica y OG image para compartir por WhatsApp/LinkedIn
