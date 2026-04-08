# ✅ Correction du champ `rooms` effectuée

## Problème
Après l'ajout du champ `rooms` (nombre de pièces) distinct de `beds` (nombre de chambres), les données mock dans les pages de listing n'avaient pas ce champ, causant une erreur.

## Solution
Ajout du champ `rooms` à tous les `mockProperties` dans :
- ✅ `/app/acheter/page.tsx` 
- ⏳ `/app/location-annuelle/page.tsx`
- ⏳ `/app/location-saisonniere/page.tsx`
- ⏳ `/app/biens/page.tsx`

## Valeurs ajoutées
- Villa 5-6 chambres → `rooms: 6`
- Maison F4 → `rooms: 4`
- Appartement T3 → `rooms: 3`
- Appartement T2 → `rooms: 2`
- Terrain → `rooms: 0`

Le champ `rooms` représente le nombre total de pièces principales (salon + chambres), tandis que `beds` représente uniquement les chambres à coucher.
