# 📧 Configuration des Emails - BBF Immobilier

## ✅ Ce qui a été fait

### 1. Installation de Resend
```bash
npm install resend
```

### 2. Fichiers créés/modifiés
- ✅ `/lib/resend.ts` - Configuration Resend et fonctions d'envoi
- ✅ `/lib/client-email-templates.ts` - Templates de confirmation pour les clients
- ✅ `/lib/email-config.ts` - Template de confirmation de réservation ajouté
- ✅ `/app/api/requests/reservation/route.ts` - Envoi automatique des emails
- ✅ `/components/forms/ReservationForm.tsx` - Envoi des données complètes
- ✅ `.env.example` - Variables d'environnement mises à jour

## 🔧 Configuration requise

### Étape 1 : Créer un compte Resend

1. Aller sur [resend.com](https://resend.com)
2. Créer un compte gratuit (100 emails/jour gratuits)
3. Vérifier votre domaine `bulle-immobiliere.mq` :
   - Aller dans "Domains"
   - Ajouter votre domaine
   - Configurer les enregistrements DNS (SPF, DKIM, DMARC)

### Étape 2 : Obtenir la clé API

1. Dans Resend, aller dans "API Keys"
2. Créer une nouvelle clé API
3. Copier la clé (commence par `re_...`)

### Étape 3 : Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Resend (pour les emails)
RESEND_API_KEY="re_votre_cle_api_ici"
RESEND_FROM_EMAIL="BBF Immobilier <contact@bulle-immobiliere.mq>"
```

**⚠️ IMPORTANT** : Ne jamais commiter le fichier `.env.local` (déjà dans .gitignore)

### Étape 4 : Configuration Vercel (Production)

1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner votre projet BBF
3. Aller dans "Settings" → "Environment Variables"
4. Ajouter les variables :
   - `RESEND_API_KEY` = votre clé API
   - `RESEND_FROM_EMAIL` = `BBF Immobilier <contact@bulle-immobiliere.mq>`

## 📨 Fonctionnement

### Emails envoyés automatiquement

Quand un client fait une demande de **réservation** :

1. **Email à l'agence** (`contact@bulle-immobiliere.mq`) :
   - Notification de nouvelle réservation
   - Détails complets du client
   - Informations de réservation

2. **Email au client** (son adresse email) :
   - Confirmation de demande reçue
   - Récapitulatif détaillé (dates, voyageurs, prix)
   - Prochaines étapes
   - Coordonnées de contact

### Exemple d'email client

```
✅ Demande bien reçue !
Bulle Immobilière BBF

Bonjour [Nom],

Nous avons bien reçu votre demande de réservation pour [Bien].

📋 Récapitulatif :
- Arrivée : [Date]
- Départ : [Date]
- Voyageurs : 2 adultes + 1 enfant

💰 Estimation tarifaire :
- Hébergement : 500€
- Frais de ménage : 150€
- Taxe de séjour : 15€
TOTAL : 665€

📞 Nous vous recontacterons sous 24h
```

## 🧪 Test en développement

### Sans clé API (mode simulation)
Si `RESEND_API_KEY` n'est pas configurée :
- Les emails ne sont PAS envoyés
- Un message s'affiche dans la console : `⚠️ RESEND_API_KEY non configurée`
- La demande est quand même sauvegardée dans Supabase

### Avec clé API (mode réel)
Si `RESEND_API_KEY` est configurée :
- Les emails sont envoyés réellement
- Message dans la console : `✅ Emails envoyés avec succès`

## 📊 Prochaines étapes (optionnel)

### Ajouter les emails pour les autres formulaires

Les templates sont déjà créés dans `/lib/client-email-templates.ts` :
- ✅ `formatClientVisitConfirmation` - Confirmation de visite
- ✅ `formatClientEstimationConfirmation` - Confirmation d'estimation
- ✅ `formatClientAppointmentConfirmation` - Confirmation de RDV

Pour les activer, modifier les API routes :
- `/app/api/requests/visite/route.ts`
- `/app/api/requests/estimation/route.ts`
- `/app/api/requests/rendez-vous/route.ts`

(Même principe que pour la réservation)

## 🔍 Vérification

### Tester l'envoi d'emails

1. Configurer `RESEND_API_KEY` dans `.env.local`
2. Redémarrer le serveur : `npm run dev`
3. Faire une demande de réservation sur le site
4. Vérifier :
   - Console : `✅ Emails envoyés avec succès`
   - Boîte mail de l'agence : Email reçu
   - Boîte mail du client : Email de confirmation reçu

### Dashboard Resend

Aller sur [resend.com/emails](https://resend.com/emails) pour voir :
- Emails envoyés
- Statut de livraison
- Taux d'ouverture
- Erreurs éventuelles

## 💰 Tarifs Resend

- **Gratuit** : 100 emails/jour, 3 000/mois
- **Pro** : 50 000 emails/mois pour 20$/mois
- **Business** : 100 000 emails/mois pour 80$/mois

Pour BBF, le plan gratuit devrait suffire au début !

## 🆘 Dépannage

### Emails non reçus

1. Vérifier que `RESEND_API_KEY` est bien configurée
2. Vérifier les logs dans la console
3. Vérifier le dashboard Resend
4. Vérifier les spams du client
5. Vérifier que le domaine est bien vérifié dans Resend

### Erreur "Invalid API Key"

- La clé API est incorrecte ou expirée
- Regénérer une nouvelle clé dans Resend

### Emails en spam

- Vérifier que les enregistrements DNS (SPF, DKIM) sont bien configurés
- Demander aux clients d'ajouter `contact@bulle-immobiliere.mq` à leurs contacts

## 📞 Support

- Documentation Resend : [resend.com/docs](https://resend.com/docs)
- Support Resend : [resend.com/support](https://resend.com/support)
