import { NextRequest, NextResponse } from 'next/server'
import { query, update } from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    const { userId, newEmail } = await request.json()

    if (!userId || !newEmail) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Valider le format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Vérifier que l'email n'est pas déjà utilisé
    const checkSql = 'SELECT id FROM admin_users WHERE email = ? AND id != ?'
    const existing = await query(checkSql, [newEmail, userId])
    
    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà utilisé' },
        { status: 409 }
      )
    }

    // Mettre à jour l'email
    await update('admin_users', {
      email: newEmail,
      updated_at: new Date().toISOString(),
    }, 'id = ?', [userId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing email:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement d\'email' },
      { status: 500 }
    )
  }
}
