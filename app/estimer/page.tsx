'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calculator, Home, MapPin, Ruler, Bed, Bath, Calendar, Mail, Phone as PhoneIcon, User, CheckCircle, TrendingUp, Shield, Award, Building, Store, Palmtree, Clock, Target } from 'lucide-react'
import toast from 'react-hot-toast'
import { AnimatedText, AnimatedSection } from '@/components/animations'
import { EstimationForm } from '@/components/forms'

export default function EstimerPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isStepsVisible, setIsStepsVisible] = useState(false)
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  
  const stepsRef = useRef<HTMLDivElement>(null)
  const advantagesRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

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
      setIsStepsVisible(true)
      setIsAdvantagesVisible(true)
      setIsFormVisible(true)
      return
    }

    // Sur desktop, utiliser les observers pour les animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    }

    const stepsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsStepsVisible(true)
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

    const formObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsFormVisible(true)
        }
      })
    }, observerOptions)

    if (stepsRef.current) stepsObserver.observe(stepsRef.current)
    if (advantagesRef.current) advantagesObserver.observe(advantagesRef.current)
    if (formRef.current) formObserver.observe(formRef.current)

    return () => {
      stepsObserver.disconnect()
      advantagesObserver.disconnect()
      formObserver.disconnect()
    }
  }, [isMobile])

  const avantages = [
    {
      icon: Award,
      title: 'Expertise locale',
      description: 'Connaissance fine du marché martiniquais, commune par commune',
    },
    {
      icon: Shield,
      title: 'Zéro stress',
      description: 'Nous gérons tout, de la prise de photos à la signature chez le notaire',
    },
    {
      icon: TrendingUp,
      title: 'Mise en valeur du bien',
      description: 'Photos HD, plans, visites ciblées, publication multi-support',
    },
    {
      icon: Target,
      title: 'Réseau actif d\'acheteurs',
      description: 'Primo-accédants, investisseurs, professionnels',
    },
    {
      icon: Clock,
      title: 'Estimation fiable et rapide',
      description: 'Basée sur les données réelles du terrain',
    },
  ]

  const typesBiens = [
    {
      icon: Home,
      title: 'Maison',
      description: 'Villa créole, maison de ville ou propriété avec vue mer : chaque estimation prend en compte la surface, l\'état, l\'emplacement, le jardin, la piscine ou la vue',
    },
    {
      icon: Building,
      title: 'Appartement',
      description: 'Du studio au T5, nous analysons balcon, ascenseur, parking, charges de copropriété, exposition et état des parties communes',
    },
    {
      icon: Palmtree,
      title: 'Location saisonnière',
      description: 'Évaluation de la rentabilité saisonnière, niveau d\'équipement, localisation par rapport aux plages et sites touristiques',
    },
    {
      icon: Store,
      title: 'Locaux commerciaux',
      description: 'Analyse de la visibilité, accessibilité, surface exploitable, fréquentation de la zone et potentiel d\'activité',
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
              backgroundImage: 'url(/pexels-energepic-com-27411-313691.jpg)',
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
            Estimer son bien avec{' '}
            <AnimatedText 
              text="B.B.F" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Que vous vendiez une maison, un terrain, un appartement ou un local en Martinique,<br className="hidden md:block" /> notre équipe vous accompagne à chaque étape, avec sérieux, méthode et transparence
          </p>
        </div>
      </section>

      {/* Pourquoi estimer avant de vendre */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isStepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Estimation offerte*
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi estimer <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>avant de vendre ?</span>
            </h2>
            
            <p className="text-gray-600 mb-8 text-center text-lg">
              Une estimation fiable vous permet de fixer un prix cohérent avec le marché et d'augmenter vos chances de vendre rapidement.
            </p>

            {/* Les bénéfices - Cartes */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { icon: Target, text: 'Prix juste dès le départ' },
                { icon: TrendingUp, text: 'Attirer les bons acheteurs' },
                { icon: Clock, text: 'Vendre plus rapidement' },
                { icon: Shield, text: 'Éviter les mauvaises surprises' },
                { icon: CheckCircle, text: 'Négocier en confiance' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl text-center hover:shadow-lg opacity-100 translate-y-0 md:transition-all md:duration-700 ${!isStepsVisible ? 'md:opacity-0 md:translate-y-10' : ''}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#55E0FF' }}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-12">
              <Link href="#formulaire" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                <Calculator className="w-5 h-5 mr-2" />
                Obtenir mon estimation offerte*
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contenu gauche */}
              <div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <span className="text-red-600 font-bold text-xl">↑</span>
                    <div>
                      <div className="font-bold text-gray-900">Prix trop élevé</div>
                      <div className="text-sm text-gray-600">Bien ignoré, visites découragées</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <span className="text-orange-600 font-bold text-xl">↓</span>
                    <div>
                      <div className="font-bold text-gray-900">Prix trop bas</div>
                      <div className="text-sm text-gray-600">Soupçons, perte d'argent</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Notre méthode d'estimation :</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#41A09C' }} />
                      <span className="font-medium text-sm">Marché local</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#41A09C' }} />
                      <span className="font-medium text-sm">État du bien</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#41A09C' }} />
                      <span className="font-medium text-sm">Demande réelle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#41A09C' }} />
                      <span className="font-medium text-sm">Évolution prix</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image droite */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[330px]">
                <img
                  src="/pexels-karola-g-6032824.jpg"
                  alt="Estimation immobilière"
                  className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi faire estimer avec nous */}
      <section ref={advantagesRef} className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isAdvantagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Nos avantages
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Pourquoi faire estimer <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>avec nous ?</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Colonne gauche - Avantages */}
              <div className="space-y-4">
                {avantages.map((avantage, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md opacity-100 translate-x-0 md:transition-all md:duration-700 ${!isAdvantagesVisible ? 'md:opacity-0 md:-translate-x-10' : ''}`}
                    style={{ transitionDelay: `${index * 250}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#55E0FF' }}>
                      <avantage.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{avantage.title}</h3>
                      <p className="text-sm text-gray-600">{avantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Colonne droite - Infos pratiques */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-3xl font-bold" style={{ color: '#41A09C' }}>0€</div>
                    <div className="text-xs text-gray-600 mt-1">Frais</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-3xl font-bold" style={{ color: '#41A09C' }}>24h</div>
                    <div className="text-xs text-gray-600 mt-1">Réponse</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8" style={{ color: '#41A09C' }} />
                    <div>
                      <div className="font-bold text-gray-900">Sans engagement</div>
                      <div className="text-sm text-gray-600">100% confidentiel</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link href="#formulaire" className="inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                      <Calculator className="w-4 h-4 mr-1" />
                      Formulaire
                    </Link>
                    <Link href="tel:+596696123456" className="inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg bg-white" style={{ color: '#41A09C', border: '2px solid #41A09C' }}>
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      Appeler
                    </Link>
                  </div>
                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-gray-600 mb-3">Prêt à connaître la valeur de votre bien ?</p>
                    <Link href="#formulaire" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg w-full" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                      <Calculator className="w-4 h-4 mr-2" />
                      Demander mon estimation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pêle-mêle de photos */}
      <section className="pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073"
                  alt="Maison moderne"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
                  alt="Villa avec jardin"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
                  alt="Appartement vue mer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070"
                  alt="Propriété de luxe"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de biens - Version compacte */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                Tous types de biens
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Quels types de biens <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>estimons-nous ?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {typesBiens.map((type, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 opacity-100 translate-y-0 md:transition-all md:duration-700 ${!isStepsVisible ? 'md:opacity-0 md:translate-y-10' : ''}`}
                  style={{ transitionDelay: `${(index + 5) * 200}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#55E0FF' }}>
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{type.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* L'expertise sur place - Version compacte */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                  Visite personnalisée
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                L'expertise <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>sur place</span>
              </h3>
              <p className="text-center text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
                Les outils en ligne donnent une idée générale, mais seule une visite permet une estimation précise et fiable
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: Home, title: 'État réel du bien' },
                  { icon: MapPin, title: 'Environnement immédiat' },
                  { icon: Building, title: 'Ambiance du quartier' },
                  { icon: TrendingUp, title: 'Potentiel de valorisation' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#55E0FF' }}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-base font-medium text-gray-700 mb-6">
                  ✓ Une valeur objective, justifiée et adaptée au marché martiniquais
                </p>
                <Link href="#formulaire" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#55E0FF', color: 'white' }}>
                  <Calculator className="w-5 h-5 mr-2" />
                  Commencer mon estimation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'estimation */}
      <section ref={formRef} id="formulaire" className="pt-12 pb-20 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
                  Formulaire en ligne
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Demande d'estimation <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>en ligne</span>
              </h2>
              <p className="text-lg text-gray-600">
                Remplissez notre formulaire en quelques clics
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <EstimationForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              <AnimatedText 
                text="Prêt à connaître la valeur de votre bien ?" 
                delay={300}
              />
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessus ou contactez-nous directement
            </p>
            <Link href="#formulaire" className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" style={{ color: '#41A09C' }}>
              <Calculator className="w-5 h-5 mr-2" />
              Demander mon estimation
            </Link>
            <p className="text-xs text-white/80 mt-4">
              *Estimation offerte en cas de signature d'un mandat de vente avec notre agence
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
