import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnamneseForm, AnamneseFormData } from "./AnamneseForm";
import { SavedAnamnese } from "@/pages/Profile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditAnamneseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  anamnese: SavedAnamnese | null;
  onSave: (data: AnamneseFormData) => void;
}

export const EditAnamneseDialog = ({ isOpen, onClose, anamnese, onSave }: EditAnamneseDialogProps) => {
  if (!anamnese) return null;

  const formId = "edit-anamnese-form";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Editar Anamnese</DialogTitle>
          <DialogDescription>
            Modifique os dados da anamnese de {anamnese.patientName}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] p-4 border rounded-md">
          <AnamneseForm
            id={formId}
            specialty={anamnese.specialty}
            initialData={anamnese.data}
            onSave={onSave}
            hideButtons
          />
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form={formId}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};