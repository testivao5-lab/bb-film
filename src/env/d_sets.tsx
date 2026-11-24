// BATCH D kit · quick sets: carwash bay (day), suburban backyard with grill, desert hole (day/dusk).
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1 } from "../lib/anim";
import { DesertFloor, DuneRidge, Sky } from "./d_shared";

const OL = "#14100c";

/* ───────────────────────────── car wash (day) ───────────────────────────── */

export const CarWashBay: React.FC<{ cam: Cam; f: number; wet?: number }> = ({ cam, f, wet = 1 }) => {
  const backZ = 8;
  return (
    <g>
      {/* concrete apron */}
      <polygon points={planePts(cam, [[-60, cam.z + 0.4], [60, cam.z + 0.4], [60, 60], [-60, 60]])} fill="#9a9890" />
      <polygon points={planePts(cam, [[-60, cam.z + 0.4], [60, cam.z + 0.4], [60, 60], [-60, 60]], 0.002)} fill="#a8a69c" opacity={0.6} />
      {/* wet patches with sky reflection */}
      {Array.from({ length: 7 }).map((_, i) => {
        const x = -3 + rand(i, 5) * 6, z = cam.z + 1.6 + rand(i, 6) * 4;
        return <polygon key={i} points={planePts(cam, [[x - 0.5, z], [x + 0.45, z - 0.1], [x + 0.6, z + 0.35], [x - 0.35, z + 0.4]], 0.004)} fill="#cfe4f2" opacity={0.35 * wet} />;
      })}
      {/* bay: tiled wall with a roller door opening */}
      <Card cam={cam} x={0} z={backZ} blur={false}>
        <rect x={-9} y={-3.1} width={18} height={3.1} fill="#dfe4e2" stroke={OL} strokeWidth={0.02} />
        {Array.from({ length: 9 }).map((_, r) => <rect key={r} x={-9} y={-3.1 + r * 0.35} width={18} height={0.02} fill="#c2c8c4" />)}
        {Array.from({ length: 24 }).map((_, c) => <rect key={c} x={-9 + c * 0.75} y={-3.1} width={0.02} height={3.1} fill="#c2c8c4" />)}
        {/* soap streaks running down */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = -7 + rand(i, 9) * 14;
          return <path key={i} d={`M${x},-3.1 q${0.06 * noise1(i, 2)},1.1 ${0.02},${1.4 + rand(i, 10) * 1.4}`} stroke="#b8c9c2" strokeWidth={0.05 + rand(i, 11) * 0.06} fill="none" opacity={0.5} />;
        })}
        {/* roller door opening into the dark bay */}
        <rect x={-2.6} y={-2.7} width={5.2} height={2.7} fill="#1a2028" stroke={OL} strokeWidth={0.03} />
        <rect x={-2.6} y={-2.7} width={5.2} height={0.55} fill="#3a444e" />
        {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-2.6} y={-2.7 + i * 0.09} width={5.2} height={0.04} fill="#2a333c" />)}
        {/* blue light strip inside (the wash is running) */}
        <rect x={-2.4} y={-2.2} width={4.8} height={0.08} fill="#8fd0ff" opacity={0.55} />
        {/* brushes + hanging hoses */}
        {[-1.9, 1.9].map((x) => (
          <g key={x}>
            <rect x={x - 0.16} y={-2.1} width={0.32} height={1.5} rx={0.16} fill="#3a6f8a" stroke={OL} strokeWidth={0.02} />
            {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${x - 0.18},${-2.0 + i * 0.2} q0.18,0.06 0.36,0`} stroke="#6fa8c2" strokeWidth={0.05} fill="none" />)}
          </g>
        ))}
        {/* vending machine + office window (storytelling) */}
        <g transform="translate(5.6,0)">
          <rect x={-0.5} y={-1.9} width={1.0} height={1.9} fill="#2e3a44" stroke={OL} strokeWidth={0.02} />
          <rect x={-0.42} y={-1.78} width={0.84} height={1.1} fill="#a8d8e8" opacity={0.55} />
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-0.36 + (i % 4) * 0.19} y={-1.7 + Math.floor(i / 4) * 0.32} width={0.12} height={0.2} fill={["#d84a3a", "#e8b83a", "#4a8ad8"][i % 3]} opacity={0.9} />)}
        </g>
        <g transform="translate(-6.2,0)">
          <rect x={-1.0} y={-2.3} width={2.0} height={1.1} fill="#bfe0f0" stroke={OL} strokeWidth={0.03} />
          <rect x={-1.0} y={-2.3} width={2.0} height={0.12} fill="#8aa4b4" />
        </g>
      </Card>
      {/* hose reel + bucket near layer */}
      <Card cam={cam} x={-2.7} z={cam.z + 2.6} blur>
        <ellipse cx={0} cy={0} rx={0.42} ry={0.1} fill="#000" opacity={0.3} />
        <rect x={-0.05} y={-0.9} width={0.1} height={0.9} fill="#5a6a74" />
        <circle cx={0} cy={-0.95} r={0.34} fill="none" stroke="#c9552a" strokeWidth={0.12} />
        <circle cx={0} cy={-0.95} r={0.2} fill="#3a444c" />
        <path d="M0.32,-0.95 q0.5,0.25 0.4,0.9" stroke="#c9552a" strokeWidth={0.12} fill="none" />
      </Card>
      <Card cam={cam} x={2.4} z={cam.z + 3.2} blur>
        <path d="M-0.2,0 L-0.16,-0.3 L0.16,-0.3 L0.2,0 Z" fill="#3a8ac0" stroke={OL} strokeWidth={0.01} />
        <ellipse cx={0} cy={-0.3} rx={0.17} ry={0.05} fill="#e8f4ff" opacity={0.6} />
      </Card>
    </g>
  );
};

/* ───────────────────────────── suburban backyard (day) ───────────────────────────── */

export const Backyard: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const backZ = 9;
  return (
    <g>
      {/* lawn */}
      <polygon points={planePts(cam, [[-40, cam.z + 0.4], [40, cam.z + 0.4], [40, 40], [-40, 40]])} fill="#7fa04e" />
      <polygon points={planePts(cam, [[-40, cam.z + 0.4], [0, cam.z + 0.4], [40, 40], [-40, 40]], 0.002)} fill="#93b466" opacity={0.5} />
      {/* mowing stripes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <polygon key={i} points={planePts(cam, [[-20 + i * 4, cam.z + 0.5], [-18 + i * 4, cam.z + 0.5], [-14 + i * 6, 30], [-18 + i * 6, 30]], 0.003)} fill="#8aac58" opacity={0.4} />
      ))}
      {/* patio stones */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -2 + (i % 5) * 0.9, z = cam.z + 2 + Math.floor(i / 5) * 0.9;
        return <polygon key={i} points={planePts(cam, [[x - 0.4, z], [x + 0.4, z], [x + 0.4, z + 0.75], [x - 0.4, z + 0.75]], 0.004)} fill="#b8b0a0" opacity={0.9} />;
      })}
      {/* back fence */}
      <Card cam={cam} x={0} z={backZ} blur={false}>
        <rect x={-12} y={-1.9} width={24} height={1.9} fill="#b09a72" stroke={OL} strokeWidth={0.02} />
        {Array.from({ length: 60 }).map((_, i) => <rect key={i} x={-12 + i * 0.4} y={-1.9} width={0.36} height={1.75} fill={i % 2 ? "#bda67c" : "#b29870"} stroke="#8a7450" strokeWidth={0.008} />)}
        <rect x={-12} y={-1.6} width={24} height={0.1} fill="#8a7450" />
        <rect x={-12} y={-0.6} width={24} height={0.1} fill="#8a7450" />
        {/* hedge + palm-ish shrubs behind */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`translate(${-11 + i * 2},0)`}>
            <ellipse cx={0} cy={-2.1} rx={1.2} ry={0.7} fill="#4a6a3a" />
            <ellipse cx={-0.4} cy={-2.4} rx={0.7} ry={0.5} fill="#5a7a42" />
          </g>
        ))}
      </Card>
      {/* the neighbour's roofline beyond the fence */}
      <Card cam={cam} x={-6} z={backZ + 3} blur>
        <polygon points="-3.5,-0.2 -3.5,-2.2 0,-3.2 3.5,-2.2 3.5,-0.2" fill="#8a7a6a" />
        <rect x={-3.2} y={-2.6} width={1.1} height={1.3} fill="#cfe0ea" opacity={0.7} />
      </Card>
      {/* BBQ grill (the research detail: the barrel photo was shot next to the grill) */}
      <Card cam={cam} x={1.15} z={cam.z + 4.2} blur={false}>
        <ellipse cx={0} cy={0} rx={0.5} ry={0.12} fill="#000" opacity={0.28} />
        <path d="M-0.42,-0.62 L-0.5,0 M0.42,-0.62 L0.5,0 M0,-0.62 L0,0" stroke="#2a2a2e" strokeWidth={0.05} />
        <ellipse cx={0} cy={-0.66} rx={0.46} ry={0.16} fill="#2a2a2e" stroke={OL} strokeWidth={0.012} />
        <path d="M-0.46,-0.66 Q0,-1.06 0.46,-0.66 Z" fill="#3a3a3e" stroke={OL} strokeWidth={0.012} />
        <path d="M-0.3,-0.72 Q0,-0.9 0.3,-0.72" stroke="#5a5a5e" strokeWidth={0.02} fill="none" />
        <rect x={-0.2} y={-1.02} width={0.4} height={0.03} rx={0.01} fill="#6a6a70" />
        <circle cx={0.2} cy={-0.9} r={0.05} fill="#c04a2a" opacity={0.9} />
      </Card>
      {/* the hole in the grass with the barrel in it */}
      <Card cam={cam} x={-0.55} z={cam.z + 3.4} blur={false}>
        <ellipse cx={0} cy={0} rx={0.62} ry={0.24} fill="#4a3a22" />
        <ellipse cx={0} cy={-0.02} rx={0.58} ry={0.2} fill="#2e2414" />
        {/* loose sod thrown out */}
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i} transform={`translate(${(rand(i, 21) - 0.5) * 1.1},${0.14 + rand(i, 22) * 0.3})`}>
            <path d="M-0.11,0.02 L0.11,0.02 L0.09,-0.05 L-0.09,-0.05 Z" fill="#5a7a3a" />
            <path d="M-0.09,0.02 L0.09,0.02 L0.1,0.06 L-0.1,0.06 Z" fill="#4a3420" />
          </g>
        ))}
        {/* barrel sticking out, lid ajar */}
      </Card>
    </g>
  );
};

/* ───────────────────────────── desert hole (day or dusk) ───────────────────────────── */

export const DesertHole: React.FC<{ cam: Cam; f: number; tone?: "day" | "dusk" | "night"; x?: number; z?: number; depth?: number; dirt?: number; barrel?: boolean }> = ({ cam, f, tone = "day", x = 0, z = 5.4, depth = 1, dirt = 1, barrel = false }) => {
  const sand = tone === "dusk" ? "#8f6a5a" : tone === "night" ? "#3a3a44" : "#d9b98a";
  const dark = tone === "dusk" ? "#3d2f45" : tone === "night" ? "#14141a" : "#6a5334";
  const prog = (Math.min(1, Math.max(0, 0.55 + depth * 0.45)));
  return (
    <g>
      {/* shadow of the hole on the sand (long, late light) */}
      <polygon points={planePts(cam, [[x - 0.9, z - 0.5], [x + 0.9, z - 0.6], [x + 2.4, z + 0.4], [x - 1.8, z + 0.9]], 0.003)} fill={dark} opacity={0.18} />
      {/* hole rim (raised sand) */}
      <polygon points={planePts(cam, [[x - 1.35, z - 1.0], [x + 1.35, z - 1.0], [x + 1.5, z + 1.1], [x - 1.5, z + 1.1]], 0.002)} fill={sand} />
      {/* hole floor + walls: a dark quad inside the rim */}
      <polygon points={planePts(cam, [[x - 1.15, z - 0.82], [x + 1.15, z - 0.82], [x + 1.25, z + 0.92], [x - 1.25, z + 0.92]], 0.001)} fill={dark} />
      <polygon points={planePts(cam, [[x - 1.05, z - 0.72], [x + 1.05, z - 0.72], [x + 1.14, z + 0.82], [x - 1.14, z + 0.82]], -0.8 * prog)} fill={tone === "night" ? "#07070a" : "#2a2012"} />
      {/* a slant of light on the far wall */}
      <polygon points={planePts(cam, [[x - 0.9, z - 0.7], [x + 0.5, z - 0.7], [x + 0.55, z + 0.2], [x - 0.85, z + 0.2]], -0.5 * prog)} fill={tone === "night" ? "#101018" : "#6a5334"} opacity={0.7} />
      {/* shovel planted in the dirt pile */}
      <Card cam={cam} x={x + 1.6} z={z + 0.5} blur={false}>
        <ellipse cx={0} cy={0} rx={0.55} ry={0.14} fill={dark} opacity={0.9} />
        <ellipse cx={0} cy={-0.05} rx={0.5} ry={0.12} fill={sand} />
        <g transform="rotate(14)">
          <rect x={-0.02} y={-1.15} width={0.04} height={1.05} fill="#8a6a3c" stroke={OL} strokeWidth={0.008} />
          <path d="M-0.11,-0.14 L0.11,-0.14 L0.09,0.16 Q0,0.24 -0.09,0.16 Z" fill="#9aa4ac" stroke={OL} strokeWidth={0.01} />
        </g>
      </Card>
      {/* scattered clods */}
      {Array.from({ length: 10 }).map((_, i) => {
        const p = project(cam, x + (rand(i, 31) - 0.5) * 4.2, 0.02, z + (rand(i, 32) - 0.5) * 3);
        return <ellipse key={i} cx={p.x} cy={p.y} rx={0.14 * p.s} ry={0.06 * p.s} fill={dark} opacity={0.8} />;
      })}
    </g>
  );
};

/* a simple desert hero: sky + ridge + floor in one call */
export const DesertAll: React.FC<{ cam: Cam; f: number; tone?: "day" | "dusk" | "night"; sun?: [number, number]; rut?: boolean }> = ({ cam, f, tone = "day", sun, rut }) => (
  <g>
    <Sky cam={cam} f={f} tone={tone} sun={sun} par={tone === "night" ? 4 : 8} />
    <DuneRidge cam={cam} f={f} tone={tone} z={900} />
    <DesertFloor cam={cam} f={f} tone={tone} rutX={rut ? 0.2 : undefined} scrubN={34} near={34} seed={9} />
  </g>
);
