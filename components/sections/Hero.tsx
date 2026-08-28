import { BrandFlow } from "@/components/ui/BrandFlow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <Container className="hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow">SOLUCIONES TECNOLÓGICAS EMPRESARIALES</p>
          <h1>Software que entiende cómo opera tu negocio.</h1>
          <p>
            En AlmaSoft desarrollamos soluciones para organizar, conectar y transformar la información que mueve a las
            empresas e instituciones.
          </p>
          <div className="hero-actions">
            <Button href="#soluciones">Conocer nuestras soluciones</Button>
            <Button href="#contacto" variant="secondary">
              Solicitar una demostración
            </Button>
          </div>
          <div className="hero-markets">Microfinanzas · Cooperativas · Gestión empresarial · Desarrollo a medida</div>
        </Reveal>
        <Reveal className="hero-visual">
          <BrandFlow />
        </Reveal>
      </Container>
    </section>
  );
}
