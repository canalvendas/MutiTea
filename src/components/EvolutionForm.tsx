"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type EvolutionField = {
  id: string;
  label: string;
  description?: string;
  type: "textarea" | "section-header" | "date";
  placeholder?: string;
  defaultValue?: any;
  suggestions?: string[];
};

const evolutionModels: Record<string, EvolutionField[]> = {
  "Psicologia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidador", label: "Relato do Cuidador/Paciente", type: "textarea", placeholder: "Descreva o relato da família ou clique nas sugestões abaixo...", suggestions: [
        "Família reporta dados sobre a frequência/intensidade de comportamentos-alvo.",
        "Relato de um antecedente específico que eliciou comportamento desafiador.",
        "Cuidador descreve tentativa de generalização de [habilidade] em ambiente [doméstico/escolar].",
        "Paciente comunicou verbalmente/não-verbalmente sobre [evento/sentimento].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoComportamental", label: "Observação Comportamental e Dados da Sessão", type: "textarea", placeholder: "Descreva o comportamento do paciente na sessão...", suggestions: [
        "Latência de resposta para instruções foi de [tempo].",
        "Apresentou [n] episódios de [comportamento] com duração média de [tempo].",
        "Necessitou de [tipo de dica: física, verbal, gestual, visual] para completar a tarefa.",
        "Engajou em [n] trocas de turno durante atividade de brincar compartilhado.",
      ] 
    },
    { id: "atividadesRealizadas", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos da sessão...", suggestions: [
        "Sessão estruturada com foco em treino de habilidades de Teoria da Mente.",
        "Realizado treino de habilidades sociais em contexto de [role-playing/jogo de regras].",
        "Trabalhou-se regulação emocional utilizando a escala de [ex: Zonas de Regulação, Termômetro das Emoções].",
        "Utilizado o interesse focado em [tema] para trabalhar flexibilidade cognitiva.",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseSessao", label: "Análise Funcional e Progresso", type: "textarea", placeholder: "Analise o desempenho e progresso do paciente...", suggestions: [
        "A análise funcional sugere que o comportamento [comportamento] tem função de [atenção/fuga/sensorial/acesso a tangíveis].",
        "Paciente demonstrou progresso em relação à linha de base na habilidade de [habilidade].",
        "Observa-se dificuldade na generalização de [habilidade] para outros contextos/pessoas.",
        "Respondeu positivamente a estratégias de reforçamento [contínuo/intermitente] com [reforçador].",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoProximaSessao", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Manter o foco no desenvolvimento de [habilidade], aumentando o critério para [novo critério].",
        "Introduzir treino de [nova habilidade] através de [estratégia, ex: DTT, NET].",
        "Coletar dados sobre a latência para seguir instruções de [tipo de instrução].",
      ] 
    },
    { id: "orientacaoFamilia", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações para cuidadores...", suggestions: [
        "Orientado aos pais que utilizem [estratégia de antecedente, ex: timer, quadro de rotina] para [situação].",
        "Modelado para a família como aplicar o procedimento de [procedimento, ex: extinção, reforçamento diferencial].",
        "Sugerido à escola o uso de [suporte visual] para facilitar a compreensão de [demanda].",
      ] 
    },
  ],
  "Fonoaudiologia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorFono", label: "Relato do Cuidador", type: "textarea", placeholder: "Descreva o relato da família...", suggestions: [
        "Família relata uso de ecolalia [imediata/tardia] em contexto [funcional/não-funcional].",
        "Paciente utilizou o sistema de CAA para [função comunicativa, ex: solicitar, comentar, protestar].",
        "Relato de seletividade alimentar com recusa de alimentos de textura [textura].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoFono", label: "Observação Clínica", type: "textarea", placeholder: "Descreva as observações clínicas...", suggestions: [
        "Amostra de fala evidencia prosódia [monótona/cantada/fraseada].",
        "Inteligibilidade de fala estimada em [porcentagem] para ouvintes não familiares.",
        "Demonstrou compreensão de [tipo de pergunta, ex: 'o que', 'onde', 'por que'].",
        "Apresentou [n] atos comunicativos por minuto durante a atividade.",
      ] 
    },
    { id: "atividadesFono", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos...", suggestions: [
        "Terapia focada em expandir o CCE (Comprimento e Complexidade do Enunciado).",
        "Trabalhou-se a compreensão de inferências e linguagem figurada através de [material].",
        "Estimuladas habilidades pragmáticas de manutenção de tópico conversacional.",
        "Realizada dessensibilização oral para texturas [ásperas/pastosas].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseFono", label: "Análise da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente...", suggestions: [
        "Observou-se melhora na articulação do fonema-alvo [fonema] em nível de [palavra/frase].",
        "O uso de modelagem e pistas fonéticas foi eficaz para a produção de [alvo].",
        "Paciente demonstrou maior autonomia na navegação do sistema de CAA.",
        "Ainda apresenta rigidez na interpretação literal de enunciados.",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoFono", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Continuar com atividades para expansão do léxico e da morfossintaxe.",
        "Introduzir atividades que exijam a tomada de perspectiva do outro.",
        "Avançar na hierarquia de exposição a novos alimentos.",
      ] 
    },
    { id: "orientacaoFono", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações...", suggestions: [
        "Orientar a família a usar a estratégia de 'escolha guiada' para estimular a comunicação.",
        "Sugerir à escola que forneça tempo de espera adicional para o processamento de informações verbais.",
      ] 
    },
  ],
  "Terapia Ocupacional": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorTO", label: "Relato do Cuidador", type: "textarea", placeholder: "Descreva o relato da família...", suggestions: [
        "Família relata que o paciente participou da AVD de [vestuário/alimentação/higiene] com [nível de independência].",
        "Apresentou comportamento de [busca/evitação] sensorial em [contexto, ex: supermercado, parquinho].",
        "Relato de dificuldade com a caligrafia e organização do material escolar.",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoTO", label: "Observação Clínica", type: "textarea", placeholder: "Descreva as observações clínicas...", suggestions: [
        "Nível de alerta [hipo/hiper-responsivo], necessitando de estratégias de modulação.",
        "Demonstrou dificuldades de práxis (planejamento motor) para [tarefa nova].",
        "Apresentou preensão de lápis [tipo de preensão] e pressão [forte/fraca] sobre o papel.",
        "Tolerou [n] minutos de estimulação [vestibular/tátil] antes de precisar de uma pausa.",
      ] 
    },
    { id: "atividadesTO", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos...", suggestions: [
        "Sessão focada em integração sensorial com oferta de estímulos proprioceptivos e vestibulares para regulação.",
        "Trabalhou-se o sequenciamento de [n] etapas para a AVD de [escovar os dentes].",
        "Realizadas atividades de integração viso-motora com foco em [recorte/desenho].",
        "Utilizada a abordagem de 'alerta' para promover a autorregulação.",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseTO", label: "Análise da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente...", suggestions: [
        "Paciente demonstrou melhora na modulação de respostas a estímulos sensoriais.",
        "A qualidade do planejamento motor foi superior com o uso de pistas visuais.",
        "Ainda apresenta dificuldades na dissociação de movimentos e coordenação bilateral.",
        "O uso de [adaptação, ex: assento sensorial] melhorou a permanência na tarefa.",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoTO", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Graduar o desafio motor no circuito, aumentando a complexidade da sequência.",
        "Focar no refinamento da preensão e manipulação de pequenos objetos.",
        "Introduzir a AVD de [amarrar os sapatos] usando a técnica de [encadeamento para trás].",
      ] 
    },
    { id: "orientacaoTO", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações...", suggestions: [
        "Recomendar a implementação de uma 'dieta sensorial' com atividades de [pressão profunda/movimento] antes de tarefas que exigem atenção.",
        "Sugerir adaptações como [engrossador de lápis, tesoura adaptada] para a escola.",
      ] 
    },
  ],
  "Psicopedagogia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoPp", label: "Relato da Família/Escola", type: "textarea", placeholder: "Descreva o relato...", suggestions: [
        "Escola relata dificuldade do aluno em [habilidade, ex: iniciar tarefas, seguir instruções múltiplas].",
        "Família descreve desafios na organização da rotina de estudos e lição de casa.",
        "Aluno expressa [interesse/frustração] em relação a [disciplina/conteúdo].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoPp", label: "Observação e Atividades Realizadas", type: "textarea", placeholder: "Descreva as observações...", suggestions: [
        "Apresentou dificuldade de coerência central, focando em detalhes irrelevantes do texto.",
        "Demonstrou rigidez cognitiva ao tentar resolver um problema de uma única maneira.",
        "Utilizou [estratégia de função executiva, ex: auto-instrução, planejamento em etapas] com sucesso.",
        "Atividades focadas em [habilidade, ex: consciência fonológica, compreensão leitora, cálculo mental].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analisePp", label: "Análise Psicopedagógica", type: "textarea", placeholder: "Analise o desempenho...", suggestions: [
        "A análise indica que a dificuldade de aprendizagem está relacionada a déficits em [função executiva, ex: memória de trabalho, controle inibitório].",
        "Paciente se beneficia de apoios visuais e da fragmentação de tarefas.",
        "Apresenta bom desempenho em decodificação (hiperlexia), mas com baixo desempenho em compreensão.",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoPp", label: "Plano de Intervenção", type: "textarea", placeholder: "Defina o plano...", suggestions: [
        "Focar no desenvolvimento de estratégias de organização e planejamento.",
        "Introduzir o uso de [ferramenta, ex: mapas mentais, checklists] para apoiar a aprendizagem.",
        "Orientar a escola sobre adaptações curriculares e de avaliação.",
      ] 
    },
  ],
  "Fisioterapia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoFisio", label: "Relato do Cuidador", type: "textarea", placeholder: "Descreva o relato...", suggestions: [
        "Família relata frequência de quedas em [contexto].",
        "Paciente queixa-se de fadiga durante atividades motoras prolongadas.",
        "Observada persistência da marcha na ponta dos pés em [situações].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoFisio", label: "Avaliação e Atividades Realizadas", type: "textarea", placeholder: "Descreva as observações...", suggestions: [
        "Avaliação postural evidencia [ex: anteriorização da cabeça, hiperlordose lombar].",
        "Observada hipotonia axial e tônus flutuante em membros.",
        "Realizados exercícios de fortalecimento do core e estabilização pélvica.",
        "Treino de equilíbrio [estático/dinâmico] em [superfície instável/base reduzida].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseFisio", label: "Análise Fisioterapêutica", type: "textarea", placeholder: "Analise o desempenho...", suggestions: [
        "Paciente demonstrou melhora no controle de tronco durante as atividades.",
        "A marcha apresenta maior dissociação de cinturas, mas o contato do calcâneo ainda é inconsistente.",
        "A resistência muscular à fadiga aumentou em [x] minutos.",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoFisio", label: "Plano Terapêutico", type: "textarea", placeholder: "Defina o plano...", suggestions: [
        "Progredir com exercícios de fortalecimento, aumentando a carga/repetições.",
        "Introduzir treino de marcha com pistas visuais/auditivas para estimular o contato do calcâneo.",
        "Orientar a família sobre alongamentos para [músculos encurtados, ex: gastrocnêmios].",
      ] 
    },
  ],
  "Padrão": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorPadrao", label: "Relato do Cuidador/Paciente", type: "textarea", placeholder: "Descreva o relato da família ou do paciente...", suggestions: ["Família relata semana sem intercorrências.", "Paciente reporta melhora em [aspecto].", "Cuidador expressa preocupação com [comportamento]."] },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoPadrao", label: "Observação Clínica e Atividades Realizadas", type: "textarea", placeholder: "Descreva o comportamento e as atividades...", suggestions: ["Paciente demonstrou bom engajamento.", "Foram realizadas atividades com foco em [objetivo].", "Apresentou-se [cooperativo/resistente] durante a sessão."] },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analisePadrao", label: "Análise Profissional da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente...", suggestions: ["Observa-se progresso em relação a [objetivo].", "Paciente atingiu o critério para [meta].", "Ainda necessita de suporte para [habilidade]."] },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoPadrao", label: "Plano Terapêutico e Orientações", type: "textarea", placeholder: "Defina os próximos passos...", suggestions: ["Manter objetivos atuais para a próxima sessão.", "Reavaliar [aspecto] na próxima semana.", "Orientado à família que [orientação]."] },
  ],
};

