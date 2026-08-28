import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const buildPrinciples = [
  {
    number: "01",
    title: "Entendemos el proceso",
    description: "Partimos de cómo funciona realmente la operación antes de definir la solución.",
  },
  {
    number: "02",
    title: "Conectamos la información",
    description: "Organizamos procesos y datos para reducir información dispersa entre distintas herramientas.",
  },
  {
    number: "03",
    title: "Adaptamos la solución",
    description: "Desarrollamos sistemas y módulos capaces de responder a necesidades particulares de cada organización.",
  },
];

export function Intro() {
  return (
    <section className="intro-section">
      <Container>
        <Reveal className="build-bridge">
          <div className="build-bridge-copy">
            <p className="eyebrow">NUESTRA FORMA DE CONSTRUIR</p>
            <h2>Software construido alrededor de tu operación.</h2>
            <p>
              La tecnología debe adaptarse a los procesos de una organización, no obligar a la organización a adaptarse
              a la tecnología.
            </p>
          </div>

          <div className="build-process" aria-label="Proceso de construcción de software de AlmaSoft">
            {buildPrinciples.map((principle) => (
              <article key={principle.number} className="build-process-step">
                <span className="build-process-number">{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
