import { supabase } from './supabase';
import { Task, Employee, AudioTranscription, TaskAnalysis } from './api-types';

export const api = {
  tasks: {
    list: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    },
    create: async (task: Partial<Task>) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...task,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'pending'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data as Task;
    },
    update: async (id: string, task: Partial<Task>) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...task,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Task;
    },
    delete: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },
  employees: {
    list: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*');
      
      if (error) throw error;
      return data as Employee[];
    },
    update: async (id: string, status: Employee['status']) => {
      const { error } = await supabase
        .from('employees')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    }
  },
  audio: {
    transcribe: async (audioBlob: Blob): Promise<AudioTranscription> => {
      const { data, error } = await supabase
        .from('audio_transcriptions')
        .insert([{ audio: audioBlob }])
        .select()
        .single();

      if (error) throw error;
      return {
        text: data.text,
        confidence: data.confidence,
        metadata: {
          duration: data.metadata.duration,
          wordCount: data.metadata.word_count
        }
      };
    },
  },
  files: {
    upload: async (file: File) => {
      const { data, error } = await supabase
        .storage
        .from('uploads')
        .upload(file.name, file);

      if (error) throw error;
      return { url: `https://your-supabase-url.storage.supabase.co/${data.path}` };
    }
  }
};
