-- Ajouter le champ cover_image_position à la table blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS cover_image_position TEXT DEFAULT '50% 50%';

-- Mettre à jour les articles existants
UPDATE blog_posts 
SET cover_image_position = '50% 50%' 
WHERE cover_image_position IS NULL;
