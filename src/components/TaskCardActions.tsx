import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClockIcon, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TaskCardActionsProps {
  isCompleted: boolean;
  isLoading: boolean;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showDeleteDialog: boolean;
  onDeleteConfirm: () => void;
  onDeleteDialogChange: (show: boolean) => void;
}

export const TaskCardActions = ({
  isCompleted,
  isLoading,
  onComplete,
  onEdit,
  onDelete,
  showDeleteDialog,
  onDeleteConfirm,
  onDeleteDialogChange,
}: TaskCardActionsProps) => (
  <>
    <CardFooter className="p-4 flex gap-2">
      <Button
        variant={isCompleted ? "outline" : "default"}
        className="flex-1 hover-scale"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : isCompleted ? (
          "Reabrir"
        ) : (
          "Concluir"
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </CardFooter>

    <AlertDialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir tarefa</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteConfirm}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
);