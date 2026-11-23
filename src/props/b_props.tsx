// Batch B · original props, drawn in METRES (1 unit = 1 m). Unbranded, generic designs.
import React from "react";
import { rand, lerp } from "../lib/anim";

/** plain diner-style plate, seen at an angle (rx = radius 0.13 m). y up is negative in card space. */
export const Plate: React.FC<{ r?: number; tint?: string; rim?: string; shadow?: boolean; squash?: number }> = ({ r = 0.13, tint = "#f2ece0", rim = "#cdc3b0", shadow = true, squash = 0.34 }) => (
  <g>
    {shadow && <ellipse cx={0} cy={0} rx={r * 1.08} ry={r * squash * 1.1} fill="#000" opacity={0.3} />}
    <ellipse cx={0} cy={0} rx={r} ry={r * squash} fill={tint} stroke="#8c8574" strokeWidth={0.004} />
    <ellipse cx={0} cy={-0.004} rx={r * 0.78} ry={r * squash * 0.74} fill="#e6dfd0" />
    <ellipse cx={-r * 0.25} cy={-0.008} rx={r * 0.35} ry={r * squash * 0.3} fill="#fbf7ee" opacity={0.7} />
    <path d={`M${-r * 0.9},0 A${r * 0.9},${r * squash * 0.9} 0 0 1 0,${-r * squash * 0.9}`} stroke={rim} strokeWidth={0.004} fill="none" opacity={0.8} />
  </g>
);

/** half sandwich, crusts cut off (a plot point) – two stacked bread slabs with a filling line */
export const Sandwich: React.FC<{ s?: number; tilt?: number }> = ({ s = 1, tilt = 0 }) => (
  <g transform={`scale(${s}) rotate(${tilt})`}>
    <path d="M-0.055,0 L-0.05,-0.026 Q0,-0.036 0.05,-0.026 L0.055,0 Z" fill="#e8c98c" stroke="#8a6b3a" strokeWidth={0.003} />
    <path d="M-0.052,-0.02 L0.052,-0.02 L0.05,-0.012 L-0.05,-0.012 Z" fill="#9fbf6e" />
    <path d="M-0.05,-0.012 L0.05,-0.012 L0.048,-0.006 L-0.048,-0.006 Z" fill="#c9784f" />
    <path d="M-0.055,0 L-0.05,-0.012 Q0,-0.02 0.05,-0.012 L0.055,0 Z" fill="#f0d6a0" stroke="#8a6b3a" strokeWidth={0.0025} />
    <path d="M-0.04,-0.03 Q0,-0.034 0.04,-0.03" stroke="#fff" strokeWidth={0.003} fill="none" opacity={0.45} />
  </g>
);

/** one broken shard: tapered, sharp, with a wet-ish highlight */
export const Shard: React.FC<{ len: number; w: number; a: number; fill?: string }> = ({ len, w, a, fill = "#eee7d8" }) => (
  <g transform={`rotate(${a})`}>
    <path d={`M0,0 L${len * 0.42},${-w * 0.5} L${len},${-w * 0.06} L${len * 0.5},${w * 0.55} Z`} fill={fill} stroke="#8b8474" strokeWidth={0.0025} strokeLinejoin="round" />
    <path d={`M${len * 0.1},${-w * 0.1} L${len * 0.75},${-w * 0.08}`} stroke="#fff" strokeWidth={w * 0.16} opacity={0.55} />
  </g>
);

/** a plate bursting into pieces; t 0 = intact, 1 = scattered & settled. deterministic. */
export const PlateBurst: React.FC<{ t: number; n?: number; r?: number; seed?: number; tint?: string }> = ({ t, n = 9, r = 0.13, seed = 3, tint = "#f0e9db" }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const a0 = (i / n) * Math.PI * 2 + rand(i, seed) * 0.5;
      const dist = (0.03 + rand(i, seed + 1) * 0.34) * (1 - Math.exp(-t * 4.2));
      const x = Math.cos(a0) * dist, z = Math.sin(a0) * dist * 0.42;
      const y = Math.max(0, Math.sin(Math.min(1, t * 1.6) * Math.PI) * (0.02 + rand(i, seed + 2) * 0.05) * (1 - t));
      const spin = rand(i, seed + 3) * 720 * (1 - Math.exp(-t * 3));
      const len = r * (0.28 + rand(i, seed + 4) * 0.42);
      return (
        <g key={i} transform={`translate(${x},${-y - z * 0.05})`}>
          <ellipse cx={0} cy={0.002} rx={len * 0.5} ry={len * 0.22} fill="#000" opacity={0.28 * Math.min(1, t)} />
          <Shard len={len} w={len * (0.4 + rand(i, seed + 5) * 0.35)} a={spin} fill={tint} />
        </g>
      );
    })}
  </g>
);

/** short, sharp piece: the one that ends up missing (planted early, paid off in scene 33) */
export const LongShard: React.FC<{ len?: number }> = ({ len = 0.115 }) => (
  <g>
    <path d={`M0,0 L${len * 0.2},${-0.016} L${len},${-0.004} L${len * 0.78},${0.012} L${len * 0.12},${0.014} Z`} fill="#f1eadd" stroke="#8b8474" strokeWidth={0.0022} strokeLinejoin="round" />
    <path d={`M${len * 0.14},${-0.008} L${len * 0.9},${-0.003}`} stroke="#fff" strokeWidth={0.003} opacity={0.6} />
  </g>
);

/** blue crystal chunk (flat-shaded, faceted) — never looks like real product packaging */
export const Crystal: React.FC<{ s?: number; hue?: string }> = ({ s = 1, hue = "#5fd0f0" }) => (
  <g transform={`scale(${s})`}>
    <path d="M-0.012,0 L-0.016,-0.014 L-0.006,-0.026 L0.008,-0.022 L0.015,-0.008 L0.008,0 Z" fill={hue} stroke="#12303d" strokeWidth={0.002} strokeLinejoin="round" />
    <path d="M-0.012,0 L-0.016,-0.014 L-0.006,-0.026 L-0.002,-0.008 Z" fill="#a8ecff" opacity={0.85} />
    <path d="M0.008,-0.022 L0.015,-0.008 L0.008,0 Z" fill="#2f95b4" opacity={0.8} />
    <circle cx={-0.004} cy={-0.018} r={0.003} fill="#eaffff" opacity={0.9} />
  </g>
);
