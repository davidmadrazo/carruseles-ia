# Layouts historia-editorial por rol de historia

Template de HISTORIAS (lienzo 1080x1920, 9:16). Revista editorial elegante sobre
papel crema: frases narrativas en Playfair Display italica minuscula (el CSS fuerza
la minuscula), palabra-golpe en Playfair 900 upright, pildoras negras como
etiquetas, bandas terracota (color primario) de color plano y fotos SIEMPRE en
blanco y negro con mascara de arco. Inter 400-700 para body, metadatos y pie.

Cada historia es un archivo HTML independiente. Esqueleto comun (ajusta las rutas
relativas segun la profundidad de la carpeta respecto a la raiz del repo; con la
estructura estandar `output/<carpeta>/slides/` son tres niveles). OJO: el link base
es `base-historia.css`, NO `base.css`:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../../templates/base-historia.css">
  <link rel="stylesheet" href="../../../templates/historia-editorial/styles.css">
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
- `.palabra-golpe` es la protagonista: una palabra o cifra. Tamanos: 190px por
  defecto (hasta ~6 letras), `palabra-golpe--xl` (210px) para 4 letras o menos,
  `palabra-golpe--larga` (130px) para 7 letras o mas. Palabras muy largas: particion
  manual con guion + `<br>` (`AUDI-<br>TORÍA`). Nunca dejar que desborde el lienzo.
  Variante `palabra-golpe--bloque`: banda terracota a sangre completa con la palabra
  en blanco; usarla como maximo en UN frame de la secuencia (normalmente el CTA).
- Cabecera SIEMPRE: `.historia-label` (pildora negra) con numero y rol
  (`Historia 01 — Hook`). Debajo, opcional pero recomendada, la linea
  `.metadatos` con serie y progreso (`Serie · Auditoría · 01/08`), separada por
  puntos medios `·`.
- Pie SIEMPRE: `.slide-footer` con `.footer-handle` a la izquierda y
  `.siguiente-hint` (`Siguiente &rarr;`) a la derecha. La ULTIMA historia no lleva
  siguiente-hint (solo el handle).
- El enfasis por defecto es `<span class="marca">` = subrayado fino terracota.
  NUNCA una caja de color detras del texto; para etiquetas con pildora negra usar
  `.badge`.
- Las frases `.headline` se escriben como frase natural: el CSS las pasa a
  minuscula. No escribirlas en mayusculas. La `.palabra-golpe` el CSS la pasa a
  MAYUSCULA solo. Siglas dentro de una frase (DM, IA, CRM): envolverlas en
  `<span class="siglas">DM</span>` para que no las aplaste la minuscula.
- Foto opcional con `.foto-arco`: `<div class="foto-arco"><img src="..."></div>`
  (o `style="background-image: url(...)"` en el div). El blanco y negro lo pone el
  CSS solo; no hace falta tratar la foto.
- Zonas seguras: el padding del lienzo (220px arriba, 280px abajo) ya evita la UI
  de Instagram. No colocar nada posicionado en absoluto dentro de esas franjas.
- Centrado vertical del bloque principal con `<div class="spacer"></div>` antes y
  despues. Ortografia perfecta: tildes, eñes y signos de apertura.
- Nada de fondos oscuros, sombras, glows ni gradientes: esto es luz, papel y aire.

## Rol: hook (historia 1)

Portada: franja lateral terracota (la pone el CSS), frase partida por la
palabra-golpe y pregunta abierta abajo para retener.

```html
<section class="slide slide--hook">
  <span class="historia-label">Historia 01 — Hook</span>
  <span class="metadatos">Serie · Auditoría · 01/08</span>
  <div class="spacer"></div>
  <p class="headline">Tu negocio pierde</p>
  <div class="palabra-golpe">Horas</div>
  <p class="headline">y dinero cada semana.</p>
  <div class="gap-lg"></div>
  <p class="body-text">¿Tienes el número exacto?</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: problema

Nombra el dolor. Ornamento de linea vertical discontinua en el margen (lo pone el
CSS) y pasaje `.card` con la misma linea.

```html
<section class="slide slide--problema">
  <span class="historia-label">Historia 02 — Problema</span>
  <span class="metadatos">Serie · Auditoría · 02/08</span>
  <div class="spacer"></div>
  <p class="headline">Tu equipo quema el día en</p>
  <div class="palabra-golpe">Tareas</div>
  <div class="gap-md"></div>
  <div class="card">
    <p class="body-text">que una máquina haría gratis. Y <span class="marca">nadie</span> las cuenta.</p>
  </div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: insight

