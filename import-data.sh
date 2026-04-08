#!/bin/bash

# Script d'import des données dans MySQL
# Base de données: u169114354_bbf_new

echo "🚀 Import des données dans MySQL..."
echo "=================================="

# Informations de connexion
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="u169114354_bbf_new"
DB_USER="u169114354_bbf_user"
DB_PASSWORD="0lV2fqX^Z"

# Import du fichier SQL
mysql -h "$DB_HOST" \
      -P "$DB_PORT" \
      -u "$DB_USER" \
      -p"$DB_PASSWORD" \
      "$DB_NAME" < insert-data-mysql.sql

if [ $? -eq 0 ]; then
    echo "✅ Import réussi !"
    echo ""
    echo "📊 Vérification des données importées..."
    
    # Vérification
    mysql -h "$DB_HOST" \
          -P "$DB_PORT" \
          -u "$DB_USER" \
          -p"$DB_PASSWORD" \
          "$DB_NAME" \
          -e "SELECT 'Partners:' as Table_Name, COUNT(*) as Count FROM partners
              UNION ALL
              SELECT 'FAQs:', COUNT(*) FROM faqs
              UNION ALL
              SELECT 'Blog Posts:', COUNT(*) FROM blog_posts
              UNION ALL
              SELECT 'Properties:', COUNT(*) FROM properties
              UNION ALL
              SELECT 'Reviews:', COUNT(*) FROM reviews
              UNION ALL
              SELECT 'Settings:', COUNT(*) FROM settings
              UNION ALL
              SELECT 'Messages:', COUNT(*) FROM messages
              UNION ALL
              SELECT 'Client Requests:', COUNT(*) FROM client_requests
              UNION ALL
              SELECT 'Admin Users:', COUNT(*) FROM admin_users;"
    
    echo ""
    echo "✅ Import terminé avec succès !"
else
    echo "❌ Erreur lors de l'import"
    exit 1
fi
