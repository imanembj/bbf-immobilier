/**
 * Script pour mettre à jour tous les mots de passe en clair vers bcrypt
 */

const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

async function updatePasswordsToBcrypt() {
  console.log('\n🔐 Mise à jour des mots de passe vers bcrypt\n')

  try {
    // Connexion à la base de données
    console.log('📡 Connexion à la base de données...')
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'srv934.hstgr.io',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER || 'u169114354_bbf_user',
      password: process.env.MYSQL_PASSWORD || '0lV2fqX^Z',
      database: process.env.MYSQL_DATABASE || 'u169114354_bbf_new',
    })

    console.log('✅ Connecté à la base de données\n')

    // Récupérer tous les utilisateurs
    const [users] = await connection.execute(
      'SELECT id, email, password_hash FROM admin_users'
    )

    console.log(`📊 ${users.length} utilisateur(s) trouvé(s)\n`)

    let updated = 0

    for (const user of users) {
      // Vérifier si le mot de passe est déjà hashé (commence par $2a$ ou $2b$ pour bcrypt)
      if (user.password_hash.startsWith('$2a$') || user.password_hash.startsWith('$2b$')) {
        console.log(`⏭️  ${user.email} - Déjà hashé (ignoré)`)
        continue
      }

      // Hasher le mot de passe en clair
      const hashedPassword = await bcrypt.hash(user.password_hash, 10)

      // Mettre à jour dans la base de données
      await connection.execute(
        'UPDATE admin_users SET password_hash = ? WHERE id = ?',
        [hashedPassword, user.id]
      )

      console.log(`✅ ${user.email} - Mot de passe hashé avec bcrypt`)
      updated++
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 RÉSUMÉ')
    console.log('='.repeat(60))
    console.log(`✅ Mots de passe mis à jour: ${updated}`)
    console.log(`⏭️  Déjà hashés (ignorés): ${users.length - updated}`)
    console.log('\n🔒 Tous les mots de passe sont maintenant sécurisés avec bcrypt!')
    console.log('='.repeat(60) + '\n')

    await connection.end()
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

updatePasswordsToBcrypt()
