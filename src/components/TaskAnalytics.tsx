import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface TaskMetrics {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  weeklyProgress: {
    date: string;
    completed: number;
    total: number;
  }[];
}

// Simulando dados para demonstração
const mockMetrics: TaskMetrics = {
  completionRate: 89,
  totalTasks: 45,
  completedTasks: 40,
  overdueTasks: 2,
  weeklyProgress: [
    { date: "Seg", completed: 5, total: 7 },
    { date: "Ter", completed: 8, total: 8 },
    { date: "Qua", completed: 6, total: 8 },
    { date: "Qui", completed: 7, total: 7 },
    { date: "Sex", completed: 9, total: 10 },
    { date: "Sab", completed: 3, total: 3 },
    { date: "Dom", completed: 2, total: 2 },
  ],
};

const TaskAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                <h3 className="text-2xl font-bold">{mockMetrics.completionRate}%</h3>
              </div>
            </div>
            <Progress value={mockMetrics.completionRate} className="mt-4" />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Tarefas</p>
                <h3 className="text-2xl font-bold">{mockMetrics.totalTasks}</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {mockMetrics.completedTasks} concluídas
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tarefas Atrasadas</p>
                <h3 className="text-2xl font-bold">{mockMetrics.overdueTasks}</h3>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Card className="p-6 glass-card">
        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="progress">Progresso Semanal</TabsTrigger>
            <TabsTrigger value="completion">Taxa de Conclusão</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMetrics.weeklyProgress}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="completion">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Média de Conclusão</h4>
                  <p className="text-sm text-muted-foreground">
                    Baseado nos últimos 7 dias
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {mockMetrics.completionRate}%
                </div>
              </div>
              <Progress value={mockMetrics.completionRate} />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TaskAnalytics;