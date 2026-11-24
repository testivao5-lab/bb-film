// SCENE 055 · "tomas" · street — the corner where two of the distributor's men use a child
// for the drops. Revised per lead QA round 1: heroes fill 1/3–2/3 frame height, 3 depth
// layers per shot, foreground silhouettes, light pools, ambient life. Word-synced beats.
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, easeOut, kf, lerp, noise1, prog } from "../../lib/anim";
import { Figure, Pose, STAND, solveSkeleton } from "../../rig/Figure";
import type { HeadLook } from "../../rig/Head";
import { PARTNER, partnerLook } from "../../rig/cast";
import { CNightStreet, CStorefront, CPowerPole, CWires, CParkedCar, CSidewalkBits, CNearFG, CWarmPool, CNightHaze, CMoths } from "../../env/c_street";
import { CSoftDefs, CDust, CShadow } from "../../env/c_common";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 55, id: "tomas", set: "street", cutIn: 900.5, cutOut: 918.5 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  corner: beat(902.10), knows: beat(903.46), men: beat(904.34), work: beat(905.32),
  use: beat(906.34), make: beat(907.24), drops: beat(907.48),
  cutB: beat(907.70), name: beat(908.48), tomas: beat(909.24), eleven: beat(910.34),
  cutC: beat(910.50), jesse: beat(911.28), cannot: beat(911.54), alone: beat(912.48),
  cutD: beat(913.52), shoot: beat(913.98), both: beat(914.34), spot: beat(915.14), night: beat(916.24),
  cutE: beat(916.50), die: beat(916.94), doing: beat(917.34), it: beat(917.76), end: beat(918.5),
};

/* ── original extras (same rig, varied palettes/hair) ── */
const D1PAL = { skin: "#bc896c", skinShade: "#895e4b", skinLight: "#d7a78b", jacket: "#564d49", jacketShade: "#3b3535", jacketLight: "#74655e", shirt: "#aa8770", shirtShade: "#745946", pants: "#3d4851", pantsShade: "#2c353d", shoes: "#282426", outline: "#1b1717" };
const D2PAL = { skin: "#dbb08b", skinShade: "#ae8065", skinLight: "#f1c6a3", jacket: "#384556", jacketShade: "#263441", jacketLight: "#556679", shirt: "#c3b390", shirtShade: "#95866a", pants: "#44454a", pantsShade: "#2f3035", shoes: "#282426", outline: "#181514" };
const KPAL = { skin: "#c7916e", skinShade: "#9a654d", skinLight: "#e1ad89", jacket: "#957744", jacketShade: "#71582f", jacketLight: "#b59b66", shirt: "#ddd6c5", shirtShade: "#aaa394", pants: "#4b5965", pantsShade: "#303b47", shoes: "#34302c", outline: "#211a17" };
const darkHair: HeadLook["hair"] = { base: "#25211f", dark: "#141313", light: "#514038", style: "buzz" };
const kidHair: HeadLook["hair"] = { base: "#2c211c", dark: "#161312", light: "#63402c", style: "swept" };
const dLook = (o: Partial<HeadLook> = {}): HeadLook => ({ lids: .18, lookX: 0, lookY: 0, brow: .25, mouth: "flat", hair: darkHair, glasses: false, stubble: .6, age: .36, ...o });
const kidLook = (o: Partial<HeadLook> = {}): HeadLook => ({ lids: .14, lookX: 0, lookY: 0, brow: -.08, mouth: "neutral", hair: kidHair, glasses: false, stubble: 0, age: 0, ...o });
const stand: Pose = { ...STAND, breathe: .3 };

/** local wrist anchor in figure-card metres (same ground solve as <Figure/>) */
const wristAt = (pose: Pose, height: number, view: number, side: "L" | "R", snap = true) => {
  const S = solveSkeleton(pose, height, view);
  const k = S.k;
  const pts: [number[], number][] = [
    [S.pelvis, .13 * k], [S.chest, .15 * k], [S.headC, .13 * k],
    [S.legL.kn, .07 * k], [S.legR.kn, .07 * k], [S.legL.an, .06 * k], [S.legR.an, .06 * k],
    [S.armL.el, .05 * k], [S.armR.el, .05 * k], [S.armL.wr, .04 * k], [S.armR.wr, .04 * k],
  ];
  const off = snap ? -Math.max(...pts.map(([v, r]) => v[1] + r)) : 0;
  const ar = side === "L" ? S.armL : S.armR;
  return { x: ar.wr[0], y: ar.wr[1] + off, ang: ar.a2 };
};

