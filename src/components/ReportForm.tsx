"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Sparkles, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { patientsData } from "@/data/patients";
import { ProfileData } from "@/pages/Profile";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const reportTemplates: Record<string, Record<string, string>> = {
  "Psicologia": {
    contexto: "O paciente [NOME DO PACIENTE], [IDADE], foi encaminhado para avaliação e acompanhamento psicológico devido a [MOTIVO DO ENCAMINHAMENTO], com queixa principal apresentada pela família de [QUEIXA PRINCIPAL]. O presente relatório abrange o período de [DATA INICIAL] a [DATA FINAL].",
    procedimentos: "Foram realizadas sessões semanais de psicoterapia com abordagem baseada em [ABORDAGEM, ex: Análise do Comportamento Aplicada (ABA), Terapia Cognitivo-Comportamental (TCC)]. As intervenções incluíram: Treino de Habilidades Sociais (THS), psicoeducação emocional com uso de recursos lúdicos e visuais (ex: termômetro das emoções), estratégias de dessensibilização sistemática para [SITUAÇÃO], e orientação parental com foco em manejo de comportamentos desafiadores e estratégias de reforçamento positivo.",
    observacoes: "Observa-se que o paciente demonstra [PONTOS FORTES, ex: bom raciocínio viso-espacial, hiperfoco em temas de interesse]. No entanto, apresenta desafios significativos na reciprocidade socioemocional, flexibilidade cognitiva e regulação emocional. Foram registrados comportamentos de [COMPORTAMENTOS OBSERVADOS, ex: estereotipias motoras sob estresse, rigidez em rotinas, dificuldade em interpretar pistas sociais não-verbais].",
    evolucao: "Ao longo do período, o paciente apresentou evolução na [ÁREA DE EVOLUÇÃO, ex: capacidade de nomear emoções básicas, tolerância a pequenas mudanças na rotina com suporte verbal]. Houve um aumento na frequência de interações iniciadas e uma redução de [COMPORTAMENTO REDUZIDO] após a implementação de estratégias de co-regulação. O repertório de habilidades sociais expandiu-se, sendo capaz de [HABILIDADE ADQUIRIDA].",
    conclusao: "Conclui-se que o acompanhamento psicológico tem sido benéfico para o desenvolvimento de habilidades socioemocionais e adaptativas do paciente. Recomenda-se a continuidade da intervenção para consolidação das habilidades adquiridas e para o trabalho com [NOVOS OBJETIVOS, ex: teoria da mente, resolução de conflitos interpessoais]. Sugere-se, ainda, a articulação com a equipe escolar para generalização das estratégias no ambiente educacional."
  },
  "Fonoaudiologia": {
    contexto: "O paciente [NOME DO PACIENTE], [IDADE], encontra-se em acompanhamento fonoaudiológico para intervenção nos aspectos de [ÁREAS, ex: linguagem, comunicação social, motricidade orofacial]. O presente relatório descreve a evolução no período de [DATA INICIAL] a [DATA FINAL].",
    procedimentos: "As sessões foram estruturadas com base em abordagens [ABORDAGEM, ex: naturalistas e desenvolvimentistas], utilizando estratégias como: terapia de linguagem em contexto lúdico, implementação e expansão de Sistema de Comunicação Alternativa e Aumentativa (CAA), treino de habilidades pragmáticas (contato visual, troca de turnos), e exercícios para adequação do tônus e mobilidade dos órgãos fonoarticulatórios. Foi realizada orientação familiar para estimulação da comunicação em ambiente doméstico.",
    observacoes: "O paciente apresenta um perfil comunicativo caracterizado por [CARACTERÍSTICAS, ex: uso predominante de palavras isoladas, presença de ecolalia imediata com função de processamento]. A compreensão verbal mostra-se mais eficaz com apoio de pistas visuais. Observa-se [ASPECTO MOTOR, ex: hipotonia orofacial e dificuldade na mastigação de alimentos sólidos].",
    evolucao: "Houve progresso significativo na [ÁREA DE EVOLUÇÃO, ex: ampliação do vocabulário receptivo e expressivo]. O Comprimento Médio do Enunciado (CME) evoluiu de uma para duas palavras. O uso da CAA tornou-se mais funcional para realizar pedidos. A articulação do fonema [FONEMA] foi automatizada em nível de palavra. Observou-se melhora na [HABILIDADE PRAGMÁTICA, ex: manutenção do contato visual].",
    conclusao: "O paciente tem respondido positivamente à intervenção fonoaudiológica, demonstrando avanços em suas competências comunicativas. Recomenda-se a manutenção da terapia para aprimorar a estruturação frasal, a clareza articulatória e a funcionalidade do discurso. Sugere-se avaliação do processamento auditivo central para complementar o diagnóstico e direcionar futuras intervenções."
  },
  "Terapia Ocupacional": {
    contexto: "O paciente [NOME DO PACIENTE], [IDADE], está em acompanhamento de Terapia Ocupacional com foco em [OBJETIVOS, ex: disfunção de integração sensorial, independência nas Atividades de Vida Diária (AVDs), desenvolvimento do brincar funcional]. Este relatório compreende o período de [DATA INICIAL] a [DATA FINAL].",
    procedimentos: "A intervenção foi pautada na abordagem de Integração Sensorial de Ayres, em ambiente com recursos terapêuticos específicos. Foram implementadas estratégias para modulação sensorial, como a oferta de estímulos proprioceptivos e vestibulares. Realizou-se o treino graduado das AVDs, com análise de tarefas e uso de adaptações. As sessões também incluíram atividades para desenvolvimento da práxis global e fina, e estimulação do brincar simbólico.",
    observacoes: "O paciente apresenta um perfil sensorial com [CARACTERÍSTICAS, ex: hipersensibilidade tátil e auditiva, e busca por estímulos vestibulares]. Tais disfunções impactam seu desempenho ocupacional, gerando [DIFICULDADES, ex: seletividade alimentar, recusa em participar de atividades em grupo, dificuldade na escrita]. O planejamento motor (práxis) mostra-se deficitário, exigindo maior tempo para aprender novas tarefas motoras.",
    evolucao: "Observou-se melhora na [ÁREA DE EVOLUÇÃO, ex: modulação sensorial], com aumento da tolerância a diferentes texturas e redução de comportamentos de fuga em ambientes ruidosos. O paciente alcançou maior independência na AVD de [AVD], sendo capaz de realizar a tarefa com supervisão mínima. Houve avanço na coordenação motora fina, evidenciado pela melhora na preensão do lápis e no uso da tesoura. O brincar tornou-se mais funcional e criativo.",
    conclusao: "O acompanhamento em Terapia Ocupacional tem contribuído para a melhora da participação e autonomia do paciente em suas ocupações. Recomenda-se a continuidade do tratamento para aprimorar as habilidades de planejamento motor e autorregulação. Sugere-se a implementação de uma 'dieta sensorial' em casa e na escola, conforme orientações fornecidas à família, para favorecer a generalização dos ganhos terapêuticos."
  },
  // Adicionar outros templates aqui
  "Padrão": {
    contexto: "O paciente [NOME DO PACIENTE], [IDADE], foi encaminhado para avaliação e acompanhamento devido a [MOTIVO DO ENCAMINHAMENTO]. O presente relatório abrange o período de [DATA INICIAL] a [DATA FINAL].",
    procedimentos: "Foram realizadas sessões semanais com foco em [OBJETIVOS]. As estratégias utilizadas incluíram [ESTRATÉGIAS APLICADAS].",
    observacoes: "Durante as sessões, observou-se que o paciente [COMPORTAMENTOS E OBSERVAÇÕES CLÍNICAS].",
    evolucao: "Ao longo do período, o paciente demonstrou evolução em [ÁREAS DE EVOLUÇÃO].",
    conclusao: "Conclui-se que o acompanhamento tem sido benéfico. Recomenda-se a continuidade da intervenção para [RECOMENDAÇÕES TÉCNICAS]."
  }
};

