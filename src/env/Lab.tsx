// Night meth-lab interior + exterior, built in METRES on the 2.5D camera.
// Reference notes (web search, finale lab): dark corrugated warehouse, cold blue-white
// fluorescent tubes, stainless pressure vessels with gauges, metal shelving with drums,
// polished concrete floor, hanging respirators, glass partitions. Original layout & art.
import React from "react";
import { Cam, Card, project, planePts, W, H, Blur, cocBlur } from "../lib/camera";
import { noise1, rand } from "../lib/anim";

export const LAB = {
  bg: "#070d15", wall: "#16222f", wallLit: "#1f3142", rib: "#0f1822",
  floor: "#1a2632", floorLit: "#2b3d4e", steel: "#8ea4b6", steelDark: "#3a4b5a", steelLight: "#e8f3ff",
  tube: "#d9f0ff", glow: "#7fc4ff", ol: "#0a0f16",
};

/* ───────────── stainless vessel (cylinder with dome, flange, gauge, legs) ───────────── */
export const Tank: React.FC<{ cam: Cam; x: number; z: number; r?: number; h?: number; legs?: boolean; gauge?: boolean; hand?: number; label?: string }> = ({ cam, x, z, r = 0.45, h = 1.55, legs = true, gauge = true, hand = 0 }) => {
  const d = z - cam.z;
  const lift = legs ? 0.22 : 0;
  const top = lift + h;
  // ellipse squash from viewing angle (positive = we look down onto the top)
  const tilt = (y: number) => Math.max(-0.5, Math.min(0.5, (cam.y - y) / Math.max(0.3, d)));
  const eT = r * tilt(top), eB = r * tilt(lift);
  const gid = `tg${Math.round(x * 10)}_${Math.round(z * 10)}`;
  return (
    <Card cam={cam} x={x} z={z}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={LAB.steelDark} />
          <stop offset="0.12" stopColor="#6d8396" />
          <stop offset="0.26" stopColor={LAB.steelLight} />
          <stop offset="0.34" stopColor="#a9bccb" />
          <stop offset="0.55" stopColor="#5d7284" />
          <stop offset="0.78" stopColor="#9fb5c7" />
          <stop offset="0.86" stopColor="#d8e9f8" />
          <stop offset="1" stopColor="#2b3946" />
        </linearGradient>
      </defs>
      {/* contact shadow */}
      <ellipse cx={0} cy={0} rx={r * 1.25} ry={Math.max(0.05, Math.abs(r * tilt(0)) * 1.2)} fill="#000" opacity={0.55} />
      {legs && [-0.7, 0.7, 0].map((k, i) => (
        <rect key={i} x={k * r - 0.025} y={-lift - 0.02} width={0.05} height={lift + 0.02} fill={i === 2 ? "#26323d" : "#4f6273"} stroke={LAB.ol} strokeWidth={0.008} />
      ))}
      {/* body */}
      <path d={`M${-r},${-lift} L${-r},${-top} A${r},${Math.abs(eT)} 0 0 1 ${r},${-top} L${r},${-lift} A${r},${Math.abs(eB) + 0.001} 0 0 1 ${-r},${-lift} Z`} fill={`url(#${gid})`} stroke={LAB.ol} strokeWidth={0.012} />
      {/* weld seams + flange band */}
      <path d={`M${-r},${-lift - h * 0.33} A${r},${Math.abs(eB) * 0.9 + 0.01} 0 0 0 ${r},${-lift - h * 0.33}`} stroke="#3f5262" strokeWidth={0.01} fill="none" opacity={0.8} />
      <path d={`M${-r - 0.015},${-top + 0.12} A${r + 0.015},${Math.abs(eT) + 0.01} 0 0 0 ${r + 0.015},${-top + 0.12}`} stroke="#c9dbea" strokeWidth={0.05} fill="none" />
      <path d={`M${-r - 0.015},${-top + 0.12} A${r + 0.015},${Math.abs(eT) + 0.01} 0 0 0 ${r + 0.015},${-top + 0.12}`} stroke={LAB.ol} strokeWidth={0.006} fill="none" transform="translate(0,0.026)" />
      {/* bolts */}
      {Array.from({ length: 9 }).map((_, i) => { const a = (i / 8) * Math.PI; return <circle key={i} cx={-Math.cos(a) * r} cy={-top + 0.12 + Math.sin(a) * Math.abs(eT)} r={0.012} fill="#2e3c48" />; })}
      {/* dome lid */}
      <path d={`M${-r},${-top} A${r},${Math.abs(eT)} 0 0 1 ${r},${-top} Q${r * 0.9},${-top - r * 0.55} 0,${-top - r * 0.62} Q${-r * 0.9},${-top - r * 0.55} ${-r},${-top} Z`} fill="#9db2c4" stroke={LAB.ol} strokeWidth={0.012} />
      <path d={`M${-r * 0.6},${-top - r * 0.3} Q${-r * 0.2},${-top - r * 0.6} ${r * 0.2},${-top - r * 0.58}`} stroke="#f2f8ff" strokeWidth={0.03} fill="none" opacity={0.7} strokeLinecap="round" />
      {/* valve stem + wheel */}
      <rect x={-0.03} y={-top - r * 0.62 - 0.14} width={0.06} height={0.14} fill="#7a8d9c" stroke={LAB.ol} strokeWidth={0.008} />
      <ellipse cx={0} cy={-top - r * 0.62 - 0.15} rx={0.11} ry={0.03} fill="none" stroke="#b33a2e" strokeWidth={0.022} />
      {/* outlet pipe */}
      <path d={`M${r},${-lift - 0.25} h0.18 v0.12`} stroke="#6f8494" strokeWidth={0.05} fill="none" strokeLinecap="round" />
      <path d={`M${r},${-lift - 0.25} h0.18 v0.12`} stroke={LAB.ol} strokeWidth={0.006} fill="none" opacity={0.6} transform="translate(0,-0.025)" />
      {gauge && (
        <g transform={`translate(${-r * 0.45},${-top + 0.35})`}>
          <rect x={-0.015} y={0} width={0.03} height={0.08} fill="#55687a" />
          <circle cx={0} cy={0} r={0.085} fill="#e9eef0" stroke="#2a3540" strokeWidth={0.018} />
          {Array.from({ length: 9 }).map((_, i) => { const a = -220 + i * 32.5; const ra = (a * Math.PI) / 180; return <line key={i} x1={Math.cos(ra) * 0.06} y1={Math.sin(ra) * 0.06} x2={Math.cos(ra) * 0.072} y2={Math.sin(ra) * 0.072} stroke="#333" strokeWidth={0.006} />; })}
          <path d="M0.03,0.02 A0.065,0.065 0 0 0 0.06,-0.03" stroke="#c0392b" strokeWidth={0.008} fill="none" />
          <line x1={0} y1={0} x2={0.045} y2={-0.045} stroke="#151515" strokeWidth={0.008} strokeLinecap="round" />
          <circle cx={0} cy={0} r={0.01} fill="#151515" />
          <path d="M-0.06,-0.03 A0.07,0.07 0 0 1 -0.02,-0.065" stroke="#fff" strokeWidth={0.01} fill="none" opacity={0.8} />
        </g>
      )}
      {/* bloody handprint (smeared downward) */}
      {hand > 0 && <HandSmear x={-r * 0.1} y={-lift - h * 0.62} s={1} opacity={hand} />}
      {/* reflected fluorescent streak */}
      <rect x={-r * 0.42} y={-top + 0.15} width={r * 0.06} height={h - 0.3} fill="#fff" opacity={0.35} />
    </Card>
  );
};