/* ── the child: 1.45 m, school bag on a strap ── */
const Child: React.FC<{ cam: Cam; f: number; x: number; z: number; walk: number; offer: number; look: Partial<HeadLook>; view?: number }> = ({ cam, f, x, z, walk, offer, look, view = .12 }) => {
  const swing = Math.sin(f * .21) * 14 * walk;
  return <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={.3} ry={.09} o={.4}/>
    <path d="M-.19,-1.02 q-.12,.05 -.1,.19 l.04,.3 h.21 l.05,-.3 q.01,-.15 -.11,-.19z" fill="#53616a" stroke="#211b18" strokeWidth=".016"/>
    <path d="M-.24,-1.1 q.13,.12 .28,.1" stroke="#ded3bd" strokeWidth=".022" fill="none"/>
    <Figure pose={{
      ...stand, torso: lerp(0, -4, offer), shL: lerp(4 + swing * .3, 38, offer), elL: lerp(9, 30, offer), wrL: lerp(0, 10, offer),
      shR: lerp(-4 - swing * .3, 6, offer), elR: lerp(9, 16, offer), hipL: 2 + swing, hipR: -2 - swing,
      knL: 3 + Math.abs(swing) * .4, knR: 3 + Math.abs(swing) * .4, breathe: breath(f + 10, .09),
    }} view={view} look={kidLook(look)} pal={KPAL} height={1.45}/>
  </Card>;
};

/* ── dealer at the corner ── */
const Dealer: React.FC<{ cam: Cam; f: number; x: number; z: number; variant: 0 | 1; receive: number; spot: number; lean?: number; view?: number; action?: "count" | "loaf" }> = ({ cam, f, x, z, variant, receive, spot, lean = 0, view = .14, action }) => {
  // "work it": one counts a small roll of bills, the other loafs with a heel up on the wall
  const cnt = action === "count" ? (0.5 + 0.5 * Math.sin(f * .12)) : 0;
  const scan = action === "loaf" ? noise1(f * .021, 8) * .5 : noise1(f * .017, 3) * .35;
  return <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={.34} ry={.1} o={.38}/>
    <Figure pose={{
      ...stand, torso: lerp(0, -10, lean), neck: lerp(0, 6, spot),
      shL: action === "count" ? lerp(16, 22, cnt) : variant ? lerp(8, 30, receive) : lerp(-4, 30, receive),
      elL: action === "count" ? lerp(30, 38, cnt) : variant ? lerp(18, 42, receive) : lerp(8, 40, receive),
      shR: action === "count" ? lerp(8, 12, cnt) : variant ? -8 : lerp(11, 8, spot),
      elR: action === "count" ? lerp(18, 26, cnt) : variant ? lerp(24, 34, receive) : lerp(30, 14, spot),
      wrR: action === "count" ? lerp(-6, 8, cnt) : 0,
      hipL: action === "loaf" ? 6 : variant ? -2 : 4,
      knL: action === "loaf" ? 58 : 3,
      hipR: variant ? 5 : -3, breathe: breath(f + variant * 39, .062),
    }} view={view} look={variant
      ? dLook({ yaw: .5, lids: .17 + blink(f, 13) * .72, lookX: lerp(-.55, -.15, spot), brow: .24, mouth: spot > .5 ? "open" : "flat" })
      : dLook({ yaw: .61, lids: .18 + blink(f, 2) * .7, lookX: lerp(-.42, .55, spot), brow: lerp(.38, .6, spot), mouth: "flat" })}
      pal={variant ? D2PAL : D1PAL} height={variant ? 1.79 : 1.82}/>
  </Card>;
};

