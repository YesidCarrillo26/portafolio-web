/**
 * Datos del sitio. Cambia aquí el nombre, el WhatsApp y las redes: el resto de la web los lee de este archivo.
 * Pendientes por confirmar: ver README.md ("Pendientes").
 */

/** Número de WhatsApp en formato internacional, sin "+" ni espacios (ej.: 573001234567).
 *  El valor por defecto es un marcador a propósito: no escribe a ningún número real. */
export const WHATSAPP_PLACEHOLDER = '57XXXXXXXXXX';

export const site = {
  /** Nombre comercial (provisional: se decidirá después). */
  name: 'Yesid Carrillo',
  /** Versión corta para logotipos y la firma del mensaje. */
  shortName: 'YC',
  role: 'Desarrollador de webs, apps móviles e IA',
  city: 'Bogotá, Colombia',
  timeZone: 'America/Bogota',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? WHATSAPP_PLACEHOLDER,
  year: 2026,
  repoUrl: 'https://github.com/YesidCarrillo26/portafolio-web',
  socials: [
    { label: 'GitHub', href: 'https://github.com/YesidCarrillo26' },
  ],
} as const;

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Planes', href: '#planes' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Laboratorio', href: '/laboratorio' },
] as const;
