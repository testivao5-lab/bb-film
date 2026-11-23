import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Figure, STAND } from "./rig/Figure";
import { TEACHER, teacherLook } from "./rig/cast";
import { breath } from "./lib/anim";

export const RigTest: React.FC = () => {
  const f = useCurrentFrame();
  const S = 380; // px per metre
  const lying = { torso: -90, neck: -8, shL: -10, shR: 18, elL: 10, elR: 40, hipL: 4, hipR: 22, knL: 6, knR: 38, breathe: breath(f) };
  return (
    <AbsoluteFill style={{ background: "#c9d3dc" }}>
      <svg width={1920} height={1080}>
        <rect x={0} y={960} width={1920} height={120} fill="#8a949c" />
        <g transform={`translate(260,960) scale(${S})`}><Figure pose={STAND} view={0} look={teacherLook({ yaw: 0 })} pal={TEACHER.pal} height={TEACHER.height} /></g>
        <g transform={`translate(640,960) scale(${S})`}><Figure pose={{ ...STAND, shL: -8, shR: 10 }} view={1} look={teacherLook({ yaw: 0.85 })} pal={TEACHER.pal} height={TEACHER.height} /></g>
        <g transform={`translate(1400,960) scale(${S})`}><Figure pose={lying} view={1} look={teacherLook({ yaw: 0.8, mouth: "pain", mouthOpen: 0.5, brow: -0.6 })} pal={TEACHER.pal} height={TEACHER.height} blood={0.7} bloodHand={1} /></g>
        {/* 1.7m and 2.0m reference lines */}
        <line x1={0} x2={1920} y1={960 - 1.7 * S} y2={960 - 1.7 * S} stroke="red" strokeDasharray="8 8" />
        <line x1={0} x2={1920} y1={960 - 2.0 * S} y2={960 - 2.0 * S} stroke="blue" strokeDasharray="8 8" />
      </svg>
    </AbsoluteFill>
  );
};
