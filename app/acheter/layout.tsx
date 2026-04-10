import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acheter un Bien Immobilier en Martinique | Villas, Appartements, Terrains - BBF Immobilier',
  description: 'Achetez votre bien immobilier en Martinique : villas de prestige, appartements neufs, terrains constructibles, maisons créoles. Accompagnement personnalisé de A à Z. Estimation gratuite.',
  keywords: 'acheter en martinique, vente immobilier martinique, villa à vendre martinique, appartement à vendre martinique, terrain à vendre martinique, investissement immobilier martinique, achat immobilier antilles',
  openGraph: {
    title: 'Acheter un Bien Immobilier en Martinique - BBF Immobilier',
    description: 'Villas de prestige, appartements neufs, terrains constructibles en Martinique. Accompagnement personnalisé.',
    url: 'https://www.bbf-immobilier.com/acheter',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.bbf-immobilier.com/images/og-acheter.jpg',
        width: 1200,
        height: 630,
        alt: 'Acheter en Martinique - BBF Immobilier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acheter un Bien Immobilier en Martinique',
    description: 'Villas de prestige, appartements neufs, terrains constructibles en Martinique.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/acheter',
  },
}

export default function AcheterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
