# Publicación

## Destino y flujo
- Repositorio `JesuaCasco/Almasoft`, rama `main`.
- Vercel: equipo `jesuacascos-projects`, proyecto `almasoft`; producción https://almasoft.vercel.app.
- Un push a `main` activa despliegue automático. No lanzar además `deploy --prod` por defecto: produciría despliegues duplicados.
- La autorización de publicación depende de la tarea actual; esta nota no concede permiso permanente.

## Procedimiento mínimo
1. Revisar `git status` y diff; preservar cambios ajenos. Si hay discrepancia con lo publicado, comparar el área afectada con producción antes de subir.
2. Para cambios de aplicación: lint/build y validación de navegador acorde al alcance. Revisar escritorio, móvil y flujo real; no declarar envío de contacto mientras sea solo UI.
3. Commit/push cuando corresponda. Consultar `vercel ls almasoft`; tomar la URL devuelta y ejecutar `vercel inspect <url> --wait --timeout 60s`.
4. Confirmar estado Ready, alias de producción y comportamiento en URL pública. No confundir commit subido con publicación terminada.

## Particularidades locales
PowerShell: `npm.cmd`, `npx.cmd`; CLI disponible mediante `& "$env:APPDATA/npm/vercel.cmd"`. `.vercel/` guarda la vinculación local y no se versiona. No imprimir ni documentar tokens o `.env.local`.

Navegador usado: `npx.cmd --yes agent-browser`; Edge se seleccionó con `--executable-path 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'` al no encontrar Chrome. Las referencias `@e…` deben ir entre comillas en PowerShell. Preferir scripts temporales UTF-8 para evaluaciones complejas; capturas y scripts temporales no se versionan.

Para consultar un despliegue propio protegido, la CLI autenticada admite `vercel curl / --deployment <url> -- --output <archivo>`. Evitar cambiar la protección para comparar versiones.

## Pendiente fuera del deploy
`siteConfig.domain` aún vacío afecta sitemap/robots; ver [CURRENT_STATE](CURRENT_STATE.md). Autenticación CLI, despliegue vigente, secretos y monitoreo deben comprobarse en cada entorno, no inferirse de esta memoria.
