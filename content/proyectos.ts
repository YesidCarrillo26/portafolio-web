/**
 * Proyectos del portafolio. Hoy son MUESTRAS DE EJEMPLO (`draft: true`): se muestran con la etiqueta "Ejemplo"
 * hasta que llenes la hoja "Mi perfil" con proyectos reales. Reemplaza este arreglo y quita `draft`.
 */
export interface Project {
  name: string;
  year: string;
  category: string;
  type: 'web' | 'app';
  stack: string;
  description: string;
  /** Degradado del recuadro de vista previa. */
  cover: string;
  /** Muestra de ejemplo, no un proyecto real. */
  draft?: boolean;
  url?: string;
}

export const projects: Project[] = [
  {
    name: 'Atlas',
    year: '2026',
    category: 'SaaS · Analítica',
    type: 'web',
    stack: 'Next.js, Supabase',
    description: 'Panel de analítica para equipos pequeños, con reportes que se leen en un vistazo.',
    cover: 'radial-gradient(circle at 30% 30%, #ff3b00, #2a0a00 70%)',
    draft: true,
  },
  {
    name: 'Nébula',
    year: '2025',
    category: 'Fintech · App móvil',
    type: 'app',
    stack: 'Expo, React Native',
    description: 'App de finanzas personales con metas de ahorro y avisos al celular.',
    cover: 'linear-gradient(135deg, #1b1b4a, #6d5bff 50%, #e6e0ff)',
    draft: true,
  },
  {
    name: 'Kiosko',
    year: '2025',
    category: 'Tienda en línea',
    type: 'web',
    stack: 'Next.js, Wompi',
    description: 'Tienda de productos locales con carrito, pagos en línea y panel de pedidos.',
    cover: 'repeating-linear-gradient(45deg, #1a1a18 0 14px, #f1eee7 14px 28px)',
    draft: true,
  },
  {
    name: 'Pulso',
    year: '2024',
    category: 'IoT · Panel',
    type: 'web',
    stack: 'React, WebSockets',
    description: 'Tablero en tiempo real para monitorear sensores y recibir alertas.',
    cover: 'radial-gradient(circle at 70% 60%, #c8ff3d, #0f2a12 65%)',
    draft: true,
  },
  {
    name: 'Eco',
    year: '2026',
    category: 'IA conversacional',
    type: 'web',
    stack: 'Claude API, TypeScript',
    description: 'Asistente que responde con los manuales y catálogos de una empresa.',
    cover: 'conic-gradient(from 90deg, #111110, #8b877d, #f1eee7, #111110)',
    draft: true,
  },
  {
    name: 'Mareas',
    year: '2024',
    category: 'Editorial · 3D',
    type: 'web',
    stack: 'Three.js, GSAP',
    description: 'Reportaje interactivo con animaciones que acompañan la lectura.',
    cover: 'linear-gradient(180deg, #e8f3ff, #4b8fd6 50%, #08223f)',
    draft: true,
  },
];
