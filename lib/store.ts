// Store simple pour gérer l'état (à remplacer par une vraie DB en production)
import { Property, Booking, Message, Review, Partner, FAQ, ClientRequest, BlogPost, initialProperties, initialBookings, initialMessages, initialReviews, initialPartners, initialFAQs, initialBlogPosts } from './data'

class DataStore {
  private properties: Property[] = []
  private bookings: Booking[] = []
  private messages: Message[] = []
  private reviews: Review[] = []
  private partners: Partner[] = []
  private faqs: FAQ[] = []
  private clientRequests: ClientRequest[] = []
  private blogPosts: BlogPost[] = []

  constructor() {
    // Charger depuis localStorage si disponible
    if (typeof window !== 'undefined') {
      const savedProperties = localStorage.getItem('properties')
      const savedBookings = localStorage.getItem('bookings')
      const savedMessages = localStorage.getItem('messages')
      const savedReviews = localStorage.getItem('reviews')
      const savedPartners = localStorage.getItem('partners')
      const savedFAQs = localStorage.getItem('faqs')
      const savedClientRequests = localStorage.getItem('clientRequests')
      const savedBlogPosts = localStorage.getItem('blogPosts')

      this.properties = savedProperties ? JSON.parse(savedProperties) : initialProperties
      this.bookings = savedBookings ? JSON.parse(savedBookings) : initialBookings
      this.messages = savedMessages ? JSON.parse(savedMessages) : initialMessages
      this.reviews = savedReviews ? JSON.parse(savedReviews) : initialReviews
      this.partners = savedPartners ? JSON.parse(savedPartners) : initialPartners
      this.faqs = savedFAQs ? JSON.parse(savedFAQs) : initialFAQs
      this.clientRequests = savedClientRequests ? JSON.parse(savedClientRequests) : []
      this.blogPosts = savedBlogPosts ? JSON.parse(savedBlogPosts) : initialBlogPosts

      // Si les partenaires ou FAQs ne sont pas en localStorage, les sauvegarder
      if (!savedPartners && initialPartners.length > 0) {
        console.log('Initialisation des partenaires dans localStorage')
        localStorage.setItem('partners', JSON.stringify(initialPartners))
      }
      if (!savedFAQs && initialFAQs.length > 0) {
        console.log('Initialisation des FAQs dans localStorage')
        localStorage.setItem('faqs', JSON.stringify(initialFAQs))
      }
      if (!savedBlogPosts && initialBlogPosts.length > 0) {
        console.log('Initialisation des articles de blog dans localStorage')
        localStorage.setItem('blogPosts', JSON.stringify(initialBlogPosts))
      }
    } else {
      this.properties = initialProperties
      this.bookings = initialBookings
      this.messages = initialMessages
      this.reviews = initialReviews
      this.partners = initialPartners
      this.faqs = initialFAQs
      this.clientRequests = []
      this.blogPosts = initialBlogPosts
    }
  }

  // Properties
  getProperties(): Property[] {
    return this.properties
  }

  getProperty(id: string): Property | undefined {
    return this.properties.find(p => p.id === id)
  }

  addProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Property {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.properties.push(newProperty)
    this.save()
    return newProperty
  }

  updateProperty(id: string, updates: Partial<Property>): Property | undefined {
    const index = this.properties.findIndex(p => p.id === id)
    if (index !== -1) {
      this.properties[index] = {
        ...this.properties[index],
        ...updates,
        updatedAt: new Date(),
      }
      this.save()
      return this.properties[index]
    }
    return undefined
  }

