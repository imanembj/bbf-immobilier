# 📋 Guide Complet des Sections par Type de Bien

## ✅ Sections Ajoutées

Toutes les sections importantes ont été ajoutées pour rendre les pages de biens **complètes et professionnelles** :

### 1️⃣ **Description du bien** (Détaillée)
- ✅ Présentation générale
- ✅ Description intérieur
- ✅ Description extérieur

### 2️⃣ **Environnement & Quartier**
- ✅ Description du quartier
- ✅ Points forts (commerces, transports, loisirs)
- ✅ Distances aux commodités

### 3️⃣ **Conditions Locatives / Achat**
- ✅ Dépôt de garantie
- ✅ Frais de ménage
- ✅ Séjour minimum
- ✅ Politique d'annulation
- ✅ Ce qui est inclus
- ✅ Ce qui n'est pas inclus

### 4️⃣ **Honoraires d'Agence**
- ✅ Frais d'agence
- ✅ Barème de l'agence
- ✅ Répartition des frais

### 5️⃣ **Mentions Légales**
- ✅ Référence du bien
- ✅ DPE (si applicable)
- ✅ Loi applicable
- ✅ Assurance requise
- ✅ Garanties

---

## 🏖️ LOCATION SAISONNIÈRE

### Exemple : Villa Luxe Vue Mer

```typescript
{
  type: 'saisonniere',
  
  // Description détaillée
  detailedDescription: {
    presentation: 'Villa d\'exception pour vacances...',
    interior: 'Intérieur rénové avec matériaux nobles...',
    exterior: 'Jardin paysager avec piscine chauffée...',
  },
  
  // Environnement
  environment: {
    title: 'Environnement & Quartier',
    description: 'Quartier calme et résidentiel...',
    highlights: [
      '🏖️ Plage privée à 200m',
      '🛒 Supermarché à 5 min',
      '✈️ Aéroport à 15 min',
    ],
  },
  
  // Conditions de location
  rentalConditions: {
    deposit: 2000,              // Caution
    cleaningFee: 150,           // Ménage
    minStay: 7,                 // Nuits minimum
    cancellationPolicy: 'Annulation gratuite jusqu\'à 30 jours...',
    included: ['Linge', 'Wifi', 'Électricité'],
    notIncluded: ['Ménage fin séjour', 'Taxe de séjour'],
  },
  
  // Honoraires
  fees: {
    agencyFees: 0,              // Gratuit pour le locataire
    ownerFees: 100,
    description: 'Aucun frais pour le locataire',
  },
  
  // Légal
  legalInfo: {
    reference: 'BIM-SAIS-001',
    dpe: null,                  // ❌ Pas de DPE pour saisonnière
    law: 'Conforme loi ALUR et ELAN',
    insurance: 'RC obligatoire',
    guarantees: 'Dépôt 2000€ encaissé 7j avant...',
  },
}
```

### Sections Spécifiques :
- ✅ **Séjour minimum** (ex: 7 nuits)
- ✅ **Politique d'annulation** détaillée
- ✅ **Taxe de séjour** mentionnée
- ✅ **Linge de maison** inclus/non inclus
- ❌ **Pas de DPE** (non obligatoire)

---

## 🏠 LOCATION ANNUELLE

### Exemple : Appartement F3 Centre-Ville

