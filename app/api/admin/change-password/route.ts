import { NextRequest, NextResponse } from 'next/server'
import { query, update } from '@/lib/mysql'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json()

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur
    const sql = 'SELECT * FROM admin_users WHERE id = ?'
    const users = await query(sql, [userId])
    
    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const user = users[0]

    // Vérifier le mot de passe actuel
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Mot de passe actuel incorrect' },
        { status: 401 }
      )
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Mettre à jour le mot de passe
    await update('admin_users', {
      password: hashedPassword,
      updated_at: new Date().toISOString(),
    }, 'id = ?', [userId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement de mot de passe' },
      { status: 500 }
    )
  }
}
