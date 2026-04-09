import { query, queryOne, insert, update, deleteRow } from './mysql'
import type { Property, ClientRequest, Message, Review, Partner, FAQ, BlogPost } from './data'

// Helper pour convertir snake_case en camelCase
function convertToCamelCase(obj: any): any {
  if (!obj) return obj
  
  const converted: any = { ...obj }
  
  // Conversions communes
  if (obj.created_at !== undefined) converted.createdAt = obj.created_at
  if (obj.updated_at !== undefined) converted.updatedAt = obj.updated_at
  
  // Pour les reviews - mapper name/email vers clientName/clientEmail
  if (obj.property_id && obj.rating !== undefined) {
    if (obj.name !== undefined && !obj.clientName) converted.clientName = obj.name
    if (obj.email !== undefined && !obj.clientEmail) converted.clientEmail = obj.email
  }
  
  // Convertir approved (boolean) en status (string)
  if (obj.approved !== undefined && !obj.status) {
    converted.status = obj.approved ? 'approuve' : 'en_attente'
  }
  
  // Parser les JSON fields
  const jsonFields = ['images', 'amenities', 'features', 'rules', 'detailed_description', 'environment', 
                      'rental_conditions', 'purchase_conditions', 'fees', 'legal_info', 'pricing_info', 'tags', 'links']
  
  jsonFields.forEach(field => {
    if (obj[field] && typeof obj[field] === 'string') {
      try {
        converted[field] = JSON.parse(obj[field])
      } catch {
        converted[field] = obj[field]
      }
    }
  })
  
  if (obj.property_id !== undefined) converted.propertyId = obj.property_id
  if (obj.property_title !== undefined) converted.propertyTitle = obj.property_title
  if (obj.property_type !== undefined) converted.propertyType = obj.property_type
  if (obj.property_category !== undefined) converted.propertyCategory = obj.property_category
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
  
  // Parser les JSON pour blog
  if (obj.tags !== undefined) {
    try {
      converted.tags = typeof obj.tags === 'string' ? JSON.parse(obj.tags) : (obj.tags || [])
    } catch {
      converted.tags = []
    }
  }
  if (obj.images !== undefined) {
    try {
      converted.images = typeof obj.images === 'string' ? JSON.parse(obj.images) : (obj.images || [])
    } catch {
      converted.images = []
    }
  }
  if (obj.links !== undefined) {
    try {
      converted.links = typeof obj.links === 'string' ? JSON.parse(obj.links) : (obj.links || [])
    } catch {
      converted.links = []
    }
  }
  
  return converted
}

// ==================== PROPERTIES ====================

