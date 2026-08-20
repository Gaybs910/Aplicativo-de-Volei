import { useMemo } from 'react';
import Court from '../court/Court';
import SaveLoadPanel from './SaveLoadPanel';
import { useTacticalStore } from '../../store/useTacticalStore';
import { checkOverlap } from '../../lib/overlap';
import { ROLE_LABELS } from '../../types/volleyball';
import { COLORS } from '../../lib/theme';
import { FORMATION_LABELS, type FormationName } from '../../lib/formations';

const FORMATIONS: FormationName[] = ['base', 'ataque', 'defesa'];

export default function TacticalBoard() {
  const players = useTacticalStore((s) => s.players);
  const arrows = useTacticalStore((s) => s.arrows);
  const drawMode = useTacticalStore((s) => s.drawMode);
  const benchedForLibero = useTacticalStore((s) => s.benchedForLibero);
  const activeFormation = useTacticalStore((s) => s.activeFormation);
  const overlapEnabled = useTacticalStore((s) => s.overlapEnabled);
  const movePlayer = useTacticalStore((s) => s.movePlayer);
  const rotate = useTacticalStore((s) => s.rotate);
  const toggleLibero = useTacticalStore((s) => s.toggleLibero);
  const setDrawMode = useTacticalStore((s) => s.setDrawMode);
  const addArrow = useTacticalStore((s) => s.addArrow);
  const clearArrows = useTacticalStore((s) => s.clearArrows);
  const applyArrows = useTacticalStore((s) => s.applyArrows);
  const setFormation = useTacticalStore((s) => s.setFormation);
  const resetToDefault = useTacticalStore((s) => s.resetToDefault);

  // Na formação de Ataque o levantador e o oposto saem de propósito da ordem de rodízio
  // (levantador sempre na rede, oposto de fundo sobe pro pipe), então overlap não se aplica —
  // e continua desligado mesmo depois de arrastar/rotacionar/aplicar setas, até voltar pra Base/Defesa.
  const overlapSuppressed = !overlapEnabled;
  const violations = useMemo(
    () => (overlapSuppressed ? [] : checkOverlap(players)),
    [players, overlapSuppressed],
  );
  const invalidPlayerIds = useMemo(() => {
    const set = new Set<string>();
    violations.forEach((v) => {
      set.add(v.a.id);
      set.add(v.b.id);
    });
    return set;
  }, [violations]);
  const violationLines = useMemo(
    () => violations.map((v) => ({ x1: v.a.x, y1: v.a.y, x2: v.b.x, y2: v.b.y })),
    [violations],
  );

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="eyebrow">Prancheta</p>
        <h1 className="text-3xl font-bold">Prancheta Tática</h1>
        <p className="mt-1 text-chalk/60">Arraste os jogadores, gire a formação e valide a regra de overlap.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,540px)_1fr]">
        <div className="flex flex-col items-center gap-3">
          <Court
            players={players}
            arrows={arrows}
            invalidPlayerIds={invalidPlayerIds}
            violationLines={violationLines}
            editable
            drawMode={drawMode}
            onPlayerMove={movePlayer}
            onArrowComplete={(arrow) => addArrow({ ...arrow, color: COLORS.ballYellow })}
          />
          <p className="text-xs text-chalk/50">
            Arraste os jogadores para reposicionar. {drawMode && 'Clique e arraste na quadra para desenhar uma seta.'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={rotate} className="btn-primary">
              Rotacionar (horário)
            </button>
            <button onClick={toggleLibero} className="btn-accent">
              {benchedForLibero ? 'Remover líbero' : 'Ativar líbero'}
            </button>
            <button onClick={() => setDrawMode(!drawMode)} className={drawMode ? 'btn-ghost-active' : 'btn-ghost'}>
              {drawMode ? 'Desenhando setas' : 'Desenhar setas'}
            </button>
            <button onClick={clearArrows} className="btn-ghost">
              Limpar setas
            </button>
            <button
              onClick={applyArrows}
              disabled={arrows.length === 0}
              className="btn-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Aplicar setas
            </button>
            <button onClick={resetToDefault} className="btn-ghost">
              Resetar
            </button>
          </div>

          <div className="panel">
            <h3 className="panel-title">Formação</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {FORMATIONS.map((name) => (
                <button
                  key={name}
                  onClick={() => setFormation(name)}
                  className={activeFormation === name ? 'btn-ghost-active' : 'btn-ghost'}
                >
                  {FORMATION_LABELS[name]}
                </button>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3 className="panel-title">Overlap (regra FIVB)</h3>
            <p className="mb-2 mt-1 text-xs text-chalk/50">
              Válido só no instante do saque — ao montar jogadas de bola em jogo (cobertura, combinações), pode ignorar.
            </p>
            {overlapSuppressed ? (
              <p className="text-sm text-chalk/50">
                Não avaliado na formação de Ataque — os jogadores saem da ordem de rodízio de propósito.
              </p>
            ) : violations.length === 0 ? (
              <p className="text-sm text-court">Nenhuma infração de posicionamento.</p>
            ) : (
              <ul className="flex flex-col gap-1 text-sm text-danger">
                {violations.map((v, i) => (
                  <li key={i}>
                    {ROLE_LABELS[v.a.role]} (P{v.a.position}) está{' '}
                    {v.rule === 'front-back' ? 'atrás demais em relação a' : 'à direita demais em relação a'}{' '}
                    {ROLE_LABELS[v.b.role]} (P{v.b.position})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel">
            <h3 className="panel-title">Escalação atual</h3>
            <ul className="mt-2 grid grid-cols-2 gap-1 text-sm text-chalk/80">
              {players.map((p) => (
                <li key={p.id}>
                  P{p.position} — {ROLE_LABELS[p.role]}
                </li>
              ))}
            </ul>
          </div>

          <SaveLoadPanel />
        </div>
      </div>
    </div>
  );
}
