-- ================================================
-- CORRECTION: Ajouter la colonne property_category manquante
-- ================================================

-- Vérifier si la colonne existe déjà avant de l'ajouter
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS property_category VARCHAR(50) DEFAULT 'maison' AFTER type;

-- Mettre à jour les biens existants sans catégorie
UPDATE properties 
SET property_category = 'maison' 
WHERE property_category IS NULL OR property_category = '';

-- Afficher un résumé
SELECT 
  'Colonne property_category ajoutée avec succès' AS status,
  COUNT(*) AS total_properties,
  COUNT(CASE WHEN property_category IS NOT NULL THEN 1 END) AS with_category
FROM properties;
