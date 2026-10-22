import type { ReactNode } from 'react';

/**
 * Título de gran tamaño. Chroma `Heading` llega hasta 36px (`size="display"`); estos títulos usan los tokens
 * fluidos `text-hero` y `text-display-xl` definidos en app/brand.css, con equilibrado de líneas para que
 * ninguna palabra se parta.
 */
export function DisplayHeading({
  level = 2,
  children,
  className = '',
}: {
  level?: 1 | 2;
  children: ReactNode;
  className?: string;
}) {
  const Tag = level === 1 ? 'h1' : 'h2';
  const size = level === 1 ? 'text-hero' : 'text-display-xl';
  return <Tag className={`${size} font-bold text-balance text-foreground ${className}`}>{children}</Tag>;
}

/** Palabra en serif cursiva con el color de marca, para acentuar una parte del título. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="font-serif font-normal text-brand italic">{children}</span>;
}
