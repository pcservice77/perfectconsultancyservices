import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Perfect Consultancy Services',
    short_name: 'PCS',
    description: 'Expert Tax, Accounting & Business Compliance services in Ranchi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284c7', // Professional primary color
    icons: [
      {
        src: '/lib/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
