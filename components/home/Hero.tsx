'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, Calendar, Calculator, SlidersHorizontal, TrendingUp, Briefcase } from 'lucide-react'
import { useState, useEffect } from 'react'
import { communesMartiniqueSorted } from '@/lib/communes'

export default function Hero() {
  const router = useRouter()
  const [searchType, setSearchType] = useState<'acheter' | 'louer'>('acheter')
  const [scrollY, setScrollY] = useState(0)
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [rooms, setRooms] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construire les paramètres de recherche
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (propertyType) params.set('type', propertyType)
    if (priceMin) params.set('priceMin', priceMin)
    if (priceMax) params.set('priceMax', priceMax)
    if (rooms) params.set('rooms', rooms)
    
    // Rediriger vers la page appropriée avec les paramètres
    const targetPage = searchType === 'acheter' ? '/acheter' : '/location-annuelle'
    const url = params.toString() ? `${targetPage}?${params.toString()}` : targetPage
    
    router.push(url)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-12 z-0 px-4 md:px-6 pb-4 md:pb-6">
      {/* Background Image with Overlay */}
      <div className="absolute top-20 left-4 right-4 bottom-4 md:top-[88px] md:left-6 md:right-6 md:bottom-6 rounded-3xl overflow-hidden shadow-[inset_0_0_0_3px_rgba(103,232,249,0.5)] border-3 border-cyan-300/50">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] saturate-150 brightness-105 will-change-transform"
          style={{
            backgroundImage: 'url(/martinique-hero.jpg)',
            transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            filter: 'saturate(150%) brightness(105%) hue-rotate(-10deg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-gray-900/70 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-500/10" />
      </div>

      {/* Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full transition-all duration-500 ${showFilters ? 'mt-2 md:mt-4' : 'mt-8 md:mt-0'}`}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          {!showFilters && (
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6 animate-fadeIn">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight animate-fadeIn drop-shadow-2xl transition-all duration-500 ${showFilters ? 'mb-3 md:text-4xl' : 'mb-5'}`}>
            Votre projet immobilier
            <span className="block mt-1 font-['Playfair_Display'] italic font-semibold drop-shadow-2xl">
              <span className="inline-block animate-word-reveal" style={{ color: '#55E0FF', animationDelay: '0ms' }}>en</span>
              {' '}
              <span className="inline-block animate-word-reveal" style={{ color: '#55E0FF', animationDelay: '200ms' }}>Martinique</span>
            </span>
          </h1>
          
          <style jsx>{`
            @keyframes word-reveal {
              0% {
                opacity: 0;
                filter: blur(10px);
                transform: translateY(10px);
              }
              100% {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0);
              }
            }
            
            .animate-word-reveal {
              animation: word-reveal 0.8s ease-out forwards;
              opacity: 0;
            }
          `}</style>

          <p className={`text-base md:text-lg text-white leading-relaxed animate-fadeIn max-w-2xl mx-auto drop-shadow-lg font-medium transition-all duration-500 ${showFilters ? 'mb-4 md:mb-6' : 'mb-10'}`}>
            Vente • Location • Gestion immobilière • Business & foncier
          </p>

          {/* Search Box */}
          <div className="bg-black/40 backdrop-blur-3xl rounded-2xl shadow-2xl p-8 mb-8 animate-fadeIn border border-white/30 backdrop-saturate-150 backdrop-contrast-125">
            {/* Search Type Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 justify-between items-start">
              <div className="flex flex-wrap gap-3 flex-1">
                {/* Boutons de recherche (Acheter, Louer) */}
                <button
                  onClick={() => setSearchType('acheter')}
                  className={`px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    searchType === 'acheter'
                      ? 'text-white shadow-md scale-105'
                      : 'bg-black/40 backdrop-blur-xl text-white border border-white/30 hover:bg-black/50 hover:scale-105'
                  }`}
                  style={searchType === 'acheter' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' } : { backdropFilter: 'blur(20px)' }}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Acheter
                </button>
                
                <button
                  onClick={() => setSearchType('louer')}
                  className={`px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    searchType === 'louer'
                      ? 'text-white shadow-md scale-105'
                      : 'bg-black/40 backdrop-blur-xl text-white border border-white/30 hover:bg-black/50 hover:scale-105'
                  }`}
                  style={searchType === 'louer' ? { backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' } : { backdropFilter: 'blur(20px)' }}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Louer
                </button>

                {/* Boutons de redirection (style différent) */}
                <Link href="/vendre">
                  <button className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-black/40 backdrop-blur-xl text-white border-2 border-cyan-300/60 hover:bg-black/50 hover:scale-105 hover:border-cyan-300" style={{ backdropFilter: 'blur(20px)' }}>
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Vendre
                  </button>
                </Link>

                <Link href="/estimer">
                  <button className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-black/40 backdrop-blur-xl text-white border-2 border-cyan-300/60 hover:bg-black/50 hover:scale-105 hover:border-cyan-300" style={{ backdropFilter: 'blur(20px)' }}>
                    <Calculator className="w-4 h-4 inline mr-2" />
                    Estimer
                  </button>
                </Link>

                <Link href="/gestion-locative">
                  <button className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-black/40 backdrop-blur-xl text-white border-2 border-cyan-300/60 hover:bg-black/50 hover:scale-105 hover:border-cyan-300" style={{ backdropFilter: 'blur(20px)' }}>
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Faire gérer
                  </button>
                </Link>
              </div>
              
              {/* Bouton Filtres - Desktop */}
              <button 
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`hidden lg:flex px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl text-white border hover:scale-105 items-center ${
                  showFilters 
                    ? 'bg-cyan-500/30 border-cyan-300' 
                    : 'bg-black/40 border-white/30 hover:bg-black/50'
                }`} 
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtres {showFilters && '✓'}
              </button>
              
              {/* Bouton Filtres - Mobile/Tablette (icône seulement) */}
              <button 
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden w-12 h-12 rounded-xl transition-all duration-300 backdrop-blur-xl text-white border hover:scale-105 flex items-center justify-center ${
                  showFilters 
                    ? 'bg-cyan-500/30 border-cyan-300' 
                    : 'bg-black/40 border-white/30 hover:bg-black/50'
                }`} 
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="mb-6 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/20 animate-fadeIn">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres avancés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Prix */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      {searchType === 'acheter' ? 'Budget (€)' : 'Loyer (€/mois)'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        placeholder="Min"
                        className="px-3 py-2 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-black/20 backdrop-blur-md text-white placeholder:text-white/50"
                      />
                      <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        placeholder="Max"
                        className="px-3 py-2 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-black/20 backdrop-blur-md text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Chambres */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Chambres minimum
                    </label>
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-black/20 backdrop-blur-md text-white appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-900">Indifférent</option>
                      <option value="1" className="bg-gray-900">1+</option>
                      <option value="2" className="bg-gray-900">2+</option>
                      <option value="3" className="bg-gray-900">3+</option>
                      <option value="4" className="bg-gray-900">4+</option>
                      <option value="5" className="bg-gray-900">5+</option>
                    </select>
                  </div>

                  {/* Bouton Réinitialiser */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        setPriceMin('')
                        setPriceMax('')
                        setRooms('')
                      }}
                      className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 border border-white/30"
                    >
                      Réinitialiser filtres
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Search Form */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-cyan-300 transition-colors pointer-events-none z-10" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-black/20 backdrop-blur-md hover:bg-black/30 focus:bg-black/30 text-white appearance-none cursor-pointer font-medium"
                >
                  <option value="" className="bg-gray-900 text-white">Commune en Martinique...</option>
                  {communesMartiniqueSorted.map((commune) => (
                    <option key={commune} value={commune} className="bg-gray-900 text-white">
                      {commune}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/70 group-focus-within:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative group">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-cyan-300 transition-colors pointer-events-none" />
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-black/20 backdrop-blur-md hover:bg-black/30 focus:bg-black/30 font-medium text-white appearance-none cursor-pointer"
                >
                  <option value="">Type de bien</option>
                  <option value="Maison">Maison</option>
                  <option value="Villa">Villa</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Terrain">Terrain</option>
                  <option value="Commercial">Local commercial</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/70 group-focus-within:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button 
                type="submit"
                className="text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2" 
                style={{ backgroundColor: '#55E0FF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!showFilters && (
        <div className="hidden md:block absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      )}
    </section>
  )
}
