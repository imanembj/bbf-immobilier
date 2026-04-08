'use client'

import { CheckCircle, TrendingUp, Camera, Users, Shield, Phone, Mail, Globe, MessageCircle, FileText, Home, Award, Star, Sparkles, MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatedText, AnimatedSection } from '@/components/animations'

export default function VendrePage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardProgress, setCardProgress] = useState<number[]>([0, 0, 0, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScrollCards = () => {
      const section = document.querySelector('.engagement-section')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Calculer la progression pour chaque carte en fonction du scroll
      // L'animation commence quand la section est à 80% du bas de l'écran
      const scrollStart = windowHeight * 0.8
      const scrollEnd = -sectionHeight * 0.8
      const scrollRange = scrollStart - scrollEnd
      const rawProgress = Math.max(0, Math.min(1, (scrollStart - sectionTop) / scrollRange))
      
      // Créer un effet aller-retour : 0 -> 1 -> 0 (plus lent)
      // Les cartes se centrent puis repartent sur les côtés
      const scrollProgress = rawProgress < 0.5 
        ? rawProgress * 2  // 0 à 0.5 devient 0 à 1 (centrage)
        : (1 - rawProgress) * 2  // 0.5 à 1 devient 1 à 0 (décentrage)

      // Chaque carte a son propre timing de progression
      const newProgress = [
        Math.max(0, Math.min(1, scrollProgress * 3)),           // Carte 1
        Math.max(0, Math.min(1, (scrollProgress - 0.1) * 3)),   // Carte 2
        Math.max(0, Math.min(1, (scrollProgress - 0.2) * 3)),   // Carte 3
        Math.max(0, Math.min(1, (scrollProgress - 0.3) * 3))    // Carte 4
      ]

      setCardProgress(newProgress)
    }

    window.addEventListener('scroll', handleScrollCards, { passive: true })
    handleScrollCards() // Initial check

    return () => window.removeEventListener('scroll', handleScrollCards)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % etapes.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + etapes.length) % etapes.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
  const engagements = [
    {
      icon: MessageCircle,
      title: 'Communication réactive & personnalisée',
      description: 'Réponse sous 24h ouvrées',
      detail: 'Un interlocuteur unique de A à Z'
    },
    {
      icon: TrendingUp,
      title: 'Estimation juste et offerte*',
      description: 'Analyse détaillée du marché local',
      detail: 'Rapport clair sans engagement'
    },
    {
      icon: Phone,
      title: 'Suivi régulier',
      description: 'Par téléphone ou WhatsApp',
      detail: 'Transparence totale'
    },
    {
      icon: Camera,
      title: 'Mise en valeur premium',
      description: 'Photos HD, vidéos, visites virtuelles',
      detail: 'Aucun frais à avancer'
    },
  ]

  const etapes = [
    {
      number: '01',
      title: 'Estimation professionnelle locale',
      subtitle: 'Une estimation précise, fondée sur notre connaissance du marché',
      description: 'Grâce à notre méthode d\'estimation au prix du marché, nous croisons plusieurs critères :',
      points: [
        'Emplacement, surface, prestations',
        'Analyse comparative du marché local',
        'Demande active sur votre secteur'
      ],
      footer: 'Estimation offerte*, réalisée sur place ou à distance.',
      icon: TrendingUp,
      image: '/pexels-energepic-com-27411-313691.jpg'
    },
    {
      number: '02',
      title: 'Plan de commercialisation différenciant',
      subtitle: 'Valoriser votre bien avec une stratégie de mise en marché ciblée',
      description: '',
      points: [
        'Photographie professionnelle HD, vidéo et visites virtuelles',
        'Home staging léger si besoin',
        'Diffusion sur site BBF, portails spécialisés, réseaux sociaux et base de clients qualifiés',
        'Campagnes ciblées par type de bien'
      ],
      footer: 'Votre bien mérite une présentation à la hauteur de sa valeur.',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'
    },
    {
      number: '03',
      title: 'Suivi rigoureux jusqu\'à la signature',
      subtitle: 'Un accompagnement complet, de A à Z',
      description: '',
      points: [
        'Suivi personnalisé avec bilans réguliers',
        'Qualification des acquéreurs (capacité financière, intentions)',
        'Organisation des visites, gestion des offres, négociation',
        'Signature du compromis et accompagnement jusqu\'à l\'acte'
      ],
      footer: 'Un seul interlocuteur, des process maîtrisés, un résultat sécurisé.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070'
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
            Vendre avec{' '}
            <AnimatedText 
              text="B.B.F" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Des solutions personnalisées pour une vente réussie, rapide et sécurisée
          </p>

          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center" style={{ marginTop: '-8px' }}>
            <Link href="/estimer#formulaire" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              <Sparkles className="w-5 h-5 mr-2" />
              Estimation Offerte*
            </Link>
            <Link href="/contact?service=vente" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction avec image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Accompagnement sur-mesure
              </span>
            </div>

            {/* Titre */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Une stratégie <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>sur-mesure</span>, un accompagnement de haut niveau
            </h2>

            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
              <Image
                src="/pexels-khwanchai-4161619.jpg"
                alt="Vendre avec BBF"
                fill
                className="object-cover object-[center_10%]"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Texte */}
            <div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                  <Award className="w-6 h-6" style={{ color: '#41A09C' }} />
                  Notre engagement
                </h3>
                <p className="text-gray-700 text-center">
                  Vendre un bien ne s'improvise pas. Chez BBF, <strong>chaque propriété est unique.</strong> Notre rôle est de vous accompagner avec méthode, clarté et transparence.<br className="hidden lg:block" /> Une vente au <strong>juste prix</strong>, dans les <strong>meilleurs délais</strong> et en toute <strong>sécurité juridique</strong>.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Link href="/estimer#formulaire" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Obtenir mon estimation offerte*
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 étapes - Carrousel */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                  Notre méthode
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre méthode en <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>3 étapes</span>
              </h2>
              <p className="text-lg text-gray-600">
                Un accompagnement complet de A à Z
              </p>
            </div>

            {/* Carrousel */}
            <div className="relative">
              {/* Container du carrousel */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {etapes.map((etape, index) => (
                    <div key={index} className="min-w-full px-4">
                      {/* Carte de l'étape */}
                      <div className="bg-white rounded-2xl overflow-hidden max-w-6xl mx-auto h-auto lg:h-[700px]">
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 h-full ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                          {/* Image */}
                          <div className={`relative h-[300px] lg:h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <Image
                              src={etape.image}
                              alt={etape.title}
                              fill
                              className="object-cover"
                              quality={95}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            
                            {/* Numéro de l'étape */}
                            <div className="absolute top-6 left-6">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl" style={{ backgroundColor: '#55E0FF' }}>
                                {etape.number}
                              </div>
                            </div>

                            {/* Icône */}
                            <div className="absolute top-6 right-6">
                              <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30">
                                <etape.icon className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Contenu */}
                          <div className={`p-8 md:p-10 flex flex-col justify-center overflow-y-auto ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{etape.title}</h3>
                            <p className="text-lg font-semibold mb-4" style={{ color: '#41A09C' }}>{etape.subtitle}</p>
                            
                            {etape.description && (
                              <p className="text-gray-700 mb-6">{etape.description}</p>
                            )}
                            
                            <div className="space-y-4 mb-6">
                              {etape.points.map((point, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#55E0FF' }}>
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </div>
                                  <p className="text-gray-700 text-lg">{point}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl border-l-4" style={{ borderColor: '#55E0FF' }}>
                              <p className="text-gray-900 font-semibold text-lg">{etape.footer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutons de navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                style={{ backgroundColor: '#55E0FF' }}
                aria-label="Étape précédente"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                style={{ backgroundColor: '#55E0FF' }}
                aria-label="Étape suivante"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </button>

              {/* Indicateurs de pagination */}
              <div className="flex justify-center gap-3 mt-8">
                {etapes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index 
                        ? 'w-12 h-3' 
                        : 'w-3 h-3 hover:scale-125'
                    }`}
                    style={{ 
                      backgroundColor: currentSlide === index ? '#55E0FF' : '#D1D5DB'
                    }}
                    aria-label={`Aller à l'étape ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA après les 3 étapes */}
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 mb-6">
                Prêt à vendre votre bien dans les meilleures conditions ?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?service=vente" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discutons de votre projet
                </Link>
                <Link href="/estimer#formulaire" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-cyan-600 text-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-50">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Estimation offerte*
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos engagements - Grille de cartes */}
      <section className="py-12 bg-white engagement-section">
        <div className="w-full overflow-hidden">
          <div className="text-center mb-12 max-w-6xl mx-auto px-4">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Nos garanties
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos engagements <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>exclusifs</span>
            </h2>
            <p className="text-lg text-gray-600">
              Pour votre sérénité
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {engagements.map((engagement, index) => {
                const progress = cardProgress[index]
                const translateX = index % 2 === 0 
                  ? -150 + (progress * 150)  // Gauche: de -150px à 0px
                  : 150 - (progress * 150)   // Droite: de 150px à 0px
                const rotate = index % 2 === 0
                  ? -6 + (progress * 6)      // Gauche: de -6deg à 0deg
                  : 6 - (progress * 6)       // Droite: de 6deg à 0deg
                // Opacité rapide : atteint 1 quand progress est à 0.3
                const opacity = Math.min(1, progress * 3.3)
                
                return (
                  <div 
                    key={index} 
                    data-index={index}
                    className="engagement-card group relative overflow-hidden rounded-xl hover:shadow-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-6"
                    style={{ 
                      transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
                      opacity: opacity,
                      transition: 'none' // Pas de transition CSS, on suit le scroll directement
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#55E0FF' }}>
                        <engagement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{engagement.title}</h3>
                        <p className="text-sm text-gray-700 mb-1">{engagement.description}</p>
                        <p className="text-sm text-gray-600 italic">{engagement.detail}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-white border-2 border-cyan-600 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Mandat exclusif flexible (30 jours d'essai)</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Mandat résiliable à tout moment si engagements non respectés</strong>
                  </p>
                  <p className="text-gray-700 mb-3">
                    Essayez notre mandat exclusif sans engagement : vous pouvez le résilier à tout moment dans les 30 premiers jours.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Idéal pour tester notre efficacité sans contrainte.
                  </p>
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-900 font-semibold">
                      Grâce à notre mandat exclusif, vous bénéficiez de garanties contractuelles, rarement proposées à ce niveau d'engagement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services complémentaires avec fond image */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/95 to-teal-600/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Services <span className="font-['Playfair_Display'] italic">haut de gamme</span>
            </h2>
            <p className="text-lg mb-12 opacity-90">
              BBF met à votre disposition un écosystème complet
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Préparation et suivi des diagnostics',
                'Conseil en fiscalité, transmission, succession',
                'Solutions de relogement ou investissement',
                'Assistance administrative et notariale'
              ].map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <p className="text-lg font-semibold text-left">{service}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Expertise locale', icon: MapPin },
                { label: 'Communication premium', icon: MessageCircle },
                { label: 'Accompagnement humain', icon: Users },
                { label: 'Agence réactive', icon: Sparkles }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="estimation" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Discutons de votre projet de{' '}
              <AnimatedText 
                text="vente" 
                className="font-['Playfair_Display'] italic"
                style={{ color: '#41A09C' }}
                delay={300}
              />
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Vous avez un bien à vendre en Martinique ou dans les DROM ?<br />
              Contactez-nous pour un accompagnement à forte valeur ajoutée.
            </p>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl mb-8">
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                <a href="tel:+596596007420" className="flex items-center gap-2 text-gray-900 hover:text-cyan-600 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+596 596 00 74 20</span>
                </a>
                <a href="mailto:contact@bbf-immobilier.com" className="flex items-center gap-2 text-gray-900 hover:text-cyan-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">contact@bbf-immobilier.com</span>
                </a>
                <a href="https://www.bbf-immobilier.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-cyan-600 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">www.bbf-immobilier.com</span>
                </a>
              </div>
            </div>

            <Link
              href="/contact?service=vente"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Demander une estimation offerte*</span>
            </Link>
            
            <p className="text-xs text-gray-500 mt-4">
              *Estimation offerte en cas de signature d'un mandat de vente avec notre agence
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
