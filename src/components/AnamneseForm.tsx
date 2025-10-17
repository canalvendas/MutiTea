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
  "Psicologia": [
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
  "Psicomotricidade": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa psicomotora (ex: dificuldades de coordenação, equilíbrio, esquema corporal, lateralidade) e o impacto no desenvolvimento/vida diária." },
    { id: "historicoDesenvolvimentoMotor", label: "Histórico de Desenvolvimento Motor", type: "textarea", placeholder: "Marcos do desenvolvimento motor (rolar, sentar, engatinhar, andar), quedas frequentes, dificuldades em atividades que exigem coordenação." },
    { id: "esquemaCorporal", label: "Esquema Corporal e Imagem Corporal", type: "textarea", placeholder: "Consciência do próprio corpo, reconhecimento das partes do corpo, dificuldades em desenhar a figura humana." },
    { id: "organizacaoEspacialTemporal", label: "Organização Espacial e Temporal", type: "textarea", placeholder: "Dificuldades em se localizar no espaço, seguir sequências, noção de antes/depois, ritmo." },
    { id: "lateralidade", label: "Lateralidade", type: "select", options: [{value: "direita", label: "Destro"}, {value: "esquerda", label: "Canhoto"}, {value: "ambidestro", label: "Ambidestro"}, {value: "indefinida", label: "Indefinida"}], placeholder: "Selecione a lateralidade..." },
    { id: "tonusMuscular", label: "Tônus Muscular", type: "textarea", placeholder: "Observações sobre o tônus (hipotonia, hipertonia), postura, movimentos involuntários." },
    { id: "equilibrio", label: "Equilíbrio", type: "textarea", placeholder: "Dificuldades de equilíbrio estático e dinâmico, quedas, insegurança motora." },
    { id: "relacaoObjetoOutro", label: "Relação com o Objeto e o Outro", type: "textarea", placeholder: "Como o paciente interage com objetos e outras pessoas através do movimento e do corpo." },
    { id: "historicoSaudeGeral", label: "Histórico de Saúde Geral", type: "textarea", placeholder: "Doenças neurológicas, síndromes, lesões que afetam o desenvolvimento motor." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente/família espera alcançar com a terapia psicomotora?" },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre o comportamento motor, emocional e social durante a sessão." },
  ],
  "Psicopedagogia": [
    { id: "queixaPrincipal", label: "Queixa Principal de Aprendizagem", type: "textarea", placeholder: "Descreva as principais dificuldades de aprendizagem (ex: leitura, escrita, matemática, atenção, memória) e o impacto no desempenho escolar/vida diária." },
    { id: "historicoEscolar", label: "Histórico Escolar", type: "textarea", placeholder: "Trajetória escolar, séries cursadas, retenções, adaptações curriculares, relacionamento com professores e colegas." },
    { id: "historicoDesenvolvimentoCognitivo", label: "Histórico de Desenvolvimento Cognitivo", type: "textarea", placeholder: "Marcos de desenvolvimento cognitivo, atenção, memória, raciocínio lógico, resolução de problemas." },
    { id: "ambienteFamiliarAprendizagem", label: "Ambiente Familiar e Aprendizagem", type: "textarea", placeholder: "Dinâmica familiar, apoio familiar nos estudos, expectativas dos pais, histórico de dificuldades de aprendizagem na família." },
    { id: "ambienteEscolarAprendizagem", label: "Ambiente Escolar e Aprendizagem", type: "textarea", placeholder: "Metodologias de ensino, recursos pedagógicos, relacionamento com a escola, adaptações oferecidas." },
    { id: "aspectosEmocionaisAprendizagem", label: "Aspectos Emocionais e Aprendizagem", type: "textarea", placeholder: "Autoestima, motivação, ansiedade, frustração, medo de errar relacionados à aprendizagem." },
    { id: "interessesHabilidades", label: "Interesses e Habilidades", type: "textarea", placeholder: "Quais são os interesses do paciente? Quais habilidades ele demonstra fora do contexto escolar?" },
    { id: "historicoSaudeGeral", label: "Histórico de Saúde Geral", type: "textarea", placeholder: "Doenças neurológicas, síndromes, problemas de visão/audição, uso de medicamentos que afetam a cognição." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente/família espera alcançar com a intervenção psicopedagógica?" },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre o comportamento, engajamento e estratégias de aprendizagem do paciente." },
  ],
  "Musicoterapia": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa ou objetivo terapêutico (ex: comunicação, expressão emocional, socialização, redução de ansiedade) e o impacto na vida diária." },
    { id: "historicoMusical", label: "Histórico Musical", type: "textarea", placeholder: "Experiências musicais prévias (aulas, instrumentos, canto), preferências musicais, relação com a música na infância/vida adulta." },
    { id: "respostaMusica", label: "Resposta à Música", type: "textarea", placeholder: "Como o paciente reage a diferentes tipos de música? Efeitos emocionais, físicos, cognitivos." },
    { id: "comunicacaoExpressao", label: "Comunicação e Expressão", type: "textarea", placeholder: "Como o paciente se comunica verbalmente e não verbalmente? Dificuldades de expressão emocional, criatividade." },
    { id: "interacaoSocial", label: "Interação Social", type: "textarea", placeholder: "Habilidades sociais, dificuldades em grupos, isolamento, como a música pode facilitar a conexão." },
    { id: "aspectosCognitivos", label: "Aspectos Cognitivos", type: "textarea", placeholder: "Atenção, memória, concentração, organização, como a música pode influenciar essas funções." },
    { id: "aspectosMotores", label: "Aspectos Motores", type: "textarea", placeholder: "Coordenação motora, ritmo, movimento, como a música pode auxiliar na reabilitação ou desenvolvimento motor." },
    { id: "historicoSaudeGeral", label: "Histórico de Saúde Geral", type: "textarea", placeholder: "Condições médicas, neurológicas, psiquiátricas que possam influenciar a musicoterapia." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente/família espera alcançar com a musicoterapia? Quais são os objetivos musicais e não musicais?" },
    { id: "observacoesGerais", label: "Observações Gerais do Terapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre o engajamento musical, comportamento e respostas do paciente durante a sessão." },
  ],
  "Fisioterapia": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa física (ex: dor, limitação de movimento, fraqueza, dificuldade de marcha) e o impacto nas atividades diárias." },
    { id: "historicoDoencaAtual", label: "Histórico da Doença Atual (HDA)", type: "textarea", placeholder: "Quando começou, como evoluiu, fatores que melhoram/pioram, tratamentos prévios." },
    { id: "historicoMedicoPregresso", label: "Histórico Médico Pregresso (HMP)", type: "textarea", placeholder: "Doenças crônicas, cirurgias, traumas, alergias, uso de medicamentos." },
    { id: "examesComplementares", label: "Exames Complementares", type: "textarea", placeholder: "Resultados de exames de imagem (Raio-X, Ressonância), laudos médicos relevantes." },
    { id: "nivelDor", label: "Nível de Dor (Escala 0-10)", type: "number", placeholder: "0 = sem dor, 10 = pior dor imaginável" },
    { id: "localizacaoDor", label: "Localização da Dor", type: "text", placeholder: "Onde a dor se manifesta?" },
    { id: "caracteristicaDor", label: "Característica da Dor", type: "textarea", placeholder: "Queimação, pontada, latejante, formigamento, etc." },
    { id: "limitacoesFuncionais", label: "Limitações Funcionais", type: "textarea", placeholder: "Dificuldades em realizar atividades como andar, levantar, vestir-se, pegar objetos." },
    { id: "historicoSocialProfissional", label: "Histórico Social e Profissional", type: "textarea", placeholder: "Tipo de trabalho, atividades de lazer, ambiente domiciliar, apoio familiar." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com a fisioterapia? Quais são seus objetivos de reabilitação?" },
    { id: "observacoesGerais", label: "Observações Gerais do Fisioterapeuta", type: "textarea", placeholder: "Impressões iniciais, observações sobre a postura, marcha, amplitude de movimento, força muscular durante a avaliação." },
  ],
  "Nutrição": [
    { id: "queixaPrincipal", label: "Queixa Principal Nutricional", type: "textarea", placeholder: "Descreva a principal queixa ou objetivo (ex: perda/ganho de peso, controle de doenças, melhora da alimentação, desempenho esportivo)." },
    { id: "historicoSaudeNutricional", label: "Histórico de Saúde e Nutrição", type: "textarea", placeholder: "Doenças preexistentes (diabetes, hipertensão), alergias/intolerâncias alimentares, cirurgias gastrointestinais, uso de medicamentos/suplementos." },
    { id: "historicoFamiliarNutricional", label: "Histórico Familiar Nutricional", type: "textarea", placeholder: "Doenças crônicas na família, histórico de obesidade, diabetes, etc." },
    { id: "rotinaAlimentar", label: "Rotina Alimentar Atual", type: "textarea", placeholder: "Descreva um dia típico de alimentação (refeições, horários, tipos de alimentos, quantidades)." },
    { id: "preferenciasAversoes", label: "Preferências e Aversões Alimentares", type: "textarea", placeholder: "Alimentos que gosta/não gosta, restrições culturais ou religiosas." },
    { id: "habitosIntestinais", label: "Hábitos Intestinais", type: "textarea", placeholder: "Frequência, consistência, dificuldades (constipação, diarreia)." },
    { id: "consumoAgua", label: "Consumo de Água (Litros/dia)", type: "number", placeholder: "Quantos litros de água você bebe por dia?" },
    { id: "atividadeFisica", label: "Atividade Física", type: "textarea", placeholder: "Tipo, frequência e duração da atividade física." },
    { id: "aspectosEmocionaisAlimentacao", label: "Aspectos Emocionais da Alimentação", type: "textarea", placeholder: "Relação com a comida, compulsão, ansiedade, estresse." },
    { id: "expectativasTratamento", label: "Expectativas do Tratamento", type: "textarea", placeholder: "O que o paciente espera alcançar com o acompanhamento nutricional?" },
    { id: "observacoesGerais", label: "Observações Gerais do Nutricionista", type: "textarea", placeholder: "Impressões iniciais, observações sobre o estado nutricional, comportamento alimentar e motivação do paciente." },
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
        fieldSchema = z.number().optional().or(z.literal("")); // Permite string vazia para input number
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