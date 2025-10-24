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
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Mapeamento Sensorial Lúdico", description: "Investigar o perfil sensorial da criança através de brincadeiras, observando reações a diferentes estímulos e ajudando-a a nomear suas sensações.", materials: "Caixa com diferentes texturas, sons variados, lanternas." },
              { title: "Técnicas de Acalmar o Corpo", description: "Ensinar estratégias de autorregulação que envolvem o corpo, como respiração profunda ('cheirar a flor, soprar a vela') ou pressão profunda (abraço de urso).", materials: "Almofadas, cobertores." },
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
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Brincar Funcional com Script", description: "Durante uma brincadeira (ex: lanchonete), fornecer um script visual ou verbal simples para a criança usar para se comunicar ('Eu quero suco', 'Obrigado').", materials: "Brinquedos de lanchonete, cartões com frases." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Sequenciamento de AVDs", description: "Usar cartões com figuras para que a criança organize a sequência de uma Atividade de Vida Diária (ex: vestir-se) antes de executá-la.", materials: "Cartões de sequência para AVDs." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Brincar de Faz de Conta", description: "Estruturar brincadeiras simbólicas (cozinhar, cuidar de um boneco) para trabalhar a imitação, a reciprocidade e a compreensão de papéis sociais.", materials: "Cozinha de brinquedo, bonecos, fantasias." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Dieta Sensorial", description: "Criar um 'cardápio' de atividades sensoriais (pular, balançar, usar colete pesado) para ajudar a criança a se regular ao longo do dia.", materials: "Balanço, cama elástica, colete ponderado, massinha." },
              { title: "Circuito Motor", description: "Montar um percurso com diferentes desafios motores e sensoriais (passar por túneis, pular em almofadas, equilibrar-se) para trabalhar o planejamento motor e a consciência corporal.", materials: "Túnel de pano, almofadas, bambolês." },
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
        name: "😤 TOD – Transtorno Opositivo-Desafiador",
        icon: "😤",
        demands: [
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Circuito da Cooperação", description: "Criar um circuito motor onde duas pessoas precisam colaborar para completar a tarefa, como carregar uma bola grande juntos sem deixar cair.", materials: "Bolas, cones, almofadas." },
              { title: "Projeto de Construção Conjunta", description: "Propor a construção de uma grande estrutura com blocos ou caixas, onde a negociação e a divisão de tarefas são essenciais para o sucesso.", materials: "Blocos de montar, caixas de papelão." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Atividades de 'Trabalho Pesado' para Regulação", description: "Usar atividades proprioceptivas (empurrar uma parede, carregar uma cesta com peso) como estratégia para ajudar a criança a se regular antes que a frustração se instale.", materials: "Cesta, objetos com peso seguro." },
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
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Jogo de Categorias Visuais", description: "Usar figuras para que a criança agrupe itens por categoria (comida, animais, roupas), trabalhando o vocabulário e o pensamento abstrato.", materials: "Cartões com figuras de diferentes categorias." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Vídeos com Pausa para Inferência", description: "Assistir a vídeos curtos de interações sociais e pausar para perguntar 'O que você acha que ele está sentindo?' ou 'O que vai acontecer agora?'.", materials: "Tablet ou computador com vídeos curtos." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Dessensibilização Oral", description: "Usar massageadores orais, escovas de dente de diferentes texturas ou alimentos com sabores/texturas variadas para diminuir a hipersensibilidade oral.", materials: "Massageadores orais, escovas, alimentos." },
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
              { title: "Jogo do Detetive de Sons", description: "A criança fecha os olhos e o terapeuta faz um som (ex: bater palmas, tocar um sino). A criança deve identificar o som. Aumente a complexidade com sequências de sons.", materials: "Sino, chocalho, objetos que fazem som." },
              { title: "História com Pausas", description: "Leia uma história curta e faça pausas estratégicas, pedindo para a criança prever o que vai acontecer. Isso trabalha a memória de trabalho e a atenção sustentada.", materials: "Livro infantil." },
            ],
          },
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Bastão da Fala", description: "Em uma conversa ou jogo, apenas a pessoa que está segurando um objeto (o 'bastão da fala') pode falar. Isso ajuda a treinar o respeito aos turnos e o controle da impulsividade verbal.", materials: "Qualquer objeto fácil de segurar (caneta decorada, pequeno bastão)." },
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
              { title: "Jogo de Perguntas e Respostas", description: "Praticar como fazer perguntas e dar respostas de forma respeitosa, usando um tom de voz neutro. Pode ser feito com um jogo de tabuleiro simples como mediador.", materials: "Jogo de tabuleiro, cartas com perguntas." },
              { title: "Criação de Regras em Conjunto", description: "Antes de iniciar um jogo, crie 2 ou 3 regras junto com a criança. O envolvimento no processo aumenta a probabilidade de ela seguir as regras.", materials: "Papel, caneta." },
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
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Comandos Motores com Preposições", description: "Dar comandos que envolvam noções espaciais ('Pule DENTRO do bambolê', 'Passe POR BAIXO da corda'), associando a linguagem ao movimento.", materials: "Bambolês, cordas, cones." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Circuito com Sequência Lógica", description: "Montar um circuito onde a criança precisa seguir uma sequência de cores ou formas (ex: pular no azul, depois no amarelo), trabalhando a memória de trabalho e o planejamento.", materials: "Círculos de EVA coloridos." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Jogo do Espelho Corporal", description: "Em dupla, um faz um movimento e o outro imita, trabalhando a atenção ao outro, a imitação e a consciência corporal.", materials: "Nenhum." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Circuito Sensorial", description: "Criar um caminho com diferentes texturas para andar, objetos para pular e túneis para passar, trabalhando a integração sensorial e o planejamento motor.", materials: "Tapetes de texturas, bambolês, túneis de pano." },
              { title: "Dança das Estátuas", description: "Colocar uma música e dançar livremente. Quando a música para, todos devem virar estátuas. Ajuda na consciência corporal e no controle inibitório.", materials: "Aparelho de som." },
            ],
          },
        ],
      },
      {
        name: "⚡ TDAH – Transtorno de Déficit de Atenção e Hiperatividade",
        icon: "⚡",
        demands: [
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Corrida de Obstáculos", description: "Criar um percurso desafiador para que a criança possa gastar sua energia de forma direcionada e funcional, trabalhando agilidade e planejamento motor.", materials: "Cones, cordas, almofadas." },
              { title: "Yoga para Crianças", description: "Usar posturas de yoga que imitam animais para trabalhar o equilíbrio, a consciência corporal e a capacidade de se acalmar.", materials: "Tapete de yoga ou colchonete." },
            ],
          },
        ],
      },
      {
        name: "😤 TOD – Transtorno Opositivo-Desafiador",
        icon: "😤",
        demands: [
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Jogos Cooperativos com Bola", description: "O objetivo é manter uma bola de praia no ar o maior tempo possível, com todos tocando nela. O foco é no grupo, não na competição individual.", materials: "Bola de praia ou balão." },
            ],
          },
        ],
      },
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
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Leitura Compartilhada com Apoio Visual", description: "Ler um livro e usar figuras ou objetos para representar os personagens e ações, facilitando a compreensão da narrativa.", materials: "Livro infantil, figuras ou objetos relacionados." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Aprendizagem baseada em Hiperfoco", description: "Utilizar o tema de alto interesse da criança (ex: dinossauros) para ensinar conceitos acadêmicos (contar dinossauros, ler sobre eles, escrever seus nomes).", materials: "Livros, brinquedos e materiais sobre o tema de interesse." },
              { title: "Roteiro Visual para Tarefas", description: "Criar um passo a passo visual para a realização de tarefas escolares, como resolver um problema de matemática, para dar previsibilidade e autonomia.", materials: "Cartões com figuras ou texto." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Diário das Emoções na Escola", description: "Criar um diário simples onde a criança pode desenhar ou colar figuras para representar como se sentiu em diferentes momentos do dia escolar.", materials: "Caderno, lápis de cor, adesivos de emoções." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Alfabeto Tátil", description: "Usar letras de lixa ou feitas com massinha para que a criança trace com o dedo, associando a forma da letra a uma experiência sensorial.", materials: "Letras de lixa, massinha de modelar." },
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
              { title: "Mapas Mentais para Estudo", description: "Ensinar a criança a organizar as informações de um texto ou aula em um mapa mental, usando cores e desenhos, o que ajuda na memorização e organização das ideias.", materials: "Folha grande, canetas coloridas." },
              { title: "Jogo de Organização de Materiais", description: "Transformar a arrumação da mochila ou do estojo em um jogo cronometrado, com um checklist visual, para treinar a organização de forma lúdica.", materials: "Mochila, estojo, material escolar, cronômetro." },
            ],
          },
        ],
      },
      {
        name: "😤 TOD – Transtorno Opositivo-Desafiador",
        icon: "😤",
        demands: [
          {
            name: "🧠 Cognitivo e Escolar",
            activities: [
              { title: "Projetos de Escolha do Aluno", description: "Permitir que o aluno escolha o tema de um pequeno projeto ou pesquisa (dentro das opções dadas pelo terapeuta/professor) para aumentar o engajamento e a sensação de autonomia.", materials: "Livros, acesso à internet supervisionado." },
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
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Cardápio de Figuras", description: "Criar um cardápio com figuras dos alimentos para que a criança possa apontar ou nomear o que deseja comer, facilitando a comunicação na hora da refeição.", materials: "Fichas com fotos de alimentos." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Separando os Alimentos", description: "Brincar de separar alimentos (reais ou de brinquedo) por cor, forma ou grupo alimentar (frutas, legumes), trabalhando a categorização.", materials: "Alimentos variados ou de brinquedo." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Prato das Emoções", description: "Usar alimentos para montar carinhas que representem diferentes emoções no prato, ajudando a criança a associar e nomear sentimentos de forma lúdica.", materials: "Alimentos variados (rodelas de banana, uvas, tiras de cenoura)." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Exploração Sensorial de Alimentos", description: "Apresente um alimento novo sem a pressão de comer. Incentive a criança a tocar, cheirar, amassar, e descrever o alimento. É o primeiro passo da hierarquia da alimentação.", materials: "Um alimento novo (ex: brócolis cozido, uma fatia de manga)." },
              { title: "Culinária Terapêutica", description: "Envolva a criança no preparo de uma receita simples (ex: espetinho de frutas, biscoitos). O contato com os alimentos em um contexto lúdico diminui a ansiedade e aumenta a chance de experimentar.", materials: "Ingredientes da receita, utensílios seguros para crianças." },
            ],
          },
        ],
      },
      {
        name: "⚡ TDAH – Transtorno de Déficit de Atenção e Hiperatividade",
        icon: "⚡",
        demands: [
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Mindful Eating para Crianças", description: "Antes de comer, peça para a criança descrever o alimento usando os 5 sentidos. Isso ajuda a diminuir a impulsividade alimentar e aumenta a consciência sobre a comida.", materials: "Um alimento (ex: uma uva, um pedaço de chocolate)." },
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
              { title: "Cozinheiro Chefe por um Dia", description: "Deixe a criança escolher, entre duas opções saudáveis, o que será o lanche ou uma parte do jantar. Envolvê-la no processo de escolha e preparo pode diminuir a recusa.", materials: "Ingredientes e utensílios de cozinha." },
            ],
          },
        ],
      },
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
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Improvisação Musical", description: "Criar um diálogo não-verbal onde o terapeuta toca um ritmo ou melodia e a criança responde com um instrumento. Fomenta a reciprocidade e a comunicação espontânea.", materials: "Instrumentos de percussão variados (tambor, chocalho)." },
              { title: "Canções com Rotinas", description: "Criar músicas curtas para momentos de transição (guardar brinquedos, lavar as mãos). A música oferece previsibilidade e ajuda a organizar o comportamento.", materials: "Voz, instrumento harmônico (violão, teclado)." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Canção com Sequência", description: "Criar uma música que tenha uma sequência de ações ou sons que a criança precise memorizar e repetir, trabalhando a memória de trabalho.", materials: "Instrumentos de percussão." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Música das Emoções", description: "Tocar diferentes melodias (alegre, triste, agitada) e pedir para a criança expressar com o corpo ou com um instrumento como a música a faz sentir.", materials: "Aparelho de som, instrumentos variados." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Exploração de Timbres e Vibrações", description: "Oferecer instrumentos que produzam diferentes vibrações (tambor, triângulo, chocalho) para a criança explorar, trabalhando a discriminação auditiva e a sensibilidade tátil.", materials: "Instrumentos com diferentes timbres." },
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
              { title: "Jogo de Ritmo e Memória", description: "O terapeuta toca uma sequência rítmica simples e a criança deve repeti-la. Aumente a complexidade gradualmente para treinar a memória de trabalho e a atenção.", materials: "Tambor ou palmas." },
            ],
          },
        ],
      },
      {
        name: "😤 TOD – Transtorno Opositivo-Desafiador",
        icon: "😤",
        demands: [
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Composição de 'Rap da Raiva'", description: "Usar um ritmo forte e repetitivo para que a criança possa criar letras (mesmo que sejam apenas palavras soltas) para expressar sua raiva ou frustração de forma construtiva.", materials: "Base rítmica (pode ser de um aplicativo), microfone de brinquedo." },
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
  {
    specialty: "Fisioterapia",
    icon: HeartPulse,
    diagnoses: [
      {
        name: "🧩 TEA – Transtorno do Espectro Autista",
        icon: "🧩",
        demands: [
          {
            name: "💬 Comunicação e Linguagem",
            activities: [
              { title: "Circuito Comunicativo", description: "Montar um circuito onde a criança precisa pedir verbalmente ou com CAA pelo próximo item ('bola', 'pula-pula') para poder avançar.", materials: "Equipamentos de fisioterapia (bola, rolo, pula-pula)." },
            ],
          },
          {
            name: "🧠 Cognição e Aprendizagem",
            activities: [
              { title: "Sequência Motora com Cores", description: "Criar uma sequência de movimentos associada a cores (ex: 'azul = sentar na bola', 'vermelho = rolar no colchonete') para trabalhar o planejamento motor e a memória.", materials: "Cartões coloridos, equipamentos de fisioterapia." },
            ],
          },
          {
            name: "💞 Socioemocional",
            activities: [
              { title: "Jogo Motor em Dupla", description: "Propor atividades que exijam cooperação, como rolar uma bola grande um para o outro ou construir uma torre de almofadas juntos, trabalhando a interação e o respeito ao espaço do outro.", materials: "Bola suíça, almofadas." },
            ],
          },
          {
            name: "👂 Sensorial e Motor",
            activities: [
              { title: "Treino de Marcha na Ponta dos Pés", description: "Usar pistas visuais no chão (pegadas) e exercícios de alongamento da panturrilha para incentivar o contato do calcanhar com o solo durante a marcha.", materials: "Fita adesiva colorida, tapetes." },
              { title: "Exercícios em Bola Suíça", description: "Sentar-se ou deitar-se na bola para trabalhar o fortalecimento do core, o equilíbrio e fornecer estímulo vestibular e proprioceptivo.", materials: "Bola de fisioterapia (bola suíça)." },
            ],
          },
        ],
      },
      {
        name: "⚡ TDAH – Transtorno de Déficit de Atenção e Hiperatividade",
        icon: "⚡",
        demands: [
          {
            name: "💬 Comportamento",
            activities: [
              { title: "Circuito de Agilidade", description: "Criar um circuito que exija mudanças rápidas de direção, saltos e corridas para canalizar a energia motora e trabalhar a coordenação e o planejamento.", materials: "Cones, arcos, pequenos obstáculos." },
            ],
          },
        ],
      },
      {
        name: "🌱 DI – Deficiência Intelectual",
        icon: "🌱",
        demands: [
          {
            name: "👂 Motor e Sensorial",
            activities: [
              { title: "Fortalecimento de Core com Brincadeiras", description: "Brincar de 'carrinho de mão', 'ponte' ou 'aviãozinho' para fortalecer a musculatura abdominal e das costas de forma lúdica.", materials: "Colchonete." },
              { title: "Treino de Equilíbrio em Superfícies Instáveis", description: "Andar sobre almofadas, discos de equilíbrio ou colchões para desafiar e aprimorar as reações de equilíbrio e a propriocepção.", materials: "Almofadas, discos de equilíbrio." },
            ],
          },
        ],
      },
    ],
  },
];