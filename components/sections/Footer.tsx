import { Divider } from '@chroma-yesid/ui';
import { Accent, DisplayHeading } from '@/components/ui/DisplayHeading';
import { FitText } from '@/components/ui/FitText';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { nav, site } from '@/content/site';

export function Footer() {
  return (
    <footer id="contacto" className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-20 pb-8 md:px-8 md:pt-28">
        <p className="font-mono text-caption tracking-wider uppercase opacity-70">(08) — Contacto</p>
        <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Sobre el fondo oscuro del pie, el título invierte los colores del tema. */}
          <div className="max-w-[44rem] [&_h2]:text-background">
            <DisplayHeading>
              ¿Tienes una idea? <Accent>Cuéntamela</Accent>.
            </DisplayHeading>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton size="lg" label="Escribir por WhatsApp" className="bg-background! text-foreground!" />
            <ButtonLink
              href="#calculadora"
              variant="outline"
              size="lg"
              className="border-background/40! text-background! hover:bg-background/10!"
            >
              Calcular mi precio
            </ButtonLink>
          </div>
        </div>

        <Divider className="my-12 opacity-30" />

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-caption tracking-wider uppercase opacity-70">{site.role}</p>
            <p className="mt-3 text-body-md">{site.city}</p>
          </div>
          <nav aria-label="Secciones">
            <ul className="space-y-2 text-body-md">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:underline hover:underline-offset-4">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-2 text-body-md">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={site.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                Código de este sitio ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-16">
          <FitText text={site.name} min={32} max={300} />
        </div>

        <p className="mt-6 flex flex-wrap justify-between gap-2 font-mono text-caption tracking-wider uppercase opacity-70">
          <span>© {site.year} {site.name}</span>
          <span>Hecho con Next.js y @chroma-yesid</span>
        </p>
      </div>
    </footer>
  );
}
