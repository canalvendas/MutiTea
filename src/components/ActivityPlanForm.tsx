"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Sparkles, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { patientsData } from "@/data/patients";
import { Checkbox } from "@/components/ui/checkbox";
import { activitiesData, Demand } from "@/data/activities";

interface ActivityPlanFormProps {
  onSavePlan: (data: { patientName: string; content: string }) => void;
}

export const ActivityPlanForm = ({ onSavePlan }: ActivityPlanFormProps) => {
  const [planContent, setPlanContent] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDemands, setSelectedDemands] = useState<Demand[]>([]);

  const allDemands = activitiesData.flatMap(s => s.demands);

  const handleDemandChange = (demand: Demand) => {
    setSelectedDemands(prev =>
      prev.some(d => d.name === demand.name)
        ? prev.filter(d => d.name !== demand.name)
        : [...prev, demand]
    );
  };

  const generatePlan = () => {
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente primeiro.");
      return;
    }
    if (selectedDemands.length === 0) {
      toast.error("Por favor, selecione pelo menos uma demanda para gerar o plano.");
      return;
    }

    let content = `PLANO DE ATIVIDADES SUGERIDAS\n\n`;
    content += `Paciente: ${selectedPatient}\n`;
    content += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    content += `Foco Terapêutico: ${selectedDemands.map(d => d.name).join(', ')}\n\n`;
    content += `--------------------------------------------------\n\n`;

    selectedDemands.forEach(demand => {
      content += `PARA A DEMANDA: ${demand.name.toUpperCase()}\n\n`;
      demand.activities.forEach((activity, index) => {
        content += `${index + 1}. Atividade: ${activity.title}\n`;
        content += `   - Descrição: ${activity.description}\n`;
        content += `   - Materiais: ${activity.materials}\n\n`;
      });
      content += `--------------------------------------------------\n\n`;
    });

    setPlanContent(content);
    toast.success("Plano de atividades gerado com sucesso!");
  };

  const handleSave = () => {
    if (!selectedPatient || !planContent.trim()) {
      toast.error("Selecione um paciente e gere o conteúdo antes de salvar.");
      return;
    }
    onSavePlan({
      patientName: selectedPatient,
      content: planContent,
    });
    setSelectedPatient("");
    setSelectedDemands([]);
    setPlanContent("");
  };

  const handleDownloadPDF = () => {
    if (!planContent.trim()) {
      toast.error("Gere um plano de atividades antes de baixar o PDF.");
      return;
    }
    toast.info("Gerando PDF...");
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textLines = doc.splitTextToSize(planContent, pageWidth - margin * 2);
    doc.text(textLines, margin, margin);
    doc.save(`Plano_Atividades_${selectedPatient.replace(/\s+/g, '_')}.pdf`);
    toast.success("PDF gerado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-bold text-lg">1. Nome do Paciente</Label>
          <Select onValueChange={setSelectedPatient} value={selectedPatient}>
            <SelectTrigger><SelectValue placeholder="Selecione um paciente" /></SelectTrigger>
            <SelectContent>{patientsData.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-lg">2. Principais Demandas</Label>
          <div className="p-4 border rounded-md max-h-48 overflow-y-auto space-y-2">
            {allDemands.map(demand => (
              <div key={demand.name} className="flex items-center space-x-2">
                <Checkbox
                  id={demand.name}
                  checked={selectedDemands.some(d => d.name === demand.name)}
                  onCheckedChange={() => handleDemandChange(demand)}
                />
                <Label htmlFor={demand.name} className="font-normal cursor-pointer">{demand.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={generatePlan} className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" /> 3. Gerar Sugestões
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Salvar Plano
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Baixar PDF
          </Button>
        </div>
        <div>
          <Textarea
            placeholder="Selecione um paciente, escolha as demandas e clique em 'Gerar Sugestões' para começar."
            value={planContent}
            onChange={(e) => setPlanContent(e.target.value)}
            rows={25}
            className="font-mono text-sm bg-muted/20"
          />
        </div>
      </div>
    </div>
  );
};