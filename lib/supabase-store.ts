import { supabase } from './supabase'
import type { Property, ClientRequest, Message, Review, Partner, FAQ, BlogPost } from './data'

// Helper pour convertir snake_case en camelCase
function convertToCamelCase(obj: any): any {
  if (!obj) return obj
  
  const converted: any = { ...obj }
  
  // Conversions communes
  if (obj.created_at !== undefined) converted.createdAt = obj.created_at
  if (obj.updated_at !== undefined) converted.updatedAt = obj.updated_at
  
  // Pour les reviews - mapper name/email vers clientName/clientEmail
  // SEULEMENT si c'est un review (a un property_id et rating)
  if (obj.property_id && obj.rating !== undefined) {
    if (obj.name !== undefined && !obj.clientName) converted.clientName = obj.name
    if (obj.email !== undefined && !obj.clientEmail) converted.clientEmail = obj.email
  }
  
  // Convertir approved (boolean) en status (string)
  if (obj.approved !== undefined && !obj.status) {
    converted.status = obj.approved ? 'approuve' : 'en_attente'
  }
  
  // Parser les amenities si c'est du texte JSON
  if (obj.amenities && Array.isArray(obj.amenities)) {
    converted.amenities = obj.amenities.map((amenity: any) => {
      if (typeof amenity === 'string') {
        try {
          return JSON.parse(amenity)
        } catch {
          return amenity
        }
      }
      return amenity
    })
  }
  if (obj.property_id !== undefined) converted.propertyId = obj.property_id
  if (obj.property_title !== undefined) converted.propertyTitle = obj.property_title
  if (obj.property_type !== undefined) converted.propertyType = obj.property_type
  if (obj.property_address !== undefined) converted.propertyAddress = obj.property_address
  if (obj.property_area !== undefined) converted.propertyArea = obj.property_area
  if (obj.property_rooms !== undefined) converted.propertyRooms = obj.property_rooms
  if (obj.estimation_details !== undefined) converted.estimationDetails = obj.estimation_details
  if (obj.preferred_date !== undefined) converted.preferredDate = obj.preferred_date
  if (obj.preferred_time !== undefined) converted.preferredTime = obj.preferred_time
  if (obj.visit_message !== undefined) converted.visitMessage = obj.visit_message
  if (obj.check_in !== undefined) converted.checkIn = obj.check_in
  if (obj.check_out !== undefined) converted.checkOut = obj.check_out
  if (obj.reservation_message !== undefined) converted.reservationMessage = obj.reservation_message
  if (obj.total_price !== undefined) converted.totalPrice = obj.total_price
  if (obj.price_per_night !== undefined) converted.pricePerNight = obj.price_per_night
  if (obj.appointment_date !== undefined) converted.appointmentDate = obj.appointment_date
  if (obj.appointment_time !== undefined) converted.appointmentTime = obj.appointment_time
  if (obj.appointment_reason !== undefined) converted.appointmentReason = obj.appointment_reason
  if (obj.appointment_message !== undefined) converted.appointmentMessage = obj.appointment_message
  if (obj.email_sent !== undefined) converted.emailSent = obj.email_sent
  if (obj.admin_notes !== undefined) converted.adminNotes = obj.admin_notes
  if (obj.video_url !== undefined) converted.videoUrl = obj.video_url
  if (obj.virtual_tour_url !== undefined) converted.virtualTourUrl = obj.virtual_tour_url
  if (obj.detailed_description !== undefined) converted.detailedDescription = obj.detailed_description
  if (obj.rental_conditions !== undefined) converted.rentalConditions = obj.rental_conditions
  if (obj.purchase_conditions !== undefined) converted.purchaseConditions = obj.purchase_conditions
  if (obj.legal_info !== undefined) converted.legalInfo = obj.legal_info
  if (obj.pricing_info !== undefined) converted.pricingInfo = obj.pricing_info
  
  // Conversions pour le blog
  if (obj.cover_image !== undefined) converted.coverImage = obj.cover_image
  if (obj.cover_image_position !== undefined) converted.coverImagePosition = obj.cover_image_position
  if (obj.is_pinned !== undefined) converted.isPinned = obj.is_pinned
  if (obj.is_published !== undefined) converted.isPublished = obj.is_published
  if (obj.published_at !== undefined) converted.publishedAt = obj.published_at
  
  return converted
}

// ==================== PROPERTIES ====================

// Récupérer les biens publics (sans brouillons)
export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('available', true)
    .neq('status', 'brouillon') // Exclure les brouillons
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching properties:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

// Récupérer TOUS les biens (pour l'admin)
export async function getAllProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('available', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all properties:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getProperty(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching property:', error)
    return null
  }
  
  return convertToCamelCase(data)
}

