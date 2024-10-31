import { Task, Employee, AudioTranscription, TaskAnalysis } from "./api-types";

// Dados mockados para demonstração
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Desenvolver nova feature",
    description: "Implementar sistema de notificações",
    dueDate: "2024-03-20",
    priority: "high",
    assignee: "João Silva",
    status: "pending",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  },
  {
    id: "2",
    title: "Revisar pull request",
    description: "Revisar código da feature de autenticação",
    dueDate: "2024-03-15",
    priority: "medium",
    assignee: "Maria Santos",
    status: "completed",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-10"
  }
];

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  tasks: {
    list: async () => {
      await delay(500); // Simula delay de rede
      return mockTasks;
    },
    create: async (task: Partial<Task>) => {
      await delay(500);
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || new Date().toISOString(),
        priority: task.priority || "medium",
        assignee: task.assignee || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockTasks.push(newTask);
      return newTask;
    },
    update: async (id: string, task: Partial<Task>) => {
      await delay(500);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error("Task not found");
      
      mockTasks[index] = {
        ...mockTasks[index],
        ...task,
        updatedAt: new Date().toISOString()
      };
      return mockTasks[index];
    },
    delete: async (id: string) => {
      await delay(500);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error("Task not found");
      mockTasks.splice(index, 1);
    }
  },
  employees: {
    list: async () => {
      await delay(500);
      return [];
    },
    update: async (id: string, status: Employee["status"]) => {
      await delay(500);
      return { success: true };
    }
  },
  audio: {
    transcribe: async (audioBlob: Blob): Promise<AudioTranscription> => {
      await delay(1000);
      return {
        text: "Exemplo de transcrição de áudio",
        confidence: 0.95,
        metadata: {
          duration: 60,
          wordCount: 100
        }
      };
    },
    analyze: async (text: string): Promise<TaskAnalysis> => {
      await delay(1000);
      return {
        type: "task",
        priority: "medium",
        confidence: 0.8
      };
    }
  },
  files: {
    upload: async (file: File) => {
      await delay(1000);
      return { url: "https://exemplo.com/arquivo.pdf" };
    }
  }
};