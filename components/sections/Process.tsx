import { Heading } from '@chroma-yesid/ui';
import { Accent } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { phases } from '@/content/proceso';

export function Process() {
  return (
    <Section
      id="proceso"
      eyebrow="(06) — Proceso"
      title={
        <>
          De la primera idea al <Accent>sitio en vivo</Accent>.
        </>
      }
      intro="Cuatro pasos, sin misterios. Sabes en qué estamos y qué sigue en todo momento."
    >
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden="true" className="absolute top-[0.4rem] right-0 left-0 hidden h-px bg-border md:block" />
        {phases.map((p, i) => (
          <Reveal key={p.n} delay={i * 90}>
            <li className="relative list-none">
              <span aria-hidden="true" className="relative block size-3 rounded-sm bg-brand-fill" />
              <p className="mt-5 font-mono text-caption tracking-wider text-muted-foreground uppercase">
                Fase {p.n} · {p.duration}
              </p>
              <Heading level={3} size="lg" className="mt-2">
                {p.title}
              </Heading>
              <p className="mt-2 text-body-md text-muted-foreground">{p.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
