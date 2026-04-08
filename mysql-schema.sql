-- ================================================
-- SCRIPT SQL POUR CRÉER LES TABLES MySQL
-- Base de données: u169114354_bbf_new
-- ================================================

-- Table: properties (Biens immobiliers)
CREATE TABLE IF NOT EXISTS properties (
  id VARCHAR(255) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  period VARCHAR(50),
  
  -- Système de tarification flexible (JSON)
  pricing_info JSON,
  
  description TEXT,
  rooms INT,
  beds INT,
  baths INT,
  area DECIMAL(10, 2),
  guests INT,
  images JSON,
  video_url VARCHAR(500),
  virtual_tour_url VARCHAR(500),
  features JSON,
  amenities JSON,
  rules JSON,
  
  -- Descriptions détaillées (JSON)
  detailed_description JSON,
  environment JSON,
  rental_conditions JSON,
  purchase_conditions JSON,
  fees JSON,
  legal_info JSON,
  
  status VARCHAR(50) DEFAULT 'disponible',
  featured BOOLEAN DEFAULT FALSE,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: client_requests (Demandes clients)
CREATE TABLE IF NOT EXISTS client_requests (
  id VARCHAR(255) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'nouveau',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  property_id VARCHAR(255),
  property_title VARCHAR(255),
  property_type VARCHAR(50),
  property_address VARCHAR(500),
  property_area DECIMAL(10, 2),
  property_rooms INT,
  estimation_details TEXT,
  preferred_date TIMESTAMP NULL,
  preferred_time VARCHAR(50),
  visit_message TEXT,
  check_in TIMESTAMP NULL,
  check_out TIMESTAMP NULL,
  guests INT,
  reservation_message TEXT,
  total_price DECIMAL(10, 2),
  price_per_night DECIMAL(10, 2),
  appointment_date TIMESTAMP NULL,
  appointment_time VARCHAR(50),
  appointment_reason VARCHAR(255),
  appointment_message TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: messages (Messages de contact)
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'non_lu',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: reviews (Avis clients)
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(255) PRIMARY KEY,
  property_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: partners (Partenaires)
CREATE TABLE IF NOT EXISTS partners (
  id VARCHAR(255) PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  categorie VARCHAR(100) NOT NULL,
  description TEXT,
  logo VARCHAR(500),
  url VARCHAR(500),
  promo VARCHAR(255),
  prix VARCHAR(100),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: faqs (Questions fréquentes)
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(255) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  categorie VARCHAR(100),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: blog_posts (Articles de blog)
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  cover_image VARCHAR(500) NOT NULL,
  cover_image_position VARCHAR(50) DEFAULT '50% 50%',
  images JSON,
  links JSON,
  category VARCHAR(100) NOT NULL,
  tags JSON,
  author VARCHAR(255) DEFAULT 'BBF Immobilier',
  is_pinned BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: admin_users (Utilisateurs administrateurs)
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: settings (Configuration de l'agence)
CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  hours TEXT NOT NULL,
  facebook VARCHAR(500),
  instagram VARCHAR(500),
  tiktok VARCHAR(500),
  youtube VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insérer la configuration par défaut de l'agence
INSERT INTO settings (id, name, email, phone, address, hours, facebook, instagram, tiktok, youtube)
VALUES (
  'agency_config',
  'BBF Immobilier',
  'contact@bulle-immobiliere.mq',
  '+596 696 XX XX XX',
  'Rivière-Pilote, Martinique',
  'Lun-Ven: 9h-18h, Sam: 9h-12h',
  'https://facebook.com/bulle-immobiliere',
  'https://instagram.com/bulle_immobiliere',
  'https://tiktok.com/@bulle_immobiliere',
  'https://youtube.com/@BBF-Immobilier'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Index pour améliorer les performances
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_client_requests_status ON client_requests(status);
CREATE INDEX idx_client_requests_type ON client_requests(type);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_reviews_property_id ON reviews(property_id);
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_partners_actif ON partners(actif);
CREATE INDEX idx_faqs_actif ON faqs(actif);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_pinned ON blog_posts(is_pinned);
