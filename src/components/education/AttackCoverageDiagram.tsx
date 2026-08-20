import { COURT_LENGTH, COURT_WIDTH, NET_Y, OWN_ATTACK_LINE_Y } from '../../lib/court';
import { COLORS } from '../../lib/theme';

interface Dot {
  x: number;
  y: number;
  label: string;
  color: string;
}

const BLOCKERS: Dot[] = [
  { x: 1.1, y: 8, label: 'B', color: COLORS.danger },
  { x: 2.3, y: 8, label: 'B', color: COLORS.danger },
];

const ATTACKER: Dot = { x: 1.7, y: 10.2, label: 'AT', color: COLORS.ballBlue };

// Formação em "W": jogadores próximos cobrem rebotes curtos, os mais distantes cobrem bolas fortes.
const COVERAGE: Dot[] = [
  { x: 0.6, y: 11.6, label: '1', color: COLORS.scoreboard },
  { x: 2.9, y: 11.6, label: '2', color: COLORS.scoreboard },
  { x: 1.7, y: 12.6, label: '3', color: COLORS.scoreboard },
  { x: 0.5, y: 14, label: '4', color: COLORS.scoreboard },
  { x: 3.6, y: 13.5, label: '5', color: COLORS.scoreboard },
];

export default function AttackCoverageDiagram() {
  return (
    <div className="panel flex flex-col items-center gap-3">
      <div className="w-full max-w-sm rounded-lg border border-arena-700 bg-wood-grain p-2 shadow-court">
        <svg
          viewBox={`0 0 ${COURT_WIDTH} ${COURT_LENGTH / 2 + 3}`}
          className="w-full rounded-lg"
          style={{ background: COLORS.courtGreen }}
        >
          <rect
            x={0}
            y={5}
            width={COURT_WIDTH}
            height={COURT_LENGTH / 2 + 3 - 5}
            fill="none"
            stroke={COLORS.chalk}
            strokeWidth={0.08}
          />
          <line x1={0} y1={NET_Y} x2={COURT_WIDTH} y2={NET_Y} stroke={COLORS.chalk} strokeWidth={0.15} />
          <line
            x1={0}
            y1={OWN_ATTACK_LINE_Y}
            x2={COURT_WIDTH}
            y2={OWN_ATTACK_LINE_Y}
            stroke={COLORS.chalk}
            strokeWidth={0.05}
            strokeDasharray="0.15 0.15"
          />

          {/* Linhas tracejadas do "W" conectando a cobertura ao atacante */}
          {COVERAGE.map((c, i) => (
            <line
              key={`w-${i}`}
              x1={ATTACKER.x}
              y1={ATTACKER.y}
              x2={c.x}
              y2={c.y}
              stroke={COLORS.chalk}
              strokeWidth={0.03}
              strokeDasharray="0.08 0.12"
              opacity={0.5}
            />
          ))}

          <defs>
            <marker id="reboundArrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill={COLORS.ballYellow} />
            </marker>
          </defs>
          {/* Bola bloqueada voltando para o próprio campo */}
          <line
            x1={1.7}
            y1={8}
            x2={1.7}
            y2={11}
            stroke={COLORS.ballYellow}
            strokeWidth={0.08}
            markerEnd="url(#reboundArrow)"
          />

          {BLOCKERS.map((b, i) => (
            <g key={`block-${i}`} transform={`translate(${b.x} ${b.y})`}>
              <circle r={0.45} fill={b.color} stroke={COLORS.ink} strokeWidth={0.05} />
              <text y={0.02} textAnchor="middle" dominantBaseline="middle" fontSize={0.35} fontWeight={700} fill={COLORS.ink}>
                {b.label}
              </text>
            </g>
          ))}

          <g transform={`translate(${ATTACKER.x} ${ATTACKER.y})`}>
            <circle r={0.5} fill={ATTACKER.color} stroke={COLORS.ink} strokeWidth={0.06} />
            <text y={0.02} textAnchor="middle" dominantBaseline="middle" fontSize={0.35} fontWeight={700} fill={COLORS.ink}>
              {ATTACKER.label}
            </text>
          </g>

          {COVERAGE.map((c, i) => (
            <g key={`cov-${i}`} transform={`translate(${c.x} ${c.y})`}>
              <circle r={0.45} fill={c.color} stroke={COLORS.ink} strokeWidth={0.05} />
              <text y={0.02} textAnchor="middle" dominantBaseline="middle" fontSize={0.32} fontWeight={700} fill={COLORS.ink}>
                {c.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="max-w-sm text-center text-xs text-chalk/60">
        <span className="text-danger">B</span> = bloqueio adversário · <span className="text-ball-blue">AT</span> = atacante ·{' '}
        <span className="text-scoreboard">1–5</span> = jogadores cobrindo em formato de "W" ao redor do ataque, prontos
        para recuperar a bola caso o bloqueio a devolva.
      </p>
    </div>
  );
}
