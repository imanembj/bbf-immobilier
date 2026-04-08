'use client'

import { Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)
  const shareDescription = encodeURIComponent(description || '')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Lien copié !')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Erreur lors de la copie')
    }
  }

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      color: '#25D366',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: '#1877F2',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: '#0A66C2',
    },
  ]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold text-gray-700 mr-2">Partager :</span>
      
      {shareButtons.map((button) => (
        <a
          key={button.name}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
          style={{ backgroundColor: button.color }}
          aria-label={`Partager sur ${button.name}`}
        >
          <button.icon className="w-5 h-5 text-white" />
        </a>
      ))}

      <button
        onClick={copyToClipboard}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md ${
          copied ? 'bg-green-500' : 'bg-gray-600'
        }`}
        aria-label="Copier le lien"
      >
        <Link2 className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
