import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCard from "@/components/TaskCard";
import EmployeeCard from "@/components/EmployeeCard";
import AudioRecorder from "@/components/AudioRecorder";
import FileUpload from "@/components/FileUpload";
import StatsCard from "@/components/StatsCard";
import { Users, ListTodo, Upload, TrendingUp, Activity, CheckCircle } from "lucide-react";

const tasks = [
  {
    title: "Desenvolver nova feature",
    description: "Implementar sistema de notificações push",
    dueDate: "2024-03-20",
    priority: "high",
    assignee: "João Silva",
  },
  {
    title: "Revisar documentação",
    description: "Atualizar documentação da API",
    dueDate: "2024-03-22",
    priority: "medium",
    assignee: "Maria Santos",
  },
] as const;

const employees = [
  {
    name: "João Silva",
    role: "Desenvolvedor Frontend",
    status: "online",
    avatar: "/avatars/joao.jpg",
    taskCount: 3,
  },
  {
    name: "Maria Santos",
    role: "UX Designer",
    status: "busy",
    avatar: "/avatars/maria.jpg",
    taskCount: 2,
  },
] as const;

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <header className="text-center md:text-left animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Gerencie suas tarefas e equipe de forma inteligente
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in" style={{ '--animation-delay': '0.2s' } as React.CSSProperties}>
          <StatsCard
            title="Tarefas Ativas"
            value="12"
            icon={<ListTodo className="h-4 w-4 text-primary" />}
            trend={{ value: 12, isPositive: true }}
            className="glass-effect"
          />
          <StatsCard
            title="Funcionários"
            value="8"
            icon={<Users className="h-4 w-4 text-primary" />}
            className="glass-effect"
          />
          <StatsCard
            title="Arquivos Processados"
            value="45"
            icon={<Upload className="h-4 w-4 text-primary" />}
            trend={{ value: 23, isPositive: true }}
            className="glass-effect"
          />
          <StatsCard
            title="Taxa de Conclusão"
            value="89%"
            icon={<Activity className="h-4 w-4 text-primary" />}
            trend={{ value: 7, isPositive: true }}
            className="glass-effect"
          />
        </div>

        <Tabs defaultValue="tasks" className="space-y-6 animate-fade-in" style={{ '--animation-delay': '0.4s' } as React.CSSProperties}>
          <TabsList className="w-full justify-start space-x-2 rounded-lg bg-white/80 backdrop-blur-sm p-1 border border-gray-200">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <ListTodo className="h-4 w-4 mr-2" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <div key={index} className="animate-fade-in" style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}>
                  <TaskCard {...task} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employees.map((employee, index) => (
              <div key={index} className="animate-fade-in" style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}>
                <EmployeeCard {...employee} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="upload" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Gravação de Áudio
              </h3>
              <AudioRecorder />
            </div>
            <div className="space-y-4 animate-fade-in" style={{ '--animation-delay': '0.1s' } as React.CSSProperties}>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4 text-primary" />
                Upload de Arquivo
              </h3>
              <FileUpload />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;