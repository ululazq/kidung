import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.PUBLIC_SUPABASE_URL
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey)
}

let client: SupabaseClient | null = null

/**
 * Klien Supabase browser. Situs Kidung statis, jadi auth memakai implicit
 * flow: `signInWithOAuth` mengarahkan ke Google, Google kembali ke
 * /auth/callback membawa token di URL hash, lalu session disimpan ke
 * localStorage oleh supabase-js. Data pengguna dilindungi RLS di database.
 *
 * Mengembalikan null bila `.env` belum diisi — seluruh UI login otomatis
 * tersembunyi, situs tetap berfungsi seperti sebelumnya.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (client) return client

  client = createClient(url!, anonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'implicit',
    },
  })
  return client
}
