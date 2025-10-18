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

type EvolutionField = {
  id: string;
  label: string;
  description?: string;
  type: "textarea" | "section-header" | "date";
  placeholder?: string;
  defaultValue?: any;
};

const evolutionModels: Record<string, EvolutionField[]> = {
  "Psicologia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidador", label: "Relato do Cuidador/Paciente", type: "textarea", placeholder: "Ex: Família relata que o paciente apresentou [comportamento] durante a semana. Houve [evento específico]. Demonstrou interesse em [atividade]." },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoComportamental", label: "Observação Comportamental", type: "textarea", placeholder: "Ex: Paciente chegou [humor]. Durante a sessão, demonstrou [nível de engajamento]. Apresentou [comportamentos específicos, ex: estereotipias, busca sensorial, contato visual]." },
    { id: "atividadesRealizadas", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Ex: Foram realizadas atividades de [tipo de atividade] com foco em [objetivo, ex: atenção compartilhada, troca de turnos, regulação emocional, teoria da mente]." },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseSessao", label: "Análise da Sessão", type: "textarea", placeholder: "Ex: O paciente demonstrou [progresso/dificuldade] na habilidade de [habilidade]. Respondeu bem a [estratégia]. A queixa inicial de [queixa] foi observada através de [comportamento]." },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoProximaSessao", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Ex: Manter o foco em [objetivo]. Introduzir [nova atividade/estratégia]. Reforçar [habilidade]." },
    { id: "orientacaoFamilia", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Ex: Orientado aos pais que [orientação]. Sugerido que a escola [sugestão]." },
  ],
  "Fonoaudiologia": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorFono", label: "Relato do Cuidador", type: "textarea", placeholder: "Ex: Família relata que o paciente tentou comunicar [necessidade] usando [gestos/palavras/CAA]. Apresentou [dificuldade/avanço] na alimentação." },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoFono", label: "Observação Clínica", type: "textarea", placeholder: "Ex: Paciente apresentou [padrão de fala, ex: ecolalias, jargão]. Nível de atenção [bom/disperso]. Intenção comunicativa [presente/ausente]." },
    { id: "atividadesFono", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Ex: Terapia focada em [objetivo, ex: aumento do vocabulário receptivo/expressivo, uso de sentenças, habilidades pragmáticas, motricidade oral]." },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseFono", label: "Análise da Sessão", type: "textarea", placeholder: "Ex: Observou-se melhora na [habilidade, ex: compreensão de comandos]. Apresentou [número] de produções verbais espontâneas. Respondeu bem ao uso de [recurso, ex: pistas visuais]." },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoFono", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Ex: Continuar com atividades para [objetivo]. Introduzir [novo fonema/conceito]. Generalizar o uso de [habilidade]." },
    { id: "orientacaoFono", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Ex: Sugerido aos pais que estimulem [habilidade] durante [rotina]. Enviar para a escola [material de apoio]." },
  ],
  "Terapia Ocupacional": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorTO", label: "Relato do Cuidador", type: "textarea", placeholder: "Ex: Família relata que o paciente conseguiu [realizar AVD, ex: vestir-se com menos ajuda]. Apresentou [comportamento sensorial, ex: hipersensibilidade a sons] em [contexto]." },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoTO", label: "Observação Clínica", type: "textarea", placeholder: "Ex: Nível de alerta [adequado/alto/baixo]. Buscou/evitou estímulos [táteis/vestibulares/proprioceptivos]. Engajamento na atividade [bom/limitado]." },
    { id: "atividadesTO", label: "Atividades e Objetivos Trabalhados", type: "textarea", placeholder: "Ex: Sessão focada em [objetivo, ex: integração sensorial, planejamento motor, habilidades de AVD, coordenação motora fina/grossa]." },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analiseTO", label: "Análise da Sessão", type: "textarea", placeholder: "Ex: Paciente demonstrou melhora na [habilidade, ex: tolerância a texturas]. Apresentou maior independência em [tarefa]. Necessitou de [tipo de ajuda] para completar a atividade." },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoTO", label: "Plano para Próxima Sessão", type: "textarea", placeholder: "Ex: Introduzir novos desafios sensoriais de forma gradual. Focar em [habilidade motora]. Trabalhar a generalização de [habilidade de AVD]." },
    { id: "orientacaoTO", label: "Orientação para Família/Escola", type: "textarea", placeholder: "Ex: Recomendar a implementação de [estratégia sensorial] em casa/escola. Sugerir adaptações em [material escolar]." },
  ],
  "Padrão": [
    { id: "sessionDate", label: "Data da Sessão", type: "date", defaultValue: new Date().toISOString().split('T')[0] },
    { id: "headerSubjective", label: "S (Subjetivo)", type: "section-header" },
    { id: "relatoCuidadorPadrao", label: "Relato do Cuidador/Paciente", type: "textarea", placeholder: "Descreva o relato da família ou do paciente sobre a semana, eventos relevantes, progressos ou dificuldades observadas." },
    { id: "headerObjective", label: "O (Objetivo)", type: "section-header" },
    { id: "observacaoPadrao", label: "Observação Clínica e Atividades Realizadas", type: "textarea", placeholder: "Descreva o comportamento observável do paciente durante a sessão, seu nível de engajamento e as atividades que foram realizadas." },
    { id: "headerAssessment", label: "A (Avaliação/Análise)", type: "section-header" },
    { id: "analisePadrao", label: "Análise Profissional da Sessão", type: "textarea", placeholder: "Analise o desempenho do paciente em relação aos objetivos terapêuticos. Houve progresso, estagnação ou regressão? Quais fatores podem ter influenciado?" },
    { id: "headerPlan", label: "P (Plano)", type: "section-header" },
    { id: "planoPadrao", label: "Plano Terapêutico e Orientações", type: "textarea", placeholder: "Defina os próximos passos para a terapia e as orientações a serem seguidas pela família, escola ou outros cuidadores." },
  ],
};

// Adicionando aliases para outras especialidades usarem o modelo padrão por enquanto
evolutionModels["Psicomotricidade"] = evolutionModels["Padrão"];
evolutionModels["Psicopedagogia"] = evolutionModels["Padrão"];
evolutionModels["Musicoterapia"] = evolutionModels["Padrão"];
evolutionModels["Fisioterapia"] = evolutionModels["Padrão"];
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