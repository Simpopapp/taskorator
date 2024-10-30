export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  status: "online" | "busy" | "offline";
  avatar: string;
  taskCount: number;
  email: string;
}

export interface AudioTranscription {
  text: string;
  confidence: number;
  metadata: {
    duration: number;
    wordCount: number;
  }
}

export interface TaskAnalysis {
  type: "task";
  priority: Task["priority"];
  dueDate?: string;
  assignee?: string;
  confidence: number;
}