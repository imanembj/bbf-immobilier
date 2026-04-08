'use client'

import { useState, useEffect } from 'react'
import { Facebook, Instagram, Music, ExternalLink, Youtube } from 'lucide-react'
import Link from 'next/link'
import { getAgencyConfig, AgencyConfig } from '@/lib/agency-config'
import * as SupabaseStore from '@/lib/supabase-store'

export default function SocialFeed() {
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
  }, [])
  
  const socialPosts = [
    {
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600',
      caption: 'Nouvelle villa disponible à Nice ! 🏖️ #Immobilier #Nice',
      likes: 245,
      link: agencyConfig.instagram || 'https://instagram.com/bulle_immobiliere',
    },
    {
      platform: 'tiktok',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600',
      caption: 'Visite virtuelle de notre dernier bien 🎥',
      likes: 1200,
      link: agencyConfig.tiktok || 'https://tiktok.com/@bulle_immobiliere',
    },
    {
      platform: 'facebook',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600',
      caption: 'Conseils pour bien choisir votre location 💡',
      likes: 189,
      link: agencyConfig.facebook || 'https://facebook.com/bulle-immobiliere',
    },
    {
      platform: 'youtube',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600',
      caption: 'Visite virtuelle complète de notre dernière villa 🎬 #YouTube',
      likes: 856,
      link: agencyConfig.youtube || 'https://www.youtube.com/@BBF-Immobilier',
    },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram
      case 'tiktok':
        return Music
      case 'facebook':
        return Facebook
      case 'youtube':
        return Youtube
      default:
        return Instagram
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-600'
      case 'tiktok':
        return 'from-gray-800 to-gray-900'
      case 'facebook':
        return 'from-blue-600 to-blue-700'
      case 'youtube':
        return 'from-red-600 to-red-700'
      default:
        return 'from-gray-600 to-gray-700'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center max-w-5xl mx-auto px-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#D3CDB7', color: 'white' }}>
            Suivez-nous
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Restez connectés sur nos <span className="font-['Playfair_Display'] italic font-bold" style={{ color: '#41A09C' }}>réseaux</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Découvrez nos dernières actualités, biens et conseils immobiliers
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {agencyConfig.instagram && (
            <a
              href={agencyConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">Instagram</span>
              <ExternalLink className="w-4 h-4 transition-opacity" />
            </a>
          )}
          {agencyConfig.tiktok && (
            <a
              href={agencyConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Music className="w-5 h-5" />
              <span className="font-semibold">TikTok</span>
              <ExternalLink className="w-4 h-4 transition-opacity" />
            </a>
          )}
          {agencyConfig.facebook && (
            <a
              href={agencyConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-semibold">Facebook</span>
              <ExternalLink className="w-4 h-4 transition-opacity" />
            </a>
          )}
          {agencyConfig.youtube && (
            <a
              href={agencyConfig.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Youtube className="w-5 h-5" />
              <span className="font-semibold">YouTube</span>
              <ExternalLink className="w-4 h-4 transition-opacity" />
            </a>
          )}
        </div>

        {/* Social Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post, index) => {
            const Icon = getPlatformIcon(post.platform)
            return (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-heart"
              >
                {/* Image */}
                <div
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play Button for YouTube */}
                  {post.platform === 'youtube' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-red-600 border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Platform Badge */}
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${getPlatformColor(post.platform)} text-white p-2 rounded-lg shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm mb-2 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center text-xs">
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <style jsx>{`
          .cursor-heart {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23ef4444'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E") 16 16, auto;
          }
        `}</style>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Rejoignez notre communauté de plus de 10 000 abonnés
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              #Immobilier
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              #LocationSaisonnière
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              #BienImmobilier
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              #BBFImmobilier
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
