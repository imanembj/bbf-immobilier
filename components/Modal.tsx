'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ children, onClose, title, size = 'lg' }: ModalProps) {
  useEffect(() => {
    // Bloquer le scroll du body quand la modal est ouverte
    document.body.style.overflow = 'hidden'
    
    // Fermer avec la touche Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl ${sizeClasses[size]} w-full max-h-[75vh] overflow-hidden shadow-2xl animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Close button sans titre */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(75vh-80px)] p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
