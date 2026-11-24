// Batch B · kit for the DESERT SHACK arc (scenes 42 trunk, 43 bell, 44 run, 45 hank-arrives, 46 gunfight).
// Imports DesertAll (tone="dusk") read-only from d_sets.tsx so dusk desert matches across batches,
// and adds the weathered clapboard desert shack, barbed-wire fence, arroyo ditch, near-lens dusk
// silhouettes, claustrophobic sun-slatted shack interior, and the wheelchair + brass armrest bell.
import React from "react";
import { Cam, Card, project, W, H } from "../lib/camera";
import { lerp, rand, clamp, blink } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad } from "./b_common";
import { DesertAll } from "./d_sets";
import { DDefs } from "./d_shared";
import { Figure, Pose } from "../rig/Figure";
import { TEACHER, restaurateurLook, tint, mixHex } from "../rig/cast";
import { chairSit } from "../props/b_pose";

export const SX = { x0: -4.2, x1: 4.2, zBack: 5.4, ceil: 2.75 };

export const ST_SHACK = {
  ol: "#1a1310",
  duskRim: "#ffb570",
  duskShadow: "#2a1838",
  wood: "#6b5240",
  woodDark: "#463428",
  woodLight: "#8c6d56",
  tin: "#746862",
  tinDark: "#4d4340",
};

/** Original elderly uncle character palette & look */
export const UNCLE = {
  height: 1.68,
  pal: {
    skin: "#ba8f6d",
    skinShade: "#8f684a",
    skinLight: "#d4ab8a",
    jacket: "#5e5344",      // worn brown-olive cardigan
    jacketShade: "#3f372c",
    jacketLight: "#7a6d5a",
    shirt: "#d8ceb8",
    shirtShade: "#ada28c",
    pants: "#3d3a36",
    pantsShade: "#282623",
    shoes: "#211d1a",
    outline: "#14100d",
  },
  hair: { base: "#cfc9be", dark: "#9c968b", light: "#ebe6dc", style: "receding" as const },
};

export const uncleLook = (o: any = {}) =>
  restaurateurLook({ hair: UNCLE.hair, beard: "none", age: 0.92, lips: "#8a6256", ...o });

/** Distributor palette tinted for desert dusk */
export const DIST_DUSK = {
  height: 1.84,
  pal: {
    skin: "#ba825e",
    skinShade: "#8c5a3c",
    skinLight: "#d69e78",
    jacket: "#4a3c38",
    jacketShade: "#2f2523",
    jacketLight: "#6b5750",
    shirt: "#dfd2be",
    shirtShade: "#b0a28e",
    pants: "#302b2a",
    pantsShade: "#1f1b1b",
    shoes: "#1a1615",
    outline: "#120d0c",
  },
  hair: { base: "#141110", dark: "#090808", light: "#2c2422", style: "buzz" as const },
};
export const distDuskLook = (o: any = {}) =>
  restaurateurLook({ hair: DIST_DUSK.hair, beard: "mustache", age: 0.5, lips: "#825244", ...o });

/** Shallow desert wash / ditch with mounded dusk dirt berm (used in s044 & s045) */
export const DesertDitch: React.FC<{ cam: Cam; x?: number; z?: number; w?: number }> = ({
  cam, x = -0.8, z = 4.6, w = 1.65,
}) => (
  <g>
    {/* Mounded excavated dirt berm behind */}
    <path
      d={flatQuad(cam, x - w * 0.62, x + w * 0.62, z + 0.15, z + 0.65, 0.08)}
      fill="#7a533c"
      stroke="#241710"
      strokeWidth={1.6}
    />
    {/* Sunken shadow trench */}
    <path
      d={flatQuad(cam, x - w * 0.55, x + w * 0.55, z - 0.35, z + 0.25, -0.02)}
      fill="#2a1912"
      stroke="#140b08"
      strokeWidth={2}
    />
  </g>
);

