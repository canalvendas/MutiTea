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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definição de tipos para os campos do formulário
interface AnamneseField {
  id: string;
  label: string;
  type: "text" | "textarea" | "checkbox" | "select" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

// Modelos de Anamnese por especialidade
const anamneseModels: Record<string, AnamneseField[]> = {
  "Psicologia Clínica": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa do paciente e o que o motivou a buscar terapia neste momento..." },
    { id: "historicoQueixa", label: "Histórico da Queixa", type: "textarea", placeholder: "Quando os sintomas ou dificuldades começaram? Qual a frequência, intensidade e duração? Houve algum evento desencadeante?" },
    { id: "historicoPessoalDesenvolvimento", label: "Histórico Pessoal e Desenvolvimento", type: "textarea", placeholder: "Informações sobre gestação, parto, desenvolvimento infantil (motor, fala, social), escolaridade, vida profissional, relacionamentos significativos e eventos traumáticos." },
    { id: "historicoFamiliar", label: "Histórico Familiar", type: "textarea", placeholder: "Dinâmica familiar, histórico de doenças mentais, alcoolismo, uso de drogas ou outros problemas relevantes na família de origem e atual." },
    { id: "historicoSaudeFisica", label: "Histórico de Saúde Física", type: "textarea", placeholder: "Doenças preexistentes, cirurgias, internações, alergias, uso de medicamentos (quais, dosagem, para quê), hábitos de sono, alimentação e atividade física." },
    { id: "usoSubstancias", label: "Uso de Álcool/Drogas/Tabaco", type: "textarea", placeholder: "Hábitos de uso, frequência, quantidade, impacto na vida diária." },
    { id: "relacionamentosSociais", label: "Relacionamentos Sociais", type: "textarea", placeholder: "Qualidade dos relacionamentos com amigos, familiares, parceiros. Rede de apoio social." },
    { id: "interessesLazer", label: "Interesses e Lazer", type: "textarea", placeholder: "Atividades que o paciente gosta de fazer, hobbies, como lida com o tempo livre." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com a terapia? Quais são seus objetivos?" },
    { id: "jaFezTerapia", label: "Já fez terapia antes?", type: "checkbox", defaultValue: false },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre o comportamento, humor, fala do paciente durante a sessão." },
  ],
  "Fonoaudiologia": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa fonoaudiológica (ex: dificuldade na fala, voz rouca, problemas de audição, deglutição) e o impacto na vida diária." },
    { id: "historicoDesenvolvimentoLinguagem", label: "Histórico de Desenvolvimento da Fala/Linguagem", type: "textarea", placeholder: "Marcos de desenvolvimento (balbucio, primeiras palavras, frases), idade de aquisição da fala, dificuldades observadas por pais/professores." },
    { id: "historicoAuditivo", label: "Histórico Auditivo", type: "textarea", placeholder: "Exames auditivos prévios (resultados), infecções de ouvido recorrentes, exposição a ruídos altos, uso de aparelhos auditivos." },
    { id: "funcoesOrofaciais", label: "Funções Orofaciais", type: "textarea", placeholder: "Padrão de mastigação, deglutição, respiração (oral/nasal), sucção (chupeta, mamadeira, dedo), bruxismo, hábitos orais nocivos." },
    { id: "historicoVoz", label: "Histórico Vocal", type: "textarea", placeholder: "Qualidade vocal (rouquidão, soprosidade), uso profissional da voz, histórico de cirurgias na garganta, refluxo gastroesofágico." },
    { id: "fluenciaComunicacao", label: "Fluência e Comunicação Social", type: "textarea", placeholder: "Histórico de gagueira, taquilalia. Como o paciente se comunica em diferentes ambientes (casa, escola, trabalho), interação social." },
    { id: "escolaridadeProfissao", label: "Escolaridade/Profissão", type: "textarea", placeholder: "Desempenho escolar, dificuldades de leitura/escrita. Exigências vocais ou comunicativas da profissão." },
    { id: "historicoSaudeGeral", label: "Histórico de Saúde Geral", type: "textarea", placeholder: "Doenças neurológicas, síndromes, alergias, uso de medicamentos que possam afetar a comunicação." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente/família espera alcançar com a terapia fonoaudiológica?" },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre a fala, voz, audição e comportamento do paciente." },
  ],
  "Terapia Ocupacional": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa relacionada à ocupação, desempenho em atividades diárias, escolares ou profissionais." },
    { id: "historicoDesenvolvimentoMotorCognitivo", label: "Histórico de Desenvolvimento Motor e Cognitivo", type: "textarea", placeholder: "Marcos de desenvolvimento (sentar, engatinhar, andar), coordenação motora, atenção, memória, raciocínio." },
    { id: "atividadesVidaDiariaAVDs", label: "Atividades de Vida Diária (AVDs)", type: "textarea", placeholder: "Nível de independência em higiene pessoal, alimentação, vestuário, mobilidade funcional. Dificuldades e adaptações." },
    { id: "atividadesInstrumentaisVidaDiariaAIVDs", label: "Atividades Instrumentais de Vida Diária (AIVDs)", type: "textarea", placeholder: "Nível de independência em tarefas como cozinhar, limpar, gerenciar finanças, usar transporte, fazer compras." },
    { id: "brincarLazer", label: "Brincar e Lazer", type: "textarea", placeholder: "Como o paciente ocupa seu tempo livre? Interesses, hobbies, participação em atividades recreativas. Qualidade do brincar (para crianças)." },
    { id: "escolaridadeTrabalho", label: "Escolaridade e Trabalho", type: "textarea", placeholder: "Desempenho escolar, dificuldades de aprendizado, adaptações necessárias. Histórico profissional, satisfação no trabalho, desafios." },
    { id: "ambienteDomiciliarEscolarComunitario", label: "Ambiente Domiciliar, Escolar e Comunitário", type: "textarea", placeholder: "Descrição do ambiente físico (casa, escola, trabalho), barreiras arquitetônicas, recursos disponíveis, apoio social." },
    { id: "interessesValores", label: "Interesses e Valores", type: "textarea", placeholder: "Quais são os interesses, motivações e valores do paciente? O que é significativo para ele?" },
    { id: "historicoSaude", label: "Histórico de Saúde", type: "textarea", placeholder: "Condições médicas, lesões, cirurgias, uso de órteses/próteses, medicamentos que afetam o desempenho ocupacional." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com a terapia ocupacional? Quais são seus objetivos funcionais?" },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre o desempenho funcional, postura, coordenação e engajamento do paciente." },
  ],
  "Padrão": [ // Modelo padrão caso a especialidade não seja encontrada
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa do paciente." },
    { id: "historicoSaudeGeral", label: "Histórico de Saúde Geral", type: "textarea", placeholder: "Doenças preexistentes, cirurgias, medicamentos em uso." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com o tratamento?" },
    { id: "observacoesGerais", label: "Observações Gerais", type: "textarea", placeholder: "Nenhuma anamnese específica registrada ainda. Use este campo para observações gerais." },
  ]
};

