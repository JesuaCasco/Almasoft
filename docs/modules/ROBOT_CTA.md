# CTA del robot

## Responsabilidad
Invitación interactiva con imagen de robot y mano animada; conduce a `#contacto`.

## Archivos principales
- `components/sections/FinalCTA.tsx`: `FinalCTA`, `getParts`, `select`.
- `components/sections/FinalCTA.css`: diseño `life-*`, estados y media queries.
- `public/brand/almasoft-robot.png`: ilustración original.
- `public/robot-switch.svg`: interruptor/mano originales; recurso completo necesario para GSAP.

## Flujo
Carga SVG local → configuración GSAP → habilita NO/SÍ. Estado neutral gris. NO pasa a rojo, la mano mueve a SÍ; SÍ pasa directamente a verde. Gesto de aprobación → `hasResult` y mensaje con enlace a contacto. Movimiento reducido omite la animación.

## Dependencias
GSAP, React, `next/image`, `Container`, `Reveal`, `Button`. `fetch('/robot-switch.svg')` carga un recurso versionado; no es API ni contenido externo.

## Datos/modelos
`Choice`: neutral/no/yes; `isAnimating`, `hasResult`, `reduceMotion`, `isReady`; refs del contenedor y timeline. Selectores contractuales: `#toggle`, `#panel`, `#bothHands`, `.robotHand`, `#robotHand`, `#robotHand2`, `#robotThumb`.

## Reglas importantes
El cambio NO → SÍ es intencional en esta experiencia. Conservar la imagen y esta mano, no sustituir por la antigua versión SVG aislada. Deshabilitar opciones durante carga/animación.

## Restricciones
Limpiar fetch, contexto GSAP y timeline al desmontar. El SVG insertado es local y controlado; no convertirlo en HTML arbitrario de usuario. Conservar versión responsive y preferencia de movimiento reducido.

## Tests
Build/lint + navegador: imagen cargada, SVG listo, ambas opciones, movimiento intermedio, resultado final y enlace. Probar escritorio/móvil sin overflow, teclado y movimiento reducido; no se mantiene suite automatizada.

## Riesgos / no romper
Producción tuvo recursos que no estaban en Git. Este componente fue recuperado de `almasoft-k7lgpgzh5-jesuacascos-projects.vercel.app`; ese despliegue es referencia de recuperación, no base para revertir todo el sitio. Imagen/SVG originales y estilos `life-*` están ahora versionados. No renombrar IDs sin actualizar animación. Ver [DECISIONS](../DECISIONS.md), DEC-004.
