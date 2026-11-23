// Vehicles drawn in METRES (1 unit = 1 m). Generic, unbranded designs.
import React from "react";

const OL = "#05080d";

export interface CoupeProps {
  color?: string; shade?: string; light?: string;
  /** wheel spin in degrees */
  wheel?: number;
  /** body pitch in degrees (+ = nose up / rear squat under acceleration) */
  pitch?: number;
  /** body vertical offset in metres (suspension bounce, + = down) */
  bounce?: number;
  /** body roll/yaw fake: lateral fishtail lean in degrees */
  lean?: number;
  headlights?: number; // 0..1
  tail?: number; // 0..1 tail-light intensity (brake = 1)
  /** moon/key reflection strength on the body */
  sheen?: number;
  /** silhouette of driver in the cabin */
  driver?: boolean;
  dents?: number; // 0..1 fresh scrape on the nose (after the gate)
}

/** 4.8 m two-door 80s coupe-utility, side view facing +x. Origin = ground under the car centre. */
export const Coupe: React.FC<CoupeProps> = ({
  color = "#3a1d22", shade = "#1f0e12", light = "#6b3a40", wheel = 0, pitch = 0, bounce = 0, lean = 0,
  headlights = 1, tail = 0.5, sheen = 1, driver = true, dents = 0,
}) => {
  const wheels = [-1.52, 1.45];
  return (
    <g>
      {/* contact shadow */}
      <ellipse cx={0} cy={0} rx={2.65} ry={0.16} fill="#000" opacity={0.55} />
      {/* body (pitched around the rear axle) */}
      <g transform={`translate(0,${bounce}) rotate(${-pitch - lean} ${wheels[0]} -0.36)`}>
        {/* lower body + bed */}
        <path d="M-2.42,-0.42 L-2.44,-0.95 L-0.55,-0.98 L-0.18,-1.36 L0.78,-1.38 L1.32,-0.98 L2.32,-0.9 L2.45,-0.62 L2.42,-0.42 Z"
          fill={color} stroke={OL} strokeWidth={0.035} strokeLinejoin="round" />
        {/* shaded lower flank */}
        <path d="M-2.42,-0.42 L-2.43,-0.66 L2.44,-0.62 L2.42,-0.42 Z" fill={shade} opacity={0.85} />
        {/* beltline crease + highlight */}
        <path d="M-2.4,-0.86 L2.34,-0.8" stroke={light} strokeWidth={0.035} opacity={0.8} />
        <path d="M-2.3,-0.9 L-0.7,-0.93" stroke="#cfe0ff" strokeWidth={0.02} opacity={0.35 * sheen} />
        {/* open cargo bed rail */}
        <path d="M-2.42,-0.98 L-0.62,-1.0" stroke={OL} strokeWidth={0.05} />
        {/* cabin glass */}
        <path d="M-0.47,-0.99 L-0.15,-1.31 L0.72,-1.32 L1.18,-1.0 Z" fill="#0d1a28" stroke={OL} strokeWidth={0.03} />
        <path d="M0.22,-1.31 L0.26,-1.0" stroke={color} strokeWidth={0.06} />
        {/* glass reflections */}
        <path d="M0.4,-1.29 L0.62,-1.29 L0.42,-1.03 L0.3,-1.03 Z" fill="#9fc8ee" opacity={0.22 * sheen} />
        {driver && (
          <g>
            {/* driver silhouette: head + shoulder, curls */}
            <circle cx={0.48} cy={-1.16} r={0.1} fill="#05080c" />
            <path d="M0.3,-1.0 Q0.48,-1.1 0.66,-1.0 Z" fill="#05080c" />
          </g>
        )}
        {/* door seam + handle */}
        <path d="M-0.4,-0.98 L-0.36,-0.5 M1.05,-0.95 L1.08,-0.5" stroke={OL} strokeWidth={0.02} opacity={0.8} />
        <rect x={-0.28} y={-0.84} width={0.16} height={0.03} rx={0.01} fill="#9aa4ad" />
        {/* chrome bumpers */}
        <rect x={2.3} y={-0.6} width={0.2} height={0.12} rx={0.03} fill="#aeb8c2" stroke={OL} strokeWidth={0.02} />
        <rect x={-2.52} y={-0.6} width={0.16} height={0.12} rx={0.03} fill="#aeb8c2" stroke={OL} strokeWidth={0.02} />
        {/* headlight + tail light */}
        <rect x={2.36} y={-0.82} width={0.1} height={0.12} fill={headlights > 0 ? "#fff8dc" : "#6a6a60"} stroke={OL} strokeWidth={0.015} />
        <rect x={-2.47} y={-0.86} width={0.06} height={0.16} fill={tail > 0 ? "#ff2a2a" : "#5a1414"} opacity={0.5 + 0.5 * tail} />
        {/* scrape from the gate */}
        {dents > 0 && <path d="M1.8,-0.78 l0.45,0.05 M1.9,-0.7 l0.35,0.02" stroke="#c8ccd2" strokeWidth={0.015} opacity={0.7 * dents} />}
        {/* wheel arches */}
        {wheels.map((wx, i) => <path key={i} d={`M${wx - 0.45},-0.42 A0.45,0.45 0 0 1 ${wx + 0.45},-0.42 Z`} fill="#06090d" />)}
      </g>
      {/* wheels (do not pitch with the body) */}
      {wheels.map((wx, i) => (
        <g key={i} transform={`translate(${wx},-0.34)`}>
          <circle r={0.34} fill="#0b0c0e" stroke={OL} strokeWidth={0.03} />
          <circle r={0.2} fill="#7f8992" />
          <g transform={`rotate(${wheel})`}>
            {[0, 72, 144, 216, 288].map((a) => <rect key={a} x={-0.018} y={-0.19} width={0.036} height={0.13} fill="#3b4148" transform={`rotate(${a})`} />)}
          </g>
          <circle r={0.05} fill="#2a2e33" />
          <path d="M-0.16,-0.1 A0.19,0.19 0 0 1 0.1,-0.16" stroke="#dfe8f2" strokeWidth={0.02} fill="none" opacity={0.5 * sheen} />
        </g>
      ))}
    </g>
  );
};

