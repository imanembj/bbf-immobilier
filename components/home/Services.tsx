'use client'

import Link from 'next/link'
import { Home, Calendar, Key, TrendingUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLAnchorElement)
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards(prev => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleCards])

  const services = [
    {
      icon: Home,
      title: 'Vente de biens',
      description: 'Achetez ou vendez votre bien immobilier en Martinique avec notre expertise du marché local.',
      features: ['Estimation offerte*', 'Visites organisées', 'Accompagnement juridique'],
      link: '/vendre',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      size: 'big-left',
    },
    {
      icon: Home,
      title: 'Nos biens',
      description: 'Découvrez notre sélection de biens immobiliers en Martinique : maisons, appartements, terrains.',
      features: ['Vente', 'Location longue durée', 'Location saisonnière'],
      link: '/biens',
      color: 'from-teal-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      size: 'small-top',
    },
    {
      icon: Key,
      title: 'Gestion locative',
      description: 'Confiez-nous la gestion complète de votre bien en Martinique en toute sérénité.',
      features: ['Gestion administrative', 'Entretien du bien', 'Suivi locataires'],
      link: '/gestion-locative',
      color: 'from-amber-500 to-orange-600',
      image: 'https://images.pexels.com/photos/313691/pexels-photo-313691.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: 'small-bottom',
    },
    {
      icon: Calendar,
      title: 'Location saisonnière',
      description: 'Des biens d\'exception en Martinique pour vos vacances ou séjours courts avec réservation simplifiée.',
      features: ['Calendrier en temps réel', 'Réservation instantanée', 'Conciergerie'],
      link: '/location-saisonniere',
      color: 'from-cyan-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1632656837847-9ce6c4849bc0?w=1600&q=95',
      size: 'wide',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
              Nos services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl">
              Des solutions pour tous<br /><span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>vos besoins</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-gray-600 leading-relaxed">
              De la recherche de votre bien idéal à la gestion de votre patrimoine, nous vous accompagnons à chaque étape. Notre expertise locale du marché martiniquais garantit un service personnalisé et des solutions adaptées à vos besoins.
            </p>
          </div>
        </div>

        {/* Services Grid - Custom Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2 md:-mx-4 lg:-mx-20">
          {/* Grosse photo à gauche (row-span-2) */}
          <Link
            ref={el => { cardRefs.current[0] = el }}
            href={services[0].link}
            className={`group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-1000 ease-out md:row-span-2 h-[300px] md:h-auto ${
              visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="absolute inset-0">
              <img 
                src={services[0].image} 
                alt={services[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-white">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                <Home className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                {services[0].title}
              </h3>
              <div className="flex items-center font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Découvrir</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Petite photo en haut à droite */}
          <Link
            ref={el => { cardRefs.current[1] = el }}
            href={services[1].link}
            className={`group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-1000 ease-out h-[300px] md:h-auto ${
              visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute inset-0">
              <img 
                src={services[1].image} 
                alt={services[1].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                <Calendar className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                {services[1].title}
              </h3>
              <div className="flex items-center font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Découvrir</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Petite photo en bas à droite */}
          <Link
            ref={el => { cardRefs.current[2] = el }}
            href={services[2].link}
            className={`group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-1000 ease-out h-[300px] md:h-auto ${
              visibleCards.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="absolute inset-0">
              <img 
                src={services[2].image} 
                alt={services[2].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                <Key className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                {services[2].title}
              </h3>
              <div className="flex items-center font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Découvrir</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Photo large en bas (col-span-2) */}
          <Link
            ref={el => { cardRefs.current[3] = el }}
            href={services[3].link}
            className={`group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-1000 ease-out md:col-span-2 h-[300px] md:h-auto ${
              visibleCards.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="absolute inset-0">
              <img 
                src={services[3].image} 
                alt={services[3].title}
                className="w-full h-full object-cover object-[center_80%] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                {services[3].title}
              </h3>
              <div className="flex items-center font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Découvrir</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-2xl md:-mx-4 lg:-mx-20">
          {/* Bloc de contenu */}
          <div className="relative overflow-hidden" style={{ backgroundColor: '#D3CDB7' }}>
            <div className="relative z-10 p-8 md:p-12 text-gray-900 h-full flex flex-col justify-center">
              <div className="inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 w-fit text-gray-900">
                💬 Parlons de votre projet
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Besoin d'un conseil<br /><span className="font-['Playfair_Display'] italic font-bold">personnalisé <span className="font-['Playfair_Display'] italic">?</span></span>
              </h3>
              <p className="text-gray-800 leading-relaxed mb-8">
                Nos experts immobiliers sont à votre écoute pour vous accompagner dans la réalisation de votre projet en Martinique
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="group bg-white text-cyan-700 hover:bg-cyan-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Prendre Rendez-vous</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="tel:+596696123456" 
                  className="group bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Appeler Maintenant</span>
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-700">
                ⏰ Disponible du lundi au samedi, de 9h à 18h
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden min-h-full">
            <img 
              src="https://images.pexels.com/photos/7647384/pexels-photo-7647384.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=2" 
              alt="Couple avec clés de maison"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
