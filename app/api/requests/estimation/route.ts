import { NextRequest, NextResponse } from 'next/server'
import { formatEstimationEmail, getDestinationEmail } from '@/lib/email-config'
import { saveClientRequest } from '@/lib/supabase-helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, propertyType, propertyAddress, propertyArea, propertyRooms, estimationDetails } = body

    // Validation
    if (!name || !email || !phone || !propertyType || !propertyAddress) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Créer l'objet demande
    const newRequest = {
      id: Date.now().toString(),
      type: 'estimation' as const,
      status: 'nouveau' as const,
      name,
      email,
      phone,
      property_type: propertyType,
      property_address: propertyAddress,
      property_area: propertyArea ? Number(propertyArea) : null,
      property_rooms: propertyRooms ? Number(propertyRooms) : null,
      estimation_details: estimationDetails,
      email_sent: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Préparer l'email
    const emailData = formatEstimationEmail({
      name,
      email,
      phone,
      propertyType,
      propertyAddress,
      propertyArea: propertyArea ? Number(propertyArea) : undefined,
      propertyRooms: propertyRooms ? Number(propertyRooms) : undefined,
      estimationDetails,
    })

    const destinationEmail = getDestinationEmail()

    // En développement, on simule l'envoi d'email
    // En production, vous devrez intégrer un service d'email (SendGrid, Resend, etc.)
    console.log('📧 Email simulé envoyé à:', destinationEmail)
    console.log('Sujet:', emailData.subject)
    console.log('Contenu HTML généré ✅')

    // Sauvegarder dans Supabase
    await saveClientRequest(newRequest)

    // TODO: Intégrer un vrai service d'email en production
    // Exemple avec Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'BBF <noreply@bulle-immobiliere.mq>',
    //   to: destinationEmail,
    //   subject: emailData.subject,
    //   html: emailData.html,
    // })

    return NextResponse.json({
      success: true,
      message: 'Votre demande d\'estimation a été envoyée avec succès !',
      request: newRequest,
      emailSentTo: destinationEmail, // Pour debug
    })
  } catch (error) {
    console.error('Erreur lors de la demande d\'estimation:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande' },
      { status: 500 }
    )
  }
}
