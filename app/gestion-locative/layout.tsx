import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion Locative en Martinique | Gestion de Biens Immobiliers - BBF Immobilier',
  description: 'Confiez la gestion de votre bien immobilier en Martinique à BBF Immobilier. Gestion locative saisonnière et annuelle. Recherche locataires, état des lieux, encaissement loyers, entretien. Service complet.',
  keywords: 'gestion locative martinique, gestion immobilière martinique, gestion location saisonnière martinique, gestion location annuelle martinique, administrateur de biens martinique, syndic martinique',
  openGraph: {
    title: 'Gestion Locative en Martinique - BBF Immobilier',
    description: 'Gestion locative saisonnière et annuelle en Martinique. Service complet et personnalisé.',
    url: 'https://www.bbf-immobilier.com/gestion-locative',
    siteName: 'BBF Immobilier',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Gestion Locative Martinique - BBF Immobilier',
    description: 'Gestion locative saisonnière et annuelle. Service complet.',
  },
  alternates: {
    canonical: 'https://www.bbf-immobilier.com/gestion-locative',
  },
}

export default function GestionLocativeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
