import { describe, expect, it } from 'vitest';
import { ceilTo, estimate, floorTo, formatCOP, formatCOPShort, priceFromHours } from './pricing';

describe('priceFromHours', () => {
  it('aplica tarifa × (1 + imprevistos) y redondea hacia arriba a 50.000', () => {
    expect(priceFromHours(20)).toBe(950_000); // 920.000
    expect(priceFromHours(64)).toBe(2_950_000); // 2.944.000
    expect(priceFromHours(104)).toBe(4_800_000); // 4.784.000
    expect(priceFromHours(160)).toBe(7_400_000); // 7.360.000
    expect(priceFromHours(282)).toBe(13_000_000); // 12.972.000
  });

  it('permite otro redondeo (mantenimiento mensual a 10.000)', () => {
    expect(priceFromHours(4, 10_000)).toBe(190_000); // 184.000
  });

  it('no sube un escalón cuando el valor ya es exacto', () => {
    expect(ceilTo(950_000, 50_000)).toBe(950_000);
    expect(floorTo(950_000, 50_000)).toBe(950_000);
  });
});

describe('estimate', () => {
  it('sin recargo, el precio central es el de las horas', () => {
    const e = estimate(20);
    expect(e.price).toBe(950_000);
    expect(e.weeks).toBe(1);
  });

  it('el recargo por plazo es un porcentaje, no un monto fijo', () => {
    expect(estimate(20, 'rapido').price).toBe(1_200_000); // 950.000 × 1,25 = 1.187.500
    expect(estimate(20, 'urgente').price).toBe(1_450_000); // 950.000 × 1,5 = 1.425.000
    expect(estimate(160, 'urgente').price).toBe(11_100_000); // 7.400.000 × 1,5 = 11.100.000
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
    expect(formatCOP(950_000)).toBe('$ 950.000');
  });

  it('compacta a millones', () => {
    expect(formatCOPShort(2_950_000)).toBe('$2,95 M');
    expect(formatCOPShort(7_400_000)).toBe('$7,4 M');
  });
});
