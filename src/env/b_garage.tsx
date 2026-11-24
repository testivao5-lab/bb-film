// Batch B · kit for the GARAGE scenes (36 tuco-desk, 37 itemised, 38 boom).
// Tuco's front room: a plastered back-of-shop room with a roll-up door, one desk, hard overhead light.
// Original design; unbranded. All in world metres (1 unit = 1 m).
import React from "react";
import { Cam, Card, project } from "../lib/camera";
import { lerp, rand, noise1, clamp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad, flatDisc, qOf, Puff, Dust } from "./b_common";

export const GX = { x0: -5.2, x1: 5.2, zBack: 6.4, zFront: -1.6, ceil: 3.0 };

export const GT = {
  wall: "#b9ad96", wallDark: "#8e8371", wallLight: "#d6cbb4", kick: "#6f6555",
  floor: "#6d6257", floor2: "#7d7266", ol: "#2a241d",
  steel: "#8c949b", rust: "#8a5a3c", rustDark: "#5e3a26",
  wood: "#7a5a3c", woodDark: "#4c3724", woodLight: "#a17c55",
  shade: "#c9c2ae",
};

/** the room shell: back wall, side walls, roll-up door, ceiling rigs, floor. */
export const GarageRoom: React.FC<{ cam: Cam; f: number; light?: number }> = ({ cam, f, light = 1 }) => {
  const { x0, x1, zBack, zFront, ceil } = GX;
  return (
    <g>
      {/* ceiling: a dark plane so the top of frame never goes empty */}
      <polygon points={qOf(cam, [[x0, ceil, zFront], [x1, ceil, zFront], [x1, ceil, zBack], [x0, ceil, zBack]])} fill="#3a352d" />
      <polygon points={qOf(cam, [[x0, ceil, zFront], [x1, ceil, zFront], [x1, ceil - 0.02, zFront], [x0, ceil - 0.02, zFront]])} fill="#24211b" />
      {/* floor */}
      <polygon points={flatQuad(cam, x0, x1, zFront, zBack, 0)} fill={GT.floor} />
      {Array.from({ length: 9 }).map((_, i) => {
        const zz = zFront + 0.6 + i * 0.85;
        return <polygon key={i} points={flatQuad(cam, x0, x1, zz, zz + 0.42, 0.004)} fill={GT.floor2} opacity={0.5} />;
      })}
      {/* oil stain + a taped-out patch on the concrete */}
      <polygon points={flatDisc(cam, 1.4, 3.2, 0.85, 0.006, 22, 0.2, 3)} fill="#4c443a" opacity={0.35} />
      <polygon points={flatDisc(cam, -2.2, 4.4, 0.5, 0.006, 20, 0.25, 8)} fill="#4c443a" opacity={0.22} />
      {/* back wall */}
      <polygon points={wallQuad(cam, x0, x1, 0, ceil, zBack)} fill={GT.wall} stroke={GT.ol} strokeWidth={0.05} />
      <polygon points={wallQuad(cam, x0, x1, 0, 0.34, zBack + 0.01)} fill={GT.kick} />
      <polygon points={wallQuad(cam, x0, x1, ceil - 0.5, ceil, zBack + 0.01)} fill={GT.wallDark} opacity={0.5} />
      {/* patchy plaster + damp blotches (no tile courses — keep it plaster) */}
      {Array.from({ length: 7 }).map((_, i) => {
        const bx = x0 + 0.7 + rand(i, 5) * (x1 - x0 - 1.4);
        const by = 0.5 + rand(i, 6) * (ceil - 1.2);
        return <polygon key={i} points={flatDisc(cam, bx, zBack - 0.002, 0, 0, 0, 0, 0)} fill="none" />;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const bx = x0 + 0.9 + rand(i, 15) * (x1 - x0 - 1.8);
        const by = 1.0 + rand(i, 16) * 1.4;
        const p = project(cam, bx, by, zBack - 0.01);
        return <ellipse key={i} cx={p.x} cy={p.y} rx={0.36 * p.s} ry={0.22 * p.s} fill={GT.wallDark} opacity={0.18} />;
      })}
      {/* roll-up door on the right of the back wall */}
      <polygon points={wallQuad(cam, 1.6, 4.6, 0, 2.6, zBack + 0.02)} fill={GT.steel} stroke={GT.ol} strokeWidth={0.05} />
      {Array.from({ length: 9 }).map((_, i) => (
        <polygon key={i} points={wallQuad(cam, 1.62, 4.58, 0.18 + i * 0.27, 0.24 + i * 0.27, zBack + 0.03)} fill="#6f777e" opacity={0.5} />
      ))}
      <polygon points={wallQuad(cam, 1.6, 4.6, 2.6, 2.86, zBack + 0.03)} fill={GT.rustDark} />
      {/* hanging cage lamp over the desk */}
      <g>
        <line x1={project(cam, -0.4, ceil, 4.6).x} y1={project(cam, -0.4, ceil, 4.6).y} x2={project(cam, -0.4, 2.32, 4.6).x} y2={project(cam, -0.4, 2.32, 4.6).y} stroke="#3a3630" strokeWidth={2} />
        <polygon points={qOf(cam, [[-0.72, 2.3, 4.6], [0.72, 2.3, 4.6], [0.72, 1.98, 4.6], [-0.72, 1.98, 4.6]])} fill="#4a4640" stroke={GT.ol} strokeWidth={0.03} />
        <polygon points={qOf(cam, [[-0.66, 2.02, 4.6], [0.66, 2.02, 4.6], [0.66, 1.98, 4.6], [-0.66, 1.98, 4.6]])} fill="#ffe4a8" opacity={0.9 * light} />
      </g>
      {/* left side wall close to camera = near layer, in shadow */}
      <polygon points={sideQuad(cam, x0, zFront, zBack, 0, ceil)} fill={GT.wallDark} />
      <polygon points={sideQuad(cam, x0, zFront, zBack, 0, 0.34)} fill="#4e463b" />
      {/* shelf on the left wall: paint tins, a coil of hose, cardboard boxes */}
      <Card cam={cam} x={x0 + 0.16} z={2.4}>
        <rect x={0} y={-1.5} width={-0.36} height={0.06} fill={GT.woodDark} />
        {[-0.3, -0.05, 0.2].map((o, i) => (
          <g key={i} transform={`translate(${o},-1.5)`}>
            <rect x={-0.09} y={-0.24} width={0.18} height={0.24} fill={i === 1 ? "#7a8a6a" : GT.rust} stroke={GT.ol} strokeWidth={0.008} />
            <rect x={-0.09} y={-0.27} width={0.18} height={0.04} fill="#c8c0aa" />
          </g>
        ))}
        <circle cx={0.42} cy={-1.64} r={0.16} fill="none" stroke="#2f2f2a" strokeWidth={0.05} />
        <rect x={-0.62} y={-2.0} width={0.34} height={0.3} fill="#a89070" stroke={GT.ol} strokeWidth={0.01} />
      </Card>
      {/* dust in the light */}
      <Dust cam={cam} f={f} n={26} x0={-3} x1={3} z0={2} z1={5.6} h={2.2} seed={4} color="#ffe9c0" />
    </g>
  );
};

