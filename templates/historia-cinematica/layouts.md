# Layouts historia-cinematica por rol de historia

Template de HISTORIAS (lienzo 1080x1920, 9:16). Cada historia es un archivo HTML
independiente. Esqueleto comun (ajusta las rutas relativas segun la profundidad de
la carpeta respecto a la raiz del repo; con la estructura estandar
`output/<carpeta>/slides/` son tres niveles). OJO: el link base es
`base-historia.css`, NO `base.css`:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../templates/base-historia.css">
  <link rel="stylesheet" href="../../../templates/historia-cinematica/styles.css">
  <link rel="stylesheet" href="../brand.css">
</head>
<body>
  <!-- aqui va la section del rol correspondiente -->
</body>
</html>
```

Reglas duras para todos los roles:

- **Una sola idea por historia.** Maximo ~15 palabras visibles ademas de la
  `.palabra-golpe`. Si sobra texto, sobra una historia mas, no mas parrafos.
- `.palabra-golpe` es la protagonista de casi todos los frames: una palabra en
  display gigante. Tamaños: por defecto 200px (hasta ~6 letras);
  `palabra-golpe--xl` (240px) para palabras de 4 letras o menos;
  `palabra-golpe--larga` (180px) o particion manual con guion + `<br>`
  (`AUDI-<br>TORÍA`) para palabras largas. Nunca dejar que una palabra
  desborde el lienzo: partirla o bajar al modificador largo.
- Cabecera SIEMPRE: `.historia-label` con numero y rol
  (`Historia 01 — Hook`). Pie SIEMPRE: `.slide-footer` con `.footer-handle` a la
  izquierda y `.siguiente-hint` (`Siguiente &rarr;`) a la derecha. La ULTIMA
  historia no lleva siguiente-hint (solo el handle).
- Zonas seguras: el padding del lienzo (220px arriba, 280px abajo) ya evita la UI
  de Instagram. No colocar nada posicionado en absoluto dentro de esas franjas.
- Foto opcional: añadir `<img class="bg-image" src="...">` como PRIMER hijo de la
  section. El overlay oscuro lo pone el CSS solo; el template tambien funciona sin
  foto (degradado oscuro de marca por defecto).
- Resaltar 1-2 palabras de una frase con `<span class="marca">` (pildora).
- Centrado vertical del bloque principal con `<div class="spacer"></div>` antes y
  despues. Ortografia perfecta: tildes, eñes y signos de apertura.
- Nada de cajas opacas ni bordes duros: aqui el diseño es tipografia sobre imagen.

## Rol: hook (historia 1)

Frase corta partida por la palabra-golpe. Pregunta abierta abajo para retener.

```html
<section class="slide slide--hook">
  <span class="historia-label">Historia 01 — Hook</span>
  <div class="spacer"></div>
  <h1 class="headline">Tu negocio pierde</h1>
  <div class="palabra-golpe">Horas</div>
  <p class="headline">y dinero cada semana.</p>
  <div class="spacer"></div>
  <p class="body-text">¿Tienes el número exacto?</p>
  <div class="gap-md"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: problema

El frame mas oscuro de la secuencia (el overlay se endurece solo). Nombra el dolor.

```html
<section class="slide slide--problema">
  <span class="historia-label">Historia 02 — Problema</span>
  <div class="spacer"></div>
  <h2 class="headline">Tu equipo quema el día en</h2>
  <div class="palabra-golpe">Tareas</div>
  <p class="body-text">que una máquina haría gratis. Y <span class="marca">nadie</span> las cuenta.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: insight

El giro mental. La palabra-golpe es el concepto que lo cambia todo.

```html
<section class="slide slide--insight">
  <span class="historia-label">Historia 03 — Insight</span>
  <div class="spacer"></div>
  <h2 class="headline">El problema no es el trabajo manual.</h2>
  <div class="palabra-golpe">Medir.</div>
  <p class="body-text">Es que nadie lo ha medido. Cuando ves el número, no puedes <span class="marca">no actuar</span>.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: solucion

El halo de marca gana presencia (lo pone el CSS). Que existe, no como funciona.

```html
<section class="slide slide--solucion">
  <span class="historia-label">Historia 04 — Solución</span>
  <div class="spacer"></div>
  <h2 class="headline">Un agente que trabaja</h2>
  <div class="palabra-golpe palabra-golpe--xl">24/7</div>
  <p class="body-text">Responde, agenda y cobra <span class="marca">sin ti</span>.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: proof

La cifra manda: `.numero-paso` como stat gigante en color secundario.

```html
<section class="slide slide--proof">
  <span class="historia-label">Historia 05 — Proof</span>
  <div class="spacer"></div>
  <span class="numero-paso">11 h</span>
  <div class="gap-md"></div>
  <h2 class="headline">recuperadas cada semana.</h2>
  <div class="gap-md"></div>
  <p class="body-text">Cliente real, primer mes con el agente.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: social-proof

Testimonio con `.quote-card`: cursiva + barra lateral, sin caja opaca.

```html
<section class="slide slide--social-proof">
  <span class="historia-label">Historia 06 — Caso real</span>
  <div class="spacer"></div>
  <blockquote class="quote-card">
    "Antes perdía pedidos cada noche. Ahora factura mientras duermo."
    <footer>Pastelería, cliente real</footer>
  </blockquote>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: punchline

Frase lapidaria centrada. Minimo texto, maximo aire.

```html
<section class="slide slide--punchline">
  <span class="historia-label">Historia 07 — Punchline</span>
  <div class="spacer"></div>
  <h2 class="headline">El que mide,</h2>
  <div class="palabra-golpe palabra-golpe--xl">Gana.</div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: cta (ultima historia)

La palabra-golpe ES el call to action (palabra a comentar). Sin siguiente-hint.
Para CTAs de link o DM directo existe `.cta-button` (pildora solida) como
alternativa: `<span class="cta-button">Escríbeme "AUDITORÍA"</span>`.

```html
<section class="slide slide--cta">
  <span class="historia-label">Historia 08 — CTA</span>
  <div class="spacer"></div>
  <h2 class="headline">Comenta</h2>
  <div class="palabra-golpe">Audi-<br>toría</div>
  <p class="body-text">y te mando el diagnóstico gratis por DM.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
  </div>
</section>
```
