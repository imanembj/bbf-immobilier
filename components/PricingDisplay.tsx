import { PricingInfo } from '@/lib/property-types'

interface PricingDisplayProps {
  pricingInfo?: PricingInfo
  price: number // Prix de base pour compatibilité
  period?: string
  className?: string
}

export default function PricingDisplay({ pricingInfo, price, period, className = '' }: PricingDisplayProps) {
  // Si pas de pricingInfo, utiliser le système ancien
  if (!pricingInfo || pricingInfo.type === 'simple') {
    return (
      <div className={className}>
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-4xl font-bold text-primary-600">
            {pricingInfo?.simplePrice || price}€
          </span>
          {(pricingInfo?.period || period) && (
            <span className="text-gray-600">{pricingInfo?.period || period}</span>
          )}
        </div>
      </div>
    )
  }

  // Prix par saison
  if (pricingInfo.type === 'seasonal' && pricingInfo.seasonalPricing) {
    return (
      <div className={className}>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-primary-200 rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-bold text-gray-900 mb-3">💰 Tarifs par saison</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">🌿 Basse saison</span>
              <span className="text-xl font-bold text-green-600">
                {pricingInfo.seasonalPricing.lowSeason}€{pricingInfo.period}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">☀️ Moyenne saison</span>
              <span className="text-xl font-bold text-yellow-600">
                {pricingInfo.seasonalPricing.midSeason}€{pricingInfo.period}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">🔥 Haute saison</span>
              <span className="text-xl font-bold text-red-600">
                {pricingInfo.seasonalPricing.highSeason}€{pricingInfo.period}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tarification personnalisée
  if (pricingInfo.type === 'custom' && pricingInfo.customPricing) {
    const isPackage = pricingInfo.customPricing.isPackage
    const packageNights = pricingInfo.customPricing.packageNights
    const packageDays = pricingInfo.customPricing.packageDays
    
    return (
      <div className={className}>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 space-y-3">
          {pricingInfo.customPricing.description && (
            <p className="text-sm font-bold text-gray-900 mb-3">
              📅 {pricingInfo.customPricing.description}
            </p>
          )}
          {isPackage && packageNights && packageDays && (
            <p className="text-xs text-gray-600 bg-yellow-100 px-3 py-1 rounded-full inline-block mb-2">
              📦 Forfait : {packageNights} nuitées / {packageDays} jours
            </p>
          )}
          <div className="space-y-2">
            {pricingInfo.customPricing.prices.map((priceItem, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{priceItem.label}</span>
                <span className="text-xl font-bold text-primary-600">
                  {priceItem.price} €
                  {isPackage && packageNights && (
                    <span className="text-xs text-gray-500 ml-1">
                      (≈{Math.round(priceItem.price / packageNights)}€/nuit)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className={className}>
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-4xl font-bold text-primary-600">{price}€</span>
        {period && <span className="text-gray-600">{period}</span>}
      </div>
    </div>
  )
}
