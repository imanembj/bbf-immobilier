import { NextRequest, NextResponse } from 'next/server'
import { formatContactEmail, getDestinationEmail } from '@/lib/email-config'
import { saveMessage } from '@/lib/supabase-helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Créer l'objet message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      status: 'non_lu' as const,
      created_at: new Date().toISOString(),
    }
    
    // Sauvegarder dans MySQL
    try {
      await saveMessage(newMessage)
    } catch (dbError) {
      console.error('Erreur MySQL:', dbError)
    }

    // Préparer l'email
    const emailData = formatContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    })

    const destinationEmail = getDestinationEmail()

    // En développement, on simule l'envoi d'email
    console.log('📧 Email simulé envoyé à:', destinationEmail)
    console.log('Sujet:', emailData.subject)
    console.log('Contenu HTML généré ✅')

    // TODO: Intégrer un vrai service d'email en production
    // const { data, error } = await resend.emails.send({
    //   from: 'BBF <noreply@bulle-immobiliere.mq>',
    //   to: destinationEmail,
    //   subject: emailData.subject,
    //   html: emailData.html,
    // })

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès !',
      messageData: newMessage,
      emailSentTo: destinationEmail,
    })
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    )
  }
}
