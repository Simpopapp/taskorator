import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, UserIcon, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white",
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsCompleted(true);
      toast({
        title: "Tarefa concluída",
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

  const isOverdue = new Date(dueDate) < new Date();

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
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {title}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
                {!isCompleted && isOverdue && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardTitle>
            <Badge className={`${priorityColors[priority]} capitalize`}>{priority}</Badge>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span className={isOverdue ? "text-destructive" : ""}>{dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    <span>{assignee}</span>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>

        <CardFooter className="p-4">
          <Button
            variant={isCompleted ? "outline" : "default"}
            className="w-full hover-scale"
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
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
    </motion.div>
  );
};

export default TaskCard;