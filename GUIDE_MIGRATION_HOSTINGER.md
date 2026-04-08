# 🚀 GUIDE DE MIGRATION : Supabase → MySQL Hostinger

## 📋 RÉCAPITULATIF

Vous migrez de :
- ❌ **Vercel** (hébergement) + **Supabase** (base de données)

Vers :
- ✅ **Hostinger** (hébergement + base de données MySQL)

---

## 🎯 ÉTAPE 1 : CRÉER LES TABLES MySQL SUR HOSTINGER

### 1.1 Accéder à phpMyAdmin

1. Allez sur votre panel Hostinger
2. **Bases de données** → Trouvez `u169114354_bbf_new`
3. Cliquez sur **"Accéder à phpMyAdmin"**
4. Connectez-vous avec :
   - Utilisateur : `u169114354_bbf_user`
   - Mot de passe : `0lV2fqX^Z`

### 1.2 Exécuter le script SQL

1. Dans phpMyAdmin, cliquez sur l'onglet **"SQL"** en haut
2. **Copiez TOUT le contenu** du fichier `mysql-schema.sql`
3. **Collez-le** dans la zone de texte
4. Cliquez sur **"Exécuter"** (ou "Go")
5. ✅ Vous devriez voir : **"X requêtes exécutées avec succès"**

---

## 🎯 ÉTAPE 2 : INSTALLER LES DÉPENDANCES MySQL

### 2.1 Installer mysql2

Dans votre terminal (sur votre ordinateur) :

```bash
npm install mysql2
```

### 2.2 Copier le fichier .env.local

```bash
cp .env.local.example .env.local
```

Le fichier `.env.local` contient déjà vos identifiants MySQL.

---

## 🎯 ÉTAPE 3 : TESTER LA CONNEXION EN LOCAL

### 3.1 Créer un script de test

Le fichier `/lib/mysql.ts` est déjà créé avec une fonction `testConnection()`.

### 3.2 Tester la connexion

Dans votre terminal :

```bash
npm run dev
```

Ouvrez votre navigateur sur `http://localhost:3000` et vérifiez la console.

---

## 🎯 ÉTAPE 4 : MIGRER LES DONNÉES DE SUPABASE VERS MySQL

### Option A : Migration manuelle via phpMyAdmin

1. **Exporter depuis Supabase** :
   - Allez sur votre dashboard Supabase
   - Table Editor → Sélectionnez chaque table
   - Export → CSV

2. **Importer dans MySQL** :
   - phpMyAdmin → Sélectionnez la table
   - Onglet "Importer"
   - Choisissez le fichier CSV
   - Cliquez sur "Exécuter"

### Option B : Migration automatique (script à venir)

Un script de migration automatique sera créé si nécessaire.

---

## 🎯 ÉTAPE 5 : MODIFIER LE CODE POUR UTILISER MySQL

### 5.1 Remplacer les imports Supabase

**AVANT (Supabase) :**
```typescript
import * as SupabaseStore from '@/lib/supabase-store'
```

**APRÈS (MySQL) :**
```typescript
import * as MySQLStore from '@/lib/mysql-store'
```

### 5.2 Créer `/lib/mysql-store.ts`

Ce fichier contiendra toutes les fonctions pour interagir avec MySQL (équivalent de `supabase-store.ts`).

---

## 🎯 ÉTAPE 6 : DÉPLOYER SUR HOSTINGER

### 6.1 Compiler le projet Next.js

```bash
npm run build
```

### 6.2 Préparer les fichiers pour Hostinger

Hostinger supporte Node.js. Vous devrez :

1. **Uploader les fichiers** via FTP ou File Manager
2. **Configurer Node.js** dans le panel Hostinger
3. **Installer les dépendances** sur le serveur
4. **Démarrer l'application**

### 6.3 Configuration Node.js sur Hostinger

1. Panel Hostinger → **"Advanced"** → **"Node.js"**
2. Sélectionnez la version Node.js (18.x ou 20.x)
3. Définissez le **"Application Root"** : `/public_html`
4. Définissez le **"Application Startup File"** : `server.js` (à créer)
5. Cliquez sur **"Create"**

---

## 🎯 ÉTAPE 7 : CRÉER LE FICHIER server.js

Créez un fichier `server.js` à la racine du projet :

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

---

## 🎯 ÉTAPE 8 : UPLOADER SUR HOSTINGER

### 8.1 Via FTP (Recommandé)

1. Téléchargez **FileZilla** (gratuit)
2. Connectez-vous avec vos identifiants FTP Hostinger
3. Uploadez TOUS les fichiers du projet dans `/public_html/`

### 8.2 Via File Manager

1. Compressez votre projet en `.zip`
2. Uploadez le fichier `.zip` via File Manager
3. Décompressez-le dans `/public_html/`

---

## 🎯 ÉTAPE 9 : INSTALLER LES DÉPENDANCES SUR LE SERVEUR

Via SSH (si disponible) ou via le terminal Hostinger :

```bash
cd /public_html
npm install --production
```

---

## 🎯 ÉTAPE 10 : DÉMARRER L'APPLICATION

Dans le panel Node.js de Hostinger :

1. Cliquez sur **"Start Application"**
2. Vérifiez que le statut est **"Running"**
3. Visitez votre site : `https://bbf-immobilier.com`

---

## ✅ CHECKLIST FINALE

- [ ] Tables MySQL créées dans phpMyAdmin
- [ ] Dépendance `mysql2` installée
- [ ] Fichier `.env.local` configuré
- [ ] Connexion MySQL testée en local
- [ ] Données migrées de Supabase vers MySQL
- [ ] Code modifié pour utiliser MySQL
- [ ] Projet compilé (`npm run build`)
- [ ] Fichier `server.js` créé
- [ ] Fichiers uploadés sur Hostinger
- [ ] Dépendances installées sur le serveur
- [ ] Application démarrée
- [ ] Site accessible sur bbf-immobilier.com

---

## 🆘 EN CAS DE PROBLÈME

### Erreur de connexion MySQL

Vérifiez que :
- Le mot de passe dans `.env.local` est correct
- L'hôte est bien `localhost` (sur Hostinger)
- Le port est `3306`

### Application ne démarre pas

Vérifiez les logs dans le panel Node.js de Hostinger.

### Site inaccessible

Vérifiez que :
- Le domaine pointe bien vers Hostinger
- L'application Node.js est en statut "Running"
- Le fichier `server.js` existe

---

## 📞 SUPPORT

Si vous rencontrez des problèmes, contactez le support Hostinger ou consultez leur documentation Node.js.

---

**Bonne migration ! 🚀**
