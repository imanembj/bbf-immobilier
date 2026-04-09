// Types étendus pour les biens immobiliers complets

export type PropertyType = 'saisonniere' | 'annuelle' | 'vente'

export interface DetailedDescription {
  presentation: string
  interior: string
  exterior: string
}

export interface Environment {
  title: string
  description: string
  highlights: string[]
}

// Conditions pour location saisonnière
export interface RentalConditionsSaisonniere {
  deposit: number
  cleaningFee: number
  minStay: number
  cancellationPolicy: string
  included: string[]
  notIncluded: string[]
}

// Conditions pour location longue durée
export interface RentalConditionsAnnuelle {
  deposit: number
  charges: number
  minLease: number
  availableFrom: string
  included: string[]
  notIncluded: string[]
  documents: string[]
}

// Conditions pour achat
export interface PurchaseConditions {
  price?: number
  notaryFees?: number
  propertyTax?: number
  housingTax?: number
  condition?: string
  occupancy?: string
  orientation?: string
  constructionYear?: number
  lastRenovation?: number
}

export interface Fees {
  agencyFees: number
  ownerFees?: number
  percentage?: number
  description: string
  netSellerPrice?: number
}

export interface LegalInfo {
  reference: string
  dpe: string | null
  ges?: string | null
  law: string
  insurance?: string
  guarantees?: string
  diagnostics?: string[]
  risks?: string
}

export interface Amenity {
  icon: string
  name: string
}

// Système de tarification flexible
export type PricingType = 'simple' | 'seasonal' | 'custom'

export interface SeasonalPricing {
  lowSeason: number
  midSeason: number
  highSeason: number
}

export interface CustomPeriodPricing {
  description: string // Ex: "6 nuitées / 7 jours (hors options)"
  isPackage: boolean // true = forfait fixe, false = prix par nuit
  packageNights?: number // Nombre de nuitées du forfait (ex: 6)
  packageDays?: number // Nombre de jours du forfait (ex: 7)
  prices: {
    label: string // Ex: "Basse saison", "Moyenne saison", "Haute saison"
    price: number // Prix du forfait complet ou prix par nuit
  }[]
}

export interface PricingInfo {
  type: PricingType
  simplePrice?: number // Pour type 'simple'
  seasonalPricing?: SeasonalPricing // Pour type 'seasonal'
  customPricing?: CustomPeriodPricing // Pour type 'custom'
  period?: string // Ex: '/nuit', '/mois', '/semaine'
}

// Interface complète pour un bien immobilier
export interface CompleteProperty {
  id: string
  type: PropertyType
  propertyCategory?: 'maison' | 'appartement' | 'villa' | 'terrain' | 'chambre' | 'immeuble' | 'bureau' | 'fond_commerce' | 'parking' | 'local_commercial'
  title: string
  location: string
  price: number // Prix principal (pour compatibilité)
  period?: string
  pricingInfo?: PricingInfo // Nouveau système de tarification flexible
  description: string
  images: string[]
  videoUrl?: string // URL YouTube de présentation du bien
  virtualTourUrl?: string // URL de la visite virtuelle (Matterport, etc.)
  rooms: number // Nombre de pièces (F2, F3, F4...)
  beds: number // Nombre de chambres
  baths: number
  area: number
  guests?: number
  amenities: Amenity[]
  features: string[]
  rules: string[]
  
  // Informations détaillées
  detailedDescription: DetailedDescription
  environment: Environment
  
  // Conditions selon le type
  rentalConditions?: RentalConditionsSaisonniere | RentalConditionsAnnuelle
  purchaseConditions?: PurchaseConditions
  
  // Honoraires et légal
  fees: Fees
  legalInfo: LegalInfo
  
  // Métadonnées
  status: 'disponible' | 'reserve' | 'loue' | 'vendu' | 'brouillon'
  featured: boolean
  rating?: number
  reviews?: number
  createdAt: Date
  updatedAt: Date
}

// Type pour le formulaire d'ajout/édition
export type PropertyFormData = Omit<CompleteProperty, 'id' | 'createdAt' | 'updatedAt'>

// Helper pour créer un bien vide selon le type
export function createEmptyProperty(type: PropertyType): Partial<PropertyFormData> {
  const base = {
    type,
    title: '',
    location: '',
    price: 0,
    pricingInfo: {
      type: 'simple' as PricingType,
      simplePrice: 0,
      period: type === 'saisonniere' ? '/nuit' : type === 'annuelle' ? '/mois' : '',
    },
    description: '',
    images: [],
    rooms: 0,
    beds: 0,
    baths: 0,
    area: 0,
    amenities: [],
    features: [],
    rules: [],
    detailedDescription: {
      presentation: '',
      interior: '',
      exterior: '',
    },
    environment: {
      title: 'Environnement & Quartier',
      description: '',
      highlights: [],
    },
    fees: {
      agencyFees: 0,
      description: '',
    },
    status: 'disponible' as const,
    featured: false,
  }

  if (type === 'saisonniere') {
    return {
      ...base,
      period: '/nuit',
      guests: 0,
      rentalConditions: {
        deposit: 0,
        cleaningFee: 0,
        minStay: 1,
        cancellationPolicy: '',
        included: [],
        notIncluded: [],
      },
      legalInfo: {
        reference: '',
        dpe: null,
        law: 'Location saisonnière conforme à la loi ALUR et ELAN',
        insurance: 'Assurance responsabilité civile obligatoire',
      },
    }
  }

  if (type === 'annuelle') {
    return {
      ...base,
      period: '/mois',
      rentalConditions: {
        deposit: 0,
        charges: 0,
        minLease: 12,
        availableFrom: '',
        included: [],
        notIncluded: [],
        documents: [],
      },
      legalInfo: {
        reference: '',
        dpe: '',
        ges: '',
        law: 'Bail soumis à la loi du 6 juillet 1989',
        insurance: 'Assurance habitation obligatoire',
        guarantees: '',
      },
    }
  }

  if (type === 'vente') {
    return {
      ...base,
      purchaseConditions: {
        price: 0,
        notaryFees: 0,
        propertyTax: 0,
        housingTax: 0,
        condition: '',
        occupancy: '',
        orientation: '',
        constructionYear: new Date().getFullYear(),
      },
      legalInfo: {
        reference: '',
        dpe: '',
        ges: '',
        law: '',
        diagnostics: [],
        risks: '',
      },
    }
  }

  return base
}
