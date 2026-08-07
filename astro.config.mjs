// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio .co final una vez comprado.
  site: 'https://valentinagarciaflorez.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  // /hoja-de-vida existe solo como origen del PDF: no debe competir con la
  // portada en los buscadores.
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/hoja-de-vida') })]
});