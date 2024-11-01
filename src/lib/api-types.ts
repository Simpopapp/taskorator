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
  createdBy: string;
}

export interface Employee {
  id: string;
  name: string;
  role: "leader" | "member";
  status: "online" | "busy" | "offline";
  avatar: string;
  taskCount: number;
  email: string;
}

export interface UserProfile {
  id: string;
  role: "leader" | "member";
}