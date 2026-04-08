// Script de test de connexion MySQL
// Exécuter avec: node test-mysql-connection.js

const mysql = require('mysql2/promise')

async function testConnection() {
  console.log('🔍 Test de connexion MySQL...\n')
  
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE || 'u169114354_bbf_new',
    user: process.env.MYSQL_USER || 'u169114354_bbf_user',
    password: process.env.MYSQL_PASSWORD || '0lV2fqX^Z',
  }
  
  console.log('📝 Configuration:')
  console.log(`   Host: ${config.host}`)
  console.log(`   Port: ${config.port}`)
  console.log(`   Database: ${config.database}`)
  console.log(`   User: ${config.user}`)
  console.log(`   Password: ${config.password.substring(0, 3)}***\n`)
  
  try {
    console.log('🔌 Connexion à MySQL...')
    const connection = await mysql.createConnection(config)
    console.log('✅ Connexion réussie!\n')
    
    // Tester une requête simple
    console.log('📊 Test de requête...')
    const [rows] = await connection.execute('SELECT 1 + 1 AS result')
    console.log('✅ Requête réussie:', rows)
    console.log('')
    
    // Lister les tables
    console.log('📋 Liste des tables:')
    const [tables] = await connection.execute('SHOW TABLES')
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0]
      console.log(`   ${index + 1}. ${tableName}`)
    })
    console.log('')
    
    // Compter les lignes dans chaque table
    console.log('📈 Nombre de lignes par table:')
    for (const table of tables) {
      const tableName = Object.values(table)[0]
      const [count] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`)
      console.log(`   ${tableName}: ${count[0].count} lignes`)
    }
    
    await connection.end()
    console.log('\n✅ Test terminé avec succès!')
    
  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message)
    console.error('\n💡 Vérifiez:')
    console.error('   1. Le mot de passe dans .env.local')
    console.error('   2. Que MySQL est accessible (localhost)')
    console.error('   3. Que la base de données existe')
    process.exit(1)
  }
}

testConnection()
