import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { Task } from "@/lib/api-types";
import { useTaskMutations } from "@/hooks/useTaskMutations";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useTaskDialog } from "@/hooks/useTaskDialog";

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const { openDialog } = useTaskDialog();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tarefas</h2>
        <Button onClick={() => openDialog()} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>
      <motion.div 
        className="grid gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <TaskCard {...task} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};