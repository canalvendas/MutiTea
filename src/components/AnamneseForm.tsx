"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definição de tipos para os campos do formulário
type AnamneseField = {
  id: string;
  label: string;
  description?: string;
  type: "textarea" | "checkbox-group" | "radio-group" | "select" | "section-header";
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
};

// --- Modelos de Anamnese por especialidade com foco em TEA ---
const anamneseModels: Record<string, AnamneseField[]> = {
  "Psicologia": [
    { id: "queixaPrincipal", label: "Queixa Principal / Motivo da Avaliação", type: "textarea", placeholder: "Descreva a principal queixa da família/paciente..." },
    { id: "headerDesenvolvimento", label: "Histórico do Desenvolvimento", type: "section-header" },
    { id: "marcosMotores", label: "Marcos Motores (Sustentou cabeça, sentou, engatinhou, andou)", type: "radio-group", options: [{ value: "esperado", label: "Dentro do esperado" }, { value: "atraso", label: "Atraso observado" }, { value: "nao_observado", label: "Não observado/Não sabe" }] },
    { id: "marcosFala", label: "Marcos da Fala (Balbucio, primeiras palavras, frases)", type: "radio-group", options: [{ value: "esperado", label: "Dentro do esperado" }, { value: "atraso", label: "Atraso observado" }, { value: "regressao", label: "Houve regressão da fala" }] },
    { id: "desfralde", label: "Desfralde", type: "radio-group", options: [{ value: "completo", label: "Completo" }, { value: "em_processo", label: "Em processo" }, { value: "nao_iniciado", label: "Não iniciado" }, { value: "dificuldades", label: "Apresenta dificuldades significativas" }] },
    { id: "headerSocial", label: "Comunicação e Interação Social", type: "section-header" },
    { id: "contatoVisual", label: "Contato Visual", type: "radio-group", options: [{ value: "bom", label: "Bom e sustentado" }, { value: "fugaz", label: "Fugaz/Inconsistente" }, { value: "raro", label: "Raro ou ausente" }] },
    { id: "atendePeloNome", label: "Atende pelo nome", type: "radio-group", options: [{ value: "sempre", label: "Sim, consistentemente" }, { value: "as_vezes", label: "Às vezes/Inconsistente" }, { value: "raramente", label: "Raramente ou não" }] },
    { id: "atencaoCompartilhada", label: "Atenção Compartilhada (Apontar, mostrar, seguir o olhar)", type: "checkbox-group", options: [{ value: "aponta_pedir", label: "Aponta para pedir" }, { value: "aponta_mostrar", label: "Aponta para mostrar interesse" }, { value: "segue_gestos", label: "Segue gestos/apontar do outro" }, { value: "dificuldade", label: "Apresenta dificuldade" }] },
    { id: "interacaoPares", label: "Interação com Pares", type: "radio-group", options: [{ value: "inicia", label: "Inicia interação" }, { value: "responde", label: "Responde, mas não inicia" }, { value: "ignora", label: "Prefere isolar-se/Ignora" }] },
    { id: "headerComportamento", label: "Comportamentos, Interesses e Atividades (CIRs)", type: "section-header" },
    { id: "estereotipiasMotoras", label: "Estereotipias Motoras", type: "checkbox-group", options: [{ value: "flapping", label: "Flapping (mãos)" }, { value: "balancar_corpo", label: "Balançar o corpo" }, { value: "andar_ponta_pes", label: "Andar na ponta dos pés" }, { value: "correr_sem_objetivo", label: "Correr sem objetivo aparente" }, { value: "outros", label: "Outros" }] },
    { id: "interesses", label: "Interesses", type: "radio-group", options: [{ value: "restritos", label: "Restritos e intensos (hiperfoco)" }, { value: "incomuns", label: "Incomuns para a idade" }, { value: "variados", label: "Variados e típicos" }] },
    { id: "brincar", label: "Padrão de Brincar", type: "radio-group", options: [{ value: "simbolico", label: "Simbólico/Faz de conta" }, { value: "funcional", label: "Funcional (usa brinquedo para sua função)" }, { value: "repetitivo", label: "Repetitivo/Não funcional (enfileirar, girar)" }] },
    { id: "flexibilidade", label: "Flexibilidade e Rotina", type: "checkbox-group", options: [{ value: "resistencia_mudanca", label: "Resistência a mudanças" }, { value: "necessidade_rotina", label: "Forte necessidade de rotina" }, { value: "rituais", label: "Presença de rituais" }, { value: "rigidez_pensamento", label: "Rigidez de pensamento" }] },
    { id: "headerSensorial", label: "Processamento Sensorial", type: "section-header" },
    { id: "sensorialAuditivo", label: "Auditivo (sons altos, ambientes ruidosos)", type: "radio-group", options: [{ value: "hiper", label: "Hipersensível (cobre os ouvidos, se incomoda)" }, { value: "hipo", label: "Hipossensível (parece não ouvir, busca sons)" }, { value: "tipico", label: "Típico" }] },
    { id: "sensorialTatil", label: "Tátil (toque, texturas de roupas, mãos sujas)", type: "radio-group", options: [{ value: "hiper", label: "Hipersensível (evita toque, seletividade com roupas)" }, { value: "hipo", label: "Hipossensível (busca toque, não percebe dor/sujeira)" }, { value: "tipico", label: "Típico" }] },
    { id: "sensorialVisual", label: "Visual (luzes fortes, muitos estímulos)", type: "radio-group", options: [{ value: "hiper", label: "Hipersensível (cobre os olhos, se incomoda com luz)" }, { value: "hipo", label: "Hipossensível (fascínio por luzes, objetos que giram)" }, { value: "tipico", label: "Típico" }] },
    { id: "sensorialAlimentar", label: "Alimentar (seletividade por textura, cor, cheiro)", type: "checkbox-group", options: [{ value: "seletividade_alta", label: "Seletividade alimentar significativa" }, { value: "restricao_textura", label: "Restrição por textura" }, { value: "restricao_cor", label: "Restrição por cor/grupo alimentar" }] },
    { id: "observacoesGerais", label: "Observações Gerais e Histórico Familiar", type: "textarea", placeholder: "Adicione aqui informações sobre histórico familiar de TEA/outros transtornos, avaliações anteriores, e outras observações pertinentes." },
  ],
  "Fonoaudiologia": [
    { id: "queixaPrincipal", label: "Queixa Principal Fonoaudiológica", type: "textarea", placeholder: "Atraso ou ausência de fala? Dificuldades na comunicação social? Ecolalia? Seletividade alimentar?" },
    { id: "headerLinguagem", label: "Desenvolvimento da Linguagem e Comunicação", type: "section-header" },
    { id: "comunicacaoPreVerbal", label: "Comunicação Pré-Verbal", type: "checkbox-group", options: [{ value: "contato_visual", label: "Contato Visual Presente" }, { value: "atencao_compartilhada", label: "Atenção Compartilhada" }, { value: "gestos_comunicativos", label: "Uso de Gestos Comunicativos (apontar, dar tchau)" }, { value: "balbucio", label: "Balbucio (presente/ausente, variado/restrito)" }] },
    { id: "compreensao", label: "Compreensão da Linguagem", type: "radio-group", options: [{ value: "comandos_simples", label: "Compreende comandos simples" }, { value: "comandos_complexos", label: "Compreende comandos complexos" }, { value: "contextual", label: "Compreensão depende de pistas contextuais" }, { value: "dificuldade", label: "Dificuldade significativa de compreensão" }] },
    { id: "expressaoVerbal", label: "Expressão Verbal", type: "checkbox-group", options: [{ value: "nao_verbal", label: "Não-verbal" }, { value: "palavras_soltas", label: "Fala palavras soltas" }, { value: "frases_simples", label: "Forma frases simples (2-3 palavras)" }, { value: "frases_complexas", label: "Forma frases complexas" }] },
    { id: "caracteristicasFala", label: "Características da Fala", type: "checkbox-group", options: [{ value: "ecolalia_imediata", label: "Ecolalia Imediata" }, { value: "ecolalia_tardia", label: "Ecolalia Tardia" }, { value: "fala_terceira_pessoa", label: "Fala em 3ª pessoa" }, { value: "prosodia_atipica", label: "Prosódia atípica (monótona, cantada)" }, { value: "inversoes_pronominais", label: "Inversões pronominais" }] },
    { id: "pragmatica", label: "Uso Social da Linguagem (Pragmática)", type: "checkbox-group", options: [{ value: "inicia_comunicacao", label: "Inicia comunicação" }, { value: "mantem_dialogo", label: "Mantém diálogo" }, { value: "respeita_turnos", label: "Respeita turnos na conversa" }, { value: "dificuldade_topico", label: "Dificuldade em manter-se no tópico" }] },
    { id: "headerAlimentacao", label: "Alimentação e Sistema Sensório-Motor-Oral", type: "section-header" },
    { id: "seletividadeAlimentar", label: "Seletividade Alimentar", type: "checkbox-group", options: [{ value: "recusa_novos", label: "Recusa alimentos novos" }, { value: "restricao_textura", label: "Restrição por textura" }, { value: "restricao_cor", label: "Restrição por cor/cheiro" }, { value: "dificuldade_mastigacao", label: "Dificuldade na mastigação" }] },
    { id: "historicoAuditivo", label: "Histórico Auditivo", type: "radio-group", options: [{ value: "exames_ok", label: "Exames auditivos normais" }, { value: "otites_recorrentes", label: "Histórico de otites de repetição" }, { value: "hiperacusia", label: "Hipersensibilidade a sons" }] },
    { id: "observacoesFono", label: "Observações Adicionais", type: "textarea", placeholder: "Uso de CAA, resultados de avaliações anteriores, etc." },
  ],
  "Terapia Ocupacional": [
    { id: "queixaPrincipal", label: "Queixa Principal / Demanda para TO", type: "textarea", placeholder: "Dificuldades nas AVDs? Desregulação sensorial? Dificuldades motoras ou no brincar?" },
    { id: "headerAVDS", label: "Atividades de Vida Diária (AVDs)", type: "section-header" },
    { id: "avdAlimentacao", label: "Alimentação (uso de talheres, autonomia)", type: "radio-group", options: [{ value: "independente", label: "Independente" }, { value: "ajuda_parcial", label: "Necessita de ajuda parcial/supervisão" }, { value: "dependente", label: "Dependente" }] },
    { id: "avdVestuario", label: "Vestuário (vestir/despir, zíperes, botões)", type: "radio-group", options: [{ value: "independente", label: "Independente" }, { value: "ajuda_parcial", label: "Necessita de ajuda parcial/supervisão" }, { value: "dependente", label: "Dependente" }] },
    { id: "avdHigiene", label: "Higiene (banho, escovar dentes, uso do banheiro)", type: "radio-group", options: [{ value: "independente", label: "Independente" }, { value: "ajuda_parcial", label: "Necessita de ajuda parcial/supervisão" }, { value: "dependente", label: "Dependente" }] },
    { id: "headerSensorial", label: "Perfil de Processamento Sensorial", type: "section-header" },
    { id: "perfilSensorial", label: "Padrão Geral de Reação Sensorial", type: "radio-group", options: [{ value: "busca_sensorial", label: "Busca Sensorial (movimento constante, toca em tudo)" }, { value: "evitacao_sensorial", label: "Evitação Sensorial (resiste a estímulos)" }, { value: "baixa_responsividade", label: "Baixa Responsividade (parece não notar estímulos)" }, { value: "misto", label: "Padrão Misto" }] },
    { id: "sistemasSensoriais", label: "Sistemas Sensoriais com Maior Disfunção", type: "checkbox-group", options: [{ value: "tatil", label: "Tátil" }, { value: "vestibular", label: "Vestibular (movimento e equilíbrio)" }, { value: "proprioceptivo", label: "Proprioceptivo (consciência corporal)" }, { value: "auditivo", label: "Auditivo" }, { value: "visual", label: "Visual" }, { value: "oral", label: "Oral/Gustativo" }] },
    { id: "headerMotor", label: "Habilidades Motoras e Praxis", type: "section-header" },
    { id: "coordMotoraFina", label: "Coordenação Motora Fina", type: "checkbox-group", options: [{ value: "dificuldade_lapis", label: "Dificuldade na preensão do lápis" }, { value: "dificuldade_tesoura", label: "Dificuldade com tesoura" }, { value: "dificuldade_manipulacao", label: "Dificuldade em manipular objetos pequenos" }] },
    { id: "coordMotoraGrossa", label: "Coordenação Motora Grossa", type: "checkbox-group", options: [{ value: "desajeitado", label: "Parece 'desajeitado'" }, { value: "dificuldade_esportes", label: "Dificuldade em esportes/atividades motoras" }, { value: "equilibrio_pobre", label: "Equilíbrio pobre" }] },
    { id: "praxis", label: "Praxis (Planejamento Motor)", type: "radio-group", options: [{ value: "bom", label: "Bom planejamento motor" }, { value: "dificuldade_ideacao", label: "Dificuldade na ideação (saber o que fazer)" }, { value: "dificuldade_execucao", label: "Dificuldade na execução (como fazer)" }] },
    { id: "headerBrincar", label: "Brincar e Desempenho Escolar", type: "section-header" },
    { id: "tipoBrincar", label: "Tipo de Brincar Predominante", type: "radio-group", options: [{ value: "simbolico", label: "Simbólico" }, { value: "exploratorio", label: "Exploratório" }, { value: "repetitivo", label: "Repetitivo/Restrito" }] },
    { id: "desempenhoEscolar", label: "Principais Desafios Escolares", type: "checkbox-group", options: [{ value: "caligrafia", label: "Caligrafia" }, { value: "organizacao", label: "Organização (material, mesa)" }, { value: "atencao", label: "Atenção e permanência na tarefa" }, { value: "interacao_social", label: "Interação social com colegas" }] },
    { id: "observacoesTO", label: "Observações Adicionais", type: "textarea", placeholder: "Adaptações já utilizadas, interesses da criança, etc." },
  ],
  "Psicomotricidade": [
    { id: "queixaPrincipal", label: "Queixa Principal Psicomotora", type: "textarea", placeholder: "Inquietação, agitação, falta de coordenação, dificuldades de equilíbrio, tônus muscular alterado..." },
    { id: "headerDesenvolvimentoMotor", label: "Desenvolvimento Motor", type: "section-header" },
    { id: "marcosMotores", label: "Marcos Motores", type: "radio-group", options: [{ value: "atraso", label: "Atraso observado" }, { value: "esperado", label: "Dentro do esperado" }] },
    { id: "estereotipiasMotoras", label: "Estereotipias Motoras Observadas", type: "checkbox-group", options: [{ value: "flapping", label: "Flapping" }, { value: "balancar_corpo", label: "Balançar corpo" }, { value: "ponta_pes", label: "Andar na ponta dos pés" }, { value: "correr_sem_objetivo", label: "Correr sem objetivo" }] },
    { id: "headerTonusPostura", label: "Tônus e Postura", type: "section-header" },
    { id: "tonusMuscular", label: "Tônus Muscular", type: "radio-group", options: [{ value: "hipotonia", label: "Hipotonia" }, { value: "hipertonia", label: "Hipertonia" }, { value: "normotonia", label: "Normotonia" }, { value: "flutuante", label: "Flutuante" }] },
    { id: "postura", label: "Postura", type: "checkbox-group", options: [{ value: "curvada", label: "Curvada" }, { value: "instavel", label: "Instável" }, { value: "rigida", label: "Rígida" }] },
    { id: "headerCoordenacaoEquilibrio", label: "Coordenação e Equilíbrio", type: "section-header" },
    { id: "coordenacaoGrossa", label: "Coordenação Grossa", type: "checkbox-group", options: [{ value: "desajeitado", label: "Desajeitado" }, { value: "quedas_frequentes", label: "Quedas frequentes" }, { value: "dificuldade_esportes", label: "Dificuldade em esportes" }] },
    { id: "equilibrio", label: "Equilíbrio", type: "radio-group", options: [{ value: "bom", label: "Bom" }, { value: "regular", label: "Regular" }, { value: "pobre", label: "Pobre" }] },
    { id: "headerEsquemaCorporal", label: "Esquema Corporal e Lateralidade", type: "section-header" },
    { id: "conscienciaCorporal", label: "Consciência Corporal", type: "radio-group", options: [{ value: "boa", label: "Boa" }, { value: "dificuldade_nomear", label: "Dificuldade em nomear/localizar partes" }, { value: "dificuldade_imitar", label: "Dificuldade em imitar" }] },
    { id: "lateralidade", label: "Lateralidade", type: "radio-group", options: [{ value: "destro", label: "Definida (Destro)" }, { value: "canhoto", label: "Definida (Canhoto)" }, { value: "cruzada", label: "Cruzada" }, { value: "nao_definida", label: "Não definida" }] },
    { id: "observacoesPsicomotricidade", label: "Observações Adicionais", type: "textarea", placeholder: "Outras observações pertinentes..." },
  ],
  "Psicopedagogia": [
    { id: "queixaPrincipal", label: "Queixa Principal de Aprendizagem", type: "textarea", placeholder: "Dificuldades específicas (alfabetização, matemática), desatenção, falta de interesse..." },
    { id: "headerHistoricoEscolar", label: "Histórico Escolar", type: "section-header" },
    { id: "adaptacaoEscolar", label: "Adaptação Escolar", type: "radio-group", options: [{ value: "boa", label: "Boa" }, { value: "dificuldades_iniciais", label: "Com dificuldades iniciais" }, { value: "dificil_resistente", label: "Difícil/Resistente" }] },
    { id: "suporteEscolar", label: "Suporte Escolar Recebido", type: "checkbox-group", options: [{ value: "mediador", label: "Mediador em sala" }, { value: "pei", label: "PEI (Plano de Ensino Individualizado)" }, { value: "adaptacoes", label: "Adaptações curriculares" }] },
    { id: "headerFuncoesExecutivas", label: "Funções Executivas", type: "section-header" },
    { id: "dificuldadesExecutivas", label: "Dificuldades Observadas", type: "checkbox-group", options: [{ value: "planejamento", label: "Planejamento" }, { value: "organizacao", label: "Organização" }, { value: "iniciar_finalizar_tarefas", label: "Iniciar/Finalizar tarefas" }, { value: "flexibilidade_cognitiva", label: "Flexibilidade cognitiva" }, { value: "controle_inibitorio", label: "Controle inibitório" }] },
    { id: "headerHabilidadesAcademicas", label: "Habilidades Acadêmicas", type: "section-header" },
    { id: "leituraEscrita", label: "Leitura e Escrita", type: "checkbox-group", options: [{ value: "dificuldade_alfabetizacao", label: "Dificuldade na alfabetização" }, { value: "hiperlexia", label: "Leitura não compreensiva (Hiperlexia)" }, { value: "dificuldade_caligrafia", label: "Dificuldade na caligrafia" }] },
    { id: "matematica", label: "Matemática", type: "checkbox-group", options: [{ value: "conceitos_numericos", label: "Dificuldade com conceitos numéricos" }, { value: "calculo", label: "Dificuldade em cálculo" }, { value: "resolucao_problemas", label: "Dificuldade em resolução de problemas" }] },
    { id: "observacoesPsicopedagogia", label: "Observações Adicionais", type: "textarea", placeholder: "Outras observações pertinentes..." },
  ],
  "Musicoterapia": [
    { id: "demandaMusicoterapia", label: "Demanda para Musicoterapia", type: "textarea", placeholder: "Objetivos: ampliar comunicação, promover interação, regulação emocional..." },
    { id: "headerPerfilSonoro", label: "Perfil Sonoro-Musical", type: "section-header" },
    { id: "sensibilidadeAuditiva", label: "Sensibilidade Auditiva", type: "radio-group", options: [{ value: "hipersensivel", label: "Hipersensível" }, { value: "hipossensivel", label: "Hipossensível" }, { value: "tipica", label: "Típica" }] },
    { id: "preferenciasSonoras", label: "Preferências Sonoras", type: "checkbox-group", options: [{ value: "musicas_calmas", label: "Músicas calmas" }, { value: "musicas_agitadas", label: "Músicas agitadas" }, { value: "sons_natureza", label: "Sons da natureza" }, { value: "sons_objetos", label: "Sons de objetos" }, { value: "silencio", label: "Silêncio" }] },
    { id: "headerRespostasMusica", label: "Respostas à Música", type: "section-header" },
    { id: "reacoesObservadas", label: "Reações Observadas", type: "checkbox-group", options: [{ value: "acalma", label: "Acalma-se" }, { value: "agita", label: "Agita-se" }, { value: "vocaliza", label: "Vocaliza/Canta junto" }, { value: "movimenta_corpo", label: "Movimenta o corpo" }, { value: "demonstra_emocoes", label: "Demonstra emoções" }] },
    { id: "interacaoMusical", label: "Interação Musical", type: "checkbox-group", options: [{ value: "explora_instrumentos", label: "Explora instrumentos" }, { value: "imita_ritmos", label: "Imita ritmos/sons" }, { value: "inicia_interacao", label: "Inicia interação sonora" }, { value: "compartilha_instrumentos", label: "Compartilha instrumentos" }] },
    { id: "observacoesMusicoterapia", label: "Observações Adicionais", type: "textarea", placeholder: "Outras observações pertinentes..." },
  ],
  "Fisioterapia": [
    { id: "queixaFisioterapeutica", label: "Queixa Principal Fisioterapêutica", type: "textarea", placeholder: "Hipotonia, marcha atípica, dificuldade de coordenação, baixa resistência..." },
    { id: "headerDesenvolvimentoMotor", label: "Desenvolvimento Motor", type: "section-header" },
    { id: "marcosMotores", label: "Marcos Motores", type: "radio-group", options: [{ value: "atraso", label: "Atraso observado" }, { value: "esperado", label: "Dentro do esperado" }] },
    { id: "headerPadraoMarcha", label: "Padrão de Marcha", type: "section-header" },
    { id: "caracteristicasMarcha", label: "Características da Marcha", type: "checkbox-group", options: [{ value: "ponta_pes", label: "Marcha na ponta dos pés" }, { value: "base_alargada", label: "Base alargada" }, { value: "instavel_quedas", label: "Instável/Quedas frequentes" }, { value: "corridas_desajeitadas", label: "Corridas desajeitadas" }] },
    { id: "headerTonusForca", label: "Tônus e Força Muscular", type: "section-header" },
    { id: "tonusMuscular", label: "Tônus Muscular", type: "radio-group", options: [{ value: "hipotonia", label: "Hipotonia" }, { value: "hipertonia", label: "Hipertonia" }, { value: "normotonia", label: "Normotonia" }] },
    { id: "forcaMuscular", label: "Força Muscular", type: "radio-group", options: [{ value: "preservada", label: "Preservada" }, { value: "reduzida_geral", label: "Reduzida (geral)" }, { value: "reduzida_segmentar", label: "Reduzida (segmentar)" }] },
    { id: "headerCoordenacaoEquilibrio", label: "Coordenação e Equilíbrio", type: "section-header" },
    { id: "dificuldadesMotoras", label: "Dificuldades Motoras", type: "checkbox-group", options: [{ value: "pular", label: "Pular" }, { value: "chutar_bola", label: "Chutar bola" }, { value: "subir_escadas", label: "Subir/descer escadas" }, { value: "andar_bicicleta", label: "Andar de bicicleta" }] },
    { id: "observacoesFisioterapia", label: "Observações Adicionais", type: "textarea", placeholder: "Outras observações pertinentes..." },
  ],
  "Nutrição": [
    { id: "queixaNutricional", label: "Queixa Principal Nutricional", type: "textarea", placeholder: "Seletividade alimentar extrema, recusa alimentar, problemas gastrointestinais..." },
    { id: "headerComportamentoAlimentar", label: "Comportamento Alimentar", type: "section-header" },
    { id: "padraoAlimentar", label: "Padrão", type: "checkbox-group", options: [{ value: "seletividade_extrema", label: "Seletividade extrema" }, { value: "recusa_alimentar", label: "Recusa alimentar" }, { value: "rituais_mesa", label: "Rituais à mesa" }, { value: "come_rapido_lento", label: "Come muito rápido/lento" }, { value: "dificuldade_permanecer_sentado", label: "Dificuldade em permanecer sentado" }] },
    { id: "headerPerfilSensorial", label: "Perfil Sensorial Alimentar", type: "section-header" },
    { id: "restricoesTextura", label: "Restrições por Textura", type: "checkbox-group", options: [{ value: "pastosos", label: "Pastosos" }, { value: "crocantes", label: "Crocantes" }, { value: "liquidos", label: "Líquidos" }, { value: "solidos", label: "Sólidos" }, { value: "misturados", label: "Misturados" }] },
    { id: "outrasRestricoes", label: "Outras Restrições", type: "checkbox-group", options: [{ value: "cor", label: "Cor" }, { value: "cheiro", label: "Cheiro" }, { value: "temperatura", label: "Temperatura" }, { value: "marca_especifica", label: "Marca específica" }] },
    { id: "headerSintomasGastrointestinais", label: "Sintomas Gastrointestinais", type: "section-header" },
    { id: "sintomasFrequentes", label: "Frequência", type: "checkbox-group", options: [{ value: "constipacao", label: "Constipação" }, { value: "diarreia", label: "Diarreia" }, { value: "dor_abdominal", label: "Dor abdominal" }, { value: "refluxo", label: "Refluxo" }, { value: "gases", label: "Gases" }] },
    { id: "observacoesNutricao", label: "Alimentos Aceitos e Outras Observações", type: "textarea", placeholder: "Liste os alimentos que o paciente aceita e outras observações pertinentes..." },
  ],
  "Padrão": [
    { id: "queixaPrincipal", label: "Queixa Principal", type: "textarea", placeholder: "Descreva a principal queixa do paciente." },
    { id: "observacoesGerais", label: "Observações Gerais", type: "textarea", placeholder: "Nenhuma anamnese específica registrada ainda. Use este campo para observações gerais." },
  ]
};