/** the desk: heavy salvaged table, 1.9 × 0.9 m, top at 0.78 m. Returns nothing but geometry. */
export const Desk: React.FC<{ cam: Cam; x: number; z: number; w?: number; d?: number }> = ({ cam, x, z, w = 1.9, d = 0.9 }) => {
  const h = 0.78, x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2;
  return (
    <g>
      <polygon points={flatQuad(cam, x0 - 0.1, x1 + 0.1, z0 - 0.2, z1 + 0.1, 0.004)} fill="#3f382e" opacity={0.4} />
      {/* legs */}
      {[[x0 + 0.08, z0 + 0.08], [x1 - 0.08, z0 + 0.08], [x0 + 0.08, z1 - 0.08], [x1 - 0.08, z1 - 0.08]].map(([lx, lz], i) => {
        const b = project(cam, lx, 0, lz);
        return <rect key={i} x={b.x - 0.045 * b.s} y={project(cam, lx, h, lz).y} width={0.09 * b.s} height={b.y - project(cam, lx, h, lz).y} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.6} />;
      })}
      {/* top: front edge + surface */}
      <polygon points={qOf(cam, [[x0, h, z1], [x1, h, z1], [x1, h, z0], [x0, h, z0]])} fill={GT.wood} stroke={GT.ol} strokeWidth={0.04} />
      <polygon points={qOf(cam, [[x0, h, z1], [x1, h, z1], [x1, h - 0.07, z1 + 0.02], [x0, h - 0.07, z1 + 0.02]])} fill={GT.woodDark} />
      {/* grain + scuffs */}
      {[0.16, 0.4, 0.62, 0.84].map((o, i) => (
        <polygon key={i} points={qOf(cam, [[x0 + 0.1, h + 0.001, z0 + d * o], [x1 - 0.1, h + 0.001, z0 + d * (o + 0.03)], [x1 - 0.1, h + 0.001, z0 + d * (o + 0.01)], [x0 + 0.1, h + 0.001, z0 + d * o]])} fill={GT.woodLight} opacity={0.28} />
      ))}
      {/* a drawer front and a drawer pull */}
      <polygon points={wallQuad(cam, x0 + 0.2, x0 + 0.9, h - 0.34, h - 0.08, z1 + 0.01)} fill={GT.woodLight} opacity={0.6} />
      <rect x={project(cam, x0 + 0.5, h - 0.21, z1).x} y={project(cam, x0 + 0.5, h - 0.21, z1).y} width={0.12 * project(cam, x0 + 0.5, 0, z1).s} height={3} fill="#3a3227" />
    </g>
  );
};

