# CTA del robot

Volver a [[Mapa del proyecto]] · [[Publicación]].

## Recuperación — 2026-09-22
El CTA publicado antes de los cambios de Microfinanzas no coincidía con Git. Al desplegar el checkout se sustituyó por la versión antigua del repositorio, aunque `FinalCTA.tsx` no se hubiera editado. Comparar con producción antes de futuras publicaciones.

Fuente recuperada: https://almasoft-k7lgpgzh5-jesuacascos-projects.vercel.app (despliegue del 1 de septiembre).

## Mapa mínimo
- `components/sections/FinalCTA.tsx`: contenido y secuencia GSAP recuperados del JavaScript publicado; código reconstruido con nombres legibles y limpieza al desmontar.
- `components/sections/FinalCTA.css`: reglas `life-*` extraídas de la hoja de estilos original, incluyendo sus media queries.
- `public/brand/almasoft-robot.png`: imagen original recuperada sin modificar.
- `public/robot-switch.svg`: mano e interruptor originales recuperados sin modificar.

## Comportamiento original
Robot ilustrado junto al título y subtítulo. El interruptor comienza neutro. NO mueve el interruptor a rojo y la mano lo lleva a SÍ; SÍ activa el verde. La mano hace un gesto de aprobación y aparece «¡Excelente decisión!» con el enlace a contacto. Con movimiento reducido se omite la animación.

No restaurar todo el despliegue antiguo: perdería las mejoras actuales de Microfinanzas. Recuperar únicamente este componente, sus estilos y recursos.

## Verificación
- Build de producción, lint y TypeScript correctos.
- Escritorio 1440 × 1000: imagen cargada; NO activa movimiento de la mano y finaliza en SÍ con el resultado visible y enlace a `#contacto`.
- Móvil 390 × 844: opción SÍ y resultado comprobados visualmente.
- Sin errores reportados por el navegador durante ambos recorridos.
