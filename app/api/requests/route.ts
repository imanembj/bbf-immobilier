import { NextRequest, NextResponse } from 'next/server'
import { getClientRequests, updateClientRequest, deleteClientRequest } from '@/lib/mysql-store'

export async function GET() {
  try {
    const requests = await getClientRequests()
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching client requests:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des demandes' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await updateClientRequest(id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating client request:', error)
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

    await deleteClientRequest(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client request:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
