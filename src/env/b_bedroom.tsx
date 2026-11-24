// Batch B · Jesse & Jane's duplex porch (day) + apartment bedroom (warm lamp & cold moonlit night)
// Shared kit for s047_jane, s048_found, s049_watch. 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, W, H } from "../lib/camera";
import { lerp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad } from "./b_common";
import { StreetSky, StreetRidge } from "./b_street";
import { TEACHER, tint, mixHex } from "../rig/cast";
import type { Palette } from "../rig/Figure";
import type { HairDef, HeadLook } from "../rig/Head";

/** Original character: "Jane" (the landlord / artist / recovering addict).
 *  1.66 m, pale porcelain skin, jet-black wavy hair, charcoal cardigan over deep-plum top, dark jeans. */
export const JANE = {
  height: 1.66,
  pal: {
    skin: "#f0c8b8", skinShade: "#c99b8b", skinLight: "#fce0d4",
    jacket: "#27252e", jacketShade: "#18161d", jacketLight: "#3c3947",
    shirt: "#662b3c", shirtShade: "#451b27",
    pants: "#1f2430", pantsShade: "#131720",
    shoes: "#1c191d", outline: "#141015",
  } as Palette,
  hair: { base: "#1c1920", dark: "#0d0b10", light: "#464050", style: "long" } as HairDef,
};

export const janeLook = (o: Partial<HeadLook> = {}): HeadLook => ({
  lids: 0.14,
  lookX: 0,
  lookY: 0,
  brow: 0.08,
  mouth: "neutral",
  hair: JANE.hair,
  age: 0.18,
  lipstick: "#823646",
  ...o,
});

/** Cool moonlit night tint for characters in s048 & s049 */
export const nightTint = (pal: typeof TEACHER.pal) =>
  tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#3d557a", 0.28) : c));

/** Warm bedside-lamp tint for s047 interior */
export const lampTint = (pal: typeof TEACHER.pal) =>
  tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#f2b979", 0.1) : c));

/* ───────────────────── Sunny Albuquerque Duplex Porch (Day) ───────────────────── */
export const DuplexPorchDay: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const OL = "#241c15";
  return (
    <g>
      <StreetSky f={f} cam={cam} />
      <StreetRidge cam={cam} />

      {/* Stucco courtyard & cracked concrete walkway */}
      <polygon points={flatQuad(cam, -16, 16, 1.8, 22, 0)} fill="#c9a878" />
      <polygon points={flatQuad(cam, -3.5, 4.5, 1.8, 8.5, 0.01)} fill="#bfb5a2" stroke={OL} strokeWidth={1.2} />

      {/* Neighbouring low adobe wall in background-left */}
      <polygon points={wallQuad(cam, -14, -2.5, 0, 1.35, 9.5)} fill="#d6c09e" stroke={OL} strokeWidth={1.5} />

      {/* Stucco duplex facade with twin front doors */}
      <polygon points={wallQuad(cam, -2.8, 6.2, 0, 3.05, 5.2)} fill="#e6d3b3" stroke={OL} strokeWidth={2} />
      <polygon points={wallQuad(cam, -3.0, 6.4, 2.88, 3.25, 5.15)} fill="#9b6b4f" stroke={OL} strokeWidth={2} />
      {/* Raised concrete porch step */}
      <polygon points={flatQuad(cam, -2.6, 5.8, 4.15, 5.2, 0.14)} fill="#b3a896" stroke={OL} strokeWidth={1.6} />
      <polygon points={wallQuad(cam, -2.6, 5.8, 0, 0.14, 4.15)} fill="#8f8575" stroke={OL} strokeWidth={1.6} />

      {/* Left duplex unit door (Jane's) + window */}
      <polygon points={wallQuad(cam, -1.55, -0.58, 0.14, 2.18, 5.18)} fill="#6b4b36" stroke={OL} strokeWidth={1.8} />
      <polygon points={wallQuad(cam, -2.45, -1.82, 1.05, 1.98, 5.18)} fill="#5c7d99" stroke={OL} strokeWidth={1.8} />

      {/* Right duplex unit door (Jesse's) + window */}
      <polygon points={wallQuad(cam, 1.35, 2.32, 0.14, 2.18, 5.18)} fill="#5e4434" stroke={OL} strokeWidth={1.8} />
      <polygon points={wallQuad(cam, 2.68, 3.68, 1.05, 1.98, 5.18)} fill="#5c7d99" stroke={OL} strokeWidth={1.8} />

      {/* Terracotta pot & agave plant between the two doors */}
      <Card cam={cam} x={0.38} y={0.14} z={4.85} blur={false}>
        <polygon points="-0.16,0 -0.21,-0.32 0.21,-0.32 0.16,0" fill="#a85a3a" stroke={OL} strokeWidth={0.012} />
        <path d="M0,-0.3 C-0.18,-0.55 -0.26,-0.62 -0.3,-0.68 M0,-0.3 C0,-0.58 0.02,-0.68 0,-0.74 M0,-0.3 C0.18,-0.54 0.25,-0.6 0.29,-0.66" fill="none" stroke="#5e7848" strokeWidth={0.045} strokeLinecap="round" />
      </Card>
    </g>
  );
};

