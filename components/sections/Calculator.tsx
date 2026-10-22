'use client';

import { Accordion, Badge, Button, Card, Heading, Progress, SelectableCardGroup, useToast } from '@chroma-yesid/ui';
import { useMemo, useState } from 'react';
import { Accent } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import {
  accountsOptions,
  designOptions,
  projectTypes,
  questions,
  rushOptions,
  type AccountsLevel,
  type DesignChoice,
  type ProjectTypeId,
} from '@/content/calculadora';
import { thirdParty } from '@/content/terceros';
import { formatCOP, type Rush } from '@/lib/pricing';
import { availableExtras, buildQuote, initialAnswers, normalize, type Answers } from '@/lib/quote';
import { quoteMessage, whatsappLink } from '@/lib/whatsapp';

type QuestionId = (typeof questions)[number]['id'];

function Question({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="flex items-center gap-3 pb-4">
        <span className="grid size-7 place-items-center rounded-full border border-input font-mono text-caption">{n}</span>
        <Heading level={3} size="md">
          {title}
        </Heading>
      </legend>
      {children}
    </fieldset>
  );
}

export function Calculator() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [touched, setTouched] = useState<Set<QuestionId>>(new Set());
  const toast = useToast();

  const quote = useMemo(() => buildQuote(answers), [answers]);
  const extraOptions = useMemo(() => availableExtras(answers.type), [answers.type]);

  const update = (id: QuestionId, patch: Partial<Answers>) => {
    setAnswers((prev) => normalize({ ...prev, ...patch }));
    setTouched((prev) => new Set(prev).add(id));
  };

  const copySummary = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(quoteMessage(quote));
      toast.show('Resumen copiado. Pégalo donde quieras.', { variant: 'success' });
    } catch {
      toast.show('No pude copiar. Usa el botón de WhatsApp.', { variant: 'warning' });
    }
  };

  return (
    <Section
      id="calculadora"
      eyebrow="(05) — Calculadora"
      title={
        <>
          Calcula tu proyecto en <Accent>un minuto</Accent>.
        </>
      }
      intro="Responde cinco preguntas y ve el rango de precio al instante. Sin compromiso: el número final lo confirmamos por WhatsApp."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-12">
          <Question n={1} title={questions[0].title}>
            <SelectableCardGroup
              label={questions[0].title}
              selectionMode="single"
              value={answers.type ? [answers.type] : []}
              onValueChange={(v) => v[0] && update('type', { type: v[0] as ProjectTypeId })}
              options={projectTypes.map((t) => ({ value: t.value, title: t.title, description: t.description }))}
            />
          </Question>

          <Question n={2} title={questions[1].title}>
            <SelectableCardGroup
              label={questions[1].title}
              selectionMode="single"
              value={[answers.accounts]}
              onValueChange={(v) => v[0] && update('accounts', { accounts: v[0] as AccountsLevel })}
              options={accountsOptions.map((o) => ({ value: o.value, title: o.title, description: o.description }))}
            />
          </Question>

          <Question n={3} title={questions[2].title}>
            {answers.type ? (
              <SelectableCardGroup
                key={answers.type}
                label={questions[2].title}
                selectionMode="multiple"
                value={answers.extras}
                onValueChange={(v) => update('extras', { extras: v })}
                options={extraOptions.map((e) => ({ value: e.value, title: e.title, description: e.description }))}
              />
            ) : (
              <p className="rounded-lg border border-dashed border-input p-5 text-body-md text-muted-foreground">
                Elige primero qué necesitas (pregunta 1) para ver las opciones que aplican.
              </p>
            )}
          </Question>

          <Question n={4} title={questions[3].title}>
            <SelectableCardGroup
              label={questions[3].title}
              selectionMode="single"
              value={[answers.design]}
              onValueChange={(v) => v[0] && update('design', { design: v[0] as DesignChoice })}
              options={designOptions.map((o) => ({ value: o.value, title: o.title, description: o.description }))}
            />
          </Question>

          <Question n={5} title={questions[4].title}>
            <SelectableCardGroup
              label={questions[4].title}
              selectionMode="single"
              value={[answers.rush]}
              onValueChange={(v) => v[0] && update('rush', { rush: v[0] as Rush })}
              options={rushOptions.map((o) => ({ value: o.value, title: o.title, description: o.description }))}
            />
          </Question>
        </div>

        <Reveal>
          <aside aria-label="Resumen de tu cotización" className="lg:sticky lg:top-24" data-testid="quote-panel">
            <Card padding="lg" elevation="sm">
              <Progress label="Preguntas que personalizaste" value={touched.size} max={5} size="sm" />
              <p className="mt-2 text-caption text-muted-foreground">{touched.size} de 5</p>

              {quote ? (
                <>
                  <p className="mt-6 font-mono text-caption tracking-wider text-muted-foreground uppercase">Rango estimado</p>
                  <p className="text-price font-bold" data-testid="quote-range">
                    <span className="block whitespace-nowrap">{formatCOP(quote.estimate.low)}</span>
                    <span className="block whitespace-nowrap">
                      <span className="font-normal text-muted-foreground">a </span>
                      {formatCOP(quote.estimate.high)}
                    </span>
                  </p>
                  <p className="mt-1 text-body-sm text-muted-foreground">COP + IVA si aplica</p>

                  <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4">
                    <div>
                      <dt className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Desarrollo</dt>
                      <dd className="text-heading-md font-semibold" data-testid="quote-weeks">
                        ~{quote.estimate.weeks} {quote.estimate.weeks === 1 ? 'semana' : 'semanas'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Esfuerzo</dt>
                      <dd className="text-heading-md font-semibold">{quote.estimate.hours} horas</dd>
                    </div>
                  </dl>

                  <ul className="mt-4 space-y-2" aria-label="Qué incluye">
                    {quote.lines.map((l) => (
                      <li key={l.label} className="flex items-start justify-between gap-4 text-body-sm">
                        <span>{l.label}</span>
                        <span className="shrink-0 font-mono text-muted-foreground">{l.hours} h</span>
                      </li>
                    ))}
                  </ul>
                  {quote.rushLabel !== 'Sin afán' ? (
                    <div className="mt-4">
                      <Badge tone="warning" appearance="subtle">
                        Plazo {quote.rushLabel.toLowerCase()}: recargo incluido
                      </Badge>
                    </div>
                  ) : null}

                  <div className="mt-6 grid gap-3">
                    <a
                      href={whatsappLink(quoteMessage(quote))}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-whatsapp
                      data-testid="quote-whatsapp"
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-body-lg font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      Enviar este resumen por WhatsApp
                    </a>
                    <Button variant="outline" onPress={copySummary}>
                      Copiar resumen
                    </Button>
                  </div>
                </>
              ) : (
                <p className="mt-6 text-body-md text-muted-foreground" data-testid="quote-empty">
                  Elige qué necesitas y aquí verás tu rango de precio, el tiempo y las horas de trabajo.
                </p>
              )}

              <div className="mt-6">
                <Accordion
                  items={[
                    {
                      value: 'terceros',
                      title: 'Costos de terceros (se pagan aparte)',
                      content: (
                        <ul className="space-y-3 text-body-sm">
                          {thirdParty.map((t) => (
                            <li key={t.item}>
                              <span className="font-medium">{t.item}:</span> {t.value}{' '}
                              <span className="text-muted-foreground">· {t.every}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    },
                  ]}
                />
              </div>
            </Card>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
