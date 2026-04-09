import { NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Incrémenter les vues
    await query(
      'UPDATE blog_posts SET views = views + 1 WHERE slug = ?',
      [params.slug]
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}