```typescript
{
  type: 'location',
  
  detailedDescription: {
    presentation: 'Appartement lumineux de 65m² en plein centre...',
    interior: 'Cuisine équipée, 2 chambres, salon spacieux...',
    exterior: 'Balcon 8m² avec vue dégagée...',
  },
  
  environment: {
    title: 'Environnement & Quartier',
    description: 'Hypercentre, toutes commodités à pied...',
    highlights: [
      '🚇 Métro à 2 min',
      '🏫 École primaire à 5 min',
      '🏥 Centre médical à 3 min',
      '🛒 Commerces en pied d\'immeuble',
    ],
  },
  
  // CONDITIONS LOCATION ANNUELLE
  rentalConditions: {
    deposit: 1300,              // 1 mois de loyer
    charges: 150,               // Charges mensuelles
    minLease: 12,               // Bail minimum 12 mois
    availableFrom: '01/04/2024',
    included: ['Eau froide', 'Chauffage collectif'],
    notIncluded: ['Électricité', 'Internet', 'Assurance habitation'],
    documents: [
      '3 derniers bulletins de salaire',
      'Avis d\'imposition',
      'Pièce d\'identité',
      'Justificatif de domicile',
    ],
  },
  
  fees: {
    agencyFees: 650,            // Frais d'agence locataire
    ownerFees: 650,             // Frais propriétaire
    description: 'Honoraires à la charge du locataire : 650€ (10€/m²)',
  },
  
  legalInfo: {
    reference: 'BIM-LOC-045',
    dpe: 'C (120 kWh/m²/an)',   // ✅ DPE OBLIGATOIRE
    ges: 'B (8 kg CO2/m²/an)',  // ✅ GES OBLIGATOIRE
    law: 'Bail soumis à la loi du 6 juillet 1989',
    insurance: 'Assurance habitation obligatoire',
    guarantees: 'Garant Visale accepté ou caution solidaire',
  },
}
```

### Sections Spécifiques :
- ✅ **Charges mensuelles** détaillées
- ✅ **DPE + GES** OBLIGATOIRES
- ✅ **Documents requis** pour dossier
- ✅ **Bail** (durée, type)
- ✅ **Garant** accepté ou non
- ✅ **Disponibilité** (date)

---

## 🏡 VENTE / ACHAT

### Exemple : Maison F4 avec Jardin

```typescript
{
  type: 'vente',
  
  detailedDescription: {
    presentation: 'Belle maison familiale de 150m² sur terrain de 500m²...',
    interior: '4 chambres, 2 SDB, cuisine ouverte, salon-séjour 40m²...',
    exterior: 'Jardin arboré, terrasse couverte, garage double...',
  },
  
  environment: {
    title: 'Environnement & Quartier',
    description: 'Quartier résidentiel calme, proche écoles...',
    highlights: [
      '🏫 Écoles à 5 min',
      '🚌 Arrêt bus à 2 min',
      '🛒 Centre commercial à 10 min',
      '⚽ Stade municipal à 8 min',
    ],
  },
  
  // CONDITIONS D'ACHAT
  purchaseConditions: {
    price: 285000,              // Prix de vente
    notaryFees: 22800,          // Frais de notaire (8%)
    propertyTax: 1200,          // Taxe foncière annuelle
    housingTax: 0,              // Taxe d'habitation (supprimée)
    coOwnershipFees: 0,         // Charges copro (si applicable)
    condition: 'Bon état général',
    occupancy: 'Libre à la vente',
    orientation: 'Sud-Ouest',
    constructionYear: 1995,
    lastRenovation: 2020,
  },
  
  fees: {
    agencyFees: 15000,          // Honoraires agence (inclus dans prix)
    percentage: 5.3,            // % du prix
    description: 'Honoraires inclus dans le prix, à la charge du vendeur : 15 000€ (5,3%)',
    netSellerPrice: 270000,     // Prix net vendeur
  },
  
  legalInfo: {
    reference: 'BIM-VTE-128',
    dpe: 'D (180 kWh/m²/an)',   // ✅ DPE OBLIGATOIRE
    ges: 'D (35 kg CO2/m²/an)', // ✅ GES OBLIGATOIRE
    law: 'Bien soumis au statut de la copropriété',
    coOwnership: {
      lots: 12,                 // Nombre de lots
      procedure: 'Aucune',      // Procédure en cours
      charges: 0,               // Charges annuelles
    },
    diagnostics: [
      'DPE : D',
      'Amiante : Négatif',
      'Plomb : Négatif',
      'Termites : Négatif',
      'Électricité : Conforme',
      'Gaz : Conforme',
      'Assainissement : Conforme',
    ],
    risks: 'Zone de sismicité faible (niveau 2)',
  },
}
```