/** Matte-black tactical carbine / assault rifle in metre space (origin near pistol grip/receiver) */
export const AssaultRifle: React.FC<{ rot?: number; flash?: number; s?: number }> = ({
  rot = 0, flash = 0, s = 1,
}) => (
  <g transform={`rotate(${rot}) scale(${s})`}>
    {/* Buttstock */}
    <polygon points="-0.32,-0.025 -0.11,-0.032 -0.11,0.018 -0.32,0.052" fill="#23262b" stroke="#0c0e11" strokeWidth={0.007} />
    {/* Upper & lower receiver */}
    <rect x={-0.11} y={-0.038} width={0.23} height={0.056} rx={0.005} fill="#31363e" stroke="#0c0e11" strokeWidth={0.007} />
    {/* Carry handle sight */}
    <path d="M-0.07,-0.038 L-0.055,-0.066 L0.055,-0.066 L0.07,-0.038" fill="none" stroke="#252930" strokeWidth={0.011} />
    {/* Pistol grip */}
    <polygon points="-0.065,0.016 -0.028,0.016 -0.048,0.105 -0.088,0.098" fill="#1e2024" stroke="#0c0e11" strokeWidth={0.006} />
    {/* Curved 30-rd magazine */}
    <path d="M0.035,0.016 L0.082,0.016 Q0.102,0.095 0.075,0.155 L0.032,0.145 Q0.052,0.085 0.035,0.016 Z" fill="#2a2f36" stroke="#0c0e11" strokeWidth={0.006} />
    {/* Ribbed handguard */}
    <rect x={0.12} y={-0.034} width={0.21} height={0.044} rx={0.006} fill="#24272c" stroke="#0c0e11" strokeWidth={0.007} />
    <line x1={0.14} y1={-0.022} x2={0.31} y2={-0.022} stroke="#4f5661" strokeWidth={0.005} />
    {/* Front sight triangle + barrel + flash hider */}
    <polygon points="0.33,-0.034 0.35,-0.072 0.37,-0.034" fill="#2b3038" stroke="#0c0e11" strokeWidth={0.005} />
    <rect x={0.33} y={-0.022} width={0.17} height={0.016} fill="#3c424c" stroke="#0c0e11" strokeWidth={0.005} />
    <rect x={0.49} y={-0.026} width={0.042} height={0.024} rx={0.003} fill="#262a30" stroke="#0c0e11" strokeWidth={0.005} />
    {flash > 0.05 && (
      <g transform="translate(0.535,-0.014)" opacity={flash}>
        <polygon points="0,-0.075 0.42,-0.02 0.18,0 0.46,0.038 0,0.078 0.06,0" fill="#ff9d2e" />
        <polygon points="0,-0.036 0.26,-0.006 0,0.038" fill="#fffce3" />
      </g>
    )}
  </g>
);

/** Gold shield badge clipped to belt in metre space */
export const BeltBadge: React.FC<{ glint?: number }> = ({ glint = 0 }) => (
  <g>
    <path
      d="M-0.026,-0.032 L0,-0.042 L0.026,-0.032 L0.022,0.012 L0,0.034 L-0.022,0.012 Z"
      fill="#e3b94b"
      stroke="#2b1e08"
      strokeWidth={0.004}
    />
    <circle cx={0} cy={-0.006} r={0.011} fill="#f7de88" />
    {glint > 0.05 && (
      <g stroke="#fff8d4" strokeWidth={0.004} opacity={glint}>
        <line x1={-0.055} y1={-0.006} x2={0.055} y2={-0.006} />
        <line x1={0} y1={-0.062} x2={0} y2={0.05} />
      </g>
    )}
  </g>
);

export const duskTint = (pal: typeof TEACHER.pal) =>
  tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#e8926b", 0.1) : c));