export async function addProperty(property: Property): Promise<void> {
  // Convertir camelCase en snake_case pour Supabase
  const dbProperty = {
    id: property.id,
    type: property.type,
    title: property.title,
    location: property.location,
    price: property.price,
    period: property.period,
    description: property.description,
    beds: property.beds,
    baths: property.baths,
    area: property.area,
    guests: property.guests,
    images: property.images,
    features: property.features,
    amenities: property.amenities,
    available: true,
    rooms: (property as any).rooms,
    video_url: (property as any).videoUrl,
    virtual_tour_url: (property as any).virtualTourUrl,
    status: (property as any).status || 'disponible',
    featured: (property as any).featured || false,
    detailed_description: (property as any).detailedDescription,
    environment: (property as any).environment,
    rules: (property as any).rules,
    rental_conditions: (property as any).rentalConditions,
    purchase_conditions: (property as any).purchaseConditions,
    fees: (property as any).fees,
    legal_info: (property as any).legalInfo,
    pricing_info: (property as any).pricingInfo, // Nouveau champ
    created_at: (property as any).created_at,
    updated_at: (property as any).updated_at,
  }
  
  const { error } = await supabase
    .from('properties')
    .insert([dbProperty])
  
  if (error) {
    console.error('Error adding property:', error)
    throw error
  }
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<void> {
  // Convertir camelCase en snake_case
  const dbUpdates: any = { updated_at: new Date().toISOString() }
  
  if (updates.videoUrl !== undefined) dbUpdates.video_url = updates.videoUrl
  if (updates.virtualTourUrl !== undefined) dbUpdates.virtual_tour_url = updates.virtualTourUrl
  if (updates.detailedDescription !== undefined) dbUpdates.detailed_description = updates.detailedDescription
  if (updates.rentalConditions !== undefined) dbUpdates.rental_conditions = updates.rentalConditions
  if (updates.purchaseConditions !== undefined) dbUpdates.purchase_conditions = updates.purchaseConditions
  if (updates.legalInfo !== undefined) dbUpdates.legal_info = updates.legalInfo
  if ((updates as any).pricingInfo !== undefined) dbUpdates.pricing_info = (updates as any).pricingInfo
  
  // Copier les autres champs directement
  Object.keys(updates).forEach(key => {
    if (!['videoUrl', 'virtualTourUrl', 'detailedDescription', 'rentalConditions', 'purchaseConditions', 'legalInfo', 'pricingInfo', 'createdAt', 'updatedAt'].includes(key)) {
      dbUpdates[key] = (updates as any)[key]
    }
  })
  
  const { error } = await supabase
    .from('properties')
    .update(dbUpdates)
    .eq('id', id)
  
  if (error) {
    console.error('Error updating property:', error)
    throw error
  }
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting property:', error)
    throw error
  }
}

// ==================== CLIENT REQUESTS ====================

export async function getClientRequests(): Promise<ClientRequest[]> {
  const { data, error } = await supabase
    .from('client_requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching client requests:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function addClientRequest(request: ClientRequest): Promise<void> {
  const { error } = await supabase
    .from('client_requests')
    .insert([request])
  
  if (error) {
    console.error('Error adding client request:', error)
    throw error
  }
}

export async function updateClientRequest(id: string, updates: Partial<ClientRequest>): Promise<void> {
  const { error } = await supabase
    .from('client_requests')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) {
    console.error('Error updating client request:', error)
    throw error
  }
}

export async function deleteClientRequest(id: string): Promise<void> {
  const { error } = await supabase
    .from('client_requests')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting client request:', error)
    throw error
  }
}

// ============================================
// SETTINGS (Configuration de l'agence)
// ============================================

export interface AgencySettings {
  id: string
  name: string
  email: string
  phone: string
  address: string
  hours: string
  facebook?: string
  instagram?: string
  tiktok?: string
  createdAt?: string
  updatedAt?: string
}

export async function getAgencySettings(): Promise<AgencySettings | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 'agency_config')
    .single()

  if (error) {
    console.error('Error fetching agency settings:', error)
    return null
  }

  return data ? convertToCamelCase(data) : null
}

export async function updateAgencySettings(settings: Partial<AgencySettings>): Promise<void> {
  const dbSettings: any = { ...settings }
  
  // Convertir camelCase en snake_case si nécessaire
  if (settings.createdAt) {
    dbSettings.created_at = settings.createdAt
    delete dbSettings.createdAt
  }
  if (settings.updatedAt) {
    dbSettings.updated_at = settings.updatedAt
    delete dbSettings.updatedAt
  }
  
  dbSettings.updated_at = new Date().toISOString()
  
  const { error } = await supabase
    .from('settings')
    .update(dbSettings)
    .eq('id', 'agency_config')

  if (error) {
    console.error('Error updating agency settings:', error)
    throw error
  }
}

// ==================== MESSAGES ====================

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function addMessage(message: Message): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .insert([message])
  
  if (error) {
    console.error('Error adding message:', error)
    throw error
  }
}

