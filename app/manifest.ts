import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'Subs Tracker',
    name: 'Subs Tracker',
    description: 'Track and organise all your subscriptions from one app, without any hassle.',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/images/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/icons/maskable_icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: '/?utm_source=homescreen',
    theme_color: '#ffffff',
    background_color: '#ffffff',
  };
}
