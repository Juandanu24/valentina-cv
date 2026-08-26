/**
 * Datos del sitio — v2, según especificación de Valentina (jul 2026).
 * Textos DEFINITIVOS del documento: no redactar nada nuevo.
 * Objetivo único: conseguir empleo in-house en una marca grande (estrategia/dirección de marketing).
 * Todo el copy en PRIMERA persona. Cinco años de experiencia, no cuatro.
 */

export const site = {
  name: "Valentina García Flórez",
  // El cargo tiene que servir desde una vacante de community manager hasta una de
  // dirección: el título nombra el oficio y la línea de alcance abre el abanico,
  // sin declarar un nivel que encasille hacia arriba o hacia abajo.
  role: "Estratega de marketing y contenido",
  // En lista, no en una cadena: así ningún término se parte a mitad de línea.
  alcance: ["Marca", "Campañas", "Pauta digital", "Producción audiovisual"],
  location: "Montería, Colombia",
  email: "valentina.garciaflorez@outlook.com", // TODO v3: correo con dominio propio
  whatsapp: "https://wa.me/573218622670",
  // La dirección lleva la tilde de "garcía" codificada (%C3%AD) y un código
  // aleatorio al final. Funciona, pero el documento de estrategia pide dejarla
  // como linkedin.com/in/valentinagarciaflorez. Si Valentina la cambia en
  // LinkedIn, hay que actualizarla aquí: la anterior deja de resolver.
  linkedin: "https://www.linkedin.com/in/valentina-garc%C3%ADa-florez-aa7505195/",
  // Hoja de vida en PDF. Vacío = el botón no se pinta. En cuanto el archivo
  // esté en public/, basta con poner aquí su ruta y el botón aparece solo.
  // Antes de publicarlo: revisar que no lleve cédula, dirección, EPS ni
  // teléfonos de terceros (ver "Privacidad" en AGENTS.md).
  cvPdf: "/hoja-de-vida-valentina-garcia-florez.pdf",
  // TODO: dominio propio (ej. valentinagarcia.co) — actualizar también astro.config.mjs
  url: "https://valentinagarciaflorez.vercel.app",
} as const;

// El titular va partido en dos tipografías: el saludo en cursiva y el nombre en
// Fraunces al tamaño grande. La ciudad salió de aquí y vive solo en el pie.
export const hero = {
  saludo: "¡Hola, soy",
  nombre: "Valentina García!",
  // Frase gancho: ya no es un bloque de texto, va como etiqueta junto al retrato.
  hook: "Las marcas no necesitan más contenido. Necesitan mejores ideas.",
  // Solo el abreboca. El párrafo descriptivo se movió a la sección "Sobre mí".
  intro:
    "No llegué al marketing por las redes sociales, llegué porque me apasiona entender cómo piensan las marcas y las personas.",
  ctaPrimary: "Ver mi trabajo",
  ctaSecondary: "Sobre mí",
} as const;

// Composición alrededor del retrato: seis ideas sueltas, sin título ni número.
// Es la sección más personal de la página, pero sigue siendo una hoja de vida:
// el carácter viene del contenido y la composición, nunca de adornos.
export const sobreMi = {
  title: "Sobre mí",
  // Cada bloque se parte en tramos para poder resaltar UNA sola frase corta.
  // El énfasis es tipográfico y de color (vino), nunca fondo ni adorno.
  // Los seis llevan resaltado, incluidos los dos breves.
  bloques: [
    [
      { t: "Graduada de comunicación social y periodismo, pero " },
      { t: "apasionada por el marketing", fuerte: true },
      { t: " desde las prácticas hasta hoy." },
    ],
    [
      { t: "Mi camino siempre ha estado en lo digital, en la tecnología y en encontrar " },
      { t: "formas nuevas de contar", fuerte: true },
      { t: " lo que una marca quiere decir." },
    ],
    [
      { t: "Tener iClic me hizo ver el mundo de las agencias desde adentro. Fui " },
      { t: "la que graba, la que edita, la que publica y la que dirige", fuerte: true },
      { t: "." },
    ],
    [
      { t: "Trabajo con estructura: planifico, organizo y anoto todo. Soy detallista hasta el final; " },
      { t: "el tono, el encuadre, el lenguaje", fuerte: true },
      { t: "." },
    ],
    [
      { t: "Me gusta el " },
      { t: "trabajo en equipo", fuerte: true },
      { t: ", liderar y aportar ideas." },
    ],
    [
      { t: "No me encasillo en un cargo cuando hay algo que " },
      { t: "sacar adelante", fuerte: true },
      { t: "." },
    ],
  ] as readonly (readonly { t: string; fuerte?: boolean }[])[],
} as const;

