/**
 * Cálculo de precios. Es la única fuente de verdad: los planes, la calculadora y las pruebas usan estas funciones.
 * Los supuestos salen de la hoja "Mi calculadora" (negocio/oferta-servicios.xlsx).
 */

/** Tarifa por hora en COP. */
export const HOURLY_RATE = 80_000;
/** Colchón para reuniones, ajustes y QA no previstos. */
export const CONTINGENCY = 0.15;
/** Los precios públicos se redondean hacia arriba a este múltiplo. */
export const PRICE_STEP = 50_000;
/** Margen del rango que se muestra en la calculadora (±). */
export const RANGE_MARGIN = 0.15;

export type Rush = 'normal' | 'rapido' | 'urgente';

/** Recargo por plazo, en %: pagan las horas extra por semana que se dedican al proyecto. */
export const RUSH_SURCHARGE: Record<Rush, number> = { normal: 0, rapido: 0.25, urgente: 0.5 };

/** Horas por semana dedicadas según el plazo (provisional: ajusta a tu capacidad real). */
export const HOURS_PER_WEEK: Record<Rush, number> = { normal: 25, rapido: 35, urgente: 45 };

export function ceilTo(value: number, step: number): number {
  return Math.ceil(value / step - 1e-9) * step;
}

export function floorTo(value: number, step: number): number {
  return Math.floor(value / step + 1e-9) * step;
}

/** Horas → precio en COP: horas × tarifa × (1 + imprevistos), redondeado hacia arriba. */
export function priceFromHours(hours: number, step: number = PRICE_STEP): number {
  return ceilTo(hours * HOURLY_RATE * (1 + CONTINGENCY), step);
}

export interface Estimate {
  hours: number;
  /** Precio central, con el recargo por plazo ya aplicado. */
  price: number;
  /** Extremo bajo del rango. */
  low: number;
  /** Extremo alto del rango. */
  high: number;
  weeks: number;
}

export function estimate(hours: number, rush: Rush = 'normal'): Estimate {
  const base = priceFromHours(hours);
  const price = ceilTo(base * (1 + RUSH_SURCHARGE[rush]), PRICE_STEP);
  return {
    hours,
    price,
    low: floorTo(price * (1 - RANGE_MARGIN), PRICE_STEP),
    high: ceilTo(price * (1 + RANGE_MARGIN), PRICE_STEP),
    weeks: Math.max(1, Math.ceil(hours / HOURS_PER_WEEK[rush])),
  };
}

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

/** 1850000 → "$ 1.850.000" (formato de Colombia). */
export function formatCOP(value: number): string {
  return cop.format(value).replace(/ /g, ' ');
}

/** 1850000 → "$1,85 M" para tarjetas compactas. */
export function formatCOPShort(value: number): string {
  const m = value / 1_000_000;
  const text = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(m);
  return `$${text} M`;
}
