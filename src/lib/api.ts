import { Task, Employee, AudioTranscription, TaskAnalysis } from "./api-types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  tasks: {
    list: () => fetchWithAuth("/tasks"),
    create: (task: Partial<Task>) => fetchWithAuth("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),
    update: (id: string, task: Partial<Task>) => fetchWithAuth(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
    }),
    delete: (id: string) => fetchWithAuth(`/tasks/${id}`, {
      method: "DELETE",
    }),
  },
  employees: {
    list: () => fetchWithAuth("/employees"),
    update: (id: string, status: Employee["status"]) => fetchWithAuth(`/employees/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  },
  audio: {
    transcribe: async (audioBlob: Blob): Promise<AudioTranscription> => {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      
      const response = await fetch(`${API_URL}/audio/transcribe`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Falha ao transcrever áudio");
      }
      
      return response.json();
    },
    analyze: (text: string): Promise<TaskAnalysis> => 
      fetchWithAuth("/audio/analyze", {
        method: "POST",
        body: JSON.stringify({ text }),
      }),
  },
  files: {
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch(`${API_URL}/files/upload`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Falha ao enviar arquivo");
      }
      
      return response.json();
    },
  },
};