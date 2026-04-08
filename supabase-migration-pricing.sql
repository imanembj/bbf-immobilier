-- Migration pour ajouter le système de tarification flexible
-- À exécuter dans Supabase SQL Editor

-- Ajouter les nouvelles colonnes à la table properties
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS pricing_info JSONB,
ADD COLUMN IF NOT EXISTS rooms INTEGER,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT,
ADD COLUMN IF NOT EXISTS rules TEXT[],
ADD COLUMN IF NOT EXISTS detailed_description JSONB,
ADD COLUMN IF NOT EXISTS environment JSONB,
ADD COLUMN IF NOT EXISTS rental_conditions JSONB,
ADD COLUMN IF NOT EXISTS purchase_conditions JSONB,
ADD COLUMN IF NOT EXISTS fees JSONB,
ADD COLUMN IF NOT EXISTS legal_info JSONB,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'disponible',
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Modifier le type de la colonne amenities pour supporter JSONB
ALTER TABLE properties 
ALTER COLUMN amenities TYPE JSONB[] USING amenities::JSONB[];

-- Migrer les données existantes vers le nouveau système de tarification
UPDATE properties
SET pricing_info = jsonb_build_object(
  'type', 'simple',
  'simplePrice', price,
  'period', COALESCE(period, '/nuit')
)
WHERE pricing_info IS NULL;

-- Ajouter un commentaire sur la colonne pricing_info
COMMENT ON COLUMN properties.pricing_info IS 'Système de tarification flexible: simple, seasonal, ou custom';

-- Créer un index sur pricing_info pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_properties_pricing_type ON properties ((pricing_info->>'type'));

-- Afficher un message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Migration terminée avec succès! Le système de tarification flexible est maintenant actif.';
END $$;
