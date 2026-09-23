# Datos, persistencia y backend

## Estado verificado
No hay base de datos configurada, ORM, schemas, migraciones ni rutas API en el código inspeccionado. Tampoco autenticación, sesiones o autorización de usuarios implementadas. No atribuir SQL Server, Supabase u otro servicio al sitio por los productos que anuncia.

## Modelos existentes
- `ProductDetail` / `ProductTab` en `data/productDetails.ts`: configuración estática de UI. Cada producto tiene una lista no vacía de pestañas; cada pestaña declara beneficios o grupos de beneficios. Los IDs enlazan tab y panel para accesibilidad.
- `Contact`: `FormState` y `initialForm` viven solo en estado React; no persisten tras recarga ni producen una petición de envío.
- `siteConfig`: configuración estática de marca, dominio y contacto, sin credenciales.

## Relaciones / límites
Tarjeta `detailId` → entrada de `productDetails` → pestañas del diálogo. No son relaciones de base de datos. Usuarios/roles/permisos mencionados en Microfinanzas son contenido comercial, no roles de este sitio.

La petición `fetch` identificada en `FinalCTA` carga `/robot-switch.svg`, un archivo público, no un endpoint de negocio. No se han confirmado sistemas externos fuera del repositorio.

Si se añade backend, documentar aquí tecnología, ubicación de schemas/migraciones, identidad y relaciones relevantes; mantener los detalles de schema en código. Ver [Contacto](modules/CONTACT.md).
