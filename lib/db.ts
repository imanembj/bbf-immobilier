import mysql from 'mysql2/promise';

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'u169114354_bbf_user',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'u169114354_bbf_new',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Pool de connexions
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Helper pour exécuter des requêtes
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const connection = await getPool().getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows as T[];
  } finally {
    connection.release();
  }
}

// Helper pour exécuter une seule requête et retourner un résultat
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

// Helper pour les insertions
export async function insert(sql: string, params?: any[]): Promise<{ insertId: number; affectedRows: number }> {
  const connection = await getPool().getConnection();
  try {
    const [result] = await connection.execute(sql, params);
    const insertResult = result as mysql.ResultSetHeader;
    return {
      insertId: insertResult.insertId,
      affectedRows: insertResult.affectedRows,
    };
  } finally {
    connection.release();
  }
}

// Helper pour les mises à jour et suppressions
export async function execute(sql: string, params?: any[]): Promise<number> {
  const connection = await getPool().getConnection();
  try {
    const [result] = await connection.execute(sql, params);
    const executeResult = result as mysql.ResultSetHeader;
    return executeResult.affectedRows;
  } finally {
    connection.release();
  }
}

// Fermer le pool (utile pour les tests)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
