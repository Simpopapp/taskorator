import { create } from "zustand";
import { Task } from "@/lib/api-types";

interface TaskDialogStore {
  isOpen: boolean;
  task?: Task;
  openDialog: (task?: Task) => void;
  closeDialog: () => void;
}

export const useTaskDialog = create<TaskDialogStore>((set) => ({
  isOpen: false,
  task: undefined,
  openDialog: (task) => set({ isOpen: true, task }),
  closeDialog: () => set({ isOpen: false, task: undefined }),
}));