interface AnamneseFormProps {
  specialty: string;
}

export const AnamneseForm = ({ specialty }: AnamneseFormProps) => {
  const currentModel = anamneseModels[specialty] || anamneseModels["Padrão"];

  const dynamicSchema = z.object(
    currentModel.reduce((acc, field) => {
      let fieldSchema: z.ZodType<any, any, any>;
      if (field.type === "textarea" || field.type === "radio-group" || field.type === "select") {
        fieldSchema = z.string().optional();
      } else if (field.type === "checkbox-group") {
        fieldSchema = z.array(z.string()).optional();
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
      acc[field.id as keyof AnamneseFormData] = field.defaultValue !== undefined ? field.defaultValue : (field.type === 'checkbox-group' ? [] : "");
      return acc;
    }, {} as AnamneseFormData),
  });

  const onSubmit = (data: AnamneseFormData) => {
    console.log("Anamnese submitted:", data);
    toast.success("Anamnese salva com sucesso!");
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
              name={field.id as keyof AnamneseFormData}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="font-bold">{field.label}</FormLabel>
                  {field.description && <FormDescription>{field.description}</FormDescription>}
                  <FormControl>
                    {field.type === "textarea" ? (
                      <Textarea placeholder={field.placeholder} {...formField} rows={4} />
                    ) : field.type === "radio-group" ? (
                      <RadioGroup
                        onValueChange={formField.onChange}
                        defaultValue={formField.value as string}
                        className="flex flex-col space-y-1"
                      >
                        {field.options?.map((option) => (
                          <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">{option.label}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : field.type === "checkbox-group" ? (
                      <div className="space-y-2">
                        {field.options?.map((option) => (
                          <Controller
                            key={option.value}
                            name={field.id as keyof AnamneseFormData}
                            control={form.control}
                            render={({ field: controllerField }) => {
                              const fieldValue = (controllerField.value as string[] | undefined) || [];
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={fieldValue.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? controllerField.onChange([...fieldValue, option.value])
                                          : controllerField.onChange(fieldValue.filter((value) => value !== option.value));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option.label}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Input placeholder={field.placeholder} {...formField} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit" className="mt-6">Salvar Anamnese</Button>
      </form>
    </Form>
  );
};