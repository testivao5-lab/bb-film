// Batch A · school kit: original Albuquerque high-school exterior + chemistry classroom.
// Facades are flat planes at constant z (project their corners); classroom is a room box.
import React from "react";
import { Cam, project, planePts, W, H } from "../lib/camera";
import { rand, noise1, blink, prog, easeInOut, clamp } from "../lib/anim";
const SCRUB = "#6f7d4f";
const SCRUB_DK = "#57633e";
const SHADOW = "#3a2a10";

export const SCHOOL = {
  stucco: "#d8c9a8",
  stuccoShade: "#b8a888",
  stuccoDark: "#9c8d70",
  cap: "#c4b492",
  glass: "#7fa0b8",
  glassDark: "#54748c",
  frame: "#8a7a5e",
  door: "#5a4a3a",
  concrete: "#c2bcb0",
  concreteDark: "#9c968a",
  lawn: "#a8a06a",
  wallIn: "#cfc3a8",
  wallInShade: "#b0a488",
  board: "#2e4038",
  wood: "#9a7b52",
  metal: "#6a6a6e",
  ceil: "#d8d2c4",
  tile: "#b0aa9c",
};

/* helper: axis-aligned rect on a plane z = zz (4 corners projected) */
const zRect = (cam: Cam, x0: number, y0: number, x1: number, y1: number, zz: number) =>
  [project(cam, x0, y0, zz), project(cam, x1, y0, zz), project(cam, x1, y1, zz), project(cam, x0, y1, zz)]
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/* ═══════════════ EXTERIOR ═══════════════ */
export const SchoolExterior: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const Z = 28; // facade depth
  const wx = (a: number, b: number, y0: number, y1: number, key: string, glassTone = 0) => (
    <g key={key}>
      <polygon points={zRect(cam, a, y0, b, y1, Z)} fill={SCHOOL.frame} />
      <polygon points={zRect(cam, a + 0.06, y0 + 0.05, b - 0.06, y1 - 0.05, Z)}
        fill={glassTone ? SCHOOL.glassDark : SCHOOL.glass} />
      {/* sky reflection band + dark interior slivers */}
      <polygon points={zRect(cam, a + 0.06, y1 - 0.4, b - 0.06, y1 - 0.05, Z)} fill="#a9c9dd" opacity={0.75} />
      {Array.from({ length: Math.max(1, Math.round((b - a) / 1.6)) }).map((_, i) => (
        <polygon key={i}
          points={zRect(cam, a + 0.1 + i * 1.6, y0 + 0.05, a + 0.28 + i * 1.6, y1 - 0.05, Z)}
          fill="#3d4a55" opacity={0.5} />
      ))}
    </g>
  );
  return (
    <g>
      {/* ── ground: asphalt lot (foreground), sidewalk, dry lawn, walkway ── */}
      <polygon points={planePts(cam, [[-60, cam.z + 0.8], [60, cam.z + 0.8], [60, 19], [-60, 19]], 0)} fill="#57514a" />
      <polygon points={planePts(cam, [[-60, 19], [60, 19], [60, 28], [-60, 28]], 0.01)} fill={SCHOOL.concrete} />
      <polygon points={planePts(cam, [[-60, 21.4], [60, 21.4], [60, 27.8], [-60, 27.8]], 0.012)} fill={SCHOOL.lawn} />
      <polygon points={planePts(cam, [[4.4, 19], [9.6, 19], [9.6, 28], [4.4, 28]], 0.016)} fill={SCHOOL.concrete} />
      {/* curb */}
      <polygon points={planePts(cam, [[-60, 18.85], [60, 18.85], [60, 19.15], [-60, 19.15]], 0.06)} fill={SCHOOL.concreteDark} />
      {/* parking lines + oil stains on the lot */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = -17 + i * 3.1;
        return <polygon key={i} points={planePts(cam, [[x, 11], [x + 0.14, 11], [x + 0.14, 17.5], [x, 17.5]], 0.014)}
          fill="#cfc6ae" opacity={0.5} />;
      })}
      {[[-8, 8.5, 1.6], [6, 13, 2.1], [-14, 15.5, 1.2]].map(([x, z, r], i) => (
        <ellipse key={i} {...{ cx: project(cam, x, 0.015, z).x, cy: project(cam, x, 0.015, z).y }}
          rx={project(cam, x, 0.015, z).s * r} ry={project(cam, x, 0.015, z).s * r * 0.3}
          fill="#4a453f" opacity={0.22} />
      ))}
      {/* cloud shadows drifting over the lot */}
      {[[-10, 9, 14], [14, 14, 11]].map(([x, z, r], i) => {
        const p = project(cam, x + Math.sin(f * 0.006 + i * 2) * 3, 0.02, z);
        return <ellipse key={i} cx={p.x} cy={p.y} rx={p.s * r} ry={p.s * r * 0.28}
          fill="#5a5148" opacity={0.1} />;
      })}

      {/* ── main block facade ── */}
      <polygon points={zRect(cam, -26, 0, 18, 7.2, Z)} fill={SCHOOL.stucco} />
      {/* base shade + parapet cap */}
      <polygon points={zRect(cam, -26, 0, 18, 1.1, Z)} fill={SCHOOL.stuccoShade} />
      <polygon points={zRect(cam, -26, 7.2, 18, 7.75, Z)} fill={SCHOOL.cap} />
      <polygon points={zRect(cam, -26, 7.75, 18, 7.9, Z)} fill={SCHOOL.stuccoDark} />
      {/* vertical joints */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = -24 + i * 4;
        return <polygon key={i} points={zRect(cam, x, 1.1, x + 0.07, 7.2, Z)} fill={SCHOOL.stuccoDark} opacity={0.45} />;
      })}
      {/* window ribbons: upper + ground (skip the entrance bay) */}
      {wx(-24, 3.6, 4.3, 6.5, "u1")}
      {wx(10.4, 16.5, 4.3, 6.5, "u2")}
      {wx(-24, 3.6, 1.7, 3.4, "g1", 1)}
      {wx(10.4, 16.5, 1.7, 3.4, "g2", 1)}
      {/* sunshade fins above the ribbons */}
      {[[-24, 3.6], [10.4, 16.5]].map(([a, b], i) => (
        <g key={`fin${i}`}>
          <polygon points={zRect(cam, a, 6.5, b, 6.72, Z)} fill={SCHOOL.cap} />
          <polygon points={zRect(cam, a, 6.5, b, 6.6, Z - 0.35)} fill={SCHOOL.stuccoShade} />
        </g>
      ))}
      {/* wear: stain streaks + a patched panel */}
      <polygon points={zRect(cam, -6.5, 1.1, -5.2, 4.3, Z)} fill="#a89a78" opacity={0.55} />
      <polygon points={zRect(cam, -6.3, 1.1, -5.6, 3.4, Z)} fill="#8f815f" opacity={0.4} />
      <polygon points={zRect(cam, 12.5, 4.5, 15.4, 6.4, Z)} fill={SCHOOL.stuccoShade} opacity={0.7} />

      {/* ── entrance bay: recess, doors, steps, canopy, columns ── */}
      <polygon points={zRect(cam, 4.6, 0.2, 9.4, 3.3, Z)} fill="#7a6c54" />
      <polygon points={zRect(cam, 5.4, 0.2, 8.6, 2.8, Z)} fill={SCHOOL.door} />
      <polygon points={zRect(cam, 5.55, 1.5, 6.85, 2.65, Z)} fill={SCHOOL.glass} opacity={0.9} />
      <polygon points={zRect(cam, 7.15, 1.5, 8.45, 2.65, Z)} fill={SCHOOL.glass} opacity={0.9} />
      <polygon points={zRect(cam, 6.94, 0.2, 7.06, 2.8, Z)} fill="#3d342a" />
      {/* steps up to the doors */}
      <polygon points={planePts(cam, [[5.2, 26.5], [8.8, 26.5], [8.8, 28], [5.2, 28]], 0.1)} fill={SCHOOL.concrete} />
      <polygon points={planePts(cam, [[5.2, 27.1], [8.8, 27.1], [8.8, 28], [5.2, 28]], 0.2)} fill={SCHOOL.concrete} />
      <polygon points={planePts(cam, [[5.2, 27.1], [8.8, 27.1], [8.8, 27.22], [5.2, 27.22]], 0.21)} fill={SCHOOL.concreteDark} />
      {/* canopy slab (top + front edge) + columns */}
      <polygon points={planePts(cam, [[4.6, 25.3], [9.4, 25.3], [9.4, Z], [4.6, Z]], 3.3)} fill={SCHOOL.cap} />
      <polygon points={zRect(cam, 4.6, 2.95, 9.4, 3.3, 25.3)} fill={SCHOOL.stuccoShade} />
      <polygon points={zRect(cam, 4.6, 2.83, 9.4, 2.95, 25.3)} fill="#6a5c48" />
      {[[5.0, 25.55], [9.0, 25.55]].map(([cx, cz], i) => {
        const a = project(cam, cx - 0.13, 0, cz), b = project(cam, cx + 0.13, 0, cz);
        const t = project(cam, cx - 0.13, 2.95, cz), u = project(cam, cx + 0.13, 2.95, cz);
        return (
          <g key={i}>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${u.x},${u.y} ${t.x},${t.y}`} fill={SCHOOL.concrete} stroke={SCHOOL.concreteDark} strokeWidth={1.5} />
          </g>
        );
      })}
      {/* canopy shadow on the facade */}
      <polygon points={zRect(cam, 4.6, 2.3, 9.4, 2.83, Z)} fill="#6a5c48" opacity={0.55} />

      {/* ── right wing, set back for depth ── */}
      <polygon points={zRect(cam, 18, 0, 36, 5.4, 32)} fill={SCHOOL.stuccoShade} />
      <polygon points={zRect(cam, 18, 5.4, 36, 5.8, 32)} fill={SCHOOL.cap} />
      {wx2(cam, 20, 34, 1.6, 3.1, 32)}
      {wx2(cam, 20, 34, 3.7, 4.9, 32)}

      {/* ── monument sign with illegible marks ── */}
      <g>
        <polygon points={planePts(cam, [[-7.6, 21.2], [-5.4, 21.2], [-5.4, 21.6], [-7.6, 21.6]], 1.15)} fill={SCHOOL.cap} />
        <polygon points={zRect(cam, -7.6, 0, -5.4, 1.15, 21.2)} fill={SCHOOL.stucco} />
        <polygon points={zRect(cam, -7.35, 0.35, -5.65, 0.95, 21.18)} fill="#4c443a" />
        {/* scribble: strokes, no readable letters */}
        {[0.8, 0.62, 0.7].map((w, i) => (
          <path key={i}
            d={`M${project(cam, -7.2, 0.82 - i * 0.2, 21.16).x},${project(cam, -7.2, 0.82 - i * 0.2, 21.16).y} l${w * project(cam, 0, 0, 21.16).s * 0.55},${-2 + rand(i, 9) * 4}`}
            stroke="#cfc6ae" strokeWidth={Math.max(1.5, 0.025 * project(cam, 0, 0, 21.16).s)} strokeLinecap="round" opacity={0.85} />
        ))}
      </g>

      {/* ── flagpole + sparse trees ── */}
      {(() => {
        const b = project(cam, 11.8, 0, 23), t = project(cam, 11.8, 8.4, 23);
        return (
          <g>
            <ellipse cx={b.x} cy={b.y} rx={b.s * 0.3} ry={b.s * 0.08} fill="#8a8474" />
            <line x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#b8b2a4" strokeWidth={Math.max(2, 0.05 * t.s)} />
            <circle cx={t.x} cy={t.y} r={Math.max(2, 0.09 * t.s)} fill="#d8cf9e" />
          </g>
        );
      })()}
      {[[-14.5, 23.6], [16.5, 24.2]].map(([tx, tz], i) => {
        const b = project(cam, tx, 0, tz), t = project(cam, tx, 2.6, tz);
        const r = b.s * 1.35;
        return (
          <g key={i}>
            <line x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#6b543c" strokeWidth={Math.max(2, 0.16 * b.s)} />
            {[[0, -2.6, 1], [-1.3, -1.9, 0.7], [1.3, -2.1, 0.75], [0.4, -3.3, 0.6]].map(([bx, by, br], j) => (
              <ellipse key={j} cx={t.x + bx * r * 0.55} cy={t.y + by * r * 0.3} rx={r * br} ry={r * br * 0.62}
                fill={j % 2 ? SCRUB : SCRUB_DK} />
            ))}
            <ellipse cx={b.x} cy={b.y} rx={r * 0.7} ry={r * 0.14} fill={SHADOW} opacity={0.28} />
          </g>
        );
      })}
    </g>
  );
};

/* window ribbon on an arbitrary depth plane (for the set-back wing) */
const wx2 = (cam: Cam, a: number, b: number, y0: number, y1: number, zz: number) => (
  <g>
    <polygon points={zRect(cam, a, y0, b, y1, zz)} fill={SCHOOL.frame} />
    <polygon points={zRect(cam, a + 0.06, y0 + 0.05, b - 0.06, y1 - 0.05, zz)} fill={SCHOOL.glass} />
    <polygon points={zRect(cam, a + 0.06, y1 - 0.3, b - 0.06, y1 - 0.05, zz)} fill="#a9c9dd" opacity={0.7} />
    {Array.from({ length: Math.max(1, Math.round((b - a) / 1.8)) }).map((_, i) => (
      <polygon key={i} points={zRect(cam, a + 0.1 + i * 1.8, y0 + 0.05, a + 0.26 + i * 1.8, y1 - 0.05, zz)}
        fill="#3d4a55" opacity={0.5} />
    ))}
  </g>
);

/* ═══════════════ CLASSROOM ═══════════════
   Room box: x ∈ [-3.5, 3.5], z ∈ [0.5, 8], ceiling 2.9.
   flicker: 0..1 intensity of the failing tube.                                */
export const SchoolClassroom: React.FC<{ cam: Cam; f: number; flicker: number }> = ({ cam, f, flicker }) => {
  const zB = 8, ceil = 2.9;
  const zr = (x0: number, y0: number, x1: number, y1: number, zz: number) => zRect(cam, x0, y0, x1, y1, zz);
  const xr = (zz0: number, y0: number, zz1: number, y1: number, xx: number) =>
    [project(cam, xx, y0, zz0), project(cam, xx, y0, zz1), project(cam, xx, y1, zz1), project(cam, xx, y1, zz0)]
      .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  return (
    <g>
      {/* floor + tile grid */}
      <polygon points={planePts(cam, [[-3.5, 0.5], [3.5, 0.5], [3.5, zB], [-3.5, zB]], 0)} fill={SCHOOL.tile} />
      {Array.from({ length: 8 }).map((_, i) => (
        <polygon key={`gx${i}`} points={planePts(cam, [[-3.5 + i, 0.5], [-3.5 + i + 0.03, 0.5], [-3.5 + i + 0.03, zB], [-3.5 + i, zB]], 0.005)}
          fill="#9a948a" opacity={0.55} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <polygon key={`gz${i}`} points={planePts(cam, [[-3.5, 0.6 + i], [3.5, 0.6 + i], [3.5, 0.63 + i], [-3.5, 0.63 + i]], 0.005)}
          fill="#9a948a" opacity={0.55} />
      ))}
      {/* ceiling */}
      <polygon points={planePts(cam, [[-3.5, 0.5], [3.5, 0.5], [3.5, zB], [-3.5, zB]], ceil)} fill={SCHOOL.ceil} />
      {/* back wall */}
      <polygon points={zr(-3.5, 0, 3.5, ceil, zB)} fill={SCHOOL.wallIn} />
      <polygon points={zr(-3.5, 0, 3.5, 0.28, zB)} fill={SCHOOL.wallInShade} />
      {/* left wall (windows) */}
      <polygon points={xr(0.5, 0, zB, ceil, -3.5)} fill={SCHOOL.wallInShade} />
      {/* right wall (bulletin board) */}
      <polygon points={xr(0.5, 0, zB, ceil, 3.5)} fill={SCHOOL.wallIn} />
      <polygon points={xr(4.2, 1.2, 6.6, 2.25, 3.48)} fill="#a8845c" />
      <polygon points={xr(4.3, 1.3, 6.5, 2.15, 3.47)} fill="#b89468" />
      {[0, 1, 2, 3].map((i) => {
        const zz = 4.5 + i * 0.55, yy = 1.45 + (i % 2) * 0.42;
        return <polygon key={i} points={xr(zz, yy, zz + 0.4, yy + 0.34, 3.46)}
          fill={i % 2 ? "#e8e2d2" : "#dce4ea"} opacity={0.95} transform="" />;
      })}
      {/* left-wall windows + blinds */}
      {[[4.9, 6.1], [6.35, 7.55]].map(([z0, z1], i) => (
        <g key={i}>
          <polygon points={xr(z0, 1.05, z1, 2.35, -3.48)} fill={SCHOOL.frame} />
          <polygon points={xr(z0 + 0.05, 1.1, z1 - 0.05, 2.3, -3.47)} fill="#cfe4f0" />
          <polygon points={xr(z0 + 0.05, 1.1, z1 - 0.05, 1.55, -3.46)} fill="#e8f2f6" />
          {Array.from({ length: 7 }).map((_, j) => (
            <polygon key={j}
              points={xr(z0 + 0.05, 1.15 + j * 0.17, z1 - 0.05, 1.2 + j * 0.17, -3.45)}
              fill="#d8d2c0" opacity={0.85} />
          ))}
        </g>
      ))}
      {/* light shafts through the windows onto the floor */}
      {[[4.9, 6.1], [6.35, 7.55]].map(([z0, z1], i) => (
        <polygon key={i}
          points={[
            project(cam, -3.45, 1.0, z0), project(cam, -3.45, 2.3, z1),
            project(cam, -0.4, 0.01, Math.min(zB - 0.3, z1 + 1.6)), project(cam, -0.4, 0.01, z0 + 0.6),
          ].map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          fill="#ffe8b8" opacity={0.16} />
      ))}
      {[[5.4, 5.9], [6.8, 7.3]].map(([z0, z1], i) => (
        <ellipse key={i} {...{ cx: project(cam, -1.7, 0.01, (z0 + z1) / 2).x, cy: project(cam, -1.7, 0.01, (z0 + z1) / 2).y }}
          rx={project(cam, -1.7, 0.01, z0).s * 1.5} ry={project(cam, -1.7, 0.01, z0).s * 0.5}
          fill="#ffe8b8" opacity={0.24} />
      ))}

      {/* ── chalkboard + tray + minimal chalk marks ── */}
      <polygon points={zr(-2.4, 1.0, 1.2, 2.3, zB - 0.02)} fill={SCHOOL.wood} />
      <polygon points={zr(-2.32, 1.06, 1.12, 2.24, zB - 0.03)} fill={SCHOOL.board} />
      {/* tray + chalk sticks */}
      <polygon points={planePts(cam, [[-2.4, zB - 0.14], [1.2, zB - 0.14], [1.2, zB - 0.02], [-2.4, zB - 0.02]], 1.0)} fill={SCHOOL.wood} />
      <polygon points={planePts(cam, [[-2.4, zB - 0.14], [1.2, zB - 0.14], [1.2, zB - 0.12], [-2.4, zB - 0.12]], 1.04)} fill="#e8e4da" />
      {/* illegible chalk strokes: a formula squiggle + an underline + a ring */}
      <path d={`M${project(cam, -2.0, 1.9, zB - 0.04).x},${project(cam, -2.0, 1.9, zB - 0.04).y}
        q${30},${-14} 62,0 q32,14 66,-4`} stroke="#e8e6da" strokeWidth={3.4} fill="none" opacity={0.85} strokeLinecap="round" />
      <path d={`M${project(cam, -1.9, 1.55, zB - 0.04).x},${project(cam, -1.9, 1.55, zB - 0.04).y}
        h140`} stroke="#e8e6da" strokeWidth={3} fill="none" opacity={0.75} strokeLinecap="round" />
      <ellipse {...{ cx: project(cam, -0.6, 1.78, zB - 0.04).x, cy: project(cam, -0.6, 1.78, zB - 0.04).y }}
        rx={26} ry={17} stroke="#e8e6da" strokeWidth={3.2} fill="none" opacity={0.8}
        transform={`rotate(-8 ${project(cam, -0.6, 1.78, zB - 0.04).x} ${project(cam, -0.6, 1.78, zB - 0.04).y})`} />

      {/* ── clock (second hand ticks with f) ── */}
      {(() => {
        const p = project(cam, 2.15, 2.5, zB - 0.03);
        const r = 0.17 * p.s;
        const sec = (f % 30) / 30 * 360;
        return (
          <g>
            <circle cx={p.x} cy={p.y} r={r} fill="#f2efe6" stroke="#2e2a26" strokeWidth={Math.max(2, r * 0.1)} />
            <line x1={p.x} y1={p.y} x2={p.x + Math.cos((-90 + 300) * Math.PI / 180) * r * 0.5}
              y2={p.y + Math.sin((-90 + 300) * Math.PI / 180) * r * 0.5} stroke="#2e2a26" strokeWidth={Math.max(2, r * 0.12)} strokeLinecap="round" />
            <line x1={p.x} y1={p.y} x2={p.x + Math.cos((-90 + 60) * Math.PI / 180) * r * 0.75}
              y2={p.y + Math.sin((-90 + 60) * Math.PI / 180) * r * 0.75} stroke="#2e2a26" strokeWidth={Math.max(2, r * 0.1)} strokeLinecap="round" />
            <line x1={p.x} y1={p.y} x2={p.x + Math.cos((-90 + sec) * Math.PI / 180) * r * 0.85}
              y2={p.y + Math.sin((-90 + sec) * Math.PI / 180) * r * 0.85} stroke="#8a2e2e" strokeWidth={Math.max(1.2, r * 0.06)} />
            <circle cx={p.x} cy={p.y} r={Math.max(1.5, r * 0.09)} fill="#2e2a26" />
          </g>
        );
      })()}

      {/* ── wall chart: coloured squares only, no text ── */}
      {(() => {
        const x0 = 2.75, y0 = 1.15, cols = 4, rows = 6, cw = 0.16, ch = 0.16;
        const cells: React.ReactNode[] = [];
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            const p = project(cam, x0 + c * (cw + 0.03), y0 + (rows - 1 - r) * (ch + 0.03), zB - 0.03);
            const s = p.s * cw;
            cells.push(<rect key={`${r}${c}`} x={p.x} y={p.y} width={s} height={p.s * ch}
              fill={["#c87a5a", "#7a9ec8", "#8ab87a", "#c8b45a", "#a87ac8", "#7ac8c0"][Math.floor(rand(r * 7 + c, 5) * 6)]}
              stroke="#5a544a" strokeWidth={1} opacity={0.92} />);
          }
        return (
          <g>
            <polygon points={zr(x0 - 0.08, y0 - 0.08, x0 + cols * (cw + 0.03), y0 + rows * (ch + 0.03), zB - 0.02)} fill="#e8e2d2" />
            {cells}
          </g>
        );
      })()}

      {/* ── CRT TV on a cart (the room has seen decades) ── */}
      {(() => {
        const p = project(cam, 3.0, 0, 6.9);
        const s = p.s;
        return (
          <g>
            <rect x={-0.34 * s} y={-2.15 * s} width={0.68 * s} height={0.5 * s} rx={0.04 * s}
              fill="#3a3530" stroke="#1b1815" strokeWidth={0.02 * s} transform={`translate(${p.x},${p.y})`} />
            <rect x={-0.26 * s} y={-2.06 * s} width={0.44 * s} height={0.3 * s} rx={0.05 * s}
              fill="#54616a" transform={`translate(${p.x},${p.y})`} />
            <rect x={-0.3 * s} y={-1.65 * s} width={0.6 * s} height={0.05 * s} fill="#6a655c" transform={`translate(${p.x},${p.y})`} />
            {/* cart */}
            <rect x={-0.32 * s} y={-1.6 * s} width={0.64 * s} height={0.06 * s} fill={SCHOOL.metal} transform={`translate(${p.x},${p.y})`} />
            {[[-0.28, -1.54], [0.28, -1.54]].map(([lx, ly], i) => (
              <rect key={i} x={lx * s} y={ly * s} width={0.045 * s} height={1.5 * s} fill={SCHOOL.metal} transform={`translate(${p.x},${p.y})`} />
            ))}
            <rect x={-0.3 * s} y={-0.6 * s} width={0.6 * s} height={0.05 * s} fill={SCHOOL.metal} transform={`translate(${p.x},${p.y})`} />
          </g>
        );
      })()}

      {/* ── wear: ceiling water stain (a flat damp patch, not a blob) + wall peel ── */}
      {(() => {
        const p = project(cam, 0.5, ceil - 0.01, 6.1);
        const s = p.s;
        return (
          <g opacity={0.5}>
            <ellipse cx={p.x} cy={p.y} rx={s * 0.5} ry={s * 0.22} fill="#c4b79c" />
            <ellipse cx={p.x + s * 0.2} cy={p.y - s * 0.06} rx={s * 0.26} ry={s * 0.13} fill="#b5a88c" />
          </g>
        );
      })()}
      {(() => {
        const p = project(cam, -1.6, ceil - 0.01, 4.6);
        const s = p.s;
        return (
          <g transform={`rotate(3 ${p.x} ${p.y})`}>
            <rect x={p.x - s * 0.45} y={p.y - s * 0.45} width={s * 0.9} height={s * 0.9}
              fill="#cfc8b8" stroke="#a8a094" strokeWidth={2} />
            <rect x={p.x - s * 0.45} y={p.y + s * 0.3} width={s * 0.9} height={s * 0.12} fill="#8a8474" opacity={0.6} />
          </g>
        );
      })()}
      <polygon points={zr(-3.4, 2.45, -2.9, 2.8, zB - 0.02)} fill="#b8a888" />
      <polygon points={zr(-3.35, 2.5, -3.05, 2.75, zB - 0.03)} fill={SCHOOL.wallIn} />

      {/* ── fluorescent fixtures: one is failing (flicker) ── */}
      {[[-1.5, 3.0, 6.6], [1.5, 3.0, 6.6]].map(([fx, z0, z1], i) => {
        const isBad = i === 1;
        const on = isBad ? 1 - flicker * 0.9 : 1;
        // proper quad: corners at (±w, z0) then (±w, z1) — no bow-tie
        const a0 = project(cam, fx - 0.14, ceil - 0.04, z0), a1 = project(cam, fx + 0.14, ceil - 0.04, z0);
        const a2 = project(cam, fx + 0.14, ceil - 0.04, z1), a3 = project(cam, fx - 0.14, ceil - 0.04, z1);
        const g0 = project(cam, fx - 0.1, ceil - 0.06, z0), g1 = project(cam, fx + 0.1, ceil - 0.06, z0);
        const g2 = project(cam, fx + 0.1, ceil - 0.06, z1), g3 = project(cam, fx - 0.1, ceil - 0.06, z1);
        return (
          <g key={i}>
            <polygon points={`${a0.x},${a0.y} ${a1.x},${a1.y} ${a2.x},${a2.y} ${a3.x},${a3.y}`}
              fill="#b8b4ac" stroke="#8a867e" strokeWidth={2} />
            <polygon points={`${g0.x},${g0.y} ${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y}`}
              fill="#f4f8ea" opacity={0.95 * on} />
            {isBad && flicker > 0.02 && (
              <ellipse {...{ cx: project(cam, fx, ceil - 0.1, (z0 + z1) / 2).x, cy: project(cam, fx, ceil - 0.1, (z0 + z1) / 2).y }}
                rx={project(cam, fx, 0, (z0 + z1) / 2).s * 1.6} ry={project(cam, fx, 0, (z0 + z1) / 2).s * 0.7}
                fill="#f4f8ea" opacity={0.3 * flicker} />
            )}
          </g>
        );
      })}
    </g>
  );
};

/* ── desk: worn school desk (top + panel + legs) ─────────────────────────── */
export const Desk: React.FC<{ cam: Cam; x: number; z: number; rot?: number }> = ({ cam, x, z, rot = 0 }) => {
  const p = project(cam, x, 0, z);
  const s = p.s;
  const w = 0.62 * s, d = 0.46 * s, top = 0.74 * s;
  return (
    <g transform={`translate(${p.x},${p.y})`}>
      {/* shadow */}
      <ellipse cx={0} cy={2} rx={w * 0.7} ry={d * 0.3} fill="#4a443c" opacity={0.35} />
      {/* legs */}
      {[[-0.42, -0.3], [0.42, -0.3], [-0.42, 0.3], [0.42, 0.3]].map(([lx, lz], i) => (
        <line key={i} x1={lx * w} y1={-top * 0.75 + lz * d * 0.2} x2={lx * w} y2={0}
          stroke={SCHOOL.metal} strokeWidth={Math.max(1.6, 0.028 * s)} />
      ))}
      {/* modesty panel */}
      <rect x={-w * 0.48} y={-top * 0.72} width={w * 0.96} height={top * 0.34}
        fill={SCHOOL.wood} stroke="#6a5238" strokeWidth={1.5} />
      {/* top */}
      <g transform={`translate(0,${-top}) rotate(${rot})`}>
        <path d={`M${-w / 2},0 L${w / 2},0 L${w / 2 - d * 0.18},${-d * 0.5} L${-w / 2 + d * 0.18},${-d * 0.5} Z`}
          fill="#a8875c" stroke="#6a5238" strokeWidth={1.8} strokeLinejoin="round" />
        <path d={`M${-w / 2},0 L${w / 2},0 L${w / 2 - d * 0.05},${-d * 0.14} L${-w / 2 + d * 0.05},${-d * 0.14} Z`}
          fill="#c09a68" opacity={0.7} />
      </g>
    </g>
  );
};

/* ── chair: billboard school chair at a sitter's anchor (backrest peeks behind) ── */
export const Chair: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => {
  const p = project(cam, x, 0, z);
  const s = p.s;
  return (
    <g transform={`translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`}>
      <ellipse cx={0} cy={0.012 * s} rx={0.34 * s} ry={0.1 * s} fill="#4a4038" opacity={0.32} />
      {[[-0.2, 0.14], [0.2, 0.14], [-0.15, -0.1], [0.15, -0.1]].map(([lx, dx], i) => (
        <line key={i} x1={lx * s} y1={-0.44 * s} x2={(lx + dx * 0.4) * s} y2={0}
          stroke="#6f5940" strokeWidth={Math.max(1.6, 0.035 * s)} strokeLinecap="round" />
      ))}
      <rect x={-0.24 * s} y={-0.53 * s} width={0.48 * s} height={0.09 * s} rx={0.02 * s}
        fill="#9a7a54" stroke="#17130f" strokeWidth={Math.max(1.2, 0.013 * s)} />
      <rect x={-0.25 * s} y={-1.02 * s} width={0.5 * s} height={0.5 * s} rx={0.06 * s}
        fill="#8a6a48" stroke="#17130f" strokeWidth={Math.max(1.2, 0.013 * s)} />
      <rect x={-0.19 * s} y={-0.95 * s} width={0.38 * s} height={0.36 * s} rx={0.04 * s}
        fill="#7a5c3e" />
    </g>
  );
};
