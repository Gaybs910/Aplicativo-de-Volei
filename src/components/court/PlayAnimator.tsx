import { useEffect, useRef, useState } from 'react';
import Court from './Court';
import type { PlayStep } from '../../data/presetPlays';

interface PlayAnimatorProps {
  steps: PlayStep[];
}

const STEP_DURATION_MS = 1400;

export default function PlayAnimator({ steps }: PlayAnimatorProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          setPlaying(false);
          return prev;
        }
        return next;
      });
    }, STEP_DURATION_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, steps.length]);

  const step = steps[index];
  const hasMultipleSteps = steps.length > 1;

  return (
    <div className="flex flex-col items-center gap-2">
      <Court players={step.players} ball={step.ball ?? null} />
      <p className="text-sm text-chalk/70">{step.label}</p>

      {hasMultipleSteps && (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPlaying(false);
                setIndex(i);
              }}
              aria-label={`Passo ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? 'bg-ball-blue' : 'bg-arena-600 hover:bg-arena-500'
              }`}
            />
          ))}
          <button
            onClick={() => {
              if (index >= steps.length - 1) setIndex(0);
              setPlaying((p) => !p);
            }}
            className="btn-ghost-active ml-1 px-2.5 py-1 text-xs"
          >
            {playing ? '⏸ Pausar' : '▶ Animar jogada'}
          </button>
        </div>
      )}
    </div>
  );
}