export async function getProperties(): Promise<Property[]> {
  try {
    const sql = `
      SELECT * FROM properties 
      WHERE available = true AND status != 'brouillon'
      ORDER BY created_at DESC
    `
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export async function getAllProperties(): Promise<Property[]> {
  try {
    const sql = `
      SELECT * FROM properties 
      WHERE available = true
      ORDER BY created_at DESC
    `
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching all properties:', error)
    return []
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const sql = `SELECT * FROM properties WHERE id = ?`
    const row = await queryOne<any>(sql, [id])
    return row ? convertToCamelCase(row) : null
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export async function addProperty(property: Property): Promise<void> {
  const data = {
    id: property.id,
    type: property.type,
    property_category: (property as any).propertyCategory || 'maison',
    title: property.title,
    location: property.location,
    price: property.price,
    period: property.period || null,
    description: property.description,
    rooms: (property as any).rooms || null,
    beds: property.beds,
    baths: property.baths,
    area: property.area,
    guests: property.guests || null,
    images: JSON.stringify(property.images),
    video_url: (property as any).videoUrl || null,
    virtual_tour_url: (property as any).virtualTourUrl || null,
    features: JSON.stringify(property.features),
    amenities: JSON.stringify(property.amenities),
    rules: JSON.stringify((property as any).rules || []),
    detailed_description: JSON.stringify((property as any).detailedDescription || null),
    environment: JSON.stringify((property as any).environment || null),
    rental_conditions: JSON.stringify((property as any).rentalConditions || null),
    purchase_conditions: JSON.stringify((property as any).purchaseConditions || null),
    fees: JSON.stringify((property as any).fees || null),
    legal_info: JSON.stringify((property as any).legalInfo || null),
    pricing_info: JSON.stringify((property as any).pricingInfo || null),
    status: (property as any).status || 'disponible',
    featured: (property as any).featured || false,
    available: true,
  }
  
  await insert('properties', data)
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<void> {
  const data: any = {}
  
  if (updates.title !== undefined) data.title = updates.title
  if (updates.type !== undefined) data.type = updates.type
  if ((updates as any).propertyCategory !== undefined) data.property_category = (updates as any).propertyCategory
  if (updates.location !== undefined) data.location = updates.location
  if (updates.price !== undefined) data.price = updates.price
  if (updates.period !== undefined) data.period = updates.period
  if (updates.description !== undefined) data.description = updates.description
  if ((updates as any).rooms !== undefined) data.rooms = (updates as any).rooms
  if (updates.beds !== undefined) data.beds = updates.beds
  if (updates.baths !== undefined) data.baths = updates.baths
  if (updates.area !== undefined) data.area = updates.area
  if (updates.guests !== undefined) data.guests = updates.guests
  if (updates.images !== undefined) data.images = JSON.stringify(updates.images)
  if (updates.videoUrl !== undefined) data.video_url = updates.videoUrl
  if (updates.virtualTourUrl !== undefined) data.virtual_tour_url = updates.virtualTourUrl
  if (updates.features !== undefined) data.features = JSON.stringify(updates.features)
  if (updates.amenities !== undefined) data.amenities = JSON.stringify(updates.amenities)
  if ((updates as any).rules !== undefined) data.rules = JSON.stringify((updates as any).rules)
  if (updates.detailedDescription !== undefined) data.detailed_description = JSON.stringify(updates.detailedDescription)
  if (updates.environment !== undefined) data.environment = JSON.stringify(updates.environment)
  if (updates.rentalConditions !== undefined) data.rental_conditions = JSON.stringify(updates.rentalConditions)
  if (updates.purchaseConditions !== undefined) data.purchase_conditions = JSON.stringify(updates.purchaseConditions)
  if (updates.fees !== undefined) data.fees = JSON.stringify(updates.fees)
  if (updates.legalInfo !== undefined) data.legal_info = JSON.stringify(updates.legalInfo)
  if ((updates as any).pricingInfo !== undefined) data.pricing_info = JSON.stringify((updates as any).pricingInfo)
  if ((updates as any).status !== undefined) data.status = (updates as any).status
  if ((updates as any).featured !== undefined) data.featured = (updates as any).featured
  if ((updates as any).available !== undefined) data.available = (updates as any).available
  
  await update('properties', data, 'id = ?', [id])
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteRow('properties', 'id = ?', [id])
}

// ==================== CLIENT REQUESTS ====================

export async function getClientRequests(): Promise<ClientRequest[]> {
  try {
    const sql = `SELECT * FROM client_requests ORDER BY created_at DESC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching client requests:', error)
    return []
  }
}

export async function addClientRequest(request: ClientRequest): Promise<void> {
  const data = {
    id: request.id,
    type: request.type,
    status: request.status || 'nouveau',
    name: request.name,
    email: request.email,
    phone: request.phone,
    property_id: (request as any).propertyId || null,
    property_title: (request as any).propertyTitle || null,
    property_type: (request as any).propertyType || null,
    property_address: (request as any).propertyAddress || null,
    property_area: (request as any).propertyArea || null,
    property_rooms: (request as any).propertyRooms || null,
    estimation_details: (request as any).estimationDetails || null,
    preferred_date: (request as any).preferredDate || null,
    preferred_time: (request as any).preferredTime || null,
    visit_message: (request as any).visitMessage || null,
    check_in: (request as any).checkIn || null,
    check_out: (request as any).checkOut || null,
    guests: (request as any).guests || null,
    reservation_message: (request as any).reservationMessage || null,
    total_price: (request as any).totalPrice || null,
    price_per_night: (request as any).pricePerNight || null,
    appointment_date: (request as any).appointmentDate || null,
    appointment_time: (request as any).appointmentTime || null,
    appointment_reason: (request as any).appointmentReason || null,
    appointment_message: (request as any).appointmentMessage || null,
    email_sent: (request as any).emailSent || false,
    admin_notes: (request as any).adminNotes || null,
  }
  
  await insert('client_requests', data)
}

export async function updateClientRequest(id: string, updates: Partial<ClientRequest>): Promise<void> {
  const data: any = {}
  
  if (updates.status !== undefined) data.status = updates.status
  if ((updates as any).adminNotes !== undefined) data.admin_notes = (updates as any).adminNotes
  if ((updates as any).emailSent !== undefined) data.email_sent = (updates as any).emailSent
  
  await update('client_requests', data, 'id = ?', [id])
}

export async function deleteClientRequest(id: string): Promise<void> {
  await deleteRow('client_requests', 'id = ?', [id])
}

// ==================== SETTINGS ====================

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
  youtube?: string
  createdAt?: string
  updatedAt?: string
}

export async function getAgencySettings(): Promise<AgencySettings | null> {
  try {
    const sql = `SELECT * FROM settings WHERE id = 'agency_config'`
    const row = await queryOne<any>(sql)
    return row ? convertToCamelCase(row) : null
  } catch (error) {
    console.error('Error fetching agency settings:', error)
    return null
  }
}

export async function updateAgencySettings(settings: Partial<AgencySettings>): Promise<void> {
  const data: any = {}
  
  if (settings.name !== undefined) data.name = settings.name
  if (settings.email !== undefined) data.email = settings.email
  if (settings.phone !== undefined) data.phone = settings.phone
  if (settings.address !== undefined) data.address = settings.address
  if (settings.hours !== undefined) data.hours = settings.hours
  if (settings.facebook !== undefined) data.facebook = settings.facebook
  if (settings.instagram !== undefined) data.instagram = settings.instagram
  if (settings.tiktok !== undefined) data.tiktok = settings.tiktok
  if (settings.youtube !== undefined) data.youtube = settings.youtube
  
  await update('settings', data, 'id = ?', ['agency_config'])
}

// ==================== MESSAGES ====================

export async function getMessages(): Promise<Message[]> {
  try {
    const sql = `SELECT * FROM messages ORDER BY created_at DESC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function addMessage(message: Message): Promise<void> {
  const data = {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone || null,
    subject: message.subject,
    message: message.message,
    status: message.status || 'non_lu',
  }
  
  await insert('messages', data)
}

export async function updateMessage(id: string, updates: Partial<Message>): Promise<void> {
  const data: any = {}
  
  if (updates.status !== undefined) data.status = updates.status
  
  await update('messages', data, 'id = ?', [id])
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteRow('messages', 'id = ?', [id])
}

// ==================== REVIEWS ====================

export async function getReviews(): Promise<Review[]> {
  try {
    const sql = `SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const sql = `SELECT * FROM reviews ORDER BY created_at DESC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }
}

export async function getReviewsByProperty(propertyId: string): Promise<Review[]> {
  try {
    const sql = `SELECT * FROM reviews WHERE property_id = ? AND approved = true ORDER BY created_at DESC`
    const rows = await query<any>(sql, [propertyId])
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching reviews by property:', error)
    return []
  }
}

export async function addReview(review: Review): Promise<void> {
  const data = {
    id: review.id,
    property_id: (review as any).propertyId,
    name: (review as any).clientName,
    email: (review as any).clientEmail,
    rating: review.rating,
    comment: review.comment,
    approved: review.status === 'approuve',
  }
  
  await insert('reviews', data)
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<void> {
  const data: any = {}
  
  if (updates.status !== undefined) data.approved = updates.status === 'approuve'
  if (updates.rating !== undefined) data.rating = updates.rating
  if (updates.comment !== undefined) data.comment = updates.comment
  
  await update('reviews', data, 'id = ?', [id])
}

export async function deleteReview(id: string): Promise<void> {
  await deleteRow('reviews', 'id = ?', [id])
}

// ==================== PARTNERS ====================

export async function getPartners(): Promise<Partner[]> {
  try {
    const sql = `SELECT * FROM partners WHERE actif = true ORDER BY ordre ASC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

export async function getAllPartners(): Promise<Partner[]> {
  try {
    const sql = `SELECT * FROM partners ORDER BY ordre ASC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching all partners:', error)
    return []
  }
}

export async function addPartner(partner: Partner): Promise<void> {
  const data = {
    id: partner.id,
    nom: partner.nom,
    categorie: partner.categorie,
    description: partner.description || null,
    logo: partner.logo || null,
    url: partner.url || null,
    promo: partner.promo || null,
    prix: partner.prix || null,
    ordre: partner.ordre || 0,
    actif: partner.actif !== undefined ? partner.actif : true,
  }
  
  await insert('partners', data)
}

export async function updatePartner(id: string, updates: Partial<Partner>): Promise<void> {
  const data: any = {}
  
  if (updates.nom !== undefined) data.nom = updates.nom
  if (updates.categorie !== undefined) data.categorie = updates.categorie
  if (updates.description !== undefined) data.description = updates.description
  if (updates.logo !== undefined) data.logo = updates.logo
  if (updates.url !== undefined) data.url = updates.url
  if (updates.promo !== undefined) data.promo = updates.promo
  if (updates.prix !== undefined) data.prix = updates.prix
  if (updates.ordre !== undefined) data.ordre = updates.ordre
  if (updates.actif !== undefined) data.actif = updates.actif
  
  await update('partners', data, 'id = ?', [id])
}

export async function deletePartner(id: string): Promise<void> {
  await deleteRow('partners', 'id = ?', [id])
}

// ==================== FAQs ====================

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const sql = `SELECT * FROM faqs WHERE actif = true ORDER BY ordre ASC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export async function getAllFAQs(): Promise<FAQ[]> {
  try {
    const sql = `SELECT * FROM faqs ORDER BY ordre ASC`
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching all FAQs:', error)
    return []
  }
}

export async function addFAQ(faq: FAQ): Promise<void> {
  const data = {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    categorie: faq.categorie || null,
    ordre: faq.ordre || 0,
    actif: faq.actif !== undefined ? faq.actif : true,
  }
  
  await insert('faqs', data)
}

export async function updateFAQ(id: string, updates: Partial<FAQ>): Promise<void> {
  const data: any = {}
  
  if (updates.question !== undefined) data.question = updates.question
  if (updates.answer !== undefined) data.answer = updates.answer
  if (updates.categorie !== undefined) data.categorie = updates.categorie
  if (updates.ordre !== undefined) data.ordre = updates.ordre
  if (updates.actif !== undefined) data.actif = updates.actif
  
  await update('faqs', data, 'id = ?', [id])
}

export async function deleteFAQ(id: string): Promise<void> {
  await deleteRow('faqs', 'id = ?', [id])
}

// ==================== BLOG POSTS ====================

export async function getBlogPosts() {
  try {
    const sql = `
      SELECT * FROM blog_posts 
      WHERE is_published = 1
      ORDER BY is_pinned DESC, 
               COALESCE(published_at, created_at) DESC
    `
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getAllBlogPosts() {
  try {
    const sql = `
      SELECT * FROM blog_posts 
      ORDER BY is_pinned DESC, created_at DESC
    `
    const rows = await query<any>(sql)
    return rows.map(convertToCamelCase)
  } catch (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const sql = `SELECT * FROM blog_posts WHERE slug = ?`
    const row = await queryOne<any>(sql, [slug])
    
    if (row) {
      // Incrémenter les vues
      await update('blog_posts', { views: (row.views || 0) + 1 }, 'id = ?', [row.id])
      return convertToCamelCase(row)
    }
    
    return null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function addBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) {
  const data = {
    id: Date.now().toString(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage,
    cover_image_position: post.coverImagePosition || '50% 50%',
    images: JSON.stringify(post.images || []),
    links: JSON.stringify(post.links || []),
    category: post.category,
    tags: JSON.stringify(post.tags || []),
    author: post.author || 'BBF Immobilier',
    is_pinned: post.isPinned || false,
    is_published: post.isPublished || false,
    published_at: post.publishedAt || (post.isPublished ? new Date().toISOString() : null),
    views: 0,
  }
  
  await insert('blog_posts', data)
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const data: any = {}
  
  if (updates.slug !== undefined) data.slug = updates.slug
  if (updates.title !== undefined) data.title = updates.title
  if (updates.excerpt !== undefined) data.excerpt = updates.excerpt
  if (updates.content !== undefined) data.content = updates.content
  if (updates.coverImage !== undefined) data.cover_image = updates.coverImage
  if (updates.coverImagePosition !== undefined) data.cover_image_position = updates.coverImagePosition
  if (updates.images !== undefined) data.images = JSON.stringify(updates.images)
  if (updates.links !== undefined) data.links = JSON.stringify(updates.links)
  if (updates.category !== undefined) data.category = updates.category
  if (updates.tags !== undefined) data.tags = JSON.stringify(updates.tags)
  if (updates.author !== undefined) data.author = updates.author
  if (updates.isPinned !== undefined) data.is_pinned = updates.isPinned ? 1 : 0
  if (updates.isPublished !== undefined) {
    data.is_published = updates.isPublished ? 1 : 0
    // Si on publie, définir la date de publication
    if (updates.isPublished) {
      // Récupérer l'article pour vérifier s'il a déjà une published_at
      const existingPost = await query<any>('SELECT published_at FROM blog_posts WHERE id = ?', [id])
      if (!existingPost[0]?.published_at) {
        data.published_at = new Date().toISOString()
      }
    }
  }
  if (updates.publishedAt !== undefined) data.published_at = updates.publishedAt
  
  await update('blog_posts', data, 'id = ?', [id])
}

export async function deleteBlogPost(id: string) {
  await deleteRow('blog_posts', 'id = ?', [id])
}

export async function toggleBlogPostPin(id: string) {
  try {
    const sql = `SELECT is_pinned FROM blog_posts WHERE id = ?`
    const row = await queryOne<any>(sql, [id])
    
    if (row) {
      await update('blog_posts', { is_pinned: !row.is_pinned }, 'id = ?', [id])
    }
  } catch (error) {
    console.error('Error toggling pin:', error)
    throw error
  }
}
