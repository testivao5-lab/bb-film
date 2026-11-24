// Batch B · kit for the GARAGE / TUCO-OFFICE scenes (36 tuco-desk, 37 itemised, 38 boom).
// Tuco's upstairs front-of-shop HQ: aged plaster & concrete-block walls, two barred industrial multi-pane
// windows with dusty daylight shafts, corrugated steel roll-up bay door, exposed ceiling joists & HVAC duct,
// steel shelving, filing cabinet, workbench, salvaged oak desk under a hanging cage lamp, and near-lens
// foreground silhouettes. Original design; unbranded; zero live feGaussianBlur on big layers. 1 unit = 1 m.
import React from "react";
import { Cam, Card, project, W } from "../lib/camera";
import { lerp, rand, noise1, clamp } from "../lib/anim";
import { wallQuad, sideQuad, flatQuad, flatDisc, qOf, Dust } from "./b_common";

export const GX = { x0: -5.2, x1: 5.2, zBack: 6.4, zFront: -1.6, ceil: 3.0 };

export const GT = {
  wall: "#837764", wallDark: "#52493d", wallLight: "#9c8f79", kick: "#433c32",
  floor: "#584f44", floor2: "#695f52", ol: "#211b15",
  steel: "#838c94", rust: "#8a5638", rustDark: "#593622",
  wood: "#745437", woodDark: "#432f1e", woodLight: "#9c7650",
  shade: "#384039", card: "#a8895e",
};

export interface GarageRoomProps {
  cam: Cam;
  f: number;
  light?: number;
  /** window blast state 0..1 (0 = intact dusty glass, 1 = blown out) */
  burst?: number;
  /** room blast damage 0..1 (0 = intact, 1 = tilted shelves, fallen boxes, broken glass on slab) */
  wreck?: number;
  /** cage-lamp swing angle in radians (0 = hanging plumb) */
  swing?: number;
  /** draw near-lens foreground silhouettes on wide/medium shots */
  fore?: boolean;
  /** legacy compatibility props */
  win?: boolean;
  winX?: number;
  lampX?: number;
  lampZ?: number;
}

