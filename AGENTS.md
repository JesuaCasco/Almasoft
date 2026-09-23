# AlmaSoft — contexto mínimo

Sitio comercial en español con Next.js App Router, React y TypeScript; presenta productos, no implementa sus sistemas financieros. Memoria: [docs/INDEX.md](docs/INDEX.md), también bóveda de Obsidian.

## Recuperar contexto
**Search first, read second.**
1. Identificar el dominio afectado.
2. Consultar `docs/INDEX.md`.
3. Elegir solo documentación relevante; no leer todo `docs/`.
4. Buscar símbolos, rutas, imports y referencias con `rg` / `rg --files`.
5. Leer únicamente archivos necesarios, preferentemente fragmentos.
6. Ampliar contexto progresivamente si falta información.

No explorar todo el repositorio por defecto, repetir análisis documentados ni cargar historial salvo necesidad. Si código y documentación discrepan, verificar el código. Ahorrar tokens nunca sustituye validación, seguridad o calidad.

## Reglas esenciales
- Conservar cambios locales y comprobar el alcance antes de editar.
- Consultar las reglas del módulo: productos distintos, diálogo de tamaño estable y CTA del robot tienen comportamientos deliberados.
- No inventar funcionalidades financieras, integraciones ni confirmaciones de envío.
- Antes de publicar, comprobar correspondencia entre checkout y producción: puede haber cambios publicados que no estaban en Git. Ver `docs/DEPLOYMENT.md`.
- No guardar secretos, `.env*`, `.vercel/` ni preferencias de `docs/.obsidian/`.
- PowerShell: usar `npm.cmd` y `npx.cmd`. Preservar UTF-8; las tuberías hacia Node pueden corromper tildes. Preferir parches para texto español.

## Comandos
`npm.cmd run dev` · `npm.cmd run lint` · `npm.cmd run build` · `npm.cmd run start`
Build verifica también tipos; cambios de UI requieren comprobación de navegador en escritorio y móvil. No hay suite de tests configurada.

## Mantener memoria
Actualizar solo conocimiento durable: arquitectura, reglas, modelos, API, flujo, estructura, integración, decisiones o estado relevante. No crear un diario ni actualizar por CSS menor, textos, ajustes visuales, bugs triviales o refactors internos sin impacto arquitectónico. Eliminar pendientes resueltos; evitar duplicaciones. Cambios solo documentales: validar rutas, enlaces y coherencia, sin reconstruir la aplicación por defecto.
