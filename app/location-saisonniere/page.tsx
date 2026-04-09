'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Bed, Bath, Maximize, Heart, Users, Calendar, Search, SlidersHorizontal, Wifi, Car } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedText, AnimatedSection } from '@/components/animations'
import { useFavorites } from '@/lib/favorites'
import toast from 'react-hot-toast'
import { getCategoryBadge } from '@/lib/property-category'

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
        period: pricingInfo.period || property.period || '/nuit'
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

export default function LocationSaisonnierePage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [properties, setProperties] = useState<any[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPropertiesVisible, setIsPropertiesVisible] = useState(false)
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const propertiesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    type: 'all',
    category: 'all',
    guests: '',
    area: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Sur mobile, tout est visible immédiatement
    if (isMobile) {
      setIsPropertiesVisible(true)
      setIsProcessVisible(true)
      return
    }

    // Sur desktop, utiliser les observers pour les animations
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

    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true)
        }
      })
    }, observerOptions)

    if (propertiesRef.current) propertiesObserver.observe(propertiesRef.current)
    if (processRef.current) processObserver.observe(processRef.current)

    return () => {
      propertiesObserver.disconnect()
      processObserver.disconnect()
    }
  }, [isMobile])

  // Charger les biens depuis l'API MySQL
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        const allProperties = await response.json()
        
        // Filtrer uniquement les locations saisonnières
        const seasonalProperties = allProperties
          .filter((p: any) => p.type === 'saisonniere')
          .map((p: any) => {
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
              ...p,
              images,
              image: images && images.length > 0 ? images[0] : '',
              bedrooms: p.beds,
              rooms: p.rooms || p.beds || 0,
            }
          })
        
        setProperties(seasonalProperties)
      } catch (error) {
        console.error('Error loading properties:', error)
      }
    }
    
    loadProperties()
  }, [])

  const filteredProperties = properties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) return false
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) return false
    if (filters.category !== 'all' && property.propertyCategory !== filters.category) return false
    if (filters.type !== 'all' && property.type !== filters.type) return false
    if (filters.guests && property.guests < parseInt(filters.guests)) return false
    if (filters.area && property.area < parseInt(filters.area)) return false
    return true
  })

  const features = [
    {
      icon: Calendar,
      title: 'Réservation Instantanée',
      description: 'Calendrier en temps réel et confirmation immédiate',
    },
    {
      icon: Users,
      title: 'Conciergerie 7j/7',
      description: 'Service d\'accueil et assistance pendant votre séjour',
    },
    {
      icon: Wifi,
      title: 'Équipements Premium',
      description: 'Tous nos biens sont équipés pour votre confort',
    },
    {
      icon: Car,
      title: 'Flexibilité',
      description: 'Arrivée et départ flexibles selon disponibilités',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg)',
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
            Location{' '}
            <AnimatedText 
              text="saisonnière" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Des biens d'exception pour des vacances inoubliables en Martinique
          </p>

          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#biens" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Découvrir nos biens
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                  Nos locations
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Évadez-vous en Martinique avec nos<br className="hidden lg:block" /> <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>locations saisonnières</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Découvrez notre sélection exclusive de logements de vacances en Martinique, soigneusement choisis pour leur confort, leur cadre privilégié et leurs prestations haut de gamme. Que vous recherchiez une villa avec piscine, un appartement avec jacuzzi ou une maison familiale en bord de mer, B.B.F vous propose une gamme variée de biens adaptés à tous vos besoins et à tous vos projets de séjour.
              </p>
              
              <p>
                Toutes nos locations sont situées dans des secteurs calmes, proches des plages, des commodités et des plus beaux paysages de l'île.
              </p>
              
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <p className="font-semibold text-gray-900 mb-2">
                  🛏 Nos logements peuvent accueillir de 1 à 20 personnes
                </p>
                <p>
                  Tous nos biens sont entièrement équipés pour vous offrir un séjour inoubliable. En tant qu'agence locale, nous vous garantissons un accompagnement de qualité, de la réservation à la remise des clés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section ref={propertiesRef} id="biens" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Locations <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>saisonnières</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} disponible{filteredProperties.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" style={{ color: '#41A09C' }} />
                Filtres de recherche
              </h3>
              <button
                onClick={() => setFilters({ location: '', priceMin: '', priceMax: '', type: 'all', category: 'all', guests: '', area: '' })}
                className="text-sm font-medium hover:underline"
                style={{ color: '#41A09C' }}
              >
                Réinitialiser
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Localisation</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Ville, quartier..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="all">Toutes</option>
                  <option value="maison">🏠 Maison</option>
                  <option value="appartement">🏢 Appartement</option>
                  <option value="villa">🏰 Villa</option>
                  <option value="terrain">🌳 Terrain</option>
                  <option value="chambre">🛏️ Chambre</option>
                  <option value="immeuble">🏛️ Immeuble</option>
                  <option value="bureau">💼 Bureau</option>
                  <option value="fond_commerce">🏪 Fond de commerce</option>
                  <option value="parking">🅿️ Parking</option>
                  <option value="local_commercial">🏬 Local commercial</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (€/nuit)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    placeholder="Min"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    placeholder="Max"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Voyageurs min.</label>
                <select
                  value={filters.guests}
                  onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Indifférent</option>
                  <option value="2">2+</option>
                  <option value="4">4+</option>
                  <option value="6">6+</option>
                  <option value="8">8+</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                    {!!property.featured && (
                      <span className="text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg" style={{ backgroundColor: '#55E0FF', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                        Coup de Cœur
                      </span>
                    )}
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Saisonnière
                    </span>
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
                          type: 'Saisonnière'
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
                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:translate-y-[-2px] transition-transform duration-300">
                    {property.title}
                  </h3>

                  {/* Category Badge */}
                  {property.propertyCategory && (
                    <div className="mb-2">
                      <span className={getCategoryBadge(property.propertyCategory).className}>
                        {getCategoryBadge(property.propertyCategory).label}
                      </span>
                    </div>
                  )}

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
                      <span>Réserver</span>
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
                onClick={() => setFilters({ location: '', priceMin: '', priceMax: '', type: 'all', category: 'all', guests: '', area: '' })}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: '#55E0FF', color: 'white' }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Moyens de paiement */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                  Paiement
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Moyens de paiement{' '}
                <AnimatedText 
                  text="acceptés" 
                  className="font-['Playfair_Display'] italic"
                  style={{ color: '#41A09C' }}
                  delay={300}
                />
              </h2>
              <p className="text-lg text-gray-600">
                Nous vous offrons plusieurs solutions de paiement, simples et sécurisées
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Pour faciliter votre réservation ou la signature de votre bail, notre agence accepte différents modes de paiement, adaptés à vos besoins. Que vous souhaitiez régler en une seule fois, en plusieurs mensualités, ou utiliser vos Chèques-Vacances ANCV, nous vous accompagnons avec souplesse et transparence.
              </p>

              <div className="flex justify-center mb-6">
                <Image
                  src="/paiements-logos.png"
                  alt="Moyens de paiement acceptés : ANCV Chèque-Vacances, ANCV Connect, Virement Bancaire, Paiement en 3x 4x sans frais"
                  width={1000}
                  height={120}
                  className="object-contain"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: '#41A09C' }}>
                <p className="text-sm text-gray-700">
                  <strong>*ANCV et paiement en plusieurs fois :</strong> Contactez-nous pour un accord de paiement ou un devis personnalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taxe de Séjour */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#D3CDB7' }}>
                  Réglementation
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Déclaration de la{' '}
                <AnimatedText 
                  text="Taxe de Séjour" 
                  className="font-['Playfair_Display'] italic"
                  style={{ color: '#41A09C' }}
                  delay={300}
                />
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                En tant que propriétaire de location saisonnière, vous devez déclarer et reverser la taxe de séjour collectée auprès de vos locataires
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Qu'est-ce que la taxe de séjour ?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    La taxe de séjour est une contribution financière demandée aux touristes séjournant dans un hébergement payant. Elle est collectée par le propriétaire et reversée à la collectivité territoriale.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Montant variable selon le type d'hébergement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Calculée par personne et par nuitée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Exonération pour les mineurs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    Vos obligations
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900 mb-1">1. Collecter</p>
                      <p className="text-sm text-gray-600">Percevoir la taxe auprès de vos locataires lors de leur séjour</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
                      <p className="font-semibold text-gray-900 mb-1">2. Déclarer</p>
                      <p className="text-sm text-gray-600">Effectuer votre déclaration sur la plateforme CAESM</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
                      <p className="font-semibold text-gray-900 mb-1">3. Reverser</p>
                      <p className="text-sm text-gray-600">Payer le montant collecté à la collectivité</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔗</span>
                  Plateforme de déclaration CAESM
                </h3>
                <p className="text-gray-700 mb-4">
                  Effectuez vos déclarations de taxe de séjour en ligne via la plateforme officielle CAESM (Collecte et Accompagnement pour l'Exploitation de la taxe de Séjour en Martinique).
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a 
                    href="https://caesm.taxesejour.fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <span className="mr-2">🌐</span>
                    Accéder à CAESM
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-sm text-gray-600 italic">
                    Plateforme officielle de déclaration pour la Martinique
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-amber-900 mb-2">Important</p>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Le non-respect de vos obligations déclaratives peut entraîner des sanctions. Notre agence peut vous accompagner dans vos démarches de déclaration et de gestion de la taxe de séjour. N'hésitez pas à nous contacter pour plus d'informations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Le processus de <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>réservation</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple, transparent et sécurisé en 4 étapes
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Recherchez', desc: 'Parcourez nos biens et trouvez celui qui vous convient' },
                { step: '2', title: 'Réservez', desc: 'Sélectionnez vos dates et confirmez votre réservation' },
                { step: '3', title: 'Payez', desc: 'Paiement sécurisé en ligne avec contrat automatique' },
                { step: '4', title: 'Profitez', desc: 'Accueil sur place et assistance pendant votre séjour' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-700 md:${isProcessVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} opacity-100 translate-y-0`}
                  style={{ transitionDelay: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${index * 250}ms` : '0ms' }}
                >
                  <div className="w-16 h-16 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              <AnimatedText 
                text="Vous possédez un bien à louer ?" 
                delay={300}
              />
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Confiez-nous la gestion de votre location saisonnière et maximisez vos revenus
            </p>
            <Link href="/contact?service=gestion-saisonniere" className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ color: '#41A09C' }}>
              Proposer mon bien
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
