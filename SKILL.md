---
name: carruseles
description: Genera carruseles virales de Instagram listos para publicar (guion + diseño + PNGs 1080x1350). Usar cuando el usuario pida "hazme un carrusel", "carrusel sobre X", "carrusel para instagram" o similar.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Carruseles virales con Claude Code

Genera un carrusel completo de Instagram a partir de un tema: guion estructurado,
slides HTML con diseño profesional y PNGs finales de 1080x1350 (4:5).

## Flujo en 5 pasos

1. Leer `brand.json` (marca del usuario). Si tiene placeholders, hacer onboarding.
2. Generar el guion (`contenido.json`) con la estructura viral de abajo.
3. Escribir `brand.css` y los HTML de cada slide usando los templates.
4. Renderizar a PNG con `node scripts/render.js <carpeta>`.
5. Control de calidad visual + escribir `caption.md`.

Toda la salida de un carrusel vive en `output/YYYY-MM-DD-slug/`:

```
output/2026-07-08-agentes-ia/
├── contenido.json      # guion estructurado
├── brand.css           # variables CSS generadas desde brand.json
├── slides/slide-01.html ... slide-NN.html
├── png/slide-01.png ... slide-NN.png
└── caption.md          # caption IG + hashtags
```

## Paso 0: marca

Leer `brand.json` en la raiz. Si `nombre` es "Tu Nombre" u otro placeholder, preguntar
al usuario (una sola vez): nombre o marca, handle de Instagram, 2 colores principales
(o proponer una paleta), y guardar sus respuestas en `brand.json` antes de continuar.

`brand.css` se genera desde `brand.json` con este formato exacto:

```css
:root {
  --brand-primary: #ffe500;
  --brand-secondary: #ff6b9c;
  --brand-bg: #f5f0e8;
  --brand-text: #111111;
  --brand-on-primary: #111111;
}
```

Regla de contraste: si `--brand-primary` es un color oscuro, `--brand-on-primary`
debe ser blanco; si es claro, casi negro. Comprobar mentalmente el contraste antes
de escribir el archivo.

## Paso 1: guion (contenido.json)

Estructura obligatoria del carrusel (6-12 slides):

| Posicion | Rol | Funcion |
|---|---|---|
| Slide 1 | `hook` | Parar el scroll. Headline contundente. |
| Slide 2 | `context` | Por que importa. Amplia sin revelar la solucion. |
| Slides 3..N-2 | `content` / `example` | Desarrollo con ejemplos concretos, un solo concepto por slide. |
| Penultimo | `example` o `reveal` | Caso practico, prueba o giro. |
| Ultimo | `cta` | Llamada a la accion clara. |

Reglas de texto:
- Headline: 6-10 palabras maximo. Directo, sin rodeos.
- Body: 20-60 palabras. Frases cortas. Una idea.
- Español natural de España. Nada de traducciones literales del ingles ni frases de IA
  ("en el mundo actual", "sumergete", "descubre el poder de").
- Ortografia perfecta en el texto visible: tildes, eñes y signos de apertura (¿ ¡).

Tipos de hook para el slide 1 (elegir segun el tema):

| Hook | Cuando usarlo | Ejemplo |
|---|---|---|
| Regla de tres | Listas, consejos, errores | "3 errores que matan tu negocio (el tercero duele)" |
| Open loop | Historias con giro | "Esta automatizacion me hizo 40K el mes pasado, pero nadie ve el detalle" |
| Enemigo comun | Posicionamiento, B2B | "Las agencias te cobran 5K por lo que la IA hace en 10 minutos" |
| Pregunta inducida | Educativo, autoridad | "¿Cuanto crees que cuesta un agente IA? Menos que tu cafe diario" |
| Resultados | Pruebas, casos reales | "De 8K a 38K al mes en 90 dias. Aqui estan los numeros" |

Framework narrativo por defecto: AIDA (Attention = hook, Interest = context,
Desire = content/example, Action = cta).

Formato de `contenido.json`:

```json
{
  "titulo": "...",
  "tema": "...",
  "hook_tipo": "enemigo_comun",
  "estilo": "neobrutalism",
  "slides": [
    { "numero": 1, "rol": "hook", "headline": "...", "body": null },
    { "numero": 2, "rol": "context", "headline": "...", "body": "..." }
  ]
}
```

## Paso 2: elegir design system

Por ahora disponible: `neobrutalism` (opiniones fuertes, contraste, contenido directo).
Usar `estilo_por_defecto` de brand.json salvo que el usuario pida otra cosa.

## Paso 3: construir los HTML

Claude escribe el HTML final de cada slide directamente. No hay motor de plantillas.

1. Leer `templates/<estilo>/layouts.md` y copiar el snippet del rol correspondiente.
2. Adaptar el contenido del guion al snippet. Resaltar 1-2 palabras clave del headline
   con `<span class="marca">`.
3. Cada slide enlaza tres CSS en este orden: `templates/base.css`,
   `templates/<estilo>/styles.css`, `../brand.css` (rutas relativas desde
   `output/<carpeta>/slides/`).

Reglas duras (no negociables):
- Lienzo exacto 1080x1350. Nunca tocar los tamaños de `base.css`.
- Headline visible a tamaño miniatura: minimo 64px. Body minimo 36px.
- Zona segura: el padding de 80px de `.slide` no se reduce.
- Footer en todos los slides: handle + numero o hint "Desliza".
- Ultimo slide sin "Desliza".
- Si un texto no cabe, se acorta el texto, no se encoge la fuente por debajo del minimo.

## Paso 4: renderizar

```
node scripts/render.js output/YYYY-MM-DD-slug
```

Errores comunes:

| Error | Solucion |
|---|---|
| "No se encontro ningun navegador" | Instalar Chrome, o `npx puppeteer browsers install chrome` y definir `CHROME_PATH` |
| Fuente se ve generica | Revisar rutas relativas de los `<link>` del slide |
| PNG cortado o con bordes | Algun elemento rompe el lienzo: buscar anchos fijos mayores de 920px |

## Paso 5: control de calidad y caption

1. Abrir 2-3 PNGs (con la herramienta Read) y verificar: texto completo sin cortes,
   contraste legible, ortografia, coherencia hook -> cta.
2. Escribir `caption.md`:
   - Primera linea = gancho que funcione cortado (se ve en el feed).
   - 125-150 caracteres en total para la parte visible.
   - CTA que repita la del ultimo slide.
   - 3-5 hashtags del nicho, no genericos.
