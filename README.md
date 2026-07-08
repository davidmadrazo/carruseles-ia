# Carruseles IA

Genera carruseles virales de Instagram con Claude Code: tu le das el tema, y salen
los PNGs listos para publicar (1080x1350) con guion viral, diseño profesional y
caption incluidos.

![Ejemplo de slide](ejemplos/neobrutalism-agentes-ia/slide-01.png)

## Que hace

1. Le pides un carrusel sobre cualquier tema: `hazme un carrusel sobre agentes de IA`
2. Claude genera el guion con estructura viral (hook, desarrollo, CTA) usando
   frameworks probados (AIDA, 13 tipos de hook).
3. Diseña cada slide en HTML con uno de los 5 estilos incluidos.
4. Los renderiza a PNG de alta resolucion con tu marca (colores, handle).
5. Te escribe el caption con hashtags.

Todo en tu ordenador. Sin suscripciones, sin Canva, sin marcas de agua.

## Que necesitas

- **Claude Code** ([claude.com/claude-code](https://claude.com/claude-code))
- **Node.js 18 o superior** ([nodejs.org](https://nodejs.org), boton verde LTS)
- **Google Chrome o Microsoft Edge** (si usas Windows, Edge ya viene instalado)

## Instalacion

### Opcion A: con git

```
git clone https://github.com/davidmadrazo/carruseles-ia.git
cd carruseles-ia
npm install
```

### Opcion B: sin git

1. Descarga el ZIP (boton verde "Code" > "Download ZIP") y descomprimelo.
2. Abre una terminal en esa carpeta:
   - **Windows**: abre la carpeta en el Explorador, escribe `cmd` en la barra de
     direcciones y pulsa Enter.
   - **Mac**: clic derecho en la carpeta > "Nueva terminal en la carpeta".
3. Ejecuta `npm install`.

## Uso

1. Abre Claude Code dentro de la carpeta:

```
claude
```

2. Pidele tu primer carrusel:

```
hazme un carrusel sobre [tu tema]
```

3. La primera vez te preguntara por tu marca (nombre, handle, colores) y la guardara
   en `brand.json`. Las siguientes veces va directo.

4. Los PNGs aparecen en `output/FECHA-tema/png/`, junto al caption listo para copiar.

## Los 5 estilos incluidos

| Estilo | Cuando usarlo |
|---|---|
| `neobrutalism` | Opiniones fuertes, contraste, contenido directo |
| `liquid-glass` | Producto, tech premium, dark mode |
| `gradient-mesh` | Vision, futuro, contenido aspiracional |
| `bento-grid` | Listas, comparativas, features |
| `neumorphism` | Calma, procesos, bienestar |

Pide el que quieras: `hazme un carrusel sobre X con estilo liquid-glass`. Si no dices
nada, usa el de `estilo_por_defecto` en tu `brand.json`.

## Solucion de problemas

| Problema | Solucion |
|---|---|
| "No se encontro ningun navegador" | Instala Chrome, o ejecuta `npx puppeteer browsers install chrome` y define la variable `CHROME_PATH` con la ruta que imprime |
| `npm install` falla | Comprueba que Node es 18+ con `node --version` |
| Los slides salen con fuente rara | No muevas las carpetas `templates/` ni `assets/` |

## Creditos

Creado por [David Madrazo](https://instagram.com/davidmadrazo.ia) (ProfimaxIA).
Sigueme en Instagram para mas herramientas de IA: [@davidmadrazo.ia](https://instagram.com/davidmadrazo.ia)

Licencia MIT: usalo, modificalo y compartelo libremente.
