import { NextRequest, NextResponse } from 'next/server'
import { deleteRow } from '@/lib/mysql'
import { addBlogPost, updateBlogPost as updateBlogPostStore, getAllBlogPosts } from '@/lib/mysql-store'

export async function GET() {
  try {
    const posts = await getAllBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Utiliser addBlogPost de mysql-store qui gère correctement les conversions
    await addBlogPost(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating blog post:', error)
    console.error('Error details:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la création', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    // Utiliser updateBlogPostStore qui gère correctement les conversions
    await updateBlogPostStore(id, updates)
    
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
