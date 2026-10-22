export interface Service {
  id: 'web' | 'apps' | 'ia';
  title: string;
  summary: string;
  points: string[];
  stack: string[];
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Webs y tiendas',
    summary: 'Sitios rápidos, con identidad propia y que se sienten premium en celular y en computador.',
    points: [
      'Landings y sitios con varias secciones',
      'Tiendas con pagos en línea (Wompi, PayPal, Nequi)',
      'Panel para que tú mismo cambies el contenido',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'apps',
    title: 'Apps móviles',
    summary: 'Una sola base de código para iOS y Android, desde el diseño hasta la publicación en las tiendas.',
    points: [
      'Apps con Expo y React Native',
      'Cuentas de usuario, notificaciones y pagos',
      'Panel web para administrar tu app',
    ],
    stack: ['Expo', 'React Native', 'Supabase'],
  },
  {
    id: 'ia',
    title: 'Asistentes con IA',
    summary: 'Chatbots y buscadores que responden con la información de tu negocio, no con respuestas genéricas.',
    points: [
      'Chatbot que aprende de tus catálogos, manuales o PDFs',
      'Buscador inteligente dentro de tu web o app',
      'Respuestas y avisos automáticos por WhatsApp',
    ],
    stack: ['Claude API', 'RAG', 'WhatsApp'],
  },
];

/** Las tres preguntas con las que empieza cada proyecto. Texto provisional: ver README (Pendientes). */
export const method = [
  { n: '01', question: '¿Qué problema resuelve?', body: 'Antes de diseñar, definimos qué tiene que lograr: vender, agendar, registrar, informar.' },
  { n: '02', question: '¿Quién lo usa y desde dónde?', body: 'Celular, computador o los dos. Cada pantalla se piensa desde la persona que llega.' },
  { n: '03', question: '¿Cómo vamos a medirlo?', body: 'Una meta con número: ventas, citas, registros. Así sabemos si funcionó, no solo si quedó bonito.' },
];
