// SCENE 057 · "owns" · superlab — ownership, silence, and the witness. Revised per lead
// QA rounds 1–2: heroes fill 1/3–2/3 frame height (medium/close), cold-open lab treatment
// (overhead light cones, steel highlights, haze, reflections, near-layer equipment),
// every shot carries a narration-matched action — no arms hanging, no identical idles.
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose, STAND, Palette } from "../../rig/Figure";
import { HeadLook } from "../../rig/Head";
import { TEACHER, teacherLook, PARTNER, partnerLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Fluoro, LightCone, FloorGlow } from "../../env/Lab";
import { CSoftDefs, CShadow, CDust } from "../../env/c_common";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 57, id: "owns", set: "superlab", cutIn: 943.54, cutOut: 962.16 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  first: beat(946.74), time: beat(946.98), decided: beat(948.16), owns: beat(948.94), somebody: beat(949.24),
  cutB: beat(950.98), dead: beat(952.26), men: beat(952.44), waits: beat(953.32),
  cutC: beat(954.4), dead2: beat(956.4), chemist: beat(956.64), and2: beat(956.98),
  cutD: beat(957.54), problem: beat(957.86), with: beat(958.26), seen: beat(959.02),
  running: beat(959.22), apartment: beat(960.42), victor: beat(961.36), end: beat(962.16),
};

/* ── Victor: original extra on the shared rig (enforcer, grey suit) ── */
const VIC: Palette = { skin: "#d3a78b", skinShade: "#9f735c", skinLight: "#edc3a3", jacket: "#55504b", jacketShade: "#38383a", jacketLight: "#706960", shirt: "#b6a98e", shirtShade: "#877b65", pants: "#363c43", pantsShade: "#282d33", shoes: "#272626", outline: "#171516" };
const vHair: HeadLook["hair"] = { base: "#342a25", dark: "#1c1715", light: "#756052", style: "buzz" };
const vLook = (f: number, salt: number, o: Partial<HeadLook> = {}): HeadLook => ({ hair: vHair, glasses: false, stubble: .5, age: .44, lids: .17 + blink(f, salt) * .72, lookX: 0, lookY: 0, brow: .12, mouth: "flat" as const, ...o });

/** near-layer steel column with a valve wheel — placed at frame edges only */
const NearCol: React.FC<{ cam: Cam; x: number; z: number; flip?: boolean }> = ({ cam, x, z, flip }) => (
  <Card cam={cam} x={x} z={z} blur={false}>
    <rect x={-.3} y={-6} width={.6} height={6} fill="#16242e"/>
    <rect x={-.34} y={-4.4} width={.68} height={.18} fill="#22343f"/>
    <rect x={-.34} y={-2.6} width={.68} height={.18} fill="#22343f"/>
    <circle cx={flip ? -.42 : .42} cy={-3.5} r={.34} fill="none" stroke="#2c4450" strokeWidth={.1}/>
    <path d={`M${flip ? -.76 : .08},-3.5 h.68 M${flip ? -.42 : .42},-3.84 v.68`} stroke="#2c4450" strokeWidth={.075}/>
    <rect x={-.3} y={-6} width={.1} height={6} fill="#2f4652" opacity={.5}/>
  </Card>
);

