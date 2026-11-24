// SCENE 058 · "argue" · superlab — Walter's calm case against being replaceable; Gus answers
// with silence and a suit. Revised per lead QA rounds 1–2: medium/close staging (heroes fill
// 1/3–2/3 frame height), cold-open lab treatment (light cones, steel highlights, haze, pools,
// near-layer equipment), every beat carries a narration-matched action — nothing hangs idle.
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose, STAND } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Fluoro, LightCone, FloorGlow } from "../../env/Lab";
import { CSoftDefs, CShadow, CDust } from "../../env/c_common";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 58, id: "argue", set: "superlab", cutIn: 962.16, cutOut: 979.9 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  morning: beat(963.02), walter: beat(963.32), argues: beat(963.56), case_: beat(964.28), lab: beat(964.8),
  cutB: beat(965.6), eight: beat(965.6), million: beat(965.72), equipment: beat(966.58),
  chain: beat(967.3), business: beat(968.46), disappears: beat(968.96), without: beat(969.3), him: beat(969.78),
  cutC: beat(970.48), calm: beat(970.7), right: beat(971.88), talks: beat(972.92), time: beat(973.92),
  cutD: beat(975.3), gus: beat(975.62), listens: beat(975.78), silence: beat(977.12),
  puts: beat(977.98), suit: beat(978.42), on: beat(978.64), over: beat(978.82), clothes: beat(979.2), end: beat(979.9),
};

/** Walt's speech blocks (b-ranges) drive the mouth flap */
const talkAt = (f: number) => {
  const blocks: [number, number][] = [[T.walter, T.lab + 6], [T.eight, T.equipment + 4], [T.chain - 4, T.him + 4], [T.calm - 2, T.time + 4]];
  for (const [a, b] of blocks) if (f >= a && f <= b) return 0.5 + 0.5 * Math.sin(f * 0.92);
  return 0;
};

/** near-layer steel column with a valve wheel — frame edges only */
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

/* ───────────────────── shot A · argues his case (0–103) ───────────────────── */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp(f / T.cutB);
  const cam: Cam = { x: lerp(-.28, -.12, easeInOut(u)), y: 1.5, z: lerp(4.3, 4.52, easeInOut(u)), f: 1560, shiftY: -55 };
  const chop = Math.sin(f * .34) * .5 + .5;                 // rhythmic chopping gesture
  const argue = prog(f, T.walter, T.case_ + 10);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.95}/>
      <LightCone cam={cam} x={0} z={8.2} y={3.7} w={1.6} on={1}/>
      <LightCone cam={cam} x={-4.4} z={11} y={3.8} w={1.8} on={.55}/>
      <LightCone cam={cam} x={4.8} z={11.8} y={3.8} w={1.8} on={.55}/>
      <Fluoro cam={cam} x={0} z={8.2} y={3.7} len={1.6}/>
      <FloorGlow cam={cam} x={.1} z={9.0} w={3} d={2} color="#8fd0f2" o={.18}/>
      {/* Walter mid-argument: counting hand + rolled printout in the other */}
      <Card cam={cam} x={.1} z={9.0} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .07), torso: -3, neck: 4 + Math.sin(f * .16) * 1.2,
          shR: 22 + chop * 5 * argue, elR: -36 + chop * 9 * argue, wrR: -6 - chop * 12 * argue,
          shL: lerp(10, 30, argue), elL: lerp(-30, -52, argue), wrL: lerp(4, -14, argue),
          hipL: 5, hipR: -3,
        }} view={.16} look={teacherLook({
          yaw: .22, lids: .16 + blink(f, 11) * .66, lookX: .3, lookY: -.04,
          brow: -.3, mouth: "open", mouthOpen: .1 + .24 * talkAt(f),
        })} pal={TEACHER.pal} height={TEACHER.height}/>
        {/* rolled printout in his screen-right hand */}
        <g transform="translate(.24,-1.06) rotate(-24)">
          <rect x={-.045} y={-.14} width={.09} height={.3} rx={.045} fill="#e8e4d4" stroke="#7a766a" strokeWidth={.012}/>
          <path d="M-.02,-.1 h.05 M-.02,-.02 h.05 M-.02,.06 h.05" stroke="#9a958a" strokeWidth={.008}/>
        </g>
      </Card>
      <NearCol cam={cam} x={-1.66} z={6.25}/>
      <CDust f={f} cam={cam} n={22} seed={581} color="#dff0f7" z0={5} z1={13} x0={-4} x1={4} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={24} seed={581} color="#e9f5fa" drift={.14}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────── shot B · the case: equipment, chain, business (103–256) ───────────────────── */
