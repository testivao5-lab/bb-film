// BATCH D kit · original unbranded vehicles drawn in METRES (1 unit = 1 m).
// Sedan 4.7 m · hatchback 4.1 m · pickup 5.3 m (pickup already exists in env/LabExterior as `Pickup`).
import React from "react";

const OL = "#0a0a0c";

export interface SedanProps {
  body?: string; shade?: string; light?: string;
  /** 0..1 headlight glow */ head?: number;
  /** 0..1 tail intensity */ tail?: number;
  wheel?: number; bounce?: number; pitch?: number;
  /** driver silhouette in the glass */ driver?: boolean;
  rust?: number;
  sedan?: boolean;
}

/** 4.7 m sedan, side view facing +x. Origin = ground under the centre. */
export const Sedan: React.FC<SedanProps> = ({ body = "#2e4a5e", shade = "#1a2c38", light = "#5a86a0", head = 1, tail = 0.4, wheel = 0, bounce = 0, pitch = 0, driver = true, rust = 0, sedan = true }) => {
  const wheels = [-1.55, 1.5];
  return (
    <g>
      <ellipse cx={0} cy={0} rx={2.55} ry={0.14} fill="#000" opacity={0.5} />
      <g transform={`translate(0,${bounce}) rotate(${-pitch} ${wheels[0]} -0.34)`}>
        {/* body: low nose, greenhouse, short boot */}
        <path d="M-2.35,-0.38 L-2.36,-0.78 L-1.5,-0.86 L-1.02,-1.32 L0.5,-1.34 L1.12,-0.9 L2.15,-0.84 L2.36,-0.66 L2.35,-0.38 Z"
          fill={body} stroke={OL} strokeWidth={0.035} strokeLinejoin="round" />
        <path d="M-2.35,-0.38 L-2.36,-0.6 L2.36,-0.58 L2.35,-0.38 Z" fill={shade} opacity={0.9} />
        <path d="M-2.3,-0.78 L2.2,-0.74" stroke={light} strokeWidth={0.03} opacity={0.75} />
        {/* glass */}
        <path d="M-0.94,-0.9 L-0.5,-1.28 L0.44,-1.3 L0.98,-0.92 Z" fill="#101c28" stroke={OL} strokeWidth={0.025} />
        <path d="M-0.02,-1.28 L-0.06,-0.92" stroke={body} strokeWidth={0.07} />
        <path d="M0.1,-1.26 L0.3,-1.26 L0.06,-0.95 L-0.06,-0.95 Z" fill="#a8ccf0" opacity={0.25} />
        {driver && <g><circle cx={-0.35} cy={-1.12} r={0.09} fill="#080b10" /><path d="M-0.52,-0.92 Q-0.35,-1.04 -0.18,-0.92 Z" fill="#080b10" /></g>}
        {/* door seams + handle */}
        <path d="M-0.9,-0.9 L-0.86,-0.42 M0.62,-0.92 L0.66,-0.42" stroke={OL} strokeWidth={0.018} opacity={0.75} />
        <rect x={-0.6} y={-0.78} width={0.16} height={0.03} rx={0.01} fill="#9aa4ad" />
        {/* chrome bumpers + lights */}
        <rect x={2.28} y={-0.56} width={0.16} height={0.12} rx={0.03} fill="#aeb8c2" stroke={OL} strokeWidth={0.018} />
        <rect x={-2.44} y={-0.56} width={0.14} height={0.12} rx={0.03} fill="#aeb8c2" stroke={OL} strokeWidth={0.018} />
        <rect x={2.28} y={-0.78} width={0.1} height={0.13} fill={head > 0 ? "#fff8dc" : "#6a6a60"} stroke={OL} strokeWidth={0.014} />
        <rect x={-2.4} y={-0.8} width={0.07} height={0.14} fill={tail > 0 ? "#ff2a2a" : "#5a1414"} opacity={0.55 + 0.45 * tail} />
        {rust > 0 && <path d="M-1.9,-0.44 l0.4,0.03 M-2.1,-0.5 l0.2,0.02" stroke="#8a5a3a" strokeWidth={0.02} opacity={0.8 * rust} />}
        {wheels.map((wx) => <path key={wx} d={`M${wx - 0.42},-0.38 A0.42,0.42 0 0 1 ${wx + 0.42},-0.38 Z`} fill="#06090d" />)}
      </g>
      {wheels.map((wx) => (
        <g key={wx} transform={`translate(${wx},-0.31)`}>
          <circle r={0.31} fill="#0b0c0e" stroke={OL} strokeWidth={0.03} />
          <circle r={0.18} fill="#7f8992" />
          <g transform={`rotate(${wheel})`}>
            {[0, 72, 144, 216, 288].map((a) => <rect key={a} x={-0.016} y={-0.17} width={0.032} height={0.12} fill="#3b4148" transform={`rotate(${a})`} />)}
          </g>
          <circle r={0.045} fill="#2a2e33" />
        </g>
      ))}
    </g>
  );
};

/** the same sedan head-on (origin = ground under the front bumper). 1.8 m wide. */
export const SedanFront: React.FC<{ body?: string; shade?: string; lights?: number; driver?: boolean }> = ({ body = "#2e4a5e", shade = "#1a2c38", lights = 1, driver = true }) => (
  <g>
    <ellipse cx={0} cy={0} rx={1.05} ry={0.1} fill="#000" opacity={0.55} />
    {[-0.68, 0.68].map((x) => <rect key={x} x={x - 0.12} y={-0.58} width={0.24} height={0.58} rx={0.05} fill="#0b0c0e" />)}
    <path d="M-0.62,-0.92 L-0.46,-1.3 L0.46,-1.3 L0.62,-0.92 Z" fill={body} stroke={OL} strokeWidth={0.03} />
    <path d="M-0.56,-0.94 L-0.42,-1.26 L0.42,-1.26 L0.56,-0.94 Z" fill="#0c1826" stroke={OL} strokeWidth={0.02} />
    {driver && <circle cx={-0.24} cy={-1.08} r={0.09} fill="#080b10" />}
    <path d="M-0.88,-0.4 L-0.88,-0.82 L-0.62,-0.94 L0.62,-0.94 L0.88,-0.82 L0.88,-0.4 Z" fill={body} stroke={OL} strokeWidth={0.03} />
    <rect x={-0.44} y={-0.78} width={0.88} height={0.16} fill="#14171b" stroke="#8d969f" strokeWidth={0.018} />
    {[-0.72, -0.56, 0.56, 0.72].map((x) => <rect key={x} x={x - 0.06} y={-0.78} width={0.12} height={0.16} rx={0.02} fill={lights > 0 ? "#fffbe8" : "#7b7b70"} stroke={OL} strokeWidth={0.014} />)}
    <path d="M-0.88,-0.58 L0.88,-0.58 L0.88,-0.4 L-0.88,-0.4 Z" fill={shade} />
    <rect x={-0.92} y={-0.5} width={1.84} height={0.11} rx={0.03} fill="#b4bec8" stroke={OL} strokeWidth={0.018} />
  </g>
);
