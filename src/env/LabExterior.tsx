// Exterior: corrugated-metal lab building in a fenced desert compound at night.
// Far: star field, moving clouds, mountain ridge, distant highway traffic.
// Mid: building (14 m × 6 m), roll-up door (3.4 m), man-door (2.0 m), pickup truck (5.3 m).
// Near: chain-link fence posts, tumbleweed-scrub, drifting dust. 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, planePts, W, H, Blur, cocBlur } from "../lib/camera";
import { rand, noise1 } from "../lib/anim";

const OL = "#05080d";

export const NightSky: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const horizon = H / 2 + (cam.shiftY ?? 0) + cam.y * 0; // far horizon ~ eye level
  return (
    <g>
      <defs>
        <linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#03060f" />
          <stop offset="0.55" stopColor="#0b1a33" />
          <stop offset="1" stopColor="#1d3354" />
        </linearGradient>
        <radialGradient id="moonGlow"><stop offset="0" stopColor="#cfe0ff" stopOpacity={0.35} /><stop offset="1" stopColor="#cfe0ff" stopOpacity={0} /></radialGradient>
      </defs>
      <rect x={0} y={0} width={W} height={H} fill="url(#nsky)" />
      {Array.from({ length: 140 }).map((_, i) => {
        const x = rand(i, 11) * W - cam.x * 2, y = rand(i, 12) * horizon * 0.95;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(f * 0.04 + i * 1.7));
        return <circle key={i} cx={((x % W) + W) % W} cy={y} r={rand(i, 13) < 0.1 ? 1.6 : 0.9} fill="#dfe9ff" opacity={tw * (0.3 + rand(i, 14) * 0.6)} />;
      })}
      <circle cx={1500 - cam.x * 2} cy={170} r={160} fill="url(#moonGlow)" />
      <circle cx={1500 - cam.x * 2} cy={170} r={34} fill="#e9efff" />
      <circle cx={1490 - cam.x * 2} cy={162} r={8} fill="#cdd6ea" opacity={0.6} />
      {/* clouds drifting */}
      {[0, 1, 2, 3].map((i) => {
        const cx = ((rand(i, 21) * 2400 + f * (0.25 + i * 0.08) - cam.x * 4) % 2600) - 300;
        const cy = 90 + i * 70;
        return (
          <g key={i} opacity={0.5} transform={`translate(${cx},${cy})`}>
            <ellipse cx={0} cy={0} rx={260} ry={26} fill="#1b2c47" />
            <ellipse cx={70} cy={-14} rx={140} ry={24} fill="#22365a" />
            <ellipse cx={-40} cy={8} rx={180} ry={14} fill="#3b5683" opacity={0.35} />
          </g>
        );
      })}
    </g>
  );
};

export const Ridge: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  // mountains 6 km away: practically no parallax, only lens shift
  const base = H / 2 + (cam.shiftY ?? 0) + 18;
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * (W + 200) - 100 - cam.x * 0.4;
    const y = base - 40 - 110 * Math.abs(noise1(i * 0.35, 3)) - 60 * Math.max(0, Math.sin(i * 0.18 + 0.6));
    pts.push(`${x},${y}`);
  }
  // distant highway with moving cars (headlights / tail lights)
  const cars = [0, 1, 2].map((i) => {
    const dir = i % 2 ? -1 : 1;
    const x = ((rand(i, 41) * W + f * 2.2 * dir) % (W + 200) + W + 200) % (W + 200) - 100;
    return <g key={i}><circle cx={x} cy={base + 8} r={2.2} fill={dir > 0 ? "#fff6d8" : "#ff3b3b"} /><circle cx={x} cy={base + 8} r={8} fill={dir > 0 ? "#fff1c4" : "#ff4040"} opacity={0.2} /></g>;
  });
  return (
    <g>
      <polygon points={`-100,${base + 40} ${pts.join(" ")} ${W + 100},${base + 40}`} fill="#0e1a2c" />
      <polyline points={pts.join(" ")} fill="none" stroke="#3a5378" strokeWidth={1.5} opacity={0.5} />
      <rect x={0} y={base + 4} width={W} height={10} fill="#111d2c" />
      {cars}
    </g>
  );
};

