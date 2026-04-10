import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Biens Immobiliers en Martinique | Villas, Appartements, Terrains - BBF Immobilier',
  description: 'Découvrez notre sélection de biens immobiliers en Martinique : villas de luxe, appartements, terrains, maisons. Vente et location saisonnière et annuelle. Trouvez votre bien idéal en Martinique.',
  keywords: 'biens immobiliers martinique, villa martinique, appartement martinique, terrain martinique, maison martinique, immobilier antilles, propriété martinique',
  openGraph: {
    title: 'Nos Biens Immobiliers en Martinique - BBF Immobilier',
    description: 'Villas de luxe, appartements, terrains et maisons en Martinique. Découvrez nos biens d\'exception.',
    url: 'https://www.bbf-immobilier.com/biens',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.bbf-immobilier.com/images/og-biens.jpg',
        width: 1200,
        height: 630,
        alt: 'Biens immobiliers BBF Immobilier Martinique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Biens Immobiliers en Martinique - BBF Immobilier',
    description: 'Villas de luxe, appartements, terrains et maisons en Martinique.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/biens',
  },
}

export default function BiensLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
