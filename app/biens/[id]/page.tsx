'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MapPin, Bed, Bath, Maximize, Wifi, Car, Utensils, Tv, Wind, Heart, Share2, Calendar, Phone, Mail, ArrowLeft, X, ChevronLeft, ChevronRight, Star, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import ShareButtons from '@/components/ShareButtons'
import { useFavorites } from '@/lib/favorites'
import type { Review } from '@/lib/data'
import { VisitRequestForm, ReservationForm } from '@/components/forms'
import Modal from '@/components/Modal'
import { getAgencyConfig } from '@/lib/agency-config'
import PricingDisplay from '@/components/PricingDisplay'
import MortgageCalculator from '@/components/MortgageCalculator'

// Helper pour calculer le prix selon le type de tarification
const calculatePrice = (property: any, nights: number, season: string = 'lowSeason'): { subtotal: number, priceDisplay: string } => {
  const pricingInfo = property.pricingInfo
  
  // Prix simple ou ancien système
  if (!pricingInfo || pricingInfo.type === 'simple') {
    const pricePerNight = pricingInfo?.simplePrice || property.price
    return {
      subtotal: pricePerNight * nights,
      priceDisplay: `${pricePerNight}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
    }
  }
  
  // Prix par saison
  if (pricingInfo.type === 'seasonal' && pricingInfo.seasonalPricing) {
    const pricePerNight = pricingInfo.seasonalPricing[season] || pricingInfo.seasonalPricing.lowSeason
    return {
      subtotal: pricePerNight * nights,
      priceDisplay: `${pricePerNight}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
    }
  }
  
  // Tarification personnalisée avec forfait
  if (pricingInfo.type === 'custom' && pricingInfo.customPricing) {
    const isPackage = pricingInfo.customPricing.isPackage
    const packageNights = pricingInfo.customPricing.packageNights || 1
    const prices = pricingInfo.customPricing.prices || []
    const basePrice = prices[0]?.price || property.price
    
    if (isPackage && packageNights) {
      // C'est un forfait : calculer combien de forfaits sont nécessaires
      const numberOfPackages = Math.ceil(nights / packageNights)
      const subtotal = basePrice * numberOfPackages
      
      return {
        subtotal,
        priceDisplay: numberOfPackages === 1 
          ? `${basePrice}€ (forfait ${packageNights} nuitées)`
          : `${basePrice}€ × ${numberOfPackages} forfait${numberOfPackages > 1 ? 's' : ''} (${packageNights}n)`
      }
    } else {
      // Prix par nuit
      return {
        subtotal: basePrice * nights,
        priceDisplay: `${basePrice}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
      }
    }
  }
  
  // Fallback
  return {
    subtotal: property.price * nights,
    priceDisplay: `${property.price}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
  }
}

export default function BienDetailPage({ params }: { params: { id: string } }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const searchParams = useSearchParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showVisitModal, setShowVisitModal] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showShareButtons, setShowShareButtons] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [currentPropertyId, setCurrentPropertyId] = useState(params.id)
  const [property, setProperty] = useState<any>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [propertyRating, setPropertyRating] = useState({ rating: 0, count: 0 })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [adultsCount, setAdultsCount] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [includeCleaningFee, setIncludeCleaningFee] = useState(false)
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video' | 'virtual'>('photos')
  const [loading, setLoading] = useState(true)

  // Charger le bien depuis l'API MySQL
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`)
        if (response.ok) {
          const prop = await response.json()
          setProperty(prop)
        }
        setLoading(false)
        
        // Charger les avis depuis l'API
        try {
          const reviewsResponse = await fetch(`/api/reviews?propertyId=${params.id}`)
          const allReviews = await reviewsResponse.json()
          setReviews(allReviews)
          
          // Calculer la note moyenne
          const approvedReviews = allReviews.filter((r: any) => r.status === 'approuve')
          if (approvedReviews.length > 0) {
            const avgRating = approvedReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / approvedReviews.length
            setPropertyRating({ rating: avgRating, count: approvedReviews.length })
          }
        } catch (error) {
          console.error('Error loading reviews:', error)
        }
      } catch (error) {
        console.error('Error loading property:', error)
        setLoading(false)
      }
    }
    
    loadProperty()
  }, [params.id])

  // Réinitialiser l'état quand l'ID change
  useEffect(() => {
    if (params.id !== currentPropertyId) {
      setCurrentPropertyId(params.id)
      setSelectedImage(0)
      setShowVisitModal(false)
      setShowReservationModal(false)
      setShowShareButtons(false)
      setShowLightbox(false)
      setLightboxIndex(0)
      // Scroll vers le haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [params.id, currentPropertyId])

  // Mock data - Fallback si le bien n'est pas dans le store
  const getPropertyData = (id: string) => {
    const properties: Record<string, any> = {
      '1': {
        // LOCATION SAISONNIÈRE
        id: '1',
        type: 'saisonniere',
    title: 'Villa Luxe Vue Mer',
    location: 'Nice, Côte d\'Azur',
    price: 350,
    period: '/nuit',
    description: 'Magnifique villa de luxe avec vue imprenable sur la mer Méditerranée. Située dans un quartier calme et résidentiel, cette propriété offre tout le confort moderne pour des vacances inoubliables. Piscine privée chauffée, jardin paysager, et accès direct à la plage.',
    beds: 5,
    baths: 3,
    area: 220,
    guests: 10,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2070',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070',
    ],
    amenities: [
      { icon: Wifi, name: 'Wifi Haut Débit' },
      { icon: Car, name: 'Parking Privé' },
      { icon: Utensils, name: 'Cuisine Équipée' },
      { icon: Tv, name: 'TV & Netflix' },
      { icon: Wind, name: 'Climatisation' },
      { icon: Bath, name: 'Piscine Privée' },
    ],
    features: [
      'Vue mer panoramique',
      'Piscine chauffée',
      'Jardin paysager 500m²',
      'Terrasse 80m²',
      'BBQ & Plancha',
      'Accès plage privée',
      'Salle de sport',
      'Buanderie',
    ],
    rules: [
      'Check-in: 16h00 - 20h00',
      'Check-out: 10h00',
      'Non fumeur',
      'Animaux acceptés (avec supplément)',
      'Fêtes non autorisées',
    ],
    // Informations détaillées du bien
    detailedDescription: {
      presentation: 'Cette villa d\'exception offre un cadre de vie idyllique pour vos vacances en famille ou entre amis. Avec ses 220m² habitables, elle dispose de 5 chambres spacieuses, toutes climatisées et équipées de literie haut de gamme. La pièce de vie principale de 60m² s\'ouvre sur une terrasse panoramique avec vue imprenable sur la Méditerranée.',
      interior: 'L\'intérieur a été entièrement rénové avec des matériaux nobles : parquet massif, cuisine équipée Siemens, salles de bains en marbre italien. Le salon lumineux dispose d\'une cheminée, d\'un système audio Bose et d\'une TV 75 pouces avec Netflix, Disney+ et Canal+.',
      exterior: 'Le jardin paysager de 500m² est un véritable havre de paix avec sa piscine chauffée de 12x6m, son pool house équipé, et son espace BBQ avec plancha professionnelle. Plusieurs zones de détente permettent de profiter du soleil toute la journée.',
    },
    environment: {
      title: 'Environnement & Quartier',
      description: 'Située dans le quartier prisé de Mont Boron, la villa bénéficie d\'un environnement calme et résidentiel tout en étant proche de toutes commodités.',
      highlights: [
        '🏖️ Plage privée à 200m',
        '🛒 Supermarché Carrefour à 5 min',
        '🍽️ Restaurants gastronomiques à 10 min',
        '✈️ Aéroport Nice Côte d\'Azur à 15 min',
        '🚉 Gare SNCF à 10 min',
        '⛳ Golf de Nice à 8 min',
        '🎾 Tennis club à 5 min',
        '🏥 Hôpital Pasteur à 12 min',
      ],
    },
    rentalConditions: {
      deposit: 2000,
      cleaningFee: 150,
      minStay: 7,
      cancellationPolicy: 'Annulation gratuite jusqu\'à 30 jours avant l\'arrivée. 50% remboursé entre 30 et 14 jours. Non remboursable moins de 14 jours avant.',
      included: ['Linge de maison', 'Serviettes de bain', 'Wifi', 'Électricité', 'Eau', 'Chauffage piscine'],
      notIncluded: ['Ménage de fin de séjour (150€)', 'Taxe de séjour (2.50€/adulte/nuit)'],
    },
    fees: {
      agencyFees: 0,
      ownerFees: 100,
      description: 'Aucun frais d\'agence pour le locataire. Frais de dossier de 100€ à la charge du propriétaire.',
    },
    legalInfo: {
      reference: 'BIM-SAIS-001',
      dpe: null, // Pas de DPE pour location saisonnière
      law: 'Bien soumis au statut de la copropriété. Location saisonnière conforme à la loi ALUR et ELAN.',
      insurance: 'Assurance responsabilité civile obligatoire pour les locataires.',
      guarantees: 'Dépôt de garantie de 2000€ encaissé 7 jours avant l\'arrivée, restitué sous 15 jours après l\'état des lieux de sortie.',
    },
        rating: 4.9,
        reviews: 127,
      },
      '2': {
        // LOCATION LONGUE DURÉE
        id: '2',
        type: 'annuelle',
        title: 'Appartement F3 Centre-Ville',
        location: 'Fort-de-France, Martinique',
        price: 1200,
        period: '/mois',
        description: 'Appartement lumineux de 65m² en plein centre-ville, idéal pour professionnels ou jeune couple.',
        beds: 2,
        baths: 1,
        area: 65,
        guests: null,
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070',
        ],
        amenities: [
          { icon: Wifi, name: 'Wifi Inclus' },
          { icon: Car, name: 'Parking' },
          { icon: Utensils, name: 'Cuisine Équipée' },
          { icon: Wind, name: 'Climatisation' },
        ],
        features: [
          'Balcon 8m²',
          'Double vitrage',
          'Interphone',
          'Cave',
        ],
        rules: [
          'Bail 3 ans renouvelable',
          'Préavis 3 mois',
          'Non fumeur',
          'Animaux non acceptés',
        ],
        detailedDescription: {
          presentation: 'Appartement lumineux de 65m² situé au 3ème étage d\'un immeuble sécurisé en plein centre-ville. Idéal pour professionnels ou jeune couple, proche de toutes commodités.',
          interior: 'Entrée avec placard, séjour de 25m² donnant sur balcon, cuisine équipée et aménagée (four, plaques, hotte, réfrigérateur), 2 chambres avec placards, salle de bain avec baignoire, WC séparé.',
          exterior: 'Balcon de 8m² avec vue dégagée, exposition Sud. Cave privative en sous-sol. Parking sécurisé en option (50€/mois).',
        },
        environment: {
          title: 'Environnement & Quartier',
          description: 'Hypercentre de Fort-de-France, quartier dynamique et commerçant. Toutes commodités accessibles à pied.',
          highlights: [
            '🚇 Arrêt bus à 1 min',
            '🏫 École primaire à 5 min',
            '🏥 Centre médical à 3 min',
            '🛒 Supermarché en pied d\'immeuble',
            '🏦 Banques à 2 min',
            '📮 La Poste à 5 min',
            '🍽️ Restaurants et cafés à proximité',
            '🎭 Cinéma à 10 min',
          ],
        },
        rentalConditions: {
          deposit: 1200,
          charges: 100,
          minLease: 12,
          availableFrom: '01/05/2024',
          included: ['Eau froide', 'Charges de copropriété'],
          notIncluded: ['Électricité (EDF)', 'Internet', 'Assurance habitation obligatoire'],
          documents: [
            '3 derniers bulletins de salaire',
            'Dernier avis d\'imposition',
            'Pièce d\'identité',
            'Justificatif de domicile',
            'Contrat de travail',
          ],
        },
        fees: {
          agencyFees: 650,
          ownerFees: 650,
          description: 'Honoraires à la charge du locataire : 650€ soit 10€/m² (état des lieux inclus)',
        },
        legalInfo: {
          reference: 'BIM-LOC-045',
          dpe: 'C (120 kWh/m²/an)',
          ges: 'B (8 kg CO2/m²/an)',
          law: 'Bail soumis à la loi du 6 juillet 1989. Durée 3 ans.',
          insurance: 'Assurance habitation obligatoire (attestation à fournir)',
          guarantees: 'Garant Visale accepté ou caution solidaire (revenus 3x le loyer)',
        },
        rating: 4.7,
        reviews: 23,
      },
      '3': {
        // VENTE
        id: '3',
        type: 'vente',
        title: 'Maison F4 avec Jardin',
        location: 'Rivière-Pilote, Martinique',
        price: 285000,
        period: '',
        description: 'Belle maison familiale de 150m² sur terrain de 500m², quartier calme et résidentiel.',
        beds: 4,
        baths: 2,
        area: 150,
        guests: null,
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070',
        ],
        amenities: [
          { icon: Car, name: 'Garage Double' },
          { icon: Utensils, name: 'Cuisine Ouverte' },
          { icon: Wind, name: 'Climatisation' },
        ],
        features: [
          'Jardin arboré 500m²',
          'Terrasse couverte 30m²',
          'Garage 40m²',
          'Portail électrique',
        ],
        rules: [],
        detailedDescription: {
          presentation: 'Belle maison familiale de 150m² habitables sur un terrain arboré de 500m². Construction de 1995, entièrement rénovée en 2020. Quartier calme et résidentiel, proche de toutes commodités.',
          interior: 'Rez-de-chaussée : entrée, séjour-salon 40m² avec cuisine ouverte équipée, arrière-cuisine, WC. Étage : 4 chambres (dont 1 suite parentale avec SDB), salle de bains, WC. Carrelage et parquet, double vitrage, climatisation réversible.',
          exterior: 'Terrain clos de 500m² avec jardin arboré (manguiers, cocotiers), terrasse couverte de 30m², garage double de 40m², portail électrique, arrosage automatique.',
        },
        environment: {
          title: 'Environnement & Quartier',
          description: 'Quartier résidentiel calme de Rivière-Pilote, proche écoles et commerces. Idéal pour famille.',
          highlights: [
            '🏫 École primaire à 5 min',
            '🏫 Collège à 8 min',
            '🚌 Arrêt bus à 3 min',
            '🛒 Centre commercial à 10 min',
            '🏥 Pharmacie à 5 min',
            '⚽ Golf de Nice à 8 min',
            '🏖️ Plage à 15 min',
            '🏪 Boulangerie à 2 min',
          ],
        },
        purchaseConditions: {
          price: 285000,
          notaryFees: 22800,
          propertyTax: 1200,
          housingTax: 0,
          condition: 'Excellent état',
          occupancy: 'Libre à la vente',
          orientation: 'Sud-Ouest',
          constructionYear: 1995,
          lastRenovation: 2020,
        },
        fees: {
          agencyFees: 15000,
          percentage: 5.3,
          description: 'Honoraires inclus dans le prix, à la charge du vendeur : 15 000€ (5,3% TTC)',
          netSellerPrice: 270000,
        },
        legalInfo: {
          reference: 'BIM-VTE-128',
          dpe: 'D (180 kWh/m²/an)',
          ges: 'D (35 kg CO2/m²/an)',
          law: 'Aucune procédure en cours. Bien non soumis à la copropriété.',
          diagnostics: [
            'DPE : D (180 kWh/m²/an)',
            'GES : D (35 kg CO2/m²/an)',
            'Amiante : Négatif',
            'Plomb : Négatif',
            'Termites : Négatif',
            'Électricité : Conforme (2023)',
            'Assainissement : Conforme',
          ],
          risks: 'Zone de sismicité modérée (niveau 4). Risque cyclonique.',
        },
        rating: 4.8,
        reviews: 15,
      },
    }
    return properties[id] || properties['1']
  }

  // Si le bien n'est pas encore chargé, afficher un loader
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Déterminer la page de retour selon d'où vient l'utilisateur
  const getBackUrl = () => {
    // Vérifier si on a un paramètre "from" dans l'URL
    const from = searchParams.get('from')
    if (from) {
      return from
    }

    // Sinon, utiliser la page par défaut selon le type
    switch (property.type) {
      case 'saisonniere':
        return '/location-saisonniere'
      case 'annuelle':
        return '/location-annuelle'
      case 'vente':
        return '/acheter'
      default:
        return '/biens'
    }
  }

  const getBackLabel = () => {
    // Vérifier si on a un paramètre "from" dans l'URL
    const from = searchParams.get('from')
    if (from === '/biens') {
      return 'Retour à nos biens'
    }

    // Sinon, utiliser le label par défaut selon le type
    switch (property.type) {
      case 'saisonniere':
        return 'Retour aux locations saisonnières'
      case 'annuelle':
        return 'Retour aux locations annuelles'
      case 'vente':
        return 'Retour aux biens à vendre'
      default:
        return 'Retour aux biens'
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Lien copié dans le presse-papier !')
  }

  const handleBooking = () => {
    if (property.type === 'saisonniere') {
      setShowReservationModal(true)
    } else {
      setShowVisitModal(true)
    }
  }

  const handleSubmitReview = async () => {
    if (!newReview.name || !newReview.email || !newReview.comment) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: params.id,
          name: newReview.name,
          email: newReview.email,
          rating: newReview.rating,
          comment: newReview.comment,
        })
      })
      
      if (response.ok) {
        toast.success('Merci pour votre avis ! Il sera publié après modération.')
        setShowReviewForm(false)
        setNewReview({ name: '', email: '', rating: 5, comment: '' })
      } else {
        toast.error('Erreur lors de l\'envoi')
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de votre avis')
    }
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href={getBackUrl()} className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>{getBackLabel()}</span>
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {property.title}
                </h1>
                {/* Badge Type de Bien */}
                {(property.type === 'saisonniere' || property.type === 'saisonnière') && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border-2 border-blue-300 whitespace-nowrap">
                    🏖️ Location Saisonnière
                  </span>
                )}
                {(property.type === 'annuelle' || property.type === 'location') && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 border-2 border-green-300 whitespace-nowrap">
                    🏠 Location Longue Durée
                  </span>
                )}
                {property.type === 'vente' && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border-2 border-purple-300 whitespace-nowrap">
                    💰 Achat
                  </span>
                )}
                {/* Fallback si type non reconnu */}
                {!property.type && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border-2 border-gray-300 whitespace-nowrap">
                    📍 Bien Immobilier
                  </span>
                )}
              </div>
              <div className="flex items-center text-gray-600 space-x-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {property.location}
                </div>
                {property.type === 'saisonniere' && propertyRating.count > 0 && (
                  <div className="flex items-center">
                    <span className="text-gold-500">⭐</span>
                    <span className="ml-1 font-semibold">{propertyRating.rating}</span>
                    <span className="ml-1">({propertyRating.count} avis)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowShareButtons(!showShareButtons)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Partager</span>
              </button>
              <button 
                onClick={() => {
                  const propertyId = parseInt(params.id)
                  const isFav = isFavorite(propertyId)
                  if (isFav) {
                    removeFavorite(propertyId)
                    toast.success('Retiré des favoris')
                  } else {
                    addFavorite({
                      id: propertyId,
                      title: property.title,
                      price: property.price,
                      image: property.images[0],
                      location: property.location,
                      type: property.type === 'saisonniere' ? 'Saisonnière' : property.type === 'annuelle' ? 'Annuelle' : 'Vente'
                    })
                    toast.success('Ajouté aux favoris ❤️')
                  }
                }}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  isFavorite(parseInt(params.id))
                    ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite(parseInt(params.id)) ? 'fill-white' : ''}`} />
                <span>{isFavorite(parseInt(params.id)) ? 'Sauvegardé' : 'Sauvegarder'}</span>
              </button>
            </div>
          </div>
          
          {/* Share Buttons - Affichage conditionnel */}
          {showShareButtons && (
            <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn">
              <ShareButtons 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={property.title}
                description={`${property.title} - ${property.location} - ${property.price}€${property.period}`}
              />
            </div>
          )}
        </div>

        {/* Images Gallery */}
        {/* Galerie d'images avec médias */}
        <div className="lg:col-span-2">

          {/* Contenu selon l'onglet actif */}
          <div className="relative">
            {activeMediaTab === 'photos' && (
              <>
                <div 
                  className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-4 cursor-pointer group"
                  onClick={() => {
                    setLightboxIndex(selectedImage)
                    setShowLightbox(true)
                  }}
                >
                  <Image
                    src={property.images[selectedImage]}
                    alt={property.title}
                    fill
                    quality={95}
                    priority
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Badge compteur d'images */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="font-semibold">{selectedImage + 1} / {property.images.length}</span>
                  </div>
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold bg-black/50 px-6 py-3 rounded-lg">
                      Cliquez pour agrandir
                    </span>
                  </div>
                </div>
              </>
            )}

          {activeMediaTab === 'video' && property.videoUrl && (
            <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-4 bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={property.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube-nocookie.com/embed/').replace('youtube.com/watch?v=', 'youtube-nocookie.com/embed/')}
                title="Vidéo de présentation du bien"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}

            {activeMediaTab === 'virtual' && property.virtualTourUrl && (
              <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-4 bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={property.virtualTourUrl}
                  title="Visite virtuelle du bien"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}

            {/* Flèches de navigation */}
            {(() => {
              const totalMedia = property.images.length + (property.videoUrl ? 1 : 0) + (property.virtualTourUrl ? 1 : 0)
              if (totalMedia <= 1) return null

              const handlePrev = () => {
                if (activeMediaTab === 'photos') {
                  if (selectedImage > 0) {
                    setSelectedImage(selectedImage - 1)
                  } else if (property.virtualTourUrl) {
                    setActiveMediaTab('virtual')
                  } else if (property.videoUrl) {
                    setActiveMediaTab('video')
                  }
                } else if (activeMediaTab === 'video') {
                  setActiveMediaTab('photos')
                  setSelectedImage(property.images.length - 1)
                } else if (activeMediaTab === 'virtual') {
                  if (property.videoUrl) {
                    setActiveMediaTab('video')
                  } else {
                    setActiveMediaTab('photos')
                    setSelectedImage(property.images.length - 1)
                  }
                }
              }

              const handleNext = () => {
                if (activeMediaTab === 'photos') {
                  if (selectedImage < property.images.length - 1) {
                    setSelectedImage(selectedImage + 1)
                  } else if (property.videoUrl) {
                    setActiveMediaTab('video')
                  } else if (property.virtualTourUrl) {
                    setActiveMediaTab('virtual')
                  }
                } else if (activeMediaTab === 'video') {
                  if (property.virtualTourUrl) {
                    setActiveMediaTab('virtual')
                  } else {
                    setActiveMediaTab('photos')
                    setSelectedImage(0)
                  }
                } else if (activeMediaTab === 'virtual') {
                  setActiveMediaTab('photos')
                  setSelectedImage(0)
                }
              }

              return (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )
            })()}
          </div>

          {/* Grille de miniatures - Toutes les médias */}
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {/* Miniatures des photos (max 3 si vidéo/visite présents) */}
            {property.images.slice(0, property.videoUrl || property.virtualTourUrl ? 3 : 5).map((image: string, index: number) => (
              <div
                key={`photo-${index}`}
                className={`relative h-20 md:h-28 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeMediaTab === 'photos' && selectedImage === index 
                    ? 'ring-4 ring-primary-500 scale-95' 
                    : 'hover:ring-2 hover:ring-primary-300 hover:scale-105'
                }`}
                onClick={() => {
                  setActiveMediaTab('photos')
                  setSelectedImage(index)
                }}
              >
                <Image
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
            ))}
            
            {/* Miniature Vidéo */}
            {property.videoUrl && (() => {
              const videoId = property.videoUrl.includes('youtube.com') 
                ? property.videoUrl.split('v=')[1]?.split('&')[0]
                : property.videoUrl.split('youtu.be/')[1]?.split('?')[0]
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ''
              
              return (
                <div
                  className={`relative h-20 md:h-28 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    activeMediaTab === 'video'
                      ? 'ring-4 ring-primary-500 scale-95'
                      : 'hover:ring-2 hover:ring-primary-300 hover:scale-105'
                  }`}
                  onClick={() => setActiveMediaTab('video')}
                >
                  {thumbnailUrl && (
                    <Image
                      src={thumbnailUrl}
                      alt="Vidéo YouTube"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              )
            })()}
            
            {/* Miniature Visite Virtuelle */}
            {property.virtualTourUrl && (
              <div
                className={`relative h-20 md:h-28 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 flex items-center justify-center ${
                  activeMediaTab === 'virtual'
                    ? 'ring-4 ring-primary-500 scale-95'
                    : 'hover:ring-2 hover:ring-primary-300 hover:scale-105'
                }`}
                style={{ backgroundColor: '#55E0FF' }}
                onClick={() => setActiveMediaTab('virtual')}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl mb-1">🏠</span>
                  <span className="text-white text-xs font-bold">Visite 360°</span>
                </div>
              </div>
            )}
            
            {/* Badge "+X photos" si plus de photos */}
            {property.images.length > (property.videoUrl || property.virtualTourUrl ? 3 : 5) && (
              <div
                className="relative h-20 md:h-28 rounded-lg overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary-300 hover:scale-105 bg-gray-200"
                onClick={() => {
                  setLightboxIndex(0)
                  setShowLightbox(true)
                }}
              >
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    +{property.images.length - (property.videoUrl || property.virtualTourUrl ? 3 : 5)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bouton "Voir toutes les photos" sur mobile */}
          <button
            onClick={() => {
              setLightboxIndex(0)
              setShowLightbox(true)
            }}
            className="md:hidden w-full mt-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Voir toutes les {property.images.length} photos
          </button>
        </div>

        {/* Sidebar des prix - Affichée juste après la galerie sur mobile/tablette */}
        <div className="lg:hidden mt-6">
          <div className="rounded-xl shadow-lg p-6 bg-white border-2" style={{ borderColor: '#55E0FF' }}>
            <div className="mb-6">
              <PricingDisplay 
                pricingInfo={property.pricingInfo}
                price={property.price}
                period={property.period}
              />
              {/* Afficher les avis uniquement pour les locations saisonnières */}
              {property.type === 'saisonniere' && propertyRating.count > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-gold-500">⭐</span>
                  <span className="ml-1 font-semibold">{propertyRating.rating}</span>
                  <span className="ml-1">• {propertyRating.count} avis</span>
                </div>
              )}
            </div>

            {property.type === 'saisonniere' ? (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Arrivée
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Départ
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adultes
                      </label>
                      <select 
                        value={adultsCount}
                        onChange={(e) => setAdultsCount(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {[...Array(property.guests || 10)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enfants (-18)
                      </label>
                      <select 
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {[...Array(9)].map((_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Checkbox frais de ménage */}
                {property.rentalConditions?.cleaningFee && (
                  <div className="mb-4">
                    <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={includeCleaningFee}
                        onChange={(e) => setIncludeCleaningFee(e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Inclure frais de ménage ({property.rentalConditions.cleaningFee}€)
                      </span>
                    </label>
                  </div>
                )}

                {/* Calcul de la taxe de séjour */}
                {(() => {
                  const nights = checkInDate && checkOutDate 
                    ? Math.max(0, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)))
                    : 1
                  const taxePerNight = 2.50
                  const totalTaxe = adultsCount * taxePerNight * nights // Taxe uniquement sur les adultes
                  const totalGuests = adultsCount + childrenCount
                  const { subtotal, priceDisplay } = calculatePrice(property, nights)
                  const cleaningFee = includeCleaningFee && property.rentalConditions?.cleaningFee ? property.rentalConditions.cleaningFee : 0
                  const total = subtotal + totalTaxe + cleaningFee

                  return (
                    <>
                      {/* Récapitulatif des prix */}
                      {checkInDate && checkOutDate && nights > 0 && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Récapitulatif</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-700">
                              <span>{priceDisplay}</span>
                              <span>{subtotal.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between items-start text-gray-700">
                              <div className="flex flex-col">
                                <span>Taxe de séjour</span>
                                <span className="text-xs text-gray-500 italic">
                                  {adultsCount} adulte{adultsCount > 1 ? 's' : ''} × {nights} nuit{nights > 1 ? 's' : ''}
                                  {childrenCount > 0 && ` (${childrenCount} enfant${childrenCount > 1 ? 's' : ''} gratuit${childrenCount > 1 ? 's' : ''})`}
                                </span>
                              </div>
                              <span>{totalTaxe.toFixed(2)}€</span>
                            </div>
                            {cleaningFee > 0 && (
                              <div className="flex justify-between text-gray-700">
                                <span>Frais de ménage</span>
                                <span>{cleaningFee.toFixed(2)}€</span>
                              </div>
                            )}
                            <div className="pt-2 border-t border-gray-300 flex justify-between font-bold text-gray-900">
                              <span>Total</span>
                              <span>{total.toFixed(2)}€</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Info taxe de séjour */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2 mb-3">
                          <span className="text-lg">ℹ️</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-blue-900 mb-1">Taxe de séjour</p>
                            <p className="text-xs text-blue-700 leading-relaxed">
                              Taxe obligatoire collectée pour la collectivité territoriale
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                          <span className="text-sm text-blue-800">
                            {adultsCount} adulte{adultsCount > 1 ? 's' : ''} × {nights} nuit{nights > 1 ? 's' : ''}
                            {childrenCount > 0 && ` + ${childrenCount} enfant${childrenCount > 1 ? 's' : ''}`}
                          </span>
                          <span className="text-sm font-bold text-blue-900">
                            {totalTaxe.toFixed(2)}€
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          Tarif : 2,50€ / adulte / nuit (gratuit pour les -18 ans)
                        </p>
                      </div>
                    </>
                  )
                })()}

                <button
                  onClick={handleBooking}
                  className="w-full btn-primary mb-4 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Réserver Maintenant</span>
                </button>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="border-2 rounded-lg p-4" style={{ borderColor: '#55E0FF', backgroundColor: '#E6F9FF' }}>
                    <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                      📅 Disponible immédiatement
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full mb-4 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D3CDB7' }}
                >
                  Demander une Visite
                </button>
              </>
            )}

            <p className="text-center text-sm text-gray-500 mb-4">
              Vous ne serez pas débité maintenant
            </p>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <a
                href={`tel:${getAgencyConfig().phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                <Phone className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">Appeler</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center space-x-2 w-full py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">Envoyer un message</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className={`grid grid-cols-2 ${property.type === 'saisonniere' && property.guests ? 'md:grid-cols-5' : property.rooms ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
                {property.rooms && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div className="font-semibold text-gray-900">{property.rooms} Pièces</div>
                    <div className="text-xs text-gray-500">F{property.rooms}</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Bed className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{property.beds} Chambres</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Bath className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{property.baths} Salles de bain</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Maximize className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="font-semibold text-gray-900">{property.area}m²</div>
                </div>
                {property.type === 'saisonniere' && property.guests && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="font-semibold text-gray-900">{property.guests} Personnes</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description du bien */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description du bien</h2>
              <div className="space-y-4">
                {property.detailedDescription?.presentation ? (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Présentation</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.detailedDescription.presentation}</p>
                    </div>
                    {property.detailedDescription.interior && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Intérieur</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.detailedDescription.interior}</p>
                      </div>
                    )}
                    {property.detailedDescription.exterior && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Extérieur</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.detailedDescription.exterior}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description || 'Description non disponible.'}</p>
                )}
              </div>
            </div>

            {/* Amenities - N'afficher que si des équipements existent */}
            {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity: any, index: number) => {
                  // Parser l'amenity si c'est une string JSON
                  let parsedAmenity = amenity
                  
                  // Si c'est une string, essayer de parser
                  if (typeof amenity === 'string') {
                    try {
                      parsedAmenity = JSON.parse(amenity)
                    } catch {
                      // Si le parsing échoue, c'est juste du texte
                      parsedAmenity = { icon: '✓', name: amenity }
                    }
                  }
                  
                  // Si c'est un objet, vérifier qu'il a bien icon et name
                  if (typeof parsedAmenity === 'object' && parsedAmenity !== null) {
                    // OK, c'est déjà un objet
                  } else {
                    // Sinon, créer un objet par défaut
                    parsedAmenity = { icon: '✓', name: String(amenity) }
                  }
                  
                  const IconComponent = parsedAmenity.icon
                  const amenityName = parsedAmenity.name || String(parsedAmenity)
                  const amenityIcon = parsedAmenity.icon
                  
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {typeof amenityIcon === 'function' ? (
                          <IconComponent className="w-5 h-5 text-primary-600" />
                        ) : typeof amenityIcon === 'string' ? (
                          <span className="text-xl">{amenityIcon}</span>
                        ) : (
                          <span className="text-xl">✓</span>
                        )}
                      </div>
                      <span className="text-gray-700">{amenityName}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            )}

            {/* Features - N'afficher que si des caractéristiques existent */}
            {property.features && property.features.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Environnement & Quartier - N'afficher que si les données existent */}
            {property.environment && (property.environment.description || (property.environment.highlights && property.environment.highlights.length > 0)) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{property.environment.title || 'Environnement & Quartier'}</h2>
                {property.environment.description && (
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{property.environment.description}</p>
                )}
                {property.environment.highlights && property.environment.highlights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.environment.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Conditions - LOCATION SAISONNIÈRE - N'afficher que si les données existent */}
            {property.type === 'saisonniere' && property.rentalConditions && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conditions de location saisonnière</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Dépôt de garantie</p>
                      <p className="text-xl font-bold text-gray-900">{property.rentalConditions.deposit}€</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Frais de ménage</p>
                      <p className="text-xl font-bold text-gray-900">{property.rentalConditions.cleaningFee}€</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Séjour minimum</p>
                      <p className="text-xl font-bold text-gray-900">{property.rentalConditions.minStay} nuits</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Politique d'annulation</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{property.rentalConditions.cancellationPolicy}</p>
                  </div>

                  {property.rentalConditions.included && property.rentalConditions.included.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">✅ Inclus dans le prix</h3>
                    <ul className="space-y-1">
                      {property.rentalConditions.included.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700 text-sm flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}

                  {property.rentalConditions.notIncluded && property.rentalConditions.notIncluded.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">❌ Non inclus</h3>
                    <ul className="space-y-1">
                      {property.rentalConditions.notIncluded.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700 text-sm flex items-center space-x-2">
                          <span className="text-red-500">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}
                </div>
              </div>
            )}

            {/* Calendrier Google - LOCATION SAISONNIÈRE */}
            {property.type === 'saisonniere' && (property as any).googleCalendarUrl && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📅 Disponibilités en temps réel
                </h2>
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src={(property as any).googleCalendarUrl}
                    className="w-full h-[600px] border-0"
                    frameBorder="0"
                    scrolling="no"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Les dates grisées ou marquées sont déjà réservées
                </p>
              </div>
            )}

            {/* Conditions - LOCATION LONGUE DURÉE - N'afficher que si les données existent */}
            {property.type === 'annuelle' && property.rentalConditions && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conditions de location longue durée</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Loyer mensuel</p>
                      <p className="text-xl font-bold text-gray-900">{property.price}€</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Charges</p>
                      <p className="text-xl font-bold text-gray-900">{property.rentalConditions.charges}€/mois</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Dépôt de garantie</p>
                      <p className="text-xl font-bold text-gray-900">{property.rentalConditions.deposit}€</p>
                    </div>
                  </div>

                  {(property.rentalConditions.availableFrom || property.rentalConditions.minLease) && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    {property.rentalConditions.availableFrom && (
                    <p className="text-primary-900 font-semibold">
                      📅 Disponible à partir du : {property.rentalConditions.availableFrom}
                    </p>
                    )}
                    {property.rentalConditions.minLease && (
                    <p className="text-sm text-gray-700 mt-1">Bail de {property.rentalConditions.minLease} mois minimum</p>
                    )}
                  </div>
                  )}

                  {property.rentalConditions.documents && property.rentalConditions.documents.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">📋 Documents requis</h3>
                    <ul className="space-y-1">
                      {property.rentalConditions.documents.map((doc: string, index: number) => (
                        <li key={index} className="text-gray-700 text-sm flex items-center space-x-2">
                          <span className="text-primary-500">•</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}

                  {((property.rentalConditions.included && property.rentalConditions.included.length > 0) || 
                    (property.rentalConditions.notIncluded && property.rentalConditions.notIncluded.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.rentalConditions.included && property.rentalConditions.included.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">✅ Inclus</h3>
                      <ul className="space-y-1">
                        {property.rentalConditions.included.map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 text-sm flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}
                    {property.rentalConditions.notIncluded && property.rentalConditions.notIncluded.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">❌ Non inclus</h3>
                      <ul className="space-y-1">
                        {property.rentalConditions.notIncluded.map((item: string, index: number) => (
                          <li key={index} className="text-gray-700 text-sm flex items-center space-x-2">
                            <span className="text-red-500">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}
                  </div>
                  )}
                </div>
              </div>
            )}

            {/* Conditions - VENTE - N'afficher que si les données existent */}
            {property.type === 'vente' && property.purchaseConditions && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations d'achat</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Prix de vente FAI</p>
                      <p className="text-3xl font-bold text-primary-600">{property.price.toLocaleString()}€</p>
                      <p className="text-xs text-gray-600 mt-1">Frais d'agence inclus</p>
                    </div>
                    {property.fees?.netSellerPrice && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Prix net vendeur</p>
                        <p className="text-2xl font-bold text-gray-900">{property.fees.netSellerPrice.toLocaleString()}€</p>
                        <p className="text-xs text-gray-600 mt-1">Hors frais d'agence</p>
                      </div>
                    )}
                    {property.purchaseConditions?.notaryFees && Number(property.purchaseConditions.notaryFees) > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Frais de notaire estimés</p>
                        <p className="text-xl font-bold text-gray-900">{property.purchaseConditions.notaryFees.toLocaleString()}€</p>
                        <p className="text-xs text-gray-600 mt-1">Environ 8% du prix</p>
                      </div>
                    )}
                    {property.purchaseConditions?.propertyTax && Number(property.purchaseConditions.propertyTax) > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Taxe foncière annuelle</p>
                        <p className="text-xl font-bold text-gray-900">{property.purchaseConditions.propertyTax}€</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {property.purchaseConditions?.condition && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">État général</p>
                        <p className="font-semibold text-gray-900">{property.purchaseConditions.condition}</p>
                      </div>
                    )}
                    {property.purchaseConditions?.occupancy && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Disponibilité</p>
                        <p className="font-semibold text-gray-900">{property.purchaseConditions.occupancy}</p>
                      </div>
                    )}
                    {property.purchaseConditions?.orientation && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Orientation</p>
                        <p className="font-semibold text-gray-900">{property.purchaseConditions.orientation}</p>
                      </div>
                    )}
                    {property.purchaseConditions?.constructionYear && Number(property.purchaseConditions.constructionYear) > 1900 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Année construction</p>
                        <p className="font-semibold text-gray-900">{property.purchaseConditions.constructionYear}</p>
                      </div>
                    )}
                    {property.purchaseConditions?.lastRenovation && Number(property.purchaseConditions.lastRenovation) > 1900 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Dernière rénovation</p>
                        <p className="font-semibold text-gray-900">{property.purchaseConditions.lastRenovation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Honoraires - N'afficher que si les données existent ET sont remplies */}
            {property.fees && (property.fees.agencyFees > 0 || property.fees.description || property.fees.netSellerPrice) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Honoraires d'agence</h2>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                  {property.fees.agencyFees > 0 && (
                    <p className="text-primary-900 font-semibold mb-2">
                      💰 Frais d'agence : {property.fees.agencyFees}€
                    </p>
                  )}
                  {property.fees.netSellerPrice && property.fees.netSellerPrice > 0 && (
                    <p className="text-primary-900 font-semibold mb-2">
                      💵 Prix net vendeur : {property.fees.netSellerPrice.toLocaleString()}€
                    </p>
                  )}
                  {property.fees.description && (
                    <p className="text-sm text-gray-700">{property.fees.description}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>📋 Barème de l'agence disponible sur demande</p>
                </div>
              </div>
            )}

            {/* Mentions Légales - N'afficher que si les données existent */}
            {property.legalInfo && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations légales</h2>
                <div className="space-y-3 text-sm">
                  {property.legalInfo.reference && (
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-600 font-semibold min-w-[120px]">Référence :</span>
                      <span className="text-gray-700">{property.legalInfo.reference}</span>
                    </div>
                  )}
                
                {/* DPE & GES - Pour location longue durée et vente */}
                {property.legalInfo.dpe && (
                  <>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-600 font-semibold min-w-[120px]">DPE :</span>
                      <span className="text-gray-700 font-semibold">{property.legalInfo.dpe}</span>
                    </div>
                    {property.legalInfo.ges && (
                      <div className="flex items-start space-x-3">
                        <span className="text-primary-600 font-semibold min-w-[120px]">GES :</span>
                        <span className="text-gray-700 font-semibold">{property.legalInfo.ges}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Diagnostics complets - Pour vente uniquement */}
                {property.type === 'vente' && property.legalInfo.diagnostics && property.legalInfo.diagnostics.length > 0 && (
                  <div>
                    <h3 className="text-primary-600 font-semibold mb-2">Diagnostics :</h3>
                    <ul className="space-y-1 ml-4">
                      {property.legalInfo.diagnostics.map((diag: string, index: number) => (
                        <li key={index} className="text-gray-700 flex items-start space-x-2">
                          <span className="text-primary-500">•</span>
                          <span>{diag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {property.legalInfo.risks && (
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-600 font-semibold min-w-[120px]">Risques :</span>
                    <span className="text-gray-700">{property.legalInfo.risks}</span>
                  </div>
                )}

                {property.legalInfo.law && (
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-600 font-semibold min-w-[120px]">Réglementation :</span>
                    <span className="text-gray-700">{property.legalInfo.law}</span>
                  </div>
                )}

                {property.legalInfo.insurance && (
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-600 font-semibold min-w-[120px]">Assurance :</span>
                    <span className="text-gray-700">{property.legalInfo.insurance}</span>
                  </div>
                )}

                {property.legalInfo.guarantees && (
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-600 font-semibold min-w-[120px]">Garanties :</span>
                    <span className="text-gray-700">{property.legalInfo.guarantees}</span>
                  </div>
                )}
              </div>
              </div>
            )}

            {/* Rules - Seulement si il y en a */}
            {property.rules && property.rules.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {property.type === 'saisonniere' ? 'Règlement intérieur' : 'Conditions particulières'}
                </h2>
                <ul className="space-y-2">
                  {property.rules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Avis des clients - UNIQUEMENT pour locations saisonnières */}
            {property.type === 'saisonniere' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Avis des clients</h2>
                    {propertyRating.count > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        {renderStars(Math.round(propertyRating.rating))}
                        <span className="text-lg font-semibold text-gray-900">{propertyRating.rating}</span>
                        <span className="text-gray-600">• {propertyRating.count} avis</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Laisser un avis
                  </button>
                </div>

              {/* Formulaire d'avis */}
              {showReviewForm && (
                <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-primary-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Partagez votre expérience</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={newReview.email}
                          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Note *</label>
                      {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire *</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Partagez votre expérience avec ce bien..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Publier l'avis
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Liste des avis */}
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-semibold text-lg">
                                {review.clientName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.clientName}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                      
                      {/* Réponse de l'agence */}
                      {review.response && (
                        <div className="mt-4 ml-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">BBF</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Bulle Immobilière</p>
                              <p className="text-xs text-gray-500">
                                {review.respondedAt && new Date(review.respondedAt).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{review.response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Aucun avis pour le moment</p>
                  <p className="text-gray-400 text-sm">Soyez le premier à partager votre expérience !</p>
                </div>
              )}
              </div>
            )}

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Localisation</h2>
              <div className="h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=14`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                📍 {property.location}
              </p>
            </div>

            {/* Calculateur de Mensualités - Pour les biens à vendre uniquement */}
            {property.type === 'vente' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <MortgageCalculator initialAmount={property.price} />
              </div>
            )}
          </div>

          {/* Booking Sidebar - Desktop uniquement */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="rounded-xl shadow-lg p-6 sticky top-24 bg-white border-2" style={{ borderColor: '#55E0FF' }}>
              <div className="mb-6">
                <PricingDisplay 
                  pricingInfo={property.pricingInfo}
                  price={property.price}
                  period={property.period}
                />
                {/* Afficher les avis uniquement pour les locations saisonnières */}
                {property.type === 'saisonniere' && propertyRating.count > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-gold-500">⭐</span>
                    <span className="ml-1 font-semibold">{propertyRating.rating}</span>
                    <span className="ml-1">• {propertyRating.count} avis</span>
                  </div>
                )}
              </div>

              {property.type === 'saisonniere' ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Arrivée
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Départ
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Adultes
                        </label>
                        <select 
                          value={adultsCount}
                          onChange={(e) => setAdultsCount(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {[...Array(property.guests || 10)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Enfants (-18)
                        </label>
                        <select 
                          value={childrenCount}
                          onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {[...Array(9)].map((_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox frais de ménage */}
                  {property.rentalConditions?.cleaningFee && (
                    <div className="mb-4">
                      <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={includeCleaningFee}
                          onChange={(e) => setIncludeCleaningFee(e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Inclure frais de ménage ({property.rentalConditions.cleaningFee}€)
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Calcul de la taxe de séjour */}
                  {(() => {
                    const nights = checkInDate && checkOutDate 
                      ? Math.max(0, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)))
                      : 1
                    const taxePerNight = 2.50
                    const totalTaxe = adultsCount * taxePerNight * nights // Taxe uniquement sur les adultes
                    const totalGuests = adultsCount + childrenCount
                    const { subtotal, priceDisplay } = calculatePrice(property, nights)
                    const cleaningFee = includeCleaningFee && property.rentalConditions?.cleaningFee ? property.rentalConditions.cleaningFee : 0
                    const total = subtotal + totalTaxe + cleaningFee

                    return (
                      <>
                        {/* Récapitulatif des prix */}
                        {checkInDate && checkOutDate && nights > 0 && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3">Récapitulatif</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between text-gray-700">
                                <span>{priceDisplay}</span>
                                <span>{subtotal.toFixed(2)}€</span>
                              </div>
                              <div className="flex justify-between items-start text-gray-700">
                                <div className="flex flex-col">
                                  <span>Taxe de séjour</span>
                                  <span className="text-xs text-gray-500 italic">
                                    {adultsCount} adulte{adultsCount > 1 ? 's' : ''} × {nights} nuit{nights > 1 ? 's' : ''}
                                    {childrenCount > 0 && ` (${childrenCount} enfant${childrenCount > 1 ? 's' : ''} gratuit${childrenCount > 1 ? 's' : ''})`}
                                  </span>
                                </div>
                                <span>{totalTaxe.toFixed(2)}€</span>
                              </div>
                              {cleaningFee > 0 && (
                                <div className="flex justify-between text-gray-700">
                                  <span>Frais de ménage</span>
                                  <span>{cleaningFee.toFixed(2)}€</span>
                                </div>
                              )}
                              <div className="pt-2 border-t border-gray-300 flex justify-between font-bold text-gray-900">
                                <span>Total</span>
                                <span>{total.toFixed(2)}€</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Info taxe de séjour */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2 mb-3">
                            <span className="text-lg">ℹ️</span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-blue-900 mb-1">Taxe de séjour</p>
                              <p className="text-xs text-blue-700 leading-relaxed">
                                Taxe obligatoire collectée pour la collectivité territoriale
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                            <span className="text-sm text-blue-800">
                              {adultsCount} adulte{adultsCount > 1 ? 's' : ''} × {nights} nuit{nights > 1 ? 's' : ''}
                              {childrenCount > 0 && ` + ${childrenCount} enfant${childrenCount > 1 ? 's' : ''}`}
                            </span>
                            <span className="text-sm font-bold text-blue-900">
                              {totalTaxe.toFixed(2)}€
                            </span>
                          </div>
                          <p className="text-xs text-blue-600 mt-2">
                            Tarif : 2,50€ / adulte / nuit (gratuit pour les -18 ans)
                          </p>
                        </div>
                      </>
                    )
                  })()}

                  <button
                    onClick={handleBooking}
                    className="w-full btn-primary mb-4 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Réserver Maintenant</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="border-2 rounded-lg p-4" style={{ borderColor: '#55E0FF', backgroundColor: '#E6F9FF' }}>
                      <p className="text-sm font-medium" style={{ color: '#0891B2' }}>
                        📅 Disponible immédiatement
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full mb-4 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#D3CDB7' }}
                  >
                    Demander une Visite
                  </button>
                </>
              )}

              <div className="space-y-3">
                <a
                  href={`tel:${getAgencyConfig().phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                >
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Appeler</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                >
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Envoyer un message</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Visite */}
      {showVisitModal && (
        <Modal
          title="Demander une visite"
          onClose={() => setShowVisitModal(false)}
        >
          <VisitRequestForm
            propertyId={property.id}
            propertyTitle={property.title}
            onSuccess={() => setShowVisitModal(false)}
          />
        </Modal>
      )}

      {/* Modal Réservation */}
      {showReservationModal && (
        <Modal
          title="Réserver ce bien"
          onClose={() => setShowReservationModal(false)}
        >
          <ReservationForm
            propertyId={property.id}
            propertyTitle={property.title}
            pricePerNight={property.price}
            property={property}
            initialCheckIn={checkInDate}
            initialCheckOut={checkOutDate}
            initialGuests={adultsCount + childrenCount}
            onSuccess={() => setShowReservationModal(false)}
          />
        </Modal>
      )}

      {/* Lightbox Modal avec tous les médias */}
      {showLightbox && (() => {
        const totalMedia = property.images.length + (property.videoUrl ? 1 : 0) + (property.virtualTourUrl ? 1 : 0)
        const isVideo = lightboxIndex === property.images.length && property.videoUrl
        const isVirtual = lightboxIndex === property.images.length + (property.videoUrl ? 1 : 0) && property.virtualTourUrl
        
        return (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Compteur */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm z-10">
              <span className="font-semibold text-lg">{lightboxIndex + 1} / {totalMedia}</span>
            </div>

            {/* Navigation gauche */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1))}
              className="absolute left-4 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Contenu principal */}
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto px-20">
              {!isVideo && !isVirtual ? (
                <Image
                  src={property.images[lightboxIndex]}
                  alt={`${property.title} ${lightboxIndex + 1}`}
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                />
              ) : isVideo ? (
                <div className="relative w-full h-full">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={property.videoUrl?.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube-nocookie.com/embed/').replace('youtube.com/watch?v=', 'youtube-nocookie.com/embed/')}
                    title="Vidéo de présentation du bien"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={property.virtualTourUrl}
                    title="Visite virtuelle du bien"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Navigation droite */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1))}
              className="absolute right-4 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Miniatures en bas */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-7xl w-full px-4 z-10">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                {property.images.map((image: string, index: number) => (
                  <div
                    key={`thumb-${index}`}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      lightboxIndex === index 
                        ? 'ring-4 ring-primary-500 scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Miniature ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                
                {/* Miniature vidéo */}
                {property.videoUrl && (() => {
                  const videoId = property.videoUrl.includes('youtube.com') 
                    ? property.videoUrl.split('v=')[1]?.split('&')[0]
                    : property.videoUrl.split('youtu.be/')[1]?.split('?')[0]
                  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ''
                  
                  return (
                    <div
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        lightboxIndex === property.images.length
                          ? 'ring-4 ring-primary-500 scale-110' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setLightboxIndex(property.images.length)}
                    >
                      {thumbnailUrl && (
                        <Image
                          src={thumbnailUrl}
                          alt="Vidéo"
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5"></div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
                
                {/* Miniature visite virtuelle */}
                {property.virtualTourUrl && (
                  <div
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all bg-gradient-to-br from-blue-500 to-blue-700 ${
                      lightboxIndex === property.images.length + (property.videoUrl ? 1 : 0)
                        ? 'ring-4 ring-primary-500 scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setLightboxIndex(property.images.length + (property.videoUrl ? 1 : 0))}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl">🏠</span>
                      <span className="text-white text-[10px] font-bold">360°</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
