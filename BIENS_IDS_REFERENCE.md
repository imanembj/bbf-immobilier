# 📋 Référence Complète des IDs de Biens

## 🎯 Règle d'Attribution des IDs

**IMPORTANT** : Chaque bien doit avoir un ID **UNIQUE** dans tout le système.

---

## 🏖️ LOCATION SAISONNIÈRE (`/location-saisonniere`)

### Bien Principal (Fiche Détaillée)
- **ID: 1** - Villa Luxe Vue Mer
  - Location: Nice, Côte d'Azur
  - Prix: 350€/nuit
  - Chambres: 5 | Bains: 3 | Surface: 220m²
  - Image: photo-1613490493576-7fde63acd811
  - Badge: 🏖️ BLEU (Location Saisonnière)

### Autres Biens (Listing uniquement)
- **ID: 4** - Chalet Montagne Premium
- **ID: 5** - Appartement Bord de Plage
- **ID: 6** - Maison Provençale Charme
- **ID: 7** - Studio Cosy Centre Paris
- **ID: 8** - Loft Design Lyon

---

## 🏠 LOCATION ANNUELLE (`/location-annuelle`)

### Bien Principal (Fiche Détaillée)
- **ID: 2** - Appartement F3 Centre-Ville
  - Location: Fort-de-France, Martinique
  - Prix: 1200€/mois
  - Chambres: 2 | Bains: 1 | Surface: 65m²
  - Image: photo-1522708323590-d24dbb6b0267
  - Badge: 🏠 VERT (Location Annuelle)

### Autres Biens (Listing uniquement)
- **ID: 9** - Studio Vue Mer
- **ID: 10** - Maison F4 avec Jardin (différente de l'achat)
- **ID: 11** - Villa Moderne avec Piscine
- **ID: 12** - Appartement T2 Rénové
- **ID: 13** - Duplex Vue Panoramique

---

## 💰 ACHAT (`/acheter`)

### Bien Principal (Fiche Détaillée)
- **ID: 3** - Maison F4 avec Jardin
  - Location: Rivière-Pilote, Martinique
  - Prix: 285 000€
  - Chambres: 4 | Bains: 2 | Surface: 150m²
  - Image: photo-1600585154340-be6161a56a0c
  - Badge: 💰 VIOLET (Achat)

### Autres Biens (Listing uniquement)
- **ID: 14** - Villa Moderne Vue Mer (485 000€)
- **ID: 15** - Appartement T3 Centre-Ville (195 000€)
- **ID: 16** - Villa de Luxe Piscine (650 000€)
- **ID: 17** - Maison Créole Rénovée (320 000€)
- **ID: 18** - Terrain Constructible Vue Mer (125 000€)

---

## 📄 NOS BIENS (`/biens`) - Page Globale

Cette page affiche **TOUS les biens** avec filtres :

### Biens Principaux (avec fiches détaillées)
- **ID: 1** - Villa Luxe Vue Mer (🏖️ Saisonnière)
- **ID: 2** - Appartement F3 Centre-Ville (🏠 Annuelle)
- **ID: 3** - Maison F4 avec Jardin (💰 Achat)

### Autres Biens (listings)
- ID: 4 à 18 (voir détails ci-dessus)

---

## 🔗 Navigation et Retours

### Depuis `/biens/1` (Villa Luxe Vue Mer)
- Type: `saisonniere`
- Bouton retour: `← Retour aux locations saisonnières`
- URL retour: `/location-saisonniere`

### Depuis `/biens/2` (Appartement F3)
- Type: `annuelle`
- Bouton retour: `← Retour aux locations annuelles`
- URL retour: `/location-annuelle`

### Depuis `/biens/3` (Maison F4)
- Type: `vente`
- Bouton retour: `← Retour aux biens à vendre`
- URL retour: `/acheter`

---

## ✅ Checklist de Cohérence

### Pages à Vérifier
- [ ] `/location-saisonniere/page.tsx` - ID 1 pour Villa Luxe Vue Mer
- [ ] `/location-annuelle/page.tsx` - ID 2 pour Appartement F3
- [ ] `/acheter/page.tsx` - ID 3 pour Maison F4
- [ ] `/biens/page.tsx` - IDs 1, 2, 3 + autres
- [ ] `/biens/[id]/page.tsx` - Données pour IDs 1, 2, 3

### Badges à Vérifier (Mêmes couleurs partout)
- [ ] 🏖️ Saisonnière: `bg-blue-100 text-blue-800 border-blue-300`
- [ ] 🏠 Annuelle: `bg-green-100 text-green-800 border-green-300`
- [ ] 💰 Achat: `bg-purple-100 text-purple-800 border-purple-300`

---

## 🚨 Règles Importantes

1. **Pas de duplication d'IDs** : Chaque ID doit être unique
2. **IDs 1, 2, 3 réservés** : Pour les 3 biens principaux avec fiches détaillées
3. **IDs 4+** : Pour les autres biens (listings uniquement)
4. **Cohérence des données** : Même titre, prix, image pour un même ID partout
5. **Badges identiques** : Mêmes couleurs sur toutes les pages

---

## 📊 Résumé

| ID | Type | Titre | Pages | Fiche Détaillée |
|----|------|-------|-------|-----------------|
| 1 | Saisonnière | Villa Luxe Vue Mer | saisonniere, biens | ✅ Oui |
| 2 | Annuelle | Appartement F3 | annuelle, biens | ✅ Oui |
| 3 | Achat | Maison F4 | acheter, biens | ✅ Oui |
| 4-18 | Variés | Autres biens | Leurs pages respectives | ❌ Non |

---

**Dernière mise à jour** : 2026-03-20