El giro mental. La palabra-golpe lleva subrayado grueso terracota (lo pone el CSS).

```html
<section class="slide slide--insight">
  <span class="historia-label">Historia 03 — Insight</span>
  <span class="metadatos">Serie · Auditoría · 03/08</span>
  <div class="spacer"></div>
  <p class="headline">El problema no es el trabajo manual.</p>
  <div class="palabra-golpe">Medir.</div>
  <p class="headline">Cuando ves el número, no puedes <span class="marca">no actuar</span>.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: solucion

Que existe, no como funciona. Frame ideal para la `.foto-arco` (retrato o producto,
el CSS lo pasa a blanco y negro).

```html
<section class="slide slide--solucion">
  <span class="historia-label">Historia 04 — Solución</span>
  <span class="metadatos">Serie · Auditoría · 04/08</span>
  <div class="spacer"></div>
  <div class="foto-arco"><img src="../fotos/retrato.jpg" alt=""></div>
  <div class="gap-md"></div>
  <p class="headline">Un agente que trabaja por ti,</p>
  <div class="palabra-golpe palabra-golpe--xl">24/7</div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

Sin foto: quitar el `.foto-arco` y cerrar con una linea
`<p class="body-text">Responde, agenda y cobra <span class="marca">sin ti</span>.</p>`.

## Rol: proof

La cifra manda: `.numero-paso` como stat serif gigante terracota con filete hasta
el margen.

```html
<section class="slide slide--proof">
  <span class="historia-label">Historia 05 — Proof</span>
  <span class="metadatos">Serie · Auditoría · 05/08</span>
  <div class="spacer"></div>
  <span class="numero-paso">11 h</span>
  <div class="gap-md"></div>
  <p class="headline">recuperadas cada semana.</p>
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

Testimonio con `.quote-card`: comillas serif gigantes terracota + atribucion en
versalitas. Las comillas de apertura las pone el CSS; no escribirlas en el texto.

```html
<section class="slide slide--social-proof">
  <span class="historia-label">Historia 06 — Caso real</span>
  <span class="metadatos">Serie · Auditoría · 06/08</span>
  <div class="spacer"></div>
  <blockquote class="quote-card">
    Antes perdía pedidos cada noche. Ahora factura mientras duermo.
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

Frase lapidaria centrada en el eje. Minimo texto, maximo aire.

```html
<section class="slide slide--punchline">
  <span class="historia-label">Historia 07 — Punchline</span>
  <div class="spacer"></div>
  <p class="headline">El que mide,</p>
  <div class="palabra-golpe palabra-golpe--xl">Gana.</div>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
    <span class="siguiente-hint">Siguiente &rarr;</span>
  </div>
</section>
```

## Rol: cta (ultima historia)

Cierre centrado: la palabra a comentar va en `palabra-golpe--bloque` (banda
terracota a sangre, palabra en blanco). Sin siguiente-hint. Para CTAs de link o DM
directo existe `.cta-button` (bloque terracota) como alternativa:
`<span class="cta-button">Escríbeme "AUDITORÍA"</span>`.

```html
<section class="slide slide--cta">
  <span class="historia-label">Historia 08 — CTA</span>
  <div class="spacer"></div>
  <p class="headline">Comenta</p>
  <div class="palabra-golpe palabra-golpe--larga palabra-golpe--bloque">Auditoría</div>
  <p class="headline">y te mando el diagnóstico gratis por <span class="siglas">DM</span>.</p>
  <div class="spacer"></div>
  <div class="slide-footer">
    <span class="footer-handle">@tuhandle</span>
  </div>
</section>
```
