import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, UserIcon, CheckCircle, AlertCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/lib/api-types";
import { useTaskDialog } from "@/hooks/useTaskDialog";
import { useTaskMutations } from "@/hooks/useTaskMutations";
import { TaskCardActions } from "./TaskCardActions";
import { TaskCardContent } from "./TaskCardContent";
import { TaskCardHeader } from "./TaskCardHeader";

interface TaskCardProps extends Task {}

const TaskCard = (props: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(props.status === "completed");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const { openDialog } = useTaskDialog();
  const { updateTask, deleteTask } = useTaskMutations();

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await updateTask.mutateAsync({ 
        id: props.id, 
        status: isCompleted ? "pending" : "completed" 
      });
      setIsCompleted(!isCompleted);
      toast({
        title: isCompleted ? "Tarefa reaberta" : "Tarefa concluída",
        description: "Status atualizado com sucesso",
        className: "glass-card",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(props.id);
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi excluída com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tarefa",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`
          glass-card hover-scale cursor-pointer
          ${isCompleted ? 'opacity-75' : ''}
          ${isExpanded ? 'ring-2 ring-primary' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TaskCardHeader 
          title={props.title}
          priority={props.priority}
          isCompleted={isCompleted}
          isOverdue={new Date(props.dueDate) < new Date()}
        />
        
        <TaskCardContent 
          isExpanded={isExpanded}
          description={props.description}
          dueDate={props.dueDate}
          assignee={props.assignee}
        />

        <TaskCardActions 
          isCompleted={isCompleted}
          isLoading={isLoading}
          onComplete={handleComplete}
          onEdit={() => openDialog(props)}
          onDelete={() => setShowDeleteDialog(true)}
          showDeleteDialog={showDeleteDialog}
          onDeleteConfirm={handleDelete}
          onDeleteDialogChange={setShowDeleteDialog}
        />
      </Card>
    </motion.div>
  );
};

export default TaskCard;