/* ───────────────────── Duplex Bedroom Interior (Lamp / Moonlit Night) ───────────────────── */
export const BedroomSet: React.FC<{
  cam: Cam;
  f: number;
  mode?: "lamp" | "night" | "warmGhost";
  doorOpen?: number; // 0 = closed, 1 = wide open into dark hallway
}> = ({ cam, f, mode = "night", doorOpen = 0.35 }) => {
  const isNight = mode === "night";
  const isGhost = mode === "warmGhost";
  const wallBack = isNight ? "#1e2638" : isGhost ? "#473b32" : "#423932";
  const wallSide = isNight ? "#161d2b" : isGhost ? "#382e27" : "#332c26";
  const floorCol = isNight ? "#1b202e" : "#473528";
  const ceilCol = isNight ? "#111622" : "#29231f";
  const OL = "#0c0e14";

  const zNear = Math.max(cam.z + 0.35, 1.6);
  const lampPt = project(cam, -0.78, 0.98, 4.15);

  return (
    <g>
      <defs>
        <radialGradient id="bBedLampGlow">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity={isNight ? 0 : 0.48} />
          <stop offset="0.55" stopColor="#eb9e54" stopOpacity={isNight ? 0 : 0.16} />
          <stop offset="1" stopColor="#eb9e54" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={W} height={H} fill={ceilCol} />

      {/* Floorboards */}
      <polygon points={flatQuad(cam, -4.2, 4.2, zNear, 4.65, 0)} fill={floorCol} stroke={OL} strokeWidth={1.5} />
      {[-2.4, -1.2, 0, 1.2, 2.4].map((fx, i) => {
        const a = project(cam, fx, 0, zNear);
        const b = project(cam, fx, 0, 4.65);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={OL} strokeWidth={1.2} opacity={0.45} />;
      })}
      {/* Woven bedroom rug in front of the bed */}
      <polygon points={flatQuad(cam, -0.95, 2.15, Math.max(zNear, 2.15), 3.45, 0.008)} fill={isNight ? "#2a273d" : "#66403c"} opacity={0.85} />

      {/* Ceiling */}
      <polygon points={flatQuad(cam, -4.2, 4.2, zNear, 4.65, 2.75)} fill={ceilCol} />

      {/* Back wall (z = 4.65) */}
      <polygon points={wallQuad(cam, -4.2, 4.2, 0, 2.75, 4.65)} fill={wallBack} stroke={OL} strokeWidth={2} />
      {/* Baseboard */}
      <polygon points={wallQuad(cam, -4.2, 4.2, 0, 0.12, 4.63)} fill={isNight ? "#121622" : "#261f1b"} />

      {/* Left & right side walls */}
      <polygon points={sideQuad(cam, -3.45, zNear, 4.65, 0, 2.75)} fill={wallSide} stroke={OL} strokeWidth={2} />
      <polygon points={sideQuad(cam, 3.45, zNear, 4.65, 0, 2.75)} fill={wallSide} stroke={OL} strokeWidth={2} />

      {/* Hallway doorway on back-left wall (x = -2.4 .. -1.38) */}
      <polygon points={wallQuad(cam, -2.4, -1.38, 0, 2.08, 4.64)} fill="#0a0c12" stroke={OL} strokeWidth={2.2} />
      {doorOpen > 0.08 && (
        <polygon
          points={flatQuad(cam, -2.38, -1.42, 3.35, 4.64, 0.005)}
          fill={isNight ? "#4f658a" : "#d9a86c"}
          opacity={0.24 * doorOpen}
        />
      )}
      <polygon
        points={wallQuad(cam, -2.38, lerp(-1.4, -2.18, doorOpen), 0.01, 2.05, 4.62)}
        fill={isNight ? "#24222c" : "#5e4636"}
        stroke={OL}
        strokeWidth={1.8}
      />

      {/* Right-back casement window with venetian blinds & cool moonlight slats */}
      <polygon points={wallQuad(cam, 1.55, 2.85, 1.02, 2.28, 4.63)} fill={isNight ? "#1a2b47" : "#6c93b8"} stroke={OL} strokeWidth={2.4} />
      {Array.from({ length: 8 }).map((_, i) => {
        const y0 = 1.08 + i * 0.145;
        return (
          <polygon
            key={i}
            points={wallQuad(cam, 1.6, 2.8, y0, y0 + 0.055, 4.62)}
            fill={isNight ? "#9fc4ff" : "#fff1cf"}
            opacity={isNight ? 0.62 : 0.8}
          />
        );
      })}
      {/* Diagonal moonlight shafts across back wall when lamp is off */}
      {isNight &&
        [0, 1, 2, 3].map((si) => (
          <polygon
            key={si}
            points={wallQuad(cam, -0.05 + si * 0.38, 1.35 + si * 0.38, 0.55 + si * 0.22, 0.68 + si * 0.22, 4.61)}
            fill="#9fc4ff"
            opacity={0.1}
          />
        ))}

      {/* Jane's framed charcoal/ink sketches hung above the bed */}
      {[
        [-0.25, 0.28, 1.58, 2.12],
        [0.45, 0.92, 1.64, 2.08],
      ].map(([x0, x1, y0, y1], idx) => (
        <g key={idx}>
          <polygon points={wallQuad(cam, x0, x1, y0, y1, 4.62)} fill={isNight ? "#aab8cc" : "#ebe4d5"} stroke={OL} strokeWidth={2} />
          <polygon
            points={wallQuad(cam, x0 + 0.08, x1 - 0.08, y0 + 0.09, y1 - 0.09, 4.61)}
            fill={isNight ? "#2a3347" : "#4a3f3b"}
            opacity={0.78}
          />
        </g>
      ))}

      {/* Oak Nightstand + Shaded Lamp at left of bed (x = -0.82, z = 4.18) */}
      <Card cam={cam} x={-0.82} y={0} z={4.18} blur={false}>
        <rect x={-0.28} y={-0.62} width={0.56} height={0.62} fill={isNight ? "#252028" : "#5c4230"} stroke={OL} strokeWidth={0.012} />
        <line x1={-0.24} y1={-0.34} x2={0.24} y2={-0.34} stroke={OL} strokeWidth={0.01} />
        <circle cx={0} cy={-0.46} r={0.018} fill="#b89b62" />
        <rect x={-0.05} y={-0.78} width={0.1} height={0.16} rx={0.02} fill={isNight ? "#333a4a" : "#8a6844"} stroke={OL} strokeWidth={0.01} />
        <polygon
          points="-0.16,-0.78 0.16,-0.78 0.11,-1.02 -0.11,-1.02"
          fill={isNight ? "#303646" : "#ffe0a8"}
          stroke={OL}
          strokeWidth={0.01}
        />
      </Card>

      {!isNight && <circle cx={lampPt.x} cy={lampPt.y} r={460} fill="url(#bBedLampGlow)" />}
    </g>
  );
};

