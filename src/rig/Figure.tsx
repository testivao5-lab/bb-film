// Forward-kinematics character rig, drawn in METRES.
// Poses are skeleton angles, never "rotate the standing sprite". Lying, kneeling and
// falling poses are solved against the floor (lowest body surface snaps to y = 0),
// which removes the floating / half-sunk glitches of the old sprite rig.
import React from "react";
import { Head, HeadLook } from "./Head";

export interface Palette {
  skin: string; skinShade: string; skinLight: string;
  jacket: string; jacketShade: string; jacketLight: string;
  shirt: string; shirtShade: string;
  pants: string; pantsShade: string;
  shoes: string; outline: string;
}

export interface Pose {
  /** world-space torso angle in degrees: 0 = upright, -90 = lying with head to the left */
  torso: number;
  neck: number; // relative
  /** shoulder angles relative to torso, 0 = arm hanging along the body, + = forward (toward facing side) */
  shL: number; shR: number;
  elL: number; elR: number; // elbow bend (+ = forearm folds forward)
  wrL?: number; wrR?: number;
  hipL: number; hipR: number; // relative to torso, 0 = straight down, + = forward
  knL: number; knR: number; // knee bend (+ = shin folds backward)
  anL?: number; anR?: number;
  breathe?: number; // 0..1 chest expansion
  slump?: number; // 0..1 spine curve
}

export const STAND: Pose = { torso: 0, neck: 0, shL: 4, shR: -4, elL: 8, elR: 8, hipL: 2, hipR: -2, knL: 3, knR: 3 };

export interface FigureProps {
  pose: Pose;
  look: HeadLook;
  pal: Palette;
  /** 0 = front view, 1 = side profile (facing +x). Values between give 3/4 */
  view: number;
  height?: number; // metres (default 1.78)
  /** snap the lowest body surface to the floor */
  ground?: boolean;
  blood?: number; // 0..1 stain on the lower right abdomen
  bloodHand?: number; // 0..1 blood on the near hand
  rimLight?: string; // colour of the rim light
  rimSide?: 1 | -1;
}

type V = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
// direction for an angle: 0 = down (0, +1) in SVG space, rotating clockwise positive
const dirDown = (a: number): V => [-Math.sin(rad(a)), Math.cos(rad(a))];
const add = (a: V, b: V, k = 1): V => [a[0] + b[0] * k, a[1] + b[1] * k];

/** tapered limb chain: outline underlay pass, then fill pass → seamless joints */
type Seg = { a: V; b: V; w1: number; w2: number };
const segPath = ({ a, b, w1, w2 }: Seg) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const L = Math.hypot(dx, dy) || 1e-4;
  const nx = -dy / L, ny = dx / L;
  const p = (pt: V, w: number, s: number) => `${(pt[0] + nx * w * s).toFixed(4)},${(pt[1] + ny * w * s).toFixed(4)}`;
  return `M${p(a, w1 / 2, 1)} L${p(b, w2 / 2, 1)} L${p(b, w2 / 2, -1)} L${p(a, w1 / 2, -1)} Z`;
};
const Chain: React.FC<{ segs: Seg[]; fill: string; shade: string; light?: string; ol: string; olw: number; rim?: string; shadeSide?: 1 | -1 }> = ({ segs, fill, shade, light, ol, olw, rim, shadeSide = -1 }) => {
  const shapes = (extra: number, color: string) => segs.map((s, i) => (
    <g key={i} fill={color}>
      <path d={segPath({ ...s, w1: s.w1 + extra, w2: s.w2 + extra })} />
      <circle cx={s.a[0]} cy={s.a[1]} r={(s.w1 + extra) / 2} />
      <circle cx={s.b[0]} cy={s.b[1]} r={(s.w2 + extra) / 2} />
    </g>
  ));
  const band = (k: number, w: number, color: string, op: number) => segs.map((s, i) => {
    const dx = s.b[0] - s.a[0], dy = s.b[1] - s.a[1];
    const L = Math.hypot(dx, dy) || 1e-4;
    const nx = -dy / L, ny = dx / L;
    const off = (pt: V, ww: number): V => [pt[0] + nx * ww * k, pt[1] + ny * ww * k];
    const A = off(s.a, s.w1 * 0.3), B = off(s.b, s.w2 * 0.3);
    return <path key={i} d={`M${A[0]},${A[1]} L${B[0]},${B[1]}`} stroke={color} strokeWidth={Math.min(s.w1, s.w2) * w} strokeLinecap="round" opacity={op} fill="none" />;
  });
  return (
    <g>
      {shapes(olw * 2, ol)}
      {shapes(0, fill)}
      {band(shadeSide, 0.38, shade, 0.8)}
      {light && band(-shadeSide, 0.14, light, 0.5)}
      {rim && band(-shadeSide * 1.3, 0.035, rim, 0.45)}
    </g>
  );
};

