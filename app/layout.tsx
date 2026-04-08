import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ScrollToTop from '@/components/layout/ScrollToTop'
import CookieConsent from '@/components/CookieConsent'
import FavoritesPanel from '@/components/FavoritesPanel'
import { OrganizationStructuredData } from '@/components/StructuredData'
import { FavoritesProvider } from '@/lib/favorites'
import { defaultMetadata } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <OrganizationStructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <FavoritesProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
          <FavoritesPanel />
          <CookieConsent />
          <Toaster position="top-right" />
        </FavoritesProvider>
      </body>
    </html>
  )
}
