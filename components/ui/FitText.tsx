'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * Ajusta el texto al ancho de su contenedor en una sola línea, con tamaño mínimo y máximo.
 * Se mide con la fuente ya cargada y se recalcula al redimensionar (ResizeObserver).
 */
export function FitText({
  text,
  min = 28,
  max = 320,
  className = '',
}: {
  text: string;
  min?: number;
  max?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const span = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = wrap.current;
    const el = span.current;
    if (!box || !el) return;

    const fit = () => {
      el.style.fontSize = '100px';
      const ratio = box.clientWidth / el.scrollWidth;
      el.style.fontSize = `${Math.max(min, Math.min(max, 100 * ratio))}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts.ready.then(fit);
    return () => ro.disconnect();
  }, [min, max, text]);

  return (
    <div ref={wrap} className="w-full overflow-hidden" aria-hidden="true">
      <span ref={span} className={`inline-block leading-[0.85] font-bold tracking-tighter whitespace-nowrap ${className}`}>
        {text}
      </span>
    </div>
  );
}