/** red palm print dragged downward (drawn in metres, ~0.19 m hand). Organic, uneven density. */
export const HandSmear: React.FC<{ x: number; y: number; s?: number; opacity?: number; drag?: number }> = ({ x, y, s = 1, opacity = 1, drag = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={opacity}>
    {/* dragged streaks: fade and thin out as the hand slid down */}
    {[[-0.047, 0.012, 0.55], [-0.021, 0.014, 0.7], [0.004, 0.013, 0.62], [0.028, 0.011, 0.5], [-0.01, 0.03, 0.28]].map(([fx, w, o], i) => (
      <path key={i} d={`M${fx},${0.0} C${fx - 0.006},${0.07 * drag} ${fx + 0.008},${0.13 * drag} ${fx + 0.003},${(0.2 + i * 0.015) * drag} L${fx + 0.003 + w * 0.15},${(0.2 + i * 0.015) * drag} C${fx + 0.01 + w * 0.5},${0.12 * drag} ${fx + w * 0.4},${0.06 * drag} ${fx + w},${0.0} Z`}
        fill="#7a0b11" opacity={o} />
    ))}
    {/* palm: irregular blob, darker rim where blood pooled */}
    <path d="M-0.058,-0.018 C-0.066,0.018 -0.05,0.058 -0.02,0.074 C0.004,0.086 0.036,0.074 0.05,0.048 C0.062,0.022 0.058,-0.006 0.05,-0.024 C0.026,-0.036 -0.03,-0.036 -0.058,-0.018 Z" fill="#8e1016" opacity={0.85} />
    <path d="M-0.04,-0.01 C-0.044,0.02 -0.03,0.05 -0.008,0.056 C0.012,0.06 0.03,0.046 0.036,0.024 C0.03,0.0 0.0,-0.012 -0.04,-0.01 Z" fill="#b0222a" opacity={0.45} />
    {/* fingers: tapered, separate pads with gaps */}
    {[[-0.05, -0.098, 0.017, -8], [-0.024, -0.124, 0.018, -3], [0.004, -0.121, 0.018, 3], [0.03, -0.098, 0.016, 8]].map(([fx, fy, w, a], i) => (
      <g key={i} transform={`translate(${fx},-0.026) rotate(${a})`}>
        <path d={`M${-w / 2},0 C${-w / 2},${(fy + 0.026) * 0.5} ${-w * 0.45},${fy + 0.03} 0,${fy + 0.026} C${w * 0.45},${fy + 0.03} ${w / 2},${(fy + 0.026) * 0.5} ${w / 2},0 Z`} fill="#9a121a" opacity={0.85} />
        <ellipse cx={0} cy={fy + 0.04} rx={w * 0.42} ry={w * 0.7} fill="#6d0a0f" opacity={0.6} />
      </g>
    ))}
    {/* thumb smudge */}
    <path d="M0.05,0.004 C0.066,-0.006 0.08,-0.03 0.086,-0.052 C0.09,-0.062 0.08,-0.066 0.074,-0.058 C0.066,-0.036 0.056,-0.018 0.044,-0.008 Z" fill="#9a121a" opacity={0.8} />
    {/* speckle + wet sheen */}
    {[[-0.07, 0.03, 0.004], [0.066, 0.06, 0.003], [-0.03, 0.1, 0.0035], [0.05, -0.08, 0.003], [-0.075, -0.05, 0.0025]].map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={sy} r={r} fill="#8a0f14" />)}
    <path d="M-0.03,0.008 Q-0.008,-0.004 0.016,0.006" stroke="#ff9b9b" strokeWidth={0.004} fill="none" opacity={0.35} strokeLinecap="round" />
    {/* drips that ran further */}
    <path d="M-0.016,0.07 q0.002,0.07 0.0,0.15" stroke="#7d0d12" strokeWidth={0.006} strokeLinecap="round" />
    <circle cx={-0.016} cy={0.222} r={0.0065} fill="#7d0d12" />
    <path d="M0.032,0.06 q0.001,0.05 0.0,0.09" stroke="#7d0d12" strokeWidth={0.005} strokeLinecap="round" />
  </g>
);

