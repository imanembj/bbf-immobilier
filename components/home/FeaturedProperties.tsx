'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Maximize, Heart, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useFavorites } from '@/lib/favorites'
import toast from 'react-hot-toast'

// Helper pour afficher le prix dans les cartes
const getCardPriceDisplay = (property: any): { price: string, period: string } => {
  const pricingInfo = property.pricingInfo
  
  // DEBUG: Afficher les données dans la console
  console.log('🔍 Property:', property.title, 'pricingInfo:', pricingInfo)
  
  // IMPORTANT: Vérifier d'abord si pricingInfo existe et a un type défini
  if (pricingInfo && pricingInfo.type) {
    // Prix par saison - afficher la fourchette
    if (pricingInfo.type === 'seasonal' && pricingInfo.seasonalPricing) {
      const { lowSeason, highSeason } = pricingInfo.seasonalPricing
      return {
        price: `${lowSeason}-${highSeason}`,
        period: pricingInfo.period || '/nuit'
      }
    }
    
    // Tarification personnalisée - afficher la fourchette ou le prix unique
    if (pricingInfo.type === 'custom' && pricingInfo.customPricing?.prices?.length > 0) {
      const prices = pricingInfo.customPricing.prices
      const minPrice = Math.min(...prices.map((p: any) => p.price))
      const maxPrice = Math.max(...prices.map((p: any) => p.price))
      const isPackage = pricingInfo.customPricing.isPackage
      const packageNights = pricingInfo.customPricing.packageNights
      
      if (isPackage && packageNights) {
        // Afficher "dès X€" pour les forfaits
        return {
          price: `dès ${minPrice}`,
          period: `(${packageNights}n)`
        }
      }
      
      return {
        price: minPrice === maxPrice ? `${minPrice}` : `${minPrice}-${maxPrice}`,
        period: ''
      }
    }
    
    // Prix simple avec pricingInfo
    if (pricingInfo.type === 'simple' && pricingInfo.simplePrice) {
      return {
        price: typeof pricingInfo.simplePrice === 'number' ? pricingInfo.simplePrice.toLocaleString('fr-FR') : pricingInfo.simplePrice,
        period: pricingInfo.period || ''
      }
    }
  }
  
  // Fallback pour les anciens biens sans pricingInfo
  const price = property.price
  
  // Protection contre les prix undefined ou null
  if (!price && price !== 0) {
    return {
      price: 'Prix sur demande',
      period: ''
    }
  }
  
  return {
    price: typeof price === 'number' ? price.toLocaleString('fr-FR') : String(price),
    period: property.period || ''
  }
}

