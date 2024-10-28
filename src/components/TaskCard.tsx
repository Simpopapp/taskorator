import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, UserIcon, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  assignee: string;
}

const TaskCard = ({ title, description, dueDate, priority, assignee }: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulated API call to update task status
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsCompleted(true);
      toast({
        title: "Tarefa concluída",
        description: "Status atualizado com sucesso",
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

  const isOverdue = new Date(dueDate) < new Date();

  return (
    <Card className={`w-full hover:shadow-lg transition-shadow animate-fade-in ${isCompleted ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {title}
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
            {!isCompleted && isOverdue && <AlertCircle className="w-5 h-5 text-red-500" />}
          </CardTitle>
          <Badge className={priorityColors[priority]}>{priority}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span className={isOverdue ? "text-red-500" : ""}>{dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            <span>{assignee}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={isCompleted ? "outline" : "default"}
          className="w-full"
          onClick={handleComplete}
          disabled={isLoading || isCompleted}
        >
          {isLoading ? (
            <>
              <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : isCompleted ? (
            "Concluída"
          ) : (
            "Marcar como concluída"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;