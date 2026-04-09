import { NextRequest, NextResponse } from 'next/server'
import { query, update } from '@/lib/mysql'

export async function GET() {
  try {
    const sql = 'SELECT * FROM messages ORDER BY created_at DESC'
    const messages = await query(sql)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des messages' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await update('messages', updates, 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}
