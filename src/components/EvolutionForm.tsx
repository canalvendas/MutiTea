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
        "Família relata semana tranquila, com boa adesão às rotinas estabelecidas.",
        "Cuidador reporta aumento de [comportamento, ex: estereotipias] em situações de [contexto, ex: ansiedade, frustração].",
        "Paciente demonstrou interesse em [atividade] e compartilhou a experiência com a família.",
        "Houve um episódio de crise comportamental relacionado a [gatilho, ex: quebra de rotina, sobrecarga sensorial].",
        "Relato de melhora na [habilidade, ex: comunicação, interação social] na escola.",
        "Apresentou dificuldade em lidar com frustrações em [situação específica].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoComportamental", label: "Observação Comportamental", type: "textarea", placeholder: "Descreva o comportamento do paciente na sessão...", suggestions: [
        "Paciente chegou [humor, ex: tranquilo, agitado, sonolento].",
        "Demonstrou bom engajamento nas atividades propostas.",
        "Apresentou baixa tolerância à frustração diante de desafios.",
        "Contato visual foi [consistente, inconstante, raro] durante a sessão.",
        "Foram observados comportamentos de busca sensorial [tátil, vestibular, proprioceptiva].",
        "Utilizou a comunicação [verbal, não-verbal, por CAA] para expressar suas vontades.",
      ] 
    },
    { id: "atividadesRealizadas", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos da sessão...", suggestions: [
        "Foram realizadas atividades lúdicas com foco em atenção compartilhada e troca de turnos.",
        "Trabalhou-se a habilidade de Teoria da Mente através de [atividade, ex: histórias sociais, role-playing].",
        "Sessão focada em regulação emocional, utilizando [estratégia, ex: espaço da calma, técnicas de respiração].",
        "Explorou-se o tema de [interesse restrito] para trabalhar habilidades de [habilidade, ex: flexibilização, conversação].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseSessao", label: "Análise da Sessão", type: "textarea", placeholder: "Analise o desempenho e progresso do paciente...", suggestions: [
        "O paciente demonstrou progresso na habilidade de [habilidade], sendo capaz de [marco alcançado].",
        "Apresentou dificuldade em [tarefa], necessitando de [suporte, ex: mediação total, dica visual].",
        "Respondeu positivamente à estratégia de [estratégia], demonstrando maior [resultado, ex: engajamento, calma].",
        "A queixa inicial de [queixa] se manifestou através de [comportamento observado].",
        "Observa-se evolução na capacidade de [habilidade], embora ainda precise de suporte para generalização.",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoProximaSessao", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Manter o foco no desenvolvimento de [habilidade].",
        "Introduzir gradualmente [nova atividade/desafio].",
        "Reforçar o uso de [estratégia de regulação/comunicação].",
        "Dar continuidade ao trabalho de [objetivo] utilizando novos materiais.",
      ] 
    },
    { id: "orientacaoFamilia", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações para cuidadores...", suggestions: [
        "Orientado aos pais que reforcem [comportamento] em casa através de [estratégia].",
        "Sugerido à escola a utilização de [recurso, ex: quadro de rotina, comunicador visual] para auxiliar em [demanda].",
        "Discutido com a família a importância de manter a consistência na [rotina/estratégia].",
      ] 
    },
  ],
  "Fonoaudiologia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorFono", label: "Relato do Cuidador", type: "textarea", placeholder: "Descreva o relato da família...", suggestions: [
        "Família relata que o paciente tentou comunicar [necessidade] usando [gestos/palavras/CAA].",
        "Apresentou [dificuldade/avanço] na aceitação de novos alimentos.",
        "Utilizou [fala espontânea/ecolalia] em contexto de [situação].",
        "Demonstrou compreender comandos [simples/complexos] em casa.",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoFono", label: "Observação Clínica", type: "textarea", placeholder: "Descreva as observações clínicas...", suggestions: [
        "Paciente apresentou padrão de fala com [característica, ex: ecolalias, jargão, prosódia atípica].",
        "Nível de atenção esteve [bom/disperso] durante as atividades.",
        "Intenção comunicativa [presente/ausente], iniciando interações [n] vezes.",
        "Demonstrou bom uso de contato visual para sustentar a comunicação.",
      ] 
    },
    { id: "atividadesFono", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos...", suggestions: [
        "Terapia focada em aumento do vocabulário [receptivo/expressivo] através de [atividade].",
        "Trabalhou-se a estruturação de sentenças de [n] elementos.",
        "Estimulou-se habilidades pragmáticas como [habilidade, ex: iniciar conversas, respeitar turnos].",
        "Realizados exercícios de motricidade oral para [objetivo].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseFono", label: "Análise da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente...", suggestions: [
        "Observou-se melhora na [habilidade, ex: compreensão de comandos de 2 etapas].",
        "Apresentou [número] de produções verbais espontâneas e funcionais.",
        "Respondeu bem ao uso de [recurso, ex: pistas visuais, modelagem].",
        "Ainda apresenta dificuldade na articulação do fonema [fonema].",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoFono", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Continuar com atividades para expansão frasal.",
        "Introduzir o fonema [fonema] em atividades lúdicas.",
        "Generalizar o uso de [habilidade pragmática] para diferentes contextos.",
      ] 
    },
    { id: "orientacaoFono", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações...", suggestions: [
        "Sugerido aos pais que estimulem a nomeação de objetos durante [rotina, ex: o banho].",
        "Enviar para a escola um [material de apoio, ex: prancha de comunicação] para facilitar a interação.",
      ] 
    },
  ],
  "Terapia Ocupacional": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorTO", label: "Relato do Cuidador", type: "textarea", placeholder: "Descreva o relato da família...", suggestions: [
        "Família relata que o paciente conseguiu [realizar AVD, ex: vestir-se com menos ajuda].",
        "Apresentou [comportamento sensorial, ex: hipersensibilidade a sons] em [contexto].",
        "Participou de [atividade motora] na escola com [nível de sucesso].",
        "Demonstrou maior tolerância para [atividade, ex: cortar as unhas, experimentar nova comida].",
      ] 
    },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoTO", label: "Observação Clínica", type: "textarea", placeholder: "Descreva as observações clínicas...", suggestions: [
        "Nível de alerta esteve [adequado/alto/baixo], necessitando de estratégias de [modulação].",
        "Buscou/evitou estímulos [táteis/vestibulares/proprioceptivos] durante a sessão.",
        "Engajamento na atividade foi [bom/limitado], com permanência de [tempo] minutos.",
        "Demonstrou bom planejamento motor para superar o circuito de atividades.",
      ] 
    },
    { id: "atividadesTO", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Descreva as atividades e objetivos...", suggestions: [
        "Sessão focada em integração sensorial, com ênfase em estímulos [vestibulares/proprioceptivos].",
        "Trabalhou-se o planejamento motor através de circuito com [n] etapas.",
        "Realizada atividade de [AVD, ex: treino de vestuário, uso de talheres].",
        "Foco em habilidades de coordenação motora fina através de [atividade, ex: massinha, recorte].",
      ] 
    },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseTO", label: "Análise da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente...", suggestions: [
        "Paciente demonstrou melhora na [habilidade, ex: tolerância a texturas variadas].",
        "Apresentou maior independência em [tarefa], necessitando apenas de [suporte, ex: supervisão].",
        "O uso de [estratégia, ex: colete ponderado] auxiliou na manutenção do foco.",
        "Ainda apresenta dificuldades com [habilidade, ex: preensão do lápis, sequenciamento motor].",
      ] 
    },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoTO", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Defina o plano para a próxima sessão...", suggestions: [
        "Introduzir novos desafios sensoriais de forma gradual.",
        "Focar no refinamento da [habilidade motora fina, ex: uso da tesoura].",
        "Trabalhar a generalização de [habilidade de AVD] para o ambiente doméstico.",
      ] 
    },
    { id: "orientacaoTO", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Descreva as orientações...", suggestions: [
        "Recomendar a implementação de uma 'dieta sensorial' com [atividades] em casa.",
        "Sugerir adaptações em [material escolar, ex: engrossador de lápis].",
        "Orientar sobre a importância de oferecer oportunidades para a prática de [AVD] em casa.",
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
evolutionModels["Psicopedagogia"] = evolutionModels["Psicologia"];
evolutionModels["Musicoterapia"] = evolutionModels["Padrão"];
evolutionModels["Fisioterapia"] = evolutionModels["Terapia Ocupacional"];
evolutionModels["Nutrição"] = evolutionModels["Padrão"];


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