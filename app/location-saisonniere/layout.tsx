import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location Saisonnière en Martinique | Villas et Appartements de Vacances - BBF Immobilier',
  description: 'Louez une villa ou un appartement pour vos vacances en Martinique. Location saisonnière avec piscine, vue mer, proche plages. Réservation en ligne sécurisée. Disponibilités en temps réel.',
  keywords: 'location saisonnière martinique, villa vacances martinique, location vacances martinique, appartement vacances martinique, location meublée martinique, airbnb martinique, location courte durée martinique',
  openGraph: {
    title: 'Location Saisonnière en Martinique - Villas et Appartements de Vacances',
    description: 'Villas avec piscine, appartements vue mer pour vos vacances en Martinique. Réservation en ligne.',
    url: 'https://www.bbf-immobilier.com/location-saisonniere',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.bbf-immobilier.com/images/og-location-saisonniere.jpg',
        width: 1200,
        height: 630,
        alt: 'Location saisonnière Martinique - BBF Immobilier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Saisonnière Martinique - Villas et Appartements',
    description: 'Villas avec piscine, appartements vue mer pour vos vacances en Martinique.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/location-saisonniere',
  },
}

export default function LocationSaisonniereLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
