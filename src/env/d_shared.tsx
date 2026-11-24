// BATCH D kit · shared environment primitives (sky, ground, puffs, glass, interior walls).
// 1 unit = 1 m. Every helper draws through the 2.5D camera so scale stays automatic.
import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, clamp, lerp } from "../lib/anim";

/* ───────────────────────────── shared soft gradients (define once per svg) ───────────────────────────── */

export const DDefs: React.FC<{ tone?: "day" | "dusk" | "night" | "clean" }> = ({ tone = "day" }) => {
  const puff = tone === "night" ? ["#6a7480", "#8a929a"] : tone === "dusk" ? ["#8a6a64", "#c99a86"] : ["#8f8878", "#b8ae98"];
  return (
    <defs>
      {[[`dpA`, puff[0]], [`dpB`, puff[1]]].map(([id, c]) => (
        <radialGradient key={id} id={id}>
          <stop offset="0" stopColor={c} stopOpacity={0.85} />
          <stop offset="0.55" stopColor={c} stopOpacity={0.32} />
          <stop offset="1" stopColor={c} stopOpacity={0} />
        </radialGradient>
      ))}
      <radialGradient id="dSunGlow">
        <stop offset="0" stopColor="#fff3cf" stopOpacity={0.9} />
        <stop offset="0.4" stopColor="#ffe1a8" stopOpacity={0.35} />
        <stop offset="1" stopColor="#ffe1a8" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="dLampGlow">
        <stop offset="0" stopColor="#ffe6b0" stopOpacity={0.55} />
        <stop offset="1" stopColor="#ffe6b0" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="dCoolGlow">
        <stop offset="0" stopColor="#c9e9ff" stopOpacity={0.5} />
        <stop offset="1" stopColor="#c9e9ff" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="dSkyDay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6ea8d8" />
        <stop offset="0.55" stopColor="#a8cbe6" />
        <stop offset="1" stopColor="#e9d8b4" />
      </linearGradient>
      <linearGradient id="dSkyDusk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2b2f5a" />
        <stop offset="0.45" stopColor="#8a4a63" />
        <stop offset="0.72" stopColor="#e0785a" />
        <stop offset="1" stopColor="#f6c27a" />
      </linearGradient>
      <linearGradient id="dSkyNight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#060b16" />
        <stop offset="0.6" stopColor="#122340" />
        <stop offset="1" stopColor="#2a3d5e" />
      </linearGradient>
    </defs>
  );
};

export const Puff: React.FC<{ x: number; y: number; r: number; o: number; light?: boolean }> = ({ x, y, r, o, light }) => (
  <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill={`url(#${light ? "dpB" : "dpA"})`} opacity={o} />
);

/* ───────────────────────────── sky ───────────────────────────── */