/** Shared dusk desert sky + sun + mesa ridge + rutted scrub floor (includes SharedDefs gradients) */
export const DuskDesert: React.FC<{ cam: Cam; f: number; sun?: [number, number] }> = ({
  cam, f, sun = [1460, 435],
}) => (
  <g>
    <DDefs tone="dusk" />
    <DesertAll cam={cam} f={f} tone="dusk" sun={sun} rut />
  </g>
);

/** Exterior weathered desert shack with corrugated tin roof, porch, steps, propane tank, and warm window glow */
export const DesertShack: React.FC<{
  cam: Cam; x: number; z: number; doorOpen?: number; glow?: number; s?: number;
}> = ({ cam, x, z, doorOpen = 0, glow = 0.75, s = 1 }) => (
  <Card cam={cam} x={x} y={0} z={z} blur={false}>
    <g transform={`scale(${s})`}>
      {/* long dusk ground shadow */}
      <ellipse cx={0.4} cy={0.03} rx={3.6} ry={0.28} fill="#2d1f36" opacity={0.55} />
      {/* rusted propane cylinder at left side of shack */}
      <g transform="translate(-3.25,0)">
        <rect x={-0.38} y={-0.92} width={0.76} height={0.82} rx={0.26} fill="#9c8d84" stroke={ST_SHACK.ol} strokeWidth={0.022} />
        <rect x={-0.14} y={-1.06} width={0.28} height={0.16} fill="#6e625c" stroke={ST_SHACK.ol} strokeWidth={0.018} />
        <line x1={-0.24} y1={-0.1} x2={-0.28} y2={0} stroke={ST_SHACK.ol} strokeWidth={0.03} />
        <line x1={0.24} y1={-0.1} x2={0.28} y2={0} stroke={ST_SHACK.ol} strokeWidth={0.03} />
      </g>

      {/* main sun-bleached clapboard wall */}
      <rect x={-2.9} y={-2.65} width={5.8} height={2.65} fill={ST_SHACK.wood} stroke={ST_SHACK.ol} strokeWidth={0.028} />
      {/* horizontal clapboard siding lines */}
      {[-0.45, -0.9, -1.35, -1.8, -2.25].map((ly, i) => (
        <line key={i} x1={-2.88} y1={ly} x2={2.88} y2={ly} stroke={ST_SHACK.woodDark} strokeWidth={0.016} opacity={0.65} />
      ))}
      {/* right shaded side wall */}
      <polygon points="2.9,0 3.75,-0.16 3.75,-2.52 2.9,-2.65" fill={ST_SHACK.woodDark} stroke={ST_SHACK.ol} strokeWidth={0.026} />

      {/* corrugated tin gable roof + sagging porch overhang */}
      <polygon points="-3.2,-2.62 0,-3.42 3.25,-2.62 3.95,-2.48 0.65,-3.28" fill={ST_SHACK.tinDark} stroke={ST_SHACK.ol} strokeWidth={0.026} />
      <polygon points="-3.25,-2.62 0,-3.44 3.25,-2.62" fill={ST_SHACK.tin} stroke={ST_SHACK.ol} strokeWidth={0.028} />
      <polygon points="-3.1,-2.28 3.1,-2.28 2.9,-2.62 -2.9,-2.62" fill="#594d48" stroke={ST_SHACK.ol} strokeWidth={0.022} />

      {/* wooden porch deck, steps, and 3 weathered posts */}
      <rect x={-2.95} y={-0.24} width={5.9} height={0.24} fill={ST_SHACK.woodDark} stroke={ST_SHACK.ol} strokeWidth={0.024} />
      <rect x={-0.65} y={-0.12} width={1.2} height={0.12} fill={ST_SHACK.wood} stroke={ST_SHACK.ol} strokeWidth={0.02} />
      {[-2.75, 0.72, 2.75].map((px, i) => (
        <rect key={i} x={px - 0.06} y={-2.28} width={0.12} height={2.04} fill={ST_SHACK.woodDark} stroke={ST_SHACK.ol} strokeWidth={0.02} />
      ))}

      {/* front doorway + screen door */}
      <rect x={-0.52} y={-2.12} width={0.96} height={1.88} fill="#1b1410" stroke={ST_SHACK.ol} strokeWidth={0.024} />
      {glow > 0.05 && (
        <rect x={-0.48} y={-2.08} width={0.88} height={1.82} fill="#e89a4e" opacity={0.28 * glow} />
      )}
      <g transform={`translate(-0.52,-2.12)`}>
        <rect
          x={0}
          y={0}
          width={0.96 * lerp(1, 0.28, doorOpen)}
          height={1.88}
          fill="#4e3b2d"
          stroke={ST_SHACK.ol}
          strokeWidth={0.022}
        />
        <rect
          x={0.08 * lerp(1, 0.28, doorOpen)}
          y={0.12}
          width={0.8 * lerp(1, 0.28, doorOpen)}
          height={0.82}
          fill="#2a221c"
          opacity={0.75}
        />
      </g>

      {/* warm dusk windows left & right */}
      {[-1.95, 1.65].map((wx, i) => (
        <g key={i} transform={`translate(${wx},-1.62)`}>
          <rect x={-0.48} y={-0.42} width={0.96} height={0.84} fill="#261c18" stroke={ST_SHACK.ol} strokeWidth={0.024} />
          <rect x={-0.42} y={-0.36} width={0.84} height={0.72} fill="#f2a85a" opacity={0.55 * glow} />
          <line x1={0} y1={-0.38} x2={0} y2={0.38} stroke={ST_SHACK.ol} strokeWidth={0.02} />
          <line x1={-0.44} y1={0} x2={0.44} y2={0} stroke={ST_SHACK.ol} strokeWidth={0.02} />
        </g>
      ))}
    </g>
  </Card>
);

