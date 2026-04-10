'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Send, User, Mail, Phone, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { getCalendarEvents, checkAvailability } from '@/lib/calendar-utils'

interface ReservationFormProps {
  propertyId: string
  propertyTitle: string
  pricePerNight?: number
  property?: any // Toute la propriété pour accéder à pricingInfo
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
  onSuccess?: () => void
}

// Helper pour calculer le prix selon le type de tarification
const calculatePrice = (property: any, nights: number): { subtotal: number, priceDisplay: string } => {
  const pricingInfo = property?.pricingInfo
  
  // Prix simple ou ancien système
  if (!pricingInfo || pricingInfo.type === 'simple') {
    const pricePerNight = pricingInfo?.simplePrice || property?.price || 0
    return {
      subtotal: pricePerNight * nights,
      priceDisplay: `${pricePerNight}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
    }
  }
  
  // Prix par saison
  if (pricingInfo.type === 'seasonal' && pricingInfo.seasonalPricing) {
    const pricePerNight = pricingInfo.seasonalPricing.lowSeason
    return {
      subtotal: pricePerNight * nights,
      priceDisplay: `${pricePerNight}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
    }
  }
  
  // Tarification personnalisée avec forfait
  if (pricingInfo.type === 'custom' && pricingInfo.customPricing) {
    const isPackage = pricingInfo.customPricing.isPackage
    const packageNights = pricingInfo.customPricing.packageNights || 1
    const prices = pricingInfo.customPricing.prices || []
    const basePrice = prices[0]?.price || property?.price || 0
    
    if (isPackage && packageNights) {
      // C'est un forfait : calculer combien de forfaits sont nécessaires
      const numberOfPackages = Math.ceil(nights / packageNights)
      const subtotal = basePrice * numberOfPackages
      
      return {
        subtotal,
        priceDisplay: numberOfPackages === 1 
          ? `${basePrice}€ (forfait ${packageNights} nuitées)`
          : `${basePrice}€ × ${numberOfPackages} forfait${numberOfPackages > 1 ? 's' : ''} (${packageNights}n)`
      }
    } else {
      // Prix par nuit
      return {
        subtotal: basePrice * nights,
        priceDisplay: `${basePrice}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
      }
    }
  }
  
  // Fallback
  const fallbackPrice = property?.price || 0
  return {
    subtotal: fallbackPrice * nights,
    priceDisplay: `${fallbackPrice}€ × ${nights} nuit${nights > 1 ? 's' : ''}`
  }
}

export default function ReservationForm({ 
  propertyId, 
  propertyTitle, 
  pricePerNight,
  property,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
  onSuccess 
}: ReservationFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    adults: '2',
    children: '0',
    reservationMessage: '',
  })
  const [childrenAges, setChildrenAges] = useState<number[]>([])
  const [includeCleaningFee, setIncludeCleaningFee] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState<{ start: string; end: string }[]>([])
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)

  // Charger les événements du calendrier Google si disponible
  useEffect(() => {
    const loadCalendarEvents = async () => {
      if (property?.googleCalendarUrl && property?.type === 'saisonniere') {
        // Extraire l'ID du calendrier depuis l'URL
        const match = property.googleCalendarUrl.match(/src=([^&%]+)/)
        if (match) {
          const calendarId = match[1].replace('%40', '@').replace('@group.calendar.google.com', '')
          const events = await getCalendarEvents(calendarId)
          setCalendarEvents(events)
        }
      }
    }
    
    loadCalendarEvents()
  }, [property])

  // Vérifier la disponibilité quand les dates changent
  useEffect(() => {
    if (formData.checkIn && formData.checkOut && calendarEvents.length > 0) {
      const { available, conflictingDates } = checkAvailability(
        formData.checkIn,
        formData.checkOut,
        calendarEvents
      )
      
      if (!available) {
        setAvailabilityError(
          `❌ Ces dates ne sont pas disponibles. Périodes déjà réservées : ${conflictingDates?.join(', ')}`
        )
      } else {
        setAvailabilityError(null)
      }
    } else {
      setAvailabilityError(null)
    }
  }, [formData.checkIn, formData.checkOut, calendarEvents])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Vérifier la disponibilité avant de soumettre
    if (availabilityError) {
      toast.error('Veuillez sélectionner des dates disponibles')
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('/api/requests/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyId,
          propertyTitle,
          adults,
          children,
          childrenAges: property?.type === 'saisonniere' ? childrenAges : undefined,
          subtotal,
          cleaningFee,
          touristTax,
          totalPrice,
          pricePerNight,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Les données sont sauvegardées dans MySQL via l'API
        toast.success(data.message || 'Demande de réservation envoyée !')
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          adults: '2',
          children: '0',
          reservationMessage: '',
        })
        setChildrenAges([])
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
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Si le nombre d'enfants change, ajuster le tableau des âges
    if (name === 'children') {
      const numChildren = parseInt(value) || 0
      setChildrenAges(prev => {
        const newAges = [...prev]
        // Ajouter des âges par défaut (0) si on augmente
        while (newAges.length < numChildren) {
          newAges.push(0)
        }
        // Supprimer les âges en trop si on diminue
        return newAges.slice(0, numChildren)
      })
    }
  }
  
  const handleChildAgeChange = (index: number, age: number) => {
    setChildrenAges(prev => {
      const newAges = [...prev]
      newAges[index] = age
      return newAges
    })
  }

  // Calculer le nombre de nuits
  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn)
      const end = new Date(formData.checkOut)
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return nights > 0 ? nights : 0
    }
    return 0
  }

  const nights = calculateNights()
  const { subtotal: calculatedSubtotal, priceDisplay } = property && nights > 0 
    ? calculatePrice(property, nights) 
    : { subtotal: pricePerNight && nights > 0 ? pricePerNight * nights : 0, priceDisplay: `${pricePerNight || 0}€ × ${nights} nuit${nights > 1 ? 's' : ''}` }
  const subtotal = calculatedSubtotal
  const adults = parseInt(formData.adults) || 0
  const children = parseInt(formData.children) || 0
  const totalGuests = adults + children
  const touristTax = nights > 0 ? nights * adults * 2.5 : 0 // 2.50€ par adulte par nuit (enfants -18 ans gratuits)
  
  // Frais de ménage : récupérer depuis property.rentalConditions.cleaningFee (optionnel)
  const cleaningFeeAmount = property?.rentalConditions?.cleaningFee || 0
  const cleaningFee = includeCleaningFee ? cleaningFeeAmount : 0
  
  const totalPrice = subtotal ? subtotal + touristTax + cleaningFee : null

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 mb-4">
        <p className="text-sm text-cyan-800">
          <strong>Bien concerné :</strong> {propertyTitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="jean.dupont@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="+596 696 XX XX XX"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Adultes <span className="text-red-500">*</span>
            </label>
            <select
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Enfants (-18 ans)
            </label>
            <select
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Âges des enfants - Afficher uniquement si property.type === 'saisonniere' et qu'il y a des enfants */}
        {property?.type === 'saisonniere' && children > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Âge de chaque enfant <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: children }).map((_, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-600 mb-1">
                    Enfant {index + 1}
                  </label>
                  <select
                    value={childrenAges[index] || 0}
                    onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  >
                    {Array.from({ length: 18 }, (_, i) => i).map(age => (
                      <option key={age} value={age}>
                        {age} {age === 0 ? 'an' : age === 1 ? 'an' : 'ans'}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date d'arrivée <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date de départ <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            min={formData.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Message d'erreur de disponibilité */}
      {availabilityError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Dates non disponibles</p>
            <p className="text-sm text-red-700 mt-1">{availabilityError}</p>
          </div>
        </div>
      )}

      {/* Option frais de ménage - Afficher uniquement si disponible */}
      {cleaningFeeAmount > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCleaningFee}
              onChange={(e) => setIncludeCleaningFee(e.target.checked)}
              className="mt-1 w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Ajouter le service de ménage</span>
                <span className="font-bold text-cyan-600">{cleaningFeeAmount}€</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Service de ménage professionnel en fin de séjour (optionnel)
              </p>
            </div>
          </label>
        </div>
      )}

      {nights > 0 && (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-5 rounded-xl border-2 border-teal-200 space-y-3">
          <h3 className="font-bold text-teal-900 text-lg mb-3">📋 Récapitulatif de la réservation</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Durée du séjour</span>
              <span className="font-semibold text-gray-900">{nights} nuit{nights > 1 ? 's' : ''}</span>
            </div>
            
            {subtotal && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-700">{priceDisplay}</span>
                  <span className="font-semibold text-gray-900">{subtotal}€</span>
                </div>
                
                {/* Frais de ménage - Afficher uniquement si > 0 */}
                {cleaningFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Frais de ménage</span>
                    <span className="font-semibold text-gray-900">{cleaningFee}€</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-gray-700">Taxe de séjour</span>
                    <span className="text-xs text-gray-500 italic">
                      {adults} adulte{adults > 1 ? 's' : ''} × {nights} nuit{nights > 1 ? 's' : ''} × 2,50€
                      {children > 0 && ` (${children} enfant${children > 1 ? 's' : ''} gratuit${children > 1 ? 's' : ''})`}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">{touristTax.toFixed(2)}€</span>
                </div>
                
                <div className="border-t-2 border-teal-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-teal-900">Total</span>
                    <span className="text-2xl font-bold text-teal-900">{totalPrice?.toFixed(2)}€</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="space-y-2 mt-3">
            <p className="text-xs text-teal-700 italic bg-white/50 p-2 rounded">
              💡 Vous ne serez pas débité maintenant. Le paiement se fera à la confirmation de la réservation.
            </p>
            <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
              ℹ️ <strong>Taxe de séjour :</strong> Taxe obligatoire collectée pour la collectivité territoriale. 
              Tarif : 2,50€ / adulte / nuit (gratuit pour les -18 ans)
            </p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message (optionnel)
        </label>
        <textarea
          name="reservationMessage"
          value={formData.reservationMessage}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          placeholder="Questions ou demandes particulières..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || !!availabilityError}
        onClick={(e) => {
          if (availabilityError) {
            e.preventDefault()
            toast.error('Ces dates ne sont pas disponibles. Veuillez choisir d\'autres dates.')
          }
        }}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          availabilityError 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700'
        }`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Envoi en cours...
          </>
        ) : availabilityError ? (
          <>
            <AlertCircle className="w-5 h-5" />
            Dates non disponibles
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Réserver maintenant
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Champs obligatoires - Réservation sous réserve de disponibilité
      </p>
    </form>
  )
}
