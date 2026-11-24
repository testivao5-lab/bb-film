// BATCH D kit · interior shells + furniture, drawn in METRES inside a <Card>.
// Seat heights, door widths and ceiling heights follow real-world scale (chair 0.46 m seat,
// door 2.0 m, ceiling 2.7 m). Every room is composed from these parts so lighting stays consistent.
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1 } from "../lib/anim";

const OL = "#100e0c";

/* ───────────────────────────── basic geometry: a box in the room ───────────────────────────── */

export const Box: React.FC<{ x: number; z: number; w: number; h: number; d?: number; color: string; top?: string; side?: string; olw?: number }> = ({ x, z, w, h, d = 0.6, color, top, side, olw = 0.012 }) => (
  <g>
    <rect x={x - w / 2} y={-h} width={w} height={h} fill={color} stroke={OL} strokeWidth={olw} />
    {side && <rect x={x + w * 0.18} y={-h} width={w * 0.32} height={h} fill={side} opacity={0.55} />}
    {top && <rect x={x - w / 2} y={-h} width={w} height={0.035} fill={top} />}
    <ellipse cx={x} cy={0} rx={w * 0.62} ry={d * 0.16} fill="#000" opacity={0.22} />
  </g>
);

/* ───────────────────────────── chair (seat 0.46 m, back 1.0 m) ───────────────────────────── */

export const Chair: React.FC<{ x?: number; seat?: string; frame?: string; facing?: 1 | -1; back?: boolean }> = ({ x = 0, seat = "#5a4a3a", frame = "#3a3630", facing = 1, back = true }) => {
  const sh = 0.46;
  return (
    <g transform={`translate(${x},0) scale(${facing},1)`}>
      <ellipse cx={0} cy={0} rx={0.3} ry={0.06} fill="#000" opacity={0.3} />
      {[-0.17, 0.17].map((lx) => (
        <rect key={lx} x={lx - 0.018} y={-sh} width={0.036} height={sh} fill={frame} stroke={OL} strokeWidth={0.006} />
      ))}
      <rect x={-0.24} y={-sh - 0.05} width={0.48} height={0.055} rx={0.012} fill={seat} stroke={OL} strokeWidth={0.008} />
      {back && (
        <g>
          <rect x={-0.24} y={-sh - 0.05} width={0.045} height={0.55} fill={frame} stroke={OL} strokeWidth={0.006} transform="translate(0.0,0)" />
          {/* backrest leans slightly back */}
          <g transform={`rotate(${-8 * facing} 0 ${-sh})`}>
            <rect x={-0.24} y={-1.02} width={0.48} height={0.22} rx={0.03} fill={seat} stroke={OL} strokeWidth={0.008} />
            <rect x={-0.2} y={-0.99} width={0.4} height={0.07} rx={0.02} fill="#fff" opacity={0.08} />
          </g>
          <rect x={-0.21} y={-sh} width={0.03} height={0.52} fill={frame} />
          <rect x={0.18} y={-sh} width={0.03} height={0.52} fill={frame} />
        </g>
      )}
    </g>
  );
};

/* ───────────────────────────── table (0.75 m) ───────────────────────────── */

