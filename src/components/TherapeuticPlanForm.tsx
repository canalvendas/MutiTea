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
import { Checkbox } from "@/components/ui/checkbox";

// --- Estrutura de Dados para o Novo Gerador ---

// 1. Demandas Comuns (O que o usuário vai selecionar)
const demandasComuns = [
  { id: "interacao_social", label: "Dificuldades na Interação Social" },
  { id: "comunicacao", label: "Desafios na Comunicação (Verbal/Não-Verbal)" },
  { id: "regulacao_emocional", label: "Desregulação Emocional e Comportamental" },
  { id: "flexibilidade_cognitiva", label: "Rigidez Cognitiva e Dificuldade com Mudanças" },
  { id: "processamento_sensorial", label: "Questões de Processamento Sensorial" },
  { id: "habilidades_motoras", label: "Atraso ou Dificuldades nas Habilidades Motoras" },
  { id: "desempenho_academico", label: "Dificuldades no Desempenho Acadêmico" },
  { id: "autonomia_avds", label: "Baixa Autonomia nas Atividades de Vida Diária (AVDs)" },
  { id: "seletividade_alimentar", label: "Seletividade Alimentar" },
];

// 2. Objetivos Mapeados por Demanda
const objetivosPorDemanda = {
  interacao_social: {
    curtoPrazo: [
      "Aumentar o contato visual sustentado durante interações.",
      "Responder a cumprimentos e perguntas sociais simples com mediação.",
      "Participar de jogos de troca de turnos por 5-10 minutos.",
      "Manter proximidade física adequada com pares em atividades estruturadas.",
    ],
    medioPrazo: [
      "Iniciar interações com pares em 3 a 5 oportunidades por sessão.",
      "Manter 2-3 trocas de turno em uma conversa sobre um tema de interesse.",
      "Desenvolver habilidades de Teoria da Mente, identificando o que o outro pode estar pensando/sentindo em situações simples.",
      "Utilizar scripts sociais para situações como pedir ajuda ou entrar em uma brincadeira.",
    ],
  },
  comunicacao: {
    curtoPrazo: [
      "Utilizar um gesto ou CAA para fazer 3 tipos de pedidos diferentes por sessão.",
      "Apontar para objetos de interesse para compartilhar atenção.",
      "Aumentar o Comprimento Médio do Enunciado (CME) para 2 palavras (ex: 'quero bola').",
      "Responder ao próprio nome em 80% das oportunidades em ambiente controlado.",
    ],
    medioPrazo: [
      "Produzir frases de 3-4 palavras com estrutura gramatical simples.",
      "Reduzir o uso de ecolalia imediata, substituindo-a por respostas funcionais.",
      "Utilizar a comunicação para comentar ou mostrar algo ao outro, além de apenas pedir.",
      "Compreender e responder a perguntas de 'Onde?' e 'Quem?'.",
    ],
  },
  regulacao_emocional: {
    curtoPrazo: [
      "Identificar e nomear emoções básicas (alegria, tristeza, raiva) em si e nos outros com apoio visual.",
      "Utilizar uma estratégia de co-regulação (ex: respiração, pedir um abraço) com mediação do terapeuta.",
      "Tolerar a frustração de 'perder' em um jogo simples com suporte verbal.",
      "Comunicar a necessidade de uma pausa quando se sentir sobrecarregado.",
    ],
    medioPrazo: [
      "Utilizar de forma mais autônoma uma estratégia de autorregulação (ex: ir para um canto calmo) em momentos de frustração.",
      "Expressar necessidades e sentimentos de forma verbal ou através de CAA, em vez de comportamentos disruptivos.",
      "Aguardar por sua vez ou por um item desejado por até 2 minutos sem desregulação.",
      "Reconhecer os sinais corporais iniciais de desregulação (ex: mãos suando, coração acelerado).",
    ],
  },
  flexibilidade_cognitiva: {
    curtoPrazo: [
      "Aceitar pequenas alterações na rotina da sessão (ex: mudar a ordem de duas atividades) com previsibilidade e suporte.",
      "Participar de uma atividade não preferida por 5 minutos antes de acessar um reforçador.",
      "Alternar entre duas atividades simples com comando verbal.",
      "Aceitar uma forma diferente de realizar uma tarefa conhecida (ex: construir uma torre com blocos diferentes).",
    ],
    medioPrazo: [
      "Lidar com mudanças inesperadas na rotina com menor desregulação.",
      "Generalizar uma habilidade aprendida para um novo contexto ou com um material diferente.",
      "Resolver um problema simples que exige uma solução diferente da habitual.",
      "Aceitar a derrota em jogos competitivos com menor desregulação emocional.",
    ],
  },
  processamento_sensorial: {
    curtoPrazo: [
      "Tolerar o toque em 3 texturas diferentes (ex: massinha, areia, espuma) por 5 minutos com suporte.",
      "Permanecer em um ambiente com ruído moderado (ex: música baixa) por 10 minutos sem comportamentos de fuga.",
      "Utilizar uma ferramenta de estímulo oral (mordedor) como estratégia organizatória.",
      "Participar de atividades que envolvam movimento vestibular (balanço) de forma segura e regulada.",
    ],
    medioPrazo: [
      "Utilizar uma estratégia de 'dieta sensorial' (ex: buscar pressão profunda) de forma mais autônoma quando se sentir desorganizado.",
      "Participar de atividades em grupo pequeno com ruído ambiente sem apresentar comportamentos de fuga.",
      "Diminuir a frequência de busca por estímulos sensoriais de forma inadequada (ex: levar objetos não comestíveis à boca).",
      "Demonstrar respostas adaptativas a estímulos sensoriais que antes geravam defensividade.",
    ],
  },
  habilidades_motoras: {
    curtoPrazo: [
      "Melhorar a preensão do lápis para uma preensão trípode funcional com ou sem adaptador.",
      "Realizar um circuito motor simples de 3 etapas com demonstração e auxílio físico mínimo.",
      "Recortar uma linha reta de 10cm com a tesoura.",
      "Arremessar e tentar pegar uma bola grande a uma curta distância.",
    ],
    medioPrazo: [
      "Recortar formas geométricas simples (círculo, quadrado) seguindo a linha.",
      "Alternar os pés para subir e descer escadas com autonomia.",
      "Escrever o próprio nome com caligrafia legível.",
      "Demonstrar melhor planejamento motor para aprender uma nova sequência de movimentos.",
    ],
  },
  desempenho_academico: {
    curtoPrazo: [
      "Permanecer sentado e focado em uma tarefa acadêmica por 10 minutos com supervisão.",
      "Seguir instruções de duas etapas em sala de aula.",
      "Organizar o próprio material (estojo, caderno) com um checklist visual.",
      "Iniciar uma tarefa acadêmica com no máximo um comando verbal.",
    ],
    medioPrazo: [
      "Completar tarefas acadêmicas com maior autonomia, solicitando ajuda quando necessário.",
      "Desenvolver a consciência fonológica, identificando rimas e sons iniciais.",
      "Resolver problemas matemáticos simples que envolvam uma operação.",
      "Melhorar a compreensão leitora de textos curtos, sendo capaz de responder a perguntas literais sobre a história.",
    ],
  },
  autonomia_avds: {
    curtoPrazo: [
      "Lavar e secar as mãos de forma independente com supervisão.",
      "Participar ativamente no ato de se vestir, realizando 2 etapas de forma independente (ex: puxar a calça, calçar as meias).",
      "Utilizar os talheres (garfo/colher) para se alimentar com auxílio mínimo.",
      "Guardar os próprios brinquedos após o uso com ajuda de um roteiro visual.",
    ],
    medioPrazo: [
      "Realizar a sequência completa de escovação dos dentes com supervisão mínima.",
      "Vestir-se e despir-se de forma quase totalmente independente, necessitando de ajuda apenas para botões ou zíperes complexos.",
      "Servir a própria água de uma jarra pequena.",
      "Preparar um lanche simples (ex: passar manteiga no pão).",
    ],
  },
  seletividade_alimentar: {
    curtoPrazo: [
      "Tolerar um alimento novo no prato, sem a exigência de provar.",
      "Tocar em um alimento novo com um utensílio (garfo).",
      "Cheirar um alimento novo.",
      "Lamber ou dar uma pequena mordida em um alimento novo, mesmo que o cuspa.",
    ],
    medioPrazo: [
      "Aceitar experimentar um novo alimento a cada 1-2 semanas.",
      "Aumentar o repertório alimentar com pelo menos 2 novos alimentos de cada grupo (frutas, vegetais, proteínas).",
      "Aceitar variações na apresentação de um alimento já aceito (ex: cenoura cozida e crua).",
      "Participar de refeições familiares com menor ansiedade e comportamentos de recusa.",
    ],
  },
};

