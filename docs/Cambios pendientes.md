# Cambios pendientes

Volver a [[Inicio]].

## Cambios solicitados
2026-09-22: retirar las vistas ficticias del sistema y redistribuir simétricamente el detalle de Microfinanzas. Implementación y comprobaciones en [[Detalle de Microfinanzas]]. Commit y despliegue autorizados por Jesua.

## Hallazgos verificados — 2026-09-21
- [ ] Completar los datos de contacto que se quieran mostrar. config/site.ts tiene vacíos email, phone, whatsapp, address y redes sociales.
- [ ] Definir el dominio y revisar su uso en metadata, sitemap y robots. config/site.ts tiene domain vacío.
- [ ] Decidir el comportamiento público del formulario: conectar un envío real o sustituirlo por un canal de contacto acordado. Actualmente no envía solicitudes.
- [ ] Revisar validación y mensajes del formulario cuando se implemente el envío. Actualmente utiliza noValidate y muestra texto técnico al visitante.

## Formato de cada tarea
- Cambio solicitado:
- Motivo:
- Prioridad:
- Cómo comprobar que está terminado:
- Estado:
- Resultado de la verificación:

Las casillas permanecen pendientes hasta contar con evidencia. Ver [[Mapa del proyecto]] y [[Publicación]].