/* ───────────────────────── shot A · he owns somebody (0–223) ───────────────────────── */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp(f / T.cutB);
  const cam: Cam = { x: lerp(-.42, -.3, easeInOut(u)), y: 1.52, z: lerp(4.5, 4.66, easeInOut(u)), f: 1450, shiftY: -52 };
  const grip = prog(f, T.owns - 14, T.somebody + 10, easeInOut);   // hand closes on the shoulder
  const let_ = prog(f, T.somebody + 26, T.cutB - 8, easeInOut);     // and releases again
  const hold = grip * (1 - let_);
  const drops = prog(f, T.first, T.decided);                        // pipette work before the grip
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.9}/>
      {/* cold-open lab treatment: visible overhead fluoro + light cones + floor pools */}
      <LightCone cam={cam} x={-2.4} z={8.2} y={3.7} w={1.5} on={.8}/>
      <LightCone cam={cam} x={2.6} z={9.6} y={3.7} w={1.5} on={.7}/>
      <LightCone cam={cam} x={-6.5} z={12.5} y={3.8} w={1.8} on={.5}/>
      <Fluoro cam={cam} x={-2.4} z={8.2} y={3.7} len={1.5}/>
      <Fluoro cam={cam} x={2.6} z={9.6} y={3.7} len={1.5}/>
      <FloorGlow cam={cam} x={-.55} z={9.2} w={3} d={2} color="#8fd0f2" o={.16}/>
      <FloorGlow cam={cam} x={.28} z={8.8} w={2.6} d={1.8} color="#8fd0f2" o={.14}/>
      {/* Walt: pipette + graduated cylinder until the moment he claims the boy */}
      <Card cam={cam} x={-.55} z={9.2} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .07), torso: -6 * hold + 2 * drops * 0,
          neck: 5 + hold * -3,
          shR: 20, elR: -37 + 5 * Math.sin(f * .22) * drops, wrR: 6,  // screen-left hand cradles the cylinder
          shL: lerp(16, 74, hold), elL: lerp(-30, -10, hold), wrL: lerp(8, -8, hold), // screen-right arm reaches Jesse
          hipL: 6, hipR: -4,
        }} view={.3} look={teacherLook({
          yaw: lerp(.34, .1, hold), lids: .2 + blink(f, 17) * .7, lookX: lerp(.22, .62, hold), lookY: lerp(-.42, -.05, hold),
          brow: lerp(-.18, -.34, hold), mouth: "flat",
        })} pal={TEACHER.pal} height={TEACHER.height}/>
        {/* the cylinder sits in his left hand; pipette above it */}
        <g transform="translate(-.15,-1.02) rotate(3)">
          <rect x={-.055} y={-.34} width={.11} height={.34} rx={.02} fill="#cfe4e8" opacity={.85} stroke="#5b7580" strokeWidth={.012}/>
          <rect x={-.048} y={-.16} width={.096} height={.16} fill="#7fc4b8" opacity={.75}/>
          <path d="M-.055,-.27 h.11 M-.055,-.2 h.11" stroke="#5b7580" strokeWidth={.008}/>
        </g>
        <g transform={`translate(-.32,${lerp(-1.34, -1.26, hold)}) rotate(${-8 + hold * 12})`} opacity={1 - hold * .9}>
          <rect x={-.014} y={-.18} width={.028} height={.3} rx={.012} fill="#d8e6e2" stroke="#68807f" strokeWidth={.008}/>
          <circle cx={0} cy={.14} r={.018} fill="#8fd0c2"/>
        </g>
      </Card>
      {/* Jesse: hand rubbing the back of his neck, then the shoulder grip lands */}
      <Card cam={cam} x={.12} z={8.8} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f + 24, .1),
          torso: 4 + hold * 2, neck: lerp(-2, 5, hold),
          shL: 16, elL: -28,
          shR: lerp(-30, -8, hold), elR: lerp(-95, -18, hold), wrR: lerp(-10, 0, hold),
          hipL: lerp(2, 8, hold), hipR: -4, knL: lerp(3, 7, hold),
        }} view={.2} look={partnerLook({
          yaw: lerp(-.18, .05, hold), lids: lerp(.24, .6, hold) + blink(f, 12) * .7, lookX: lerp(-.1, -.5, hold), lookY: lerp(-.1, .12, hold),
          brow: lerp(-.4, -.75, hold), mouth: "flat", bruise: .12, dirt: .1,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
        {/* Walt's hand closing on the shoulder — contact kept */}
        <g opacity={clamp(hold * 1.5)} transform="translate(-.1,-1.23) rotate(10)">
          <path d="M-.16,-.02 h.12 q.03,0 .03,.03 v.06 q0,.03 -.03,.03 h-.1 q-.025,0 -.025,-.03 v-.06 q0,-.03 .025,-.03z" fill="#3c4550" stroke="#20262c" strokeWidth={.011}/>
          <path d="M.02,-.01 q.075,-.008 .085,.038 q.01,.045 -.038,.058 q-.058,.01 -.072,-.038z" fill="#d7a78b" stroke="#8b5f4b" strokeWidth={.01}/>
        </g>
      </Card>
      <NearCol cam={cam} x={-1.62} z={6.3}/>
      <CDust f={f} cam={cam} n={22} seed={571} color="#dff0f7" z0={5} z1={13} x0={-4} x1={4} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={26} seed={571} color="#e9f5fa" drift={.14}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────────── shot B · he waits (223–325) ───────────────────────── */
const ShotB: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutB) / (T.cutC - T.cutB));
  const cam: Cam = { x: lerp(.18, .3, easeInOut(u)), y: 1.55, z: lerp(3.62, 3.95, easeInOut(u)), f: 1500, shiftY: -62 };
  const hush = prog(f, T.cutB + 10, T.dead);          // the cuff settles
  const tilt = prog(f, T.dead, T.men);                // micro head-tilt on "two dead men"
  const still = prog(f, T.waits, T.cutC - 4);         // chin lift on "He waits"
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.85}/>
      <LightCone cam={cam} x={.3} z={7.6} y={3.7} w={1.7} on={1}/>
      <LightCone cam={cam} x={-4.2} z={11} y={3.8} w={1.8} on={.55}/>
      <LightCone cam={cam} x={5.4} z={12.2} y={3.8} w={1.8} on={.5}/>
      <Fluoro cam={cam} x={.3} z={7.6} y={3.7} len={1.7}/>
      <FloorGlow cam={cam} x={.15} z={8.6} w={3.2} d={2.2} color="#8fd0f2" o={.18}/>
      {/* two faint red safety rings on the floor — the lab's own menace */}
      <ellipse cx={project(cam, -2.4, 0, 10.4).x} cy={project(cam, -2.4, 0, 10.4).y} rx={90} ry={24} fill="#e84444" opacity={.055 * (.55 + .45 * Math.sin(f * .04))}/>
      <ellipse cx={project(cam, 3.1, 0, 11.2).x} cy={project(cam, 3.1, 0, 11.2).y} rx={104} ry={28} fill="#e84444" opacity={.05 * (.55 + .45 * Math.sin(f * .04 + 2))}/>
      {/* Gus: a moving hold — hands finishing a cuff adjustment, then absolute stillness */}
      <Card cam={cam} x={.15} z={8.6} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .062),
          torso: lerp(-2, 0, hush), neck: tilt * 2.2 + still * -3,
          shL: lerp(30, 12, hush), elL: lerp(-42, -16, hush), wrL: lerp(-16, -2, hush),
          shR: lerp(-20, -6, hush), elR: lerp(-30, -10, hush), wrR: lerp(12, 0, hush),
          hipL: 5, hipR: -3,
        }} view={.14} look={restaurateurLook({
          yaw: .38 + tilt * .06, lids: .16 + blink(f, 15, 130) * .62 + still * .1,
          lookX: lerp(-.28, -.42, still), lookY: lerp(-.04, .07, still), brow: .1 + tilt * .05, mouth: "flat",
        })} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
      </Card>
      <NearCol cam={cam} x={2.28} z={6.0} flip/>
      <CDust f={f} cam={cam} n={22} seed={572} color="#dff0f7" z0={5} z1={13} x0={-4} x1={4} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={26} seed={572} color="#e9f5fa" drift={.1}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────────── shot C · the dead chemist (325–403) ───────────────────────── */
