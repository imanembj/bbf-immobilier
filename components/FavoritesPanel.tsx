'use client'

import { useState } from 'react'
import { Heart, X, MapPin, Euro } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useFavorites } from '@/lib/favorites'

export default function FavoritesPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { favorites, removeFavorite, clearFavorites } = useFavorites()

  return (
    <>
      {/* Bouton flottant - Rectangle au milieu à droite */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 rounded-l-xl shadow-lg flex flex-col items-center justify-center gap-1 py-4 px-3 transition-all duration-300 hover:px-4"
        style={{ backgroundColor: '#D3CDB7' }}
        aria-label="Voir mes favoris"
      >
        <Heart className="w-6 h-6 text-white fill-white" />
        {favorites.length > 0 && (
          <span className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {favorites.length}
          </span>
        )}
        <span className="text-white text-[10px] font-bold tracking-wider" style={{ writingMode: 'vertical-rl' }}>
          FAVORIS
        </span>
      </button>

      {/* Panel latéral */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel - Plus petit, centré verticalement */}
          <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 w-[calc(100%-1rem)] md:w-96 max-h-[80vh] bg-white shadow-2xl z-50 flex flex-col animate-slideInRight rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between" style={{ backgroundColor: '#E6F7F7' }}>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6" style={{ color: '#41A09C' }} />
                <h2 className="text-xl font-bold text-gray-900">
                  Mes Favoris ({favorites.length})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun favori
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ajoutez des biens à vos favoris en cliquant sur le cœur
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-40">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeFavorite(property.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Euro className="w-4 h-4" style={{ color: '#41A09C' }} />
                            <span className="font-bold" style={{ color: '#41A09C' }}>
                              {property.price.toLocaleString('fr-FR')}€
                            </span>
                          </div>
                          <Link
                            href={`/biens/${property.id}`}
                            className="text-sm font-semibold hover:underline"
                            style={{ color: '#41A09C' }}
                          >
                            Voir →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={clearFavorites}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Tout supprimer
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translate(100%, -50%);
            opacity: 0;
          }
          to {
            transform: translate(0, -50%);
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
