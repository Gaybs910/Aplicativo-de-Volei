import type { Player, PlayerRole, RotationPosition } from '../types/volleyball';

/** Quadra completa: 9m de largura x 18m de comprimento (9m por lado), rede no meio. */
export const COURT_WIDTH = 9;
export const COURT_LENGTH = 18;
export const NET_Y = COURT_LENGTH / 2;
export const ATTACK_LINE_OFFSET = 3;
export const OWN_ATTACK_LINE_Y = NET_Y + ATTACK_LINE_OFFSET;
export const OWN_BASELINE_Y = COURT_LENGTH;

/** Centro de cada zona (1-6) no próprio lado da quadra, usado como posição padrão e ao "encaixar" no rodízio. */
export const POSITION_SLOTS: Record<RotationPosition, { x: number; y: number }> = {
  4: { x: 1.5, y: 10.5 },
  3: { x: 4.5, y: 10.5 },
  2: { x: 7.5, y: 10.5 },
  5: { x: 1.5, y: 15 },
  6: { x: 4.5, y: 15 },
  1: { x: 7.5, y: 15 },
};

export const BACK_ROW_POSITIONS: RotationPosition[] = [1, 6, 5];
export const FRONT_ROW_POSITIONS: RotationPosition[] = [2, 3, 4];

export function clampToOwnCourt(x: number, y: number) {
  return {
    x: Math.min(Math.max(x, 0.3), COURT_WIDTH - 0.3),
    y: Math.min(Math.max(y, NET_Y + 0.3), OWN_BASELINE_Y - 0.3),
  };
}

/**
 * Escalação padrão (sistema 5x1): a ordem ao redor das posições 1-6 alterna os pares de função
 * opostos entre si por 3 posições (levantador/oposto, ponteiro1/ponteiro2, central1/central2),
 * como em qualquer rotação válida de vôlei.
 */
const DEFAULT_ROLE_BY_POSITION: Record<RotationPosition, PlayerRole> = {
  1: 'levantador',
  2: 'ponteiro1',
  3: 'central1',
  4: 'oposto',
  5: 'ponteiro2',
  6: 'central2',
};

const ALL_POSITIONS: RotationPosition[] = [1, 2, 3, 4, 5, 6];

export function buildDefaultLineup(): Player[] {
  return ALL_POSITIONS.map((position) => {
    const slot = POSITION_SLOTS[position];
    return {
      id: `player-${position}`,
      role: DEFAULT_ROLE_BY_POSITION[position],
      position,
      x: slot.x,
      y: slot.y,
    };
  });
}
