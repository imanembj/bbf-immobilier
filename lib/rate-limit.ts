// Rate limiting simple basé sur IP et timestamp
interface RateLimitStore {
  [key: string]: number[]
}

const store: RateLimitStore = {}

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  // Nettoyer les anciennes entrées
  if (store[identifier]) {
    store[identifier] = store[identifier].filter(timestamp => timestamp > windowStart)
  } else {
    store[identifier] = []
  }

  // Vérifier la limite
  if (store[identifier].length >= limit) {
    return false // Rate limit dépassé
  }

  // Ajouter la nouvelle requête
  store[identifier].push(now)
  return true // OK
}

// Nettoyer le store périodiquement (toutes les 10 minutes)
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const tenMinutesAgo = now - 600000

    Object.keys(store).forEach(key => {
      store[key] = store[key].filter(timestamp => timestamp > tenMinutesAgo)
      if (store[key].length === 0) {
        delete store[key]
      }
    })
  }, 600000)
}
