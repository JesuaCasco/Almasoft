import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brandAssets, siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Soluciones",
    links: ["Microfinanzas", "Cooperativas", "Facturación", "Inventario", "Contabilidad", "Planilla"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Desarrollo a medida", "Contacto"],
  },
  {
    title: "Sectores",
    links: ["Servicios financieros", "Comercio", "Servicios", "Restaurantes"],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <Image src={brandAssets.logo} alt={siteConfig.name} width={248} height={66} />
          <a className="footer-email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link}>
                  <Link href={link === "Contacto" ? "#contacto" : "#soluciones"}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="footer-bottom">
        <p>© {new Date().getFullYear()} AlmaSoft. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}