/* ───────────── hanging fluorescent fixture + light cone ───────────── */
export const Fluoro: React.FC<{ cam: Cam; x: number; z: number; y?: number; len?: number; on?: number }> = ({ cam, x, z, y = 3.6, len = 1.4, on = 1 }) => (
  <Card cam={cam} x={x} y={y} z={z}>
    <line x1={-len * 0.4} y1={0} x2={-len * 0.4} y2={-1.2} stroke="#111a22" strokeWidth={0.012} />
    <line x1={len * 0.4} y1={0} x2={len * 0.4} y2={-1.2} stroke="#111a22" strokeWidth={0.012} />
    <rect x={-len / 2} y={-0.06} width={len} height={0.07} rx={0.02} fill="#2a3640" stroke={LAB.ol} strokeWidth={0.01} />
    <rect x={-len / 2 + 0.04} y={0.005} width={len - 0.08} height={0.035} rx={0.017} fill={LAB.tube} opacity={0.25 + 0.75 * on} />
    <defs><radialGradient id="fluoGlow"><stop offset="0" stopColor={LAB.glow} stopOpacity={0.5} /><stop offset="1" stopColor={LAB.glow} stopOpacity={0} /></radialGradient></defs>
    <ellipse cx={0} cy={0.02} rx={len * 0.85} ry={0.32} fill="url(#fluoGlow)" opacity={on} />
  </Card>
);