/* ── Jesse in his parked car, seen at a readable size (mid layer) ── */
const JessesCar: React.FC<{ cam: Cam; f: number; x: number; z: number; turn: number; flip?: boolean }> = ({ cam, f, x, z, turn, flip = true }) => (
  <>
    <Card cam={cam} x={x} z={z} flip={flip} blur={false}>
      <CShadow rx={2.3} ry={.5} o={.5}/>
      <g transform="scale(1 .82)">
        <path d="M-2.2,-.28 l.12,-.62 q.1,-.26 .5,-.32 l.58,-.1 .45,-.52 q.2,-.24 .58,-.24 h.95 q.32,0 .56,.26 l.52,.52 .66,.12 q.42,.08 .5,.4 l.12,.36 v.42 h-5.6z" fill="#3f515d" stroke="#151b22" strokeWidth=".055"/>
        <path d="M-.58,-1.44 h1.28 q.2,0 .34,.16 l.5,.62 h-2.2z" fill="#7891a0" opacity=".68" stroke="#202b30" strokeWidth=".03"/>
        <path d="M-.5,-1.34 v.74 M.78,-1.32 v.74" stroke="#2c3a41" strokeWidth=".04"/>
        <path d="M-2.08,-.7 h4.8" stroke="#c9d2d6" strokeWidth=".035" opacity=".4"/>
        <rect x="-2.18" y="-.72" width=".1" height=".18" rx=".025" fill="#b8452f"/>
        <circle cx="-1.28" cy="-.14" r=".32" fill="#16191d" stroke="#979087" strokeWidth=".05"/>
        <circle cx="1.32" cy="-.14" r=".32" fill="#16191d" stroke="#979087" strokeWidth=".05"/>
      </g>
    </Card>
    {/* him at the wheel, above the door line; head turns to the corner on "Jesse knows" */}
    <Card cam={cam} x={x + (flip ? -.15 : .15)} y={.68} z={z + .12} blur={false}>
      <Figure pose={{
        torso: -6, neck: 3 + turn * 3, shL: 22, elL: 48, shR: 30, elR: 56,
        hipL: 62, hipR: 66, knL: 58, knR: 62, breathe: breath(f, .12),
      }} view={.85} look={partnerLook({
        yaw: lerp(.72, .58, turn), lids: .19 + blink(f, 29) * .78, lookX: lerp(.7, .85, turn), lookY: -.1,
        brow: -.5, mouth: "flat", dirt: .18,
      })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie" ground={false}/>
    </Card>
    {/* window sill + door skin over the lower body: he is inside the car, not on it */}
    <Card cam={cam} x={x} z={z + .3} blur={false}>
      <path d="M-2.3,-1.06 h4.9 l.22,.3 q.06,.5 .06,.78 v.3 h-5.46 v-.3 q0,-.28 .06,-.78 Z" fill="#26323c" stroke="#10161c" strokeWidth=".05"/>
      <path d="M-2.24,-1.02 h4.78" stroke="#4a5b68" strokeWidth=".05"/>
      <path d="M-2.2,-.62 h4.7" stroke="#37454f" strokeWidth=".04"/>
    </Card>
  </>
);

/* offer pose of the child, used to anchor the packet to his hand */
const offerPose = (offer: number, swing: number): Pose => ({
  ...stand, torso: lerp(0, -4, offer), shL: lerp(4 + swing * .3, 38, offer), elL: lerp(9, 30, offer), wrL: lerp(0, 10, offer),
  shR: lerp(-4 - swing * .3, 6, offer), elR: lerp(9, 16, offer), hipL: 2 + swing, hipR: -2 - swing,
  knL: 3 + Math.abs(swing) * .4, knR: 3 + Math.abs(swing) * .4, breathe: .3,
});

/* ───────────────────────── shot A · the corner and the drop (0–216) ───────────────────────── */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp(f / T.cutB);
  const cam: Cam = { x: lerp(-.35, .1, easeInOut(u)), y: 1.52, z: lerp(2.5, 2.85, easeInOut(u)), f: 1500, shiftY: 30 };
  const walk = f < 158 ? 0 : f > 196 ? 0 : 1;
  const childX = lerp(-5.8, 0.25, prog(f, 158, 196, easeInOut));
  const offer = prog(f, 192, T.drops, easeOut);
  const receive = prog(f, 200, T.drops + 2, easeOut);
  const PK = wristAt(offerPose(offer, 0), 1.45, .1, "L");
  const DK = wristAt(offerPose(0, 0), 1.82, .2, "L");
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CNightHaze f={f} y={H * .58} o={.09}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.9}/>
      <CPowerPole cam={cam} x={-5.4} z={11.2}/>
      <CWires cam={cam} from={[-5.4, 5.6, 11.2]} to={[9, 5.1, 13.2]} n={3}/>
      <CSidewalkBits cam={cam} x={6.4} z={10.6}/>
      <CParkedCar cam={cam} x={-8.2} z={13} f={f} color="#4a5560"/>
      {/* Jesse watches from his parked car, mid-left */}
      <JessesCar cam={cam} f={f} x={-3.55} z={9.6} turn={prog(f, T.knows - 6, T.knows + 14)}/>
      <CWarmPool cam={cam} x={1.5} z={8.8} r={3} o={.36} f={f}/>
      {/* MID: the two men + the child at the exchange */}
      <Dealer cam={cam} f={f} x={1.55} z={8.6} variant={0} receive={receive} spot={0} lean={1} view={.2} action="count"/>
      <Dealer cam={cam} f={f} x={3.1} z={8.85} variant={1} receive={0} spot={0} view={.1} action="loaf"/>
      <Child cam={cam} f={f} x={childX} z={8.25} walk={walk} offer={offer} view={.1}
        look={{ yaw: lerp(.3, .55, offer), lookX: lerp(-.2, -.5, offer), brow: -.12, mouth: "flat" }}/>
      {/* the folded packet rides the child's hand, then is taken on "drops" (no writing) */}
      <Card cam={cam} x={lerp(childX + PK.x, 1.55 + DK.x, receive)} y={-lerp(PK.y, DK.y, receive)} z={8.2 - .3 * receive} blur={false} opacity={clamp(offer * 1.4) * (1 - prog(f, T.drops, T.drops + 3))}>
        <g transform={`rotate(${-12 + 26 * receive}) scale(${1 + .22 * receive * (1 - receive) * 4})`}>
          <path d="M-.075,-.022 L.075,-.048 L.09,.085 L-.06,.105 Z" fill="#e5d8bc" stroke="#4e463c" strokeWidth=".013"/>
          <path d="M-.045,.032 l.115,-.022" stroke="#aa9a7e" strokeWidth=".008"/>
        </g>
      </Card>
      {/* NEAR silhouettes: pole left edge, bin right bottom corner */}
      <CNearFG cam={cam} x={-1.12} z={3.95} kind="pole"/>
      <CNearFG cam={cam} x={1.05} z={4.15} kind="bin"/>
      <CMoths f={f} x={project(cam, 1.2, 4.6, 9.2).x} y={project(cam, 1.2, 4.6, 9.2).y} n={7} r={70} seed={5}/>
    </svg>
    <Motes f={f} n={30} seed={55} color="#ead7bb" drift={-.18}/>
    <Finish f={f} vig={.68} grain={.072} shadow="#071426" gradeO={.22}/>
  </>;
};

