import { supabase } from './supabase';
import { Task } from './api-types';

export const api = {
  tasks: {
    list: async () => {
      try {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('role')
          .single();

        let query = supabase.from('tasks').select('*');
        
        if (userProfile?.role === 'member') {
          const { data: { user } } = await supabase.auth.getUser();
          query = query.eq('assignee', user?.email);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Task[];
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
      }
    },

    create: async (task: Partial<Task>) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
          .from('tasks')
          .insert([{
            ...task,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'pending',
            created_by: user.email,
          }])
          .select()
          .single();
        
        if (error) throw error;
        return data as Task;
      } catch (error) {
        console.error('Error creating task:', error);
        throw error;
      }
    },

    update: async (id: string, task: Partial<Task>) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

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
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },

    delete: async (id: string) => {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    }
  }
};