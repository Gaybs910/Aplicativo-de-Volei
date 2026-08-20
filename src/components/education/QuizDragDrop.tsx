import { useState } from 'react';
import Court from '../court/Court';
import { buildDefaultLineup, POSITION_SLOTS } from '../../lib/court';
import type { RotationQuiz } from '../../types/education';
import type { Player, RotationPosition } from '../../types/volleyball';

const ALL_POSITIONS: RotationPosition[] = [1, 2, 3, 4, 5, 6];

function nearestSlot(x: number, y: number): RotationPosition {
  let best: RotationPosition = 1;
  let bestDist = Infinity;
  ALL_POSITIONS.forEach((position) => {
    const slot = POSITION_SLOTS[position];
    const dist = (slot.x - x) ** 2 + (slot.y - y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = position;
    }
  });
  return best;
}

function buildTargetPlayers(quiz: RotationQuiz): Player[] {
  return buildDefaultLineup().map((p) => {
    if (p.role === 'libero') return p;
    const position = quiz.expectedPositions[p.role];
    const slot = POSITION_SLOTS[position];
    return { ...p, position, x: slot.x, y: slot.y };
  });
}

interface QuizDragDropProps {
  quiz: RotationQuiz;
  onSuccess: () => void;
}

export default function QuizDragDrop({ quiz, onSuccess }: QuizDragDropProps) {
  const [players, setPlayers] = useState<Player[]>(() => buildDefaultLineup());
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const movePlayer = (id: string, x: number, y: number) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
    setResult('idle');
  };

  // Anima: volta para a escalação inicial e, em seguida, gira até a formação-alvo — a transição
  // suave do Court (CSS) faz o "giro" ficar visível em vez de só trocar de lugar instantaneamente.
  const playRotationAnimation = () => {
    setPlayers(buildDefaultLineup());
    window.setTimeout(() => setPlayers(buildTargetPlayers(quiz)), 600);
  };

  const verify = () => {
    const correct = players.every((p) => {
      if (p.role === 'libero') return true;
      const inferred = nearestSlot(p.x, p.y);
      return inferred === quiz.expectedPositions[p.role];
    });
    setResult(correct ? 'correct' : 'wrong');
    if (correct) {
      onSuccess();
      playRotationAnimation();
    }
  };

  return (
    <div
      className={`panel flex flex-col items-center gap-3 transition-shadow ${
        result === 'correct' ? 'border-court shadow-[0_0_24px_rgba(29,111,66,0.45)]' : ''
      }`}
    >
      <p className="text-sm text-chalk/70">{quiz.instructions}</p>
      <Court players={players} editable onPlayerMove={movePlayer} />
      <div className="flex gap-2">
        <button onClick={verify} className="btn-primary">
          Verificar
        </button>
        {result === 'correct' && (
          <button onClick={playRotationAnimation} className="btn-ghost">
            ▶ Ver animação da rotação de novo
          </button>
        )}
      </div>
      {result === 'correct' && (
        <p className="text-sm text-court">✓ Correto! Veja acima como cada jogador girou até a posição certa.</p>
      )}
      {result === 'wrong' && (
        <p className="text-sm text-danger">Ainda não está certo. Reveja a ordem P1–P6 e tente de novo.</p>
      )}
    </div>
  );
}
