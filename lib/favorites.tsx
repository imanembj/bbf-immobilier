'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Property {
  id: number
  title: string
  price: number
  image: string
  location: string
  type: string
}

interface FavoritesContextType {
  favorites: Property[]
  addFavorite: (property: Property) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Property[]>([])

  const addFavorite = (property: Property) => {
    if (!favorites.some((fav: Property) => fav.id === property.id)) {
      setFavorites([...favorites, property])
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav: Property) => fav.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((fav: Property) => fav.id === id)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}
