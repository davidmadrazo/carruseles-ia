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

Leer `brand.json` en la raiz. Si `nombre` es "Tu Nombre" u otro placeholder, hacer
el onboarding UNA sola vez, conversacional y corto:

1. "¿Como te llamas o como se llama tu marca?"
2. "¿Cual es tu handle de Instagram?"
3. "¿Tienes 2 colores de marca? Si no, dime tu sector y te propongo una paleta."
4. "¿A que te dedicas y a quien ayudas?" (guardar en `tono` una frase que lo capture)

Guardar las respuestas en `brand.json` antes de continuar. En usos siguientes no
volver a preguntar.

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

Regla de contraste: si `--brand-primary` es oscuro, `--brand-on-primary` debe ser
blanco; si es claro, casi negro. Comprobar el contraste antes de escribir el archivo.

## Paso 1: guion (contenido.json)

### Estructura obligatoria (6-12 slides)

| Posicion | Rol | Funcion |
|---|---|---|
| Slide 1 | `hook` | Parar el scroll. Headline contundente. |
| Slide 2 | `context` | Por que importa. Amplia sin revelar la solucion. |
| Slides 3..N-2 | `content` / `example` | Desarrollo con ejemplos concretos, un solo concepto por slide. |
| Penultimo | `example` o `reveal` | Caso practico, prueba o giro. |
| Ultimo | `cta` | Llamada a la accion clara. |

### Reglas de texto

- Headline: 6-10 palabras maximo. Directo, sin rodeos.
- Body: 20-60 palabras. Frases cortas. Una idea.
- Español natural de España. Nada de traducciones literales del ingles ni frases de IA
  ("en el mundo actual", "sumergete", "descubre el poder de", "revoluciona", "eleva").
- Ortografia perfecta en el texto visible: tildes, eñes y signos de apertura (¿ ¡).
- Cifras concretas siempre que existan: "40K en 90 dias" gana a "muchos resultados".

### Los 13 tipos de hook (elegir 1 para el slide 1)

| Hook | Cuando usarlo | Ejemplo de headline |
|---|---|---|
| `regla_de_tres` | Listas, consejos, errores | "3 errores que matan tu negocio (el tercero duele)" |
| `reto` | Desafiar al ego, comunidad | "Apuesto a que no montas esto en 7 dias" |
| `oyo` (open loop) | Historias con giro, deja algo sin resolver | "Esta automatizacion me hizo 40K, pero nadie ve el detalle" |
| `culo` (impacto visual) | Cifras o pruebas en pantalla | "100.000€ en Stripe. Asi se ve por dentro" |
| `cotilla` | Noticias de empresas/personas conocidas | "OpenAI acaba de hacer esto y nadie lo cuenta en español" |
| `pregunta_inducida` | Educativo, contraste esperado vs real | "¿Cuanto crees que cuesta un agente IA?" |
| `enemigo_comun` | Posicionamiento, B2B | "Las agencias te cobran 5K por lo que la IA hace en 10 minutos" |
| `accionador` | Tutorial, solucion rapida | "Si tu WhatsApp esta atascado, prueba esto antes de pagar" |
| `regla_del_2` | Controversia, identidad | "Si publicas cada dia y no creces, eres uno de estos 2" |
| `si_tu` | Escenario hipotetico, inspiracional | "Si empezaras de cero con 1000€, harias estas 3 cosas" |
| `pregunta_incomoda` | Tabu, provocacion | "¿Cuanto facturas de verdad? El 90% se miente" |
| `objeto_magico` | Herramienta = resultado deseado | "Esta herramienta va a matar a 3 SaaS de 10M" |
| `resultados` | Autoridad, prueba social | "De 8K a 38K al mes en 90 dias. Los numeros" |

### Frameworks narrativos

- **AIDA** (por defecto en carruseles): Attention = hook, Interest = context,
  Desire = content/example (pintar el resultado deseado), Action = cta.
- **PAS** (alternativa B2B/ventas): Problem = hook+context, Agitation = amplificar
  consecuencias en los slides centrales, Solution = reveal+cta.
- **Open loop + bookending** (transversal, combinable con ambos): el slide 1 abre una
  pregunta que NO se responde hasta el penultimo slide, y el ultimo slide conecta con
  el primero. Fuerza a deslizar hasta el final y a releer.

### Que premia el algoritmo (2026) y como se traduce a slides

- **Shares** es la señal numero 1: cada carrusel necesita al menos un slide
  "atomicamente compartible" (una idea tan redonda que se envia tras una sola lectura;
  suele ser el reveal o un content con cifra fuerte).