/** Barbed-wire fence run across the desert scrub */
export const BarbedFence: React.FC<{ cam: Cam; x0: number; x1: number; z: number; n?: number }> = ({
  cam, x0, x1, z, n = 6,
}) => (
  <g>
    {Array.from({ length: n + 1 }).map((_, i) => {
      const px = x0 + (i / n) * (x1 - x0);
      const tilt = (rand(i, 7) - 0.5) * 0.08;
      const b = project(cam, px, 0, z);
      const t = project(cam, px + tilt, 1.18, z);
      if (b.d <= 0.2) return null;
      return (
        <line
          key={i}
          x1={b.x}
          y1={b.y}
          x2={t.x}
          y2={t.y}
          stroke="#46332a"
          strokeWidth={Math.max(2, 0.075 * b.s)}
          strokeLinecap="round"
        />
      );
    })}
    {[0.38, 0.72, 1.06].map((wy, row) => {
      const a = project(cam, x0, wy, z);
      const b = project(cam, x1, wy, z);
      if (a.d <= 0.2 || b.d <= 0.2) return null;
      return (
        <g key={row}>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2d2530" strokeWidth={Math.max(1.1, 0.014 * a.s)} />
          {Array.from({ length: 14 }).map((_, k) => {
            const u = (k + 0.5) / 14;
            const bx = lerp(a.x, b.x, u);
            const by = lerp(a.y, b.y, u);
            const r = Math.max(2.2, 0.024 * a.s);
            return (
              <path
                key={k}
                d={`M${bx - r},${by - r} L${bx + r},${by + r} M${bx - r},${by + r} L${bx + r},${by - r}`}
                stroke="#251d28"
                strokeWidth={Math.max(1, 0.012 * a.s)}
              />
            );
          })}
        </g>
      );
    })}
  </g>
);