export const LabBuilding: React.FC<{ cam: Cam; f: number; x: number; z: number; flicker?: number }> = ({ cam, f, x, z, flicker = 1 }) => {
  const w = 14, h = 6.2, doorW = 3.4, doorH = 3.4;
  return (
    <Card cam={cam} x={x} z={z}>
      <defs>
        <linearGradient id="blFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a2533" /><stop offset="1" stopColor="#2a3a4c" /></linearGradient>
        <linearGradient id="doorSpill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe6ff" /><stop offset="1" stopColor="#5fb6ff" /></linearGradient>
        <linearGradient id="spillFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fc0ff" stopOpacity={0.45} /><stop offset="1" stopColor="#6fc0ff" stopOpacity={0} /></linearGradient>
      </defs>
      {/* gable roof silhouette */}
      <polygon points={`${-w / 2 - 0.3},${-h} 0,${-h - 1.3} ${w / 2 + 0.3},${-h}`} fill="#121b26" stroke={OL} strokeWidth={0.05} />
      <rect x={-w / 2} y={-h} width={w} height={h} fill="url(#blFace)" stroke={OL} strokeWidth={0.05} />
      {Array.from({ length: 56 }).map((_, i) => <rect key={i} x={-w / 2 + i * 0.25} y={-h} width={0.1} height={h} fill={i % 2 ? "#0f1822" : "#2b3c4f"} opacity={0.55} />)}
      {/* rust streaks */}
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-w / 2 + rand(i, 51) * w} y={-h + 0.3} width={0.12} height={1 + rand(i, 52) * 2} fill="#6b3d22" opacity={0.25} />)}
      {/* clerestory windows glowing blue */}
      {[-5, -2.5, 0, 2.5, 5].map((wx, i) => {
        const fl = i === 3 ? 0.55 + 0.45 * flicker : 1;
        return <g key={i}><rect x={wx - 0.9} y={-h + 0.5} width={1.8} height={0.7} fill="#9ad3ff" opacity={0.85 * fl} stroke={OL} strokeWidth={0.05} /><rect x={wx - 1.4} y={-h + 0.2} width={2.8} height={1.3} fill="#7ec8ff" opacity={0.12 * fl} /></g>;
      })}
      {/* roll-up door, open 60%, spilling light */}
      <rect x={-doorW / 2 - 2} y={-doorH} width={doorW} height={doorH} fill="#0a1119" stroke={OL} strokeWidth={0.05} />
      <rect x={-doorW / 2 - 2} y={-doorH * 0.6} width={doorW} height={doorH * 0.6} fill="url(#doorSpill)" opacity={0.9} />
      {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={-doorW / 2 - 2} x2={doorW / 2 - 2} y1={-doorH + i * 0.22} y2={-doorH + i * 0.22} stroke="#1c2836" strokeWidth={0.04} />)}
      {/* interior silhouettes seen through the door: tank + shelving */}
      <rect x={-3.2} y={-1.6} width={0.7} height={1.6} rx={0.1} fill="#2b5577" opacity={0.75} />
      <rect x={-1.2} y={-1.9} width={0.06} height={1.9} fill="#2b5577" opacity={0.7} />
      {/* light spill on the ground */}
      <polygon points={`${-doorW / 2 - 2},0 ${doorW / 2 - 2},0 ${doorW / 2 - 1},2.2 ${-doorW / 2 - 3},2.2`} fill="url(#spillFloor)" transform="scale(1,0.35)" />
      {/* man-door 2.0 m with wall lamp */}
      <rect x={3.2} y={-2.0} width={0.95} height={2.0} fill="#233243" stroke={OL} strokeWidth={0.04} />
      <circle cx={4.0} cy={-1.0} r={0.04} fill="#c9d4dd" />
      <path d={`M3.4,-2.45 h0.55 l-0.08,0.15 h-0.39 Z`} fill="#3a4654" stroke={OL} strokeWidth={0.02} />
      <ellipse cx={3.67} cy={-2.28} rx={0.18} ry={0.05} fill="#fff4cf" />
      <defs><radialGradient id="warmGlow"><stop offset="0" stopColor="#ffe2a0" stopOpacity={0.35} /><stop offset="1" stopColor="#ffe2a0" stopOpacity={0} /></radialGradient></defs>
      <ellipse cx={3.67} cy={-1.6} rx={1.4} ry={1.6} fill="url(#warmGlow)" />
      {/* moths circling the lamp */}
      {[0, 1, 2].map((i) => { const a = f * (0.21 + i * 0.05) + i * 2; return <circle key={i} cx={3.67 + Math.cos(a) * (0.25 + i * 0.07)} cy={-2.2 + Math.sin(a * 1.3) * 0.18} r={0.025} fill="#f7f0d8" opacity={0.85} />; })}
      {/* signage: hazard placard, original (no show logos) */}
      <g transform="translate(5.6,-2.6)">
        <rect x={0} y={0} width={0.8} height={0.8} transform="rotate(45 0.4 0.4)" fill="#d8a23a" stroke={OL} strokeWidth={0.03} />
        <text x={0.4} y={0.52} fontSize={0.28} textAnchor="middle" fontFamily="Arial Black, Arial" fill="#1a1a1a">3</text>
      </g>
      {/* base grime */}
      <rect x={-w / 2} y={-0.35} width={w} height={0.35} fill="#3a2e24" opacity={0.6} />
    </Card>
  );
};

