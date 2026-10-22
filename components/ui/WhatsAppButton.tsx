import { greeting, whatsappLink } from '@/lib/whatsapp';
import { ButtonLink } from './ButtonLink';

export function WhatsAppButton({
  message = greeting,
  label = 'Cotizar por WhatsApp',
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  message?: string;
  label?: string;
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  className?: string;
}) {
  return (
    <ButtonLink
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      data-whatsapp
    >
      {label}
    </ButtonLink>
  );
}