interface AnamneseFormProps {
  specialty: string;
}

export const AnamneseForm = ({ specialty }: AnamneseFormProps) => {
  const currentModel = anamneseModels[specialty] || anamneseModels["Padrão"];

  // Cria um schema Zod dinamicamente baseado no modelo atual
  const dynamicSchema = z.object(
    currentModel.reduce((acc, field) => {
      let fieldSchema: z.ZodType<any, any, any>;
      if (field.type === "text" || field.type === "textarea" || field.type === "select") {
        fieldSchema = z.string().optional();
      } else if (field.type === "number") {
        fieldSchema = z.number().optional();
      } else if (field.type === "checkbox") {
        fieldSchema = z.boolean().optional();
      } else {
        fieldSchema = z.any().optional();
      }
      return { ...acc, [field.id]: fieldSchema };
    }, {})
  );

  type AnamneseFormData = z.infer<typeof dynamicSchema>;

  const form = useForm<AnamneseFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: currentModel.reduce((acc, field) => {
      acc[field.id as keyof AnamneseFormData] = field.defaultValue !== undefined ? field.defaultValue : "";
      return acc;
    }, {} as AnamneseFormData),
  });

  const onSubmit = (data: AnamneseFormData) => {
    console.log("Anamnese submitted:", data);
    toast.success("Anamnese salva com sucesso!");
    // Aqui você enviaria os dados para um backend
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {currentModel.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as keyof AnamneseFormData}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea placeholder={field.placeholder} {...formField} rows={5} />
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formField.value as boolean}
                        onCheckedChange={formField.onChange}
                      />
                      <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                  ) : field.type === "select" ? (
                    <Select onValueChange={formField.onChange} defaultValue={formField.value as string}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || `Selecione ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input type={field.type} placeholder={field.placeholder} {...formField} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="mt-4">Salvar Anamnese</Button>
      </form>
    </Form>
  );
};