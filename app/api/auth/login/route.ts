import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const result = await loginAdmin(email, password)
    
    if (result.success) {
      return NextResponse.json({ success: true, user: result.user })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }
  } catch (error) {
    console.error('Error in login API:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
