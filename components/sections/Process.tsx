import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workStages } from "@/data/solutions";

const processImages = [
  ["/brochure/process-visit-clean.png", "Ilustración de visita y levantamiento"],
  ["/brochure/process-analysis-clean.png", "Ilustración de análisis del flujo de trabajo"],
  ["/brochure/process-demo-clean.png", "Ilustración de demostración y propuesta"],
  ["/brochure/process-implementation-clean.png", "Ilustración de personalización e implementación"],
  ["/brochure/process-support-clean.png", "Ilustración de acompañamiento y soporte"],
] as const;

export function Process() {
  return (
    <section className="process-section">
      <Container>
        <Reveal>
          <SectionHeading
            label="NUESTRO ENFOQUE DE TRABAJO"
            title="Un proceso claro desde el levantamiento hasta el soporte."
          />
        </Reveal>
        <div className="process-track">
          {workStages.map(([number, title, text], index) => (
            <Reveal key={number} className="process-step">
              <span>{number}</span>
              <div className="process-icon">
                <Image
                  src={processImages[index]?.[0] ?? "/brochure/process-implementation-clean.png"}
                  alt={processImages[index]?.[1] ?? `Ilustración de ${title}`}
                  width={88}
                  height={88}
                />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
