import mysql from 'mysql2/promise'

// Configuration de la connexion MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'u169114354_bbf_new',
  user: process.env.MYSQL_USER || 'u169114354_bbf_user',
  password: process.env.MYSQL_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// Helper pour exécuter des requêtes
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T[]
  } catch (error) {
    console.error('MySQL Query Error:', error)
    throw error
  }
}

// Helper pour exécuter une seule requête
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows.length > 0 ? rows[0] : null
}

// Helper pour insérer des données
export async function insert(table: string, data: Record<string, any>): Promise<any> {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map(() => '?').join(', ')
  
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`
  
  try {
    const [result] = await pool.execute(sql, values)
    return result
  } catch (error) {
    console.error('MySQL Insert Error:', error)
    throw error
  }
}

// Helper pour mettre à jour des données
export async function update(
  table: string,
  data: Record<string, any>,
  where: string,
  whereParams: any[]
): Promise<any> {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const setClause = keys.map(key => `${key} = ?`).join(', ')
  
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`
  
  try {
    const [result] = await pool.execute(sql, [...values, ...whereParams])
    return result
  } catch (error) {
    console.error('MySQL Update Error:', error)
    throw error
  }
}

// Helper pour supprimer des données
export async function deleteRow(table: string, where: string, whereParams: any[]): Promise<any> {
  const sql = `DELETE FROM ${table} WHERE ${where}`
  
  try {
    const [result] = await pool.execute(sql, whereParams)
    return result
  } catch (error) {
    console.error('MySQL Delete Error:', error)
    throw error
  }
}

// Tester la connexion
export async function testConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1')
    console.log('✅ MySQL connection successful!')
    return true
  } catch (error) {
    console.error('❌ MySQL connection failed:', error)
    return false
  }
}

export default pool
