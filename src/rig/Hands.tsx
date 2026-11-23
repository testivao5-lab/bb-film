// Close-up hands for inserts, drawn in METRES, wrist at the origin, fingers pointing up (−y).
// Seen from the BACK of a right hand (thumb on the viewer's left). `curl` 0 = flat, 1 = fist.
import React from "react";
import type { Palette } from "./Figure";

export const HandBack: React.FC<{ pal: Palette; curl?: number; thumb?: number; sleeve?: string; sleeveShade?: string; cuff?: string; forearm?: number }> = ({ pal, curl = 0.5, thumb = 0.5, sleeve, sleeveShade, cuff, forearm = 0.34 }) => {
  const ol = pal.outline, ow = 0.0028;
  const fingers = [
    { x: -0.03, len: 0.085, a: -6 },
    { x: -0.01, len: 0.095, a: -2 },
    { x: 0.011, len: 0.09, a: 2 },
    { x: 0.03, len: 0.072, a: 7 },
  ];
  return (
    <g>
      {/* forearm + sleeve, running down off frame */}
      <path d={`M-0.036,0.0 L-0.05,${forearm} L0.06,${forearm} L0.04,0.0 Z`} fill={pal.skin} stroke={ol} strokeWidth={ow} />
      <path d={`M0.012,0.01 L0.02,${forearm} L0.06,${forearm} L0.04,0.0 Z`} fill={pal.skinShade} opacity={0.5} />
      {sleeve && <g>
        <path d={`M-0.05,0.1 L-0.07,${forearm + 0.05} L0.08,${forearm + 0.05} L0.062,0.1 Z`} fill={sleeve} stroke={ol} strokeWidth={ow} />
        {sleeveShade && <path d={`M0.022,0.1 L0.03,${forearm + 0.05} L0.08,${forearm + 0.05} L0.062,0.1 Z`} fill={sleeveShade} opacity={0.8} />}
        <path d="M-0.05,0.1 Q0.006,0.09 0.062,0.1" stroke={ol} strokeWidth={ow} fill="none" />
        {cuff && <path d="M-0.05,0.1 L0.062,0.1 L0.064,0.122 L-0.052,0.122 Z" fill={cuff} stroke={ol} strokeWidth={ow * 0.8} />}
      </g>}
      {/* thumb (behind the palm edge when tucked) */}
      <g transform={`translate(-0.036,-0.03) rotate(${-55 + thumb * 35})`}>
        <path d="M-0.013,0 L-0.012,-0.055 Q0,-0.068 0.012,-0.055 L0.013,0 Z" fill={pal.skin} stroke={ol} strokeWidth={ow} />
        <path d="M-0.007,-0.05 Q0,-0.058 0.007,-0.05 L0.006,-0.04 Q0,-0.044 -0.006,-0.04 Z" fill={pal.skinLight} opacity={0.8} />
      </g>
      {/* back of the hand */}
      <path d="M-0.036,0.0 C-0.042,-0.03 -0.044,-0.06 -0.04,-0.082 L0.04,-0.082 C0.044,-0.06 0.044,-0.025 0.04,0.0 Z" fill={pal.skin} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
      <path d="M0.016,-0.08 C0.03,-0.05 0.034,-0.02 0.03,0.0 L0.04,0.0 C0.044,-0.025 0.044,-0.06 0.04,-0.082 Z" fill={pal.skinShade} opacity={0.6} />
      {[-0.024, -0.008, 0.008, 0.024].map((x, i) => <path key={i} d={`M${x * 0.6},-0.01 L${x},-0.07`} stroke={pal.skinShade} strokeWidth={0.0018} opacity={0.55} />)}
      {/* fingers: foreshorten as they curl away from us; nails only while extended */}
      {fingers.map((fg, i) => {
        const L = fg.len * (1 - 0.62 * curl);
        return (
          <g key={i} transform={`translate(${fg.x},-0.078) rotate(${fg.a * (1 - curl * 0.5)})`}>
            <path d={`M-0.0095,0.004 L-0.0095,${-L + 0.009} Q0,${-L - 0.003} 0.0095,${-L + 0.009} L0.0095,0.004 Z`} fill={pal.skin} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
            <ellipse cx={0} cy={-0.002} rx={0.0075} ry={0.0045} fill={pal.skinLight} opacity={0.75} />
            {curl > 0.35 && <path d={`M-0.0085,${-L * 0.55} Q0,${-L * 0.62} 0.0085,${-L * 0.55}`} stroke={pal.skinShade} strokeWidth={0.0022} fill="none" />}
            {curl < 0.45 && <path d={`M-0.0055,${-L + 0.006} L-0.005,${-L + 0.018} Q0,${-L + 0.021} 0.005,${-L + 0.018} L0.0055,${-L + 0.006} Q0,${-L + 0.001} -0.0055,${-L + 0.006} Z`} fill={pal.skinLight} stroke={pal.skinShade} strokeWidth={0.0015} />}
          </g>
        );
      })}
    </g>
  );
};
