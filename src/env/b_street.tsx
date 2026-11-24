// Batch B · EXT Albuquerque residential street, day (the kind of street where nothing is quite legal).
// Reference (S01E06): dusty stucco houses with chain-link, low block walls, cracked sidewalks, faded
// asphalt, overhead power lines, a dead yard and a plastic kid's toy in the dirt. Original layout/art.
// 1 unit = 1 m. 3 layers: far ridge + houses, mid street/houses/walls, near fence + sidewalk.
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, lerp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad, Dust, Birds, Shimmer, qOf } from "./b_common";

export const ST = {
  sky: "#9cc6ea", skyLow: "#efe2c6", haze: "#e9d8b4",
  road: "#6f6a63", roadDark: "#57534d", line: "#d8c98a",
  walk: "#bdb4a2", stucco: "#e6d3b3", stuccoDark: "#cbb28e", roof: "#9b6b4f",
  dirt: "#c9a56f", scrub: "#6f7d4f", rock: "#b07a52", ol: "#2b2118",
};

export const StreetSky: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => (
  <g>
    <defs>
      <linearGradient id="stsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#79b0dd" /><stop offset="0.55" stopColor={ST.sky} /><stop offset="1" stopColor={ST.skyLow} />
      </linearGradient>
      <radialGradient id="stsun"><stop offset="0" stopColor="#fff6d0" stopOpacity={0.9} /><stop offset="1" stopColor="#ffe9b0" stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill="url(#stsky)" />
    <circle cx={1760 - cam.x * 3} cy={120} r={240} fill="url(#stsun)" />
    <circle cx={1760 - cam.x * 3} cy={120} r={46} fill="#fffbe8" opacity={0.9} />
    {/* drifting clouds, flat and warm */}
    {[0, 1, 2, 3, 4].map((i) => {
      const cx = ((rand(i, 21) * 2600 + f * (0.12 + i * 0.04) - cam.x * 6) % 2800) - 400;
      const cy = 70 + i * 52;
      return (
        <g key={i} opacity={0.55}>
          <ellipse cx={cx} cy={cy} rx={220 + i * 30} ry={20} fill="#ffffff" />
          <ellipse cx={cx + 90} cy={cy - 12} rx={130} ry={18} fill="#fdf8ee" />
          <ellipse cx={cx - 60} cy={cy + 8} rx={150} ry={12} fill="#dbe6ef" opacity={0.7} />
        </g>
      );
    })}
    <Birds f={f} y={190} n={4} speed={0.7} seed={5} scale={0.8} />
  </g>
);

/** the far ridge of mesas (no parallax) */
export const StreetRidge: React.FC<{ cam: Cam }> = ({ cam }) => {
  const base = H / 2 + (cam.shiftY ?? 0) + 96;
  const pts: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const x = (i / 30) * (W + 200) - 100 - cam.x * 0.5;
    const y = base - 26 - 30 * Math.abs(noise1(i * 0.4, 2));
    pts.push(`${x},${y}`);
  }
  return (
    <g>
      <polygon points={`-100,${base + 60} ${pts.join(" ")} ${W + 100},${base + 60}`} fill="#c8b79a" opacity={0.85} />
      <polygon points={`-100,${base + 40} ${pts.join(" ")} ${W + 100},${base + 40}`} fill="#d8c8aa" opacity={0.6} />
    </g>
  );
};