const HandShape: React.FC<{ at: V; ang: number; s: number; pal: Palette; blood: number; open?: boolean; olw: number }> = ({ at, ang, s, pal, blood, olw }) => (
  <g transform={`translate(${at[0]},${at[1]}) rotate(${ang}) scale(${s})`}>
    {/* palm + fingers, pointing down (+y) */}
    <path d="M-0.032,-0.01 C-0.04,0.03 -0.036,0.07 -0.026,0.095 L-0.014,0.1 L-0.012,0.07 L-0.004,0.108 L0.006,0.108 L0.006,0.072 L0.015,0.104 L0.024,0.1 L0.022,0.066 L0.03,0.088 L0.037,0.083 C0.04,0.05 0.036,0.01 0.03,-0.012 Z"
      fill={pal.skin} stroke={pal.outline} strokeWidth={olw / s} strokeLinejoin="round" />
    <path d="M-0.032,-0.004 C-0.05,0.02 -0.052,0.045 -0.046,0.058 L-0.036,0.056 C-0.034,0.04 -0.03,0.03 -0.024,0.02 Z" fill={pal.skin} stroke={pal.outline} strokeWidth={olw / s} />
    <path d="M0.012,0.0 C0.03,0.02 0.03,0.06 0.024,0.08 L0.03,0.088 C0.04,0.05 0.036,0.01 0.03,-0.012 Z" fill={pal.skinShade} opacity={0.7} />
    {blood > 0 && <path d="M-0.03,0.02 C-0.02,0.05 0.0,0.04 0.01,0.07 C0.02,0.09 0.03,0.06 0.034,0.04 C0.03,0.01 0.0,0.0 -0.03,0.02 Z" fill="#8f1418" opacity={0.85 * blood} />}
  </g>
);

export function solveSkeleton(p: Pose, height: number, view: number) {
  const k = height / 1.78;
  const hipY = 0;
  const torsoLen = 0.56 * k * (1 - (p.slump ?? 0) * 0.06);
  const pelvis: V = [0, hipY];
  const up = dirDown(p.torso + 180);
  const chest: V = add(pelvis, up, torsoLen);
  const neckBase = chest;
  const headDir = dirDown(p.torso + p.neck + 180);
  const headC: V = add(neckBase, headDir, 0.17 * k);
  // shoulders: in front view they spread sideways, in side view they sit on the spine
  const side: V = dirDown(p.torso + 90); // perpendicular (to the right when upright)
  const spread = 0.155 * k * (1 - view * 0.92);
  const shY = add(chest, up, -0.07 * k);
  const shL: V = add(shY, side, -spread), shR: V = add(shY, side, spread);
  const hipSpread = 0.095 * k * (1 - view * 0.85);
  const hpL: V = add(pelvis, side, -hipSpread), hpR: V = add(pelvis, side, hipSpread);
  const ua = 0.3 * k, fa = 0.27 * k, th = 0.45 * k, sh = 0.44 * k;
  // forward sign: in side view facing +x, "forward" rotation is counter-clockwise for down-pointing limbs
  const fw = view > 0.5 ? -1 : 1;
  const armL = (sAng: number, eAng: number, s: V, mirror: number) => {
    const a1 = p.torso + sAng * (view > 0.5 ? fw : mirror);
    const el = add(s, dirDown(a1), ua);
    const a2 = a1 + eAng * (view > 0.5 ? fw : mirror);
    const wr = add(el, dirDown(a2), fa);
    return { s, el, wr, a2 };
  };
  const legL = (hAng: number, kAng: number, h: V, mirror: number) => {
    const a1 = p.torso + hAng * (view > 0.5 ? fw : mirror);
    const kn = add(h, dirDown(a1), th);
    const a2 = a1 - kAng * (view > 0.5 ? fw : mirror);
    const an = add(kn, dirDown(a2), sh);
    return { h, kn, an, a2 };
  };
  const L = armL(p.shL, p.elL, shL, -1), R = armL(p.shR, p.elR, shR, 1);
  const LL = legL(p.hipL, p.knL, hpL, -1), LR = legL(p.hipR, p.knR, hpR, 1);
  return { k, pelvis, chest, headC, up, side, armL: L, armR: R, legL: LL, legR: LR, torsoLen };
}

