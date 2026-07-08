# Como crear un nuevo estilo (design system de slides)

Un estilo es una carpeta `templates/<nombre>/` con dos archivos: `styles.css` (el
lenguaje visual) y `layouts.md` (los snippets HTML canonicos por rol). Nada mas.
El resto del sistema (render, marca) lo recoge solo si
sigues los pasos de esta guia.

## Paso 0: direccion de diseño

Antes de tocar codigo, definir en una frase:
- **Nombre** en kebab-case (`editorial`, `retro-terminal`...).
- **Vibe**: que transmite y cuando se usa (esto ira a las tablas de SKILL.md y README).
- **Referencia**: si tienes un doc o moodboard del estilo, destilarlo. Si no, definir
  3-4 rasgos duros del estilo (tipografia, tratamiento del color, textura, forma).

## Paso 1: el contrato de clases (OBLIGATORIO)

Todos los estilos estilizan EXACTAMENTE el mismo set de clases. Asi un slide cambia
de estilo cambiando solo el `<link>` de CSS:

```
.headline  .body-text  .marca  .badge  .card  .numero-paso  .quote-card
.cta-button  .swipe-hint  .gap-md  .gap-lg
.slide--hook  .slide--context  .slide--content  .slide--example  .slide--reveal  .slide--cta
```

Reglas duras:
- Colores SOLO via variables `--brand-primary`, `--brand-secondary`, `--brand-bg`,
  `--brand-text`, `--brand-on-primary`. Cero hex hardcodeados (blanco/negro neutros
  permitidos). Derivar tonos con `color-mix()` — usar `in oklch` para gradientes
  entre colores de marca (sRGB da punto medio gris).
- Decoracion (blobs, glows, texturas) en `.slide::before` / `.slide::after` dentro
  del CSS, NUNCA como divs en el HTML — el HTML debe seguir siendo intercambiable.
- Legibilidad no negociable: headline hook max 88px y minimo 64px en cualquier rol,
  body minimo 36px, contraste alto siempre.
- Puedes añadir clases EXTRA propias del estilo (como hace bento-grid con
  `.bento-cell`) siempre que las del contrato sigan funcionando solas.
- El lienzo es sagrado: nunca redefinir tamaños de `.slide` ni el padding de 80px
  (vienen de `templates/base.css`).

## Paso 2: tipografia (y fuentes nuevas si hacen falta)

Empaquetadas en `assets/fonts/`: Inter variable (100-900) y Archivo Black. Elegir y
documentar la decision en el layouts.md (ej. neobrutalism usa Archivo Black; los
estilos suaves usan Inter 900).

Si el estilo pide OTRA fuente (ej. una serif editorial):
1. Descargar el woff2 subset latin desde Google Fonts (fuentes OFL): pedir el CSS a
   `https://fonts.googleapis.com/css2?family=<Fuente>:wght@<pesos>` con User-Agent de
   Chrome y copiar la URL del bloque `/* latin */`.
2. Guardarla en `assets/fonts/<nombre>-<peso>.woff2`. OJO: muchas fuentes de Google
   son variables y css2 devuelve la MISMA URL para todos los pesos; en ese caso
   guardar UN solo archivo (`<nombre>-<min>-<max>.woff2`) y declararlo con
   `font-weight: <min> <max>`.
3. Declarar el `@font-face` DENTRO del `styles.css` del estilo (no en base.css) con
   ruta relativa `../../assets/fonts/<archivo>.woff2`.

## Paso 3: escribir `templates/<nombre>/styles.css`

Copiar la estructura de un estilo existente como esqueleto (el mas cercano en
espiritu) y reescribir el lenguaje visual. Cubrir TODAS las clases del contrato y
las variantes de rol.

## Paso 4: escribir `templates/<nombre>/layouts.md`

Mismo formato que los existentes (mirar `templates/neobrutalism/layouts.md`):
esqueleto HTML comun + un snippet completo por rol (hook, context, content, example,
cta). Reglas: textos de ejemplo con tildes correctas, footer en todos los slides,
swipe-hint en todos menos el ultimo, centrado vertical con `.spacer`.

## Paso 5: test render + QC visual

1. Crear `output/test-<nombre>/brand.css` (copiar el bloque :root de `brand.json` en formato CSS, como documenta SKILL.md).
2. Crear `output/test-<nombre>/slides/` con 3 slides: `slide-01.html` (hook),
   `slide-02.html` (content), `slide-03.html` (cta). Usa los mismos textos del
   carrusel de `ejemplos/` para poder comparar el mismo contenido entre estilos. Links CSS desde ahi: `../../../templates/...`
   y `../brand.css`.
3. `node scripts/render.js output/test-<nombre>`
4. Abrir los 3 PNGs (herramienta Read) y pasar el checklist:
   - Texto completo sin cortes ni desbordes del lienzo
   - Contraste legible en todos los bloques (ojo con texto sobre color)
   - Tamaños minimos respetados
   - El estilo se distingue claramente de los demas estilos existentes
   - Ortografia con tildes
5. Iterar hasta que pase todo.

## Paso 6: registrar el estilo

1. `SKILL.md` — añadir fila a la tabla de "Paso 2: elegir design system" (estilo +
   cuando usarlo).
2. `README.md` — añadir la misma fila a la tabla de estilos y actualizar el numero
   en TODAS sus menciones: el titulo de la seccion Y la linea de la intro
   ("Diseña cada slide en HTML con uno de los N estilos incluidos").

## Paso 7: commit

Commit en español estilo conventional: `feat: estilo <nombre> (<vibe en 3 palabras>)`.
