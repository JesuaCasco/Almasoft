# AlmaSoft Corporate Site

Sitio corporativo de AlmaSoft construido con Next.js App Router, TypeScript, Tailwind CSS y ESLint.

Contexto para trabajar en el repositorio: [AGENTS.md](AGENTS.md) y [router de documentación](docs/INDEX.md).

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Estructura

- `app/`: rutas, metadata, sitemap, robots y página 404.
- `components/layout/`: header responsive y footer.
- `components/sections/`: secciones narrativas del sitio.
- `components/ui/`: piezas reutilizables como botones, contenedores, revelado y gráficos de flujo.
- `data/`: navegación, soluciones, sectores y etapas.
- `config/site.ts`: datos de marca, contacto y dominio.
- `img/`: imágenes originales entregadas por la marca. No se modifican.
- `public/brand/`: copias servidas por Next.js para logo, isotipo y favicon.

## Imágenes

Se inspeccionaron las imágenes de `img/`. Para la web se copiaron:

- `img/Logo.png` a `public/brand/almasoft-logo-tagline.png`.
- `img/IconHD.png` a `public/brand/almasoft-icon.png`.
- `img/IconHD.png` a `public/favicon.png`.

## Configuración de contacto

Los datos reales se agregan en `config/site.ts`:

```ts
export const siteConfig = {
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  domain: "",
  facebook: "",
  instagram: "",
  linkedin: "",
}
```

Mientras esos campos estén vacíos, el sitio no muestra enlaces rotos.

## Despliegue en Vercel

El proyecto está preparado para Vercel con Next.js. Cuando exista dominio, colócalo en `siteConfig.domain` para que sitemap y robots usen la URL correcta.
