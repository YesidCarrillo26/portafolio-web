import { expect, test } from '@playwright/test';
import { nav } from '../content/site';

const pages = ['/', '/laboratorio', '/laboratorio/comparar', '/laboratorio/senal', '/laboratorio/indice', '/laboratorio/pestanas', '/laboratorio/lienzo'];

for (const path of pages) {
  test(`responde 200: ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
  });
}

test('los enlaces antiguos redirigen al laboratorio', async ({ request }) => {
  for (const [from, to] of [
    ['/comparar.html', '/laboratorio/comparar'],
    ['/conceptos/02-indice', '/laboratorio/indice'],
  ] as const) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()['location']).toContain(to);
  }
});

test('la portada no tiene errores de consola y el menú apunta a secciones que existen', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  for (const item of nav.filter((n) => n.href.startsWith('#'))) {
    await expect(page.locator(item.href), `ancla ${item.href}`).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('el tema oscuro se aplica con data-theme', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Cambiar a tema oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Cambiar a tema claro' })).toBeVisible();
});

test('todos los botones de WhatsApp llevan un mensaje', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[data-whatsapp]').evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
  expect(hrefs.length).toBeGreaterThan(5);
  for (const h of hrefs) expect(h).toMatch(/^https:\/\/wa\.me\/[0-9A-Za-z]+\?text=.{10,}/);
});

test('el menú móvil abre y navega', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menú' }).click();
  const dialog = page.getByRole('dialog', { name: 'Menú' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Planes' }).click();
  await expect(page).toHaveURL(/#planes$/);
});
