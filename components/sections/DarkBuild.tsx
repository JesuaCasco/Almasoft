import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workStages } from "@/data/solutions";

export function DarkBuild() {
  return (
    <section className="dark-build">
      <Container>
        <Reveal className="dark-build-grid">
          <div>
            <h2>Construimos alrededor de tu operación, no al revés.</h2>
            <p>
              Cada organización trabaja de forma diferente. Cuando una solución estándar no es suficiente, desarrollamos
              módulos y sistemas adaptados a las necesidades reales del negocio.
            </p>
          </div>
          <div className="stage-list">
            {workStages.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