  deleteProperty(id: string): boolean {
    const index = this.properties.findIndex(p => p.id === id)
    if (index !== -1) {
      this.properties.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Bookings
  getBookings(): Booking[] {
    return this.bookings
  }

  getBooking(id: string): Booking | undefined {
    return this.bookings.find(b => b.id === id)
  }

  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    this.bookings.push(newBooking)
    this.save()
    return newBooking
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
    const index = this.bookings.findIndex(b => b.id === id)
    if (index !== -1) {
      this.bookings[index] = {
        ...this.bookings[index],
        ...updates,
      }
      this.save()
      return this.bookings[index]
    }
    return undefined
  }

  deleteBooking(id: string): boolean {
    const index = this.bookings.findIndex(b => b.id === id)
    if (index !== -1) {
      this.bookings.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Messages
  getMessages(): Message[] {
    return this.messages
  }

  getMessage(id: string): Message | undefined {
    return this.messages.find(m => m.id === id)
  }

  addMessage(message: Omit<Message, 'id' | 'createdAt'>): Message {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    this.messages.push(newMessage)
    this.save()
    return newMessage
  }

  updateMessage(id: string, updates: Partial<Message>): Message | undefined {
    const index = this.messages.findIndex(m => m.id === id)
    if (index !== -1) {
      this.messages[index] = {
        ...this.messages[index],
        ...updates,
      }
      this.save()
      return this.messages[index]
    }
    return undefined
  }

  deleteMessage(id: string): boolean {
    const index = this.messages.findIndex(m => m.id === id)
    if (index !== -1) {
      this.messages.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Reviews
  getReviews(): Review[] {
    return this.reviews
  }

  getReview(id: string): Review | undefined {
    return this.reviews.find(r => r.id === id)
  }

  getReviewsByProperty(propertyId: string): Review[] {
    return this.reviews.filter(r => r.propertyId === propertyId && r.status === 'approuve')
  }

  getPropertyRating(propertyId: string): { rating: number; count: number } {
    const propertyReviews = this.reviews.filter(
      r => r.propertyId === propertyId && r.status === 'approuve'
    )
    
    if (propertyReviews.length === 0) {
      return { rating: 0, count: 0 }
    }

    const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0)
    const avgRating = totalRating / propertyReviews.length
    
    return {
      rating: Math.round(avgRating * 10) / 10, // Arrondir à 1 décimale
      count: propertyReviews.length
    }
  }

  addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    this.reviews.push(newReview)
    this.save()
    return newReview
  }

  updateReview(id: string, updates: Partial<Review>): Review | undefined {
    const index = this.reviews.findIndex(r => r.id === id)
    if (index !== -1) {
      this.reviews[index] = {
        ...this.reviews[index],
        ...updates,
      }
      this.save()
      return this.reviews[index]
    }
    return undefined
  }

  deleteReview(id: string): boolean {
    const index = this.reviews.findIndex(r => r.id === id)
    if (index !== -1) {
      this.reviews.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Partners
  getPartners(): Partner[] {
    return this.partners.filter(p => p.actif).sort((a, b) => a.ordre - b.ordre)
  }

  getAllPartners(): Partner[] {
    return this.partners.sort((a, b) => a.ordre - b.ordre)
  }

  getPartner(id: string): Partner | undefined {
    return this.partners.find(p => p.id === id)
  }

  addPartner(partner: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Partner {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.partners.push(newPartner)
    this.save()
    return newPartner
  }

  updatePartner(id: string, updates: Partial<Partner>): Partner | undefined {
    const index = this.partners.findIndex(p => p.id === id)
    if (index !== -1) {
      this.partners[index] = {
        ...this.partners[index],
        ...updates,
        updatedAt: new Date(),
      }
      this.save()
      return this.partners[index]
    }
    return undefined
  }

  deletePartner(id: string): boolean {
    const index = this.partners.findIndex(p => p.id === id)
    if (index !== -1) {
      this.partners.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // FAQs
  getFAQs(): FAQ[] {
    return this.faqs.filter(f => f.actif).sort((a, b) => a.ordre - b.ordre)
  }

  getAllFAQs(): FAQ[] {
    return this.faqs.sort((a, b) => a.ordre - b.ordre)
  }

  getFAQ(id: string): FAQ | undefined {
    return this.faqs.find(f => f.id === id)
  }

  addFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): FAQ {
    const newFAQ: FAQ = {
      ...faq,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.faqs.push(newFAQ)
    this.save()
    return newFAQ
  }

  updateFAQ(id: string, updates: Partial<FAQ>): FAQ | undefined {
    const index = this.faqs.findIndex(f => f.id === id)
    if (index !== -1) {
      this.faqs[index] = {
        ...this.faqs[index],
        ...updates,
        updatedAt: new Date(),
      }
      this.save()
      return this.faqs[index]
    }
    return undefined
  }

  deleteFAQ(id: string): boolean {
    const index = this.faqs.findIndex(f => f.id === id)
    if (index !== -1) {
      this.faqs.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Sauvegarder dans localStorage avec gestion des erreurs de quota
  private save() {
    if (typeof window !== 'undefined') {
      try {
        // Essayer de sauvegarder normalement
        localStorage.setItem('properties', JSON.stringify(this.properties))
        localStorage.setItem('bookings', JSON.stringify(this.bookings))
        localStorage.setItem('messages', JSON.stringify(this.messages))
        localStorage.setItem('reviews', JSON.stringify(this.reviews))
        localStorage.setItem('partners', JSON.stringify(this.partners))
        localStorage.setItem('faqs', JSON.stringify(this.faqs))
        localStorage.setItem('blogPosts', JSON.stringify(this.blogPosts))
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn('⚠️ Quota localStorage dépassé. Tentative de nettoyage...')
          
          // Stratégie 1: Nettoyer les anciennes données
          this.cleanupOldData()
          
          try {
            // Réessayer après nettoyage
            localStorage.setItem('properties', JSON.stringify(this.properties))
            localStorage.setItem('bookings', JSON.stringify(this.bookings))
            localStorage.setItem('messages', JSON.stringify(this.messages))
            localStorage.setItem('reviews', JSON.stringify(this.reviews))
            localStorage.setItem('partners', JSON.stringify(this.partners))
            localStorage.setItem('faqs', JSON.stringify(this.faqs))
            localStorage.setItem('clientRequests', JSON.stringify(this.clientRequests))
            localStorage.setItem('blogPosts', JSON.stringify(this.blogPosts))
            console.log('✅ Sauvegarde réussie après nettoyage')
          } catch (retryError) {
            // Stratégie 2: Sauvegarder uniquement les données essentielles (sans images)
            console.warn('⚠️ Sauvegarde des données essentielles uniquement (sans images)')
            this.saveEssentialData()
          }
        } else {
          console.error('Erreur lors de la sauvegarde:', error)
        }
      }
    }
  }

  // Client Requests (Demandes clients)
  getClientRequests(): ClientRequest[] {
    return this.clientRequests.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  getClientRequest(id: string): ClientRequest | undefined {
    return this.clientRequests.find(r => r.id === id)
  }

  getClientRequestsByType(type: ClientRequest['type']): ClientRequest[] {
    return this.clientRequests
      .filter(r => r.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  getClientRequestsByStatus(status: ClientRequest['status']): ClientRequest[] {
    return this.clientRequests
      .filter(r => r.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  addClientRequest(request: Omit<ClientRequest, 'id' | 'createdAt' | 'updatedAt'>): ClientRequest {
    const newRequest: ClientRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.clientRequests.push(newRequest)
    this.save()
    return newRequest
  }

  updateClientRequest(id: string, updates: Partial<ClientRequest>): ClientRequest | undefined {
    const index = this.clientRequests.findIndex(r => r.id === id)
    if (index !== -1) {
      this.clientRequests[index] = {
        ...this.clientRequests[index],
        ...updates,
        updatedAt: new Date(),
      }
      this.save()
      return this.clientRequests[index]
    }
    return undefined
  }

  deleteClientRequest(id: string): boolean {
    const index = this.clientRequests.findIndex(r => r.id === id)
    if (index !== -1) {
      this.clientRequests.splice(index, 1)
      this.save()
      return true
    }
    return false
  }

  // Nettoyer les anciennes données pour libérer de l'espace
  private cleanupOldData() {
    // Supprimer les messages lus de plus de 30 jours
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    this.messages = this.messages.filter(m => {
      if (m.status === 'lu' && new Date(m.createdAt) < thirtyDaysAgo) {
        return false
      }
      return true
    })

    // Supprimer les réservations terminées de plus de 90 jours
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
    
    this.bookings = this.bookings.filter(b => {
      if (b.status === 'termine' && new Date(b.checkOut) < ninetyDaysAgo) {
        return false
      }
      return true
    })
  }

  // Sauvegarder uniquement les données essentielles (sans images base64)
  private saveEssentialData() {
    try {
      // Créer des copies sans les images lourdes
      const lightProperties = this.properties.map(p => ({
        ...p,
        images: p.images.slice(0, 1), // Garder seulement la première image
      }))

      localStorage.setItem('properties', JSON.stringify(lightProperties))
      localStorage.setItem('bookings', JSON.stringify(this.bookings))
      localStorage.setItem('messages', JSON.stringify(this.messages))
      localStorage.setItem('reviews', JSON.stringify(this.reviews))
      localStorage.setItem('partners', JSON.stringify(this.partners))
      localStorage.setItem('faqs', JSON.stringify(this.faqs))
      localStorage.setItem('clientRequests', JSON.stringify(this.clientRequests))
      
      // Avertir l'utilisateur
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('storage-warning', {
          detail: {
            message: 'Espace de stockage limité. Certaines images n\'ont pas été sauvegardées. Veuillez utiliser une base de données pour un stockage permanent.'
          }
        }))
      }
    } catch (error) {
      console.error('❌ Impossible de sauvegarder même les données essentielles:', error)
      // En dernier recours, afficher un message à l'utilisateur
      alert('⚠️ ATTENTION: L\'espace de stockage est plein. Les données ne peuvent pas être sauvegardées. Veuillez contacter l\'administrateur pour migrer vers une base de données.')
    }
  }

  // Méthode pour vérifier l'espace disponible
  getStorageInfo() {
    if (typeof window === 'undefined') return null

    try {
      const used = new Blob([
        localStorage.getItem('properties') || '',
        localStorage.getItem('bookings') || '',
        localStorage.getItem('messages') || ''
      ]).size

      // localStorage limite typique: 5-10MB
      const limit = 5 * 1024 * 1024 // 5MB
      const percentage = (used / limit) * 100

      return {
        used: used,
        usedMB: (used / (1024 * 1024)).toFixed(2),
        limit: limit,
        limitMB: (limit / (1024 * 1024)).toFixed(2),
        percentage: percentage.toFixed(1),
        warning: percentage > 80
      }
    } catch (error) {
      return null
    }
  }

  // Stats
  getStats() {
    const totalProperties = this.properties.length
    const availableProperties = this.properties.filter(p => p.status === 'disponible').length
    const totalBookings = this.bookings.length
    const pendingBookings = this.bookings.filter(b => b.status === 'en_attente').length
    const confirmedBookings = this.bookings.filter(b => b.status === 'confirme').length
    const unreadMessages = this.messages.filter(m => m.status === 'non_lu').length
    const totalRevenue = this.bookings
      .filter(b => b.status === 'confirme' || b.status === 'termine')
      .reduce((sum, b) => sum + b.totalPrice, 0)
    const newRequests = this.clientRequests.filter(r => r.status === 'nouveau').length
    const totalRequests = this.clientRequests.length

    return {
      totalProperties,
      availableProperties,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      unreadMessages,
      totalRevenue,
      newRequests,
      totalRequests,
    }
  }

  // Blog Posts
  getBlogPosts(): BlogPost[] {
    // Retourner uniquement les articles publiés, triés par épinglés puis date
    return this.blogPosts
      .filter(post => post.isPublished)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
      })
  }

  getAllBlogPosts(): BlogPost[] {
    // Pour l'admin : tous les articles (publiés et brouillons)
    return this.blogPosts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    const post = this.blogPosts.find(p => p.slug === slug && p.isPublished)
    if (post) {
      // Incrémenter les vues
      post.views++
      this.save()
    }
    return post
  }

  getBlogPostById(id: string): BlogPost | undefined {
    return this.blogPosts.find(p => p.id === id)
  }

  addBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: post.isPublished ? new Date() : undefined,
    }
    this.blogPosts.push(newPost)
    this.save()
    return newPost
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.blogPosts.findIndex(p => p.id === id)
    if (index === -1) return null

    const wasPublished = this.blogPosts[index].isPublished
    this.blogPosts[index] = {
      ...this.blogPosts[index],
      ...updates,
      updatedAt: new Date(),
      publishedAt: !wasPublished && updates.isPublished ? new Date() : this.blogPosts[index].publishedAt,
    }
    this.save()
    return this.blogPosts[index]
  }

  deleteBlogPost(id: string): boolean {
    const index = this.blogPosts.findIndex(p => p.id === id)
    if (index === -1) return false
    this.blogPosts.splice(index, 1)
    this.save()
    return true
  }

  toggleBlogPostPin(id: string): BlogPost | null {
    const post = this.blogPosts.find(p => p.id === id)
    if (!post) return null
    post.isPinned = !post.isPinned
    post.updatedAt = new Date()
    this.save()
    return post
  }

  // Réinitialiser toutes les données
  clearAllData(): void {
    this.properties = initialProperties
    this.bookings = initialBookings
    this.messages = initialMessages
    this.reviews = initialReviews
    this.partners = initialPartners
    this.faqs = initialFAQs
    this.clientRequests = []
    this.blogPosts = initialBlogPosts
    this.save()
  }
}

// Singleton instance
let storeInstance: DataStore | null = null

export function getStore(): DataStore {
  if (!storeInstance) {
    storeInstance = new DataStore()
  }
  return storeInstance
}
