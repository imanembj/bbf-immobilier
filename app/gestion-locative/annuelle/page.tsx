'use client'

import { Shield, CheckCircle, Home, TrendingUp, FileText, Wrench, Users, Mail, Phone, ArrowRight, Euro } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatedText, AnimatedSection } from '@/components/animations'

export default function GestionAnnuellePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const objectifs = [
    { icon: TrendingUp, text: "Valoriser durablement votre patrimoine" },
    { icon: Euro, text: "Assurer la régularité des loyers" },
    { icon: Shield, text: "Protéger vos intérêts juridiques et financiers" },
    { icon: Users, text: "Vous représenter en toute transparence" }
  ]

  const miseEnLocation = [
    "Estimation du loyer au prix du marché",
    "Constitution du dossier locatif complet",
    "Photos professionnelles et diagnostics obligatoires",
    "Diffusion sur les plateformes partenaires",
    "Sélection rigoureuse des candidats",
    "Rédaction du bail et état des lieux d'entrée"
  ]

  const suiviAdministratif = [
    "Encaissement des loyers et charges",
    "Règlement au propriétaire chaque mois",
    "Gestion des dépôts de garantie",
    "Envoi des quittances et suivi des impayés",
    "Édition de votre bilan annuel pour la déclaration des revenus fonciers"
  ]

  const suiviTechnique = [
    "Gestion des sinistres, entretiens, travaux urgents",
    "Relais entre locataire et prestataires",
    "Coordination avec les assurances (multirisques, loyers impayés si souscrite)",
    "État des lieux de sortie"
  ]

  const avantages = [
    "Interlocuteur unique basé en Martinique",
    "Expérience du marché local et des réalités du terrain",
    "Réactivité et transparence",
    "Honoraires compétitifs, adaptés à votre bien et votre profil fiscal",
    "Service à la carte ou gestion complète selon vos besoins"
  ]

  const formules = [
    {
      name: "Formule Essentielle",
      price: "À partir de 5%",
      description: "Gestion comptable + quittancement",
      color: "from-teal-500 to-teal-600",
      features: [
        "Encaissement des loyers",
        "Envoi des quittances",
        "Règlement mensuel propriétaire",
        "Bilan annuel"
      ]
    },
    {
      name: "Formule Complète",
      price: "À partir de 7%",
      description: "Gestion administrative, locative, technique",
      color: "from-cyan-500 to-cyan-600",
      popular: true,
      features: [
        "Tout de la formule Essentielle",
        "Mise en location du bien",
        "Sélection des locataires",
        "Rédaction du bail",
        "États des lieux",
        "Gestion des travaux"
      ]
    },
    {
      name: "Formule Premium",
      price: "Sur devis",
      description: "Accompagnement fiscal, travaux, relocation prioritaire",
      color: "from-teal-600 to-cyan-700",
      features: [
        "Tout de la formule Complète",
        "Conseil fiscal personnalisé",
        "Coordination travaux",
        "Relocation prioritaire",
        "Suivi premium"
      ]
    }
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
            Confiez votre bien en toute{' '}
            <AnimatedText 
              text="sérénité" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-medium">
            Notre service de gestion locative à l'année vous libère des contraintes <br className="hidden md:block" />
            administratives, techniques et relationnelles liées à la mise en location de votre bien.
          </p>
        </div>
      </section>

      {/* Nos objectifs */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Gestion Annuelle</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>objectifs</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {objectifs.map((objectif, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl mb-4 mx-auto" style={{ backgroundColor: '#55E0FF' }}>
                    <objectif.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-gray-700 font-semibold leading-relaxed">{objectif.text}</p>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos missions principales */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Nos Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos missions <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>principales</span>
              </h2>
            </div>

            <div className="space-y-12">
              {/* Mise en location - Photo à gauche */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-gustavo-fring-7489091.jpg"
                    alt="Mise en location professionnelle"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mise en location</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {miseEnLocation.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suivi administratif - Photo à droite */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl lg:rounded-l-2xl lg:rounded-br-none shadow-lg border border-gray-100 order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Suivi administratif & comptable</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {suiviAdministratif.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-2xl lg:rounded-r-2xl lg:rounded-tl-none overflow-hidden shadow-xl order-1 lg:order-2">
                  <Image
                    src="/pexels-rdne-8293778.jpg"
                    alt="Suivi administratif et comptable"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Suivi technique - Photo à gauche */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="relative h-[250px] md:h-[300px] lg:h-auto rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden shadow-xl">
                  <Image
                    src="/pexels-energepic-com-27411-313691.jpg"
                    alt="Suivi technique et relationnel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Suivi technique & relationnel</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {suiviTechnique.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir BBF */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Nos Avantages</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Pourquoi choisir <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>BBF Immobilier</span> ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avantages.map((avantage, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                  <p className="text-gray-700 font-medium">{avantage}</p>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section photo avec texte */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pexels-kindelmedia-7579137.jpg"
                  alt="Gestion locative professionnelle en Martinique"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Une gestion <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>sur-mesure</span>
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Nous comprenons que chaque propriétaire a des besoins spécifiques. C'est pourquoi nous proposons des formules flexibles qui s'adaptent à votre situation et à vos objectifs patrimoniaux.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Que vous soyez résident en Martinique ou à distance, notre équipe locale assure un suivi rigoureux et transparent de votre bien immobilier.
                </p>
                <div className="flex items-start gap-3 bg-gradient-to-br from-cyan-50 to-teal-50 p-5 rounded-lg border-l-4" style={{ borderColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                  <p className="text-gray-800 font-medium">
                    <strong>Garantie de tranquillité :</strong> Nous gérons tous les aspects administratifs, techniques et relationnels pour que vous puissiez profiter sereinement de vos revenus locatifs.
                  </p>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos formules */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{ backgroundColor: '#D3CDB7' }}>
                <Euro className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Tarifs & Formules</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos formules de <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>gestion</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Choisissez la formule adaptée à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formules.map((formule, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden ${formule.popular ? 'ring-2 ring-cyan-500 transform scale-105' : ''} hover:shadow-2xl transition-all duration-300`}
                >
                  {formule.popular && (
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center py-2 font-semibold text-sm">
                      ⭐ PLUS POPULAIRE
                    </div>
                  )}
                  <div className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" style={{ backgroundColor: '#55E0FF' }}>
                      <Home className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{formule.name}</h3>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#41A09C' }}>{formule.price}</div>
                    <p className="text-gray-600 mb-6">{formule.description}</p>
                    
                    <div className="space-y-3">
                      {formule.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#55E0FF' }} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section photo Martinique */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-gray-900">
                  Experts du marché <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>martiniquais</span>
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Basés à Rivière-Pilote, nous connaissons parfaitement le marché immobilier local et ses spécificités. Notre expertise nous permet d'optimiser la rentabilité de votre bien tout en respectant la réglementation en vigueur.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                    <p className="text-gray-700 font-medium">Connaissance du marché local</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                    <p className="text-gray-700 font-medium">Réseau de prestataires fiables</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                    <p className="text-gray-700 font-medium">Réactivité garantie</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#55E0FF' }} />
                    <p className="text-gray-700 font-medium">Accompagnement personnalisé</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                <Image
                  src="/orythys-martinique-205112_1920.jpg"
                  alt="Martinique - Expertise locale en gestion immobilière"
                  fill
                  className="object-cover"
                />
              </div>
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
