// Parametric head. Features sit on a virtual sphere so yaw (0 = front, 1 = profile → +x)
// turns the face believably instead of sliding stickers. Drawn in "design units"
// (head ≈ 100 du tall) and scaled to metres.
import React from "react";
import type { Palette } from "./Figure";

export type Mouth = "neutral" | "open" | "pain" | "smile" | "gasp" | "flat" | "laugh" | "scream";
export interface HeadLook {
  yaw?: number;
  /** 0..1 eyelid closure */
  lids: number;
  /** -1..1 pupil direction */
  lookX: number; lookY: number;
  brow: number; // -1 sad/worried … 0 neutral … 1 angry/stern
  mouth: Mouth;
  mouthOpen?: number; // 0..1 (breathing / speech)
  sweat?: number;
  bloodLip?: number;
  hair: HairDef;
  glasses?: boolean;
  stubble?: number;
  /** 0 = young (no wrinkles) … 1 = fifty-ish (default) */
  age?: number;
  tears?: number; // 0..1 wet eyes + running tear
  bruise?: number; // 0..1 bruise under the near eye + split lip
  dirt?: number; // 0..1 grime smudges
  /** facial hair */
  beard?: "none" | "mustache" | "trim";
  lipstick?: string;
}
export interface HairDef { base: string; dark: string; light: string; style?: "swept" | "curls" | "long" | "buzz" | "sidepart"; }

const DU = 0.003; // metres per design unit (head ≈ 0.27 m)

