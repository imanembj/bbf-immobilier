'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Linkedin, ChevronDown, ChevronUp, Music, Youtube, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { AnimatedText, AnimatedSection } from '@/components/animations'
import Image from 'next/image'
import { getAgencyConfig, AgencyConfig } from '@/lib/agency-config'
import { getStore } from '@/lib/store'
import { FAQ } from '@/lib/data'
import { AppointmentForm } from '@/components/forms'
import Modal from '@/components/Modal'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [agencyConfig, setAgencyConfig] = useState<AgencyConfig>(getAgencyConfig())
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Charger les FAQs et la config depuis MySQL
  useEffect(() => {
    const loadData = async () => {
      const { getFAQs, getAgencySettings } = await import('@/lib/mysql-store')
      const loadedFAQs = await getFAQs()
      setFaqs(loadedFAQs as any)
      
      const settings = await getAgencySettings()
      if (settings) {
        setAgencyConfig(settings as any)
      }
    }
    
    loadData()

    // Écouter les changements de configuration
    const handleConfigUpdate = () => {
      loadData()
    }

    window.addEventListener('agency-config-updated', handleConfigUpdate)

    return () => {
      window.removeEventListener('agency-config-updated', handleConfigUpdate)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Sauvegarder dans localStorage côté client
        if (data.messageData) {
          const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]')
          existingMessages.push(data.messageData)
          localStorage.setItem('messages', JSON.stringify(existingMessages))
        }
        
        toast.success(data.message || 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')
        setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' })
      } else {
        toast.error(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible d\'envoyer le message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm saturate-150 brightness-105 will-change-transform"
            style={{
              backgroundImage: 'url(/martinique-hero.jpg)',
              transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-black/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Martinique • Rivière-Pilote</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Parlons de votre{' '}
            <AnimatedText 
              text="projet" 
              className="font-['Playfair_Display'] italic"
              style={{ color: '#55E0FF' }}
              delay={300}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
            Notre équipe d'experts est à votre écoute pour répondre à toutes vos questions
          </p>

          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center" style={{ marginTop: '-8px' }}>
            <a href={`tel:${agencyConfig.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300">
              <Phone className="w-5 h-5 mr-2" />
              Appelez-nous
            </a>
            <a href={`mailto:${agencyConfig.email}`} className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300">
              <Mail className="w-5 h-5 mr-2" />
              Envoyez un email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-cyan-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#55E0FF' }}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Adresse</h3>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-cyan-600 transition-colors text-sm"
              >
                {agencyConfig.address}
              </a>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-cyan-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#55E0FF' }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
              <a
                href={`tel:${agencyConfig.phone.replace(/\s/g, '')}`}
                className="text-gray-600 hover:text-cyan-600 transition-colors text-sm block"
              >
                {agencyConfig.phone}
              </a>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-cyan-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#55E0FF' }}>
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a
                href={`mailto:${agencyConfig.email}`}
                className="text-gray-600 hover:text-cyan-600 transition-colors text-sm"
              >
                {agencyConfig.email}
              </a>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-cyan-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#55E0FF' }}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Horaires</h3>
              <p className="text-gray-600 text-sm">
                {agencyConfig.hours}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Envoyez-nous un <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>message</span>
                </h2>
                <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="general">Question générale</option>
                    <option value="location-annuelle">Location longue durée</option>
                    <option value="location-saisonniere">Location saisonnière</option>
                    <option value="estimation">Estimation de bien</option>
                    <option value="gestion">Gestion locative</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#55E0FF' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires
                </p>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.8!2d-60.9!3d14.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDI3JzAwLjAiTiA2MMKwNTQnMDAuMCJX!5e0!3m2!1sfr!2smq!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation BBF Immobilier - Quartier Baudelle, Rivière-Pilote, Martinique"
                />
              </div>

              {/* Réseaux Sociaux */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Suivez-nous
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {agencyConfig.instagram && (
                    <a
                      href={agencyConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {agencyConfig.facebook && (
                    <a
                      href={agencyConfig.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {agencyConfig.tiktok && (
                    <a
                      href={agencyConfig.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                    >
                      <Music className="w-5 h-5" />
                      <span>TikTok</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Urgence Locative */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-red-900 mb-2">
                  🚨 Urgence locative
                </h3>
                <p className="text-red-700 mb-3 text-xs">
                  Pour toute urgence (fuite, panne, etc.), contactez notre service d'urgence 24h/24
                </p>
                <a
                  href="tel:+596696007420"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
                >
                  <Phone className="w-5 h-5" />
                  <span>Appeler maintenant</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions{' '}
                <AnimatedText 
                  text="fréquentes" 
                  className="font-['Playfair_Display'] italic"
                  style={{ color: '#41A09C' }}
                  delay={300}
                />
              </h2>
              <p className="text-gray-600 text-lg">
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#41A09C' }}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
              <a
                href="#form"
                className="inline-flex items-center space-x-2 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: '#55E0FF' }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contactez-nous</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à démarrer votre{' '}
            <AnimatedText 
              text="projet" 
              className="font-['Playfair_Display'] italic"
              delay={300}
            />
            {' '}?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous avec l'un de nos experts pour discuter de vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+596696007420"
              className="inline-flex items-center justify-center space-x-2 bg-white text-cyan-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>Appelez-nous</span>
            </a>
            <button
              onClick={() => setShowAppointmentModal(true)}
              className="inline-flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-md border-2 border-white/30 hover:bg-black/30 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Rendez-vous */}
      {showAppointmentModal && (
        <Modal
          title="Prendre rendez-vous"
          onClose={() => setShowAppointmentModal(false)}
        >
          <AppointmentForm onSuccess={() => setShowAppointmentModal(false)} />
        </Modal>
      )}
    </div>
  )
}
