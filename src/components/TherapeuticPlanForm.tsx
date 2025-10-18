"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { patientsData } from "@/data/patients";

// Data structure for plan templates
const therapeuticPlanModels: Record<string, string> = {
  "Psicologia": `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - PSICOLOGIA

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - Paciente apresenta diagnóstico de Transtorno do Espectro Autista (TEA), com desafios predominantes nas áreas de comunicação social, flexibilidade cognitiva e regulação emocional. Observa-se [descrever brevemente um comportamento específico, ex: rigidez em rotinas, dificuldade em interpretar pistas sociais não-verbais].

2. OBJETIVO GERAL:
   - Promover o desenvolvimento de habilidades socioemocionais, comunicativas e cognitivas, visando maior autonomia, bem-estar e qualidade de vida para o paciente e sua família.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
   - Comunicação e Interação Social:
     - Aumentar o contato visual sustentado durante interações.
     - Iniciar interações com pares e adultos em 3 a 5 oportunidades por sessão.
     - Responder a perguntas sociais simples (ex: "Como você está?").
   - Regulação Emocional:
     - Identificar e nomear emoções básicas (alegria, tristeza, raiva) em si e nos outros.
     - Utilizar uma estratégia de co-regulação (ex: respiração, pedir um abraço) com mediação do terapeuta.
   - Flexibilidade Cognitiva:
     - Tolerar pequenas alterações na rotina da sessão com suporte verbal.
     - Participar de jogos com regras, aceitando a troca de turnos.

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
   - Comunicação e Interação Social:
     - Desenvolver habilidades de Teoria da Mente, compreendendo a perspectiva do outro em situações simples.
     - Manter 2-3 trocas de turno em uma conversa sobre um tema de interesse.
   - Regulação Emocional:
     - Utilizar de forma autônoma uma estratégia de autorregulação em momentos de frustração.
     - Expressar necessidades e sentimentos de forma verbal ou através de CAA.
   - Flexibilidade Cognitiva:
     - Aceitar a derrota em jogos com menor desregulação.
     - Generalizar uma habilidade aprendida para um novo contexto.

5. ESTRATÉGIAS E INTERVENÇÕES:
   - Abordagem baseada nos princípios da Análise do Comportamento Aplicada (ABA).
   - Treinamento de Habilidades Sociais através de role-playing, histórias sociais e modelagem.
   - Psicoeducação emocional com uso de recursos visuais (ex: termômetro das emoções).
   - Intervenções baseadas no Modelo Denver de Intervenção Precoce (ESDM) para engajamento e iniciativa.
   - Orientação parental semanal/quinzenal para generalização das habilidades em casa.

6. CRITÉRIOS DE REAVALIAÇÃO E ALTA:
   - O plano será reavaliado a cada 3 meses, com base nos registros de sessão e feedback familiar.
   - Os critérios de alta envolvem a generalização das habilidades para os ambientes naturalísticos (casa, escola), a redução significativa de comportamentos desafiadores e a melhora na qualidade da interação social e bem-estar do paciente.
  `,
  "Fonoaudiologia": `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - FONOAUDIOLOGIA

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - Paciente com diagnóstico de Transtorno do Espectro Autista (TEA), apresentando desafios na comunicação verbal e não-verbal, pragmática e processamento auditivo. A linguagem expressiva é caracterizada por [descrever, ex: ecolalias, palavras isoladas], e a receptiva mostra dificuldade em [descrever, ex: compreender comandos complexos].

2. OBJETIVO GERAL:
   - Desenvolver habilidades de comunicação funcional e eficaz, ampliando as capacidades receptivas e expressivas e promovendo a interação social através da linguagem.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
   - Linguagem Receptiva:
     - Seguir comandos de duas etapas em contexto lúdico.
     - Identificar 10 novos substantivos e 5 novos verbos a partir de figuras.
   - Linguagem Expressiva:
     - Aumentar o Comprimento Médio do Enunciado (CME) para 2 palavras (ex: "quero bola").
     - Utilizar gestos ou CAA para fazer 3 tipos de pedidos diferentes por sessão.
   - Pragmática:
     - Estabelecer contato visual para iniciar uma interação.
     - Responder ao próprio nome em 80% das oportunidades.

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
   - Linguagem Receptiva:
     - Compreender perguntas de "Onde?" e "Quem?".
   - Linguagem Expressiva:
     - Produzir frases de 3-4 palavras com estrutura gramatical simples.
     - Reduzir o uso de ecolalia imediata, substituindo-a por respostas funcionais.
   - Pragmática:
     - Manter 2-3 turnos em uma atividade de interesse compartilhado.
     - Utilizar a comunicação para comentar ou mostrar algo ao outro.

5. ESTRATÉGIAS E INTERVENÇÕES:
   - Terapia de linguagem com base em abordagens naturalistas e desenvolvimentistas.
   - Implementação e/ou expansão de Sistema de Comunicação Alternativa e Aumentativa (CAA), como PECS ou aplicativos.
   - Estratégias para estimulação da atenção compartilhada e intenção comunicativa.
   - Trabalho com pistas visuais para apoiar a compreensão e a expressão.
   - Se aplicável, abordagem para seletividade alimentar com foco em dessensibilização oral.

6. CRITÉRIOS DE REAVALIAÇÃO E ALTA:
   - Reavaliação formal a cada 6 meses utilizando protocolos padronizados e observação clínica.
   - A alta será considerada quando o paciente for capaz de comunicar suas necessidades, desejos e ideias de forma eficaz na maioria dos contextos, utilizando as ferramentas verbais e/ou de CAA disponíveis.
  `,
  "Terapia Ocupacional": `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - TERAPIA OCUPACIONAL

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - Paciente com diagnóstico de Transtorno do Espectro Autista (TEA), com disfunção de integração sensorial, impactando o desempenho ocupacional em Atividades de Vida Diária (AVDs), brincar e participação social. Apresenta [descrever, ex: hipersensibilidade tátil, busca por estímulos vestibulares, dificuldade no planejamento motor].

2. OBJETIVO GERAL:
   - Promover a participação e independência nas ocupações significativas da infância, através da melhora na modulação sensorial, planejamento motor e desenvolvimento de habilidades funcionais.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
   - Processamento Sensorial:
     - Tolerar o toque em diferentes texturas (ex: massinha, areia) por 5 minutos com suporte.
     - Permanecer sentado durante uma atividade de mesa por 10 minutos, utilizando estratégias sensoriais (ex: almofada de ar).
   - Habilidades Motoras:
     - Melhorar a preensão do lápis para uma preensão trípode funcional.
     - Realizar um circuito motor simples de 3 etapas com demonstração.
   - AVDs:
     - Participar ativamente no ato de se vestir, realizando 2 etapas de forma independente (ex: puxar a calça, calçar as meias).

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
   - Processamento Sensorial:
     - Utilizar uma estratégia de autorregulação (ex: buscar pressão profunda) de forma mais autônoma quando se sentir desorganizado.
     - Participar de atividades em grupo com ruído ambiente sem apresentar comportamentos de fuga.
   - Habilidades Motoras:
     - Recortar formas simples com a tesoura seguindo a linha.
     - Alternar os pés para subir escadas com autonomia.
   - AVDs e Brincar:
     - Realizar a sequência completa de escovação dos dentes com supervisão mínima.
     - Engajar em uma brincadeira simbólica simples (ex: dar comida para um boneco) por 5 minutos.

5. ESTRATÉGIAS E INTERVENÇÕES:
   - Abordagem de Integração Sensorial de Ayres em ambiente com equipamentos adequados.
   - Implementação de uma "Dieta Sensorial" com orientações para casa e escola.
   - Análise de tarefas e treino graduado para as AVDs.
   - Atividades de práxis e planejamento motor.
   - Adaptações ambientais e de materiais para favorecer a participação.

6. CRITÉRIOS DE REAVALIAÇÃO E ALTA:
   - Reavaliação do perfil sensorial e desempenho ocupacional a cada 6 meses.
   - A alta será considerada quando o paciente atingir um nível de independência funcional e regulação sensorial compatível com sua idade e contexto, permitindo sua participação satisfatória nos ambientes escolar, familiar e social.
  `,
  "Padrão": `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - [ESPECIALIDADE]

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - [Descreva a avaliação inicial, a queixa principal e a hipótese diagnóstica.]

2. OBJETIVO GERAL:
   - [Descreva o objetivo principal e abrangente da intervenção.]

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
   - Objetivo 1: [Descreva um objetivo mensurável e específico.]
   - Objetivo 2: [Descreva um objetivo mensurável e específico.]
   - Objetivo 3: [Descreva um objetivo mensurável e específico.]

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
   - Objetivo 1: [Descreva um objetivo mensurável e específico.]
   - Objetivo 2: [Descreva um objetivo mensurável e específico.]
   - Objetivo 3: [Descreva um objetivo mensurável e específico.]

5. ESTRATÉGIAS E INTERVENÇÕES:
   - [Liste as abordagens, técnicas e estratégias que serão utilizadas.]
   - [Ex: Terapia Cognitivo-Comportamental, Integração Sensorial, Orientação Parental, etc.]

6. CRITÉRIOS DE REAVALIAÇÃO E ALTA:
   - [Descreva como o progresso será medido, a frequência das reavaliações e quais são os critérios para a alta terapêutica.]
  `
};

