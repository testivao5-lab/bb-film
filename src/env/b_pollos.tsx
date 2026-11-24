// Batch B · Sunlit Fried-Chicken Restaurant ("pollos") — 3 depth layers
// Bright yellow-and-terracotta fast-food dining room, plate-glass windows overlooking Albuquerque day sky,
// stainless service counter, red vinyl booths, fried-chicken baskets & drink cups. Zero brand/show text.
import React from "react";
import { Cam, Card, project, W, H } from "../lib/camera";
import { wallQuad, sideQuad, flatQuad } from "./b_common";
import { StreetSky, StreetRidge } from "./b_street";

export const PollosSet: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const OL = "#241911";
  const zNear = Math.max(cam.z + 0.35, 1.4);

  return (
    <g>
      {/* Far layer outside the plate-glass windows: sunny Albuquerque sky, clouds & mesa ridge */}
      <StreetSky f={f} cam={cam} />
      <StreetRidge cam={cam} />
      {/* Sunlit parking-lot asphalt strip outside window */}
      <polygon points={flatQuad(cam, -12, 12, 5.2, 14, 0)} fill="#7a746c" />

      {/* Terracotta quarry-tile restaurant floor */}
      <polygon points={flatQuad(cam, -5.2, 5.2, zNear, 5.25, 0)} fill="#b86b43" stroke={OL} strokeWidth={1.6} />
      {[-3.6, -2.4, -1.2, 0, 1.2, 2.4, 3.6].map((tx, i) => {
        const a = project(cam, tx, 0, zNear);
        const b = project(cam, tx, 0, 5.25);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#854728" strokeWidth={1.3} opacity={0.55} />;
      })}
      {[2.2, 3.1, 4.0, 4.9].map((tz, i) => {
        const a = project(cam, -5.0, 0, tz);
        const b = project(cam, 5.0, 0, tz);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#854728" strokeWidth={1.3} opacity={0.55} />;
      })}

      {/* Drop-tile acoustic ceiling */}
      <polygon points={flatQuad(cam, -5.2, 5.2, zNear, 5.25, 2.95)} fill="#f5efe0" stroke={OL} strokeWidth={1.5} />

      {/* Back wall (z = 5.25): cheerful warm marigold yellow upper wall + red-tile wainscot */}
      <polygon points={wallQuad(cam, -5.2, 5.2, 1.05, 2.95, 5.25)} fill="#f2cb66" stroke={OL} strokeWidth={2} />
      <polygon points={wallQuad(cam, -5.2, 5.2, 0, 1.05, 5.25)} fill="#9e3b2e" stroke={OL} strokeWidth={2} />
      <polygon points={wallQuad(cam, -5.2, 5.2, 1.01, 1.09, 5.24)} fill="#f5e9cf" />

      {/* Large sunlit plate-glass dining windows on back-right wall (x = 0.55 .. 4.35) showing bright Albuquerque sky, clouds & mesa */}
      <polygon points={wallQuad(cam, 0.55, 4.35, 1.08, 2.58, 5.23)} fill="#9bc7ed" />
      <polygon points={wallQuad(cam, 0.55, 4.35, 1.08, 1.48, 5.228)} fill="#c9a57d" opacity={0.78} />
      <polygon points={wallQuad(cam, 0.55, 4.35, 1.08, 1.26, 5.226)} fill="#877d73" />
      {/* White desert cumulus cloud visible outside window */}
      <polygon points={wallQuad(cam, 1.05, 2.65, 2.02, 2.32, 5.225)} fill="#ffffff" opacity={0.72} />
      <polygon points={wallQuad(cam, 2.95, 4.05, 1.92, 2.18, 5.225)} fill="#ffffff" opacity={0.65} />
      <polygon points={wallQuad(cam, 0.55, 4.35, 1.08, 2.58, 5.22)} fill="none" stroke="#3c4652" strokeWidth={3} />
      {[1.82, 3.08].map((mx, i) => {
        const a = project(cam, mx, 1.08, 5.22);
        const b = project(cam, mx, 2.58, 5.22);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#3c4652" strokeWidth={2.8} />;
      })}
      {/* Diagonal warm sunbeams slanting in from the plate-glass windows */}
      <polygon points={flatQuad(cam, 0.4, 3.8, 2.4, 5.1, 0.01)} fill="#fff6d6" opacity={0.18} />

      {/* Left-back stainless fried-chicken service counter, illuminated colour-band menu boards & charity plaque */}
      <Card cam={cam} x={-1.95} y={0} z={4.85} blur={false}>
        {/* Overhead colour-band menu panels (pure geometric food/colour bands, zero readable text) */}
        {[-0.95, 0, 0.95].map((bx, i) => (
          <g key={i} transform={`translate(${bx},-2.35)`}>
            <rect x={-0.42} y={-0.28} width={0.84} height={0.52} rx={0.02} fill="#fff8e3" stroke="#7d2c22" strokeWidth={0.02} />
            <rect x={-0.42} y={-0.28} width={0.84} height={0.13} fill={i === 1 ? "#d94330" : "#e8a838"} />
            <circle cx={-0.2} cy={0.04} r={0.1} fill="#d98c2b" />
            <line x1={-0.04} y1={-0.02} x2={0.3} y2={-0.02} stroke="#8c6d4f" strokeWidth={0.025} />
            <line x1={-0.04} y1={0.08} x2={0.22} y2={0.08} stroke="#b89b7d" strokeWidth={0.02} />
          </g>
        ))}

        {/* Framed community charity award plaque on pillar ("gives money to good causes in public" — ribbon + heart, zero text) */}
        <g transform="translate(1.75,-1.72)">
          <rect x={-0.22} y={-0.28} width={0.44} height={0.56} rx={0.02} fill="#6e4b30" stroke={OL} strokeWidth={0.015} />
          <rect x={-0.17} y={-0.23} width={0.34} height={0.46} fill="#faf4e6" />
          <circle cx={0} cy={-0.08} r={0.075} fill="#2f6699" />
          <polygon points="0,-0.13 0.02,-0.09 0.06,-0.09 0.03,-0.06 0.04,-0.02 0,-0.045 -0.04,-0.02 -0.03,-0.06 -0.06,-0.09 -0.02,-0.09" fill="#f5cf5b" />
          <line x1={-0.11} y1={0.06} x2={0.11} y2={0.06} stroke="#8a7e6e" strokeWidth={0.015} />
          <line x1={-0.09} y1={0.13} x2={0.09} y2={0.13} stroke="#8a7e6e" strokeWidth={0.015} />
        </g>

        {/* Stainless service counter & soda fountain */}
        <rect x={-1.55} y={-1.02} width={3.1} height={1.02} fill="#c4ccd4" stroke={OL} strokeWidth={0.018} />
        <rect x={-1.58} y={-1.08} width={3.16} height={0.07} fill="#e3dad0" stroke={OL} strokeWidth={0.015} />
        <rect x={-1.25} y={-1.62} width={0.58} height={0.54} fill="#8b96a3" stroke={OL} strokeWidth={0.015} />
        {[-1.14, -1.02, -0.9, -0.78].map((nx, i) => (
          <rect key={i} x={nx} y={-1.32} width={0.06} height={0.12} fill={["#d93b2b", "#e89d2c", "#3a78b8", "#599e4c"][i]} />
        ))}

        {/* Clear acrylic community charity canister on counter endcap (blue heart emblem + donated green bills inside) */}
        <g transform="translate(1.22,-1.08)">
          <rect x={-0.11} y={-0.28} width={0.22} height={0.28} rx={0.015} fill="#e6f2fa" opacity={0.82} stroke="#2b3d4f" strokeWidth={0.01} />
          <rect x={-0.12} y={-0.31} width={0.24} height={0.04} rx={0.01} fill="#2b5c8f" stroke={OL} strokeWidth={0.008} />
          <rect x={-0.08} y={-0.09} width={0.16} height={0.07} fill="#5e8762" />
          <circle cx={0} cy={-0.18} r={0.048} fill="#d93b30" />
        </g>
      </Card>

      {/* Side walls */}
      <polygon points={sideQuad(cam, -4.8, zNear, 5.25, 0, 2.95)} fill="#e6be58" stroke={OL} strokeWidth={2} />
      <polygon points={sideQuad(cam, 4.8, zNear, 5.25, 0, 2.95)} fill="#e6be58" stroke={OL} strokeWidth={2} />
    </g>
  );
};

