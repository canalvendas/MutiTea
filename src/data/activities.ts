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
        name: "Comunicação e Linguagem Expressiva",
        activities: [
          {
            title: "Caixa Surpresa",
            description: "Coloque objetos variados dentro de uma caixa. A criança tira um objeto e deve nomeá-lo ou descrevê-lo. Incentive a formação de frases como 'Eu peguei a bola vermelha'.",
            materials: "Caixa de sapatos, objetos variados (brinquedos, frutas de plástico, etc.).",
          },
          {
            title: "Contando Histórias com Figuras",
            description: "Use cartões com sequências de cenas. A criança deve organizar as cartas na ordem correta e contar a história, trabalhando a narrativa e a coesão.",
            materials: "Cartões de sequência lógica.",
          },
        ],
      },
      {
        name: "Articulação e Produção de Fala",
        activities: [
          {
            title: "Jogo da Pescaria de Fonemas",
            description: "Crie peixes de papel com figuras que representam palavras com o fonema-alvo. A criança 'pesca' um peixe e deve dizer o nome da figura, praticando o som.",
            materials: "Papel colorido, clipes de papel, varinha com imã.",
          },
          {
            title: "Sopro Divertido",
            description: "Atividades como soprar bolhas de sabão, apitos, ou uma bolinha de isopor em um percurso, fortalecem a musculatura orofacial necessária para a fala.",
            materials: "Bolhas de sabão, apitos, canudos, bolinhas de isopor.",
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
        name: "Processamento Sensorial (Tátil)",
        activities: [
          {
            title: "Caixa de Texturas",
            description: "Encha uma caixa com diferentes materiais (arroz, feijão, areia, algodão) e esconda pequenos objetos. A criança deve encontrar os objetos usando apenas o tato.",
            materials: "Caixa, arroz, feijão, areia, algodão, pequenos brinquedos.",
          },
          {
            title: "Pintura com os Dedos",
            description: "Use tintas comestíveis ou atóxicas para que a criança possa explorar a pintura com as mãos, dedos e até pés, trabalhando a tolerância a diferentes texturas.",
            materials: "Tinta guache atóxica ou tinta caseira, papel grande.",
          },
        ],
      },
      {
        name: "Habilidades Motoras Finas",
        activities: [
          {
            title: "Colar de Macarrão",
            description: "A criança deve passar um barbante por dentro de pedaços de macarrão (tipo penne). A atividade trabalha a preensão em pinça e a coordenação olho-mão.",
            materials: "Macarrão tipo penne, barbante com uma ponta endurecida com fita adesiva.",
          },
          {
            title: "Brincando com Massinha",
            description: "Amassar, enrolar, fazer bolinhas e 'cobrinhas' com massinha de modelar fortalece os músculos das mãos e desenvolve a destreza.",
            materials: "Massinha de modelar.",
          },
        ],
      },
      {
        name: "Planejamento Motor (Práxis)",
        activities: [
          {
            title: "Circuito de Obstáculos",
            description: "Crie um percurso com almofadas para pular, túneis para atravessar e cadeiras para passar por baixo. A criança precisa planejar seus movimentos para completar o circuito.",
            materials: "Almofadas, cadeiras, túneis de pano, bambolês.",
          },
          {
            title: "Siga o Mestre",
            description: "Faça uma sequência de movimentos (ex: bater palmas, pular, tocar a cabeça) e peça para a criança imitar. Aumente a complexidade da sequência gradualmente.",
            materials: "Nenhum.",
          },
        ],
      },
    ],
  },
];