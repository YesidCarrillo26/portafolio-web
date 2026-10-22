import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  retries: 0,
  reporter: [['list']],
  // Usa el Chrome instalado (sin descargar navegadores); en CI, `pnpm exec playwright install chromium` y quitar `channel`.
  use: { baseURL, trace: 'retain-on-failure', channel: process.env.PW_CHANNEL ?? 'chrome' },
  // Si se prueba contra una URL pública, no se levanta servidor local.
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'pnpm build && pnpm start', url: baseURL, reuseExistingServer: true, timeout: 240_000 },
});
