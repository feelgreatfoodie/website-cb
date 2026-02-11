import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Christian Bourlier | Solutions Architect & Data Engineer',
    short_name: 'C. Bourlier',
    description:
      'Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2E004B',
    theme_color: '#1E90FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
