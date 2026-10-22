'use client';

import { Badge } from '@chroma-yesid/ui';
import { useEffect, useRef, useState } from 'react';
import { Accent } from '@/components/ui/DisplayHeading';
import { Section } from '@/components/ui/Section';
import { projects } from '@/content/proyectos';

/** Vista previa que sigue al cursor con inercia (solo con mouse; en pantallas táctiles cada fila muestra su portada). */
function useFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      target.current = { x: e.clientX, y: e.clientY };
    };
    addEventListener('pointermove', move);
    let raf = requestAnimationFrame(function loop() {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      const vx = target.current.x - pos.current.x;
      const rot = Math.max(-10, Math.min(10, vx * 0.06));
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(loop);
    });
    return () => {
      removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const follower = useFollower();
  const current = active === null ? null : projects[active];

  return (
    <Section
      id="proyectos"
      eyebrow="(02) — Proyectos"
      title={
        <>
          Lo que <Accent>he construido</Accent>.
        </>
      }
      intro="Muestras de ejemplo mientras agrego los proyectos reales. Pasa el cursor sobre cada fila para ver la portada."
    >
      <ul onPointerLeave={() => setActive(null)} className="border-t border-border">
        {projects.map((p, i) => (
          <li
            key={p.name}
            className="border-b border-border"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
          >
            <div className="grid gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,14rem)_minmax(0,12rem)] md:items-center md:py-7">
              <div className="flex items-baseline gap-3">
                <h3 className="text-display-xl font-bold transition-transform duration-300 md:[li:hover_&]:translate-x-3">
                  {p.name}
                </h3>
                <span className="font-mono text-caption text-muted-foreground">{p.year}</span>
                {p.draft ? (
                  <Badge tone="neutral" appearance="subtle">
                    Ejemplo
                  </Badge>
                ) : null}
              </div>
              <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">{p.category}</p>
              <p className="text-body-sm text-muted-foreground md:text-right">{p.stack}</p>
              <p className="text-body-md text-muted-foreground md:col-span-3 md:max-w-[40rem]">{p.description}</p>
              <div
                aria-hidden="true"
                className="aspect-[16/7] rounded-lg md:hidden"
                style={{ background: p.cover }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div
        ref={follower}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 hidden aspect-[4/3] w-80 overflow-hidden rounded-lg shadow-lg transition-opacity duration-200 md:block"
        style={{ opacity: current ? 1 : 0 }}
      >
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="absolute inset-0 transition-[clip-path] duration-500 ease-in-out"
            style={{ background: p.cover, clipPath: active === i ? 'inset(0)' : 'inset(100% 0 0 0)', zIndex: active === i ? 2 : 1 }}
          />
        ))}
      </div>
    </Section>
  );
}
