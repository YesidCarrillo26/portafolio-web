import type { Rush } from '@/lib/pricing';

/** Datos de la calculadora. Las horas salen de la hoja "Mi calculadora"; el precio lo calcula lib/pricing.ts. */

export type Kind = 'web' | 'app';
export type ProjectTypeId = 'landing' | 'sitio' | 'tienda' | 'plataforma' | 'app';
export type AccountsLevel = 'none' | 'basic' | 'roles';
export type DesignChoice = 'own' | 'need';

export interface ProjectType {
  value: ProjectTypeId;
  kind: Kind;
  title: string;
  description: string;
  hours: number;
}

export const projectTypes: ProjectType[] = [
  { value: 'landing', kind: 'web', title: 'Una sola vista', description: 'Presentar mi negocio en una página.', hours: 20 },
  { value: 'sitio', kind: 'web', title: 'Varias secciones', description: 'Inicio, servicios, nosotros y contacto.', hours: 40 },
  { value: 'tienda', kind: 'web', title: 'Tienda en línea', description: 'Catálogo, carrito, checkout y pagos.', hours: 80 },
  { value: 'plataforma', kind: 'web', title: 'Plataforma a medida', description: 'Funciones hechas para cómo trabaja tu negocio.', hours: 120 },
  { value: 'app', kind: 'app', title: 'App móvil (iOS y Android)', description: 'Una app con 5 a 10 pantallas, con Expo y React Native.', hours: 160 },
];

export interface AccountsOption {
  value: AccountsLevel;
  title: string;
  description: string;
  hours: Record<Kind, number>;
}

export const accountsOptions: AccountsOption[] = [
  { value: 'none', title: 'Sin cuentas', description: 'Todos ven lo mismo.', hours: { web: 0, app: 0 } },
  { value: 'basic', title: 'Cuentas con historial', description: 'Cada persona entra con su cuenta y ve lo suyo.', hours: { web: 24, app: 30 } },
  { value: 'roles', title: 'Cuentas con roles', description: 'Administrador, cliente, vendedor, etc.', hours: { web: 40, app: 40 } },
];

export interface ExtraOption {
  value: string;
  title: string;
  description: string;
  hours: number;
  kinds: Kind[];
  /** Tipos de proyecto que ya lo incluyen en su base (no se ofrece ni se cobra dos veces). */
  includedIn?: ProjectTypeId[];
}

export const extras: ExtraOption[] = [
  { value: 'pagos', title: 'Cobrar en línea', description: 'Carrito, checkout y pasarela (Wompi, PayPal, Nequi).', hours: 40, kinds: ['web'], includedIn: ['tienda'] },
  { value: 'cms', title: 'Panel para editar contenido', description: 'Cambias textos, imágenes y productos tú mismo.', hours: 16, kinds: ['web'] },
  { value: 'seo', title: 'SEO técnico y analítica', description: 'Google te encuentra y ves cuántos te visitan.', hours: 8, kinds: ['web'] },
  { value: 'blog', title: 'Blog con categorías', description: 'Editor de artículos y categorías.', hours: 12, kinds: ['web'] },
  { value: 'backend', title: 'Servidor y base de datos', description: 'API y datos en la nube (Supabase).', hours: 60, kinds: ['app'] },
  { value: 'pagos-app', title: 'Pagos dentro de la app', description: 'Pasarela o compras dentro de la app.', hours: 30, kinds: ['app'] },
  { value: 'push', title: 'Notificaciones push', description: 'Avisos al celular de tus usuarios.', hours: 16, kinds: ['app'] },
  { value: 'admin', title: 'Panel web de administración', description: 'Gestionas la app desde el computador.', hours: 50, kinds: ['app'] },
  { value: 'mapas', title: 'Mapas y ubicación', description: 'Geolocalización y mapas dentro de la app.', hours: 24, kinds: ['app'] },
  { value: 'offline', title: 'Modo sin conexión', description: 'La app funciona sin internet y sincroniza después.', hours: 40, kinds: ['app'] },
  { value: 'tiendas', title: 'Publicación en App Store y Google Play', description: 'Yo preparo y subo la app a las tiendas.', hours: 16, kinds: ['app'] },
  { value: 'ia', title: 'Chatbot con IA y tus documentos', description: 'Responde con tus catálogos, manuales o PDFs.', hours: 50, kinds: ['web', 'app'] },
  { value: 'buscador', title: 'Buscador inteligente', description: 'Encuentra por significado, no solo por palabra.', hours: 24, kinds: ['web', 'app'] },
  { value: 'reservas', title: 'Reservas o citas en línea', description: 'Agenda y confirmaciones automáticas.', hours: 30, kinds: ['web', 'app'] },
  { value: 'whatsapp', title: 'Avisos automáticos por WhatsApp', description: 'Confirmaciones y recordatorios.', hours: 16, kinds: ['web', 'app'] },
  { value: 'idiomas', title: 'Varios idiomas', description: 'Todo el contenido en más de un idioma.', hours: 16, kinds: ['web', 'app'] },
  { value: 'crm', title: 'Conexión con contabilidad o CRM', description: 'Tus datos sincronizados con las herramientas que ya usas.', hours: 40, kinds: ['web', 'app'] },
];

export interface DesignOption {
  value: DesignChoice;
  title: string;
  description: string;
  hours: Record<Kind, number>;
}

export const designOptions: DesignOption[] = [
  { value: 'own', title: 'Ya tengo el diseño', description: 'Me pasas los diseños y los convierto en código.', hours: { web: 0, app: 0 } },
  { value: 'need', title: 'Necesito el diseño', description: 'Diseño de pantallas en Figma, con ajustes hasta que se sienta tuyo.', hours: { web: 16, app: 40 } },
];

export interface RushOption {
  value: Rush;
  title: string;
  description: string;
}

export const rushOptions: RushOption[] = [
  { value: 'normal', title: 'Sin afán', description: 'El plazo normal, sin recargo.' },
  { value: 'rapido', title: 'Rápido', description: 'Dedico más horas por semana. Recargo de 25 %.' },
  { value: 'urgente', title: 'Urgente', description: 'Prioridad máxima. Recargo de 50 %.' },
];

export const questions = [
  { id: 'type', title: '¿Qué necesitas?' },
  { id: 'accounts', title: '¿Tus usuarios entran con una cuenta?' },
  { id: 'extras', title: '¿Qué más debe hacer? (puedes elegir varias)' },
  { id: 'design', title: '¿Y el diseño?' },
  { id: 'rush', title: '¿Para cuándo lo necesitas?' },
] as const;
