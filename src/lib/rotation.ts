import type { Player, RotationPosition } from '../types/volleyball';
import { POSITION_SLOTS } from './court';

/**
 * Sentido horário oficial: quem está em P2 assume o saque (P1), P1 vai para P6, P6 para P5,
 * P5 para P4, P4 para P3, P3 para P2. Ou seja, cada posição N move para N-1 (e P1 vai para P6).
 */
export function nextRotationPosition(position: RotationPosition): RotationPosition {
  return position === 1 ? 6 : ((position - 1) as RotationPosition);
}

export function rotateTeam(players: Player[]): Player[] {
  return players.map((player) => {
    const newPosition = nextRotationPosition(player.position);
    const slot = POSITION_SLOTS[newPosition];
    return {
      ...player,
      position: newPosition,
      x: slot.x,
      y: slot.y,
    };
  });
}