export const Table: React.FC<{ x?: number; y?: number; w?: number; h?: number; top?: string; leg?: string; shape?: "rect" | "round" }> = ({ x = 0, y = 0, w = 1.4, h = 0.74, top = "#7a5a3c", leg = "#4a3a2a", shape = "rect" }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx={0} cy={0} rx={w * 0.6} ry={0.1} fill="#000" opacity={0.24} />
    {shape === "rect" ? (
      <g>
        {[-w * 0.42, w * 0.42].map((lx) => (
          <rect key={lx} x={lx - 0.03} y={-h} width={0.06} height={h} fill={leg} stroke={OL} strokeWidth={0.006} />
        ))}
        {[0.24].map((o) => (
          <g key={o}>
            <rect x={-w * 0.42} y={-h + 0.05} width={0.05} height={0.05} fill={leg} opacity={0.8} />
            <rect x={w * 0.37} y={-h + 0.05} width={0.05} height={0.05} fill={leg} opacity={0.8} />
          </g>
        ))}
        <rect x={-w / 2} y={-h - 0.045} width={w} height={0.05} rx={0.008} fill={top} stroke={OL} strokeWidth={0.008} />
        <rect x={-w / 2 + 0.02} y={-h - 0.042} width={w - 0.04} height={0.012} fill="#fff" opacity={0.12} />
      </g>
    ) : (
      <g>
        <rect x={-0.04} y={-h} width={0.08} height={h} fill={leg} />
        <rect x={-0.16} y={-0.04} width={0.32} height={0.04} rx={0.02} fill={leg} />
        <ellipse cx={0} cy={-h} rx={w / 2} ry={w * 0.16} fill={top} stroke={OL} strokeWidth={0.008} />
        <ellipse cx={-w * 0.1} cy={-h - 0.004} rx={w * 0.3} ry={w * 0.07} fill="#fff" opacity={0.12} />
      </g>
    )}
  </g>
);

/* ───────────────────────────── door (2.0 m) in a wall ───────────────────────────── */

export const DoorInWall: React.FC<{
  x: number; w?: number; h?: number; open?: number; wall: string; frame?: string; into?: string; latch?: number;
}> = ({ x, w = 0.92, h = 2.0, open = 0, wall, frame = "#8a7a68", into = "#1a1a20" }) => (
  <g transform={`translate(${x},0)`}>
    {/* opening + the room beyond */}
    <rect x={-w / 2} y={-h} width={w} height={h} fill={into} />
    {/* door leaf hinged left, swinging away */}
    <g transform={`translate(${-w / 2},0)`}>
      <g transform={`skewY(${-open * 18})`}>
        <rect x={0} y={-h + 0.01} width={w * (1 - open * 0.8)} height={h - 0.02} fill={open > 0.1 ? into : "#6a5642"} stroke={OL} strokeWidth={0.01} />
        <circle cx={w * 0.86 * (1 - open * 0.8)} cy={-1.0} r={0.035} fill="#c9b98a" stroke={OL} strokeWidth={0.006} />
      </g>
    </g>
    {/* casing */}
    <rect x={-w / 2 - 0.07} y={-h - 0.07} width={0.07} height={h + 0.07} fill={frame} stroke={OL} strokeWidth={0.008} />
    <rect x={w / 2} y={-h - 0.07} width={0.07} height={h + 0.07} fill={frame} stroke={OL} strokeWidth={0.008} />
    <rect x={-w / 2 - 0.07} y={-h - 0.07} width={w + 0.14} height={0.07} fill={frame} stroke={OL} strokeWidth={0.008} />
  </g>
);

/* ───────────────────────────── window (blinds + night glass) ───────────────────────────── */

