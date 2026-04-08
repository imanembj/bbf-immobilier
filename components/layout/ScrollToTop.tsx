'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Afficher le bouton quand on scroll vers le bas
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-50 group"
          aria-label="Retour en haut"
        >
          {/* Bouton principal */}
          <div className="relative text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ backgroundColor: '#55E0FF' }}>
            <ArrowUp className="w-7 h-7" strokeWidth={2.5} />
          </div>

          {/* Tooltip au survol */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
              <p className="text-sm font-semibold">Retour en haut</p>
            </div>
            {/* Flèche */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
            </div>
          </div>
        </button>
      )}
    </>
  )
}
