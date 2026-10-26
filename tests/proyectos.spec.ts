import { expect, test } from '@playwright/test';
import { projects } from '../content/proyectos';

test.describe('proyectos: galería horizontal', () => {
  test('en escritorio el scroll vertical recorre las tarjetas hasta la última', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const section = page.locator('#proyectos');
    await expect(section.locator('article')).toHaveCount(projects.length);

    const { top, height } = await section.evaluate((el) => ({ top: (el as HTMLElement).offsetTop, height: (el as HTMLElement).offsetHeight }));
    // Al inicio del recorrido la primera tarjeta está a la vista y la última no.
    await page.evaluate((t) => scrollTo(0, t - 64), top);
    await page.waitForTimeout(300);
    const first = section.locator('article').first();
    const last = section.locator('article').last();
    expect(await first.boundingBox()).toMatchObject({ x: expect.any(Number) });
    expect((await last.boundingBox())!.x).toBeGreaterThan(1440);

    // Al final, la última tarjeta queda completa dentro de la pantalla.
    await page.evaluate(([t, h]) => scrollTo(0, t! - 64 + h! - (innerHeight - 64)), [top, height]);
    await page.waitForTimeout(400);
    const box = (await last.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(1440);
  });

  test('en móvil es un carrusel con scroll horizontal y los enlaces funcionan', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.goto('/');
    const scroller = page.locator('#proyectos [data-audit-ignore]');
    expect(await scroller.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await expect(page.getByRole('link', { name: /Ver el Storybook/ })).toHaveAttribute('href', /chroma-storybook\.vercel\.app/);
    await ctx.close();
  });
});
