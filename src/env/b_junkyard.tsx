// Batch B · kit for the JUNKYARD scenes (40 junkyard-math, 41 eleven).
// Auto wrecking yard outside Albuquerque: desert sky & mesa ridge, multi-tier crushed car stacks,
// lattice crane with electromagnet, packed dirt & tyre ruts, chain-link, salvage shells, near-lens
// scrap silhouettes, and the waiting sedan interior rig. Zero live blur filters.
import React from "react";
import { Cam, Card, project, W, H } from "../lib/camera";
import { lerp, rand, clamp } from "../lib/anim";
import { wallQuad, flatQuad, flatDisc, qOf, Birds } from "./b_common";

export const JX = { x0: -18, x1: 18, zBack: 26 };

export const JT = {
  skyTop: "#7fb4e0",
  skyMid: "#bcd7ec",
  haze: "#e9d8b4",
  mesa: "#b38463",
  mesaShade: "#8f694e",
  dirt: "#cfb288",
  dirt2: "#ba9a70",
  dirtDark: "#8f724f",
  scrub: "#6f7d4f",
  rust: "#985e3d",
  rustDark: "#633b25",
  rustLight: "#b87c56",
  steel: "#8c949b",
  glass: "#92aeb4",
  ol: "#211a14",
};

const CAR_COLS: [string, string][] = [
  ["#985e3d", "#633b25"],
  ["#5f7680", "#3d4e56"],
  ["#8c897d", "#5c5950"],
  ["#9c844c", "#6c5a31"],
  ["#6e4947", "#472d2c"],
  ["#677562", "#434d3f"],
];

/** Desert sky, warm sun halo, clouds, distant mesa silhouette, and circling birds */
export const YardSky: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const horizon = project(cam, 0, 0, 120).y;
  const hy = clamp(horizon, 180, H * 0.72);
  const sun = project(cam, 26, 22, 110);
  return (
    <g>
      <defs>
        <linearGradient id="jSkyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={JT.skyTop} />
          <stop offset="0.58" stopColor={JT.skyMid} />
          <stop offset="1" stopColor={JT.haze} />
        </linearGradient>
        <radialGradient id="jSunG">
          <stop offset="0" stopColor="#fff9de" stopOpacity={0.95} />
          <stop offset="0.3" stopColor="#fff1c9" stopOpacity={0.45} />
          <stop offset="1" stopColor="#ffe6b0" stopOpacity={0} />
        </radialGradient>
        <pattern id="jchain" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={9} height={9} fill="none" stroke="#7d868c" strokeWidth={1.1} />
        </pattern>
      </defs>
      <rect x={0} y={0} width={W} height={H} fill="url(#jSkyG)" />
      <circle cx={sun.x} cy={sun.y} r={240} fill="url(#jSunG)" />
      <circle cx={sun.x} cy={sun.y} r={32} fill="#fff8dc" opacity={0.85} />
      {/* drifting flat desert clouds */}
      {[
        { x: 260, y: hy * 0.28, w: 320, h: 26, sp: 0.12 },
        { x: 920, y: hy * 0.2, w: 420, h: 30, sp: 0.09 },
        { x: 1520, y: hy * 0.34, w: 280, h: 22, sp: 0.14 },
      ].map((c, i) => {
        const cx = ((c.x + f * c.sp) % (W + 500)) - 250;
        return (
          <g key={i} opacity={0.55}>
            <ellipse cx={cx} cy={c.y} rx={c.w * 0.5} ry={c.h * 0.5} fill="#f7f1e1" />
            <ellipse cx={cx - c.w * 0.16} cy={c.y - c.h * 0.28} rx={c.w * 0.3} ry={c.h * 0.44} fill="#fbf7ec" />
          </g>
        );
      })}
      {/* distant Albuquerque mesa line */}
      <path
        d={`M-20,${hy + 12} L120,${hy - 34} L390,${hy - 38} L470,${hy - 14} L760,${hy - 18} L910,${hy - 52} L1260,${hy - 55} L1380,${hy - 22} L1690,${hy - 28} L1940,${hy - 10} L1940,${hy + 40} L-20,${hy + 40} Z`}
        fill={JT.mesa}
        opacity={0.62}
      />
      <path
        d={`M910,${hy - 52} L1050,${hy - 53} L1120,${hy - 20} L910,${hy - 18} Z`}
        fill={JT.mesaShade}
        opacity={0.35}
      />
      <Birds f={f} y={hy * 0.36} n={4} scale={0.9} />
    </g>
  );
};

