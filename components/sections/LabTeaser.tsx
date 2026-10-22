import { Badge, Heading } from '@chroma-yesid/ui';
import { Accent } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { concepts } from '@/content/laboratorio';

export function LabTeaser() {
  return (
    <Section
      id="laboratorio"
      eyebrow="(03) — Laboratorio"
      title={
        <>
          Mi <Accent>laboratorio</Accent> de diseño.
        </>
      }
      intro="Cuatro portafolios animados que exploré antes de este sitio. Úsalos para ver hasta dónde puede llegar una web con movimiento."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((c, i) => (
          <Reveal key={c.slug} delay={i * 80} className="h-full">
            <a
              href={c.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div
                className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: c.cover }}
                aria-hidden="true"
              />
              <div className="relative flex flex-1 flex-col gap-3 bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <Heading level={3} size="md">
                    {c.name}
                  </Heading>
                  <span className="font-mono text-caption text-muted-foreground">{c.n}</span>
                </div>
                <p className="text-body-sm text-muted-foreground">{c.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {c.tags.map((t) => (
                    <Badge key={t} tone="neutral" appearance="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-body-md text-muted-foreground">
        ¿Quieres compararlos lado a lado?{' '}
        <a href="/laboratorio/comparar" className="font-medium text-foreground underline underline-offset-4 hover:text-brand">
          Abrir el lienzo comparativo →
        </a>
      </p>
    </Section>
  );
}
