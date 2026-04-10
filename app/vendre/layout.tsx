import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendre votre Bien Immobilier en Martinique | Estimation Gratuite - BBF Immobilier',
  description: 'Vendez votre bien immobilier en Martinique avec BBF Immobilier. Estimation gratuite, photos professionnelles, visites virtuelles, diffusion maximale. Commission attractive. Vente rapide garantie.',
  keywords: 'vendre en martinique, vente immobilier martinique, estimation immobilière martinique, agence immobilière martinique, vendre villa martinique, vendre appartement martinique, mandat de vente martinique',
  openGraph: {
    title: 'Vendre votre Bien Immobilier en Martinique - BBF Immobilier',
    description: 'Estimation gratuite, photos pro, visites virtuelles. Vendez rapidement avec BBF Immobilier.',
    url: 'https://www.bbf-immobilier.com/vendre',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.bbf-immobilier.com/images/og-vendre.jpg',
        width: 1200,
        height: 630,
        alt: 'Vendre en Martinique - BBF Immobilier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendre votre Bien Immobilier en Martinique',
    description: 'Estimation gratuite, photos pro, visites virtuelles. Vendez rapidement.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/vendre',
  },
}

export default function VendreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
