import { useRef, useState } from 'react';
import type { Arrow, Player } from '../../types/volleyball';
import { COURT_LENGTH, COURT_WIDTH, NET_Y, OWN_ATTACK_LINE_Y } from '../../lib/court';
import { COLORS } from '../../lib/theme';
import PlayerToken from './PlayerToken';

interface ViolationLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface CourtProps {
  players: Player[];
  arrows?: Arrow[];
  invalidPlayerIds?: Set<string>;
  highlightedPlayerIds?: Set<string>;
  violationLines?: ViolationLine[];
  ball?: { x: number; y: number } | null;
  editable?: boolean;
  drawMode?: boolean;
  onPlayerMove?: (id: string, x: number, y: number) => void;
  onArrowComplete?: (arrow: { start: { x: number; y: number }; end: { x: number; y: number } }) => void;
}

function toSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const transformed = pt.matrixTransform(ctm.inverse());
  return { x: transformed.x, y: transformed.y };
}

export default function Court({
  players,
  arrows = [],
  invalidPlayerIds,
  highlightedPlayerIds,
  violationLines = [],
  ball = null,
  editable = false,
  drawMode = false,
  onPlayerMove,
  onArrowComplete,
}: CourtProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [tempArrow, setTempArrow] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(
    null,
  );

  const handlePlayerPointerDown = (id: string) => (event: React.PointerEvent<SVGGElement>) => {
    if (!editable) return;
    event.stopPropagation();
    (event.target as Element).setPointerCapture(event.pointerId);
    setDraggingId(id);
  };

  const handleBackgroundPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!drawMode || !svgRef.current) return;
    const point = toSvgPoint(svgRef.current, event.clientX, event.clientY);
    setTempArrow({ start: point, end: point });
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const point = toSvgPoint(svgRef.current, event.clientX, event.clientY);

    if (draggingId && onPlayerMove) {
      onPlayerMove(draggingId, point.x, point.y);
      return;
    }

    if (tempArrow) {
      setTempArrow({ start: tempArrow.start, end: point });
    }
  };

  const handlePointerUp = () => {
    if (draggingId) {
      setDraggingId(null);
      return;
    }
    if (tempArrow) {
      onArrowComplete?.(tempArrow);
      setTempArrow(null);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-arena-700 bg-wood-grain p-2 shadow-court">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${COURT_WIDTH} ${COURT_LENGTH}`}
        className="w-full touch-none select-none rounded-lg"
        style={{ background: COLORS.courtGreen }}
        onPointerDown={handleBackgroundPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Contorno da quadra completa */}
        <rect
          x={0}
          y={0}
          width={COURT_WIDTH}
          height={COURT_LENGTH}
          fill="none"
          stroke={COLORS.chalk}
          strokeWidth={0.08}
        />
        {/* Rede */}
        <line x1={0} y1={NET_Y} x2={COURT_WIDTH} y2={NET_Y} stroke={COLORS.chalk} strokeWidth={0.15} />
        {/* Linha de ataque do próprio lado (3m da rede) */}
        <line
          x1={0}
          y1={OWN_ATTACK_LINE_Y}
          x2={COURT_WIDTH}
          y2={OWN_ATTACK_LINE_Y}
          stroke={COLORS.chalk}
          strokeWidth={0.05}
          strokeDasharray="0.15 0.15"
        />
        {/* Linha de ataque do lado adversário, só para referência visual */}
        <line
          x1={0}
          y1={NET_Y - (OWN_ATTACK_LINE_Y - NET_Y)}
          x2={COURT_WIDTH}
          y2={NET_Y - (OWN_ATTACK_LINE_Y - NET_Y)}
          stroke={COLORS.chalk}
          strokeWidth={0.05}
          strokeDasharray="0.15 0.15"
          opacity={0.5}
        />

        <defs>
          <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill={COLORS.ballYellow} />
          </marker>
        </defs>

        {arrows.map((arrow) => (
          <line
            key={arrow.id}
            x1={arrow.start.x}
            y1={arrow.start.y}
            x2={arrow.end.x}
            y2={arrow.end.y}
            stroke={arrow.color}
            strokeWidth={0.08}
            markerEnd="url(#arrowhead)"
          />
        ))}

        {violationLines.map((line, i) => (
          <line
            key={`violation-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={COLORS.danger}
            strokeWidth={0.06}
            strokeDasharray="0.12 0.1"
          />
        ))}

        {tempArrow && (
          <line
            x1={tempArrow.start.x}
            y1={tempArrow.start.y}
            x2={tempArrow.end.x}
            y2={tempArrow.end.y}
            stroke={COLORS.ballYellow}
            strokeWidth={0.06}
            strokeDasharray="0.1 0.1"
          />
        )}

        {players.map((player) => (
          <PlayerToken
            key={player.id}
            player={player}
            invalid={invalidPlayerIds?.has(player.id)}
            highlighted={highlightedPlayerIds?.has(player.id)}
            animate={player.id !== draggingId}
            onPointerDown={editable ? handlePlayerPointerDown(player.id) : undefined}
          />
        ))}

        {ball && (
          <g
            transform={`translate(${ball.x} ${ball.y})`}
            style={{ transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)' }}
          >
            <circle r={0.3} fill={COLORS.chalk} stroke={COLORS.ballBlue} strokeWidth={0.06} />
            <path
              d="M -0.2,-0.12 A 0.3 0.3 0 0 1 0.2,-0.12"
              fill="none"
              stroke={COLORS.ballYellow}
              strokeWidth={0.05}
            />
            <path
              d="M -0.2,0.12 A 0.3 0.3 0 0 0 0.2,0.12"
              fill="none"
              stroke={COLORS.ballBlue}
              strokeWidth={0.05}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
