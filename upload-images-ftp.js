const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// Configuration FTP
const FTP_CONFIG = {
  host: '89.116.147.97',
  user: 'u169114354.bbf-immobilier.com',
  password: 'tqDs/X2p$2nbpL:5',
  port: 21,
  secure: false
};

const LOCAL_DIR = './extracted-images';
const REMOTE_DIR = '/public_html/images/properties';

async function uploadImages() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    console.log('🔌 Connexion au serveur FTP...');
    await client.access(FTP_CONFIG);
    console.log('✅ Connecté avec succès!\n');
    
    // Créer les dossiers nécessaires
    console.log('📁 Création des dossiers...');
    try {
      await client.ensureDir('/public_html/images');
      await client.ensureDir('/public_html/images/properties');
      console.log('✅ Dossiers créés\n');
    } catch (err) {
      console.log('ℹ️  Dossiers déjà existants\n');
    }
    
    // Lister les fichiers à uploader
    const files = fs.readdirSync(LOCAL_DIR).filter(f => 
      f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png')
    );
    
    console.log(`📸 ${files.length} images à uploader...\n`);
    
    // Uploader chaque fichier
    let uploaded = 0;
    for (const file of files) {
      const localPath = path.join(LOCAL_DIR, file);
      const remotePath = `${REMOTE_DIR}/${file}`;
      
      try {
        await client.uploadFrom(localPath, remotePath);
        uploaded++;
        console.log(`✅ [${uploaded}/${files.length}] ${file}`);
      } catch (err) {
        console.error(`❌ Erreur pour ${file}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Upload terminé! ${uploaded}/${files.length} images uploadées`);
    
  } catch (err) {
    console.error('❌ Erreur FTP:', err.message);
  } finally {
    client.close();
  }
}

// Vérifier que le package basic-ftp est installé
try {
  require.resolve('basic-ftp');
  uploadImages();
} catch (e) {
  console.log('📦 Installation du package basic-ftp...\n');
  const { execSync } = require('child_process');
  execSync('npm install basic-ftp', { stdio: 'inherit' });
  console.log('\n✅ Package installé! Relancez le script.\n');
}
