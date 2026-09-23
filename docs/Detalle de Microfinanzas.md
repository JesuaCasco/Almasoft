# Detalle de Microfinanzas

Volver a [[Mapa del proyecto]] · [[Cambios pendientes]] · [[Publicación]].

## Mapa mínimo para futuras consultas
- `components/sections/MainSolutions.tsx`: abre el detalle del producto.
- `components/ui/ProductDetailOverlay.tsx`: diálogo compartido, beneficios, recorrido y cierre accesible.
- `data/productDetails.ts`: título, resumen, seis pestañas y pie del producto. También contiene [[Detalle de Cooperativas]].
- `app/globals.css`: buscar `.product-` y el bloque final `Text-only product details`.

## Cambio solicitado — 2026-09-22
Eliminar las vistas ficticias del sistema en todas las pestañas. Distribuir descripción y beneficios en dos columnas iguales; apilarlas en móvil. Mantener la altura estable entre pestañas y el cuerpo desplazable con cierre y llamada a la acción accesibles.

## Verificación
Corrección solicitada: mantener el tamaño al cambiar de pestaña. Altura de escritorio `min(760px, 94dvh)` y móvil `94dvh`; desplazamiento interno y espacio reservado para la barra para evitar saltos de ancho.
Verificado en las seis pestañas: 1240 × 760 en pantalla 1440 × 900; 390 × 793,36 en pantalla 390 × 844. Posición y dimensiones idénticas entre pestañas, sin desbordamiento horizontal. Build correcto.

- `npm.cmd run lint`: correcto.
- `npm.cmd run build`: correcto; tipos y generación estática completados.
- Navegador Edge: diálogo revisado en escritorio y móvil de 390 × 844; panel ficticio ausente, columnas equilibradas y contenido móvil desplazable. Sin errores reportados por el navegador.

## Uso eficiente del contexto
Leer esta nota antes del código. Consultar únicamente los archivos y selectores afectados con búsquedas dirigidas. Registrar resultados comprobados; estas notas reducen lecturas repetidas, no modifican el límite de tokens del modelo.
