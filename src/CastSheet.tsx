// Model sheet of the ORIGINAL principal cast (front + 3/4), used as the reference for every agent.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Figure, STAND } from "./rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, BROTHER, brotherLook, RESTAURATEUR, restaurateurLook, WIFE, wifeLook } from "./rig/cast";

const CAST = [
  { c: TEACHER, look: teacherLook, outfit: "jacket" as const },
  { c: PARTNER, look: partnerLook, outfit: "hoodie" as const },
  { c: BROTHER, look: brotherLook, outfit: "jacket" as const },
  { c: RESTAURATEUR, look: restaurateurLook, outfit: "jacket" as const },
  { c: WIFE, look: wifeLook, outfit: "jacket" as const },
];

export const CastSheet: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(#e9e4da, #cfc8ba)" }}>
    <svg width={1920} height={1080}>
      <rect x={0} y={930} width={1920} height={150} fill="#bdb5a5" />
      {CAST.map(({ c, look, outfit }, i) => (
        <g key={i}>
          <g transform={`translate(${170 + i * 380},930) scale(440)`}>
            <Figure pose={STAND} view={0} look={look()} pal={c.pal} height={c.height} outfit={outfit} />
          </g>
          <g transform={`translate(${330 + i * 380},930) scale(440)`}>
            <Figure pose={STAND} view={0.6} look={look({ yaw: 0.6 })} pal={c.pal} height={c.height} outfit={outfit} />
          </g>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
