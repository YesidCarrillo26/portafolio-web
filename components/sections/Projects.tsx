'use client';

import { Badge } from '@chroma-yesid/ui';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Accent, DisplayHeading } from '@/components/ui/DisplayHeading';
import { projects, type Project } from '@/content/proyectos';

const HEADER = 64; // alto del header fijo (4rem)

/** Capturas de la app en abanico, como teléfonos. */
function Phones({ shots }: { shots: NonNullable<Project['gallery']> }) {
  const pose = ['-translate-x-[72%] -rotate-[7deg] scale-[.86]', 'z-10', 'translate-x-[72%] rotate-[7deg] scale-[.86]'];
  const items = [shots[1], shots[0], shots[3] ?? shots[2]].filter(Boolean) as NonNullable<Project['gallery']>;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
      {items.map((g, i) => (
        <Image
          key={g.src}
          src={g.src}
          alt=""
          width={440}
          height={957}
          sizes="140px"
          className={`absolute h-[88%] w-auto rounded-[1.1rem] border-2 border-cover-line shadow-lg transition-transform duration-500 group-hover:scale-[.92] ${pose[i] ?? ''}`}
        />
      ))}
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const n = String(i + 1).padStart(2, '0');
  return (
    <article className="group w-[min(23rem,78vw)] shrink-0 snap-start">
      <div className="relative h-[min(40svh,26rem)] overflow-hidden rounded-xl border border-border" style={{ background: p.cover }}>
        {p.gallery ? <Phones shots={p.gallery} /> : null}
        <span className="absolute top-4 left-4 rounded-full border border-cover-line bg-cover-scrim px-3 py-1 font-mono text-caption tracking-wider text-cover-foreground uppercase backdrop-blur">
          {p.category}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -bottom-3 text-[clamp(5rem,12vw,8rem)] leading-none font-bold tracking-tighter text-transparent mix-blend-difference [-webkit-text-stroke:1.5px_#fff]"
        >
          {n}
        </span>
      </div>
      <div className="pt-5">
        <div className="flex items-baseline gap-3">
          <h3 className="text-heading-xl font-bold tracking-tight">{p.name}</h3>
          <span className="font-mono text-caption text-muted-foreground">{p.year}</span>
          {p.draft ? (
            <Badge tone="neutral" appearance="subtle">
              Ejemplo
            </Badge>
          ) : null}
        </div>
        <p className="mt-1 font-mono text-caption tracking-wider text-muted-foreground uppercase">{p.stack}</p>
        <p className="mt-3 line-clamp-3 text-body-md text-muted-foreground">{p.description}</p>
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-body-md font-medium underline underline-offset-4 hover:text-brand"
          >
            {p.linkLabel ?? 'Ver proyecto'} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function Projects() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState<number | undefined>();

  // Con mouse y pantalla ancha, la sección se ancla y el scroll vertical mueve las tarjetas;
  // en táctil o con movimiento reducido es un carrusel normal con scroll horizontal.
  useEffect(() => {
    const mq = matchMedia('(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)');
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = outer.current;
    const t = track.current;
    if (!pinned || !el || !t) return;
    let dist = 0;
    const measure = () => {
      dist = Math.max(0, t.scrollWidth - innerWidth);
      setHeight(dist + innerHeight - HEADER);
    };
    const onScroll = () => {
      const p = dist === 0 ? 0 : Math.min(1, Math.max(0, (HEADER - el.getBoundingClientRect().top) / dist));
      t.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      if (bar.current) bar.current.style.width = `${p * 100}%`;
      if (count.current) count.current.textContent = String(Math.round(p * (projects.length - 1)) + 1).padStart(2, '0');
    };
    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(t);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      t.style.transform = '';
    };
  }, [pinned]);

  const gutter = 'pl-[max(1.25rem,calc((100vw-1280px)/2+2rem))] pr-[max(1.25rem,calc((100vw-1280px)/2+2rem))]';

  return (
    <section
      id="proyectos"
      ref={outer}
      className="relative border-t border-border"
      style={pinned && height ? { height } : undefined}
    >
      <div
        className={
          pinned
            ? 'sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center gap-8 overflow-hidden'
            : 'flex flex-col gap-10 py-20'
        }
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">(02) — Proyectos</p>
              <div className="mt-4">
                <DisplayHeading>
                  Lo que <Accent>he construido</Accent>.
                </DisplayHeading>
              </div>
            </div>
            <div className="hidden shrink-0 text-right md:block" aria-hidden="true">
              <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">
                <span ref={count}>01</span> / {String(projects.length).padStart(2, '0')}
              </p>
              <span className="mt-2 block h-px w-40 bg-border">
                <span ref={bar} className="block h-px w-0 bg-foreground" />
              </span>
            </div>
          </div>
          <p className="mt-3 max-w-[40rem] text-body-md text-muted-foreground">
            Los proyectos reales llevan enlace; los marcados “Ejemplo” son muestras mientras agrego más.{' '}
            {pinned ? 'Sigue bajando para recorrerlos.' : 'Desliza para ver todos →'}
          </p>
        </div>

        <div
          data-audit-ignore
          className={pinned ? 'overflow-hidden' : 'snap-x snap-proximity overflow-x-auto pb-4 [scrollbar-width:thin]'}
        >
          <div ref={track} className={`flex w-max gap-6 ${gutter} will-change-transform`}>
            {projects.map((p, i) => (
              <Card key={p.name} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
