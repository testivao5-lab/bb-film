// BATCH D kit · shared props: money barrel, paper bands, phone, key fob, laser dot,
// chain, bags, machine gun, lotto ticket, photograph, payphone. All in METRES inside a <Card>.
import React from "react";

const OL = "#0d0a08";

/* ───────────────────────────── money barrel (blue drum + cash) ───────────────────────────── */

export const Barrel: React.FC<{
  /** 0 = closed lid, 1 = lid fully open (flipped back) */
  open?: number;
  /** how far the cash mound rises above the rim, metres */
  cash?: number;
  /** blue plastic / weathered steel */
  kind?: "blue" | "rust";
  /** catch-light strength */
  light?: number;
  label?: string;
}> = ({ open = 0, cash = 0.1, kind = "blue", light = 1 }) => {
  const body = kind === "blue" ? "#3d6f9e" : "#8a5a3c";
  const bodyDk = kind === "blue" ? "#24486b" : "#5a3826";
  const bodyLt = kind === "blue" ? "#6f9fc9" : "#b9865c";
  const rim = kind === "blue" ? "#2a4f74" : "#4a2e1e";
  const r = 0.29, h = 0.86;
  return (
    <g>
      <ellipse cx={0} cy={0} rx={r * 1.28} ry={r * 0.34} fill="#000" opacity={0.45} />
      {/* body */}
      <path d={`M${-r},0 L${-r},${-h} A${r},${r * 0.3} 0 0 1 ${r},${-h} L${r},0 A${r},${r * 0.3} 0 0 1 ${-r},0 Z`} fill={body} stroke={OL} strokeWidth={0.012} />
      {/* ribs */}
      {[0.22, 0.46, 0.7].map((y) => (
        <path key={y} d={`M${-r},${-h * y} A${r},${r * 0.3} 0 0 0 ${r},${-h * y}`} stroke={bodyDk} strokeWidth={0.035} fill="none" opacity={0.9} />
      ))}
      {/* light band + dark side */}
      <path d={`M${-r * 0.72},${-h * 0.98} L${-r * 0.72},${-0.01}`} stroke={bodyLt} strokeWidth={0.07} opacity={0.55 * light} strokeLinecap="round" />
      <path d={`M${r * 0.78},${-h * 0.98} L${r * 0.78},${-0.01}`} stroke={bodyDk} strokeWidth={0.1} opacity={0.8} />
      {/* cash mound inside the rim */}
      {cash > 0 && (
        <g>
          <ellipse cx={0} cy={-h} rx={r * 0.92} ry={r * 0.27} fill="#2f5c34" />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return (
              <g key={i} transform={`translate(${Math.cos(a) * r * 0.45},${-h - 0.035 - Math.abs(Math.sin(a)) * cash * 0.5}) rotate(${(i * 47) % 80 - 40})`}>
                <rect x={-0.075} y={-0.026} width={0.15} height={0.052} rx={0.006} fill={i % 3 === 0 ? "#9fb48a" : i % 3 === 1 ? "#c9cfae" : "#7f9670"} stroke="#4a5a3c" strokeWidth={0.004} />
                <rect x={-0.05} y={-0.014} width={0.1} height={0.028} rx={0.01} fill="none" stroke="#5c6c4a" strokeWidth={0.003} />
              </g>
            );
          })}
          {/* rubber band across the top bundle */}
          <rect x={-0.06} y={-h - 0.07 - cash * 0.35} width={0.12} height={0.022} rx={0.004} fill="#b8873a" stroke={OL} strokeWidth={0.004} />
        </g>
      )}
      {/* rim ring */}
      <ellipse cx={0} cy={-h} rx={r} ry={r * 0.3} fill="none" stroke={rim} strokeWidth={0.045} />
      <ellipse cx={0} cy={-h} rx={r} ry={r * 0.3} fill="none" stroke={OL} strokeWidth={0.012} />
      {/* lid, hinged at the back, flipping open */}
      <g transform={`translate(0,${-h - 0.02}) rotate(${-open * 96})`}>
        <ellipse cx={0} cy={-0.02} rx={r} ry={r * 0.3} fill={bodyLt} stroke={OL} strokeWidth={0.012} />
        <ellipse cx={0} cy={-0.03} rx={r * 0.72} ry={r * 0.2} fill={body} opacity={0.7} />
        <ellipse cx={-r * 0.25} cy={-0.05} rx={r * 0.22} ry={r * 0.06} fill="#e8f2ff" opacity={0.5 * light} />
      </g>
      {/* dribble of sand on the flank (it came out of a hole) */}
      <path d={`M${-r * 0.2},0 q0.02,0.02 -0.01,0.03 M${r * 0.15},0 q-0.03,0.02 0.01,0.03`} stroke="#c9a476" strokeWidth={0.02} fill="none" opacity={0.8} />
    </g>
  );
};

