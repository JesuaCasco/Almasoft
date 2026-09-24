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

type IconProps = {
  className?: string;
};

const socialNetworks = [
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.2V18M6.5 5.5v.1M10.5 18v-5.4c0-2.4 4.5-2.6 4.5.2V18M10.5 9.5V18" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.facebook,
    icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 7H16V4.2c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v2.2H7.2v3.1h2.6V20H13v-6.7h2.7l.4-3.1H13V8.3c0-.9.3-1.3 1.5-1.3Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.instagram,
    icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle className="footer-social-dot" cx="17.4" cy="6.8" r=".8" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.youtube,
    icon: ({ className }: IconProps) => (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12c0 2.2-.2 4-.5 4.8-.2.6-.7 1.1-1.4 1.3-1.2.4-6.1.4-6.1.4s-4.9 0-6.1-.4c-.7-.2-1.2-.7-1.4-1.3C4.2 16 4 14.2 4 12s.2-4 .5-4.8c.2-.6.7-1.1 1.4-1.3C7.1 5.5 12 5.5 12 5.5s4.9 0 6.1.4c.7.2 1.2.7 1.4 1.3.3.8.5 2.6.5 4.8Z" />
        <path className="footer-social-play" d="m10 9 5 3-5 3V9Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-main">
        <div className="footer-brand">
          <Image src={brandAssets.logo} alt={`${siteConfig.name}: ${siteConfig.tagline}`} width={248} height={66} />
          <a className="footer-email" href={`mailto:${siteConfig.email}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
              <path d="m5 7 7 5 7-5" />
            </svg>
            {siteConfig.email}
          </a>
        </div>
        <nav className="footer-nav" aria-label="Navegación del pie de página">
          {footerGroups.map((group) => (
            <div className="footer-column" key={group.title}>
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
        </nav>
      </Container>
      <Container className="footer-bottom">
        <p>© {new Date().getFullYear()} AlmaSoft. Todos los derechos reservados.</p>
        <div className="footer-socials" aria-label="Redes sociales">
          {socialNetworks.map(({ label, href, icon: Icon }) =>
            href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon />
              </a>
            ) : (
              <span key={label} title={`${label}: enlace pendiente`} aria-label={`${label}: enlace pendiente`}>
                <Icon />
              </span>
            ),
          )}
        </div>
      </Container>
    </footer>
  );
}
