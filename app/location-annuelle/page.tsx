'use client'

import { Home, Shield, FileText, HeadphonesIcon, CheckCircle, MapPin, Bed, Bath, Maximize, Heart, SlidersHorizontal, Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatedText, AnimatedSection } from '@/components/animations'
import { useFavorites } from '@/lib/favorites'
import toast from 'react-hot-toast'

function LocationAnnuellePageContent() {
  const searchParams = useSearchParams()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [properties, setProperties] = useState<any[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPropertiesVisible, setIsPropertiesVisible] = useState(false)
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false)
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const [isCTAVisible, setIsCTAVisible] = useState(false)
  const propertiesRef = useRef<HTMLDivElement>(null)
  const advantagesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    type: 'all',
    rooms: '',
    area: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Initialiser les filtres depuis les paramètres URL
  useEffect(() => {
    const locationParam = searchParams.get('location')
    const typeParam = searchParams.get('type')
    const priceMinParam = searchParams.get('priceMin')
    const priceMaxParam = searchParams.get('priceMax')
    const roomsParam = searchParams.get('rooms')
    
    if (locationParam || typeParam || priceMinParam || priceMaxParam || roomsParam) {
      setFilters(prev => ({
        ...prev,
        location: locationParam || '',
        type: typeParam || 'all',
        priceMin: priceMinParam || '',
        priceMax: priceMaxParam || '',
        rooms: roomsParam || '',
      }))
    }
  }, [searchParams])

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
      setIsAdvantagesVisible(true)
      setIsProcessVisible(true)
      setIsCTAVisible(true)
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

    const advantagesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsAdvantagesVisible(true)
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

    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsCTAVisible(true)
        }
      })
    }, observerOptions)

    if (propertiesRef.current) propertiesObserver.observe(propertiesRef.current)
    if (advantagesRef.current) advantagesObserver.observe(advantagesRef.current)
    if (processRef.current) processObserver.observe(processRef.current)
    if (ctaRef.current) ctaObserver.observe(ctaRef.current)

    return () => {
      propertiesObserver.disconnect()
      advantagesObserver.disconnect()
      processObserver.disconnect()
      ctaObserver.disconnect()
    }
  }, [isMobile])

  // Charger les biens depuis l'API MySQL
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        const allProperties = await response.json()
        
        // Filtrer uniquement les locations annuelles
        const annualProperties = allProperties
          .filter((p: any) => p.type === 'location' || p.type === 'annuelle')
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
              rooms: p.rooms || p.beds || 0,
            }
          })
        
        setProperties(annualProperties)
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
    if (filters.type !== 'all' && property.type !== filters.type) return false
    if (filters.rooms && property.beds < parseInt(filters.rooms)) return false
    if (filters.area && property.area < parseInt(filters.area)) return false
    return true
  })

  const advantages = [
    {
      icon: Shield,
      title: 'Sécurité Garantie',
      description: 'Contrats conformes, états des lieux détaillés et garanties locatives',
    },
    {
      icon: FileText,
      title: 'Démarches Simplifiées',
      description: 'Nous gérons toute la paperasse administrative pour vous',
    },
    {
      icon: HeadphonesIcon,
      title: 'Accompagnement Complet',
      description: 'De la visite à la signature, nous sommes à vos côtés',
    },
    {
      icon: Home,
      title: 'Large Sélection',
      description: 'Plus de 500 biens disponibles dans toute la France',
    },
  ]

  const services = [
    'Visite virtuelle et physique des biens',
    'Constitution du dossier locataire',
    'Négociation avec le propriétaire',
    'Rédaction et signature du bail',
    'État des lieux d\'entrée et de sortie',
    'Suivi pendant toute la durée de location',
    'Médiation en cas de litige',
    'Conseils juridiques personnalisés',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/martinique-hero.jpg)',
              transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-black/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Location{' '}
            <AnimatedText 
              text="longue durée" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Trouvez votre logement idéal pour une location longue durée
          </p>

          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#biens" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Voir nos biens
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300">
              Déposer un Dossier
            </Link>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section ref={propertiesRef} id="biens" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Biens <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>disponibles</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} en location longue durée
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
                onClick={() => setFilters({ location: '', priceMin: '', priceMax: '', type: 'all', rooms: '', area: '' })}
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

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de bien</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="all">Tous</option>
                  <option value="Villa">Villa</option>
                  <option value="Maison">Maison</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Studio">Studio</option>
                  <option value="Duplex">Duplex</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loyer (€/mois)</label>
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

              {/* Rooms */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Chambres min.</label>
                <select
                  value={filters.rooms}
                  onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Indifférent</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
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
                      Annuelle
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
                      <span className="text-2xl font-bold">{property.price}€</span>
                      <span className="text-white/60 text-xs ml-1">/mois</span>
                    </div>
                    <Link
                      href={`/biens/${property.id}`}
                      className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group/btn"
                    >
                      <span>Voir</span>
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
                onClick={() => setFilters({ location: '', priceMin: '', priceMax: '', type: 'all', rooms: '', area: '' })}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: '#55E0FF', color: 'white' }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Nos services
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Un accompagnement <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>complet</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous vous accompagnons à chaque étape de votre recherche de logement pour vous garantir une expérience sereine et sécurisée.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  Commencer Ma Recherche
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pexels-gustavo-fring-7489103.jpg"
                  alt="Service location"
                  fill
                  className="object-cover object-[60%_center]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-[280px] md:max-w-xs">
                <div className="flex items-center space-x-3 md:space-x-4 mb-2 md:mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E6F7F7' }}>
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#41A09C' }} />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-xs md:text-sm text-gray-600">Taux de satisfaction</div>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Nos clients nous recommandent pour notre professionnalisme
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section ref={advantagesRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 md:${isAdvantagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} opacity-100 translate-y-0`}
                style={{ transitionDelay: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${index * 250}ms` : '0ms' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E6F7F7' }}>
                  <advantage.icon className="w-8 h-8" style={{ color: '#41A09C' }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Le processus <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>de location</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple, rapide et sécurisé en 5 étapes
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Recherche', desc: 'Parcourez nos annonces et sélectionnez les biens qui vous intéressent' },
                { step: '2', title: 'Visite', desc: 'Organisez des visites virtuelles ou physiques avec nos agents' },
                { step: '3', title: 'Dossier', desc: 'Constituez votre dossier locataire avec notre aide' },
                { step: '4', title: 'Validation', desc: 'Le propriétaire étudie votre dossier et vous donne sa réponse' },
                { step: '5', title: 'Signature', desc: 'Signez le bail et récupérez les clés de votre nouveau logement' },
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
                text="Vous êtes propriétaire ?" 
                delay={300}
              />
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Confiez-nous la gestion de votre bien et trouvez le locataire idéal
            </p>
            <Link href="/contact?service=gestion" className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ color: '#41A09C' }}>
              Proposer mon bien
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}

export default function LocationAnnuellePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <LocationAnnuellePageContent />
    </Suspense>
  )
}
