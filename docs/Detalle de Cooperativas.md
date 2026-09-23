# Detalle de Cooperativas

Volver a [[Mapa del proyecto]] · [[Detalle de Microfinanzas]].

## Alcance confirmado
Botón «Conocer solución» en AS Cooperativas de Ahorro y Crédito. Solo cuatro secciones autorizadas: Asociados, Aportes, Préstamos y Contabilidad. Ahorros queda fuera por indicación expresa del usuario.

## Mapa mínimo
- `data/productDetails.ts`: textos y pestañas de cada producto; Microfinanzas mantiene sus seis módulos originales.
- `components/ui/ProductDetailOverlay.tsx`: diálogo compartido; lee pestañas, pie y funciones adicionales del producto seleccionado.
- `components/sections/MainSolutions.tsx`: botones de apertura; conserva el elemento que abrió el diálogo para devolverle el foco al cerrar.
- `app/globals.css`: estilos existentes, altura estable y adaptación responsive compartidos.
  Las tarjetas principales usan filas `auto auto 1fr auto` para mantener los botones alineados al pie, aunque cambie la longitud del texto o el número de etiquetas.

## Contenido
Descripciones generales de los cuatro módulos confirmados. El contenido regulatorio CONAMI, PRIM, MUC y PLA pertenece al detalle de Microfinanzas y no se añade al de Cooperativas.

## Verificación
- Build de producción, lint y TypeScript correctos.
- Cuatro pestañas de Cooperativas y seis de Microfinanzas verificadas en 1440 × 900 y 390 × 844.
- Dimensiones estables entre pestañas, sin desbordamiento horizontal.
- Navegación por teclado, Escape, retorno de foco al botón correcto y reinicio en la primera pestaña al reabrir: correctos.
- CTA del robot conservado; sin errores del navegador durante las pruebas.
