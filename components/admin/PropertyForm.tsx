'use client'

import { useState, useRef } from 'react'
import { PropertyType, PropertyFormData, createEmptyProperty, PricingType } from '@/lib/property-types'
import { Plus, X, Upload, Trash2, Calendar, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import { compressImages } from '@/lib/image-utils'

// Quartiers de Martinique
const MARTINIQUE_QUARTIERS = [
  'Fort-de-France',
  'Le Lamentin',
  'Schoelcher',
  'Sainte-Marie',
  'Le François',
  'Les Trois-Îlets',
  'Rivière-Pilote',
  'Le Diamant',
  'Sainte-Anne',
  'Le Marin',
  'Ducos',
  'Saint-Joseph',
  'Le Robert',
  'Trinité',
  'Autre'
]

// Équipements prédéfinis
const COMMON_AMENITIES = [
  { icon: '🏊', name: 'Piscine' },
  { icon: '📶', name: 'Wifi' },
  { icon: '🚗', name: 'Parking' },
  { icon: '❄️', name: 'Climatisation' },
  { icon: '🍳', name: 'Cuisine équipée' },
  { icon: '📺', name: 'TV' },
  { icon: '🧺', name: 'Lave-linge' },
  { icon: '🌊', name: 'Vue mer' },
  { icon: '🌳', name: 'Jardin' },
  { icon: '🏖️', name: 'Proche plage' },
]

// Caractéristiques prédéfinies
const COMMON_FEATURES = [
  'Meublé',
  'Non meublé',
  'Balcon',
  'Terrasse',
  'Ascenseur',
  'Garage',
  'Cave',
  'Sécurisé',
  'Récent',
  'Rénové',
]

// Points forts prédéfinis
const COMMON_HIGHLIGHTS = [
  '🏖️ Proche de la plage',
  '🏪 Commerces à proximité',
  '🚌 Transports en commun',
  '🏫 Écoles à proximité',
  '🏥 Centre médical proche',
  '🌳 Quartier calme',
  '🌆 Centre-ville',
  '🅿️ Parking privé',
]

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void
  onCancel: () => void
  initialData?: Partial<PropertyFormData>
}

