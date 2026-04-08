# 📧 Système d'Emails et Gestion des Demandes Clients

## 🎯 Vue d'ensemble

Système complet de gestion des demandes clients avec envoi d'emails automatiques et stockage dans l'interface d'administration.

---

## 📋 Types de demandes gérées

### 1. **Estimation de bien** (`/api/requests/estimation`)
- Demande d'estimation gratuite d'un bien immobilier
- Formulaire : `EstimationForm`
- Champs : nom, email, téléphone, type de bien, adresse, surface, nombre de pièces, détails

### 2. **Demande de visite** (`/api/requests/visite`)
- Demande de visite pour un bien spécifique
- Formulaire : `VisitRequestForm`
- Champs : nom, email, téléphone, bien concerné, date/heure souhaitée, message

### 3. **Réservation** (`/api/requests/reservation`)
- Réservation d'un bien en location saisonnière
- Formulaire : `ReservationForm`
- Champs : nom, email, téléphone, bien concerné, dates, nombre de voyageurs, message

### 4. **Rendez-vous** (`/api/requests/rendez-vous`)
- Prise de rendez-vous avec l'agence
- Formulaire : `AppointmentForm`
- Champs : nom, email, téléphone, motif, date/heure souhaitée, message

### 5. **Contact général** (`/api/contact`)
- Message de contact général
- Stocké dans la section "Messages" de l'admin

---

## 🔧 Configuration des emails

### Fichier : `/lib/email-config.ts`

```typescript
{
  testMode: true,              // true = email de test, false = email production
  testEmail: 'imtheone.contact@gmail.com',
  productionEmail: 'contact@bulle-immobiliere.mq'
}
```

### Changer le mode d'envoi

**Option 1 : Via l'admin (à implémenter)**
- Section Paramètres > Configuration Emails
- Toggle "Mode Test" / "Mode Production"

**Option 2 : Manuellement dans le code**
```typescript
// Dans /lib/email-config.ts
testMode: false  // Passer à false pour utiliser l'email BBF
```

---

## 📁 Structure des fichiers

### Types et données
- `/lib/data.ts` - Types `ClientRequest`, `RequestType`, `RequestStatus`
- `/lib/email-config.ts` - Configuration emails + templates HTML

### API Routes
- `/app/api/requests/estimation/route.ts`
- `/app/api/requests/visite/route.ts`
- `/app/api/requests/reservation/route.ts`
- `/app/api/requests/rendez-vous/route.ts`
- `/app/api/contact/route.ts`

### Composants formulaires
- `/components/forms/EstimationForm.tsx`
- `/components/forms/VisitRequestForm.tsx`
- `/components/forms/ReservationForm.tsx`
- `/components/forms/AppointmentForm.tsx`

### Store (gestion des données)
- `/lib/store.ts` - Méthodes :
  - `getClientRequests()` - Toutes les demandes
  - `getClientRequestsByType(type)` - Par type
  - `getClientRequestsByStatus(status)` - Par statut
  - `addClientRequest()` - Ajouter
  - `updateClientRequest()` - Modifier
  - `deleteClientRequest()` - Supprimer

---

## 🎨 Templates d'emails

Chaque type de demande a son propre template HTML professionnel :

### Caractéristiques communes
- ✅ Design responsive
- ✅ Couleurs de la marque (cyan/teal)
- ✅ Logo et footer BBF
- ✅ Informations client cliquables (email, téléphone)
- ✅ Call-to-action clair
- ✅ Formatage professionnel

### Fonctions de formatage
- `formatEstimationEmail(data)` - Email estimation
- `formatVisitEmail(data)` - Email visite
- `formatReservationEmail(data)` - Email réservation
- `formatAppointmentEmail(data)` - Email rendez-vous
- `formatContactEmail(data)` - Email contact

---

## 🔄 Flux de traitement

### 1. Client remplit le formulaire
```
Formulaire → Validation → API Route
```

### 2. API traite la demande
```
API Route → Enregistrement dans Store → Préparation email → Envoi (simulé)
```

### 3. Stockage
```
localStorage → Section Admin → Gestion des demandes
```

### 4. Notification admin
```
Email envoyé → Visible dans l'admin → Statut "nouveau"
```

---

## 📊 Statuts des demandes

- **`nouveau`** - Demande non traitée (badge rouge)
- **`en_cours`** - Demande en cours de traitement (badge jaune)
- **`traite`** - Demande traitée (badge vert)
- **`annule`** - Demande annulée (badge gris)

---

## 🎯 Intégration dans les pages

### Page Vendre (`/app/vendre/page.tsx`)
```tsx
import { EstimationForm } from '@/components/forms'

<EstimationForm onSuccess={() => console.log('Estimation envoyée!')} />
```

### Page Bien (`/app/biens/[id]/page.tsx`)
```tsx
import { VisitRequestForm, ReservationForm } from '@/components/forms'

// Pour demander une visite
<VisitRequestForm 
  propertyId={property.id}
  propertyTitle={property.title}
  onSuccess={() => setShowModal(false)}
/>

// Pour réserver (location saisonnière)
<ReservationForm 
  propertyId={property.id}
  propertyTitle={property.title}
  onSuccess={() => setShowModal(false)}
/>
```

