# 🔒 Guide SEO & Sécurité - Bulle Immobilière

## 📊 SEO (Référencement)

### 1. Métadonnées SEO

Toutes les pages ont maintenant des métadonnées optimisées :
- **Title tags** : Uniques pour chaque page
- **Meta descriptions** : Descriptions attrayantes
- **Open Graph** : Pour Facebook, LinkedIn
- **Twitter Cards** : Pour Twitter
- **Canonical URLs** : Éviter le contenu dupliqué

#### Utilisation dans une page :

```typescript
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Acheter en Martinique',
  description: 'Découvrez nos biens à vendre en Martinique',
  keywords: ['achat', 'vente', 'Martinique'],
  canonical: 'https://bulle-immobiliere.mq/acheter',
})
```

### 2. Sitemap.xml

✅ **Généré automatiquement** : `/sitemap.xml`
- Toutes les pages principales
- Fréquence de mise à jour
- Priorités définies

**Accès** : https://bulle-immobiliere.mq/sitemap.xml

### 3. Robots.txt

✅ **Généré automatiquement** : `/robots.txt`
- Autorise tous les bots
- Bloque `/admin` et `/api`
- Référence le sitemap

**Accès** : https://bulle-immobiliere.mq/robots.txt

### 4. Schema.org (Données Structurées)

Trois types de données structurées :

#### a) Organisation
```tsx
import { OrganizationStructuredData } from '@/components/StructuredData'

// Dans votre page
<OrganizationStructuredData />
```

#### b) Bien Immobilier
```tsx
import { PropertyStructuredData } from '@/components/StructuredData'

<PropertyStructuredData 
  property={{
    id: '1',
    title: 'Villa Vue Mer',
    description: '...',
    price: 450000,
    image: ['...'],
    address: {
      city: 'Rivière-Pilote',
      region: 'Martinique',
      country: 'MQ'
    },
    propertyType: 'Villa',
    numberOfRooms: 4,
    floorSize: 180,
    url: 'https://bulle-immobiliere.mq/biens/1'
  }}
/>
```

#### c) Fil d'Ariane
```tsx
import { BreadcrumbStructuredData } from '@/components/StructuredData'

<BreadcrumbStructuredData 
  items={[
    { name: 'Accueil', url: 'https://bulle-immobiliere.mq' },
    { name: 'Acheter', url: 'https://bulle-immobiliere.mq/acheter' },
  ]}
/>
```

### 5. Configuration SEO

Dans `.env` :
```env
NEXT_PUBLIC_SITE_URL="https://bulle-immobiliere.mq"
NEXT_PUBLIC_GOOGLE_VERIFICATION="votre-code-verification"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🎯 Fonctionnalités Utilisateur

### 1. Système de Favoris

**Fonctionnement** :
- Stockage en mémoire (session uniquement)
- Panneau latéral accessible via bouton flottant
- Badge avec nombre de favoris

**Utilisation** :
```tsx
import { useFavorites } from '@/lib/favorites'

const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

// Ajouter aux favoris
addFavorite({
  id: 1,
  title: 'Villa Vue Mer',
  price: 450000,
  image: '/villa.jpg',
  location: 'Rivière-Pilote',
  type: 'Villa'
})

// Vérifier si favori
if (isFavorite(1)) {
  // ...
}
```

**Composant** : `<FavoritesPanel />` (déjà ajouté au layout)

### 2. Boutons de Partage Social

**Réseaux supportés** :
- WhatsApp
- Facebook
- Twitter
- LinkedIn
- Copier le lien

**Utilisation** :
```tsx
import ShareButtons from '@/components/ShareButtons'

<ShareButtons 
  url="https://bulle-immobiliere.mq/biens/1"
  title="Villa Vue Mer - Rivière-Pilote"
  description="Magnifique villa avec vue sur la mer"
/>
```

---

## 🔒 Sécurité

### 1. Rate Limiting

Protection contre le spam sur les formulaires.

**Utilisation** :
```typescript
import { rateLimit } from '@/lib/rate-limit'

