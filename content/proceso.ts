export interface Phase {
  n: string;
  title: string;
  duration: string;
  body: string;
}

export const phases: Phase[] = [
  {
    n: '01',
    title: 'Cotización',
    duration: '1 a 2 días',
    body: 'Me escribes por WhatsApp y te respondo con alcance, tiempo y precio. Si cuadra, pagas el anticipo y arrancamos.',
  },
  {
    n: '02',
    title: 'Diseño',
    duration: '3 a 7 días',
    body: 'Te muestro las pantallas y ajustamos hasta que se sienta tuyo. Nada de sorpresas al final.',
  },
  {
    n: '03',
    title: 'Desarrollo',
    duration: 'Según el alcance',
    body: 'Programo con tu marca y tus contenidos. Te muestro avances cada semana. El tiempo exacto sale de la calculadora.',
  },
  {
    n: '04',
    title: 'Entrega',
    duration: '1 día',
    body: 'Queda en línea (o en las tiendas de apps), te enseño a manejarlo y te entrego código, accesos y documentación.',
  },
];
