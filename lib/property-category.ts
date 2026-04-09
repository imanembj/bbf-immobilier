// Utilitaires pour les catégories de biens

export const PROPERTY_CATEGORIES = {
  maison: { label: 'Maison', icon: '🏠', color: 'bg-blue-100 text-blue-800' },
  appartement: { label: 'Appartement', icon: '🏢', color: 'bg-purple-100 text-purple-800' },
  villa: { label: 'Villa', icon: '🏰', color: 'bg-pink-100 text-pink-800' },
  terrain: { label: 'Terrain', icon: '🌳', color: 'bg-green-100 text-green-800' },
  chambre: { label: 'Chambre', icon: '🛏️', color: 'bg-indigo-100 text-indigo-800' },
  immeuble: { label: 'Immeuble', icon: '🏛️', color: 'bg-gray-100 text-gray-800' },
  bureau: { label: 'Bureau', icon: '💼', color: 'bg-cyan-100 text-cyan-800' },
  fond_commerce: { label: 'Fond de commerce', icon: '🏪', color: 'bg-orange-100 text-orange-800' },
  parking: { label: 'Parking', icon: '🅿️', color: 'bg-yellow-100 text-yellow-800' },
  local_commercial: { label: 'Local commercial', icon: '🏬', color: 'bg-red-100 text-red-800' },
} as const

export type PropertyCategory = keyof typeof PROPERTY_CATEGORIES

export function getCategoryInfo(category?: string) {
  if (!category || !(category in PROPERTY_CATEGORIES)) {
    return PROPERTY_CATEGORIES.maison // Défaut
  }
  return PROPERTY_CATEGORIES[category as PropertyCategory]
}

export function getCategoryBadge(category?: string) {
  const info = getCategoryInfo(category)
  return {
    label: `${info.icon} ${info.label}`,
    className: `px-2 py-1 rounded-full text-xs font-semibold ${info.color}`,
  }
}