// Banner deslizante: aptitudes (no herramientas). Ocho, no más.
export const aptitudes = [
  "Estratégica",
  "Creativa",
  "Curiosa",
  "Analítica",
  "Detallista",
  "Resolutiva",
  "Autodidacta",
  "Orientada a resultados",
] as const;

/** Una pieza del carrusel.
 *  - video: autoplay en mute
 *  - image: una sola imagen
 *  - duo:   dos piezas horizontales apiladas, que juntas llenan el marco vertical
 *  fit "contain" muestra la pieza completa sobre un fondo difuminado de sí misma. */
export type Media = { alt: string; fit?: "cover" | "contain" } & (
  | { type: "video"; src: string; poster: string }
  | { type: "image"; src: string }
  | { type: "duo"; src: readonly [string, string] }
);

export interface Project {
  /** Titular de la tarjeta: el área de experiencia, no el cliente. */
  area: string;
  client: string;
  sector: string;
  description: string;
  tags: readonly string[];
  result: string;
  /** "destacada": tratamiento visual mayor (05 Ciudad Manhattan). "visual": la más fotográfica (06 producción audiovisual). */
  emphasis?: "destacada" | "visual";
  /** Cantidad de placeholders mientras no haya material real. */
  pieces: number;
  /** Piezas reales ya optimizadas en public/piezas/. Si existe, reemplaza a los placeholders. */
  media?: readonly Media[];
  /** Instagram del cliente. El botón aparece solo si hay enlace. */
  instagram?: string;
}