/* ─────────────────────────── shell: three depth layers ─────────────────────────── */
export const GarageRoom: React.FC<GarageRoomProps> = ({
  cam, f, light = 1, burst = 0, wreck = 0, swing = 0, fore = true,
  win = true, lampX = 0.05, lampZ = 3.55,
}) => {
  const { x0, x1, zBack, ceil } = GX;
  const zn = Math.max(GX.zFront, cam.z + 0.32);
  const shine = 0.9 + 0.1 * Math.sin(f * 0.06) * Math.sin(f * 0.021 + 1);
  const wL = -2.2, wLw = 1.82;
  const wR = 1.82, wRw = 1.48;

  // Cage-lamp cord pivot & swung shade position
  const cordLen = 0.86;
  const lx = lampX + Math.sin(swing) * cordLen;
  const ly = ceil - Math.cos(swing) * cordLen;
  const poolShift = Math.sin(swing) * 1.45;

  return (
    <g>
      <defs>
        <linearGradient id="gwall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#383129" />
          <stop offset="0.28" stopColor={GT.wall} />
          <stop offset="0.72" stopColor={GT.wallLight} />
          <stop offset="1" stopColor="#5c5345" />
        </linearGradient>
        <linearGradient id="gfloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#312b24" />
          <stop offset="0.46" stopColor={GT.floor} />
          <stop offset="1" stopColor={GT.floor2} />
        </linearGradient>
        <linearGradient id="gsideL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#241f19" />
          <stop offset="0.68" stopColor="#4c4439" />
          <stop offset="1" stopColor="#3c352c" />
        </linearGradient>
        <linearGradient id="gsideR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4f463b" />
          <stop offset="0.5" stopColor="#5d5346" />
          <stop offset="1" stopColor="#342e26" />
        </linearGradient>
        <radialGradient id="lampPool">
          <stop offset="0" stopColor="#ffe7b0" stopOpacity={0.62} />
          <stop offset="0.52" stopColor="#ffcf80" stopOpacity={0.22} />
          <stop offset="1" stopColor="#ffcf80" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="coneG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe8b8" stopOpacity={0.28} />
          <stop offset="0.65" stopColor="#ffd894" stopOpacity={0.1} />
          <stop offset="1" stopColor="#ffd894" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="shaftG" x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0" stopColor="#d6e8f8" stopOpacity={0.22} />
          <stop offset="0.6" stopColor="#d6e8f8" stopOpacity={0.09} />
          <stop offset="1" stopColor="#d6e8f8" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* ── 1. FLOOR SLAB ── */}
      <polygon points={flatQuad(cam, x0, x1, zn, zBack, 0)} fill="url(#gfloor)" />
      {/* expansion seams, oil stains, tyre tracks */}
      <polygon points={flatQuad(cam, x0, x1, 2.18, 2.24, 0.002)} fill="#352f28" opacity={0.55} />
      <polygon points={flatQuad(cam, x0, x1, 4.36, 4.42, 0.002)} fill="#352f28" opacity={0.45} />
      <polygon points={flatQuad(cam, -0.92, -0.87, zn, zBack, 0.002)} fill="#38312a" opacity={0.35} />
      <polygon points={flatQuad(cam, -1.7, 1.3, 2.75, 4.25, 0.002)} fill="#2e2821" opacity={0.2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={`oil${i}`} points={flatDisc(cam, -3.1 + i * 1.7 + rand(i, 3) * 0.6, 2.0 + rand(i, 4) * 3.6, 0.32 + rand(i, 5) * 0.55, 0.003, 16, 0.42, i)} fill="#2a241d" opacity={0.26} />
      ))}
      {[0, 1].map((i) => (
        <polygon key={`sk${i}`} points={flatQuad(cam, 3.1 + i * 0.95, 3.42 + i * 0.95, 1.6, zBack, 0.003)} fill="#2a241e" opacity={0.16} />
      ))}
      {/* scorch / blast dust mark + scattered window glass when wreck > 0 */}
      {wreck > 0.05 && (
        <g opacity={Math.min(1, wreck * 1.3)}>
          <polygon points={flatDisc(cam, -1.12, 2.62, 0.85, 0.004, 20, 0.35, 19)} fill="#231f1b" opacity={0.45} />
          <polygon points={flatDisc(cam, -1.12, 2.62, 1.35, 0.0035, 20, 0.4, 23)} fill="#bfb6a2" opacity={0.18} />
          {Array.from({ length: 22 }).map((_, i) => {
            const gx = (i < 13 ? wL : wR) + (rand(i, 71) - 0.5) * 2.1;
            const gz = 3.7 + rand(i, 72) * 2.3;
            const p = project(cam, gx, 0.008, gz);
            if (p.d < 0.3) return null;
            const sz = (0.025 + rand(i, 73) * 0.04) * p.s;
            return <polygon key={`gl${i}`} points={`${p.x},${p.y} ${p.x + sz},${p.y - sz * 0.32} ${p.x + sz * 0.6},${p.y + sz * 0.28}`} fill="#d5e8ef" opacity={0.65} />;
          })}
        </g>
      )}

      {/* ── 2. BACK WALL (far layer) ── */}
      <polygon points={wallQuad(cam, x0, x1, 0, ceil, zBack)} fill="url(#gwall)" />
      {/* faint block/plaster courses */}
      {Array.from({ length: 10 }).map((_, r) => (
        <polygon key={`cr${r}`} points={wallQuad(cam, x0, x1, 0.28 + r * 0.27, 0.292 + r * 0.27, zBack)} fill="#3a332a" opacity={0.12} />
      ))}
      {/* dark lower dado / wainscot + rail */}
      <polygon points={wallQuad(cam, x0, x1, 0, 0.92, zBack)} fill="#5b5143" opacity={0.55} />
      <polygon points={wallQuad(cam, x0, x1, 0.91, 0.96, zBack)} fill="#3d352b" opacity={0.75} />
      <polygon points={wallQuad(cam, x0, x1, 0, 0.22, zBack)} fill={GT.kick} opacity={0.9} />
      <polygon points={wallQuad(cam, x0, x1, ceil - 0.38, ceil, zBack)} fill="#2e2820" opacity={0.5} />

      {/* plaster repair patches — strictly clamped below ceiling */}
      {Array.from({ length: 8 }).map((_, i) => {
        const bx = x0 + 0.5 + rand(i, 41) * 8.6;
        const by = 0.35 + rand(i, 42) * 1.55;
        const bw = 0.45 + rand(i, 43) * 1.15;
        const bh = Math.min(0.35 + rand(i, 44) * 0.75, ceil - 0.22 - by);
        if (bh <= 0.08) return null;
        return <polygon key={`p${i}`} points={wallQuad(cam, bx, bx + bw, by, by + bh, zBack)} fill={i % 2 ? "#9a8d76" : "#6c6252"} opacity={0.22} />;
      })}
      {/* vertical water / smoke streaks from ceiling */}
      {Array.from({ length: 9 }).map((_, i) => {
        const sx = x0 + 0.4 + rand(i, 81) * 9.4;
        const sw = 0.18 + rand(i, 82) * 0.55;
        return <polygon key={`st${i}`} points={wallQuad(cam, sx, sx + sw, 1.1 + rand(i, 83) * 0.9, ceil, zBack)} fill="#332c23" opacity={0.09 + rand(i, 84) * 0.08} />;
      })}
      {/* damp blotches + plaster cracks */}
      {Array.from({ length: 6 }).map((_, i) => {
        const bx = x0 + 0.9 + rand(i, 15) * 8.2;
        const by = 0.55 + rand(i, 16) * 1.55;
        const p = project(cam, bx, by, zBack - 0.01);
        return <ellipse key={`d${i}`} cx={p.x} cy={p.y} rx={(0.26 + rand(i, 17) * 0.24) * p.s} ry={(0.14 + rand(i, 18) * 0.14) * p.s} fill="#4d4539" opacity={0.22} />;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const bx = x0 + 1.1 + rand(i, 51) * 7.8;
        const p0 = project(cam, bx, 0.55 + rand(i, 52) * 0.75, zBack - 0.005);
        const p1 = project(cam, bx + (rand(i, 53) - 0.4) * 0.28, 1.75 + rand(i, 54) * 0.75, zBack - 0.005);
        return <path key={`c${i}`} d={`M${p0.x},${p0.y} Q${(p0.x + p1.x) / 2 + 9},${(p0.y + p1.y) / 2} ${p1.x},${p1.y}`} stroke="#3a3329" strokeWidth={1.2} fill="none" opacity={0.48} />;
      })}

      {/* electrical conduit + breaker box on back wall */}
      <polygon points={wallQuad(cam, x0, x1, 2.52, 2.555, zBack - 0.01)} fill="#585143" opacity={0.85} />
      <polygon points={wallQuad(cam, 0.68, 0.71, 1.72, 2.55, zBack - 0.01)} fill="#585143" opacity={0.85} />
      <polygon points={wallQuad(cam, 0.56, 0.84, 1.38, 1.76, zBack - 0.015)} fill="#5b6266" stroke={GT.ol} strokeWidth={0.8} />
      <polygon points={wallQuad(cam, 0.59, 0.81, 1.42, 1.72, zBack - 0.018)} fill="#495054" />
      <polygon points={wallQuad(cam, 0.66, 0.74, 1.61, 1.65, zBack - 0.02)} fill="#b8924a" opacity={0.75} />

      {/* cork pinboard with scribbled notes (zero readable text) */}
      <polygon points={wallQuad(cam, -1.08, -0.52, 1.34, 1.86, zBack - 0.015)} fill="#7d6142" stroke={GT.ol} strokeWidth={1} />
      {[
        { x: -1.01, y: 1.62, w: 0.18, h: 0.17, c: "#ebe3cc" },
        { x: -0.79, y: 1.56, w: 0.2, h: 0.21, c: "#e6d296" },
        { x: -0.95, y: 1.4, w: 0.22, h: 0.14, c: "#dfdad0" },
      ].map((n, i) => (
        <g key={`nt${i}`}>
          <polygon points={wallQuad(cam, n.x, n.x + n.w, n.y, n.y + n.h, zBack - 0.02)} fill={n.c} opacity={0.88} />
          <polygon points={wallQuad(cam, n.x + 0.03, n.x + n.w - 0.04, n.y + n.h * 0.62, n.y + n.h * 0.68, zBack - 0.022)} fill="#55504a" opacity={0.55} />
          <polygon points={wallQuad(cam, n.x + 0.03, n.x + n.w - 0.07, n.y + n.h * 0.36, n.y + n.h * 0.42, zBack - 0.022)} fill="#55504a" opacity={0.45} />
        </g>
      ))}

      {/* pegboard with recognizable hand tools behind the desk */}
      {(() => {
        const drop = wreck * 0.12;
        return (
          <g>
            <polygon points={qOf(cam, [[-0.4, 2.08, zBack - 0.015], [0.44, 2.08 - drop, zBack - 0.015], [0.44, 1.2 - drop, zBack - 0.015], [-0.4, 1.2, zBack - 0.015]])} fill="#7e6545" stroke={GT.ol} strokeWidth={1} />
            <polygon points={qOf(cam, [[-0.4, 2.08, zBack - 0.016], [0.44, 2.08 - drop, zBack - 0.016], [0.44, 2.02 - drop, zBack - 0.016], [-0.4, 2.02, zBack - 0.016]])} fill="#4d3c28" opacity={0.65} />
            {/* wrench, hammer, hacksaw, pliers, screwdriver */}
            {[
              { x: -0.29, y: 1.62, h: 0.34, headW: 0.07, headH: 0.06, c: "#43484c" },
              { x: -0.13, y: 1.54, h: 0.4, headW: 0.13, headH: 0.05, c: "#6b4d32" },
              { x: 0.05, y: 1.58, h: 0.36, headW: 0.11, headH: 0.14, c: "#3b4044" },
              { x: 0.22, y: 1.68, h: 0.26, headW: 0.06, headH: 0.08, c: "#484d52" },
              { x: 0.34, y: 1.66, h: 0.28, headW: 0.04, headH: 0.09, c: "#8c4633" },
            ].map((tl, i) => {
              const yd = drop * ((tl.x + 0.4) / 0.84);
              return (
                <g key={`tl${i}`}>
                  <polygon points={wallQuad(cam, tl.x, tl.x + 0.028, tl.y - yd, tl.y + tl.h - yd, zBack - 0.022)} fill={tl.c} />
                  <polygon points={wallQuad(cam, tl.x - (tl.headW - 0.028) / 2, tl.x + (tl.headW + 0.028) / 2, tl.y + tl.h - tl.headH - yd, tl.y + tl.h - yd, zBack - 0.024)} fill="#2e3236" />
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* corrugated roll-up steel bay door on far right */}
      <polygon points={wallQuad(cam, 2.88, 4.92, 0, 2.58, zBack - 0.015)} fill="#6f777e" stroke={GT.ol} strokeWidth={1.2} />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={`sl${i}`}>
          <polygon points={wallQuad(cam, 2.91, 4.89, 0.1 + i * 0.245, 0.18 + i * 0.245, zBack - 0.02)} fill="#525960" opacity={0.65} />
          <polygon points={wallQuad(cam, 2.91, 4.89, 0.18 + i * 0.245, 0.215 + i * 0.245, zBack - 0.02)} fill="#9ea7ae" opacity={0.32} />
        </g>
      ))}
      {[3.2, 3.75, 4.35, 4.7].map((rx, i) => (
        <polygon key={`rr${i}`} points={wallQuad(cam, rx, rx + 0.06 + rand(i, 61) * 0.09, 0.25, 2.35, zBack - 0.022)} fill={GT.rust} opacity={0.18 + rand(i, 62) * 0.1} />
      ))}
      <polygon points={wallQuad(cam, 2.91, 4.89, 0, 0.045, zBack - 0.025)} fill="#ffe6ae" opacity={0.52} />
      <polygon points={wallQuad(cam, 2.84, 4.96, 2.56, 2.86, zBack - 0.025)} fill={GT.rustDark} stroke={GT.ol} strokeWidth={1} />
      <polygon points={wallQuad(cam, 2.84, 2.92, 0, 2.86, zBack - 0.025)} fill="#494339" />
      <polygon points={wallQuad(cam, 4.88, 4.96, 0, 2.86, zBack - 0.025)} fill="#494339" />

      {/* two barred industrial shop windows (present across scenes 36-38 for continuity & light) */}
      {win && <GarageWindow cam={cam} x={wL} w={wLw} burst={burst} />}
      {win && <GarageWindow cam={cam} x={wR} w={wRw} burst={burst} />}

      {/* ── 3. SIDE WALLS ── */}
      <polygon points={sideQuad(cam, x0, zn, zBack, 0, ceil)} fill="url(#gsideL)" />
      <polygon points={sideQuad(cam, x0, zn, zBack, 0, 0.92)} fill="#2e2820" opacity={0.55} />
      <polygon points={sideQuad(cam, x0, zn, zBack, 0, 0.24)} fill="#1f1b16" opacity={0.85} />
      <polygon points={sideQuad(cam, x1, zn, zBack, 0, ceil)} fill="url(#gsideR)" />
      <polygon points={sideQuad(cam, x1, zn, zBack, 0, 0.24)} fill="#29231c" opacity={0.8} />

      {/* ── 4. CEILING PLANE + EXPOSED JOISTS + DUCT (drawn AFTER walls so nothing bleeds above ceil) ── */}
      <polygon points={flatQuad(cam, x0, x1, zn, zBack, ceil)} fill="#241f19" />
      {Array.from({ length: 12 }).map((_, i) => {
        const jx = x0 + 0.52 + i * 0.86;
        return (
          <g key={`j${i}`}>
            <polygon points={qOf(cam, [[jx, ceil, zn], [jx, ceil, zBack], [jx, ceil - 0.17, zBack], [jx, ceil - 0.17, zn]])} fill={i % 2 ? "#463b2d" : "#3d3326"} />
            <polygon points={qOf(cam, [[jx, ceil - 0.17, zn], [jx + 0.09, ceil - 0.17, zn], [jx + 0.09, ceil - 0.17, zBack], [jx, ceil - 0.17, zBack]])} fill="#2a231b" />
          </g>
        );
      })}
      {/* galvanized ceiling duct + hanger straps */}
      <polygon points={qOf(cam, [[-4.8, ceil - 0.19, zBack - 0.35], [2.4, ceil - 0.22, zBack - 0.35], [2.4, ceil - 0.41, zBack - 0.35], [-4.8, ceil - 0.38, zBack - 0.35]])} fill="#666d74" />
      <polygon points={qOf(cam, [[-4.8, ceil - 0.31, zBack - 0.35], [2.4, ceil - 0.34, zBack - 0.35], [2.4, ceil - 0.41, zBack - 0.35], [-4.8, ceil - 0.38, zBack - 0.35]])} fill="#3f454b" />
      {[-4.1, -2.5, -0.9, 0.7, 2.1].map((hx) => (
        <polygon key={`hs${hx}`} points={qOf(cam, [[hx, ceil - 0.02, zBack - 0.33], [hx + 0.05, ceil - 0.02, zBack - 0.33], [hx + 0.05, ceil - 0.4, zBack - 0.33], [hx, ceil - 0.4, zBack - 0.33]])} fill="#33383d" />
      ))}

      {/* ── 5. FAR & MID SET-DRESSING PROPS ── */}
      <BackShelves cam={cam} x={-4.25} wreck={wreck} />
      <Barrel cam={cam} x={-3.05} z={zBack - 0.58} />
      <CrateStack cam={cam} x={-2.25} z={zBack - 0.56} seed={3} wreck={wreck} />
      <FilingCabinet cam={cam} x={-1.22} z={zBack - 0.46} wreck={wreck} />

      <Workbench cam={cam} x={2.75} z={4.95} />
      <ShelfUnit cam={cam} x={-4.88} z={3.25} wreck={wreck} />
      <TyreStack cam={cam} x={-3.95} z={2.45} />
      <CrateStack cam={cam} x={3.85} z={4.1} seed={9} small wreck={wreck * 0.6} />

      {/* ── 6. VOLUMETRIC DAYLIGHT SHAFTS FROM BOTH WINDOWS ── */}
      {win && [
        { wx: wL, ww: wLw, sx: 0.75 },
        { wx: wR, ww: wRw, sx: 0.55 },
      ].map(({ wx, ww, sx }, idx) => {
        const a = project(cam, wx - ww * 0.46, 2.24, zBack - 0.05);
        const b = project(cam, wx + ww * 0.46, 2.24, zBack - 0.05);
        const c = project(cam, wx + ww * 0.55 + sx, 0, 3.15);
        const d = project(cam, wx - ww * 0.42 + sx * 0.4, 0, 3.15);
        const boost = 1 + 0.35 * burst;
        return (
          <g key={`sh${idx}`} opacity={0.85 * Math.min(1.25, boost)}>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="url(#shaftG)" />
            <polygon points={flatQuad(cam, wx - ww * 0.4 + sx * 0.4, wx + ww * 0.52 + sx, 2.95, 3.85, 0.004)} fill="#dceaf7" opacity={0.11 * boost} />
          </g>
        );
      })}

      {/* ── 7. OVERHEAD CAGE-LAMP KEY LIGHT + CONE + FLOOR POOL ── */}
      <g>
        {(() => {
          const topP = project(cam, lampX, ceil, lampZ);
          const shTop = project(cam, lx, ly + 0.14, lampZ);
          const bulbP = project(cam, lx, ly - 0.03, lampZ);
          const bl = project(cam, lampX - 1.55 + poolShift, 0, lampZ - 0.25);
          const br = project(cam, lampX + 1.55 + poolShift, 0, lampZ - 0.25);
          const deg = (-swing * 180) / Math.PI;
          const s = bulbP.s;
          return (
            <>
              {/* cord from ceiling joist */}
              <line x1={topP.x} y1={topP.y} x2={shTop.x} y2={shTop.y} stroke="#1f1b17" strokeWidth={Math.max(1.6, 0.01 * s)} />
              {/* volumetric warm cone */}
              <polygon
                points={`${bulbP.x - 0.22 * s},${bulbP.y} ${bulbP.x + 0.22 * s},${bulbP.y} ${br.x},${br.y} ${bl.x},${bl.y}`}
                fill="url(#coneG)"
                opacity={0.85 * light}
              />
              {/* enamelled factory dome shade + wire cage, rotated by swing */}
              <g transform={`translate(${bulbP.x},${bulbP.y}) rotate(${deg})`}>
                <circle cx={0} cy={0.02 * s} r={0.36 * s} fill="url(#lampPool)" opacity={shine * light} />
                {/* warm reflective underside */}
                <ellipse cx={0} cy={0.01 * s} rx={0.25 * s} ry={0.055 * s} fill="#ecd8a6" stroke={GT.ol} strokeWidth={Math.max(1, 0.008 * s)} />
                {/* bulb */}
                <ellipse cx={0} cy={0.035 * s} rx={0.055 * s} ry={0.065 * s} fill="#fff8de" opacity={0.96 * light} />
                {/* dome body + neck */}
                <path
                  d={`M${-0.25 * s},${0.01 * s} C${-0.22 * s},${-0.11 * s} ${-0.08 * s},${-0.14 * s} ${-0.045 * s},${-0.16 * s} L${0.045 * s},${-0.16 * s} C${0.08 * s},${-0.14 * s} ${0.22 * s},${-0.11 * s} ${0.25 * s},${0.01 * s} Z`}
                  fill={GT.shade}
                  stroke={GT.ol}
                  strokeWidth={Math.max(1.2, 0.009 * s)}
                />
                <path
                  d={`M${-0.19 * s},${-0.02 * s} C${-0.14 * s},${-0.09 * s} ${-0.05 * s},${-0.12 * s} 0,${-0.12 * s}`}
                  stroke="#5b665d"
                  strokeWidth={Math.max(1, 0.014 * s)}
                  fill="none"
                  opacity={0.65}
                />
                {/* wire bulb guard */}
                <path
                  d={`M${-0.08 * s},${0.02 * s} L${-0.055 * s},${0.11 * s} L${0.055 * s},${0.11 * s} L${0.08 * s},${0.02 * s} M0,${0.02 * s} L0,${0.115 * s}`}
                  stroke="#27241f"
                  strokeWidth={Math.max(0.9, 0.005 * s)}
                  fill="none"
                  opacity={0.75}
                />
              </g>
            </>
          );
        })()}
        {/* warm pool on the concrete slab under the desk */}
        <polygon points={flatDisc(cam, lampX + poolShift * 0.85, lampZ, 1.75, 0.005, 26, 0.12, 5)} fill="#ffd796" opacity={0.18 * light * shine} />
      </g>

      {/* ── 8. AMBIENT MOTES IN ROOM SPACE + FOREGROUND SILHOUETTES ── */}
      <Dust cam={cam} f={f} n={32} x0={-3.8} x1={3.6} z0={cam.z + 0.65} z1={6.0} h={2.5} seed={4} color="#ffe9c0" />
      {fore && cam.z < 1.55 && <GarageFore cam={cam} f={f} />}
    </g>
  );
};

/* ─────────────────────────── near-camera foreground (zero live blur!) ─────────────────────────── */
/** Near-lens framing silhouettes: left steel shelf edge + oil tin, right swaying chain hoist.
 *  Uses two-pass soft-edge dark silhouettes instead of expensive feGaussianBlur. */
export const GarageFore: React.FC<{ cam: Cam; f: number; o?: number }> = ({ cam, f, o = 1 }) => {
  const zL = 1.76, zR = 1.84;
  if (zL - cam.z < 0.3) return null;
  const pL = project(cam, -1.14, 0, zL);
  const pR = project(cam, 0.28, GX.ceil, zR);
  const sway = Math.sin(f * 0.022) * 0.015 * pR.s;
  // Only draw when sitting near the outer frame edges (never across centre action)
  const showL = pL.x < 190 && pL.x > -140;
  const showR = pR.x > W - 220 && pR.x < W + 120;
  return (
    <g opacity={o * 0.92}>
      {showL && (
        <g transform={`translate(${pL.x.toFixed(1)},0)`}>
          {/* soft outer halo pass (fakes shallow DoF cheaply) */}
          <rect x={-52} y={0} width={78} height={1080} fill="#120e0a" opacity={0.32} />
          <rect x={-44} y={0} width={62} height={1080} fill="#17120d" />
          {/* horizontal shelf lip + diagonal bracket + oil tin silhouette */}
          <rect x={-44} y={250} width={165} height={26} rx={4} fill="#14100b" opacity={0.35} />
          <rect x={-44} y={254} width={156} height={18} rx={3} fill="#19140e" />
          <path d="M18,272 L86,338 L18,338 Z" fill="#17120d" opacity={0.85} />
          <rect x={36} y={182} width={54} height={72} rx={5} fill="#1a1510" />
          <rect x={52} y={168} width={22} height={16} rx={2} fill="#1a1510" />
          <rect x={-44} y={760} width={142} height={18} rx={3} fill="#18130d" />
        </g>
      )}
      {showR && (
        <g transform={`translate(${(pR.x + sway).toFixed(1)},0)`}>
          {/* hanging chain hoist silhouette at upper-right edge */}
          <path d="M0,0 L0,430" stroke="#120e0a" strokeWidth={20} opacity={0.26} />
          {Array.from({ length: 15 }).map((_, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={16 + i * 27}
              rx={i % 2 ? 5 : 9}
              ry={16}
              fill="none"
              stroke="#18130e"
              strokeWidth={5.5}
            />
          ))}
          <path d="M-10,418 C-14,442 12,452 14,434 C15,424 6,418 2,414" fill="none" stroke="#18130e" strokeWidth={7} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

/* ─────────────────────────── set dressing pieces ─────────────────────────── */

const BackShelves: React.FC<{ cam: Cam; x: number; wreck?: number }> = ({ cam, x, wreck = 0 }) => {
  const z = GX.zBack - 0.22;
  const tilt = wreck * 0.09;
  return (
    <g>
      {[0.58, 1.18, 1.82].map((hy, r) => {
        const drop = r === 2 ? tilt : tilt * 0.4;
        return (
          <g key={r}>
            <polygon points={qOf(cam, [[x - 0.92, hy + 0.05, z], [x + 0.92, hy + 0.05 - drop, z], [x + 0.92, hy - drop, z], [x - 0.92, hy, z]])} fill={GT.wood} stroke={GT.ol} strokeWidth={0.8} />
            {Array.from({ length: 5 }).map((_, i) => {
              const bx = x - 0.8 + i * 0.34 + rand(i, r * 7) * 0.07;
              const h = 0.16 + rand(i, r * 7 + 1) * 0.24;
              const w = 0.13 + rand(i, r * 7 + 2) * 0.11;
              const dy = drop * ((bx - (x - 0.92)) / 1.84);
              const tints = ["#8a5438", "#5d6e59", "#94835c", "#50606d", "#856e48"];
              return (
                <g key={i}>
                  <polygon points={wallQuad(cam, bx, bx + w, hy + 0.05 - dy, hy + 0.05 + h - dy, z - 0.02)} fill={tints[(i + r) % 5]} stroke={GT.ol} strokeWidth={0.6} />
                  <polygon points={wallQuad(cam, bx + 0.015, bx + w - 0.015, hy + 0.09 - dy, hy + 0.14 - dy, z - 0.025)} fill="#d8cfba" opacity={0.55} />
                </g>
              );
            })}
          </g>
        );
      })}
      {[-0.92, 0, 0.92].map((ux, i) => (
        <polygon key={i} points={wallQuad(cam, x + ux - 0.03, x + ux + 0.03, 0, 1.95, z - 0.03)} fill="#38342e" />
      ))}
    </g>
  );
};

const FilingCabinet: React.FC<{ cam: Cam; x: number; z: number; wreck?: number }> = ({ cam, x, z, wreck = 0 }) => {
  const w = 0.48, h = 1.04, d = 0.52;
  return (
    <g>
      <polygon points={flatDisc(cam, x, z, 0.38, 0.004, 14, 0.15, 8)} fill="#241f19" opacity={0.35} />
      {/* front */}
      <polygon points={qOf(cam, [[x - w / 2, h, z - d / 2], [x + w / 2, h, z - d / 2], [x + w / 2, 0, z - d / 2], [x - w / 2, 0, z - d / 2]])} fill="#596157" stroke={GT.ol} strokeWidth={0.9} />
      {/* side */}
      <polygon points={qOf(cam, [[x + w / 2, h, z - d / 2], [x + w / 2, h, z + d / 2], [x + w / 2, 0, z + d / 2], [x + w / 2, 0, z - d / 2]])} fill="#424940" stroke={GT.ol} strokeWidth={0.8} />
      {/* top */}
      <polygon points={qOf(cam, [[x - w / 2, h, z - d / 2], [x + w / 2, h, z - d / 2], [x + w / 2, h, z + d / 2], [x - w / 2, h, z + d / 2]])} fill="#6d766b" stroke={GT.ol} strokeWidth={0.8} />
      {/* two drawers + label holders */}
      {[0.08, 0.54].map((dy, i) => {
        const pullOut = i === 1 ? 0.05 + wreck * 0.14 : 0;
        return (
          <g key={i}>
            <polygon points={qOf(cam, [[x - w * 0.43, dy + 0.41, z - d / 2 - pullOut], [x + w * 0.43, dy + 0.41, z - d / 2 - pullOut], [x + w * 0.43, dy, z - d / 2 - pullOut], [x - w * 0.43, dy, z - d / 2 - pullOut]])} fill="#636c61" stroke={GT.ol} strokeWidth={0.7} />
            <polygon points={wallQuad(cam, x - 0.06, x + 0.06, dy + 0.28, dy + 0.34, z - d / 2 - pullOut - 0.005)} fill="#c9c1ad" opacity={0.75} />
            <polygon points={wallQuad(cam, x - 0.05, x + 0.05, dy + 0.19, dy + 0.22, z - d / 2 - pullOut - 0.005)} fill="#2e312d" />
          </g>
        );
      })}
      {/* stacked box/binders on top */}
      <polygon points={qOf(cam, [[x - 0.18, h + 0.14, z - 0.12], [x + 0.16, h + 0.14, z - 0.12], [x + 0.16, h, z - 0.12], [x - 0.18, h, z - 0.12]])} fill="#9e8259" stroke={GT.ol} strokeWidth={0.7} />
    </g>
  );
};

const Workbench: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => {
  const h = 0.86;
  return (
    <g>
      <polygon points={flatQuad(cam, x - 0.9, x + 0.9, z - 0.4, z + 0.4, 0.004)} fill="#27211b" opacity={0.34} />
      {[[-0.82, -0.34], [0.82, -0.34], [-0.82, 0.34], [0.82, 0.34]].map(([lx, lz], i) => {
        const b = project(cam, x + lx, 0, z + lz), t = project(cam, x + lx, h, z + lz);
        return <rect key={i} x={b.x - 0.038 * b.s} y={t.y} width={0.076 * b.s} height={Math.max(1, b.y - t.y)} fill="#3a2c1f" stroke={GT.ol} strokeWidth={0.6} />;
      })}
      <polygon points={qOf(cam, [[x - 0.92, h, z - 0.42], [x + 0.92, h, z - 0.42], [x + 0.92, h, z + 0.42], [x - 0.92, h, z + 0.42]])} fill={GT.wood} stroke={GT.ol} strokeWidth={1} />
      <polygon points={qOf(cam, [[x - 0.92, h, z - 0.42], [x + 0.92, h, z - 0.42], [x + 0.92, h - 0.06, z - 0.42], [x - 0.92, h - 0.06, z - 0.42]])} fill={GT.woodDark} />
      {/* red metal tool chest + bench vice */}
      <polygon points={qOf(cam, [[x + 0.18, h + 0.24, z - 0.18], [x + 0.68, h + 0.24, z - 0.18], [x + 0.68, h, z - 0.18], [x + 0.18, h, z - 0.18]])} fill="#7d352a" stroke={GT.ol} strokeWidth={0.8} />
      <polygon points={qOf(cam, [[x - 0.66, h + 0.16, z - 0.26], [x - 0.42, h + 0.16, z - 0.26], [x - 0.42, h, z - 0.26], [x - 0.66, h, z - 0.26]])} fill="#464b50" stroke={GT.ol} strokeWidth={0.8} />
    </g>
  );
};

const ShelfUnit: React.FC<{ cam: Cam; x: number; z: number; wreck?: number }> = ({ cam, x, z, wreck = 0 }) => {
  const zz = z + 0.28;
  return (
    <g>
      {[0.55, 1.12, 1.68].map((hy, r) => {
        const drop = r === 2 ? wreck * 0.28 : r === 1 ? wreck * 0.08 : 0;
        return (
          <g key={r}>
            <polygon points={qOf(cam, [[x + 0.02, hy + 0.05, zz - 0.34], [x + 0.38, hy + 0.05 - drop, zz - 0.34], [x + 0.38, hy + 0.05 - drop, zz + 0.34], [x + 0.02, hy + 0.05, zz + 0.34]])} fill={GT.wood} stroke={GT.ol} strokeWidth={0.7} />
            {[-0.22, 0.04].map((o, i) => (
              <polygon key={i} points={sideQuad(cam, x + 0.22, zz + o, zz + o + 0.18, hy + 0.05 - drop, hy + 0.25 - drop)} fill={i === 1 ? "#6b7b5c" : GT.rust} opacity={1 - wreck * 0.35} />
            ))}
          </g>
        );
      })}
      <polygon points={sideQuad(cam, x + 0.36, zz - 0.34, zz - 0.29, 0, 1.88)} fill="#36291c" />
      <polygon points={sideQuad(cam, x + 0.36, zz + 0.29, zz + 0.34, 0, 1.88)} fill="#36291c" />
    </g>
  );
};

const TyreStack: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <g>
    <polygon points={flatDisc(cam, x, z, 0.46, 0.004, 18, 0.16, 3)} fill="#221d17" opacity={0.38} />
    {[0, 1, 2].map((i) => {
      const y = i * 0.21, w = 0.4 - i * 0.012;
      const p = project(cam, x, y + 0.21, z);
      return (
        <g key={i}>
          <rect x={p.x - w * p.s} y={p.y} width={2 * w * p.s} height={0.21 * p.s} fill="#25221e" />
          <ellipse cx={p.x} cy={p.y + 0.21 * p.s} rx={w * p.s} ry={0.085 * p.s} fill="#23201c" stroke="#141210" strokeWidth={0.8} />
          <ellipse cx={p.x} cy={p.y} rx={w * p.s} ry={0.085 * p.s} fill="#36322b" stroke="#141210" strokeWidth={0.8} />
          <ellipse cx={p.x} cy={p.y} rx={w * 0.52 * p.s} ry={0.045 * p.s} fill="#15130f" />
        </g>
      );
    })}
  </g>
);

const CrateStack: React.FC<{ cam: Cam; x: number; z: number; seed?: number; small?: boolean; wreck?: number }> = ({ cam, x, z, seed = 1, small, wreck = 0 }) => {
  const s = small ? 0.72 : 1;
  const boxes: [number, number, number][] = [
    [0, 0, 0],
    [0.58, 0, 0.06],
    [0.2 + wreck * 0.42, (1 - wreck) * 0.44, -0.04 - wreck * 0.32],
  ];
  return (
    <g>
      <polygon points={flatDisc(cam, x + 0.3, z, 0.7 * s, 0.004, 16, 0.2, seed)} fill="#241f19" opacity={0.34} />
      {boxes.map(([ox, oy, oz], i) => {
        const bx = x + ox * s, by = Math.max(0, oy * s), bz = z + oz;
        const w = 0.5 * s, h = 0.43 * s, d = 0.42 * s;
        return (
          <g key={i}>
            <polygon points={qOf(cam, [[bx, by + h, bz - d / 2], [bx + w, by + h, bz - d / 2], [bx + w, by, bz - d / 2], [bx, by, bz - d / 2]])} fill={GT.card} stroke={GT.ol} strokeWidth={0.8} />
            <polygon points={qOf(cam, [[bx + w, by + h, bz - d / 2], [bx + w, by + h, bz + d / 2], [bx + w, by, bz + d / 2], [bx + w, by, bz - d / 2]])} fill="#856b43" stroke={GT.ol} strokeWidth={0.8} />
            <polygon points={qOf(cam, [[bx, by + h, bz - d / 2], [bx + w, by + h, bz - d / 2], [bx + w, by + h, bz + d / 2], [bx, by + h, bz + d / 2]])} fill="#ba9d72" stroke={GT.ol} strokeWidth={0.8} />
            <polygon points={qOf(cam, [[bx, by + h * 0.55, bz - d / 2 - 0.002], [bx + w, by + h * 0.55, bz - d / 2 - 0.002], [bx + w, by + h * 0.55 - 0.045, bz - d / 2 - 0.002], [bx, by + h * 0.55 - 0.045, bz - d / 2 - 0.002]])} fill="#d6c5a0" opacity={0.6} />
          </g>
        );
      })}
    </g>
  );
};

const Barrel: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => {
  const w = 0.28, h = 0.88;
  const top = project(cam, x + w, h, z);
  return (
    <g>
      <polygon points={flatDisc(cam, x + w, z, 0.36, 0.004, 18, 0.14, 5)} fill="#221d17" opacity={0.38} />
      <polygon points={qOf(cam, [[x, h, z - w], [x + 2 * w, h, z - w], [x + 2 * w, 0, z - w], [x, 0, z - w]])} fill="#505c4c" stroke={GT.ol} strokeWidth={0.9} />
      <polygon points={qOf(cam, [[x + 2 * w, h, z - w], [x + 2 * w, h, z + w], [x + 2 * w, 0, z + w], [x + 2 * w, 0, z - w]])} fill="#3c4638" stroke={GT.ol} strokeWidth={0.8} />
      <ellipse cx={top.x} cy={top.y} rx={w * top.s} ry={0.09 * top.s} fill="#6b7766" stroke={GT.ol} strokeWidth={0.8} />
      {[0.26, 0.62].map((hy, i) => (
        <polygon key={i} points={qOf(cam, [[x, hy + 0.045, z - w - 0.004], [x + 2 * w, hy + 0.045, z - w - 0.004], [x + 2 * w, hy, z - w - 0.004], [x, hy, z - w - 0.004]])} fill="#2d3328" opacity={0.82} />
      ))}
      <polygon points={qOf(cam, [[x, 0.2, z - w - 0.005], [x + 2 * w, 0.2, z - w - 0.005], [x + 2 * w, 0, z - w - 0.005], [x, 0, z - w - 0.005]])} fill={GT.rust} opacity={0.42} />
    </g>
  );
};

/** Salvaged heavy wood desk (top at y = 0.78 m). */
export const Desk: React.FC<{ cam: Cam; x: number; z: number; w?: number; d?: number }> = ({ cam, x, z, w = 1.9, d = 0.9 }) => {
  const h = 0.78, x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2;
  return (
    <g>
      <polygon points={flatQuad(cam, x0 - 0.12, x1 + 0.12, z0 - 0.18, z1 + 0.12, 0.004)} fill="#241e18" opacity={0.48} />
      {/* rear legs */}
      {[[x0 + 0.08, z1 - 0.08], [x1 - 0.08, z1 - 0.08]].map(([lx, lz], i) => {
        const b = project(cam, lx, 0, lz), t = project(cam, lx, h, lz);
        return <rect key={`rl${i}`} x={b.x - 0.042 * b.s} y={t.y} width={0.084 * b.s} height={Math.max(1, b.y - t.y)} fill="#2e2014" stroke={GT.ol} strokeWidth={0.7} />;
      })}
      {/* left drawer pedestal + front legs */}
      <polygon points={wallQuad(cam, x0 + 0.08, x0 + 0.68, 0.28, h - 0.06, z0 + 0.04)} fill="#573d27" stroke={GT.ol} strokeWidth={0.9} />
      <polygon points={wallQuad(cam, x0 + 0.12, x0 + 0.64, 0.52, h - 0.1, z0 + 0.035)} fill="#66482f" stroke={GT.ol} strokeWidth={0.7} />
      <polygon points={wallQuad(cam, x0 + 0.12, x0 + 0.64, 0.31, 0.49, z0 + 0.035)} fill="#66482f" stroke={GT.ol} strokeWidth={0.7} />
      <polygon points={wallQuad(cam, x0 + 0.33, x0 + 0.43, 0.6, 0.625, z0 + 0.03)} fill="#b59457" />
      <polygon points={wallQuad(cam, x0 + 0.33, x0 + 0.43, 0.39, 0.415, z0 + 0.03)} fill="#b59457" />
      {/* front modesty rail */}
      <polygon points={wallQuad(cam, x0 + 0.68, x1 - 0.08, h - 0.2, h - 0.06, z0 + 0.06)} fill="#493320" stroke={GT.ol} strokeWidth={0.7} />
      {[[x0 + 0.08, z0 + 0.06], [x1 - 0.08, z0 + 0.06]].map(([lx, lz], i) => {
        const b = project(cam, lx, 0, lz), t = project(cam, lx, h, lz);
        return <rect key={`fl${i}`} x={b.x - 0.045 * b.s} y={t.y} width={0.09 * b.s} height={Math.max(1, b.y - t.y)} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.8} />;
      })}
      {/* desktop surface + front thickness lip */}
      <polygon points={qOf(cam, [[x0, h, z1], [x1, h, z1], [x1, h, z0], [x0, h, z0]])} fill={GT.wood} stroke={GT.ol} strokeWidth={1.2} />
      <polygon points={qOf(cam, [[x0, h, z0], [x1, h, z0], [x1, h - 0.065, z0], [x0, h - 0.065, z0]])} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.9} />
      {/* warm lamp highlight on the wood + plank seams + ink/burn rings */}
      <polygon points={flatDisc(cam, x - 0.05, z, 0.68, h + 0.001, 20, 0.08, 2)} fill="#ffde9e" opacity={0.14} />
      {[0.22, 0.48, 0.74].map((o, i) => (
        <polygon key={i} points={qOf(cam, [[x0 + 0.06, h + 0.001, z0 + d * o], [x1 - 0.06, h + 0.001, z0 + d * o], [x1 - 0.06, h + 0.001, z0 + d * (o + 0.015)], [x0 + 0.06, h + 0.001, z0 + d * (o + 0.015)]])} fill="#4a3420" opacity={0.35} />
      ))}
      <polygon points={flatDisc(cam, x - 0.38, z + 0.08, 0.08, h + 0.002, 14, 0.12, 4)} fill="#362618" opacity={0.42} />
      <polygon points={flatDisc(cam, x + 0.34, z - 0.18, 0.055, h + 0.002, 14, 0.18, 6)} fill="#3d2b1b" opacity={0.34} />
    </g>
  );
};

/** Clutter on TOP of the desk (y = 0.78 m!): shop phone, smoking ashtray, bottle & glass, ledger folder, pocket scale. */
export const DeskKit: React.FC<{ cam: Cam; x: number; z: number; f?: number; wreck?: number }> = ({ cam, x, z, f = 0, wreck = 0 }) => {
  const y = 0.782;
  const smokeX = Math.sin(f * 0.045) * 0.014;
  return (
    <g>
      {/* heavy shop phone, distributor's left-rear */}
      <Card cam={cam} x={x - 0.74} y={y} z={z + 0.2} blur={false}>
        <ellipse cx={0} cy={0.008} rx={0.14} ry={0.036} fill="#000" opacity={0.28} />
        <path d="M-0.11,0 L-0.095,-0.065 L0.095,-0.065 L0.11,0 Z" fill="#2f2d2a" stroke={GT.ol} strokeWidth={0.005} />
        <rect x={-0.12} y={-0.092} width={0.24} height={0.032} rx={0.012} fill="#43403b" stroke={GT.ol} strokeWidth={0.005} />
        <rect x={-0.05} y={-0.052} width={0.1} height={0.036} fill="#bdb59e" opacity={0.65} />
        <path d="M-0.11,-0.03 q-0.06,0.025 -0.07,0.055" stroke="#22201d" strokeWidth={0.01} fill="none" />
      </Card>

      {/* green glass bottle + short tumbler, left edge */}
      <Card cam={cam} x={x - 0.88} y={y} z={z - 0.12} blur={false}>
        <g transform={wreck > 0.4 ? "translate(0.04,-0.025) rotate(82)" : undefined}>
          <ellipse cx={0} cy={0.006} rx={0.048} ry={0.016} fill="#000" opacity={0.28} />
          <path d="M-0.034,0 L-0.032,-0.17 C-0.03,-0.2 -0.015,-0.215 -0.014,-0.265 L0.014,-0.265 C0.015,-0.215 0.03,-0.2 0.032,-0.17 L0.034,0 Z" fill="#3f5d43" stroke={GT.ol} strokeWidth={0.005} />
          <rect x={-0.028} y={-0.13} width={0.056} height={0.065} fill="#dfd6be" opacity={0.8} />
          <path d="M-0.02,-0.19 L-0.018,-0.02" stroke="#8fb392" strokeWidth={0.006} opacity={0.45} />
          <rect x={-0.015} y={-0.28} width={0.03} height={0.018} fill="#b89b5e" />
        </g>
        <g transform="translate(0.085,0.02)">
          <path d="M-0.024,0 L-0.028,-0.065 L0.028,-0.065 L0.024,0 Z" fill="#cbd8d6" opacity={0.55} stroke={GT.ol} strokeWidth={0.004} />
          <path d="M-0.022,-0.004 L-0.024,-0.032 L0.024,-0.032 L0.022,-0.004 Z" fill="#b87b35" opacity={0.75} />
        </g>
      </Card>

      {/* dog-eared ledger folder & loose slips */}
      <Card cam={cam} x={x - 0.3} y={y} z={z + 0.28} blur={false}>
        <g transform={`rotate(${-4 + wreck * 14})`}>
          <rect x={-0.16} y={-0.012} width={0.32} height={0.09} fill="#cbb382" stroke="#786643" strokeWidth={0.004} />
          <rect x={-0.14} y={-0.018} width={0.28} height={0.075} fill="#ede6d3" stroke="#9e9684" strokeWidth={0.003} transform="rotate(2)" />
        </g>
      </Card>

      {/* amber glass ashtray + glowing cigarette + animated wisp of smoke */}
      <Card cam={cam} x={x + 0.44} y={y} z={z + 0.22} blur={false}>
        <ellipse cx={0} cy={0.006} rx={0.072} ry={0.022} fill="#000" opacity={0.25} />
        <ellipse cx={0} cy={-0.006} rx={0.066} ry={0.02} fill="#8a6534" stroke={GT.ol} strokeWidth={0.004} />
        <ellipse cx={0} cy={-0.009} rx={0.048} ry={0.013} fill="#2b2621" />
        <path d="M0.008,-0.01 L0.068,-0.018" stroke="#ebe5d5" strokeWidth={0.009} strokeLinecap="round" />
        <circle cx={0.006} cy={-0.01} r={0.005} fill="#e06336" opacity={0.85} />
        {wreck < 0.2 && (
          <path
            d={`M0.006,-0.016 C${-0.01 + smokeX},-0.08 ${0.022 - smokeX},-0.15 ${smokeX * 1.4},-0.24`}
            stroke="#dfd8c8"
            strokeWidth={0.007}
            fill="none"
            opacity={0.24}
            strokeLinecap="round"
          />
        )}
      </Card>

      {/* small digital/brass pocket scale on far right */}
      <Card cam={cam} x={x + 0.82} y={y} z={z - 0.14} blur={false}>
        <g transform={`rotate(${6 - wreck * 22})`}>
          <rect x={-0.075} y={-0.016} width={0.15} height={0.02} rx={0.004} fill="#3c4044" stroke={GT.ol} strokeWidth={0.004} />
          <rect x={-0.058} y={-0.02} width={0.085} height={0.008} fill="#9aa4ac" />
          <rect x={0.035} y={-0.018} width={0.028} height={0.006} fill="#7ba37e" opacity={0.75} />
        </g>
      </Card>
    </g>
  );
};

export const Bench: React.FC<{ cam: Cam; x: number; z: number; w?: number; d?: number; h?: number }> = ({ cam, x, z, w = 1.6, d = 0.8 }) => (
  <Desk cam={cam} x={x} z={z} w={w} d={d} />
);

/** Heavy dark-leather & wood shop boss chair. */
export const Chair: React.FC<{ cam: Cam; x: number; z: number; s?: number }> = ({ cam, x, z }) => (
  <g>
    <polygon points={flatDisc(cam, x, z, 0.34, 0.004, 14, 0.12, 6)} fill="#1f1a14" opacity={0.4} />
    {[[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]].map(([lx, lz], i) => {
      const b = project(cam, x + lx, 0, z + lz), t = project(cam, x + lx, 0.46, z + lz);
      return <rect key={i} x={t.x - 0.024 * b.s} y={t.y} width={0.048 * b.s} height={Math.max(1, b.y - t.y)} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.6} />;
    })}
    {/* seat */}
    <polygon points={qOf(cam, [[x - 0.26, 0.46, z + 0.22], [x + 0.26, 0.46, z + 0.22], [x + 0.26, 0.46, z - 0.22], [x - 0.26, 0.46, z - 0.22]])} fill="#362c25" stroke={GT.ol} strokeWidth={1} />
    {/* tall padded backrest */}
    <polygon points={qOf(cam, [[x - 0.27, 1.04, z + 0.22], [x + 0.27, 1.04, z + 0.22], [x + 0.25, 0.46, z + 0.2], [x - 0.25, 0.46, z + 0.2]])} fill="#2e251f" stroke={GT.ol} strokeWidth={1.1} />
    <polygon points={qOf(cam, [[x - 0.22, 0.99, z + 0.215], [x + 0.22, 0.99, z + 0.215], [x + 0.21, 0.52, z + 0.195], [x - 0.21, 0.52, z + 0.195]])} fill="#42352c" opacity={0.85} />
    {/* wooden armrests */}
    {[-0.26, 0.26].map((ax, i) => (
      <g key={`ar${i}`}>
        <polygon points={qOf(cam, [[x + ax - 0.025, 0.68, z - 0.16], [x + ax + 0.025, 0.68, z - 0.16], [x + ax + 0.025, 0.68, z + 0.2], [x + ax - 0.025, 0.68, z + 0.2]])} fill={GT.wood} stroke={GT.ol} strokeWidth={0.7} />
        <polygon points={qOf(cam, [[x + ax - 0.02, 0.68, z - 0.14], [x + ax + 0.02, 0.68, z - 0.14], [x + ax + 0.02, 0.46, z - 0.14], [x + ax - 0.02, 0.46, z - 0.14]])} fill={GT.woodDark} />
      </g>
    ))}
  </g>
);

/** Industrial 6-pane barred shop window in the back wall. `burst` 0..1 = intact → blown out. */
export const GarageWindow: React.FC<{ cam: Cam; x: number; w?: number; burst?: number }> = ({ cam, x, w = 1.9, burst = 0 }) => {
  const y0 = 1.02, y1 = 2.28, z = GX.zBack - 0.01;
  const intact = clamp(1 - burst * 1.15);
  const broken = clamp(burst * 1.25);
  return (
    <g>
      {/* outer steel casing + stone sill */}
      <polygon points={wallQuad(cam, x - w / 2 - 0.07, x + w / 2 + 0.07, y0 - 0.07, y1 + 0.07, z)} fill="#3f382e" stroke={GT.ol} strokeWidth={1.1} />
      <polygon points={wallQuad(cam, x - w / 2 - 0.1, x + w / 2 + 0.1, y0 - 0.11, y0 - 0.05, z - 0.02)} fill="#574e41" stroke={GT.ol} strokeWidth={0.8} />
      {/* exterior Albuquerque sky/haze + distant industrial roofline visible outside */}
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, y0, y1, z - 0.002)} fill={burst > 0.3 ? "#bfd4e4" : "#8ba4b5"} />
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, y0, y0 + 0.42, z - 0.004)} fill="#6b6359" opacity={0.75} />
      {/* intact dusty wired glass + diagonal grime sheen */}
      {intact > 0.01 && (
        <g opacity={intact}>
          <polygon points={wallQuad(cam, x - w / 2 + 0.02, x + w / 2 - 0.02, y0 + 0.02, y1 - 0.02, z - 0.008)} fill="#c8dce6" opacity={0.48} />
          <polygon points={qOf(cam, [[x - w * 0.42, y1 - 0.04, z - 0.01], [x - w * 0.12, y1 - 0.04, z - 0.01], [x - w * 0.34, y0 + 0.06, z - 0.01], [x - w * 0.48, y0 + 0.06, z - 0.01]])} fill="#edf6fa" opacity={0.34} />
          <polygon points={wallQuad(cam, x - w / 2 + 0.02, x + w / 2 - 0.02, y0 + 0.02, y0 + 0.24, z - 0.01)} fill="#6e6556" opacity={0.28} />
        </g>
      )}
      {/* jagged broken glass teeth still clinging to frame corners after blast */}
      {broken > 0.05 && (
        <g opacity={broken}>
          {[
            [[x - w / 2 + 0.02, y1 - 0.02], [x - w / 2 + 0.28, y1 - 0.02], [x - w / 2 + 0.11, y1 - 0.24]],
            [[x + w / 2 - 0.02, y1 - 0.02], [x + w / 2 - 0.32, y1 - 0.02], [x + w / 2 - 0.08, y1 - 0.28]],
            [[x - w / 2 + 0.02, y0 + 0.02], [x - w / 2 + 0.24, y0 + 0.02], [x - w / 2 + 0.09, y0 + 0.22]],
            [[x + w / 2 - 0.02, y0 + 0.02], [x + w / 2 - 0.22, y0 + 0.02], [x + w / 2 - 0.06, y0 + 0.19]],
            [[x - 0.04, y0 + 0.02], [x + 0.14, y0 + 0.02], [x + 0.03, y0 + 0.21]],
          ].map((tri, i) => (
            <polygon key={`jg${i}`} points={qOf(cam, tri.map(([tx, ty]) => [tx, ty, z - 0.012] as [number, number, number]))} fill="#d6e9f0" stroke="#7d949e" strokeWidth={0.7} opacity={0.78} />
          ))}
        </g>
      )}
      {/* steel muntin bars (3 cols × 2 rows); centre bar bends on blast */}
      {[-w / 6, w / 6].map((mx, i) => {
        const bend = (i === 0 ? -0.09 : 0.11) * broken;
        return (
          <polygon
            key={`mv${i}`}
            points={qOf(cam, [
              [x + mx - 0.02, y1, z - 0.015],
              [x + mx + 0.02, y1, z - 0.015],
              [x + mx + 0.02 + bend, (y0 + y1) / 2, z - 0.015 - Math.abs(bend)],
              [x + mx - 0.02, y0, z - 0.015],
            ])}
            fill="#4e473c"
          />
        );
      })}
      <polygon points={wallQuad(cam, x - w / 2, x + w / 2, (y0 + y1) / 2 - 0.02, (y0 + y1) / 2 + 0.022, z - 0.015)} fill="#4e473c" />
      {/* active flying glass shards during the blast wave */}
      {burst > 0.04 && burst < 0.98 && Array.from({ length: 14 }).map((_, i) => {
        const t = Math.min(1, burst * 1.35);
        const px = x - w / 2 + rand(i, 21) * w + (rand(i, 22) - 0.5) * 2.4 * t;
        const py = y0 + rand(i, 23) * (y1 - y0) + 0.35 * t - 1.15 * t * t;
        const p = project(cam, px, Math.max(0.04, py), z - 1.8 * t * (0.35 + rand(i, 25)));
        const len = 0.085 * (0.55 + rand(i, 26)) * p.s;
        return (
          <path
            key={`shd${i}`}
            d={`M0,0 L${len},${-len * 0.45} L${len * 0.68},${len * 0.55} Z`}
            transform={`translate(${p.x},${p.y}) rotate(${rand(i, 27) * 360 + t * 240})`}
            fill="#daf0f7"
            stroke="#87a1ab"
            strokeWidth={0.8}
            opacity={0.92 * (1 - burst * 0.7)}
          />
        );
      })}
    </g>
  );
};
