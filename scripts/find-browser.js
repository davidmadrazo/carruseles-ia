import { existsSync } from "node:fs";

/**
 * Localiza un navegador Chromium instalado en el sistema.
 * Orden: CHROME_PATH (env) > Chrome > Edge > Brave.
 * @returns {string} ruta al ejecutable
 */
export function findBrowser() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv) {
    if (existsSync(fromEnv)) return fromEnv;
    console.error(`CHROME_PATH apunta a una ruta que no existe: ${fromEnv}`);
    process.exit(1);
  }

  const candidates =
    process.platform === "win32"
      ? [
          `${process.env["PROGRAMFILES"]}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env["PROGRAMFILES"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
          `${process.env["PROGRAMFILES(X86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
          `${process.env["PROGRAMFILES"]}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
        ]
      : process.platform === "darwin"
        ? [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
            "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
          ]
        : [
            "/usr/bin/google-chrome",
            "/usr/bin/google-chrome-stable",
            "/usr/bin/chromium",
            "/usr/bin/chromium-browser",
            "/usr/bin/microsoft-edge",
            "/snap/bin/chromium",
          ];

  for (const path of candidates) {
    if (path && existsSync(path)) return path;
  }

  console.error(
    [
      "No se encontro ningun navegador (Chrome, Edge o Brave).",
      "Soluciones:",
      "  1. Instala Google Chrome: https://www.google.com/chrome/",
      "  2. O descarga un Chrome portable con: npx puppeteer browsers install chrome",
      "     y apunta a el con la variable de entorno CHROME_PATH.",
    ].join("\n"),
  );
  process.exit(1);
}