/** Red vinyl restaurant booth benches + warm laminate table (origin at floor center x, z) */
export const PollosBooth: React.FC<{ cam: Cam; x?: number; z?: number }> = ({
  cam, x = 0.25, z = 3.55,
}) => {
  const OL = "#21150f";
  return (
    <Card cam={cam} x={x} y={0} z={z} blur={false}>
      {/* Left red vinyl bench (seat y = -0.46m, backrest to -1.04m) */}
      <g transform="translate(-0.78,0)">
        <rect x={-0.28} y={-0.44} width={0.54} height={0.44} fill="#4a3326" stroke={OL} strokeWidth={0.012} />
        <rect x={-0.3} y={-1.06} width={0.16} height={0.64} rx={0.03} fill="#b83227" stroke={OL} strokeWidth={0.012} />
        <rect x={-0.28} y={-0.5} width={0.56} height={0.09} rx={0.025} fill="#cc3b2e" stroke={OL} strokeWidth={0.012} />
      </g>

      {/* Right red vinyl bench */}
      <g transform="translate(0.78,0) scale(-1,1)">
        <rect x={-0.28} y={-0.44} width={0.54} height={0.44} fill="#4a3326" stroke={OL} strokeWidth={0.012} />
        <rect x={-0.3} y={-1.06} width={0.16} height={0.64} rx={0.03} fill="#b83227" stroke={OL} strokeWidth={0.012} />
        <rect x={-0.28} y={-0.5} width={0.56} height={0.09} rx={0.025} fill="#cc3b2e" stroke={OL} strokeWidth={0.012} />
      </g>
    </Card>
  );
};

