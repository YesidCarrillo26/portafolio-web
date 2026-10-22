import { Calculator } from '@/components/sections/Calculator';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { LabTeaser } from '@/components/sections/LabTeaser';
import { Plans } from '@/components/sections/Plans';
import { Process } from '@/components/sections/Process';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';

export default function Home() {
  return (
    <>
      <a
        href="#servicios"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <LabTeaser />
        <Plans />
        <Calculator />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