/** Same coupe seen HEAD-ON. Origin = ground under the front bumper centre. 1.86 m wide, 1.38 m tall. */
export const CoupeFront: React.FC<{ color?: string; shade?: string; lights?: number; driver?: boolean; dents?: number; bounce?: number; roll?: number }> = ({ color = "#3a1d22", shade = "#1f0e12", lights = 1, driver = true, dents = 0, bounce = 0, roll = 0 }) => (
  <g>
    <ellipse cx={0} cy={0} rx={1.15} ry={0.12} fill="#000" opacity={0.6} />
    {/* tyres */}
    {[-0.74, 0.74].map((x) => <rect key={x} x={x - 0.13} y={-0.62} width={0.26} height={0.62} rx={0.06} fill="#0b0c0e" />)}
    <g transform={`translate(0,${bounce}) rotate(${roll} 0 -0.6)`}>
      {/* roof + windshield */}
      <path d="M-0.66,-0.98 L-0.5,-1.36 L0.5,-1.36 L0.66,-0.98 Z" fill={color} stroke={OL} strokeWidth={0.03} strokeLinejoin="round" />
      <path d="M-0.6,-0.99 L-0.46,-1.31 L0.46,-1.31 L0.6,-0.99 Z" fill="#0c1826" stroke={OL} strokeWidth={0.02} />
      <path d="M-0.38,-1.29 L-0.18,-1.29 L-0.44,-1.0 L-0.56,-1.0 Z" fill="#a8d0f2" opacity={0.18} />
      {driver && <g><circle cx={-0.3} cy={-1.13} r={0.1} fill="#05080c" /><path d="M-0.5,-0.99 Q-0.3,-1.1 -0.1,-0.99 Z" fill="#05080c" /></g>}
      {/* hood + body */}
      <path d="M-0.93,-0.42 L-0.93,-0.86 L-0.7,-0.99 L0.7,-0.99 L0.93,-0.86 L0.93,-0.42 Z" fill={color} stroke={OL} strokeWidth={0.03} strokeLinejoin="round" />
      <path d="M-0.7,-0.97 L0.7,-0.97 L0.6,-0.9 L-0.6,-0.9 Z" fill="#ffffff" opacity={0.08} />
      {/* grille + quad headlights */}
      <rect x={-0.48} y={-0.8} width={0.96} height={0.2} fill="#14171b" stroke="#8d969f" strokeWidth={0.02} />
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={-0.46 + i * 0.115} x2={-0.46 + i * 0.115} y1={-0.79} y2={-0.61} stroke="#454c54" strokeWidth={0.012} />)}
      {[-0.78, -0.6, 0.6, 0.78].map((x) => <rect key={x} x={x - 0.075} y={-0.79} width={0.15} height={0.17} rx={0.02} fill={lights > 0 ? "#fffbe8" : "#7b7b70"} stroke={OL} strokeWidth={0.015} />)}
      <path d="M-0.93,-0.6 L0.93,-0.6 L0.93,-0.42 L-0.93,-0.42 Z" fill={shade} />
      <rect x={-0.98} y={-0.52} width={1.96} height={0.12} rx={0.03} fill="#b4bec8" stroke={OL} strokeWidth={0.02} />
      {dents > 0 && <path d="M0.3,-0.5 l0.25,0.04 l0.15,-0.05 M-0.6,-0.86 l0.3,0.05" stroke="#d6dbe0" strokeWidth={0.012} opacity={0.8 * dents} fill="none" />}
    </g>
  </g>
);