// Map other specialties to the main ones
therapeuticPlanModels["Psicomotricidade"] = therapeuticPlanModels["Terapia Ocupacional"];
therapeuticPlanModels["Fisioterapia"] = therapeuticPlanModels["Terapia Ocupacional"];
therapeuticPlanModels["Psicopedagogia"] = therapeuticPlanModels["Psicologia"];
therapeuticPlanModels["Musicoterapia"] = therapeuticPlanModels["Psicologia"];
therapeuticPlanModels["Nutrição"] = therapeuticPlanModels["Terapia Ocupacional"];

interface TherapeuticPlanFormProps {
  specialty: string;
}

export const TherapeuticPlanForm = ({ specialty }: TherapeuticPlanFormProps) => {
  const [planContent, setPlanContent] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const planRef = useRef<HTMLDivElement>(null);

  const generatePlan = () => {
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente primeiro.");
      return;
    }
    const template = therapeuticPlanModels[specialty] || therapeuticPlanModels["Padrão"];
    const personalizedTemplate = template.replace(/\[NOME DO PACIENTE\]/g, selectedPatient);
    setPlanContent(personalizedTemplate.trim());
    toast.success("Modelo de Plano Terapêutico gerado!");
  };

  const handleDownloadPDF = () => {
    if (!planRef.current || !planContent) {
      toast.error("Gere ou preencha o plano antes de baixar o PDF.");
      return;
    }
    if (!selectedPatient) {
      toast.error("Por favor, selecione um paciente para nomear o arquivo PDF.");
      return;
    }
    toast.info("Gerando PDF do Plano Terapêutico...");

    planRef.current.classList.add('pdf-render');

    html2canvas(planRef.current, {
      scale: 2,
      useCORS: true,
      onclone: (document) => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          const div = document.createElement('div');
          div.style.whiteSpace = 'pre-wrap';
          div.style.wordWrap = 'break-word';
          div.style.padding = '8px 12px';
          div.style.fontSize = '14px';
          div.style.lineHeight = '1.5';
          div.style.fontFamily = 'sans-serif';
          div.style.color = '#000';
          div.innerText = textarea.value;
          textarea.parentNode?.replaceChild(div, textarea);
        }
      }
    }).then((canvas) => {
      planRef.current?.classList.remove('pdf-render');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(`Plano_Terapeutico_${specialty}_${selectedPatient.replace(/\s+/g, '_')}.pdf`);
      toast.success("PDF gerado com sucesso!");
    }).catch(err => {
      planRef.current?.classList.remove('pdf-render');
      console.error("Erro ao gerar PDF:", err);
      toast.error("Ocorreu um erro ao gerar o PDF.");
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="font-bold text-lg">Nome do Paciente</Label>
        <Select onValueChange={setSelectedPatient} value={selectedPatient}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um paciente" />
          </SelectTrigger>
          <SelectContent>
            {patientsData.map((patient) => (
              <SelectItem key={patient.id} value={patient.name}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={generatePlan} className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" />
            Gerar Modelo de Plano
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => toast.success("Plano salvo com sucesso!")}>
            Salvar Plano
          </Button>
        </div>
        <div ref={planRef}>
          <Textarea
            placeholder="Selecione um paciente e clique em 'Gerar Modelo de Plano' para começar."
            value={planContent}
            onChange={(e) => setPlanContent(e.target.value)}
            rows={25}
            className="font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};