'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Maximize, Heart, Search, SlidersHorizontal } from 'lucide-react'
import { AnimatedText } from '@/components/animations'
import { useFavorites } from '@/lib/favorites'
import toast from 'react-hot-toast'
import { getStore } from '@/lib/store'

// Helper pour afficher le prix dans les cartes
const getCardPriceDisplay = (property: any): { price: string, period: string } => {
  const pricingInfo = property.pricingInfo
  
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
  return {
    price: typeof price === 'number' ? price.toLocaleString('fr-FR') : price,
    period: property.period || ''
  }
}

export default function BiensPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [properties, setProperties] = useState<any[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isPropertiesVisible, setIsPropertiesVisible] = useState(false)
  const propertiesRef = useRef<HTMLDivElement>(null)
  
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    priceMin: '',
    priceMax: '',
    rooms: '',
    area: '',
  })

  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    }

    const propertiesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsPropertiesVisible(true)
        }
      })
    }, observerOptions)

    if (propertiesRef.current) propertiesObserver.observe(propertiesRef.current)

    return () => {
      propertiesObserver.disconnect()
    }
  }, [])

  // Charger tous les biens depuis MySQL via API
  useEffect(() => {
    const loadProperties = async () => {
      const response = await fetch('/api/properties')
      const allProperties = await response.json()
    // Mapper tous les biens
    const storeProperties = allProperties.map(p => ({
      ...p,
      image: p.images && p.images.length > 0 ? p.images[0] : '',
      type: p.type === 'location' ? 'annuelle' : p.type,
      rooms: p.rooms || p.beds || 0,
    }))
    
      // Utiliser uniquement les biens MySQL
      const combined = storeProperties
      const unique = combined.filter((item: any, index: number, self: any[]) => 
        index === self.findIndex((t: any) => t.id === item.id)
      )
      setProperties(unique)
    }
    
    loadProperties()
  }, [])

  const filteredProperties = properties.filter(property => {
    if (filters.type !== 'all' && property.type !== filters.type) return false
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) return false
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) return false
    if (filters.rooms && property.beds < parseInt(filters.rooms)) return false
    if (filters.area && property.area < parseInt(filters.area)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_55%] blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/orythys-martinique-205112_1920.jpg)',
              transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-black/80" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Nos biens{' '}
            <AnimatedText 
              text="immobiliers" 
              className="font-['Playfair_Display'] italic" 
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} disponible{filteredProperties.length > 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
                <button
                  onClick={() => setFilters({ type: 'all', location: '', priceMin: '', priceMax: '', rooms: '', area: '' })}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="space-y-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type de Bien
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tous' },
                      { value: 'vente', label: 'À Vendre' },
                      { value: 'annuelle', label: 'Location longue durée' },
                      { value: 'saisonniere', label: 'Location saisonnière' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={filters.type === option.value}
                          onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="Ville, quartier..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      placeholder="Min"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      placeholder="Max"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <label htmlFor="rooms" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de Chambres Min.
                  </label>
                  <select
                    id="rooms"
                    value={filters.rooms}
                    onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Indifférent</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                    Surface Min. (m²)
                  </label>
                  <input
                    type="number"
                    id="area"
                    value={filters.area}
                    onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                    placeholder="Ex: 50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Properties Grid */}
          <div ref={propertiesRef} className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full btn-secondary mb-6 flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtres</span>
            </button>

            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProperties.length}</span> bien{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Plus récents</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Surface croissante</option>
                <option>Surface décroissante</option>
              </select>
            </div>

            {/* Properties */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-8 md:pb-0">
                {filteredProperties.map((property, index) => (
                  <div 
                    key={property.id} 
                    className={`group relative overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-700 md:${isPropertiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} opacity-100 translate-y-0`}
                    style={{ transitionDelay: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${index * 200}ms` : '0ms' }}
                  >
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
                        {property.featured && (
                          <span className="text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg" style={{ backgroundColor: '#55E0FF', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            Coup de Cœur
                          </span>
                        )}
                        {/* Badge Type avec couleurs */}
                        {property.type === 'saisonniere' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border-2 border-blue-300">
                            🏖️ Location Saisonnière
                          </span>
                        )}
                        {property.type === 'annuelle' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border-2 border-green-300">
                            🏠 Location Longue Durée
                          </span>
                        )}
                        {property.type === 'vente' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border-2 border-purple-300">
                            💰 Achat
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
                              price: property.price,
                              image: property.image,
                              location: property.location,
                              type: property.type
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
                      <h3 className="text-xl font-bold line-clamp-1 group-hover:translate-y-[-2px] transition-transform duration-300 mb-1">
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
                          href={`/biens/${property.id}?from=/biens`}
                          className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group/btn"
                        >
                          <span>{property.type === 'saisonniere' ? 'Réserver' : property.type === 'vente' ? 'Détails' : 'Voir'}</span>
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun bien trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={() => setFilters({ type: 'all', location: '', priceMin: '', priceMax: '', rooms: '', area: '' })}
                  className="btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
