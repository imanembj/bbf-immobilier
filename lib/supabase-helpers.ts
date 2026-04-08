import { supabase } from './supabase'

export async function saveClientRequest(request: any) {
  const { error } = await supabase
    .from('client_requests')
    .insert([request])
  
  if (error) {
    console.error('Erreur Supabase client_requests:', error)
    throw error
  }
}

export async function saveMessage(message: any) {
  const { error } = await supabase
    .from('messages')
    .insert([message])
  
  if (error) {
    console.error('Erreur Supabase messages:', error)
    throw error
  }
}
