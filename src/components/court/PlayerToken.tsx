import type { Player } from '../../types/volleyball';
import { COLORS } from '../../lib/theme';

interface PlayerTokenProps {
  player: Player;
  invalid?: boolean;
  highlighted?: boolean;
  animate?: boolean;
  onPointerDown?: (event: React.PointerEvent<SVGGElement>) => void;
}

const ROLE_SHORT: Record<Player['role'], string> = {
  levantador: 'L',
  oposto: 'OP',
  ponteiro1: 'P1',
  ponteiro2: 'P2',
  central1: 'C1',
  central2: 'C2',
  libero: 'LIB',
};

export default function PlayerToken({ player, invalid, highlighted, animate = true, onPointerDown }: PlayerTokenProps) {
  const fill = player.role === 'libero' ? COLORS.scoreboard : invalid ? COLORS.danger : COLORS.ballBlue;

  return (
    <g
      data-player-id={player.id}
      transform={`translate(${player.x} ${player.y})`}
      onPointerDown={onPointerDown}
      style={{
        cursor: onPointerDown ? 'grab' : 'default',
        transition: animate ? 'transform 0.5s ease' : 'none',
      }}
    >
      {highlighted && (
        <circle r={0.78} fill="none" stroke={COLORS.ballYellow} strokeWidth={0.08}>
          <animate attributeName="r" values="0.7;0.85;0.7" dur="1.4s" repeatCount="indefinite" />
        </circle>
      )}
      <ellipse cx={0} cy={0.62} rx={0.42} ry={0.12} fill="#000" opacity={0.35} />
      <circle r={0.55} fill={fill} stroke={COLORS.ink} strokeWidth={0.06} />
      <circle r={0.55} fill="none" stroke="#ffffff" strokeOpacity={0.25} strokeWidth={0.05} />
      <text
        y={0.03}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={0.42}
        fontWeight={700}
        fill={COLORS.ink}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {player.position}
      </text>
      <text
        y={0.95}
        textAnchor="middle"
        fontSize={0.32}
        fontWeight={600}
        fill={COLORS.chalk}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {ROLE_SHORT[player.role]}
      </text>
    </g>
  );
}
