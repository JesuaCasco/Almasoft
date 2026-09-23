export type ProductTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  highlight?: string;
  flow?: string[];
} & (
  | { benefits: string[]; benefitGroups?: never }
  | { benefits?: never; benefitGroups: Array<{ title: string; items: string[] }> }
);

export type ProductDetail = {
  id: string;
  eyebrow: string;
  title: string;
  heroShortTitle: string;
  heroDescription: string;
  tabs: [ProductTab, ...ProductTab[]];
  additionalFeatures: string[];
  footerText: string;
};

const microfinanceTabs = [
  {
    id: "credit",
    label: "Crédito",
    eyebrow: "01 · CRÉDITO",
    title: "Todo el ciclo crediticio en un solo flujo.",
    description:
      "Gestiona el crédito desde la solicitud y evaluación hasta la aprobación, desembolso, plan de pagos, cobranza y cancelación.",
    benefits: [
      "Solicitud y evaluación centralizadas",
      "Desembolso y plan de pagos",
      "Cobranza y cancelación dentro del mismo flujo",
    ],
    flow: ["Solicitud", "Evaluación", "Aprobación", "Desembolso", "Cobranza"],
  },
  {
    id: "portfolio",
    label: "Cartera",
    eyebrow: "02 · CARTERA",
    title: "Control de cartera para actuar a tiempo.",
    description:
      "Consulta y administra la situación de la cartera con información de mora, provisiones, clasificación de riesgo, saneados, garantías y cobranza.",
    benefits: [
      "Seguimiento de mora y cartera",
      "Provisiones y clasificación de riesgo",
      "Saneados, garantías y cobranza",
    ],
  },
  {
    id: "prim",
    label: "PRIM",
    eyebrow: "03 · PRIM",
    title: "Información regulatoria preparada desde la operación.",
    description:
      "Genera todos los archivos ICC requeridos para el envío de información mediante PRIM utilizando la información centralizada en el sistema.",
    benefits: [
      "Generación completa de archivos ICC",
      "Menos preparación manual",
      "Información estructurada desde la operación",
    ],
    highlight: "Todos los archivos ICC requeridos",
  },
  {
    id: "muc",
    label: "Contabilidad",
    eyebrow: "04 · CONTABILIDAD",
    title: "Estructura contable basada en el MUC.",
    description:
      "Incorpora catálogos y estructura contable basada en el Manual Único de Cuentas utilizado por las instituciones reguladas por CONAMI.",
    benefits: [
      "Catálogos contables",
      "Estructura basada en MUC",
      "Integración con la información financiera",
    ],
  },
  {
    id: "pla",
    label: "PLA",
    eyebrow: "05 · PLA",
    title: "Herramientas para apoyar la gestión de riesgo PLA.",
    description:
      "El módulo PLA incorpora funcionalidades para evaluar y consultar información asociada al riesgo de clientes.",
    benefits: ["Perfil de riesgo", "Matriz de riesgo", "Búsqueda en listas"],
  },
  {
    id: "security",
    label: "Control",
    eyebrow: "06 · CONTROL",
    title: "Trazabilidad y reportería para diferentes niveles de la organización.",
    description:
      "Controla el acceso al sistema y consulta información operativa, gerencial y regulatoria desde una sola plataforma.",
    benefitGroups: [
      { title: "Seguridad", items: ["Usuarios", "Roles", "Permisos", "Bitácoras de auditoría"] },
      {
        title: "Reportería",
        items: ["Reportes gerenciales", "Operativos", "Regulatorios", "Cartera", "Colocaciones", "Mora"],
      },
    ],
  },
] satisfies [ProductTab, ...ProductTab[]];

export const productDetails: Record<string, ProductDetail> = {
  "as-microfinanzas": {
    id: "as-microfinanzas",
    eyebrow: "SOLUCIÓN ESPECIALIZADA",
    title: "AS Microfinanzas",
    heroShortTitle: "De la solicitud de crédito al reporte regulatorio.",
    heroDescription: "Sistema web integral para instituciones microfinancieras, diseñado considerando la normativa CONAMI y los procesos propios del sector.",
    tabs: microfinanceTabs,
    additionalFeatures: ["Clientes", "Caja", "Garantías", "Comité de crédito", "Cobranza", "Parametrización", "Sucursales", "Agencias"],
    footerText: "Diseñado considerando normativa CONAMI, riesgo crediticio y PLA.",
  },
  "as-cooperativas": {
    id: "as-cooperativas",
    eyebrow: "SOLUCIÓN ESPECIALIZADA",
    title: "AS Cooperativas de Ahorro y Crédito",
    heroShortTitle: "La gestión de tus asociados y sus operaciones, en un solo lugar.",
    heroDescription: "Plataforma para la gestión administrativa y financiera de cooperativas de ahorro y crédito: asociados, aportes, préstamos y contabilidad.",
    tabs: [
      {
        id: "members", label: "Asociados", eyebrow: "01 · ASOCIADOS",
        title: "Tus asociados, en el centro de la gestión.",
        description: "Organiza la información de los asociados para apoyar su atención y la administración de sus operaciones en la cooperativa.",
        benefits: ["Información de asociados centralizada", "Consulta de la información de cada asociado", "Apoyo a la gestión administrativa"],
      },
      {
        id: "contributions", label: "Aportes", eyebrow: "02 · APORTES",
        title: "Una visión clara de los aportes de tus asociados.",
        description: "Administra la información de los aportes y sus movimientos para mantener un seguimiento organizado de la participación de los asociados.",
        benefits: ["Gestión de aportes por asociado", "Consulta de movimientos de aportes", "Información organizada para su seguimiento"],
      },
      {
        id: "loans", label: "Préstamos", eyebrow: "03 · PRÉSTAMOS",
        title: "Gestión de préstamos al servicio de tus asociados.",
        description: "Organiza la información de los préstamos de la cooperativa y facilita el seguimiento de las operaciones de crédito de sus asociados.",
        benefits: ["Administración de préstamos", "Información de crédito por asociado", "Seguimiento de operaciones"],
      },
      {
        id: "accounting", label: "Contabilidad", eyebrow: "04 · CONTABILIDAD",
        title: "Información contable para la gestión cooperativa.",
        description: "Apoya la administración financiera de la cooperativa con información contable organizada para consultar y dar seguimiento a su operación.",
        benefits: ["Gestión contable", "Consulta de información financiera", "Apoyo al seguimiento administrativo"],
      },
    ],
    additionalFeatures: [],
    footerText: "Gestión administrativa y financiera para cooperativas de ahorro y crédito.",
  },
};
