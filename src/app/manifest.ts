import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Perfect Consultancy Services',
    short_name: 'PCS',
    description: 'Expert Tax, Accounting & Business Compliance services in Ranchi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/lib/favicon.ico',
        sizes: '48x48 96x96 144x144 192x192 256x256 512x512',
        type: 'image/x-icon',
      },
    ],
  };
}
