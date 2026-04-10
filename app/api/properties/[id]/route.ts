import { NextResponse } from 'next/server'
import * as MySQLStore from '@/lib/mysql-store'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await MySQLStore.getProperty(params.id)
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }
    return NextResponse.json(property)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    await MySQLStore.updateProperty(params.id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    console.log('🔍 PATCH /api/properties/[id] - ID:', params.id)
    console.log('🔍 PATCH - rentalConditions reçu:', updates.rentalConditions)
    console.log('🔍 PATCH - Type de rentalConditions:', typeof updates.rentalConditions)
    console.log('🔍 PATCH - fees reçu:', updates.fees)
    console.log('🔍 PATCH - pricingInfo reçu:', updates.pricingInfo)
    
    await MySQLStore.updateProperty(params.id, updates)
    
    console.log('✅ PATCH - Sauvegarde terminée')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ PATCH Error:', error)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await MySQLStore.deleteProperty(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
