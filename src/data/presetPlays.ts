import type { Arrow, Player } from '../types/volleyball';

export interface PlayStep {
  label: string;
  players: Player[];
  /** Posição da bola nesse passo (null/ausente = bola não é mostrada, ex: formação estática sem jogada). */
  ball?: { x: number; y: number };
}

export interface PresetPlay {
  id: string;
  name: string;
  description: string;
  /** Setas estáticas mostradas quando a jogada é carregada (editável) na prancheta tática. */
  arrows: Arrow[];
  /** Sequência de passos usada na animação "Animar jogada". */
  steps: PlayStep[];
}

const YELLOW = '#fde047';

export const PRESET_PLAYS: PresetPlay[] = [
  {
    id: 'recepcao-u',
    name: 'Recepção de saque (formato em U)',
    description:
      'Formação clássica de recepção: líbero e ponteiros recebem em "U", enquanto levantador e centrais ficam perto da rede para não atrapalhar a recepção, e o oposto se posiciona no fundo para o ataque de 2ª linha.',
    arrows: [],
    steps: (() => {
      const oposto: Player = { id: 'preset-oposto', role: 'oposto', position: 1, x: 7.3, y: 16.5 };
      const central1: Player = { id: 'preset-central1', role: 'central1', position: 3, x: 4.5, y: 9.6 };
      const ponteiro1: Player = { id: 'preset-ponteiro1', role: 'ponteiro1', position: 4, x: 1.7, y: 12 };
      const ponteiro2: Player = { id: 'preset-ponteiro2', role: 'ponteiro2', position: 5, x: 1.7, y: 15.5 };
      const liberoBase: Player = { id: 'preset-libero', role: 'libero', position: 6, x: 4.5, y: 13.5 };
      const levantadorBase: Player = { id: 'preset-levantador', role: 'levantador', position: 2, x: 7.3, y: 9.8 };

      return [
        {
          label: 'Saque adversário',
          players: [levantadorBase, oposto, central1, liberoBase, ponteiro1, ponteiro2],
          ball: { x: 7.5, y: 1 },
        },
        {
          label: 'A bola cruza a rede',
          players: [levantadorBase, oposto, central1, liberoBase, ponteiro1, ponteiro2],
          ball: { x: 4.5, y: 9 },
        },
        {
          label: 'Recepção (líbero)',
          players: [
            { ...levantadorBase, x: 5.8, y: 9.6 },
            oposto,
            central1,
            { ...liberoBase, x: 4.5, y: 13.2 },
            ponteiro1,
            ponteiro2,
          ],
          ball: { x: 4.5, y: 13.2 },
        },
        {
          label: 'Levantamento',
          players: [
            { ...levantadorBase, x: 5.5, y: 9.5 },
            oposto,
            central1,
            liberoBase,
            ponteiro1,
            ponteiro2,
          ],
          ball: { x: 5.5, y: 9.5 },
        },
      ];
    })(),
  },
  {
    id: 'base-defensiva',
    name: 'Base defensiva (bloqueio + defesa)',
    description:
      'Três blocadores organizados na rede e três defensores cobrindo linha, diagonal e o meio da quadra — a formação padrão para quando o adversário está atacando.',
    arrows: [],
    steps: (() => {
      const levantador: Player = { id: 'preset-levantador', role: 'levantador', position: 1, x: 7.3, y: 16 };
      const ponteiro2: Player = { id: 'preset-ponteiro2', role: 'ponteiro2', position: 5, x: 1.7, y: 16 };
      const central1Base: Player = { id: 'preset-central1', role: 'central1', position: 3, x: 4.5, y: 9.6 };
      const ponteiro1Base: Player = { id: 'preset-ponteiro1', role: 'ponteiro1', position: 2, x: 7.3, y: 9.6 };
      const opostoBase: Player = { id: 'preset-oposto', role: 'oposto', position: 4, x: 1.7, y: 9.6 };
      const liberoBase: Player = { id: 'preset-libero', role: 'libero', position: 6, x: 4.5, y: 14.5 };

      const central1Tight = { ...central1Base, x: 4.3, y: 9.6 };
      const ponteiro1Tight = { ...ponteiro1Base, x: 7.0, y: 9.6 };

      return [
        {
          label: 'Ataque adversário',
          players: [levantador, ponteiro2, central1Base, ponteiro1Base, opostoBase, liberoBase],
          ball: { x: 4.5, y: 4 },
        },
        {
          label: 'A bola cruza a rede',
          players: [levantador, ponteiro2, central1Tight, ponteiro1Tight, opostoBase, liberoBase],
          ball: { x: 4.5, y: 8 },
        },
        {
          label: 'Bloqueio toca a bola',
          players: [
            levantador,
            ponteiro2,
            central1Tight,
            ponteiro1Tight,
            opostoBase,
            { ...liberoBase, x: 4.5, y: 13 },
          ],
          ball: { x: 4.5, y: 9.3 },
        },
        {
          label: 'Defesa recupera (líbero)',
          players: [
            levantador,
            ponteiro2,
            central1Tight,
            ponteiro1Tight,
            opostoBase,
            { ...liberoBase, x: 4.5, y: 13 },
          ],
          ball: { x: 4.5, y: 13 },
        },
      ];
    })(),
  },
  {
    id: 'cobertura-w',
    name: 'Cobertura de ataque (formato em W)',
    description:
      'Enquanto o ponteiro ataca, o restante do time forma um "W" ao seu redor para recuperar a bola caso ela seja bloqueada e volte para o campo.',
    arrows: [
      { id: 'preset-cobertura-arrow', start: { x: 1.7, y: 8.3 }, end: { x: 1.7, y: 10.6 }, color: YELLOW },
    ],
    steps: (() => {
      const ponteiro1: Player = { id: 'preset-ponteiro1', role: 'ponteiro1', position: 4, x: 1.7, y: 10.2 };
      const levantador: Player = { id: 'preset-levantador', role: 'levantador', position: 3, x: 4.3, y: 10 };
      const central2: Player = { id: 'preset-central2', role: 'central2', position: 2, x: 7.3, y: 10 };

      const central1Start: Player = { id: 'preset-central1', role: 'central1', position: 6, x: 3.0, y: 13 };
      const opostoStart: Player = { id: 'preset-oposto', role: 'oposto', position: 1, x: 5.5, y: 14 };
      const ponteiro2Start: Player = { id: 'preset-ponteiro2', role: 'ponteiro2', position: 5, x: 1.7, y: 15.5 };

      const central1Mid = { ...central1Start, x: 1.0, y: 12 };
      const opostoMid = { ...opostoStart, x: 3.5, y: 12 };
      const ponteiro2Mid = { ...ponteiro2Start, x: 1.7, y: 14 };

      const central1Final = { ...central1Start, x: 0.6, y: 11.6 };
      const opostoFinal = { ...opostoStart, x: 2.9, y: 11.6 };
      const ponteiro2Final = { ...ponteiro2Start, x: 1.7, y: 13.5 };

      return [
        {
          label: 'Levantamento',
          players: [ponteiro1, levantador, central2, central1Start, opostoStart, ponteiro2Start],
          ball: { x: 4.3, y: 10 },
        },
        {
          label: 'Ataque cruza a rede',
          players: [ponteiro1, levantador, central2, central1Mid, opostoMid, ponteiro2Mid],
          ball: { x: 1.7, y: 8 },
        },
        {
          label: 'Bloqueio devolve a bola (cobertura pronta)',
          players: [ponteiro1, levantador, central2, central1Final, opostoFinal, ponteiro2Final],
          ball: { x: 1.7, y: 10.6 },
        },
      ];
    })(),
  },
  {
    id: 'combinacao-x',
    name: 'Ataque combinado de rede (combinação X)',
    description:
      'O central ataca rápido no meio enquanto o ponteiro cruza por trás do levantador para atacar do outro lado — a combinação confunde o bloqueio adversário sobre quem realmente vai receber o passe.',
    arrows: [
      { id: 'preset-x-arrow-central', start: { x: 3.8, y: 12 }, end: { x: 3.9, y: 9.9 }, color: YELLOW },
      { id: 'preset-x-arrow-ponteiro', start: { x: 6, y: 12.5 }, end: { x: 2.6, y: 9.9 }, color: '#38bdf8' },
    ],
    steps: (() => {
      const levantador: Player = { id: 'preset-levantador', role: 'levantador', position: 3, x: 4.5, y: 9.8 };
      const central2: Player = { id: 'preset-central2', role: 'central2', position: 2, x: 7.3, y: 9.8 };
      const oposto: Player = { id: 'preset-oposto', role: 'oposto', position: 1, x: 4.5, y: 15.5 };
      const ponteiro2: Player = { id: 'preset-ponteiro2', role: 'ponteiro2', position: 4, x: 1.5, y: 9.8 };

      const central1Start: Player = { id: 'preset-central1', role: 'central1', position: 6, x: 3.8, y: 14 };
      const ponteiro1Start: Player = { id: 'preset-ponteiro1', role: 'ponteiro1', position: 5, x: 6, y: 15 };
      const central1Mid = { ...central1Start, x: 3.8, y: 12 };
      const ponteiro1Mid = { ...ponteiro1Start, x: 6, y: 12.5 };
      const central1Final = { ...central1Start, x: 3.9, y: 9.9 };
      const ponteiro1Final = { ...ponteiro1Start, x: 2.6, y: 9.9 };

      return [
        {
          label: 'Aproximação (bola com o levantador)',
          players: [levantador, central2, oposto, ponteiro2, central1Start, ponteiro1Start],
          ball: { x: 4.5, y: 9.8 },
        },
        {
          label: 'Corrida de aproximação',
          players: [levantador, central2, oposto, ponteiro2, central1Mid, ponteiro1Mid],
          ball: { x: 4.5, y: 9.8 },
        },
        {
          label: 'Ataque rápido do central',
          players: [levantador, central2, oposto, ponteiro2, central1Final, ponteiro1Final],
          ball: { x: 3.9, y: 7 },
        },
      ];
    })(),
  },
  {
    id: '5x1-base',
    name: 'Sistema 5x1 — escalação base',
    description: 'Ponto de partida padrão do 5x1 (rotação 1), útil para começar a montar qualquer explicação do zero.',
    arrows: [],
    steps: [
      {
        label: 'Escalação inicial',
        players: [
          { id: 'preset-levantador', role: 'levantador', position: 1, x: 7.5, y: 15 },
          { id: 'preset-ponteiro1', role: 'ponteiro1', position: 2, x: 7.5, y: 10.5 },
          { id: 'preset-central1', role: 'central1', position: 3, x: 4.5, y: 10.5 },
          { id: 'preset-oposto', role: 'oposto', position: 4, x: 1.5, y: 10.5 },
          { id: 'preset-ponteiro2', role: 'ponteiro2', position: 5, x: 1.5, y: 15 },
          { id: 'preset-central2', role: 'central2', position: 6, x: 4.5, y: 15 },
        ],
      },
    ],
  },
];
