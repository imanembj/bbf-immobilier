import { NextRequest, NextResponse } from 'next/server'
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from '@/lib/mysql-store'

export async function GET() {
  try {
    const faqs = await getFAQs()
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newFAQ = {
      id: Date.now().toString(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    await addFAQ(newFAQ)
    return NextResponse.json({ success: true, id: newFAQ.id })
  } catch (error) {
    console.error('Error adding FAQ:', error)
    return NextResponse.json({ error: 'Failed to add FAQ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    await updateFAQ(id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    await deleteFAQ(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
