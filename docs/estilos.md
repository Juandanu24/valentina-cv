# Estilos

## Dirección: "tablero de trabajo"

Módulos y tarjetas con etiquetas claras y datos visibles, como un tablero de
estrategia bien ordenado. **Creativa por el color y la tipografía; profesional por
la estructura.**

## Paleta

Solo estos colores. Tokens en `src/styles/global.css` (`@theme`).

| Rol | Token | Hex | Uso |
|---|---|---|---|
| Fondo | `hueso` | `#F0E9DF` | Fondo general |
| Neutro oscuro | `marino` | `#1E2A38` | Barra, pie, tarjetas en celular, contacto, portadas |
| Acento 1 | `vino` | `#6E1F2A` | Botones principales, barras de resultado, resaltados, flechas |
| Acento 2 | `oliva` | `#55603A` | Mi filosofía, bloque "Conoce más", etiquetas de dato |
| Hover | `quemado` | `#A33A28` | **Únicamente** el hover del vino |
| Texto | `tinta` | `#141C26` | Texto de cuerpo |

**Reglas**
- Nunca negro puro.
- Los dos acentos no compiten en la misma pantalla.
- Sin degradados, sin glassmorphism, sin sombras de color.
- Las variantes se hacen con opacidad del mismo color, no con colores nuevos:
  bordes `marino/15`, texto secundario `tinta/80` o `marino/55`, texto sobre
  oscuro `hueso/85`, formas de fondo `oliva/20`.
- Contraste: sobre hueso se escribe en tinta o marino; sobre marino y vino, en hueso.

**Excepciones deliberadas**
- Los logos de herramientas usan el color real de cada marca.
- Fotos y videos van a todo color, sin filtros ni duotono: en fotografía
  gastronómica el color *es* el trabajo.

## Tipografías

Self-hosted con `@fontsource`, sin CDN.

| Uso | Familia | Dónde |
|---|---|---|
| Títulos y nombre | **Fraunces** (variable, ejes `SOFT`/`WONK`) | `font-display`, `font-name` |
| Cursiva | **Birthstone** | `font-cursiva` — solo el saludo del inicio y el subtítulo de Mi filosofía |
| Cuerpo | **DM Sans** | `font-body` |
| Datos y etiquetas | **JetBrains Mono** | `font-mono` |

La cursiva tiene **dos apariciones y nada más**: repartida por la página deja de
sentirse especial. Birthstone dibuja pequeño dentro de su caja, así que necesita
tamaño generoso y poco margen.

## Forma

- Esquinas redondeadas en todo: `rounded-suave` (0.75rem) para cajas,
  `rounded-pill` para botones y etiquetas.
- Sombras suaves y neutras con el marino a baja opacidad.
- Movimiento discreto: revelados al hacer scroll y microinteracciones, nada más.

## Componentes con identidad

**Barra de resultado.** Cada tarjeta de área cierra con su resultado en mono,
mayúsculas, sobre barra vino. Es el momento enfático de la página y va igual en
las seis. Ciudad Manhattan lleva además un borde vino suave (`emphasis: "destacada"`).

**Portada tipográfica.** Las tarjetas sin material propio muestran, en lugar de
carrusel, un panel marino con el número grande en `hueso/10`, el cliente en Fraunces
y el sector en mono. Nunca fotos de banco.

**Etiqueta de frase gancho.** Tarjeta marino con texto hueso apoyada sobre el retrato.

**Flechas de Sobre mí.** Trazo de 1.4 px en vino, curvas suaves, punta discreta, se
dibujan al entrar en pantalla. Solo en computador.

**Resaltados de texto.** Solo color y peso (`font-semibold text-vino`), nunca fondo
ni caja. En el bloque vino de celular pasan a hueso.

## Comportamiento en celular

Celular no es una versión reducida del escritorio; cambia de composición:

- Inicio: nombre → cargo → foto → texto → botones.
- Menú de hamburguesa.
- Capacidades: tarjetas en marino completo (en celular no existe el hover).
- Herramientas: cinta deslizante en vez de rejilla.
- Sobre mí: sin flechas; textos dentro de un bloque vino.
- Ventana "Conoce más": sube desde abajo, como una hoja de iOS.

**Piso de calidad:** responsive real hasta 360 px, foco de teclado visible,
`prefers-reduced-motion` respetado.

## Prohibido

Estética de revista con serif gigante, stickers o doodles, rosa UGC, degradados,
glassmorphism, iconos de stock, tipografías rudas o industriales, serif demasiado
delgada, fotos de banco e imágenes generadas por IA presentadas como trabajo propio.
