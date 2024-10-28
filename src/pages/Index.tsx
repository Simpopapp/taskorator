import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCard from "@/components/TaskCard";
import EmployeeCard from "@/components/EmployeeCard";
import AudioRecorder from "@/components/AudioRecorder";
import FileUpload from "@/components/FileUpload";
import { Users, ListTodo, Upload } from "lucide-react";

// Mock data
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Gerencie suas tarefas e equipe</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="w-5 h-5" />
                Tarefas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">12</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Funcionários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">8</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Arquivos Processados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">45</span>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            {tasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </TabsContent>

          <TabsContent value="team" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee, index) => (
              <EmployeeCard key={index} {...employee} />
            ))}
          </TabsContent>

          <TabsContent value="upload" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Gravação de Áudio</h3>
              <AudioRecorder />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload de Arquivo</h3>
              <FileUpload />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;