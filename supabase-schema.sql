-- Création des tables pour BBF Immobilier

-- Table: properties (Biens immobiliers)
CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  period TEXT,
  
  -- Nouveau système de tarification flexible
  pricing_info JSONB,
  -- Structure: {
  --   type: 'simple' | 'seasonal' | 'custom',
  --   simplePrice?: number,
  --   seasonalPricing?: { lowSeason: number, midSeason: number, highSeason: number },
  --   customPricing?: { description: string, prices: [{ label: string, price: number }] },
  --   period?: string
  -- }
  
  description TEXT,
  rooms INTEGER,
  beds INTEGER,
  baths INTEGER,
  area NUMERIC,
  guests INTEGER,
  images TEXT[],
  video_url TEXT,
  virtual_tour_url TEXT,
  features TEXT[],
  amenities JSONB[],
  rules TEXT[],
  
  -- Descriptions détaillées
  detailed_description JSONB,
  -- Structure: { presentation: string, interior: string, exterior: string }
  
  environment JSONB,
  -- Structure: { title: string, description: string, highlights: string[] }
  
  rental_conditions JSONB,
  purchase_conditions JSONB,
  fees JSONB,
  legal_info JSONB,
  
  status TEXT DEFAULT 'disponible',
  featured BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: client_requests (Demandes clients)
CREATE TABLE client_requests (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nouveau',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_id TEXT,
  property_title TEXT,
  property_type TEXT,
  property_address TEXT,
  property_area NUMERIC,
  property_rooms INTEGER,
  estimation_details TEXT,
  preferred_date TIMESTAMP WITH TIME ZONE,
  preferred_time TEXT,
  visit_message TEXT,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  guests INTEGER,
  reservation_message TEXT,
  total_price NUMERIC,
  price_per_night NUMERIC,
  appointment_date TIMESTAMP WITH TIME ZONE,
  appointment_time TEXT,
  appointment_reason TEXT,
  appointment_message TEXT,
  email_sent BOOLEAN DEFAULT false,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: messages (Messages de contact)
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'non_lu',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: reviews (Avis clients)
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  property_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: partners (Partenaires)
CREATE TABLE partners (
  id TEXT PRIMARY KEY,
  nom TEXT NOT NULL,
  categorie TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  url TEXT,
  promo TEXT,
  prix TEXT,
  ordre INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: faqs (Questions fréquentes)
CREATE TABLE faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  categorie TEXT,
  ordre INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (Lecture publique, Écriture publique pour les formulaires)
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public insert properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update properties" ON properties FOR UPDATE USING (true);
CREATE POLICY "Public delete properties" ON properties FOR DELETE USING (true);

CREATE POLICY "Public read client_requests" ON client_requests FOR SELECT USING (true);
CREATE POLICY "Public insert client_requests" ON client_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update client_requests" ON client_requests FOR UPDATE USING (true);
CREATE POLICY "Public delete client_requests" ON client_requests FOR DELETE USING (true);

CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update messages" ON messages FOR UPDATE USING (true);
CREATE POLICY "Public delete messages" ON messages FOR DELETE USING (true);

CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Public delete reviews" ON reviews FOR DELETE USING (true);

CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public insert partners" ON partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update partners" ON partners FOR UPDATE USING (true);
CREATE POLICY "Public delete partners" ON partners FOR DELETE USING (true);

CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public insert faqs" ON faqs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update faqs" ON faqs FOR UPDATE USING (true);
CREATE POLICY "Public delete faqs" ON faqs FOR DELETE USING (true);
