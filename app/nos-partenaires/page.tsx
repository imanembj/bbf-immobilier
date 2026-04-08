'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Users, Award, ArrowRight, Building2 } from 'lucide-react'
import { AnimatedText, AnimatedSection } from '@/components/animations'
import { getStore } from '@/lib/store'
import { Partner, initialPartners } from '@/lib/data'

export default function NosPartenairesPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isIntroVisible, setIsIntroVisible] = useState(false)
  const [visiblePartenaires, setVisiblePartenaires] = useState<number[]>([])
  const [visibleAvantages, setVisibleAvantages] = useState<number[]>([])
  const [partenaires, setPartenaires] = useState<Partner[]>([])
  
  // Charger les partenaires depuis Supabase
  useEffect(() => {
    const loadPartners = async () => {
      const { getPartners } = await import('@/lib/supabase-store')
      const loadedPartners = await getPartners()
      
      // Si aucun partenaire dans Supabase, utiliser les données initiales
      if (loadedPartners.length === 0) {
        setPartenaires(initialPartners.filter(p => p.actif).sort((a, b) => a.ordre - b.ordre))
      } else {
        setPartenaires(loadedPartners as any)
      }
    }
    
    loadPartners()
  }, [])
  
  // Partenaires en dur comme fallback (au cas où)
  const partenairesHardcoded: Partner[] = [
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
  
  const introRef = useRef<HTMLDivElement>(null)
  const partenaireRefs = useRef<(HTMLDivElement | null)[]>([])
  const avantageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    }

    const introObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntroVisible(true)
        }
      })
    }, observerOptions)

    if (introRef.current) introObserver.observe(introRef.current)

    return () => {
      introObserver.disconnect()
    }
  }, [])

  // Observer pour chaque carte partenaire
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = partenaireRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && !visiblePartenaires.includes(index)) {
            setVisiblePartenaires(prev => [...prev, index])
          }
        }
      })
    }, observerOptions)

    partenaireRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visiblePartenaires])

  // Observer pour chaque carte avantage
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = avantageRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && !visibleAvantages.includes(index)) {
            setVisibleAvantages(prev => [...prev, index])
          }
        }
      })
    }, observerOptions)

    avantageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleAvantages])

  const avantages = [
    {
      icon: CheckCircle,
      title: 'Partenaires vérifiés',
      description: 'Tous nos partenaires sont soigneusement sélectionnés et certifiés',
    },
    {
      icon: Users,
      title: 'Réseau local',
      description: 'Des professionnels implantés en Martinique qui connaissent le territoire',
    },
    {
      icon: Award,
      title: 'Qualité garantie',
      description: 'Des services de qualité pour accompagner tous vos projets',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/colorful-beach-with-coconut-tree-blue-sky-st-john-virgin-island.jpg)',
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
            Nos <span className="font-['Playfair_Display'] italic inline-block animate-word-reveal" style={{ color: '#55E0FF' }}>partenaires</span>
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

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Un réseau de professionnels de confiance pour vous accompagner dans tous vos projets immobiliers
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section ref={introRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Nos partenaires
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Des partenaires <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>de confiance</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez Bulle immobilière, Business & Foncier, nous collaborons avec les meilleurs professionnels de Martinique pour vous offrir un service complet et de qualité. De la recherche de financement à la réalisation de travaux, en passant par les démarches juridiques, notre réseau de partenaires est là pour vous accompagner à chaque étape.
            </p>
          </div>
        </div>
      </section>

      {/* Partenaires Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(partenaires.length > 0 ? partenaires : partenairesHardcoded).map((partenaire, index) => (
                <div 
                  key={index}
                  ref={(el) => { partenaireRefs.current[index] = el }}
                  className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-700 hover:scale-105 ${visiblePartenaires.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="text-5xl mb-4 text-center">{partenaire.logo}</div>
                  <div className="text-center mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: '#E6F7F7', color: '#41A09C' }}>
                      {partenaire.categorie}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{partenaire.nom}</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">{partenaire.description}</p>
                  {partenaire.promo && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: '#55E0FF' }}>
                        {partenaire.promo}
                      </span>
                    </div>
                  )}
                  {partenaire.prix && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: '#E6F7F7', color: '#41A09C' }}>
                        💰 {partenaire.prix}
                      </span>
                    </div>
                  )}
                  {partenaire.url !== '#' && (
                    <div className="text-center">
                      <a
                        href={partenaire.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold hover:underline"
                        style={{ color: '#41A09C' }}
                      >
                        En savoir plus
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact pour prestations Expérience Mystique */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl shadow-lg p-8 border-2" style={{ borderColor: '#41A09C' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Grâce à nos partenaires, nous trouvons le meilleur pour vous
              </h3>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Contactez-nous pour vos demandes spécifiques :
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span style={{ color: '#41A09C' }}>🔹</span>
                  <span>via le formulaire de réservation</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span style={{ color: '#41A09C' }}>🔹</span>
                  <span>ou directement par 📧 : <a href="mailto:prestations.touristiques@bbf-immobilier.com" className="font-semibold hover:underline" style={{ color: '#41A09C' }}>prestations.touristiques@bbf-immobilier.com</a></span>
                </div>
              </div>
              <p className="text-center text-gray-600 italic">
                Nous reviendrons vers vous rapidement avec un devis personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {avantages.map((avantage, index) => (
                <div 
                  key={index}
                  ref={(el) => { avantageRefs.current[index] = el }}
                  className={`text-center transition-all duration-700 ${visibleAvantages.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#E6F7F7' }}>
                    <avantage.icon className="w-8 h-8" style={{ color: '#41A09C' }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{avantage.title}</h3>
                  <p className="text-gray-600">{avantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            <AnimatedText 
              text="Vous souhaitez devenir partenaire ?" 
              delay={300}
            />
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-5xl mx-auto">
            Rejoignez notre réseau de professionnels et développez votre activité en Martinique
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ color: '#41A09C' }}>
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