/** a paper bank band — small diegetic prop, held between fingers */
export const BankBand: React.FC<{ w?: number }> = ({ w = 0.11 }) => (
  <g>
    <rect x={-w / 2} y={-0.05} width={w} height={0.1} rx={0.004} fill="#c9b98a" stroke={OL} strokeWidth={0.003} />
    <rect x={-w / 2 + 0.012} y={-0.04} width={w - 0.024} height={0.03} fill="#8a9464" opacity={0.7} />
  </g>
);

/* ───────────────────────────── phone (generic slab, no logo) ───────────────────────────── */

export const Phone: React.FC<{ glow?: number; screen?: "photo" | "call" | "dark"; px?: number; py?: number; scaleX?: number }> = ({ glow = 1, screen = "dark", px = 0, py = 0, scaleX = 1 }) => (
  <g>
    <rect x={-0.036} y={-0.072} width={0.072} height={0.144} rx={0.01} fill="#14161a" stroke={OL} strokeWidth={0.004} />
    <rect x={-0.03} y={-0.064} width={0.06} height={0.118} rx={0.004} fill={screen === "dark" ? "#1a2230" : "#cfe2f2"} opacity={screen === "dark" ? 1 : 0.92} />
    {screen === "photo" && (
      <g opacity={0.95} transform={`translate(${px},${py}) scale(${scaleX},1)`}>
        {/* the photograph on the screen: an open barrel in a hole of fresh dirt */}
        <rect x={-0.028} y={-0.052} width={0.056} height={0.05} fill="#7a5a34" />
        <ellipse cx={0} cy={-0.026} rx={0.022} ry={0.008} fill="#4a3420" />
        <rect x={-0.008} y={-0.04} width={0.016} height={0.016} fill="#3d6f9e" />
        <ellipse cx={0} cy={-0.041} rx={0.008} ry={0.003} fill="#c9cfae" />
      </g>
    )}
    {screen === "call" && (
      <g>
        <circle cx={0} cy={-0.03} r={0.012} fill="#6f8a5a" />
        <rect x={-0.02} y={-0.004} width={0.04} height={0.006} rx={0.003} fill="#8a9a7a" />
        <rect x={-0.02} y={0.008} width={0.028} height={0.006} rx={0.003} fill="#8a9a7a" />
        <rect x={-0.014} y={0.03} width={0.028} height={0.008} rx={0.004} fill="#5a7a4a" />
      </g>
    )}
    {glow > 0 && <ellipse cx={0} cy={0} rx={0.16} ry={0.2} fill="#bfe0ff" opacity={0.1 * glow} />}
  </g>
);

/* ───────────────────────────── key fob ───────────────────────────── */

export const Fob: React.FC<{ press?: number; led?: number }> = ({ press = 0, led = 1 }) => (
  <g transform={`scale(${1 - press * 0.06},${1 + press * 0.04})`}>
    <rect x={-0.035} y={-0.018} width={0.07} height={0.038} rx={0.008} fill="#1d2228" stroke={OL} strokeWidth={0.003} />
    <rect x={-0.026} y={-0.011} width={0.024} height={0.011} rx={0.003} fill="#3a434c" />
    <rect x={0.002} y={-0.011} width={0.024} height={0.011} rx={0.003} fill="#3a434c" />
    <circle cx={-0.014} cy={0.005} r={0.0058} fill="#3a434c" />
    <circle cx={0.014} cy={0.005} r={0.0058} fill={press > 0.4 ? "#ff4a3a" : "#3a434c"} />
    {led > 0 && <circle cx={0.014} cy={0.005} r={0.016} fill="#ff4a3a" opacity={0.35 * led} />}
    <circle cx={-0.03} cy={-0.026} r={0.007} fill="none" stroke="#6a747c" strokeWidth={0.004} />
  </g>
);

