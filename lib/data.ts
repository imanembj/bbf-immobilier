// Types de données
export interface Property {
  id: string
  title: string
  type: 'vente' | 'location' | 'annuelle' | 'saisonniere'
  propertyCategory?: 'maison' | 'appartement' | 'villa' | 'terrain' | 'chambre' | 'immeuble' | 'bureau' | 'fond_commerce' | 'parking' | 'local_commercial'
  location: string
  price: number
  period?: string
  description: string
  images: string[]
  videoUrl?: string // URL YouTube de présentation du bien
  virtualTourUrl?: string // URL de la visite virtuelle (Matterport, etc.)
  rooms: number // Nombre de pièces (F2, F3, F4...)
  beds: number // Nombre de chambres
  baths: number
  area: number
  guests?: number
  amenities: string[] | any[] // Peut être string[] ou {icon, name}[]
  features: string[]
  status: 'disponible' | 'reserve' | 'loue' | 'vendu' | 'brouillon'
  featured: boolean
  createdAt: Date
  updatedAt: Date
  
  // Champs détaillés optionnels (du formulaire complet)
  detailedDescription?: {
    presentation: string
    interior: string
    exterior: string
  }
  environment?: {
    title: string
    description: string
    highlights: string[]
  }
  rules?: string[]
  rentalConditions?: any
  purchaseConditions?: any
  fees?: {
    agencyFees: number
    description: string
    netSellerPrice?: number
  }
  legalInfo?: {
    reference: string
    dpe: string | null
    ges?: string | null
    law: string
    insurance?: string
    guarantees?: string
    diagnostics?: string[]
    risks?: string
  }
}

export interface Booking {
  id: string
  propertyId: string
  propertyTitle: string
  clientName: string
  clientEmail: string
  clientPhone: string
  checkIn: Date
  checkOut: Date
  guests: number
  status: 'en_attente' | 'confirme' | 'annule' | 'termine'
  totalPrice: number
  message?: string
  createdAt: Date
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'non_lu' | 'lu' | 'repondu'
  createdAt: Date
}

export interface Review {
  id: string
  propertyId: string
  clientName: string
  clientEmail: string
  rating: number // 1-5
  comment: string
  status: 'en_attente' | 'approuve' | 'rejete'
  createdAt: Date
  response?: string // Réponse de l'agence
  respondedAt?: Date
}

export interface Partner {
  id: string
  nom: string
  categorie: string
  description: string
  logo: string // Emoji ou URL d'image
  url: string
  promo?: string // Code promo optionnel
  prix?: string // Prix optionnel
  ordre: number // Pour gérer l'ordre d'affichage
  actif: boolean // Pour activer/désactiver sans supprimer
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  ordre: number // Pour gérer l'ordre d'affichage
  actif: boolean // Pour activer/désactiver sans supprimer
  categorie?: string // Optionnel: pour grouper les questions
  createdAt: Date
  updatedAt: Date
}

// Types pour les demandes clients
export type RequestType = 'estimation' | 'visite' | 'reservation' | 'rendez-vous'
export type RequestStatus = 'nouveau' | 'en_cours' | 'traite' | 'annule'

export interface ClientRequest {
  id: string
  type: RequestType
  status: RequestStatus
  
  // Informations client
  name: string
  email: string
  phone: string
  
  // Informations spécifiques selon le type
  propertyId?: string // Pour visite et réservation
  propertyTitle?: string // Pour affichage
  
  // Pour estimation
  propertyType?: 'appartement' | 'maison' | 'terrain' | 'commerce' | 'autre'
  propertyAddress?: string
  propertyArea?: number
  propertyRooms?: number
  estimationDetails?: string
  
  // Pour visite
  preferredDate?: Date
  preferredTime?: string
  visitMessage?: string
  
  // Pour réservation
  checkIn?: Date
  checkOut?: Date
  guests?: number
  reservationMessage?: string
  totalPrice?: number
  pricePerNight?: number
  
  // Pour rendez-vous
  appointmentDate?: Date
  appointmentTime?: string
  appointmentReason?: string
  appointmentMessage?: string
  
  // Métadonnées
  message?: string // Message général
  createdAt: Date
  updatedAt: Date
  emailSent: boolean // Pour tracker si l'email a été envoyé
  adminNotes?: string // Notes internes de l'admin
}

// Données initiales (vides - tout se gère via l'admin)
export const initialProperties: Property[] = []

export const initialBookings: Booking[] = []

export const initialReviews: Review[] = []

