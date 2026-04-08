interface PropertyData {
  id: string
  title: string
  description: string
  price: number
  currency?: string
  image: string[]
  address: {
    street?: string
    city: string
    region: string
    postalCode?: string
    country: string
  }
  propertyType: string
  numberOfRooms?: number
  floorSize?: number
  url: string
}

export function PropertyStructuredData({ property }: { property: PropertyData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: property.url,
    image: property.image,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency || 'EUR',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address.street,
      addressLocality: property.address.city,
      addressRegion: property.address.region,
      postalCode: property.address.postalCode,
      addressCountry: property.address.country,
    },
    ...(property.numberOfRooms && { numberOfRooms: property.numberOfRooms }),
    ...(property.floorSize && {
      floorSize: {
        '@type': 'QuantitativeValue',
        value: property.floorSize,
        unitCode: 'MTK',
      },
    }),
    additionalType: property.propertyType,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'BBF Immobilier - Bulle Immobilière Business & Foncier',
    alternateName: ['BBF Immobilier', 'Bulle Immobilière', 'BBF'],
    description: 'Agence immobilière n°1 en Martinique (972) spécialisée dans la vente, location longue durée et saisonnière, gestion locative, business et foncier. Expert immobilier à Rivière-Pilote et dans toute la Martinique.',
    url: 'https://bbf-immobilier.com',
    logo: 'https://bbf-immobilier.com/logo.png',
    image: 'https://bbf-immobilier.com/og-image.jpg',
    telephone: '+596 696 XX XX XX',
    email: 'contact@bbf-immobilier.com',
    priceRange: '€€',
    areaServed: {
      '@type': 'State',
      name: 'Martinique',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rivière-Pilote',
      addressRegion: 'Martinique',
      addressCountry: 'MQ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '14.4667',
      longitude: '-60.9000',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/bulleimmobiliere',
      'https://www.instagram.com/bulleimmobiliere',
      'https://www.tiktok.com/@bulleimmobiliere',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
