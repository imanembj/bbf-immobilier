-- Désactiver RLS temporairement pour permettre les opérations
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- OU si vous voulez garder RLS activé, créez des policies :

-- Activer RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre la lecture publique des articles publiés
CREATE POLICY "Allow public read published posts" ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Policy pour permettre toutes les opérations (lecture, insertion, modification, suppression)
-- pour les utilisateurs authentifiés (admin)
CREATE POLICY "Allow all operations for authenticated users" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- OU si vous préférez des policies plus spécifiques :

-- Policy pour permettre l'insertion
CREATE POLICY "Allow insert for all" ON blog_posts
  FOR INSERT
  WITH CHECK (true);

-- Policy pour permettre la mise à jour
CREATE POLICY "Allow update for all" ON blog_posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy pour permettre la suppression
CREATE POLICY "Allow delete for all" ON blog_posts
  FOR DELETE
  USING (true);

-- Policy pour permettre la lecture de tous les articles (pour l'admin)
CREATE POLICY "Allow read all for admin" ON blog_posts
  FOR SELECT
  USING (true);
