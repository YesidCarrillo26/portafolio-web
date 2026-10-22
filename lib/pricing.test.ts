import { describe, expect, it } from 'vitest';
import { ceilTo, estimate, floorTo, formatCOP, formatCOPShort, priceFromHours } from './pricing';

describe('priceFromHours', () => {
  it('aplica tarifa × (1 + imprevistos) y redondea hacia arriba a 50.000', () => {
    expect(priceFromHours(20)).toBe(1_850_000); // 1.840.000
    expect(priceFromHours(64)).toBe(5_900_000); // 5.888.000
    expect(priceFromHours(104)).toBe(9_600_000); // 9.568.000
    expect(priceFromHours(160)).toBe(14_750_000); // 14.720.000
    expect(priceFromHours(282)).toBe(25_950_000); // 25.944.000
  });

  it('permite otro redondeo (mantenimiento mensual a 10.000)', () => {
    expect(priceFromHours(4, 10_000)).toBe(370_000); // 368.000
  });

  it('no sube un escalón cuando el valor ya es exacto', () => {
    expect(ceilTo(1_850_000, 50_000)).toBe(1_850_000);
    expect(floorTo(1_850_000, 50_000)).toBe(1_850_000);
  });
});

describe('estimate', () => {
  it('sin recargo, el precio central es el de las horas', () => {
    const e = estimate(20);
    expect(e.price).toBe(1_850_000);
    expect(e.weeks).toBe(1);
  });

  it('el recargo por plazo es un porcentaje, no un monto fijo', () => {
    expect(estimate(20, 'rapido').price).toBe(2_350_000); // 1.850.000 × 1,25 = 2.312.500
    expect(estimate(20, 'urgente').price).toBe(2_800_000); // 1.850.000 × 1,5 = 2.775.000
    expect(estimate(160, 'urgente').price).toBe(22_150_000); // 14.750.000 × 1,5 = 22.125.000
  });

  it('el rango envuelve al precio central', () => {
    const e = estimate(104);
    expect(e.low).toBeLessThan(e.price);
    expect(e.high).toBeGreaterThan(e.price);
    expect(e.low % 50_000).toBe(0);
    expect(e.high % 50_000).toBe(0);
  });

  it('dedicar más horas por semana acorta el plazo', () => {
    const normal = estimate(160, 'normal').weeks;
    expect(estimate(160, 'rapido').weeks).toBeLessThan(normal);
    expect(estimate(160, 'urgente').weeks).toBeLessThanOrEqual(estimate(160, 'rapido').weeks);
  });
});

describe('formato', () => {
  it('usa puntos de miles al estilo colombiano', () => {
    expect(formatCOP(1_850_000)).toBe('$ 1.850.000');
  });

  it('compacta a millones', () => {
    expect(formatCOPShort(1_850_000)).toBe('$1,85 M');
    expect(formatCOPShort(14_750_000)).toBe('$14,75 M');
  });
});
