'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    // const consent = localStorage.getItem('cookieConsent')
    // if (!consent) {
      // Afficher après 1 seconde pour ne pas être trop intrusif
      setTimeout(() => setIsVisible(true), 1000)
    // }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Bouton rond flottant (toujours visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
        style={{ backgroundColor: '#55E0FF', bottom: '31px', left: '31px' }}
        aria-label="Paramètres de cookies"
      >
        <Cookie className="w-8 h-8 text-white" />
      </button>

      {/* Pop-up (s'ouvre au-dessus du bouton) */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 max-w-[calc(100vw-3rem)] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 overflow-hidden" style={{ borderColor: '#41A09C' }}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}>
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-white" />
                <h3 className="text-white font-bold text-sm">Cookies & confidentialité</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site et analyser notre trafic.
              </p>
              
              <Link 
                href="/politique-confidentialite" 
                className="text-xs font-semibold hover:underline mb-4 inline-block"
                style={{ color: '#41A09C' }}
                onClick={() => setIsOpen(false)}
              >
                En savoir plus sur notre politique de confidentialité →
              </Link>

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={handleAccept}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #41A09C 0%, #55E0FF 100%)' }}
                >
                  Accepter
                </button>
                <button
                  onClick={handleRefuse}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