const Gurney: React.FC<{ cam: Cam; f: number; x: number; z: number }> = ({ cam, f, x, z }) => (
  <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={1.15} ry={.22} o={.42}/>
    {/* wheeled frame */}
    <path d="M-.82,-.78 v.72 M.82,-.78 v.72 M-.62,-.78 v.72 M.62,-.78 v.72" stroke="#5c747f" strokeWidth={.045}/>
    {[-.82, .82, -.62, .62].map((wx, i) => <circle key={i} cx={wx} cy={-.045} r={.065} fill="#2c3a42" stroke="#7c939c" strokeWidth={.02}/>)}
    <rect x={-.98} y={-.82} width={1.96} height={.1} rx={.03} fill="#7f959e" stroke="#3c4c54" strokeWidth={.022}/>
    {/* mattress + sheet with two still humps */}
    <rect x={-.92} y={-.98} width={1.84} height={.18} rx={.05} fill="#9fb7bf" stroke="#3c4c54" strokeWidth={.022}/>
    <path d="M-.9,-1.0 q.1,-.34 .34,-.36 q.16,-.28 .38,-.1 q.3,-.5 .7,-.28 q.24,-.16 .46,.02 q.28,-.06 .34,.3 q.1,.28 .18,.42 H-.9 Z"
      fill="#e8eef0" stroke="#63798a" strokeWidth={.022} strokeLinejoin="round"/>
    <path d="M-.42,-1.52 q.12,.2 .04,.5 M.1,-1.5 q-.08,.22 .02,.46 M.52,-1.32 q-.04,.18 .06,.32" stroke="#b9c9d1" strokeWidth={.02} fill="none"/>
    {/* folded glasses resting on the sheet — the dead chemist's own */}
    <g transform="translate(.3,-1.72) rotate(-6)">
      <path d="M-.13,0 a.075,.075 0 1,0 .13,0 a.075,.075 0 1,0 -.13,0 M.09,0 a.075,.075 0 1,0 .13,0 a.075,.075 0 1,0 -.13,0" fill="none" stroke="#c8a24a" strokeWidth={.022}/>
      <path d="M0,-.005 h.02" stroke="#c8a24a" strokeWidth={.018}/>
      <path d="M-.26,-.02 l.12,-.02 M.22,-.02 l.12,.02" stroke="#c8a24a" strokeWidth={.018}/>
    </g>
    {/* toe tag: illegible scribble only */}
    <g transform="translate(-1.02,-1.06) rotate(14)">
      <rect x={-.09} y={-.06} width={.18} height={.12} rx={.012} fill="#e6d9b8" stroke="#8d7f61" strokeWidth={.01}/>
      <path d="M-.05,-.02 q.02,-.02 .04,0 q.02,.02 .045,0 M-.05,.02 h.1" stroke="#6d6350" strokeWidth={.008} fill="none"/>
    </g>
  </Card>
);
const ShotC: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutC) / (T.cutD - T.cutC));
  const cam: Cam = { x: lerp(-1.15, -.38, easeInOut(u)), y: 1.42, z: 4.2, f: 1350, shiftY: -28 };
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.6}/>
      {/* one hard cone on the body — the morgue light */}
      <LightCone cam={cam} x={-.4} z={8.0} y={3.75} w={1.25} on={1}/>
      <Fluoro cam={cam} x={-.4} z={8.0} y={3.75} len={1.3}/>
      <LightCone cam={cam} x={-5.8} z={12} y={3.8} w={1.8} on={.42}/>
      <LightCone cam={cam} x={4.6} z={12.6} y={3.8} w={1.8} on={.42}/>
      <FloorGlow cam={cam} x={-.35} z={7.9} w={3.4} d={2.2} color="#a8d8ef" o={.2}/>
      <Gurney cam={cam} f={f} x={-.35} z={7.9}/>
      {/* steam drifts — the sheet never moves */}
      <CDust f={f} cam={cam} n={26} seed={573} color="#e8f4fa" z0={6} z1={12} x0={-3} x1={3} h={3}/>
      <NearCol cam={cam} x={-1.72} z={6.15}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={24} seed={573} color="#eef7fb" drift={.12}/>
    <Finish f={f} vig={.78} grain={.066} shadow="#071c2e" gradeO={.23}/>
  </>;
};

