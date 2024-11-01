import { supabase } from './supabase';
import { Task } from './api-types';

export const api = {
  tasks: {
    list: async () => {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .single();

      let query = supabase.from('tasks').select('*');
      
      // Se for membro, só vê suas próprias tarefas
      if (userProfile?.role === 'member') {
        const { data: { user } } = await supabase.auth.getUser();
        query = query.eq('assignee', user?.email);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    },

    create: async (task: Partial<Task>) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .single();

      if (!user) throw new Error('Usuário não autenticado');
      if (userProfile?.role !== 'leader') throw new Error('Apenas líderes podem criar tarefas');

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
    },

    update: async (id: string, task: Partial<Task>) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .single();

      if (!user) throw new Error('Usuário não autenticado');

      // Verifica se o usuário tem permissão para atualizar a tarefa
      const { data: taskData } = await supabase
        .from('tasks')
        .select('assignee, created_by')
        .eq('id', id)
        .single();

      if (!taskData) throw new Error('Tarefa não encontrada');

      if (userProfile?.role !== 'leader' && taskData.assignee !== user.email) {
        throw new Error('Sem permissão para atualizar esta tarefa');
      }

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
      const { data: { user } } = await supabase.auth.getUser();
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .single();

      if (!user) throw new Error('Usuário não autenticado');

      // Verifica se o usuário tem permissão para deletar a tarefa
      const { data: taskData } = await supabase
        .from('tasks')
        .select('created_by')
        .eq('id', id)
        .single();

      if (!taskData) throw new Error('Tarefa não encontrada');

      if (userProfile?.role !== 'leader' && taskData.created_by !== user.email) {
        throw new Error('Sem permissão para deletar esta tarefa');
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  }
};