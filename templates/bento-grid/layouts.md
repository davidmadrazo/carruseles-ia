# Layouts bento-grid por rol de slide

Cada slide es un archivo HTML independiente. Esqueleto comun (ajusta las rutas
relativas segun la profundidad de la carpeta del carrusel respecto a la raiz del repo;
con la estructura estandar `output/<carpeta>/slides/` son tres niveles):

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../templates/base.css">
  <link rel="stylesheet" href="../../../templates/bento-grid/styles.css">
  <link rel="stylesheet" href="../brand.css">
</head>
<body>
  <!-- aqui va la section del rol correspondiente -->
</body>
</html>
```

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
- La rejilla `.bento` lleva 2-4 celdas, nunca mas. Una celda de color (`--destacada` o
  `--oscura`) como maximo por rejilla; el resto claras para que el acento respire.
- Dentro de una celda `--destacada` no meter `.badge` ni texto con opacidad baja.
- Nada de emojis como sustituto de diseño. La decoracion (glows de esquina) ya la pone
  el CSS: no añadir divs decorativos al HTML.

## Rol: hook (slide 1)

Badge con el tema arriba y una unica celda grande protagonista con el headline.
Composicion simple: aqui no hay rejilla.

```html
<section class="slide slide--hook">
  <span class="badge">Agentes IA</span>
  <div class="spacer"></div>
  <div class="bento-cell">
    <h1 class="headline">Tu competencia ya tiene <span class="marca">empleados que no duermen</span></h1>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: context (slide 2)

Amplia el hook sin revelar la solucion. Headline fuera de la rejilla y debajo una
celda ancha con el desarrollo mas una fila de dos mini-datos que dan peso al problema.

```html
<section class="slide slide--context">
  <div class="spacer"></div>
  <h2 class="headline">No hablo de <span class="marca">chatbots tontos</span></h2>
  <div class="gap-md"></div>
  <div class="bento">
    <div class="bento-cell bento-cell--ancha">
      <p class="body-text">Hablo de agentes que ejecutan tareas completas: responden, cualifican, agendan y cobran. <strong>Sin que tú toques nada.</strong></p>
    </div>
    <div class="bento-cell bento-cell--oscura">
      <span class="bento-dato">24/7</span>
      <span class="bento-label">trabajando sin descanso</span>
    </div>
    <div class="bento-cell">
      <span class="bento-dato">0€</span>
      <span class="bento-label">en nóminas extra</span>
    </div>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: content (slides centrales)

Donde el bento brilla: numero de paso + headline arriba y rejilla de 2-4 celdas con
el body repartido y mini-datos. La celda de color marca el dato estrella.

```html
<section class="slide slide--content">
  <div class="spacer"></div>
  <span class="numero-paso">01</span>
  <div class="gap-md"></div>
  <h2 class="headline">Atienden WhatsApp <span class="marca">24/7</span></h2>
  <div class="gap-md"></div>
  <div class="bento">
    <div class="bento-cell bento-cell--ancha">
      <p class="body-text">Cada mensaje se responde en segundos, a las 3 de la tarde o a las 3 de la mañana. <strong>Cero leads perdidos por tardar.</strong></p>
    </div>
    <div class="bento-cell bento-cell--destacada">
      <span class="bento-dato">3 seg</span>
      <span class="bento-label">tiempo de respuesta</span>
    </div>
    <div class="bento-cell">
      <span class="bento-dato">0</span>
      <span class="bento-label">leads perdidos</span>
    </div>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="slide-number">3/8</span>
  </div>
</section>
```

## Rol: example / reveal (penultimo)

Caso real o giro. La `quote-card` es la celda oscura protagonista; debajo, una fila
de dos celdas con las cifras del caso. Para un reveal sin cita, usar el layout de
content sin `numero-paso`.

```html
<section class="slide slide--example">
  <span class="badge">Caso real</span>
  <div class="spacer"></div>
  <blockquote class="quote-card">
    "Antes perdía pedidos cada noche. Ahora el agente los toma solo y factura mientras duermo."
    <footer>Pastelería con bot de WhatsApp, cliente real</footer>
  </blockquote>
  <div class="gap-md"></div>
  <div class="bento">
    <div class="bento-cell">
      <span class="bento-dato">+40%</span>
      <span class="bento-label">pedidos nocturnos</span>
    </div>
    <div class="bento-cell bento-cell--destacada">
      <span class="bento-dato">2 sem</span>
      <span class="bento-label">para montarlo</span>
    </div>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: cta (ultimo slide)

Una celda destacada protagonista con headline, boton y refuerzo. Dentro de la celda
de color, `.marca` y `.cta-button` se invierten solos via CSS. Sin swipe-hint.

```html
<section class="slide slide--cta">
  <div class="spacer"></div>
  <div class="bento-cell bento-cell--destacada">
    <h2 class="headline">¿Quieres montar <span class="marca">el tuyo?</span></h2>
    <div class="gap-md"></div>
    <span class="cta-button">Comenta "AGENTE"</span>
    <div class="gap-md"></div>
    <p class="body-text">Y te mando la guía paso a paso por DM.</p>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="slide-number">8/8</span>
  </div>
</section>
```
