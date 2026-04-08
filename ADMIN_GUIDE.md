# 🔐 Guide d'Administration - Bulle Immobilière

## 📋 Accès à l'Administration

### Connexion
1. Accédez à : `http://localhost:3000/admin/login`
2. Utilisez les identifiants par défaut :
   - **Email** : `admin@bulle-immobiliere.mq`
   - **Mot de passe** : `admin123`

### Sécurité
- ✅ L'accès admin est **protégé par authentification**
- ✅ Seuls les utilisateurs connectés peuvent accéder au tableau de bord
- ✅ Le token de session est stocké dans localStorage
- ✅ Bouton de déconnexion disponible en haut à droite

---

## 🎯 Fonctionnalités Disponibles

### 1️⃣ **Tableau de Bord** (Dashboard)
**Vue d'ensemble de l'activité**
- 📊 Statistiques en temps réel :
  - Nombre total de biens
  - Nombre de réservations
  - Messages non lus
  - Revenus totaux
- 📝 Biens récents (4 derniers)
- 📅 Réservations récentes (3 dernières)
- 💬 Messages récents (3 derniers)

**Actions disponibles :**
- Cliquer sur un message pour le marquer comme lu
- Modifier un bien (bouton éditer)
- Ajouter un nouveau bien

---

### 2️⃣ **Gestion des Biens** (Properties)
**Liste complète de tous les biens immobiliers**

**Informations affichées :**
- Titre du bien
- Type (Vente / Location / Saisonnière)
- Prix
- Statut (Disponible / Réservé / Loué / Vendu)

**Actions disponibles :**
- 👁️ Voir les détails
- ✏️ Modifier
- 🗑️ **Supprimer** (avec confirmation)
- ➕ Ajouter un nouveau bien
- 🔍 Rechercher un bien
- 🎯 Filtrer les biens

---

### 3️⃣ **Gestion des Réservations** (Bookings)
**Gérer toutes les réservations clients**

**Informations affichées :**
- Nom du bien réservé
- Informations client (nom, email, téléphone)
- Dates d'arrivée et de départ
- Nombre de voyageurs
- Message du client (si présent)
- Prix total

**Actions disponibles :**
- 🔄 **Changer le statut** via menu déroulant :
  - En attente
  - Confirmé
  - Annulé
  - Terminé
- Les changements sont **sauvegardés automatiquement**
- Notification toast à chaque modification

---

### 4️⃣ **Gestion des Messages** (Messages)
**Consulter et gérer les messages clients**

**Informations affichées :**
- Nom et coordonnées de l'expéditeur
- Sujet du message
- Contenu complet
- Date de réception
- Statut (Non lu / Lu / Répondu)

**Actions disponibles :**
- 📧 **Cliquer sur un message** pour le marquer comme lu
- Les messages non lus sont **mis en évidence** (fond bleu)
- Indicateur visuel pour les messages non lus

---

### 5️⃣ **Gestion des Clients** (Clients)
**Vue d'ensemble de tous les clients**

**Informations affichées :**
- Nom et email du client
- Numéro de téléphone
- **Nombre total de réservations**
- **Total dépensé** (somme de toutes les réservations)

**Fonctionnalités :**
- Cartes visuelles pour chaque client
- Statistiques automatiques
- Identification rapide des meilleurs clients

---

### 6️⃣ **Paramètres** (Settings)
**Configuration de l'agence et sécurité**

**Sections disponibles :**

#### Informations de l'agence
- Nom de l'agence
- Email de contact
- Téléphone
- Adresse

#### Sécurité
- Changer le mot de passe administrateur

#### Zone dangereuse
- Réinitialiser toutes les données (⚠️ irréversible)

---

## 💾 Sauvegarde des Données

### Système de Stockage
- **Toutes les données sont sauvegardées dans localStorage**
- Sauvegarde automatique à chaque modification
- Les données persistent entre les sessions
- Pas besoin de base de données pour le développement

### Données Gérées
- ✅ Biens immobiliers
- ✅ Réservations
- ✅ Messages
- ✅ Statistiques calculées en temps réel

---

## 🎨 Interface Utilisateur

### Design
- Interface moderne et épurée
- Couleurs : Cyan & Teal (rappel de la Martinique)
- Responsive (mobile, tablette, desktop)
- Animations fluides
- Notifications toast pour chaque action

### Navigation
- **Onglets clairs** pour chaque section
- **Bouton de déconnexion** visible en permanence
- Indicateurs visuels pour les statuts
- Badges de comptage sur les statistiques

---

## 🚀 Prochaines Étapes (Production)

### Pour passer en production, il faudra :

1. **Base de données réelle**
   - Remplacer localStorage par Prisma + PostgreSQL
   - Migrations de base de données

2. **Authentification sécurisée**
   - Implémenter NextAuth.js
   - Hash des mots de passe avec bcrypt
   - Tokens JWT sécurisés
   - Gestion des rôles (admin, agent, etc.)

3. **API Routes**
   - Créer des endpoints API sécurisés
   - Validation des données avec Zod
   - Gestion des erreurs

4. **Upload d'images**
   - Intégration Cloudinary ou AWS S3
   - Gestion des images de biens

5. **Emails**
   - Notifications automatiques
   - Confirmations de réservation
   - Réponses aux messages

6. **Calendrier de disponibilité**
   - Synchronisation avec Airbnb
   - Gestion des indisponibilités

---

## 📞 Support

Pour toute question ou problème :
- Email : contact@bulle-immobiliere.mq
- Téléphone : +596 696 XX XX XX

---

## ✨ Résumé des Fonctionnalités

| Fonctionnalité | Status | Description |
|----------------|--------|-------------|
| 🔐 Authentification | ✅ | Login sécurisé avec protection de route |
| 📊 Dashboard | ✅ | Statistiques et aperçu global |
| 🏠 Gestion Biens | ✅ | CRUD complet avec suppression |
| 📅 Gestion Réservations | ✅ | Modification de statut en temps réel |
| 💬 Gestion Messages | ✅ | Marquage lu/non lu |
| 👥 Gestion Clients | ✅ | Vue d'ensemble et statistiques |
| ⚙️ Paramètres | ✅ | Configuration de l'agence |
| 💾 Sauvegarde Auto | ✅ | localStorage avec persistence |
| 🔔 Notifications | ✅ | Toast pour chaque action |
| 📱 Responsive | ✅ | Compatible mobile/tablette/desktop |

---

**Dernière mise à jour** : Mars 2026
**Version** : 1.0.0
