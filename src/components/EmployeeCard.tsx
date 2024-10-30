import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface EmployeeCardProps {
  name: string;
  role: string;
  status: "online" | "busy" | "offline";
  avatar: string;
  taskCount: number;
}

const EmployeeCard = ({ name, role, status, avatar, taskCount }: EmployeeCardProps) => {
  const statusColors = {
    online: "bg-green-500",
    busy: "bg-yellow-500",
    offline: "bg-gray-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card hover-scale">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-12 h-12 ring-2 ring-primary/20">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary/5">
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`} />
            <span className="text-sm text-muted-foreground capitalize">{status}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tarefas ativas</span>
            <Badge variant="secondary" className="hover:bg-primary hover:text-white transition-colors">
              {taskCount}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmployeeCard;