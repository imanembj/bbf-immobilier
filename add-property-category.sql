-- Migration: Ajouter colonne property_category pour catégoriser les biens
-- À exécuter dans phpMyAdmin Hostinger

-- Ajouter la colonne
ALTER TABLE properties 
ADD COLUMN property_category VARCHAR(50) DEFAULT 'maison' AFTER type;

-- Mettre à jour les biens existants selon leur type
-- Par défaut, on met "maison" pour les locations et "terrain" pour les ventes
UPDATE properties 
SET property_category = CASE 
  WHEN type = 'vente' THEN 'terrain'
  ELSE 'maison'
END;

-- Vérifier la modification
DESCRIBE properties;
SELECT id, title, type, property_category FROM properties LIMIT 10;
