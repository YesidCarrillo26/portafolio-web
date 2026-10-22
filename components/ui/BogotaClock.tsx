'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

/** Hora local de Bogotá. Se pinta tras montar para no desajustar la hidratación. */
export function BogotaClock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('es-CO', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      Bogotá {time || '--:--'}
    </span>
  );
}
