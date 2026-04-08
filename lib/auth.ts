/**
 * Système d'authentification pour l'admin
 * Utilise MySQL pour stocker les utilisateurs de manière sécurisée
 */

import { queryOne } from './db'

export interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
  active: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Hash simple du mot de passe (à remplacer par bcrypt en production)
 * Pour l'instant, on stocke en clair pour le développement
 */
function simpleHash(password: string): string {
  // MODE DÉVELOPPEMENT : Stockage en clair
  // TODO: En production, utilisez bcrypt ou argon2
  return password
}

/**
 * Vérifier si un mot de passe correspond au hash
 */
function verifyPassword(password: string, hash: string): boolean {
  // MODE DÉVELOPPEMENT : Comparaison directe
  return password === hash
}

/**
 * Connexion admin
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    console.log('🔐 Tentative de connexion pour:', email)
    
    // Récupérer l'utilisateur par email
    const data = await queryOne<any>(
      'SELECT * FROM admin_users WHERE email = ? AND active = true',
      [email]
    )

    console.log('📊 Résultat MySQL:', { data })

    if (!data) {
      console.log('❌ Utilisateur non trouvé')
      return { success: false, error: 'Email ou mot de passe incorrect' }
    }

    console.log('🔑 Vérification du mot de passe...')
    console.log('Mot de passe saisi:', password)
    console.log('Hash en base:', data.password_hash)
    
    // Vérifier le mot de passe
    if (!verifyPassword(password, data.password_hash)) {
      console.log('❌ Mot de passe incorrect')
      return { success: false, error: 'Email ou mot de passe incorrect' }
    }

    console.log('✅ Connexion réussie!')

    // Mettre à jour la date de dernière connexion
    await queryOne(
      'UPDATE admin_users SET last_login = ? WHERE id = ?',
      [new Date().toISOString(), data.id]
    )

    // Convertir en camelCase
    const user: AdminUser = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      active: data.active,
      lastLogin: data.last_login ? new Date(data.last_login) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }

    return { success: true, user }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return { success: false, error: 'Erreur de connexion' }
  }
}

/**
 * Changer le mot de passe
 */
export async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Récupérer l'utilisateur
    const data = await queryOne<any>(
      'SELECT password_hash FROM admin_users WHERE id = ?',
      [userId]
    )

    if (!data) {
      return { success: false, error: 'Utilisateur non trouvé' }
    }

    // Vérifier l'ancien mot de passe
    if (!verifyPassword(currentPassword, data.password_hash)) {
      return { success: false, error: 'Mot de passe actuel incorrect' }
    }

    // Mettre à jour avec le nouveau mot de passe
    await queryOne(
      'UPDATE admin_users SET password_hash = ? WHERE id = ?',
      [simpleHash(newPassword), userId]
    )

    return { success: true }
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error)
    return { success: false, error: 'Erreur lors du changement de mot de passe' }
  }
}

/**
 * Changer l'email
 */
export async function changeEmail(userId: string, newEmail: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Vérifier que l'email n'est pas déjà utilisé
    const existing = await queryOne<any>(
      'SELECT id FROM admin_users WHERE email = ?',
      [newEmail]
    )

    if (existing && existing.id !== userId) {
      return { success: false, error: 'Cet email est déjà utilisé' }
    }

    // Mettre à jour l'email
    await queryOne(
      'UPDATE admin_users SET email = ? WHERE id = ?',
      [newEmail, userId]
    )

    return { success: true }
  } catch (error) {
    console.error('Erreur lors du changement d\'email:', error)
    return { success: false, error: 'Erreur lors du changement d\'email' }
  }
}

/**
 * Créer un nouvel utilisateur admin
 */
export async function createAdminUser(email: string, password: string, name?: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const id = Date.now().toString()
    await queryOne(
      'INSERT INTO admin_users (id, email, password_hash, name, role, active) VALUES (?, ?, ?, ?, ?, ?)',
      [id, email, simpleHash(password), name || '', 'admin', true]
    )

    const data = await queryOne<any>(
      'SELECT * FROM admin_users WHERE id = ?',
      [id]
    )

    if (!data) {
      return { success: false, error: 'Erreur lors de la création de l\'utilisateur' }
    }

    const user: AdminUser = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      active: data.active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }

    return { success: true, user }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error)
    return { success: false, error: 'Erreur lors de la création de l\'utilisateur' }
  }
}

/**
 * Gestion de la session (localStorage pour le token)
 */
export function saveSession(user: AdminUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', 'authenticated')
    localStorage.setItem('admin_user', JSON.stringify(user))
    localStorage.setItem('admin_login_time', Date.now().toString())
  }
}

export function getSession(): { user: AdminUser; loginTime: number } | null {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('admin_token')
  const userStr = localStorage.getItem('admin_user')
  const loginTime = localStorage.getItem('admin_login_time')

  if (!token || !userStr || !loginTime) return null

  try {
    const user = JSON.parse(userStr)
    return { user, loginTime: parseInt(loginTime) }
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_login_time')
  }
}