export async function updateMessage(id: string, updates: Partial<Message>): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update(updates)
    .eq('id', id)
  
  if (error) {
    console.error('Error updating message:', error)
    throw error
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

// ==================== REVIEWS ====================

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getReviewsByProperty(propertyId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('property_id', propertyId)
    .eq('approved', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching reviews by property:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function addReview(review: Review): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .insert([review])
  
  if (error) {
    console.error('Error adding review:', error)
    throw error
  }
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<void> {
  // Convertir status en approved pour Supabase
  const dbUpdates: any = { ...updates }
  if (updates.status) {
    dbUpdates.approved = updates.status === 'approuve'
    delete dbUpdates.status
  }
  
  const { error } = await supabase
    .from('reviews')
    .update(dbUpdates)
    .eq('id', id)
  
  if (error) {
    console.error('Error updating review:', error)
    throw error
  }
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}

// ==================== PARTNERS ====================

export async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('actif', true)
    .order('ordre', { ascending: true })
  
  if (error) {
    console.error('Error fetching partners:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getAllPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('ordre', { ascending: true })
  
  if (error) {
    console.error('Error fetching all partners:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function addPartner(partner: Partner): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .insert([partner])
  
  if (error) {
    console.error('Error adding partner:', error)
    throw error
  }
}

export async function updatePartner(id: string, updates: Partial<Partner>): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) {
    console.error('Error updating partner:', error)
    throw error
  }
}

export async function deletePartner(id: string): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting partner:', error)
    throw error
  }
}

// ==================== FAQs ====================

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('actif', true)
    .order('ordre', { ascending: true })
  
  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('ordre', { ascending: true })
  
  if (error) {
    console.error('Error fetching all FAQs:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function addFAQ(faq: FAQ): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .insert([faq])
  
  if (error) {
    console.error('Error adding FAQ:', error)
    throw error
  }
}

export async function updateFAQ(id: string, updates: Partial<FAQ>): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) {
    console.error('Error updating FAQ:', error)
    throw error
  }
}

export async function deleteFAQ(id: string): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting FAQ:', error)
    throw error
  }
}

// ==================== BLOG POSTS ====================

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }
  
  return (data || []).map(convertToCamelCase)
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
  
  // Incrémenter les vues
  if (data) {
    await supabase
      .from('blog_posts')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id)
  }
  
  return data ? convertToCamelCase(data) : null
}

export async function addBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) {
  const newPost = {
    id: Date.now().toString(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage,
    cover_image_position: post.coverImagePosition || '50% 50%',
    images: post.images,
    links: post.links || [],
    category: post.category,
    tags: post.tags,
    author: post.author,
    is_pinned: post.isPinned,
    is_published: post.isPublished,
    published_at: post.publishedAt || (post.isPublished ? new Date().toISOString() : null),
    views: 0,
  }
  
  console.log('Saving blog post with position:', newPost.cover_image_position)
  console.log('Saving blog post with images:', newPost.images)
  console.log('Saving blog post with links:', newPost.links)
  
  const { error } = await supabase
    .from('blog_posts')
    .insert([newPost])
  
  if (error) {
    console.error('Error adding blog post:', error)
    throw error
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const dbUpdates: any = {}
  
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug
  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt
  if (updates.content !== undefined) dbUpdates.content = updates.content
  if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage
  if (updates.coverImagePosition !== undefined) dbUpdates.cover_image_position = updates.coverImagePosition
  if (updates.images !== undefined) dbUpdates.images = updates.images
  if (updates.links !== undefined) dbUpdates.links = updates.links
  if (updates.category !== undefined) dbUpdates.category = updates.category
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags
  if (updates.author !== undefined) dbUpdates.author = updates.author
  if (updates.isPinned !== undefined) dbUpdates.is_pinned = updates.isPinned
  if (updates.isPublished !== undefined) {
    dbUpdates.is_published = updates.isPublished
    // Si on publie pour la première fois, définir published_at
    if (updates.isPublished && !updates.publishedAt) {
      dbUpdates.published_at = new Date().toISOString()
    }
  }
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt
  
  const { error } = await supabase
    .from('blog_posts')
    .update(dbUpdates)
    .eq('id', id)
  
  if (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

export async function toggleBlogPostPin(id: string) {
  // Récupérer l'état actuel
  const { data, error: fetchError } = await supabase
    .from('blog_posts')
    .select('is_pinned')
    .eq('id', id)
    .single()
  
  if (fetchError) {
    console.error('Error fetching blog post:', fetchError)
    throw fetchError
  }
  
  // Inverser l'état
  const { error } = await supabase
    .from('blog_posts')
    .update({ is_pinned: !data.is_pinned })
    .eq('id', id)
  
  if (error) {
    console.error('Error toggling pin:', error)
    throw error
  }
}
