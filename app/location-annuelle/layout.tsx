import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location Annuelle en Martinique | Appartements et Maisons à Louer - BBF Immobilier',
  description: 'Trouvez votre location longue durée en Martinique : appartements, maisons, villas. Location annuelle meublée ou non meublée. Dossier de location simplifié. Disponibilités immédiates.',
  keywords: 'location annuelle martinique, location longue durée martinique, appartement à louer martinique, maison à louer martinique, location meublée martinique, location non meublée martinique',
  openGraph: {
    title: 'Location Annuelle en Martinique - Appartements et Maisons',
    description: 'Appartements et maisons à louer en Martinique. Location longue durée meublée ou non meublée.',
    url: 'https://www.bbf-immobilier.com/location-annuelle',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.bbf-immobilier.com/images/og-location-annuelle.jpg',
        width: 1200,
        height: 630,
        alt: 'Location annuelle Martinique - BBF Immobilier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Annuelle Martinique - Appartements et Maisons',
    description: 'Appartements et maisons à louer en Martinique. Location longue durée.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/location-annuelle',
  },
}

export default function LocationAnnuelleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
