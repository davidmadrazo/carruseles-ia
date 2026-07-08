# Layouts liquid-glass por rol de slide

Cada slide es un archivo HTML independiente. Esqueleto comun (ajusta las rutas
relativas segun la profundidad de la carpeta del carrusel respecto a la raiz del repo;
con la estructura estandar `output/<carpeta>/slides/` son tres niveles):

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../templates/base.css">
  <link rel="stylesheet" href="../../../templates/liquid-glass/styles.css">
  <link rel="stylesheet" href="../brand.css">
</head>
<body>
  <!-- aqui va la section del rol correspondiente -->
</body>
</html>
```

Decisiones tipograficas de este sistema:
- Headlines en **Inter 900** (no Archivo Black): el peso variable con tracking
  negativo encaja con el vibe producto/tech premium; Archivo Black uppercase
  resulta demasiado brutal para el glass. Sin `text-transform: uppercase`.
- `.marca` es texto con degradado de marca aclarado (no bloque de color): resalta
  sin romper la estetica translucida.
- El lienzo es siempre oscuro (definido por el CSS del sistema); los blobs de color
  detras de las cards salen de `--brand-primary`/`--brand-secondary` via
  pseudo-elementos de `.slide`. El HTML no lleva divs decorativos.

Reglas duras para todos los roles:
- El bloque principal se centra verticalmente con `<div class="spacer"></div>` antes y
  despues; el footer queda anclado abajo.
- Resalta 1-2 grupos de palabras clave del headline con `<span class="marca">`. Si el
  headline termina en signo de puntuacion, incluirlo dentro del span.
- Los textos visibles llevan ortografia perfecta: tildes, eñes y signos de apertura.
- Footer siempre presente: handle a la izquierda; a la derecha `swipe-hint` (o
  `slide-number` en slides intermedios). El ultimo slide nunca lleva swipe-hint.
- Headlines largos: si una palabra muy larga fuerza cortes feos a 88px, acortar el
  texto, no bajar la fuente de 64px.
- Nada de emojis como sustituto de diseño. Aqui los degradados y el blur son el
  sistema: no añadir bordes negros ni sombras duras.

## Rol: hook (slide 1)

Headline gigante que para el scroll. Badge con el tema arriba.

```html
<section class="slide slide--hook">
  <span class="badge">Agentes IA</span>
  <div class="spacer"></div>
  <h1 class="headline">Tu competencia ya tiene <span class="marca">empleados que no duermen</span></h1>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: context (slide 2)

Amplia el hook sin revelar la solucion.

```html
<section class="slide slide--context">
  <div class="spacer"></div>
  <h2 class="headline">No hablo de <span class="marca">chatbots tontos</span></h2>
  <div class="gap-md"></div>
  <div class="card">
    <p class="body-text">Hablo de agentes que ejecutan tareas completas: responden, cualifican, agendan y cobran. <strong>Sin que tú toques nada.</strong></p>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: content (slides centrales)

Numero de paso + headline + panel glass con el desarrollo.

```html
<section class="slide slide--content">
  <div class="spacer"></div>
  <span class="numero-paso">01</span>
  <div class="gap-md"></div>
  <h2 class="headline">Atienden WhatsApp <span class="marca">24/7</span></h2>
  <div class="gap-md"></div>
  <div class="card">
    <p class="body-text">Cada mensaje se responde en segundos, a las 3 de la tarde o a las 3 de la mañana. <strong>Cero leads perdidos por tardar.</strong></p>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="slide-number">3/8</span>
  </div>
</section>
```

## Rol: example / reveal (penultimo)

Caso real o giro. Usa `quote-card` para testimonios y cifras. Para un reveal sin cita,
usar el layout de content sin `numero-paso`.

```html
<section class="slide slide--example">
  <span class="badge">Caso real</span>
  <div class="spacer"></div>
  <blockquote class="quote-card">
    "Antes perdía pedidos cada noche. Ahora el agente los toma solo y factura mientras duermo."
    <footer>Pastelería con bot de WhatsApp, cliente real</footer>
  </blockquote>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: cta (ultimo slide)

Headline + boton CTA con degradado de marca + handle. Sin swipe-hint.

```html
<section class="slide slide--cta">
  <div class="spacer"></div>
  <h2 class="headline">¿Quieres montar <span class="marca">el tuyo?</span></h2>
  <div class="gap-lg"></div>
  <span class="cta-button">Comenta "AGENTE"</span>
  <div class="gap-md"></div>
  <p class="body-text">Y te mando la guía paso a paso por DM.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="slide-number">8/8</span>
  </div>
</section>
```
