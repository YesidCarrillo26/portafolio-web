'use client';

import { Badge, Card, Heading, SegmentedControl } from '@chroma-yesid/ui';
import { useState } from 'react';
import { Accent } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { maintenance, payments, plans, type PlanLine } from '@/content/planes';
import { formatCOP } from '@/lib/pricing';
import { planMessage } from '@/lib/whatsapp';

export function Plans() {
  const [line, setLine] = useState<PlanLine>('web');
  const visible = plans.filter((p) => p.line === line);

  return (
    <Section
      id="planes"
      eyebrow="(04) — Planes"
      title={
        <>
          Planes claros, <Accent>sin sorpresas</Accent>.
        </>
      }
      intro="Precio “desde”, pago por proyecto y alcance por escrito. El número final lo ajustamos juntos."
    >
      <div className="flex justify-center md:justify-start">
        <SegmentedControl
          label="Tipo de proyecto"
          value={line}
          onValueChange={(v) => setLine(v as PlanLine)}
          options={[
            { value: 'web', label: 'Webs y tiendas' },
            { value: 'app', label: 'Apps móviles' },
          ]}
        />
      </div>

      <div className={`mt-8 grid gap-5 ${line === 'web' ? 'lg:grid-cols-3' : 'lg:grid-cols-2 lg:max-w-[52rem]'}`}>
        {visible.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 80} className="h-full">
            <Card
              padding="lg"
              elevation={plan.highlight ? 'md' : 'none'}
              className={`flex h-full flex-col ${plan.highlight ? 'border-2 border-foreground' : ''}`}
            >
              <div className="flex min-h-7 items-center justify-between gap-3">
                <Heading level={3} size="lg">
                  {plan.name}
                </Heading>
                {plan.highlight ? <Badge tone="primary">{plan.highlight}</Badge> : null}
              </div>
              <p className="mt-2 text-body-md text-muted-foreground lg:min-h-12">{plan.tagline}</p>

              <p className="mt-6 font-mono text-caption tracking-wider text-muted-foreground uppercase">Desde</p>
              <p className="text-price font-bold whitespace-nowrap" data-price={plan.price}>
                {formatCOP(plan.price)}
              </p>
              <p className="text-body-sm text-muted-foreground">COP · + IVA si aplica</p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-body-md">
                    <span aria-hidden="true" className="mt-0.5 text-brand">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                message={planMessage(plan)}
                label={`Cotizar ${plan.name}`}
                variant={plan.highlight ? 'primary' : 'outline'}
                className="mt-8 w-full"
              />
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          <div className="bg-background p-6">
            <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Cómo se paga</p>
            <p className="mt-3 text-body-md">{line === 'web' ? payments.web : payments.app}</p>
            <p className="mt-2 text-body-sm text-muted-foreground">{payments.methods}</p>
          </div>
          <div className="bg-background p-6">
            <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Mantenimiento mensual</p>
            <p className="mt-3 text-body-md">
              <span className="font-bold whitespace-nowrap">{formatCOP(maintenance.price)}</span> al mes · {maintenance.hours} horas de soporte
            </p>
            <p className="mt-2 text-body-sm text-muted-foreground">{maintenance.description} Opcional en webs, recomendado en apps.</p>
          </div>
          <div className="bg-background p-6">
            <p className="font-mono text-caption tracking-wider text-muted-foreground uppercase">Impuestos y terceros</p>
            <p className="mt-3 text-body-md">{payments.tax}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