// Seis tarjetas ordenadas por ÁREA DE EXPERIENCIA, no por cliente: un reclutador
// busca "sabe hacer esto", no "trabajó con aquel". Por eso el titular es el área
// y el cliente baja a la línea de apoyo.
export const projects: readonly Project[] = [
  {
    area: "Dirección creativa y estrategia de marketing",
    client: "Palmareca",
    sector: "Gastrobar",
    description:
      "Dirigí el cambio forzado de nombre de La Pérgola a Palmareca sin perder el ADN de la marca. Lideré al equipo de diseño y comunicaciones hacia una identidad en clave nocturna, reescribí el tono para conservar la sabrosura del lugar y ejecuté la pauta de la reinauguración.",
    tags: ["Branding", "Dirección de arte", "Meta Ads", "Copywriting"],
    instagram: "https://www.instagram.com/palmarecamtr/",
    result: "Conflicto de marca resuelto y rebranding premium",
    pieces: 4,
    media: [
      {
        type: "image",
        src: "/piezas/palmareca-rebranding/menu-palmareca-01.jpg",
        alt: "Menú de Palmareca",
      },
      {
        type: "image",
        src: "/piezas/palmareca-rebranding/moodboard-palmareca.jpg",
        alt: "Moodboard de la identidad de Palmareca",
      },
      {
        type: "duo",
        src: [
          "/piezas/palmareca-rebranding/manual-02.jpg",
          "/piezas/palmareca-rebranding/manual-03.jpg",
        ],
        alt: "Manual de marca de Palmareca: logotipo y construcción",
      },
      {
        type: "duo",
        src: [
          "/piezas/palmareca-rebranding/manual-04.jpg",
          "/piezas/palmareca-rebranding/manual-05.jpg",
        ],
        alt: "Manual de marca de Palmareca: paleta de color y tipografía",
      },
      {
        type: "duo",
        src: [
          "/piezas/palmareca-rebranding/manual-06.jpg",
          "/piezas/palmareca-rebranding/manual-07.jpg",
        ],
        alt: "Manual de marca de Palmareca: aplicaciones de la identidad",
      },
    ],
  },
  {
    area: "Construcción de marca de belleza",
    client: "Dra. Natalia Garnica",
    sector: "Medicina estética",
    description:
      "Construí la marca personal de una médica estética. Traduje procedimientos clínicos a un lenguaje cercano y diseñé campañas que venden desde la seguridad, la confianza y la autoestima, no desde la inseguridad. Coordiné la estrategia de campañas de colaboración con marcas de skincare.",
    tags: [
      "Marca personal",
      "Dirección creativa",
      "Copywriting",
      "Campañas estacionales",
      "Influencer marketing",
    ],
    result: "Construcción de marca personal y colaboraciones con marcas",
    instagram: "https://www.instagram.com/dra.nataliagarnica/",
    pieces: 4,
    media: [
      {
        type: "video",
        src: "/piezas/dra-natalia/rutina-de-skincare-de-dia-final.mp4",
        poster: "/piezas/dra-natalia/rutina-de-skincare-de-dia-final.jpg",
        alt: "Rutina de skincare de día",
      },
      {
        type: "video",
        src: "/piezas/dra-natalia/nctf.mp4",
        poster: "/piezas/dra-natalia/nctf.jpg",
        alt: "Tratamiento NCTF",
      },
      {
        type: "video",
        src: "/piezas/dra-natalia/nanopore.mp4",
        poster: "/piezas/dra-natalia/nanopore.jpg",
        alt: "Tratamiento nanopore",
      },
      {
        type: "video",
        src: "/piezas/dra-natalia/surco-nasogeniano.mp4",
        poster: "/piezas/dra-natalia/surco-nasogeniano.jpg",
        alt: "Tratamiento del surco nasogeniano",
      },
    ],
  },
  {
    area: "Estrategia de contenido y narrativa",
    client: "Dondi",
    sector: "Chance digital",
    description:
      "Diseñé la campaña de lanzamiento en redes de una nueva forma de comprar chance por WhatsApp. El reto era traducir una costumbre de toda la vida a un lenguaje digital que funcionara para dos públicos opuestos: el que ya compra en el punto físico y el joven que ni siquiera sabe qué es el chance. Dirigí guiones, storytelling y la comunicación entre las marcas aliadas.",
    tags: [
      "Estrategia de lanzamiento",
      "Storytelling",
      "Guion y video",
      "Dirección creativa",
      "Producción audiovisual",
    ],
    result: "Dos audiencias en un solo lenguaje: digitalización del chance",
    instagram: "https://www.instagram.com/somosdondi/",
    pieces: 4,
    media: [
      {
        type: "video",
        src: "/piezas/dondi/como-jugar-chance-con-dondi.mp4",
        poster: "/piezas/dondi/como-jugar-chance-con-dondi.jpg",
        alt: "Cómo jugar chance con Dondi",
      },
      {
        type: "video",
        src: "/piezas/dondi/las-senales-de-la-suerte.mp4",
        poster: "/piezas/dondi/las-senales-de-la-suerte.jpg",
        alt: "Las señales de la suerte",
      },
      {
        type: "video",
        src: "/piezas/dondi/noticia-plan-referidos-dondi.mp4",
        poster: "/piezas/dondi/noticia-plan-referidos-dondi.jpg",
        alt: "Noticia del plan de referidos",
      },
      {
        type: "video",
        src: "/piezas/dondi/plan-referidos.mp4",
        poster: "/piezas/dondi/plan-referidos.jpg",
        alt: "Plan de referidos de Dondi",
      },
    ],
  },
  {
    // Tarjeta nueva: rescata el trabajo de Alamedas, que solo figuraba como una
    // línea en Trayectoria pese a ser donde aprendió CRM, datos y eventos.
    // TODO: sustituir los marcadores por material real y añadir su Instagram.
    area: "Datos, CRM y comunicación corporativa",
    client: "Alamedas Centro Comercial",
    sector: "Retail",
    description:
      "Manejé la comunicación 360° de un centro comercial: contenido, campañas, medios digitales y eventos. Administré el CRM WeGrow —base de datos de clientes y comercios— y construí informes de segmentación por comportamiento de compra y perfil demográfico que alimentaban las decisiones de las campañas. Ahí aprendí que la estrategia digital solo sirve cuando aterriza en algo físico: una activación, un evento, una visita a la tienda.",
    tags: [
      "CRM",
      "Análisis de datos",
      "Email marketing",
      "Comunicación corporativa",
      "Eventos y activaciones",
    ],
    result: "Comunicación, datos y eventos de un centro comercial, en un solo cargo",
    pieces: 4,
  },
  {
    area: "Pauta digital y análisis de resultados",
    client: "Ciudad Manhattan",
    sector: "Real estate & hospitality",
    description:
      "Diseñé y ejecuté la campaña multicanal de temporada para tres unidades de negocio. Orienté toda la pauta a abrir conversación directa por mensaje, testeando formatos y segmentaciones, y analicé los resultados por audiencia y por pieza para saber qué sostener y qué cortar.",
    tags: [
      "Meta Ads Manager",
      "Anuncios conversacionales",
      "Analítica",
      "Copywriting promocional",
    ],
    // Única cifra del portafolio: Valentina pidió conservar el 199.
    result: "199 conversaciones directas · $353 COP por lead",
    instagram: "https://www.instagram.com/motelmanhattanc/",
    emphasis: "destacada",
    pieces: 3,
    media: [
      {
        // Esta pieza muestra el importe gastado del cliente. AGENTS.md lo
        // prohíbe por defecto; Valentina lo autorizó de forma expresa por ser
        // el respaldo del dato de la barra de resultado. No revertir sin ella.
        type: "image",
        src: "/piezas/ciudad-manhattan/campana-02-resultados.jpg",
        alt: "Resultados de la campaña: conversaciones, clics, impresiones y alcance",
      },
      {
        type: "image",
        src: "/piezas/ciudad-manhattan/campana-03-publico.jpg",
        alt: "Público objetivo y enfoque estratégico de la campaña",
      },
      {
        type: "image",
        src: "/piezas/ciudad-manhattan/campana-01-estructura.jpg",
        alt: "Estructura de la campaña y distribución de anuncios",
      },
    ],
  },
  {
    // Sustituye a las dos tarjetas antiguas (fotografía de Palmareca y cobertura
    // de Kepagro): la producción audiovisual es un área transversal, no un
    // cliente. La galería reúne el material de ambas.
    area: "Producción audiovisual y fotografía",
    client: "Variedad de marcas",
    sector: "Seis sectores",
    description:
      "He producido contenido audiovisual para marcas de gastronomía, agro, belleza, salud, real estate e ingeniería. Mi trabajo abarca el proceso completo: definir la narrativa, escribir el guion, dirigir el rodaje en set o en campo, decidir la iluminación y el encuadre, y editar hasta la pieza final. Voy desde la fotografía gastronómica de una carta —donde el estilismo y la luz son el producto— hasta la cobertura de eventos, donde hay que contar una historia con lo que pasa en tiempo real. En todos los casos parto de lo mismo: qué tiene que sentir quien lo ve, y qué decisión visual lo produce.",
    tags: [
      "Dirección de rodaje",
      "Guion",
      "Fotografía",
      "Iluminación",
      "Edición",
      "Reels / TikTok",
    ],
    result: "Narrativa, producción y edición en seis sectores distintos",
    emphasis: "visual",
    pieces: 6,
    // Foto y video alternados: la tarjeta tiene que mostrar el rango, no una
    // tanda de fotos seguida de una tanda de videos. El material sale de la
    // carpeta del área, no de un cliente concreto: aquí conviven gastronomía,
    // agro, salud y servicios.
    media: [
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/copia-de-dsc01228.jpg",
        alt: "Fotografía gastronómica de plato",
      },
      {
        type: "video",
        src: "/piezas/produccion-audiovisual/no-solo-vendemos-maiz.mp4",
        poster: "/piezas/produccion-audiovisual/no-solo-vendemos-maiz.jpg",
        alt: "Pieza de campaña para el sector agro",
      },
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/copia-de-dsc03106.jpg",
        alt: "Coctelería en clave nocturna",
      },
      {
        type: "video",
        src: "/piezas/produccion-audiovisual/te-duermes-sin-cepillarte.mp4",
        poster: "/piezas/produccion-audiovisual/te-duermes-sin-cepillarte.jpg",
        alt: "Pieza de campaña para el sector salud",
      },
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/dsc06003.jpg",
        alt: "Plato de carta con iluminación de estudio",
      },
      {
        type: "video",
        src: "/piezas/produccion-audiovisual/25-gestiona-tu-creditos.mp4",
        poster: "/piezas/produccion-audiovisual/25-gestiona-tu-creditos.jpg",
        alt: "Pieza de campaña para servicios financieros",
      },
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/copia-de-dsc01217.jpg",
        alt: "Plato de carta",
      },
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/copia-de-dsc00908.jpg",
        alt: "Detalle gastronómico con iluminación de estudio",
      },
      {
        type: "image",
        src: "/piezas/produccion-audiovisual/dsc09850.jpg",
        alt: "Detalle gastronómico",
      },
    ],
  },
] as const;

