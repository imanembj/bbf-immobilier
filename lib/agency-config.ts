// Configuration centralisée de l'agence
export interface AgencyConfig {
  name: string
  email: string
  phone: string
  address: string
  hours: string
  facebook?: string
  instagram?: string
  tiktok?: string
  youtube?: string
}

const defaultConfig: AgencyConfig = {
  name: "Bulle immobilière, Business & Foncier (BBF)",
  email: "contact@bulle-immobiliere.mq",
  phone: "+596 696 00 74 20",
  address: "Rivière-Pilote, Martinique",
  hours: "Lun-Ven: 9h-18h, Sam: 9h-13h",
  facebook: "https://facebook.com/bulle-immobiliere",
  instagram: "https://instagram.com/bulle_immobiliere",
  tiktok: "https://tiktok.com/@bulle_immobiliere",
  youtube: "https://www.youtube.com/@BBF-Immobilier",
}

// Récupérer la configuration de l'agence
export function getAgencyConfig(): AgencyConfig {
  if (typeof window === 'undefined') {
    return defaultConfig
  }

  // Essayer d'abord localStorage (pour compatibilité)
  const stored = localStorage.getItem('agency_config')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultConfig
    }
  }
  
  // Sinon retourner la config par défaut
  // (Supabase sera chargé de manière asynchrone dans les composants)
  return defaultConfig
}

// Sauvegarder la configuration de l'agence
export function saveAgencyConfig(config: AgencyConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('agency_config', JSON.stringify(config))
  }
}

// Hook React pour utiliser la configuration
export function useAgencyConfig() {
  if (typeof window === 'undefined') {
    return defaultConfig
  }

  const [config, setConfig] = React.useState<AgencyConfig>(getAgencyConfig())

  const updateConfig = (newConfig: AgencyConfig) => {
    saveAgencyConfig(newConfig)
    setConfig(newConfig)
  }

  return { config, updateConfig }
}

// Import React pour le hook
import React from 'react'

// Fonction async pour charger depuis Supabase
export async function getAgencyConfigFromSupabase(): Promise<AgencyConfig> {
  try {
    const { getAgencySettings } = await import('./supabase-store')
    const settings = await getAgencySettings()
    return settings || defaultConfig
  } catch {
    return defaultConfig
  }
}
