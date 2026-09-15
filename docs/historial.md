# Historial

Todo lo trabajado hasta la versión publicada. Para el porqué de cada decisión, ver
[decisiones.md](decisiones.md).

**Periodo:** 16 de julio – 26 de agosto de 2026 · 53 commits · 18 solicitudes.

## Etapa 0 — Primera versión, "sticker energy" · 16 jul

Estructura inicial con Astro, Tailwind, GSAP y Lenis. Estilo de stickers, magenta y
violeta, nombre gigante y marquesina de habilidades. **Descartada por completo.**

## Etapa 1 — Versión 2, "tablero de trabajo" · 29–30 jul · #1

- Sistema de diseño de cuatro colores y contenido definitivo de la especificación.
- Fraunces, retrato en el inicio, sombras y fichas de herramientas.
- Video con reproducción automática en silencio y carga diferida.
- Carrusel con flechas, puntos y gestos táctiles; horizontales apiladas de a dos.
- Reporte de Ciudad Manhattan sin datos comerciales.
- Instagram de cada cliente y botón del portafolio ampliado en oliva.
- Material real de los seis proyectos optimizado.
- Dominio `valentinagarciaflorez.vercel.app`.

## Etapa 2 — Preparar el equipo de Valentina · 5 ago · #2 a #10

- Guía para Valentina en el README y guía de cuenta de GitHub.
- Arreglado el error de esbuild que impedía abrir la página localmente.
- GitHub CLI con la cuenta de Valentina; flujo rama → solicitud contra `develop` → aprobación de Juan.
- FFmpeg, ImageMagick y Poppler instalados en Windows.
- Retiradas las tipografías de la v1.
- `CONTEXTO.md` como memoria entre sesiones.
- Carpeta `material-vale/` como entrada única del material bruto.

## Etapa 3 — Rediseño con Valentina · 6 ago · #11

- Retirado "Social Media Manager" del título, la vista previa y el inicio.
- Retirados el botón de PDF que decía "pronto disponible" y el enlace a Canva.
- Inicio nuevo: saludo en cursiva, cargo con línea de alcance, texto corto, dos
  botones, frase gancho como etiqueta y decoración del retrato.
- Menú de hamburguesa en celular; menú de escritorio con separadores.
- Entró la Dra. Natalia Garnica; salió S Ingeniería.
- Descripciones recortadas a dos líneas.
- Ventana "Conoce más de mi trabajo" dentro de la página, con 21 reels y una pieza panorámica.
- Sobre mí convertido en composición alrededor del retrato.
- Cinta de herramientas en celular y logos reales.
- 43 archivos de material optimizados.
- Flechas calculadas en tiempo real, entrada del modal estilo iOS, desplegable de
  Instagram por pieza.
- Arreglado el scroll de la ventana (`data-lenis-prevent`).
- Navegación suave entre secciones.
- Script de verificación con Playwright.

## Etapa 4 — Ajustes finos · 7 ago · #13

- Cursiva definitiva: Birthstone.
- Textos nuevos del bloque verde, la ventana y contacto.
- Espacios corregidos en celular.
- Bloque vino con los textos de Sobre mí en celular.
- Resaltados en los seis bloques de Sobre mí.

## Etapa 5 — Hoja de vida y cierre · 7 ago · #15

- Hoja de vida en PDF con descarga. Primero generada desde el sitio (tres páginas);
  después reemplazada por el diseño de Valentina (una página).
- Correo profesional y botón *Escríbeme por WhatsApp*.
- LinkedIn en el pie.
- "Ver más..." pasó a "Ampliar".
- Pie de página con separación correcta.
- Logos completos de herramientas; Google Analytics retirado.
- Los 22 enlaces de la ventana y su orden definitivo.

## Etapa 6 — Áreas de experiencia · 26 ago · #17

- Proyectos reorganizados por área de experiencia.
- Entró Alamedas como área propia.
- Entró Producción audiovisual como área transversal; salieron las tarjetas de
  fotografía de Palmareca y de Kepagro.
- Pauta digital con tres piezas del reporte de campaña (con autorización expresa
  para mostrar el importe gastado).
- Belleza: entró *Surco nasogeniano*, salió *Qué hay en mi bolso*.
- Capacidades: "Números y pauta" pasó a "Datos y pauta".
- WordPress en herramientas.
- Portada tipográfica en lugar de fotos de banco.
- Hoja de vida nueva, alineada con las áreas; se corrigió que volvía a decir
  "Social media manager".

## Etapa 7 — Reorganización de la documentación · sep 2026

- El proyecto se movió a `Documentos\PERSONAL\valentina-cv`.
- `CLAUDE.md` pasó de enlace simbólico roto a archivo real con instrucciones.
- `AGENTS.md` y `CONTEXTO.md` se consolidaron en la carpeta `docs/`.

## Etapa 8 — Nuevo orden de áreas · 15 sep 2026

- Orden de tarjetas: Alamedas, Dirección creativa, Pauta digital, Belleza,
  Estrategia de contenido, Producción audiovisual.
- Alamedas deja la portada tipográfica y usa la foto de la fachada del centro comercial.
- Dirección creativa: la barra de resultado pasa a "+140% de crecimiento en seguidores
  (2023–2026) y cero pérdida de comunidad en el cambio de nombre".
- Experiencia: iClic pasa a "Cofundadora y estratega de marketing", con descripción nueva.
- La ventana dice "6 sectores", igual que la tarjeta de producción audiovisual.
- Se retiró la flecha "⌄" de cada pieza de la ventana: se leía como un elemento vacío.

## Solicitudes

| # | Fecha | Contenido |
|---|---|---|
| 1 | 30 jul | Versión 2 "tablero de trabajo" con material real |
| 3 | 5 ago | Guía de cuenta de GitHub |
| 4 | 5 ago | Permiso de esbuild y flujo de ramas |
| 5 | 5 ago | Retiro de tipografías de la v1 |
| 7 | 5 ago | `CONTEXTO.md` |
| 9 | 5 ago | Carpeta `material-vale/` |
| 11 | 6 ago | Rediseño del inicio y Sobre mí, sector belleza y material real |
| 13 | 7 ago | Birthstone, textos nuevos y panel de Sobre mí en celular |
| 15 | 7 ago | Hoja de vida en PDF, correo nuevo y detalles |
| 17 | 26 ago | Proyectos organizados por área de experiencia |

Las solicitudes pares (#2 a #18) son promociones de `develop` a `main`.

## Lección de proceso

En #11 y #13 la solicitud se aprobó mientras se seguía trabajando en la misma rama;
los commits posteriores quedaron fuera de `develop` y hubo que abrir #13 y #15. Desde
entonces, después de cada aprobación se compara la rama con `develop`.