export const Pickup: React.FC<{ cam: Cam; x: number; z: number; color?: string; flip?: boolean }> = ({ cam, x, z, color = "#5d2a24", flip }) => (
  // full-size pickup ≈ 5.3 m long, 1.9 m tall
  <Card cam={cam} x={x} z={z} flip={flip}>
    <ellipse cx={0} cy={0} rx={2.9} ry={0.2} fill="#000" opacity={0.5} />
    <path d="M-2.65,-0.45 L-2.65,-1.05 L-0.6,-1.05 L-0.2,-1.85 L1.2,-1.85 L1.75,-1.15 L2.6,-1.05 L2.68,-0.45 Z" fill={color} stroke={OL} strokeWidth={0.04} strokeLinejoin="round" />
    <path d="M-0.05,-1.75 L1.1,-1.75 L1.55,-1.18 L-0.05,-1.18 Z" fill="#213347" stroke={OL} strokeWidth={0.03} />
    <path d="M0.1,-1.7 L0.5,-1.7 L0.3,-1.25 L0.05,-1.25 Z" fill="#9fc8ee" opacity={0.25} />
    <path d="M-2.65,-1.05 L-0.6,-1.05" stroke="#2a110e" strokeWidth={0.06} />
    <rect x={-2.6} y={-0.95} width={2.0} height={0.08} fill="#ffffff" opacity={0.08} />
    <rect x={2.5} y={-0.95} width={0.14} height={0.12} fill="#ffe9b0" />
    <rect x={-2.68} y={-0.95} width={0.06} height={0.16} fill="#b0151c" />
    <rect x={-2.75} y={-0.5} width={5.5} height={0.12} fill="#9aa4ad" stroke={OL} strokeWidth={0.02} />
    {[-1.7, 1.75].map((wx, i) => (
      <g key={i}><circle cx={wx} cy={-0.4} r={0.4} fill="#111" stroke={OL} strokeWidth={0.03} /><circle cx={wx} cy={-0.4} r={0.2} fill="#8a949c" /><circle cx={wx} cy={-0.4} r={0.06} fill="#333" /></g>
    ))}
  </Card>
);

export const FencePosts: React.FC<{ cam: Cam; z: number; x0: number; x1: number }> = ({ cam, z, x0, x1 }) => {
  const n = Math.round((x1 - x0) / 2.5);
  return (
    <Card cam={cam} x={x0} z={z}>
      <rect x={0} y={-1.9} width={x1 - x0} height={1.9} fill="url(#chain)" opacity={0.55} />
      <defs>
        <pattern id="chain" width={0.12} height={0.12} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={0.12} height={0.12} fill="none" stroke="#5e6f80" strokeWidth={0.012} />
        </pattern>
      </defs>
      <line x1={0} x2={x1 - x0} y1={-1.9} y2={-1.9} stroke="#55616d" strokeWidth={0.05} />
      {Array.from({ length: n + 1 }).map((_, i) => <rect key={i} x={i * 2.5 - 0.04} y={-2.0} width={0.08} height={2.0} fill="#4b5763" stroke={OL} strokeWidth={0.015} />)}
      {/* barbed wire */}
      <path d={`M0,-2.05 ${Array.from({ length: 30 }).map((_, i) => `L${((i + 1) * (x1 - x0)) / 30},${i % 2 ? -2.05 : -2.1}`).join(" ")}`} stroke="#6a7682" strokeWidth={0.015} fill="none" />
    </Card>
  );
};