### Page Contact (`/app/contact/page.tsx`)
```tsx
import { AppointmentForm } from '@/components/forms'

<AppointmentForm onSuccess={() => console.log('RDV demandé!')} />
```

---

## 🚀 Intégration d'un vrai service d'email

### Actuellement (Développement)
- Les emails sont **simulés**
- Logs dans la console
- Données sauvegardées dans le store

### Pour la production

#### Option 1 : Resend (Recommandé)
```bash
npm install resend
```

```typescript
// Dans les API routes
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'BBF <noreply@bulle-immobiliere.mq>',
  to: destinationEmail,
  subject: emailData.subject,
  html: emailData.html,
})
```

#### Option 2 : SendGrid
```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

await sgMail.send({
  to: destinationEmail,
  from: 'contact@bulle-immobiliere.mq',
  subject: emailData.subject,
  html: emailData.html,
})
```

#### Option 3 : Nodemailer
```bash
npm install nodemailer
```

---

## 📱 Section Admin (à implémenter)

### Nouvel onglet "Demandes Clients"

#### Statistiques
- Nouvelles demandes (badge rouge)
- En cours (badge jaune)
- Traitées ce mois
- Total demandes

#### Filtres
- Par type (estimation, visite, réservation, RDV)
- Par statut (nouveau, en_cours, traite, annule)
- Par date
- Recherche par nom/email

#### Actions
- Voir les détails
- Changer le statut
- Ajouter des notes internes
- Marquer comme traité
- Supprimer

#### Tableau
| Date | Type | Client | Contact | Statut | Actions |
|------|------|--------|---------|--------|---------|
| ... | ... | ... | ... | ... | Voir/Modifier/Supprimer |

---

## 🔐 Sécurité

### Validation
- ✅ Validation côté client (formulaires)
- ✅ Validation côté serveur (API routes)
- ✅ Protection CSRF (Next.js)
- ✅ Sanitization des données

### Données sensibles
- ⚠️ Ne jamais exposer les clés API
- ⚠️ Utiliser des variables d'environnement
- ⚠️ HTTPS obligatoire en production

---

## 📞 Boutons "Appeler"

### Configuration du numéro
Fichier : `/lib/agency-config.ts`

```typescript
phone: "+596 696 XX XX XX"  // Remplacer par le vrai numéro BBF
```

### Utilisation dans les composants
```tsx
import { getAgencyConfig } from '@/lib/agency-config'

const config = getAgencyConfig()
<a href={`tel:${config.phone}`}>Appeler</a>
```

---

## ✅ Checklist de mise en production

### Avant le déploiement
- [ ] Changer `testMode: false` dans `/lib/email-config.ts`
- [ ] Configurer le service d'email (Resend/SendGrid/Nodemailer)
- [ ] Ajouter les clés API dans les variables d'environnement
- [ ] Mettre à jour le numéro de téléphone dans `/lib/agency-config.ts`
- [ ] Tester tous les formulaires
- [ ] Vérifier la réception des emails
- [ ] Implémenter la section "Demandes" dans l'admin
- [ ] Configurer les notifications (optionnel)

### Variables d'environnement (.env.local)
```env
# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
# ou
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Configuration
NEXT_PUBLIC_EMAIL_MODE=production
```

---

## 🎓 Guide d'utilisation pour l'équipe BBF

### Réception d'une demande
1. Email reçu automatiquement
2. Connexion à l'admin : `/admin`
3. Onglet "Demandes Clients"
4. Nouvelle demande visible avec badge rouge

### Traiter une demande
1. Cliquer sur "Voir les détails"
2. Contacter le client (email/téléphone cliquable)
3. Changer le statut en "En cours"
4. Ajouter des notes si nécessaire
5. Une fois terminé, marquer comme "Traité"

### Basculer en mode production
1. Admin > Paramètres > Configuration Emails
2. Désactiver "Mode Test"
3. Les emails seront envoyés à contact@bulle-immobiliere.mq

---

## 📈 Statistiques disponibles

Dans le store (`getStats()`):
- `newRequests` - Nombre de nouvelles demandes
- `totalRequests` - Total des demandes
- `unreadMessages` - Messages non lus
- `totalProperties` - Biens disponibles
- `pendingBookings` - Réservations en attente

---

## 🆘 Support et dépannage

### Les emails ne sont pas reçus
1. Vérifier le mode (test/production)
2. Vérifier les logs de la console
3. Vérifier la configuration du service d'email
4. Vérifier les spams

### Les demandes ne s'affichent pas dans l'admin
1. Vérifier localStorage (F12 > Application > Local Storage)
2. Rafraîchir la page admin
3. Vérifier la console pour les erreurs

### Formulaire ne s'envoie pas
1. Ouvrir la console (F12)
2. Vérifier les erreurs réseau
3. Vérifier que tous les champs requis sont remplis
4. Vérifier la connexion internet

---

## 📝 Notes importantes

- **Mode test** : Tous les emails vont à `imtheone.contact@gmail.com`
- **Mode production** : Tous les emails vont à `contact@bulle-immobiliere.mq`
- Les données sont stockées dans **localStorage** (temporaire)
- Pour un stockage permanent, migrer vers une base de données
- Les templates d'emails sont personnalisables dans `/lib/email-config.ts`

---

**Créé le :** 20 mars 2026  
**Version :** 1.0  
**Auteur :** Système BBF
