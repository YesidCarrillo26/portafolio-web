import { site } from '@/content/site';
import { formatCOP } from './pricing';
import type { Plan } from '@/content/planes';
import type { Quote } from './quote';

/** Enlace de WhatsApp con el mensaje prellenado. */
export function whatsappLink(message: string, number: string = site.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const greeting = `Hola, vi tu sitio y quiero cotizar un proyecto.`;

export function planMessage(plan: Plan): string {
  return [
    `Hola, vi tu sitio y me interesa el plan ${plan.name} (${plan.line === 'app' ? 'app móvil' : 'web'}).`,
    `Precio de referencia: desde ${formatCOP(plan.price)} COP + IVA si aplica.`,
    '¿Podemos hablar del alcance?',
  ].join('\n');
}

/** Resumen de la calculadora, listo para enviar. Solo lleva lo que el cliente eligió. */
export function quoteMessage(quote: Quote): string {
  const { estimate } = quote;
  const lines = quote.lines.map((l) => `• ${l.label}`);
  return [
    'Hola, usé la calculadora de tu sitio y quiero cotizar:',
    '',
    ...lines,
    '',
    `Plazo: ${quote.rushLabel}`,
    `Rango estimado: ${formatCOP(estimate.low)} a ${formatCOP(estimate.high)} COP + IVA si aplica`,
    `Tiempo de desarrollo aproximado: ${estimate.weeks} ${estimate.weeks === 1 ? 'semana' : 'semanas'}`,
    '',
    '¿Hablamos?',
  ].join('\n');
}
