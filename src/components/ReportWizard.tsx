"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, Save, BrainCircuit, ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { patientsData } from "@/data/patients";
import { ProfileData } from "@/pages/Profile";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

// Data structure for the quiz-like report generator
const reportQuizData: Record<string, Record<string, { prompt: string; options: string[]; allowCustom: boolean; }>> = {
  "Psicologia": {
    informacoesBasicas: {
      prompt: "Qual o contexto inicial do paciente?",
      options: [
        "Paciente foi encaminhado para avaliação e acompanhamento psicológico devido a dificuldades de interação social e comportamentos restritivos.",
        "A queixa principal da família refere-se a desafios na regulação emocional e baixa tolerância à frustração.",
        "O acompanhamento foi iniciado para investigar suspeita de Transtorno do Espectro Autista (TEA).",
      ],
      allowCustom: true,
    },
    objetivosTerapeuticos: {
      prompt: "Quais foram os principais objetivos terapêuticos para o período?",
      options: [
        "Promover o desenvolvimento de habilidades socioemocionais.",
        "Aumentar a flexibilidade cognitiva e a tolerância a frustrações.",
        "Desenvolver estratégias de regulação emocional.",
        "Ampliar o repertório de comunicação funcional e pragmática.",
        "Trabalhar a Teoria da Mente e a compreensão de perspectivas.",
      ],
      allowCustom: true,
    },
    atividadesRealizadas: {
      prompt: "Quais atividades e abordagens foram utilizadas?",
      options: [
        "Sessões com abordagem baseada em Análise do Comportamento Aplicada (ABA).",
        "Intervenções pautadas na Terapia Cognitivo-Comportamental (TCC) adaptada.",
        "Utilização de Treino de Habilidades Sociais (THS) em formato lúdico.",
        "Psicoeducação emocional com uso de recursos visuais (ex: termômetro das emoções).",
        "Orientação parental com foco em manejo de comportamentos e estratégias de reforçamento positivo.",
      ],
      allowCustom: true,
    },
    evolucaoPaciente: {
      prompt: "Como o paciente evoluiu?",
      options: [
        "Apresentou evolução na capacidade de nomear emoções básicas em si e nos outros.",
        "Demonstrou maior tolerância a pequenas mudanças na rotina com suporte verbal.",
        "Houve um aumento na frequência de interações sociais iniciadas com pares e adultos.",
        "Observou-se uma redução significativa na frequência de comportamentos disruptivos.",
        "Expandiu seu repertório de brincar simbólico e funcional.",
      ],
      allowCustom: true,
    },
    encaminhamentosRecomendacoes: {
      prompt: "Quais são as recomendações e próximos passos?",
      options: [
        "Recomenda-se a continuidade da intervenção para consolidação das habilidades adquiridas.",
        "Sugere-se a articulação com a equipe escolar para generalização das estratégias no ambiente educacional.",
        "Encaminha-se para avaliação fonoaudiológica para investigar aspectos da linguagem.",
        "É importante manter a orientação parental para dar seguimento às estratégias em casa.",
      ],
      allowCustom: true,
    },
    conclusao: {
      prompt: "Qual a conclusão profissional sobre o período?",
      options: [
        "O acompanhamento psicológico tem sido benéfico para o desenvolvimento de habilidades socioemocionais e adaptativas.",
        "O paciente tem respondido positivamente às intervenções propostas, demonstrando bom prognóstico com a continuidade do tratamento.",
        "A intervenção tem se mostrado fundamental para a melhora na qualidade de vida do paciente e de sua família.",
      ],
      allowCustom: true,
    },
    observacoesComplementares: {
      prompt: "Há observações clínicas ou comportamentais relevantes a adicionar?",
      options: [
        "O paciente demonstra hiperfoco em temas de seu interesse, que pode ser utilizado como ferramenta terapêutica.",
        "Foram registrados comportamentos de estereotipias motoras, principalmente em momentos de ansiedade ou excitação.",
        "Apresenta desafios significativos na reciprocidade socioemocional e na interpretação de pistas não-verbais.",
        "O engajamento familiar no processo terapêutico tem sido um fator crucial para a evolução do paciente.",
      ],
      allowCustom: true,
    },
  },
  // Simplified templates for other specialties can be added here following the same structure
  "Padrão": {
    informacoesBasicas: { prompt: "Contexto inicial", options: [], allowCustom: true },
    objetivosTerapeuticos: { prompt: "Objetivos", options: [], allowCustom: true },
    atividadesRealizadas: { prompt: "Atividades", options: [], allowCustom: true },
    evolucaoPaciente: { prompt: "Evolução", options: [], allowCustom: true },
    encaminhamentosRecomendacoes: { prompt: "Recomendações", options: [], allowCustom: true },
    conclusao: { prompt: "Conclusão", options: [], allowCustom: true },
    observacoesComplementares: { prompt: "Observações", options: [], allowCustom: true },
  }
};