/** screen-space volumetric cone from a ceiling light down to the floor */
export const LightCone: React.FC<{ cam: Cam; x: number; z: number; y?: number; w?: number; on?: number; color?: string }> = ({ cam, x, z, y = 3.6, w = 1.2, on = 1, color = "#9fd4ff" }) => {
  const a = project(cam, x - w * 0.4, y, z), b = project(cam, x + w * 0.4, y, z);
  const c = project(cam, x + w * 1.4, 0, z), d = project(cam, x - w * 1.4, 0, z);
  const id = `lc${Math.round(x * 10)}_${Math.round(z * 10)}`;
  return (
    <g opacity={on}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0.28} />
          <stop offset="0.7" stopColor={color} stopOpacity={0.06} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill={`url(#${id})`} />
    </g>
  );
};

/* ───────────── room shell: back wall, ceiling, floor ───────────── */
export const LabRoom: React.FC<{ cam: Cam; f: number; backZ?: number; floorReflect?: boolean; police?: number }> = ({ cam, f, backZ = 14, police = 0 }) => {
  const x0 = -12, x1 = 12, wallH = 5;
  const bl = project(cam, x0, 0, backZ), br = project(cam, x1, 0, backZ), tl = project(cam, x0, wallH, backZ), tr = project(cam, x1, wallH, backZ);
  const s = bl.s;
  const blur = cocBlur(cam, backZ - cam.z);
  const ribs = [] as React.ReactNode[];
  for (let i = 0; i <= 96; i++) {
    const xx = x0 + i * 0.25;
    const p = project(cam, xx, 0, backZ);
    ribs.push(<line key={i} x1={p.x} y1={tl.y} x2={p.x} y2={bl.y} stroke={i % 2 ? LAB.rib : "#1d2b39"} strokeWidth={Math.max(1, 0.06 * s)} />);
  }
  // shelving units with drums and jugs on the back wall
  const shelves = [-7.5, -4.6, 4.2, 7.2].map((sx, si) => (
    <Card key={si} cam={cam} x={sx} z={backZ - 0.5} blur={false}>
      {[0.05, 0.75, 1.45, 2.15].map((sy, k) => <rect key={k} x={-1.1} y={-sy - 0.04} width={2.2} height={0.04} fill="#3b4a58" />)}
      {[-1.1, 1.06].map((px, k) => <rect key={k} x={px} y={-2.3} width={0.04} height={2.3} fill="#2c3946" />)}
      {[0, 1, 2].map((row) => Array.from({ length: 6 }).map((_, j) => {
        const kind = rand(si * 31 + row * 7 + j, 3);
        const cx = -0.95 + j * 0.36;
        const by = -(0.09 + row * 0.7);
        if (kind < 0.35) return <g key={`${row}${j}`}><rect x={cx} y={by - 0.5} width={0.3} height={0.5} rx={0.03} fill={kind < 0.15 ? "#2f5d8a" : "#2c6b4e"} /><rect x={cx} y={by - 0.42} width={0.3} height={0.03} fill="#00000055" /><rect x={cx} y={by - 0.18} width={0.3} height={0.03} fill="#00000055" /></g>;
        if (kind < 0.7) return <g key={`${row}${j}`}><rect x={cx + 0.04} y={by - 0.32} width={0.22} height={0.32} rx={0.04} fill="#c9d6de" opacity={0.85} /><rect x={cx + 0.11} y={by - 0.38} width={0.08} height={0.06} fill="#e4b340" /><rect x={cx + 0.06} y={by - 0.2} width={0.18} height={0.08} fill="#f3f3f3" opacity={0.8} /></g>;
        return <rect key={`${row}${j}`} x={cx} y={by - 0.24} width={0.32} height={0.24} fill="#8a6b45" stroke="#00000055" strokeWidth={0.01} />;
      }))}
    </Card>
  ));
  // high clerestory windows (night) – police lights wash through them at the end
  const wins = [-9, -6, -3, 0, 3, 6, 9].map((wx, i) => {
    const a = project(cam, wx - 1.1, 4.0, backZ), b = project(cam, wx + 1.1, 4.7, backZ);
    const pr = police > 0 ? (Math.sin(f * 0.5 + i) > 0 ? "#ff3048" : "#3070ff") : "#0d2236";
    return (
      <g key={i}>
        <rect x={a.x} y={b.y} width={b.x - a.x} height={a.y - b.y} fill="#0b1a2a" stroke="#05090e" strokeWidth={Math.max(1, s * 0.05)} />
        <rect x={a.x} y={b.y} width={b.x - a.x} height={a.y - b.y} fill={pr} opacity={police * 0.7} />
        {[1, 2, 3].map((m) => <line key={m} x1={a.x + ((b.x - a.x) * m) / 4} y1={b.y} x2={a.x + ((b.x - a.x) * m) / 4} y2={a.y} stroke="#05090e" strokeWidth={Math.max(1, s * 0.03)} />)}
        <circle cx={a.x + (b.x - a.x) * 0.7} cy={b.y + (a.y - b.y) * 0.4} r={Math.max(0.5, s * 0.015)} fill="#e7f2ff" opacity={0.6} />
      </g>
    );
  });
  // ceiling plane + trusses
  const ceil = planePts(cam, [[x0, cam.z + 0.5], [x1, cam.z + 0.5], [x1, backZ], [x0, backZ]], wallH);
  const trusses = [3, 6, 9, 12].map((tz) => {
    const a = project(cam, x0, wallH - 0.2, tz), b = project(cam, x1, wallH - 0.2, tz);
    return <line key={tz} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0a1018" strokeWidth={Math.max(2, a.s * 0.18)} />;
  });
  // floor
  const floor = planePts(cam, [[x0, cam.z + 0.3], [x1, cam.z + 0.3], [x1, backZ], [x0, backZ]], 0);
  const joints = [] as React.ReactNode[];
  for (let gx = -12; gx <= 12; gx += 2) {
    const a = project(cam, gx, 0, Math.max(cam.z + 0.4, 1)), b = project(cam, gx, 0, backZ);
    joints.push(<line key={`x${gx}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0e1720" strokeWidth={1.2} opacity={0.7} />);
  }
  for (let gz = 2; gz <= backZ; gz += 2) {
    if (gz <= cam.z + 0.4) continue;
    const a = project(cam, x0, 0, gz), b = project(cam, x1, 0, gz);
    joints.push(<line key={`z${gz}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0e1720" strokeWidth={1.2} opacity={0.7} />);
  }
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill={LAB.bg} />
      <polygon points={ceil} fill="#0a121b" />
      {trusses}
      <g>
        <polygon points={`${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`} fill={LAB.wall} />
        {ribs}
        {/* roll-up door */}
        {(() => { const a = project(cam, -1.8, 0, backZ - 0.01), b = project(cam, 1.8, 3.4, backZ - 0.01); return <g><rect x={a.x} y={b.y} width={b.x - a.x} height={a.y - b.y} fill="#202e3b" />{Array.from({ length: 14 }).map((_, i) => <line key={i} x1={a.x} x2={b.x} y1={b.y + ((a.y - b.y) * i) / 14} y2={b.y + ((a.y - b.y) * i) / 14} stroke="#141e28" strokeWidth={Math.max(1, s * 0.03)} />)}</g>; })()}
        {wins}
        {shelves}
        {/* atmospheric haze instead of a full-frame depth blur (same read, ~5× cheaper to render) */}
        <polygon points={`${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`} fill={LAB.bg} opacity={Math.min(0.45, 0.12 + blur * 0.05)} />
      </g>
      <polygon points={floor} fill="url(#labFloorGrad)" />
      <defs>
        <linearGradient id="labFloorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101a24" />
          <stop offset="0.5" stopColor={LAB.floor} />
          <stop offset="1" stopColor="#223241" />
        </linearGradient>
      </defs>
      {joints}
    </g>
  );
};

/** soft floor reflection pool under a light (polished concrete) */
export const FloorGlow: React.FC<{ cam: Cam; x: number; z: number; w?: number; d?: number; color?: string; o?: number }> = ({ cam, x, z, w = 2.4, d = 1.6, color = "#7fbfff", o = 0.18 }) => {
  const p = project(cam, x, 0, z);
  const q = project(cam, x, 0, z + d / 2);
  const ry = Math.max(2, Math.abs(p.y - q.y));
  const id = `fg${Math.round(x * 10)}${Math.round(z * 10)}`;
  return (
    <g>
      <defs><radialGradient id={id}><stop offset="0" stopColor={color} stopOpacity={o} /><stop offset="1" stopColor={color} stopOpacity={0} /></radialGradient></defs>
      <ellipse cx={p.x} cy={p.y} rx={(w / 2) * p.s} ry={ry} fill={`url(#${id})`} />
    </g>
  );
};

/** glass partition panel (aluminium frame, reflections) */
export const GlassWall: React.FC<{ cam: Cam; x0: number; x1: number; z: number; h?: number; f: number }> = ({ cam, x0, x1, z, h = 2.6, f }) => {
  const n = Math.max(1, Math.round((x1 - x0) / 1.2));
  const pw = (x1 - x0) / n;
  return (
    <Card cam={cam} x={x0} z={z} blur={false}>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={i * pw} y={-h} width={pw} height={h} fill="#9fd0ff" opacity={0.07} />
          {/* diagonal sheen that slides as the camera moves */}
          <polygon points={`${i * pw + pw * (0.15 + ((cam.x * 0.08 + i * 0.3) % 1) * 0.5)},${-h} ${i * pw + pw * (0.3 + ((cam.x * 0.08 + i * 0.3) % 1) * 0.5)},${-h} ${i * pw + pw * (0.05 + ((cam.x * 0.08 + i * 0.3) % 1) * 0.5)},0 ${i * pw + pw * (-0.1 + ((cam.x * 0.08 + i * 0.3) % 1) * 0.5)},0`} fill="#e6f4ff" opacity={0.09} />
          <rect x={i * pw} y={-h} width={0.05} height={h} fill="#5c6f80" stroke={LAB.ol} strokeWidth={0.008} />
        </g>
      ))}
      <rect x={x1 - x0 - 0.05} y={-h} width={0.05} height={h} fill="#5c6f80" stroke={LAB.ol} strokeWidth={0.008} />
      <rect x={0} y={-h - 0.06} width={x1 - x0} height={0.06} fill="#5c6f80" stroke={LAB.ol} strokeWidth={0.008} />
      <rect x={0} y={-0.1} width={x1 - x0} height={0.1} fill="#3e4f5e" stroke={LAB.ol} strokeWidth={0.008} />
      {/* finger smudges / dust on glass */}
      {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={rand(i, 4) * (x1 - x0)} cy={-0.8 - rand(i, 5) * 1.2} rx={0.08} ry={0.05} fill="#fff" opacity={0.04} />)}
      {noise1(f * 0.02) > 2 ? null : null}
    </Card>
  );
};