evolutionModels["Psicomotricidade"] = evolutionModels["Terapia Ocupacional"];
evolutionModels["Musicoterapia"] = evolutionModels["Padrão"]; // Placeholder, can be detailed later
evolutionModels["Nutrição"] = evolutionModels["Padrão"]; // Placeholder, can be detailed later


interface EvolutionFormProps {
  specialty: string;
}

export const EvolutionForm = ({ specialty }: EvolutionFormProps) => {
  const currentModel = evolutionModels[specialty] || evolutionModels["Padrão"];

  const dynamicSchema = z.object(
    currentModel.reduce((acc, field) => {
      if (field.type !== "section-header") {
        return { ...acc, [field.id]: z.string().optional() };
      }
      return acc;
    }, {})
  );

  type EvolutionFormData = z.infer<typeof dynamicSchema>;

  const form = useForm<EvolutionFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: currentModel.reduce((acc, field) => {
      if (field.type !== "section-header") {
        acc[field.id as keyof EvolutionFormData] = field.defaultValue || "";
      }
      return acc;
    }, {} as EvolutionFormData),
  });

  const handleSuggestionClick = (fieldName: keyof EvolutionFormData, suggestion: string) => {
    const currentValue = form.getValues(fieldName) || "";
    const newValue = currentValue ? `${currentValue}\n- ${suggestion}` : `- ${suggestion}`;
    form.setValue(fieldName, newValue, { shouldValidate: true });
  };

  const onSubmit = (data: EvolutionFormData) => {
    console.log("Evolution submitted:", data);
    toast.success("Registro de evolução salvo com sucesso!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {currentModel.map((field) => {
          if (field.type === "section-header") {
            return (
              <div key={field.id} className="pt-4">
                <h3 className="text-lg font-semibold text-primary border-b pb-2">{field.label}</h3>
              </div>
            );
          }

          return (
            <FormField
              key={field.id}
              control={form.control}
              name={field.id as keyof EvolutionFormData}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="font-bold">{field.label}</FormLabel>
                  {field.description && <FormDescription>{field.description}</FormDescription>}
                  <FormControl>
                    {field.type === "textarea" ? (
                      <Textarea placeholder={field.placeholder} {...formField} rows={5} />
                    ) : (
                      <Input type={field.type} placeholder={field.placeholder} {...formField} />
                    )}
                  </FormControl>
                  {field.suggestions && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {field.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => handleSuggestionClick(field.id as keyof EvolutionFormData, suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit" className="mt-6">Salvar Evolução</Button>
      </form>
    </Form>
  );
};