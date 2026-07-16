/**
 * Datos del sitio — CV / landing de Valentina García Florez.
 * Contenido real extraído del brief. El DISEÑO se rehace desde cero;
 * esto es solo la fuente de contenido tipada para las secciones.
 */

export const site = {
  name: "Valentina García Florez",
  role: "Estratega de Marketing Digital · Social Media Manager",
  location: "Montería, Colombia",
  availability: "Remoto, freelance o presencial",
  email: "valentinagaf-21@hotmail.com",
  phone: "321 862 2670",
  // TODO: dominio final una vez comprado (ej. https://valentinagarcia.co)
  url: "https://valentina-cv.vercel.app",

  // Personalidad / dirección de marca (para tono y copy, no para pegar literal)
  brand: {
    personality: [
      "divertida",
      "cercana",
      "creativa",
      "cálida",
      "tecnológica",
      "extrovertida",
      "rebelde",
      "minimalista",
    ],
    perception:
      "Profesional, creativa, con ideas nuevas y diferentes; que dice lo que piensa sin miedo.",
  },
} as const;

export const about = {
  headline:
    "Comunicadora social y periodista. Estrategia, cámara, edición y métricas.",
  body: `Soy comunicadora social y periodista con más de cuatro años moviéndome entre la estrategia, la cámara, el editor de video y las métricas. He sido, en distintos momentos, la que piensa la idea, la que la ejecuta y la que mide si funcionó — y por eso sé exactamente dónde aporto más valor.

Hoy busco un rol donde pueda enfocar esa energía en la estrategia y el contenido, dentro de un equipo real: gente con quien discutir ideas, repartir el trabajo y crecer una marca sin hacerlo todo yo sola.`,
} as const;

// Orden cronológico real — importa para el timeline.
export const experience = [
  {
    period: "Abr 2021 – Sep 2021",
    role: "Community Manager",
    org: "Fox Creativo",
    note: "Práctica profesional",
    summary:
      "Creación de contenido y piezas publicitarias para redes; edición de video; estrategias de captación de seguidores.",
  },
  {
    period: "Oct 2021 – Mar 2023",
    role: "Comunicadora Social",
    org: "Alamedas Centro Comercial",
    summary:
      "Segmentación de bases de datos y email marketing masivo; cobertura fotográfica/audiovisual de eventos; informes de efectividad.",
  },
  {
    period: "Abr 2023 – Actualidad",
    role: "Fundadora y Estratega de Marketing Digital",
    org: "iClic (agencia independiente)",
    summary:
      "Dirección estratégica de marca para distintos clientes; creación integral de contenido (foto, video, copy); gestión de pauta en Meta Ads.",
  },
] as const;
// Nota: sin marcas/clientes específicos ni logros atribuidos a una marca (decisión de Valentina).

export const education = [
  {
    title: "Comunicación Social y Periodismo",
    org: "Universidad Pontificia Bolivariana",
    detail:
      "Logística SIMCUM 2019 · Congreso Épico en Eafit · Proyecto Reciclandoando",
  },
  {
    title: "Formación continua",
    org: "Udemy · Platzi",
    detail: "Marketing digital, herramientas creativas, IA aplicada",
  },
] as const;

export const skills = {
  expert: [
    "Canva",
    "CapCut",
    "Premiere Pro",
    "Meta Ads",
    "Meta Business Suite",
    "Notion",
    "ChatGPT",
  ],
  intermediate: ["Illustrator", "Photoshop", "Google Analytics"],
} as const;

// Proyectos por categoría, sin nombres de marca (decisión explícita).
export const projects = [
  { category: "Estrategia de contenido para redes sociales" },
  { category: "Email marketing (segmentación y campañas masivas)" },
  { category: "Producción audiovisual (foto y video)" },
  { category: "Gestión de pauta digital (Meta Ads)" },
] as const;
