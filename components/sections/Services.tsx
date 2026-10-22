import { Card, Chip, Heading } from '@chroma-yesid/ui';
import { Reveal } from '@/components/ui/Reveal';
import { Accent } from '@/components/ui/DisplayHeading';
import { Section } from '@/components/ui/Section';
import { method, services } from '@/content/servicios';

export function Services() {
  return (
    <Section
      id="servicios"
      eyebrow="(01) — Servicios"
      title={
        <>
          Tres cosas, <Accent>bien hechas</Accent>.
        </>
      }
      intro="No hago de todo. Hago webs, apps móviles y asistentes con IA, con obsesión por el detalle."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 90} className="h-full">
            <Card padding="lg" elevation="none" className="h-full">
              <p className="font-mono text-caption tracking-wider text-brand uppercase">0{i + 1}</p>
              <Heading level={3} size="lg" className="mt-3">
                {s.title}
              </Heading>
              <p className="mt-3 text-body-md text-muted-foreground">{s.summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-body-md">
                    <span aria-hidden="true" className="mt-1 text-brand">
                      →
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                {s.stack.map((t) => (
                  <li key={t}>
                    <Chip label={t} />
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Cómo empiezo cada proyecto</p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {method.map((m) => (
            <div key={m.n} className="bg-background p-6 md:p-8">
              <span className="font-serif text-display-xl text-brand italic">{m.n}</span>
              <Heading level={3} size="md" className="mt-4">
                {m.question}
              </Heading>
              <p className="mt-2 text-body-md text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
