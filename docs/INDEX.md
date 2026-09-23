# Router de contexto

Elegir una fila según la tarea; leer solo ese destino. El código es la fuente de verdad. Las notas son memoria consultable, no sincronización automática con el chat.

| Documento | Contenido / cuándo consultarlo | Módulos |
|---|---|---|
| [ARCHITECTURE](ARCHITECTURE.md) | Composición, stack y rutas; cambios transversales o localizar una sección | Sitio completo |
| [CURRENT_STATE](CURRENT_STATE.md) | Funcionalidad activa, pendientes y deuda vigente; planificar trabajo | Sitio completo |
| [BUSINESS_RULES](BUSINESS_RULES.md) | Límites del producto y afirmaciones comerciales; añadir capacidades o contenido | Soluciones, contacto |
| [DATABASE](DATABASE.md) | Persistencia/backend y modelos locales; tareas de datos, login o API | Soluciones, contacto |
| [DECISIONS](DECISIONS.md) | Decisiones que no deben revertirse por accidente; cambiar patrones o comportamiento | Soluciones, robot, despliegue |
| [DEPLOYMENT](DEPLOYMENT.md) | Destino, publicación y verificación; commit/push/deploy o discrepancia con producción | Operación |
| [modules/INDEX](modules/INDEX.md) | Elegir módulo cuando solo se conoce el área funcional | Módulos |
| [Soluciones](modules/SOLUTIONS.md) | Tarjetas, botones, pestañas, tamaños, foco; Microfinanzas o Cooperativas | `MainSolutions`, `ProductDetailOverlay` |
| [Robot](modules/ROBOT_CTA.md) | Imagen, SVG, estados y GSAP; CTA interactivo | `FinalCTA` |
| [Contacto](modules/CONTACT.md) | Formulario, ancla y enlaces; solicitudes o datos de contacto | `Contact`, `siteConfig` |

Consultas pequeñas: botones → Soluciones; mano → Robot; envío → Contacto; dominio → DEPLOYMENT + CURRENT_STATE. No hay módulos de negocio financiero ejecutables que documentar como backend.

[Inicio](Inicio.md) es solo la entrada de Obsidian a este índice; no contiene contexto adicional.
