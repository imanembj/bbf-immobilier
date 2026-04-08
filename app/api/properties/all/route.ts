import { NextResponse } from 'next/server'
import * as MySQLStore from '@/lib/mysql-store'

export async function GET() {
  try {
    const properties = await MySQLStore.getAllProperties()
    return NextResponse.json(properties)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}
