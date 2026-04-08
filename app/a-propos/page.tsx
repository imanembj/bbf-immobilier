'use client'

import { Heart, Users, Leaf, Home, Key, Building2, Briefcase, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function AProposPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollScale, setScrollScale] = useState(1.15)
  const [isQuoteVisible, setIsQuoteVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      if (!imageRef.current) return
      
      const rect = imageRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // L'image est visible dans la fenêtre
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculer le pourcentage de visibilité (0 = en haut, 1 = complètement visible)
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
        // Zoom de 1.15 à 1.0
        const newScale = 1.15 - (scrollProgress * 0.15)
        setScrollScale(Math.max(1, newScale))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Appel initial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsQuoteVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (quoteRef.current) {
      observer.observe(quoteRef.current)
    }

    return () => observer.disconnect()
  }, [])
  const piliers = [
    {
      icon: Heart,
      title: "L'humain d'abord",
      description: "Écoute, confiance, clarté",
      color: '#55E0FF'
    },
    {
      icon: Users,
      title: "Une agence citoyenne",
      description: "Locale, solidaire, engagée",
      color: '#41A09C'
    },
    {
      icon: Leaf,
      title: "Un regard vers l'avenir",
      description: "Responsable, durable, connectée aux enjeux climatiques et sociaux",
      color: '#55E0FF'
    },
  ]

  const services = [
    {
      icon: Home,
      title: "Achat & Vente immobilière",
      description: "Maisons, appartements, terrains, locaux"
    },
    {
      icon: Key,
      title: "Location longue durée et saisonnière",
      description: "Gestion complète de vos locations"
    },
    {
      icon: Building2,
      title: "Gestion locative complète",
      description: "Sérénité pour les propriétaires"
    },
    {
      icon: Briefcase,
      title: "Prestations touristiques",
      description: "Valorisation de biens"
    },
    {
      icon: MapPin,
      title: "Études et conseils en foncier",
      description: "Pour investisseurs et porteurs de projet"
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/aerial-view-beautiful-beach-sea-with-coconut-palm-tree.jpg)',
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
            Plus qu'une agence, <span className="font-['Playfair_Display'] italic" style={{ color: '#55E0FF' }}>une vision</span>
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Rejoignez une nouvelle vision de l'immobilier : <span className="font-semibold">authentique, humaine et ambitieuse.</span>
          </p>
        </div>
      </section>

      {/* Sous-titre */}
      <section className="py-12 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="inline-block animate-word-reveal" style={{ animationDelay: '0ms' }}>Des</span>
              {' '}
              <span className="inline-block animate-word-reveal" style={{ animationDelay: '100ms' }}>racines</span>
              {' '}
              <span className="inline-block animate-word-reveal font-['Playfair_Display'] italic" style={{ color: '#41A09C', animationDelay: '200ms' }}>locales</span>
              <span className="inline-block animate-word-reveal" style={{ animationDelay: '300ms' }}>,</span>
              {' '}
              <span className="inline-block animate-word-reveal" style={{ animationDelay: '400ms' }}>une</span>
              {' '}
              <span className="inline-block animate-word-reveal" style={{ animationDelay: '500ms' }}>expertise</span>
              {' '}
              <span className="inline-block animate-word-reveal font-['Playfair_Display'] italic" style={{ color: '#41A09C', animationDelay: '600ms' }}>globale</span>
            </h2>
          </div>
        </div>
      </section>
      
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

      {/* Nos savoir-faire */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Notre expertise
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Nos savoir-faire <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>à votre service</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Chez BBF, nous intervenons sur 5 grands domaines :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#55E0FF' }}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {services.slice(3).map((service, index) => (
                <div key={index + 3} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#55E0FF' }}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* L'histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Texte */}
              <div>
                <div className="flex justify-start mb-6">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                    Notre histoire
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  L'histoire d'une agence <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>différente</span>
                </h2>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#41A09C' }}>
                  Bulle Immobilière, Business et Foncier
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fondée en <strong>mars 2023</strong> et implantée en Martinique, BBF est bien plus qu'une agence immobilière classique. Nous sommes une plateforme locale, humaine et engagée, au service des propriétaires, investisseurs et locataires du territoire.
                </p>
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-xl mb-8">
                  <h4 className="font-bold text-gray-900 mb-2">Notre mission</h4>
                  <p className="text-gray-700">
                    Offrir un accompagnement complet, transparent et moderne pour chaque projet, tout en valorisant le patrimoine foncier martiniquais.
                  </p>
                </div>

                {/* Les 3 piliers intégrés */}
                <div className="mb-6">
                  <div className="flex justify-start mb-6">
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                      Nos valeurs
                    </span>
                  </div>

                  <div className="space-y-4">
                    {piliers.map((pilier, index) => (
                      <div key={index} className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pilier.color }}>
                            <pilier.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{pilier.title}</h4>
                            <p className="text-sm text-gray-600">{pilier.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div ref={imageRef} className="relative h-[580px] lg:h-[780px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/fondatrice.jpg"
                  alt="Fondatrice BBF Immobilier"
                  className="w-full h-full object-cover object-[center_20%] lg:object-center"
                  style={{ 
                    transform: `scale(${scrollScale})`,
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    willChange: 'transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation de la fondatrice */}
      <section ref={quoteRef} className="py-16" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-3xl font-bold mb-4">La vision de la fondatrice</h3>
            <blockquote className="text-2xl md:text-3xl font-['Playfair_Display'] italic mb-4 leading-relaxed">
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>"Derrière</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>chaque</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>projet</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>immobilier,</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>il</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>y</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>a</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>une</span>
              {' '}
              <span className={`inline-block ${isQuoteVisible ? 'animate-word-reveal-quote' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>histoire."</span>
            </blockquote>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .animate-word-reveal-quote {
          animation: word-reveal 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
