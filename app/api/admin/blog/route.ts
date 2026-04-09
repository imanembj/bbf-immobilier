import { NextRequest, NextResponse } from 'next/server'
import { query, insert, update, deleteRow } from '@/lib/mysql'

export async function GET() {
  try {
    const sql = 'SELECT * FROM blog_posts ORDER BY created_at DESC'
    const posts = await query(sql)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newPost = {
      id: Date.now().toString(),
      ...data,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: data.isPublished ? new Date().toISOString() : null,
    }

    await insert('blog_posts', newPost)
    return NextResponse.json({ success: true, id: newPost.id })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const dbUpdates: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    }

    // Si on publie l'article pour la première fois
    if (updates.isPublished && !updates.publishedAt) {
      dbUpdates.published_at = new Date().toISOString()
    }

    await update('blog_posts', dbUpdates, 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating blog post:', error)
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

    await deleteRow('blog_posts', 'id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
