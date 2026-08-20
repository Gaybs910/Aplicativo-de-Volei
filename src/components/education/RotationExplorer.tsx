import { useEffect, useRef, useState } from 'react';
import Court from '../court/Court';
import { BACK_ROW_POSITIONS, buildDefaultLineup } from '../../lib/court';
import { rotateTeam } from '../../lib/rotation';
import type { Player } from '../../types/volleyball';

const ROTATIONS: Player[][] = (() => {
  const sequence: Player[][] = [buildDefaultLineup()];
  for (let i = 1; i < 6; i += 1) {
    sequence.push(rotateTeam(sequence[i - 1]));
  }
  return sequence;
})();

export default function RotationExplorer() {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setRotationIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= ROTATIONS.length) {
          setPlaying(false);
          return prev;
        }
        return nextIndex;
      });
    }, 1400);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  const players = ROTATIONS[rotationIndex];
  const levantador = players.find((p) => p.role === 'levantador');
  const isBackRow = levantador ? BACK_ROW_POSITIONS.includes(levantador.position) : false;

  return (
    <div className="panel flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {ROTATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setRotationIndex(i);
            }}
            className={`h-9 w-9 rounded-md text-sm font-medium ${
              i === rotationIndex ? 'bg-ball-blue text-chalk' : 'bg-arena-700 text-chalk/70 hover:bg-arena-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => {
            if (rotationIndex >= ROTATIONS.length - 1) setRotationIndex(0);
            setPlaying((p) => !p);
          }}
          className="btn-ghost-active py-1.5"
        >
          {playing ? '⏸ Pausar' : '▶ Animar sequência'}
        </button>
      </div>

      <Court players={players} highlightedPlayerIds={levantador ? new Set([levantador.id]) : undefined} />

      <p className="text-sm text-chalk/70">
        Rotação {rotationIndex + 1} —{' '}
        <span className={isBackRow ? 'text-court' : 'text-scoreboard'}>
          levantador {isBackRow ? 'de fundo (3 opções de ataque)' : 'de rede (2 opções de ataque)'}
        </span>
      </p>
    </div>
  );
}
