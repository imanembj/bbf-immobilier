# 🔄 GUIDE DE MIGRATION DES DONNÉES - Supabase → MySQL Hostinger

## ⚠️ IMPORTANT

**Le script de migration doit être exécuté SUR HOSTINGER**, pas sur votre Mac local, car :
- MySQL Hostinger n'est accessible que depuis le serveur Hostinger
- Connexion directe impossible depuis l'extérieur

---

## 📋 MÉTHODE 1 : MIGRATION AUTOMATIQUE (Recommandé)

### **ÉTAPE 1 : Déployer le site sur Hostinger**

1. Uploadez TOUS les fichiers sur Hostinger (Git ou FTP)
2. Installez les dépendances : `npm install`
3. Vérifiez que le fichier `.env.local` contient vos identifiants Supabase ET MySQL

### **ÉTAPE 2 : Exécuter le script de migration**

**Via SSH ou Terminal Hostinger** :

```bash
cd /public_html
node migrate-supabase-to-mysql.js
```

Le script va :
- ✅ Se connecter à Supabase
- ✅ Récupérer TOUTES les données
- ✅ Les insérer dans MySQL Hostinger
- ✅ Afficher un résumé

### **ÉTAPE 3 : Vérifier**

Le script affichera :
```
📊 VÉRIFICATION DES DONNÉES MIGRÉES:

   properties: X lignes
   client_requests: X lignes
   messages: X lignes
   reviews: X lignes
   partners: X lignes
   faqs: X lignes
   blog_posts: X lignes
   settings: 1 lignes

🎉 MIGRATION TERMINÉE AVEC SUCCÈS!
```

---

## 📋 MÉTHODE 2 : MIGRATION MANUELLE (Alternative)

Si vous ne pouvez pas exécuter le script sur Hostinger :

### **Pour chaque table** :

#### **1. Export depuis Supabase**

1. Allez sur https://supabase.com
2. Connectez-vous à votre projet
3. **Table Editor** → Sélectionnez une table
4. Cliquez sur **"..."** (menu) → **Export** → **CSV**
5. Téléchargez le fichier CSV

#### **2. Import dans MySQL**

1. Allez sur **phpMyAdmin** (Hostinger)
2. Sélectionnez la base `u169114354_bbf_new`
3. Cliquez sur la table correspondante
4. Onglet **"Importer"**
5. Choisissez le fichier CSV
6. Format : **CSV**
7. Cliquez sur **"Exécuter"**

#### **Tables à migrer** :

- [ ] `properties` (Biens)
- [ ] `client_requests` (Demandes)
- [ ] `messages` (Messages)
- [ ] `reviews` (Avis)
- [ ] `partners` (Partenaires)
- [ ] `faqs` (FAQs)
- [ ] `blog_posts` (Articles)
- [ ] `settings` (Configuration)

---

## 📋 MÉTHODE 3 : MIGRATION LOCALE → MySQL (Si vous avez des données dans localStorage)

Si vos données sont dans **localStorage** (développement local) :

### **ÉTAPE 1 : Exporter depuis localStorage**

Créez un fichier `export-localstorage.html` :

```html
<!DOCTYPE html>
<html>
<head>
  <title>Export localStorage</title>
</head>
<body>
  <h1>Export localStorage</h1>
  <button onclick="exportData()">Exporter les données</button>
  <pre id="output"></pre>
  
  <script>
    function exportData() {
      const data = {
        properties: JSON.parse(localStorage.getItem('properties') || '[]'),
        clientRequests: JSON.parse(localStorage.getItem('clientRequests') || '[]'),
        messages: JSON.parse(localStorage.getItem('messages') || '[]'),
        reviews: JSON.parse(localStorage.getItem('reviews') || '[]'),
        partners: JSON.parse(localStorage.getItem('partners') || '[]'),
        faqs: JSON.parse(localStorage.getItem('faqs') || '[]'),
        blogPosts: JSON.parse(localStorage.getItem('blogPosts') || '[]'),
        settings: JSON.parse(localStorage.getItem('agencySettings') || '{}'),
      }
      
      const json = JSON.stringify(data, null, 2)
      document.getElementById('output').textContent = json
      
      // Télécharger
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'localstorage-export.json'
      a.click()
    }
  </script>
</body>
</html>
```

1. Ouvrez ce fichier dans votre navigateur
2. Cliquez sur "Exporter les données"
3. Un fichier JSON sera téléchargé

### **ÉTAPE 2 : Importer dans MySQL**

Créez un script `import-json-to-mysql.js` qui lit le JSON et insère dans MySQL.

---

## ✅ VÉRIFICATION APRÈS MIGRATION

### **1. Vérifier dans phpMyAdmin**

1. Allez dans phpMyAdmin
2. Sélectionnez chaque table
3. Onglet "Parcourir"
4. Vérifiez que les données sont là

### **2. Vérifier sur le site**

1. Allez sur https://bbf-immobilier.com
2. Vérifiez que les biens s'affichent
3. Vérifiez l'admin
4. Vérifiez les avis, partenaires, etc.

---

## 🆘 EN CAS DE PROBLÈME

### **Erreur : "Cannot connect to MySQL"**

Vérifiez que vous exécutez le script **SUR HOSTINGER**, pas en local.

### **Erreur : "Supabase credentials missing"**

Vérifiez que le fichier `.env.local` contient :
```
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-supabase
```

### **Données manquantes**

Vérifiez les logs du script pour voir quelle table a échoué.

---

## 📞 AIDE

Si vous avez besoin d'aide, contactez-moi avec :
- Les logs du script
- Le message d'erreur exact
- La table qui pose problème

---

## 🎯 RÉSUMÉ

**Méthode recommandée** : 
1. ✅ Déployer sur Hostinger
2. ✅ Exécuter `node migrate-supabase-to-mysql.js` sur le serveur
3. ✅ Vérifier les données

**C'est la méthode la plus rapide et la plus fiable !** 🚀
