"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from "react";
import type { ProductDetail } from "@/data/productDetails";

type ProductDetailOverlayProps = {
  product: ProductDetail | null;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const tabs = [
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
] as const;

type ProductTabId = (typeof tabs)[number]["id"];

export function ProductDetailOverlay({ product, onClose, returnFocusRef }: ProductDetailOverlayProps) {
  const [activeTab, setActiveTab] = useState<ProductTabId>("credit");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusNode = returnFocusRef?.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusNode?.focus();
    };
  }, [onClose, product, returnFocusRef]);

  useEffect(() => {
    if (product) setActiveTab("credit");
  }, [product]);

  if (!product) return null;

  const activeTabContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const handleContactClick = () => {
    onClose();
    window.requestAnimationFrame(() => {
      document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, tabIndex: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = tabIndex;

    if (event.key === "ArrowRight") nextIndex = (tabIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const renderActiveTab = () => {
    return (
      <div className="product-module-view">
        <div className="product-module-copy">
          <span>{activeTabContent.eyebrow}</span>
          <h3>{activeTabContent.title}</h3>
          <p>{activeTabContent.description}</p>

          {"highlight" in activeTabContent && activeTabContent.highlight ? (
            <strong>{activeTabContent.highlight}</strong>
          ) : null}

        </div>
        <div className="product-module-details">
          {"benefitGroups" in activeTabContent ? (
            <div className="product-benefit-groups">
              {activeTabContent.benefitGroups.map((group) => (
                <div key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="product-benefits">
              {activeTabContent.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          )}

          {"flow" in activeTabContent && activeTabContent.flow ? (
            <div className="product-flow-line" aria-label="Recorrido del crédito">
              {activeTabContent.flow.map((step) => (
                <em key={step}>{step}</em>
              ))}
            </div>
          ) : null}

        </div>
      </div>
    );
  };

  return (
    <div className="product-overlay-root" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="product-overlay-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${product.id}-title`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="product-overlay-header">
          <div>
            <p>{product.eyebrow}</p>
            <h2 id={`${product.id}-title`}>{product.title}</h2>
          </div>
          <button ref={closeButtonRef} type="button" aria-label="Cerrar detalle de producto" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="product-overlay-body">
          <section className="product-detail-summary">
            <div className="product-detail-hero-copy">
              <h3>{product.heroShortTitle}</h3>
              <p>{product.heroDescription}</p>
            </div>
          </section>

          <section className="product-tabs-shell">
            <div className="product-tab-list" role="tablist" aria-label={`Áreas de ${product.title}`}>
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  id={`${product.id}-${tab.id}-tab`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${product.id}-${tab.id}-panel`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id={`${product.id}-${activeTab}-panel`}
              className="product-tab-panel"
              role="tabpanel"
              aria-labelledby={`${product.id}-${activeTab}-tab`}
              tabIndex={0}
            >
              {renderActiveTab()}
            </div>

            <p className="product-includes-line">
              <strong>También incluye:</strong> Clientes · Caja · Garantías · Comité de crédito · Cobranza ·
              Parametrización · Sucursales · Agencias
            </p>
          </section>
        </div>

        <footer className="product-overlay-cta">
          <div>
            <p>Diseñado considerando normativa CONAMI, riesgo crediticio y PLA.</p>
          </div>
          <button type="button" onClick={handleContactClick}>
            Solicitar demostración
          </button>
        </footer>
      </div>
    </div>
  );
}
