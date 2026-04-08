-- Vérifier la structure de la table blog_posts
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- Vérifier les données existantes
SELECT id, title, cover_image_position, images
FROM blog_posts
LIMIT 5;