export const initialMessages: Message[] = []

// Données initiales des partenaires (celles qui étaient dans la page)
export const initialPartners: Partner[] = [
  {
    id: '1',
    nom: 'Notaires de Martinique',
    categorie: 'Juridique',
    description: 'Chambre interdépartementale des notaires Guyane-Martinique',
    logo: '⚖️',
    url: 'https://chambre-interdep-guyane-martinique.notaires.fr',
    ordre: 1,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    nom: 'King Location',
    categorie: 'Mobilité',
    description: '-12% avec le code BBF sur votre location de voiture',
    logo: '🚗',
    url: 'https://www.kingslocation.fr',
    promo: 'Code: BBF',
    ordre: 2,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    nom: 'L\'île aux Iguanes',
    categorie: 'Loisirs',
    description: 'Découvrez les merveilles de la Martinique',
    logo: '🦎',
    url: '#',
    ordre: 3,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    nom: 'Massages & Bien-être',
    categorie: 'Détente',
    description: 'Services de massage et relaxation',
    logo: '💆',
    url: '#',
    ordre: 4,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    nom: 'Banques partenaires',
    categorie: 'Financement',
    description: 'Réseau de banques pour vos projets immobiliers',
    logo: '🏦',
    url: '#',
    ordre: 5,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    nom: 'Artisans certifiés',
    categorie: 'Travaux',
    description: 'Professionnels qualifiés pour vos rénovations',
    logo: '🔨',
    url: '#',
    ordre: 6,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    nom: 'Assurances',
    categorie: 'Protection',
    description: 'Solutions d\'assurance habitation et emprunteur',
    logo: '🛡️',
    url: '#',
    ordre: 7,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    nom: 'Poissons frais',
    categorie: 'Expérience Mystique',
    description: 'Pêche locale livrée à la villa, nettoyage et préparation inclus',
    logo: '🐟',
    url: '#',
    prix: 'À partir de 15 €',
    ordre: 8,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    nom: 'Courses à l\'arrivée',
    categorie: 'Expérience Mystique',
    description: 'Livraison personnalisée de produits frais et essentiels',
    logo: '🛒',
    url: '#',
    prix: 'Service : 25 €',
    ordre: 9,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    nom: 'Repas & Douceurs',
    categorie: 'Expérience Mystique',
    description: 'Chef privé, menus créoles, gâteaux événementiels',
    logo: '🍽️',
    url: '#',
    prix: 'Dès 25 €/pers',
    ordre: 10,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '11',
    nom: 'Balades en mer',
    categorie: 'Expérience Mystique',
    description: 'Sorties bateau, apéro sunset, îlets, snorkeling, dauphins',
    logo: '⛵',
    url: '#',
    prix: 'Dès 60 €/pers',
    ordre: 11,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Données initiales de la FAQ (celles qui étaient dans la page contact)
export const initialFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Comment louer un bien ?',
    answer: 'Pour louer un bien, parcourez nos annonces, sélectionnez le bien qui vous intéresse, puis contactez-nous via le formulaire ou par téléphone. Nous organiserons une visite et vous accompagnerons dans toutes les démarches administratives.',
    ordre: 1,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    question: 'Quels documents fournir pour une location ?',
    answer: 'Vous devrez fournir : pièce d\'identité, 3 derniers bulletins de salaire, dernier avis d\'imposition, justificatif de domicile, RIB. Pour les garants : mêmes documents + attestation de garant.',
    ordre: 2,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    question: 'Quels sont les frais d\'agence ?',
    answer: 'Les frais d\'agence varient selon le type de location. Pour une location longue durée, comptez environ 1 mois de loyer HT. Pour une location saisonnière, les frais sont inclus dans le prix affiché. Contactez-nous pour un devis personnalisé.',
    ordre: 3,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    question: 'Quelle est la durée du bail ?',
    answer: 'Pour une location vide, le bail est de 3 ans minimum (6 ans pour les personnes morales). Pour une location meublée, le bail est d\'1 an minimum (9 mois pour les étudiants). Les locations saisonnières sont de courte durée (quelques jours à quelques mois).',
    ordre: 4,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    question: 'Comment fonctionne la caution ?',
    answer: 'Le dépôt de garantie équivaut généralement à 1 mois de loyer hors charges pour une location vide, et 2 mois pour une location meublée. Il vous sera restitué dans un délai de 1 à 2 mois après votre départ, déduction faite des éventuelles réparations.',
    ordre: 5,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    question: 'Comment résilier mon bail ?',
    answer: 'Pour résilier votre bail, envoyez une lettre recommandée avec accusé de réception à votre propriétaire. Le préavis est de 3 mois pour une location vide (1 mois dans certains cas) et 1 mois pour une location meublée.',
    ordre: 6,
    actif: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Type pour les articles de blog
export interface BlogPost {
  id: string
  slug: string // URL-friendly (ex: sponsoring-micah-fatna-moto-gp)
  title: string
  excerpt: string // Résumé court
  content: string // Contenu complet (HTML ou Markdown)
  coverImage: string // Image principale
  coverImagePosition?: string // Position de l'image de couverture (ex: "50% 50%")
  images: string[] // Galerie d'images
  links?: { title: string; url: string }[] // Liens utiles
  category: 'sponsoring' | 'actualites' | 'conseils' | 'evenements' | 'marche-immobilier'
  tags: string[]
  author: string
  isPinned: boolean // Article épinglé en haut
  isPublished: boolean // Brouillon ou publié
  views: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

// Articles de blog initiaux
export const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'sponsoring-micah-fatna-moto-gp',
    title: 'BBF Immobilier sponsorise Micah Fatna, jeune champion de Moto GP',
    excerpt: 'Nous sommes fiers d\'annoncer notre partenariat avec Micah Fatna, jeune talent martiniquais en Moto GP. Découvrez son parcours exceptionnel et notre engagement pour la jeunesse locale.',
    content: `
      <div class="prose max-w-none">
        <h2>Un talent martiniquais qui fait vibrer les circuits</h2>
        <p>
          Chez <strong>BBF Immobilier - Bulle Immobilière Business & Foncier</strong>, nous croyons fermement au soutien des talents locaux. 
          C'est avec une immense fierté que nous annonçons notre sponsoring de <strong>Micah Fatna</strong>, jeune prodige martiniquais 
          qui fait sensation dans le monde de la Moto GP.
        </p>

        <h3>Qui est Micah Fatna ?</h3>
        <p>
          Micah Fatna est un jeune pilote de moto originaire de Martinique qui s'est rapidement fait un nom dans le monde 
          compétitif de la Moto GP. Avec sa détermination, son talent et sa passion pour la vitesse, Micah représente 
          l'excellence et l'ambition de la jeunesse martiniquaise.
        </p>

        <h3>Pourquoi BBF sponsorise Micah ?</h3>
        <p>
          Notre engagement va au-delà de l'immobilier. Nous croyons au développement de notre territoire et au soutien 
          de ceux qui portent haut les couleurs de la Martinique. Micah incarne des valeurs qui nous sont chères :
        </p>
        <ul>
          <li><strong>La détermination</strong> : Atteindre l'excellence demande du travail et de la persévérance</li>
          <li><strong>L'ambition</strong> : Viser toujours plus haut, comme nous le faisons dans l'immobilier</li>
          <li><strong>Le dépassement de soi</strong> : Repousser ses limites pour atteindre ses objectifs</li>
          <li><strong>La fierté locale</strong> : Représenter la Martinique sur la scène internationale</li>
        </ul>

        <h3>Ses prochains objectifs</h3>
        <p>
          Micah prépare activement ses prochaines compétitions avec un objectif clair : se hisser parmi les meilleurs 
          pilotes de sa catégorie. Nous serons là pour le soutenir à chaque étape de son parcours.
        </p>

        <h3>Suivez son parcours</h3>
        <p>
          Restez connectés pour suivre les performances de Micah et découvrir comment BBF Immobilier contribue 
          au développement des talents martiniquais. Ensemble, construisons l'avenir de notre île !
        </p>

        <div class="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl mt-8">
          <h4 class="font-bold text-gray-900 mb-3">🏍️ Soutenez Micah Fatna</h4>
          <p class="text-gray-700">
            Suivez ses courses, partagez ses victoires et encouragez ce jeune talent qui fait la fierté de la Martinique !
          </p>
        </div>
      </div>
    `,
    coverImage: '/blog/micah-fatna-moto-gp.jpg',
    images: [
      '/blog/micah-fatna-moto-gp.jpg',
      '/blog/micah-course-1.jpg',
      '/blog/micah-podium.jpg',
    ],
    category: 'sponsoring',
    tags: ['Sponsoring', 'Moto GP', 'Martinique', 'Jeunesse', 'Sport'],
    author: 'BBF Immobilier',
    isPinned: true,
    isPublished: true,
    views: 0,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
  },
]
