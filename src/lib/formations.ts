import type { Player } from '../types/volleyball';
import { FRONT_ROW_POSITIONS, POSITION_SLOTS } from './court';

export type FormationName = 'base' | 'ataque' | 'defesa';

export const FORMATION_LABELS: Record<FormationName, string> = {
  base: 'Base',
  ataque: 'Ataque',
  defesa: 'Defesa',
};

function computeBase(players: Player[]): Player[] {
  return players.map((p) => {
    const slot = POSITION_SLOTS[p.position];
    return { ...p, x: slot.x, y: slot.y };
  });
}

function computeDefesa(players: Player[]): Player[] {
  return players.map((p) => {
    const slot = POSITION_SLOTS[p.position];
    if (FRONT_ROW_POSITIONS.includes(p.position)) {
      // Linha de frente perto da rede, pronta pro bloqueio.
      return { ...p, x: slot.x, y: 9.6 };
    }
    // Linha de fundo recuada, cobrindo os cantos (P1/P5) e o fundo (P6).
    if (p.position === 1) return { ...p, x: 8.3, y: 16.5 };
    if (p.position === 5) return { ...p, x: 0.7, y: 16.5 };
    return { ...p, x: 4.5, y: 16.5 };
  });
}

function computeAtaque(players: Player[]): Player[] {
  return players.map((p) => {
    if (p.role === 'levantador') {
      // Sempre perto da rede pra levantar, esteja na linha de frente ou de fundo — o ponto central do 5x1.
      return { ...p, x: 6.5, y: 9.7 };
    }
    const slot = POSITION_SLOTS[p.position];
    if (FRONT_ROW_POSITIONS.includes(p.position)) {
      return { ...p, x: slot.x, y: 9.8 };
    }
    if (p.role === 'oposto') {
      // Oposto de fundo aproxima da linha de ataque para simular o ataque de 2ª linha (pipe).
      return { ...p, x: slot.x, y: 11.8 };
    }
    // Demais jogadores de fundo ficam em posição de recepção/aproximação.
    return { ...p, x: slot.x, y: 14 };
  });
}

export function computeFormation(players: Player[], name: FormationName): Player[] {
  switch (name) {
    case 'base':
      return computeBase(players);
    case 'ataque':
      return computeAtaque(players);
    case 'defesa':
      return computeDefesa(players);
  }
}
