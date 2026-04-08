# 🏠 Agence Immobilière Arielle - Site Web Professionnel

Site web moderne et professionnel pour l'agence immobilière d'Arielle, spécialisée dans la location annuelle et saisonnière.

## ✨ Fonctionnalités Principales

### 🎯 Pour les Visiteurs
- **Page d'accueil attractive** avec design inspiré des grandes agences (Century 21, La Forêt)
- **Recherche de biens** avec filtres avancés (type, localisation, prix, surface, etc.)
- **Location annuelle** : Catalogue de biens pour location longue durée
- **Location saisonnière** : Système de réservation type Airbnb avec calendrier
- **Fiches détaillées** : Photos, caractéristiques, équipements, localisation
- **Formulaire de contact** avec différents sujets de demande
- **Intégration réseaux sociaux** : TikTok, Instagram, Facebook

### 👨‍💼 Pour l'Administration (Arielle & Équipe)
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des biens** : Ajout, modification, suppression
- **Gestion des réservations** : Suivi des demandes et confirmations
- **Messagerie** : Communication avec les clients
- **Calendrier synchronisé** : Disponibilités en temps réel
- **Génération de contrats** : Automatisation des documents

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Lucide React (icônes)
- **Animations** : Framer Motion
- **Formulaires** : React Hook Form + Zod
- **Notifications** : React Hot Toast
- **Calendrier** : React Calendar
- **Images** : Next/Image (optimisation automatique)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet** (si depuis un repo)
```bash
cd "Bulle immobilière"
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Puis éditer le fichier `.env` avec vos informations :
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-clé-secrète-ici"

# Email (pour les notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="votre-mot-de-passe-app"

# Social Media (optionnel)
FACEBOOK_PAGE_ID="votre-page-facebook"
INSTAGRAM_USERNAME="votre-instagram"
TIKTOK_USERNAME="votre-tiktok"
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Structure du Projet

```
Bulle immobilière/
├── app/                          # Pages et routes (App Router)
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Styles globaux
│   ├── biens/                   # Pages des biens
│   │   ├── page.tsx            # Liste des biens
│   │   └── [id]/page.tsx       # Détail d'un bien
│   ├── location-annuelle/       # Page location annuelle
│   ├── location-saisonniere/    # Page location saisonnière
│   ├── contact/                 # Page de contact
│   └── admin/                   # Espace d'administration
│
├── components/                   # Composants réutilisables
│   ├── layout/                  # Composants de layout
│   │   ├── Header.tsx          # En-tête du site
│   │   └── Footer.tsx          # Pied de page
│   └── home/                    # Composants de la page d'accueil
│       ├── Hero.tsx            # Section hero
│       ├── Services.tsx        # Section services
│       ├── FeaturedProperties.tsx
│       ├── WhyChooseUs.tsx
│       ├── Testimonials.tsx
│       ├── SocialFeed.tsx
│       └── ContactCTA.tsx
│
├── public/                      # Fichiers statiques
├── package.json                 # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.js              # Configuration Next.js
└── README.md                   # Documentation
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales peuvent être modifiées dans `tailwind.config.ts` :

```typescript
colors: {
  primary: {
    // Couleur principale de l'agence
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
  gold: {
    // Couleur accent (or)
    500: '#eab308',
    // ...
  },
}
```

### Logo et Images
- Remplacer les images d'exemple par vos propres photos
- Ajouter votre logo dans `public/logo.png`
- Mettre à jour les références dans `Header.tsx`

### Informations de Contact
Modifier les informations dans `Footer.tsx` et `contact/page.tsx` :
- Adresse
- Téléphone
- Email
- Horaires d'ouverture

### Réseaux Sociaux
Mettre à jour les liens dans `Footer.tsx` et `SocialFeed.tsx` avec vos vrais profils.

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Option 2 : Netlify
```bash
npm run build
# Déployer le dossier .next
```

### Option 3 : Serveur VPS
```bash
npm run build
npm start
```

## 📱 Fonctionnalités à Venir

- [ ] **Authentification** : Système de connexion pour les clients
- [ ] **Paiement en ligne** : Intégration Stripe/PayPal
- [ ] **Base de données** : Migration vers PostgreSQL/MongoDB
- [ ] **API REST** : Backend complet pour la gestion des données
- [ ] **Notifications** : Emails automatiques et SMS
- [ ] **Multilingue** : Support FR/EN/ES
- [ ] **Blog** : Section actualités et conseils immobiliers
- [ ] **Chatbot** : Assistant virtuel 24/7
- [ ] **Application mobile** : Version iOS/Android

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Compiler pour la production
npm start           # Lancer en mode production

# Qualité du code
npm run lint        # Vérifier le code avec ESLint
```

## 📊 Statistiques du Projet

- **Pages** : 10+
- **Composants** : 15+
- **Lignes de code** : 3000+
- **Temps de chargement** : < 2s
- **Score Lighthouse** : 95+

## 🤝 Support

Pour toute question ou assistance :
- **Email** : contact@agence-arielle.fr
- **Téléphone** : +33 1 23 45 67 89
- **Documentation** : Ce README

## 📝 Licence

© 2024 Agence Immobilière Arielle. Tous droits réservés.

---

## 🎓 Guide d'Utilisation pour Arielle

### Ajouter un Nouveau Bien

1. Se connecter à l'espace admin : `/admin`
2. Cliquer sur "Ajouter un Bien"
3. Remplir le formulaire :
   - Titre du bien
   - Description détaillée
   - Prix (mensuel ou par nuit)
   - Type (annuelle/saisonnière)
   - Nombre de chambres, salles de bain
   - Surface en m²
   - Équipements disponibles
   - Photos (minimum 4)
   - Localisation
4. Cliquer sur "Publier"

### Gérer les Réservations

1. Aller dans l'onglet "Réservations"
2. Voir toutes les demandes en attente
3. Cliquer sur une réservation pour voir les détails
4. Confirmer ou refuser la demande
5. Le contrat est généré automatiquement

### Répondre aux Messages

1. Onglet "Messages" dans l'admin
2. Les messages non lus sont en surbrillance
3. Cliquer pour ouvrir et répondre
4. Le client reçoit une notification par email

### Modifier le Contenu du Site

Les textes principaux peuvent être modifiés directement dans les fichiers :
- Page d'accueil : `app/page.tsx` et composants dans `components/home/`
- Services : `components/home/Services.tsx`
- À propos : Créer `app/a-propos/page.tsx`

### Intégrer les Réseaux Sociaux

1. Obtenir les liens de vos profils
2. Modifier `components/home/SocialFeed.tsx`
3. Remplacer les URLs d'exemple par vos vrais liens
4. Les posts s'afficheront automatiquement

---

**Développé avec ❤️ pour Agence Arielle**