/** desk dressing: phone, ashtray, bottle, coin tray, paper stack. Drawn as a world-space group. */
export const DeskKit: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <g>
    <Card cam={cam} x={x + 0.72} z={z + 0.12}>
      <ellipse cx={0} cy={0.01} rx={0.16} ry={0.04} fill="#000" opacity={0.22} />
      <rect x={-0.13} y={-0.05} width={0.26} height={0.09} rx={0.01} fill="#3e3a34" stroke={GT.ol} strokeWidth={0.006} />
      <rect x={-0.14} y={-0.1} width={0.28} height={0.06} rx={0.02} fill="#57514a" stroke={GT.ol} strokeWidth={0.006} />
      <circle cx={0.1} cy={-0.07} r={0.012} fill="#d8cfa8" opacity={0.6} />
      <path d="M-0.13,-0.05 q-0.1,0.02 -0.12,0.1" stroke="#2f2b26" strokeWidth={0.014} fill="none" />
    </Card>
    <Card cam={cam} x={x - 0.6} z={z + 0.24}>
      <ellipse cx={0} cy={0.006} rx={0.075} ry={0.022} fill="none" stroke="#6e6a5e" strokeWidth={0.006} />
      <ellipse cx={0} cy={0.006} rx={0.06} ry={0.017} fill="#2c2823" />
      <circle cx={-0.02} cy={0.004} r={0.012} fill="#d8d2c0" opacity={0.25} />
      <path d="M0.02,0.0 q0.05,-0.03 0.09,0.01" stroke="#cfc6b2" strokeWidth={0.008} fill="none" opacity={0.8} />
    </Card>
    <Card cam={cam} x={x - 0.88} z={z - 0.1}>
      <ellipse cx={0} cy={0.008} rx={0.05} ry={0.016} fill="#000" opacity={0.24} />
      <path d="M-0.035,0 L-0.03,-0.22 L0.03,-0.22 L0.035,0 Z" fill="#4f6a52" stroke={GT.ol} strokeWidth={0.005} />
      <rect x={-0.016} y={-0.3} width={0.032} height={0.09} fill="#4f6a52" stroke={GT.ol} strokeWidth={0.005} />
      <rect x={-0.018} y={-0.31} width={0.036} height={0.02} fill="#b8a06a" />
    </Card>
    <Card cam={cam} x={x + 0.3} z={z + 0.34}>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-0.05 + i * 0.004} y={-0.004 - i * 0.004} width={0.5} height={0.11} fill={i % 2 ? "#e6dfcc" : "#f2ecdc"} stroke="#a9a294" strokeWidth={0.004} transform="rotate(-2)" />)}
    </Card>
  </g>
);

/** heavy kitchen-style table in the middle of the room, for the ledger/bag scenes */
export const Bench: React.FC<{ cam: Cam; x: number; z: number; w?: number; d?: number; h?: number }> = ({ cam, x, z, w = 1.6, d = 0.8, h = 0.74 }) => (
  <Desk cam={cam} x={x} z={z} w={w} d={d} />
);

