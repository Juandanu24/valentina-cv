# AGENTS.md — Portafolio / CV de Valentina García Florez

Guía para agentes al trabajar en este repo. Proyecto **personal**, sin relación con Dondi.
(`CLAUDE.md` es un symlink a este archivo.)

## Qué es

Landing page de una sola página (one-page) que funciona como **hoja de vida no tradicional** para búsqueda de empleo en marketing/comunicación. No es un PDF: es un sitio web con secciones tipo portafolio.

## Stack

- **Astro** (SSG estático) + **TypeScript** (strict) + **Tailwind CSS v4** (vía `@tailwindcss/vite`, tokens en `src/styles/global.css` con `@theme`).
- **Animación:** `gsap` y `lenis` (smooth scroll) ya instalados — son vanilla JS y funcionan en Astro sin React. Si se necesita algo tipo Framer Motion, se agrega React como isla (`pnpm astro add react`).
- **pnpm** como gestor. **Deploy:** Vercel (estático, `dist/`).

Comandos:
```bash
pnpm dev      # http://localhost:4321
pnpm build    # compila a dist/
pnpm preview  # sirve el build
```

Docs de Astro: https://docs.astro.build (Content collections, componentes, framework components, styling).

## Contenido

El contenido real del CV está tipado en **`src/data/site.ts`** (perfil, experiencia cronológica, educación, skills, proyectos, contacto). Es la fuente de verdad de contenido — no inventar datos. Si algo falta, usar placeholder claro y listarlo.

## Dirección creativa (IMPORTANTE)

- La usuaria quiere que se vea **claramente distinto a un diseño "genérico de IA"**: evitar plantillas predecibles, tipografías por defecto, layouts simétricos sin personalidad.
- **Tono de marca:** divertida, cercana, creativa, cálida, tecnológica, extrovertida, rebelde, minimalista. Debe percibirse profesional, creativa, con ideas nuevas, que dice lo que piensa sin miedo.
- **La estructura de secciones está ABIERTA a cambios.** No asumir que hay que conservar el orden de la v1. **Preguntarle a Valentina qué quiere mantener y qué replantear** antes de construir a fondo.
- Referencia v1 (solo contenido, NO replicar diseño):
  - Paleta (en `global.css`, ajustable): ink `#16141F`, magenta `#FF2E7E`, violeta `#6C3CE9`, amarillo `#FFC94A`, teal `#00C9A7`, fondo `#F5F3FA`.
  - Tipografías: Unbounded (títulos), Plus Jakarta Sans (texto), Space Mono (detalles).
  - Secciones v1: Inicio → Sobre mí → Experiencia (timeline) → Educación → Habilidades → Proyectos → Contacto.
  - Elemento distintivo v1: badges de personalidad rotados tipo stickers en el hero + frase-manifiesto grande en "Sobre mí".

## Privacidad — NUNCA incluir en el sitio público

Cédula, dirección exacta, fecha de nacimiento, estado civil, EPS, teléfonos de referencias. (Si se necesita un PDF formal con esos datos, es un documento aparte, fuera de este sitio.)

## Copy

Español **colombiano** neutro, tuteo. Nunca voseo argentino.

## Git

- `main` siempre desplegable. Rama por feature (`feat/hero`, `feat/experiencia`…), commits pequeños.
- **No** crear branches en remoto ni hacer push sin confirmación explícita del usuario.

## Deploy (pendiente)

- Importar el repo en Vercel (detecta Astro solo). Cada push a `main` = producción; cada rama = preview.
- Al comprar el dominio `.co`, actualizar `site` en `astro.config.mjs` y `url` en `src/data/site.ts`, y conectar el dominio por DNS en Vercel.