export const filosofia = {
  title: "Mi filosofía: creatividad con estructura y propósito",
  body: [
    "No creo contenido por llenar un calendario.",
    "Cada estrategia nace de entender el negocio, conocer al cliente y encontrar una idea con propósito. Me apoyo en metodologías como storytelling, AIDA, embudos de conversión y otros modelos estratégicos para construir mensajes que conecten y generen resultados.",
  ],
} as const;

// "De qué me encargo": cuatro módulos por capacidad, no lista plana de herramientas.
export const capacidades = [
  {
    title: "Estrategia y marca",
    items: ["Estrategia de marketing", "Branding", "Dirección creativa", "Investigación de mercado"],
  },
  {
    title: "Narrativa y contenido",
    items: ["Copywriting", "Storytelling", "Planificación de contenido", "Email marketing"],
  },
  {
    title: "Producción",
    items: ["Fotografía", "Video", "Edición en CapCut y Premiere", "Dirección de rodaje"],
  },
  {
    title: "Datos y pauta",
    items: [
      "Meta Ads",
      "Análisis de datos",
      "CRM",
      "Segmentación de audiencias",
      "Informes de efectividad",
    ],
  },
] as const;

// Herramientas. Las que tienen `logo` usan el archivo real que trajo Valentina;
// las de Adobe no llegaron, así que van con su monograma sobre
// el color de la marca (en el caso de Adobe el icono oficial es justamente eso).
// Canva y ChatGPT jamás se presentan como "nivel experto".
export const herramientas = [
  { name: "Canva", sigla: "C", bg: "#FFFFFF", fg: "#00C4CC", logo: "/logos/canva-logo-png.png" },
  { name: "Illustrator", sigla: "Ai", bg: "#FFFFFF", fg: "#111111", logo: "/logos/logo-ilustrator.png" },
  { name: "Photoshop", sigla: "Ps", bg: "#FFFFFF", fg: "#111111", logo: "/logos/logo-photoshop.png" },
  { name: "Premiere", sigla: "Pr", bg: "#FFFFFF", fg: "#111111", logo: "/logos/adobe-premiere-logo-png-seeklogo-380789.png" },
  { name: "CapCut", sigla: "Cc", bg: "#FFFFFF", fg: "#000000", logo: "/logos/capcut-logo-png.png" },
  { name: "Meta Business Suite", sigla: "M", bg: "#FFFFFF", fg: "#0081FB", logo: "/logos/logo-meta.png" },
  // Valentina gestionó la web de Alamedas en WordPress.
  { name: "WordPress", sigla: "W", bg: "#FFFFFF", fg: "#21759B", logo: "/logos/wordpress-logo.png" },
  { name: "Notion", sigla: "N", bg: "#FFFFFF", fg: "#111111", logo: "/logos/notion-app-logo.png" },
  { name: "ChatGPT", sigla: "GPT", bg: "#FFFFFF", fg: "#000000", logo: "/logos/chatgpt-logo.png" },
  { name: "Claude", sigla: "Cl", bg: "#FFFFFF", fg: "#D97757", logo: "/logos/claude-icon-logo.png" },
] as const;

