import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    label: "Procesos manuales",
    imageSrc: "/brochure/problem-manual.png",
    imageAlt: "Ilustración de procesos manuales",
  },
  {
    label: "Sistemas obsoletos",
    imageSrc: "/brochure/problem-obsolete.png",
    imageAlt: "Ilustración de sistemas obsoletos",
  },
  {
    label: "Falta de reportes",
    imageSrc: "/brochure/problem-reports.png",
    imageAlt: "Ilustración de falta de reportes",
  },
  {
    label: "Duplicidad de trabajo",
    imageSrc: "/brochure/problem-duplicate.png",
    imageAlt: "Ilustración de duplicidad de trabajo",
  },
  {
    label: "Poca trazabilidad",
    imageSrc: "/brochure/problem-traceability.png",
    imageAlt: "Ilustración de poca trazabilidad",
  },
] as const;

export function Problems() {
  return (
    <section className="problems-section">
      <Container>
        <Reveal>
          <SectionHeading
            label="PROBLEMAS QUE RESOLVEMOS"
            title="Problemas que la tecnología debería dejar atrás."
            text="Muchas organizaciones crecen con procesos que terminan fragmentados, manuales o difíciles de controlar. AlmaSoft desarrolla soluciones para reducir estos puntos de fricción."
            className="problems-heading"
          />
        </Reveal>
        <Reveal className="problems-strip">
          {problems.map((problem, index) => (
            <div key={problem.label} className="problem-item">
              <div className="problem-image-frame">
                <Image src={problem.imageSrc} alt={problem.imageAlt} width={160} height={160} />
              </div>
              <span className="problem-number">{String(index + 1).padStart(2, "0")}</span>
              <strong>{problem.label}</strong>
            </div>
          ))}
        </Reveal>
        <Reveal className="problems-result">
          Transformamos estos puntos de fricción en procesos más claros, información organizada y herramientas adaptadas
          a la operación.
        </Reveal>
      </Container>
    </section>
  );
}
