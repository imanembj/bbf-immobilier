import { query } from './db'

export async function saveClientRequest(request: any) {
  try {
    const fields = Object.keys(request).join(', ')
    const placeholders = Object.keys(request).map(() => '?').join(', ')
    const values = Object.values(request)
    
    await query(
      `INSERT INTO client_requests (${fields}) VALUES (${placeholders})`,
      values
    )
  } catch (error) {
    console.error('Erreur MySQL client_requests:', error)
    throw error
  }
}

export async function saveMessage(message: any) {
  try {
    const fields = Object.keys(message).join(', ')
    const placeholders = Object.keys(message).map(() => '?').join(', ')
    const values = Object.values(message)
    
    await query(
      `INSERT INTO messages (${fields}) VALUES (${placeholders})`,
      values
    )
  } catch (error) {
    console.error('Erreur MySQL messages:', error)
    throw error
  }
}
