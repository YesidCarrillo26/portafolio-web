import { priceFromHours } from '@/lib/pricing';

export type PlanLine = 'web' | 'app';

export interface Plan {
  id: string;
  line: PlanLine;
  name: string;
  /** Para quién es. */
  tagline: string;
  /** Horas de trabajo estimadas: de aquí sale el precio (ver lib/pricing.ts). */
  hours: number;
  features: string[];
  /** Etiqueta destacada, si aplica. */
  highlight?: string;
  /** Precio "desde" en COP, calculado a partir de las horas. */
  price: number;
}

const make = (plan: Omit<Plan, 'price'>): Plan => ({ ...plan, price: priceFromHours(plan.hours) });

export const plans: Plan[] = [
  make({
    id: 'esencial',
    line: 'web',
    name: 'Esencial',
    tagline: 'Presencia digital clara, en una sola vista.',
    hours: 20,
    features: [
      'Landing de una vista con tu marca',
      'Botón de WhatsApp o formulario',
      'Rápida en celular y computador',
      'Publicada con tu dominio',
    ],
  }),
  make({
    id: 'negocio',
    line: 'web',
    name: 'Negocio',
    tagline: 'Un sitio completo que tú mismo puedes actualizar.',
    hours: 64,
    highlight: 'Más elegido',
    features: [
      'Varias secciones (inicio, servicios, nosotros, contacto)',
      'Panel para editar textos e imágenes',
      'SEO técnico y analítica de visitas',
      'Todo lo del plan Esencial',
    ],
  }),
  make({
    id: 'tienda',
    line: 'web',
    name: 'Tienda',
    tagline: 'Vende en línea con pagos reales.',
    hours: 104,
    features: [
      'Catálogo, carrito y checkout',
      'Pasarela de pagos (Wompi, PayPal, Nequi)',
      'Panel para cargar y editar productos',
      'SEO técnico y analítica',
    ],
  }),
  make({
    id: 'app-mvp',
    line: 'app',
    name: 'App MVP',
    tagline: 'Tu idea funcionando en iOS y Android.',
    hours: 160,
    highlight: 'Para empezar',
    features: [
      'App con Expo y React Native, una base de código',
      '5 a 10 pantallas con diseño propio',
      'Lista para probar con usuarios reales',
      'Código y cuentas a tu nombre',
    ],
  }),
  make({
    id: 'app-completa',
    line: 'app',
    name: 'App completa',
    tagline: 'Producto listo para publicar y crecer.',
    hours: 282,
    features: [
      'Todo el App MVP',
      'Cuentas de usuario y perfiles',
      'Backend y base de datos (Supabase)',
      'Notificaciones push',
      'Publicación en App Store y Google Play',
    ],
  }),
];

/** Mantenimiento mensual recomendado: horas de soporte definidas, no "ilimitadas". */
export const maintenance = {
  hours: 4,
  price: priceFromHours(4, 10_000),
  description: 'Monitoreo, actualizaciones y pequeños ajustes. Sin funciones nuevas.',
};

export const payments = {
  web: '50 % para empezar y 50 % al entregar. Sin cuotas escondidas.',
  app: '40 % para empezar, 30 % al aprobar el diseño y 30 % al entregar, por hitos.',
  methods: 'Transferencia, Nequi o Bancolombia. PayPal o SWIFT si estás fuera de Colombia.',
  tax: 'Precios + IVA si aplica. Los costos de terceros (dominio, hosting, cuentas de tiendas) se pagan aparte, a tu nombre.',
};
