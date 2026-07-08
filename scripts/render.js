import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { findBrowser } from "./find-browser.js";

const dir = process.argv[2];
if (!dir) {
  console.error("Uso: node scripts/render.js <carpeta-del-carrusel>");
  console.error("Ejemplo: node scripts/render.js output/2026-07-08-agentes-ia");
  process.exit(1);
}

const carouselDir = resolve(dir);
const slidesDir = join(carouselDir, "slides");
const outDir = join(carouselDir, "png");

if (!existsSync(slidesDir)) {
  console.error(`No existe la carpeta de slides: ${slidesDir}`);
  process.exit(1);
}

const files = readdirSync(slidesDir)
  .filter((f) => /^slide-\d+\.html$/.test(f))
  .sort();

if (files.length === 0) {
  console.error(`No hay archivos slide-*.html en ${slidesDir}`);
  process.exit(1);
}

const executablePath = findBrowser();
mkdirSync(outDir, { recursive: true });

console.log(`Navegador: ${executablePath}`);
console.log(`Renderizando ${files.length} slides (@2x, lienzo segun el CSS de cada slide)...`);

// --no-sandbox: necesario en Linux headless (VPS/root/contenedor); inocuo en Windows/Mac.
const launchArgs = process.platform === "linux" ? ["--no-sandbox", "--disable-setuid-sandbox"] : [];
const browser = await puppeteer.launch({ executablePath, headless: true, args: launchArgs });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });

  for (const file of files) {
    const url = pathToFileURL(join(slidesDir, file)).href;
    await page.goto(url, { waitUntil: "networkidle0" });

    // El lienzo lo define el CSS del slide (post 1080x1350, historia 1080x1920):
    // se mide el body y se ajusta el viewport para que el PNG salga exacto.
    const { w, h } = await page.evaluate(() => ({
      w: document.body.offsetWidth,
      h: document.body.offsetHeight,
    }));
    const vp = page.viewport();
    if (vp.width !== w || vp.height !== h) {
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
      await page.reload({ waitUntil: "networkidle0" });
    }

    await page.evaluate(() => document.fonts.ready);
    const outPath = join(outDir, file.replace(".html", ".png"));
    await page.screenshot({ path: outPath });
    console.log(`  ${file} (${w}x${h}) -> png/${file.replace(".html", ".png")}`);
  }
} finally {
  await browser.close();
}

console.log(`Listo. PNGs en: ${outDir}`);
