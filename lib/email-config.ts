// Configuration des emails
export interface EmailConfig {
  testMode: boolean // true = envoie à l'email de test, false = envoie à BBF
  testEmail: string
  productionEmail: string
}

const defaultEmailConfig: EmailConfig = {
  testMode: true, // Par défaut en mode test
  testEmail: 'imtheone.contact@gmail.com',
  productionEmail: 'contact@bulle-immobiliere.mq',
}

// Récupérer la configuration email
export function getEmailConfig(): EmailConfig {
  if (typeof window === 'undefined') {
    return defaultEmailConfig
  }

  const stored = localStorage.getItem('email_config')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultEmailConfig
    }
  }
  return defaultEmailConfig
}

// Sauvegarder la configuration email
export function saveEmailConfig(config: EmailConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('email_config', JSON.stringify(config))
  }
}

// Obtenir l'email de destination selon le mode
export function getDestinationEmail(): string {
  const config = getEmailConfig()
  return config.testMode ? config.testEmail : config.productionEmail
}

// Fonction pour formater les emails (templates)
export function formatEstimationEmail(data: {
  name: string
  email: string
  phone: string
  propertyType: string
  propertyAddress: string
  propertyArea?: number
  propertyRooms?: number
  estimationDetails?: string
}): { subject: string; html: string } {
  return {
    subject: `🏠 Nouvelle demande d'estimation - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Bulle Immobilière BBF</h1>
          <p style="color: white; margin: 10px 0 0 0;">Nouvelle demande d'estimation</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #0891b2; margin-top: 0;">📋 Informations du client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
          </table>

          <h2 style="color: #0891b2; margin-top: 30px;">🏡 Informations du bien</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Type :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Adresse :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyAddress}</td>
            </tr>
            ${data.propertyArea ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Surface :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyArea} m²</td>
            </tr>
            ` : ''}
            ${data.propertyRooms ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nombre de pièces :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyRooms}</td>
            </tr>
            ` : ''}
          </table>

          ${data.estimationDetails ? `
          <h2 style="color: #0891b2; margin-top: 30px;">💬 Détails supplémentaires</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2;">
            ${data.estimationDetails}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>⏰ Action requise :</strong> Contactez ce client dans les plus brefs délais pour planifier l'estimation.
            </p>
          </div>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}

export function formatVisitEmail(data: {
  name: string
  email: string
  phone: string
  propertyTitle: string
  propertyId: string
  preferredDate?: Date
  preferredTime?: string
  visitMessage?: string
}): { subject: string; html: string } {
  return {
    subject: `🏠 Demande de visite - ${data.propertyTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Bulle Immobilière BBF</h1>
          <p style="color: white; margin: 10px 0 0 0;">Nouvelle demande de visite</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #0891b2; margin-top: 0;">🏡 Bien concerné</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <strong>${data.propertyTitle}</strong>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Réf: ${data.propertyId}</p>
          </div>

          <h2 style="color: #0891b2;">📋 Informations du visiteur</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            ${data.preferredDate ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Date souhaitée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.preferredDate).toLocaleDateString('fr-FR')}</td>
            </tr>
            ` : ''}
            ${data.preferredTime ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Heure souhaitée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.preferredTime}</td>
            </tr>
            ` : ''}
          </table>

          ${data.visitMessage ? `
          <h2 style="color: #0891b2; margin-top: 30px;">💬 Message du visiteur</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2;">
            ${data.visitMessage}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>⏰ Action requise :</strong> Confirmez la visite avec le client.
            </p>
          </div>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}

export function formatReservationEmail(data: {
  name: string
  email: string
  phone: string
  propertyTitle: string
  propertyId: string
  checkIn: Date
  checkOut: Date
  guests: number
  reservationMessage?: string
}): { subject: string; html: string } {
  const nights = Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24))
  
  return {
    subject: `📅 Nouvelle réservation - ${data.propertyTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Bulle Immobilière BBF</h1>
          <p style="color: white; margin: 10px 0 0 0;">Nouvelle demande de réservation</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #0891b2; margin-top: 0;">🏡 Bien concerné</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <strong>${data.propertyTitle}</strong>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Réf: ${data.propertyId}</p>
          </div>

          <h2 style="color: #0891b2;">📅 Détails de la réservation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Arrivée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.checkIn).toLocaleDateString('fr-FR')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Départ :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.checkOut).toLocaleDateString('fr-FR')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Durée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${nights} nuit${nights > 1 ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Voyageurs :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.guests} personne${data.guests > 1 ? 's' : ''}</td>
            </tr>
          </table>

          <h2 style="color: #0891b2; margin-top: 30px;">📋 Informations du client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
          </table>

          ${data.reservationMessage ? `
          <h2 style="color: #0891b2; margin-top: 30px;">💬 Message du client</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2;">
            ${data.reservationMessage}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>⏰ Action requise :</strong> Confirmez la disponibilité et envoyez le contrat de réservation.
            </p>
          </div>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}