/** steel work table with glassware (near-layer dressing) */
export const GlassTableArt: React.FC<{ w?: number }> = ({ w = 2.2 }) => (
  <>
    <rect x={-w / 2} y={-0.92} width={w} height={0.05} fill="#a7bccd" stroke={LAB.ol} strokeWidth={0.01} />
    <rect x={-w / 2} y={-0.87} width={w} height={0.04} fill="#55687a" />
    {[-w / 2 + 0.05, w / 2 - 0.1].map((lx, i) => <rect key={i} x={lx} y={-0.87} width={0.05} height={0.87} fill="#4b5d6d" stroke={LAB.ol} strokeWidth={0.008} />)}
    <rect x={-w / 2 + 0.05} y={-0.25} width={w - 0.1} height={0.03} fill="#44566a" />
    {/* flasks, beakers, condenser */}
    <g transform={`translate(${-w * 0.3},-0.92)`}>
      <path d="M-0.04,-0.3 L-0.04,-0.2 L-0.13,0 L0.13,0 L0.04,-0.2 L0.04,-0.3 Z" fill="#cfeaff" fillOpacity={0.25} stroke="#dff2ff" strokeWidth={0.008} />
      <path d="M-0.1,-0.06 L0.1,-0.06 L0.13,0 L-0.13,0 Z" fill="#59b6ff" opacity={0.6} />
    </g>
    <g transform={`translate(${-w * 0.05},-0.92)`}>
      <rect x={-0.06} y={-0.18} width={0.12} height={0.18} fill="#cfeaff" fillOpacity={0.2} stroke="#dff2ff" strokeWidth={0.008} />
      <rect x={-0.06} y={-0.08} width={0.12} height={0.08} fill="#7fd0ff" opacity={0.5} />
    </g>
    <g transform={`translate(${w * 0.22},-0.92)`}>
      <circle cx={0} cy={-0.12} r={0.11} fill="#cfeaff" fillOpacity={0.2} stroke="#dff2ff" strokeWidth={0.008} />
      <rect x={-0.025} y={-0.42} width={0.05} height={0.2} fill="#cfeaff" fillOpacity={0.2} stroke="#dff2ff" strokeWidth={0.008} />
      <line x1={0} y1={-0.42} x2={0.35} y2={-0.62} stroke="#dff2ff" strokeWidth={0.03} opacity={0.6} />
      <rect x={-0.12} y={-0.02} width={0.24} height={0.02} fill="#222" />
    </g>
  </>
);
export const GlassTable: React.FC<{ cam: Cam; x: number; z: number; w?: number; blur?: boolean }> = ({ cam, x, z, w = 2.2, blur = true }) => (
  <Card cam={cam} x={x} z={z} blur={blur}><GlassTableArt w={w} /></Card>
);

