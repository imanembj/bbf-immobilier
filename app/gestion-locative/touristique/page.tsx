'use client'

import { Palmtree, CheckCircle, X, Star, Camera, MessageCircle, Home as HomeIcon, Wrench, Mail, Phone, ArrowRight, Sparkles, Shield, Euro } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatedText, AnimatedSection } from '@/components/animations'

export default function GestionTouristiquePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const packSerenite = [
    "Communication digitale ciblée (annonces optimisées, photos professionnelles)",
    "Réponses aux voyageurs 7j/7 (avant, pendant et après le séjour)",
    "Accueil des vacanciers & pot de bienvenue",
    "Check-in / check-out & vérification du logement",
    "Ménage professionnel entre chaque séjour",
    "Réapprovisionnement en produits de première nécessité",
    "Fourniture & gestion du linge de maison",
    "Astreinte 24h/24 en cas d'imprévu",
    "Coordination des prestataires (piscine, jardin, climatisation, etc.)"
  ]

  const packVisibilite = [
    "Création & diffusion d'annonces performantes",
    "Gestion des plateformes de réservation (Airbnb, Booking, etc.)",
    "Réponses aux voyageurs & assistance à la réservation",
    "Location & livraison du linge de maison",
    "Astreinte en cas d'urgence locative"
  ]

  const packLiberte = [
    "Création & gestion d'annonces",
    "Shooting photo immobilier",
    "Ménage ponctuel (à partir de 45 €)",
    "Accueil simple ou premium",
    "Livraison & location de linge",
    "Visites de contrôle pendant votre absence",
    "Suivi ponctuel des interventions"
  ]

  const prestataires = [
    "Jardinier",
    "Entretien piscine",
    "Climatisation / dépannage",
    "Électricité",
    "Plomberie",
    "Rénovation BTP",
    "Nettoyage en profondeur"
  ]

  const linge = [
    { article: "Drap", tarif: "0,48 €" },
    { article: "Taie d'oreiller", tarif: "0,50 €" },
    { article: "Serviette de bain", tarif: "0,25 €" },
    { article: "Tapis de bain", tarif: "0,30 €" },
    { article: "Kit complet lit double", tarif: "2,50 € / séjour" },
    { article: "Kit complet lit simple", tarif: "1,50 € / séjour" }
  ]

  const packs = [
    {
      name: "Pack Sérénité",
      price: "À partir de 25% TTC",
      subtitle: "du revenu locatif",
      description: "Pour les propriétaires qui souhaitent une tranquillité totale",
      color: "from-teal-500 to-teal-600",
      icon: Sparkles,
      popular: true
    },
    {
      name: "Pack Visibilité",
      price: "À partir de 15% TTC",
      subtitle: "du revenu locatif",
      description: "Vous gérez l'opérationnel, nous vous apportons la clientèle",
      color: "from-cyan-500 to-cyan-600",
      icon: Camera
    },
    {
      name: "Pack Liberté",
      price: "Sur devis",
      subtitle: "Services à la carte",
      description: "Composez votre offre sur-mesure selon vos besoins",
      color: "from-teal-600 to-cyan-700",
      icon: Star
    }
  ]

  // Tableau comparatif des services
  const services: Array<{name: string; serenite: boolean | 'option'; visibilite: boolean | 'option'; liberte: boolean | 'option'}> = [
    { name: "Création & diffusion d'annonces", serenite: true, visibilite: true, liberte: true },
    { name: "Photos professionnelles", serenite: true, visibilite: false, liberte: "option" },
    { name: "Gestion des plateformes (Airbnb, Booking...)", serenite: true, visibilite: true, liberte: "option" },
    { name: "Réponses aux voyageurs 7j/7", serenite: true, visibilite: true, liberte: false },
    { name: "Accueil des vacanciers", serenite: true, visibilite: false, liberte: "option" },
    { name: "Check-in / Check-out", serenite: true, visibilite: false, liberte: "option" },
    { name: "Ménage entre chaque séjour", serenite: true, visibilite: false, liberte: "option" },
    { name: "Fourniture & gestion du linge", serenite: true, visibilite: true, liberte: "option" },
    { name: "Réapprovisionnement produits", serenite: true, visibilite: false, liberte: false },
    { name: "Astreinte 24h/24", serenite: true, visibilite: true, liberte: false },
    { name: "Coordination prestataires", serenite: true, visibilite: false, liberte: "option" },
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
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Rentabilisez votre bien,{' '}
            <AnimatedText 
              text={['sans', 'contrainte']} 
              type="sequential"
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
              staggerDelay={200}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-medium">
            Bulle immobilière, Business & Foncier vous accompagne dans la gestion de votre location saisonnière <br className="hidden md:block" />
            en Martinique, avec des formules souples, personnalisables et orientées résultats.
          </p>
        </div>
      </section>

      {/* Nos packs - Cartes */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Palmtree className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Nos Formules</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>formules</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Choisissez le pack adapté à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {packs.map((pack, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden ${pack.popular ? 'ring-2 ring-cyan-500 transform scale-105' : ''} hover:shadow-2xl transition-all duration-300`}
                >
                  {pack.popular && (
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center py-2 font-semibold text-sm">
                      ⭐ RECOMMANDÉ
                    </div>
                  )}
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${pack.color} rounded-xl mb-4`}>
                      <pack.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pack.name}</h3>
                    <div className="text-3xl font-bold text-cyan-600 mb-1">{pack.price}</div>
                    <p className="text-sm text-gray-500 mb-4">{pack.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{pack.description}</p>
                  </div>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pack Sérénité détaillé */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Pack Complet</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden shadow-xl">
                <Image
                  src="/aerial-view-beautiful-beach-sea-with-coconut-palm-tree.jpg"
                  alt="Location saisonnière en Martinique - Pack Sérénité"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Pack Sérénité</h2>
                    <p className="text-teal-600 font-semibold">Pour les propriétaires qui souhaitent une tranquillité totale</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg">
                  Nous gérons l'intégralité de votre location de A à Z, avec rigueur et professionnalisme.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {packSerenite.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-medium text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-teal-600 text-white p-4 rounded-xl text-center">
                  <p className="text-xl font-bold">À partir de 25% TTC du revenu locatif</p>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pack Visibilité détaillé */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Camera className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Pack Visibilité</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-l-2xl lg:rounded-br-none shadow-xl border-2 border-cyan-200 order-2 lg:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Pack Visibilité</h2>
                    <p className="text-cyan-600 font-semibold">Vous gérez l'opérationnel, nous vous apportons la clientèle</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {packVisibilite.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-cyan-50 to-teal-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-medium text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-4 rounded-xl text-center">
                  <p className="text-xl font-bold">À partir de 15% TTC du revenu locatif</p>
                </div>
              </div>
              <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-2xl lg:rounded-r-2xl lg:rounded-tl-none overflow-hidden shadow-xl order-1 lg:order-2">
                <Image
                  src="/colorful-beach-with-coconut-tree-blue-sky-st-john-virgin-island.jpg"
                  alt="Gestion visibilité location touristique Martinique"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pack Liberté détaillé */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Star className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Pack Sur-Mesure</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden shadow-xl">
                <Image
                  src="/mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg"
                  alt="Pack Liberté - Services à la carte Martinique"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-teal-600 to-cyan-700 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Pack Liberté</h2>
                    <p className="text-cyan-100 font-semibold">Composez votre offre sur-mesure selon vos besoins</p>
                  </div>
                </div>

                <p className="text-cyan-50 mb-6 text-lg">
                  Services à la carte (tarifs sur devis) - Idéal pour les propriétaires présents ou semi-autonomes
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {packLiberte.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                      <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <p className="font-medium text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30">
                  <p className="text-xl font-bold">Tarifs sur devis personnalisé</p>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pack Maintenance */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Wrench className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Services techniques</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pack Maintenance & <span className="font-['Playfair_Display'] italic text-teal-600">Services Techniques</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Trouvez rapidement les bons prestataires avec BBF
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Coordination sur demande :</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {prestataires.map((prestataire, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{prestataire}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-xl">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Interventions ponctuelles ou contrats d'entretien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Devis rapide – partenaires locaux de confiance</span>
                  </li>
                </ul>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Location de linge */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Location de <span className="font-['Playfair_Display'] italic text-cyan-600">Linge de Maison</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Ne gérez plus l'entretien du linge, déléguez-le.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Article</th>
                      <th className="px-6 py-4 text-right font-semibold">Tarif / jour</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {linge.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-cyan-50 transition-colors">
                        <td className="px-6 py-4 text-gray-700 font-medium">{item.article}</td>
                        <td className="px-6 py-4 text-right text-teal-600 font-bold">{item.tarif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Linge livré propre, récupéré après usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Option livraison incluse selon la zone</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tableau <span className="font-['Playfair_Display'] italic text-teal-600">comparatif</span> des packs
              </h2>
              <p className="text-gray-600 text-lg">
                Choisissez la formule adaptée à vos besoins
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4 md:p-8">
              <div className="relative w-full">
                <Image
                  src="/unnamed-2.jpg"
                  alt="Tableau comparatif des packs de gestion touristique"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-8 text-white" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
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
