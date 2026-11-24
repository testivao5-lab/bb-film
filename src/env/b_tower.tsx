// Batch B · Air Traffic Control Radar Room & Night Control Tower Cab
// Shared kit for s050_donald and s051_planes. 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, W, H } from "../lib/camera";
import { rand, lerp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad } from "./b_common";
import { TEACHER, tint, mixHex } from "../rig/cast";
import type { Palette } from "../rig/Figure";
import type { HairDef, HeadLook } from "../rig/Head";

/** Original character: "Donald" (Jane's grieving father, air traffic controller).
 *  1.79 m, neat silver-pepper side-part & trimmed beard, charcoal cardigan-vest over pale-blue shirt & dark tie. */
export const DONALD = {
  height: 1.79,
  pal: {
    skin: "#e3b598", skinShade: "#ba886d", skinLight: "#f5cfb8",
    jacket: "#2c313b", jacketShade: "#1c2028", jacketLight: "#434a59",
    shirt: "#c7d6e8", shirtShade: "#9ab0c9",
    pants: "#222630", pantsShade: "#151820",
    shoes: "#1a1818", outline: "#121318",
  } as Palette,
  hair: { base: "#5e5c63", dark: "#36343a", light: "#aba8b2", style: "sidepart" } as HairDef,
};

export const donaldLook = (o: Partial<HeadLook> = {}): HeadLook => ({
  lids: 0.24,
  lookX: 0,
  lookY: 0,
  brow: 0.22,
  mouth: "flat",
  hair: DONALD.hair,
  beard: "trim",
  age: 0.72,
  ...o,
});

/** Cool emerald-phosphor tint for characters inside the darkened ATC radar room */
export const radarTint = (pal: typeof TEACHER.pal) =>
  tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#3db88c", 0.16) : c));

/* ───────────────────── Darkened ATC Radar Room (s050) ───────────────────── */
export const TowerRadarRoom: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const OL = "#070b10";
  const zNear = Math.max(cam.z + 0.35, 1.5);
  const sweepA = (f * 0.045) % (Math.PI * 2);
  const scopePt = project(cam, 0.35, 1.05, 3.65);

  return (
    <g>
      <defs>
        <radialGradient id="bRadarGlow">
          <stop offset="0" stopColor="#4ef29c" stopOpacity={0.34} />
          <stop offset="0.55" stopColor="#1e8a5c" stopOpacity={0.11} />
          <stop offset="1" stopColor="#1e8a5c" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={W} height={H} fill="#0b1017" />

      {/* Dark anti-static carpet floor */}
      <polygon points={flatQuad(cam, -4.8, 4.8, zNear, 5.4, 0)} fill="#121924" stroke={OL} strokeWidth={1.5} />
      {/* Acoustic baffled ceiling */}
      <polygon points={flatQuad(cam, -4.8, 4.8, zNear, 5.4, 2.85)} fill="#0c111a" />

      {/* Back wall (z = 5.35) with upper observation glass overlooking night runway lights */}
      <polygon points={wallQuad(cam, -4.8, 4.8, 0, 2.85, 5.35)} fill="#151e2b" stroke={OL} strokeWidth={2} />
      <polygon points={wallQuad(cam, -3.6, 3.6, 1.42, 2.55, 5.32)} fill="#0a1222" stroke={OL} strokeWidth={2.5} />
      {/* Slanted glass mullions */}
      {[-2.2, -0.75, 0.75, 2.2].map((mx, i) => {
        const a = project(cam, mx, 1.42, 5.31);
        const b = project(cam, mx * 1.05, 2.55, 5.31);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1d2838" strokeWidth={3} />;
      })}
      {/* Distant blue/amber runway lights outside the upper glass */}
      {Array.from({ length: 18 }).map((_, i) => {
        const rx = -3.2 + i * 0.38;
        const p = project(cam, rx, 1.56 + (i % 2) * 0.06, 5.3);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.2}
            fill={i % 3 === 0 ? "#5ca8ff" : "#ffbe6b"}
            opacity={0.75}
          />
        );
      })}

      {/* Side walls */}
      <polygon points={sideQuad(cam, -4.2, zNear, 5.35, 0, 2.85)} fill="#101722" stroke={OL} strokeWidth={2} />
      <polygon points={sideQuad(cam, 4.2, zNear, 5.35, 0, 2.85)} fill="#101722" stroke={OL} strokeWidth={2} />

      {/* Background secondary radar console at left-back */}
      <Card cam={cam} x={-1.85} y={0} z={4.75} blur={false}>
        <rect x={-0.65} y={-1.15} width={1.3} height={1.15} rx={0.03} fill="#1b2430" stroke={OL} strokeWidth={0.015} />
        <circle cx={0} cy={-0.78} r={0.26} fill="#091a14" stroke="#2c3d4f" strokeWidth={0.015} />
        <circle cx={0} cy={-0.78} r={0.18} fill="none" stroke="#2f8f62" strokeWidth={0.006} />
        <line
          x1={0}
          y1={-0.78}
          x2={Math.cos(sweepA + 1.4) * 0.24}
          y2={-0.78 + Math.sin(sweepA + 1.4) * 0.24}
          stroke="#5bf59d"
          strokeWidth={0.008}
        />
      </Card>

      {/* Ambient green phosphor pool */}
      <circle cx={scopePt.x} cy={scopePt.y} r={420} fill="url(#bRadarGlow)" />
    </g>
  );
};

