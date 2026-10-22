import type { NextConfig } from 'next';

const config: NextConfig = {
  // El laboratorio son páginas HTML estáticas en public/laboratorio; estas reglas dan URLs limpias.
  async rewrites() {
    return [
      { source: '/laboratorio', destination: '/laboratorio/index.html' },
      { source: '/laboratorio/comparar', destination: '/laboratorio/comparar.html' },
      { source: '/laboratorio/senal', destination: '/laboratorio/conceptos/01-senal/index.html' },
      { source: '/laboratorio/indice', destination: '/laboratorio/conceptos/02-indice/index.html' },
      { source: '/laboratorio/pestanas', destination: '/laboratorio/conceptos/03-pestanas/index.html' },
      { source: '/laboratorio/lienzo', destination: '/laboratorio/conceptos/04-lienzo/index.html' },
    ];
  },
  // Enlaces antiguos de la versión estática (ya compartidos) apuntan al laboratorio.
  async redirects() {
    return [
      { source: '/comparar.html', destination: '/laboratorio/comparar', permanent: true },
      { source: '/conceptos/01-senal', destination: '/laboratorio/senal', permanent: true },
      { source: '/conceptos/02-indice', destination: '/laboratorio/indice', permanent: true },
      { source: '/conceptos/03-pestanas', destination: '/laboratorio/pestanas', permanent: true },
      { source: '/conceptos/04-lienzo', destination: '/laboratorio/lienzo', permanent: true },
    ];
  },
};

export default config;
