// Batch B · INT kitchen at night (the house above the basement).
// Reference (S01E03): small suburban kitchen — cream cabinets, speckled laminate counter, sink under a
// dark window, a fridge with magnets, a bin under the sink, a warm ceiling fixture over the table.
// Original layout and art. 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, lerp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad, flatDisc, Dust, qOf } from "./b_common";

export const KT = {
  x0: -3.0, x1: 3.0, zBack: 6.2, ceil: 2.7,
  wall: "#c9bda3", wallShade: "#9d927b", tile: "#dfe3d8",
  cab: "#d8cbb0", cabShade: "#b3a68b", cabLight: "#efe6d2",
  top: "#8b7f68", floor: "#9a8464", floorShade: "#6b5a41", ol: "#241c14",
};

export const KitchenRoom: React.FC<{ cam: Cam; f: number; light?: number }> = ({ cam, f, light = 1 }) => {
  const zn = cam.z + 0.4;
  const flick = 0.95 + 0.05 * Math.sin(f * 0.09);
  return (
    <g>
      <defs>
        <linearGradient id="ktwall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d836d" /><stop offset="0.35" stopColor={KT.wall} /><stop offset="1" stopColor="#a3977d" />
        </linearGradient>
        <linearGradient id="ktfloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={KT.floorShade} /><stop offset="0.5" stopColor={KT.floor} /><stop offset="1" stopColor="#8a7452" />
        </linearGradient>
      </defs>
      {/* floor: warm lino with seams */}
      <polygon points={flatQuad(cam, KT.x0, KT.x1, zn, KT.zBack, 0)} fill="url(#ktfloor)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <polygon key={i} points={flatQuad(cam, KT.x0 + i * 1.0, KT.x0 + i * 1.0 + 0.02, zn, KT.zBack, 0.001)} fill="#5d4c37" opacity={0.35} />
      ))}
      {/* far wall + tile backsplash */}
      <polygon points={wallQuad(cam, KT.x0, KT.x1, 0, KT.ceil, KT.zBack)} fill="url(#ktwall)" />
      <polygon points={wallQuad(cam, KT.x0, KT.x1, 0.95, 1.62, KT.zBack - 0.01)} fill={KT.tile} />
      {Array.from({ length: 9 }).map((_, i) => (
        <polygon key={`t${i}`} points={wallQuad(cam, KT.x0 + i * 0.68, KT.x0 + i * 0.68 + 0.012, 0.95, 1.62, KT.zBack - 0.02)} fill="#b8bcae" opacity={0.7} />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <polygon key={`ty${i}`} points={wallQuad(cam, KT.x0, KT.x1, 0.95 + i * 0.22, 0.96 + i * 0.22, KT.zBack - 0.02)} fill="#b8bcae" opacity={0.7} />
      ))}
      {/* side walls */}
      <polygon points={sideQuad(cam, KT.x0, zn, KT.zBack, 0, KT.ceil)} fill="#a1957c" />
      <polygon points={sideQuad(cam, KT.x1, zn, KT.zBack, 0, KT.ceil)} fill="#b3a68b" />
      {/* ceiling */}
      <polygon points={flatQuad(cam, KT.x0, KT.x1, zn, KT.zBack, KT.ceil)} fill="#e2d8c2" />
      {/* window over the sink: night outside, moon, a neighbour's lit window */}
      <polygon points={wallQuad(cam, -1.5, 0.3, 1.66, 2.42, KT.zBack - 0.02)} fill="#2a3446" />
      <polygon points={wallQuad(cam, -1.44, 0.24, 1.72, 2.36, KT.zBack - 0.04)} fill="#16243c" />
      <circle cx={project(cam, 0.02, 2.2, KT.zBack - 0.05).x} cy={project(cam, 0.02, 2.2, KT.zBack - 0.05).y} r={0.055 * project(cam, 0, 0, KT.zBack).s} fill="#e8eeff" opacity={0.9} />
      {Array.from({ length: 14 }).map((_, i) => {
        const p = project(cam, -1.4 + rand(i, 5) * 1.6, 1.8 + rand(i, 6) * 0.5, KT.zBack - 0.05);
        return <circle key={i} cx={p.x} cy={p.y} r={1.4} fill="#dfe9ff" opacity={0.5} />;
      })}
      <polygon points={wallQuad(cam, -1.35, -0.75, 1.8, 2.0, KT.zBack - 0.05)} fill="#ffcf8a" opacity={0.28} />
      {/* window frame + mullions */}
      {[-1.5, 0.3].map((x, i) => <polygon key={`fw${i}`} points={wallQuad(cam, x - 0.05, x + 0.05, 1.66, 2.42, KT.zBack - 0.01)} fill="#e6dcc6" />)}
      <polygon points={wallQuad(cam, -1.5, 0.3, 2.0, 2.06, KT.zBack - 0.01)} fill="#e6dcc6" />
      <polygon points={wallQuad(cam, -0.62, -0.56, 1.66, 2.42, KT.zBack - 0.01)} fill="#e6dcc6" />
      {/* sink + faucet under the window */}
      <polygon points={flatQuad(cam, -1.2, -0.1, KT.zBack - 0.62, KT.zBack - 0.06, 0.9)} fill="#9aa3a4" />
      <polygon points={flatQuad(cam, -1.12, -0.18, KT.zBack - 0.56, KT.zBack - 0.12, 0.88)} fill="#6d7576" />
      <polygon points={qOf(cam, [[-0.62, 0.9, KT.zBack - 0.5], [-0.56, 0.9, KT.zBack - 0.5], [-0.56, 1.22, KT.zBack - 0.5], [-0.62, 1.22, KT.zBack - 0.5]])} fill="#b9c1c2" />
      <polygon points={qOf(cam, [[-0.62, 1.22, KT.zBack - 0.5], [-0.34, 1.24, KT.zBack - 0.44], [-0.34, 1.29, KT.zBack - 0.44], [-0.62, 1.27, KT.zBack - 0.5]])} fill="#c9d1d2" />
      {/* upper cabinets left + right */}
      {[[-3.0, -1.62], [0.42, 1.5]].map(([a, b], i) => (
        <g key={i}>
          <polygon points={wallQuad(cam, a, b, 1.72, 2.52, KT.zBack - 0.2)} fill={KT.cab} stroke={KT.ol} strokeWidth={0.6} />
          <polygon points={wallQuad(cam, a, b, 1.72, 1.78, KT.zBack - 0.2)} fill={KT.cabShade} opacity={0.6} />
          <polygon points={wallQuad(cam, (a + b) / 2 - 0.02, (a + b) / 2 + 0.02, 1.72, 2.52, KT.zBack - 0.21)} fill={KT.cabShade} />
          <circle cx={project(cam, (a + b) / 2 - 0.1, 2.05, KT.zBack - 0.22).x} cy={project(cam, (a + b) / 2 - 0.1, 2.05, KT.zBack - 0.22).y} r={0.018 * project(cam, 0, 0, KT.zBack - 0.2).s} fill="#8b8272" />
        </g>
      ))}
      {/* base cabinets + counter run */}
      <polygon points={wallQuad(cam, -3.0, 1.6, 0, 0.9, KT.zBack - 0.24)} fill={KT.cab} stroke={KT.ol} strokeWidth={0.6} />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={`bc${i}`}>
          <polygon points={wallQuad(cam, -2.95 + i * 0.65, -2.9 + i * 0.65, 0.06, 0.84, KT.zBack - 0.25)} fill={KT.cabShade} opacity={0.55} />
          <circle cx={project(cam, -2.6 + i * 0.65, 0.76, KT.zBack - 0.26).x} cy={project(cam, -2.6 + i * 0.65, 0.76, KT.zBack - 0.26).y} r={0.014 * project(cam, 0, 0, KT.zBack).s} fill="#8b8272" />
        </g>
      ))}
      <polygon points={qOf(cam, [[-3.0, 0.9, KT.zBack - 0.6], [1.6, 0.9, KT.zBack - 0.6], [1.6, 0.94, KT.zBack - 0.6], [-3.0, 0.94, KT.zBack - 0.6]])} fill={KT.top} />
      <polygon points={qOf(cam, [[-3.0, 0.94, KT.zBack - 0.6], [1.6, 0.94, KT.zBack - 0.6], [1.6, 0.94, KT.zBack - 0.24], [-3.0, 0.94, KT.zBack - 0.24]])} fill="#a1937a" />
      {/* fridge on the right */}
      <polygon points={qOf(cam, [[1.75, 0, KT.zBack - 0.55], [2.75, 0, KT.zBack - 0.55], [2.75, 1.86, KT.zBack - 0.55], [1.75, 1.86, KT.zBack - 0.55]])} fill="#e6e3da" stroke={KT.ol} strokeWidth={0.6} />
      <polygon points={qOf(cam, [[2.73, 0, KT.zBack - 0.56], [2.86, 0.02, KT.zBack - 0.3], [2.86, 1.88, KT.zBack - 0.3], [2.73, 1.86, KT.zBack - 0.56]])} fill="#cfccc2" />
      <polygon points={qOf(cam, [[1.75, 1.2, KT.zBack - 0.56], [2.75, 1.2, KT.zBack - 0.56], [2.75, 1.23, KT.zBack - 0.56], [1.75, 1.23, KT.zBack - 0.56]])} fill="#b8b4aa" />
      <polygon points={qOf(cam, [[2.62, 0.85, KT.zBack - 0.58], [2.68, 0.85, KT.zBack - 0.58], [2.68, 1.5, KT.zBack - 0.58], [2.62, 1.5, KT.zBack - 0.58]])} fill="#9a968c" />
      {/* fridge magnets: original, generic shapes */}
      {[0, 1, 2].map((i) => <circle key={i} cx={project(cam, 1.95 + i * 0.16, 1.42, KT.zBack - 0.6).x} cy={project(cam, 1.95 + i * 0.16, 1.42, KT.zBack - 0.6).y} r={5} fill={["#c25b4a", "#4a7fc2", "#d8b05a"][i]} opacity={0.9} />)}
      {/* counter clutter: kettle, mug, bread board, a hand towel */}
      <polygon points={qOf(cam, [[0.2, 0.94, KT.zBack - 0.42], [0.42, 0.94, KT.zBack - 0.42], [0.42, 1.16, KT.zBack - 0.42], [0.2, 1.16, KT.zBack - 0.42]])} fill="#b9bec4" />
      <polygon points={qOf(cam, [[0.2, 1.16, KT.zBack - 0.42], [0.34, 1.2, KT.zBack - 0.4], [0.34, 1.22, KT.zBack - 0.4], [0.2, 1.18, KT.zBack - 0.42]])} fill="#cdd2d8" />
      <polygon points={qOf(cam, [[0.6, 0.94, KT.zBack - 0.38], [0.72, 0.94, KT.zBack - 0.38], [0.72, 1.08, KT.zBack - 0.38], [0.6, 1.08, KT.zBack - 0.38]])} fill="#efe6d2" />
      <polygon points={qOf(cam, [[-2.6, 0.94, KT.zBack - 0.5], [-1.7, 0.94, KT.zBack - 0.5], [-1.7, 0.98, KT.zBack - 0.34], [-2.6, 0.98, KT.zBack - 0.34]])} fill="#b08a55" />
      {/* bin under the sink — the one he has to go through */}
      <polygon points={qOf(cam, [[-0.95, 0, KT.zBack - 0.5], [-0.35, 0, KT.zBack - 0.5], [-0.35, 0.56, KT.zBack - 0.5], [-0.95, 0.56, KT.zBack - 0.5]])} fill="#8f979c" stroke={KT.ol} strokeWidth={0.5} />
      <polygon points={qOf(cam, [[-0.95, 0.56, KT.zBack - 0.5], [-0.35, 0.56, KT.zBack - 0.5], [-0.35, 0.6, KT.zBack - 0.44], [-0.95, 0.6, KT.zBack - 0.44]])} fill="#aab2b6" />
      {/* ceiling light over the table + warm pool */}
      <Card cam={cam} x={1.6} y={KT.ceil} z={4.0}>
        <path d="M0,0 L0,0.34" stroke="#3a3026" strokeWidth={0.014} />
        <path d="M-0.22,0.34 L0.22,0.34 L0.3,0.46 L-0.3,0.46 Z" fill="#f3e7cd" stroke={KT.ol} strokeWidth={0.01} />
        <ellipse cx={0} cy={0.47} rx={0.12} ry={0.04} fill="#fff6da" opacity={0.95 * flick} />
        <ellipse cx={0} cy={0.5} rx={0.9} ry={0.5} fill="url(#glowW)" opacity={0.4 * light} />
      </Card>
      <polygon points={flatDisc(cam, 1.6, 4.0, 1.35, 0.004, 22, 0.12, 4)} fill="#ffe3ae" opacity={0.12 * light} />
      {cam.z < 3 && <Dust f={f} cam={cam} n={22} seed={31} color="#fff1d4" z0={1.6} z1={5.4} x0={-2.2} x1={2.6} h={2.1} />}
    </g>
  );
};