/** Primary ATC Radar Console Desk (origin on floor at x, z; scope faces -x toward seated controller) */
export const RadarConsole: React.FC<{ cam: Cam; x?: number; z?: number; f: number; alert?: boolean }> = ({
  cam, x = 0.65, z = 3.55, f, alert = false,
}) => {
  const OL = "#070b10";
  const sweep = (f * 0.06) % (Math.PI * 2);
  return (
    <Card cam={cam} x={x} y={0} z={z} blur={false}>
      {/* Heavy angled steel console housing */}
      <polygon
        points="-0.48,0 -0.54,-0.74 -0.18,-1.34 0.46,-1.34 0.52,0"
        fill="#202a38"
        stroke={OL}
        strokeWidth={0.014}
      />
      <rect x={-0.62} y={-0.76} width={0.68} height={0.055} rx={0.01} fill="#2e3b4e" stroke={OL} strokeWidth={0.01} />
      {/* Glowing circular radar scope hood & bezel on angled face */}
      <ellipse cx={-0.22} cy={-1.04} rx={0.16} ry={0.22} fill="#081a13" stroke="#3b4c63" strokeWidth={0.014} />
      <ellipse cx={-0.22} cy={-1.04} rx={0.11} ry={0.15} fill="none" stroke="#2c8a5e" strokeWidth={0.005} />
      <line
        x1={-0.22}
        y1={-1.04}
        x2={-0.22 + Math.cos(sweep) * 0.13}
        y2={-1.04 + Math.sin(sweep) * 0.18}
        stroke={alert ? "#ff5242" : "#5ef5a0"}
        strokeWidth={0.008}
      />
      {/* Flight-progress strip rack & illuminated status buttons */}
      {[-1.22, -1.12, -1.02, -0.92].map((sy, i) => (
        <rect key={i} x={0.06} y={sy} width={0.32} height={0.065} rx={0.006} fill="#cbd6c4" stroke={OL} strokeWidth={0.006} opacity={0.75} />
      ))}
      {[-0.48, -0.38, -0.28].map((bx, i) => (
        <circle key={i} cx={bx} cy={-0.79} r={0.012} fill={i === 0 && alert ? "#ff4538" : "#4ef29c"} />
      ))}
    </Card>
  );
};

