# Producto

## Qué es

Una landing de una sola página que funciona como **hoja de vida no tradicional**.
Una hoja de vida en PDF describe; esta página demuestra, con piezas reales y
enlaces a las cuentas de los clientes.

## Para quién

**Una sola persona:** un reclutador o jefe de marketing evaluando a Valentina.
Cada decisión se resuelve con una pregunta: *¿esto ayuda a que esa persona escriba hoy?*

## Objetivo

Empezó como *conseguir empleo in-house en una marca grande, en estrategia o
dirección de marketing*. Pasó a ser **conseguir empleo**, aplicando también a
cargos por debajo de su nivel, con **foco en marcas de belleza**. La página tiene
que hacer que sea imposible no llamarla, aunque sea para conocerla.

Estar sobrecalificada no impide que llamen; lo que descarta candidatos es no poder
demostrar el trabajo.

## Posicionamiento

- **Cargo:** *Estratega de marketing y contenido*.
- **Línea de alcance:** *Marca · Campañas · Pauta digital · Producción audiovisual*.
- El título nombra el oficio y la línea abre el abanico: sirve para una vacante de
  community manager y para una de dirección, sin encasillar hacia ninguno de los dos.
- **Nunca** "Social Media Manager": es el cargo del que se está alejando.

## Estructura de la página

En este orden (ver `src/pages/index.astro`):

| # | Sección | Componente | Ancla |
|---|---|---|---|
| 1 | Barra de navegación | `Nav.astro` | — |
| 2 | Inicio | `Hero.astro` | — |
| 3 | Cinta de aptitudes | `Banner.astro` | — |
| 4 | Áreas de experiencia + Conoce más | `Work.astro` + `MasTrabajo.astro` | `#trabajo` |
| 5 | Capacidades | `Capacidades.astro` | `#capacidades` |
| 6 | Herramientas (cinta, solo celular) | `BannerHerramientas.astro` | — |
| 7 | Mi filosofía | `Filosofia.astro` | `#filosofia` |
| 8 | Sobre mí | `SobreMi.astro` | `#sobre-mi` |
| 9 | Experiencia | `Trayectoria.astro` | `#experiencia` |
| 10 | Contacto | `Contacto.astro` | `#contacto` |
| 11 | Pie | `Footer.astro` | — |

Los textos de todas las secciones viven en `src/data/site.ts`.

## Qué contiene cada sección

### Barra de navegación
- Computador: **Proyectos | Capacidades | Sobre mí** + botón vino **Escríbeme**.
- Celular: menú de hamburguesa desplegable; el nombre completo solo aparece en computador.
- Los enlaces bajan con desplazamiento suave.

### Inicio
- Saludo en cursiva **¡Hola, soy** y nombre **VALENTINA GARCÍA!**
- Cargo en negrilla y línea de alcance (cada término entero, sin partirse).
- Texto corto de apertura y dos botones: **Ver mi trabajo** y **Sobre mí**.
- Retrato con trama de puntos, destellos, sello circular giratorio y la frase
  gancho en etiqueta: *"Las marcas no necesitan más contenido. Necesitan mejores ideas."*
- En celular: nombre → cargo → foto → texto → botones.

### Cinta de aptitudes
Ocho, no más: Estratégica · Creativa · Curiosa · Analítica · Detallista ·
Resolutiva · Autodidacta · Orientada a resultados.

### Áreas de experiencia
Seis tarjetas **organizadas por área, no por cliente**. El área es el titular y el
cliente baja a una línea en mono.

| # | Área | Cliente |
|---|---|---|
| 01 | Datos, CRM y comunicación corporativa | Alamedas Centro Comercial — Retail |
| 02 | Dirección creativa y estrategia de marketing | Palmareca — Gastrobar |
| 03 | Pauta digital y análisis de resultados | Ciudad Manhattan — Real estate & hospitality |
| 04 | Construcción de marca de belleza | Dra. Natalia Garnica — Medicina estética |
| 05 | Estrategia de contenido y narrativa | Dondi — Chance digital |
| 06 | Producción audiovisual y fotografía | Variedad de marcas — Seis sectores |

Anatomía de cada tarjeta: carrusel de piezas (o portada tipográfica si no hay
material) → número y área → cliente y sector con botón de Instagram → descripción
recortada a dos líneas con **Ampliar / Reducir** → etiquetas → barra vino de resultado.

### Conoce más de mi trabajo
- Bloque verde: **¡Conoce más de mi trabajo!** con botón **Portafolio completo**.
- Abre una ventana dentro de la página: **Más trabajo de 6 sectores diferentes.**
- 22 piezas: 21 reels en filas de tres y una pieza panorámica (*Maíz SV 1035*)
  ocupando una fila entera.
- Cada pieza abre un menú con el enlace a su reel en Instagram.

### Capacidades
Cuatro bloques: Estrategia y marca · Narrativa y contenido · Producción · Datos y pauta.
Debajo, las diez herramientas (rejilla en computador, cinta en celular).

### Mi filosofía
*"No creo contenido por llenar un calendario."* + *Creatividad con estructura y
propósito*. Metodologías: Storytelling · AIDA · Embudos de conversión · Hook-Retain-Reward.

### Sobre mí
- Computador: retrato al centro, seis ideas alrededor a alturas y anchos distintos,
  flechas finas que salen del retrato hacia cada texto.
- Celular: sin flechas; los seis textos dentro de un bloque vino que nace donde
  termina la foto.
- Una frase resaltada por bloque.

### Experiencia
iClic (abr 2023 – hoy) · Alamedas Centro Comercial (oct 2021 – mar 2023) ·
Fox Creativo (abr – sep 2021, práctica). Más educación.

### Contacto
**¿Buscas a alguien para tu equipo de marketing?** · *Contáctame y agendemos una
entrevista* · botón principal **Escríbeme por WhatsApp** · botón secundario de
descarga de la hoja de vida · correo y teléfono.

### Pie
Nombre · ciudad · año · LinkedIn.

## Hoja de vida en PDF

`public/hoja-de-vida-valentina-garcia-florez.pdf`, diseñada por Valentina, una
página. **No se genera desde el sitio:** cada cambio de cargo, área o resultado en
la web hay que repetirlo a mano en el PDF. El botón de descarga solo aparece si
`site.cvPdf` tiene ruta.