/** Booth tabletop + basket of golden fried chicken & striped drink cups (drawn after seated figures!) */
export const PollosTableTop: React.FC<{
  cam: Cam;
  x?: number;
  z?: number;
  hasBasket?: boolean;
  offerSlide?: number; // 0..1 cream envelope/bundle slid toward Walt (-x)
}> = ({ cam, x = 0.25, z = 3.48, hasBasket = true, offerSlide = 0 }) => {
  const OL = "#21150f";
  return (
    <Card cam={cam} x={x} y={0} z={z} blur={false}>
      {/* Central chrome pedestal & cream-gold laminate tabletop at y = -0.74m */}
      <rect x={-0.045} y={-0.72} width={0.09} height={0.72} fill="#5e6670" stroke={OL} strokeWidth={0.01} />
      <ellipse cx={0} cy={0} rx={0.28} ry={0.045} fill="#3d434a" stroke={OL} strokeWidth={0.01} />
      <rect x={-0.56} y={-0.77} width={1.12} height={0.055} rx={0.012} fill="#f2e6cc" stroke="#9e3226" strokeWidth={0.014} />

      {/* Napkin dispenser & condiments */}
      <rect x={-0.06} y={-0.91} width={0.1} height={0.14} rx={0.01} fill="#b8c2cc" stroke={OL} strokeWidth={0.008} />

      {/* Red plastic basket lined with checkered wax paper & crispy golden fried chicken pieces */}
      {hasBasket && (
        <g transform="translate(0.12,-0.77)">
          <polygon points="-0.15,0 -0.19,-0.085 0.19,-0.085 0.15,0" fill="#cf3529" stroke={OL} strokeWidth={0.01} />
          <polygon points="-0.17,-0.085 -0.12,-0.135 0,-0.085" fill="#f7f3e8" stroke={OL} strokeWidth={0.006} />
          <ellipse cx={-0.05} cy={-0.1} rx={0.075} ry={0.045} fill="#d98a2b" stroke={OL} strokeWidth={0.008} />
          <ellipse cx={0.05} cy={-0.105} rx={0.078} ry={0.048} fill="#e39836" stroke={OL} strokeWidth={0.008} />
          <ellipse cx={0} cy={-0.125} rx={0.065} ry={0.04} fill="#eda642" stroke={OL} strokeWidth={0.008} />
        </g>
      )}

      {/* Tall yellow-and-red drink cup with lid & straw */}
      <g transform="translate(-0.28,-0.77)">
        <polygon points="-0.042,0 -0.054,-0.17 0.054,-0.17 0.042,0" fill="#f5cf58" stroke={OL} strokeWidth={0.008} />
        <rect x={-0.05} y={-0.11} width={0.1} height={0.04} fill="#cf3529" />
        <rect x={-0.058} y={-0.185} width={0.116} height={0.02} rx={0.006} fill="#f2f4f7" stroke={OL} strokeWidth={0.006} />
        <line x1={0.008} y1={-0.185} x2={0.022} y2={-0.255} stroke="#cf3529" strokeWidth={0.01} />
      </g>

      {/* Neat thick cream business envelope / cash offer slid smoothly across to Walt */}
      {offerSlide > 0.01 && (
        <g transform={`translate(${0.28 - offerSlide * 0.56},-0.785)`}>
          <rect x={-0.11} y={-0.026} width={0.22} height={0.032} rx={0.005} fill="#f5ebd1" stroke="#594a34" strokeWidth={0.007} />
          <line x1={-0.09} y1={-0.012} x2={0.09} y2={-0.012} stroke="#5e8762" strokeWidth={0.008} />
        </g>
      )}
    </Card>
  );
};

export const PollosFore: React.FC = () => (
  <g pointerEvents="none">
    {/* Foreground hanging warm pendant-lamp shade top-left + potted ficus leaf silhouette bottom-right */}
    <polygon points="110,0 290,0 355,95 45,95" fill="#8f291f" stroke="#1f110d" strokeWidth={4} opacity={0.85} />
    <path
      d="M1740,1080 C1720,975 1810,910 1920,895 L1920,1080 Z"
      fill="#263822"
      opacity={0.78}
    />
  </g>
);
