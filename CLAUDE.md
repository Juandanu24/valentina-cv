# CLAUDE.md — Portafolio de Valentina García Flórez

Instrucciones para sesiones que hacen cambios en este proyecto. Lo que no está aquí
está en [`docs/`](docs/README.md). **Comunicarse siempre en español.**
Proyecto personal, sin relación con Dondi ni con otros proyectos del equipo.

## Antes de empezar

1. El proyecto vive en `Documentos\PERSONAL\valentina-cv`. Las sesiones suelen
   abrirse desde `PERSONAL`: **ejecutar git, pnpm y scripts dentro de esta carpeta.**
2. Sincronizar: `git fetch` y partir de `develop` actualizado.
3. Leer el documento de `docs/` que corresponda a la tarea:
   - cambio de diseño → [estilos.md](docs/estilos.md) y [decisiones.md](docs/decisiones.md)
   - cambio de texto o de secciones → [producto.md](docs/producto.md)
   - fotos, videos, logos, PDF → [contenido-y-material.md](docs/contenido-y-material.md)
   - algo que no funciona → [tecnico.md](docs/tecnico.md)
4. **Todo lo que está publicado ya lo aprobó Valentina.** No rehacer nada por
   iniciativa propia.

## Quién escribe

- **Valentina** — dueña del proyecto, la mayoría de las veces quien escribe.
  **No es técnica y no usa la terminal.** Pide cambios en lenguaje de diseño
  ("más pequeño", "ese verde más oscuro"). Explicar sin jerga: nada de "rama",
  "commit", "build" o "PR" sin traducir. Cuando quiera ver algo, **levantar el
  servidor y pasarle http://localhost:4321**.
- **Juan** — desarrollador y dueño del repositorio. Aprueba todo lo que se publica.

## Reglas que no se rompen

- **Contenido:** todo el texto está en `src/data/site.ts`. Los textos son de
  Valentina: no reescribir ni "mejorar" sin que lo pida. **Nunca inventar datos.**
  Primera persona, tuteo, cinco años de experiencia.
- **Cargo:** *Estratega de marketing y contenido*. Nunca "Social Media Manager".
- **Proyectos:** organizados **por área**, no por cliente. El área es el titular.
- **Paleta:** hueso, marino, vino, oliva (+ quemado solo en hover y tinta para texto).
  Nunca negro puro, sin degradados, esquinas redondeadas en todo.
- **Tipografías:** Fraunces, Birthstone (solo dos apariciones), DM Sans, JetBrains Mono.
- **Descartado:** revisar [decisiones.md](docs/decisiones.md) antes de proponer
  tipografías, estilos o composiciones. Mucho ya se probó y no gustó.
- **Material:** nunca subir foto o video sin optimizar. Nunca fotos de banco ni
  imágenes generadas por IA como trabajo propio; sin material → portada tipográfica.
- **Privacidad:** el repositorio es **público**. Nunca publicar cédula, dirección,
  EPS ni datos de terceros de Valentina, ni tarifas, presupuestos o inversión de
  clientes. **Única excepción autorizada:** el importe gastado en la pieza de
  resultados de Ciudad Manhattan (anotado en `site.ts`, no revertir).
- **Documentación:** tampoco puede llevar correos o cuentas personales de terceros.

## Tareas frecuentes

| Pedido | Dónde | Cuidado |
|---|---|---|
| Cambiar un texto | `src/data/site.ts` | Respetar el texto exacto que da Valentina |
| Resaltar una frase de Sobre mí | `sobreMi.bloques`, tramo `{ t, fuerte: true }` | Una por bloque |
| Agregar piezas a una tarjeta | `material-vale/<área>/` → optimizar → `projects[].media` | Tipos `image`, `video` (con `poster`), `duo`; `fit: "contain"` para horizontales sueltas |
| Agregar a la ventana "Conoce más" | `material-vale/ventana conoce más/` → `masTrabajo.piezas` con `reel(slug, rótulo, enlace)` | La pieza panorámica tras un múltiplo de 3 |
| Cambiar un enlace de Instagram | `projects[].instagram` o tercer argumento de `reel()` | Sin enlace → "Enlace pendiente" |
| Agregar una herramienta | `herramientas` + logo en `public/logos/` a 128 px | Sin logo → monograma sobre `bg`/`fg` |
| Cambiar la hoja de vida | Reemplazar `public/hoja-de-vida-valentina-garcia-florez.pdf` | Revisar privacidad y que el cargo coincida con la web |
| Cambiar colores o tipografías | `src/styles/global.css` (`@theme`) | Ver estilos.md |
| Cambiar orden de secciones | `src/pages/index.astro` | Actualizar producto.md |
| Ajustar flechas de Sobre mí | `SobreMi.astro`: `curva`, `desfase`, `entra` por bloque | Verificar con captura |

Comandos de optimización en [contenido-y-material.md](docs/contenido-y-material.md).

## Abrir y verificar

```bash
pnpm install
pnpm dev                        # queda en segundo plano: astro dev status | stop | logs
pnpm build                      # debe pasar limpio antes de proponer publicar
node scripts/revisar-ui.mjs     # capturas en .capturas/ + prueba del scroll de la ventana
```

En cambios visuales, **mirar las capturas** antes de dar algo por terminado.

## Publicar

1. Rama nueva desde `develop` (`main` está protegida).
2. Commits en español.
3. **Pedir permiso antes de hacer push o abrir solicitud.** A Valentina: *"¿guardamos los cambios en la web?"*
4. Solicitud **contra `develop`**. La aprueba Juan.
5. **Cuando Juan apruebe, comparar la rama con `develop`**
   (`git fetch && git log origin/develop..origin/<rama>`): ya pasó dos veces que se
   aprobó a mitad de trabajo y lo posterior quedó fuera.

## Entorno (Windows)

- Los archivos usan saltos de línea **CRLF**: al buscar y reemplazar texto con
  scripts, normalizar antes.
- Si `gh` no responde: `C:\Program Files\GitHub CLI\gh.exe`. Está autenticado con
  la cuenta de Valentina.
- Si FFmpeg, ImageMagick o Poppler no responden tras instalarlos, refrescar el `PATH`
  desde el registro o reabrir VS Code.
- Scroll suave con **Lenis**: toda caja con desplazamiento propio necesita
  `data-lenis-prevent`. Ver otros problemas resueltos en [tecnico.md](docs/tecnico.md).

## Mantener la documentación

Al terminar un cambio que valga la pena recordar, actualizar el archivo de `docs/`
que corresponda. Qué va en cada uno: [docs/README.md](docs/README.md).
