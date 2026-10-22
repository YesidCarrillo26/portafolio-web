import { Badge } from '@chroma-yesid/ui';
import { Accent, DisplayHeading } from '@/components/ui/DisplayHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { site } from '@/content/site';

/** Composición decorativa: una ventana de navegador y un teléfono (web + app), solo con CSS. */
function Devices() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[34rem]" aria-hidden="true">
      <div className="animate-float absolute top-[4%] left-0 w-[80%] overflow-hidden rounded-xl border border-border bg-card shadow-lg [--r:-2deg]">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-brand-fill" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="ml-3 truncate rounded-full bg-muted px-3 py-0.5 font-mono text-caption text-muted-foreground">
            tu-negocio.co
          </span>
        </div>
        <div className="space-y-3 p-4 sm:p-5">
          <div className="h-6 w-4/5 rounded bg-foreground" />
          <div className="h-6 w-3/5 rounded bg-foreground" />
          <div className="space-y-2 pt-1">
            <div className="h-2.5 w-full rounded bg-muted" />
            <div className="h-2.5 w-11/12 rounded bg-muted" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="aspect-[4/3] rounded-lg bg-brand-fill" />
            <div className="aspect-[4/3] rounded-lg bg-muted" />
            <div className="aspect-[4/3] rounded-lg bg-primary-subtle" />
          </div>
        </div>
      </div>

      <div className="animate-float absolute right-0 bottom-0 aspect-[9/18.5] w-[34%] rounded-[1.75rem] border-[5px] border-foreground bg-card shadow-lg [--r:3deg] [animation-delay:-3.5s]">
        <div className="mx-auto mt-2 h-1.5 w-1/3 rounded-full bg-foreground" />
        <div className="space-y-2 p-3 pt-4">
          <div className="h-3 w-3/4 rounded bg-foreground" />
          <div className="aspect-square rounded-xl bg-brand-fill" />
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-2/3 rounded bg-muted" />
          <div className="mt-2 h-7 rounded-md bg-primary" />
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ['Webs', 'Apps móviles', 'Asistentes con IA', `Disponible ${site.year}`, 'Bogotá → el mundo'];
  const run = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-foreground bg-foreground py-3.5 text-background" aria-hidden="true">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {run.map((text, i) => (
              <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="px-6 font-serif text-heading-lg italic">{text}</span>
                <span className="text-brand-fill">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section id="inicio" className="px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <div className="animate-rise">
            <Badge tone="neutral" appearance="outline">
              Disponible para proyectos · {site.year}
            </Badge>
            <div className="mt-6">
              <DisplayHeading level={1}>
                Webs y apps que se sienten <Accent>hechas a mano</Accent>.
              </DisplayHeading>
            </div>
            <p className="mt-6 max-w-[34rem] text-lead text-muted-foreground">
              Diseño y programo páginas, tiendas y apps para iOS y Android, con trato directo y precios claros desde el
              primer mensaje.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" />
              <ButtonLink href="#calculadora" variant="outline" size="lg">
                Calcula tu precio
              </ButtonLink>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-caption tracking-wider text-muted-foreground uppercase">
              <div>
                <dt className="sr-only">Servicios</dt>
                <dd>Webs · Apps · IA</dd>
              </div>
              <div>
                <dt className="sr-only">Ciudad</dt>
                <dd>{site.city}</dd>
              </div>
              <div>
                <dt className="sr-only">Respuesta</dt>
                <dd>Respuesta en 1 a 2 días</dd>
              </div>
            </dl>
          </div>
          <Devices />
        </div>
      </section>
      <Marquee />
    </>
  );
}
