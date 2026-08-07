/**
 * Revisión visual de la página con Playwright.
 * Abre el sitio local, mide lo que no se puede comprobar leyendo código
 * (posiciones reales, scroll dentro de la ventana) y guarda capturas.
 *
 *   pnpm dev                     # en otra terminal
 *   node scripts/revisar-ui.mjs  # capturas en .capturas/
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = process.env.URL ?? "http://localhost:4321/";
const SALIDA = ".capturas";
await mkdir(SALIDA, { recursive: true });

const navegador = await chromium.launch();

for (const [nombre, ancho, alto] of [
  ["escritorio", 1440, 900],
  ["celular", 390, 844],
]) {
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto } });
  await pagina.goto(URL, { waitUntil: "networkidle" });
  await pagina.waitForTimeout(800);

  for (const id of ["sobre-mi", "trabajo", "capacidades", "experiencia"]) {
    const seccion = pagina.locator(`#${id}`);
    if (!(await seccion.count())) continue;
    await seccion.scrollIntoViewIfNeeded();
    await pagina.waitForTimeout(900); // revelados y flechas
    await seccion.screenshot({ path: `${SALIDA}/${nombre}-${id}.png` });
  }
  await pagina.close();
}

// La ventana "Conoce más": comprobar que el desplazamiento ocurre DENTRO.
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
await pagina.goto(URL, { waitUntil: "networkidle" });
await pagina.locator("[data-abrir-mas]").scrollIntoViewIfNeeded();
await pagina.locator("[data-abrir-mas]").click();
await pagina.waitForTimeout(900);

const yAntes = await pagina.evaluate(() => window.scrollY);
await pagina.mouse.move(720, 500);
await pagina.mouse.wheel(0, 600);
await pagina.waitForTimeout(600);

const r = await pagina.evaluate((y) => {
  const caja = document
    .getElementById("mas-trabajo")
    .querySelector("[data-lenis-prevent]");
  return { dentro: caja?.scrollTop ?? 0, paginaSeMovio: window.scrollY !== y };
}, yAntes);

console.log(
  r.dentro > 0 && !r.paginaSeMovio
    ? `OK  la ventana se desplaza por dentro (${r.dentro}px) y la página no se movió`
    : `FALLA  dentro=${r.dentro}px paginaSeMovio=${r.paginaSeMovio}`
);

await pagina.screenshot({ path: `${SALIDA}/ventana-conoce-mas.png` });
await navegador.close();
