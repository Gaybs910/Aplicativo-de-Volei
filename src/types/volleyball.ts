export type RotationPosition = 1 | 2 | 3 | 4 | 5 | 6;

export type PlayerRole =
  | 'levantador'
  | 'oposto'
  | 'ponteiro1'
  | 'ponteiro2'
  | 'central1'
  | 'central2'
  | 'libero';

export const ROLE_LABELS: Record<PlayerRole, string> = {
  levantador: 'Levantador',
  oposto: 'Oposto',
  ponteiro1: 'Ponteiro 1',
  ponteiro2: 'Ponteiro 2',
  central1: 'Central 1',
  central2: 'Central 2',
  libero: 'Líbero',
};

export interface Player {
  id: string;
  role: PlayerRole;
  position: RotationPosition;
  /** Coordenadas em metros. Origem no canto da linha de fundo/lateral esquerda do próprio lado da quadra. */
  x: number;
  y: number;
}

export interface ArrowPoint {
  x: number;
  y: number;
}

export interface Arrow {
  id: string;
  start: ArrowPoint;
  end: ArrowPoint;
  color: string;
}

export interface TacticalSystem {
  id: string;
  name: string;
  players: Player[];
  arrows: Arrow[];
  liberoActive: boolean;
  createdAt: string;
}