/** Platform bed & rumpled quilt in the bedroom (origin on floor at x, z; mattress top y = 0.52m) */
export const BedroomBed: React.FC<{
  cam: Cam;
  x?: number;
  z?: number;
  w?: number;
  night?: boolean;
}> = ({ cam, x = 0.55, z = 3.85, w = 1.75, night = true }) => {
  const OL = "#0c0e14";
  const wood = night ? "#221d26" : "#593e2c";
  const sheet = night ? "#6d7d99" : "#dfd8ca";
  const quilt = night ? "#29354d" : "#4a536b";
  const quiltHi = night ? "#56709e" : "#677391";

  return (
    <g>
      {/* Headboard against back wall */}
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, 0.42, 1.18, z + 0.65)} fill={wood} stroke={OL} strokeWidth={2} />
      {/* Mattress upper surface */}
      <polygon points={flatQuad(cam, x - w / 2, x + w / 2, z - 0.65, z + 0.65, 0.52)} fill={sheet} stroke={OL} strokeWidth={1.8} />
      {/* Two pillows near headboard */}
      <polygon points={flatQuad(cam, x - w * 0.44, x - 0.06, z + 0.25, z + 0.58, 0.58)} fill={night ? "#8fa2c2" : "#f2eee4"} stroke={OL} strokeWidth={1.5} />
      <polygon points={flatQuad(cam, x + 0.06, x + w * 0.44, z + 0.25, z + 0.58, 0.58)} fill={night ? "#8fa2c2" : "#f2eee4"} stroke={OL} strokeWidth={1.5} />
      {/* Rumpled quilt across lower two-thirds of the bed */}
      <polygon points={flatQuad(cam, x - w / 2 - 0.02, x + w / 2 + 0.02, z - 0.66, z + 0.16, 0.55)} fill={quilt} stroke={OL} strokeWidth={1.8} />
      {night && (
        <polygon points={flatQuad(cam, x - 0.15, x + w / 2, z - 0.45, z + 0.05, 0.555)} fill={quiltHi} opacity={0.38} />
      )}
      {/* Front wooden bed frame & mattress front skirt */}
      <polygon points={wallQuad(cam, x - w / 2 - 0.02, x + w / 2 + 0.02, 0.24, 0.55, z - 0.66)} fill={quilt} stroke={OL} strokeWidth={1.8} />
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, 0.04, 0.26, z - 0.66)} fill={wood} stroke={OL} strokeWidth={1.8} />
    </g>
  );
};

/** Banded green $100 stack in metre space */
export const CashBundle: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <rect x={-0.075} y={-0.032} width={0.15} height={0.048} rx={0.005} fill="#5e8762" stroke="#1b291d" strokeWidth={0.005} />
    <rect x={-0.075} y={-0.016} width={0.15} height={0.032} fill="#46694a" />
    <rect x={-0.02} y={-0.033} width={0.04} height={0.05} fill="#d9be78" stroke="#4a3d1c" strokeWidth={0.004} />
  </g>
);

/** Foreground bedroom doorframe / dresser vignette for 3rd depth layer */
export const BedroomFore: React.FC<{ closing?: number }> = ({ closing = 0 }) => (
  <g pointerEvents="none">
    <rect x={0} y={0} width={78 + closing * 620} height={H} fill="#080a10" opacity={0.86} />
    <rect x={W - 68} y={0} width={68} height={H} fill="#080a10" opacity={0.78} />
    <polygon points="1640,940 1920,910 1920,1080 1610,1080" fill="#0b0d14" opacity={0.88} />
  </g>
);