/** respirators hanging on a steel post */
export const MaskPostArt: React.FC = () => (
  <>
    <rect x={-0.06} y={-4.6} width={0.12} height={4.6} fill="#283642" stroke={LAB.ol} strokeWidth={0.01} />
    <rect x={-0.06} y={-4.6} width={0.03} height={4.6} fill="#3d5163" />
    {[1.75, 1.45].map((my, i) => (
      <g key={i} transform={`translate(${i ? 0.16 : -0.14},${-my})`}>
        <line x1={0} y1={-0.12} x2={i ? -0.16 : 0.14} y2={-0.2} stroke="#111" strokeWidth={0.01} />
        <path d="M-0.07,-0.09 Q0,-0.14 0.07,-0.09 L0.06,0.04 Q0,0.085 -0.06,0.04 Z" fill="#1d2329" stroke="#05080b" strokeWidth={0.008} />
        <path d="M-0.05,-0.06 Q0,-0.09 0.05,-0.06" stroke="#4a5866" strokeWidth={0.01} fill="none" />
        <circle cx={-0.055} cy={0.03} r={0.03} fill="#6f6a4a" stroke="#05080b" strokeWidth={0.006} />
        <circle cx={0.055} cy={0.03} r={0.03} fill="#6f6a4a" stroke="#05080b" strokeWidth={0.006} />
        <circle cx={-0.055} cy={0.03} r={0.012} fill="#2a2a22" />
        <circle cx={0.055} cy={0.03} r={0.012} fill="#2a2a22" />
      </g>
    ))}
  </>
);
export const MaskPost: React.FC<{ cam: Cam; x: number; z: number; blur?: boolean }> = ({ cam, x, z, blur = true }) => (
  <Card cam={cam} x={x} z={z} blur={blur}><MaskPostArt /></Card>
);

