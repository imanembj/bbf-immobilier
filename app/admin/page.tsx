'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  Plus,
  Search,
  Filter,
  Check,
  X as XIcon,
  Mail,
  Phone as PhoneIcon,
  LogOut,
  Star,
  ThumbsUp,
  ThumbsDown,
  Users,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  FileText,
  BookOpen,
  Pin
} from 'lucide-react'
// Utilisation directe de MySQL via API routes - plus de localStorage
import { adminAPI } from '@/lib/admin-api'
import { Property, Booking, Message, Review, Partner, FAQ, ClientRequest, BlogPost } from '@/lib/data'
import toast from 'react-hot-toast'
import PropertyForm from '@/components/admin/PropertyForm'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { getSession, clearSession, saveSession } from '@/lib/auth-session'
import { PropertyFormData } from '@/lib/property-types'
import StorageMonitor from '@/components/admin/StorageMonitor'
import { getAgencyConfig, saveAgencyConfig, AgencyConfig } from '@/lib/agency-config'

// Helper pour afficher le prix de manière compacte dans le tableau
const getPriceDisplay = (property: any): string => {
  const pricingInfo = property.pricingInfo
  
  // IMPORTANT: Vérifier d'abord si pricingInfo existe et a un type défini
  if (pricingInfo && pricingInfo.type) {
    // Prix par saison
    if (pricingInfo.type === 'seasonal' && pricingInfo.seasonalPricing) {
      return `${pricingInfo.seasonalPricing.lowSeason}-${pricingInfo.seasonalPricing.highSeason}€${pricingInfo.period || ''}`
    }
    
    // Tarification personnalisée
    if (pricingInfo.type === 'custom' && pricingInfo.customPricing?.prices?.length > 0) {
      const prices = pricingInfo.customPricing.prices
      const minPrice = Math.min(...prices.map((p: any) => p.price))
      const maxPrice = Math.max(...prices.map((p: any) => p.price))
      const isPackage = pricingInfo.customPricing.isPackage
      const packageNights = pricingInfo.customPricing.packageNights
      
      if (isPackage && packageNights) {
        // Afficher le prix du forfait
        return minPrice === maxPrice 
          ? `${minPrice}€ (${packageNights}n)` 
          : `${minPrice}-${maxPrice}€ (${packageNights}n)`
      }
      return minPrice === maxPrice ? `${minPrice}€` : `${minPrice}-${maxPrice}€`
    }
    
    // Prix simple avec pricingInfo
    if (pricingInfo.type === 'simple' && pricingInfo.simplePrice) {
      return `${pricingInfo.simplePrice}€${pricingInfo.period || ''}`
    }
  }
  
  // Fallback pour les anciens biens sans pricingInfo
  return `${property.price}€${property.period || ''}`
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('properties')
  const [properties, setProperties] = useState<Property[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [editingFormData, setEditingFormData] = useState<Partial<PropertyFormData> | undefined>(undefined)
  const [respondingReview, setRespondingReview] = useState<Review | null>(null)
  const [reviewResponse, setReviewResponse] = useState('')
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [showPartnerForm, setShowPartnerForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [showFaqForm, setShowFaqForm] = useState(false)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [agencyConfig, setAgencyConfig] = useState<AgencyConfig>(getAgencyConfig())
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    unreadMessages: 0,
    totalRevenue: 0,
    newRequests: 0,
    totalRequests: 0,
    pendingReviews: 0, // Avis en attente
  })

  // Vérifier l'authentification
  useEffect(() => {
    const session = getSession()
    
    if (!session) {
      router.push('/admin/login')
      return
    }
    
    // Vérifier que la session n'a pas expiré (24h)
    const elapsed = Date.now() - session.loginTime
    const twentyFourHours = 24 * 60 * 60 * 1000
    if (elapsed > twentyFourHours) {
      clearSession()
      toast.error('Session expirée. Veuillez vous reconnecter.')
      router.push('/admin/login')
      return
    }
    
    setAdminEmail(session.user.email)
    setIsAuthenticated(true)
    loadData()
    setAgencyConfig(getAgencyConfig())
  }, [])

  const loadData = async () => {
    try {
      // Charger toutes les données depuis MySQL via API routes
      const [propsRes, msgsRes, revsRes, partsRes, faqsRes, reqsRes, blogsRes] = await Promise.all([
        fetch('/api/properties/all'),
        fetch('/api/admin/messages'),
        fetch('/api/admin/reviews'),
        fetch('/api/partners'),
        fetch('/api/faqs'),
        fetch('/api/requests'),
        fetch('/api/admin/blog'),
      ])

      const props = await propsRes.json()
      const msgs = await msgsRes.json()
      const revs = await revsRes.json()
      const parts = await partsRes.json()
      const faqs = await faqsRes.json()
      const reqs = await reqsRes.json()
      const blogs = await blogsRes.json()
      
      setProperties(props)
      setMessages(msgs)
      setReviews(revs)
      setPartners(parts)
      setFaqs(faqs)
      setClientRequests(reqs)
      setBlogPosts(blogs)
      
      // Settings depuis agency-config
      const settings = getAgencyConfig()
      if (settings) {
        setAgencyConfig(settings)
      }
      
      // Calculer les stats
      setStats({
        totalProperties: props.length,
        availableProperties: props.filter((p: any) => p.status === 'disponible').length,
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        unreadMessages: msgs.filter((m: any) => m.status === 'non_lu').length,
        totalRevenue: 0,
        newRequests: reqs.filter((r: any) => r.status === 'nouveau').length,
        totalRequests: reqs.length,
        pendingReviews: revs.filter((r: any) => r.status === 'en_attente').length,
      })
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Erreur lors du chargement des données')
    }
  }

  // Actions
  const handleDeleteProperty = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      try {
        await fetch(`/api/properties/${id}`, { method: 'DELETE' })
        await loadData()
        toast.success('Bien supprimé avec succès')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status } }),
      })
      await loadData()
      toast.success('Réservation mise à jour')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleMarkMessageAsRead = async (id: string) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status: 'lu' } }),
      })
      await loadData()
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleUpdateReviewStatus = async (id: string, status: Review['status']) => {
    try {
      
      await adminAPI.updateReview(id, { status })
      await loadData()
      toast.success('Avis mis à jour')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleRespondToReview = (review: Review) => {
    setRespondingReview(review)
    setReviewResponse(review.response || '')
  }

  const handleSubmitReviewResponse = async () => {
    if (!respondingReview || !reviewResponse.trim()) {
      toast.error('Veuillez saisir une réponse')
      return
    }

    try {
      
      await adminAPI.updateReview(respondingReview.id, {
        response: reviewResponse,
        respondedAt: new Date(),
      })
      await loadData()
      toast.success('Réponse publiée avec succès')
      setRespondingReview(null)
      setReviewResponse('')
    } catch (error) {
      toast.error('Erreur lors de la publication')
    }
  }

  const handleDeleteReview = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      try {
        
        await adminAPI.deleteReview(id)
        await loadData()
        toast.success('Avis supprimé')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleLogout = () => {
    clearSession()
    toast.success('Déconnexion réussie')
    router.push('/admin/login')
  }

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule' }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins une minuscule' }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' }
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial' }
    }
    return { valid: true, message: '' }
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    // Vérifier que les nouveaux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas')
      return
    }

    // Valider la force du nouveau mot de passe
    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      toast.error(validation.message)
      return
    }

    // Récupérer l'utilisateur actuel
    const session = getSession()
    if (!session) {
      toast.error('Session expirée')
      router.push('/admin/login')
      return
    }

    // Changer le mot de passe via API MySQL
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          currentPassword,
          newPassword,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        toast.success('Mot de passe modifié avec succès')
      } else {
        toast.error(result.error || 'Erreur lors du changement de mot de passe')
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur')
    }
  }

  const handleChangeEmail = async () => {
    if (!newAdminEmail) {
      toast.error('Veuillez entrer une nouvelle adresse email')
      return
    }

    // Valider le format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newAdminEmail)) {
      toast.error('Format d\'email invalide')
      return
    }

    // Vérifier que l'email n'est pas déjà utilisé
    if (newAdminEmail === adminEmail) {
      toast.error('Cette adresse email est déjà votre adresse actuelle')
      return
    }

    // Récupérer l'utilisateur actuel
    const session = getSession()
    if (!session) {
      toast.error('Session expirée')
      router.push('/admin/login')
      return
    }

    // Changer l'email via API MySQL
    try {
      const response = await fetch('/api/admin/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          newEmail: newAdminEmail,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Mettre à jour la session locale
        const updatedUser = { ...session.user, email: newAdminEmail }
        saveSession(updatedUser)
        
        setAdminEmail(newAdminEmail)
        setNewAdminEmail('')
        toast.success('Adresse email modifiée avec succès')
      } else {
        toast.error(result.error || 'Erreur lors du changement d\'email')
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur')
    }
  }

  const handleResetData = () => {
    const confirmation = window.prompt('Cette action est IRRÉVERSIBLE. Tapez "SUPPRIMER TOUT" pour confirmer')
    if (confirmation === 'SUPPRIMER TOUT') {
      
      // clearAllData removed - use MySQL()
      loadData()
      toast.success('Toutes les données ont été réinitialisées')
    } else {
      toast.error('Action annulée')
    }
  }

  const handleSaveAgencyInfo = async () => {
    try {
      saveAgencyConfig(agencyConfig)
      toast.success('Informations de l\'agence sauvegardées avec succès')
      // Forcer le rechargement pour mettre à jour partout
      window.dispatchEvent(new Event('agency-config-updated'))
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  // Gestion des Partenaires
  const handleAddPartner = async (partner: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      
      await adminAPI.addPartner(partner)
      await loadData()
      setEditingPartner(null)
      toast.success('Partenaire ajouté avec succès ! 🎉')
    } catch (error) {
      toast.error('Erreur lors de l\'ajout')
    }
  }

  const handleUpdatePartner = async (id: string, updates: Partial<Partner>) => {
    try {
      
      await adminAPI.updatePartner(id, updates)
      await loadData()
      setEditingPartner(null)
      setShowPartnerForm(false)
      toast.success('Partenaire modifié avec succès')
    } catch (error) {
      toast.error('Erreur lors de la modification')
    }
  }

  const handleDeletePartner = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        
        await adminAPI.deletePartner(id)
        await loadData()
        toast.success('Partenaire supprimé')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleTogglePartner = async (id: string, actif: boolean) => {
    try {
      
      await adminAPI.updatePartner(id, { actif: !actif })
      await loadData()
      toast.success(actif ? 'Partenaire désactivé' : 'Partenaire activé')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleMovePartner = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = partners.findIndex(p => p.id === id)
    if (currentIndex === -1) return
    if (direction === 'up' && currentIndex === 0) return
    if (direction === 'down' && currentIndex === partners.length - 1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const currentOrdre = partners[currentIndex].ordre
    const targetOrdre = partners[newIndex].ordre

    try {
      
      await adminAPI.updatePartner(partners[currentIndex].id, { ordre: targetOrdre })
      await adminAPI.updatePartner(partners[newIndex].id, { ordre: currentOrdre })
      await loadData()
    } catch (error) {
      toast.error('Erreur lors du déplacement')
    }
  }

  // Gestion des FAQs
  const handleAddFaq = async (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      
      await adminAPI.addFAQ(faq)
      await loadData()
      setShowFaqForm(false)
      toast.success('FAQ ajoutée avec succès ! 🎉')
    } catch (error) {
      toast.error('Erreur lors de l\'ajout')
    }
  }

  const handleUpdateFaq = async (id: string, updates: Partial<FAQ>) => {
    try {
      
      await adminAPI.updateFAQ(id, updates)
      await loadData()
      setEditingFaq(null)
      setShowFaqForm(false)
      toast.success('FAQ modifiée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la modification')
    }
  }

  const handleDeleteFaq = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette FAQ ?')) {
      try {
        
        await adminAPI.deleteFAQ(id)
        await loadData()
        toast.success('FAQ supprimée avec succès')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const handleToggleFaq = async (id: string, actif: boolean) => {
    try {
      
      await adminAPI.updateFAQ(id, { actif: !actif })
      await loadData()
      toast.success(actif ? 'FAQ désactivée' : 'FAQ activée')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleMoveFaq = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex(f => f.id === id)
    if (currentIndex === -1) return
    if (direction === 'up' && currentIndex === 0) return
    if (direction === 'down' && currentIndex === faqs.length - 1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const currentOrdre = faqs[currentIndex].ordre
    const targetOrdre = faqs[newIndex].ordre

    try {
      
      await adminAPI.updateFAQ(faqs[currentIndex].id, { ordre: targetOrdre })
      await adminAPI.updateFAQ(faqs[newIndex].id, { ordre: currentOrdre })
      await loadData()
    } catch (error) {
      toast.error('Erreur lors du déplacement')
    }
  }

  // Blog Post handlers
  const handleAddBlogPost = async (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    try {
      
      await adminAPI.addBlogPost(data)
      await loadData()
      setShowBlogForm(false)
      toast.success('Article créé avec succès ! 🎉')
    } catch (error) {
      toast.error('Erreur lors de la création')
    }
  }

  const handleUpdateBlogPost = async (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    if (!editingBlogPost) return
    try {
      
      await adminAPI.updateBlogPost(editingBlogPost.id, data)
      await loadData()
      setEditingBlogPost(null)
      setShowBlogForm(false)
      toast.success('Article modifié avec succès')
    } catch (error) {
      toast.error('Erreur lors de la modification')
    }
  }

  const handleAddProperty = async (data: PropertyFormData) => {
    try {
      // Convertir PropertyFormData en Property avec TOUTES les données
      const newProperty: any = {
        id: Date.now().toString(),
        title: data.title,
        type: data.type,
        location: data.location,
        price: data.price,
        period: data.period,
        pricingInfo: data.pricingInfo, // ✅ AJOUTÉ
        description: data.detailedDescription?.presentation || data.description || '',
        images: data.images,
        videoUrl: data.videoUrl,
        virtualTourUrl: data.virtualTourUrl,
        rooms: data.rooms || 0,
        beds: data.beds,
        baths: data.baths,
        area: data.area,
        guests: data.guests,
        amenities: data.amenities,
        features: data.features,
        status: data.status,
        featured: data.featured,
        detailedDescription: data.detailedDescription,
        environment: data.environment,
        rules: data.rules,
        rentalConditions: data.rentalConditions,
        purchaseConditions: data.purchaseConditions,
        fees: data.fees,
        legalInfo: data.legalInfo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      
      await adminAPI.addProperty(newProperty)
      await loadData()
      setShowPropertyForm(false)
      setEditingProperty(null)
      setEditingFormData(undefined)
      toast.success('Bien ajouté avec succès ! 🎉')
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de l\'ajout du bien')
    }
  }

  const handleUpdateProperty = async (data: PropertyFormData) => {
    if (!editingProperty) return
    
    try {
      const updatedProperty: any = {
        title: data.title,
        type: data.type,
        location: data.location,
        price: data.price,
        period: data.period,
        pricingInfo: data.pricingInfo, // ✅ AJOUTÉ
        description: data.detailedDescription?.presentation || data.description || '',
        images: data.images,
        videoUrl: data.videoUrl,
        virtualTourUrl: data.virtualTourUrl,
        rooms: data.rooms || 0,
        beds: data.beds,
        baths: data.baths,
        area: data.area,
        guests: data.guests,
        amenities: data.amenities,
        features: data.features,
        status: data.status,
        featured: data.featured,
        detailedDescription: data.detailedDescription,
        environment: data.environment,
        rules: data.rules,
        rentalConditions: data.rentalConditions,
        purchaseConditions: data.purchaseConditions,
        fees: data.fees,
        legalInfo: data.legalInfo,
      }
      
      
      await adminAPI.updateProperty(editingProperty.id, updatedProperty)
      await loadData()
      setShowPropertyForm(false)
      setEditingProperty(null)
      setEditingFormData(undefined)
      toast.success('Bien modifié avec succès ! ✏️')
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la modification')
    }
  }

  const handleEditProperty = (property: Property) => {
    // Convertir Property en PropertyFormData pour le formulaire
    const formData: Partial<PropertyFormData> = {
      type: property.type as any,
      title: property.title,
      location: property.location,
      price: property.price,
      period: property.period,
      pricingInfo: (property as any).pricingInfo, // ✅ AJOUTÉ
      description: property.description,
      images: property.images,
      videoUrl: property.videoUrl,
      virtualTourUrl: property.virtualTourUrl,
      rooms: property.rooms,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      guests: property.guests,
      amenities: property.amenities.map((a: any) => typeof a === 'string' ? { icon: '✓', name: a } : a),
      features: property.features,
      status: property.status,
      featured: property.featured,
      // Charger les données détaillées si elles existent
      detailedDescription: property.detailedDescription || {
        presentation: property.description,
        interior: '',
        exterior: '',
      },
      environment: property.environment || {
        title: 'Environnement & Quartier',
        description: '',
        highlights: [],
      },
      rules: property.rules || [],
      rentalConditions: property.rentalConditions,
      purchaseConditions: property.purchaseConditions,
      fees: property.fees,
      legalInfo: property.legalInfo,
    }
    
    setEditingProperty(property)
    setEditingFormData(formData)
    setShowPropertyForm(true)
  }

  const handlePreviewProperty = (id: string) => {
    window.open(`/biens/${id}?from=/admin`, '_blank')
  }

  const handleDuplicateProperty = (property: Property) => {
    // Créer une copie du bien avec un nouveau titre
    const formData: Partial<PropertyFormData> = {
      type: property.type as any,
      title: `${property.title} (Copie)`,
      location: property.location,
      price: property.price,
      period: property.period,
      pricingInfo: (property as any).pricingInfo,
      description: property.description,
      images: property.images,
      videoUrl: property.videoUrl,
      virtualTourUrl: property.virtualTourUrl,
      rooms: property.rooms,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      guests: property.guests,
      amenities: property.amenities.map((a: any) => typeof a === 'string' ? { icon: '✓', name: a } : a),
      features: property.features,
      status: property.status,
      featured: false, // Ne pas dupliquer le statut "en vedette"
      detailedDescription: property.detailedDescription || {
        presentation: property.description,
        interior: '',
        exterior: '',
      },
      environment: property.environment || {
        title: 'Environnement & Quartier',
        description: '',
        highlights: [],
      },
      rules: property.rules || [],
      rentalConditions: property.rentalConditions,
      purchaseConditions: property.purchaseConditions,
      fees: property.fees,
      legalInfo: property.legalInfo,
    }
    
    // Ouvrir le formulaire en mode création (pas d'editingProperty)
    setEditingProperty(null)
    setEditingFormData(formData)
    setShowPropertyForm(true)
    toast.success('Bien dupliqué ! Modifiez et enregistrez.')
  }

  // Si pas authentifié, afficher un loader
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Espace Administration
            </h1>
            <p className="text-gray-600">
              Bienvenue dans l'espace d'administration de Bulle Immobilière
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-x-auto">
          <nav className="flex space-x-1 p-2">
            {[
              { id: 'properties', label: 'Biens', icon: Building2, badge: 0 },
              { id: 'requests', label: 'Demandes / Réservations', icon: FileText, badge: stats.newRequests },
              { id: 'messages', label: 'Messages', icon: MessageSquare, badge: stats.unreadMessages },
              { id: 'reviews', label: 'Avis', icon: Star, badge: stats.pendingReviews },
              { id: 'partners', label: 'Partenaires', icon: Users, badge: 0 },
              { id: 'faq', label: 'FAQ', icon: HelpCircle, badge: 0 },
              { id: 'blog', label: 'Blog', icon: BookOpen, badge: 0 },
              { id: 'settings', label: 'Paramètres', icon: Settings, badge: 0 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Properties Management */}
        {activeTab === 'properties' && !showPropertyForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Biens</h2>
              <button 
                onClick={() => setShowPropertyForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter un Bien</span>
              </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un bien..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filtres</span>
              </button>
            </div>

            {/* Properties Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bien</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map(property => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{property.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {property.type === 'vente' ? 'Vente' : 
                         property.type === 'annuelle' ? 'Annuelle' : 
                         property.type === 'saisonniere' ? 'Saisonnière' : 
                         property.type === 'location' ? 'Location' : 
                         property.type || 'Non défini'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary-600">{getPriceDisplay(property)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === 'brouillon'
                            ? 'bg-gray-100 text-gray-700'
                            : property.status === 'disponible' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {property.status === 'brouillon' ? '📝 Brouillon' : property.status === 'disponible' ? 'Disponible' : property.status === 'reserve' ? 'Réservé' : property.status === 'loue' ? 'Loué' : 'Vendu'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          {/* Toggle Brouillon/Publié */}
                          <button 
                            onClick={async () => {
                              try {
                                const newStatus = property.status === 'brouillon' ? 'disponible' : 'brouillon'
                                await adminAPI.updateProperty(property.id, { status: newStatus })
                                await loadData()
                                toast.success(newStatus === 'brouillon' ? 'Bien mis en brouillon' : 'Bien publié')
                              } catch (error) {
                                toast.error('Erreur lors de la mise à jour')
                              }
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              property.status === 'brouillon'
                                ? 'hover:bg-green-50 text-green-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                            title={property.status === 'brouillon' ? 'Publier' : 'Mettre en brouillon'}
                          >
                            {property.status === 'brouillon' ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                          </button>
                          <button 
                            onClick={() => handlePreviewProperty(property.id)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Aperçu"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleEditProperty(property)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleDuplicateProperty(property)}
                            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Dupliquer"
                          >
                            <Copy className="w-4 h-4 text-purple-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(property.id)} 
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Property Form */}
        {activeTab === 'properties' && showPropertyForm && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowPropertyForm(false)
                  setEditingProperty(null)
                  setEditingFormData(undefined)
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <XIcon className="w-5 h-5" />
                <span>Retour à la liste des biens</span>
              </button>
              {editingProperty && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                  ✏️ Mode Édition
                </span>
              )}
            </div>
            <PropertyForm
              onSubmit={editingProperty ? handleUpdateProperty : handleAddProperty}
              onCancel={() => {
                setShowPropertyForm(false)
                setEditingProperty(null)
                setEditingFormData(undefined)
              }}
              initialData={editingFormData}
            />
          </div>
        )}

        {/* Messages Management */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Messages</h2>
            <div className="space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    message.status === 'non_lu' 
                      ? 'border-cyan-200 bg-cyan-50' 
                      : 'border-gray-200 bg-white hover:shadow-md'
                  }`}
                  onClick={() => handleMarkMessageAsRead(message.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {message.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                        {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end mb-2">
                        <span className="text-sm text-gray-900">{new Date(message.createdAt).toLocaleDateString('fr-FR')}</span>
                        <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          message.status === 'non_lu' ? 'bg-cyan-100 text-cyan-700' :
                          message.status === 'lu' ? 'bg-gray-100 text-gray-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {message.status === 'non_lu' ? 'Non lu' : message.status === 'lu' ? 'Lu' : 'Répondu'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-900">Sujet:</span> {message.subject}
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg mb-3">
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkMessageAsRead(message.id)
                      }}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Marquer comme lu
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation()
                        try {
                          
                          await adminAPI.updateMessage(message.id, { status: 'repondu' })
                          await loadData()
                          toast.success('Marqué comme répondu')
                        } catch (error) {
                          toast.error('Erreur')
                        }
                      }}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Marquer comme répondu
                    </button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Aucun message pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Management */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Avis</h2>
            
            {/* Statistiques des avis */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-700 font-medium">En attente</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {reviews.filter(r => r.status === 'en_attente').length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Approuvés</p>
                    <p className="text-2xl font-bold text-green-900">
                      {reviews.filter(r => r.status === 'approuve').length}
                    </p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700 font-medium">Rejetés</p>
                    <p className="text-2xl font-bold text-red-900">
                      {reviews.filter(r => r.status === 'rejete').length}
                    </p>
                  </div>
                  <ThumbsDown className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Note moyenne</p>
                    <p className="text-2xl font-bold text-primary-900">
                      {reviews.filter(r => r.status === 'approuve').length > 0
                        ? (reviews.filter(r => r.status === 'approuve').reduce((sum, r) => sum + r.rating, 0) / 
                           reviews.filter(r => r.status === 'approuve').length).toFixed(1)
                        : '0.0'}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-primary-500 fill-primary-500" />
                </div>
              </div>
            </div>

            {/* Liste des avis */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const property = properties.find(p => p.id === review.propertyId)
                  return (
                    <div key={review.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-semibold">
                                {review.clientName ? review.clientName.charAt(0).toUpperCase() : '?'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{review.clientName || 'Anonyme'}</h3>
                              <p className="text-sm text-gray-500">{review.clientEmail || 'N/A'}</p>
                            </div>
                          </div>
                          
                          {property && (
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Bien:</strong> {property.title}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600">
                              {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          
                          {/* Réponse existante */}
                          {review.response && (
                            <div className="mt-3 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                              <p className="text-sm font-semibold text-primary-900 mb-1">Votre réponse:</p>
                              <p className="text-sm text-gray-700">{review.response}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {review.respondedAt && new Date(review.respondedAt).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Badge de statut */}
                        <div>
                          {review.status === 'en_attente' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                              En attente
                            </span>
                          )}
                          {review.status === 'approuve' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              Approuvé
                            </span>
                          )}
                          {review.status === 'rejete' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              Rejeté
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                        {review.status === 'en_attente' && (
                          <>
                            <button
                              onClick={() => handleUpdateReviewStatus(review.id, 'approuve')}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Approuver
                            </button>
                            <button
                              onClick={() => handleUpdateReviewStatus(review.id, 'rejete')}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              Rejeter
                            </button>
                          </>
                        )}
                        
                        {review.status === 'approuve' && (
                          <button
                            onClick={() => handleRespondToReview(review)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            {review.response ? 'Modifier la réponse' : 'Répondre'}
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Aucun avis pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal de réponse à un avis */}
        {respondingReview && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Répondre à l'avis de {respondingReview.clientName || 'Client'}
              </h3>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= respondingReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{respondingReview.comment}</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre réponse
                </label>
                <textarea
                  value={reviewResponse}
                  onChange={(e) => setReviewResponse(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Rédigez votre réponse..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setRespondingReview(null)
                    setReviewResponse('')
                  }}
                  className="flex-1 btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmitReviewResponse}
                  className="flex-1 btn-primary"
                >
                  Publier la réponse
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Partners Management */}
        {activeTab === 'partners' && !showPartnerForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Partenaires</h2>
              <button
                onClick={() => {
                  setEditingPartner(null)
                  setShowPartnerForm(true)
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Ajouter un partenaire
              </button>
            </div>

            {/* Partners Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Logo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Partenaire</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Infos</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ordre</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partners.map((partner, index) => (
                    <tr key={partner.id} className={`hover:bg-gray-50 transition-colors ${!partner.actif ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="text-3xl">{partner.logo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{partner.nom}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{partner.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
                          {partner.categorie}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm space-y-1">
                          {partner.promo && (
                            <div className="text-cyan-600 font-semibold">🎁 {partner.promo}</div>
                          )}
                          {partner.prix && (
                            <div className="text-teal-600 font-semibold">💰 {partner.prix}</div>
                          )}
                          {!partner.promo && !partner.prix && (
                            <div className="text-gray-400">-</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          partner.actif 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {partner.actif ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMovePartner(partner.id, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Monter"
                          >
                            <ArrowUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-sm text-gray-600 font-semibold">{partner.ordre}</span>
                          <button
                            onClick={() => handleMovePartner(partner.id, 'down')}
                            disabled={index === partners.length - 1}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Descendre"
                          >
                            <ArrowDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingPartner(partner)
                              setShowPartnerForm(true)
                            }}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleTogglePartner(partner.id, partner.actif)}
                            className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                            title={partner.actif ? 'Désactiver' : 'Activer'}
                          >
                            {partner.actif ? (
                              <ToggleRight className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeletePartner(partner.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {partners.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Aucun partenaire pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* Partner Form */}
        {activeTab === 'partners' && showPartnerForm && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowPartnerForm(false)
                  setEditingPartner(null)
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <XIcon className="w-5 h-5" />
                <span>Retour à la liste des partenaires</span>
              </button>
              {editingPartner && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                  ✏️ Mode Édition
                </span>
              )}
            </div>
            <PartnerFormComponent
              partner={editingPartner}
              onSave={(data) => {
                if (editingPartner) {
                  handleUpdatePartner(editingPartner.id, data)
                } else {
                  handleAddPartner(data)
                }
              }}
              onCancel={() => {
                setShowPartnerForm(false)
                setEditingPartner(null)
              }}
            />
          </div>
        )}

        {/* FAQ Management */}
        {activeTab === 'faq' && !showFaqForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion de la FAQ</h2>
              <button
                onClick={() => {
                  setEditingFaq(null)
                  setShowFaqForm(true)
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Ajouter une question
              </button>
            </div>

            {/* FAQ Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Question</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Réponse</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ordre</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {faqs.map((faq, index) => (
                    <tr key={faq.id} className={`hover:bg-gray-50 transition-colors ${!faq.actif ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 max-w-xs">{faq.question}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md line-clamp-2">{faq.answer}</div>
                      </td>
                      <td className="px-6 py-4">
                        {faq.categorie ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                            {faq.categorie}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          faq.actif 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {faq.actif ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveFaq(faq.id, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Monter"
                          >
                            <ArrowUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-sm text-gray-600 font-semibold">{faq.ordre}</span>
                          <button
                            onClick={() => handleMoveFaq(faq.id, 'down')}
                            disabled={index === faqs.length - 1}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Descendre"
                          >
                            <ArrowDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingFaq(faq)
                              setShowFaqForm(true)
                            }}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleToggleFaq(faq.id, faq.actif)}
                            className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                            title={faq.actif ? 'Désactiver' : 'Activer'}
                          >
                            {faq.actif ? (
                              <ToggleRight className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {faqs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Aucune question pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Form */}
        {activeTab === 'faq' && showFaqForm && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowFaqForm(false)
                  setEditingFaq(null)
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <XIcon className="w-5 h-5" />
                <span>Retour à la liste des questions</span>
              </button>
              {editingFaq && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                  ✏️ Mode Édition
                </span>
              )}
            </div>
            <FAQFormComponent
              faq={editingFaq}
              onSave={(data) => {
                if (editingFaq) {
                  handleUpdateFaq(editingFaq.id, data)
                } else {
                  handleAddFaq(data)
                }
              }}
              onCancel={() => {
                setShowFaqForm(false)
                setEditingFaq(null)
              }}
            />
          </div>
        )}

        {/* Blog Management */}
        {activeTab === 'blog' && !showBlogForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion du Blog</h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {blogPosts.filter(p => p.isPublished).length} publiés
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                  {blogPosts.length} total
                </span>
                <button
                  onClick={() => {
                    setEditingBlogPost(null)
                    setShowBlogForm(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Nouvel article
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Article</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Catégorie</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {post.isPinned && (
                            <Pin className="w-4 h-4 text-cyan-600" />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs font-semibold">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={async () => {
                            try {
                              
                              await adminAPI.updateBlogPost(post.id, { isPublished: !post.isPublished })
                              await loadData()
                              toast.success(post.isPublished ? 'Article mis en brouillon' : 'Article publié')
                            } catch (error) {
                              toast.error('Erreur lors de la mise à jour')
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {post.isPublished ? 'Publié' : 'Brouillon'}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {post.publishedAt 
                          ? new Date(post.publishedAt).toLocaleDateString('fr-FR')
                          : new Date(post.createdAt).toLocaleDateString('fr-FR')
                        }
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              try {
                                
                                await adminAPI.toggleBlogPostPin(post.id)
                                await loadData()
                                toast.success(post.isPinned ? 'Article désépinglé' : 'Article épinglé')
                              } catch (error) {
                                toast.error('Erreur lors de la mise à jour')
                              }
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              post.isPinned
                                ? 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={post.isPinned ? 'Désépingler' : 'Épingler'}
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingBlogPost(post)
                              setShowBlogForm(true)
                            }}
                            className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Voir l'article"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={async () => {
                              if (confirm('Supprimer cet article ?')) {
                                try {
                                  
                                  await adminAPI.deleteBlogPost(post.id)
                                  await loadData()
                                  toast.success('Article supprimé')
                                } catch (error) {
                                  toast.error('Erreur lors de la suppression')
                                }
                              }
                            }}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Aucun article de blog pour le moment
              </div>
            )}
          </div>
        )}

        {/* Blog Post Form */}
        {activeTab === 'blog' && showBlogForm && (
          <BlogPostForm
            post={editingBlogPost}
            onSave={editingBlogPost ? handleUpdateBlogPost : handleAddBlogPost}
            onCancel={() => {
              setShowBlogForm(false)
              setEditingBlogPost(null)
            }}
          />
        )}

        {/* Client Requests Management */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Demandes & Réservations Clients</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {clientRequests.filter(r => r.status === 'nouveau').length} nouvelles
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                  {clientRequests.length} total
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bien</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Détails</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clientRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                          <span className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          request.type === 'estimation' ? 'bg-blue-100 text-blue-800' :
                          request.type === 'visite' ? 'bg-green-100 text-green-800' :
                          request.type === 'reservation' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {request.type === 'estimation' ? 'Estimation' :
                           request.type === 'visite' ? 'Visite' :
                           request.type === 'reservation' ? 'Réservation' :
                           'Rendez-vous'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{request.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${request.email}`} className="text-primary-600 hover:underline text-xs">
                            {request.email}
                          </a>
                          <a href={`tel:${request.phone}`} className="text-gray-600 hover:underline text-xs">
                            {request.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {request.propertyTitle || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
                        <div className="space-y-1">
                          {request.type === 'estimation' && (
                            <>
                              {request.propertyType && <div><span className="font-semibold">Type:</span> {request.propertyType}</div>}
                              {request.propertyAddress && <div><span className="font-semibold">Adresse:</span> {request.propertyAddress}</div>}
                              {request.propertyArea && <div><span className="font-semibold">Surface:</span> {request.propertyArea}m²</div>}
                              {request.estimationDetails && <div className="text-xs italic mt-1">{request.estimationDetails}</div>}
                            </>
                          )}
                          {request.type === 'visite' && (
                            <>
                              {request.preferredDate && <div><span className="font-semibold">Date souhaitée:</span> {new Date(request.preferredDate).toLocaleDateString('fr-FR')}</div>}
                              {request.preferredTime && <div><span className="font-semibold">Heure souhaitée:</span> {request.preferredTime}</div>}
                              {request.visitMessage && <div className="text-xs italic mt-1">{request.visitMessage}</div>}
                            </>
                          )}
                          {request.type === 'reservation' && (
                            <>
                              {request.checkIn && <div><span className="font-semibold">Arrivée:</span> {new Date(request.checkIn).toLocaleDateString('fr-FR')}</div>}
                              {request.checkOut && <div><span className="font-semibold">Départ:</span> {new Date(request.checkOut).toLocaleDateString('fr-FR')}</div>}
                              {request.guests && <div><span className="font-semibold">Voyageurs:</span> {request.guests}</div>}
                              {request.totalPrice && (
                                <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                                  <span className="font-bold text-green-800">Prix total: {request.totalPrice}€</span>
                                  {request.pricePerNight && <span className="text-xs text-green-600 ml-2">({request.pricePerNight}€/nuit)</span>}
                                </div>
                              )}
                              {request.reservationMessage && <div className="text-xs italic mt-1">{request.reservationMessage}</div>}
                            </>
                          )}
                          {request.type === 'rendez-vous' && (
                            <>
                              {request.appointmentDate && <div><span className="font-semibold">Date souhaitée:</span> {new Date(request.appointmentDate).toLocaleDateString('fr-FR')}</div>}
                              {request.appointmentTime && <div><span className="font-semibold">Heure souhaitée:</span> {request.appointmentTime}</div>}
                              {request.appointmentReason && <div><span className="font-semibold">Raison:</span> {request.appointmentReason}</div>}
                              {request.appointmentMessage && <div className="text-xs italic mt-1">{request.appointmentMessage}</div>}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={request.status}
                          onChange={async (e) => {
                            try {
                              
                              await adminAPI.updateClientRequest(request.id, { status: e.target.value as any })
                              await loadData()
                              toast.success('Statut mis à jour')
                            } catch (error) {
                              toast.error('Erreur lors de la mise à jour')
                            }
                          }}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${
                            request.status === 'nouveau' ? 'bg-red-100 text-red-800' :
                            request.status === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'traite' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_cours">En cours</option>
                          <option value="traite">Traité</option>
                          <option value="annule">Annulé</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={async () => {
                            if (confirm('Supprimer cette demande ?')) {
                              try {
                                
                                await adminAPI.deleteClientRequest(request.id)
                                await loadData()
                                toast.success('Demande supprimée')
                              } catch (error) {
                                toast.error('Erreur lors de la suppression')
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {clientRequests.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Aucune demande client pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>
            <div className="space-y-6">
              {/* Moniteur de stockage */}
              <StorageMonitor />

              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  Informations de l'agence
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ces informations seront automatiquement mises à jour dans le footer, la page contact et partout sur le site.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de l'agence</label>
                    <input 
                      type="text" 
                      value={agencyConfig.name}
                      onChange={(e) => setAgencyConfig({...agencyConfig, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email de contact</label>
                    <input 
                      type="email" 
                      value={agencyConfig.email}
                      onChange={(e) => setAgencyConfig({...agencyConfig, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      value={agencyConfig.phone}
                      onChange={(e) => setAgencyConfig({...agencyConfig, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
                    <input 
                      type="text" 
                      value={agencyConfig.address}
                      onChange={(e) => setAgencyConfig({...agencyConfig, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Horaires d'ouverture</label>
                    <input 
                      type="text" 
                      value={agencyConfig.hours}
                      onChange={(e) => setAgencyConfig({...agencyConfig, hours: e.target.value})}
                      placeholder="Lun-Ven: 9h-18h, Sam: 9h-13h"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook (optionnel)</label>
                    <input 
                      type="url" 
                      value={agencyConfig.facebook || ''}
                      onChange={(e) => setAgencyConfig({...agencyConfig, facebook: e.target.value})}
                      placeholder="https://facebook.com/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram (optionnel)</label>
                    <input 
                      type="url" 
                      value={agencyConfig.instagram || ''}
                      onChange={(e) => setAgencyConfig({...agencyConfig, instagram: e.target.value})}
                      placeholder="https://instagram.com/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">TikTok (optionnel)</label>
                    <input 
                      type="url" 
                      value={agencyConfig.tiktok || ''}
                      onChange={(e) => setAgencyConfig({...agencyConfig, tiktok: e.target.value})}
                      placeholder="https://tiktok.com/@..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSaveAgencyInfo}
                  className="mt-4 btn-primary"
                >
                  Sauvegarder les modifications
                </button>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Sécurité & Accès
                </h3>
                
                {/* Informations de connexion actuelles */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">ℹ️ Informations de connexion</p>
                  <p className="text-sm text-blue-800">Email actuel : <span className="font-semibold">{adminEmail}</span></p>
                  <p className="text-xs text-blue-600 mt-2">Session active depuis : {new Date(parseInt(localStorage.getItem('admin_login_time') || '0')).toLocaleString('fr-FR')}</p>
                </div>

                {/* Changer l'adresse email */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Modifier l'adresse email</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nouvelle adresse email</label>
                      <input 
                        type="email" 
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="nouvelle@email.com" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      />
                    </div>
                    <button 
                      onClick={handleChangeEmail}
                      className="btn-primary"
                    >
                      Modifier l'email
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Modifier le mot de passe</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe actuel</label>
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Mot de passe actuel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nouveau mot de passe" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer le mot de passe" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      />
                    </div>
                    <button 
                      onClick={handleChangePassword}
                      className="btn-primary"
                    >
                      Mettre à jour le mot de passe
                    </button>
                  </div>
                </div>

                {/* Conseils de sécurité */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-semibold text-amber-900 mb-2">⚠️ Conseils de sécurité</p>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Ne partagez jamais vos identifiants avec qui que ce soit</li>
                    <li>• Changez votre mot de passe régulièrement (tous les 3 mois)</li>
                    <li>• Utilisez un mot de passe unique pour cet espace admin</li>
                    <li>• Déconnectez-vous toujours après utilisation</li>
                    <li>• N'accédez pas à l'admin depuis un ordinateur public</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-2 border-red-300 bg-red-50 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Zone dangereuse
                </h3>
                <p className="text-sm text-red-700 mb-4 font-semibold">
                  ⛔ ATTENTION : Les actions suivantes sont IRRÉVERSIBLES
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 mb-2">
                      <strong>Réinitialiser toutes les données</strong>
                    </p>
                    <p className="text-xs text-red-600 mb-3">
                      Supprime tous les biens, réservations, messages et avis. Cette action ne peut pas être annulée.
                    </p>
                    <button 
                      onClick={handleResetData}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
                    >
                      Réinitialiser toutes les données
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Composant de formulaire pour les Partenaires
function PartnerFormComponent({ 
  partner, 
  onSave, 
  onCancel 
}: { 
  partner: Partner | null
  onSave: (data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    nom: partner?.nom || '',
    categorie: partner?.categorie || '',
    description: partner?.description || '',
    logo: partner?.logo || '🏢',
    url: partner?.url || '',
    promo: partner?.promo || '',
    prix: partner?.prix || '',
    ordre: partner?.ordre || 0,
    actif: partner?.actif ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {partner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du partenaire *
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: King Location"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie *
            </label>
            <input
              type="text"
              value={formData.categorie}
              onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Mobilité, Juridique, Loisirs"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Logo (Emoji) *
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: 🚗, ⚖️, 🏦"
            />
            <p className="text-xs text-gray-500 mt-1">Utilisez un emoji ou une icône</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL du site web
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Code promo (optionnel)
            </label>
            <input
              type="text"
              value={formData.promo}
              onChange={(e) => setFormData({ ...formData, promo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Code: BBF"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix (optionnel)
            </label>
            <input
              type="text"
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Dès 25 €/pers"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              value={formData.ordre}
              onChange={(e) => setFormData({ ...formData, ordre: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Plus le nombre est petit, plus il apparaît en premier</p>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actif}
                onChange={(e) => setFormData({ ...formData, actif: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="ml-3 text-sm font-semibold text-gray-700">
                Actif (visible sur le site)
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Description du partenaire et de ses services..."
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
            Annuler
          </button>
          <button type="submit" className="flex-1 btn-primary">
            {partner ? '✅ Mettre à jour' : '➕ Ajouter le partenaire'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Composant de formulaire pour les FAQs
function FAQFormComponent({ 
  faq, 
  onSave, 
  onCancel 
}: { 
  faq: FAQ | null
  onSave: (data: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    categorie: faq?.categorie || '',
    ordre: faq?.ordre || 0,
    actif: faq?.actif ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {faq ? 'Modifier la question' : 'Nouvelle question FAQ'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Question *
          </label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ex: Comment louer un bien ?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Réponse *
          </label>
          <textarea
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Réponse détaillée à la question..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Soyez clair et précis dans votre réponse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie (optionnel)
            </label>
            <input
              type="text"
              value={formData.categorie}
              onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Location, Vente, Général"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pour grouper les questions par thème
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              value={formData.ordre}
              onChange={(e) => setFormData({ ...formData, ordre: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Plus le nombre est petit, plus elle apparaît en premier
            </p>
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actif}
                onChange={(e) => setFormData({ ...formData, actif: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="ml-3 text-sm font-semibold text-gray-700">
                Active (visible sur le site)
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
            Annuler
          </button>
          <button type="submit" className="flex-1 btn-primary">
            {faq ? '✅ Mettre à jour' : '➕ Ajouter la question'}
          </button>
        </div>
      </form>
    </div>
  )
}
