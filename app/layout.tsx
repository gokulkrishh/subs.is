import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import Script from 'next/script'

import NextTopLoader from 'nextjs-toploader'

import { AuthProvider } from '@/components/context/auth'
import Header from '@/components/header'

import './globals.css'

const lexend = Lexend({ variable: '--font-lexend', subsets: ['latin'] })

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.className} m-auto h-dvh w-full max-w-lg antialiased`}>
        <NextTopLoader height={2} shadow={false} color="#db2777" showSpinner={false} />
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>

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
