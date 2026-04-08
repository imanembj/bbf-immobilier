'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, User, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBiensDropdownOpen, setIsBiensDropdownOpen] = useState(false)
  const [isGestionDropdownOpen, setIsGestionDropdownOpen] = useState(false)
  const [biensCloseTimeout, setBiensCloseTimeout] = useState<NodeJS.Timeout | null>(null)
  const [gestionCloseTimeout, setGestionCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBiensMouseEnter = () => {
    if (biensCloseTimeout) {
      clearTimeout(biensCloseTimeout)
      setBiensCloseTimeout(null)
    }
    setIsBiensDropdownOpen(true)
  }

  const handleBiensMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsBiensDropdownOpen(false)
    }, 200)
    setBiensCloseTimeout(timeout)
  }

  const handleGestionMouseEnter = () => {
    if (gestionCloseTimeout) {
      clearTimeout(gestionCloseTimeout)
      setGestionCloseTimeout(null)
    }
    setIsGestionDropdownOpen(true)
  }

  const handleGestionMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsGestionDropdownOpen(false)
    }, 200)
    setGestionCloseTimeout(timeout)
  }

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/a-propos' },
  ]
  
  const navigationAfterBiens = [
    { name: 'Vendre', href: '/vendre' },
    { name: 'Estimer', href: '/estimer' },
  ]
  
  const navigationAfterGestion = [
    { name: 'Nos partenaires', href: '/nos-partenaires' },
    { name: 'Blog', href: '/blog' },
  ]

  const biensSubMenu = [
    { name: 'Acheter', href: '/acheter' },
    { name: 'Location longue durée', href: '/location-annuelle' },
    { name: 'Location saisonnière', href: '/location-saisonniere' },
  ]

  const gestionSubMenu = [
    { name: 'Gestion annuelle', href: '/gestion-locative/annuelle' },
    { name: 'Gestion touristique', href: '/gestion-locative/touristique' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'py-0 px-0' : 'py-4 px-4 md:px-6'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 py-3 shadow-sm transition-all duration-300 ${
        isScrolled ? 'max-w-full rounded-none' : 'max-w-[1600px] rounded-2xl'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo Simple et Élégant */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  BBF
                </h1>
                <p className="text-xs text-gray-600">Bulle immobilière, Business & Foncier</p>
              </div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Accueil */}
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Accueil
            </Link>
            
            {/* À propos */}
            <Link
              href="/a-propos"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              À propos
            </Link>
            
            {/* Dropdown Nos biens */}
            <div 
              className="relative"
              onMouseEnter={handleBiensMouseEnter}
              onMouseLeave={handleBiensMouseLeave}
            >
              <Link href="/biens" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                Nos biens
                <ChevronDown className={`w-4 h-4 transition-transform ${isBiensDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              <div className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-[200] transition-opacity duration-100 ${isBiensDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {biensSubMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Vendre */}
            <Link
              href="/vendre"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Vendre
            </Link>
            
            {/* Estimer */}
            <Link
              href="/estimer"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Estimer
            </Link>

            {/* Dropdown Gestion Locative */}
            <div 
              className="relative"
              onMouseEnter={handleGestionMouseEnter}
              onMouseLeave={handleGestionMouseLeave}
            >
              <Link href="/gestion-locative" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                Gestion Locative
                <ChevronDown className={`w-4 h-4 transition-transform ${isGestionDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              <div className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-[200] transition-opacity duration-100 ${isGestionDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {gestionSubMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Nos partenaires */}
            <Link
              href="/nos-partenaires"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Nos partenaires
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Boutons CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admin"
              className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-1.5 px-5 py-2 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all hover:opacity-90"
              style={{ backgroundColor: '#55E0FF' }}
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 bg-white relative z-[110]">
            <nav className="flex flex-col space-y-1">
              {/* Accueil et À propos */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Nos biens avec sous-menu mobile */}
              <div>
                <Link
                  href="/biens"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsBiensDropdownOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Nos biens</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsBiensDropdownOpen(!isBiensDropdownOpen)
                    }}
                    className="p-1"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isBiensDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </Link>
                {isBiensDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {biensSubMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Vendre et Estimer */}
              {navigationAfterBiens.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* Gestion Locative avec sous-menu mobile */}
              <div>
                <Link
                  href="/gestion-locative"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsGestionDropdownOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>Gestion Locative</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsGestionDropdownOpen(!isGestionDropdownOpen)
                    }}
                    className="p-1"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isGestionDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </Link>
                {isGestionDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {gestionSubMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Nos partenaires */}
              {navigationAfterGestion.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 text-white text-sm font-semibold rounded-lg shadow-sm mt-2"
                style={{ backgroundColor: '#55E0FF' }}
              >
                <Phone className="w-4 h-4" />
                <span>Nous contacter</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
