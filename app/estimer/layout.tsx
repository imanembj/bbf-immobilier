import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estimation Immobilière Gratuite en Martinique | Estimez votre Bien - BBF Immobilier',
  description: 'Estimation immobilière gratuite et sans engagement en Martinique. Évaluez le prix de votre villa, appartement, terrain ou maison. Expertise professionnelle. Réponse sous 24h. Estimation en ligne rapide.',
  keywords: 'estimation immobilière martinique, estimer bien martinique, prix immobilier martinique, évaluation immobilière martinique, estimation gratuite martinique, estimer villa martinique, estimer appartement martinique',
  openGraph: {
    title: 'Estimation Immobilière Gratuite en Martinique - BBF Immobilier',
    description: 'Estimez gratuitement votre bien en Martinique. Expertise professionnelle. Réponse sous 24h.',
    url: 'https://www.bbf-immobilier.com/estimer',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Estimation Immobilière Gratuite Martinique',
    description: 'Estimez gratuitement votre bien en Martinique. Réponse sous 24h.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/estimer',
  },
}

export default function EstimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
