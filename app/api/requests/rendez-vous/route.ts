import { NextRequest, NextResponse } from 'next/server'
import { formatAppointmentEmail, getDestinationEmail } from '@/lib/email-config'
import { saveClientRequest } from '@/lib/supabase-helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, appointmentDate, appointmentTime, appointmentReason, appointmentMessage } = body

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Créer l'objet demande
    const newRequest = {
      id: Date.now().toString(),
      type: 'rendez-vous' as const,
      status: 'nouveau' as const,
      name,
      email,
      phone,
      appointment_date: appointmentDate ? new Date(appointmentDate).toISOString() : null,
      appointment_time: appointmentTime,
      appointment_reason: appointmentReason,
      appointment_message: appointmentMessage,
      email_sent: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Préparer l'email
    const emailData = formatAppointmentEmail({
      name,
      email,
      phone,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
      appointmentTime,
      appointmentReason,
      appointmentMessage,
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
      message: 'Votre demande de rendez-vous a été envoyée avec succès !',
      request: newRequest,
      emailSentTo: destinationEmail,
    })
  } catch (error) {
    console.error('Erreur lors de la demande de rendez-vous:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande' },
      { status: 500 }
    )
  }
}
