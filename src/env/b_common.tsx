// Batch B shared 2.5D helpers: world-space quads, soft puffs, light pools, ambient life bits.
// Everything is a pure function of the frame. 1 unit = 1 m.
import React from "react";
import { Cam, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, lerp } from "../lib/anim";

export const qOf = (cam: Cam, pts: [number, number, number][]) =>
  pts.map(([x, y, z]) => { const p = project(cam, x, y, z); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ");

/** quad on a vertical plane at constant z */
export const wallQuad = (cam: Cam, x0: number, x1: number, y0: number, y1: number, z: number) =>
  qOf(cam, [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]]);

/** quad on a plane at constant x (side wall); z0 nearer, z1 further */
export const sideQuad = (cam: Cam, x: number, z0: number, z1: number, y0: number, y1: number) =>
  qOf(cam, [[x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0]]);

/** horizontal quad at height y */
export const flatQuad = (cam: Cam, x0: number, x1: number, z0: number, z1: number, y = 0) =>
  qOf(cam, [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]);

/** a disc lying on the floor/any horizontal plane, as a polygon (cheap soft-ish light pool) */
export const flatDisc = (cam: Cam, cx: number, cz: number, r: number, y = 0, n = 24, wobble = 0.12, seed = 0) =>
  planePts(cam, Array.from({ length: n }).map((_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 + wobble * noise1(i * 0.7 + seed, 3));
    return [cx + Math.cos(a) * rr, cz + Math.sin(a) * rr] as [number, number];
  }), y);

/** shared soft radial gradients — define ONCE per svg, never per particle */
export const SoftDefs: React.FC<{ list?: [string, string][] }> = ({ list }) => (
  <defs>
    {(list ?? [["puffA", "#b9ae9a"], ["puffB", "#8a8072"], ["glowW", "#ffd9a0"], ["glowC", "#9fc8ff"]]).map(([id, c]) => (
      <radialGradient key={id} id={id}>
        <stop offset="0" stopColor={c} stopOpacity={0.95} />
        <stop offset="0.55" stopColor={c} stopOpacity={0.35} />
        <stop offset="1" stopColor={c} stopOpacity={0} />
      </radialGradient>
    ))}
  </defs>
);

/** soft round puff (dust, smoke, steam). Screen-space. */
export const Puff: React.FC<{ x: number; y: number; r: number; o: number; light?: boolean; seed?: number }> = ({ x, y, r, o, light, seed = 0 }) => (
  <ellipse cx={x} cy={y} rx={r} ry={r * (0.7 + 0.14 * rand(seed, 4))} fill={`url(#${light ? "puffB" : "puffA"})`} opacity={o} />
);

/** warm bulb glow in screen space (needs SoftDefs with glowW) */
export const Glow: React.FC<{ x: number; y: number; r: number; o?: number; id?: string }> = ({ x, y, r, o = 0.5, id = "glowW" }) => (
  <circle cx={x} cy={y} r={r} fill={`url(#${id})`} opacity={o} />
);

/** drifting dust specks with parallax — same idea as Post's Motes but cheap for interiors */
export const Dust: React.FC<{ f: number; cam: Cam; n?: number; seed?: number; color?: string; z0?: number; z1?: number; x0?: number; x1?: number; h?: number }> = ({ f, cam, n = 26, seed = 1, color = "#efe4cf", z0 = 1, z1 = 6, x0 = -3, x1 = 3, h = 2 }) =>
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const z = lerp(z0, z1, rand(i, seed));
      const x = lerp(x0, x1, rand(i, seed + 1)) + noise1(f * 0.006 + i, seed + 2) * 0.4;
      const y = 0.25 + h * rand(i, seed + 3) + Math.sin(f * 0.01 + i) * 0.12 + f * 0.0016 * (rand(i, seed + 4) - 0.3);
      const p = project(cam, x, y, z);
      if (p.d < 0.25) return null;
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(f * 0.03 + i * 2.1));
      return <circle key={i} cx={p.x} cy={p.y} r={Math.max(0.7, 0.006 * p.s)} fill={color} opacity={0.34 * tw} />;
    })}
  </g>;

/** distant birds / drifting clouds for exteriors (ambient life) */
export const Birds: React.FC<{ f: number; y: number; n?: number; speed?: number; color?: string; seed?: number; scale?: number }> = ({ f, y, n = 5, speed = 0.5, color = "#2c2c33", seed = 1, scale = 1 }) =>
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const x = ((rand(i, seed) * (W + 400) + f * speed * (0.7 + 0.6 * rand(i, seed + 1))) % (W + 400)) - 200;
      const yy = y + Math.sin(f * 0.02 + i * 2) * 12 + rand(i, seed + 2) * 60;
      const flap = Math.sin(f * 0.28 + i) * 0.5 + 0.5;
      const s = scale * (0.6 + rand(i, seed + 3) * 0.7);
      return <path key={i} d={`M${x - 11 * s},${yy} q${5 * s},${-7 * s * flap - 2} ${11 * s},0 q${6 * s},${-7 * s * flap - 2} ${11 * s},0`} stroke={color} strokeWidth={2 * s} fill="none" strokeLinecap="round" opacity={0.55} />;
    })}
  </g>;

/** heat shimmer band for desert exteriors (thin, cheap: no blur filters) */
export const Shimmer: React.FC<{ f: number; top: number; bottom: number; o?: number; color?: string }> = ({ f, top, bottom, o = 0.06, color = "#ffe9bc" }) =>
  <g opacity={o}>
    {Array.from({ length: 7 }).map((_, i) => {
      const y = lerp(top, bottom, i / 6) + Math.sin(f * 0.05 + i) * 3;
      return <path key={i} d={`M0,${y} Q${W * 0.3},${y - 4 + Math.sin(f * 0.02 + i) * 6} ${W * 0.6},${y + 3} Q${W * 0.85},${y + 7} ${W},${y - 2}`} stroke={color} strokeWidth={2.5} fill="none" />;
    })}
  </g>;