/** Same coupe seen from BEHIND (open bed, tailgate). Origin = ground under the rear bumper centre. */
export const CoupeRear: React.FC<{ color?: string; shade?: string; tail?: number; bounce?: number; roll?: number }> = ({ color = "#3a1d22", shade = "#1f0e12", tail = 0.7, bounce = 0, roll = 0 }) => (
  <g>
    <ellipse cx={0} cy={0} rx={1.15} ry={0.12} fill="#000" opacity={0.6} />
    {[-0.74, 0.74].map((x) => <rect key={x} x={x - 0.13} y={-0.62} width={0.26} height={0.62} rx={0.06} fill="#0b0c0e" />)}
    <g transform={`translate(0,${bounce}) rotate(${roll} 0 -0.6)`}>
      <path d="M-0.62,-0.99 L-0.5,-1.34 L0.5,-1.34 L0.62,-0.99 Z" fill={color} stroke={OL} strokeWidth={0.03} />
      <path d="M-0.5,-1.0 L-0.42,-1.28 L0.42,-1.28 L0.5,-1.0 Z" fill="#0c1826" stroke={OL} strokeWidth={0.02} />
      <circle cx={-0.28} cy={-1.12} r={0.09} fill="#05080c" />
      <path d="M-0.93,-0.42 L-0.93,-1.0 L0.93,-1.0 L0.93,-0.42 Z" fill={color} stroke={OL} strokeWidth={0.03} />
      <path d="M-0.86,-0.94 L0.86,-0.94" stroke={shade} strokeWidth={0.05} />
      {/* tail-light bars + glow */}
      {[-1, 1].map((s) => <g key={s}><rect x={s > 0 ? 0.58 : -0.88} y={-0.86} width={0.3} height={0.14} fill="#ff2a2a" opacity={0.55 + 0.45 * tail} stroke={OL} strokeWidth={0.015} /><ellipse cx={s * 0.73} cy={-0.79} rx={0.5} ry={0.3} fill="#ff2a2a" opacity={0.18 * tail} /></g>)}
      <rect x={-0.18} y={-0.72} width={0.36} height={0.16} fill="#c8c8be" stroke={OL} strokeWidth={0.015} />
      <path d="M-0.93,-0.56 L0.93,-0.56 L0.93,-0.42 L-0.93,-0.42 Z" fill={shade} />
      <rect x={-0.98} y={-0.5} width={1.96} height={0.1} rx={0.03} fill="#a7b1bb" stroke={OL} strokeWidth={0.02} />
    </g>
  </g>
);
