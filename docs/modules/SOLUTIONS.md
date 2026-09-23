# Soluciones y detalle de productos

## Responsabilidad
Presentar tarjetas y abrir el detalle correspondiente en un diálogo accesible.

## Archivos principales
- UI: `components/sections/MainSolutions.tsx` (`openProductDetail`, `productButtonRef`).
- Diálogo: `components/ui/ProductDetailOverlay.tsx` (`handleTabKeyDown`, `handleContactClick`).
- Datos: `data/productDetails.ts` (`ProductDetail`, `ProductTab`, `productDetails`).
- Estilos: `app/globals.css`; buscar `.primary-solution-copy`, `.solution-detail-trigger`, `.product-` y `Text-only product details`.

## Flujo
Botón → guardar elemento disparador → seleccionar producto → abrir diálogo/bloquear scroll del body → cambiar pestaña → cerrar/restaurar foco. Reabrir inicia en la primera pestaña. Demostración cierra y desplaza a `#contacto`.

## Dependencias
React, `Container`, `Reveal`, `next/image`; estilos compartidos. No API ni persistencia.

## Datos/modelos
`detailId` de tarjeta referencia `productDetails`. Cada producto define sus pestañas, resumen, pie y `additionalFeatures` opcionalmente vacío. Las tarjetas principales están declaradas en `MainSolutions.tsx`, no se alimentan del catálogo histórico `data/solutions.ts`.

## Reglas importantes
- Microfinanzas: Crédito, Cartera, PRIM, Contabilidad, PLA, Control. Conservar contenido actual y agrupación Seguridad/Reportería.
- Cooperativas: Asociados, Aportes, Préstamos, Contabilidad. No añadir Ahorros por inferencia; alcance explícito del usuario.
- Pie regulatorio y funciones adicionales pertenecen al producto, no al diálogo genérico.

## Restricciones
Sin placeholders de capturas. Descripción/beneficios en dos columnas iguales, una en móvil. Altura estable entre pestañas: escritorio `min(760px, 94dvh)`, móvil `94dvh`, cuerpo desplazable y `scrollbar-gutter: stable`. Botones de tarjetas alineados al pie mediante filas `auto auto 1fr auto`.

## Tests
Sin suite persistente. Build/lint + navegador: abrir ambos productos, recorrer todas las pestañas, comparar dimensiones, verificar móvil sin overflow. Probar flechas/Home/End, Tab/Shift+Tab, Escape, cierre, devolución de foco al botón correcto y reinicio de pestaña. Comprobar enlace a contacto.

## Riesgos / no romper
IDs ARIA y selección deben concordar incluso al cambiar de producto. No reutilizar una ref fija de Microfinanzas para Cooperativas. Cambiar CSS compartido afecta ambos productos. Mantener CTA del robot independiente.