/* ───────────────────────── shot D · the witness problem (403–559) ───────────────────────── */
const ShotD: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutD) / (T.end - T.cutD));
  const cam: Cam = { x: lerp(1.62, 1.86, easeInOut(u)), y: 1.5, z: lerp(4.05, 3.62, easeInOut(u)), f: 1400, shiftY: -55 };
  const enter = prog(f, T.with, T.with + 14);         // Gus's profile enters frame-left
  const snap = prog(f, T.victor, T.victor + 5);       // eyes snap on the name
  const fidget = (Math.sin(f * .21) * .5 + .5) * (1 - snap);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.85}/>
      <LightCone cam={cam} x={2.0} z={8.0} y={3.7} w={1.6} on={.95}/>
      <LightCone cam={cam} x={-3.6} z={11.4} y={3.8} w={1.8} on={.5}/>
      <Fluoro cam={cam} x={2.0} z={8.0} y={3.7} len={1.6}/>
      <FloorGlow cam={cam} x={1.9} z={8.8} w={3} d={2} color="#8fd0f2" o={.17}/>
      {/* Victor: cuff fidget the whole shot — then he freezes on the name */}
      <Card cam={cam} x={1.9} z={8.8} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .075),
          torso: 2 + snap * -1, neck: 2 + snap * 4,
          shL: 18 + fidget * 4, elL: -36 + fidget * 5, wrL: -8 - fidget * 10,
          shR: -12 - fidget * 3, elR: -26 - fidget * 4, wrR: 6 + fidget * 8,
          hipL: 7, hipR: -5,
        }} view={.22} look={vLook(f, 21, {
          yaw: lerp(.3, .48, snap), lids: .18 + blink(f, 21) * .7 + snap * .12,
          lookX: lerp(-.28, -.88, snap), lookY: lerp(-.12, .04, snap),
          brow: lerp(.18, .5, snap), mouth: "flat",
        })} pal={VIC} height={1.8}/>
      </Card>
      {/* Gus's profile in the near layer: he names the problem */}
      <Card cam={cam} x={1.86 - 1.42} z={6.35} blur={false} opacity={.6 + .4 * enter}>
        <g transform={`translate(${lerp(-.55, .0, enter)},0)`}>
          {/* shoulders + collar */}
          <path d="M-.52,-.62 Q-.3,-1.06 .02,-1.1 L.16,-1.02 Q.26,-.94 .3,-.62 Z" fill="#2c4254"/>
          {/* neck */}
          <path d="M-.06,-1.34 L.12,-1.28 L.1,-1.02 L-.1,-1.08 Z" fill="#2c4254"/>
          {/* skull + face profile facing +x */}
          <path d="M-.17,-1.56 Q-.18,-1.86 .02,-1.9 Q.2,-1.9 .22,-1.72 L.23,-1.62 L.29,-1.5 L.22,-1.47 Q.25,-1.42 .23,-1.39 L.2,-1.37 Q.23,-1.32 .2,-1.27 L.13,-1.22 Q.0,-1.17 -.1,-1.24 L-.14,-1.36 Q-.2,-1.44 -.17,-1.56 Z" fill="#2c4254"/>
          {/* goatee */}
          <path d="M.16,-1.3 Q.18,-1.22 .11,-1.18 Q.04,-1.16 .0,-1.22 L.04,-1.28 Z" fill="#223444"/>
          {/* rim light along the face edge */}
          <path d="M.22,-1.72 L.23,-1.62 L.29,-1.5 L.22,-1.47 Q.25,-1.42 .23,-1.39" fill="none" stroke="#7fa4b8" strokeWidth={.022} opacity={.75}/>
          {/* eye: pupil shifts on the name */}
          <ellipse cx={.14} cy={-1.58} rx={.045} ry={.028} fill="#d5e7ee" opacity={.92}/>
          <circle cx={.155 + lerp(.006, -.018, snap)} cy={-1.58} r={.017} fill="#141f28"/>
          <path d="M.1,-1.63 Q.15,-1.65 .19,-1.62" stroke="#1b2b38" strokeWidth={.014} fill="none"/>
        </g>
      </Card>
      <CDust f={f} cam={cam} n={22} seed={574} color="#dff0f7" z0={5} z1={13} x0={-4} x1={4} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={26} seed={574} color="#e9f5fa" drift={.12}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────────── assembly + sound ───────────────────────── */
export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#223744" }}>
      <Sequence from={0} durationInFrames={T.cutB} name="A owns somebody"><ShotA f={f} /></Sequence>
      <Sequence from={T.cutB} durationInFrames={T.cutC - T.cutB} name="B he waits"><ShotB f={f} /></Sequence>
      <Sequence from={T.cutC} durationInFrames={T.cutD - T.cutC} name="C dead chemist"><ShotC f={f} /></Sequence>
      <Sequence from={T.cutD} durationInFrames={T.end - T.cutD} name="D witness problem"><ShotD f={f} /></Sequence>
      <Sequence from={0} durationInFrames={T.end}><Audio src={staticFile("sfx/c_lab_bed.wav")} volume={(fr) => 0.035 * clamp((T.end - fr) / 40)} /></Sequence>
    </AbsoluteFill>
  );
};