const ShotB: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutB) / (T.cutC - T.cutB));
  const cam: Cam = { x: lerp(-.55, -.25, easeInOut(u)), y: 1.5, z: lerp(4.05, 4.3, easeInOut(u)), f: 1420, shiftY: -50 };
  const sweep = prog(f, T.equipment - 8, T.equipment + 14);   // arm sweeps at the lab
  const line = prog(f, T.chain - 6, T.chain + 16);            // hand draws the chain
  const openP = prog(f, T.disappears, T.him + 6);             // palm opens — without him
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.95}/>
      <LightCone cam={cam} x={.8} z={8.6} y={3.7} w={1.7} on={1}/>
      <LightCone cam={cam} x={-4} z={11.2} y={3.8} w={1.8} on={.5}/>
      <LightCone cam={cam} x={5} z={12} y={3.8} w={1.8} on={.5}/>
      <Fluoro cam={cam} x={.8} z={8.6} y={3.7} len={1.7}/>
      <FloorGlow cam={cam} x={.75} z={9.3} w={3} d={2} color="#8fd0f2" o={.18}/>
      {/* Walter, over Gus's shoulder: he addresses the room itself */}
      <Card cam={cam} x={.75} z={9.3} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .07), torso: -4 - sweep * 2 + openP * 2, neck: 3 + line * -2,
          shR: lerp(18, 74, sweep) * (1 - line) + line * 46 - openP * 22,
          elR: lerp(-32, -6, sweep) * (1 - line) + line * -58 + openP * 26,
          wrR: lerp(0, -8, line) + openP * 18,
          shL: lerp(12, 34, line) * (1 - openP) + openP * 52,
          elL: lerp(-30, -46, line) * (1 - openP) + openP * -8,
          wrL: lerp(0, 12, openP),
          hipL: 5, hipR: -3,
        }} view={.3} look={teacherLook({
          yaw: lerp(.34, .12, openP), lids: .17 + blink(f, 13) * .68, lookX: lerp(.4, .1, openP), lookY: -.06,
          brow: lerp(-.3, -.14, openP), mouth: "open", mouthOpen: .1 + .24 * talkAt(f),
        })} pal={TEACHER.pal} height={TEACHER.height}/>
      </Card>
      {/* Gus's head/shoulder in the near layer — the listener's silhouette */}
      <Card cam={cam} x={lerp(-2.05, -1.72, u)} z={7.15} blur={false}>
        <path d="M-.5,-.4 Q-.28,-1.02 .04,-1.06 L.18,-.98 Q.28,-.9 .32,-.4 Z" fill="#223444"/>
        <path d="M-.12,-1.3 L.1,-1.26 L.12,-1.0 L-.1,-1.06 Z" fill="#223444"/>
        <path d="M-.16,-1.5 Q-.16,-1.78 .04,-1.82 Q.22,-1.8 .23,-1.62 L.24,-1.52 L.3,-1.42 L.23,-1.39 Q.26,-1.34 .23,-1.3 L.16,-1.26 Q.02,-1.22 -.08,-1.28 L-.12,-1.4 Z" fill="#223444"/>
        <path d="M.18,-1.44 Q.2,-1.37 .13,-1.33 Q.06,-1.31 .02,-1.36 L.06,-1.4 Z" fill="#1a2c3c"/>
        <path d="M.23,-1.62 L.24,-1.52 L.3,-1.42 L.23,-1.39" fill="none" stroke="#7fa4b8" strokeWidth={.02} opacity={.7}/>
        <ellipse cx={.15} cy={-1.5} rx={.042} ry={.026} fill="#d5e7ee" opacity={.9}/>
        <circle cx={.16} cy={-1.5} r={.016} fill="#141f28"/>
      </Card>
      <CDust f={f} cam={cam} n={22} seed={582} color="#dff0f7" z0={5} z1={13} x0={-4} x1={4} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={24} seed={582} color="#e9f5fa" drift={.12}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────── shot C · he is calm (256–390) ───────────────────── */
const ShotC: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutC) / (T.cutD - T.cutC));
  const cam: Cam = { x: lerp(.02, .1, easeInOut(u)), y: 1.62, z: lerp(6.82, 7.02, easeInOut(u)), f: 2000, shiftY: -26 };
  const nod = prog(f, T.right, T.right + 14) * (1 - prog(f, T.talks, T.talks + 12));
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.8}/>
      <LightCone cam={cam} x={.1} z={8.6} y={3.7} w={1.7} on={1}/>
      <LightCone cam={cam} x={-4} z={11} y={3.8} w={1.8} on={.45}/>
      <Fluoro cam={cam} x={.1} z={8.6} y={3.7} len={1.7}/>
      <FloorGlow cam={cam} x={.1} z={9} w={3} d={2} color="#8fd0f2" o={.16}/>
      {/* face close: unhurried, correct, still talking */}
      <Card cam={cam} x={.1} z={8.6} blur={false}>
        <CShadow rx={.4} ry={.12} o={.4}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .06), torso: -2 + nod * 1.2, neck: 3 - nod * 4 + Math.sin(f * .14) * .8,
          shR: 16, elR: -28, shL: 12, elL: -24, hipL: 5, hipR: -3,
        }} view={.12} look={teacherLook({
          yaw: .16, lids: .15 + blink(f, 9, 90) * .6, lookX: lerp(.12, .2, nod), lookY: -.02,
          brow: lerp(-.22, -.32, nod), mouth: "open", mouthOpen: .08 + .22 * talkAt(f),
        })} pal={TEACHER.pal} height={TEACHER.height}/>
      </Card>
      <NearCol cam={cam} x={-1.28} z={7.1}/>
      <CDust f={f} cam={cam} n={20} seed={583} color="#dff0f7" z0={6} z1={13} x0={-3} x1={3} h={3.2}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={22} seed={583} color="#e9f5fa" drift={.1}/>
    <Finish f={f} vig={.74} grain={.06} shadow="#071c2e" gradeO={.2}/>
  </>;
};

