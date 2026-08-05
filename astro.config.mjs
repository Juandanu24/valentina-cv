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

  integrations: [sitemap()]
});