// 3. Modelos Base por Especialidade com Placeholders
const baseTemplates: Record<string, string> = {
  Psicologia: `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - PSICOLOGIA

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - Paciente apresenta diagnóstico de Transtorno do Espectro Autista (TEA), com desafios predominantes nas áreas de comunicação social, flexibilidade cognitiva e regulação emocional, conforme demandas selecionadas.

2. OBJETIVO GERAL:
   - Promover o desenvolvimento de habilidades socioemocionais, comunicativas e cognitivas, visando maior autonomia, bem-estar e qualidade de vida para o paciente e sua família.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
[OBJETIVOS_CURTO_PRAZO]

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
[OBJETIVOS_MEDIO_PRAZO]

5. ESTRATÉGIAS E INTERVENÇÕES:
   - Abordagem baseada nos princípios da Análise do Comportamento Aplicada (ABA) e Terapia Cognitivo-Comportamental (TCC) adaptada.
   - Treinamento de Habilidades Sociais através de role-playing, histórias sociais e modelagem.
   - Psicoeducação emocional com uso de recursos visuais (ex: termômetro das emoções).
   - Intervenções baseadas no Modelo Denver de Intervenção Precoce (ESDM) para engajamento e iniciativa.
   - Orientação parental semanal/quinzenal para generalização das habilidades em casa.

6. CRITÉRIOS DE REAVALIAÇÃO E ALTA:
   - O plano será reavaliado a cada 3 meses, com base nos registros de sessão e feedback familiar.
   - Os critérios de alta envolvem a generalização das habilidades para os ambientes naturalísticos (casa, escola), a redução significativa de comportamentos desafiadores e a melhora na qualidade da interação social e bem-estar do paciente.
  `,
  Fonoaudiologia: `
PLANO TERAPÊUTICO INDIVIDUAL (PTI) - FONOAUDIOLOGIA

Paciente: [NOME DO PACIENTE]
Data de Início: [DATA]
Terapeuta Responsável: [SEU NOME]

1. AVALIAÇÃO INICIAL E DIAGNÓSTICO (HIPÓTESE):
   - Paciente com diagnóstico de Transtorno do Espectro Autista (TEA), apresentando desafios na comunicação verbal e não-verbal, pragmática e, potencialmente, no processamento auditivo e alimentação, conforme demandas selecionadas.

2. OBJETIVO GERAL:
   - Desenvolver habilidades de comunicação funcional e eficaz, ampliando as capacidades receptivas e expressivas, promovendo a interação social através da linguagem e adequando o sistema sensório-motor-oral.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
[OBJETIVOS_CURTO_PRAZO]

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
[OBJETIVOS_MEDIO_PRAZO]

5. ESTRATÉGIAS E INTERVENÇÕES:
   - Terapia de linguagem com base em abordagens naturalistas e desenvolvimentistas.
   - Implementação e/ou expansão de Sistema de Comunicação Alternativa e Aumentativa (CAA), como PECS ou aplicativos.
   - Estratégias para estimulação da atenção compartilhada e intenção comunicativa.
   - Trabalho com pistas visuais para apoiar a compreensão e a expressão.
   - Se aplicável, abordagem para seletividade alimentar com foco em dessensibilização oral e hierarquia de exposição.

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
   - Paciente com diagnóstico de Transtorno do Espectro Autista (TEA), com disfunção de integração sensorial, impactando o desempenho ocupacional em Atividades de Vida Diária (AVDs), brincar e participação social, conforme demandas selecionadas.

2. OBJETIVO GERAL:
   - Promover a participação e independência nas ocupações significativas da infância, através da melhora na modulação sensorial, planejamento motor e desenvolvimento de habilidades funcionais.

3. OBJETIVOS ESPECÍFICOS A CURTO PRAZO (Próximos 3 meses):
[OBJETIVOS_CURTO_PRAZO]

4. OBJETIVOS ESPECÍFICOS A MÉDIO PRAZO (Próximos 6 meses):
[OBJETIVOS_MEDIO_PRAZO]

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
};

// Mapeamento para outras especialidades usarem templates base
const specialtyMapping = {
  "Psicomotricidade": "Terapia Ocupacional",
  "Fisioterapia": "Terapia Ocupacional",
  "Psicopedagogia": "Psicologia",
  "Musicoterapia": "Psicologia",
  "Nutrição": "Terapia Ocupacional",
  "Padrão": "Psicologia",
};

interface TherapeuticPlanFormProps {
  specialty: string;
  therapistName: string;
}

export const TherapeuticPlanForm = ({ specialty, therapistName }: TherapeuticPlanFormProps) => {
  const [planContent, setPlanContent] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDemands, setSelectedDemands] = useState<string[]>([]);
  const planRef = useRef<HTMLDivElement>(null);

  const handleDemandChange = (demandId: string) => {
    setSelectedDemands(prev =>
      prev.includes(demandId)
        ? prev.filter(id => id !== demandId)
        : [...prev, demandId]
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

    const mappedSpecialty = specialtyMapping[specialty as keyof typeof specialtyMapping] || specialty;
    let template = baseTemplates[mappedSpecialty as keyof typeof baseTemplates] || baseTemplates.Psicologia;

    const shortTermGoals: string[] = [];
    const mediumTermGoals: string[] = [];

    selectedDemands.forEach(demandId => {
      const goals = objetivosPorDemanda[demandId as keyof typeof objetivosPorDemanda];
      if (goals) {
        shortTermGoals.push(...goals.curtoPrazo);
        mediumTermGoals.push(...goals.medioPrazo);
      }
    });

    const formattedShortTermGoals = shortTermGoals.length > 0
      ? shortTermGoals.map(g => `   - ${g}`).join('\n')
      : "   - (Nenhum objetivo de curto prazo gerado para as demandas selecionadas)";

    const formattedMediumTermGoals = mediumTermGoals.length > 0
      ? mediumTermGoals.map(g => `   - ${g}`).join('\n')
      : "   - (Nenhum objetivo de médio prazo gerado para as demandas selecionadas)";

    const personalizedTemplate = template
      .replace(/\[NOME DO PACIENTE\]/g, selectedPatient)
      .replace(/\[DATA\]/g, new Date().toLocaleDateString('pt-BR'))
      .replace(/\[SEU NOME\]/g, therapistName)
      .replace('[OBJETIVOS_CURTO_PRAZO]', formattedShortTermGoals)
      .replace('[OBJETIVOS_MEDIO_PRAZO]', formattedMediumTermGoals);

    setPlanContent(personalizedTemplate.trim());
    toast.success("Plano Terapêutico personalizado gerado!");
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
      let position = 10; // Add margin

      pdf.addImage(imgData, 'PNG', 10, position, pdfWidth - 20, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= -20) { // Adjust for margin
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, pdfWidth - 20, pdfHeight);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-bold text-lg">1. Nome do Paciente</Label>
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
        <div className="space-y-2">
          <Label className="font-bold text-lg">2. Principais Demandas do Paciente</Label>
          <div className="p-4 border rounded-md max-h-48 overflow-y-auto space-y-2">
            {demandasComuns.map(demanda => (
              <div key={demanda.id} className="flex items-center space-x-2">
                <Checkbox
                  id={demanda.id}
                  checked={selectedDemands.includes(demanda.id)}
                  onCheckedChange={() => handleDemandChange(demanda.id)}
                />
                <Label htmlFor={demanda.id} className="font-normal cursor-pointer">{demanda.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={generatePlan} className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" />
            3. Gerar Plano Personalizado
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
            placeholder="Selecione um paciente, escolha as demandas e clique em 'Gerar Plano' para começar."
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