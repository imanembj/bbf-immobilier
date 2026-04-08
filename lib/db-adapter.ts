// Adaptateur de base de données
// Utilise localStorage en développement et MySQL en production

import * as LocalStore from './store'
import * as MySQLStore from './mysql-store'

const isProduction = process.env.NODE_ENV === 'production'
const useMySQL = isProduction && typeof window === 'undefined' // Seulement côté serveur en production

// Exporter les bonnes fonctions selon l'environnement
export const getProperties = useMySQL ? MySQLStore.getProperties : LocalStore.getProperties
export const getAllProperties = useMySQL ? MySQLStore.getAllProperties : LocalStore.getAllProperties
export const getProperty = useMySQL ? MySQLStore.getProperty : LocalStore.getProperty
export const addProperty = useMySQL ? MySQLStore.addProperty : LocalStore.addProperty
export const updateProperty = useMySQL ? MySQLStore.updateProperty : LocalStore.updateProperty
export const deleteProperty = useMySQL ? MySQLStore.deleteProperty : LocalStore.deleteProperty

export const getClientRequests = useMySQL ? MySQLStore.getClientRequests : LocalStore.getClientRequests
export const addClientRequest = useMySQL ? MySQLStore.addClientRequest : LocalStore.addClientRequest
export const updateClientRequest = useMySQL ? MySQLStore.updateClientRequest : LocalStore.updateClientRequest
export const deleteClientRequest = useMySQL ? MySQLStore.deleteClientRequest : LocalStore.deleteClientRequest

export const getMessages = useMySQL ? MySQLStore.getMessages : LocalStore.getMessages
export const addMessage = useMySQL ? MySQLStore.addMessage : LocalStore.addMessage
export const updateMessage = useMySQL ? MySQLStore.updateMessage : LocalStore.updateMessage
export const deleteMessage = useMySQL ? MySQLStore.deleteMessage : LocalStore.deleteMessage

export const getReviews = useMySQL ? MySQLStore.getReviews : LocalStore.getReviews
export const getAllReviews = useMySQL ? MySQLStore.getAllReviews : LocalStore.getAllReviews
export const getReviewsByProperty = useMySQL ? MySQLStore.getReviewsByProperty : LocalStore.getReviewsByProperty
export const addReview = useMySQL ? MySQLStore.addReview : LocalStore.addReview
export const updateReview = useMySQL ? MySQLStore.updateReview : LocalStore.updateReview
export const deleteReview = useMySQL ? MySQLStore.deleteReview : LocalStore.deleteReview

export const getPartners = useMySQL ? MySQLStore.getPartners : LocalStore.getPartners
export const getAllPartners = useMySQL ? MySQLStore.getAllPartners : LocalStore.getAllPartners
export const addPartner = useMySQL ? MySQLStore.addPartner : LocalStore.addPartner
export const updatePartner = useMySQL ? MySQLStore.updatePartner : LocalStore.updatePartner
export const deletePartner = useMySQL ? MySQLStore.deletePartner : LocalStore.deletePartner

export const getFAQs = useMySQL ? MySQLStore.getFAQs : LocalStore.getFAQs
export const getAllFAQs = useMySQL ? MySQLStore.getAllFAQs : LocalStore.getAllFAQs
export const addFAQ = useMySQL ? MySQLStore.addFAQ : LocalStore.addFAQ
export const updateFAQ = useMySQL ? MySQLStore.updateFAQ : LocalStore.updateFAQ
export const deleteFAQ = useMySQL ? MySQLStore.deleteFAQ : LocalStore.deleteFAQ

export const getBlogPosts = useMySQL ? MySQLStore.getBlogPosts : LocalStore.getBlogPosts
export const getAllBlogPosts = useMySQL ? MySQLStore.getAllBlogPosts : LocalStore.getAllBlogPosts
export const getBlogPostBySlug = useMySQL ? MySQLStore.getBlogPostBySlug : LocalStore.getBlogPostBySlug
export const addBlogPost = useMySQL ? MySQLStore.addBlogPost : LocalStore.addBlogPost
export const updateBlogPost = useMySQL ? MySQLStore.updateBlogPost : LocalStore.updateBlogPost
export const deleteBlogPost = useMySQL ? MySQLStore.deleteBlogPost : LocalStore.deleteBlogPost
export const toggleBlogPostPin = useMySQL ? MySQLStore.toggleBlogPostPin : LocalStore.toggleBlogPostPin

export const getAgencySettings = useMySQL ? MySQLStore.getAgencySettings : LocalStore.getAgencySettings
export const updateAgencySettings = useMySQL ? MySQLStore.updateAgencySettings : LocalStore.updateAgencySettings

// Type exports
export type { AgencySettings } from './mysql-store'

console.log(`🔧 DB Adapter: Using ${useMySQL ? 'MySQL (Production)' : 'LocalStorage (Development)'}`)
