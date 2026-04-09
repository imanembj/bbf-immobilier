import { NextRequest, NextResponse } from 'next/server'
import { getPartners, addPartner, updatePartner, deletePartner } from '@/lib/mysql-store'

export async function GET() {
  try {
    const partners = await getPartners()
    return NextResponse.json(partners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Calculer le prochain ordre disponible
    const existingPartners = await getPartners()
    const maxOrdre = existingPartners.length > 0 
      ? Math.max(...existingPartners.map(p => p.ordre || 0))
      : 0
    
    const newPartner = {
      id: Date.now().toString(),
      ...data,
      ordre: data.ordre !== undefined ? data.ordre : maxOrdre + 1, // Utiliser l'ordre fourni ou calculer le suivant
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    await addPartner(newPartner)
    return NextResponse.json({ success: true, id: newPartner.id })
  } catch (error) {
    console.error('Error adding partner:', error)
    return NextResponse.json({ error: 'Failed to add partner' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    await updatePartner(id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating partner:', error)
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    await deletePartner(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting partner:', error)
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 })
  }
}