- **Comments**: el CTA con palabra clave ("comenta X y te mando...") o pregunta
  inducida los dispara.
- **Saves**: los carruseles-lista ("guardate esto") los generan solos; no sacrificar
  shares por saves.
- **Retention**: en carrusel = % que llega al ultimo slide. Cada slide debe abrir una
  micro-curiosidad hacia el siguiente (re-hooking): terminar body con tension, no con
  conclusion cerrada, salvo el ultimo.

### Storytelling (cuando el carrusel cuenta una experiencia)

- Zoom en el momento: describir el instante concreto, no la generalidad.
- Stakes: decir que habia en juego.
- Mostrar emociones fisicamente ("me temblaba la mano al enviar el presupuesto").
- Mostrar transformacion: el delta antes/despues es lo que se retiene.
- Villano: toda historia necesita antagonista (persona, idea o tendencia).
- No usar la palabra "historia"; decir "experiencia" o "ejemplo".

### Formato de contenido.json

```json
{
  "titulo": "...",
  "tema": "...",
  "hook_tipo": "enemigo_comun",
  "framework": "aida",
  "estilo": "neobrutalism",
  "slides": [
    { "numero": 1, "rol": "hook", "headline": "...", "body": null },
    { "numero": 2, "rol": "context", "headline": "...", "body": "..." }
  ]
}
```

Checklist de validacion del guion (pasarla antes de escribir HTML):
- ¿El headline del slide 1 funciona sin contexto y en miniatura?
- ¿Cada slide tiene UNA sola idea?
- ¿Hay al menos un slide compartible por si solo?
- ¿El penultimo entrega la promesa del hook?
- ¿El CTA pide UNA accion concreta con beneficio?
- ¿Numero de palabras dentro de limites en todos los slides?

## Paso 2: elegir design system

| Estilo | Cuando usarlo |
|---|---|
| `neobrutalism` | Opiniones fuertes, contraste, contenido directo |
| `liquid-glass` | Producto, tech premium, dark mode |
| `gradient-mesh` | Vision, futuro, contenido aspiracional |
| `bento-grid` | Listas, comparativas, features |
| `neumorphism` | Calma, procesos, bienestar |
| `editorial` | Historias personales, opinion con peso, autoridad |

Usar `estilo_por_defecto` de brand.json salvo que el usuario pida otra cosa o el tema
encaje claramente mejor con otro estilo (proponerlo en ese caso). Cada estilo tiene su
`layouts.md` con snippets propios: leer SIEMPRE el del estilo elegido, no asumir que
son iguales (la tipografia y la estructura cambian entre sistemas).

## Formato historias (9:16)

Si el usuario pide "historias" en vez de un post, el carrusel es una secuencia
vertical de Stories (lienzo 1080x1920):

- Los slides enlazan `templates/base-historia.css` en vez de `base.css`, mas el
  estilo de historia elegido: `historia-cinematica` (oscuro cinematografico; admite
  foto de fondo con `<img class="bg-image">` como primer hijo de la section) o
  `historia-editorial` (revista clara y elegante).
- Estructura recomendada: 6-8 pantallas — gancho, problema, giro, solucion, prueba y
  cierre con CTA. UNA idea y ~15 palabras maximo por pantalla, con una palabra
  protagonista en `.palabra-golpe`.
- Leer SIEMPRE el `layouts.md` del estilo de historia elegido (los snippets y
  tamaños cambian respecto a los posts).
- El render es el mismo: `node scripts/render.js <carpeta>` detecta el lienzo solo.
  Las zonas seguras de la UI de Instagram ya las reserva el template.

## Paso 3: construir los HTML

Claude escribe el HTML final de cada slide directamente. No hay motor de plantillas.

1. Leer `templates/<estilo>/layouts.md` y copiar el snippet del rol correspondiente.
2. Adaptar el contenido del guion al snippet. Resaltar 1-2 grupos de palabras clave
   del headline con `<span class="marca">` (si el headline termina en signo de
   puntuacion, incluirlo dentro del span).
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
- Palabras muy largas ("COMPETENCIA", "AUTOMATIZACION") fuerzan cortes feos en
  headlines grandes: preferir sinonimos cortos o aceptar el corte solo si queda limpio.

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
2. Escribir `caption.md` con estas reglas:
   - Primera linea = gancho que funcione cortado (es lo unico visible en el feed).
   - Parte visible: 125-150 caracteres con hook + CTA.
   - CTA que repita la del ultimo slide (misma palabra clave).
   - Pregunta inducida al final para disparar comentarios.
   - 3-5 hashtags del nicho, no genericos.
3. Enseñar al usuario los PNGs y ofrecer UNA ronda de ajustes concretos.
