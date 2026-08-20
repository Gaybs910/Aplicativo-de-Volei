import type { Module } from '../types/education';
import type { PlayerRole, RotationPosition } from '../types/volleyball';
import { buildDefaultLineup } from '../lib/court';
import { rotateTeam } from '../lib/rotation';

/** Calcula o mapeamento função -> posição depois de N-1 rotações a partir da escalação inicial. */
function expectedPositionsAfterRotations(count: number): Record<Exclude<PlayerRole, 'libero'>, RotationPosition> {
  let players = buildDefaultLineup();
  for (let i = 0; i < count; i += 1) {
    players = rotateTeam(players);
  }
  const result = {} as Record<Exclude<PlayerRole, 'libero'>, RotationPosition>;
  players.forEach((p) => {
    result[p.role as Exclude<PlayerRole, 'libero'>] = p.position;
  });
  return result;
}

export const MODULES: Module[] = [
  {
    id: 'iniciante',
    title: 'Iniciante',
    lessons: [
      {
        id: 'quadra-e-termos',
        title: 'A quadra e os termos básicos',
        paragraphs: [
          'A quadra de vôlei tem 9m de largura por 18m de comprimento, dividida ao meio pela rede — ou seja, 9m x 9m para cada equipe.',
          'A 3 metros da rede, em cada lado, fica a linha de ataque. Ela separa a "linha de rede" (zona de ataque) da "linha de fundo" (zona de defesa).',
          'Jogadores que estão atrás da linha de ataque no momento do saque são chamados de "jogadores de fundo" (back row); os que estão entre a rede e a linha de ataque são "jogadores de rede" (front row).',
          'Um jogador de fundo pode atacar a bola acima da altura da rede, mas só se saltar de trás da linha de ataque — essa é a base de todo ataque de segunda linha (pipe, por exemplo).',
        ],
        visual: 'default-court',
      },
    ],
  },
  {
    id: 'posicoes-rodizio',
    title: 'Posições e Rodízio',
    lessons: [
      {
        id: 'posicoes-p1-p6',
        title: 'Posições em quadra (P1–P6)',
        paragraphs: [
          'A regra oficial numera as seis posições em quadra de 1 a 6. A posição 1 é o fundo direito (de onde se saca), a 6 é o fundo central, e a 5 é o fundo esquerdo.',
          'Na linha de rede, a posição 2 é a rede direita, a 3 é a rede central e a 4 é a rede esquerda.',
          'Essas posições não são "cargos fixos" de um jogador — são vagas na formação que vão mudando de dono a cada rodízio, conforme o time gira.',
          'É importante não confundir posição de rodízio (1 a 6) com função tática (levantador, oposto, ponteiro, central, líbero). Um levantador passa pelas seis posições ao longo do set.',
        ],
        visual: 'default-court',
      },
      {
        id: 'como-funciona-rodizio',
        title: 'Como funciona o rodízio (rotação)',
        paragraphs: [
          'Toda vez que uma equipe recupera o direito de sacar (side-out), todos os seis jogadores em quadra giram uma posição no sentido horário antes do saque.',
          'Na prática: quem estava na posição 2 (rede direita) vai para a posição 1 e passa a sacar; quem estava na 1 vai para a 6; da 6 para a 5; da 5 para a 4; da 4 para a 3; e da 3 para a 2.',
          'Depois que a bola é sacada, os jogadores podem se mover livremente pela quadra (respeitando a função de cada um) — a posição de rodízio só precisa estar correta no instante do saque.',
          'É justamente por causa disso que existe a regra de overlap (impedimento de posição): no momento do saque, cada jogador precisa estar na ordem certa em relação aos vizinhos imediatos, senão a equipe perde o ponto por erro de rotação.',
        ],
        visual: 'default-court',
        quiz: {
          rotationNumber: 3,
          expectedPositions: expectedPositionsAfterRotations(2),
          instructions:
            'Partindo da escalação inicial, o time já girou duas vezes (está na "Rotação 3"). Arraste cada jogador para a posição correta dessa rotação.',
        },
      },
    ],
  },
  {
    id: 'sistemas-taticos',
    title: 'Sistemas Táticos',
    lessons: [
      {
        id: 'sistema-4x2',
        title: 'Sistema 4x2',
        paragraphs: [
          'No 4x2, o time tem 4 atacantes e 2 levantadores, posicionados sempre em posições opostas entre si na rotação (separados por 3 posições).',
          'Como há sempre um levantador na rede, o ataque tem no máximo 2 opções (os dois atacantes de rede que não estão levantando), porque o próprio levantador ocupa uma vaga de rede.',
          'É o sistema mais simples de ensinar e por isso é comum em categorias de base, mas limita o poder de ataque do time no nível competitivo.',
        ],
        visual: 'default-court',
      },
      {
        id: 'sistema-6x2',
        title: 'Sistema 6x2',
        paragraphs: [
          'No 6x2, o time também tem 2 levantadores, mas eles atuam como atacantes quando estão na rede: o levantador de fundo é quem efetivamente levanta, enquanto o "outro" levantador ataca na rede.',
          'Isso mantém sempre 3 opções de ataque na rede (como no 5x1), mas exige dois jogadores com nível de levantamento competitivo — o que é raro e caro para uma equipe formar.',
          'Na prática, o 6x2 aparece mais em seleções com grande profundidade de elenco do que em times de clube regulares.',
        ],
        visual: 'default-court',
      },
      {
        id: 'por-que-5x1-domina',
        title: 'Por que o 5x1 é o mais usado no vôlei de alto nível',
        paragraphs: [
          'O 5x1 usa um único levantador fixo e 5 atacantes (2 ponteiros, 2 centrais e 1 oposto), o que permite especializar cada jogador em uma função só.',
          'Comparado ao 4x2, o 5x1 ganha uma opção extra de ataque quando o levantador está no fundo, porque o oposto pode atacar de rede sem se preocupar em levantar.',
          'Comparado ao 6x2, o 5x1 não depende de formar dois levantadores de nível internacional — só um, o que é mais viável e permite maior consistência tática de bola.',
          'O preço do 5x1 é que, quando o levantador está na linha de rede, o time perde uma opção de ataque (ele não pode atacar e levantar ao mesmo tempo) — é o trade-off que a próxima lição detalha.',
        ],
        visual: 'default-court',
      },
      {
        id: 'cobertura-transicao',
        title: 'Cobertura de ataque, rodízio defensivo e transição',
        paragraphs: [
          'Cobertura de ataque é o posicionamento dos jogadores que não estão atacando para recuperar a bola caso ela seja bloqueada e volte para o próprio campo.',
          'O formato mais comum é um "W" ou semicírculo ao redor do atacante: jogadores próximos cobrem rebotes curtos, e jogadores mais distantes cobrem bolas que voltam com mais força — veja o diagrama abaixo.',
          'Rodízio defensivo (ou "base defensiva") é a formação que o time assume no momento do ataque adversário — geralmente com o líbero e um jogador de fundo cobrindo diagonal e linha, e os bloqueadores organizados na rede.',
          'Transição é o momento em que o time passa de uma postura defensiva para uma ofensiva (ou vice-versa) assim que a bola muda de lado — a velocidade dessa troca de postura é um dos fatores que mais separa times de elite dos demais.',
        ],
        visual: 'attack-coverage',
      },
      {
        id: 'formacoes-padrao',
        title: 'Formações padrão para treinar com o time',
        paragraphs: [
          'As formações abaixo são pontos de partida prontos para explicar ou treinar com a galera: recepção de saque, base defensiva, cobertura de ataque, uma combinação de rede e a escalação base do 5x1.',
          'Clique em "Abrir na prancheta tática" para carregar qualquer uma delas na prancheta e continuar editando a partir dali — mover jogadores, desenhar novas setas ou salvar sua própria versão.',
        ],
        visual: 'preset-gallery',
      },
    ],
  },
  {
    id: '5x1-avancado',
    title: '5x1 Avançado',
    lessons: [
      {
        id: 'levantador-seis-rotacoes',
        title: 'O levantador no 5x1: uma posição, seis rotações',
        paragraphs: [
          'No 5x1, o levantador ocupa uma das seis posições de rodízio como qualquer outro jogador — ele só nunca troca de função, diferente dos demais que revezam entre atacar em posições diferentes da rede.',
          'Isso significa que, ao longo de um set completo, o levantador passa pelas seis posições (1 a 6), alternando entre "levantador de rede" (quando está nas posições 2, 3 ou 4) e "levantador de fundo" (quando está nas posições 1, 6 ou 5).',
          'O restante do time se organiza ao redor dele: como levantador e oposto ficam sempre em posições opostas (separadas por 3), quando o levantador está na rede, o oposto está no fundo — e vice-versa.',
        ],
        visual: 'default-court',
      },
      {
        id: 'levantador-rede-vs-fundo',
        title: 'Levantador de rede (front row) vs. levantador de fundo (back row)',
        paragraphs: [
          'Levantador de fundo (posições 1, 6 ou 5): esta é a situação "ideal" do 5x1. Como o levantador está atrás da linha de ataque, ele não conta como jogador de rede, então o time mantém os 3 atacantes de rede disponíveis (os dois centrais/ponteiros que estiverem na rede, mais o oposto quando ele estiver de rede) — na prática, até 3 opções de ataque de primeiro tempo.',
          'Levantador de rede (posições 2, 3 ou 4): aqui o levantador ocupa uma das três vagas de rede, então sobram só 2 atacantes de rede (tipicamente um central e um ponteiro). O oposto, que está no fundo nessa rotação, pode compensar atacando de segunda linha (pipe/backslide de oposto), mas isso exige mais técnica.',
          'Por isso, comentaristas costumam dizer que um time "sofre" em certas rotações: são justamente aquelas em que o levantador está na rede e o time perde uma opção rápida de ataque.',
          'Use o explorador abaixo para percorrer as 6 rotações e ver exatamente em quais delas o levantador (destacado em amarelo) está na rede ou no fundo.',
        ],
        visual: 'rotation-explorer',
      },
      {
        id: 'seis-rotacoes-na-pratica',
        title: 'As 6 rotações do 5x1 na prática',
        paragraphs: [
          'Rotação 1: o levantador está na posição 1 (fundo direito) — levantador de fundo, 3 opções de ataque.',
          'Rotação 2: o levantador vai para a posição 6 (fundo central) — ainda de fundo, 3 opções.',
          'Rotação 3: o levantador vai para a posição 5 (fundo esquerdo) — última rotação de fundo antes de subir para a rede.',
          'Rotação 4: o levantador sobe para a posição 4 (rede esquerda) — agora é levantador de rede, o time cai para 2 opções de ataque de primeiro tempo.',
          'Rotação 5: o levantador vai para a posição 3 (rede central) — ainda de rede, geralmente a rotação mais "sacrificada" ofensivamente.',
          'Rotação 6: o levantador vai para a posição 2 (rede direita), a última antes de voltar para a posição 1 e reiniciar o ciclo.',
          'Treinadores estudam essas seis rotações uma a uma para decidir onde valorizar o ataque rápido de central, quando usar o pipe do oposto, e em que rotações vale a pena arriscar um saque mais agressivo do adversário.',
        ],
        visual: 'rotation-explorer',
      },
    ],
  },
];

export function findLesson(moduleId: string, lessonId: string) {
  const module = MODULES.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);
  return { module, lesson };
}