### Sections Spécifiques :
- ✅ **Prix net vendeur** + Prix FAI
- ✅ **Frais de notaire** estimés
- ✅ **Taxes** (foncière, habitation)
- ✅ **DPE + GES** OBLIGATOIRES
- ✅ **Diagnostics** complets
- ✅ **Copropriété** (si applicable)
- ✅ **Risques naturels**
- ✅ **Année construction**
- ✅ **État général**

---

## 🎯 Récapitulatif par Type

| Section | Saisonnière | Annuelle | Vente |
|---------|-------------|----------|-------|
| Description détaillée | ✅ | ✅ | ✅ |
| Environnement | ✅ | ✅ | ✅ |
| DPE | ❌ | ✅ | ✅ |
| GES | ❌ | ✅ | ✅ |
| Caution/Garantie | ✅ | ✅ | ❌ |
| Charges | ❌ | ✅ | ✅ |
| Taxe foncière | ❌ | ❌ | ✅ |
| Frais notaire | ❌ | ❌ | ✅ |
| Diagnostics | ❌ | Partiel | Complet |
| Politique annulation | ✅ | ❌ | ❌ |
| Séjour minimum | ✅ | ❌ | ❌ |
| Documents requis | ❌ | ✅ | ❌ |

---

## 📊 DPE (Diagnostic Performance Énergétique)

### Quand est-il obligatoire ?
- ❌ **Location saisonnière** : NON obligatoire
- ✅ **Location annuelle** : OBLIGATOIRE
- ✅ **Vente** : OBLIGATOIRE

### Format d'affichage :

```typescript
// Pour location annuelle et vente
legalInfo: {
  dpe: 'C (120 kWh/m²/an)',
  ges: 'B (8 kg CO2/m²/an)',
}

// Pour location saisonnière
legalInfo: {
  dpe: null,  // Pas de DPE
  ges: null,
}
```

### Échelle DPE :
- **A** : ≤ 50 kWh/m²/an (Excellent)
- **B** : 51-90 kWh/m²/an (Bon)
- **C** : 91-150 kWh/m²/an (Assez bon)
- **D** : 151-230 kWh/m²/an (Moyen)
- **E** : 231-330 kWh/m²/an (Médiocre)
- **F** : 331-450 kWh/m²/an (Mauvais)
- **G** : > 450 kWh/m²/an (Très mauvais)

---

## 🔧 Comment Adapter le Code

### Dans `/app/biens/[id]/page.tsx` :

```typescript
// Affichage conditionnel selon le type
{property.type === 'saisonniere' && (
  <div>Conditions location saisonnière</div>
)}

{property.type === 'location' && (
  <div>Conditions location annuelle + DPE</div>
)}

{property.type === 'vente' && (
  <div>Conditions achat + DPE + Diagnostics</div>
)}

// DPE conditionnel
{property.legalInfo.dpe && (
  <div>
    <span>DPE : {property.legalInfo.dpe}</span>
    <span>GES : {property.legalInfo.ges}</span>
  </div>
)}
```

---

## ✅ Avantages de cette Structure

1. **Conformité légale** : Toutes les mentions obligatoires
2. **Transparence** : Client informé de tous les frais
3. **SEO optimisé** : Contenu riche et détaillé
4. **Professionnalisme** : Comme les grandes agences
5. **Adaptabilité** : Facile d'ajouter/modifier des sections

---

## 🚀 Prochaines Étapes

1. ✅ Créer des templates pour chaque type de bien
2. ✅ Ajouter un composant DPE visuel (badges colorés)
3. ✅ Intégrer les vrais diagnostics (PDF téléchargeables)
4. ✅ Ajouter un calculateur de frais de notaire
5. ✅ Système de comparaison de biens

---

**Toutes les sections sont maintenant complètes et professionnelles ! 🎉**
