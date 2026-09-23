# Arquitectura

## Alcance y stack
Landing corporativa de AlmaSoft, una página con secciones y diálogos de productos. Next.js 15 App Router, React 19, TypeScript estricto, Tailwind 3 y CSS global; GSAP para animaciones. Versiones exactas: `package-lock.json`; scripts: `package.json`. Alias `@/*` apunta a la raíz (`tsconfig.json`).

## Composición y rutas
- `app/layout.tsx` → `Header`, página, `Footer`; metadata desde `config/site.ts`, idioma español, fuentes Inter/Manrope mediante `next/font/google`.
- `app/page.tsx` → Hero → Problems → MainSolutions → FinancialKnowledge → Industries → CustomDevelopment → Process → About → FinalCTA → Contact.
- Navegación por anclas: `data/navigation.ts`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`. `#soluciones` identifica el área comercial; `#contacto` es el destino de demostraciones.
- `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`: buscadores y 404. El dominio viene de `siteConfig.domain`.

## Fronteras
`components/sections/` compone contenido; `components/ui/` contiene piezas compartidas. Las interacciones mantienen estado en componentes cliente. `data/productDetails.ts` define datos del diálogo, no servicios financieros. `MainSolutions.tsx` tiene su propio catálogo de tarjetas: editar `data/solutions.ts` no garantiza cambiar esas tarjetas.

`Container` controla anchura; `Reveal` usa IntersectionObserver y añade `is-visible` una vez. Para verificar visualmente una sección, desplazarla al viewport antes de capturar.

## Estilos y recursos
- `app/globals.css` contiene reglas y overrides en varias zonas: buscar todos los selectores afectados antes de modificar la cascada.
- `components/sections/FinalCTA.css`: estilos `life-*` del robot; importados por `FinalCTA.tsx`.
- `public/brand/` y `public/brochure/`: imágenes servidas. `public/robot-switch.svg`: recurso animado. `img/`: originales de marca, conservarlos.
- `docs/` es una bóveda de Obsidian existente. Markdown estándar funciona sin Obsidian; `docs/.obsidian/` permanece fuera de Git.

Flujos: [Soluciones](modules/SOLUTIONS.md), [Robot](modules/ROBOT_CTA.md), [Contacto](modules/CONTACT.md). Persistencia: [DATABASE](DATABASE.md).