export const Sky: React.FC<{ cam: Cam; f: number; tone?: "day" | "dusk" | "night"; sun?: [number, number]; clouds?: number; par?: number }> = ({ cam, f, tone = "day", sun, clouds = 4, par = 6 }) => {
  const fill = tone === "night" ? "url(#dSkyNight)" : tone === "dusk" ? "url(#dSkyDusk)" : "url(#dSkyDay)";
  return (
    <g>
      <rect x={0} y={-200} width={W} height={H + 400} fill={fill} />
      {sun && (
        <g>
          <circle cx={sun[0] - cam.x * par * 0.2} cy={sun[1] + (cam.shiftY ?? 0) * 0.3} r={340} fill="url(#dSunGlow)" opacity={tone === "night" ? 0.35 : 0.9} />
          <circle cx={sun[0] - cam.x * par * 0.2} cy={sun[1] + (cam.shiftY ?? 0) * 0.3} r={46} fill={tone === "dusk" ? "#ffe0a8" : "#fff6d8"} />
        </g>
      )}
      {tone === "night" &&
        Array.from({ length: 120 }).map((_, i) => {
          const x = ((rand(i, 11) * W - cam.x * par) % W + W) % W;
          const y = rand(i, 12) * H * 0.62;
          const tw = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.045 + i * 1.7));
          return <circle key={i} cx={x} cy={y} r={rand(i, 13) < 0.12 ? 1.6 : 0.9} fill="#dfe9ff" opacity={tw * (0.3 + rand(i, 14) * 0.6)} />;
        })}
      {Array.from({ length: clouds }).map((_, i) => {
        const span = W + 900;
        const cw = 220 + rand(i, 21) * 320;
        const cx = ((rand(i, 22) * span + f * (0.22 + i * 0.06) - cam.x * par * 1.6) % span + span) % span - 300;
        const cy = 70 + i * 74 + (cam.shiftY ?? 0) * 0.25;
        const cf = tone === "night" ? "#1b2c47" : tone === "dusk" ? i % 2 ? "#6a4460" : "#8a5464" : i % 2 ? "#f2f6fa" : "#e6eef6";
        const cs = tone === "night" ? "#22365a" : tone === "dusk" ? "#4a3048" : "#c9d9e9";
        return (
          <g key={i} opacity={tone === "night" ? 0.55 : 0.9} transform={`translate(${cx},${cy})`}>
            <ellipse cx={0} cy={0} rx={cw} ry={26} fill={cs} />
            <ellipse cx={cw * 0.34} cy={-18} rx={cw * 0.52} ry={30} fill={cf} />
            <ellipse cx={-cw * 0.3} cy={4} rx={cw * 0.44} ry={18} fill={cf} opacity={0.8} />
          </g>
        );
      })}
    </g>
  );
};

/* ───────────────────────────── desert ground with ruts, scrub, rocks ───────────────────────────── */

export const DuneRidge: React.FC<{ cam: Cam; f: number; z?: number; tone?: "day" | "dusk" | "night"; near?: string; far?: string }> = ({ cam, f, z = 900, tone = "day", near, far }) => {
  const horizon = H / 2 + (cam.shiftY ?? 0);
  const farC = far ?? (tone === "dusk" ? "#7a5560" : tone === "night" ? "#1a2438" : "#b09a86");
  const nearC = near ?? (tone === "dusk" ? "#5c4052" : tone === "night" ? "#141c2c" : "#9a8468");
  const mk = (base: number, amp: number, salt: number, color: string, op: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 46; i++) {
      const x = (i / 46) * (W + 300) - 150 - cam.x * 0.3;
      const y = base - amp * Math.abs(noise1(i * 0.33 + f * 0.0015, salt)) - amp * 0.5 * Math.max(0, Math.sin(i * 0.19 + salt));
      pts.push(`${x},${y}`);
    }
    return <polygon points={`-150,${horizon + 200} ${pts.join(" ")} ${W + 150},${horizon + 200}`} fill={color} opacity={op} />;
  };
  return (
    <g>
      {mk(horizon + 6, 120, 3, farC, 0.85)}
      {mk(horizon + 18, 66, 7, nearC, 0.9)}
    </g>
  );
};