// Dans votre API route ou action
const identifier = req.headers.get('x-forwarded-for') || 'anonymous'

if (!rateLimit(identifier, 5, 60000)) {
  return { error: 'Trop de requêtes. Réessayez dans 1 minute.' }
}
```

**Paramètres** :
- `identifier` : IP ou identifiant unique
- `limit` : Nombre max de requêtes (défaut: 5)
- `windowMs` : Fenêtre de temps en ms (défaut: 60000 = 1 min)

### 2. CAPTCHA Simple

Protection anti-bot avec :
- Addition mathématique simple
- Vérification du temps de remplissage (min 3s)
- Champ honeypot caché

**Utilisation** :
```tsx
import SimpleCaptcha from '@/components/SimpleCaptcha'
import { useState } from 'react'

const [isCaptchaValid, setIsCaptchaValid] = useState(false)

<SimpleCaptcha onVerify={setIsCaptchaValid} />

// Dans le submit
if (!isCaptchaValid) {
  toast.error('Veuillez compléter la vérification anti-spam')
  return
}
```

### 3. Headers de Sécurité

Configurés dans `next.config.js` :

✅ **HSTS** : Force HTTPS
✅ **X-Frame-Options** : Protection contre clickjacking
✅ **X-Content-Type-Options** : Prévient le MIME sniffing
✅ **X-XSS-Protection** : Protection XSS
✅ **CSP** : Content Security Policy
✅ **Referrer-Policy** : Contrôle des referrers
✅ **Permissions-Policy** : Limite les permissions

### 4. HTTPS en Production

**Déploiement Vercel/Netlify** :
- HTTPS automatique avec certificat SSL
- Redirection HTTP → HTTPS

**Serveur VPS** :
1. Obtenir un certificat SSL (Let's Encrypt)
2. Configurer Nginx/Apache
3. Activer le renouvellement automatique

```bash
# Exemple avec Certbot
sudo certbot --nginx -d bulle-immobiliere.mq
```

---

## 📋 Checklist de Déploiement

### Avant de mettre en production :

- [ ] Configurer `.env` avec les vraies valeurs
- [ ] Remplacer `NEXT_PUBLIC_SITE_URL`
- [ ] Ajouter le code Google Search Console
- [ ] Configurer Google Analytics (optionnel)
- [ ] Créer une image OG (`/public/og-image.jpg` - 1200x630px)
- [ ] Vérifier que HTTPS fonctionne
- [ ] Tester le sitemap : `/sitemap.xml`
- [ ] Tester robots.txt : `/robots.txt`
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Tester les partages sociaux
- [ ] Vérifier les données structurées avec [Google Rich Results Test](https://search.google.com/test/rich-results)

### Après le déploiement :

- [ ] Vérifier les headers de sécurité avec [SecurityHeaders.com](https://securityheaders.com)
- [ ] Tester la vitesse avec [PageSpeed Insights](https://pagespeed.web.dev)
- [ ] Vérifier l'accessibilité avec [WAVE](https://wave.webaim.org)
- [ ] Monitorer les erreurs 404
- [ ] Configurer les alertes Google Search Console

---

## 🛠️ Maintenance

### Mise à jour du Sitemap

Le sitemap est généré automatiquement. Pour ajouter une nouvelle page :

1. Ouvrir `/app/sitemap.ts`
2. Ajouter l'URL dans le tableau
3. Définir la priorité et la fréquence

### Surveillance de la Sécurité

- Vérifier régulièrement les logs
- Monitorer les tentatives de spam
- Mettre à jour Next.js et les dépendances
- Renouveler le certificat SSL (automatique avec Let's Encrypt)

---

## 📞 Support

Pour toute question :
- Documentation Next.js : https://nextjs.org/docs
- SEO : https://developers.google.com/search
- Sécurité : https://owasp.org

---

**Développé avec ❤️ pour Bulle Immobilière - Business & Foncier**
