export interface Concept {
  slug: 'senal' | 'indice' | 'pestanas' | 'lienzo';
  n: string;
  name: string;
  tags: string[];
  description: string;
  cover: string;
  href: string;
}

export const concepts: Concept[] = [
  {
    slug: 'senal',
    n: '01',
    name: 'Señal',
    tags: ['Oscuro', 'Cinematográfico'],
    description: 'Esfera de partículas que sigue al cursor, nombre con glitch y galería horizontal.',
    cover: 'radial-gradient(circle at 60% 40%, #ff4d1f, #120a1c 60%)',
    href: '/laboratorio/senal',
  },
  {
    slug: 'indice',
    n: '02',
    name: 'Índice',
    tags: ['Claro', 'Editorial'],
    description: 'Revista digital: tipografía mixta y lista de obras con vista previa que sigue al cursor.',
    cover: 'linear-gradient(135deg, #f1eee7, #d3cdbf)',
    href: '/laboratorio/indice',
  },
  {
    slug: 'pestanas',
    n: '03',
    name: 'Pestañas',
    tags: ['Color', 'Lúdico'],
    description: 'Sistema de pestañas de color con transiciones de tinta circulares.',
    cover: 'linear-gradient(135deg, #ff3d00, #5a14d6 55%, #2639ff)',
    href: '/laboratorio/pestanas',
  },
  {
    slug: 'lienzo',
    n: '04',
    name: 'Lienzo',
    tags: ['Infinito', 'Interactivo'],
    description: 'Un lienzo infinito tipo Figma: arrastras, haces zoom y mueves los objetos.',
    cover: 'radial-gradient(circle at 35% 35%, #fff4c9, #ffb0c8 40%, #ff7a3d)',
    href: '/laboratorio/lienzo',
  },
];
