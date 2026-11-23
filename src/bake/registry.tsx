// Props that get PRE-BAKED to transparent PNGs (with their depth-of-field blur already applied).
// Big near-lens foreground blur is the single most expensive thing in headless Chrome
// (~0.8 s/frame); scaling a cached bitmap is ~free. Bake with: npm run bake
import React from "react";
import { GlassTableArt, MaskPostArt } from "../env/Lab";

export interface BakeDef {
  /** art bounds in metres (card space, y negative = up): [x0, y0, x1, y1] */
  box: [number, number, number, number];
  /** bitmap resolution, pixels per metre */
  ppm: number;
  /** blur levels in METRES on the card (screen blur px / projected scale) */
  levels: number[];
  draw: () => React.ReactElement;
}

export const BAKES: Record<string, BakeDef> = {
  maskpost: { box: [-0.42, -4.75, 0.42, 0.15], ppm: 420, levels: [0, 0.003, 0.006], draw: () => <MaskPostArt /> },
  glasstable24: { box: [-1.45, -1.75, 1.45, 0.15], ppm: 900, levels: [0, 0.0035, 0.007], draw: () => <GlassTableArt w={2.4} /> },
};

export const bakeFile = (id: string, li: number) => `bake/${id}_${li}.png`;
