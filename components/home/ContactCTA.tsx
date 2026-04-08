'use client'

import Link from 'next/link'
import { Phone, Mail, MessageCircle, Calendar } from 'lucide-react'

export default function ContactCTA() {
  return (
    <>
      {/* Gradient Top */}
      <div className="h-24 bg-gradient-to-b from-white" style={{ background: 'linear-gradient(to bottom, white, #41A09C)' }}></div>
      
      <section className="pb-20" style={{ backgroundColor: '#41A09C' }}>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-xl text-primary-100 mb-12 leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans votre recherche 
            et répondre à toutes vos questions. Contactez-nous dès aujourd'hui !
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href="tel:+596596007420"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all duration-200 hover:scale-105"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Téléphone</h3>
              <p className="text-primary-100 text-sm">+596 596 00 74 20</p>
            </a>

            <a
              href="mailto:contact@bbf-immobilier.com"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all duration-200 hover:scale-105"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-primary-100 text-sm">contact@bbf-immobilier.com</p>
            </a>

            <Link
              href="/contact"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all duration-200 hover:scale-105"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Message</h3>
              <p className="text-primary-100 text-sm">Formulaire de contact</p>
            </Link>

            <Link
              href="/contact?action=rdv"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all duration-200 hover:scale-105"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Rendez-vous</h3>
              <p className="text-primary-100 text-sm">Prendre un RDV</p>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Contactez-nous maintenant
            </Link>
            <Link
              href="/biens"
              className="text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ backgroundColor: '#55E0FF' }}
            >
              Découvrir nos biens
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-primary-100 mb-4">
              📍 Quartier Baudelle, 97211 Rivière-Pilote, Martinique
            </p>
            <p className="text-primary-100">
              🕐 Lundi au Vendredi : 8h - 17h | Samedi : 9h - 13h | Dimanche : Sur rendez-vous
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
