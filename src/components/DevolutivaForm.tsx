"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Sparkles, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { patientsData } from "@/data/patients";

const devolutivaTemplates: Record<string, string> = {
  Psicologia: `
RELATÓRIO DE DEVOLUTIVA PSICOLÓGICA

1. IDENTIFICAÇÃO
   - Paciente: [NOME DO PACIENTE]
   - Período de Acompanhamento: [INÍCIO] a [FIM]
   - Terapeuta Responsável: [SEU NOME] ([SEU CONSELHO])

2. MOTIVO DO ACOMPANHAMENTO
   - [Descrever brevemente a queixa inicial e os motivos que levaram ao início do acompanhamento psicológico.]

3. INSTRUMENTOS E PROCEDIMENTOS UTILIZADOS
   - O presente relatório foi construído com base em observações clínicas sistemáticas em sessões lúdicas, entrevistas com os pais/responsáveis e aplicação de escalas/protocolos informais para rastreio do desenvolvimento.

4. ANÁLISE E SÍNTESE DOS RESULTADOS
   - Aspectos Socioemocionais: [Descrever a capacidade de interação, reciprocidade, expressão e reconhecimento de emoções, e o vínculo terapêutico.]
   - Aspectos Cognitivos: [Descrever atenção, memória, funções executivas (planejamento, flexibilidade), e o estilo de aprendizagem.]
   - Aspectos Comportamentais: [Descrever comportamentos-alvo, funções dos comportamentos, estratégias de regulação e adesão a regras e rotinas.]
   - Brincar: [Descrever o tipo de brincar (funcional, simbólico), interesses e como utiliza o lúdico para se expressar.]

5. EVOLUÇÃO DO PACIENTE
   - Durante o período, observou-se uma evolução significativa em [descrever as principais áreas de progresso, como melhora na comunicação, maior tolerância à frustração, etc.].

6. CONCLUSÃO E ENCAMINHAMENTOS
   - Conclui-se que o paciente tem se beneficiado do processo terapêutico, demonstrando [resumir o principal ganho]. Recomenda-se a continuidade do acompanhamento para [objetivos futuros] e a articulação com [escola, outros profissionais].

Atenciosamente,

_________________________
[SEU NOME]
[SEU CONSELHO]
`,
  Fonoaudiologia: `
RELATÓRIO DE DEVOLUTIVA FONOAUDIOLÓGICA

1. IDENTIFICAÇÃO
   - Paciente: [NOME DO PACIENTE]
   - Período de Acompanhamento: [INÍCIO] a [FIM]
   - Terapeuta Responsável: [SEU NOME] ([SEU CONSELHO])

2. MOTIVO DO ACOMPANHAMENTO
   - [Descrever a queixa inicial, como atraso de fala, dificuldades de comunicação, seletividade alimentar, etc.]

3. INSTRUMENTOS E PROCEDIMENTOS UTILIZADOS
   - A avaliação e o acompanhamento foram realizados através de observação clínica, interação lúdica, aplicação de protocolos de linguagem e fala, e entrevista com os responsáveis.

4. ANÁLISE E SÍNTESE DOS RESULTADOS
   - Linguagem Receptiva (Compreensão): [Descrever a compreensão de comandos, perguntas, vocabulário e conceitos.]
   - Linguagem Expressiva (Expressão): [Descrever o nível de expressão (não-verbal, palavras, frases), vocabulário, e funções comunicativas.]
   - Pragmática: [Descrever o uso social da linguagem: contato visual, atenção compartilhada, troca de turnos, iniciativa comunicativa.]
   - Fala e Sistema Sensório-Motor-Oral: [Descrever a inteligibilidade da fala, pontos articulatórios, e aspectos da mastigação e deglutição, se aplicável.]

5. EVOLUÇÃO DO PACIENTE
   - O paciente demonstrou avanços em [descrever as principais áreas de progresso, como aumento do vocabulário, melhora na inteligibilidade, maior iniciativa na comunicação, etc.].

6. CONCLUSÃO E ENCAMINHAMENTOS
   - O paciente apresenta uma evolução positiva no desenvolvimento da comunicação. Sugere-se a continuidade da terapia fonoaudiológica para [objetivos futuros] e a implementação de estratégias de estimulação em ambiente familiar e escolar.

Atenciosamente,

_________________________
[SEU NOME]
[SEU CONSELHO]
`,
  "Terapia Ocupacional": `
RELATÓRIO DE DEVOLUTIVA DE TERAPIA OCUPACIONAL

1. IDENTIFICAÇÃO
   - Paciente: [NOME DO PACIENTE]
   - Período de Acompanhamento: [INÍCIO] a [FIM]
   - Terapeuta Responsável: [SEU NOME] ([SEU CONSELHO])

2. MOTIVO DO ACOMPANHAMENTO
   - [Descrever a queixa inicial, como dificuldades em AVDs, desregulação sensorial, desafios na coordenação motora, etc.]

3. INSTRUMENTOS E PROCEDIMENTOS UTILIZADOS
   - A intervenção foi baseada na abordagem de Integração Sensorial de Ayres, com observações clínicas estruturadas, análise do desempenho ocupacional e entrevista com os cuidadores.

4. ANÁLISE E SÍNTESE DOS RESULTADOS
   - Desempenho Ocupacional: [Descrever o nível de independência em Atividades de Vida Diária (AVDs), brincar e participação escolar/social.]
   - Processamento Sensorial: [Descrever o perfil sensorial do paciente, incluindo modulação (hiper/hiporresponsividade), discriminação e reações aos diferentes sistemas (tátil, vestibular, proprioceptivo, etc.).]
   - Habilidades Motoras e Práxis: [Descrever a coordenação motora fina e grossa, o planejamento motor (ideação, planejamento, execução) e a integração viso-motora.]
   - Regulação e Comportamento: [Descrever o nível de alerta, as estratégias de autorregulação e o impacto do processamento sensorial no comportamento.]

5. EVOLUÇÃO DO PACIENTE
   - Observou-se uma melhora significativa em [descrever as principais áreas de progresso, como maior tolerância a estímulos, melhora na caligrafia, maior independência no vestir, etc.].

6. CONCLUSÃO E ENCAMINHAMENTOS
   - O paciente tem apresentado ganhos funcionais importantes com a intervenção. Recomenda-se a continuidade do acompanhamento para [objetivos futuros] e a implementação de uma 'dieta sensorial' em casa e na escola.

Atenciosamente,

_________________________
[SEU NOME]
[SEU CONSELHO]
`,
};

