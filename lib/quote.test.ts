import { describe, expect, it } from 'vitest';
import { plans } from '@/content/planes';
import { availableExtras, buildQuote, initialAnswers, normalize, type Answers } from './quote';
import { planMessage, quoteMessage, whatsappLink } from './whatsapp';

const answers = (over: Partial<Answers>): Answers => ({ ...initialAnswers, ...over });
const planPrice = (id: string) => plans.find((p) => p.id === id)!.price;

describe('buildQuote', () => {
  it('sin tipo de proyecto no hay cotización', () => {
    expect(buildQuote(initialAnswers)).toBeNull();
  });

  it('reproduce los planes publicados: la calculadora y los planes nunca se contradicen', () => {
    expect(buildQuote(answers({ type: 'landing' }))!.estimate.price).toBe(planPrice('esencial'));
    expect(buildQuote(answers({ type: 'sitio', extras: ['cms', 'seo'] }))!.estimate.price).toBe(planPrice('negocio'));
    expect(buildQuote(answers({ type: 'tienda', extras: ['cms', 'seo'] }))!.estimate.price).toBe(planPrice('tienda'));
    expect(buildQuote(answers({ type: 'app' }))!.estimate.price).toBe(planPrice('app-mvp'));
    expect(
      buildQuote(answers({ type: 'app', accounts: 'basic', extras: ['backend', 'push', 'tiendas'] }))!.estimate.price,
    ).toBe(planPrice('app-completa'));
  });

  it('necesitar el diseño suma horas, distintas para web y app', () => {
    const web = buildQuote(answers({ type: 'landing', design: 'need' }))!;
    const app = buildQuote(answers({ type: 'app', design: 'need' }))!;
    expect(web.estimate.hours).toBe(20 + 16);
    expect(app.estimate.hours).toBe(160 + 40);
  });

  it('la tienda ya incluye cobrar en línea y no se cobra dos veces', () => {
    expect(availableExtras('tienda').some((e) => e.value === 'pagos')).toBe(false);
    expect(availableExtras('landing').some((e) => e.value === 'pagos')).toBe(true);
  });

  it('el plazo urgente recarga un 50 %', () => {
    const normal = buildQuote(answers({ type: 'sitio' }))!.estimate.price;
    const urgente = buildQuote(answers({ type: 'sitio', rush: 'urgente' }))!.estimate.price;
    expect(urgente).toBeGreaterThanOrEqual(normal * 1.5);
    expect(urgente).toBeLessThan(normal * 1.5 + 50_000);
  });
});

describe('normalize', () => {
  it('descarta extras de app al cambiar a web', () => {
    const a = normalize(answers({ type: 'landing', extras: ['push', 'seo', 'ia'] }));
    expect(a.extras).toEqual(['seo', 'ia']);
  });
});

describe('WhatsApp', () => {
  it('el enlace lleva el mensaje codificado', () => {
    const url = whatsappLink('Hola, ¿qué tal?\nSegunda línea', '573001112233');
    expect(url.startsWith('https://wa.me/573001112233?text=')).toBe(true);
    expect(decodeURIComponent(url.split('?text=')[1]!)).toBe('Hola, ¿qué tal?\nSegunda línea');
  });

  it('el resumen de la calculadora trae lo elegido, el rango y el plazo', () => {
    const q = buildQuote(answers({ type: 'tienda', extras: ['seo'], rush: 'rapido' }))!;
    const text = quoteMessage(q);
    expect(text).toContain('Tienda en línea');
    expect(text).toContain('SEO técnico y analítica');
    expect(text).toContain('Plazo: Rápido');
    expect(text).toMatch(/Rango estimado: \$ [\d.]+ a \$ [\d.]+ COP/);
  });

  it('el mensaje de un plan nombra el plan y el precio', () => {
    const text = planMessage(plans.find((p) => p.id === 'app-mvp')!);
    expect(text).toContain('App MVP');
    expect(text).toContain('app móvil');
    expect(text).toContain('7.400.000');
  });
});
