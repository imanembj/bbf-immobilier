import { NextRequest, NextResponse } from 'next/server'
import { update, deleteRow } from '@/lib/mysql'
import { getAllReviews } from '@/lib/mysql-store'

export async function GET() {
  try {
    const reviews = await getAllReviews()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des avis' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    // Convertir status en approved pour MySQL
    const dbUpdates: any = { ...updates }
    if (updates.status) {
      dbUpdates.approved = updates.status === 'approuve'
      delete dbUpdates.status
    }

    await update('reviews', dbUpdates, 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await deleteRow('reviews', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
