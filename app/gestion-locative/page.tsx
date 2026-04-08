'use client'

import { Shield, CheckCircle, Home, Palmtree, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AnimatedText, AnimatedSection } from '@/components/animations'

export default function GestionLocativePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const conformiteLois = [
    {
      title: "Loi du 6 juillet 1989",
      description: "Régissant les relations bailleur/locataire (durée du bail, dépôt de garantie, congés, etc.)"
    },
    {
      title: "Loi ALUR",
      description: "Diagnostics, encadrement des loyers, conformité des baux"
    },
    {
      title: "Déclarations fiscales",
      description: "Liées à vos revenus locatifs"
    }
  ]

  const missions = [
    "Estimation du loyer selon le marché local",
    "Diffusion d'annonce et organisation des visites",
    "Sélection rigoureuse des candidats",
    "Rédaction du bail et état des lieux",
    "Encaissement des loyers et charges",
    "Suivi des travaux et de l'entretien",
    "Gestion des relations avec les locataires (réclamations, relances)"
  ]

  const avantages = [
    "Un accompagnement local et personnalisé",
    "Une réactivité constante avec vos locataires",
    "Des comptes rendus clairs et réguliers",
    "Une tranquillité d'esprit totale pour le propriétaire"
  ]

  const prestationsTouristiques = [
    "Création d'annonces professionnelles sur Airbnb, Booking, etc.",
    "Séances photo et vidéos immersives",
    "Accueil chaleureux des voyageurs (check-in & check-out)",
    "Ménage, linge de maison, entretien, blanchisserie",
    "Optimisation du taux d'occupation",
    "Ajustement dynamique des tarifs selon la saison"
  ]

  return (
    <div className="min-h-screen bg-white">
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
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#55E0FF' }} />
            <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            La gestion locative avec{' '}
            <AnimatedText 
              text="BBF" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Louer un bien à l'année peut vite devenir complexe : obligations légales, suivi administratif, relations avec les locataires, entretien, impayés…
          </p>
        </div>
      </section>

      {/* Conformité légale */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Conformité & Sécurité</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Une gestion <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>conforme à la loi</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous veillons scrupuleusement au respect des obligations légales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conformiteLois.map((loi, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4"
                  style={{ borderColor: '#55E0FF' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                    <h3 className="font-bold text-gray-900 text-lg">{loi.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{loi.description}</p>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos missions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos missions en <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>gestion locative</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
              {missions.map((mission, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-100"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#55E0FF' }} />
                  <p className="text-gray-700 font-medium text-sm">{mission}</p>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pourquoi BBF */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Pourquoi confier votre bien à <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>B.B.F</span> ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {avantages.map((avantage, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                  <p className="text-gray-700 font-medium text-lg">{avantage}</p>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Prestations touristiques */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Palmtree className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Location saisonnière</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prestations <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>touristiques</span>
              </h2>
              <p className="text-xl text-gray-700 font-semibold mb-2">
                Optimisez vos revenus en courte durée
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                BBF IMMOBILIÈRE, c'est aussi un service spécialisé dans la location saisonnière en Martinique, pour valoriser vos villas, appartements ou logements touristiques.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos prestations clés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prestationsTouristiques.map((prestation, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                    <p className="text-gray-700 font-medium">{prestation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border-2" style={{ borderColor: '#41A09C' }}>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Notre objectif</h3>
              <p className="text-lg text-gray-700">
                Maximiser votre rentabilité tout en garantissant une expérience <span className="font-bold" style={{ color: '#41A09C' }}>5 étoiles</span> à vos voyageurs.
              </p>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos offres */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choisissez votre <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>formule</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Que vous souhaitiez louer votre bien en courte durée ou à l'année
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gestion annuelle */}
              <Link href="/gestion-locative/annuelle" className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent h-full" style={{ borderColor: 'transparent' }}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#55E0FF' }}>
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion Locative Annuelle</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Confiez votre bien en toute sérénité avec notre service complet de gestion locative à l'année.
                  </p>
                  <div className="flex items-center font-semibold group-hover:gap-3 gap-2 transition-all" style={{ color: '#55E0FF' }}>
                    <span>Découvrir nos formules</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#55E0FF' }} />
                  </div>
                </div>
              </Link>

              {/* Gestion touristique */}
              <Link href="/gestion-locative/touristique" className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#55E0FF' }}>
                    <Palmtree className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion Locative Touristique</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Rentabilisez votre bien sans contrainte avec nos packs de location saisonnière sur-mesure.
                  </p>
                  <div className="flex items-center font-semibold group-hover:gap-3 gap-2 transition-all" style={{ color: '#55E0FF' }}>
                    <span>Découvrir nos packs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#55E0FF' }} />
                  </div>
                </div>
              </Link>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-12 text-white" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Un projet ?{' '}
              <AnimatedText 
                text="Parlons-en." 
                className="font-['Playfair_Display'] italic"
                delay={300}
              />
            </h2>
            <p className="text-lg mb-10 text-white/90">
              Que vous souhaitiez louer votre bien en courte durée, créer une activité touristique, ou externaliser toute la gestion, notre équipe vous accompagne de A à Z.
            </p>

            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              style={{ color: '#41A09C' }}
            >
              Nous contacter
              <ArrowRight className="w-5 h-5" style={{ color: '#41A09C' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