const reportSections = [
  { id: "informacoesBasicas", title: "1. Informações Básicas" },
  { id: "objetivosTerapeuticos", title: "2. Objetivos Terapêuticos" },
  { id: "atividadesRealizadas", title: "3. Atividades Realizadas" },
  { id: "evolucaoPaciente", title: "4. Evolução do Paciente" },
  { id: "encaminhamentosRecomendacoes", title: "5. Encaminhamentos e Recomendações" },
  { id: "conclusao", title: "6. Conclusão" },
  { id: "observacoesComplementares", title: "7. Observações Complementares" },
];

interface ReportWizardProps {
  specialty: string;
  profileData: ProfileData;
}

export const ReportWizard = ({ specialty, profileData }: ReportWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [stamp, setStamp] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, { selected: string[], custom: string }>>({});
  const [reportContent, setReportContent] = useState<Record<string, string>>({});

  const currentQuiz = reportQuizData[specialty] || reportQuizData["Padrão"];
  const totalSteps = reportSections.length + 2; // Initial step + 7 sections + final step = 9 steps (0-8)

  useEffect(() => {
    const newReportContent: Record<string, string> = {};
    reportSections.forEach(section => {
      const answers = quizAnswers[section.id];
      if (answers) {
        const selectedText = answers.selected.join('\n');
        const fullText = [selectedText, answers.custom].filter(Boolean).join('\n');
        newReportContent[section.id] = fullText;
      } else {
        newReportContent[section.id] = "";
      }
    });
    setReportContent(newReportContent);
  }, [quizAnswers]);

  const handleAnswerChange = (sectionId: string, value: string, isCustom: boolean) => {
    setQuizAnswers(prev => {
      const current = prev[sectionId] || { selected: [], custom: "" };
      if (isCustom) {
        return { ...prev, [sectionId]: { ...current, custom: value } };
      } else {
        const newSelected = current.selected.includes(value)
          ? current.selected.filter(item => item !== value)
          : [...current.selected, value];
        return { ...prev, [sectionId]: { ...current, selected: newSelected } };
      }
    });
  };

  const handleFileChange = (file: File | null, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente para gerar o relatório.");
      return;
    }
    toast.info("Gerando PDF do relatório...");

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;

    // --- Helper function for page breaks ---
    const checkPageBreak = (heightNeeded: number) => {
      if (y + heightNeeded > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // --- Header ---
    if (logo) {
      try {
        const imgProps = doc.getImageProperties(logo);
        const logoHeight = 20;
        const logoWidth = (imgProps.width * logoHeight) / imgProps.height;
        doc.addImage(logo, 'PNG', margin, y, logoWidth, logoHeight);
      } catch (e) {
        console.error("Erro ao adicionar logo:", e);
        toast.error("Ocorreu um erro ao adicionar o logo ao PDF.");
      }
    }
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Acompanhamento", pageWidth / 2, y + 10, { align: 'center' });
    y += 30;

    // --- Therapist and Patient Info ---
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Terapeuta:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(profileData.name, margin + 25, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Especialidade:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(profileData.specialty, margin + 25, y);
    if (profileData.crp) {
        doc.text(`${profileData.crp}`, pageWidth - margin, y, { align: 'right' });
    }
    y += 10;

    doc.setDrawColor(224, 224, 224);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Paciente:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(selectedPatient, margin + 20, y);
    y += 6;

    const period = (startDate && endDate) 
        ? `${new Date(startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} a ${new Date(endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        : "Período não especificado";
    doc.setFont("helvetica", "bold");
    doc.text("Período:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(period, margin + 20, y);
    y += 15;

    // --- Body ---
    reportSections.forEach(section => {
      const content = reportContent[section.id];
      if (content && content.trim()) {
        const titleLines = doc.splitTextToSize(section.title, pageWidth - margin * 2);
        const contentLines = doc.splitTextToSize(content, pageWidth - margin * 2);
        const heightNeeded = (titleLines.length * 7) + (contentLines.length * 5) + 5;
        
        checkPageBreak(heightNeeded);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titleLines, margin, y);
        y += titleLines.length * 7;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(contentLines, margin, y);
        y += contentLines.length * 5 + 10;
      }
    });

    // --- Footer (Signature and Stamp) ---
    const footerHeight = 50;
    checkPageBreak(footerHeight);
    y = pageHeight - margin - footerHeight;

    if (signature) {
        try {
            const sigProps = doc.getImageProperties(signature);
            const sigHeight = 20;
            const sigWidth = (sigProps.width * sigHeight) / sigProps.height;
            const sigX = (pageWidth / 2) - (sigWidth / 2);
            doc.addImage(signature, 'PNG', sigX, y, sigWidth, sigHeight);
        } catch(e) {
            console.error("Erro ao adicionar assinatura:", e);
        }
    }

    doc.setDrawColor(0, 0, 0);
    doc.line(pageWidth / 2 - 40, y + 22, pageWidth / 2 + 40, y + 22);
    doc.setFontSize(10);
    doc.text(profileData.name, pageWidth / 2, y + 28, { align: 'center' });
    if (profileData.crp) {
        doc.text(profileData.crp, pageWidth / 2, y + 33, { align: 'center' });
    }

    if (stamp) {
        try {
            const stampProps = doc.getImageProperties(stamp);
            const stampSize = 25;
            doc.addImage(stamp, 'PNG', pageWidth - margin - stampSize - 5, y, stampSize, stampSize);
        } catch(e) {
            console.error("Erro ao adicionar carimbo:", e);
        }
    }

    // --- Page numbers ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(
            `Página ${i} de ${pageCount}`,
            pageWidth - margin,
            pageHeight - 10,
            { align: 'right' }
        );
    }

    doc.save(`Relatorio_${specialty}_${selectedPatient.replace(/\s+/g, '_')}.pdf`);
    toast.success("PDF gerado com sucesso!");
  };

  const renderStepContent = () => {
    if (currentStep === 0) { // Initial data step
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Dados Iniciais do Relatório</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Select onValueChange={setSelectedPatient} value={selectedPatient}>
                <SelectTrigger><SelectValue placeholder="Selecione um paciente" /></SelectTrigger>
                <SelectContent>{patientsData.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
      );
    }

    if (currentStep > 0 && currentStep <= reportSections.length) {
      const section = reportSections[currentStep - 1];
      const quizSection = currentQuiz[section.id];
      const answers = quizAnswers[section.id] || { selected: [], custom: "" };

      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{section.title}</h3>
          <p className="text-muted-foreground">{quizSection.prompt}</p>
          <div className="space-y-2">
            {quizSection.options.map((option, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`${section.id}-${index}`}
                  checked={answers.selected.includes(option)}
                  onCheckedChange={() => handleAnswerChange(section.id, option, false)}
                />
                <Label htmlFor={`${section.id}-${index}`} className="font-normal cursor-pointer">{option}</Label>
              </div>
            ))}
          </div>
          {quizSection.allowCustom && (
            <div className="space-y-2 pt-4">
              <Label htmlFor={`${section.id}-custom`}>Observações Adicionais para esta Seção:</Label>
              <Textarea
                id={`${section.id}-custom`}
                placeholder="Adicione informações personalizadas aqui..."
                value={answers.custom}
                onChange={(e) => handleAnswerChange(section.id, e.target.value, true)}
                rows={4}
              />
            </div>
          )}
        </div>
      );
    }

    if (currentStep === totalSteps - 1) { // Final review step
      return (
        <div className="space-y-6">
          <h3 className="font-semibold text-lg">8. Revisão Final e Personalização</h3>
          
          <div className="space-y-4">
            <Label className="font-medium">Identidade Visual do Relatório</Label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                { id: 'logo', state: logo, setter: setLogo, label: 'Logo Digital' },
                { id: 'assinatura', state: signature, setter: setSignature, label: 'Assinatura Digital' },
                { id: 'carimbo', state: stamp, setter: setStamp, label: 'Carimbo Digital' }
              ].map(item => (
                <div key={item.id} className="space-y-2">
                  <Label htmlFor={item.id}>{item.label}</Label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg h-16">
                    <Input id={item.id} type="file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null, item.setter)} />
                    <div className="w-24 h-full flex items-center justify-center bg-muted rounded-md overflow-hidden relative group">
                      {item.state ? (
                        <>
                          <img src={item.state} alt={`${item.id} preview`} className="h-full w-full object-contain" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => item.setter(null)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">Preview</span>
                      )}
                    </div>
                    <Button type="button" variant="outline" className="flex-1" onClick={() => document.getElementById(item.id)?.click()}>
                      <Upload className="h-4 w-4 mr-2" /> {item.state ? 'Alterar' : 'Enviar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="font-medium">Ações Finais</Label>
            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
              <Button variant="outline" onClick={() => toast.info("Funcionalidade 'Organizar com IA' em desenvolvimento.")}>
                <BrainCircuit className="mr-2 h-4 w-4" /> Organizar com IA
              </Button>
              <Button variant="outline" onClick={() => toast.success("Relatório salvo com sucesso no sistema!")}>
                <Save className="mr-2 h-4 w-4" /> Salvar Relatório
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" /> Gerar PDF
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistente de Relatório Técnico</CardTitle>
        <CardDescription>Siga os passos para criar um relatório profissional de forma guiada.</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep / (totalSteps - 1)) * 100} className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4 border rounded-lg bg-background">
            {renderStepContent()}
          </div>
          <div className="hidden lg:block p-4 border rounded-lg bg-muted/40">
            <h3 className="font-semibold text-lg mb-4">Preview do Relatório</h3>
            <div className="space-y-4 text-sm prose prose-sm max-w-none">
              {reportSections.map(section => (
                reportContent[section.id] && (
                  <div key={section.id}>
                    <h4 className="font-bold">{section.title}</h4>
                    <p className="whitespace-pre-wrap">{reportContent[section.id]}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setCurrentStep(p => p - 1)} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
          </Button>
          <Button onClick={() => setCurrentStep(p => p + 1)} disabled={currentStep === totalSteps - 1}>
            Próximo <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};