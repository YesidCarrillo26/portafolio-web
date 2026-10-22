import { expect, test, type Page } from '@playwright/test';
import { auditText } from './helpers/textAudit';

/**
 * Regresión de tipografía: ninguna palabra se parte entre líneas, ningún texto grande se sale de la pantalla,
 * no hay scroll horizontal y los títulos no se vuelven interminables en móvil.
 */
const widths = [360, 390, 768, 1280, 1440];

async function expectClean(page: Page, label: string) {
  const mobile = (page.viewportSize()?.width ?? 1280) < 768;
  const r = await auditText(page, { maxHeadingLines: mobile ? 3 : 4 });
  expect.soft(r.brokenWords, `${label}: palabras partidas`).toEqual([]);
  expect.soft(r.overflowing, `${label}: texto grande fuera de pantalla`).toEqual([]);
  expect.soft(r.tallHeadings, `${label}: títulos demasiado largos`).toEqual([]);
  expect.soft(r.horizontalScroll, `${label}: scroll horizontal`).toBe(false);
}

for (const width of widths) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test('portada', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      // La calculadora con opciones elegidas muestra más texto (resumen, extras).
      await page.locator('#calculadora label', { hasText: 'Tienda en línea' }).click();
      await page.locator('#calculadora label', { hasText: 'SEO técnico y analítica' }).click();
      await expectClean(page, `/ @${width}`);
    });

    test('laboratorio: Señal', async ({ page }) => {
      await page.goto('/laboratorio/senal');
      await page.waitForFunction(() => document.getElementById('loader')?.classList.contains('done'), null, { timeout: 15_000 });
      await page.evaluate(() => document.fonts.ready);
      await expectClean(page, `señal @${width}`);
    });

    test('laboratorio: Índice', async ({ page }) => {
      await page.goto('/laboratorio/indice');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => document.getElementById('hero')?.classList.contains('in'));
      await expectClean(page, `índice @${width}`);
    });

    test('laboratorio: Pestañas (cada sección)', async ({ page }) => {
      await page.goto('/laboratorio/pestanas');
      await page.evaluate(() => document.fonts.ready);
      for (let i = 0; i < 6; i += 1) {
        await page.evaluate((n) => dispatchEvent(new KeyboardEvent('keydown', { key: String(n) })), i);
        await page.waitForTimeout(1500);
        await expectClean(page, `pestañas[${i}] @${width}`);
      }
    });
  });
}
