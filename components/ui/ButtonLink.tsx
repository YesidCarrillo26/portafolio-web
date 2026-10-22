import type { AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * Enlace con aspecto de botón. Chroma `Button` renderiza un <button>, y un botón dentro de un <a> es HTML inválido;
 * para acciones que navegan (WhatsApp, anclas) se usa un <a> con las mismas clases semánticas de Chroma.
 */
type Variant = 'primary' | 'outline';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  outline: 'border border-input bg-transparent text-foreground hover:bg-accent',
};
const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-body-md',
  lg: 'h-12 px-6 text-body-lg',
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </a>
  );
}
