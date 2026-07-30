/**
 * Datos del sitio — v2, según especificación de Valentina (jul 2026).
 * Textos DEFINITIVOS del documento: no redactar nada nuevo.
 * Objetivo único: conseguir empleo in-house en una marca grande (estrategia/dirección de marketing).
 * Todo el copy en PRIMERA persona. Cinco años de experiencia, no cuatro.
 */

export const site = {
  name: "Valentina García Flórez",
  role: "Social Media Manager · Content Marketing",
  location: "Montería, Colombia",
  email: "valentinagaf-21@hotmail.com", // TODO v3: correo con dominio propio
  whatsapp: "https://wa.me/573218622670",
  linkedin: "", // TODO: pendiente de Valentina
  // TODO: dominio propio (ej. valentinagarcia.co) — actualizar también astro.config.mjs
  url: "https://valentina-cv.vercel.app",
} as const;

export const hero = {
  hook: "Las marcas no necesitan más contenido. Necesitan mejores ideas.",
  intro: [
    "No llegué al marketing por las redes sociales, llegué porque me apasiona entender cómo piensan las marcas y las personas.",
    "Soy Comunicadora Social y Periodista, especializada en estrategia de marketing y contenido. Disfruto transformar ideas en planes con propósito, construir marcas con personalidad y crear estrategias que generen resultados, no solo publicaciones.",
  ],
  cta: "Explorar mi trabajo",
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
  client: string;
  sector: string;
  role: string;
  description: string;
  tags: readonly string[];
  result: string;
  /** "destacada": tratamiento visual mayor (04 Ciudad Manhattan). "visual": la más fotográfica (05 Palmareca gastro). */
  emphasis?: "destacada" | "visual";
  /** Cantidad de placeholders mientras no haya material real. */
  pieces: number;
  /** Piezas reales ya optimizadas en public/piezas/. Si existe, reemplaza a los placeholders. */
  media?: readonly Media[];
  /** Instagram del cliente. El botón aparece solo si hay enlace. */
  instagram?: string;
}