/* ───────────────────────── shot B · the child (216–300) ───────────────────────── */
const ShotB: React.FC<{ f: number }> = ({ f }) => {
  const g = f;
  const u = clamp((f - T.cutB) / (T.cutC - T.cutB));
  const cam: Cam = { x: 2.18, y: lerp(1.42, 1.34, easeInOut(u)), z: lerp(3.1, 3.32, easeInOut(u)), f: 1850, shiftY: -70 };
  const retract = prog(f, T.cutB + 2, T.name - 4, easeInOut);
  const down = kf(g, [[T.name, 0], [T.name + 12, 1], [T.tomas + 4, 1], [T.tomas + 18, 0]]);
  const lift = prog(f, T.eleven - 4, T.eleven + 14);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={g}/>
      <CStorefront cam={cam} x={1.9} z={11.6} f={g} lit={1} dress={false}/>
      <CWarmPool cam={cam} x={2.1} z={8.1} r={2.6} o={.42} f={g}/>
      {/* the adult he looks up to: torso edge at frame right */}
      <Card cam={cam} x={3.85} z={7.7} blur={false}>
        <CShadow rx={.34} ry={.1} o={.4}/>
        <Figure pose={{ ...stand, shL: lerp(26, 8, retract), elL: lerp(40, 18, retract), shR: -8, elR: 26, breathe: breath(g + 39, .06) }}
          view={.2} look={dLook({ yaw: .45, lids: .17 + blink(g, 13) * .72, lookX: -.5, brow: .24 })}
          pal={D2PAL} height={1.79}/>
      </Card>
      {/* the child lowers his arm after the hand-off; he glances down at "name", lifts his chin at "eleven" */}
      <Child cam={cam} f={g} x={2.16} z={7.35} walk={0} offer={1 - retract * .85} view={.08}
        look={{ yaw: lerp(.34, .5, lift), lookX: lerp(.28, -.06, down), lookY: lerp(-.06, -.5, down) + lift * .22, brow: -.14, mouth: "flat", lids: .13 + blink(g, 15, 84) * .7 }}/>
      {/* near silhouettes keep depth */}
      <CNearFG cam={cam} x={1.52} z={4.55} kind="pole"/>
      <CDust f={g} cam={cam} n={16} seed={51} color="#ffe2ae" z0={4} z1={9} x0={-1} x1={5} h={2.2}/>
    </svg>
    <Motes f={g} n={22} seed={556} color="#edd7b0" drift={-.1}/>
    <Finish f={g} vig={.7} grain={.072} shadow="#0a1421" gradeO={.23}/>
  </>;
};