/** Near-foreground silhouette layer for dusk desert shots (3rd depth layer, zero blur filters) */
export const DesertDuskFore: React.FC<{ variant?: "scrub" | "wire" | "porch" }> = ({ variant = "scrub" }) => {
  if (variant === "wire") {
    return (
      <g pointerEvents="none" opacity={0.94}>
        {/* near-lens cedar fencepost at left + taut barbed-wire strand across bottom foreground */}
        <polygon points="0,320 92,335 118,1080 0,1080" fill="#1b1222" />
        <line x1={0} y1={865} x2={1920} y2={935} stroke="#191020" strokeWidth={5} />
        {[240, 560, 910, 1280, 1640].map((bx, i) => (
          <path key={i} d={`M${bx - 14},${865 + (bx / 1920) * 70 - 13} L${bx + 14},${865 + (bx / 1920) * 70 + 13} M${bx - 14},${865 + (bx / 1920) * 70 + 13} L${bx + 14},${865 + (bx / 1920) * 70 - 13}`} stroke="#191020" strokeWidth={4} />
        ))}
        <path d="M1680,1080 L1740,945 L1810,1080 M1765,1080 L1855,910 L1920,1080" fill="#1b1222" />
      </g>
    );
  }
  if (variant === "porch") {
    return (
      <g pointerEvents="none" opacity={0.95}>
        <polygon points="0,0 1920,0 1920,95 0,145" fill="#19111d" />
        <polygon points="0,0 115,0 135,1080 0,1080" fill="#19111d" />
      </g>
    );
  }
  return (
    <g pointerEvents="none" opacity={0.93}>
      {/* bottom-left desert boulder & cholla silhouette */}
      <path d="M-20,1085 L-20,935 Q120,895 255,985 L310,1085 Z" fill="#1c1224" />
      <path d="M95,965 L82,815 M88,885 L42,845 M90,865 L138,825" stroke="#1c1224" strokeWidth={18} strokeLinecap="round" />
      {/* bottom-right desert scrub & rock */}
      <path d="M1620,1085 Q1755,945 1940,920 L1940,1085 Z" fill="#1c1224" />
      <path d="M1785,975 L1755,865 M1785,975 L1820,855 M1785,975 L1865,895" stroke="#1c1224" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

/** Claustrophobic desert shack interior: sun-slatted shutters, peeling walls, kitchenette, CRT TV glow */
export const ShackRoom: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const tvFlicker = 0.85 + 0.15 * Math.sin(f * 0.43);
  return (
    <g>
      <defs>
        <linearGradient id="shackSunCone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb366" stopOpacity={0.34} />
          <stop offset="1" stopColor="#ffb366" stopOpacity={0} />
        </linearGradient>
        <radialGradient id="shackTvGlow">
          <stop offset="0" stopColor="#8ec2ff" stopOpacity={0.28 * tvFlicker} />
          <stop offset="1" stopColor="#8ec2ff" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={W} height={H} fill="#1f1612" />
      {/* floorboards */}
      <polygon points={flatQuad(cam, SX.x0, SX.x1, -0.5, SX.zBack, 0)} fill="#4b3729" />
      {[-3, -2, -1, 0, 1, 2, 3].map((lx, i) => {
        const a = project(cam, lx, 0.003, 0.2), b = project(cam, lx, 0.003, SX.zBack);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2f2118" strokeWidth={1.2} opacity={0.55} />;
      })}

      {/* back & side faded adobe-wood walls */}
      <polygon points={wallQuad(cam, SX.x0, SX.x1, 0, SX.ceil, SX.zBack)} fill="#5a4637" stroke={ST_SHACK.ol} strokeWidth={1.2} />
      <polygon points={wallQuad(cam, SX.x0, SX.x1, 0, 0.88, SX.zBack - 0.01)} fill="#3f2f24" />
      <polygon points={sideQuad(cam, SX.x0, 0, SX.ceil, -0.5, SX.zBack)} fill="#47362a" />
      <polygon points={sideQuad(cam, SX.x1, 0, SX.ceil, -0.5, SX.zBack)} fill="#433328" />

      {/* Back-left shuttered window with hot orange sunset slats */}
      <Card cam={cam} x={-1.95} y={1.62} z={SX.zBack - 0.03} blur={false}>
        <rect x={-0.62} y={-0.54} width={1.24} height={1.08} fill="#261a14" stroke={ST_SHACK.ol} strokeWidth={0.025} />
        {[-0.4, -0.24, -0.08, 0.08, 0.24, 0.4].map((sy, i) => (
          <rect key={i} x={-0.54} y={sy - 0.035} width={1.08} height={0.045} fill="#ffae5c" opacity={0.9} />
        ))}
      </Card>

      {/* Back-right kitchenette counter: stove, cast-iron skillet, foil, jars */}
      <Card cam={cam} x={1.75} y={0} z={SX.zBack - 0.35} blur={false}>
        <rect x={-1.25} y={-0.88} width={2.5} height={0.88} fill="#463529" stroke={ST_SHACK.ol} strokeWidth={0.022} />
        <rect x={-1.28} y={-0.93} width={2.56} height={0.06} fill="#6e5744" stroke={ST_SHACK.ol} strokeWidth={0.018} />
        {/* skillet + burner */}
        <ellipse cx={-0.35} cy={-0.95} rx={0.22} ry={0.045} fill="#222022" stroke={ST_SHACK.ol} strokeWidth={0.014} />
        <line x1={-0.14} y1={-0.96} x2={0.05} y2={-0.99} stroke="#222022" strokeWidth={0.024} strokeLinecap="round" />
        {/* spice tins & kettle */}
        <rect x={0.42} y={-1.14} width={0.14} height={0.21} fill="#9c4f3a" stroke={ST_SHACK.ol} strokeWidth={0.012} />
        <rect x={0.62} y={-1.1} width={0.12} height={0.17} fill="#b8984e" stroke={ST_SHACK.ol} strokeWidth={0.012} />
        {/* upper shelf + framedfolk picture */}
        <rect x={-1.15} y={-1.72} width={2.1} height={0.05} fill="#4b382b" stroke={ST_SHACK.ol} strokeWidth={0.016} />
      </Card>

      {/* Small flickering telenovela CRT TV on a side crate at left-midground */}
      <Card cam={cam} x={-2.85} y={0} z={3.85} blur={false}>
        <rect x={-0.34} y={-0.62} width={0.68} height={0.62} fill="#3d2d22" stroke={ST_SHACK.ol} strokeWidth={0.02} />
        <rect x={-0.28} y={-1.08} width={0.56} height={0.46} rx={0.03} fill="#2b2928" stroke={ST_SHACK.ol} strokeWidth={0.02} />
        <rect x={-0.23} y={-1.03} width={0.42} height={0.35} rx={0.02} fill="#9fc4ff" opacity={0.78 * tvFlicker} />
        <circle cx={0} cy={-0.85} r={1.1} fill="url(#shackTvGlow)" />
      </Card>

      {/* Diagonal dusk sunbeams pouring from the shuttered window across the table */}
      {(() => {
        const w0 = project(cam, -2.4, 2.05, SX.zBack - 0.05);
        const w1 = project(cam, -1.45, 1.15, SX.zBack - 0.05);
        const f0 = project(cam, 0.4, 0.02, 2.8);
        const f1 = project(cam, 1.65, 0.02, 3.6);
        return <polygon points={`${w0.x},${w0.y} ${w1.x},${w1.y} ${f1.x},${f1.y} ${f0.x},${f0.y}`} fill="url(#shackSunCone)" />;
      })()}

      {/* Ceiling & exposed rafters drawn AFTER walls */}
      <polygon points={flatQuad(cam, SX.x0, SX.x1, -0.5, SX.zBack, SX.ceil)} fill="#2a1e17" />
      {[1.2, 2.6, 4.0, 5.2].map((rz, i) => (
        <polygon key={i} points={wallQuad(cam, SX.x0, SX.x1, SX.ceil - 0.14, SX.ceil, rz)} fill="#3b2b21" stroke={ST_SHACK.ol} strokeWidth={0.9} />
      ))}
    </g>
  );
};

/** Shack foreground doorframe & hanging shelf silhouette (3rd depth layer) */
export const ShackFore: React.FC = () => (
  <g pointerEvents="none" opacity={0.94}>
    <polygon points="0,0 96,0 112,1080 0,1080" fill="#140e0b" />
    <polygon points="1920,0 1825,0 1805,1080 1920,1080" fill="#140e0b" />
    <polygon points="0,0 1920,0 1920,48 0,64" fill="#140e0b" />
  </g>
);

/** Wooden shack table */
export const ShackTable: React.FC<{ cam: Cam; x: number; z: number; w?: number }> = ({ cam, x, z, w = 1.45 }) => (
  <Card cam={cam} x={x} y={0} z={z} blur={false}>
    <ellipse cx={0} cy={0.015} rx={w * 0.56} ry={0.08} fill="#140e0b" opacity={0.48} />
    <rect x={-w * 0.44} y={-0.74} width={0.07} height={0.74} fill="#3d2c20" stroke={ST_SHACK.ol} strokeWidth={0.016} />
    <rect x={w * 0.44 - 0.07} y={-0.74} width={0.07} height={0.74} fill="#3d2c20" stroke={ST_SHACK.ol} strokeWidth={0.016} />
    <rect x={-w * 0.44} y={-0.68} width={w * 0.88} height={0.08} fill="#35261b" stroke={ST_SHACK.ol} strokeWidth={0.014} />
    <rect x={-w * 0.5} y={-0.78} width={w} height={0.055} rx={0.01} fill="#6b4f3a" stroke={ST_SHACK.ol} strokeWidth={0.018} />
  </Card>
);

/** Elderly mute uncle in his spoked wheelchair with brass service bell bolted to the armrest */
export const WheelchairUncle: React.FC<{
  cam: Cam; x: number; z: number; flip?: boolean; f: number; bellHit?: number;
  lookX?: number; lookY?: number; brow?: number; mouth?: "flat" | "frown" | "open";
}> = ({
  cam, x, z, flip = false, f, bellHit = 0, lookX = 0.3, lookY = 0.04, brow = 0.48, mouth = "frown",
}) => {
  const press = clamp(bellHit);
  const poseU: Pose = chairSit({
    torso: 8,
    neck: 5,
    shL: 24,
    shR: 32,
    elL: 46,
    elR: lerp(38, 26, press),
    hipL: 66, hipR: 68, knL: 92, knR: 94,
    breathe: 0.45,
    slump: 0.24,
  });

  return (
    <Card cam={cam} x={x} y={0} z={z} flip={flip} blur={false}>
      <ellipse cx={0} cy={0.015} rx={0.44} ry={0.085} fill="#140e0b" opacity={0.48} />
      {/* Wheelchair back frame & vinyl backrest */}
      <line x1={-0.22} y1={-0.42} x2={-0.24} y2={-1.12} stroke="#8c969e" strokeWidth={0.028} strokeLinecap="round" />
      <path d="M-0.24,-1.12 L-0.33,-1.14" stroke="#222" strokeWidth={0.032} strokeLinecap="round" />
      <rect x={-0.23} y={-1.04} width={0.12} height={0.56} rx={0.02} fill="#2b2624" stroke={ST_SHACK.ol} strokeWidth={0.014} />
      {/* Rear spoked wheel (far side) */}
      <circle cx={-0.08} cy={-0.31} r={0.3} fill="none" stroke="#666e75" strokeWidth={0.026} />

      {/* Uncle Figure */}
      <Figure
        pose={poseU}
        view={0.58}
        look={uncleLook({
          yaw: 0.22,
          lids: 0.32 + blink(f, 8) * 0.4,
          lookX,
          lookY,
          brow,
          mouth,
          mouthOpen: mouth === "open" ? 0.14 : 0,
        })}
        pal={UNCLE.pal}
        height={UNCLE.height}
        rimLight="#ffb469"
        rimSide={1}
      />

      {/* Wheelchair near-side armrest + bolted brass service bell + spoked wheel + front caster + footrest */}
      <rect x={-0.22} y={-0.46} width={0.46} height={0.05} fill="#2b2624" stroke={ST_SHACK.ol} strokeWidth={0.014} />
      {/* wooden armrest plank */}
      <rect x={-0.18} y={-0.68} width={0.44} height={0.038} rx={0.01} fill="#5e4430" stroke={ST_SHACK.ol} strokeWidth={0.012} />
      <line x1={-0.14} y1={-0.64} x2={-0.14} y2={-0.46} stroke="#8c969e" strokeWidth={0.022} />
      <line x1={0.2} y1={-0.64} x2={0.2} y2={-0.46} stroke="#8c969e" strokeWidth={0.022} />

      {/* Brass service bell strapped/bolted to the tip of the armrest */}
      <g transform="translate(0.21,-0.685)">
        <rect x={-0.042} y={-0.008} width={0.084} height={0.012} fill="#4b4e52" stroke={ST_SHACK.ol} strokeWidth={0.006} />
        <path d="M-0.036,-0.008 A0.036,0.03 0 0 1 0.036,-0.008 Z" fill="#d9b24c" stroke={ST_SHACK.ol} strokeWidth={0.007} />
        <line x1={0} y1={-0.038} x2={0} y2={-0.05 + 0.008 * press} stroke="#e8ca6e" strokeWidth={0.008} />
        <circle cx={0} cy={-0.052 + 0.008 * press} r={0.007} fill="#f2d985" stroke={ST_SHACK.ol} strokeWidth={0.004} />
        {press > 0.35 && (
          <g stroke="#ffe49c" strokeWidth={0.005} fill="none" opacity={0.85}>
            <path d="M-0.052,-0.032 A0.055,0.055 0 0 1 -0.035,-0.062" />
            <path d="M0.052,-0.032 A0.055,0.055 0 0 0 0.035,-0.062" />
          </g>
        )}
      </g>

      {/* Large near spoked wheel + handrim + front caster + footrest */}
      <circle cx={-0.04} cy={-0.31} r={0.31} fill="none" stroke="#232426" strokeWidth={0.038} />
      <circle cx={-0.04} cy={-0.31} r={0.285} fill="none" stroke="#9aa4ad" strokeWidth={0.014} />
      {[0, 30, 60, 90, 120, 150].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={-0.04 - Math.cos(r) * 0.28}
            y1={-0.31 - Math.sin(r) * 0.28}
            x2={-0.04 + Math.cos(r) * 0.28}
            y2={-0.31 + Math.sin(r) * 0.28}
            stroke="#8a949c"
            strokeWidth={0.006}
          />
        );
      })}
      <circle cx={-0.04} cy={-0.31} r={0.035} fill="#aeb8c0" stroke={ST_SHACK.ol} strokeWidth={0.01} />
      <line x1={0.2} y1={-0.44} x2={0.28} y2={-0.11} stroke="#8c969e" strokeWidth={0.024} />
      <circle cx={0.28} cy={-0.1} r={0.1} fill="#232426" stroke={ST_SHACK.ol} strokeWidth={0.016} />
      <circle cx={0.28} cy={-0.1} r={0.045} fill="#8c969e" />
      <line x1={0.24} y1={-0.22} x2={0.38} y2={-0.14} stroke="#8c969e" strokeWidth={0.02} />
      <rect x={0.32} y={-0.15} width={0.13} height={0.025} fill="#2b2624" stroke={ST_SHACK.ol} strokeWidth={0.008} />
    </Card>
  );
};
