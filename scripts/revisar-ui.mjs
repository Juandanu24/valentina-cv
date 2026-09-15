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

// Se desplaza como lo haría una persona, con la rueda: Lenis intercepta
// `window.scrollTo` (y el "scroll" que hace Playwright por debajo), así que
// solo la rueda dispara de verdad los eventos que Lenis y los
// IntersectionObserver necesitan. Avanza en pasos cortos hasta quedar a
// `destino` px del tope del documento.
async function irA(pagina, destino) {
  for (let i = 0; i < 60; i++) {
    const y = await pagina.evaluate(() => window.scrollY);
    const delta = destino - y;
    if (Math.abs(delta) < 8) break;
    const paso = Math.sign(delta) * Math.min(Math.abs(delta), 260);
    await pagina.mouse.wheel(0, paso);
    await pagina.waitForTimeout(90);
  }
}

// `seccion.screenshot()` sobre una sección más alta que el viewport captura
// "más allá del viewport" (vía CDP) sin desplazar la página de verdad, así
// que las tarjetas de más abajo no llegan a pasar por el viewport y su
// IntersectionObserver no dispara. Por eso, antes de capturar, se recorre
// la sección completa con scroll real (tope → fondo → tope de nuevo) para
// que cada tarjeta se cargue, y se espera a que las imágenes visibles
// terminen de cargar (o un tiempo prudente, si alguna tarda más).
async function cargarSeccion(pagina, seccion, id) {
  const { top, bottom } = await seccion.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
  });
  const alto = pagina.viewportSize()?.height ?? 900;
  const ancho = pagina.viewportSize()?.width ?? 1440;

  await pagina.mouse.move(ancho / 2, alto / 2);
  await irA(pagina, Math.max(0, top - 40));
  await irA(pagina, Math.max(0, bottom - alto + 40)); // recorre la sección entera
  await pagina
    .waitForFunction(
      (sel) => {
        const imgs = Array.from(document.querySelectorAll(`${sel} img`));
        return imgs.every((img) => !img.src || img.naturalWidth > 0);
      },
      `#${id}`,
      { timeout: 4000 }
    )
    .catch(() => {}); // tiempo prudente: si alguna tarda más, se sigue de todos modos
  await irA(pagina, Math.max(0, top - 40)); // vuelve al encuadre para la captura
  await pagina.waitForTimeout(900); // revelados y flechas
}

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
    await cargarSeccion(pagina, seccion, id);
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