/* ───────────────────────── shot C · he cannot leave it alone (300–392) ───────────────────────── */
const seated: Pose = { torso: -6, neck: 4, shL: 24, elL: 48, shR: 36, elR: 60, hipL: 62, hipR: 66, knL: 58, knR: 62, breathe: .3 };
const ShotC: React.FC<{ f: number }> = ({ f }) => {
  const g = f;
  const u = clamp((f - T.cutC) / (T.cutD - T.cutC));
  const cam: Cam = { x: -3.72, y: lerp(1.36, 1.32, easeInOut(u)), z: lerp(3.5, 3.6, easeInOut(u)), f: 1950, shiftY: -30 };
  const grip = prog(f, T.cannot - 4, T.cannot + 10);
  const exhale = prog(f, T.alone - 2, T.alone + 16);
  const tight = prog(f, T.jesse, T.alone + 6);
  const pose: Pose = {
    torso: lerp(-6, -9, tight), neck: lerp(4, 7, tight),
    shL: 24 + grip * 8, elL: 48 + grip * 10, wrL: grip * 14,
    shR: 36 + grip * 6, elR: 60 + grip * 8, wrR: grip * 12,
    hipL: 62, hipR: 66, knL: 58, knR: 62, breathe: .3,
  };
  const wR = wristAt(pose, PARTNER.height, .78, "R", false), wL = wristAt(pose, PARTNER.height, .78, "L", false);
  const SW = { x: (wR.x + wL.x) / 2 + .01, y: (wR.y + wL.y) / 2 + .015 };
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={g}/>
      <CParkedCar cam={cam} x={1.35} z={10.2} f={g} color="#58504b"/>
      <CWarmPool cam={cam} x={-2.2} z={7.4} r={2.4} o={.3} f={g}/>
      {/* Jesse at the wheel — head and shoulders inside the open window */}
      <Card cam={cam} x={-3.68} y={.62} z={5.72} blur={false}>
        <g transform={`translate(${SW.x},${SW.y}) rotate(-22)`}>
          <ellipse rx=".3" ry=".13" fill="none" stroke="#15181c" strokeWidth=".05"/>
          <path d="M-.3,0 h.6 M0,-.13 v.26" stroke="#15181c" strokeWidth=".032"/>
          <ellipse rx=".055" ry=".032" fill="#1c2126"/>
        </g>
        <Figure pose={{ ...pose, breathe: breath(g, .13) }} view={.78} look={partnerLook({
          yaw: .62, lids: .2 + blink(g, 5) * .8 - exhale * .1, lookX: lerp(.8, .3, exhale), lookY: -.18,
          brow: lerp(-.2, -.72, tight), mouth: exhale > .4 ? "open" : "flat", mouthOpen: exhale * (1 - exhale) * .5, dirt: .18,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie" ground={false}/>
      </Card>
      {/* door panel + window sill in the near plane occlude his lower body (contact: he sits in the car) */}
      <Card cam={cam} x={-3.72} z={5.12} blur={false}>
        <path d="M-1.42,0 v-.97 q0,-.06 .06,-.06 h2.9 q.06,0 .06,.06 V0 Z" fill="#26323c" stroke="#10161c" strokeWidth=".03"/>
        <path d="M-1.38,-.92 h2.82" stroke="#4a5b68" strokeWidth=".035"/>
        <path d="M-1.3,-.6 h2.6" stroke="#37454f" strokeWidth=".03"/>
      </Card>
      {/* steering wheel arc, bottom-right of the window opening */}
      <Card cam={cam} x={-2.86} y={1.06} z={5.24} blur={false} opacity={.96}>
        <g transform="rotate(-24)">
          <ellipse rx=".34" ry=".15" fill="none" stroke="#15181c" strokeWidth=".055"/>
          <ellipse rx=".34" ry=".15" fill="none" stroke="#232a31" strokeWidth=".022" opacity=".8"/>
          <path d="M-.34,0 h.68 M0,-.15 v.3" stroke="#15181c" strokeWidth=".035"/>
          <ellipse rx=".06" ry=".035" fill="#1c2126"/>
        </g>
      </Card>
    </svg>
    <Motes f={g} n={18} seed={155} color="#e7d4bd" drift={-.12}/>
    <Finish f={g} vig={.72} grain={.075} shadow="#091421" gradeO={.24}/>
  </>;
};

/* ───────────────────────── shot D · the aim (392–480) ───────────────────────── */
const ShotD: React.FC<{ f: number }> = ({ f }) => {
  const g = f;
  const u = clamp((f - T.cutD) / (T.cutE - T.cutD));
  const cam: Cam = { x: lerp(-1.62, -1.34, easeInOut(u)), y: 1.46, z: 3.7, f: 1550, shiftY: -20 };
  const raise = prog(f, T.cutD, T.shoot + 2, easeOut);
  const track = prog(f, T.both, T.both + 22, easeInOut);
  const spot = prog(f, T.spot, T.spot + 18);
  const aimPose: Pose = {
    ...stand, torso: -4, neck: 5,
    shL: lerp(12, 78, raise), elL: lerp(22, 8, raise), wrL: lerp(0, -4, raise),
    shR: lerp(10, 76, raise), elR: lerp(20, 6, raise), wrR: lerp(0, 6, raise),
    hipL: 8, hipR: -4, breathe: breath(g, .1),
  };
  const wr = wristAt(aimPose, PARTNER.height, .6, "R");
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={g}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={g} lit={.85}/>
      <CPowerPole cam={cam} x={-5.4} z={11.2}/>
      <CSidewalkBits cam={cam} x={6.4} z={10.6}/>
      <CWarmPool cam={cam} x={-.2} z={8.8} r={3} o={.38} f={g}/>
      {/* the two men under the lamp — they spot him and react */}
      <Dealer cam={cam} f={g} x={-.2} z={8.6} variant={0} receive={0} spot={spot} lean={lerp(1, 0, spot)} view={.22}/>
      <Dealer cam={cam} f={g} x={1.45} z={8.9} variant={1} receive={0} spot={spot} view={.12}/>
      {/* Jesse in the near-left: over his shoulder, the pistol levels at them */}
      <Card cam={cam} x={-2.72} z={5.72} blur={false}>
        <CShadow rx={.36} ry={.1} o={.45}/>
        <Figure pose={aimPose} view={.6} look={partnerLook({
          yaw: lerp(.5, .82, raise), lids: .16 + blink(g, 21) * .7, lookX: lerp(.4, .85, raise),
          brow: lerp(-.5, -.92, raise), mouth: "flat", dirt: .18,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
        {/* generic compact pistol anchored to his hand, aimed at the corner */}
        <g transform={`translate(${wr.x},${wr.y}) rotate(${wr.ang})`} opacity={raise}>
          <g transform="translate(0,.1) rotate(90)">
            <path d="M-.15,-.045 h.38 q.03,0 .03,.025 v.028 q0,.025 -.03,.025 h-.38 q-.025,0 -.025,-.028 v-.022 q0,-.028 .025,-.028z" fill="#2b2f31" stroke="#111517" strokeWidth=".013"/>
            <path d="M-.15,-.045 h.38 v.018 h-.38z" fill="#565c5f" opacity=".8"/>
            <path d="M-.045,.03 v.13 q0,.012 .012,.012 h.062 q.012,0 .012,-.012 v-.13z" fill="#4c4036" stroke="#15181c" strokeWidth=".01"/>
            <path d="M-.06,.032 q-.028,.045 .02,.062" fill="none" stroke="#2b2f31" strokeWidth=".012"/>
          </g>
        </g>
      </Card>
      <CDust f={g} cam={cam} n={14} seed={71} color="#ffe2ae" z0={4.4} z1={9} x0={-2} x1={4} h={2.4}/>
    </svg>
    <Motes f={g} n={22} seed={57} color="#ead5b8" drift={-.1}/>
    <Finish f={g} vig={.73} grain={.075} shadow="#080f1b" gradeO={.25}/>
  </>;
};

/* ───────────────────────── shot E · and die doing it (480–540) ───────────────────────── */
const ShotE: React.FC<{ f: number }> = ({ f }) => {
  const g = f;
  const u = clamp((f - T.cutE) / (T.end - T.cutE));
  const cam: Cam = { x: lerp(-3.3, -3.16, easeInOut(u)), y: 1.46, z: lerp(3.3, 3.14, easeInOut(u)), f: 1880, shiftY: -40 };
  const hitch = prog(f, T.die - 3, T.die + 8);
  const settle = prog(f, T.doing, T.it + 10);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={g}/>
      <CWarmPool cam={cam} x={-2.4} z={7.4} r={2.2} o={.3} f={g}/>
      <Card cam={cam} x={-3.22} z={5.72} blur={false}>
        <Figure pose={{
          ...stand, torso: -3, neck: 3, shL: lerp(12, 26, hitch), elL: lerp(24, 46, hitch),
          shR: 10, elR: 20, breathe: breath(g, .11),
        }} view={.42} look={partnerLook({
          yaw: .48, lids: lerp(.18, .5, settle) + blink(g, 8, 120) * .5 + hitch * .12,
          lookX: lerp(.35, .1, settle), lookY: lerp(-.05, -.32, settle),
          brow: lerp(-.75, -.55, settle), mouth: hitch > .45 && settle < .35 ? "open" : "flat",
          mouthOpen: hitch * (1 - settle) * .26, tears: .3 * settle, dirt: .18,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
      </Card>
      <CNearFG cam={cam} x={-3.72} z={4.2} kind="pole"/>
    </svg>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(270deg, rgba(245,199,122,0.12), rgba(245,199,122,0) 38%)" }}/>
    <Motes f={g} n={18} seed={577} color="#e8d6bd" drift={-.08}/>
    <Finish f={g} vig={.74} grain={.078} shadow="#080f1b" gradeO={.25}/>
  </>;
};

/* ───────────────────────── assembly + sound ───────────────────────── */
export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#101b2a" }}>
      <Sequence from={0} durationInFrames={T.cutB} name="A corner drop"><ShotA f={f} /></Sequence>
      <Sequence from={T.cutB} durationInFrames={T.cutC - T.cutB} name="B the child"><ShotB f={f} /></Sequence>
      <Sequence from={T.cutC} durationInFrames={T.cutD - T.cutC} name="C cannot leave it"><ShotC f={f} /></Sequence>
      <Sequence from={T.cutD} durationInFrames={T.cutE - T.cutD} name="D the aim"><ShotD f={f} /></Sequence>
      <Sequence from={T.cutE} durationInFrames={T.end - T.cutE} name="E die doing it"><ShotE f={f} /></Sequence>
      <Sequence from={0} durationInFrames={T.end}><Audio src={staticFile("sfx/c_night_bed.wav")} volume={(fr) => 0.035 * clamp((T.end - fr) / 40)} /></Sequence>
      <Sequence from={T.shoot - 2} durationInFrames={16}><Audio src={staticFile("sfx/c_gun_click.wav")} volume={0.12} /></Sequence>
    </AbsoluteFill>
  );
};