/** Far layer: multi-tier stacks of crushed cars, lattice electromagnet crane, utility poles & wires */
export const YardBack: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const sway = Math.sin(f * 0.025) * 0.18;
  return (
    <g>
      <polygon points={qOf(cam, [[-70, 8, 85], [70, 8, 85], [70, 0, 85], [-70, 0, 85]])} fill={JT.haze} opacity={0.45} />

      {/* Utility poles & sagging power lines */}
      {[-20, -7, 6, 19].map((px, i) => {
        const b = project(cam, px, 0, 34);
        const t = project(cam, px, 8.2, 34);
        const nx = project(cam, px + 13, 8.0, 34);
        const mid = project(cam, px + 6.5, 7.35, 34);
        return (
          <g key={i}>
            <line x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#5d4f40" strokeWidth={Math.max(1.5, 0.13 * b.s)} />
            <line x1={t.x - 0.55 * t.s} y1={t.y + 0.35 * t.s} x2={t.x + 0.55 * t.s} y2={t.y + 0.35 * t.s} stroke="#5d4f40" strokeWidth={Math.max(1.2, 0.08 * t.s)} />
            {i < 3 && (
              <path d={`M${t.x},${t.y + 0.35 * t.s} Q${mid.x},${mid.y} ${nx.x},${nx.y + 0.35 * nx.s}`} stroke="#433b31" strokeWidth={Math.max(0.9, 0.025 * b.s)} fill="none" opacity={0.65} />
            )}
          </g>
        );
      })}

      {/* Lattice crane boom + suspended scrap electromagnet */}
      {(() => {
        const base = project(cam, 7.5, 0, 29);
        const tip = project(cam, 1.2, 9.2, 26);
        const mag = project(cam, 1.2 + sway, 5.4, 26);
        return (
          <g>
            <line x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke="#555b61" strokeWidth={Math.max(3, 0.34 * base.s)} />
            <line x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke="#8c949c" strokeWidth={Math.max(1.2, 0.09 * base.s)} strokeDasharray="6 5" />
            <line x1={tip.x} y1={tip.y} x2={mag.x} y2={mag.y} stroke="#363b40" strokeWidth={Math.max(1.1, 0.04 * tip.s)} />
            <ellipse cx={mag.x} cy={mag.y} rx={0.62 * mag.s} ry={0.22 * mag.s} fill="#464b50" stroke={JT.ol} strokeWidth={1.1} />
            <rect x={mag.x - 0.55 * mag.s} y={mag.y - 0.26 * mag.s} width={1.1 * mag.s} height={0.24 * mag.s} fill="#676e75" stroke={JT.ol} strokeWidth={1} />
          </g>
        );
      })()}

      {/* Wall of 2-to-3-high crushed car stacks along the back perimeter */}
      {Array.from({ length: 11 }).map((_, i) => {
        const bx = -19 + i * 3.8 + (rand(i, 3) - 0.5) * 0.6;
        const bz = 24 + rand(i, 4) * 3.5;
        const tiers = 2 + (i % 3 === 1 ? 1 : 0);
        return (
          <g key={i}>
            {Array.from({ length: tiers }).map((__, k) => {
              const w = 3.2 - k * 0.14;
              const y0 = k * 0.92;
              const yBody = y0 + 0.56;
              const yCab = y0 + 0.94;
              const [col, dark] = CAR_COLS[(i * 2 + k) % CAR_COLS.length];
              const p = (x: number, y: number) => project(cam, x, y, bz);
              const bl = p(bx - w * 0.5, y0), br = p(bx + w * 0.5, y0);
              const tl = p(bx - w * 0.48, yBody), tr = p(bx + w * 0.48, yBody);
              const cl = p(bx - w * 0.24, yCab), cr = p(bx + w * 0.2, yCab);
              const cbl = p(bx - w * 0.3, yBody), cbr = p(bx + w * 0.28, yBody);
              return (
                <g key={k}>
                  {k === 0 && (
                    <ellipse cx={(bl.x + br.x) * 0.5} cy={bl.y} rx={(br.x - bl.x) * 0.58} ry={0.14 * bl.s} fill="#5c4832" opacity={0.35} />
                  )}
                  <polygon points={`${bl.x},${bl.y} ${br.x},${br.y} ${tr.x},${tr.y} ${tl.x},${tl.y}`} fill={col} stroke={JT.ol} strokeWidth={1.1} />
                  <polygon points={`${cbl.x},${cbl.y} ${cbr.x},${cbr.y} ${cr.x},${cr.y} ${cl.x},${cl.y}`} fill={dark} stroke={JT.ol} strokeWidth={1} />
                  <polygon points={`${bl.x},${bl.y} ${br.x},${br.y} ${br.x},${br.y - 0.12 * br.s} ${bl.x},${bl.y - 0.12 * bl.s}`} fill={dark} opacity={0.5} />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

/** Ground: sunlit packed caliche dirt, tyre ruts, oil stains, gravel, and desert scrub */
export const YardGround: React.FC<{ cam: Cam; f: number; x0?: number; x1?: number; z0?: number; z1?: number }> = ({
  cam, x0 = JX.x0, x1 = JX.x1, z0 = -4, z1 = JX.zBack,
}) => (
  <g>
    <polygon points={flatQuad(cam, x0 - 10, x1 + 10, z0, z1 + 14, 0)} fill={JT.dirt} />
    <polygon points={flatQuad(cam, x0 - 6, x1 + 6, z0, z1 * 0.58, 0.003)} fill={JT.dirt2} opacity={0.48} />
    {/* twin curved tyre ruts leading into the yard */}
    {[-1.35, 0.85].map((rx, i) => (
      <polygon key={i} points={flatQuad(cam, rx - 0.26, rx + 0.26, 0.5, 20, 0.005)} fill={JT.dirtDark} opacity={0.34} />
    ))}
    {/* oil stains & gravel patches */}
    {Array.from({ length: 8 }).map((_, i) => (
      <polygon
        key={i}
        points={flatDisc(cam, -9 + rand(i, 11) * 18, 2.5 + rand(i, 12) * 13, 0.55 + rand(i, 13) * 0.8, 0.006, 14, 0.32, i)}
        fill={i % 2 === 0 ? JT.dirtDark : "#594836"}
        opacity={0.28}
      />
    ))}
    {/* dry scrub weeds & rusted scrap bits */}
    {Array.from({ length: 9 }).map((_, i) => {
      const sx = -10 + i * 2.5 + (rand(i, 21) - 0.5) * 0.9;
      const sz = 3.6 + rand(i, 22) * 11;
      const p = project(cam, sx, 0.01, sz);
      if (p.d <= 0.3) return null;
      return (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <path d={`M0,0 L${-0.12 * p.s},${-0.18 * p.s} M0,0 L${0.02 * p.s},${-0.22 * p.s} M0,0 L${0.14 * p.s},${-0.16 * p.s}`} stroke={JT.scrub} strokeWidth={Math.max(1, 0.022 * p.s)} strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

/** Mid-ground crushed 2-car stack (blur=false) */
export const CarStack: React.FC<{ cam: Cam; x: number; z: number; seed?: number; s?: number }> = ({ cam, x, z, seed = 1, s = 1 }) => {
  const [c1, d1] = CAR_COLS[seed % CAR_COLS.length];
  const [c2, d2] = CAR_COLS[(seed + 3) % CAR_COLS.length];
  return (
    <Card cam={cam} x={x} y={0} z={z} blur={false}>
      <g transform={`scale(${s})`}>
        <ellipse cx={0} cy={0.02} rx={2.05} ry={0.18} fill="#4b3a28" opacity={0.44} />
        {/* bottom crushed sedan */}
        <path d="M-1.95,0 L-1.9,-0.56 L1.9,-0.54 L1.95,0 Z" fill={c1} stroke={JT.ol} strokeWidth={0.026} />
        <path d="M-0.75,-0.55 L-0.42,-0.94 L0.68,-0.92 L0.96,-0.54 Z" fill={d1} stroke={JT.ol} strokeWidth={0.026} />
        <path d="M-0.64,-0.57 L-0.36,-0.88 L0.58,-0.86 L0.82,-0.56 Z" fill="#1e2428" />
        <circle cx={-1.25} cy={-0.06} r={0.28} fill="#232220" stroke={JT.ol} strokeWidth={0.02} />
        <circle cx={1.25} cy={-0.06} r={0.28} fill="#232220" stroke={JT.ol} strokeWidth={0.02} />
        {/* top angled crushed coupe */}
        <g transform="translate(0.06,-0.93) rotate(-2.5)">
          <path d="M-1.82,0 L-1.76,-0.5 L1.78,-0.48 L1.84,0 Z" fill={c2} stroke={JT.ol} strokeWidth={0.026} />
          <path d="M-0.62,-0.49 L-0.3,-0.86 L0.62,-0.84 L0.88,-0.48 Z" fill={d2} stroke={JT.ol} strokeWidth={0.026} />
          <path d="M-0.52,-0.51 L-0.25,-0.8 L0.52,-0.78 L0.74,-0.5 Z" fill="#1e2428" />
          <path d="M-1.5,-0.25 C-1.15,-0.36 -0.85,-0.24 -0.92,-0.1 Z" fill={JT.rust} opacity={0.6} />
        </g>
      </g>
    </Card>
  );
};

/** Stripped car body on blocks/wheels (blur=false) */
export const CarBody: React.FC<{
  cam: Cam; x: number; z: number; rot?: number; pal?: string; shade?: string; side?: boolean; wheels?: number; open?: number; s?: number;
}> = ({ cam, x, z, rot = 0, pal = "#7a6a58", shade = "#4f4438", side = false, wheels = 3, open = 0, s = 1 }) => (
  <Card cam={cam} x={x} y={0} z={z} blur={false}>
    <g transform={`rotate(${rot}) scale(${s})`}>
      <ellipse cx={0} cy={0.02} rx={2.0} ry={0.16} fill="#503f2c" opacity={0.42} />
      {side ? (
        <g>
          <path d="M-1.9,0 L-1.9,-1.45 L1.9,-1.45 L1.9,0 Z" fill={shade} stroke={JT.ol} strokeWidth={0.028} />
          <path d="M-1.7,-0.1 L-1.7,-1.28 L1.7,-1.28 L1.7,-0.1 Z" fill={pal} opacity={0.75} />
        </g>
      ) : (
        <g>
          <path d="M-1.95,0 L-1.9,-0.52 C-1.6,-0.66 -1.0,-0.7 -0.55,-0.68 L0.62,-0.68 C1.1,-0.66 1.75,-0.6 1.92,-0.5 L1.95,0 Z" fill={pal} stroke={JT.ol} strokeWidth={0.028} />
          <path d="M-0.6,-0.66 L-0.24,-1.22 L0.72,-1.22 L1.0,-0.66 Z" fill={shade} stroke={JT.ol} strokeWidth={0.028} />
          <path d="M-0.5,-0.68 L-0.2,-1.16 L0.5,-1.16 L0.72,-0.68 Z" fill="#20282c" />
          <path d="M-1.6,-0.3 C-1.2,-0.42 -0.9,-0.3 -0.95,-0.14 C-1.25,-0.06 -1.55,-0.14 -1.6,-0.3 Z" fill={JT.rust} opacity={0.55} />
          {open > 0.02 && (
            <g transform={`translate(-0.3,-0.4) rotate(${-12 - 34 * open})`}>
              <path d="M0,0 L-0.88,-0.05 L-0.9,0.38 L0,0.34 Z" fill={pal} stroke={JT.ol} strokeWidth={0.022} />
            </g>
          )}
          {[[-1.28, 0], [1.28, 1]].map(([wx, idx]) =>
            idx < wheels ? (
              <g key={idx}>
                <circle cx={wx} cy={0} r={0.33} fill="#262628" stroke="#141414" strokeWidth={0.02} />
                <circle cx={wx} cy={0} r={0.17} fill="#666c72" />
              </g>
            ) : (
              <rect key={idx} x={wx - 0.22} y={-0.18} width={0.44} height={0.18} fill="#7d776e" stroke={JT.ol} strokeWidth={0.018} />
            )
          )}
        </g>
      )}
    </g>
  </Card>
);

/** Corrugated salvage yard shed */
export const YardShed: React.FC<{ cam: Cam; x: number; z: number; w?: number; h?: number }> = ({ cam, x, z, w = 4.4, h = 2.8 }) => (
  <g>
    <polygon points={wallQuad(cam, x - w / 2, x + w / 2, 0, h, z)} fill="#a89478" stroke={JT.ol} strokeWidth={1.2} />
    <polygon points={wallQuad(cam, x - w / 2 - 0.15, x + w / 2 + 0.15, h, h + 0.24, z - 0.04)} fill="#66584a" stroke={JT.ol} strokeWidth={1} />
    <polygon points={wallQuad(cam, x - 0.45, x + 0.75, 1.05, 1.9, z - 0.02)} fill="#262f34" stroke={JT.ol} strokeWidth={1} />
    <polygon points={wallQuad(cam, x - w / 2 + 0.35, x - 0.85, 0, 2.05, z - 0.02)} fill="#6e5c49" stroke={JT.ol} strokeWidth={1} />
  </g>
);

/** Chain-link fence run */
export const ChainRun: React.FC<{ cam: Cam; x0: number; x1: number; z: number; h?: number; n?: number }> = ({ cam, x0, x1, z, h = 2.2, n = 7 }) => (
  <g>
    <polygon points={wallQuad(cam, x0, x1, 0, h, z)} fill="url(#jchain)" opacity={0.48} />
    {Array.from({ length: n + 1 }).map((_, i) => {
      const px = x0 + (i / n) * (x1 - x0);
      const b = project(cam, px, 0, z), t = project(cam, px, h + 0.08, z);
      return <line key={i} x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#747c82" strokeWidth={Math.max(1.4, 0.055 * b.s)} />;
    })}
    {(() => {
      const a = project(cam, x0, h, z), c = project(cam, x1, h, z);
      return <line x1={a.x} y1={a.y} x2={c.x} y2={c.y} stroke="#8c949a" strokeWidth={Math.max(1, 0.03 * a.s)} />;
    })()}
  </g>
);

/** Near-foreground silhouette framing: stacked scrap tyres at bottom-left + rusted bumper/fender at bottom-right */
export const YardFore: React.FC<{ o?: number }> = ({ o = 0.94 }) => (
  <g opacity={o} pointerEvents="none">
    {/* bottom-left stacked scrap tyres */}
    <g transform="translate(0,1080)">
      <ellipse cx={95} cy={-26} rx={150} ry={44} fill="#1b1714" stroke="#0d0b09" strokeWidth={3} />
      <ellipse cx={82} cy={-82} rx={138} ry={40} fill="#231e1a" stroke="#0d0b09" strokeWidth={3} />
      <ellipse cx={82} cy={-86} rx={72} ry={18} fill="#120f0d" />
      <ellipse cx={104} cy={-136} rx={124} ry={36} fill="#28221d" stroke="#0d0b09" strokeWidth={3} transform="rotate(5 104 -136)" />
      <ellipse cx={104} cy={-140} rx={64} ry={15} fill="#120f0d" transform="rotate(5 104 -140)" />
    </g>
    {/* bottom-right propped scrap bumper & coil spring */}
    <g transform="translate(1920,1080)">
      <path d="M40,10 L-230,10 L-195,-86 L-45,-148 L40,-120 Z" fill="#211b16" stroke="#0d0b09" strokeWidth={3} />
      <path d="M-182,-76 L-52,-132" stroke="#42362c" strokeWidth={5} opacity={0.55} />
    </g>
  </g>
);

/** Interior cab frame of Walt's parked waiting car (windshield/side-window view of yard behind, roof, headrest, wheel) */
export const WaitingCabBack: React.FC = () => (
  <g>
    {/* cab roof headliner & sun visors */}
    <path d="M0,0 L1920,0 L1920,135 Q960,105 0,150 Z" fill="#3a352e" stroke="#181512" strokeWidth={3} />
    <rect x={210} y={24} width={340} height={58} rx={8} fill="#4a433a" stroke="#181512" strokeWidth={2.5} />
    <rect x={1290} y={22} width={330} height={54} rx={8} fill="#463f37" stroke="#181512" strokeWidth={2.5} />
    {/* rearview mirror */}
    <line x1={985} y1={110} x2={985} y2={176} stroke="#22201d" strokeWidth={9} />
    <rect x={875} y={168} width={220} height={56} rx={10} fill="#25282c" stroke="#121316" strokeWidth={3} />
    <rect x={885} y={176} width={200} height={40} rx={6} fill="#6e8694" opacity={0.55} />
    {/* left B-pillar & tan cloth driver seatback + headrest */}
    <polygon points="0,140 135,128 165,1080 0,1080" fill="#2d2823" stroke="#15120f" strokeWidth={3} />
    <rect x={175} y={320} width={260} height={155} rx={28} fill="#6e614e" stroke="#221d17" strokeWidth={3} />
    <path d="M135,495 Q310,475 465,520 L500,1080 L125,1080 Z" fill="#635645" stroke="#221d17" strokeWidth={3} />
    {/* center A-pillar & right passenger seat silhouette */}
    <polygon points="1755,120 1835,120 1920,640 1920,760" fill="#322d27" stroke="#15120f" strokeWidth={3} />
  </g>
);

export const WaitingCabFore: React.FC = () => (
  <g pointerEvents="none">
    {/* lower dashboard cowl + instrument binnacle + steering wheel rim */}
    <path d="M0,895 Q680,825 1920,865 L1920,1080 L0,1080 Z" fill="#2c2824" stroke="#141210" strokeWidth={3} />
    <path d="M470,855 Q720,755 975,855 Z" fill="#221f1c" stroke="#12100e" strokeWidth={3} />
    {/* steering wheel upper arc */}
    <path d="M515,1080 A255,255 0 0 1 995,1080" fill="none" stroke="#1d1b19" strokeWidth={34} />
    <path d="M515,1080 A255,255 0 0 1 995,1080" fill="none" stroke="#3c3833" strokeWidth={8} opacity={0.55} />
  </g>
);