// Trayectoria comprimida: función de verificación para RR.HH.
// iClic: sin "fundadora" en el titular; el mérito va en la descripción.
export const trayectoria = [
  {
    period: "Abr 2023 – hoy",
    org: "iClic",
    role: "Estrategia y dirección de marketing",
    detail:
      "Monté y opero una operación de marketing completa: clientes, presupuesto, equipo y resultados.",
  },
  {
    period: "Oct 2021 – Mar 2023",
    org: "Alamedas Centro Comercial",
    role: "Comunicadora social",
    detail:
      "Comunicación corporativa, email marketing masivo, cobertura de eventos, producción audiovisual e informes de efectividad.",
  },
  {
    period: "Abr 2021 – Sep 2021",
    org: "Fox Creativo",
    role: "Community manager",
    detail: "Práctica profesional.",
  },
] as const;

export const educacion = [
  "Comunicación Social y Periodismo — Universidad Pontificia Bolivariana",
  "Formación continua en Platzi y Udemy: marketing digital, herramientas creativas, IA aplicada",
] as const;

// Remate de la sección de proyectos. Antes llevaba a un sitio hecho en Canva:
// se retiró porque sacaba al visitante del sitio propio y su URL y su copy
// ("conoce NUESTRO trabajo", /socialmediamanager) volvían al lenguaje de agencia.
// Ahora abre una ventana dentro de la misma página: nadie sale del sitio.
// `ancho` marca la pieza que no es formato reel: ocupa la fila entera al final.
// `instagram`: enlace a la cuenta del cliente. "#" = pendiente de Valentina;
// mientras siga así, el desplegable lo muestra deshabilitado y NO se publica un
// enlace muerto. Al reemplazarlo por una URL real se activa solo.
export type PiezaSuelta = {
  label: string;
  ancho?: boolean;
  instagram?: string;
} & ({ type: "video"; src: string; poster: string } | { type: "image"; src: string });

