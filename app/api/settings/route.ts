import { NextRequest, NextResponse } from 'next/server'
import { getAgencySettings, updateAgencySettings } from '@/lib/mysql-store'

export async function GET() {
  try {
    const settings = await getAgencySettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json()
    await updateAgencySettings(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