/** kitchen table (night): round top, two chairs, a plate of toast, a phone */
export const KitchenTable: React.FC<{ cam: Cam; x: number; z: number; r?: number }> = ({ cam, x, z, r = 0.55 }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={r * 1.2} ry={0.16} fill="#000" opacity={0.4} />
    <ellipse cx={0} cy={-0.74} rx={r} ry={r * 0.33} fill="#a8875b" stroke={KT.ol} strokeWidth={0.012} />
    <ellipse cx={0} cy={-0.72} rx={r * 0.94} ry={r * 0.3} fill="#c2a171" />
    <path d={`M-0.06,-0.74 L-0.1,0 L0.1,0 L0.06,-0.74 Z`} fill="#8d7048" />
    <path d={`M-0.3,-0.03 L0.3,-0.03`} stroke="#8d7048" strokeWidth={0.03} />
    <path d={`M-0.35,-0.71 A${r},${r * 0.33} 0 0 0 ${r * 0.3},${-0.79}`} stroke="#e0c9a0" strokeWidth={0.02} fill="none" opacity={0.6} />
  </Card>
);

/** a kitchen chair seen from an angle (origin = floor under the seat centre) */
export const KitchenChair: React.FC<{ cam: Cam; x: number; z: number; face?: number }> = ({ cam, x, z }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={0.26} ry={0.06} fill="#000" opacity={0.35} />
    {[-0.18, 0.18].map((lx) => <path key={lx} d={`M${lx},0 L${lx * 0.9},-0.46`} stroke="#8d7048" strokeWidth={0.03} />)}
    {[-0.2, 0.2].map((lx) => <path key={lx} d={`M${lx},-0.02 L${lx * 1.1},-0.44`} stroke="#6f573a" strokeWidth={0.026} />)}
    <path d="M-0.22,-0.46 L0.22,-0.46 L0.2,-0.5 L-0.2,-0.5 Z" fill="#a8875b" stroke={KT.ol} strokeWidth={0.008} />
    <path d="M-0.2,-0.5 L-0.18,-0.94 L0.18,-0.94 L0.2,-0.5 Z" fill="#9a7a4e" stroke={KT.ol} strokeWidth={0.008} />
    <path d="M-0.15,-0.66 L0.15,-0.66 M-0.15,-0.8 L0.15,-0.8" stroke="#7d6239" strokeWidth={0.012} />
  </Card>
);
