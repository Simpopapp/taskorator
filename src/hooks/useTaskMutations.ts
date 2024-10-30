import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Task } from "@/lib/api-types";
import { useToast } from "@/components/ui/use-toast";

export function useTaskMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTask = useMutation({
    mutationFn: api.tasks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa criada",
        description: "Nova tarefa adicionada com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar a tarefa",
        variant: "destructive",
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, ...task }: Partial<Task> & { id: string }) => 
      api.tasks.update(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa atualizada",
        description: "Status da tarefa atualizado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a tarefa",
        variant: "destructive",
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: api.tasks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi excluída com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tarefa",
        variant: "destructive",
      });
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
  };
}