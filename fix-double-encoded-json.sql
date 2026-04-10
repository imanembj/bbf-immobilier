-- Nettoyer les données JSON double-encodées dans la base de données
-- À exécuter dans phpMyAdmin

-- 1. Réinitialiser rental_conditions pour tous les biens avec des données cassées
UPDATE properties 
SET rental_conditions = NULL
WHERE rental_conditions IS NOT NULL 
  AND rental_conditions LIKE '{"0":"%';

-- 2. Réinitialiser fees pour tous les biens avec des données cassées  
UPDATE properties 
SET fees = NULL
WHERE fees IS NOT NULL 
  AND fees LIKE '{"0":"%';

-- 3. Réinitialiser pricing_info pour tous les biens avec des données cassées
UPDATE properties 
SET pricing_info = NULL
WHERE pricing_info IS NOT NULL 
  AND pricing_info LIKE '{"0":"%'
  AND pricing_info NOT LIKE '"%type%';

-- 4. Réinitialiser environment pour tous les biens avec des données cassées
UPDATE properties 
SET environment = NULL
WHERE environment IS NOT NULL 
  AND environment LIKE '{"0":"%';

-- 5. Réinitialiser detailed_description pour tous les biens avec des données cassées
UPDATE properties 
SET detailed_description = NULL
WHERE detailed_description IS NOT NULL 
  AND detailed_description LIKE '{"0":"%';

-- 6. Vérifier le résultat
SELECT 
  id,
  title,
  CASE 
    WHEN rental_conditions IS NULL THEN 'NULL'
    WHEN rental_conditions LIKE '{"0":"%' THEN 'CASSÉ'
    ELSE 'OK'
  END as rental_status,
  CASE 
    WHEN fees IS NULL THEN 'NULL'
    WHEN fees LIKE '{"0":"%' THEN 'CASSÉ'
    ELSE 'OK'
  END as fees_status,
  CASE 
    WHEN pricing_info IS NULL THEN 'NULL'
    WHEN pricing_info LIKE '{"0":"%' THEN 'CASSÉ'
    ELSE 'OK'
  END as pricing_status
FROM properties
LIMIT 10;