interface DevolutivaFormProps {
  specialty: string;
  therapistName: string;
  therapistCouncil: string;
  onSave: (data: { patientName: string; specialty: string; content: string }) => void;
}

export const DevolutivaForm = ({ specialty, therapistName, therapistCouncil, onSave }: DevolutivaFormProps) => {
  const [content, setContent] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const generateModel = () => {
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente para gerar o modelo.");
      return;
    }
    const baseTemplate = devolutivaTemplates[specialty] || devolutivaTemplates.Psicologia;
    const personalizedTemplate = baseTemplate
      .replace(/\[NOME DO PACIENTE\]/g, selectedPatient)
      .replace(/\[SEU NOME\]/g, therapistName)
      .replace(/\[SEU CONSELHO\]/g, therapistCouncil);
    
    setContent(personalizedTemplate);
    toast.success("Modelo de devolutiva gerado com sucesso!");
  };

  const handleSave = () => {
    if (!selectedPatient || !content.trim()) {
      toast.error("Selecione um paciente e gere o conteúdo antes de salvar.");
      return;
    }
    onSave({
      patientName: selectedPatient,
      specialty,
      content,
    });
    setContent("");
    setSelectedPatient("");
  };

  const handleDownloadPDF = () => {
    if (!content.trim()) {
      toast.error("Gere um modelo de devolutiva antes de baixar o PDF.");
      return;
    }
    toast.info("Gerando PDF...");
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textLines = doc.splitTextToSize(content, pageWidth - margin * 2);
    doc.text(textLines, margin, margin);
    doc.save(`Devolutiva_${selectedPatient.replace(/\s+/g, '_')}.pdf`);
    toast.success("PDF gerado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Paciente</Label>
          <Select onValueChange={setSelectedPatient} value={selectedPatient}>
            <SelectTrigger><SelectValue placeholder="Selecione um paciente" /></SelectTrigger>
            <SelectContent>{patientsData.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <Textarea
        placeholder="Selecione um paciente e clique em 'Gerar Modelo' para começar. Você pode editar o texto aqui."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="font-mono text-sm"
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={generateModel} className="w-full sm:w-auto">
          <Sparkles className="mr-2 h-4 w-4" /> Gerar Modelo
        </Button>
        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> Salvar Devolutiva
        </Button>
        <Button variant="outline" onClick={handleDownloadPDF} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" /> Baixar PDF
        </Button>
      </div>
    </div>
  );
};