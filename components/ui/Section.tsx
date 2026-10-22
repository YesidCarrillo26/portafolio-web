import type { ReactNode } from 'react';
import { DisplayHeading } from './DisplayHeading';
import { Reveal } from './Reveal';

/** Contenedor común de las secciones: etiqueta numerada en mono, título grande y contenido. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-border py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">{eyebrow}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:gap-12">
            <DisplayHeading>{title}</DisplayHeading>
            {intro ? <p className="text-body-lg text-muted-foreground">{intro}</p> : null}
          </div>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
