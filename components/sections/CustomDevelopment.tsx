import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CustomDevelopment() {
  return (
    <section id="desarrollo" className="custom-section">
      <Container className="custom-grid">
        <Reveal className="custom-copy">
          <p className="eyebrow">DESARROLLO A MEDIDA</p>
          <h2>Cuando tu proceso es diferente, tu software también puede serlo.</h2>
          <p>
            Creamos módulos, integraciones y soluciones específicas para empresas que necesitan tecnología adaptada a su
            forma de trabajar.
          </p>
          <Button href="#contacto">Cuéntanos qué necesitas resolver</Button>
        </Reveal>
        <Reveal className="custom-visual-panel">
          <Image
            src="/brochure/solution-custom.png"
            alt="Ilustración de software a medida"
            width={220}
            height={220}
          />
        </Reveal>
      </Container>
    </section>
  );
}
