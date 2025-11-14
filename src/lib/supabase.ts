import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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

// Типы для базы данных (будут обновлены после создания схемы)
export type Database = {
  public: {
    Tables: {
      // Здесь будут определены таблицы после создания схемы
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