// Seis tarjetas, en este orden. Palmareca aparece dos veces con roles distintos,
// separadas a propósito para que no se lean seguidas.
export const projects: readonly Project[] = [
  {
    client: "Palmareca",
    sector: "Gastrobar",
    role: "Directora creativa & estratega de marca",
    description:
      "Lideré la transición forzada de nombre (de La Pérgola a Palmareca), protegiendo el ADN de la marca. Dirigí la identidad visual exigiendo elegancia en “modo noche”, reescribí el tono de comunicación para no perder la “sabrosura”, diseñé piezas clave como la gran reinauguración y ejecuté la pauta en Meta Ads optimizando campañas de tráfico vs. interacción.",
    tags: ["Branding", "Dirección de arte", "Meta Ads", "Copywriting"],
    instagram: "https://www.instagram.com/palmarecamtr/",
    result: "Conflicto de marca resuelto y rebranding premium en menos de 30 días",
    pieces: 4,
    media: [
      {
        type: "image",
        src: "/piezas/palmareca-rebranding/menu-palmareca-v3-1.jpg",
        alt: "Portada del menú de Palmareca",
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
        type: "image",
        src: "/piezas/palmareca-rebranding/menu-palmareca-v3-2.jpg",
        alt: "Página interior del menú de Palmareca",
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
    client: "Dondi",
    sector: "Plataforma transaccional",
    role: "Directora creativa & arquitecta de marca",
    description:
      "Diseñé desde cero la arquitectura digital y el lenguaje para validar la compra de chance por WhatsApp frente a los puntos físicos. Creé la “Dieta Blanca” (sustituyendo palabras de alto riesgo para evitar bloqueos de Meta Ads), estructuré guiones bajo el framework Hook-Retain-Reward y diseñé el flujo de conversión que humanizó la marca a través de sus fundadores.",
    tags: [
      "Estrategia de lanzamiento",
      "Política de Meta Ads",
      "Video marketing",
      "Embudos de conversión",
    ],
    result: "Cero bloqueos de cuenta publicitaria y flujo 100% convertido a WhatsApp",
    instagram: "https://www.instagram.com/somosdondi/",
    pieces: 4,
    media: [
      {
        type: "video",
        src: "/piezas/dondi/como-jugar-chance.mp4",
        poster: "/piezas/dondi/como-jugar-chance.jpg",
        alt: "Video: cómo jugar chance por WhatsApp",
      },
      {
        type: "video",
        src: "/piezas/dondi/plan-referidos.mp4",
        poster: "/piezas/dondi/plan-referidos.jpg",
        alt: "Video: plan de referidos de Dondi",
      },
      {
        type: "video",
        src: "/piezas/dondi/no-mas-chances-perdidos.mp4",
        poster: "/piezas/dondi/no-mas-chances-perdidos.jpg",
        alt: "Video: no más chances perdidos",
      },
      {
        type: "video",
        src: "/piezas/dondi/paso-a-paso-para-jugar.mp4",
        poster: "/piezas/dondi/paso-a-paso-para-jugar.jpg",
        alt: "Video: paso a paso para jugar",
      },
    ],
  },
  {
    client: "S Ingeniería",
    sector: "App RTC",
    role: "Directora de producción & guionista",
    description:
      "El reto era explicar de forma atractiva a un panel de inversionistas cómo una app con inteligencia artificial (SIA) resuelve el caos operativo del mantenimiento técnico en campo. Diseñé el guion bajo una narrativa problema-solución, dirigí el rodaje en localización real y supervisé la edición para convertir procesos complejos en un video pitch B2B de alto impacto.",
    tags: ["Guionismo B2B", "Dirección de rodaje", "Edición audiovisual", "Video para pitch"],
    instagram: "https://www.instagram.com/singenieriasas/",
    result: "Video pitch seleccionado para presentación ante inversionistas",
    pieces: 3,
    media: [
      {
        type: "video",
        src: "/piezas/s-ingenieria/artici-rtc-video-v2.mp4",
        poster: "/piezas/s-ingenieria/artici-rtc-video-v2.jpg",
        alt: "Video pitch de la app RTC para inversionistas",
        fit: "contain",
      },
    ],
  },
  {
    client: "Ciudad Manhattan",
    sector: "Real estate & hospitality",
    role: "Especialista en Meta Ads & media buyer",
    description:
      "Diseñé y ejecuté la campaña publicitaria multicanal (motel, hotel y bono gasolina) para la temporada del Mes de la Mujer. Armé la pauta orientada a la apertura de conversaciones directas por mensaje, testeando formatos en Stories y Multiposts con segmentación flexible para maximizar la relevancia creativa.",
    tags: [
      "Meta Ads Manager",
      "Anuncios conversacionales",
      "Analítica",
      "Copywriting promocional",
    ],
    result: "199 conversaciones directas a $353 COP por lead",
    instagram: "https://www.instagram.com/motelmanhattanc/",
    emphasis: "destacada", // el dato más contundente del portafolio
    pieces: 3,
    media: [
      {
        type: "duo",
        src: [
          "/piezas/ciudad-manhattan/slide-01.jpg",
          "/piezas/ciudad-manhattan/slide-08.jpg",
        ],
        alt: "Reporte de campaña Meta Ads: portada y enfoque estratégico",
      },
      {
        type: "duo",
        src: [
          "/piezas/ciudad-manhattan/slide-09.jpg",
          "/piezas/ciudad-manhattan/slide-13.jpg",
        ],
        alt: "Distribución por edades y lectura estratégica de resultados",
      },
    ],
  },
  {
    client: "Palmareca",
    sector: "Gastronomía & coctelería",
    role: "Fotógrafa & directora de arte",
    description:
      "Elevé la presencia visual de los nuevos platos y cócteles de la carta. Conceptualicé la iluminación, el estilismo de alimentos y la paleta de color nocturna para capturar la esencia festiva y gastronómica del lugar, logrando imágenes con alto apetito visual que comunican la experiencia premium del sitio.",
    tags: ["Fotografía gastronómica", "Dirección de arte", "Iluminación", "Food styling"],
    instagram: "https://www.instagram.com/palmarecamtr/",
    result: "Banco visual oficial, usado en menú impreso y pauta digital",
    emphasis: "visual", // la más visual de las seis; fotografía propia
    pieces: 6,
    media: [
      {
        type: "image",
        src: "/piezas/palmareca-fotos/copia-de-dsc01228.jpg",
        alt: "Fotografía gastronómica de plato de Palmareca",
      },
      {
        type: "image",
        src: "/piezas/palmareca-fotos/copia-de-dsc05253.jpg",
        alt: "Coctelería de Palmareca en clave nocturna",
      },
      {
        type: "image",
        src: "/piezas/palmareca-fotos/copia-de-dsc01217.jpg",
        alt: "Plato de la carta de Palmareca",
      },
      {
        type: "image",
        src: "/piezas/palmareca-fotos/copia-de-dsc00908.jpg",
        alt: "Detalle gastronómico con iluminación de estudio",
      },
      {
        type: "image",
        src: "/piezas/palmareca-fotos/copia-de-dsc03106.jpg",
        alt: "Cóctel de la carta de Palmareca",
      },
    ],
  },
  {
    client: "Kepagro",
    sector: "Insumos agrícolas",
    role: "Productora audiovisual & content creator",
    description:
      "Diseñé una estrategia de cobertura de eventos (serie de 5 a 8 entregas) para modernizar la imagen del sector agro. Rompí el esquema aburrido del video corporativo aplicando estructuras de storytelling, voz en off, ganchos de alto impacto y edición dinámica en tiempo real para conectar de forma humana y cercana con los agricultores.",
    tags: ["Cobertura de eventos", "Storytelling", "Producción en campo", "Reels / TikTok"],
    instagram: "https://www.instagram.com/kepagrosas/",
    result: "Miles de reproducciones orgánicas y humanización de una marca B2B",
    pieces: 4,
    media: [
      {
        type: "video",
        src: "/piezas/kepagro/evento-1-lanzamiento-cotorra.mp4",
        poster: "/piezas/kepagro/evento-1-lanzamiento-cotorra.jpg",
        alt: "Cobertura del lanzamiento en Cotorra",
      },
      {
        type: "video",
        src: "/piezas/kepagro/evento-chinu.mp4",
        poster: "/piezas/kepagro/evento-chinu.jpg",
        alt: "Cobertura del evento en Chinú",
      },
      {
        type: "video",
        src: "/piezas/kepagro/bingo-patillero-final.mp4",
        poster: "/piezas/kepagro/bingo-patillero-final.jpg",
        alt: "Cobertura del bingo patillero",
      },
      {
        type: "video",
        src: "/piezas/kepagro/evento-san-carlos-v1.mp4",
        poster: "/piezas/kepagro/evento-san-carlos-v1.jpg",
        alt: "Cobertura del evento en San Carlos",
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
    title: "Números y pauta",
    items: ["Meta Ads", "Análisis de métricas", "Informes de efectividad"],
  },
] as const;

// Herramientas con sigla para las fichas tipo icono.
// Canva y ChatGPT jamás se presentan como "nivel experto".
export const herramientas = [
  { name: "Canva", sigla: "Cv" },
  { name: "Illustrator", sigla: "Ai" },
  { name: "Photoshop", sigla: "Ps" },
  { name: "Premiere", sigla: "Pr" },
  { name: "CapCut", sigla: "Cc" },
  { name: "Meta Business Suite", sigla: "M" },
  { name: "Google Analytics", sigla: "GA" },
  { name: "Notion", sigla: "N" },
  { name: "ChatGPT", sigla: "GPT" },
  { name: "Claude", sigla: "Cl" },
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

// Portafolio ampliado (site público hecho en Canva) — más clientes y videos.
export const portafolioAmpliado = {
  url: "https://valentinagarcia-socialmediamanager.my.canva.site/conoce-nuestro-trabajo",
  title: "¿Quieres ver más?",
  body: "Este es solo un recorte. Tengo más campañas, videos y piezas de otros clientes esperándote.",
  cta: "Conoce todo mi trabajo",
} as const;

export const contacto = {
  title: "¿Estás armando equipo?",
  subtitle: "Cuéntame qué marca es y qué necesitan. Respondo el mismo día.",
  ctaPrimary: "Escríbeme por WhatsApp",
  ctaSecondary: "Descargar mi hoja de vida en PDF", // TODO: PDF pendiente — muestra aviso "pronto disponible"
} as const;
