import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import BottomBar from 'components/bottom-bar';
import { AuthProvider } from 'components/context/auth';
import { ThemeProvider } from 'components/context/theme';
import { UserProvider } from 'components/context/user';
import Header from 'components/header';
import NextTopLoader from 'nextjs-toploader';

import { getAuthUser, getUser } from './actions/user';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authUser, userData] = await Promise.all([await getAuthUser(), await getUser()]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <NextTopLoader height={2} shadow={false} color="#db2777" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider user={authUser}>
            <UserProvider user={userData}>
              <div className="px-4 py-2 flex flex-col w-full md:max-w-lg m-auto">
                <Header />
                {children}
              </div>
              <BottomBar />
            </UserProvider>
          </AuthProvider>
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
