import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Employee } from "@/lib/api-types";
import { useToast } from "@/components/ui/use-toast";

export function useEmployeeMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateEmployeeStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Employee["status"] }) =>
      api.employees.update(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Status atualizado",
        description: "Status do funcionário atualizado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    },
  });

  return {
    updateEmployeeStatus,
  };
}