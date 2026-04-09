#!/bin/bash

# Script de déploiement pour Hostinger
# À exécuter sur le serveur Hostinger via SSH

echo "🚀 Déploiement sur Hostinger..."

# 1. Aller dans le répertoire de l'application
cd /public_html || exit

# 2. Arrêter l'application Node.js (si elle tourne)
echo "⏸️  Arrêt de l'application..."
pm2 stop all 2>/dev/null || true

# 3. Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --production

# 4. Build de l'application
echo "🔨 Build de l'application..."
npm run build

# 5. Redémarrer l'application
echo "🔄 Redémarrage de l'application..."
pm2 restart all || pm2 start server.js --name "bbf-immobilier"

echo "✅ Déploiement terminé !"
echo "🌐 Visitez : https://bbf-immobilier.com"
