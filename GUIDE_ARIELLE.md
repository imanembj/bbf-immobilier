# 🏠 Guide d'Utilisation - Bulle Immobilière

## 🌴 Bienvenue Arielle !

Ce guide vous aidera à utiliser et personnaliser votre nouveau site web professionnel pour **Bulle Immobilière**, votre agence basée à Quartier Beaudelle, Rivière-Pilote 97211, Martinique.

---

## ✨ Vos Services Mis en Avant

Le site présente vos 6 services principaux :

1. **🏡 Vente de Biens** - Achat/vente de propriétés en Martinique
2. **🏖️ Location Saisonnière** - Locations courte durée avec système de réservation
3. **🔑 Gestion Immobilière** - Gestion complète de biens
4. **💼 Business & Foncier** - Investissements et terrains
5. **🛡️ Prestations de Services** - Services complémentaires
6. **📞 Accompagnement Local** - Expertise martiniquaise

---

## 🚀 Démarrage Rapide

### Lancer le Site Localement

```bash
# 1. Ouvrir le terminal dans le dossier du projet
cd "/Users/mandioukouate/Desktop/Dossier Imane Code/Bulle immobilière"

# 2. Lancer le serveur (si pas déjà fait)
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

### Arrêter le Serveur

Dans le terminal, appuyez sur `Ctrl + C`

---

## 📝 Personnalisation du Site

### 1. Modifier Vos Coordonnées

**Fichiers à modifier :**

#### Footer (Pied de page)
📁 `components/layout/Footer.tsx`

Cherchez et modifiez :
```typescript
// Adresse
<span>Quartier Beaudelle, Rivière-Pilote 97211, Martinique</span>

// Téléphone
<a href="tel:+596696000000">+596 696 XX XX XX</a>

// Email
<a href="mailto:contact@bulle-immobiliere.mq">contact@bulle-immobiliere.mq</a>
```

#### Page Contact
📁 `app/contact/page.tsx`

Mêmes modifications que ci-dessus.

### 2. Ajouter Vos Vrais Numéros de Téléphone

Remplacez `+596 696 XX XX XX` par votre vrai numéro partout dans le site.

### 3. Connecter Vos Réseaux Sociaux

📁 `components/layout/Footer.tsx` et `components/home/SocialFeed.tsx`

```typescript
// Remplacez les URLs d'exemple par vos vrais liens
{ name: 'Facebook', href: 'https://facebook.com/votre-page' }
{ name: 'Instagram', href: 'https://instagram.com/votre-compte' }
{ name: 'TikTok', href: 'https://tiktok.com/@votre-compte' }
```

### 4. Ajouter Votre Logo

1. Préparez votre logo (format PNG recommandé, fond transparent)
2. Nommez-le `logo.png`
3. Placez-le dans le dossier `public/`
4. Modifiez `components/layout/Header.tsx` pour l'utiliser

---

## 🏘️ Ajouter Vos Biens Immobiliers

### Biens Actuels (Exemples)

Les biens affichés actuellement sont des exemples. Pour ajouter vos vrais biens :

📁 `components/home/FeaturedProperties.tsx`
📁 `app/biens/page.tsx`

```typescript
const properties = [
  {
    id: 1,
    type: 'vente', // ou 'location' ou 'saisonniere'
    title: 'Villa F4 avec Vue Mer',
    location: 'Le François, Martinique',
    price: 350000, // Prix en euros
    period: '', // Vide pour vente, '/mois' ou '/nuit' pour location
    image: '/images/villa-francois.jpg', // Votre photo
    beds: 4,
    baths: 2,
    area: 150,
    featured: true, // Mettre en avant sur la page d'accueil
  },
  // Ajoutez vos autres biens ici...
]
```

### Ajouter des Photos

1. Créez un dossier `public/images/`
2. Ajoutez vos photos de biens
3. Référencez-les dans le code : `/images/nom-photo.jpg`

---

## 🎨 Personnaliser les Couleurs

📁 `tailwind.config.ts`

```typescript
colors: {
  primary: {
    // Couleur principale (bleu par défaut)
    500: '#0ea5e9', // Changez cette valeur
    600: '#0284c7',
  },
  gold: {
    // Couleur accent (or par défaut)
    500: '#eab308', // Changez cette valeur
  },
}
```

**Codes couleur suggérés pour la Martinique :**
- Bleu turquoise : `#00CED1`
- Vert tropical : `#00A86B`
- Jaune soleil : `#FFD700`
- Corail : `#FF7F50`

---

## 📧 Configuration des Emails

