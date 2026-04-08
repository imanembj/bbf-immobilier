-- ============================================
-- TABLE ADMIN_USERS
-- Gestion des utilisateurs administrateurs
-- ============================================

-- Créer la table admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créer un index sur l'email pour des recherches rapides
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
DROP TRIGGER IF EXISTS trigger_admin_users_updated_at ON admin_users;
CREATE TRIGGER trigger_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- Insérer l'utilisateur admin par défaut
-- Mot de passe: admin123 (hashé avec bcrypt)
-- IMPORTANT: Changez ce mot de passe après la première connexion !
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
  'admin@bulle-immobiliere.mq',
  '$2a$10$rKZvVqVQxJ5kqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', -- Placeholder - sera remplacé côté serveur
  'Administrateur',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Commentaires sur les colonnes
COMMENT ON TABLE admin_users IS 'Table des utilisateurs administrateurs';
COMMENT ON COLUMN admin_users.id IS 'Identifiant unique de l''utilisateur';
COMMENT ON COLUMN admin_users.email IS 'Adresse email de connexion';
COMMENT ON COLUMN admin_users.password_hash IS 'Hash du mot de passe (bcrypt)';
COMMENT ON COLUMN admin_users.name IS 'Nom complet de l''utilisateur';
COMMENT ON COLUMN admin_users.role IS 'Rôle de l''utilisateur (admin, super_admin, etc.)';
COMMENT ON COLUMN admin_users.active IS 'Compte actif ou désactivé';
COMMENT ON COLUMN admin_users.last_login IS 'Date et heure de la dernière connexion';
COMMENT ON COLUMN admin_users.created_at IS 'Date de création du compte';
COMMENT ON COLUMN admin_users.updated_at IS 'Date de dernière modification';
