import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { AuthProvider } from '@/components/context/auth'
import { ThemeProvider } from '@/components/context/theme'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const title = 'Subs Tracker'
const description = 'Track and organise all your subscriptions from one app, without any hassle.'

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID

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
        url: '/images/og.png',
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
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Subs Tracker',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '',
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}antialiased`}>
        <NextTopLoader height={2} shadow={false} color="#db2777" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <AuthProvider>
              <div className="m-auto h-dvh w-full max-w-lg">
                <Header />
                {children}
              </div>
            </AuthProvider>
          </NuqsAdapter>
        </ThemeProvider>

        <Toaster />

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
  )
}
