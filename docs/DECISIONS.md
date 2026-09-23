# Decisiones duraderas

## DEC-001 — Diálogo común con datos por producto
Contexto: Microfinanzas y Cooperativas comparten presentación, pero tienen módulos distintos.
Decisión: `ProductDetailOverlay` lee pestañas, pie y funciones adicionales de `productDetails`.
Razón: reutilizar interacción y accesibilidad sin duplicar contenido regulatorio.
Consecuencia: añadir productos desde datos y tarjeta; no fijar textos de Microfinanzas en el componente común.

## DEC-002 — Tamaño estable, contenido desplazable
Contexto: el usuario rechazó que el diálogo creciera o encogiera al cambiar de pestaña.
Decisión: altura limitada por viewport, cuerpo con scroll y distribución responsive; sin paneles ficticios de capturas.
Razón: mantener orientación visual y acceso al cierre/CTA.
Consecuencia: probar todas las pestañas, títulos largos y móvil; no volver a `height: auto` por conveniencia.

## DEC-003 — Alcance explícito de Cooperativas
Contexto: un catálogo histórico menciona Ahorros, pero el usuario limitó expresamente el detalle actual.
Decisión: solo Asociados, Aportes, Préstamos y Contabilidad.
Razón: el alcance confirmado prevalece sobre inferencias por el nombre del producto.
Consecuencia: no añadir Ahorros ni otros módulos sin nueva instrucción.

## DEC-004 — Preservar el CTA y verificar producción
Contexto: producción contenía un CTA de robot que no estaba en el checkout; publicar desde Git lo reemplazó.
Decisión: imagen, SVG, estilos y animación recuperados quedan versionados; comparar lo relevante con producción antes de publicar cuando exista divergencia.
Razón: el diff de Git por sí solo no detecta pérdidas frente a un despliegue con cambios no registrados.
Consecuencia: recuperar el componente necesario, no restaurar todo un despliegue y perder trabajo posterior. Fuente técnica: [Robot](modules/ROBOT_CTA.md).

## DEC-005 — Memoria selectiva, mantenida junto al código
Contexto: futuras sesiones deben recuperar conocimiento sin repetir exploración.
Decisión: AGENTS compacto + router + notas por dominio; código como fuente de verdad.
Razón: reducir contexto repetido y evitar contradicciones.
Consecuencia: mantener solo reglas y estado duraderos; no crear diarios ni notas por cambios cosméticos.
