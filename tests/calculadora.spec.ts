import { expect, test } from '@playwright/test';
import { buildQuote, initialAnswers } from '../lib/quote';
import { formatCOP } from '../lib/pricing';
import { quoteMessage } from '../lib/whatsapp';

test.describe('calculadora', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#calculadora');
  });

  test('sin tipo de proyecto no hay precio y el botón de WhatsApp no aparece', async ({ page }) => {
    await expect(page.getByTestId('quote-empty')).toBeVisible();
    await expect(page.getByTestId('quote-whatsapp')).toHaveCount(0);
  });

  test('el total coincide con lib/pricing y el enlace de WhatsApp lleva el resumen', async ({ page }) => {
    const pick = (title: string) => page.locator('#calculadora label', { hasText: title }).first();
    await pick('Tienda en línea').click();
    await pick('Panel para editar contenido').click();
    await pick('SEO técnico y analítica').click();
    await pick('Rápido').click();

    const expected = buildQuote({ ...initialAnswers, type: 'tienda', extras: ['cms', 'seo'], rush: 'rapido' })!;
    const range = page.getByTestId('quote-range');
    await expect(range).toContainText(formatCOP(expected.estimate.low));
    await expect(range).toContainText(formatCOP(expected.estimate.high));
    await expect(page.getByTestId('quote-weeks')).toContainText(`${expected.estimate.weeks}`);

    const href = await page.getByTestId('quote-whatsapp').getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\/[0-9A-Za-z]+\?text=/);
    expect(decodeURIComponent(href!.split('?text=')[1]!)).toBe(quoteMessage(expected));
  });

  test('al cambiar de app a web se descartan los extras que ya no aplican', async ({ page }) => {
    const pick = (title: string) => page.locator('#calculadora label', { hasText: title }).first();
    await pick('App móvil').click();
    await pick('Notificaciones push').click();
    await expect(page.getByTestId('quote-panel')).toContainText('Notificaciones push');
    await pick('Una sola vista').click();
    await expect(page.getByTestId('quote-panel')).not.toContainText('Notificaciones push');
  });
});
