// Script de migration Supabase → MySQL Hostinger
// Exécuter avec: node migrate-supabase-to-mysql.js

require('dotenv').config({ path: '.env.local' })
const mysql = require('mysql2/promise')
const { createClient } = require('@supabase/supabase-js')

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Configuration MySQL
const mysqlConfig = {
  host: 'localhost', // Sur Hostinger, c'est localhost
  port: 3306,
  database: 'u169114354_bbf_new',
  user: 'u169114354_bbf_user',
  password: '0lV2fqX^Z',
}

async function migrateData() {
  console.log('🚀 MIGRATION SUPABASE → MySQL HOSTINGER\n')
  
  let connection
  
  try {
    // Connexion à MySQL
    console.log('🔌 Connexion à MySQL Hostinger...')
    connection = await mysql.createConnection(mysqlConfig)
    console.log('✅ Connecté à MySQL!\n')
    
    // 1. MIGRER LES PROPERTIES (Biens)
    console.log('📦 Migration des BIENS...')
    const { data: properties, error: propError } = await supabase
      .from('properties')
      .select('*')
    
    if (propError) throw propError
    
    if (properties && properties.length > 0) {
      for (const prop of properties) {
        const sql = `
          INSERT INTO properties (
            id, type, title, location, price, period, pricing_info,
            description, rooms, beds, baths, area, guests,
            images, video_url, virtual_tour_url, features, amenities, rules,
            detailed_description, environment, rental_conditions,
            purchase_conditions, fees, legal_info,
            status, featured, available, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            price = VALUES(price),
            updated_at = VALUES(updated_at)
        `
        
        await connection.execute(sql, [
          prop.id,
          prop.type,
          prop.title,
          prop.location,
          prop.price,
          prop.period,
          JSON.stringify(prop.pricing_info),
          prop.description,
          prop.rooms,
          prop.beds,
          prop.baths,
          prop.area,
          prop.guests,
          JSON.stringify(prop.images),
          prop.video_url,
          prop.virtual_tour_url,
          JSON.stringify(prop.features),
          JSON.stringify(prop.amenities),
          JSON.stringify(prop.rules),
          JSON.stringify(prop.detailed_description),
          JSON.stringify(prop.environment),
          JSON.stringify(prop.rental_conditions),
          JSON.stringify(prop.purchase_conditions),
          JSON.stringify(prop.fees),
          JSON.stringify(prop.legal_info),
          prop.status || 'disponible',
          prop.featured || false,
          prop.available !== false,
          prop.created_at,
          prop.updated_at || prop.created_at,
        ])
      }
      console.log(`✅ ${properties.length} biens migrés!\n`)
    } else {
      console.log('⚠️  Aucun bien trouvé dans Supabase\n')
    }
    
    // 2. MIGRER LES CLIENT_REQUESTS (Demandes clients)
    console.log('📧 Migration des DEMANDES CLIENTS...')
    const { data: requests, error: reqError } = await supabase
      .from('client_requests')
      .select('*')
    
    if (reqError) throw reqError
    
    if (requests && requests.length > 0) {
      for (const req of requests) {
        const sql = `
          INSERT INTO client_requests (
            id, type, status, name, email, phone,
            property_id, property_title, property_type, property_address,
            property_area, property_rooms, estimation_details,
            preferred_date, preferred_time, visit_message,
            check_in, check_out, guests, reservation_message,
            total_price, price_per_night,
            appointment_date, appointment_time, appointment_reason, appointment_message,
            email_sent, admin_notes, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE status = VALUES(status)
        `
        
        await connection.execute(sql, [
          req.id,
          req.type,
          req.status || 'nouveau',
          req.name,
          req.email,
          req.phone,
          req.property_id,
          req.property_title,
          req.property_type,
          req.property_address,
          req.property_area,
          req.property_rooms,
          req.estimation_details,
          req.preferred_date,
          req.preferred_time,
          req.visit_message,
          req.check_in,
          req.check_out,
          req.guests,
          req.reservation_message,
          req.total_price,
          req.price_per_night,
          req.appointment_date,
          req.appointment_time,
          req.appointment_reason,
          req.appointment_message,
          req.email_sent || false,
          req.admin_notes,
          req.created_at,
          req.updated_at || req.created_at,
        ])
      }
      console.log(`✅ ${requests.length} demandes migrées!\n`)
    } else {
      console.log('⚠️  Aucune demande trouvée\n')
    }
    
    // 3. MIGRER LES MESSAGES
    console.log('💬 Migration des MESSAGES...')
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
    
    if (msgError) throw msgError
    
    if (messages && messages.length > 0) {
      for (const msg of messages) {
        const sql = `
          INSERT INTO messages (id, name, email, phone, subject, message, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE status = VALUES(status)
        `
        
        await connection.execute(sql, [
          msg.id,
          msg.name,
          msg.email,
          msg.phone,
          msg.subject,
          msg.message,
          msg.status || 'non_lu',
          msg.created_at,
        ])
      }
      console.log(`✅ ${messages.length} messages migrés!\n`)
    } else {
      console.log('⚠️  Aucun message trouvé\n')
    }
    
    // 4. MIGRER LES REVIEWS (Avis)
    console.log('⭐ Migration des AVIS...')
    const { data: reviews, error: revError } = await supabase
      .from('reviews')
      .select('*')
    
    if (revError) throw revError
    
    if (reviews && reviews.length > 0) {
      for (const rev of reviews) {
        const sql = `
          INSERT INTO reviews (id, property_id, name, email, rating, comment, approved, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE approved = VALUES(approved)
        `
        
        await connection.execute(sql, [
          rev.id,
          rev.property_id,
          rev.name,
          rev.email,
          rev.rating,
          rev.comment,
          rev.approved || false,
          rev.created_at,
        ])
      }
      console.log(`✅ ${reviews.length} avis migrés!\n`)
    } else {
      console.log('⚠️  Aucun avis trouvé\n')
    }
    
    // 5. MIGRER LES PARTNERS (Partenaires)
    console.log('🤝 Migration des PARTENAIRES...')
    const { data: partners, error: partError } = await supabase
      .from('partners')
      .select('*')
    
    if (partError) throw partError
    
    if (partners && partners.length > 0) {
      for (const partner of partners) {
        const sql = `
          INSERT INTO partners (id, nom, categorie, description, logo, url, promo, prix, ordre, actif, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            nom = VALUES(nom),
            ordre = VALUES(ordre)
        `
        
        await connection.execute(sql, [
          partner.id,
          partner.nom,
          partner.categorie,
          partner.description,
          partner.logo,
          partner.url,
          partner.promo,
          partner.prix,
          partner.ordre || 0,
          partner.actif !== false,
          partner.created_at,
          partner.updated_at || partner.created_at,
        ])
      }
      console.log(`✅ ${partners.length} partenaires migrés!\n`)
    } else {
      console.log('⚠️  Aucun partenaire trouvé\n')
    }
    
    // 6. MIGRER LES FAQs
    console.log('❓ Migration des FAQs...')
    const { data: faqs, error: faqError } = await supabase
      .from('faqs')
      .select('*')
    
    if (faqError) throw faqError
    
    if (faqs && faqs.length > 0) {
      for (const faq of faqs) {
        const sql = `
          INSERT INTO faqs (id, question, answer, categorie, ordre, actif, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            answer = VALUES(answer),
            ordre = VALUES(ordre)
        `
        
        await connection.execute(sql, [
          faq.id,
          faq.question,
          faq.answer,
          faq.categorie,
          faq.ordre || 0,
          faq.actif !== false,
          faq.created_at,
          faq.updated_at || faq.created_at,
        ])
      }
      console.log(`✅ ${faqs.length} FAQs migrées!\n`)
    } else {
      console.log('⚠️  Aucune FAQ trouvée\n')
    }
    
    // 7. MIGRER LES BLOG_POSTS (Articles)
    console.log('📝 Migration des ARTICLES DE BLOG...')
    const { data: posts, error: postError } = await supabase
      .from('blog_posts')
      .select('*')
    
    if (postError) throw postError
    
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const sql = `
          INSERT INTO blog_posts (
            id, slug, title, excerpt, content, cover_image, cover_image_position,
            images, links, category, tags, author,
            is_pinned, is_published, views, published_at, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            is_published = VALUES(is_published)
        `
        
        await connection.execute(sql, [
          post.id,
          post.slug,
          post.title,
          post.excerpt,
          post.content,
          post.cover_image,
          post.cover_image_position || '50% 50%',
          JSON.stringify(post.images || []),
          JSON.stringify(post.links || []),
          post.category,
          JSON.stringify(post.tags || []),
          post.author || 'BBF Immobilier',
          post.is_pinned || false,
          post.is_published || false,
          post.views || 0,
          post.published_at,
          post.created_at,
          post.updated_at || post.created_at,
        ])
      }
      console.log(`✅ ${posts.length} articles migrés!\n`)
    } else {
      console.log('⚠️  Aucun article trouvé\n')
    }
    
    // 8. MIGRER LES SETTINGS (Configuration)
    console.log('⚙️  Migration de la CONFIGURATION...')
    const { data: settings, error: setError } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'agency_config')
      .single()
    
    if (!setError && settings) {
      const sql = `
        INSERT INTO settings (id, name, email, phone, address, hours, facebook, instagram, tiktok, youtube, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          email = VALUES(email),
          phone = VALUES(phone)
      `
      
      await connection.execute(sql, [
        settings.id,
        settings.name,
        settings.email,
        settings.phone,
        settings.address,
        settings.hours,
        settings.facebook,
        settings.instagram,
        settings.tiktok,
        settings.youtube,
        settings.created_at,
        settings.updated_at || settings.created_at,
      ])
      console.log('✅ Configuration migrée!\n')
    } else {
      console.log('⚠️  Configuration non trouvée\n')
    }
    
    // VÉRIFICATION FINALE
    console.log('📊 VÉRIFICATION DES DONNÉES MIGRÉES:\n')
    
    const tables = [
      'properties',
      'client_requests',
      'messages',
      'reviews',
      'partners',
      'faqs',
      'blog_posts',
      'settings',
    ]
    
    for (const table of tables) {
      const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`)
      console.log(`   ${table}: ${rows[0].count} lignes`)
    }
    
    console.log('\n🎉 MIGRATION TERMINÉE AVEC SUCCÈS!\n')
    
  } catch (error) {
    console.error('\n❌ ERREUR DE MIGRATION:', error.message)
    console.error('\nDétails:', error)
  } finally {
    if (connection) {
      await connection.end()
      console.log('🔌 Connexion MySQL fermée')
    }
  }
}

// Lancer la migration
migrateData()
