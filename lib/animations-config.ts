// Configuration centralisée des animations pour toutes les pages

export const pageAnimations = {
  // Page Nos biens
  'biens': {
    animatedWord: { text: 'immobiliers', type: 'simple' as const },
  },
  
  // Page Acheter
  'acheter': {
    animatedWord: { text: ['en', 'Martinique'], type: 'sequential' as const },
    sections: [
      { id: 'simulateur', text: 'Simulez vos frais d\'achat', location: 'Section Astuce B.B.F' },
      { id: 'cta-vendre', text: 'Vous vendez votre bien ?', location: 'Section CTA' },
    ]
  },
  
  // Page Location annuelle
  'location-annuelle': {
    animatedWord: { text: 'annuelle', type: 'simple' as const },
    sections: [
      { id: 'cta-proprietaire', text: 'Vous êtes propriétaire ?', location: 'Section CTA' },
    ]
  },
  
  // Page Location saisonnière
  'location-saisonniere': {
    animatedWord: { text: 'saisonnière', type: 'simple' as const },
    sections: [
      { id: 'paiement', text: 'acceptés (Moyens de paiement)', location: 'Section Paiement' },
      { id: 'cta-proprietaire', text: 'Vous possédez un bien à louer ?', location: 'Section CTA' },
    ]
  },
  
  // Page Vendre
  'vendre': {
    animatedWord: { text: 'B.B.F', type: 'simple' as const },
    sections: [
      { id: 'cta-final', text: 'vente (Discutons de votre projet de)', location: 'Section CTA Final' },
    ]
  },
  
  // Page Estimer
  'estimer': {
    animatedWord: { text: 'B.B.F', type: 'simple' as const },
    sections: [
      { id: 'cta-final', text: 'Prêt à connaître la valeur de votre bien ?', location: 'Section CTA Final' },
    ]
  },
  
  // Page Gestion locative
  'gestion-locative': {
    animatedWord: { text: 'BBF', type: 'simple' as const },
    sections: [
      { id: 'cta-contact', text: 'Parlons-en. (Un projet ?)', location: 'Section CTA Contact' },
    ]
  },
  
  // Page Gestion annuelle
  'gestion-annuelle': {
    animatedWord: { text: 'sérénité', type: 'simple' as const },
    sections: [
      { id: 'cta-contact', text: 'personnalisée (Contactez-nous pour une étude)', location: 'Section CTA Contact' },
    ]
  },
  
  // Page Gestion touristique
  'gestion-touristique': {
    animatedWord: { text: ['sans', 'contrainte'], type: 'sequential' as const },
    sections: [
      { id: 'cta-contact', text: 'revenus locatifs (Prêt à maximiser vos)', location: 'Section CTA Contact' },
    ]
  },
  
  // Page Nos partenaires
  'nos-partenaires': {
    animatedWord: { text: 'partenaires', type: 'simple' as const },
    sections: [
      { id: 'cta-partenaire', text: 'Vous souhaitez devenir partenaire ?', location: 'Section CTA' },
    ]
  },
  
  // Page Contact
  'contact': {
    animatedWord: { text: 'projet', type: 'simple' as const },
    sections: [
      { id: 'faq', text: 'fréquentes (Questions)', location: 'Section FAQ' },
      { id: 'cta-final', text: 'projet (Prêt à démarrer votre)', location: 'Section CTA finale' },
    ]
  },
};

export type PageKey = keyof typeof pageAnimations;