export const Figure: React.FC<FigureProps> = ({ pose, look, pal, view, height = 1.78, ground = true, blood = 0, bloodHand = 0, rimLight, rimSide = 1 }) => {
  const S = solveSkeleton(pose, height, view);
  const k = S.k;
  const olw = 0.011 * k;
  // ground contact: lowest surface point → y = 0
  let off = 0;
  if (ground) {
    const pts: [V, number][] = [
      [S.pelvis, 0.13 * k], [S.chest, 0.15 * k], [S.headC, 0.13 * k],
      [S.legL.kn, 0.07 * k], [S.legR.kn, 0.07 * k], [S.legL.an, 0.06 * k], [S.legR.an, 0.06 * k],
      [S.armL.el, 0.05 * k], [S.armR.el, 0.05 * k], [S.armL.wr, 0.04 * k], [S.armR.wr, 0.04 * k],
    ];
    off = -Math.max(...pts.map(([v, r]) => v[1] + r));
  }
  const br = pose.breathe ?? 0;
  const tw = (0.42 - view * 0.16) * k * (1 + br * 0.03); // torso width
  const torsoAng = pose.torso;
  const foot = (an: V, a2: number) => {
    if (view > 0.5) {
      // side-view shoe: heel behind the ankle, rounded toe forward, sole on the shin's perpendicular
      return (
        <g transform={`translate(${an[0]},${an[1]}) rotate(${a2})`}>
          <path d={`M${-0.05 * k},${-0.02 * k} L${-0.055 * k},${0.06 * k} L${0.2 * k},${0.065 * k} C${0.23 * k},${0.06 * k} ${0.23 * k},${0.02 * k} ${0.19 * k},${0.01 * k} C${0.12 * k},${-0.005 * k} ${0.06 * k},${-0.03 * k} ${0.04 * k},${-0.04 * k} Z`}
            fill={pal.shoes} stroke={pal.outline} strokeWidth={olw} strokeLinejoin="round" />
          <path d={`M${-0.055 * k},${0.05 * k} L${0.21 * k},${0.055 * k}`} stroke="#1a110c" strokeWidth={0.014 * k} />
        </g>
      );
    }
    return (
      <g transform={`translate(${an[0]},${an[1]}) rotate(${a2})`}>
        <path d={`M${-0.055 * k},${-0.01 * k} C${-0.065 * k},${0.05 * k} ${-0.05 * k},${0.075 * k} 0,${0.075 * k} C${0.05 * k},${0.075 * k} ${0.065 * k},${0.05 * k} ${0.055 * k},${-0.01 * k} Z`}
          fill={pal.shoes} stroke={pal.outline} strokeWidth={olw} />
        <path d={`M${-0.04 * k},${0.06 * k} Q0,${0.07 * k} ${0.04 * k},${0.06 * k}`} stroke="#fff" strokeOpacity={0.15} strokeWidth={0.01 * k} fill="none" />
      </g>
    );
  };
  const legsBehind = view > 0.5;
  const drawLeg = (lg: typeof S.legL, far: boolean) => (
    <g>
      <Chain segs={[{ a: lg.h, b: lg.kn, w1: 0.165 * k, w2: 0.125 * k }, { a: lg.kn, b: lg.an, w1: 0.125 * k, w2: 0.1 * k }]}
        fill={far ? pal.pantsShade : pal.pants} shade={pal.pantsShade} ol={pal.outline} olw={olw} rim={far ? undefined : rimLight} />
      {foot(lg.an, lg.a2)}
    </g>
  );
  const drawArm = (ar: typeof S.armL, far: boolean, bloodyHand: number) => (
    <g>
      <Chain segs={[{ a: ar.s, b: ar.el, w1: 0.115 * k, w2: 0.095 * k }, { a: ar.el, b: ar.wr, w1: 0.095 * k, w2: 0.08 * k }]}
        fill={far ? pal.jacketShade : pal.jacket} shade={pal.jacketShade} light={far ? undefined : pal.jacketLight} ol={pal.outline} olw={olw} rim={far ? undefined : rimLight} />
      <circle cx={ar.wr[0]} cy={ar.wr[1]} r={0.042 * k} fill={pal.jacketShade} stroke={pal.outline} strokeWidth={olw} />
      <HandShape at={ar.wr} ang={ar.a2} s={k} pal={pal} blood={bloodyHand} olw={olw} />
    </g>
  );

  // torso polygon in its own frame (upright, origin pelvis), then rotated by torso angle
  const TL = S.torsoLen;
  const slump = (pose.slump ?? 0) * 0.05 * k;
  const torso = (
    <g transform={`rotate(${torsoAng})`}>
      {/* jacket body */}
      <path d={`M${-tw * 0.42},${0.05 * k} C${-tw * 0.4},${-TL * 0.3} ${-tw * 0.5 - slump},${-TL * 0.6} ${-tw * 0.52},${-TL * 0.82}
                C${-tw * 0.52},${-TL * 0.93} ${-tw * 0.4},${-TL * 0.99} ${-tw * 0.16},${-TL * 1.02} Q0,${-TL * 1.04} ${tw * 0.16},${-TL * 1.02}
                C${tw * 0.4},${-TL * 0.99} ${tw * 0.52},${-TL * 0.93} ${tw * 0.52},${-TL * 0.82} C${tw * 0.5 + slump},${-TL * 0.6} ${tw * 0.4},${-TL * 0.3} ${tw * 0.42},${0.05 * k} Z`}
        fill={pal.jacket} stroke={pal.outline} strokeWidth={olw} strokeLinejoin="round" />
      {/* shading band on the shadow side */}
      <path d={`M${tw * 0.44},${0.04 * k} C${tw * 0.52},${-TL * 0.4} ${tw * 0.55},${-TL * 0.85} ${tw * 0.5},${-TL * 0.98} L${tw * 0.2},${-TL * 0.98} C${tw * 0.25},${-TL * 0.6} ${tw * 0.22},${-TL * 0.3} ${tw * 0.18},${0.04 * k} Z`} fill={pal.jacketShade} opacity={0.7} />
      {/* light band */}
      <path d={`M${-tw * 0.36},${-TL * 0.1} C${-tw * 0.42},${-TL * 0.45} ${-tw * 0.44},${-TL * 0.75} ${-tw * 0.38},${-TL * 0.92}`} stroke={pal.jacketLight} strokeWidth={0.02 * k} fill="none" opacity={0.45} strokeLinecap="round" />
      {view < 0.6 ? (
        <g>
          {/* henley shirt V + placket */}
          <path d={`M${-tw * 0.17},${-TL * 0.99} L0,${-TL * 0.7} L${tw * 0.17},${-TL * 0.99} Z`} fill={pal.shirt} stroke={pal.outline} strokeWidth={olw * 0.8} />
          <path d={`M0,${-TL * 0.95} L0,${-TL * 0.78}`} stroke={pal.shirtShade} strokeWidth={0.008 * k} />
          <circle cx={0} cy={-TL * 0.9} r={0.006 * k} fill={pal.shirtShade} />
          <circle cx={0} cy={-TL * 0.83} r={0.006 * k} fill={pal.shirtShade} />
          {/* collar / lapels of the work jacket */}
          <path d={`M${-tw * 0.18},${-TL * 1.0} L${-tw * 0.3},${-TL * 0.76} L${-tw * 0.06},${-TL * 0.62} L0,${-TL * 0.7} Z`} fill={pal.jacketLight} stroke={pal.outline} strokeWidth={olw * 0.8} strokeLinejoin="round" />
          <path d={`M${tw * 0.18},${-TL * 1.0} L${tw * 0.3},${-TL * 0.76} L${tw * 0.06},${-TL * 0.62} L0,${-TL * 0.7} Z`} fill={pal.jacket} stroke={pal.outline} strokeWidth={olw * 0.8} strokeLinejoin="round" />
          {/* zip line + chest pockets with flaps */}
          <path d={`M0,${-TL * 0.62} L0,${0.03 * k}`} stroke={pal.jacketShade} strokeWidth={0.01 * k} />
          <path d={`M${-tw * 0.36},${-TL * 0.58} h${tw * 0.24} v${0.07 * k} h${-tw * 0.24} Z`} fill={pal.jacketShade} stroke={pal.outline} strokeWidth={olw * 0.6} />
          <path d={`M${tw * 0.12},${-TL * 0.58} h${tw * 0.24} v${0.07 * k} h${-tw * 0.24} Z`} fill={pal.jacketShade} stroke={pal.outline} strokeWidth={olw * 0.6} />
          {/* hem band */}
          <path d={`M${-tw * 0.44},${-0.01 * k} L${tw * 0.44},${-0.01 * k}`} stroke={pal.jacketShade} strokeWidth={0.03 * k} />
        </g>
      ) : (
        <g>
          {/* side view: collar at the back of neck, front placket, pocket */}
          <path d={`M${tw * 0.1},${-TL * 1.0} L${tw * 0.42},${-TL * 0.92} L${tw * 0.3},${-TL * 0.72} Z`} fill={pal.shirt} stroke={pal.outline} strokeWidth={olw * 0.7} />
          <path d={`M${-tw * 0.35},${-TL * 1.02} Q${-tw * 0.1},${-TL * 0.9} ${tw * 0.12},${-TL * 1.02} L${tw * 0.05},${-TL * 0.9} Q${-tw * 0.15},${-TL * 0.84} ${-tw * 0.4},${-TL * 0.92} Z`} fill={pal.jacketLight} stroke={pal.outline} strokeWidth={olw * 0.7} />
          <path d={`M${tw * 0.42},${-TL * 0.72} L${tw * 0.44},${0.03 * k}`} stroke={pal.jacketShade} strokeWidth={0.012 * k} />
          <path d={`M${tw * 0.05},${-TL * 0.55} h${tw * 0.3} v${0.075 * k} h${-tw * 0.3} Z`} fill={pal.jacketShade} stroke={pal.outline} strokeWidth={olw * 0.6} />
          <path d={`M${-tw * 0.44},${-0.01 * k} L${tw * 0.44},${-0.01 * k}`} stroke={pal.jacketShade} strokeWidth={0.03 * k} />
        </g>
      )}
      {/* gunshot wound stain, lower right abdomen (grows with `blood`) */}
      {blood > 0 && (
        <g>
          <ellipse cx={tw * (view > 0.5 ? 0.25 : 0.2)} cy={-TL * 0.25} rx={0.03 * k + 0.09 * k * blood} ry={0.035 * k + 0.12 * k * blood} fill="#5e0c12" opacity={0.92} />
          <ellipse cx={tw * (view > 0.5 ? 0.22 : 0.17)} cy={-TL * 0.27} rx={0.02 * k + 0.05 * k * blood} ry={0.025 * k + 0.07 * k * blood} fill="#8d1519" opacity={0.95} />
          <path d={`M${tw * 0.2},${-TL * 0.2} q${0.01 * k},${0.1 * k * blood} ${-0.005 * k},${0.18 * k * blood}`} stroke="#6d0f14" strokeWidth={0.014 * k} fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* rim light along the back edge */}
      {rimLight && <path d={`M${-tw * 0.47 * rimSide},${-TL * 0.95} C${-tw * 0.53 * rimSide},${-TL * 0.6} ${-tw * 0.5 * rimSide},${-TL * 0.3} ${-tw * 0.43 * rimSide},${0}`} stroke={rimLight} strokeWidth={0.012 * k} fill="none" strokeLinecap="round" opacity={0.85} />}
      {/* neck */}
      <path d={`M${-0.045 * k},${-TL * 0.98} L${-0.04 * k},${-TL * 1.1} L${0.045 * k},${-TL * 1.1} L${0.05 * k},${-TL * 0.98} Z`} fill={pal.skinShade} stroke={pal.outline} strokeWidth={olw * 0.7} />
    </g>
  );

  const head = (
    <g transform={`translate(${S.headC[0]},${S.headC[1]}) rotate(${pose.torso + pose.neck})`}>
      <Head look={look} pal={pal} yaw={look.yaw ?? view} k={k} rim={rimLight} />
    </g>
  );
  const nearIsRight = true;
  return (
    <g transform={`translate(0,${off.toFixed(4)})`}>
      {legsBehind ? (
        <>
          {drawArm(S.armL, true, 0)}
          {drawLeg(S.legL, true)}
          {drawLeg(S.legR, false)}
          {torso}
          {head}
          {drawArm(S.armR, false, bloodHand)}
        </>
      ) : (
        <>
          {drawLeg(S.legL, false)}
          {drawLeg(S.legR, false)}
          {torso}
          {drawArm(S.armL, false, 0)}
          {drawArm(S.armR, false, bloodHand)}
          {head}
        </>
      )}
      {nearIsRight ? null : null}
    </g>
  );
};