/* ───────────────────── shot D · in silence, the suit (390–532) ───────────────────── */
const ShotD: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutD) / (T.end - T.cutD));
  const cam: Cam = { x: lerp(1.12, 1.32, easeInOut(u)), y: 1.5, z: lerp(4.4, 4.58, easeInOut(u)), f: 1420, shiftY: -52 };
  const swing = prog(f, T.puts - 6, T.suit + 8, easeInOut);   // the suit swings up
  const settle = prog(f, T.on, T.clothes + 4, easeInOut);     // smoothed down over the clothes
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CSuperlab cam={cam} f={f} near={false} busy={.9}/>
      <LightCone cam={cam} x={1.6} z={8.4} y={3.7} w={1.7} on={1}/>
      <LightCone cam={cam} x={-3.2} z={11.2} y={3.8} w={1.8} on={.5}/>
      <LightCone cam={cam} x={5.6} z={11.8} y={3.8} w={1.8} on={.5}/>
      <Fluoro cam={cam} x={1.6} z={8.4} y={3.7} len={1.7}/>
      <FloorGlow cam={cam} x={1.6} z={9} w={3} d={2} color="#8fd0f2" o={.18}/>
      {/* Gus listens in silence while the suit goes on over his clothes */}
      <Card cam={cam} x={1.6} z={9.0} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...STAND, breathe: breath(f, .055), torso: 1 + swing * -2 + settle * 1, neck: 3,
          shR: lerp(-20, -42, swing) * (1 - settle) + settle * -16,
          elR: lerp(-38, -14, swing) * (1 - settle) + settle * -30,
          wrR: lerp(-6, 4, swing) + settle * (-4 + 5 * Math.sin(f * .24)),
          shL: lerp(14, 40, swing) * (1 - settle) + settle * 18,
          elL: lerp(-32, -12, swing) * (1 - settle) + settle * -34,
          wrL: lerp(6, -4, swing) + settle * (4 - 5 * Math.sin(f * .24)),
          hipL: 5, hipR: -3,
        }} view={.18} look={restaurateurLook({
          yaw: .42, lids: .18 + blink(f, 14, 150) * .64, lookX: -.42, lookY: -.02, brow: .1, mouth: "flat",
        })} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
        {/* the lab suit: hangs from the hand, swings up, then covers the torso */}
        <g transform={`translate(${lerp(.3, 0, swing)},${lerp(-1.0, -1.3, swing)}) rotate(${lerp(26, 0, swing)}) scale(${lerp(.82, 1, swing)})`} opacity={.55 + .45 * swing}>
          <path d="M-.27,-.24 q.27,-.16 .54,0 l.09,.66 q-.03,.34 -.35,.36 q-.32,.02 -.35,-.36z" fill="#c9bb56" stroke="#8d8138" strokeWidth={.016} strokeLinejoin="round"/>
          <path d="M0,-.18 v.98" stroke="#8d8138" strokeWidth={.012}/>
          <path d="M-.1,-.2 q.1,-.1 .2,0 l-.06,.12 q-.04,-.06 -.08,0z" fill="#b3a544"/>
          <path d="M-.2,.3 q.2,.1 .4,0" stroke="#8d8138" strokeWidth={.012} fill="none" opacity={settle}/>
        </g>
      </Card>
      <NearCol cam={cam} x={3.32} z={6.15} flip/>
      <CDust f={f} cam={cam} n={22} seed={584} color="#dff0f7" z0={5} z1={13} x0={-3} x1={5} h={3.4}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={24} seed={584} color="#e9f5fa" drift={.12}/>
    <Finish f={f} vig={.76} grain={.062} shadow="#071c2e" gradeO={.22}/>
  </>;
};

/* ───────────────────────── assembly + sound ───────────────────────── */
export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#223744" }}>
      <Sequence from={0} durationInFrames={T.cutB} name="A argues his case"><ShotA f={f} /></Sequence>
      <Sequence from={T.cutB} durationInFrames={T.cutC - T.cutB} name="B equipment chain business"><ShotB f={f} /></Sequence>
      <Sequence from={T.cutC} durationInFrames={T.cutD - T.cutC} name="C he is calm"><ShotC f={f} /></Sequence>
      <Sequence from={T.cutD} durationInFrames={T.end - T.cutD} name="D the suit"><ShotD f={f} /></Sequence>
      <Sequence from={0} durationInFrames={T.end}><Audio src={staticFile("sfx/c_lab_bed.wav")} volume={(fr) => 0.035 * clamp((T.end - fr) / 40)} /></Sequence>
    </AbsoluteFill>
  );
};
