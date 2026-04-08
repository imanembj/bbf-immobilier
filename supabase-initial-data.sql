-- Insertion des données initiales pour Partners et FAQs

-- Partenaires
INSERT INTO partners (id, nom, categorie, description, logo, url, promo, prix, ordre, actif, created_at, updated_at) VALUES
('1', 'Notaires de Martinique', 'Juridique', 'Chambre interdépartementale des notaires Guyane-Martinique', '⚖️', 'https://chambre-interdep-guyane-martinique.notaires.fr', NULL, NULL, 1, true, NOW(), NOW()),
('2', 'King Location', 'Mobilité', '-12% avec le code BBF sur votre location de voiture', '🚗', 'https://www.kingslocation.fr', 'Code: BBF', NULL, 2, true, NOW(), NOW()),
('3', 'L''île aux Iguanes', 'Loisirs', 'Découvrez les merveilles de la Martinique', '🦎', '#', NULL, NULL, 3, true, NOW(), NOW()),
('4', 'Massages & Bien-être', 'Détente', 'Services de massage et relaxation', '💆', '#', NULL, NULL, 4, true, NOW(), NOW()),
('5', 'Banques partenaires', 'Financement', 'Réseau de banques pour vos projets immobiliers', '🏦', '#', NULL, NULL, 5, true, NOW(), NOW()),
('6', 'Artisans certifiés', 'Travaux', 'Professionnels qualifiés pour vos rénovations', '🔨', '#', NULL, NULL, 6, true, NOW(), NOW()),
('7', 'Assurances', 'Protection', 'Solutions d''assurance habitation et emprunteur', '🛡️', '#', NULL, NULL, 7, true, NOW(), NOW()),
('8', 'Poissons frais', 'Expérience Mystique', 'Pêche locale livrée à la villa, nettoyage et préparation inclus', '🐟', '#', NULL, 'À partir de 15 €', 8, true, NOW(), NOW()),
('9', 'Courses à l''arrivée', 'Expérience Mystique', 'Livraison personnalisée de produits frais et essentiels', '🛒', '#', NULL, 'Service : 25 €', 9, true, NOW(), NOW()),
('10', 'Repas & Douceurs', 'Expérience Mystique', 'Chef privé, menus créoles, gâteaux événementiels', '🍽️', '#', NULL, 'Dès 25 €/pers', 10, true, NOW(), NOW()),
('11', 'Balades en mer', 'Expérience Mystique', 'Sorties bateau, apéro sunset, îlets, snorkeling, dauphins', '⛵', '#', NULL, 'Dès 60 €/pers', 11, true, NOW(), NOW());

-- FAQs
INSERT INTO faqs (id, question, answer, categorie, ordre, actif, created_at, updated_at) VALUES
('1', 'Comment louer un bien ?', 'Pour louer un bien, parcourez nos annonces, sélectionnez le bien qui vous intéresse, puis contactez-nous via le formulaire ou par téléphone. Nous organiserons une visite et vous accompagnerons dans toutes les démarches administratives.', NULL, 1, true, NOW(), NOW()),
('2', 'Quels documents fournir pour une location ?', 'Vous devrez fournir : pièce d''identité, 3 derniers bulletins de salaire, dernier avis d''imposition, justificatif de domicile, RIB. Pour les garants : mêmes documents + attestation de garant.', NULL, 2, true, NOW(), NOW()),
('3', 'Quels sont les frais d''agence ?', 'Les frais d''agence varient selon le type de location. Pour une location annuelle, comptez environ 1 mois de loyer HT. Pour une location saisonnière, les frais sont inclus dans le prix affiché. Contactez-nous pour un devis personnalisé.', NULL, 3, true, NOW(), NOW()),
('4', 'Quelle est la durée du bail ?', 'Pour une location vide, le bail est de 3 ans minimum (6 ans pour les personnes morales). Pour une location meublée, le bail est d''1 an minimum (9 mois pour les étudiants). Les locations saisonnières sont de courte durée (quelques jours à quelques mois).', NULL, 4, true, NOW(), NOW()),
('5', 'Comment fonctionne la caution ?', 'Le dépôt de garantie équivaut généralement à 1 mois de loyer hors charges pour une location vide, et 2 mois pour une location meublée. Il vous sera restitué dans un délai de 1 à 2 mois après votre départ, déduction faite des éventuelles réparations.', NULL, 5, true, NOW(), NOW()),
('6', 'Comment résilier mon bail ?', 'Pour résilier votre bail, envoyez une lettre recommandée avec accusé de réception à votre propriétaire. Le préavis est de 3 mois pour une location vide (1 mois dans certains cas) et 1 mois pour une location meublée.', NULL, 6, true, NOW(), NOW());
