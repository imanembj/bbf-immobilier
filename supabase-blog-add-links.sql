-- Ajouter le champ links à la table blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- Mettre à jour les articles existants
UPDATE blog_posts 
SET links = '[]'::jsonb 
WHERE links IS NULL;
