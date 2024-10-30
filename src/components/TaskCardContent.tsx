import { CardContent } from "@/components/ui/card";
import { CalendarIcon, UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskCardContentProps {
  isExpanded: boolean;
  description: string;
  dueDate: string;
  assignee: string;
}

export const TaskCardContent = ({ isExpanded, description, dueDate, assignee }: TaskCardContentProps) => (
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
              <span className={new Date(dueDate) < new Date() ? "text-destructive" : ""}>
                {dueDate}
              </span>
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
);