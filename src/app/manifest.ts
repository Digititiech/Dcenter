import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Decision Center Strategic Interface',
    short_name: 'DCenter',
    description: 'Decision Center Sovereign Financial & Economic Advisory Portal',
    start_url: '/',
    display: 'standalone',
    background_color: '#070707',
    theme_color: '#c5a059',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
