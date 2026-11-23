// 2.5D pinhole camera. WORLD UNITS ARE METRES (1 unit = 1 m).
// x → right, y → up (floor = 0), z → into the screen.
import React from "react";

export const W = 1920, H = 1080;

export interface Cam {
  x: number; // metres
  y: number; // eye height in metres
  z: number; // camera position along depth
  f: number; // focal length in px (1920px wide: f≈1350 ≈ 35mm lens)
  shiftY?: number; // vertical lens shift in px (fakes tilt without keystone)
  focus?: number; // focus distance in metres from camera (depth of field)
  aperture?: number; // blur strength multiplier
}

export const project = (c: Cam, x: number, y: number, z: number) => {
  const d = Math.max(0.05, z - c.z);
  const s = c.f / d;
  return { x: W / 2 + (x - c.x) * s, y: H / 2 + (c.shiftY ?? 0) - (y - c.y) * s, s, d };
};

/** blur radius in SCREEN px for something at depth d (circle of confusion approximation) */
export const cocBlur = (c: Cam, d: number) => {
  if (!c.focus) return 0;
  const a = c.aperture ?? 1;
  return Math.min(16, Math.abs(1 / c.focus - 1 / d) * 10 * a * (c.f / 1350));
};

let uid = 0;
/** Gaussian blur wrapper in screen space (stdDeviation in px) */
export const Blur: React.FC<{ px: number; children: React.ReactNode }> = ({ px, children }) => {
  if (px < 1.2) return <>{children}</>;
  const id = `bl${(uid++ % 100000)}`;
  return (
    <g>
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
          <feGaussianBlur stdDeviation={px.toFixed(2)} />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
};

/**
 * A flat card standing at world (x, y, z). Children draw in METRES with
 * y negative = up (SVG convention), origin at the card's anchor.
 */
export const Card: React.FC<{ cam: Cam; x: number; y?: number; z: number; children: React.ReactNode; blur?: boolean; opacity?: number; flip?: boolean }> = ({ cam, x, y = 0, z, children, blur = true, opacity = 1, flip }) => {
  if (z - cam.z < 0.1) return null;
  const p = project(cam, x, y, z);
  const b = blur ? cocBlur(cam, p.d) : 0;
  const inner = (
    <g transform={`translate(${p.x.toFixed(2)},${p.y.toFixed(2)}) scale(${(flip ? -p.s : p.s).toFixed(4)},${p.s.toFixed(4)})`} opacity={opacity}>
      {children}
    </g>
  );
  return <Blur px={b}>{inner}</Blur>;
};

/** points string for a polygon lying on the horizontal plane y = h, given [x, z] world pairs */
export const planePts = (c: Cam, pts: [number, number][], h = 0) =>
  pts.map(([x, z]) => { const q = project(c, x, h, z); return `${q.x.toFixed(1)},${q.y.toFixed(1)}`; }).join(" ");

// NOTE: for big near-lens defocus use <BakedCard> (src/bake) — live blur is the #1 render cost.
