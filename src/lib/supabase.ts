import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Клиент для клиентской стороны (с anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
})

// Клиент для серверной стороны (с service role key) - обходит RLS
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Типы для базы данных
export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          order_number: string | null
          name: string
          phone: string
          email: string | null
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string | null
          name: string
          phone: string
          email?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string | null
          name?: string
          phone?: string
          email?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_files: {
        Row: {
          id: string
          order_id: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}