export const DesertFloor: React.FC<{
  cam: Cam; f: number; tone?: "day" | "dusk" | "night"; rutX?: number; rutW?: number;
  scrubN?: number; near?: number; seed?: number;
}> = ({ cam, f, tone = "day", rutX, rutW = 1.05, scrubN = 40, near = 40, seed = 7 }) => {
  const sand = tone === "dusk" ? "#8f6a5a" : tone === "night" ? "#3a3a44" : "#d9b98a";
  const sandDk = tone === "dusk" ? "#6e4f4d" : tone === "night" ? "#26262e" : "#bf9d70";
  const sandLt = tone === "dusk" ? "#b08a6e" : tone === "night" ? "#4a4a56" : "#ecd3a5";
  const z0 = cam.z + 0.6;
  return (
    <g>
      <polygon points={planePts(cam, [[-900, z0], [900, z0], [900, 2600], [-900, 2600]])} fill={sand} />
      {/* tonal waves in the sand */}
      {Array.from({ length: 7 }).map((_, i) => {
        const zz = z0 + 6 + i * 18;
        return <polygon key={i} points={planePts(cam, [[-900, zz], [900, zz + 2], [900, zz + 7], [-900, zz + 5]], 0.004)} fill={sandDk} opacity={0.35 - i * 0.035} />;
      })}
      {/* sun-side wash */}
      <polygon points={planePts(cam, [[-900, z0], [200, z0], [900, 2400], [-900, 2400]], 0.002)} fill={sandLt} opacity={0.35} />
      {rutX !== undefined && (
        <g>
          {[-rutW, rutW].map((o) => (
            <g key={o}>
              <polygon points={planePts(cam, [[rutX + o - 0.4, z0], [rutX + o + 0.4, z0], [rutX + o + 0.55, 2600], [rutX + o - 0.55, 2600]], 0.004)} fill={sandDk} opacity={0.55} />
              <polygon points={planePts(cam, [[rutX + o - 0.18, z0], [rutX + o + 0.18, z0], [rutX + o + 0.26, 2600], [rutX + o - 0.26, 2600]], 0.006)} fill={tone === "night" ? "#1c1c22" : "#9a7a54"} opacity={0.5} />
            </g>
          ))}
        </g>
      )}
      {/* scrub + rocks on the floor plane */}
      {Array.from({ length: scrubN }).map((_, i) => {
        const x = -55 + rand(i, seed) * 110;
        const z = cam.z + 2.2 + rand(i, seed + 1) * near;
        if (rutX !== undefined && Math.abs(x - rutX) < 2.6) return null;
        const p = project(cam, x, 0, z);
        if (p.d < 0.6) return null;
        const sc = 0.5 + rand(i, seed + 2) * 0.8;
        const sway = noise1(f * 0.03 + i, seed + 3) * 0.06;
        return (
          <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * sc})`}>
            <ellipse cx={0.06} cy={0} rx={0.42} ry={0.06} fill={tone === "night" ? "#000" : "#8a6a48"} opacity={0.3} />
            <path d={`M-0.32,0 Q${-0.22 + sway},-0.34 -0.02,-0.42 Q${0.24 + sway},-0.32 0.34,0 Z`} fill={tone === "night" ? "#22301f" : tone === "dusk" ? "#4a4a34" : "#6f7d4f"} />
            <path d={`M-0.14,-0.04 Q${-0.06 + sway},-0.28 0.04,-0.36`} stroke={tone === "night" ? "#2e3c28" : "#8a9a62"} strokeWidth={0.03} fill="none" />
          </g>
        );
      })}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = -40 + rand(i, seed + 11) * 80;
        const z = cam.z + 3 + rand(i, seed + 12) * 26;
        const p = project(cam, x, 0, z);
        const sc = 0.12 + rand(i, seed + 13) * 0.26;
        return <g key={`r${i}`} transform={`translate(${p.x},${p.y}) scale(${p.s})`}><ellipse cx={0} cy={-sc * 0.24} rx={sc} ry={sc * 0.55} fill={tone === "night" ? "#2a2a32" : tone === "dusk" ? "#6a4a48" : "#b07a52"} /><ellipse cx={-sc * 0.3} cy={-sc * 0.4} rx={sc * 0.45} ry={sc * 0.22} fill={sandLt} opacity={0.5} /></g>;
      })}
    </g>
  );
};

/* ───────────────────────────── heat shimmer / dust drift ───────────────────────────── */

export const HeatShimmer: React.FC<{ f: number; region?: [number, number, number, number]; n?: number; op?: number }> = ({ f, region = [0, 380, W, 260], n = 12, op = 0.1 }) => {
  const [rx, ry, rw, rh] = region;
  return (
    <g opacity={op}>
      {Array.from({ length: n }).map((_, i) => {
        const x = rx + ((rand(i, 31) * rw + f * 0.6 + noise1(f * 0.02 + i, 2) * 40) % rw + rw) % rw;
        const y = ry + rand(i, 32) * rh;
        return <ellipse key={i} cx={x} cy={y + Math.sin(f * 0.06 + i) * 5} rx={60 + rand(i, 33) * 90} ry={4 + rand(i, 34) * 5} fill="#fff" />;
      })}
    </g>
  );
};

export const Birds: React.FC<{ f: number; n?: number; y?: number; span?: number; sp?: number; tone?: string }> = ({ f, n = 5, y = 170, span = 900, sp = 1.1, tone = "#2a2a2e" }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const x = ((rand(i, 41) * span + f * sp * (0.8 + rand(i, 42) * 0.6)) % (W + 400)) - 200;
      const yy = y + rand(i, 43) * 70 + noise1(f * 0.03 + i, 4) * 8;
      const flap = Math.sin(f * 0.32 + i * 1.9) * 7;
      return <path key={i} d={`M${x - 11},${yy} Q${x - 5},${yy - 6 - flap} ${x},${yy} Q${x + 5},${yy - 6 - flap} ${x + 11},${yy}`} stroke={tone} strokeWidth={2.4} fill="none" strokeLinecap="round" />;
    })}
  </g>
);

/* ───────────────────────────── glass (window / windshield / door glass) ───────────────────────────── */

/** a pane of glass between 4 projected corners, with a live reflection streak */
export const GlassPane: React.FC<{ pts: { x: number; y: number }[]; id: string; streak?: number; f?: number; tint?: string }> = ({ pts, id, streak = 0.35, f = 0, tint = "#bfe0ff" }) => {
  const poly = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const minX = Math.min(...pts.map((p) => p.x)), maxX = Math.max(...pts.map((p) => p.x));
  const minY = Math.min(...pts.map((p) => p.y)), maxY = Math.max(...pts.map((p) => p.y));
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity={0.16} />
          <stop offset="0.4" stopColor={tint} stopOpacity={0.06} />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity={0.2} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <polygon points={poly} fill={`url(#${id})`} />
      <polygon points={poly} fill={tint} opacity={0.06} />
      <polygon points={poly} fill="none" stroke="#e8f4ff" strokeWidth={2} opacity={streak} />
      {/* reflection streaks sliding with the move */}
      <g clipPath={undefined} opacity={streak}>
        <polygon points={`${minX},${maxY} ${minX + (maxX - minX) * 0.16},${minY} ${minX + (maxX - minX) * 0.28},${minY} ${minX + (maxX - minX) * 0.12},${maxY}`} fill="#fff" opacity={0.1} />
        <polygon points={`${minX + (maxX - minX) * 0.3},${maxY} ${minX + (maxX - minX) * 0.46},${minY} ${minX + (maxX - minX) * 0.5},${minY} ${minX + (maxX - minX) * 0.34},${maxY}`} fill="#fff" opacity={0.06 + 0.05 * Math.sin(f * 0.05)} />
      </g>
    </g>
  );
};

/* ───────────────────────────── interior: a lit back wall with windows (suburb night) ───────────────────────────── */

export const WallPanel: React.FC<{ x: number; y: number; w: number; h: number; fill: string; shade?: string; skirting?: string }> = ({ x, y, w, h, fill, shade, skirting }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={fill} />
    {shade && <rect x={x + w * 0.62} y={y} width={w * 0.38} height={h} fill={shade} opacity={0.6} />}
    {skirting && <rect x={x} y={y + h - 14} width={w} height={14} fill={skirting} />}
  </g>
);

/* ───────────────────────────── simple sedan silhouette for far traffic ───────────────────────────── */

export const FarCar: React.FC<{ x: number; y: number; s: number; dir?: number; tone?: string }> = ({ x, y, s, dir = 1, tone = "#1a1a20" }) => (
  <g transform={`translate(${x},${y}) scale(${s * dir},${s})`}>
    <path d="M-2.3,0 L-2.3,-0.55 L-1.7,-0.62 L-1.1,-1.05 L0.99,-1.05 L1.6,-0.62 L2.3,-0.55 L2.3,0 Z" fill={tone} />
    <path d="M-0.95,-0.68 L-0.6,-0.98 L0.85,-0.98 L1.35,-0.68 Z" fill="#3a4a5a" opacity={0.6} />
    <circle cx={-1.5} cy={-0.02} r={0.32} fill="#0c0c10" />
    <circle cx={1.5} cy={-0.02} r={0.32} fill="#0c0c10" />
  </g>
);
