import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'leader' | 'member';
        };
        Insert: {
          id: string;
          role?: 'leader' | 'member';
        };
        Update: {
          id?: string;
          role?: 'leader' | 'member';
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string;
          due_date: string;
          priority: 'high' | 'medium' | 'low';
          assignee: string;
          status: 'pending' | 'completed';
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          due_date: string;
          priority?: 'high' | 'medium' | 'low';
          assignee: string;
          status?: 'pending' | 'completed';
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          due_date?: string;
          priority?: 'high' | 'medium' | 'low';
          assignee?: string;
          status?: 'pending' | 'completed';
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};