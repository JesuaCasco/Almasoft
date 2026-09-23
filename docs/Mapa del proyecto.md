# Mapa del proyecto

Volver a [[Inicio]]. Revisión: 2026-09-21.

## Tecnología
Detalle y rutas para cambios de esta interfaz: [[Detalle de Microfinanzas]].

package.json declara Next.js ^15.5.0, React ^19.1.0, TypeScript ^5.9.2, Tailwind CSS ^3.4.17 y GSAP ^3.15.0. Son rangos declarados, no versiones instaladas verificadas.

## Organización
| Ruta desde la raíz | Responsabilidad |
| --- | --- |
| app/page.tsx | Composición de la página principal |
| app/layout.tsx | Layout general; pendiente de revisar en detalle |
| app/sitemap.ts y app/robots.ts | Archivos para buscadores; pendiente de revisar en detalle |
| components/layout/ | Header y footer |
| components/sections/ | Secciones de la página |
| components/ui/ | Componentes reutilizables |
| data/ | Navegación, soluciones, sectores y detalles de productos |
| config/site.ts | Marca, dominio, contactos y redes sociales |
| img/ | Imágenes originales; el README indica conservarlas |
| public/brand/ | Recursos de marca servidos por la web |

## Orden real de la página
app/page.tsx compone: Hero → Problems → MainSolutions → FinancialKnowledge → Industries → CustomDevelopment → Process → About → FinalCTA → Contact.

## Contacto
components/sections/Contact.tsx conserva los campos en estado del navegador. Su función onSubmit evita el envío normal y activa una nota informativa; no realiza una petición a un servidor. El formulario tiene noValidate. Los enlaces de contacto se muestran cuando sus valores existen en config/site.ts.

## Alcance de este mapa
Mapa inicial, no auditoría completa. No se ha confirmado una base de datos ni una integración con Supabase o SQL Server. Instalar SQL Server en la PC no conecta esta página automáticamente a él.

Siguiente: [[Cambios pendientes]] y [[Publicación]].
