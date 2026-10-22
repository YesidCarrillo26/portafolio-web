'use client';

import { Button, Sheet, Stack } from '@chroma-yesid/ui';
import { useState } from 'react';
import { BogotaClock } from '@/components/ui/BogotaClock';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { nav, site } from '@/content/site';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#inicio" className="flex items-baseline gap-2 font-bold tracking-tight" aria-label={`${site.name}, inicio`}>
          <span className="text-heading-md">{site.shortName}</span>
          <BogotaClock className="hidden font-mono text-caption font-normal tracking-wider text-muted-foreground uppercase xl:inline" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <WhatsAppButton label="Cotizar" className="max-sm:hidden" />
          <div className="lg:hidden">
            <Button variant="outline" size="sm" aria-haspopup="dialog" onPress={() => setOpen(true)}>
              Menú
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen} title="Menú" description="Ir a una sección del sitio">
        <Stack gap="xs">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-body-lg font-medium hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton size="lg" className="mt-3 w-full" />
        </Stack>
      </Sheet>
    </header>
  );
}
