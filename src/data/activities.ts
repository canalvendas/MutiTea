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

export interface Diagnosis {
  name: string;
  icon: string;
  demands: Demand[];
}

export interface SpecialtyActivities {
  specialty: string;
  icon: LucideIcon;
  diagnoses: Diagnosis[];
}

export const activitiesData: SpecialtyActivities[] = [
  {
    specialty: "Psicologia",
    icon: BrainCircuit,
    diagnoses: [
      {
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Histórias Sociais", description: "Criar narrativas curtas e visuais para explicar situações sociais, como esperar a vez ou como cumprimentar um amigo.", materials: "Figuras, fotos, software de criação de histórias." },
              { title: "Role-playing com Fantoches", description: "Encenar diálogos e interações sociais usando fantoches para praticar a troca de turnos na conversa e a iniciativa comunicativa.", materials: "Fantoches, bonecos." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Jogo da Generalização", description: "Ensinar um conceito (ex: 'vermelho') com um objeto (bloco vermelho) e depois praticar a identificação da cor em outros contextos (roupa, fruta, caneta).", materials: "Objetos variados da mesma cor." },
              { title: "Mapa Mental de Rotinas", description: "Criar um mapa visual para uma tarefa complexa (ex: arrumar a mochila), quebrando-a em passos menores e concretos para facilitar a execução.", materials: "Cartolina, canetas coloridas, figuras adesivas." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Baralho das Emoções", description: "Usar cartas com expressões faciais para que a criança identifique, nomeie e imite as emoções, associando-as a situações do dia a dia.", materials: "Cartas com fotos ou desenhos de emoções." },
              { title: "Termômetro da Raiva", description: "Criar um 'termômetro' visual que ajuda a criança a identificar os níveis de sua raiva ou ansiedade e associar estratégias de calma para cada nível.", materials: "Cartolina, canetas, velcro." },
            ],
          },
        ],
      },
      {
        name: "⚡ TDAH – Transtorno de Déficit de Atenção e Hiperatividade",
        icon: "⚡",
        demands: [
          {
            name: "🧠 Atenção e Funções Executivas",
            activities: [
              { title: "Técnica do Pomodoro Kids", description: "Usar um timer visual para marcar períodos de foco (ex: 15 min) seguidos por uma pequena pausa recompensadora (ex: 5 min de massinha).", materials: "Timer visual (analógico ou digital), atividade de recompensa." },
              { title: "Checklist do Super-Herói", description: "Criar um checklist visual com os passos de uma tarefa (ex: lição de casa). A cada passo completado, a criança ganha um adesivo de super-herói.", materials: "Papel, caneta, adesivos." },
            ],
          },
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Jogo do Semáforo", description: "Usar as cores do semáforo para ensinar o controle de impulsos: Vermelho (Pare e pense), Amarelo (Pense em soluções), Verde (Escolha a melhor e siga).", materials: "Círculos de papel nas cores vermelho, amarelo e verde." },
              { title: "Contrato de Comportamento", description: "Elaborar um 'contrato' simples com a criança, definindo 1 ou 2 comportamentos-alvo e as recompensas associadas, promovendo a autorregulação.", materials: "Papel, caneta, adesivos." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Pote dos Elogios", description: "Manter um pote onde a família e o terapeuta depositam bilhetes com elogios e reconhecimento pelos esforços e conquistas da criança, para ser lido em momentos especiais.", materials: "Pote de vidro, pequenos papéis coloridos." },
              { title: "Roda das Soluções", description: "Criar uma roda com diferentes opções para lidar com a frustração (respirar fundo, pedir ajuda, tentar de novo, fazer uma pausa). Quando frustrada, a criança gira a roda e escolhe uma estratégia.", materials: "Prato de papelão, canetas, um clipe e um pino." },
            ],
          },
        ],
      },
      {
        name: "😤 TOD – Transtorno Opositivo-Desafiador",
        icon: "😤",
        demands: [
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Jogo da Cooperação", description: "Utilizar jogos de tabuleiro ou de construção que exijam que os jogadores trabalhem juntos para um objetivo comum, em vez de competirem entre si.", materials: "Jogos cooperativos (ex: construir uma torre juntos)." },
              { title: "Escolha Guiada", description: "Em vez de dar uma ordem direta, oferecer duas opções aceitáveis. Ex: 'Você prefere guardar os blocos ou os carrinhos primeiro?'. Isso dá uma sensação de controle e aumenta a cooperação.", materials: "Nenhum." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Detetive dos Sentimentos", description: "Ajudar a criança a identificar o sentimento por trás do comportamento de oposição. 'Eu vejo que você está com raiva. O que aconteceu que te deixou assim?'.", materials: "Cartas de emoções." },
              { title: "Tempo de Conexão", description: "Agendar um tempo curto (10-15 min) e diário de atenção exclusiva e positiva com a criança, fazendo uma atividade de sua escolha, para fortalecer o vínculo.", materials: "Atividade de escolha da criança." },
            ],
          },
        ],
      },
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "🧠 Cognitivo e Aprendizagem",
            activities: [
              { title: "Quebra-Tarefa Visual", description: "Dividir uma tarefa em passos visuais muito pequenos. Use um quadro 'Primeiro-Depois' para mostrar a sequência (ex: 'Primeiro, guardar 3 blocos. Depois, massinha').", materials: "Cartões com figuras, quadro 'Primeiro-Depois'." },
              { title: "Economia de Fichas", description: "Usar um sistema de fichas para reforçar a conclusão de pequenas etapas de uma tarefa. Ao juntar um número de fichas, a criança troca por um prêmio.", materials: "Fichas (plásticas, de papel), quadro de fichas, reforçadores." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Caixa de Conquistas", description: "Decorar uma caixa onde a criança guarda desenhos ou símbolos de coisas que ela aprendeu ou fez bem, reforçando a autoconfiança e a autoestima.", materials: "Caixa de sapatos, materiais de arte." },
              { title: "Jogo de Emoções Simplificado", description: "Usar cartas com expressões muito claras (feliz, triste) e associá-las a situações concretas e simples do dia a dia da criança.", materials: "Cartões com emoções básicas." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Terapia Ocupacional",
    icon: ToyBrick,
    diagnoses: [
      {
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Dieta Sensorial", description: "Criar um 'cardápio' de atividades sensoriais (pular, balançar, usar colete pesado) para ajudar a criança a se regular ao longo do dia.", materials: "Balanço, cama elástica, colete ponderado, massinha." },
              { title: "Circuito Motor", description: "Montar um percurso com diferentes desafios motores e sensoriais (passar por túneis, pular em almofadas, equilibrar-se) para trabalhar o planejamento motor e a consciência corporal.", materials: "Túnel de pano, almofadas, bambolês." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Brincar de Faz de Conta", description: "Estruturar brincadeiras simbólicas (cozinhar, cuidar de um boneco) para trabalhar a imitação, a reciprocidade e a compreensão de papéis sociais.", materials: "Cozinha de brinquedo, bonecos, fantasias." },
            ],
          },
        ],
      },
      {
        name: "⚡ TDAH – Transtorno de Déficit de Atenção e Hiperatividade",
        icon: "⚡",
        demands: [
          {
            name: "🧠 Atenção e Funções Executivas",
            activities: [
              { title: "Cozinha Terapêutica", description: "Seguir uma receita simples para trabalhar o sequenciamento de tarefas, a organização e a atenção sustentada de forma prática e motivadora.", materials: "Ingredientes para uma receita simples (ex: sanduíche, vitamina)." },
              { title: "Assento Adaptado", description: "Utilizar um disco inflável ou uma almofada de assento que permita micromovimentos, ajudando a criança a se manter sentada e focada por mais tempo.", materials: "Disco de equilíbrio (almofada de assento)." },
            ],
          },
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Atividades de 'Trabalho Pesado'", description: "Antes de uma tarefa que exige foco, propor atividades que envolvam empurrar, puxar ou carregar objetos pesados (de forma segura) para ajudar a organizar o sistema nervoso e diminuir a inquietação.", materials: "Caixa com livros, fardos de garrafas pet." },
            ],
          },
        ],
      },
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "🧠 Cognitivo e Aprendizagem",
            activities: [
              { title: "Análise de Tarefas para AVDs", description: "Dividir uma Atividade de Vida Diária (ex: escovar os dentes) em passos muito pequenos e visuais, ensinando um passo de cada vez até a criança dominar a sequência completa.", materials: "Quadro de rotina com figuras para cada passo." },
            ],
          },
          {
            name: "👂 Motor e Sensorial",
            activities: [
              { title: "Exploração de Texturas", description: "Criar um 'caminho sensorial' com diferentes texturas para a criança andar descalça, ou uma caixa com objetos de diferentes materiais para explorar com as mãos, estimulando a discriminação tátil.", materials: "Tapetes de texturas, bacias com grãos, esponjas, etc." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Brincar Paralelo Guiado", description: "Facilitar a brincadeira ao lado de outro colega com objetos semelhantes para promover a tolerância e a observação social, um passo inicial para a interação.", materials: "Dois conjuntos de brinquedos iguais (ex: blocos, carrinhos)." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Fonoaudiologia",
    icon: Mic,
    diagnoses: [
      {
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Caça ao Tesouro com CAA", description: "Esconder objetos e a criança deve usar seu sistema de comunicação alternativa (CAA) para pedir pistas ou nomear o objeto encontrado.", materials: "Sistema de CAA (fichas, tablet), objetos de interesse." },
              { title: "Expansão e Reformulação", description: "Quando a criança usa uma palavra ou ecolalia, o terapeuta expande a frase. Se a criança diz 'bola', o terapeuta diz 'Ah, você quer a bola grande!'.", materials: "Brinquedos e objetos do cotidiano." },
            ],
          },
        ],
      },
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "💬 Comunicação",
            activities: [
              { title: "Álbum de Figuras Funcionais", description: "Criar um álbum com figuras de pessoas, objetos e ações importantes do dia a dia da criança para estimular a nomeação e a construção de frases simples.", materials: "Álbum de fotos, figuras impressas e plastificadas." },
              { title: "Música e Gestos", description: "Cantar músicas infantis que envolvam gestos (ex: 'Cabeça, Ombro, Joelho e Pé') para associar a palavra ao seu significado de forma lúdica e corporal.", materials: "Aparelho de som." },
            ],
          },
          {
            name: "🧠 Cognitivo e Aprendizagem",
            activities: [
              { title: "Jogo de Categorias com Objetos", description: "Use objetos concretos (frutas, animais de brinquedo) e peça para a criança agrupar por categoria, trabalhando o raciocínio e o vocabulário.", materials: "Miniaturas de objetos, caixas para separação." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Psicomotricidade",
    icon: Footprints,
    diagnoses: [
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "👂 Motor e Sensorial",
            activities: [
              { title: "Dança do Espelho", description: "O terapeuta faz um movimento simples e lento, e a criança imita, trabalhando esquema corporal e planejamento motor.", materials: "Música calma." },
              { title: "Pintura com os Pés", description: "Em um papel grande no chão, a criança pinta usando os pés, estimulando a consciência dos membros inferiores e a integração sensorial.", materials: "Papel pardo, tinta guache atóxica." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Brincadeira de Roda", description: "Atividades em grupo simples que promovam o contato visual e a imitação de gestos, incentivando a participação social de forma estruturada.", materials: "Música." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Psicopedagogia",
    icon: BookOpen,
    diagnoses: [
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "🧠 Cognitivo e Aprendizagem",
            activities: [
              { title: "Material Dourado Concreto", description: "Usar o material dourado para ensinar conceitos matemáticos de forma visual e tátil, facilitando a compreensão de quantidade e operações.", materials: "Material Dourado." },
              { title: "Alfabeto Sensorial", description: "Criar letras com lixa, algodão ou outros materiais para que a criança possa traçar com o dedo, associando a forma da letra a uma sensação tátil.", materials: "Letras de MDF, lixa, algodão, cola." },
            ],
          },
          {
            name: "💬 Comunicação",
            activities: [
              { title: "Sequenciamento de Histórias com Figuras", description: "Usar 3 ou 4 figuras para que a criança ordene e conte uma história simples, trabalhando a estrutura narrativa e a linguagem.", materials: "Cartões de sequência lógica." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Nutrição",
    icon: Salad,
    diagnoses: [
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "👂 Motor e Sensorial",
            activities: [
              { title: "Cozinha Sensorial", description: "Preparar uma receita simples onde a criança possa amassar, misturar e sentir as texturas dos alimentos com as mãos, como fazer pão ou biscoitos.", materials: "Ingredientes e utensílios de cozinha seguros." },
            ],
          },
          {
            name: "🧠 Cognitivo e Aprendizagem",
            activities: [
              { title: "Supermercado de Brinquedo", description: "Brincar de comprar alimentos, nomeando-os e separando-os por grupos (frutas, legumes), trabalhando vocabulário e categorização.", materials: "Alimentos de brinquedo, cestinha." },
            ],
          },
        ],
      },
    ],
  },
  {
    specialty: "Musicoterapia",
    icon: Music,
    diagnoses: [
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "💬 Comunicação",
            activities: [
              { title: "Canção de Chamado e Resposta", description: "Criar uma música simples onde o terapeuta canta uma frase (ex: 'Onde está o [nome da criança]?') e a criança é incentivada a responder com um som, gesto ou palavra.", materials: "Instrumento harmônico (violão, teclado)." },
            ],
          },
          {
            name: "👂 Motor e Sensorial",
            activities: [
              { title: "Exploração de Instrumentos", description: "Oferecer instrumentos de diferentes texturas, formas e sons (chocalho, tambor, pandeiro) para exploração livre, estimulando a integração sensorial e a coordenação motora.", materials: "Instrumentos de percussão variados." },
            ],
          },
        ],
      },
    ],
  },
];