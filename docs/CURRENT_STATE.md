# Estado actual

Base verificada: 2026-09-22. Este archivo representa estado, no historial.

## Activo
- Sitio corporativo publicado en https://almasoft.vercel.app; Vercel conectado a `main`.
- Microfinanzas: seis pestañas. Cooperativas: cuatro. Botones alineados y diálogo responsive de tamaño estable.
- CTA con imagen de robot y mano animada, opciones NO/SÍ y enlace a contacto.
- Build, tipos y lint pasaron en las últimas modificaciones funcionales; interacciones de productos y robot comprobadas en navegador de escritorio y móvil. No hay suite automatizada persistente.

## Incompleto / decisiones pendientes
- `Contact.onSubmit` no envía ni guarda solicitudes. Falta definir canal/backend, validación y tratamiento del resultado.
- El formulario usa `noValidate` y muestra texto técnico sobre la conexión pendiente; revisar al implementar el flujo real.
- `siteConfig`: el correo público es `info@almasoft.com.ni`; dominio, teléfono, WhatsApp, dirección y redes siguen vacíos. Definir los datos reales restantes.
- Sitemap y robots usan `https://example.com` cuando falta dominio: corregir antes de dar por terminado el SEO.
- Las soluciones secundarias se muestran como tarjetas; no tienen diálogo propio. No hay ampliación de módulos aprobada en curso.

## Deuda relevante
- Catálogos en `data/solutions.ts` y `MainSolutions.tsx` pueden divergir; la UI principal usa el segundo.
- `app/globals.css` acumula overrides; localizar todas las reglas de un selector antes de ajustar.
- No se ha realizado auditoría integral de seguridad, accesibilidad ni servicios externos. La configuración externa de monitoreo y el dominio definitivo no están confirmados.

Eliminar pendientes cuando se resuelvan. Alcance funcional: [BUSINESS_RULES](BUSINESS_RULES.md).
