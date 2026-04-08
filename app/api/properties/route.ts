import { NextResponse } from 'next/server'
import * as MySQLStore from '@/lib/mysql-store'

// GET /api/properties - Récupérer tous les biens
export async function GET() {
  try {
    const properties = await MySQLStore.getProperties()
    return NextResponse.json(properties)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

// POST /api/properties - Ajouter un bien
export async function POST(request: Request) {
  try {
    const property = await request.json()
    await MySQLStore.addProperty(property)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to add property' }, { status: 500 })
  }
}