export function formatAppointmentEmail(data: {
  name: string
  email: string
  phone: string
  appointmentDate?: Date
  appointmentTime?: string
  appointmentReason?: string
  appointmentMessage?: string
}): { subject: string; html: string } {
  return {
    subject: `📆 Demande de rendez-vous - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Bulle Immobilière BBF</h1>
          <p style="color: white; margin: 10px 0 0 0;">Nouvelle demande de rendez-vous</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #0891b2; margin-top: 0;">📋 Informations du client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            ${data.appointmentDate ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Date souhaitée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.appointmentDate).toLocaleDateString('fr-FR')}</td>
            </tr>
            ` : ''}
            ${data.appointmentTime ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Heure souhaitée :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.appointmentTime}</td>
            </tr>
            ` : ''}
            ${data.appointmentReason ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Motif :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.appointmentReason}</td>
            </tr>
            ` : ''}
          </table>

          ${data.appointmentMessage ? `
          <h2 style="color: #0891b2; margin-top: 30px;">💬 Message du client</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2;">
            ${data.appointmentMessage}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>⏰ Action requise :</strong> Confirmez le rendez-vous avec le client.
            </p>
          </div>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}

export function formatContactEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): { subject: string; html: string } {
  return {
    subject: `💬 Nouveau message - ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Bulle Immobilière BBF</h1>
          <p style="color: white; margin: 10px 0 0 0;">Nouveau message de contact</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #0891b2; margin-top: 0;">📋 Informations de l'expéditeur</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Sujet :</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.subject}</td>
            </tr>
          </table>

          <h2 style="color: #0891b2; margin-top: 30px;">💬 Message</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0891b2;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>💡 Conseil :</strong> Répondez rapidement pour maintenir une bonne relation client.
            </p>
          </div>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}

// ==================== EMAILS DE CONFIRMATION POUR LES CLIENTS ====================

export function formatClientReservationConfirmation(data: {
  name: string
  propertyTitle: string
  checkIn: Date
  checkOut: Date
  adults: number
  children: number
  subtotal: number
  cleaningFee: number
  touristTax: number
  total: number
}): { subject: string; html: string } {
  const nights = Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24))
  const totalGuests = data.adults + data.children
  
  return {
    subject: `✅ Confirmation de votre demande de réservation - BBF Immobilier`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ Demande bien reçue !</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Bulle Immobilière BBF</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="font-size: 16px; color: #374151; margin-top: 0;">Bonjour <strong>${data.name}</strong>,</p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            Nous avons bien reçu votre demande de réservation pour <strong>${data.propertyTitle}</strong>. 
            Notre équipe va vérifier la disponibilité et vous recontactera dans les plus brefs délais.
          </p>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46;">
              <strong>📞 Nous vous recontacterons sous 24h</strong>
            </p>
          </div>

          <h2 style="color: #0891b2; margin-top: 30px; margin-bottom: 15px;">📋 Récapitulatif de votre demande</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0891b2; margin-top: 0;">🏡 ${data.propertyTitle}</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Arrivée :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.checkIn).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Départ :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.checkOut).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Durée :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${nights} nuit${nights > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Voyageurs :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.adults} adulte${data.adults > 1 ? 's' : ''}${data.children > 0 ? ` + ${data.children} enfant${data.children > 1 ? 's' : ''}` : ''}</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #0891b2; margin-top: 25px; margin-bottom: 10px;">💰 Estimation tarifaire</h3>
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Hébergement (${nights} nuit${nights > 1 ? 's' : ''})</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${data.subtotal.toFixed(2)}€</td>
              </tr>
              ${data.cleaningFee > 0 ? `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Frais de ménage</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${data.cleaningFee.toFixed(2)}€</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
                  Taxe de séjour
                  <div style="font-size: 12px; color: #6b7280;">${data.adults} adulte${data.adults > 1 ? 's' : ''} × ${nights} nuit${nights > 1 ? 's' : ''} × 2,50€</div>
                </td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${data.touristTax.toFixed(2)}€</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; font-size: 18px; font-weight: bold; color: #0891b2;">TOTAL</td>
                <td style="padding: 12px 8px; font-size: 18px; font-weight: bold; color: #0891b2; text-align: right;">${data.total.toFixed(2)}€</td>
              </tr>
            </table>
            
            <p style="font-size: 12px; color: #6b7280; margin-top: 15px; margin-bottom: 0;">
              💡 Ce montant est une estimation. Le prix définitif vous sera confirmé par notre équipe.
            </p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Prochaines étapes :</strong><br>
              1. Notre équipe vérifie la disponibilité<br>
              2. Vous recevrez une confirmation par email ou téléphone<br>
              3. Signature du contrat et paiement de l'acompte
            </p>
          </div>

          <p style="color: #6b7280; margin-top: 25px; line-height: 1.6;">
            Si vous avez des questions, n'hésitez pas à nous contacter :<br>
            📞 <a href="tel:+596696007420" style="color: #0891b2; text-decoration: none;">+596 696 00 74 20</a><br>
            📧 <a href="mailto:contact@bulle-immobiliere.mq" style="color: #0891b2; text-decoration: none;">contact@bulle-immobiliere.mq</a>
          </p>

          <p style="color: #6b7280; margin-top: 20px;">
            À très bientôt,<br>
            <strong style="color: #0891b2;">L'équipe BBF Immobilier</strong>
          </p>
        </div>

        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">Bulle Immobilière, Business & Foncier (BBF)</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">Rivière-Pilote, Martinique</p>
        </div>
      </div>
    `
  }
}
