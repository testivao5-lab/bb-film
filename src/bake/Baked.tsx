import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { Cam, cocBlur, project } from "../lib/camera";
import { BAKES, bakeFile } from "./registry";

/** SVG <image> that blocks the frame until the bitmap is loaded + decoded */
const SvgImg: React.FC<{ href: string; x: number; y: number; w: number; h: number; opacity?: number }> = ({ href, x, y, w, h, opacity = 1 }) => {
  const [handle] = useState(() => delayRender(`bake ${href}`));
  useEffect(() => {
    const im = new Image();
    im.src = href;
    im.decode().then(() => continueRender(handle)).catch(() => continueRender(handle));
  }, [href, handle]);
  return <image href={href} x={x} y={y} width={w} height={h} opacity={opacity} preserveAspectRatio="none" />;
};

/**
 * Drop-in replacement for <Card> + art: positions a pre-baked PNG in world space and
 * cross-fades between the two nearest baked blur levels, so rack-focus still animates.
 */
export const BakedCard: React.FC<{ cam: Cam; id: string; x: number; y?: number; z: number; opacity?: number; blurScale?: number }> = ({ cam, id, x, y = 0, z, opacity = 1, blurScale = 1 }) => {
  const def = BAKES[id];
  if (z - cam.z < 0.1) return null;
  const p = project(cam, x, y, z);
  const need = (cocBlur(cam, p.d) * blurScale) / p.s; // metres on the card
  const L = def.levels;
  let i = 0;
  while (i < L.length - 2 && need > L[i + 1]) i++;
  const t = Math.max(0, Math.min(1, (need - L[i]) / (L[i + 1] - L[i])));
  const [x0, y0, x1, y1] = def.box;
  const box = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  return (
    <g transform={`translate(${p.x.toFixed(2)},${p.y.toFixed(2)}) scale(${p.s.toFixed(4)})`} opacity={opacity}>
      {t < 0.98 && <SvgImg href={staticFile(bakeFile(id, i))} {...box} />}
      {t > 0.02 && <SvgImg href={staticFile(bakeFile(id, i + 1))} {...box} opacity={t} />}
    </g>
  );
};

/** Composition used only by `npm run bake` — renders one prop/level on a transparent canvas */
export const BakeComp: React.FC<{ id: string; level: number }> = ({ id, level }) => {
  const def = BAKES[id];
  const [x0, y0, x1, y1] = def.box;
  const sd = def.levels[level];
  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      <svg width="100%" height="100%" viewBox={`${x0} ${y0} ${x1 - x0} ${y1 - y0}`} preserveAspectRatio="none">
        <defs>
          <filter id="b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={sd} /></filter>
        </defs>
        <g filter={sd > 0 ? "url(#b)" : undefined}>{def.draw()}</g>
      </svg>
    </AbsoluteFill>
  );
};
