# Técnico

## Stack

- **Astro** estático + **TypeScript** strict + **Tailwind CSS v4** (`@tailwindcss/vite`,
  tokens con `@theme` en `src/styles/global.css`).
- **GSAP** + ScrollTrigger y **Lenis** para scroll suave. JavaScript sin framework.
- **pnpm 11**, Node ≥ 22.12. Despliegue en **Vercel**.
- **Playwright** (dependencia de desarrollo) para verificación visual.

```bash
pnpm install
pnpm dev      # http://localhost:4321 — en Astro 7 queda en segundo plano
pnpm build    # compila a dist/
pnpm exec astro dev status | stop | logs
```

No hay variables de entorno ni secretos.

## Dónde vive cada cosa

```
src/
  data/site.ts            ← TODO el contenido
  pages/index.astro       ← orden de las secciones
  layouts/Layout.astro    ← <head>, Lenis, revelados, navegación suave
  styles/global.css       ← tokens, tipografías, animación del modal
  components/             ← una sección por archivo (ver producto.md)
public/
  piezas/<carpeta>/       ← medios optimizados
  logos/                  ← logos de herramientas
  valentina.png           ← retrato del inicio (PNG transparente)
  valentina-sobre-mi.png  ← retrato de Sobre mí
  hoja-de-vida-valentina-garcia-florez.pdf
scripts/
  revisar-ui.mjs          ← capturas y prueba del scroll de la ventana
  optimizar-material.sh   ← optimización de medios (bash / WSL)
material-vale/            ← material bruto, ignorado por git
```

## Verificación

```bash
pnpm dev                        # en otra terminal
node scripts/revisar-ui.mjs     # capturas en .capturas/ (ignorada por git)
```

Captura Sobre mí, Áreas, Capacidades y Experiencia en escritorio (1440) y celular
(390), y comprueba que la ventana "Conoce más" se desplaza por dentro sin mover la
página. Imprime `OK` o `FALLA`. Usarlo antes de dar algo por terminado cuando el
cambio es visual: el HTML no dice si una flecha apunta bien.

## Publicación

1. Rama nueva desde `develop`. `main` está protegida.
2. Commits pequeños con mensaje en español.
3. `pnpm build` limpio antes de proponer publicar.
4. **Pedir permiso antes de hacer push o abrir solicitud.** A Valentina: *"¿guardamos los cambios en la web?"*
5. Solicitud **contra `develop`**. La aprueba Juan, que después promueve `develop` a `main`.
6. Vercel crea un preview por rama.
7. **Después de cada aprobación, comparar la rama con `develop`**
   (`git fetch && git log origin/develop..origin/<rama>`). Dos veces se aprobó una
   solicitud mientras se seguía trabajando en la misma rama y lo posterior quedó fuera.

GitHub CLI se autentica con la cuenta de Valentina, para que ella proponga y Juan
apruebe. Si `gh` no está en el `PATH` de la terminal: `C:\Program Files\GitHub CLI\gh.exe`.

## Problemas resueltos

**pnpm 11 bloquea esbuild.** Sin `allowBuilds: esbuild: true` en `pnpm-workspace.yaml`,
`pnpm dev` falla con `ERR_PNPM_IGNORED_BUILDS`.

**El scroll de la ventana se iba a la página.** Lenis intercepta la rueda y llama a
`preventDefault`; ni `body { overflow: hidden }` ni `lenis.stop()` bastan. La caja
desplazable necesita **`data-lenis-prevent`**. Además, el Layout escucha
`capa:abrir` / `capa:cerrar` para detener Lenis mientras hay una capa abierta.

**La navegación por anclas saltaba de golpe.** Lenis no intercepta anclas. Se delega
el clic en `document` y se usa `lenis.scrollTo`. El espacio bajo la barra fija lo pone
`scroll-margin-top` en CSS, que Lenis respeta: sumarlo también en JS lo contaba dos veces.

**Los botones no mostraban la mano.** Tailwind v4 quitó `cursor: pointer` del preflight;
se restituye en `global.css`.

**Entrada del modal sin JS.** `@starting-style` + `transition-behavior: allow-discrete`,
curva `cubic-bezier(0.32, 0.72, 0, 1)`. Sin soporte, aparece de golpe y nada se rompe.

**Flechas que no se rompen al cambiar el texto.** Un único SVG superpuesto mide con
`getBoundingClientRect` el retrato y cada bloque y genera los bezier. Se mide tras
`document.fonts.ready` (con la tipografía de reserva las cajas cambian) y se
recalcula en `resize`. Por bloque: `data-curva` (signo invierte el arco),
`data-desfase` (altura del origen) y `data-entra` (cuánto entra el origen en el retrato).

**Orden de Sobre mí en celular.** Las columnas usan `display: contents` en celular y
el contenedor es `flex flex-col`, para que `order-*` funcione y los bloques se lean
en el orden de `site.ts`.

**Casilla vacía en la ventana.** Ver decisiones.md: la pieza panorámica debe ir tras
un número de piezas múltiplo de 3.

**Carga inicial de 4,7 MB con 62 imágenes, y 23,8 MB de golpe al abrir la ventana.**
El fondo inline y el `poster` de cada video se descargaban siempre, y los 22
videos de la ventana recibían `src` a la vez al abrirla. Solución en ambos:
`data-src`/`data-poster`/`data-bg` y un `IntersectionObserver` que los asigna
solo cuando la pieza está visible o a punto de estarlo; en la ventana el `root`
es la caja desplazable y al salir de vista el video se pausa sin quitar el
`src`. Al agregar medios a estos componentes, usar `data-*`, nunca
`src`/`poster`/`style` directos, o se vuelven a descargar al entrar.

**Saltos de línea.** Los archivos usan CRLF. Los scripts que buscan y reemplazan
texto deben normalizar a `\n` antes y restaurar al escribir.

**Tailwind y milímetros.** No genera utilidades con `mm` (`py-[12mm]`); en diseños
para impresión los márgenes van en `style`.

**Símbolo `CLAUDE.md`.** En git era un enlace simbólico a `AGENTS.md`; en Windows se
materializaba como un archivo de texto con la palabra `AGENTS.md` y las sesiones no
recibían instrucciones. Ahora es un archivo real.

## Entorno

- Proyecto en `Documentos\PERSONAL\valentina-cv`. Las sesiones se abren desde
  `PERSONAL`: ejecutar git y pnpm dentro de la carpeta del proyecto.
- Valentina trabaja en Windows y no usa la terminal; Juan trabaja en WSL.
- Tras instalar algo con winget, reabrir VS Code o refrescar el `PATH` en la sesión.
- Al descomprimir en WSL algo bajado de Windows aparecen archivos `Zone.Identifier`: se borran sin riesgo.
