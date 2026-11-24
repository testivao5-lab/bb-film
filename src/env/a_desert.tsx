// Batch A · desert kit additions (scenes 2, 11): the paved highway + roadside power
// lines. Sky / ridge / floor / shimmer / birds come read-only from src/env/d_shared.tsx
// (batch D) so the location stays the same place everywhere.
import React from "react";
import { Cam, project, planePts, H } from "../lib/camera";
import { rand } from "../lib/anim";

/** horizon y in screen px for a level camera */
export const horizonY = (cam: Cam) => H / 2 + (cam.shiftY ?? 0);

export const HW = {
  asphalt: "#6e675c",
  asphaltDark: "#57514a",
  shoulder: "#bf9d70",
  line: "#d8cfa8",
  pole: "#6b543c",
  wire: "#2e2a26",
};

/* ───────── two-lane highway running to the vanishing point (along +z) ───────── */
export const Highway: React.FC<{ cam: Cam; x?: number; halfW?: number }> = ({ cam, x = 0, halfW = 4.2 }) => {
  const road = (x0: number, x1: number, z0: number, z1: number, h = 0) =>
    planePts(cam, [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], h);
  const dashes: React.ReactNode[] = [];
  for (let z = 6; z < 200; z += 7) {
    const p = project(cam, x, 0.012, z);
    if (p.y < horizonY(cam) - 6) continue;
    dashes.push(
      <polygon key={z} points={road(x - 0.14, x + 0.14, z, z + 3.4, 0.012)} fill={HW.line} opacity={0.9} />,
    );
  }
  return (
    <g>
      {/* dirt shoulder */}
      <polygon points={road(x - halfW - 3, x + halfW + 3, 1.4, 500)} fill={HW.shoulder} opacity={0.55} />
      {/* asphalt */}
      <polygon points={road(x - halfW, x + halfW, 1.4, 500)} fill={HW.asphalt} />
      <polygon points={road(x - halfW, x - halfW + 0.9, 1.4, 500)} fill={HW.asphaltDark} opacity={0.5} />
      <polygon points={road(x + halfW - 0.9, x + halfW, 1.4, 500)} fill={HW.asphaltDark} opacity={0.5} />
      {/* edge lines */}
      <polygon points={road(x - halfW + 0.45, x - halfW + 0.62, 2, 500, 0.01)} fill={HW.line} opacity={0.85} />
      <polygon points={road(x + halfW - 0.62, x + halfW - 0.45, 2, 500, 0.01)} fill={HW.line} opacity={0.85} />
      {dashes}
      {/* tar seam down the middle */}
      <polygon points={road(x - 0.03, x + 0.03, 4, 400, 0.008)} fill="#4a453f" opacity={0.5} />
    </g>
  );
};

/* ───────── roadside power poles + sagging wires (mid layer) ───────── */
export const PowerPoles: React.FC<{ cam: Cam; x?: number; z0?: number; step?: number; n?: number }> =
  ({ cam, x = -8.5, z0 = 14, step = 26, n = 7 }) => {
    const poles: { top: { x: number; y: number; s: number }; base: { x: number; y: number } }[] = [];
    for (let i = 0; i < n; i++) {
      const z = z0 + i * step;
      poles.push({ top: project(cam, x, 7.4, z), base: project(cam, x, 0, z) });
    }
    const wires: React.ReactNode[] = [];
    for (let i = 0; i < poles.length - 1; i++) {
      const a = poles[i].top, b = poles[i + 1].top;
      const mk = (dy: number, key: string) => {
        const ax = a.x, ay = a.y + dy, bx = b.x, by = b.y + dy;
        const mx = (ax + bx) / 2, my = (ay + by) / 2 + Math.abs(ax - bx) * 0.05 + 6;
        return (
          <path key={key} d={`M${ax},${ay} Q${mx},${my} ${bx},${by}`}
            stroke={HW.wire} strokeWidth={Math.max(1, 0.03 * a.s)} fill="none" opacity={0.75} />
        );
      };
      wires.push(mk(0, `w${i}`));
      wires.push(mk(Math.max(6, 0.16 * a.s), `v${i}`));
    }
    return (
      <g>
        {wires}
        {poles.map((pl, i) => {
          const b = pl.base;
          const w = Math.max(2, 0.14 * pl.top.s);
          return (
            <g key={i}>
              <line x1={b.x} y1={b.y} x2={pl.top.x} y2={pl.top.y} stroke={HW.pole} strokeWidth={w} />
              <line x1={pl.top.x - 0.9 * pl.top.s} y1={pl.top.y + 0.35 * pl.top.s}
                x2={pl.top.x + 0.9 * pl.top.s} y2={pl.top.y + 0.35 * pl.top.s}
                stroke={HW.pole} strokeWidth={Math.max(1.5, 0.09 * pl.top.s)} />
              <line x1={pl.top.x - 0.55 * pl.top.s} y1={pl.top.y + 0.75 * pl.top.s}
                x2={pl.top.x + 0.55 * pl.top.s} y2={pl.top.y + 0.75 * pl.top.s}
                stroke={HW.pole} strokeWidth={Math.max(1.5, 0.08 * pl.top.s)} />
            </g>
          );
        })}
      </g>
    );
  };
