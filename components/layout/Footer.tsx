'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Music, Youtube, Clock } from 'lucide-react'
import { getAgencyConfig, AgencyConfig } from '@/lib/agency-config'
import * as SupabaseStore from '@/lib/supabase-store'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [agencyConfig, setAgencyConfig] = useState<AgencyConfig>(getAgencyConfig())

  // Charger la config depuis Supabase
  useEffect(() => {
    const loadConfig = async () => {
      const settings = await SupabaseStore.getAgencySettings()
      if (settings) {
        setAgencyConfig(settings as any)
      }
    }
    
    loadConfig()

    // Écouter les changements de configuration
    const handleConfigUpdate = () => {
      loadConfig()
    }

    window.addEventListener('agency-config-updated', handleConfigUpdate)

    return () => {
      window.removeEventListener('agency-config-updated', handleConfigUpdate)
    }
  }, [])

  const footerLinks = {
    services: [
      { name: 'Vendre', href: '/vendre' },
      { name: 'Estimer', href: '/estimer' },
      { name: 'Nos biens', href: '/biens' },
      { name: 'Acheter', href: '/acheter' },
      { name: 'Locations annuelles', href: '/location-annuelle' },
      { name: 'Locations saisonnière', href: '/location-saisonniere' },
      { name: 'Gestion locative', href: '/gestion-locative' },
    ],
    company: [
      { name: 'À propos', href: '/a-propos' },
      { name: 'Nos partenaires', href: '/nos-partenaires' },
      { name: 'Témoignages', href: '/#temoignages' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { name: 'CGU', href: '/cgu' },
      { name: 'CGV', href: '/cgv' },
    ],
  }

  const socialLinks = [
    ...(agencyConfig.facebook ? [{ name: 'Facebook', icon: Facebook, href: agencyConfig.facebook, color: 'hover:text-blue-600' }] : []),
    ...(agencyConfig.instagram ? [{ name: 'Instagram', icon: Instagram, href: agencyConfig.instagram, color: 'hover:text-pink-600' }] : []),
    ...(agencyConfig.tiktok ? [{ name: 'TikTok', icon: Music, href: agencyConfig.tiktok, color: 'hover:text-gray-900' }] : []),
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-2.5 rounded-lg group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">BBF</h2>
                <p className="text-sm text-gray-400">{agencyConfig.name}</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre partenaire immobilier de confiance en Martinique pour la vente, location, gestion immobilière et prestations de services. 
              Nous vous accompagnons dans tous vos projets immobiliers avec professionnalisme et expertise.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{agencyConfig.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`tel:${agencyConfig.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary-400 transition-colors">
                  {agencyConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${agencyConfig.email}`} className="text-sm hover:text-primary-400 transition-colors">
                  {agencyConfig.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">{agencyConfig.hours}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">L'Agence</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Suivez-nous :</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              © {currentYear} BBF - Bulle immobilière, Business & Foncier. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
