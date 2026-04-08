const fs = require('fs');
const path = require('path');

// Configuration
const SQL_FILE = './insert-data-mysql.sql';
const OUTPUT_DIR = './extracted-images';
const OUTPUT_SQL = './insert-data-mysql-no-images.sql';

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🚀 Début de l\'extraction des images...\n');
console.log('⏳ Lecture du fichier SQL (cela peut prendre quelques secondes)...\n');

let propertyCount = 0;
let imageCount = 0;

// Fonction pour extraire et sauvegarder une image base64
function saveBase64Image(base64String, propertyId, imageIndex) {
  try {
    // Extraire le type MIME et les données
    const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.warn(`⚠️  Format base64 invalide pour ${propertyId}-${imageIndex}`);
      return null;
    }

    const extension = matches[1];
    const data = matches[2];
    
    // Nom du fichier
    const filename = `property-${propertyId}-${imageIndex}.${extension}`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    // Sauvegarder l'image
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    
    imageCount++;
    return filename;
  } catch (error) {
    console.error(`❌ Erreur lors de la sauvegarde de l'image ${propertyId}-${imageIndex}:`, error.message);
    return null;
  }
}

// Lire tout le fichier en mémoire
const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');

// Trouver la section INSERT INTO properties
const propertiesStart = sqlContent.indexOf('INSERT INTO properties');
const propertiesEnd = sqlContent.indexOf('ON DUPLICATE KEY UPDATE', propertiesStart);

if (propertiesStart === -1 || propertiesEnd === -1) {
  console.error('❌ Section properties non trouvée dans le fichier SQL');
  process.exit(1);
}

// Extraire la section properties
const beforeProperties = sqlContent.substring(0, propertiesStart);
const propertiesSection = sqlContent.substring(propertiesStart, propertiesEnd);
const afterProperties = sqlContent.substring(propertiesEnd);

console.log('✅ Section properties trouvée\n');

// Traiter chaque propriété (séparées par "),\n(")
let modifiedPropertiesSection = propertiesSection;

// Regex pour trouver les tableaux d'images avec base64
const imageArrayRegex = /'\[([^\]]*data:image[^\]]*)\]'/g;

let match;
while ((match = imageArrayRegex.exec(propertiesSection)) !== null) {
  const fullMatch = match[0];
  const arrayContent = match[1];
  
  // Trouver l'ID de la propriété pour cette entrée
  const beforeMatch = propertiesSection.substring(0, match.index);
  const lastOpenParen = beforeMatch.lastIndexOf("('");
  const idMatch = propertiesSection.substring(lastOpenParen).match(/\('([^']+)'/);
  const propertyId = idMatch ? idMatch[1] : `unknown-${propertyCount}`;
  
  try {
    // Parser le tableau d'images
    const imagesJson = '[' + arrayContent + ']';
    const imagesArray = JSON.parse(imagesJson.replace(/\\"/g, '"'));
    
    if (Array.isArray(imagesArray) && imagesArray.length > 0) {
      console.log(`📸 Propriété ${propertyId}: ${imagesArray.length} image(s) trouvée(s)`);
      propertyCount++;
      
      // Extraire et sauvegarder chaque image
      const newImageUrls = [];
      imagesArray.forEach((base64Image, index) => {
        if (typeof base64Image === 'string' && base64Image.startsWith('data:image')) {
          const filename = saveBase64Image(base64Image, propertyId, index + 1);
          if (filename) {
            // Remplacer par l'URL Hostinger
            newImageUrls.push(`https://votre-domaine.com/images/properties/${filename}`);
          }
        } else {
          // Garder les URLs existantes
          newImageUrls.push(base64Image);
        }
      });
      
      // Créer le nouveau tableau JSON
      const newImagesJson = JSON.stringify(newImageUrls).replace(/"/g, '\\"');
      const newMatch = `'${newImagesJson}'`;
      
      // Remplacer dans le contenu
      modifiedPropertiesSection = modifiedPropertiesSection.replace(fullMatch, newMatch);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de la propriété ${propertyId}:`, error.message);
  }
}

// Reconstruire le fichier SQL
const newSqlContent = beforeProperties + modifiedPropertiesSection + afterProperties;

console.log('\n✅ Extraction terminée !');
console.log(`📊 Statistiques:`);
console.log(`   - Propriétés traitées: ${propertyCount}`);
console.log(`   - Images extraites: ${imageCount}`);
console.log(`   - Dossier de sortie: ${OUTPUT_DIR}`);

// Sauvegarder le nouveau fichier SQL
console.log('\n💾 Création du nouveau fichier SQL...');
fs.writeFileSync(OUTPUT_SQL, newSqlContent);

const originalSize = fs.statSync(SQL_FILE).size;
const newSize = fs.statSync(OUTPUT_SQL).size;
const reduction = ((1 - newSize / originalSize) * 100).toFixed(2);

console.log(`✅ Nouveau fichier SQL créé: ${OUTPUT_SQL}`);
console.log(`📉 Réduction de taille: ${reduction}% (${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB)`);

console.log('\n📝 Prochaines étapes:');
console.log('   1. Vérifiez les images dans le dossier:', OUTPUT_DIR);
console.log('   2. Uploadez les images sur Hostinger dans /public_html/images/properties/');
console.log('   3. Modifiez les URLs dans le fichier SQL avec votre vrai domaine');
console.log('   4. Importez le nouveau fichier SQL dans votre base de données');
