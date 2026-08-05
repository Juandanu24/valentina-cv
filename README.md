# Portafolio de Valentina García Flórez

Hoja de vida web · [valentinagarciaflorez.vercel.app](https://valentinagarciaflorez.vercel.app)

---

## Guía para Valentina 💛

Esta guía es para que puedas hacerle cambios a tu página desde tu computador,
con la ayuda de Claude. No necesitas saber programar.

### Primero: los dos lugares

Hay dos versiones de tu página. Es lo único importante que debes tener claro:

| | Dónde está | Quién la ve |
|---|---|---|
| **Local** | Solo en tu computador | Solo tú |
| **En internet** | En la dirección de arriba | Todo el mundo |

**Local es tu taller:** ahí pruebas, cambias y te equivocas sin que nadie lo vea.
Cuando algo te gusta, se publica y ahí sí queda en internet.

### Instalar (una sola vez)

1. **Node** — de [nodejs.org](https://nodejs.org), la versión LTS.
   Es el motor que hace funcionar la página en tu computador.
2. **Git** — de [git-scm.com](https://git-scm.com).
   Es lo que guarda el historial de cambios.
3. **VS Code** — de [code.visualstudio.com](https://code.visualstudio.com).
   Es el programa donde vive el proyecto.
4. Abre VS Code → pestaña **Extensiones** (el ícono de cuadritos, a la izquierda)
   → busca **Claude** → instalar.
5. Abre la terminal de VS Code (menú *Terminal → Nueva terminal*) y escribe:
   ```bash
   npm install -g pnpm
   ```

### Conectar tu cuenta de GitHub (una sola vez)

GitHub es donde vive el proyecto. Necesitas dos cosas:

**a) Que tu correo quede privado.** Como el proyecto es público, el correo que
uses quedaría visible para cualquiera (y los bots lo usan para spam):

1. En GitHub, entra a **Settings → Emails**
2. Marca **"Keep my email addresses private"**
3. Ahí mismo GitHub te muestra un correo que termina en `@users.noreply.github.com`.
   Cópialo, lo necesitas en el paso siguiente.

**b) Identificarte.** En la terminal de VS Code:

```bash
git config --global user.name "Valentina García Flórez"
git config --global user.email "EL-CORREO-NOREPLY-QUE-COPIASTE"
```

Y para poder guardar cambios, inicia sesión. La forma más simple es desde VS Code:
abajo a la izquierda, ícono de **Accounts → Sign in with GitHub**.

### Bajar el proyecto (una sola vez)

```bash
git clone https://github.com/Juandanu24/valentina-cv.git
cd valentina-cv
pnpm install
```

### Cada vez que trabajes

```bash
pnpm dev
```

Abre **http://localhost:4321** en el navegador: ahí está tu página.
Déjalo corriendo — cada cambio se ve al refrescar.
Para cerrarlo: `Ctrl + C` en la terminal.

### Cómo pedir cambios

Abre Claude en VS Code y **pídele las cosas con tus palabras**, como se las dirías
a un diseñador:

> *"El título del inicio se ve muy grande, hazlo un poco más pequeño"*
> *"Cambia la foto de la tarjeta de Kepagro"*
> *"Quiero que el verde de esa sección sea más oscuro"*

Él hace el cambio y tú lo ves refrescando el navegador.

### Cómo publicar

Cuando algo te guste y quieras que quede en internet, dile a Claude:

> *"Guarda estos cambios y ábrele una solicitud a Juan"*

Él prepara todo y Juan lo revisa antes de que salga a internet. Así nunca se
publica nada sin querer.

---

## Notas técnicas

Astro (estático) + TypeScript strict + Tailwind v4 + GSAP/Lenis. pnpm. Node ≥ 22.12.
Deploy en Vercel.

```bash
pnpm dev      # http://localhost:4321
pnpm build    # compila a dist/
pnpm preview  # sirve el build
```

- **Contenido:** todo el texto está en `src/data/site.ts`.
- **Diseño y reglas del proyecto:** ver `AGENTS.md`.
- **Piezas visuales:** `public/piezas/`. El material bruto (2.4 GB) no está en el
  repo; vive en Drive. Para regenerarlo: `bash scripts/optimizar-material.sh`
  (requiere `ffmpeg`, `imagemagick` y `poppler-utils`).

### Ramas

`main` es lo publicado · `develop` integra los cambios · cada rama genera su propio
preview en Vercel.
