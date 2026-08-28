import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/data/industries";

const industryImages = [
  ["/brochure/sector-coop-clean.png", "Ilustración de cooperativas"],
  ["/brochure/sector-microfinance-clean.png", "Ilustración de microfinancieras"],
  ["/brochure/sector-pymes-clean.png", "Ilustración de pymes"],
  ["/brochure/sector-private-clean.png", "Ilustración de empresas privadas"],
  ["/brochure/financial-bank-clean.png", "Ilustración de instituciones"],
] as const;

export function Industries() {
  return (
    <section id="sectores" className="industries-section">
      <Container>
        <Reveal className="industries-header">
          <p className="eyebrow">SECTORES CON EXPERIENCIA</p>
          <h2>Clientes que atendemos</h2>
        </Reveal>
        <div className="industry-index">
          {industries.map((industry, index) => (
            <Reveal key={industry} className="industry-row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="industry-icon">
                <Image
                  src={industryImages[index]?.[0] ?? "/brochure/sector-private-clean.png"}
                  alt={industryImages[index]?.[1] ?? `Ilustración de ${industry}`}
                  width={96}
                  height={96}
                />
              </div>
              <strong>{industry}</strong>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