/** the road + sidewalk, running to the horizon */
export const StreetGround: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const zn = cam.z + 0.5;
  return (
    <g>
      <defs>
        <linearGradient id="stdirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b8945f" /><stop offset="1" stopColor="#d9b98a" /></linearGradient>
        <linearGradient id="stroad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d5850" /><stop offset="1" stopColor="#7d776e" /></linearGradient>
      </defs>
      <polygon points={flatQuad(cam, -80, 80, zn, 400, 0)} fill="url(#stdirt)" />
      <polygon points={flatQuad(cam, -5.6, 5.6, zn, 400, 0.002)} fill="url(#stroad)" />
      {/* faded centre line, dashes at real 3 m */}
      {Array.from({ length: 40 }).map((_, i) => (
        <polygon key={i} points={flatQuad(cam, -0.09, 0.09, 3 + i * 6, 3 + i * 6 + 3, 0.003)} fill={ST.line} opacity={0.55} />
      ))}
      {/* sidewalk both sides + expansion joints */}
      {[-1, 1].map((s) => (
        <polygon key={s} points={flatQuad(cam, s * 5.6, s * 7.4, zn, 300, 0.004)} fill={ST.walk} />
      ))}
      {[-1, 1].map((s) => Array.from({ length: 26 }).map((_, i) => (
        <polygon key={`${s}${i}`} points={flatQuad(cam, s * 5.6, s * 7.4, 2 + i * 1.5, 2.04 + i * 1.5, 0.005)} fill="#8f8878" opacity={0.5} />
      )))}
      {/* curb */}
      {[-1, 1].map((s) => (
        <g key={`c${s}`}>
          <polygon points={qOf(cam, [[s * 5.6, 0.14, zn], [s * 5.6, 0.14, 300], [s * 5.6, 0, 300], [s * 5.6, 0, zn]])} fill="#a89e8a" />
          <polygon points={qOf(cam, [[s * 5.6, 0.14, zn], [s * 5.6, 0.14, 300], [s * 5.45, 0.14, 300], [s * 5.45, 0.14, zn]])} fill="#c6c0ae" />
        </g>
      ))}
      {/* cracks in the asphalt */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = -5 + rand(i, 31) * 10, z = 4 + rand(i, 32) * 34;
        const a = project(cam, x, 0.004, z), b = project(cam, x + (rand(i, 33) - 0.5) * 1.4, 0.004, z + 0.6 + rand(i, 34));
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#4a463f" strokeWidth={Math.max(1, 0.02 * a.s)} opacity={0.5} />;
      })}
      {/* heat shimmer off the road far away */}
      <Shimmer f={f} top={H * 0.56} bottom={H * 0.66} o={0.05} />
      {/* dry scrub on the verges */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = (rand(i, 41) > 0.5 ? 1 : -1) * (8 + rand(i, 42) * 10);
        const z = cam.z + 4 + rand(i, 43) * 30;
        const p = project(cam, x, 0, z);
        if (p.d < 0.6) return null;
        const sway = noise1(f * 0.02 + i, 4) * 0.04;
        const sc = 0.5 + rand(i, 44) * 0.7;
        return (
          <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * sc})`}>
            <ellipse cx={0.04} cy={0} rx={0.3} ry={0.04} fill="#8a6a3a" opacity={0.4} />
            <path d={`M-0.26,0 Q${-0.16 + sway},-0.3 0,-0.36 Q${0.22 + sway},-0.28 0.28,0 Z`} fill={ST.scrub} />
            <path d={`M-0.12,-0.04 Q${-0.02 + sway},-0.26 0.06,-0.3`} stroke="#93a066" strokeWidth={0.03} fill="none" />
          </g>
        );
      })}
    </g>
  );
};

/** one original stucco house on a lot. Drawn in WORLD space (no Card) so quads stay true. */
export const House: React.FC<{ cam: Cam; x: number; z: number; w?: number; h?: number; pal?: [string, string, string]; seed?: number; fence?: boolean }> = ({ cam, x, z, w = 9, h = 3.2, pal = [ST.stucco, ST.stuccoDark, ST.roof], seed = 1, fence = true }) => {
  const sAt = project(cam, 0, 0, z).s;
  const x0 = x - w / 2, x1 = x + w / 2;
  return (
    <g>
      {/* lot: dead lawn patch + driveway */}
      <polygon points={flatQuad(cam, x - w * 0.62, x + w * 0.62, z - 3, z + 4.6, 0.006)} fill="#bfa271" />
      <polygon points={flatQuad(cam, x - 2.6, x + 2.6, z - 1, z + 5.6, 0.007)} fill="#a9a06a" opacity={0.55} />
      <polygon points={flatQuad(cam, x + w * 0.16, x + w * 0.52, z - 1, z + 5.4, 0.008)} fill="#b0a893" />
      {/* house body */}
      <polygon points={wallQuad(cam, x0, x1, 0, h, z)} fill={pal[0]} stroke={ST.ol} strokeWidth={0.05} />
      <polygon points={wallQuad(cam, x0, x1, 0, 0.3, z + 0.01)} fill={pal[1]} opacity={0.45} />
      <polygon points={qOf(cam, [[x0, h, z], [x1, h, z], [x1, h, z - 4], [x0, h, z - 4]])} fill={pal[2]} opacity={0.9} />
      <polygon points={wallQuad(cam, x0 - 0.15, x1 + 0.15, h, h + 0.3, z + 0.01)} fill={pal[2]} stroke={ST.ol} strokeWidth={0.05} />
      {/* vigas: beam ends under the parapet */}
      {Array.from({ length: 7 }).map((_, i) => {
        const vx = x - w * 0.38 + i * (w * 0.76 / 6);
        const p = project(cam, vx, h - 0.36, z);
        return <circle key={i} cx={p.x} cy={p.y} r={0.07 * sAt} fill="#6f4f34" stroke={ST.ol} strokeWidth={0.006} />;
      })}
      {/* windows */}
      {[0, 1].map((i) => {
        const wx = x - w * 0.3 + i * w * 0.34;
        return (
          <g key={i}>
            <polygon points={wallQuad(cam, wx - 0.6, wx + 0.6, 1.1, 2.2, z + 0.02)} fill="#3c4a52" stroke={ST.ol} strokeWidth={0.04} />
            <polygon points={wallQuad(cam, wx - 0.55, wx + 0.55, 1.6, 2.16, z + 0.03)} fill="#cfd6cf" opacity={0.7} />
            <polygon points={wallQuad(cam, wx - 0.62, wx + 0.62, 1.04, 1.11, z + 0.03)} fill="#ded3ba" />
          </g>
        );
      })}
      {/* door + step */}
      <polygon points={wallQuad(cam, x + w * 0.3, x + w * 0.3 + 0.9, 0, 2.05, z + 0.02)} fill="#7c5636" stroke={ST.ol} strokeWidth={0.04} />
      <polygon points={flatQuad(cam, x + w * 0.28, x + w * 0.3 + 1.0, z + 0.04, z + 0.5, 0.05)} fill="#c2b8a2" />
      {/* chain-link along the lot line */}
      {fence && (
        <g>
          <polygon points={wallQuad(cam, x - w * 0.62, x + w * 0.62, 0, 1.35, z + 4.9)} fill="url(#stchain)" opacity={0.45} />
          {Array.from({ length: 8 }).map((_, i) => {
            const fx = x - w * 0.62 + i * (w * 1.24 / 7);
            const b = project(cam, fx, 0, z + 4.9), t = project(cam, fx, 1.45, z + 4.9);
            return <line key={i} x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#7c848a" strokeWidth={Math.max(1.2, 0.05 * b.s)} />;
          })}
          {(() => { const a2 = project(cam, x - w * 0.62, 1.4, z + 4.9), b2 = project(cam, x + w * 0.62, 1.4, z + 4.9); return <line x1={a2.x} y1={a2.y} x2={b2.x} y2={b2.y} stroke="#8b9298" strokeWidth={Math.max(1.5, 0.03 * a2.s)} />; })()}
        </g>
      )}
      {/* a kid's plastic toy left in the dirt */}
      <Card cam={cam} x={x - w * 0.34} z={z + 2.6}>
        <ellipse cx={0} cy={0} rx={0.22} ry={0.05} fill="#8a6a3a" opacity={0.4} />
        <path d="M-0.18,0 L-0.14,-0.16 L0.14,-0.16 L0.16,0 Z" fill="#c8543f" stroke={ST.ol} strokeWidth={0.008} />
        <circle cx={-0.08} cy={0} r={0.05} fill="#2b2118" /><circle cx={0.08} cy={0} r={0.05} fill="#2b2118" />
      </Card>
      {/* power pole at the lot corner */}
      <Card cam={cam} x={x + w * 0.7} z={z + 4.6}>
        <rect x={-0.09} y={-7.2} width={0.18} height={7.2} fill="#6b5b48" stroke={ST.ol} strokeWidth={0.012} />
        <rect x={-0.8} y={-6.9} width={1.6} height={0.09} fill="#6b5b48" />
        {[-0.7, 0, 0.7].map((o) => <circle key={o} cx={o} cy={-7.05} r={0.06} fill="#8f949c" />)}
      </Card>
    </g>
  );
};

/** soft dust devil crossing a lot — ambient life for a hot street */
export const DustDevil: React.FC<{ cam: Cam; f: number; x: number; z: number; o?: number }> = ({ cam, f, x, z, o = 0.3 }) => {
  const p = project(cam, x, 0, z);
  if (p.d < 1) return null;
  return (
    <g opacity={o}>
      {Array.from({ length: 14 }).map((_, i) => {
        const a = f * 0.05 + i * 0.8;
        const h = (i / 14) * 2.6;
        const r = 0.35 + h * 0.4;
        return <ellipse key={i} cx={p.x + Math.cos(a) * r * p.s} cy={p.y - h * p.s} rx={r * 0.5 * p.s} ry={r * 0.2 * p.s} fill={`url(#puffA)`} opacity={0.5 - i * 0.02} />;
      })}
    </g>
  );
};

/** low block wall on the verge (world space) */
export const BlockWall: React.FC<{ cam: Cam; x: number; z: number; w?: number; h?: number }> = ({ cam, x, z, w = 6, h = 0.62 }) => (
  <g>
    <polygon points={wallQuad(cam, x - w / 2, x + w / 2, 0, h, z)} fill="#cbb894" stroke={ST.ol} strokeWidth={0.04} />
    <polygon points={qOf(cam, [[x - w / 2, h, z], [x + w / 2, h, z], [x + w / 2, h, z - 0.24], [x - w / 2, h, z - 0.24]])} fill="#ddcaa6" />
    <polygon points={wallQuad(cam, x - w / 2, x + w / 2, 0, 0.1, z + 0.001)} fill="#8f7a5c" opacity={0.45} />
    <polygon points={flatQuad(cam, x - w / 2, x + w / 2, z + 0.02, z + 0.5, 0.004)} fill="#a08a68" opacity={0.4} />
  </g>
);