/* ───────────────────── Panoramic Night Control Tower Cab (s051) ───────────────────── */
export const TowerCabNight: React.FC<{
  cam: Cam;
  f: number;
  skyFlash?: number; // 0..1 distant reflection of mid-air flash across glass & console
}> = ({ cam, f, skyFlash = 0 }) => {
  const OL = "#05070c";
  return (
    <g>
      <defs>
        <linearGradient id="bTowerNightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060a14" />
          <stop offset="0.62" stopColor="#0e182e" />
          <stop offset="1" stopColor="#1f2942" />
        </linearGradient>
        <radialGradient id="bDistantSkyGlow">
          <stop offset="0" stopColor="#ff9e4a" stopOpacity={0.68 * skyFlash} />
          <stop offset="0.5" stopColor="#d9532f" stopOpacity={0.22 * skyFlash} />
          <stop offset="1" stopColor="#d9532f" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Deep night sky beyond the panoramic glass */}
      <rect x={0} y={0} width={W} height={H} fill="url(#bTowerNightSky)" />

      {/* Stars */}
      {Array.from({ length: 55 }).map((_, i) => (
        <circle key={i} cx={rand(i, 4) * W} cy={rand(i, 9) * 520} r={rand(i, 12) < 0.2 ? 1.5 : 0.9} fill="#dce8ff" opacity={0.45} />
      ))}

      {/* Distant silent orange reflection high in the night clouds when skyFlash > 0 */}
      {skyFlash > 0.01 && <circle cx={960} cy={275} r={460} fill="url(#bDistantSkyGlow)" />}

      {/* Distant Sandia mountain ridge + glittering Albuquerque city light grid below horizon */}
      <polygon points="0,565 320,515 760,545 1240,498 1680,538 1920,520 1920,620 0,620" fill="#0b101d" />
      <rect x={0} y={565} width={W} height={240} fill="#090d17" />
      {Array.from({ length: 110 }).map((_, i) => {
        const row = i % 7;
        const gy = 578 + row * 24 + rand(i, 21) * 8;
        const spread = 1 + row * 0.22;
        const gx = 960 + (rand(i, 22) - 0.5) * 1650 * spread;
        const col = i % 5 === 0 ? "#ffd28a" : i % 7 === 0 ? "#8ac4ff" : "#ff9d52";
        return <circle key={i} cx={gx} cy={gy} r={1.3 + row * 0.22} fill={col} opacity={0.55 + rand(i, 23) * 0.35} />;
      })}

      {/* Control Tower Cab Ceiling Overhang */}
      <polygon points="0,0 1920,0 1790,115 130,115" fill="#090c13" stroke={OL} strokeWidth={4} />

      {/* Outward-slanted steel window mullions framing the panoramic glass */}
      {[130, 520, 960, 1400, 1790].map((mx, i) => {
        const botX = 960 + (mx - 960) * 0.91;
        return <line key={i} x1={mx} y1={115} x2={botX} y2={735} stroke="#0b0f18" strokeWidth={i === 0 || i === 4 ? 26 : 14} />;
      })}

      {/* Wrap-around lower ATC console bank & glowing green scopes */}
      <polygon points="0,735 1920,735 1920,1080 0,1080" fill="#0d121c" stroke={OL} strokeWidth={5} />
      <line x1={0} y1={735} x2={W} y2={735} stroke={skyFlash > 0.05 ? "#e08a52" : "#243247"} strokeWidth={5} />
      {[340, 740, 1180, 1580].map((sx, i) => (
        <g key={i} transform={`translate(${sx},825)`}>
          <ellipse cx={0} cy={0} rx={78} ry={34} fill="#071711" stroke="#1f2d3d" strokeWidth={3} />
          <ellipse cx={0} cy={0} rx={52} ry={21} fill="none" stroke="#36b578" strokeWidth={2} opacity={0.75} />
        </g>
      ))}

      {/* Subtle diagonal glass reflection */}
      <polygon points="560,115 680,115 540,735 430,735" fill="#9fc4ff" opacity={0.035} />
    </g>
  );
};

export const TowerFore: React.FC = () => (
  <g pointerEvents="none">
    <polygon points="0,0 92,0 64,1080 0,1080" fill="#05080d" opacity={0.9} />
    <polygon points="1828,0 1920,0 1920,1080 1856,1080" fill="#05080d" opacity={0.9} />
  </g>
);