Pour recevoir les messages du formulaire de contact :

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez vos informations SMTP :

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="votre-mot-de-passe-application"
```

**Note :** Pour Gmail, vous devez créer un "mot de passe d'application" dans les paramètres de sécurité.

---

## 🌐 Mettre en Ligne le Site

### Option 1 : Vercel (Gratuit et Recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI :
   ```bash
   npm install -g vercel
   ```
3. Déployez :
   ```bash
   vercel
   ```
4. Suivez les instructions à l'écran

### Option 2 : Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet
3. Netlify s'occupe du reste !

### Nom de Domaine Personnalisé

Une fois déployé, vous pouvez :
- Acheter un nom de domaine (ex: `bulle-immobiliere.mq`)
- Le connecter à votre site via les paramètres de Vercel/Netlify

---

## 📱 Fonctionnalités Principales

### Page d'Accueil
- ✅ Recherche de biens
- ✅ Services mis en avant
- ✅ Biens en vedette
- ✅ Témoignages clients
- ✅ Flux réseaux sociaux

### Pages Biens
- ✅ Liste complète avec filtres
- ✅ Détails de chaque bien
- ✅ Galerie photos
- ✅ Système de réservation (location saisonnière)

### Espace Admin
- ✅ Tableau de bord
- ✅ Gestion des biens
- ✅ Suivi des réservations
- ✅ Messagerie

### Contact
- ✅ Formulaire de contact
- ✅ Carte interactive
- ✅ Informations de contact

---

## 🆘 Support et Aide

### Problèmes Courants

**Le site ne démarre pas :**
```bash
# Réinstallez les dépendances
rm -rf node_modules
npm install
npm run dev
```

**Erreurs TypeScript :**
- Les erreurs TypeScript sont normales pendant le développement
- Elles disparaissent au rechargement automatique du serveur

**Images ne s'affichent pas :**
- Vérifiez que les images sont dans `public/images/`
- Vérifiez les chemins : `/images/nom-fichier.jpg`

### Besoin d'Aide ?

- 📧 Email de support technique : [à définir]
- 📞 Téléphone : [à définir]
- 📚 Documentation complète : `README.md`

---

## 🎯 Prochaines Étapes Recommandées

### Immédiat (Cette Semaine)
- [ ] Remplacer les numéros de téléphone
- [ ] Ajouter vos vrais emails
- [ ] Connecter vos réseaux sociaux
- [ ] Ajouter votre logo

### Court Terme (Ce Mois)
- [ ] Ajouter vos biens immobiliers réels
- [ ] Prendre/ajouter de vraies photos
- [ ] Personnaliser les textes
- [ ] Tester le formulaire de contact

### Moyen Terme (3 Mois)
- [ ] Mettre le site en ligne
- [ ] Acheter un nom de domaine
- [ ] Configurer les emails professionnels
- [ ] Former votre équipe à l'utilisation

---

## 💡 Conseils pour Maximiser l'Impact

### Photos
- Utilisez des photos professionnelles de vos biens
- Photos lumineuses et de haute qualité
- Montrez les atouts (vue mer, piscine, jardin)

### Contenu
- Descriptions détaillées et honnêtes
- Mettez en avant les spécificités martiniquaises
- Actualisez régulièrement vos biens

### Réseaux Sociaux
- Postez régulièrement sur Instagram/TikTok/Facebook
- Partagez vos nouveaux biens
- Créez du contenu sur la vie en Martinique

### SEO (Référencement)
- Utilisez des mots-clés locaux (Martinique, communes)
- Descriptions complètes de chaque bien
- Mettez à jour régulièrement le contenu

---

## 📊 Statistiques et Suivi

Le site inclut un tableau de bord admin avec :
- Nombre de biens actifs
- Réservations en cours
- Messages reçus
- Statistiques de visite (à configurer avec Google Analytics)

---

## 🔐 Sécurité

### Bonnes Pratiques
- Ne partagez jamais vos mots de passe
- Utilisez des mots de passe forts
- Sauvegardez régulièrement vos données
- Gardez le fichier `.env` secret (ne le partagez pas)

---

## 📞 Vos Informations

**Agence :** Bulle Immobilière  
**Adresse :** Quartier Beaudelle, Rivière-Pilote 97211, Martinique  
**Services :** Vente, Location, Gestion Immobilière, Business & Foncier, Prestations de Services

**Slogan :** ✨✨𝐁𝐮𝐥𝐥𝐞 𝐢𝐦𝐦𝐨𝐛𝐢𝐥𝐢𝐞𝐫𝐞, 𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬 & 𝐟𝐨𝐧𝐜𝐢𝐞𝐫✨✨

---

**Félicitations ! Votre site est prêt à conquérir le marché immobilier martiniquais ! 🌴🏠**

Pour toute question, n'hésitez pas à consulter le `README.md` ou à demander de l'aide.

**Bon succès avec Bulle Immobilière ! 🚀**
