import type { PlayerRole, RotationPosition } from './volleyball';

export interface RotationQuiz {
  /** Rotação 1 = escalação inicial; rotação N = após N-1 giros a partir da inicial. */
  rotationNumber: number;
  expectedPositions: Record<Exclude<PlayerRole, 'libero'>, RotationPosition>;
  instructions: string;
}

export type LessonVisual = 'default-court' | 'attack-coverage' | 'rotation-explorer' | 'preset-gallery';

export interface Lesson {
  id: string;
  title: string;
  paragraphs: string[];
  visual?: LessonVisual;
  quiz?: RotationQuiz;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}
