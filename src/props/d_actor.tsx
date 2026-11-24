// BATCH D kit · Actor: a Figure placed in the 2.5D world, optionally mirrored so it can face −x.
// Profile-first staging: view=1 draws a true side view (facing +x); flip mirrors it to face −x.
import React from "react";
import { Cam, Card } from "../lib/camera";
import { Figure, Pose } from "../rig/Figure";
import type { Palette } from "../rig/Figure";
import type { HeadLook } from "../rig/Head";

export interface ActorProps {
  cam: Cam;
  x: number; z: number; y?: number;
  /** +1 faces +x (screen right), −1 faces −x (screen left) */
  face?: 1 | -1;
  /** 0 front … 1 profile */
  view?: number;
  pose: Pose;
  look: HeadLook;
  pal: Palette;
  height: number;
  outfit?: "jacket" | "hoodie";
  rimLight?: string;
  rimSide?: 1 | -1;
  blood?: number;
  bloodHand?: number;
  ground?: boolean;
  opacity?: number;
  /** draw extra things in the figure's own card space (metres, origin at the feet, +y down) */
  children?: React.ReactNode;
}

export const Actor: React.FC<ActorProps & { blurCard?: boolean }> = ({ cam, x, z, y = 0, face = 1, view = 1, pose, look, pal, height, outfit = "jacket", rimLight, rimSide = 1, blood = 0, bloodHand = 0, ground = true, opacity = 1, blurCard = false, children }) => (
  <Card cam={cam} x={x} y={y} z={z} flip={face === -1} blur={blurCard} opacity={opacity}>
    {ground && (
      <ellipse cx={0.06} cy={0} rx={0.42 * (height / 1.78)} ry={0.09 * (height / 1.78)} fill="#000" opacity={0.32} />
    )}
    <Figure pose={pose} look={look} pal={pal} height={height} view={view} outfit={outfit} rimLight={rimLight} rimSide={face === -1 ? (rimSide === 1 ? -1 : 1) : rimSide} blood={blood} bloodHand={bloodHand} ground={ground} />
    {children}
  </Card>
);

/** a 2.4 m standing person silhouette for deep background (no face detail needed) */
export const BackgroundActor: React.FC<Omit<ActorProps, "look"> & { look?: HeadLook }> = ({ look, ...p }) => (
  <Actor {...p} look={look ?? { lids: 0.2, lookX: 0, lookY: 0, brow: 0, mouth: "neutral", hair: { base: "#2a2420", dark: "#161210", light: "#6a5a4a" } }} />
);
