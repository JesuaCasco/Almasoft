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

export function ProductDetailOverlay({ product, onClose, returnFocusRef }: ProductDetailOverlayProps) {
  const [activeTab, setActiveTab] = useState("");
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
    if (product) setActiveTab(product.tabs[0].id);
  }, [product]);

  if (!product) return null;

  const tabs = product.tabs;
  const activeTabContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const activeTabId = activeTabContent.id;

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
          {activeTabContent.benefitGroups ? (
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
            <div className="product-flow-line" aria-label={`Recorrido de ${activeTabContent.label.toLowerCase()}`}>
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
                  aria-selected={activeTabId === tab.id}
                  aria-controls={`${product.id}-${tab.id}-panel`}
                  tabIndex={activeTabId === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id={`${product.id}-${activeTabId}-panel`}
              className="product-tab-panel"
              role="tabpanel"
              aria-labelledby={`${product.id}-${activeTabId}-tab`}
              tabIndex={0}
            >
              {renderActiveTab()}
            </div>

            {product.additionalFeatures.length > 0 ? (
              <p className="product-includes-line">
                <strong>También incluye:</strong> {product.additionalFeatures.join(" · ")}
              </p>
            ) : null}
          </section>
        </div>

        <footer className="product-overlay-cta">
          <div>
            <p>{product.footerText}</p>
          </div>
          <button type="button" onClick={handleContactClick}>
            Solicitar demostración
          </button>
        </footer>
      </div>
    </div>
  );
}