/** plain wooden chair under a seated figure (draw BEFORE the figure, and before the desk) */
export const Chair: React.FC<{ cam: Cam; x: number; z: number; s?: number }> = ({ cam, x, z, s = 1 }) => (
  <g>
    {[[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].map(([lx, lz], i) => {
      const b = project(cam, x + lx, 0, z + lz), t = project(cam, x + lx, 0.46, z + lz);
      return <rect key={i} x={t.x - 0.022 * b.s} y={t.y} width={0.044 * b.s} height={Math.max(1, b.y - t.y)} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.5} />;
    })}
    <polygon points={qOf(cam, [[x - 0.23, 0.46, z + 0.2], [x + 0.23, 0.46, z + 0.2], [x + 0.23, 0.46, z - 0.2], [x - 0.23, 0.46, z - 0.2]])} fill={GT.wood} stroke={GT.ol} strokeWidth={0.03} />
    <polygon points={qOf(cam, [[x - 0.23, 0.9, z - 0.2], [x + 0.23, 0.9, z - 0.2], [x + 0.23, 0.46, z - 0.2], [x - 0.23, 0.46, z - 0.2]])} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.03} />
    <polygon points={qOf(cam, [[x - 0.18, 0.78, z - 0.19], [x + 0.18, 0.78, z - 0.19], [x + 0.18, 0.72, z - 0.19], [x - 0.18, 0.72, z - 0.19]])} fill={GT.woodLight} opacity={0.5} />
  </g>
);

/** a two-pane shop window in the back wall. `burst` 0..1 = intact → blown out (glass gone, frame bent) */
export const GarageWindow: React.FC<{ cam: Cam; x: number; w?: number; burst?: number }> = ({ cam, x, w = 2.1, burst = 0 }) => {
  const y0 = 0.95, y1 = 2.25, z = GX.zBack + 0.03;
  return (
    <g>
      <polygon points={wallQuad(cam, x - w / 2 - 0.08, x + w / 2 + 0.08, y0 - 0.08, y1 + 0.08, z)} fill="#5a5147" stroke={GT.ol} strokeWidth={0.04} />
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, y0, y1, z + 0.01)} fill="#1d2732" />
      {/* glass, gone after the burst */}
      <polygon points={wallQuad(cam, x - w / 2 + 0.02, x + w / 2 - 0.02, y0 + 0.02, y1 - 0.02, z + 0.02)} fill="#9fb6bd" opacity={0.5 * (1 - burst)} />
      <polygon points={wallQuad(cam, x - w / 2 + 0.1, x - w / 2 + 0.6, y1 - 0.7, y1 - 0.06, z + 0.03)} fill="#d8e6e6" opacity={0.35 * (1 - burst)} />
      {/* mullion, bent after */}
      <polygon points={wallQuad(cam, x - 0.03 + 0.12 * burst, x + 0.03 + 0.12 * burst, y0, y1, z + 0.03)} fill="#6f665a" />
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, y0 + (y1 - y0) * 0.52, y0 + (y1 - y0) * 0.52 + 0.05, z + 0.03)} fill="#6f665a" />
      {/* blown-out shards in the air (deterministic) */}
      {burst > 0.05 && Array.from({ length: 11 }).map((_, i) => {
        const t = Math.min(1, burst * 1.6);
        const px = x - w / 2 + rand(i, 21) * w + (rand(i, 22) - 0.5) * 2.2 * t;
        const py = y0 + rand(i, 23) * (y1 - y0) + 0.5 * t * (0.4 + rand(i, 24)) - 0.9 * t * t;
        const p = project(cam, px, Math.max(0.05, py), z - 1.4 * t * (0.4 + rand(i, 25)));
        const len = 0.09 * (0.6 + rand(i, 26)) * p.s;
        return <path key={i} d={`M0,0 L${len},${-len * 0.5} L${len * 0.7},${len * 0.6} Z`} transform={`translate(${p.x},${p.y}) rotate(${rand(i, 27) * 360 + t * 200})`} fill="#cfe0e4" stroke="#8fa2a8" strokeWidth={0.8} opacity={0.9 - 0.5 * burst} />;
      })}
    </g>
  );
};
