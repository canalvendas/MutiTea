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

// Modelos de Anamnese por especialidade com foco em TEA
const anamneseModels: Record<string, AnamneseField[]> = {
  "Psicologia": [
    { id: "queixaPrincipal", label: "Queixa Principal / Motivo da Avaliação", type: "textarea", placeholder: "Descreva a principal queixa da família/paciente, preocupações com o desenvolvimento, comportamento, interação social, comunicação, etc." },
    { id: "historicoDesenvolvimentoNeuropsicomotor", label: "Histórico do Desenvolvimento Neuropsicomotor", type: "textarea", placeholder: "Marcos do desenvolvimento: sorriso social, contato visual, balbucio, engatinhar, andar. Houve alguma regressão de habilidades (fala, social)?" },
    { id: "desenvolvimentoSocialComunicacao", label: "Desenvolvimento Social e Comunicação", type: "textarea", placeholder: "Como é a interação com pares e adultos? Busca/aceita colo? Aponta para pedir/mostrar? Atende pelo nome? Uso de gestos? Contato visual é sustentado?" },
    { id: "comportamentosInteresses", label: "Comportamentos, Interesses e Atividades", type: "textarea", placeholder: "Presença de movimentos repetitivos (flapping, balançar o corpo)? Interesses restritos e intensos? Apego a objetos inusitados? Brincar é simbólico ou repetitivo?" },
    { id: "processamentoSensorial", label: "Processamento Sensorial", type: "textarea", placeholder: "Hipersensibilidade ou hipossensibilidade a sons, luzes, texturas, cheiros, sabores? Busca por estímulos vestibulares (girar) ou proprioceptivos (aperto)?" },
    { id: "flexibilidadeComportamental", label: "Flexibilidade Comportamental e Rotina", type: "textarea", placeholder: "Como lida com mudanças na rotina? Presença de rituais? Dificuldade em transições? Rigidez de pensamento?" },
    { id: "historicoFamiliar", label: "Histórico Familiar", type: "textarea", placeholder: "Casos de TEA, TDAH, ou outros transtornos do neurodesenvolvimento na família?" },
    { id: "avaliacoesAnteriores", label: "Avaliações e Intervenções Anteriores", type: "textarea", placeholder: "Já realizou avaliações (neurológica, genética, fonoaudiológica)? Já fez ou faz alguma terapia?" },
    { id: "expectativasTerapia", label: "Expectativas com a Terapia", type: "textarea", placeholder: "Quais são os principais objetivos da família com a avaliação/intervenção psicológica?" },
  ],
  "Fonoaudiologia": [
    { id: "queixaPrincipal", label: "Queixa Principal Fonoaudiológica", type: "textarea", placeholder: "Atraso ou ausência de fala? Dificuldades na comunicação social? Ecopraxia/Ecolalia? Seletividade alimentar?" },
    { id: "desenvolvimentoLinguagemPreLinguistica", label: "Desenvolvimento da Linguagem (Pré-Linguística)", type: "textarea", placeholder: "Balbucio (quando começou, era variado)? Contato visual? Sorriso social? Atenção compartilhada (olhar para onde apontam)? Uso de gestos para comunicar?" },
    { id: "desenvolvimentoLinguagemVerbal", label: "Desenvolvimento da Linguagem (Verbal)", type: "textarea", placeholder: "Primeiras palavras (com qual idade)? Formação de frases? Houve perda/regressão da fala? Presença de ecolalia (imediata/tardia)? Fala na 3ª pessoa?" },
    { id: "pragmaticaComunicacaoSocial", label: "Pragmática e Comunicação Social", type: "textarea", placeholder: "Inicia interação? Mantém um tópico de conversa? Compreende ironias, metáforas? A prosódia (entonação) é atípica?" },
    { id: "alimentacaoDegluticao", label: "Alimentação e Deglutição", type: "textarea", placeholder: "Seletividade alimentar (textura, cor, cheiro)? Dificuldades na mastigação? Engasgos frequentes? Uso de mamadeira/chupeta?" },
    { id: "historicoAuditivo", label: "Histórico Auditivo", type: "textarea", placeholder: "Resultados de exames auditivos (ex: BERA). Histórico de otites. Reage a sons de forma exagerada ou parece não ouvir?" },
    { id: "comunicacaoAlternativa", label: "Comunicação Aumentativa e Alternativa (CAA)", type: "textarea", placeholder: "Faz uso de algum sistema de CAA (PECS, pranchas de comunicação, aplicativos)?" },
    { id: "observacoesGerais", label: "Observações Gerais do Fonoaudiólogo", type: "textarea", placeholder: "Impressões sobre a intenção comunicativa, compreensão, e aspectos orofaciais." },
  ],
  "Terapia Ocupacional": [
    { id: "queixaPrincipal", label: "Queixa Principal / Demanda para TO", type: "textarea", placeholder: "Dificuldades nas AVDs (alimentação, vestuário, higiene)? Desregulação sensorial? Dificuldades motoras ou no brincar?" },
    { id: "processamentoSensorial", label: "Perfil de Processamento Sensorial", type: "textarea", placeholder: "Descrever reações aos estímulos: Tátil (roupas, toque), Vestibular (balanços, altura), Proprioceptivo (força, pressão), Auditivo, Visual, Olfativo, Gustativo. Busca ou evita sensações?" },
    { id: "avds", label: "Desempenho nas Atividades de Vida Diária (AVDs)", type: "textarea", placeholder: "Nível de independência em: alimentação (uso de talheres, seletividade), vestuário (vestir/despir, botões, zíperes), higiene (banho, escovar dentes, desfralde)." },
    { id: "habilidadesMotoras", label: "Habilidades Motoras (Fina e Grossa)", type: "textarea", placeholder: "Coordenação motora fina (pegar objetos pequenos, desenhar, escrever). Coordenação motora grossa (correr, pular, equilíbrio). Presença de estereotipias motoras?" },
    { id: "praxis", label: "Praxis (Planejamento Motor)", type: "textarea", placeholder: "Dificuldade em aprender novas tarefas motoras? Parece desajeitado? Dificuldade em imitar gestos ou sequências de movimentos?" },
    { id: "brincar", label: "Brincar e Lazer", type: "textarea", placeholder: "Como é o brincar (exploratório, funcional, simbólico)? Brinca de forma repetitiva? Interage com outras crianças no brincar? Interesses lúdicos." },
    { id: "desempenhoEscolar", label: "Desempenho Escolar", type: "textarea", placeholder: "Dificuldades com caligrafia, organização na mesa, atenção, permanência na cadeira, interação com colegas?" },
    { id: "ambienteAdaptacoes", label: "Ambiente e Adaptações", type: "textarea", placeholder: "Quais adaptações já existem em casa/escola para auxiliar nas dificuldades sensoriais ou motoras?" },
  ],
  "Psicomotricidade": [
    { id: "queixaPrincipal", label: "Queixa Principal Psicomotora", type: "textarea", placeholder: "Inquietação, agitação, falta de coordenação, 'criança desajeitada', dificuldades de equilíbrio, tônus muscular alterado (muito 'molinho' ou 'durinho')." },
    { id: "desenvolvimentoMotor", label: "Histórico de Desenvolvimento Motor", type: "textarea", placeholder: "Marcos motores (sustentar cabeça, rolar, sentar, engatinhar, andar). Qualidade do movimento. Presença de estereotipias motoras (flapping, pular, etc.)." },
    { id: "tonusMuscularPostura", label: "Tônus Muscular e Postura", type: "textarea", placeholder: "Apresenta hipotonia (flacidez) ou hipertonia (rigidez)? Como é a postura habitual (sentado, em pé)?" },
    { id: "equilibrioCoordenacao", label: "Equilíbrio e Coordenação (Global e Fina)", type: "textarea", placeholder: "Cai com frequência? Dificuldade em pular, correr, andar de bicicleta? Dificuldade em manusear objetos, recortar, amarrar cadarços?" },
    { id: "esquemaCorporalLateralidade", label: "Esquema Corporal e Lateralidade", type: "textarea", placeholder: "Reconhece partes do corpo? Dificuldade em imitar posturas? Lateralidade definida (destro/canhoto)? Confunde direita/esquerda?" },
    { id: "organizacaoEspacoTemporal", label: "Organização Espaço-Temporal", type: "textarea", placeholder: "Parece perdido no espaço? Dificuldade com noções de antes/depois, perto/longe, dentro/fora? Dificuldade em seguir sequências rítmicas?" },
    { id: "relacaoCorpoOutro", label: "Relação do Corpo com o Outro e com Objetos", type: "textarea", placeholder: "Como usa o corpo para se comunicar? Respeita o espaço do outro? Explora objetos de forma funcional ou sensorial?" },
    { id: "observacoesGerais", label: "Observações Gerais do Psicomotricista", type: "textarea", placeholder: "Impressões sobre a regulação tônica, expressividade motora e a relação afetivo-emocional através do corpo." },
  ],
  "Psicopedagogia": [
    { id: "queixaPrincipal", label: "Queixa Principal de Aprendizagem", type: "textarea", placeholder: "Dificuldades específicas (alfabetização, matemática, interpretação)? Desatenção? Falta de interesse? Dificuldade em generalizar o aprendizado?" },
    { id: "historicoEscolar", label: "Histórico Escolar", type: "textarea", placeholder: "Adaptação à escola, relação com professores/colegas, necessidade de mediador, existência de um Plano de Ensino Individualizado (PEI)." },
    { id: "funcoesExecutivas", label: "Funções Executivas", type: "textarea", placeholder: "Dificuldades de planejamento, organização (material, tarefas), memória de trabalho, flexibilidade cognitiva (dificuldade em mudar de estratégia), controle inibitório." },
    { id: "processosCognitivos", label: "Processos Cognitivos", type: "textarea", placeholder: "Nível de atenção (sustentada, seletiva), memória, raciocínio lógico. Compreende o abstrato ou necessita de suportes concretos/visuais?" },
    { id: "habilidadesAcademicas", label: "Habilidades Acadêmicas", type: "textarea", placeholder: "Como está o processo de leitura e escrita (hiperlexia?)? Compreensão de texto? Raciocínio matemático? Como os interesses restritos se manifestam academicamente?" },
    { id: "aspectosComportamentaisAprendizagem", label: "Aspectos Comportamentais e Aprendizagem", type: "textarea", placeholder: "Como o perfil sensorial e a rigidez cognitiva impactam a sala de aula? Como lida com frustrações? Necessita de previsibilidade?" },
    { id: "vinculoAprendizagem", label: "Vínculo com a Aprendizagem", type: "textarea", placeholder: "Demonstra interesse por aprender? Quais são seus hiperfocos e como podem ser usados na aprendizagem?" },
    { id: "intervencoesAnteriores", label: "Intervenções Psicopedagógicas Anteriores", type: "textarea", placeholder: "Já teve acompanhamento psicopedagógico? Quais estratégias foram utilizadas?" },
  ],
  "Musicoterapia": [
    { id: "queixaPrincipal", label: "Demanda para Musicoterapia", type: "textarea", placeholder: "Objetivos: ampliar canais de comunicação, promover interação social, regulação emocional, integração sensorial, etc." },
    { id: "historicoMusicalSonoro", label: "Histórico Musical e Sonoro", type: "textarea", placeholder: "Preferências musicais/sonoras? Aversão a certos sons (hiperacusia)? Fascinação por objetos que produzem som? Já teve experiência musical formal?" },
    { id: "respostasMusica", label: "Respostas à Música e ao Som", type: "textarea", placeholder: "A música acalma ou agita? Demonstra reações corporais (balançar, bater palmas)? Tenta cantar ou vocalizar junto?" },
    { id: "comunicacaoMusical", label: "Comunicação Musical", type: "textarea", placeholder: "Usa sons ou instrumentos para se expressar? Existe diálogo sonoro (imitação, troca de turnos)? Responde a mudanças de ritmo, intensidade?" },
    { id: "interacaoSocialMusical", label: "Interação Social no Contexto Musical", type: "textarea", placeholder: "Consegue compartilhar um instrumento? Participa de atividades musicais em grupo? Busca o terapeuta através da música?" },
    { id: "aspectosCognitivosMusicais", label: "Aspectos Cognitivos Musicais", type: "textarea", placeholder: "A música ajuda na atenção e concentração? Consegue imitar padrões rítmicos ou melódicos?" },
    { id: "aspectosMotoresMusicais", label: "Aspectos Motores Musicais", type: "textarea", placeholder: "Como é a coordenação ao tocar um instrumento? O ritmo influencia o movimento corporal?" },
    { id: "expectativasMusicoterapia", label: "Expectativas com a Musicoterapia", type: "textarea", placeholder: "O que a família/paciente espera alcançar através das experiências musicais terapêuticas?" },
  ],
  "Fisioterapia": [
    { id: "queixaPrincipal", label: "Queixa Principal Fisioterapêutica", type: "textarea", placeholder: "Hipotonia, marcha atípica (ponta dos pés), dificuldade de coordenação motora, baixa resistência, postura inadequada." },
    { id: "historicoDesenvolvimentoMotor", label: "Histórico do Desenvolvimento Motor", type: "textarea", placeholder: "Atraso nos marcos motores (rolar, sentar, engatinhar, andar)? Qualidade dos movimentos era atípica?" },
    { id: "padraoMarcha", label: "Padrão da Marcha", type: "textarea", placeholder: "Marcha em ponta de pés (idiopática)? Base alargada? Corridas desajeitadas? Quedas frequentes?" },
    { id: "tonusMuscularForca", label: "Tônus Muscular e Força", type: "textarea", placeholder: "Presença de hipotonia geral? Dificuldade em sustentar posturas? Cansa-se facilmente em atividades físicas?" },
    { id: "coordenacaoEquilibrioPraxis", label: "Coordenação, Equilíbrio e Praxis", type: "textarea", placeholder: "Dificuldade em atividades como pular, chutar uma bola, andar de bicicleta? Dificuldade em planejar e executar movimentos novos?" },
    { id: "sistemaSensorialMotor", label: "Relação Sistema Sensorial e Motor", type: "textarea", placeholder: "Busca por movimentos como pular, girar, balançar para se regular? Dificuldades motoras relacionadas à sobrecarga sensorial?" },
    { id: "historicoRespiratorio", label: "Histórico Respiratório", type: "textarea", placeholder: "Respiração oral? Histórico de doenças respiratórias de repetição?" },
    { id: "objetivosFisioterapia", label: "Objetivos da Fisioterapia", type: "textarea", placeholder: "Melhorar a marcha, a postura, a força muscular, a coordenação para atividades funcionais." },
  ],
  "Nutrição": [
    { id: "queixaPrincipal", label: "Queixa Principal Nutricional", type: "textarea", placeholder: "Seletividade alimentar extrema, recusa alimentar, dieta restritiva, problemas gastrointestinais (constipação, diarreia), suspeita de alergias." },
    { id: "historicoAlimentar", label: "Histórico Alimentar", type: "textarea", placeholder: "Como foi a introdução alimentar? Amamentação? Uso de mamadeiras? Transição para sólidos?" },
    { id: "padraoAlimentarAtual", label: "Padrão Alimentar Atual (Recordatório)", type: "textarea", placeholder: "Listar TODOS os alimentos e líquidos que o paciente aceita. Detalhar marcas, texturas, cores e formas, se relevante." },
    { id: "comportamentoAlimentar", label: "Comportamento à Mesa", type: "textarea", placeholder: "Apresenta rituais durante as refeições? Necessita do mesmo prato/talher? Come apenas em um local específico? Tempo de duração das refeições?" },
    { id: "seletividadeSensorial", label: "Seletividade de Base Sensorial", type: "textarea", placeholder: "Restrições por: Textura (crocante, pastoso), Cor (só come alimentos de uma cor), Cheiro, Temperatura, Aparência (não aceita alimentos misturados)." },
    { id: "sintomasGastrointestinais", label: "Sintomas Gastrointestinais", type: "textarea", placeholder: "Frequência de constipação, diarreia, dor abdominal, gases, refluxo. Observa-se mudança de comportamento associada a esses sintomas?" },
    { id: "suplementacao", label: "Uso de Suplementos ou Medicamentos", type: "textarea", placeholder: "Faz uso de alguma vitamina, mineral, ou medicamento que possa interferir na absorção de nutrientes ou apetite?" },
    { id: "expectativasAcompanhamento", label: "Expectativas com o Acompanhamento Nutricional", type: "textarea", placeholder: "Ampliar o repertório alimentar, melhorar sintomas gastrointestinais, garantir o aporte nutricional adequado." },
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