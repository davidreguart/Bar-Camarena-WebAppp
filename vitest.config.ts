
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    // Vitest configuration options
    include: ['src/**/*.test.ts'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});
