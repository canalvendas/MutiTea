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
import { Label } from "@/components/ui/label"; // Importação adicionada
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
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa do paciente..." },
    { id: "historicoQueixa", label: "Histórico da Queixa", type: "textarea", placeholder: "Quando começou, frequência, intensidade..." },
    { id: "historicoFamiliar", label: "Histórico Familiar", type: "textarea", placeholder: "Dinâmica familiar, doenças mentais na família..." },
    { id: "historicoSaude", label: "Histórico de Saúde", type: "textarea", placeholder: "Doenças preexistentes, cirurgias, internações..." },
    { id: "usoMedicamentos", label: "Uso de Medicamentos", type: "text", placeholder: "Quais medicamentos, dosagem, para quê..." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com a terapia..." },
    { id: "jaFezTerapia", label: "Já fez terapia antes?", type: "checkbox", defaultValue: false },
  ],
  "Fonoaudiologia": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa fonoaudiológica..." },
    { id: "desenvolvimentoFalaLinguagem", label: "Histórico de Desenvolvimento da Fala/Linguagem", type: "textarea", placeholder: "Marcos de desenvolvimento, dificuldades observadas..." },
    { id: "historicoAuditivo", label: "Histórico Auditivo", type: "textarea", placeholder: "Exames auditivos, infecções de ouvido, uso de aparelhos..." },
    { id: "habitosOrais", label: "Hábitos Orais", type: "select", options: [{value: "chupeta", label: "Chupeta"}, {value: "mamadeira", label: "Mamadeira"}, {value: "dedo", label: "Dedo"}, {value: "nenhum", label: "Nenhum"}], placeholder: "Selecione hábitos orais..." },
    { id: "comunicacaoAmbientes", label: "Comunicação em Casa/Escola", type: "textarea", placeholder: "Como se comunica em diferentes ambientes..." },
    { id: "dificuldadeAlimentacao", label: "Dificuldade na Alimentação", type: "checkbox", defaultValue: false },
  ],
  "Terapia Ocupacional": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa relacionada à ocupação..." },
    { id: "desenvolvimentoMotor", label: "Histórico de Desenvolvimento Motor", type: "textarea", placeholder: "Marcos motores, dificuldades de coordenação..." },
    { id: "atividadesVidaDiaria", label: "Atividades de Vida Diária (AVDs)", type: "textarea", placeholder: "Independência em higiene, alimentação, vestuário..." },
    { id: "interessesHobbies", label: "Interesses e Hobbies", type: "textarea", placeholder: "Atividades de lazer, preferências..." },
    { id: "ambienteDomiciliarEscolar", label: "Ambiente Domiciliar/Escolar", type: "textarea", placeholder: "Adaptações necessárias, barreiras, apoios..." },
    { id: "dificuldadeEscolar", label: "Dificuldade Escolar/Profissional", type: "checkbox", defaultValue: false },
  ],
  "Padrão": [ // Modelo padrão caso a especialidade não seja encontrada
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