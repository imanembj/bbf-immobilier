-- Table: settings (Configuration de l'agence)
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'agency_config',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  hours TEXT NOT NULL,
  facebook TEXT,
  instagram TEXT,
  tiktok TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (Lecture publique, Écriture admin uniquement)
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public update settings" ON settings FOR UPDATE USING (true);
CREATE POLICY "Public insert settings" ON settings FOR INSERT WITH CHECK (true);

-- Insérer la configuration par défaut
INSERT INTO settings (id, name, email, phone, address, hours, facebook, instagram, tiktok) VALUES
('agency_config', 'Bulle immobilière, Business & Foncier (BBF)', 'contact@bulle-immobiliere.mq', '+596 696 00 74 20', 'Rivière-Pilote, Martinique', 'Lun-Ven: 9h-18h, Sam: 9h-13h', 'https://facebook.com/bulle-immobiliere', 'https://instagram.com/bulle_immobiliere', 'https://tiktok.com/@bulle_immobiliere')
ON CONFLICT (id) DO NOTHING;