export default function PropertyForm({ onSubmit, onCancel, initialData }: PropertyFormProps) {
  const [propertyType, setPropertyType] = useState<PropertyType>(initialData?.type || 'saisonniere')
  const [formData, setFormData] = useState<Partial<PropertyFormData>>(() => ({
    ...createEmptyProperty(propertyType),
    ...initialData,
  }))
  const [customLocation, setCustomLocation] = useState('')
  const [newAmenity, setNewAmenity] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newHighlight, setNewHighlight] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Changer le type de bien
  const handleTypeChange = (type: PropertyType) => {
    setPropertyType(type)
    const emptyData = createEmptyProperty(type)
    setFormData({
      ...emptyData,
      type: type, // ✅ AJOUTÉ : Sauvegarder le type dans formData
      title: formData.title,
      location: formData.location,
      price: formData.price,
      images: formData.images,
    })
  }

  // Mettre à jour un champ simple
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Mettre à jour un champ imbriqué
  const updateNestedField = (parent: string, field: string, value: any) => {
    console.log('🔍 updateNestedField:', parent, field, value)
    setFormData(prev => {
      const updated = {
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [field]: value,
        },
      }
      console.log('🔍 formData après update:', updated[parent as keyof typeof updated])
      return updated
    })
  }

  // Ajouter un élément à un tableau
  const addToArray = (field: string, value: string) => {
    if (!value.trim()) return
    setFormData(prev => ({
      ...prev,
      [field]: [...((prev[field as keyof typeof prev] as any) || []), value],
    }))
  }

  // Retirer un élément d'un tableau
  const removeFromArray = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: ((prev[field as keyof typeof prev] as any) || []).filter((_: any, i: number) => i !== index),
    }))
  }

  // Ajouter une image
  const addImage = (url: string) => {
    if (!url.trim()) return
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), url],
    }))
  }

  // Gérer l'upload de fichiers avec compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Afficher un message de chargement
    const loadingToast = toast.loading(`Compression de ${files.length} image(s)...`)

    try {
      // Compresser toutes les images
      const compressedImages = await compressImages(files, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.7,
        maxSizeMB: 0.3 // Limite à 300KB par image
      })

      // Ajouter les images compressées
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...compressedImages],
      }))

      toast.success(`${compressedImages.length} image(s) ajoutée(s) avec succès`, {
        id: loadingToast
      })
    } catch (error) {
      console.error('Erreur lors de la compression:', error)
      toast.error('Erreur lors de l\'ajout des images', {
        id: loadingToast
      })
    }

    // Réinitialiser l'input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Ajouter un équipement personnalisé
  const addCustomAmenity = () => {
    if (!newAmenity.trim()) return
    setFormData(prev => ({
      ...prev,
      amenities: [...(prev.amenities || []), { icon: '✓', name: newAmenity }],
    }))
    setNewAmenity('')
  }

  // Ajouter une caractéristique personnalisée
  const addCustomFeature = () => {
    if (!newFeature.trim()) return
    addToArray('features', newFeature)
    setNewFeature('')
  }

  // Ajouter un point fort personnalisé
  const addCustomHighlight = () => {
    if (!newHighlight.trim()) return
    updateNestedField('environment', 'highlights', [
      ...((formData.environment?.highlights as string[]) || []),
      newHighlight
    ])
    setNewHighlight('')
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation basique - SEULEMENT titre et localisation obligatoires
    if (!formData.title) {
      toast.error('Le titre du bien est obligatoire')
      return
    }

    if (!formData.location) {
      toast.error('La localisation est obligatoire')
      return
    }

    // Tout le reste est optionnel (prix, images, chambres, etc.)
    onSubmit(formData as PropertyFormData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Type de bien */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Type de bien</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['saisonniere', 'annuelle', 'vente'] as PropertyType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                propertyType === type
                  ? type === 'saisonniere'
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : type === 'annuelle'
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-purple-500 bg-purple-50 text-purple-800'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-2">
                {type === 'saisonniere' ? '🏖️' : type === 'annuelle' ? '🏠' : '💰'}
              </div>
              <div className="font-semibold">
                {type === 'saisonniere' ? 'Location Saisonnière' : type === 'annuelle' ? 'Location Longue Durée' : 'Achat'}
              </div>
            </button>
          ))}
        </div>

        {/* Catégorie de bien */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catégorie de bien *
          </label>
          <select
            value={formData.propertyCategory || 'maison'}
            onChange={(e) => setFormData({ ...formData, propertyCategory: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="maison">🏠 Maison</option>
            <option value="appartement">🏢 Appartement</option>
            <option value="villa">🏰 Villa</option>
            <option value="terrain">🌳 Terrain</option>
            <option value="chambre">🛏️ Chambre</option>
            <option value="immeuble">🏛️ Immeuble</option>
            <option value="bureau">💼 Bureau</option>
            <option value="fond_commerce">🏪 Fond de commerce</option>
            <option value="parking">🅿️ Parking</option>
            <option value="local_commercial">🏬 Local commercial</option>
          </select>
        </div>
      </div>

      {/* Informations de base */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Informations de base</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre du bien *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: Villa Luxe Vue Mer"
              required
            />
            <p className="text-xs text-red-500 mt-1">* Champ obligatoire</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quartier / Localisation *
            </label>
            <select
              value={formData.location?.includes('Martinique') ? formData.location.split(',')[0] : 'Autre'}
              onChange={(e) => {
                if (e.target.value === 'Autre') {
                  setCustomLocation('')
                  updateField('location', '')
                } else {
                  updateField('location', `${e.target.value}, Martinique`)
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Sélectionner...</option>
              {MARTINIQUE_QUARTIERS.map(quartier => (
                <option key={quartier} value={quartier}>{quartier}</option>
              ))}
            </select>
            {(formData.location === '' || !formData.location?.includes('Martinique')) && (
              <input
                type="text"
                value={customLocation}
                onChange={(e) => {
                  setCustomLocation(e.target.value)
                  updateField('location', e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 mt-2"
                placeholder="Entrez la localisation complète"
                required
              />
            )}
          </div>

          {/* SYSTÈME DE TARIFICATION FLEXIBLE */}
          <div className="col-span-2 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Tarification</h3>
            
            {/* Type de tarification */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Type de tarification *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // Ne réinitialiser que si on change de type
                    if (formData.pricingInfo?.type !== 'simple') {
                      updateNestedField('pricingInfo', 'type', 'simple')
                      if (!formData.pricingInfo?.simplePrice) {
                        updateNestedField('pricingInfo', 'simplePrice', formData.price || 0)
                      }
                    }
                  }}
                  className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                    formData.pricingInfo?.type === 'simple'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  📊 Prix simple
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Ne réinitialiser que si on change de type
                    if (formData.pricingInfo?.type !== 'seasonal') {
                      updateNestedField('pricingInfo', 'type', 'seasonal')
                      if (!formData.pricingInfo?.seasonalPricing) {
                        updateNestedField('pricingInfo', 'seasonalPricing', {
                          lowSeason: formData.price || 0,
                          midSeason: 0,
                          highSeason: 0,
                        })
                      }
                    }
                  }}
                  className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                    formData.pricingInfo?.type === 'seasonal'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  🌤️ Par saison
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Ne réinitialiser que si on change de type
                    if (formData.pricingInfo?.type !== 'custom') {
                      updateNestedField('pricingInfo', 'type', 'custom')
                      if (!formData.pricingInfo?.customPricing) {
                        const initialPrice = formData.price || 0
                        updateNestedField('pricingInfo', 'customPricing', {
                          description: '',
                          prices: [{ label: 'Basse saison', price: initialPrice }],
                        })
                        // S'assurer que le prix principal est défini
                        if (!formData.price) {
                          updateField('price', initialPrice)
                        }
                      }
                    }
                  }}
                  className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                    formData.pricingInfo?.type === 'custom'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  ⚙️ Personnalisé
                </button>
              </div>
            </div>

            {/* PRIX SIMPLE */}
            {formData.pricingInfo?.type === 'simple' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix * (€)
                  </label>
                  <input
                    type="number"
                    value={formData.pricingInfo?.simplePrice || ''}
                    onChange={(e) => {
                      const price = parseFloat(e.target.value)
                      updateNestedField('pricingInfo', 'simplePrice', price)
                      updateField('price', price) // Sync avec le prix principal
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ex: 350"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Période
                  </label>
                  <select
                    value={formData.pricingInfo?.period || ''}
                    onChange={(e) => {
                      updateNestedField('pricingInfo', 'period', e.target.value)
                      updateField('period', e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="/nuit">/nuit</option>
                    <option value="/semaine">/semaine</option>
                    <option value="/mois">/mois</option>
                    <option value="/an">/an</option>
                    <option value="/m²">/m² (pour locaux commerciaux)</option>
                  </select>
                </div>
              </div>
            )}

            {/* PRIX PAR SAISON */}
            {formData.pricingInfo?.type === 'seasonal' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Période
                  </label>
                  <select
                    value={formData.pricingInfo?.period || '/nuit'}
                    onChange={(e) => {
                      updateNestedField('pricingInfo', 'period', e.target.value)
                      updateField('period', e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="/nuit">/nuit</option>
                    <option value="/semaine">/semaine</option>
                    <option value="/mois">/mois</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🌿 Basse saison (€) *
                    </label>
                    <input
                      type="number"
                      value={formData.pricingInfo?.seasonalPricing?.lowSeason || ''}
                      onChange={(e) => {
                        const price = parseFloat(e.target.value)
                        updateNestedField('pricingInfo', 'seasonalPricing', {
                          ...formData.pricingInfo?.seasonalPricing,
                          lowSeason: price,
                        })
                        updateField('price', price) // Utiliser le prix basse saison comme prix principal
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Ex: 925"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ☀️ Moyenne saison (€) *
                    </label>
                    <input
                      type="number"
                      value={formData.pricingInfo?.seasonalPricing?.midSeason || ''}
                      onChange={(e) => {
                        updateNestedField('pricingInfo', 'seasonalPricing', {
                          ...formData.pricingInfo?.seasonalPricing,
                          midSeason: parseFloat(e.target.value),
                        })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Ex: 950"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🔥 Haute saison (€) *
                    </label>
                    <input
                      type="number"
                      value={formData.pricingInfo?.seasonalPricing?.highSeason || ''}
                      onChange={(e) => {
                        updateNestedField('pricingInfo', 'seasonalPricing', {
                          ...formData.pricingInfo?.seasonalPricing,
                          highSeason: parseFloat(e.target.value),
                        })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Ex: 1100"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TARIFICATION PERSONNALISÉE */}
            {formData.pricingInfo?.type === 'custom' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description de la période *
                  </label>
                  <input
                    type="text"
                    value={formData.pricingInfo?.customPricing?.description || ''}
                    onChange={(e) => {
                      updateNestedField('pricingInfo', 'customPricing', {
                        ...formData.pricingInfo?.customPricing,
                        description: e.target.value,
                      })
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ex: Tarif pour 6 nuitées / 7 jours (hors options)"
                    required
                  />
                </div>

                {/* Type de tarification : Forfait ou Prix par nuit */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pricingInfo?.customPricing?.isPackage || false}
                      onChange={(e) => {
                        updateNestedField('pricingInfo', 'customPricing', {
                          ...formData.pricingInfo?.customPricing,
                          isPackage: e.target.checked,
                        })
                      }}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">📦 C'est un forfait fixe</span>
                      <p className="text-sm text-gray-600">
                        Cochez si le prix est pour un nombre fixe de nuitées (ex: 480€ pour 6 nuitées)
                      </p>
                    </div>
                  </label>

                  {formData.pricingInfo?.customPricing?.isPackage && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nombre de nuitées *
                        </label>
                        <input
                          type="number"
                          value={formData.pricingInfo?.customPricing?.packageNights || ''}
                          onChange={(e) => {
                            updateNestedField('pricingInfo', 'customPricing', {
                              ...formData.pricingInfo?.customPricing,
                              packageNights: parseInt(e.target.value),
                            })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Ex: 6"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nombre de jours *
                        </label>
                        <input
                          type="number"
                          value={formData.pricingInfo?.customPricing?.packageDays || ''}
                          onChange={(e) => {
                            updateNestedField('pricingInfo', 'customPricing', {
                              ...formData.pricingInfo?.customPricing,
                              packageDays: parseInt(e.target.value),
                            })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Ex: 7"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tarifs *
                  </label>
                  <div className="space-y-3">
                    {formData.pricingInfo?.customPricing?.prices?.map((priceItem, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={priceItem.label}
                          onChange={(e) => {
                            const newPrices = [...(formData.pricingInfo?.customPricing?.prices || [])]
                            newPrices[index] = { ...newPrices[index], label: e.target.value }
                            updateNestedField('pricingInfo', 'customPricing', {
                              ...formData.pricingInfo?.customPricing,
                              prices: newPrices,
                            })
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Ex: Basse saison"
                        />
                        <input
                          type="number"
                          value={priceItem.price}
                          onChange={(e) => {
                            const newPrices = [...(formData.pricingInfo?.customPricing?.prices || [])]
                            newPrices[index] = { ...newPrices[index], price: parseFloat(e.target.value) }
                            updateNestedField('pricingInfo', 'customPricing', {
                              ...formData.pricingInfo?.customPricing,
                              prices: newPrices,
                            })
                            // Utiliser le premier prix comme prix principal
                            if (index === 0) {
                              updateField('price', parseFloat(e.target.value))
                            }
                          }}
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Prix"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPrices = (formData.pricingInfo?.customPricing?.prices || []).filter((_, i) => i !== index)
                            updateNestedField('pricingInfo', 'customPricing', {
                              ...formData.pricingInfo?.customPricing,
                              prices: newPrices,
                            })
                          }}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPrices = formData.pricingInfo?.customPricing?.prices || []
                      updateNestedField('pricingInfo', 'customPricing', {
                        ...formData.pricingInfo?.customPricing,
                        prices: [...currentPrices, { label: '', price: 0 }],
                      })
                    }}
                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un tarif
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Surface (m²)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={formData.area || ''}
              onChange={(e) => {
                const value = e.target.value.replace(',', '.')
                updateField('area', parseFloat(value) || 0)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: 220 ou 220,5 (optionnel)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de pièces (F2, F3, F4...)
            </label>
            <input
              type="number"
              value={formData.rooms || ''}
              onChange={(e) => updateField('rooms', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: 4 pour un F4 (optionnel)"
            />
            <p className="text-xs text-gray-500 mt-1">Total de pièces principales (salon + chambres)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de chambres
            </label>
            <input
              type="number"
              value={formData.beds || ''}
              onChange={(e) => updateField('beds', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: 3 chambres (optionnel)"
            />
            <p className="text-xs text-gray-500 mt-1">Nombre de chambres à coucher uniquement</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salles de bain
            </label>
            <input
              type="number"
              value={formData.baths || ''}
              onChange={(e) => updateField('baths', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: 3 (optionnel)"
            />
          </div>

          {propertyType === 'saisonniere' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de voyageurs
              </label>
              <input
                type="number"
                value={formData.guests || ''}
                onChange={(e) => updateField('guests', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: 10"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={formData.status || 'disponible'}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="disponible">Disponible</option>
              <option value="reserve">Réservé</option>
              <option value="loue">Loué</option>
              <option value="vendu">Vendu</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-semibold text-gray-700">
              Mettre en avant (Coup de Cœur)
            </label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Images *</h3>
        <div className="space-y-4">
          {/* Upload de fichiers */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600"
            >
              <Upload className="w-5 h-5" />
              <span className="font-semibold">Importer des images depuis votre ordinateur</span>
            </button>
          </div>

          {/* OU séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OU</span>
            </div>
          </div>

          {/* URL d'image */}
          <div className="flex gap-2">
            <input
              type="url"
              id="imageUrl"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="URL de l'image (Unsplash, etc.)"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('imageUrl') as HTMLInputElement
                if (input.value) {
                  addImage(input.value)
                  input.value = ''
                  toast.success('Image ajoutée')
                }
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(formData.images || []).map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {/* Bouton Supprimer */}
                <button
                  type="button"
                  onClick={() => {
                    removeFromArray('images', index)
                    toast.success('Image supprimée')
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* Bouton Définir comme principale (si ce n'est pas déjà la principale) */}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const images = [...(formData.images || [])]
                      const [selectedImage] = images.splice(index, 1)
                      images.unshift(selectedImage) // Mettre en première position
                      setFormData(prev => ({ ...prev, images }))
                      toast.success('Photo principale définie')
                    }}
                    className="absolute top-2 left-2 p-1 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Définir comme principale"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}
                {/* Badge Principale */}
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Principale
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vidéos et Visites Virtuelles */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📹</span>
          Médias Multimédias
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Ajoutez des vidéos YouTube et des visites virtuelles pour présenter votre bien de manière immersive
        </p>

        <div className="space-y-6">
          {/* Vidéo YouTube */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <span>🎥</span>
                Vidéo YouTube
              </span>
            </label>
            <input
              type="url"
              value={formData.videoUrl || ''}
              onChange={(e) => updateField('videoUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Collez l'URL complète de votre vidéo YouTube (ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
            </p>
            {formData.videoUrl && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span>✓</span>
                  Vidéo ajoutée - Elle sera visible sur la page du bien
                </p>
              </div>
            )}
          </div>

          {/* Visite Virtuelle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <span>🏠</span>
                Visite Virtuelle 360°
              </span>
            </label>
            <input
              type="url"
              value={formData.virtualTourUrl || ''}
              onChange={(e) => updateField('virtualTourUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://my.matterport.com/show/?m=..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Lien vers votre visite virtuelle (Matterport, Kuula, 360Cities, etc.)
            </p>
            {formData.virtualTourUrl && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span>✓</span>
                  Visite virtuelle ajoutée - Elle sera visible sur la page du bien
                </p>
              </div>
            )}
          </div>

          {/* Aperçu */}
          {(formData.videoUrl || formData.virtualTourUrl) && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">📊 Aperçu des médias</p>
              <div className="space-y-2 text-sm text-blue-800">
                {formData.videoUrl && (
                  <div className="flex items-center gap-2">
                    <span>🎥</span>
                    <span>Vidéo YouTube configurée</span>
                  </div>
                )}
                {formData.virtualTourUrl && (
                  <div className="flex items-center gap-2">
                    <span>🏠</span>
                    <span>Visite virtuelle configurée</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description du bien */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Description du bien *</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description générale *
            </label>
            <textarea
              value={formData.detailedDescription?.presentation || formData.description || ''}
              onChange={(e) => {
                updateNestedField('detailedDescription', 'presentation', e.target.value)
                updateField('description', e.target.value)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={4}
              placeholder="Décrivez le bien de manière générale (emplacement, atouts, ambiance...)..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description intérieur (optionnel)
            </label>
            <textarea
              value={formData.detailedDescription?.interior || ''}
              onChange={(e) => updateNestedField('detailedDescription', 'interior', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Détails de l'intérieur (aménagement, décoration, équipements...)..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description extérieur (optionnel)
            </label>
            <textarea
              value={formData.detailedDescription?.exterior || ''}
              onChange={(e) => updateNestedField('detailedDescription', 'exterior', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Détails de l'extérieur (jardin, terrasse, vue, parking...)..."
            />
          </div>
        </div>
      </div>

      {/* Environnement & Quartier */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environnement & Quartier</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description du quartier
            </label>
            <textarea
              value={formData.environment?.description || ''}
              onChange={(e) => updateNestedField('environment', 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Décrivez le quartier..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Points forts (proximité, commodités)
            </label>
            {/* Liste déroulante prédéfinie */}
            <div className="mb-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const current = formData.environment?.highlights || []
                    if (!current.includes(e.target.value)) {
                      updateNestedField('environment', 'highlights', [...current, e.target.value])
                    }
                    e.target.value = ''
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Sélectionner un point fort...</option>
                {COMMON_HIGHLIGHTS.map(highlight => (
                  <option key={highlight} value={highlight}>{highlight}</option>
                ))}
              </select>
            </div>
            {/* Champ personnalisé */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomHighlight())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ou ajoutez un point fort personnalisé..."
              />
              <button
                type="button"
                onClick={addCustomHighlight}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {(formData.environment?.highlights || []).map((highlight: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm">{highlight}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.environment?.highlights || []
                      updateNestedField('environment', 'highlights', current.filter((_: string, i: number) => i !== index))
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Équipements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Équipements</h3>
        {/* Grille d'équipements prédéfinis */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {COMMON_AMENITIES.map(amenity => {
            const isSelected = (formData.amenities || []).some((a: any) => 
              (a.name || a) === amenity.name
            )
            return (
              <button
                key={amenity.name}
                type="button"
                onClick={() => {
                  const current = formData.amenities || []
                  if (isSelected) {
                    updateField('amenities', current.filter((a: any) => (a.name || a) !== amenity.name))
                  } else {
                    updateField('amenities', [...current, amenity])
                  }
                }}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-xl mb-1">{amenity.icon}</div>
                <div className="font-medium">{amenity.name}</div>
              </button>
            )
          })}
        </div>
        {/* Équipement personnalisé */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Ajouter un équipement personnalisé..."
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(formData.amenities || []).map((amenity: any, index: number) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
              <span className="text-sm">{amenity.name || amenity}</span>
              <button
                type="button"
                onClick={() => removeFromArray('amenities', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques</h3>
        {/* Grille de caractéristiques prédéfinies */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {COMMON_FEATURES.map(feature => {
            const isSelected = (formData.features || []).includes(feature)
            return (
              <button
                key={feature}
                type="button"
                onClick={() => {
                  const current = formData.features || []
                  if (isSelected) {
                    updateField('features', current.filter((f: string) => f !== feature))
                  } else {
                    updateField('features', [...current, feature])
                  }
                }}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {feature}
              </button>
            )
          })}
        </div>
        {/* Caractéristique personnalisée */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Ajouter une caractéristique personnalisée..."
          />
          <button
            type="button"
            onClick={addCustomFeature}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(formData.features || []).map((feature: string, index: number) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
              <span className="text-sm">{feature}</span>
              <button
                type="button"
                onClick={() => removeFromArray('features', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Règlement */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {propertyType === 'saisonniere' ? 'Règlement intérieur' : 'Conditions particulières'}
        </h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="ruleInput"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder={propertyType === 'saisonniere' ? "Ex: Check-in: 16h00 - 20h00" : "Ex: Bail 3 ans renouvelable"}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('ruleInput') as HTMLInputElement
              if (input.value) {
                addToArray('rules', input.value)
                input.value = ''
              }
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {(formData.rules || []).map((rule: string, index: number) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
              <span className="text-sm">{rule}</span>
              <button
                type="button"
                onClick={() => removeFromArray('rules', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CONDITIONS SPÉCIFIQUES SELON LE TYPE */}
      
      {/* Location Saisonnière - Conditions */}
      {propertyType === 'saisonniere' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Conditions de location saisonnière</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dépôt de garantie (€)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.deposit || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'deposit', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Frais de ménage (€)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.cleaningFee || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'cleaningFee', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Séjour minimum (nuits)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.minStay || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'minStay', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Politique d'annulation
            </label>
            <textarea
              value={(formData.rentalConditions as any)?.cancellationPolicy || ''}
              onChange={(e) => updateNestedField('rentalConditions', 'cancellationPolicy', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Ex: Annulation gratuite jusqu'à 30 jours avant..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Lien Google Agenda (calendrier de disponibilité)
            </label>
            <input
              type="url"
              value={(formData as any).googleCalendarUrl || ''}
              onChange={(e) => updateField('googleCalendarUrl', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="https://calendar.google.com/calendar/embed?src=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Collez l'URL d'intégration de votre Google Agenda pour afficher les disponibilités en temps réel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inclus dans le prix
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="includedInput"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Linge de maison"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('includedInput') as HTMLInputElement
                    if (input.value) {
                      const current = (formData.rentalConditions as any)?.included || []
                      updateNestedField('rentalConditions', 'included', [...current, input.value])
                      input.value = ''
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {((formData.rentalConditions as any)?.included || []).map((item: string, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded text-sm">
                    <span>✓ {item}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.rentalConditions as any)?.included || []
                        updateNestedField('rentalConditions', 'included', current.filter((_: string, i: number) => i !== index))
                      }}
                      className="text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Non inclus
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="notIncludedInput"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Taxe de séjour"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('notIncludedInput') as HTMLInputElement
                    if (input.value) {
                      const current = (formData.rentalConditions as any)?.notIncluded || []
                      updateNestedField('rentalConditions', 'notIncluded', [...current, input.value])
                      input.value = ''
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {((formData.rentalConditions as any)?.notIncluded || []).map((item: string, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 px-3 py-2 rounded text-sm">
                    <span>✗ {item}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.rentalConditions as any)?.notIncluded || []
                        updateNestedField('rentalConditions', 'notIncluded', current.filter((_: string, i: number) => i !== index))
                      }}
                      className="text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Annuelle - Conditions */}
      {propertyType === 'annuelle' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Conditions de location longue durée</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dépôt de garantie (€)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.deposit || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'deposit', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Charges mensuelles (€)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.charges || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'charges', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bail minimum (mois)
              </label>
              <input
                type="number"
                value={(formData.rentalConditions as any)?.minLease || ''}
                onChange={(e) => updateNestedField('rentalConditions', 'minLease', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Disponible à partir du
            </label>
            <div className="relative">
              <input
                type="date"
                value={(formData.rentalConditions as any)?.availableFrom || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateNestedField('rentalConditions', 'availableFrom', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Documents requis
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="documentInput"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: 3 derniers bulletins de salaire"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('documentInput') as HTMLInputElement
                  if (input.value) {
                    const current = (formData.rentalConditions as any)?.documents || []
                    updateNestedField('rentalConditions', 'documents', [...current, input.value])
                    input.value = ''
                  }
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {((formData.rentalConditions as any)?.documents || []).map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                  <span>• {doc}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const current = (formData.rentalConditions as any)?.documents || []
                      updateNestedField('rentalConditions', 'documents', current.filter((_: string, i: number) => i !== index))
                    }}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vente - Conditions d'achat */}
      {propertyType === 'vente' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Informations d'achat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Frais de notaire estimés (€)
              </label>
              <input
                type="number"
                value={(formData.purchaseConditions as any)?.notaryFees || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'notaryFees', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Taxe foncière annuelle (€)
              </label>
              <input
                type="number"
                value={(formData.purchaseConditions as any)?.propertyTax || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'propertyTax', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                État général
              </label>
              <input
                type="text"
                value={(formData.purchaseConditions as any)?.condition || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'condition', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Excellent état"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disponibilité
              </label>
              <input
                type="text"
                value={(formData.purchaseConditions as any)?.occupancy || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'occupancy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Libre à la vente"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Orientation
              </label>
              <input
                type="text"
                value={(formData.purchaseConditions as any)?.orientation || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'orientation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Sud-Ouest"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Année de construction
              </label>
              <input
                type="number"
                value={(formData.purchaseConditions as any)?.constructionYear || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'constructionYear', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dernière rénovation
              </label>
              <input
                type="number"
                value={(formData.purchaseConditions as any)?.lastRenovation || ''}
                onChange={(e) => updateNestedField('purchaseConditions', 'lastRenovation', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Honoraires d'agence */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Honoraires d'agence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Frais d'agence (€)
            </label>
            <input
              type="number"
              value={formData.fees?.agencyFees || ''}
              onChange={(e) => updateNestedField('fees', 'agencyFees', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {propertyType === 'vente' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix net vendeur (€)
              </label>
              <input
                type="number"
                value={formData.fees?.netSellerPrice || ''}
                onChange={(e) => updateNestedField('fees', 'netSellerPrice', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description des honoraires
            </label>
            <textarea
              value={formData.fees?.description || ''}
              onChange={(e) => updateNestedField('fees', 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Ex: Aucun frais pour le locataire..."
            />
          </div>
        </div>
      </div>

      {/* Mentions légales */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Informations légales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Référence du bien
            </label>
            <input
              type="text"
              value={formData.legalInfo?.reference || ''}
              onChange={(e) => updateNestedField('legalInfo', 'reference', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: BIM-SAIS-001"
            />
          </div>
          
          {propertyType !== 'saisonniere' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DPE
                </label>
                <input
                  type="text"
                  value={formData.legalInfo?.dpe || ''}
                  onChange={(e) => updateNestedField('legalInfo', 'dpe', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: C (120 kWh/m²/an)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GES
                </label>
                <input
                  type="text"
                  value={formData.legalInfo?.ges || ''}
                  onChange={(e) => updateNestedField('legalInfo', 'ges', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: B (8 kg CO2/m²/an)"
                />
              </div>
            </>
          )}
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loi applicable
            </label>
            <textarea
              value={formData.legalInfo?.law || ''}
              onChange={(e) => updateNestedField('legalInfo', 'law', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={2}
            />
          </div>
          
          {propertyType === 'vente' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Risques naturels
              </label>
              <textarea
                value={formData.legalInfo?.risks || ''}
                onChange={(e) => updateNestedField('legalInfo', 'risks', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={2}
                placeholder="Ex: Zone de sismicité modérée..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
        >
          Enregistrer le bien
        </button>
      </div>
    </form>
  )
}
