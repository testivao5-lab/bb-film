// Batch B · INT basement (Jesse's house, where the prisoner is chained to the support post).
// Reference (web research, S01E03 "...And the Bag's in the River"): unfinished residential basement —
// bare concrete slab with stains, grey concrete-block walls, exposed floor joists overhead, a steel
// support column, water heater + furnace with ducts, shelving with paint cans and cardboard boxes,
// a wooden staircase up to the kitchen with a warm light spilling down, one small high window, and the
// plastic wading pools they washed off in. Original layout and art; 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, lerp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad, flatDisc, Dust, qOf } from "./b_common";

export const BS = {
  x0: -3.4, x1: 3.4, zBack: 7.4, ceil: 2.34,
  wall: "#78705f", wallShade: "#4a443a", wallLight: "#948b78", block: "#655e50",
  floor: "#5c5449", floorLight: "#7d7362", floorShade: "#2f2b25",
  joist: "#4a3f33", joistLight: "#6b5b48", steel: "#6f7a84", ol: "#211b16",
};

/* ─────────────────────────── the room shell ─────────────────────────── */
export const BasementRoom: React.FC<{ cam: Cam; f: number; bulb?: number; shaft?: number; holeX?: [number, number] }> = ({ cam, f, bulb = 1, shaft = 0.5, holeX }) => {
  const zn = cam.z + 0.35;
  const shine = 0.86 + 0.14 * Math.sin(f * 0.07) * Math.sin(f * 0.023 + 1); // bulb life
  return (
    <g>
      <defs>
        <linearGradient id="bswall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#332e28" />
          <stop offset="0.38" stopColor={BS.wall} />
          <stop offset="1" stopColor="#514a3f" />
        </linearGradient>
        <linearGradient id="bsfloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BS.floorShade} />
          <stop offset="0.45" stopColor={BS.floor} />
          <stop offset="1" stopColor="#6b6153" />
        </linearGradient>
        <linearGradient id="bsside" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d3830" />
          <stop offset="0.7" stopColor="#5c554a" />
          <stop offset="1" stopColor="#4a443b" />
        </linearGradient>
      </defs>
      {/* floor slab */}
      <polygon points={flatQuad(cam, BS.x0, BS.x1, zn, BS.zBack, 0)} fill="url(#bsfloor)" />
      {/* slab seams and damp stains */}
      <polygon points={flatQuad(cam, BS.x0, BS.x1, 2.2, 2.28, 0.002)} fill="#4a453d" opacity={0.55} />
      <polygon points={flatQuad(cam, BS.x0, BS.x1, 4.8, 4.87, 0.002)} fill="#4a453d" opacity={0.45} />
      {[0, 1, 2, 3].map((i) => (
        <polygon key={i} points={flatDisc(cam, -2.2 + i * 1.6 + rand(i, 3) * 0.6, 1.6 + rand(i, 4) * 4.4, 0.5 + rand(i, 5) * 0.7, 0.003, 14, 0.45, i)} fill="#3b352d" opacity={0.22} />
      ))}
      {/* back wall + block courses */}
      <polygon points={wallQuad(cam, BS.x0, BS.x1, 0, BS.ceil, BS.zBack)} fill="url(#bswall)" />
      {Array.from({ length: 11 }).map((_, r) => (
        <polygon key={r} points={wallQuad(cam, BS.x0, BS.x1, r * 0.215, r * 0.215 + 0.012, BS.zBack)} fill="#332e27" opacity={0.13} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <polygon key={`st${i}`} points={wallQuad(cam, BS.x0 + rand(i, 31) * 6.4, BS.x0 + rand(i, 31) * 6.4 + 0.5 + rand(i, 32) * 1.4, 0.2 + rand(i, 33) * 1.4, BS.ceil, BS.zBack)} fill="#2b2620" opacity={0.06 + rand(i, 34) * 0.07} />
      ))}
      {/* efflorescence streaks + a damp patch (texture, storytelling neglect) */}
      {Array.from({ length: 7 }).map((_, i) => (
        <polygon key={`s${i}`} points={wallQuad(cam, -2.9 + rand(i, 8) * 5.6, -2.75 + rand(i, 8) * 5.6, 0.4, BS.ceil - 0.5, BS.zBack)} fill="#cfc9ba" opacity={0.1 + rand(i, 9) * 0.08} />
      ))}
      <polygon points={wallQuad(cam, 1.4, 2.9, 0, 0.9, BS.zBack)} fill="#4b4238" opacity={0.35} />
      {/* base grime */}
      <polygon points={wallQuad(cam, BS.x0, BS.x1, 0, 0.18, BS.zBack)} fill="#3a332b" opacity={0.5} />
      {/* side walls */}
      <polygon points={sideQuad(cam, BS.x0, zn, BS.zBack, 0, BS.ceil)} fill="url(#bsside)" />
      <polygon points={sideQuad(cam, BS.x1, zn, BS.zBack, 0, BS.ceil)} fill="url(#bsside)" opacity={0.92} />
      {Array.from({ length: 11 }).map((_, r) => (
        <g key={`sr${r}`}>
          <polygon points={sideQuad(cam, BS.x0, zn, BS.zBack, r * 0.215, r * 0.215 + 0.012)} fill="#332e27" opacity={0.22} />
          <polygon points={sideQuad(cam, BS.x1, zn, BS.zBack, r * 0.215, r * 0.215 + 0.012)} fill="#332e27" opacity={0.2} />
        </g>
      ))}
      {/* ceiling: dark plane + exposed joists running toward camera */}
      <polygon points={flatQuad(cam, BS.x0, BS.x1, zn, BS.zBack, BS.ceil)} fill="#2b251e" />
      {Array.from({ length: 11 }).map((_, i) => {
        const jx = BS.x0 + 0.4 + i * 0.62;
        if (holeX && jx > holeX[0] - 0.1 && jx < holeX[1]) return null;
        return (
          <g key={`j${i}`}>
            <polygon points={qOf(cam, [[jx, BS.ceil, zn], [jx, BS.ceil, BS.zBack], [jx, BS.ceil - 0.18, BS.zBack], [jx, BS.ceil - 0.18, zn]])} fill={i % 2 ? BS.joist : "#544838"} />
            <polygon points={qOf(cam, [[jx + 0.09, BS.ceil, zn], [jx + 0.09, BS.ceil, BS.zBack], [jx + 0.09, BS.ceil - 0.18, BS.zBack], [jx + 0.09, BS.ceil - 0.18, zn]])} fill="#332c24" opacity={0.55} />
          </g>
        );
      })}
      {/* stairwell opening: the ceiling is cut away over the stairs, warm kitchen light beyond */}
      {holeX && (
        <g>
          <polygon points={qOf(cam, [[holeX[0], BS.ceil, 3.9], [holeX[1], BS.ceil, 3.9], [holeX[1], BS.ceil, BS.zBack], [holeX[0], BS.ceil, BS.zBack]])} fill="#1d1811" />
          <polygon points={qOf(cam, [[holeX[0], BS.ceil, 3.9], [holeX[0], BS.ceil - 0.16, 3.9], [holeX[1], BS.ceil - 0.16, 3.9], [holeX[1], BS.ceil, 3.9]])} fill="#4a3a26" />
        </g>
      )}
      {/* ducts + pipes along the ceiling (mid layer) */}
      <polygon points={qOf(cam, [[-3.4, BS.ceil - 0.21, 6.1], [-0.2, BS.ceil - 0.23, 6.1], [-0.2, BS.ceil - 0.4, 6.1], [-3.4, BS.ceil - 0.38, 6.1]])} fill="#7c828a" />
      <polygon points={qOf(cam, [[-3.4, BS.ceil - 0.31, 6.1], [-0.2, BS.ceil - 0.33, 6.1], [-0.2, BS.ceil - 0.4, 6.1], [-3.4, BS.ceil - 0.38, 6.1]])} fill="#4f555c" />
      <polygon points={qOf(cam, [[2.2, BS.ceil - 0.24, 4.2], [3.4, BS.ceil - 0.22, 4.2], [3.4, BS.ceil - 0.36, 4.2], [2.2, BS.ceil - 0.38, 4.2]])} fill="#7d6a52" />
      {/* high window (daylight, cool) at back-left + shaft of light into the dust */}
      <polygon points={wallQuad(cam, -2.75, -1.75, 1.62, 2.16, BS.zBack - 0.01)} fill="#20262b" />
      <polygon points={wallQuad(cam, -2.7, -1.8, 1.66, 2.12, BS.zBack - 0.02)} fill="#cfe4f6" opacity={0.55 + shaft * 0.4} />
      <polygon points={wallQuad(cam, -2.28, -2.22, 1.66, 2.12, BS.zBack - 0.03)} fill="#22303a" opacity={0.8} />
      <polygon points={wallQuad(cam, -2.7, -1.8, 1.86, 1.9, BS.zBack - 0.03)} fill="#22303a" opacity={0.6} />
      {(() => {
        // volumetric shaft: a wedge from the window down to the floor
        const a = project(cam, -2.72, 1.64, BS.zBack - 0.05), b = project(cam, -1.78, 1.64, BS.zBack - 0.05);
        const c = project(cam, -2.05, 0, 5.3), d = project(cam, -0.55, 0, 5.3);
        return (
          <g opacity={0.1 + 0.12 * shaft}>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${d.x},${d.y} ${c.x},${c.y}`} fill="#cfe4f6" />
            <polygon points={flatDisc(cam, -1.3, 5.35, 1.25, 0.004, 20, 0.2, 7)} fill="#dfeaf4" opacity={0.3} />
          </g>
        );
      })()}
      {/* bulb on a cord, centre of the room: key light */}
      <Card cam={cam} x={0.15} y={BS.ceil} z={3.2}>
        <path d={`M0,0 q${0.04 * Math.sin(f * 0.011)},0.35 0,0.72`} stroke="#151210" strokeWidth={0.012} fill="none" />
        <ellipse cx={0} cy={0.76} rx={0.045} ry={0.06} fill="#f7f2dc" opacity={0.95 * shine} />
        <ellipse cx={0} cy={0.76} rx={0.11} ry={0.12} fill="url(#glowW)" opacity={0.55 * shine} />
      </Card>
      {/* floor pool under the bulb */}
      <polygon points={flatDisc(cam, 0.15, 3.2, 1.9, 0.005, 26, 0.1, 3)} fill="#ffdfa8" opacity={0.1 * shine * bulb} />
      {/* warm spill at the top of the stairs (kitchen light) */}
      <polygon points={flatQuad(cam, -2.9, -1.7, 5.9, BS.zBack, 0.006)} fill="#ffcf8a" opacity={0.14} />
      {cam.z < 2 && <Dust f={f} cam={cam} n={30} seed={11} color="#f4ecdc" z0={2.2} z1={7} x0={-2.6} x1={2.4} h={1.7} />}
    </g>
  );
};

/* ─────────────────────────── staircase (up to the kitchen) ─────────────────────────── */
/** Solid stepped staircase: risers + treads + near-side stringer, drawn with projected quads. */
export const Stairs: React.FC<{ cam: Cam; x0?: number; z0?: number; rise?: number; steps?: number; run?: number; width?: number }> = ({ cam, x0 = -3.05, z0 = 4.1, rise = 2.34, steps = 12, run = 0.27, width = 1.25 }) => {
  const dy = rise / steps;
  const zTop = z0 + steps * run;
  const P = (x: number, y: number, z: number) => { const q = project(cam, x, y, z); return `${q.x.toFixed(1)},${q.y.toFixed(1)}`; };
  const yq = (x: number, z: number, y0: number, y1: number) => `${P(x, y0, z)} ${P(x + width, y0, z)} ${P(x + width, y1, z)} ${P(x, y1, z)}`;
  const top = (x: number, z: number, y: number, d: number) => `${P(x, y, z)} ${P(x + width, y, z)} ${P(x + width, y, z + d)} ${P(x, y, z + d)}`;
  return (
    <g>
      {/* near-side stringer: a solid diagonal panel so it reads as a staircase */}
      <polygon points={`${P(x0, 0, z0 - 0.03)} ${P(x0, rise, zTop)} ${P(x0, 0, zTop)}`} fill="#4e3927" stroke="#221912" strokeWidth={1.5} strokeLinejoin="round" />
      <polygon points={`${P(x0, 0.05, z0)} ${P(x0, rise * (zTop - z0 + 0.02) / (zTop - z0), zTop - 0.03)} ${P(x0, 0.24, z0)}`} fill="#6b4f33" opacity={0.8} />
      {/* risers + treads */}
      {Array.from({ length: steps }).map((_, i) => {
        const y0 = i * dy, y1 = (i + 1) * dy, z = z0 + i * run;
        return (
          <g key={i}>
            <polygon points={yq(x0, z, y0, y1)} fill={i % 2 ? "#8a6a44" : "#7f6038"} stroke="#2a2016" strokeWidth={0.6} />
            <polygon points={top(x0, z, y1, run)} fill={i % 2 ? "#b08a55" : "#a37e4b"} stroke="#2a2016" strokeWidth={0.6} />
            <polygon points={top(x0, z + run - 0.05, y1, 0.05)} fill="#d8b47a" opacity={0.5} />
            <polygon points={`${P(x0, y1, z)} ${P(x0, y1, z + 0.03)} ${P(x0, y1 - 0.05, z + 0.03)} ${P(x0, y1 - 0.05, z)}`} fill="#3a2a1b" opacity={0.5} />
          </g>
        );
      })}
      {/* handrail on the near side */}
      <polygon points={`${P(x0, 0.9, z0 + 0.2)} ${P(x0, 1.0, z0 + 0.2)} ${P(x0, rise + 1.0, zTop - 0.3)} ${P(x0, rise + 0.9, zTop - 0.3)}`} fill="#6b4f2f" stroke="#221912" strokeWidth={0.8} />
      {[0, 3, 6, 9, 11].map((i) => (
        <polygon key={`b${i}`} points={`${P(x0, (i + 1) * dy, z0 + i * run)} ${P(x0, (i + 1) * dy + 0.9, z0 + i * run)} ${P(x0 + 0.05, (i + 1) * dy + 0.9, z0 + i * run)} ${P(x0 + 0.05, (i + 1) * dy, z0 + i * run)}`} fill="#57402a" opacity={0.85} />
      ))}
    </g>
  );
};

/* ─────────────────────────── the post the prisoner is chained to ─────────────────────────── */
export const Post: React.FC<{ cam: Cam; x: number; z: number; h?: number; r?: number }> = ({ cam, x, z, h = BS.ceil, r = 0.055 }) => (
  <Card cam={cam} x={x} z={z}>
    {/* base plate */}
    <ellipse cx={0} cy={0} rx={r * 3.2} ry={r * 1.1} fill="#3d3a34" />
    <rect x={-r * 2.6} y={-0.05} width={r * 5.2} height={0.05} fill="#4e5157" stroke={BS.ol} strokeWidth={0.008} />
    {/* column */}
    <rect x={-r} y={-h} width={r * 2} height={h} fill="url(#postSteel)" stroke={BS.ol} strokeWidth={0.01} />
    <defs>
      <linearGradient id="postSteel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4d555c" /><stop offset="0.28" stopColor="#a9b6bf" />
        <stop offset="0.55" stopColor="#7e8b94" /><stop offset="0.82" stopColor="#565f67" /><stop offset="1" stopColor="#333a40" />
      </linearGradient>
    </defs>
    {/* rust + paint chips */}
    {[0.3, 0.9, 1.5, 1.9].map((y, i) => <rect key={i} x={-r * 0.8 + rand(i, 5) * r} y={-y} width={r * 0.5} height={0.05 + rand(i, 6) * 0.08} fill="#7a4326" opacity={0.5} />)}
  </Card>
);

/* ─────────────────────────── clutter: heater, furnace, shelves, boxes, pools ─────────────────────────── */
export const WaterHeater: React.FC<{ cam: Cam; x: number; z: number; r?: number; h?: number }> = ({ cam, x, z, r = 0.28, h = 1.45 }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={r * 1.15} ry={r * 0.34} fill="#151210" opacity={0.55} />
    <path d={`M${-r},0 L${-r},${-h} A${r},${r * 0.3} 0 0 1 ${r},${-h} L${r},0 A${r},${r * 0.3} 0 0 1 ${-r},0 Z`} fill="url(#whSteel)" stroke={BS.ol} strokeWidth={0.012} />
    <defs><linearGradient id="whSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8b8b84" /><stop offset="0.3" stopColor="#dedad0" /><stop offset="0.7" stopColor="#b6b2a8" /><stop offset="1" stopColor="#6d6c66" /></linearGradient></defs>
    <ellipse cx={0} cy={-h} rx={r} ry={r * 0.3} fill="#c9c5bb" stroke={BS.ol} strokeWidth={0.01} />
    <path d={`M-0.06,${-h} L-0.06,${-h - 0.55} M0.06,${-h} L0.06,${-h - 0.4}`} stroke="#9aa0a4" strokeWidth={0.035} />
    <rect x={-0.14} y={-0.62} width={0.28} height={0.14} rx={0.02} fill="#d8d4c9" stroke={BS.ol} strokeWidth={0.008} />
    <circle cx={0} cy={-0.3} r={0.035} fill="#c0392b" opacity={0.8} />
    <path d={`M${-r * 0.3},${-h * 0.75} L${-r * 0.28},${-h * 0.1}`} stroke="#f4f1e8" strokeWidth={0.02} opacity={0.35} />
    {rand(1, 9) > 0 && <rect x={-r * 0.7} y={-0.5} width={0.1} height={0.16} fill="#c9a24a" opacity={0.7} />}
  </Card>
);

export const Furnace: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={0.62} ry={0.2} fill="#151210" opacity={0.5} />
    <rect x={-0.5} y={-1.2} width={1} height={1.2} rx={0.04} fill="#7c7f80" stroke={BS.ol} strokeWidth={0.014} />
    <rect x={-0.44} y={-1.14} width={0.88} height={0.5} fill="#6a6d6e" />
    <rect x={-0.2} y={-0.5} width={0.4} height={0.3} rx={0.02} fill="#3b3f42" />
    <circle cx={-0.3} cy={-0.32} r={0.05} fill="#b8452f" opacity={0.75} />
    <path d="M-0.45,-1.2 L-0.45,-1.9 h0.9 L0.45,-1.2" fill="#9a9d9c" stroke={BS.ol} strokeWidth={0.012} />
    <rect x={-0.1} y={-0.9} width={0.2} height={0.06} fill="#d9d5c8" opacity={0.7} />
  </Card>
);

export const Shelves: React.FC<{ cam: Cam; x: number; z: number; w?: number; h?: number; seed?: number }> = ({ cam, x, z, w = 1.5, h = 1.7, seed = 1 }) => (
  <Card cam={cam} x={x} z={z}>
    {/* open steel shelving with paint cans, jars, boxes */}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-w / 2} y={-0.12 - i * (h / 4)} width={w} height={0.035} fill="#6f6a60" stroke={BS.ol} strokeWidth={0.008} />)}
    {[-w / 3, 0, w / 3].map((sx, i) => <rect key={`v${i}`} x={sx - 0.018} y={-h} width={0.036} height={h} fill="#514c44" />)}
    {Array.from({ length: 14 }).map((_, i) => {
      const row = i % 4, left = rand(i, seed) > 0.5;
      const cx = (left ? -w * 0.3 : w * 0.16) + rand(i, seed + 1) * 0.14;
      const y = -0.12 - row * (h / 4);
      const kind = Math.floor(rand(i, seed + 2) * 3);
      return kind === 0 ? (
        <g key={i}><rect x={cx} y={y - 0.2} width={0.17} height={0.2} fill="#b9b2a2" stroke={BS.ol} strokeWidth={0.007} /><rect x={cx + 0.02} y={y - 0.19} width={0.13} height={0.03} fill={["#8c3b2c", "#3b5a8c", "#5f7a3b"][i % 3]} opacity={0.85} /></g>
      ) : kind === 1 ? (
        <g key={i}><rect x={cx} y={y - 0.26} width={0.24} height={0.26} fill="#a98a5e" stroke={BS.ol} strokeWidth={0.007} /><path d={`M${cx},${y - 0.2} L${cx + 0.24},${y - 0.2}`} stroke="#8a6f49" strokeWidth={0.012} /></g>
      ) : (
        <g key={i}><rect x={cx} y={y - 0.15} width={0.12} height={0.15} rx={0.01} fill="#cdd7cc" opacity={0.8} stroke={BS.ol} strokeWidth={0.006} /><rect x={cx + 0.02} y={y - 0.13} width={0.08} height={0.06} fill="#7d9a6a" opacity={0.7} /></g>
      );
    })}
  </Card>
);

export const CardboardBox: React.FC<{ cam: Cam; x: number; z: number; w?: number; h?: number; d?: number; rot?: number; seed?: number }> = ({ cam, x, z, w = 0.5, h = 0.42, d = 0.4, rot = 0, seed = 2 }) => (
  <Card cam={cam} x={x} z={z}>
    <g transform={`rotate(${rot})`}>
      <ellipse cx={0} cy={0} rx={w * 0.62} ry={0.06} fill="#151210" opacity={0.45} />
      <path d={`M${-w / 2},0 L${-w / 2},${-h} L${w / 2},${-h} L${w / 2},0 Z`} fill="#b19062" stroke={BS.ol} strokeWidth={0.01} />
      <path d={`M${-w * 0.5},${-h} L${-w * 0.5 + d * 0.4},${-h - d * 0.35} L${w * 0.5 + d * 0.4},${-h - d * 0.35} L${w * 0.5},${-h} Z`} fill="#c3a273" stroke={BS.ol} strokeWidth={0.01} />
      <path d={`M${w / 2},${-h} L${w / 2 + d * 0.4},${-h - d * 0.35} L${w / 2 + d * 0.4},${-d * 0.35} L${w / 2},0 Z`} fill="#8f7349" stroke={BS.ol} strokeWidth={0.01} />
      <path d={`M0,${-h} L0,0`} stroke="#8f7349" strokeWidth={0.03} opacity={0.7} />
      <rect x={-w * 0.3} y={-h * 0.62} width={w * 0.3} height={h * 0.16} fill="#e6dcc6" opacity={0.8} transform={`rotate(${-4 + rand(seed, 3) * 8})`} />
    </g>
  </Card>
);

export const FoldingChair: React.FC<{ cam: Cam; x: number; z: number; rot?: number; occupied?: number }> = ({ cam, x, z, rot = 0 }) => (
  <Card cam={cam} x={x} z={z}>
    <g transform={`rotate(${rot})`}>
      <ellipse cx={0} cy={0} rx={0.34} ry={0.07} fill="#151210" opacity={0.45} />
      {/* legs */}
      <path d="M-0.22,0 L-0.14,-0.44 M0.22,0 L0.14,-0.44" stroke="#7b8288" strokeWidth={0.028} />
      <path d="M-0.2,-0.02 L-0.06,-0.46 M0.2,-0.02 L0.06,-0.46" stroke="#565d63" strokeWidth={0.024} />
      {/* seat */}
      <path d="M-0.2,-0.44 L0.2,-0.44 L0.18,-0.48 L-0.18,-0.48 Z" fill="#4d5a63" stroke={BS.ol} strokeWidth={0.01} />
      {/* back rest */}
      <path d="M-0.19,-0.48 L-0.17,-0.92 L0.17,-0.92 L0.19,-0.48 Z" fill="#5f6e78" stroke={BS.ol} strokeWidth={0.01} />
      <path d={`M-0.16,-0.62 L0.16,-0.62 M-0.16,-0.76 L0.16,-0.76`} stroke="#3d4850" strokeWidth={0.012} />
    </g>
  </Card>
);

/** the plastic wading pools they washed the mess off in — stained, crumpled rims (storytelling prop) */
export const PlasticPool: React.FC<{ cam: Cam; x: number; z: number; r?: number; seed?: number; stained?: number }> = ({ cam, x, z, r = 0.55, seed = 1, stained = 0.6 }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={r * 1.05} ry={r * 0.3} fill="#151210" opacity={0.4} />
    <ellipse cx={0} cy={-0.05} rx={r} ry={r * 0.29} fill="#cfd8d4" opacity={0.85} />
    <ellipse cx={0} cy={-0.05} rx={r * 0.86} ry={r * 0.24} fill="#9fb0ac" opacity={0.7} />
    <ellipse cx={0} cy={-0.06} rx={r * 0.6} ry={r * 0.16} fill="#7d3a2c" opacity={0.3 * stained} />
    <path d={`M${-r},-0.05 A${r},${r * 0.29} 0 0 0 ${r},-0.05`} stroke="#eef3f0" strokeWidth={0.035} opacity={0.7} />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-r * 0.7 + i * r * 0.34},${0.02} q${0.03},${-0.04} ${0.07},${0.0}`} stroke="#8b9894" strokeWidth={0.01} fill="none" opacity={0.6} />)}
  </Card>
);

/** the bucket that serves as a toilet, with a roll of paper (grim, but it sells the situation) */
export const Bucket: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0} cy={0} rx={0.19} ry={0.06} fill="#151210" opacity={0.45} />
    <path d="M-0.16,0 L-0.19,-0.34 L0.19,-0.34 L0.16,0 Z" fill="#5c6a72" stroke={BS.ol} strokeWidth={0.008} />
    <ellipse cx={0} cy={-0.34} rx={0.19} ry={0.055} fill="#3a454c" stroke={BS.ol} strokeWidth={0.008} />
    <ellipse cx={0} cy={-0.33} rx={0.15} ry={0.04} fill="#2b3338" />
    <path d="M0.2,-0.12 q0.06,0.05 0,0.12" stroke="#c8cdc9" strokeWidth={0.05} fill="none" />
  </Card>
);

/** dried blood / water stain on the slab, drawn flat */
export const FloorStain: React.FC<{ cam: Cam; x: number; z: number; r?: number; color?: string; o?: number; seed?: number }> = ({ cam, x, z, r = 0.4, color = "#5e2a20", o = 0.35, seed = 1 }) => (
  <polygon points={flatDisc(cam, x, z, r, 0.004, 18, 0.42, seed)} fill={color} opacity={o} />
);