interface ReportFormProps {
  specialty: string;
  profileData: ProfileData;
}

export const ReportForm = ({ specialty, profileData }: ReportFormProps) => {
  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [stamp, setStamp] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportContent, setReportContent] = useState<Record<string, string>>({
    contexto: "", procedimentos: "", observacoes: "", evolucao: "", conclusao: ""
  });

  const handleFileChange = (file: File | null, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTemplate = () => {
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente.");
      return;
    }
    const template = reportTemplates[specialty] || reportTemplates["Padrão"];
    const patient = patientsData.find(p => p.name === selectedPatient);
    const birthDate = patient ? new Date(patient.birthDate.split('/').reverse().join('-')) : new Date();
    const age = new Date().getFullYear() - birthDate.getFullYear();

    let personalizedTemplate: Record<string, string> = {};
    for (const key in template) {
      personalizedTemplate[key] = template[key]
        .replace(/\[NOME DO PACIENTE\]/g, selectedPatient)
        .replace(/\[IDADE\]/g, `${age} anos`)
        .replace(/\[DATA INICIAL\]/g, startDate ? new Date(startDate).toLocaleDateString('pt-BR') : 'DD/MM/AAAA')
        .replace(/\[DATA FINAL\]/g, endDate ? new Date(endDate).toLocaleDateString('pt-BR') : 'DD/MM/AAAA');
    }
    setReportContent(personalizedTemplate);
    toast.success("Modelo de relatório gerado com sucesso!");
  };

  const handleDownloadPDF = () => {
    if (!selectedPatient) {
      toast.error("Selecione um paciente para gerar o relatório.");
      return;
    }
    toast.info("Gerando PDF do Relatório...");
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    // Header
    if (logo) {
      doc.addImage(logo, 'PNG', margin, 10, 30, 30);
    }
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Acompanhamento Terapêutico", pageWidth / 2, 25, { align: 'center' });
    y = 50;
    doc.setDrawColor(200);
    doc.line(margin, y - 10, pageWidth - margin, y - 10);

    // Identification
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Identificação", margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente: ${selectedPatient}`, margin, y);
    y += 5;
    doc.text(`Profissional: ${profileData.name}`, margin, y);
    y += 5;
    doc.text(`Especialidade: ${profileData.specialty} | ${profileData.crp || 'N/A'}`, margin, y);
    y += 5;
    const period = (startDate && endDate) 
      ? `${new Date(startDate).toLocaleDateString('pt-BR')} a ${new Date(endDate).toLocaleDateString('pt-BR')}`
      : "Período não especificado";
    doc.text(`Período do Relatório: ${period}`, margin, y);
    y += 10;

    // Sections
    const renderSection = (title: string, content: string) => {
      const lines = doc.splitTextToSize(content, pageWidth - margin * 2);
      const contentHeight = lines.length * 5;
      if (y + contentHeight + 10 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 7;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(lines, margin, y);
      y += contentHeight + 5;
    };

    renderSection("1. Contextualização / Motivo do Atendimento", reportContent.contexto);
    renderSection("2. Procedimentos Realizados e Estratégias Aplicadas", reportContent.procedimentos);
    renderSection("3. Observações Clínicas e Comportamentais", reportContent.observacoes);
    renderSection("4. Evolução Terapêutica / Resultados Obtidos", reportContent.evolucao);
    renderSection("5. Conclusão Profissional e Recomendações Técnicas", reportContent.conclusao);

    // Signature
    if (y > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = margin;
    }
    y = doc.internal.pageSize.getHeight() - 60;
    if (signature) {
      doc.addImage(signature, 'PNG', pageWidth / 2 - 25, y - 15, 50, 20);
    }
    doc.line(pageWidth / 2 - 40, y + 10, pageWidth / 2 + 40, y + 10);
    doc.setFontSize(10);
    doc.text(profileData.name, pageWidth / 2, y + 15, { align: 'center' });
    doc.text(`${profileData.specialty} | ${profileData.crp || 'N/A'}`, pageWidth / 2, y + 20, { align: 'center' });
    if (stamp) {
      doc.addImage(stamp, 'PNG', pageWidth - margin - 40, y - 10, 35, 35);
    }

    doc.save(`Relatorio_${specialty}_${selectedPatient.replace(/\s+/g, '_')}.pdf`);
    toast.success("PDF do Relatório gerado com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerador de Relatório Técnico</CardTitle>
        <CardDescription>Personalize, gere um modelo e edite seu relatório profissional.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Personalização</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {['logo', 'assinatura', 'carimbo'].map(item => (
              <div key={item} className="space-y-2">
                <Label htmlFor={item} className="capitalize">{item}</Label>
                <div className="flex items-center gap-2">
                  <Input id={item} type="file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null, item === 'logo' ? setLogo : item === 'assinatura' ? setSignature : setStamp)} />
                  <Button type="button" variant="outline" onClick={() => document.getElementById(item)?.click()}>
                    <Upload className="h-4 w-4 mr-2" /> Enviar
                  </Button>
                  {(item === 'logo' && logo) && <img src={logo} alt="logo preview" className="h-10 w-10 object-contain border rounded-md" />}
                  {(item === 'assinatura' && signature) && <img src={signature} alt="signature preview" className="h-10 w-20 object-contain border rounded-md" />}
                  {(item === 'carimbo' && stamp) && <img src={stamp} alt="stamp preview" className="h-10 w-10 object-contain border rounded-md" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Dados do Relatório</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Select onValueChange={setSelectedPatient} value={selectedPatient}>
                <SelectTrigger><SelectValue placeholder="Selecione um paciente" /></SelectTrigger>
                <SelectContent>
                  {patientsData.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
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
          <Button onClick={generateTemplate}>
            <Sparkles className="mr-2 h-4 w-4" /> Gerar Modelo
          </Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Conteúdo do Relatório</h3>
          {Object.keys(reportContent).map(key => (
            <div key={key} className="space-y-2">
              <Label className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</Label>
              <Textarea
                value={reportContent[key]}
                onChange={e => setReportContent(prev => ({ ...prev, [key]: e.target.value }))}
                rows={6}
                placeholder={`Preencha a seção de ${key.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>
        <Button onClick={handleDownloadPDF} size="lg">
          <Download className="mr-2 h-4 w-4" /> Baixar Relatório em PDF
        </Button>
      </CardContent>
    </Card>
  );
};