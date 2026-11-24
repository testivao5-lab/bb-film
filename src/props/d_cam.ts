// BATCH D kit · camera placement helpers. Frames subjects deterministically so nobody drifts off-frame.
import { Cam, W, H } from "../lib/camera";

export interface ShotPoint { x: number; y: number; z: number } // y = height of the thing we must see (m)

/** back a camera off along +z until every point projects inside the frame (with margin in px) */
export function fitCam(o: {
  cx: number; cy: number; cz?: number;
  f: number; marginX?: number; marginY?: number; shiftY?: number;
  pts: [number, number, number][]; // [x, y, z] world
  extra?: number;
}): Cam {
  const { cx, cy, f, pts, extra = 0 } = o;
  const mx = o.marginX ?? 140, my = o.marginY ?? 90, shiftY = o.shiftY ?? 0;
  const maxDx = W / 2 - mx, maxDy = H / 2 - my;
  let cz = o.cz ?? Math.min(...pts.map((p) => p[2])) - 1.2;
  for (let i = 0; i < 400; i++) {
    let ok = true;
    for (const [x, y, z] of pts) {
      const d = z - cz;
      if (d < 0.35) { ok = false; break; }
      const sx = (Math.abs(x - cx) * f) / d;
      const sy = (Math.abs(y - cy) * f) / d;
      if (sx > maxDx || sy > maxDy) { ok = false; break; }
    }
    if (ok) break;
    cz -= 0.12;
  }
  return { x: cx, y: cy, z: cz - extra, f, shiftY, focus: 6, aperture: 0.6 };
}

/** camera aimed at the midpoint of two people (heads + hips) — reliable medium two-shot */
export function twoShot(o: {
  a: [number, number]; b: [number, number]; // [x, z] of each subject
  ha: number; hb: number; // heights
  f?: number; cy?: number; marginX?: number; shiftY?: number; extra?: number;
}): Cam {
  const { a, b, ha, hb } = o;
  const cx = (a[0] + b[0]) / 2;
  const f = o.f ?? 1500;
  const cy = o.cy ?? 1.32;
  return fitCam({
    cx, cy, f, marginX: o.marginX ?? 120, shiftY: o.shiftY ?? 30, extra: o.extra ?? 0,
    pts: [
      [a[0], ha * 0.98, a[1]], [a[0], 0.15, a[1]],
      [b[0], hb * 0.98, b[1]], [b[0], 0.15, b[1]],
    ],
  });
}

/** single-subject shot with a given framing height (m of the frame's vertical coverage) */
export function single(o: {
  x: number; z: number; h: number; f?: number; cover?: number; cy?: number; shiftY?: number; dx?: number; extra?: number;
}): Cam {
  const { x, z, h } = o;
  const f = o.f ?? 1800;
  const cover = o.cover ?? h * 1.15; // vertical metres visible
  const cy = o.cy ?? Math.min(h * 0.6, h - cover * 0.3);
  // vertical coverage = H * d / f
  const d = (cover * f) / H;
  return { x: x + (o.dx ?? 0), y: cy, z: o.extra !== undefined ? z - d - o.extra : z - d, f, shiftY: o.shiftY ?? 0, focus: Math.max(1.5, d), aperture: 0.7 };
}
