import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brandAssets } from "@/config/site";

const reasons = [
  ["Atención cercana al usuario", "Escuchamos, entendemos y respondemos.", "/brochure/why-people.png"],
  ["Cambios y correcciones ágiles", "Adaptamos la solución con rapidez y flexibilidad.", "/brochure/why-agile.png"],
  ["Experiencia regulatoria", "Conocemos el sector financiero y sus requerimientos.", "/brochure/why-regulatory.png"],
  ["Equipo con trayectoria", "Experiencia comprobada en operaciones financieras.", "/brochure/why-team.png"],
  ["Especialistas en PLA", "Enfoque en prevención y cumplimiento normativo.", "/brochure/why-pla.png"],
] as const;

export function About() {
  return (
    <section id="nosotros" className="about-section">
      <Container className="why-panel">
        <Reveal className="why-heading">
          <p className="eyebrow">POR QUÉ ALMASOFT</p>
          <h2>Cercanía, experiencia y capacidad de adaptación.</h2>
          <strong>Da vida a tu información.</strong>
        </Reveal>
        <Reveal className="why-list">
          {reasons.map(([title, text, imageSrc]) => (
            <article key={title} className="why-item">
              <span>
                <Image src={imageSrc} alt={`Ilustración de ${title}`} width={54} height={54} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </Reveal>
        <Image className="about-mark" src={brandAssets.icon} alt="" width={254} height={316} />
      </Container>
    </section>
  );
}
