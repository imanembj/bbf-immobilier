# 🚀 GUIDE DE DÉPLOIEMENT FINAL - HOSTINGER

## ✅ CE QUI EST FAIT

1. ✅ **Base de données MySQL créée** sur Hostinger
   - Nom : `u169114354_bbf_new`
   - Utilisateur : `u169114354_bbf_user`
   - Mot de passe : `0lV2fqX^Z`
   - Toutes les tables créées avec succès

2. ✅ **Code migré vers MySQL**
   - `/lib/mysql.ts` - Connexion MySQL
   - `/lib/mysql-store.ts` - Toutes les fonctions de données
   - Tous les imports changés de `supabase-store` vers `mysql-store`

3. ✅ **Code sauvegardé sur GitHub**
   - Repository : https://github.com/imanembj/bbf-immobilier
   - 152 fichiers uploadés

---

## 📋 PROCHAINES ÉTAPES

### ÉTAPE 1 : DÉPLOYER SUR HOSTINGER

#### Option A : Via Git (Recommandé)

1. **Connectez-vous à Hostinger**
2. **Allez dans "Git"** (dans le menu)
3. **Créez un nouveau déploiement Git** :
   - Repository URL : `https://github.com/imanembj/bbf-immobilier.git`
   - Branch : `main`
   - Deployment path : `/public_html`
4. **Cliquez sur "Deploy"**

#### Option B : Via FTP

1. **Téléchargez FileZilla** (gratuit)
2. **Connectez-vous avec vos identifiants FTP Hostinger**
3. **Uploadez TOUS les fichiers** dans `/public_html/`

---

### ÉTAPE 2 : CONFIGURER Node.js SUR HOSTINGER

1. **Panel Hostinger** → **Advanced** → **Node.js**
2. **Créer une application Node.js** :
   - Version Node.js : **18.x** ou **20.x**
   - Application root : `/public_html`
   - Application startup file : `server.js`
   - Application mode : **Production**

3. **Variables d'environnement** :
   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=u169114354_bbf_new
   MYSQL_USER=u169114354_bbf_user
   MYSQL_PASSWORD=0lV2fqX^Z
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://bbf-immobilier.com
   ```

---

### ÉTAPE 3 : CRÉER LE FICHIER server.js

**Sur Hostinger**, créez un fichier `server.js` à la racine :

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

### ÉTAPE 4 : INSTALLER LES DÉPENDANCES

**Via SSH** (si disponible) ou **Terminal Hostinger** :

```bash
cd /public_html
npm install --production
npm run build
```

---

### ÉTAPE 5 : DÉMARRER L'APPLICATION

Dans le **panel Node.js** de Hostinger :
1. Cliquez sur **"Start Application"**
2. Vérifiez que le statut est **"Running"**

---

### ÉTAPE 6 : CONFIGURER LE DOMAINE

1. **Panel Hostinger** → **Domaines**
2. **Pointez bbf-immobilier.com** vers l'application Node.js
3. **Activez HTTPS/SSL** (Let's Encrypt gratuit)

---

## 🔄 DÉVELOPPEMENT LOCAL vs PRODUCTION

### **En LOCAL (votre Mac)** :
- Utilise **localStorage** (comme avant)
- Commande : `npm run dev`
- URL : http://localhost:3000

### **En PRODUCTION (Hostinger)** :
- Utilise **MySQL** automatiquement
- Les données sont dans la base MySQL
- URL : https://bbf-immobilier.com

---

## 📊 MIGRER LES DONNÉES DE SUPABASE VERS MySQL

### Option 1 : Export/Import manuel

1. **Depuis Supabase** :
   - Dashboard Supabase → Table Editor
   - Pour chaque table → Export → CSV

2. **Vers MySQL** :
   - phpMyAdmin → Sélectionnez la table
   - Onglet "Importer" → Choisissez le CSV
   - Cliquez sur "Exécuter"

### Option 2 : Script automatique (à créer si besoin)

---

## ✅ CHECKLIST DE DÉPLOIEMENT

- [ ] Code uploadé sur Hostinger (Git ou FTP)
- [ ] Node.js configuré (version 18.x ou 20.x)
- [ ] Variables d'environnement ajoutées
- [ ] Fichier `server.js` créé
- [ ] Dépendances installées (`npm install`)
- [ ] Build créé (`npm run build`)
- [ ] Application démarrée (statut "Running")
- [ ] Domaine pointé vers l'application
- [ ] HTTPS/SSL activé
- [ ] Données migrées de Supabase vers MySQL
- [ ] Site accessible sur bbf-immobilier.com

---

## 🆘 DÉPANNAGE

### Erreur : "Application failed to start"

Vérifiez les logs dans le panel Node.js de Hostinger.

### Erreur : "Cannot connect to MySQL"

Vérifiez que :
- Les variables d'environnement sont correctes
- L'hôte est bien `localhost`
- Le mot de passe est correct

### Site inaccessible

Vérifiez que :
- L'application Node.js est en statut "Running"
- Le domaine pointe bien vers Hostinger
- Le fichier `server.js` existe

---

## 📞 SUPPORT

- **Hostinger Support** : Chat en direct 24/7
- **Documentation** : https://support.hostinger.com

---

## 🎉 APRÈS LE DÉPLOIEMENT

Une fois le site en ligne :

1. ✅ Testez toutes les fonctionnalités
2. ✅ Ajoutez des biens via l'admin
3. ✅ Configurez Resend pour les emails
4. ✅ Partagez le site avec vos clients !

**Votre site sera accessible sur : https://bbf-immobilier.com** 🚀
