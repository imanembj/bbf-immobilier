import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article'
  canonical?: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bbf-immobilier.com'
const siteName = 'BBF Immobilier - Bulle Immobilière Business & Foncier Martinique'
const defaultImage = `${baseUrl}/og-image.jpg`

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = defaultImage,
  ogType = 'website',
  canonical,
}: PageMetadata): Metadata {
  const fullTitle = `${title} | ${siteName}`
  
  return {
    title: fullTitle,
    description,
    keywords: [
      'immobilier Martinique',
      'agence immobilière Martinique',
      'location Martinique',
      'vente immobilier Martinique',
      'location saisonnière Martinique',
      'location longue durée Martinique',
      'Rivière-Pilote',
      'BBF Immobilier',
      'Bulle Immobilière',
      'villa Martinique',
      'appartement Martinique',
      'maison Martinique',
      'terrain Martinique',
      'business foncier Martinique',
      'gestion locative Martinique',
      'investissement immobilier Martinique',
      'Fort-de-France immobilier',
      'Le Marin immobilier',
      'Sainte-Anne immobilier',
      'Les Trois-Îlets immobilier',
      'immobilier 972',
      'agence immobilière 972',
      'location vacances Martinique',
      'achat maison Martinique',
      'vente villa Martinique',
      ...keywords,
    ],
    authors: [{ name: 'Bulle Immobilière' }],
    creator: 'Bulle Immobilière',
    publisher: 'Bulle Immobilière',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'fr_FR',
      url: canonical || baseUrl,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@bulleimmobiliere',
    },
    verification: {
      google: 'votre-code-google-search-console',
    },
  }
}

// Métadonnées par défaut pour le layout
export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: 'BBF Immobilier - Agence immobilière n°1 en Martinique (972). Vente, location longue durée et saisonnière de villas, appartements, maisons et terrains. Expert en gestion locative, business et foncier à Rivière-Pilote, Fort-de-France, Le Marin, Sainte-Anne. Votre projet immobilier en Martinique commence ici !',
  keywords: [
    'BBF Immobilier',
    'Bulle Immobilière',
    'agence immobilière Martinique',
    'immobilier Martinique',
    'immobilier 972',
    'vente maison Martinique',
    'vente villa Martinique',
    'vente appartement Martinique',
    'location Martinique',
    'location saisonnière Martinique',
    'location vacances Martinique',
    'location longue durée Martinique',
    'gestion locative Martinique',
    'investissement immobilier Martinique',
    'business foncier Martinique',
    'terrain à vendre Martinique',
    'Rivière-Pilote immobilier',
    'Fort-de-France immobilier',
    'Le Marin immobilier',
    'Sainte-Anne immobilier',
    'Les Trois-Îlets immobilier',
    'Le Diamant immobilier',
    'Le François immobilier',
    'Schoelcher immobilier',
    'agence immobilière 972',
    'immobilier Antilles',
    'immobilier DOM-TOM',
    'acheter en Martinique',
    'louer en Martinique',
    'villa vue mer Martinique',
    'appartement bord de mer Martinique',
  ],
  authors: [{ name: 'Bulle Immobilière' }],
  creator: 'Bulle Immobilière',
  publisher: 'Bulle Immobilière',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName,
    title: siteName,
    description: 'Agence immobilière en Martinique spécialisée dans la vente, location longue durée et saisonnière.',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'Bulle Immobilière - Agence immobilière en Martinique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Agence immobilière en Martinique spécialisée dans la vente, location longue durée et saisonnière.',
    images: [defaultImage],
    creator: '@bulleimmobiliere',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
