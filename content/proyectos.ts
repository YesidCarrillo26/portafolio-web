/**
 * Proyectos del portafolio. Los que no llevan `draft` son reales; el resto son MUESTRAS DE EJEMPLO (`draft: true`): se muestran con la etiqueta "Ejemplo"
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
  /** Captura (ruta en /public) que reemplaza al degradado como portada. */
  image?: string;
  /** Capturas adicionales (rutas en /public) que se muestran bajo la descripción. */
  gallery?: { src: string; alt: string }[];
  /** Texto del enlace a `url`. */
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    name: 'Chroma',
    year: '2026',
    category: 'Design system',
    type: 'web',
    stack: 'React, Tailwind v4, Storybook',
    description:
      'Design system propio para web y mobile: más de 40 componentes con el mismo contrato de props, tokens compartidos, tema oscuro y accesibilidad probada. Este sitio está hecho con él.',
    cover: 'linear-gradient(135deg, #111110, #c42b00 60%, #ff3b00)',
    url: 'https://chroma-storybook.vercel.app',
    linkLabel: 'Ver el Storybook',
  },
  {
    name: 'Performa Club',
    year: '2026',
    category: 'App móvil · Comunidad',
    type: 'app',
    stack: 'Expo, React Native, Supabase',
    description:
      'App móvil para entusiastas de los carros: garaje, viajes, misiones, ranking y social, con escaneo de vehículos con IA y suscripción premium. Estética oscura estilo cyberpunk. Las capturas de garaje usan datos de ejemplo.',
    cover: 'linear-gradient(135deg, #0a0a0a, #00a3b8 60%, #00e5ff)',
    image: '/proyectos/performa-club/login.jpg',
    gallery: [
      { src: '/proyectos/performa-club/login.jpg', alt: 'Pantalla de acceso de Performa Club con un auto deportivo y neones' },
      { src: '/proyectos/performa-club/garage.jpg', alt: 'Garaje de Performa Club con dos carros de ejemplo y sus modificaciones' },
      { src: '/proyectos/performa-club/detalle.jpg', alt: 'Detalle de un carro de ejemplo con potencia, modificaciones y especificaciones' },
      { src: '/proyectos/performa-club/misiones.jpg', alt: 'Misiones de Performa Club: seis retos con puntos y progreso' },
    ],
  },
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