export default function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<'all' | 'annuelle' | 'saisonniere' | 'vente'>('all')
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [properties, setProperties] = useState<any[]>([])

  // Charger les biens depuis l'API MySQL
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        const allProperties = await response.json()
        
        // Transformer les biens pour correspondre au format attendu
        const transformedProperties = allProperties.map((p: any) => {
          // Parser images si c'est encore une string
          let images = p.images
          if (typeof images === 'string') {
            try {
              images = JSON.parse(images)
            } catch {
              images = []
            }
          }
          
          return {
            id: p.id,
            type: p.type === 'location' ? 'annuelle' : p.type,
            propertyCategory: p.propertyCategory || p.property_category,
            title: p.title,
            location: p.location,
            price: p.price,
            period: p.period || '',
            pricingInfo: p.pricingInfo,
            image: images && images.length > 0 ? images[0] : '/placeholder.jpg',
            beds: p.beds || 0,
            baths: p.baths || 0,
            area: p.area || 0,
            featured: p.featured || false,
          }
        })
        
        setProperties(transformedProperties)
      } catch (error) {
        console.error('Error loading properties:', error)
      }
    }
    
    loadProperties()
  }, [])

  const filteredProperties = activeTab === 'all' 
    ? properties.slice(0, 6) // Limiter à 6 biens maximum sur la page d'accueil
    : properties.filter(p => p.type === activeTab).slice(0, 6) // Limiter à 6 par catégorie

  return (
    <section className="pt-6 pb-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center max-w-5xl mx-auto px-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
            Nos biens d'exception
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Découvrez notre <span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>sélection</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Des biens soigneusement sélectionnés pour répondre à vos attentes et vous offrir le meilleur de l'immobilier en Martinique.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'all'
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={activeTab === 'all' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' } : {}}
          >
            Tous les biens
          </button>
          <button
            onClick={() => setActiveTab('vente')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'vente'
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={activeTab === 'vente' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' } : {}}
          >
            Achat
          </button>
          <button
            onClick={() => setActiveTab('annuelle')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'annuelle'
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={activeTab === 'annuelle' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' } : {}}
          >
            Location longue durée
          </button>
          <button
            onClick={() => setActiveTab('saisonniere')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'saisonniere'
                ? 'text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={activeTab === 'saisonniere' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' } : {}}
          >
            Location saisonnière
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 mb-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="group relative overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-500">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {!!property.featured && (
                    <span className="text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg" style={{ backgroundColor: '#55E0FF', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      Coup de Cœur
                    </span>
                  )}
                  <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {property.type === 'vente' ? 'Vente' : property.type === 'annuelle' ? 'Annuelle' : 'Saisonnière'}
                  </span>
                  {property.propertyCategory && (
                    <span className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {property.propertyCategory === 'maison' ? '🏠 Maison' :
                       property.propertyCategory === 'appartement' ? '🏢 Appartement' :
                       property.propertyCategory === 'villa' ? '🏡 Villa' :
                       property.propertyCategory === 'terrain' ? '🌳 Terrain' :
                       property.propertyCategory === 'chambre' ? '🛏️ Chambre' :
                       property.propertyCategory === 'immeuble' ? '🏛️ Immeuble' :
                       property.propertyCategory === 'bureau' ? '💼 Bureau' :
                       property.propertyCategory === 'fond_commerce' ? '🏪 Fond de commerce' :
                       property.propertyCategory === 'parking' ? '🅿️ Parking' :
                       property.propertyCategory === 'local_commercial' ? '🏬 Local commercial' :
                       property.propertyCategory}
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    const isFav = isFavorite(property.id)
                    if (isFav) {
                      removeFavorite(property.id)
                      toast.success('Retiré des favoris')
                    } else {
                      addFavorite({
                        id: property.id,
                        title: property.title,
                        price: typeof property.price === 'number' ? property.price : parseInt(String(property.price).replace(',', '')),
                        image: property.image,
                        location: property.location,
                        type: property.type === 'vente' ? 'Vente' : property.type === 'annuelle' ? 'Annuelle' : 'Saisonnière'
                      })
                      toast.success('Ajouté aux favoris ❤️')
                    }
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 backdrop-blur-md border rounded-full flex items-center justify-center transition-all duration-300 group/fav z-10 ${
                    isFavorite(property.id) 
                      ? 'bg-red-500 border-red-500' 
                      : 'bg-white/20 border-white/30 hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-all ${
                    isFavorite(property.id) 
                      ? 'text-white fill-white' 
                      : 'text-white group-hover/fav:text-red-500 group-hover/fav:fill-red-500'
                  }`} />
                </button>
              </div>

              {/* Content - Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                {/* Location */}
                <div className="flex items-center text-white/80 text-xs mb-0.5">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {property.location}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-1 line-clamp-1 group-hover:translate-y-[-2px] transition-transform duration-300">
                  {property.title}
                </h3>

                {/* Features */}
                <div className="flex items-center gap-3 text-white/70 text-xs mb-1.5">
                  <div className="flex items-center">
                    <Bed className="w-3.5 h-3.5 mr-1" />
                    {property.beds}
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-3.5 h-3.5 mr-1" />
                    {property.baths}
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-3.5 h-3.5 mr-1" />
                    {property.area}m²
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">{getCardPriceDisplay(property).price}€</span>
                    <span className="text-white/60 text-xs ml-1">{getCardPriceDisplay(property).period}</span>
                  </div>
                  <Link
                    href={`/biens/${property.id}`}
                    className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group/btn"
                  >
                    <span>{property.type === 'saisonniere' ? 'Réserver' : property.type === 'vente' ? 'Acheter' : 'Voir'}</span>
                    <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/biens"
            className="inline-flex items-center space-x-2 btn-secondary"
          >
            <span>Voir Tous les Biens</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
