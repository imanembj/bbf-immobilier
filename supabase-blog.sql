-- Table pour les articles de blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'BBF Immobilier',
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_pinned ON blog_posts(is_pinned);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Insérer l'article initial sur Micah Fatna
INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image,
  images,
  category,
  tags,
  author,
  is_pinned,
  is_published,
  views,
  published_at,
  created_at
) VALUES (
  '1',
  'sponsoring-micah-fatna-moto-gp',
  'BBF Immobilier sponsorise Micah Fatna, jeune champion de Moto GP',
  'Nous sommes fiers d''annoncer notre partenariat avec Micah Fatna, jeune talent martiniquais en Moto GP. Découvrez son parcours exceptionnel et notre engagement pour la jeunesse locale.',
  '<h2>Un talent martiniquais qui fait vibrer les circuits</h2><p>Chez BBF Immobilier - Bulle Immobilière Business & Foncier, nous croyons fermement au soutien des talents locaux. C''est avec une immense fierté que nous annonçons notre sponsoring de Micah Fatna, jeune prodige martiniquais qui fait sensation dans le monde de la Moto GP.</p><h3>Qui est Micah Fatna ?</h3><p>Micah Fatna est un jeune pilote de moto originaire de Martinique qui s''est rapidement fait un nom dans le monde compétitif de la Moto GP. Avec sa détermination, son talent et sa passion pour la vitesse, Micah représente l''excellence et l''ambition de la jeunesse martiniquaise.</p><h3>Pourquoi BBF sponsorise Micah ?</h3><p>Notre engagement va au-delà de l''immobilier. Nous croyons au développement de notre territoire et au soutien de ceux qui portent haut les couleurs de la Martinique. Micah incarne des valeurs qui nous sont chères :</p><ul><li><strong>La détermination</strong> : Atteindre l''excellence demande du travail et de la persévérance</li><li><strong>L''ambition</strong> : Viser toujours plus haut, comme nous le faisons dans l''immobilier</li><li><strong>Le dépassement de soi</strong> : Repousser ses limites pour atteindre ses objectifs</li><li><strong>La fierté locale</strong> : Représenter la Martinique sur la scène internationale</li></ul><h3>Ses prochains objectifs</h3><p>Micah prépare activement ses prochaines compétitions avec un objectif clair : se hisser parmi les meilleurs pilotes de sa catégorie. Nous serons là pour le soutenir à chaque étape de son parcours.</p><h3>Suivez son parcours</h3><p>Restez connectés pour suivre les performances de Micah et découvrir comment BBF Immobilier contribue au développement des talents martiniquais. Ensemble, construisons l''avenir de notre île !</p><p>🏍️ <strong>Soutenez Micah Fatna</strong></p><p>Suivez ses courses, partagez ses victoires et encouragez ce jeune talent qui fait la fierté de la Martinique !</p>',
  'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=1200',
  ARRAY['https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'],
  'sponsoring',
  ARRAY['Sponsoring', 'Moto GP', 'Martinique', 'Jeunesse', 'Sport'],
  'BBF Immobilier',
  true,
  true,
  0,
  '2024-01-15T10:00:00Z',
  '2024-01-15T10:00:00Z'
) ON CONFLICT (id) DO NOTHING;