/* ───────────────────────────── laser dot (screen-space look, tiny) ───────────────────────────── */

export const LaserDot: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 5, o = 1 }) => (
  <g>
    <circle cx={x} cy={y} r={r * 3.2} fill="#ff2a3a" opacity={0.22 * o} />
    <circle cx={x} cy={y} r={r * 1.5} fill="#ff2a3a" opacity={0.45 * o} />
    <circle cx={x} cy={y} r={r} fill="#ff6a72" opacity={o} />
    <circle cx={x} cy={y} r={r * 0.4} fill="#fff" opacity={0.9 * o} />
  </g>
);

/* ───────────────────────────── chain (shackle + links) ───────────────────────────── */

export const Chain: React.FC<{ len?: number; sag?: number; links?: number }> = ({ len = 0.9, sag = 0.12, links = 14 }) => (
  <g>
    {Array.from({ length: links }).map((_, i) => {
      const t = i / (links - 1);
      const x = (t - 0.5) * len;
      const y = Math.sin(t * Math.PI) * sag;
      return (
        <ellipse key={i} cx={x} cy={y} rx={0.014} ry={0.008} fill="none" stroke="#9aa4ac" strokeWidth={0.007} transform={`rotate(${(i % 2 ? 28 : -28)} ${x} ${y})`} />
      );
    })}
  </g>
);

export const Shackle: React.FC<{ r?: number; open?: number }> = ({ r = 0.07, open = 0 }) => (
  <g>
    <path d={`M${-r * 0.8},0 A${r},${r} 0 1 1 ${r * 0.8},0`} fill="none" stroke="#b8c2ca" strokeWidth={0.018} strokeLinecap="round" transform={`rotate(${open * 26} ${-r * 0.8} 0)`} />
    <circle cx={-r * 0.8} cy={0.01} r={0.014} fill="#8a949c" />
    <circle cx={r * 0.8} cy={0.01} r={0.014} fill="#8a949c" />
  </g>
);

/* ───────────────────────────── duffel / trash bag with money ───────────────────────────── */

export const MoneyBag: React.FC<{ w?: number; h?: number; khaki?: boolean }> = ({ w = 0.62, h = 0.38, khaki = true }) => (
  <g>
    <ellipse cx={0} cy={0} rx={w * 0.6} ry={0.05} fill="#000" opacity={0.35} />
    <path d={`M${-w / 2},0 C${-w * 0.58},${-h * 0.7} ${-w * 0.3},${-h} ${-w * 0.12},${-h * 0.92} L${w * 0.12},${-h * 0.92} C${w * 0.3},${-h} ${w * 0.58},${-h * 0.7} ${w / 2},0 Z`}
      fill={khaki ? "#a89462" : "#1f2226"} stroke={OL} strokeWidth={0.012} strokeLinejoin="round" />
    <path d={`M${-w * 0.1},${-h * 0.92} q${w * 0.06},${-0.08} ${w * 0.2},${-0.02} q${-w * 0.05},${0.03} ${-w * 0.2},${0.02}`} fill={khaki ? "#8a7a4c" : "#33383e"} stroke={OL} strokeWidth={0.008} />
    <path d={`M${-w * 0.34},${-h * 0.5} q${w * 0.34},${-0.06} ${w * 0.68},0`} stroke={khaki ? "#8a7a4c" : "#3a4046"} strokeWidth={0.012} fill="none" opacity={0.8} />
    {/* a wrapped bundle peeking out of the mouth */}
    <rect x={-w * 0.02} y={-h * 0.99} width={w * 0.22} height={0.045} rx={0.006} fill="#b8a878" stroke={OL} strokeWidth={0.005} transform={`rotate(-8 ${w * 0.1} ${-h})`} />
  </g>
);

