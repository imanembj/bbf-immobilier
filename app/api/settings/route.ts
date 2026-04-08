import { NextResponse } from 'next/server'
import { getAgencySettings } from '@/lib/mysql-store'

export async function GET() {
  try {
    const settings = await getAgencySettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
