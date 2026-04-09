// Configuration Resend pour l'envoi d'emails
import { Resend } from 'resend'

// Initialiser Resend avec la clé API (optionnel)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Email de l'expéditeur
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'BBF Immobilier <contact@bulle-immobiliere.mq>'

// Fonction pour envoyer un email
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  if (!resend) {
    console.warn('⚠️ Resend non configuré - Email non envoyé')
    return { success: false, error: 'Resend API key not configured' }
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    })

    console.log('✅ Email envoyé avec succès:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
    return { success: false, error }
  }
}

// Fonction pour envoyer un email à l'agence ET au client
export async function sendEmailToAgencyAndClient({
  clientEmail,
  clientSubject,
  clientHtml,
  agencyEmail,
  agencySubject,
  agencyHtml,
}: {
  clientEmail: string
  clientSubject: string
  clientHtml: string
  agencyEmail: string
  agencySubject: string
  agencyHtml: string
}) {
  try {
    // Envoyer au client
    const clientResult = await sendEmail({
      to: clientEmail,
      subject: clientSubject,
      html: clientHtml,
    })

    // Envoyer à l'agence
    const agencyResult = await sendEmail({
      to: agencyEmail,
      subject: agencySubject,
      html: agencyHtml,
    })

    return {
      success: clientResult.success && agencyResult.success,
      clientResult,
      agencyResult,
    }
  } catch (error) {
    console.error('❌ Erreur envoi emails:', error)
    return { success: false, error }
  }
}
