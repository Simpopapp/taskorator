import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <span className="text-sm text-gray-500">{status}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Tarefas ativas</span>
          <Badge variant="secondary">{taskCount}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;