const reel = (slug: string, label: string, instagram = "#"): PiezaSuelta => ({
  type: "video",
  label,
  instagram,
  src: `/piezas/conoce-mas/${slug}.mp4`,
  poster: `/piezas/conoce-mas/${slug}.jpg`,
});

export const masTrabajo = {
  title: "¡Conoce más de mi trabajo!",
  body: "Campañas, video y contenido para clientes de otros sectores.",
  cta: "Portafolio completo",
  // El titular de dentro de la ventana es distinto al del banner que la abre.
  tituloVentana: "Más trabajo de 5 sectores diferentes.",
  // Material de la carpeta "ventana conoce más": 20 reels + la pieza ancha final.
  piezas: [
    reel('productos-dia-y-noche', 'Productos día y noche', 'https://www.instagram.com/reel/DU_k5d1kuIW/'),
    reel('madurito-desmechado', 'Madurito desmechado', 'https://www.instagram.com/reel/DbHOHucBZBO/'),
    reel('compra-lo-que-necesitas', 'Compra lo que necesitas', 'https://www.instagram.com/reel/DRAlDlYiTEk/'),
    reel('21-vendiendo-tu-carro', 'Vendiendo tu carro'),
    reel('caipirina-de-maracuya', 'Caipiriña de maracuyá', 'https://www.instagram.com/reel/DOzVphiDU1f/'),
    reel('cancer-de-piel-v2', 'Cáncer de piel', 'https://www.instagram.com/reel/DZkgY7PJ9Ba/'),
    reel('domicilios-el-faro', 'Domicilios El Faro', 'https://www.instagram.com/reel/DSDH9rzAARU/'),
    reel('03-que-calor', 'Qué calor', 'https://www.instagram.com/reel/DAemHf-oi2w/'),
    reel('nutrisem-v1', 'Nutrisem', 'https://www.instagram.com/reel/DMqxBWnpLvS/'),
    reel('que-pedir-por-primera-vez', 'Qué pedir por primera vez', 'https://www.instagram.com/reel/DbOu0XThBXP/'),
    reel('dia-de-control', 'Día de control', 'https://www.instagram.com/reel/DMG1OxWR_Xa/'),
    reel('el-amigo-que-ve-numeros', 'El amigo que ve números', 'https://www.instagram.com/reel/DXflhl9kVOa/'),
    reel('exoses-sesderma-v5', 'Exosomas Sesderma', 'https://www.instagram.com/reel/DSdp7KgDSxn/'),
    reel('la-inchetera-v2', 'La inchetera', 'https://www.instagram.com/reel/DYijLyLM02k/'),
    reel('vendes-tu-carro', 'Vendes tu carro', 'https://www.instagram.com/reel/DQIM4Q9DZcz/'),
    // Formato distinto al resto: va sola, cerrando la ventana.
    {
      type: 'video',
      label: 'Maíz SV 1035',
      src: '/piezas/conoce-mas/maiz-sv-1035.mp4',
      poster: '/piezas/conoce-mas/maiz-sv-1035.jpg',
      ancho: true,
      instagram: 'https://www.instagram.com/reel/DPMY6lkjZpQ/',
    },
    reel('nueva-camara-intraoral', 'Nueva cámara intraoral', 'https://www.instagram.com/reel/DN4FMtxkV6l/'),
    reel('pitch-dondi-record-v2', 'Pinche Récord', 'https://www.instagram.com/reel/DVq2xGYkQV5/'),
    reel('dia-de-grabacion-vlog', 'Día de grabación · vlog', 'https://www.instagram.com/reel/DKx_qfzM-wi/'),
    reel('te-duermes-sin-cepillarte', 'Te duermes sin cepillarte', 'https://www.instagram.com/reel/DNov5tMx0so/'),
    reel('maiz-hibrido-especial', 'Maíz híbrido especial', 'https://www.instagram.com/reel/DNCELoTJGf8/'),
    reel('tu-amigo-el-ganadero', 'Tu amigo el ganadero', 'https://www.instagram.com/reel/DLDdmQ6ynkX/'),
  ] as readonly PiezaSuelta[],
} as const;

export const contacto = {
  title: "¿Buscas a alguien para tu equipo de marketing?",
  subtitle: "Contáctame y agendemos una entrevista",
  ctaPrimary: "Escríbeme por WhatsApp",
  telefono: "321 862 2670",
  // El botón del PDF solo se pinta si `site.cvPdf` tiene ruta: un botón que
  // anuncia "pronto disponible" resta más de lo que suma.
  ctaSecondary: "Descargar mi hoja de vida",
} as const;
