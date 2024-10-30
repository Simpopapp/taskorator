import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/lib/api-types";

interface TaskCardHeaderProps {
  title: string;
  priority: Task["priority"];
  isCompleted: boolean;
  isOverdue: boolean;
}

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-yellow-500 text-white",
  low: "bg-green-500 text-white",
};

export const TaskCardHeader = ({ title, priority, isCompleted, isOverdue }: TaskCardHeaderProps) => (
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
);