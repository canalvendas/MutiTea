import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SavedAnamnese } from "@/pages/Profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

interface SavedAnamnesesListProps {
  anamneses: SavedAnamnese[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatLabel = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const SavedAnamnesesList = ({ anamneses, onEdit, onDelete }: SavedAnamnesesListProps) => {
  if (anamneses.length === 0) {
    return <p className="text-muted-foreground text-center py-4">Nenhuma anamnese salva ainda.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {anamneses.map((anamnese) => (
        <AccordionItem value={anamnese.id} key={anamnese.id}>
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="text-left">
                <p className="font-semibold">{anamnese.patientName}</p>
                <p className="text-sm text-muted-foreground">
                  Data: {new Date(anamnese.submissionDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{anamnese.specialty}</Badge>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden md:flex">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {Object.entries(anamnese.data).map(([key, value]) => {
              if (key === 'patientName' || !value || (Array.isArray(value) && value.length === 0)) {
                return null;
              }

              return (
                <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-x-4 text-sm">
                  <dt className="font-medium text-muted-foreground col-span-1">{formatLabel(key)}</dt>
                  <dd className="text-foreground col-span-2">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </dd>
                </div>
              );
            })}
            <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(anamnese.id); }}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(anamnese.id); }}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};