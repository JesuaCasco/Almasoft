# Contacto y solicitudes

## Responsabilidad
Mostrar datos de contacto configurados y recoger información en un formulario todavía sin envío.

## Archivos principales
`components/sections/Contact.tsx`: `Contact`, `initialForm`, `updateField`, `onSubmit`, `contactLinks`. `config/site.ts`: `siteConfig`. Estilos `.contact-*` en `app/globals.css`.

## Flujo
CTA o navegación → `#contacto` → edición en estado React → submit evita navegación y activa nota informativa. No hace petición ni registra datos. Editar un campo limpia la nota.

## Dependencias
React, `Container`, `Reveal`, `siteConfig`. No servicio de email, API o base de datos implementados.

## Datos/modelos
`FormState`: nombre, empresa, correo, teléfono, organización y necesidad. Opciones de organización en `organizationTypes`. Los valores no persisten al recargar.

El correo público configurado es `info@almasoft.com.ni`; se muestra como enlace `mailto:` en contacto y en el pie del sitio.

## Reglas importantes
No comunicar éxito de envío sin backend real. Email/teléfono/WhatsApp solo producen enlaces cuando están configurados. El enlace de demostración no transmite automáticamente un producto seleccionado.

## Restricciones
`noValidate` desactiva validación nativa aunque haya campos `required`; no confundir formulario visible con flujo completo. No hay reglas de retención o consentimiento definidas para futuras solicitudes persistidas.

## Tests
Sin suite persistente. Verificar campos controlados y enlaces condicionales. Al implementar backend, probar validación, éxito/error y recepción real; verificar solo el clic del botón no basta.

## Riesgos / no romper
Todos los CTA dependen del ancla `#contacto`. Los demás datos de contacto aún vacíos y el texto técnico visible siguen pendientes en [CURRENT_STATE](../CURRENT_STATE.md). No inventar destinatarios ni credenciales.