export const Window: React.FC<{
  x: number; y?: number; w?: number; h?: number; f?: number; blind?: number; tone?: "night" | "day" | "dusk"; glow?: number;
}> = ({ x, y = -2.1, w = 1.3, h = 1.2, f = 0, blind = 0.3, tone = "night", glow = 1 }) => (
  <g transform={`translate(${x},0)`}>
    <rect x={-w / 2} y={y} width={w} height={h} fill={tone === "night" ? "#0c1524" : tone === "dusk" ? "#8a5460" : "#a8cbe6"} />
    {tone === "night" && Array.from({ length: 3 }).map((_, i) => <circle key={i} cx={-w / 2 + rand(i, 3) * w} cy={y + rand(i, 4) * h * 0.6} r={1.2} fill="#dfe9ff" opacity={0.6} />)}
    {tone === "night" && <g opacity={0.9}><circle cx={w * 0.26} cy={y + h * 0.24} r={16} fill="#e8eeff" opacity={0.8} /><circle cx={w * 0.26} cy={y + h * 0.24} r={34} fill="url(#dCoolGlow)" /></g>}
    {tone === "dusk" && <ellipse cx={0} cy={y + h * 0.9} rx={w * 0.7} ry={h * 0.3} fill="#e0785a" opacity={0.5} />}
    {/* blinds partly down */}
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={-w / 2 + 0.02} y={y + 0.04 + i * 0.075} width={w - 0.04} height={0.05} fill="#e6dccb" opacity={i / 8 < blind ? 0.95 : 0} />
    ))}
    {/* frame + glazing bars */}
    <rect x={-w / 2} y={y} width={w} height={h} fill="none" stroke="#e8e0d0" strokeWidth={0.07} />
    <rect x={-0.03} y={y} width={0.06} height={h} fill="#e8e0d0" />
    <rect x={-w / 2} y={y + h / 2} width={w} height={0.05} fill="#e8e0d0" />
    {glow > 0 && <ellipse cx={0} cy={y + h * 0.5} rx={w * 0.9} ry={h * 0.7} fill="url(#dCoolGlow)" opacity={0.25 * glow} />}
  </g>
);

/* ───────────────────────────── lamps ───────────────────────────── */

export const LampPendant: React.FC<{ x: number; y?: number; drop?: number; on?: number; shade?: string; color?: string }> = ({ x, y = -2.7, drop = 0.7, on = 1, shade = "#3a4a3a", color = "#ffe2a8" }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-0.008} y={0} width={0.016} height={drop} fill="#2a2a2e" />
    <path d={`M${-0.22},${drop} L${0.22},${drop} L${0.16},${drop + 0.2} L${-0.16},${drop + 0.2} Z`} fill={shade} stroke={OL} strokeWidth={0.008} />
    {on > 0 && <g><ellipse cx={0} cy={drop + 0.2} rx={0.15} ry={0.03} fill={color} opacity={0.95 * on} /><ellipse cx={0} cy={drop + 0.62} rx={0.9} ry={0.7} fill="url(#dLampGlow)" opacity={on} /></g>}
  </g>
);

export const LampFloor: React.FC<{ x: number; on?: number; h?: number; shade?: string; color?: string }> = ({ x, on = 1, h = 1.62, shade = "#e8dcc4", color = "#ffe2a8" }) => (
  <g transform={`translate(${x},0)`}>
    <ellipse cx={0} cy={0} rx={0.2} ry={0.05} fill="#2a2622" />
    <rect x={-0.018} y={-h} width={0.036} height={h} fill="#3a3632" />
    <path d={`M${-0.2},${-h - 0.03} L${0.2},${-h - 0.03} L${0.14},${-h + 0.24} L${-0.14},${-h + 0.24} Z`} fill={shade} stroke={OL} strokeWidth={0.008} />
    {on > 0 && <g><ellipse cx={0} cy={-h} rx={0.12} ry={0.03} fill={color} opacity={0.9} /><ellipse cx={0} cy={-h + 0.1} rx={0.8} ry={0.9} fill="url(#dLampGlow)" opacity={on} /></g>}
  </g>
);

/* ───────────────────────────── sofa ───────────────────────────── */

export const Sofa: React.FC<{ x?: number; w?: number; color?: string; shade?: string; side?: 1 | -1 }> = ({ x = 0, w = 1.9, color = "#6a5a4a", shade = "#4a3e32", side = 1 }) => (
  <g transform={`translate(${x},0)`}>
    <ellipse cx={0} cy={0} rx={w * 0.55} ry={0.1} fill="#000" opacity={0.24} />
    <rect x={-w / 2} y={-0.44} width={w} height={0.44} fill={shade} stroke={OL} strokeWidth={0.01} />
    <rect x={-w / 2} y={-0.82} width={w} height={0.42} rx={0.06} fill={color} stroke={OL} strokeWidth={0.01} />
    <path d={`M${-w / 2 + 0.06},${-0.78} Q0,${-0.86} ${w / 2 - 0.06},${-0.78}`} stroke="#fff" strokeWidth={0.01} opacity={0.12} fill="none" />
    <rect x={-w / 2 + 0.05 * side} y={-1.12} width={0.18} height={0.72} rx={0.05} fill={color} stroke={OL} strokeWidth={0.01} />
    <rect x={w / 2 - 0.18 - 0.05 * side} y={-1.12} width={0.18} height={0.72} rx={0.05} fill={shade} stroke={OL} strokeWidth={0.01} />
    <rect x={-w * 0.3} y={-0.6} width={w * 0.24} height={0.22} rx={0.05} fill={shade} opacity={0.6} />
  </g>
);

