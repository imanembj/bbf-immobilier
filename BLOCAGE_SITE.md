# 🔒 Guide de Blocage Temporaire du Site

## Comment bloquer le site (Mode Maintenance)

### Étape 1 : Activer le mode maintenance

Ouvrez votre fichier `.env.local` (ou `.env.production` pour la production) et ajoutez ou modifiez cette ligne :

```env
NEXT_PUBLIC_MAINTENANCE_MODE="true"
```

### Étape 2 : Redémarrer l'application

**En développement :**
```bash
npm run dev
```

**En production :**
```bash
npm run build
npm start
```

### Étape 3 : Vérifier

Le site affichera maintenant une page de maintenance à tous les visiteurs.

---

## Comment débloquer le site

### Étape 1 : Désactiver le mode maintenance

Dans votre fichier `.env.local` (ou `.env.production`), changez la valeur à :

```env
NEXT_PUBLIC_MAINTENANCE_MODE="false"
```

Ou supprimez complètement cette ligne.

### Étape 2 : Redémarrer l'application

Redémarrez l'application comme indiqué ci-dessus.

---

## Fichiers créés

1. **`middleware.ts`** - Intercepte toutes les requêtes et redirige vers la page de maintenance si activé
2. **`app/maintenance/page.tsx`** - Page de maintenance affichée aux visiteurs
3. **`BLOCAGE_SITE.md`** - Ce guide

---

## Notes importantes

- ✅ **Aucune modification du code principal** - Le site reste intact
- ✅ **Activation/désactivation instantanée** - Juste une variable d'environnement
- ✅ **Réversible à 100%** - Pas de risque de casser le site
- ✅ **Page professionnelle** - Les visiteurs voient une belle page de maintenance

---

## Pour la production (Vercel/Netlify/Hostinger)

1. Allez dans les paramètres de votre hébergeur
2. Ajoutez la variable d'environnement : `NEXT_PUBLIC_MAINTENANCE_MODE=true`
3. Redéployez ou redémarrez l'application

Pour débloquer, changez la valeur à `false` ou supprimez la variable.
