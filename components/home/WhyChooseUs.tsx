'use client'

import { Award, Users, Clock, Shield, TrendingUp, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasAutoSlid, setHasAutoSlid] = useState(false)

  const reasons = [
    {
      icon: Award,
      title: 'Expertise Reconnue',
      description: 'Une solide expérience dans l\'immobilier avec une connaissance approfondie du marché local en Martinique.',
      image: '/pexels-rdne-8293654.jpg',
      hasImage: true,
    },
    {
      icon: Users,
      title: 'Équipe Dédiée',
      description: 'Des professionnels passionnés et à votre écoute pour vous accompagner personnellement dans votre projet.',
      gradient: 'from-cyan-500 to-teal-600',
      hasImage: false,
    },
    {
      icon: Clock,
      title: 'Réactivité Garantie',
      description: 'Réponse sous 24h et disponibilité 7j/7 pour toutes vos questions et urgences immobilières.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070',
      hasImage: true,
    },
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      description: 'Transactions sécurisées, contrats conformes et accompagnement juridique complet pour votre tranquillité.',
      gradient: 'from-purple-500 to-pink-600',
      hasImage: false,
    },
    {
      icon: TrendingUp,
      title: 'Meilleur Rapport Qualité-Prix',
      description: 'Des biens soigneusement sélectionnés au juste prix avec une transparence totale sur les tarifs.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070',
      hasImage: true,
    },
    {
      icon: Heart,
      title: 'Satisfaction Client',
      description: '98% de clients satisfaits qui nous recommandent à leur entourage. Votre satisfaction est notre priorité.',
      gradient: 'from-orange-500 to-red-600',
      hasImage: false,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reasons.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length)
  }

  // Auto-slide au chargement pour montrer qu'on peut slider
  useEffect(() => {
    if (!hasAutoSlid) {
      const timer = setTimeout(() => {
        setCurrentSlide(1)
        setHasAutoSlid(true)
        // Retour à la première slide après un moment
        setTimeout(() => {
          setCurrentSlide(0)
        }, 2000)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [hasAutoSlid])

  return (
    <section className="pt-12 pb-20">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-8 text-center max-w-5xl mx-auto px-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
            Pourquoi nous choisir
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Votre partenaire immobilier <br className="md:hidden" /><span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>de confiance</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Découvrez ce qui fait de nous l'agence immobilière de référence
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-16">
          {/* Slides Container */}
          <div className="overflow-hidden mb-6">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(50% - 17.5vw - 12px + -${currentSlide * 37}%))` }}
            >
              {reasons.map((reason, index) => (
                <div 
                  key={index} 
                  className="w-[35vw] flex-shrink-0 cursor-pointer"
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className="relative h-[380px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300">
                    {reason.hasImage && reason.image ? (
                      <>
                        {/* Card with Image */}
                        <Image
                          src={reason.image}
                          alt={reason.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center mb-4">
                            <reason.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">
                            {reason.title}
                          </h3>
                          <p className="text-sm text-white/90 leading-relaxed">
                            {reason.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Card with Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient}`} />
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white text-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center mb-6">
                            <reason.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4">
                            {reason.title}
                          </h3>
                          <p className="text-sm text-white/95 leading-relaxed">
                            {reason.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'w-8 h-3 bg-cyan-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Rejoignez nos 1200+<br /><span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>clients satisfaits</span>
                </h3>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Faites confiance à l'expertise d'Arielle et son équipe pour concrétiser votre projet immobilier en toute sérénité.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-4 text-white flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold mb-1">Expert</div>
                    <div className="text-white/90 text-xs">Expérience confirmée</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-4 text-white flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold mb-1">500+</div>
                    <div className="text-white/90 text-xs">Biens gérés</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-4 text-white flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold mb-1">98%</div>
                    <div className="text-white/90 text-xs">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
