# carruseles-ia

Herramienta para generar carruseles virales de Instagram con Claude Code.

Cuando el usuario pida un carrusel ("hazme un carrusel sobre X", "carrusel para
instagram", etc.), lee `SKILL.md` y sigue su flujo al pie de la letra.

Estructura:
- `SKILL.md` — el flujo completo y el conocimiento viral
- `brand.json` — marca del usuario (se rellena en el primer uso)
- `templates/` — sistemas de diseño (CSS + layouts HTML de referencia)
- `scripts/render.js` — convierte los slides HTML en PNGs 1080x1350
- `output/` — carruseles generados (no se versiona)
