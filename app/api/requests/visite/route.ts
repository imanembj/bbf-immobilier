import { NextRequest, NextResponse } from 'next/server'
import { formatVisitEmail, getDestinationEmail } from '@/lib/email-config'
import { saveClientRequest } from '@/lib/supabase-helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, propertyId, propertyTitle, preferredDate, preferredTime, visitMessage } = body

    // Validation
    if (!name || !email || !phone || !propertyId || !propertyTitle) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Créer l'objet demande
    const newRequest = {
      id: Date.now().toString(),
      type: 'visite' as const,
      status: 'nouveau' as const,
      name,
      email,
      phone,
      property_id: propertyId,
      property_title: propertyTitle,
      preferred_date: preferredDate ? new Date(preferredDate).toISOString() : null,
      preferred_time: preferredTime,
      visit_message: visitMessage,
      email_sent: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Préparer l'email
    const emailData = formatVisitEmail({
      name,
      email,
      phone,
      propertyId,
      propertyTitle,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime,
      visitMessage,
    })

    const destinationEmail = getDestinationEmail()

    // En développement, on simule l'envoi d'email
    console.log('📧 Email simulé envoyé à:', destinationEmail)
    console.log('Sujet:', emailData.subject)
    console.log('Contenu HTML généré ✅')

    // Sauvegarder dans Supabase
    await saveClientRequest(newRequest)

    // TODO: Intégrer un vrai service d'email en production
    // const { data, error } = await resend.emails.send({
    //   from: 'BBF <noreply@bulle-immobiliere.mq>',
    //   to: destinationEmail,
    //   subject: emailData.subject,
    //   html: emailData.html,
    // })

    return NextResponse.json({
      success: true,
      message: 'Votre demande de visite a été envoyée avec succès !',
      request: newRequest,
      emailSentTo: destinationEmail,
    })
  } catch (error) {
    console.error('Erreur lors de la demande de visite:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande' },
      { status: 500 }
    )
  }
}
