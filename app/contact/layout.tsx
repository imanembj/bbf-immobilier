import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contactez BBF Immobilier Martinique | Agence Immobilière - Devis Gratuit',
  description: 'Contactez BBF Immobilier en Martinique. Agence immobilière à votre écoute : vente, location, gestion locative. Réponse sous 24h. Devis gratuit. Téléphone, email, formulaire de contact.',
  keywords: 'contact bbf immobilier, agence immobilière martinique contact, téléphone agence immobilière martinique, email immobilier martinique, rendez-vous agence immobilière',
  openGraph: {
    title: 'Contactez BBF Immobilier Martinique - Agence Immobilière',
    description: 'Agence immobilière en Martinique. Réponse sous 24h. Devis gratuit.',
    url: 'https://www.bbf-immobilier.com/contact',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contactez BBF Immobilier Martinique',
    description: 'Agence immobilière en Martinique. Réponse sous 24h.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