/* ───────────────────────────── generic machine gun on a stand (silhouette read) ───────────────────────────── */

export const M60Rig: React.FC<{ sweep?: number; fire?: number; muzzle?: number }> = ({ sweep = 0, fire = 0, muzzle = 0 }) => (
  <g>
    {/* swivel base + upright */}
    <rect x={-0.32} y={-0.06} width={0.64} height={0.06} rx={0.01} fill="#2c3036" stroke={OL} strokeWidth={0.01} />
    <rect x={-0.05} y={-0.5} width={0.1} height={0.46} fill="#3a3f46" stroke={OL} strokeWidth={0.01} />
    <g transform={`rotate(${sweep} 0 -0.5)`}>
      {/* receiver + barrel */}
      <rect x={-0.26} y={-0.62} width={0.46} height={0.16} rx={0.02} fill="#2a2e34" stroke={OL} strokeWidth={0.012} />
      <rect x={0.18} y={-0.585} width={0.62} height={0.07} rx={0.02} fill="#1f2328" stroke={OL} strokeWidth={0.01} />
      {/* belt box + ammo belt */}
      <rect x={-0.22} y={-0.5} width={0.2} height={0.14} fill="#4a4f38" stroke={OL} strokeWidth={0.01} />
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-0.19 + i * 0.03} cy={-0.47} r={0.008} fill="#c9a44a" />)}
      {/* top handle */}
      <path d="M-0.08,-0.62 q0.06,-0.09 0.14,-0.02" stroke="#3a3f46" strokeWidth={0.03} fill="none" />
      {/* muzzle flash */}
      {fire > 0.05 && (
        <g opacity={fire}>
          <path d="M0.8,-0.55 l0.22,-0.06 l-0.05,0.06 l0.16,0.02 l-0.2,0.07 l0.02,0.05 l-0.24,-0.02 Z" fill="#ffd76a" />
          <circle cx={0.84} cy={-0.55} r={0.09} fill="#fff1b8" opacity={0.8} />
        </g>
      )}
    </g>
    {muzzle > 0 && <circle cx={0} cy={-0.55} r={0.3} fill="#ffcf6a" opacity={0.18 * muzzle} />}
  </g>
);

/* ───────────────────────────── paper: lotto ticket + payphone card ───────────────────────────── */

export const LottoTicket: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <rect x={-0.09} y={-0.045} width={0.18} height={0.09} rx={0.004} fill="#efe8d2" stroke="#8a8068" strokeWidth={0.004} />
    <rect x={-0.08} y={-0.035} width={0.06} height={0.05} fill="#d8cdb0" />
    {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => (
      <circle key={`${r}${c}`} cx={-0.05 + c * 0.022} cy={-0.018 + r * 0.014} r={0.0022} fill="#6a6252" />
    )))}
    <path d="M-0.09,0.008 L0.09,0.008" stroke="#b0a68a" strokeWidth={0.003} strokeDasharray="0.01 0.008" />
  </g>
);

/* ───────────────────────────── a small photo print (the staged crime scene, viewed off-screen) ───────────────────────────── */

export const PhotoPrint: React.FC<{ w?: number }> = ({ w = 0.14 }) => (
  <g>
    <rect x={-w / 2} y={-w * 0.7} width={w} height={w * 1.4} fill="#f4f1e8" stroke="#9a958a" strokeWidth={0.004} />
    <rect x={-w / 2 + 0.01} y={-w * 0.7 + 0.01} width={w - 0.02} height={w * 1.05} fill="#6a5a48" />
    {/* suggestion of a shape on the ground — deliberately unreadable at this size */}
    <ellipse cx={0} cy={-w * 0.3} rx={w * 0.28} ry={w * 0.12} fill="#3c3228" />
    <ellipse cx={w * 0.02} cy={-w * 0.36} rx={w * 0.1} ry={w * 0.1} fill="#4a3c2e" />
  </g>
);
