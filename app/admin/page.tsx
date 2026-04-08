'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/auth-session'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Administration BBF Immobilier
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            La page d'administration complète est en cours de migration vers MySQL.
          </p>
          <p className="text-gray-600">
            Pour gérer vos biens, utilisez temporairement phpMyAdmin sur Hostinger.
          </p>
        </div>
      </div>
    </div>
  )
}
