# 📸 Guide de la Galerie Photos - Version Ordinateur

## ✨ Fonctionnalités de la Galerie

### 🖼️ Affichage Principal

La galerie photos a été optimisée pour offrir une expérience professionnelle similaire à Airbnb et aux grands sites immobiliers.

---

## 📊 Exemple : Villa Luxe Vue Mer (10 images)

### 1️⃣ **Image Principale** (Grande)
- **Hauteur** : 600px sur ordinateur
- **Compteur** : Badge en haut à droite affichant "1 / 10"
- **Effet hover** : Zoom léger + texte "Cliquez pour agrandir"
- **Action** : Clic ouvre le lightbox en plein écran

### 2️⃣ **Grille de Miniatures** (5 maximum)
```
┌─────┬─────┬─────┬─────┬─────────┐
│  1  │  2  │  3  │  4  │  5 +5   │
└─────┴─────┴─────┴─────┴─────────┘
```

**Affichage :**
- ✅ **5 miniatures** visibles (images 1 à 5)
- ✅ La **5ème miniature** affiche un badge **"+5"** (car 10 - 5 = 5 images restantes)
- ✅ Badge avec fond noir semi-transparent et texte blanc en gras
- ✅ Hauteur : 112px (28 sur ordinateur)
- ✅ Bordure cyan sur l'image sélectionnée

**Interactions :**
- Clic sur miniatures 1-4 : Change l'image principale
- Clic sur miniature 5 (avec +5) : Ouvre le lightbox pour voir toutes les 10 photos

---

## 🎯 Comportement selon le Nombre d'Images

| Nombre d'images | Affichage miniatures | Badge |
|----------------|---------------------|-------|
| 1-5 images | Toutes affichées | ❌ Pas de badge |
| 6 images | 5 miniatures | ✅ "+1" sur la 5ème |
| 10 images | 5 miniatures | ✅ "+5" sur la 5ème |
| 15 images | 5 miniatures | ✅ "+10" sur la 5ème |
| 20 images | 5 miniatures | ✅ "+15" sur la 5ème |

---

## 🔍 Lightbox (Modal Plein Écran)

Lorsque l'utilisateur clique sur l'image principale ou sur le badge "+X" :

### Fonctionnalités :
- ✅ **Fond noir** à 95% d'opacité
- ✅ **Compteur central** en haut : "3 / 10"
- ✅ **Bouton fermer** (X) en haut à droite
- ✅ **Navigation** : Flèches gauche/droite
- ✅ **Bande de miniatures** en bas (toutes les 10 images)
- ✅ **Scroll horizontal** pour voir toutes les miniatures
- ✅ **Image en haute qualité** centrée

### Navigation :
- **Flèche gauche** : Image précédente (boucle à la fin)
- **Flèche droite** : Image suivante (boucle au début)
- **Clic sur miniature** : Va directement à cette image
- **Touche Échap** : Ferme le lightbox (à implémenter)

---

## 📱 Version Mobile

### Différences :
- **Grille** : 5 miniatures en une ligne
- **Hauteur miniatures** : 80px (plus petites)
- **Bouton supplémentaire** : "Voir toutes les 10 photos" en dessous
- **Badge** : Texte plus petit (text-2xl au lieu de 3xl)

---

## 🎨 Effets Visuels

### Image Principale :
```css
- Hover : Scale 1.05 (zoom léger)
- Transition : 300ms
- Overlay : Noir 10% au hover
- Badge compteur : Fond noir 70% + backdrop-blur
```

### Miniatures :
```css
- Sélectionnée : Ring cyan 4px + scale 0.95
- Hover : Ring cyan 2px + scale 1.05
- Transition : 300ms
- Badge +X : Fond noir 60% + backdrop-blur
```

### Lightbox :
```css
- Fond : Noir 95%
- Boutons : Blanc 10% → 20% au hover
- Miniatures actives : Ring cyan 4px + scale 1.1
- Miniatures inactives : Opacité 60%
```

---

## 💡 Avantages de cette Approche

1. ✅ **Performance** : Charge seulement 5 miniatures au lieu de 10
2. ✅ **UX Propre** : Interface non surchargée
3. ✅ **Curiosité** : Le badge "+5" incite à cliquer
4. ✅ **Standard** : Même UX qu'Airbnb, Booking.com
5. ✅ **Responsive** : S'adapte parfaitement mobile/desktop
6. ✅ **Accessible** : Navigation claire et intuitive

---

## 🚀 Pour Tester

1. Lancez le serveur : `npm run dev`
2. Allez sur : `http://localhost:3000/biens/1`
3. Vous verrez la "Villa Luxe Vue Mer" avec 10 images
4. Testez :
   - ✅ Clic sur les miniatures 1-4
   - ✅ Clic sur la miniature 5 avec "+5"
   - ✅ Navigation dans le lightbox
   - ✅ Clic sur l'image principale

---

## 📝 Code Important

### Calcul du badge :
```typescript
{property.images.length - 5}  // Si 10 images → affiche "+5"
```

### Condition d'affichage :
```typescript
{index === 4 && property.images.length > 5 && (
  // Affiche le badge "+X"
)}
```

### Limite de miniatures :
```typescript
property.images.slice(0, 5)  // Prend seulement les 5 premières
```

---

## 🎯 Résultat Final

Pour la **Villa Luxe Vue Mer** avec **10 images** :

```
┌──────────────────────────────────────────┐
│                                          │
│         IMAGE PRINCIPALE                 │
│         (600px de haut)                  │
│                              [1 / 10]    │
│                                          │
└──────────────────────────────────────────┘

┌─────┬─────┬─────┬─────┬─────────┐
│ 🖼️  │ 🖼️  │ 🖼️  │ 🖼️  │ 🖼️ +5   │
│  1  │  2  │  3  │  4  │    5    │
└─────┴─────┴─────┴─────┴─────────┘
```

**Clic sur "+5"** → Ouvre le lightbox avec les 10 photos ! 🎉
