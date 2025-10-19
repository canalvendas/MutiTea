import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SavedAnamnese } from "@/pages/Profile";
import { Badge } from "@/components/ui/badge";

interface SavedAnamnesesListProps {
  anamneses: SavedAnamnese[];
}

const formatLabel = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const SavedAnamnesesList = ({ anamneses }: SavedAnamnesesListProps) => {
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
              <Badge variant="outline">{anamnese.specialty}</Badge>
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
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};