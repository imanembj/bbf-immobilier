'use client'

// StorageMonitor désactivé - on utilise MySQL maintenant, plus de localStorage
export default function StorageMonitor() {
  // Retourner null car on n'utilise plus localStorage
  return null
}

/*
// Ancien code localStorage - conservé pour référence
import { useEffect, useState } from 'react'
import { getStore } from '@/lib/store'
import { HardDrive, AlertTriangle, CheckCircle } from 'lucide-react'

export default function StorageMonitorOld() {
  const [storageInfo, setStorageInfo] = useState<{
    used: number
    usedMB: string
    limit: number
    limitMB: string
    percentage: string
    warning: boolean
  } | null>(null)

  useEffect(() => {
    // Charger les infos de stockage
    const updateStorageInfo = () => {
      const store = getStore()
      const info = store.getStorageInfo()
      setStorageInfo(info)
    }

    updateStorageInfo()

    // Écouter les événements de stockage
    const handleStorageWarning = (e: CustomEvent) => {
      console.warn('Storage warning:', e.detail.message)
    }

    window.addEventListener('storage-warning', handleStorageWarning as EventListener)

    // Mettre à jour toutes les 10 secondes
    const interval = setInterval(updateStorageInfo, 10000)

    return () => {
      window.removeEventListener('storage-warning', handleStorageWarning as EventListener)
      clearInterval(interval)
    }
  }, [])

  if (!storageInfo) return null

  const percentage = parseFloat(storageInfo.percentage)
  const isWarning = percentage > 80
  const isCritical = percentage > 95

  return (
    <div className={`rounded-lg p-4 ${
      isCritical ? 'bg-red-50 border-2 border-red-500' :
      isWarning ? 'bg-yellow-50 border-2 border-yellow-500' :
      'bg-green-50 border border-green-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          isCritical ? 'bg-red-100' :
          isWarning ? 'bg-yellow-100' :
          'bg-green-100'
        }`}>
          {isCritical || isWarning ? (
            <AlertTriangle className={`w-5 h-5 ${
              isCritical ? 'text-red-600' : 'text-yellow-600'
            }`} />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${
              isCritical ? 'text-red-900' :
              isWarning ? 'text-yellow-900' :
              'text-green-900'
            }`}>
              <HardDrive className="w-4 h-4 inline mr-2" />
              Stockage Local
            </h3>
            <span className={`text-sm font-medium ${
              isCritical ? 'text-red-700' :
              isWarning ? 'text-yellow-700' :
              'text-green-700'
            }`}>
              {storageInfo.percentage}%
            </span>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isCritical ? 'bg-red-600' :
                isWarning ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {storageInfo.usedMB} MB / {storageInfo.limitMB} MB utilisés
            </span>
          </div>

          {/* Messages d'avertissement */}
          {isCritical && (
            <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
              <strong>⚠️ CRITIQUE:</strong> Le stockage est presque plein! Les nouvelles données ne pourront pas être sauvegardées. 
              Veuillez supprimer des biens ou migrer vers une base de données.
            </div>
          )}

          {isWarning && !isCritical && (
            <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
              <strong>⚠️ ATTENTION:</strong> Le stockage approche de sa limite. 
              Pensez à supprimer des biens inutilisés ou à migrer vers une base de données.
            </div>
          )}

          {!isWarning && (
            <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
              <strong>✓ OK:</strong> L'espace de stockage est suffisant. 
              Pour un usage en production, pensez à migrer vers une base de données.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
