import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FinancialKnowledge() {
  return (
    <section className="financial-section">
      <Container>
        <Reveal className="financial-panel">
          <div className="financial-visual" aria-hidden="true">
            <div className="financial-emblem">
              <Image src="/brochure/financial-bank.png" alt="Ilustración del sector financiero" width={190} height={190} />
            </div>
          </div>
          <div className="financial-copy">
            <p className="eyebrow">CONOCIMIENTO DEL SECTOR FINANCIERO</p>
            <h2>Experiencia para operaciones reguladas y exigentes.</h2>
            <p>
              Contamos con experiencia en microfinancieras y cooperativas, con conocimiento de normativas CONAMI y
              SIBOIF, además de un enfoque sólido en temas de PLA.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
