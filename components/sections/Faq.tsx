import { Accordion } from '@chroma-yesid/ui';
import { Accent } from '@/components/ui/DisplayHeading';
import { Section } from '@/components/ui/Section';
import { faq } from '@/content/faq';

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="(07) — Preguntas"
      title={
        <>
          Lo que <Accent>siempre</Accent> me preguntan.
        </>
      }
    >
      <div className="max-w-[52rem]">
        <Accordion items={faq} />
      </div>
    </Section>
  );
}
