import { NextRequest, NextResponse } from 'next/server'
import { formatReservationEmail, formatClientReservationConfirmation, getDestinationEmail } from '@/lib/email-config'
import { saveClientRequest } from '@/lib/supabase-helpers'
import { sendEmailToAgencyAndClient } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, propertyId, propertyTitle, checkIn, checkOut, adults, children, reservationMessage, subtotal, cleaningFee, touristTax, totalPrice, pricePerNight } = body

    // Validation
    const totalGuests = (adults || 0) + (children || 0)
    if (!name || !email || !phone || !propertyId || !propertyTitle || !checkIn || !checkOut || totalGuests === 0) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Créer l'objet demande
    const newRequest = {
      id: Date.now().toString(),
      type: 'reservation' as const,
      status: 'nouveau' as const,
      name,
      email,
      phone,
      property_id: propertyId,
      property_title: propertyTitle,
      check_in: checkIn ? new Date(checkIn).toISOString() : null,
      check_out: checkOut ? new Date(checkOut).toISOString() : null,
      guests: totalGuests,
      reservation_message: reservationMessage,
      total_price: totalPrice || null,
      price_per_night: pricePerNight || null,
      email_sent: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Préparer l'email pour l'agence
    const agencyEmailData = formatReservationEmail({
      name,
      email,
      phone,
      propertyId,
      propertyTitle,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: totalGuests,
      reservationMessage,
    })

    // Préparer l'email de confirmation pour le client
    const clientEmailData = formatClientReservationConfirmation({
      name,
      propertyTitle,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      adults: adults || 0,
      children: children || 0,
      subtotal: subtotal || 0,
      cleaningFee: cleaningFee || 0,
      touristTax: touristTax || 0,
      total: totalPrice || 0,
    })

    const agencyEmail = getDestinationEmail()

    // Sauvegarder dans Supabase
    await saveClientRequest(newRequest)

    // Envoyer les emails (agence + client)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendEmailToAgencyAndClient({
          clientEmail: email,
          clientSubject: clientEmailData.subject,
          clientHtml: clientEmailData.html,
          agencyEmail,
          agencySubject: agencyEmailData.subject,
          agencyHtml: agencyEmailData.html,
        })
        console.log('✅ Emails envoyés avec succès')
      } catch (emailError) {
        console.error('❌ Erreur envoi emails:', emailError)
        // On continue même si l'email échoue
      }
    } else {
      console.log('⚠️ RESEND_API_KEY non configurée - Emails non envoyés')
    }

    return NextResponse.json({
      success: true,
      message: 'Votre demande de réservation a été envoyée avec succès ! Vous allez recevoir un email de confirmation.',
      request: newRequest,
    })
  } catch (error) {
    console.error('Erreur lors de la demande de réservation:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande' },
      { status: 500 }
    )
  }
}
