// Templates d'emails de confirmation pour les clients

export function formatClientVisitConfirmation(data: {
  name: string
  propertyTitle: string
  preferredDate?: string
  preferredTime?: string
}): { subject: string; html: string } {
  return {
    subject: `✅ Confirmation de votre demande de visite - BBF Immobilier`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ Demande bien reçue !</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Bulle Immobilière BBF</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="font-size: 16px; color: #374151; margin-top: 0;">Bonjour <strong>${data.name}</strong>,</p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            Nous avons bien reçu votre demande de visite pour <strong>${data.propertyTitle}</strong>. 
            Notre équipe va organiser la visite et vous recontactera rapidement pour confirmer le rendez-vous.
          </p>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46;">
              <strong>📞 Nous vous recontacterons sous 24h</strong>
            </p>
          </div>

          <h2 style="color: #0891b2; margin-top: 30px; margin-bottom: 15px;">📋 Récapitulatif de votre demande</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0891b2; margin-top: 0;">🏡 ${data.propertyTitle}</h3>
            
            ${data.preferredDate || data.preferredTime ? `
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              ${data.preferredDate ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Date souhaitée :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.preferredDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              ` : ''}
              ${data.preferredTime ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Heure souhaitée :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.preferredTime}</td>
              </tr>
              ` : ''}
            </table>
            ` : ''}
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Prochaines étapes :</strong><br>
              1. Notre équipe organise la visite<br>
              2. Vous recevrez une confirmation par email ou téléphone<br>
              3. Rendez-vous sur place à la date convenue
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

export function formatClientEstimationConfirmation(data: {
  name: string
  propertyType: string
  propertyAddress: string
}): { subject: string; html: string } {
  return {
    subject: `✅ Confirmation de votre demande d'estimation - BBF Immobilier`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ Demande bien reçue !</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Bulle Immobilière BBF</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="font-size: 16px; color: #374151; margin-top: 0;">Bonjour <strong>${data.name}</strong>,</p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            Nous avons bien reçu votre demande d'estimation pour votre bien immobilier. 
            Notre expert va étudier votre dossier et vous recontactera rapidement pour planifier une visite.
          </p>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46;">
              <strong>📞 Nous vous recontacterons sous 48h</strong>
            </p>
          </div>

          <h2 style="color: #0891b2; margin-top: 30px; margin-bottom: 15px;">📋 Récapitulatif de votre demande</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Type de bien :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Adresse :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.propertyAddress}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Prochaines étapes :</strong><br>
              1. Notre expert étudie votre dossier<br>
              2. Prise de rendez-vous pour une visite sur place<br>
              3. Estimation gratuite et sans engagement
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

export function formatClientAppointmentConfirmation(data: {
  name: string
  appointmentDate?: string
  appointmentTime?: string
  appointmentReason?: string
}): { subject: string; html: string } {
  return {
    subject: `✅ Confirmation de votre demande de rendez-vous - BBF Immobilier`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ Demande bien reçue !</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Bulle Immobilière BBF</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="font-size: 16px; color: #374151; margin-top: 0;">Bonjour <strong>${data.name}</strong>,</p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            Nous avons bien reçu votre demande de rendez-vous. 
            Notre équipe va vérifier les disponibilités et vous recontactera rapidement pour confirmer le créneau.
          </p>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46;">
              <strong>📞 Nous vous recontacterons sous 24h</strong>
            </p>
          </div>

          <h2 style="color: #0891b2; margin-top: 30px; margin-bottom: 15px;">📋 Récapitulatif de votre demande</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${data.appointmentDate ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Date souhaitée :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(data.appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
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
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Prochaines étapes :</strong><br>
              1. Notre équipe vérifie les disponibilités<br>
              2. Vous recevrez une confirmation par email ou téléphone<br>
              3. Rendez-vous à notre agence ou en visio selon votre préférence
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
