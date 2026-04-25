-- 5 Articles de blog SEO optimisés pour BBF Immobilier
-- À exécuter dans phpMyAdmin ou MySQL Workbench

-- Article 1
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, author, category, tags, is_published, published_at, created_at, updated_at) VALUES
(UUID(),
'Acheter une Villa en Martinique 2024 : Guide Complet et Prix par Commune',
'acheter-villa-martinique-2024-guide-prix',
'Guide complet pour acheter une villa en Martinique : prix moyens par commune (Sainte-Anne 450-1200k€, Trois-Îlets 400-950k€), démarches, avantages fiscaux Pinel.',
'<h2>Prix des villas par commune 2024</h2><p><strong>Sainte-Anne</strong>: 450 000€ - 1 200 000€ | <strong>Trois-Îlets</strong>: 400 000€ - 950 000€ | <strong>Diamant</strong>: 380 000€ - 850 000€</p><h2>Avantages fiscaux</h2><p>Loi Pinel Outre-mer: jusqu''à 32% de réduction d''impôt sur 12 ans.</p><h2>Rentabilité location saisonnière</h2><p>Villa 3ch: 50-80k€/an de revenus. Taux occupation: 60-80%.</p>',
'/images/blog/villa-martinique.jpg',
'BBF Immobilier',
'Achat Immobilier',
'["martinique","villa","achat","prix","guide"]',
TRUE, NOW(), NOW(), NOW());

-- Article 2
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, author, category, tags, is_published, published_at, created_at, updated_at) VALUES
(UUID(),
'Location Saisonnière Martinique : Rentabilité et Guide 2024',
'location-saisonniere-martinique-rentabilite-2024',
'Rentabilité 6-10% en location saisonnière Martinique. Villa 3ch: 70-90k€/an. Réglementation, fiscalité, conseils gestion locative.',
'<h2>Rentabilité réelle</h2><p><strong>Villa 3ch Sainte-Anne</strong>: 84k€/an brut, 59k€ net (10,7%). <strong>Appart 2ch Trois-Îlets</strong>: 35k€/an brut, 23k€ net (8,5%).</p><h2>Réglementation</h2><p>Déclaration mairie obligatoire. Taxe de séjour: 1,50-3€/nuit. Fiscalité: micro-BIC ou réel.</p><h2>Gestion BBF</h2><p>Commission 20-25%. Services: annonces, réservations, ménage, entretien 24/7.</p>',
'/images/blog/location-saisonniere.jpg',
'BBF Immobilier',
'Location Saisonnière',
'["location saisonniere","martinique","rentabilite","gestion"]',
TRUE, NOW(), NOW(), NOW());

-- Article 3
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, author, category, tags, is_published, published_at, created_at, updated_at) VALUES
(UUID(),
'Top 7 Meilleures Communes pour Investir en Martinique 2024',
'meilleures-communes-investir-martinique-2024',
'Les 7 meilleures communes Martinique pour investir : Sainte-Anne (8-10%), Trois-Îlets (7-9%), Diamant (7-8%), Schoelcher (5-6%). Analyse prix et rentabilité.',
'<h2>Classement par rentabilité</h2><p>1. <strong>Sainte-Anne</strong>: 8-10% (location saisonnière) | 2. <strong>Trois-Îlets</strong>: 7-9% (tourisme) | 3. <strong>Diamant</strong>: 7-8% (bon rapport qualité-prix) | 4. <strong>Schoelcher</strong>: 5-6% (location annuelle) | 5. <strong>François</strong>: 6-8% (fonds blancs) | 6. <strong>Fort-de-France</strong>: 4-5% (centre) | 7. <strong>Saint-Pierre</strong>: 5-7% (patrimonial)</p><h2>Prix moyens</h2><p>Sainte-Anne: 550k€ | Trois-Îlets: 650k€ | Diamant: 480k€ | Schoelcher: 380k€</p>',
'/images/blog/communes-martinique.jpg',
'BBF Immobilier',
'Investissement',
'["martinique","investissement","communes","rentabilite"]',
TRUE, NOW(), NOW(), NOW());

-- Article 4
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, author, category, tags, is_published, published_at, created_at, updated_at) VALUES
(UUID(),
'Loi Pinel Outre-mer Martinique 2024 : Défiscalisation jusqu''à 32%',
'defiscalisation-pinel-martinique-2024',
'Loi Pinel Outre-mer : réduction impôt 23-32% sur achat neuf Martinique. Exemple: achat 250k€ = 80k€ économie impôt sur 12 ans. Conditions et calculs.',
'<h2>Taux de réduction</h2><p>6 ans: 23% | 9 ans: 29% | 12 ans: 32% du prix achat (max 300k€)</p><h2>Exemple concret</h2><p>Achat 250k€, engagement 12 ans = <strong>80 000€ économie impôt</strong> (6 667€/an). Loyer: 650€/mois. Revenus nets: 5 800€/an. <strong>Rentabilité globale: 4,75%/an</strong> + valorisation.</p><h2>Conditions</h2><p>Logement neuf BBC. Location nue 6-12 ans. Plafonds loyers: 11,31€/m² en Martinique. Plafonds ressources locataires.</p>',
'/images/blog/defiscalisation.jpg',
'BBF Immobilier',
'Fiscalité',
'["pinel","defiscalisation","martinique","reduction impot"]',
TRUE, NOW(), NOW(), NOW());

-- Article 5
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, author, category, tags, is_published, published_at, created_at, updated_at) VALUES
(UUID(),
'Marché Immobilier Martinique 2024 : Tendances, Prix et Prévisions',
'marche-immobilier-martinique-2024-tendances',
'Marché immobilier Martinique 2024 : prix +3,5%. Sud +6-8%, Centre +2-3%. Appartement 2 580€/m², Villa 3 950€/m². Prévisions 2025 : +2-4%.',
'<h2>Évolution prix 2024</h2><p>Hausse moyenne: +3,5%. <strong>Appartement</strong>: 2 580€/m² (+5,3%) | <strong>Maison</strong>: 2 920€/m² (+2,5%) | <strong>Villa piscine</strong>: 3 950€/m² (+3,9%) | <strong>Terrain</strong>: 195€/m² (+5,4%)</p><h2>Par zone</h2><p><strong>Sud</strong> (Sainte-Anne, Diamant, Trois-Îlets): +6-8%, délai vente 3-4 mois | <strong>Centre</strong> (Schoelcher, FDF): +2-3%, délai 5-7 mois | <strong>Nord</strong>: +0-2%, délai 8-12 mois</p><h2>Prévisions 2025</h2><p>Hausse attendue: +2-4%. Sud: +4-6%. Secteurs porteurs: location saisonnière haut de gamme, Pinel neuf, rénovation BBC.</p>',
'/images/blog/marche-2024.jpg',
'BBF Immobilier',
'Marché Immobilier',
'["marche immobilier","martinique","tendances","prix 2024"]',
TRUE, NOW(), NOW(), NOW());
