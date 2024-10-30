import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskList } from "@/components/TaskList";
import EmployeeCard from "@/components/EmployeeCard";
import AudioRecorder from "@/components/AudioRecorder";
import FileUpload from "@/components/FileUpload";
import StatsCard from "@/components/StatsCard";
import TaskAnalytics from "@/components/TaskAnalytics";
import { ListTodo, Users, Upload, ChartLine } from "lucide-react";
import { motion } from "framer-motion";
import { TaskDialog } from "@/components/TaskDialog";
import { useTaskDialog } from "@/hooks/useTaskDialog";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Index = () => {
  const { isOpen, task, closeDialog } = useTaskDialog();
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.tasks.list,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <motion.header 
          className="text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas tarefas e equipe de forma inteligente
          </p>
        </motion.header>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <StatsCard
              title="Tarefas Ativas"
              value="12"
              icon={<ListTodo className="h-4 w-4 text-primary" />}
              trend={{ value: 12, isPositive: true }}
              className="glass-card"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Funcionários"
              value="8"
              icon={<Users className="h-4 w-4 text-primary" />}
              className="glass-card"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Arquivos Processados"
              value="45"
              icon={<Upload className="h-4 w-4 text-primary" />}
              trend={{ value: 23, isPositive: true }}
              className="glass-card"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Taxa de Conclusão"
              value="89%"
              icon={<Activity className="h-4 w-4 text-primary" />}
              trend={{ value: 7, isPositive: true }}
              className="glass-card"
            />
          </motion.div>
        </motion.div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="w-full justify-start space-x-2 rounded-lg glass-card p-1 inline-flex">
              <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ListTodo className="h-4 w-4 mr-2" />
                Tarefas
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="h-4 w-4 mr-2" />
                Equipe
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ChartLine className="h-4 w-4 mr-2" />
                Análise
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="tasks">
            <TaskList tasks={tasks} />
          </TabsContent>

          <TabsContent value="team">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {employees.map((employee, index) => (
                <motion.div key={index} variants={item}>
                  <EmployeeCard {...employee} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Gravação de Áudio
                </h3>
                <AudioRecorder />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Upload className="h-4 w-4 text-primary" />
                  Upload de Arquivo
                </h3>
                <FileUpload />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <TaskAnalytics />
          </TabsContent>
        </Tabs>
      </div>

      <TaskDialog 
        open={isOpen} 
        onOpenChange={closeDialog}
        task={task}
      />
    </div>
  );
};

export default Index;
