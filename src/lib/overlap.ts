import type { Player, RotationPosition } from '../types/volleyball';

export interface OverlapViolation {
  a: Player;
  b: Player;
  rule: 'front-back' | 'left-right';
}

/** Regra FIVB 7.4/7.5: cada jogador de rede deve estar mais perto da rede que seu correspondente de fundo. */
const FRONT_BACK_PAIRS: [RotationPosition, RotationPosition][] = [
  [4, 5],
  [3, 6],
  [2, 1],
];

/** Cada jogador deve estar na ordem lateral correta em relação ao vizinho imediato da mesma linha. */
const LEFT_RIGHT_PAIRS: [RotationPosition, RotationPosition][] = [
  [4, 3],
  [3, 2],
  [5, 6],
  [6, 1],
];

export function checkOverlap(players: Player[]): OverlapViolation[] {
  const byPosition = new Map<RotationPosition, Player>(players.map((p) => [p.position, p]));
  const violations: OverlapViolation[] = [];

  for (const [frontPos, backPos] of FRONT_BACK_PAIRS) {
    const front = byPosition.get(frontPos);
    const back = byPosition.get(backPos);
    // y menor = mais perto da rede no próprio lado da quadra.
    if (front && back && front.y >= back.y) {
      violations.push({ a: front, b: back, rule: 'front-back' });
    }
  }

  for (const [leftPos, rightPos] of LEFT_RIGHT_PAIRS) {
    const left = byPosition.get(leftPos);
    const right = byPosition.get(rightPos);
    if (left && right && left.x >= right.x) {
      violations.push({ a: left, b: right, rule: 'left-right' });
    }
  }

  return violations;
}
