-- Script de diagnostic pour vérifier les données des biens
-- À exécuter dans phpMyAdmin pour voir ce qui est vraiment sauvegardé

-- 1. Vérifier la structure de la table
DESCRIBE properties;

-- 2. Voir les colonnes JSON pour un bien spécifique (Villa Tamarin par exemple)
SELECT 
  id,
  title,
  type,
  property_category,
  rental_conditions,
  fees,
  pricing_info,
  detailed_description,
  environment
FROM properties 
WHERE title LIKE '%Tamarin%' OR title LIKE '%Villa%'
LIMIT 5;

-- 3. Vérifier si les données JSON sont bien formatées
SELECT 
  id,
  title,
  JSON_VALID(rental_conditions) as rental_valid,
  JSON_VALID(fees) as fees_valid,
  JSON_VALID(pricing_info) as pricing_valid,
  LENGTH(rental_conditions) as rental_length,
  LENGTH(fees) as fees_length
FROM properties 
WHERE title LIKE '%Tamarin%' OR title LIKE '%Villa%'
LIMIT 5;

-- 4. Voir le contenu brut de rental_conditions
SELECT 
  id,
  title,
  rental_conditions
FROM properties 
WHERE rental_conditions IS NOT NULL 
  AND rental_conditions != 'null'
  AND rental_conditions != ''
LIMIT 5;
