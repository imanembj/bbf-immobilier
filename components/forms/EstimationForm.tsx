'use client'

import { useState } from 'react'
import { Home, MapPin, Square, DoorOpen, Send } from 'lucide-react'
import toast from 'react-hot-toast'

interface EstimationFormProps {
  onSuccess?: () => void
}

export default function EstimationForm({ onSuccess }: EstimationFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'appartement' as 'appartement' | 'maison' | 'terrain' | 'commerce' | 'autre',
    propertyAddress: '',
    propertyArea: '',
    propertyRooms: '',
    estimationDetails: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/requests/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Les données sont sauvegardées dans MySQL via l'API
        toast.success(data.message || 'Demande envoyée avec succès !')
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: 'appartement',
          propertyAddress: '',
          propertyArea: '',
          propertyRooms: '',
          estimationDetails: '',
        })
        onSuccess?.()
      } else {
        toast.error(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Impossible d\'envoyer la demande')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl border border-cyan-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Home className="w-6 h-6 text-cyan-600" />
          Demande d'estimation offerte*
        </h3>
        <p className="text-gray-600 mb-6">
          Remplissez ce formulaire et recevez une estimation de votre bien sous 48h.<br /><span className="text-xs text-gray-500 mt-2 block">*Estimation offerte en cas de signature d'un mandat de vente avec notre agence</span>
        </p>

        {/* Informations personnelles */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="jean.dupont@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="+596 696 XX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de bien <span className="text-red-500">*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="terrain">Terrain</option>
              <option value="commerce">Commerce</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        {/* Informations du bien */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Adresse du bien <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Adresse complète, commune, Martinique"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Square className="w-4 h-4" />
                Surface (m²)
              </label>
              <input
                type="number"
                name="propertyArea"
                value={formData.propertyArea}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Ex: 85"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DoorOpen className="w-4 h-4" />
                Nombre de pièces
              </label>
              <input
                type="number"
                name="propertyRooms"
                value={formData.propertyRooms}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Ex: 3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Détails supplémentaires
            </label>
            <textarea
              name="estimationDetails"
              value={formData.estimationDetails}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              placeholder="Décrivez votre bien : état général, travaux récents, équipements particuliers..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Demander une estimation offerte*
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          * Champs obligatoires - Vos données sont protégées et ne seront jamais partagées
        </p>
      </div>
    </form>
  )
}
