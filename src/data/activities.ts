import { BrainCircuit, Mic, ToyBrick, Footprints, BookOpen, HeartPulse, Music, Salad, LucideIcon } from "lucide-react";

export interface Activity {
  title: string;
  description: string;
  materials: string;
}

export interface Demand {
  name: string;
  activities: Activity[];
}

export interface SpecialtyActivities {
  specialty: string;
  icon: LucideIcon;
  demands: Demand[];
}

export const activitiesData: SpecialtyActivities[] = [
  {
    specialty: "Psicologia",
    icon: BrainCircuit,
    demands: [
      {
        name: "Regulação Emocional",
        activities: [
          {
            title: "Termômetro das Emoções",
            description: "Ajuda a criança a identificar e graduar a intensidade de suas emoções. Crie um termômetro visual com cores (ex: verde para calmo, amarelo para alerta, vermelho para raiva) e ajude a criança a apontar como está se sentindo.",
            materials: "Cartolina, canetinhas coloridas, velcro ou um clipe de roupa.",
          },
          {
            title: "Pote da Calma (Calm Down Jar)",
            description: "Uma garrafa sensorial que ajuda a criança a focar e se acalmar. Ao agitar, o glitter se move lentamente, o que pode ser hipnótico e relaxante.",
            materials: "Garrafa plástica transparente, água morna, cola glitter, glitter extra, corante alimentício (opcional).",
          },
          {
            title: "Respiração do Balão",
            description: "Ensina a respiração profunda de forma lúdica. Peça para a criança 'encher um balão' na barriga, inspirando lentamente pelo nariz, e depois 'esvaziar', expirando pela boca.",
            materials: "Nenhum.",
          },
        ],
      },
      {
        name: "Habilidades Sociais e Teoria da Mente",
        activities: [
          {
            title: "Jogo das Emoções com Cartas",
            description: "Crie cartas com diferentes expressões faciais. A criança deve adivinhar a emoção e tentar imitar. Pode-se adicionar um nível de complexidade perguntando 'O que pode ter deixado essa pessoa assim?'.",
            materials: "Cartões com fotos ou desenhos de expressões faciais.",
          },
          {
            title: "Role-playing com Fantoches",
            description: "Use fantoches para encenar situações sociais comuns (ex: pedir um brinquedo, entrar em uma brincadeira). Isso permite que a criança pratique as habilidades em um ambiente seguro.",
            materials: "Fantoches ou bonecos.",
          },
          {
            title: "Histórias Sociais",
            description: "Crie pequenas histórias com imagens que descrevem uma situação social, as pistas relevantes e a resposta social esperada. Ex: 'Como se comportar em uma festa de aniversário'.",
            materials: "Papel, canetas, figuras ou um software para criar histórias.",
          },
        ],
      },
      {
        name: "Flexibilidade Cognitiva",
        activities: [
          {
            title: "Construção com Regras Malucas",
            description: "Comece a construir algo com blocos (ex: uma torre). No meio, mude a regra: 'Agora só podemos usar blocos azuis' ou 'Agora temos que colocar um bloco deitado e um em pé'.",
            materials: "Blocos de montar de diferentes cores e formas.",
          },
          {
            title: "Caminho Alternativo",
            description: "Desenhe um labirinto simples. Depois que a criança encontrar a saída, bloqueie o caminho que ela usou e peça para ela encontrar uma nova rota.",
            materials: "Papel, lápis, borracha.",
          },
        ],
      },
    ],
  },
  {
    specialty: "Fonoaudiologia",
    icon: Mic,
    demands: [
      {
        name: "Comunicação Funcional e Intenção Comunicativa",
        activities: [
          {
            title: "Caixa Surpresa",
            description: "Coloque objetos de alto interesse da criança dentro de uma caixa. A criança precisa solicitar (verbalmente, com gestos ou CAA) para ver o que tem dentro, trabalhando a iniciativa comunicativa.",
            materials: "Caixa de sapatos, objetos de interesse da criança.",
          },
          {
            title: "Comunicação por Troca de Figuras (PECS Básico)",
            description: "Inicie o treino de troca de figuras. A criança entrega uma figura do item desejado para o adulto e recebe o item em troca, estabelecendo uma comunicação funcional clara.",
            materials: "Figuras plastificadas de itens preferidos, pasta de comunicação.",
          },
        ],
      },
      {
        name: "Linguagem e Pragmática",
        activities: [
          {
            title: "Jogo de Turnos",
            description: "Use jogos simples como 'encaixar peças' ou 'rolar uma bola'. Enfatize verbalmente 'Minha vez', 'Sua vez' para trabalhar a troca de turnos, uma habilidade pragmática fundamental.",
            materials: "Qualquer jogo simples de duas pessoas (bola, quebra-cabeça, blocos).",
          },
          {
            title: "Contando Histórias com Figuras",
            description: "Use cartões com sequências de cenas. A criança deve organizar as cartas na ordem correta e contar a história, trabalhando a narrativa, coesão e compreensão de causa e efeito.",
            materials: "Cartões de sequência lógica.",
          },
        ],
      },
      {
        name: "Fala e Sistema Sensório-Motor-Oral",
        activities: [
          {
            title: "Sopro Divertido",
            description: "Atividades como soprar bolhas de sabão, apitos, ou uma bolinha de isopor em um percurso, fortalecem a musculatura orofacial necessária para a fala.",
            materials: "Bolhas de sabão, apitos, canudos, bolinhas de isopor.",
          },
          {
            title: "Exploração Sensorial Oral",
            description: "Para crianças com hipo ou hipersensibilidade oral, use mordedores com diferentes texturas ou alimentos seguros para explorar a boca, ajudando na dessensibilização e na consciência oral.",
            materials: "Mordedores texturizados, escovas de dente macias, alimentos seguros.",
          },
        ],
      },
    ],
  },
  {
    specialty: "Terapia Ocupacional",
    icon: ToyBrick,
    demands: [
      {
        name: "Modulação e Integração Sensorial",
        activities: [
          {
            title: "Caixa de Texturas",
            description: "Encha uma caixa com diferentes materiais (arroz, feijão, areia, algodão) e esconda pequenos objetos. A criança deve encontrar os objetos usando apenas o tato, trabalhando a discriminação e tolerância tátil.",
            materials: "Caixa, arroz, feijão, areia, algodão, pequenos brinquedos.",
          },
          {
            title: "Balanço Terapêutico",
            description: "Use um balanço (de rede, plataforma) para fornecer estímulos vestibulares. O movimento pode ser calmante (lento e linear) ou ativador (rápido e rotatório), ajudando na regulação do nível de alerta.",
            materials: "Balanço de rede, plataforma suspensa ou até um lençol seguro.",
          },
          {
            title: "Cantinho do Aconchego",
            description: "Crie um espaço com almofadas pesadas, cobertores e pufes onde a criança possa receber pressão profunda (propriocepção), o que ajuda a acalmar e organizar o sistema nervoso.",
            materials: "Almofadas, cobertores pesados, pufes.",
          },
        ],
      },
      {
        name: "Habilidades Motoras Finas e Grafomotoras",
        activities: [
          {
            title: "Colar de Macarrão",
            description: "A criança deve passar um barbante por dentro de pedaços de macarrão (tipo penne). A atividade trabalha a preensão em pinça e a coordenação olho-mão.",
            materials: "Macarrão tipo penne, barbante com uma ponta endurecida com fita adesiva.",
          },
          {
            title: "Desenho no Saco Sensorial",
            description: "Coloque gel de cabelo ou tinta dentro de um saco plástico com fecho zip. A criança pode desenhar letras e formas com o dedo, trabalhando a motricidade fina de forma divertida e sensorial.",
            materials: "Saco plástico tipo zip, gel de cabelo ou tinta.",
          },
        ],
      },
      {
        name: "Planejamento Motor (Práxis) e Consciência Corporal",
        activities: [
          {
            title: "Circuito de Obstáculos",
            description: "Crie um percurso com almofadas para pular, túneis para atravessar e cadeiras para passar por baixo. A criança precisa planejar seus movimentos para completar o circuito.",
            materials: "Almofadas, cadeiras, túneis de pano, bambolês.",
          },
          {
            title: "Estátua de Imitação",
            description: "Faça uma pose (ex: um braço para cima, uma perna dobrada) e peça para a criança imitar como se fosse um espelho. Isso trabalha a consciência corporal e o planejamento motor.",
            materials: "Nenhum.",
          },
        ],
      },
      {
        name: "Autonomia em Atividades de Vida Diária (AVDs)",
        activities: [
          {
            title: "Quadro de Rotina Visual",
            description: "Crie um quadro com a sequência de uma AVD (ex: escovar os dentes: pegar a escova, por a pasta, etc.). As figuras ajudam na previsibilidade e na execução independente da tarefa.",
            materials: "Cartolina, figuras representando os passos da tarefa, velcro.",
          },
          {
            title: "Treino de Vestir com Pistas",
            description: "Use roupas um número maior e coloque etiquetas ou adesivos coloridos na parte da frente e de trás para ajudar a criança a se orientar. Pratique a sequência de vestir de forma lúdica.",
            materials: "Roupas, etiquetas coloridas ou adesivos de tecido.",
          },
        ],
      },
    ],
  },
  {
    specialty: "Psicomotricidade",
    icon: Footprints,
    demands: [
      {
        name: "Consciência e Esquema Corporal",
        activities: [
          {
            title: "Carimbo do Corpo",
            description: "Passe tinta guache nas mãos e pés da criança e carimbe em um papel grande. Depois, nomeie as partes do corpo e desenhe o resto do 'boneco'.",
            materials: "Papel pardo ou cartolina, tinta guache atóxica.",
          },
          {
            title: "Onde a Bolinha Tocou?",
            description: "Com a criança de olhos fechados, toque suavemente uma parte do corpo dela com uma bola macia. Ela deve adivinhar e apontar onde foi tocada, aumentando a percepção corporal.",
            materials: "Bola macia ou de texturas.",
          },
        ],
      },
      {
        name: "Regulação Tônico-Emocional",
        activities: [
          {
            title: "Estátua e Gelatina",
            description: "Ao som de uma música, a criança se move. Quando a música para, ela vira uma 'estátua' (contração muscular). Quando a música volta, ela vira uma 'gelatina' (relaxamento). Ajuda a perceber e controlar o tônus.",
            materials: "Aparelho de som.",
          },
          {
            title: "Massagem com Bolinhas",
            description: "Role bolinhas de texturas diferentes (cravos, lisas) pelos braços, pernas e costas da criança. Isso ajuda na regulação do tônus e na aceitação do toque.",
            materials: "Bolinhas de massagem com diferentes texturas.",
          },
        ],
      },
    ],
  },
  {
    specialty: "Psicopedagogia",
    icon: BookOpen,
    demands: [
      {
        name: "Funções Executivas (Planejamento e Organização)",
        activities: [
          {
            title: "Receita de Massinha Caseira",
            description: "Siga uma receita simples com a criança. A atividade exige seguir uma sequência, separar ingredientes (organização) e executar um plano para chegar ao resultado final.",
            materials: "Ingredientes para massinha (farinha, sal, óleo, água, corante).",
          },
          {
            title: "Montando um Calendário de Tarefas",
            description: "Crie um calendário semanal visual com a criança, planejando as atividades escolares e terapêuticas. Use figuras e cores para representar cada tarefa.",
            materials: "Cartolina, canetas, adesivos ou figuras.",
          },
        ],
      },
      {
        name: "Atenção e Foco",
        activities: [
          {
            title: "Jogo da Memória Temático",
            description: "Use um jogo da memória com figuras do hiperfoco da criança (dinossauros, planetas, etc.). O interesse no tema ajuda a sustentar a atenção por mais tempo.",
            materials: "Jogo da memória (comprado ou feito em casa).",
          },
          {
            title: "Onde está o Wally?",
            description: "Livros ou figuras de procurar objetos/personagens são excelentes para treinar a atenção seletiva e a varredura visual de forma estruturada e divertida.",
            materials: "Livros do tipo 'Onde está o Wally?' ou figuras impressas da internet.",
          },
        ],
      },
    ],
  },
  {
    specialty: "Nutrição",
    icon: Salad,
    demands: [
      {
        name: "Seletividade Alimentar e Neofobia",
        activities: [
          {
            title: "Exploração Sensorial de Alimentos",
            description: "Apresente um alimento novo sem a pressão de comer. Incentive a criança a tocar, cheirar, amassar, e descrever o alimento. É o primeiro passo da hierarquia da alimentação.",
            materials: "Um alimento novo (ex: brócolis cozido, uma fatia de manga).",
          },
          {
            title: "Culinária Terapêutica",
            description: "Envolva a criança no preparo de uma receita simples (ex: espetinho de frutas, biscoitos). O contato com os alimentos em um contexto lúdico diminui a ansiedade e aumenta a chance de experimentar.",
            materials: "Ingredientes da receita, utensílios seguros para crianças.",
          },
        ],
      },
    ],
  },
];