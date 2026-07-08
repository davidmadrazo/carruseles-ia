# Layouts editorial (v2 "revista viva") por rol de slide

Revista impresa premium sobre papel calido con TENSION: composiciones asimetricas,
elementos que se salen del lienzo y anotaciones de editor a mano. Playfair Display
(900 upright + italica en minuscula), filetes, folios, acentos del primario.

REGLA DE EMPUJE (no negociable): cada slide menos el ultimo lleva AL MENOS UN
elemento inacabado o direccional — `palabra-display` con `.fuga-derecha` (cortada a
sangre), `.foto-arco--fuga`, o `.flecha-mano`. Maximo 2 trucos por slide (fuga,
anotacion, cinta...): tension si, collage caotico no. El CTA es la UNICA composicion
cerrada y centrada del carrusel.

Esqueleto comun (rutas desde `output/<carpeta>/slides/`):

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../templates/base.css">
  <link rel="stylesheet" href="../../../templates/editorial/styles.css">
  <link rel="stylesheet" href="../brand.css">
</head>
<body>
  <!-- section del rol -->
</body>
</html>
```

Piezas v2 y cuando usarlas:
- `.headline-italica` — frases narrativas en minuscula (portada poetica).
- `.palabra-display` + `.fuga-derecha` — LA palabra del slide cortada a sangre por
  la derecha (elegir palabra de 7+ letras; se corta sola por overflow).
- `.palabra-display--contorno` — variante en contorno primario para mezclar palabra
  rellena + palabra hueca.
- `.subrayado-mano` / `.circulo-mano` — anotaciones de editor sobre 1-2 palabras o
  cifras (mascaras SVG que heredan --brand-primary).
- `.flecha-mano` — flecha organica apuntando a la derecha; remate direccional de
  slides intermedios sin fuga.
- `.foto-arco` (+`--fuga`) — foto SIEMPRE en blanco y negro con mascara de arco.
- `.cinta` — cinta adhesiva de collage sobre una foto o `.card` (una por carrusel). OJO: NO combinar con `.quote-card` — ambas usan ::before y la cinta pisa las comillas.
- `.badge--rotada` — kicker con giro leve de sello a mano.
- Ortografia perfecta; el resto de reglas del estilo v1 siguen vigentes.

## Rol: hook (slide 1)

Portada con fuga: italica minuscula + palabra display cortada a sangre.

```html
<section class="slide slide--hook">
  <span class="badge badge--rotada">Agentes IA</span>
  <div class="spacer"></div>
  <p class="headline-italica">tu competencia ya tiene</p>
  <div class="palabra-display fuga-derecha">Empleados</div>
  <p class="headline-italica">que <span class="subrayado-mano">no duermen</span>.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: context (slide 2)

Amplia sin revelar. Foto fugada como señal de continuacion.

```html
<section class="slide slide--context">
  <div class="spacer"></div>
  <h2 class="headline">No hablo de <span class="marca">chatbots tontos</span></h2>
  <div class="gap-md"></div>
  <div class="foto-arco foto-arco--fuga cinta"><img src="../img/foto.png" alt=""></div>
  <div class="gap-md"></div>
  <div class="card">
    <p class="body-text">Hablo de agentes que ejecutan tareas completas. <strong>Sin que tú toques nada.</strong></p>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

Sin foto: sustituir el bloque por `.palabra-display--contorno` con `.fuga-derecha`.

## Rol: content (slides centrales)

Folio + anotacion en la cifra + flecha de remate.

```html
<section class="slide slide--content">
  <span class="numero-paso">01</span>
  <div class="spacer"></div>
  <h2 class="headline">Atienden WhatsApp <span class="circulo-mano">24/7</span></h2>
  <div class="gap-md"></div>
  <div class="card">
    <p class="body-text">Cada mensaje se responde en segundos, a las 3 de la tarde o a las 3 de la mañana. <strong>Cero leads perdidos por tardar.</strong></p>
  </div>
  <div class="gap-md"></div>
  <div class="flecha-mano"></div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="slide-number">3/8</span>
  </div>
</section>
```

## Rol: example / reveal (penultimo)

Cita editorial (comillas gigantes). La promesa se paga aqui. La cinta, si se usa, va en una .card o foto, no en la cita.

```html
<section class="slide slide--example">
  <span class="badge">Caso real</span>
  <div class="spacer"></div>
  <blockquote class="quote-card">
    Antes perdía pedidos cada noche. Ahora factura mientras duermo.
    <footer>Pastelería, cliente real</footer>
  </blockquote>
  <div class="gap-md"></div>
  <div class="flecha-mano"></div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="swipe-hint">Desliza &rarr;</span>
  </div>
</section>
```

## Rol: cta (ultimo slide)

La UNICA composicion cerrada: colofon centrado, el ojo descansa en la accion.

```html
<section class="slide slide--cta">
  <span class="badge">Ultimo paso</span>
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
