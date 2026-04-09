import { NextRequest, NextResponse } from 'next/server'
import { getReviews, getReviewsByProperty } from '@/lib/mysql-store'
import { insert } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('propertyId')
    
    if (propertyId) {
      const reviews = await getReviewsByProperty(propertyId)
      return NextResponse.json(reviews)
    }
    
    const reviews = await getReviews()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyId, name, email, rating, comment } = body
    
    if (!propertyId || !name || !email || !rating || !comment) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    
    const newReview = {
      id: Date.now().toString(),
      property_id: propertyId,
      name,
      email,
      rating,
      comment,
      approved: false,
      created_at: new Date().toISOString(),
    }
    
    await insert('reviews', newReview)
    return NextResponse.json({ success: true, message: 'Avis soumis avec succès' })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
  }
}
