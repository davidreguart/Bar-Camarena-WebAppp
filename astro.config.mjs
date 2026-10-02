import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://barcamarena.com',
  integrations: [tailwind(), sitemap({ lastmod: new Date() })]
});
