export type ProductDetail = {
  id: string;
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  heroShortTitle: string;
  heroTitle: string;
  heroDescription: string;
  heroNote: string;
  capabilities: Array<{
    title: string;
    description: string;
    highlight?: string;
    flow?: string[];
  }>;
  additionalFeatures: string[];
  regulatoryTitle: string;
  regulatoryText: string;
  ctaTitle: string;
  ctaText: string;
};

export const productDetails: Record<string, ProductDetail> = {
  "as-microfinanzas": {
    id: "as-microfinanzas",
    eyebrow: "SOLUCIÓN ESPECIALIZADA",
    title: "AS Microfinanzas",
    imageSrc: "/brochure/solution-microfinance-3d.png",
    imageAlt: "Ilustración de AS Microfinanzas",
    heroShortTitle: "De la solicitud de crédito al reporte regulatorio.",
    heroTitle: "De la solicitud de crédito al reporte regulatorio, en una sola plataforma.",
    heroDescription:
      "Sistema web integral para instituciones microfinancieras, diseñado considerando la normativa CONAMI y los procesos propios del sector.",
    heroNote:
      "Centraliza la gestión crediticia, cartera, contabilidad, PLA, reportería y generación de archivos regulatorios para PRIM.",
    capabilities: [
      {
        title: "Gestión crediticia",
        description:
          "Cubre el ciclo desde solicitud y evaluación hasta aprobación, desembolso, generación de planes de pago, cobranza y cancelación.",
        flow: ["Solicitud", "Evaluación", "Aprobación", "Desembolso", "Plan de pago", "Cobranza", "Cancelación"],
      },
      {
        title: "Administración de cartera",
        description:
          "Seguimiento de mora, provisiones, clasificación de riesgo, saneados, garantías y gestión operativa de cartera.",
      },
      {
        title: "Generación de archivos para PRIM",
        description:
          "Genera todos los archivos ICC requeridos para el envío de información mediante PRIM, centralizando los datos regulatorios y reduciendo preparación manual.",
        highlight: "Todos los archivos ICC",
      },
      {
        title: "Contabilidad bajo MUC",
        description:
          "Incorpora catálogos y estructura contable basada en el Manual Único de Cuentas (MUC) utilizado por las instituciones reguladas por CONAMI.",
        highlight: "MUC",
      },
      {
        title: "Prevención de Lavado de Activos",
        description: "Incluye perfil de riesgo, matriz de riesgo y búsqueda en listas como parte del módulo PLA.",
      },
      {
        title: "Control, seguridad y reportería",
        description:
          "Gestión de usuarios, roles, permisos y bitácoras de auditoría, junto con reportes gerenciales, operativos, regulatorios, de cartera, colocaciones y mora.",
      },
    ],
    additionalFeatures: [
      "Clientes",
      "Caja",
      "Garantías",
      "Comité de crédito",
      "Cobranza",
      "Parametrización de productos",
      "Sucursales",
      "Agencias",
    ],
    regulatoryTitle: "Diseñado considerando la normativa del sector",
    regulatoryText:
      "AS Microfinanzas ha sido pensado alrededor de la operación real de instituciones microfinancieras y de los requerimientos asociados a la normativa CONAMI, gestión de riesgo crediticio y PLA.",
    ctaTitle: "¿Quieres conocer AS Microfinanzas en funcionamiento?",
    ctaText: "Solicita una demostración y conoce cómo puede adaptarse a la operación de tu institución.",
  },
};