/* ───────────────────────────── bookshelf / shelf of films ───────────────────────────── */

export const Shelf: React.FC<{ x: number; w?: number; h?: number; y?: number; wood?: string; rows?: number; seed?: number; books?: boolean }> = ({ x, w = 1.2, h = 1.7, y = 0, wood = "#5a4230", rows = 4, seed = 4, books = true }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} fill={wood} stroke={OL} strokeWidth={0.012} />
    <rect x={-w / 2 + 0.04} y={-h + 0.04} width={w - 0.08} height={h - 0.08} fill="#2a2018" />
    {Array.from({ length: rows }).map((_, r) => (
      <g key={r}>
        <rect x={-w / 2 + 0.02} y={-h + 0.06 + (r + 1) * ((h - 0.1) / rows)} width={w - 0.04} height={0.03} fill={wood} />
        {books && Array.from({ length: Math.floor(w / 0.07) }).map((_, b) => {
          const bh = 0.16 + rand(r * 31 + b, seed) * 0.06;
          const c = ["#7a3a30", "#3a5a6a", "#6a5a2a", "#4a4a52", "#2e4a3a"][Math.floor(rand(r * 17 + b, seed + 1) * 5)];
          return <rect key={b} x={-w / 2 + 0.05 + b * 0.07} y={-h + 0.06 + (r + 1) * ((h - 0.1) / rows) - bh} width={0.055} height={bh} fill={c} opacity={0.9} />;
        })}
      </g>
    ))}
  </g>
);

/* ───────────────────────────── TV (CRT on a stand) ───────────────────────────── */

export const CRT: React.FC<{ x: number; y?: number; w?: number; on?: number; screen?: string; static?: number }> = ({ x, y = -0.9, w = 0.62, on = 0.7, screen = "#9fc4ff", static: st = 0 }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-w / 2} y={-w * 0.78} width={w} height={w * 0.78} rx={0.03} fill="#2a2a2c" stroke={OL} strokeWidth={0.008} />
    <rect x={-w * 0.4} y={-w * 0.7} width={w * 0.72} height={w * 0.56} rx={0.02} fill={screen} opacity={0.35 + 0.65 * on} />
    {st > 0 && Array.from({ length: 14 }).map((_, i) => <rect key={i} x={-w * 0.4} y={-w * 0.7 + i * (w * 0.56 / 14)} width={w * 0.72} height={w * 0.02} fill="#fff" opacity={st * rand(i, 9)} />)}
    <rect x={-w * 0.4} y={-w * 0.7} width={w * 0.72} height={w * 0.56} rx={0.02} fill="none" stroke="#111" strokeWidth={0.014} />
    <rect x={w * 0.34} y={-w * 0.62} width={0.03} height={0.1} fill="#4a4a4c" />
    {on > 0 && <ellipse cx={0} cy={-w * 0.4} rx={w * 1.2} ry={w * 0.9} fill="url(#dCoolGlow)" opacity={0.3 * on} />}
  </g>
);

/* ───────────────────────────── doors, frames, generic wall outline ───────────────────────────── */

export const Baseboard: React.FC<{ x: number; w: number; color?: string }> = ({ x, w, color = "#2a2018" }) => (
  <rect x={x - w / 2} y={-0.12} width={w} height={0.12} fill={color} />
);

