'use client';

import { Button } from '@chroma-yesid/ui';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // El tema real solo se conoce en el navegador: en el servidor se pinta un estado neutro.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      onPress={() => setTheme(dark ? 'light' : 'dark')}
    >
      {dark ? 'Claro' : 'Oscuro'}
    </Button>
  );
}