export const DesertGround: React.FC<{ cam: Cam; f: number; zFar?: number }> = ({ cam, f, zFar = 400 }) => {
  const poly = planePts(cam, [[-300, cam.z + 0.5], [300, cam.z + 0.5], [300, zFar], [-300, zFar]], 0);
  // gravel lot in front of the building (lit by the door spill), packed dirt tyre tracks, puddle
  const lot = planePts(cam, [[-14, 12], [12, 12], [12, 27], [-14, 27]], 0.001);
  const track = (x0: number) => planePts(cam, [[x0, cam.z + 1], [x0 + 0.35, cam.z + 1], [x0 - 1.6, 26.5], [x0 - 1.95, 26.5]], 0.002);
  const puddle: [number, number][] = Array.from({ length: 18 }).map((_, i) => { const a = (i / 18) * Math.PI * 2; return [-2.6 + Math.cos(a) * (1.3 + 0.25 * Math.sin(a * 3)), 19.5 + Math.sin(a) * 0.6]; });
  const scrub = Array.from({ length: 46 }).map((_, i) => {
    const wx = -30 + rand(i, 61) * 60, wz = cam.z + 4 + rand(i, 62) * 50;
    if (Math.abs(wx + 1) < 8 && wz > 11 && wz < 27) return null; // keep the lot clear
    const p = project(cam, wx, 0, wz);
    if (p.d < 0.5) return null;
    const sway = noise1(f * 0.03 + i, 7) * 0.05;
    const sc = 0.6 + rand(i, 63) * 0.8;
    return (
      <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * sc})`}>
        <ellipse cx={0.05} cy={0} rx={0.38} ry={0.05} fill="#000" opacity={0.35} />
        <path d={`M-0.3,0 Q${-0.2 + sway},-0.35 0,-0.4 Q${0.25 + sway},-0.33 0.32,0 Z`} fill="#1f2c22" />
        <path d={`M-0.15,-0.05 Q${-0.05 + sway},-0.3 0.05,-0.36`} stroke="#3c5244" strokeWidth={0.03} fill="none" />
      </g>
    );
  });
  const rocks = Array.from({ length: 30 }).map((_, i) => {
    const wx = -12 + rand(i, 64) * 22, wz = 12.5 + rand(i, 65) * 14;
    const p = project(cam, wx, 0, wz);
    return <ellipse key={i} cx={p.x} cy={p.y} rx={(0.06 + rand(i, 66) * 0.1) * p.s} ry={(0.025 + rand(i, 67) * 0.03) * p.s} fill={rand(i, 68) > 0.5 ? "#3a3d44" : "#2a2d33"} />;
  });
  return (
    <g>
      <defs>
        <linearGradient id="dgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141b26" /><stop offset="1" stopColor="#2b2a2c" /></linearGradient>
        <linearGradient id="lotg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a3747" /><stop offset="1" stopColor="#1a1d24" /></linearGradient>
      </defs>
      <polygon points={poly} fill="url(#dgr)" />
      <polygon points={lot} fill="url(#lotg)" opacity={0.85} />
      <polygon points={track(-1.2)} fill="#14171c" opacity={0.6} />
      <polygon points={track(0.9)} fill="#14171c" opacity={0.6} />
      <polygon points={planePts(cam, puddle, 0.003)} fill="#0c1826" />
      <polygon points={planePts(cam, puddle.map(([x, z]) => [x * 0.98 - 0.05, z]), 0.004)} fill="#5aaeff" opacity={0.18 + 0.04 * Math.sin(f * 0.1)} />
      {rocks}
      {scrub}
    </g>
  );
};

export { Blur, cocBlur };
