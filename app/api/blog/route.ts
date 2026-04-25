import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/mysql-store'

// Désactiver le cache pour que les nouveaux articles apparaissent immédiatement
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const posts = await getBlogPosts()
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
