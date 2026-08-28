"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductDetailOverlay } from "@/components/ui/ProductDetailOverlay";
import { Reveal } from "@/components/ui/Reveal";
import { productDetails, type ProductDetail } from "@/data/productDetails";

const primarySolutions = [
  {
    title: "AS Microfinanzas",
    description: "Sistema web integral para instituciones microfinancieras, diseñado considerando la normativa CONAMI.",
    imageSrc: "/brochure/solution-microfinance-3d.png",
    imageAlt: "Ilustración de AS Microfinanzas",
    tags: ["Créditos", "Cartera", "PRIM", "PLA", "MUC", "Reportes"],
    detailId: "as-microfinanzas",
  },
  {
    title: "AS Cooperativas",
    description: "Plataforma completa para la gestión administrativa y financiera de cooperativas.",
    imageSrc: "/brochure/solution-coop-3d.png",
    imageAlt: "Ilustración de AS Cooperativas",
    tags: ["Asociados", "Aportes", "Préstamos", "Contabilidad"],
  },
] as const;

const secondarySolutions = [
  {
    title: "AS Planilla",
    description: "Módulo administrativo para la gestión de nómina y recursos humanos.",
    imageSrc: "/brochure/solution-payroll.png",
    imageAlt: "Ilustración de AS Planilla",
  },
  {
    title: "AS Contabilidad",
    description: "Módulo contable para registrar, analizar y reportar la información financiera.",
    imageSrc: "/brochure/solution-accounting.png",
    imageAlt: "Ilustración de AS Contabilidad",
  },
  {
    title: "Facturación e Inventario",
    description: "Control de ventas, inventarios y facturación para una operación eficiente.",
    imageSrc: "/brochure/solution-billing-inventory.png",
    imageAlt: "Ilustración de facturación e inventario",
  },
  {
    title: "Software a medida",
    description: "Desarrollo de soluciones personalizadas según las necesidades de cada cliente.",
    imageSrc: "/brochure/solution-custom.png",
    imageAlt: "Ilustración de software a medida",
  },
] as const;

const modularAttributes = [
  "Flexibles y escalables",
  "Integrables entre sí",
  "Seguras y confiables",
] as const;

export function MainSolutions() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const microfinanceButtonRef = useRef<HTMLButtonElement>(null);

  const openProductDetail = (detailId: string) => {
    setSelectedProduct(productDetails[detailId]);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="soluciones" className="main-solutions solutions-showcase">
      <Container>
        <Reveal className="solutions-showcase-lead">
          <p className="eyebrow">SOLUCIONES PRINCIPALES</p>
          <h2>
            Soluciones <span>que se adaptan a tu operación</span>
          </h2>
          <p>
            En AlmaSoft ofrecemos soluciones especializadas y modulares para distintos tipos de organización,
            optimizando procesos, centralizando información y potenciando tu gestión.
          </p>
        </Reveal>

        <Reveal className="primary-solutions-grid">
          {primarySolutions.map((solution) => (
            <article key={solution.title} className="primary-solution-card">
              <div className="primary-solution-media">
                <Image src={solution.imageSrc} alt={solution.imageAlt} width={420} height={420} />
              </div>
              <div className="primary-solution-copy">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <div className="solution-chip-row" aria-label={`Funciones de ${solution.title}`}>
                  {solution.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {"detailId" in solution ? (
                  <button
                    ref={microfinanceButtonRef}
                    type="button"
                    className="solution-detail-trigger"
                    onClick={() => openProductDetail(solution.detailId)}
                  >
                    Conocer solución <span aria-hidden="true">→</span>
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="secondary-solutions-grid">
          {secondarySolutions.map((solution) => (
            <article key={solution.title} className="secondary-solution-card">
              <div className="secondary-solution-icon">
                <Image src={solution.imageSrc} alt={solution.imageAlt} width={58} height={58} />
              </div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <span className="solution-arrow" aria-hidden="true">
                →
              </span>
            </article>
          ))}
        </Reveal>

        <Reveal className="modular-info-band">
          <div className="modular-info-icon">
            <Image src="/brochure/modular-platform.png" alt="Ilustración de implementación modular" width={76} height={76} />
          </div>
          <div className="modular-info-copy">
            <h3>Implementación modular</h3>
            <p>
              Nuestras soluciones funcionan por módulos. Puedes implementar solo lo que necesitas y escalar cuando tu
              organización lo requiera, de forma independiente o integrada.
            </p>
          </div>
          <div className="modular-attributes">
            {modularAttributes.map((attribute, index) => (
              <div key={attribute} className="modular-attribute">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{attribute}</strong>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="solutions-showcase-actions">
          <Button href="#contacto">Solicitar demostración</Button>
          <Button href="#soluciones" variant="secondary">
            Ver soluciones <span aria-hidden="true">→</span>
          </Button>
        </Reveal>
      </Container>
      <ProductDetailOverlay product={selectedProduct} onClose={closeProductDetail} returnFocusRef={microfinanceButtonRef} />
    </section>
  );
}
