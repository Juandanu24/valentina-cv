# AGENTS.md — Portafolio / CV de Valentina García Flórez

Guía para agentes de IA en este repo. Proyecto **personal**, sin relación con Dondi.
(`CLAUDE.md` es un symlink a este archivo.) **Comunicarse siempre en español.**

> **Valentina no es técnica.** Si quien escribe es ella, explicar sin jerga: nada de
> "rama", "commit" o "build" sin traducir. Juan sí es desarrollador.

## Qué es

Landing de una sola página que funciona como **hoja de vida no tradicional**.
Objetivo único y concreto: que Valentina consiga **empleo in-house en una marca
grande**, en un rol de estrategia / dirección de marketing.

**La audiencia es una sola persona:** un reclutador o jefe de marketing evaluándola.
Cada decisión se resuelve preguntando: *¿esto ayuda a que esa persona escriba hoy?*

## Stack

- **Astro** (estático) + **TypeScript** strict + **Tailwind CSS v4** (`@tailwindcss/vite`,
  tokens en `src/styles/global.css` con `@theme`).
- **Animación:** `gsap` (+ ScrollTrigger) y `lenis` para el scroll suave. Vanilla JS,
  sin React.
- **pnpm** siempre. Node ≥ 22.12. **Deploy:** Vercel.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # compila a dist/
```

## Contenido

Todo el texto vive en **`src/data/site.ts`** y es la fuente de verdad. Los textos
son **definitivos** (los redactó Valentina): no reescribir ni "mejorar" sin que
lo pida. **Nunca inventar datos** sobre ella, sus clientes o sus resultados.

Reglas de copy: **primera persona**, español colombiano neutro, tuteo.
Son **cinco** años de experiencia, no cuatro.

## Diseño — "tablero de trabajo" (v2, vigente)

Módulos y tarjetas con etiquetas claras y datos visibles. Creativo por el color y
la tipografía; profesional por la estructura.

**Paleta — solo estos cuatro colores** (tokens en `global.css`):

| Rol | Token | Hex |
|---|---|---|
| Fondo | `hueso` | `#F0E9DF` |
| Neutro oscuro | `marino` | `#1E2A38` |
| Acento 1 | `vino` | `#6E1F2A` |
| Acento 2 | `oliva` | `#55603A` |

`quemado` (`#A33A28`) es **únicamente** el hover del vino. El texto de cuerpo usa
`tinta` (`#141C26`), una versión oscura del marino — nunca negro puro.
Regla: los dos acentos no compiten en la misma pantalla.

**Tipografías** (self-hosted vía `@fontsource`, sin CDN):
Fraunces (titulares y nombre, con ejes `SOFT`/`WONK`), DM Sans (cuerpo),
JetBrains Mono (datos, etiquetas y detalles).

**Preferencias explícitas de Valentina:**
- Esquinas **redondeadas** en todo (`rounded-suave`, `rounded-pill`) y sombras suaves.
- Nada de tipografías "rudas" o industriales, ni serif demasiado delgada.
- **No** replicar estéticas de: revista/editorial con serif gigante, stickers o
  doodles, rosa UGC, degradados, glassmorphism, iconos de stock.

**Elemento distintivo:** la *línea de resultado* — cada proyecto cierra con su dato
en mono sobre barra vino. Es el único momento enfático de la página, y va **igual
en las seis tarjetas** (sin destacar una sobre otra).

## Estructura de secciones

Nav fija → Hero (retrato) → Banner de aptitudes → Proyectos destacados →
Experiencia → Mi filosofía → Trayectoria → Contacto → Pie.

## Piezas visuales

Las piezas optimizadas viven en `public/piezas/<proyecto>/` y se declaran en el
array `media` de cada proyecto en `site.ts`. Tres tipos:

- `image` — una imagen.
- `video` — autoplay en mute, loop, con `poster`; **carga diferida**: el archivo
  solo se descarga cuando la tarjeta entra en pantalla.
- `duo` — dos piezas horizontales apiladas que llenan el marco vertical.

`fit: "contain"` muestra la pieza completa sobre un fondo difuminado de sí misma
(para horizontales que no se pueden apilar).

**El material bruto NO está en el repo** (2.4 GB, ignorado en `.gitignore`). Vive
en el Drive de Valentina, carpeta *landing CV valentina*. Para regenerar piezas:

```bash
# requiere: sudo apt install ffmpeg imagemagick poppler-utils
bash scripts/optimizar-material.sh
```

Convierte videos a clips de 12 s / 720p / sin audio (~700 KB), fotos a 1200 px y
páginas de PDF a imagen. **Nunca subir video ni foto sin optimizar**: la carga
inicial debe mantenerse cerca de 450 KB.

## Privacidad — NUNCA publicar

- **De Valentina:** cédula, dirección, fecha de nacimiento, estado civil, EPS,
  teléfonos de terceros.
- **De los clientes:** tarifas, presupuestos e inversión publicitaria. Por eso el
  reporte de Ciudad Manhattan muestra solo las diapositivas 1, 8, 9 y 13 — las
  demás traen precios del cliente e importes invertidos.

## Piso de calidad

Responsive real hasta 360 px · foco de teclado visible · `prefers-reduced-motion`
respetado · medios optimizados · movimiento discreto (revelados al hacer scroll y
micro-interacciones, nada más).

## Git

- `main` siempre desplegable → despliega a producción en Vercel.
- `develop` es la rama de integración. Toda rama abre **preview propio** en Vercel.
- Rama por cambio, commits pequeños, mensajes en español.
- **Nunca hacer push ni abrir PR sin confirmación explícita.** A Valentina se le
  pregunta así: *"¿guardamos los cambios en la web?"*.

## Pendientes conocidos

- [ ] Permiso de Dondi y Ciudad Manhattan para aparecer en el portafolio
- [ ] Enlace de LinkedIn (`site.linkedin`) — el botón aparece solo si existe
- [ ] PDF de hoja de vida (hoy el botón avisa "pronto disponible")
- [ ] Dominio propio y correo profesional (reemplazar el de Hotmail)
- [ ] Analítica y OG image para compartir por WhatsApp/LinkedIn
