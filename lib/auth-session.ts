/**
 * Gestion de la session admin (localStorage uniquement - pas de DB)
 * Ce fichier peut être importé côté client sans problème
 */

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
