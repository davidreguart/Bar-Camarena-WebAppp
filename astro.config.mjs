import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

// Fecha del último commit que toca un fichero (o undefined si no hay git)
const gitDate = (file) => {
  try {
    const d = execSync(`git log -1 --format=%cI -- ${file}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return d ? new Date(d) : undefined;
  } catch {
    return undefined;
  }
};

const PAGE_FILES = {
  '/': ['data/dishes.json', 'src/data/siteContent.json', 'src/pages/index.astro'],
  '/carta/': ['src/data/siteContent.json', 'src/pages/carta.astro'],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://barcamarena.com',
  integrations: [tailwind(), sitemap({
      serialize(item) {
        const files = PAGE_FILES[new URL(item.url).pathname] ?? [];
        const dates = files.map(gitDate).filter(Boolean);
        item.lastmod = (dates.length ? new Date(Math.max(...dates)) : new Date()).toISOString();
        return item;
      },
    })]
});
