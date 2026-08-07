/**
 * Genera la hoja de vida en PDF a partir de /hoja-de-vida.
 *
 * El contenido sale de src/data/site.ts, así que el PDF y la web nunca se
 * contradicen: si cambia un cargo o un resultado, se regenera y listo.
 *
 *   pnpm dev                     # en otra terminal
 *   node scripts/generar-pdf.mjs
 */
import { chromium } from "playwright";
import { stat } from "node:fs/promises";

const URL = process.env.URL ?? "http://localhost:4321/hoja-de-vida";
const SALIDA = "public/hoja-de-vida-valentina-garcia-florez.pdf";

const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.goto(URL, { waitUntil: "networkidle" });

// Sin esto puede imprimirse con la tipografía de reserva.
await pagina.evaluate(() => document.fonts.ready);
await pagina.waitForTimeout(400);

await pagina.pdf({
  path: SALIDA,
  format: "A4",
  printBackground: true, // si no, se pierden el marino y las barras vino
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await navegador.close();

const { size } = await stat(SALIDA);
console.log(`PDF generado: ${SALIDA} (${Math.round(size / 1024)} KB)`);