export const Head: React.FC<{ look: HeadLook; pal: Palette; yaw: number; k: number; rim?: string }> = ({ look, pal, yaw, k, rim }) => {
  const ya = Math.max(0, Math.min(1, yaw)) * (Math.PI / 2);
  const age = look.age ?? 1;
  const tears = look.tears ?? 0;
  const R = 40; // face sphere radius
  const sx = (theta: number) => R * Math.sin(theta + ya); // screen x of a feature at angle theta
  const vis = (theta: number) => Math.cos(theta + ya); // >0 visible
  const ol = pal.outline;
  const ow = 2.6;
  const eyeY = -2, browY = -14, noseY = 12, mouthY = 27;
  const eye = (theta: number) => {
    const v = vis(theta);
    if (v < 0.08) return null;
    const x = sx(theta);
    const w = 7.5 * Math.max(0.35, v), h = 6.2;
    const lid = Math.max(0, Math.min(1, look.lids));
    const px = x + look.lookX * 3 * v + (yaw > 0.3 ? 1.5 : 0), py = eyeY + look.lookY * 2.2;
    return (
      <g key={theta}>
        <ellipse cx={x} cy={eyeY} rx={w} ry={h} fill="#f6f1e8" stroke={ol} strokeWidth={ow * 0.7} />
        <circle cx={px} cy={py} r={3.4 * Math.max(0.5, v)} fill="#3b2a1e" />
        <circle cx={px} cy={py} r={1.6 * Math.max(0.5, v)} fill="#0e0907" />
        <circle cx={px + 1.1} cy={py - 1.2} r={0.9} fill="#fff" opacity={0.9} />
        {/* upper lid (heavy, tired) */}
        <path d={`M${x - w - 0.5},${eyeY - h * 0.2} Q${x},${eyeY - h - 1.2} ${x + w + 0.5},${eyeY - h * 0.2} L${x + w + 0.5},${eyeY - h * 1.3 + lid * h * 2.2} Q${x},${eyeY - h * 1.6 + lid * h * 2.6} ${x - w - 0.5},${eyeY - h * 1.3 + lid * h * 2.2} Z`}
          fill={pal.skin} stroke="none" />
        <path d={`M${x - w},${eyeY - h * 0.25 + lid * h * 1.0} Q${x},${eyeY - h - 0.4 + lid * h * 1.9} ${x + w},${eyeY - h * 0.25 + lid * h * 1.0}`} stroke={ol} strokeWidth={ow * 0.8} fill="none" strokeLinecap="round" />
        {/* lower bag line */}
        <path d={`M${x - w * 0.8},${eyeY + h + 1.8} Q${x},${eyeY + h + 3.4} ${x + w * 0.8},${eyeY + h + 1.8}`} stroke={pal.skinShade} strokeWidth={1.3} fill="none" opacity={0.25 + 0.75 * age} />
        {/* wet lower lid when crying */}
        {tears > 0 && <path d={`M${x - w * 0.85},${eyeY + h * 0.55} Q${x},${eyeY + h + 1.2} ${x + w * 0.85},${eyeY + h * 0.55}`} stroke="#e8f6ff" strokeWidth={1.4} fill="none" opacity={0.8 * tears} />}
        {/* crow's feet */}
        {v > 0.5 && age > 0.4 && <path d={`M${x + (theta > 0 ? 1 : -1) * (w + 2)},${eyeY - 1} l${(theta > 0 ? 1 : -1) * 3.5},-1.5 M${x + (theta > 0 ? 1 : -1) * (w + 2)},${eyeY + 1.5} l${(theta > 0 ? 1 : -1) * 3.5},1.2`} stroke={pal.skinShade} strokeWidth={1} />}
      </g>
    );
  };
  const brow = (theta: number) => {
    const v = vis(theta);
    if (v < 0.1) return null;
    const x = sx(theta);
    const side = theta < 0 ? -1 : 1;
    const inner = -look.brow * 3.2; // angry pulls inner end down, sad lifts it
    return (
      <path key={`b${theta}`} d={`M${x - 9 * v * side * -1 * side},${browY + (side < 0 ? 0 : inner)} Q${x},${browY - 3} ${x + 9 * v},${browY + (side < 0 ? inner : 0)}`}
        stroke={look.hair.dark} strokeWidth={4.2} strokeLinecap="round" fill="none" />
    );
  };
  // face silhouette: cranium + jaw that shifts toward the facing side
  const fx = Math.sin(ya) * 7;
  const faceD = `M${-36 + fx * 0.3},-20 C${-40 + fx * 0.2},10 ${-30 + fx},40 ${-6 + fx * 1.4},50 C${6 + fx * 1.8},53 ${22 + fx * 2.2},44 ${30 + fx * 1.6},30 C${40 + fx},10 ${40 + fx * 0.6},-20 ${36},-30 C26,-56 -26,-56 ${-36 + fx * 0.3},-20 Z`;
  // nose protrudes with yaw
  const nv = vis(0);
  const nx = sx(0);
  const noseOut = Math.sin(ya) * 11;
  const mouthW = 11 * Math.max(0.25, Math.cos(ya));
  const mo = look.mouthOpen ?? 0;
  let mouth: React.ReactNode;
  const mx = sx(0) - Math.sin(ya) * 2;
  switch (look.mouth) {
    case "open":
    case "gasp":
      mouth = <ellipse cx={mx} cy={mouthY + 1} rx={mouthW * 0.6} ry={2 + mo * 5} fill="#3a1416" stroke={ol} strokeWidth={ow * 0.7} />;
      break;
    case "pain":
      mouth = <path d={`M${mx - mouthW},${mouthY + 2} Q${mx},${mouthY - 2 - mo * 2} ${mx + mouthW},${mouthY + 2} Q${mx},${mouthY + 4 + mo * 5} ${mx - mouthW},${mouthY + 2} Z`} fill="#3a1416" stroke={ol} strokeWidth={ow * 0.7} strokeLinejoin="round" />;
      break;
    case "smile":
      mouth = <path d={`M${mx - mouthW},${mouthY} Q${mx},${mouthY + 4} ${mx + mouthW},${mouthY - 1.5}`} stroke={ol} strokeWidth={ow} fill="none" strokeLinecap="round" />;
      break;
    case "flat":
      mouth = <path d={`M${mx - mouthW},${mouthY + 1} L${mx + mouthW},${mouthY + 1}`} stroke={ol} strokeWidth={ow} strokeLinecap="round" />;
      break;
    case "laugh":
      // wide open D-shape, upper teeth showing, cheeks pushed up
      mouth = (
        <g>
          <path d={`M${mx - mouthW * 1.25},${mouthY - 1} Q${mx},${mouthY - 3} ${mx + mouthW * 1.25},${mouthY - 1.5} Q${mx + mouthW * 0.6},${mouthY + 6 + mo * 9} ${mx},${mouthY + 7 + mo * 9} Q${mx - mouthW * 0.6},${mouthY + 6 + mo * 9} ${mx - mouthW * 1.25},${mouthY - 1} Z`} fill="#3a1416" stroke={ol} strokeWidth={ow * 0.7} strokeLinejoin="round" />
          <path d={`M${mx - mouthW * 1.05},${mouthY - 0.6} Q${mx},${mouthY - 2.4} ${mx + mouthW * 1.05},${mouthY - 1.1} L${mx + mouthW * 0.9},${mouthY + 2} Q${mx},${mouthY + 1} ${mx - mouthW * 0.9},${mouthY + 2.4} Z`} fill="#f3eee4" />
          <ellipse cx={mx} cy={mouthY + 4.5 + mo * 7} rx={mouthW * 0.5} ry={1.6 + mo * 1.5} fill="#b5464c" opacity={0.9} />
        </g>
      );
      break;
    case "scream":
      mouth = (
        <g>
          <path d={`M${mx - mouthW * 0.95},${mouthY - 2} Q${mx},${mouthY - 5} ${mx + mouthW * 0.95},${mouthY - 2} Q${mx + mouthW * 1.05},${mouthY + 8 + mo * 8} ${mx},${mouthY + 11 + mo * 9} Q${mx - mouthW * 1.05},${mouthY + 8 + mo * 8} ${mx - mouthW * 0.95},${mouthY - 2} Z`} fill="#2e0f12" stroke={ol} strokeWidth={ow * 0.7} strokeLinejoin="round" />
          <path d={`M${mx - mouthW * 0.8},${mouthY - 1.8} Q${mx},${mouthY - 4} ${mx + mouthW * 0.8},${mouthY - 1.8} L${mx + mouthW * 0.7},${mouthY + 0.6} Q${mx},${mouthY - 0.8} ${mx - mouthW * 0.7},${mouthY + 0.6} Z`} fill="#efe9dc" />
          <ellipse cx={mx} cy={mouthY + 7 + mo * 7} rx={mouthW * 0.55} ry={2 + mo * 2} fill="#a83f46" />
        </g>
      );
      break;
    default:
      mouth = <path d={`M${mx - mouthW},${mouthY + 1} Q${mx},${mouthY + 2.2 - mo * 1.5} ${mx + mouthW},${mouthY + 0.5}`} stroke={ol} strokeWidth={ow} fill="none" strokeLinecap="round" />;
  }
  const H = look.hair;
  const curls = H.style === "curls";
  const earTheta = -Math.PI / 2 + 0.15;
  const earV = Math.sin(ya); // ear on the far-from-face side becomes visible with yaw
  const earX = -R * Math.sin(ya) * 0.75 + (1 - Math.sin(ya)) * -38;
  return (
    <g transform={`scale(${DU * k / 1}) translate(0,-6)`}>
      {/* back hair volume */}
      {H.style === "long" && <path d={`M-46,-10 C-56,-50 -30,-66 2,-66 C36,-66 58,-48 48,-8 C54,30 52,62 40,78 C30,70 30,40 34,20 L-34,20 C-30,44 -32,70 -44,78 C-56,60 -56,26 -46,-10 Z`} fill={H.dark} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />}
      {H.style === "long" || H.style === "buzz" || H.style === "sidepart" ? null : curls ? <g>
          <path d={curlPath(54, 58, -2, 17, 5.5, 4)} fill={H.dark} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
          {/* nape curls hanging behind the ear */}
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={-40 + i * 7 - Math.sin(ya) * 6} cy={14 + (i % 2) * 7} r={8} fill={H.dark} />)}
        </g>
        : <path d={`M-40,-8 C-48,-40 -30,-62 2,-62 C34,-62 50,-42 44,-10 C40,-20 30,-26 20,-28 C0,-34 -20,-30 -40,-8 Z`} fill={H.dark} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />}
      {/* far ear in front view */}
      {yaw < 0.4 && <ellipse cx={39} cy={2} rx={6} ry={10} fill={pal.skinShade} stroke={ol} strokeWidth={ow * 0.8} />}
      {/* face */}
      <path d={faceD} fill={pal.skin} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
      {/* shade side + jaw shadow */}
      <path d={`M${-36 + fx * 0.3},-20 C${-40 + fx * 0.2},10 ${-30 + fx},40 ${-6 + fx * 1.4},50 C${-14 + fx},40 ${-24 + fx * 0.5},16 ${-26},-18 Z`} fill={pal.skinShade} opacity={0.55} />
      <path d={`M${-20 + fx},44 C${-6 + fx * 1.4},52 ${12 + fx * 1.8},50 ${26 + fx * 1.6},36`} stroke={pal.skinShade} strokeWidth={4} fill="none" opacity={0.5} />
      {/* stubble */}
      {(look.stubble ?? 0) > 0 && <path d={`M${-30 + fx},20 C${-26 + fx},40 ${-6 + fx * 1.4},50 ${0 + fx * 1.6},50 C${16 + fx * 2},50 ${28 + fx * 1.6},34 ${32 + fx},18 C${20 + fx},30 ${-18 + fx},30 ${-30 + fx},20 Z`} fill="#6f6a72" opacity={0.22 * (look.stubble ?? 0)} />}
      {/* cheek light */}
      <ellipse cx={sx(0.5) + 4} cy={14} rx={8} ry={5} fill={pal.skinLight} opacity={0.4 * vis(0.5)} />
      {/* near ear (profile) */}
      {yaw >= 0.4 && (
        <g>
          <path d={`M${earX - 5},-6 C${earX - 10},-2 ${earX - 9},14 ${earX - 2},18 C${earX + 4},18 ${earX + 6},4 ${earX + 3},-6 C${earX + 1},-10 ${earX - 3},-10 ${earX - 5},-6 Z`} fill={pal.skin} stroke={ol} strokeWidth={ow * 0.8} />
          <path d={`M${earX - 2},-2 C${earX - 5},4 ${earX - 3},10 ${earX},12`} stroke={pal.skinShade} strokeWidth={1.6} fill="none" />
        </g>
      )}
      {yaw < 0.4 && <ellipse cx={-39 + fx * 0.3} cy={2} rx={6} ry={10} fill={pal.skin} stroke={ol} strokeWidth={ow * 0.8} />}
      {/* forehead lines */}
      <path d={`M${sx(-0.3)},-26 Q${sx(0)},-28 ${sx(0.3)},-26 M${sx(-0.25)},-31 Q${sx(0)},-33 ${sx(0.25)},-31`} stroke={pal.skinShade} strokeWidth={1.1} fill="none" opacity={0.8 * age} />
      {/* eyes and brows */}
      {eye(-0.42)}
      {eye(0.42)}
      {brow(-0.42)}
      {brow(0.42)}
      {/* nose: long with a slight bump */}
      {nv > -0.2 && (
        <g>
          <path d={`M${nx - 2},${eyeY + 2} C${nx + noseOut * 0.6 - 1},${noseY - 6} ${nx + noseOut + 4},${noseY + 2} ${nx + noseOut + 2},${noseY + 6} C${nx + noseOut - 2},${noseY + 9} ${nx - 4},${noseY + 9} ${nx - 6 + noseOut * 0.2},${noseY + 6}`}
            fill={pal.skin} stroke={ol} strokeWidth={ow * 0.8} strokeLinejoin="round" strokeLinecap="round" />
          <path d={`M${nx - 3 + noseOut * 0.3},${noseY + 6.5} q2,1.5 4,0`} stroke={pal.skinShade} strokeWidth={1.4} fill="none" />
          {/* nasolabial folds */}
          <path d={`M${nx - 10 + noseOut * 0.2},${noseY + 6} Q${nx - 14},${mouthY - 4} ${nx - 13},${mouthY + 3}`} stroke={pal.skinShade} strokeWidth={1.3} fill="none" opacity={0.25 + 0.65 * age} />
          {yaw < 0.6 && <path d={`M${nx + 10 + noseOut * 0.4},${noseY + 6} Q${nx + 14},${mouthY - 4} ${nx + 13},${mouthY + 3}`} stroke={pal.skinShade} strokeWidth={1.3} fill="none" opacity={0.25 + 0.65 * age} />}
        </g>
      )}
      {mouth}
      {look.lipstick && look.mouth !== "open" && look.mouth !== "laugh" && look.mouth !== "scream" && <path d={`M${mx - mouthW},${mouthY + 1} Q${mx},${mouthY + 4} ${mx + mouthW},${mouthY + 0.5}`} stroke={look.lipstick} strokeWidth={ow * 1.4} fill="none" strokeLinecap="round" opacity={0.85} />}
      {look.beard === "mustache" && <path d={`M${mx - mouthW - 3},${mouthY - 2} Q${mx},${mouthY - 9} ${mx + mouthW + 3},${mouthY - 2} Q${mx},${mouthY - 4} ${mx - mouthW - 3},${mouthY - 2} Z`} fill={H.dark} stroke={ol} strokeWidth={ow * 0.6} />}
      {look.beard === "trim" && <path d={`M${-30 + fx},18 C${-26 + fx},42 ${-6 + fx * 1.4},52 ${fx * 1.6},52 C${16 + fx * 2},52 ${28 + fx * 1.6},36 ${32 + fx},18 C${24 + fx},34 ${12 + fx},40 ${mx + mouthW + 2},${mouthY + 5} Q${mx},${mouthY + 9} ${mx - mouthW - 2},${mouthY + 5} C${-14 + fx},40 ${-24 + fx},32 ${-30 + fx},18 Z`} fill={H.dark} opacity={0.75} />}
      {(look.bloodLip ?? 0) > 0 && <path d={`M${mx + mouthW * 0.6},${mouthY + 2} q1,6 -1,${4 + 10 * (look.bloodLip ?? 0)}`} stroke="#7d1116" strokeWidth={2.2} fill="none" strokeLinecap="round" />}
      {(look.sweat ?? 0) > 0 && <path d={`M${sx(-0.6)},-22 q-2,4 0,6 q2,-2 0,-6 Z`} fill="#cfe6ff" opacity={0.8 * (look.sweat ?? 0)} />}
      {/* glasses: thin round wire frames (original design – not rectangular) */}
      {look.glasses && (
        <g>
          {[-0.42, 0.42].map((t) => (vis(t) > 0.08 ? <circle key={t} cx={sx(t)} cy={eyeY} r={10.5} rx={10.5 * Math.max(0.35, vis(t))} fill="#bcd8ff" fillOpacity={0.08} stroke="#3a2c24" strokeWidth={1.8} transform={`translate(${sx(t)},${eyeY}) scale(${Math.max(0.35, vis(t))},1) translate(${-sx(t)},${-eyeY})`} /> : null))}
          {vis(0) > 0 && <path d={`M${sx(-0.18)},${eyeY - 2} Q${sx(0)},${eyeY - 5} ${sx(0.18)},${eyeY - 2}`} stroke="#3a2c24" strokeWidth={1.8} fill="none" />}
          <path d={`M${sx(0.42) + 10 * Math.max(0.35, vis(0.42))},${eyeY - 2} L${yaw > 0.4 ? earX + 2 : 38},${eyeY - 4}`} stroke="#3a2c24" strokeWidth={1.6} />
          <path d={`M${sx(0.42) - 4},${eyeY - 6} l3,-2`} stroke="#fff" strokeWidth={1.4} opacity={0.7} />
        </g>
      )}
      {/* bruise, split lip, grime, tears (storytelling damage) */}
      {(look.bruise ?? 0) > 0 && <g opacity={look.bruise}>
        <ellipse cx={sx(0.42) + 1} cy={eyeY + 9} rx={8 * Math.max(0.4, vis(0.42))} ry={4.5} fill="#7a4a6e" opacity={0.55} />
        <ellipse cx={sx(0.42) + 2} cy={eyeY + 10} rx={4.5 * Math.max(0.4, vis(0.42))} ry={2.4} fill="#a0576a" opacity={0.45} />
        <path d={`M${mx + mouthW * 0.3},${mouthY - 1} l1.2,4`} stroke="#8a1b22" strokeWidth={1.8} strokeLinecap="round" />
        <path d={`M${sx(-0.55)},-26 l5,3`} stroke="#8a1b22" strokeWidth={1.4} strokeLinecap="round" opacity={0.8} />
      </g>}
      {(look.dirt ?? 0) > 0 && <g opacity={0.35 * (look.dirt ?? 0)} fill="#4a3a2c">
        <ellipse cx={sx(-0.75)} cy={18} rx={7} ry={4} /><ellipse cx={sx(0.2)} cy={-30} rx={9} ry={3} /><ellipse cx={sx(0.65)} cy={36} rx={5} ry={3} />
      </g>}
      {tears > 0 && [-0.42, 0.42].map((t) => vis(t) > 0.15 ? (
        <path key={`t${t}`} d={`M${sx(t) + (t > 0 ? 3 : -3)},${eyeY + 6} q${t > 0 ? 2 : -2},${10 * tears} ${t > 0 ? 1 : -1},${22 * tears}`} stroke="#d9efff" strokeWidth={2.2} fill="none" strokeLinecap="round" opacity={0.75 * tears} />
      ) : null)}
      {H.style === "long" ? (
        <g>
          {/* front hair: shoulder-length waves, parted off-centre, framing the face */}
          <path d={`M-42,-10 C-48,-46 -22,-62 6,-60 C34,-58 50,-40 44,-8 C40,-22 30,-36 14,-40 C2,-30 -16,-26 -30,-22 C-36,-18 -40,-14 -42,-10 Z`} fill={H.base} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
          <path d={`M-40,-30 C-52,0 -50,36 -40,58 C-34,50 -30,40 -30,30 C-34,10 -34,-8 -30,-24 Z M42,-28 C54,2 52,36 42,58 C36,50 32,40 32,30 C36,10 36,-8 32,-22 Z`} fill={H.base} stroke={ol} strokeWidth={ow * 0.8} strokeLinejoin="round" />
          <path d={`M-20,-50 C-4,-58 18,-56 32,-44 M-36,-24 C-24,-36 -8,-40 8,-40`} stroke={H.light} strokeWidth={2.6} fill="none" opacity={0.6} strokeLinecap="round" />
          <path d={`M-40,0 q4,16 0,32 M42,0 q-4,16 0,32`} stroke={H.dark} strokeWidth={1.6} fill="none" opacity={0.8} />
        </g>
      ) : H.style === "buzz" ? (
        <g>
          {/* close buzz cut: thin cap following the skull, stipple texture */}
          <path d={`M-38,-16 C-42,-46 -18,-58 4,-58 C28,-58 44,-44 40,-16 C34,-30 22,-40 4,-42 C-14,-42 -30,-32 -38,-16 Z`} fill={H.base} opacity={0.85} />
          {Array.from({ length: 26 }).map((_, i) => <circle key={i} cx={-30 + (i * 37) % 64} cy={-50 + ((i * 13) % 22)} r={0.9} fill={H.dark} opacity={0.6} />)}
        </g>
      ) : H.style === "sidepart" ? (
        <g>
          {/* neat short side part, groomed */}
          <path d={`M-39,-12 C-44,-48 -18,-62 8,-60 C32,-58 46,-44 41,-12 C38,-26 30,-36 18,-40 L-10,-44 C-24,-40 -34,-28 -39,-12 Z`} fill={H.base} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
          <path d={`M-12,-58 C-14,-50 -12,-46 -10,-44`} stroke={H.dark} strokeWidth={2} fill="none" />
          <path d={`M-6,-56 C10,-58 26,-52 34,-40`} stroke={H.light} strokeWidth={2.6} fill="none" opacity={0.6} strokeLinecap="round" />
        </g>
      ) : curls ? (
        <g>
          {/* front hair: original messy dark curls, fringe falling over the forehead */}
          <path d={curlPath(50, 54, -16, 15, 6, 8)} fill={H.base} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
          {Array.from({ length: 6 }).map((_, i) => { const a = Math.PI * (1.08 + i * 0.16); return <circle key={`c${i}`} cx={Math.cos(a) * 44} cy={-16 + Math.sin(a) * 50} r={9} fill={H.base} />; })}
          <path d={`M-30,-30 q6,10 12,2 q5,9 12,1 q6,9 12,0 q6,8 12,1`} fill={H.base} stroke={ol} strokeWidth={ow * 0.8} strokeLinejoin="round" />
          {Array.from({ length: 9 }).map((_, i) => { const a = Math.PI * (1.12 + i * 0.095); return <path key={i} d={`M${Math.cos(a) * 34},${-18 + Math.sin(a) * 36} q3,-4 6,0`} stroke={H.light} strokeWidth={2} fill="none" opacity={0.55} strokeLinecap="round" />; })}
          {Array.from({ length: 7 }).map((_, i) => { const a = Math.PI * (1.15 + i * 0.12); return <path key={`d${i}`} d={`M${Math.cos(a) * 26},${-16 + Math.sin(a) * 28} q2,3 5,1`} stroke={H.dark} strokeWidth={1.6} fill="none" opacity={0.8} strokeLinecap="round" />; })}
        </g>
      ) : (<g>
      {/* front hair: swept back, salt & pepper, receding at the temples */}
      <path d={`M-38,-14 C-44,-46 -20,-60 6,-58 C30,-57 46,-44 42,-14 C38,-26 34,-34 24,-38 C14,-42 4,-38 -4,-42 C-14,-46 -26,-40 -32,-30 C-35,-24 -37,-20 -38,-14 Z`}
        fill={H.base} stroke={ol} strokeWidth={ow} strokeLinejoin="round" />
      <path d={`M-28,-36 C-14,-50 10,-54 30,-44 M-20,-44 C-4,-54 16,-54 34,-38 M-32,-26 C-24,-38 -10,-42 0,-44`} stroke={H.dark} strokeWidth={1.8} fill="none" opacity={0.8} />
      <path d={`M-22,-48 C-8,-56 12,-56 26,-48`} stroke={H.light} strokeWidth={3} fill="none" opacity={0.6} strokeLinecap="round" />
      {/* sideburn */}
      <path d={`M${yaw > 0.4 ? earX + 5 : -37},-14 l${yaw > 0.4 ? 4 : 3},16 l3,-1 l-1,-15 Z`} fill={H.dark} />
      {rim && <path d={`M-40,-10 C-46,-40 -24,-60 4,-60`} stroke={rim} strokeWidth={2.4} fill="none" opacity={0.85} strokeLinecap="round" />}
      </g>)}
    </g>
  );
};

/** scalloped cap outline for curly hair: arc from the left temple over the crown to the right temple */
function curlPath(rx: number, ry: number, cy: number, n: number, bump: number, lowY: number) {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const a = Math.PI * (0.98 + (i / n) * 1.04);
    const r = 1 + (i % 2 ? 0 : bump / rx);
    const x = Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
    if (i === 0) d += `M${x.toFixed(1)},${(y + lowY).toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}`;
    else {
      const am = Math.PI * (0.98 + ((i - 0.5) / n) * 1.04);
      const qx = Math.cos(am) * rx * (1 + 1.6 * bump / rx), qy = cy + Math.sin(am) * ry * (1 + 1.6 * bump / rx);
      d += ` Q${qx.toFixed(1)},${qy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    }
  }
  const xe = Math.cos(Math.PI * 2.02) * rx;
  d += ` L${xe.toFixed(1)},${(cy + lowY).toFixed(1)} Q0,${cy - ry * 0.55} ${(Math.cos(Math.PI * 0.98) * rx).toFixed(1)},${(cy + lowY).toFixed(1)} Z`;
  return d;
}