/** coiled hose on the floor (lies on plane y = 0) */
export const Hose: React.FC<{ cam: Cam; pts: [number, number][]; color?: string; w?: number }> = ({ cam, pts, color = "#c94a2a", w = 0.04 }) => {
  const P = pts.map(([x, z]) => project(cam, x, 0.02, z));
  let d = `M${P[0].x},${P[0].y}`;
  for (let i = 1; i < P.length - 1; i++) { const mx = (P[i].x + P[i + 1].x) / 2, my = (P[i].y + P[i + 1].y) / 2; d += ` Q${P[i].x},${P[i].y} ${mx},${my}`; }
  d += ` L${P[P.length - 1].x},${P[P.length - 1].y}`;
  const avgS = P.reduce((a, p) => a + p.s, 0) / P.length;
  return (
    <g>
      <path d={d} stroke="#05080b" strokeWidth={w * avgS + 3} fill="none" strokeLinecap="round" />
      <path d={d} stroke={color} strokeWidth={w * avgS} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#fff" strokeOpacity={0.25} strokeWidth={w * avgS * 0.25} fill="none" strokeLinecap="round" transform={`translate(0,${-w * avgS * 0.2})`} />
    </g>
  );
};

/** blood pool on the floor plane, grows with `t` (0..1), centred at world (x, z) */
export const BloodPool: React.FC<{ cam: Cam; x: number; z: number; t: number; r?: number }> = ({ cam, x, z, t, r = 0.55 }) => {
  if (t <= 0) return null;
  const pts: [number, number][] = [];
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const rr = r * t * (0.75 + 0.25 * Math.sin(a * 3 + 1.3) + 0.12 * Math.sin(a * 7));
    pts.push([x + Math.cos(a) * rr * 1.25, z + Math.sin(a) * rr * 0.8]);
  }
  const hi: [number, number][] = pts.map(([px, pz]) => [x + (px - x) * 0.55 - 0.05, z + (pz - z) * 0.55 - 0.03]);
  return (
    <g>
      <polygon points={planePts(cam, pts, 0.003)} fill="#4a070b" />
      <polygon points={planePts(cam, pts.map(([px, pz]) => [x + (px - x) * 0.85, z + (pz - z) * 0.85]), 0.004)} fill="#6e0c12" />
      <polygon points={planePts(cam, hi, 0.005)} fill="#a4313a" opacity={0.25} />
    </g>
  );
};
