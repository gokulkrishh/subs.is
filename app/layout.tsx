import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from 'components/context/theme';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const title = 'Subs Tracker';
const description = 'Track and manage all your subscriptions from one app, without any hassle.';

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://subs.is'),
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    site: '@gokul_i',
    description,
    creator: '@gokul_i',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1920,
        height: 1080,
        alt: 'Subs Tracker',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Subs Tracker',
    title,
    description,
    url: 'https://subs.is',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Subs Tracker',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <NextTopLoader height={2} shadow={false} color="#db2777" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
        </Script>
      </body>
    </html>
  );
}
