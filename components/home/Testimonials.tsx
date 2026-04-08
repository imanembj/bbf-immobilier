'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import { getStore } from '@/lib/store'
import type { Review } from '@/lib/data'

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les avis approuvés depuis Supabase
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const store = getStore()
        const allReviews = store.getReviews()
        // Prendre les 8 meilleurs avis (rating >= 4)
        const topReviews = allReviews
          .filter(review => review.rating >= 4)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8)
        setReviews(topReviews)
      } catch (error) {
        console.error('Erreur chargement avis:', error)
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  }, [])

  // Avis par défaut si aucun avis en base
  const defaultTestimonials = [
    {
      clientName: 'Sophie Martin',
      rating: 5,
      comment: 'Arielle et son équipe ont géré la location de mon appartement avec un professionnalisme remarquable. Je recommande vivement leurs services !',
      createdAt: '2024-02-15',
    },
    {
      clientName: 'Thomas Dubois',
      rating: 5,
      comment: 'Recherche de logement facilitée grâce à leur plateforme intuitive. J\'ai trouvé mon appartement idéal en moins d\'une semaine !',
      createdAt: '2024-03-10',
    },
  ]

  const testimonials = reviews.length > 0 ? reviews : defaultTestimonials

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-8 text-center max-w-5xl mx-auto px-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos <span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>clients</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Découvrez les expériences de ceux qui nous ont fait confiance
          </p>
        </div>

        {/* Infinite Scrolling Testimonials */}
        <div className="space-y-8 overflow-hidden pb-4">
          {/* First Row - Scroll Right */}
          <div className="relative hover-pause-row">
            <div className="flex gap-6 animate-scroll-right">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md border border-gray-100 relative flex-shrink-0 w-[400px]"
                >
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-12 h-12 text-cyan-600" />
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 relative z-10 text-sm">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {testimonial.clientName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.clientName}</h4>
                      <p className="text-xs text-gray-600">{new Date(testimonial.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scroll Left */}
          <div className="relative hover-pause-row">
            <div className="flex gap-6 animate-scroll-left">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md border border-gray-100 relative flex-shrink-0 w-[400px]"
                >
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-12 h-12 text-cyan-600" />
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 relative z-10 text-sm">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {testimonial.clientName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.clientName}</h4>
                      <p className="text-xs text-gray-600">{new Date(testimonial.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-left {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-scroll-right {
            animation: scroll-right 35s linear infinite;
          }
          
          .animate-scroll-left {
            animation: scroll-left 35s linear infinite;
          }
          
          .hover-pause-row:hover .animate-scroll-right,
          .hover-pause-row:hover .animate-scroll-left {
            animation-play-state: paused;
          }
        `}</style>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-7xl mx-auto px-4">
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: '#41A09C' }}>4.9/5</div>
            <div className="text-gray-600">Note Moyenne</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: '#41A09C' }}>1200+</div>
            <div className="text-gray-600">Avis Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: '#41A09C' }}>98%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: '#41A09C' }}>100%</div>
            <div className="text-gray-600">Recommandations</div>
          </div>
        </div>
      </div>
    </section>
  )
}
