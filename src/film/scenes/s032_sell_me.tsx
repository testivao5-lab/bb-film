// SCENE 032 · "sell-me" · set: basement · narration 478.69s → 494.83s (16.14s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration:
//   "So Walter White says the truest sentence of his life: 'I sure as hell am looking for any reason not
//    to. Sell me.'"
//   "And Krazy-8 sells him a promise, and admits in the same breath that any man in his position would
//    make it, so it is worth nothing."
// Show-don't-tell:
//   b(479.27) "So Walter White says"      he leans forward on the crate, elbows on knees
//   b(480.30) "the truest sentence"       he takes his glasses off and cleans them (a tell)
//   b(482.54) "I sure as hell"            he puts them back on and looks straight at him
//   b(483.80) "looking for"               open palm out — "give me something"
//   b(485.06) "to." / b(486.13) "Sell me." the hand turns over, empty: an offer
//   b(487.71) "sells him a promise"       reverse: the prisoner nods, talks, hand on his chest
//   b(489.95) "admits"                    his hand opens — even he doesn't believe it
//   b(491.92) "any man in his position"   he glances away at the stairs: the way out
//   b(493.25) "so it is worth nothing"    the promise dies in the air; Walt's hand closes on nothing
// 3 shots, hard cuts, no text.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, breath, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import {
  BS, BasementRoom, Stairs, Post, WaterHeater, Furnace, Shelves, CardboardBox, Bucket, PlasticPool, Chain, FloorStain,
} from "../../env/b_basement";
import { SoftDefs, Dust } from "../../env/b_common";
import { Sandwich } from "../../props/b_props";
import { chairSit, floorSit } from "../../props/b_pose";
import { Finish } from "../../fx/Post";

export const META = { n: 32, id: "sell-me", set: "basement", cutIn: 478.69, cutOut: 494.83 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(494.83);
const CUTS = { s1: 0, s2: B(487.4), s3: B(492.4), end: END };

const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.1) : c));
const PRISONER = {
  ...PARTNER, height: 1.71,
  pal: tint(PARTNER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.16) : c)),
  hair: { base: "#241a14", dark: "#150e0a", light: "#4a3324", style: "buzz" as const },
};
const prisonerLook = (o: Partial<Parameters<typeof partnerLook>[0]> = {}) => partnerLook({ hair: PRISONER.hair, stubble: 0.9, dirt: 0.5, age: 0.2, ...o });
const RIM = "#ffd9a0";
const POST = { x: -0.62, z: 3.95 };
const CHAIR = { x: 0.66, z: 3.2 };
const ST = { x0: 1.55, width: 1.2, z0: 3.6, run: 0.26, steps: 12, rise: BS.ceil };

const SetBits: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => (
  <>
    <SoftDefs />
    <BasementRoom cam={cam} f={f} bulb={1} shaft={0.5} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
    <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
    <Shelves cam={cam} x={-2.85} z={4.6} w={1.1} seed={4} />
    <Furnace cam={cam} x={-1.75} z={6.2} />
    <WaterHeater cam={cam} x={0.9} z={6.4} />
    <CardboardBox cam={cam} x={-2.5} z={4.0} seed={3} />
    <PlasticPool cam={cam} x={-1.9} z={5.4} r={0.58} seed={2} />
    <Post cam={cam} x={POST.x} z={POST.z} />
    <Bucket cam={cam} x={POST.x - 0.42} z={POST.z + 0.25} />
    <FloorStain cam={cam} x={-0.1} z={4.4} r={0.5} color="#3f382d" o={0.25} seed={5} />
  </>
);

const Prisoner: React.FC<{ cam: Cam; pose: Pose; look: ReturnType<typeof prisonerLook>; view?: number; x?: number; z?: number }> = ({ cam, pose, look, view = 0.45, x = POST.x + 0.4, z = POST.z + 0.05 }) => (
  <Card cam={cam} x={x} z={z}>
    <ellipse cx={0.1} cy={0.008} rx={0.52} ry={0.1} fill="#000" opacity={0.4} />
    <g transform="translate(0,0.12)">
      <Figure pose={pose} view={view} look={look} pal={PRISONER.pal} height={PRISONER.height} rimLight={RIM} rimSide={1} />
    </g>
  </Card>
);

/* ─────────────── S1 · Walt makes the offer ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  // camera: slow truck in from his hands to his face, motivated by "the truest sentence"
  const cam: Cam = { x: lerp(0.42, 0.5, easeInOut(t)), y: 1.16, z: lerp(1.0, 1.2, easeInOut(t)), f: 1500, shiftY: 10, focus: 2.2, aperture: 0.9 };
  const lean = prog(g, B(479.27), B(480.0), easeInOut);
  const glassesOff = prog(g, B(480.3), B(480.9), easeInOut) * (1 - prog(g, B(482.4), B(482.9), easeInOut));
  const palmOut = prog(g, B(483.8), B(484.5), easeOutBack) * (1 - prog(g, B(486.1), B(486.6), easeInOut));
  const turnOver = prog(g, B(486.05), B(486.6), easeOut);
  const closeHand = prog(g, B(493.25), B(494.2), easeIn);
  const pose: Pose = chairSit({
    torso: -2 + 10 * lean,
    neck: 4 + 6 * lean - 4 * glassesOff,
    shL: 26 + 12 * lean,
    shR: 24 + 10 * lean - 30 * glassesOff + 34 * palmOut + 30 * turnOver,
    elL: 62 + 14 * lean,
    elR: 58 + 40 * glassesOff - 40 * palmOut - 46 * turnOver + 40 * closeHand,
    hipL: 84, hipR: 86, knL: 84, knR: 86,
    breathe: 0.4 + 0.25 * breath(g, 0.17), slump: 0.25 + 0.35 * lean,
  });
  const look = teacherLook({
    yaw: 0.44, lids: clamp(0.2 + 0.16 * lean + blink(g, 3) * 0.5 + (glassesOff > 0.3 ? 0.15 : 0)),
    lookX: 0.2, lookY: 0.02,
    brow: 0.1 + 0.3 * lean - 0.2 * closeHand,
    mouth: "open", mouthOpen: 0.1 + 0.26 * Math.abs(Math.sin(g * 0.3)) + 0.12 * lean,
    glasses: glassesOff < 0.55, sweat: 0.25,
  });
  // the glasses, held in his fist while he talks
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <CardboardBox cam={cam} x={CHAIR.x - 0.06} z={CHAIR.z + 0.12} w={0.52} h={0.42} d={0.44} seed={12} />
        <Prisoner cam={cam} pose={floorSit({ torso: -12, neck: 6, shL: -6, shR: 4, elL: 22, elR: 30, hipL: 84, hipR: 76, knL: 28, knR: 46, breathe: breath(g, 0.14) })}
          look={prisonerLook({ yaw: 0.05, lids: 0.22 + blink(g, 7) * 0.6, lookX: 0.14, lookY: -0.06, brow: 0.15, mouth: "flat", bruise: 0.5, sweat: 0.3 })} />
        <Card cam={cam} x={CHAIR.x} y={0} z={CHAIR.z + 0.02} flip>
          <ellipse cx={0.05} cy={0.008} rx={0.4} ry={0.09} fill="#000" opacity={0.38} />
          <Figure pose={pose} view={0.62} look={look} pal={PAL_T} height={TEACHER.height} rimLight={RIM} rimSide={-1} />
          {/* the sandwich, half eaten, on the crate beside him */}
          <g transform="translate(-0.2,-0.42) rotate(-6)"><Sandwich s={1.3} tilt={12} /></g>
          {/* his glasses, in his near hand while he talks */}
          {glassesOff > 0.2 && (
            <g transform={`translate(${lerp(0.34, 0.2, turnOver)},${-0.86}) rotate(${38 + 30 * turnOver})`} opacity={Math.min(1, glassesOff * 1.6)}>
              <path d="M-0.02,0 a0.02,0.016 0 1 0 0.001,0 M0.012,0 a0.02,0.016 0 1 0 0.001,0" stroke="#c9b071" strokeWidth={0.0035} fill="none" />
              <path d="M-0.038,0.002 L-0.05,0.006 M0.03,0.002 L0.042,0.006" stroke="#c9b071" strokeWidth={0.003} />
            </g>
          )}
          {/* the empty offered hand: a soft catch-light so the gesture reads */}
          {palmOut > 0.3 && <ellipse cx={0.44} cy={-0.82} rx={0.05} ry={0.03} fill="#ffe7bd" opacity={0.18} />}
        </Card>
        <Dust f={g} cam={cam} n={20} seed={9} color="#f6ecd9" z0={1.2} z1={5} x0={-2} x1={2} h={1.6} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · reverse: the promise ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.36, -0.3, easeInOut(t)), y: 1.1, z: lerp(2.15, 2.0, easeInOut(t)), f: 1500, shiftY: 30, focus: 1.9, aperture: 1.0 };
  const promise = prog(g, B(487.71), B(488.4), easeInOut);          // hand to chest, earnest
  const admit = prog(g, B(489.95), B(490.7), easeOut);               // hand opens: even he doesn't buy it
  const glance = prog(g, B(491.9), B(492.4), easeInOut) * (1 - prog(g, B(493.0), B(493.6), easeInOut)); // eyes to the stairs
  const die = prog(g, B(493.25), B(494.2), easeInOut);
  const pose: Pose = floorSit({
    torso: -14 + 6 * promise - 4 * die,
    neck: 4 + 4 * promise - 8 * glance,
    shL: -6 + 10 * promise,
    shR: 4 + 54 * promise + 26 * admit - 20 * die,
    elL: 22 + 12 * promise,
    elR: 30 + 76 * promise - 40 * admit + 30 * die,
    hipL: 84, hipR: 76, knL: 28, knR: 46,
    breathe: 0.35 + 0.2 * promise,
  });
  const look = prisonerLook({
    yaw: 0.1 + 0.2 * glance,
    lids: 0.2 + 0.12 * promise + blink(g, 7) * 0.5 + 0.12 * die,
    lookX: lerp(0.16, 0.6, glance), lookY: lerp(-0.06, -0.2, glance),
    brow: 0.2 - 0.2 * promise + 0.25 * admit,
    mouth: "open",
    mouthOpen: 0.1 + 0.2 * Math.abs(Math.sin(g * 0.36)) * (1 - die * 0.7),
    bruise: 0.55, sweat: 0.35, dirt: 0.5,
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <Prisoner cam={cam} pose={pose} look={look} view={0.5} />
        <Chain cam={cam} from={[POST.x + 0.06, 0.24, POST.z + 0.02]} to={[POST.x + 0.5, 0.1, POST.z + 0.22]} sag={0.05} />
        {/* Walt's shoulder, soft, in the foreground — he is listening */}
        <Card cam={cam} x={1.3} y={0} z={2.1} flip>
          <Figure pose={chairSit({ torso: 6, neck: 8, shL: 30, shR: 26, elL: 66, elR: 60, breathe: breath(g, 0.17) })}
            view={0.9} look={teacherLook({ yaw: -0.55, lids: 0.28, lookX: 0.5, lookY: -0.1, brow: 0.2, mouth: "flat", glasses: false })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffcf8a" rimSide={1} />
        </Card>
        <Dust f={g} cam={cam} n={18} seed={13} color="#f6ecd9" z0={1.2} z1={4} x0={-1.6} x1={1.4} h={1.3} />
      </svg>
      <Finish f={g} vig={0.69} grain={0.07} shadow="#2a2118" gradeO={0.17} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · insert: the empty hand closes ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.5, 0.46, easeInOut(t)), y: 0.72, z: lerp(1.55, 1.4, easeInOut(t)), f: 2600, shiftY: 170, focus: 0.95, aperture: 1.1 };
  const close = prog(g, B(493.3), B(494.2), easeInOut);
  const pose: Pose = chairSit({
    torso: 8, neck: 10, shL: 28, shR: 40 - 22 * close, elL: 70, elR: 40 + 60 * close,
    hipL: 84, hipR: 86, knL: 84, knR: 86, breathe: 0.35,
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <CardboardBox cam={cam} x={CHAIR.x} z={CHAIR.z + 0.1} w={0.52} h={0.4} d={0.42} seed={12} />
        <Card cam={cam} x={CHAIR.x} y={0} z={CHAIR.z + 0.02} flip>
          <Figure pose={pose} view={0.8} look={teacherLook({ yaw: 0.7, lids: 0.34, lookX: 0.1, lookY: 0.35, brow: -0.35, mouth: "open", mouthOpen: 0.05, glasses: false, sweat: 0.3 })}
            pal={PAL_T} height={TEACHER.height} rimLight={RIM} rimSide={-1} />
        </Card>
        <Dust f={g} cam={cam} n={14} seed={21} color="#f6ecd9" z0={1.0} z1={3} x0={-0.8} x1={1.4} h={1.0} />
      </svg>
      <Finish f={g} vig={0.72} grain={0.075} shadow="#2a2118" gradeO={0.17} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 sell me"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the promise"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 the empty hand"><S3 /></Sequence>
    <Audio src={staticFile("sfx/b_room_basement.wav")} volume={0.035} />
    <Sequence from={B(482.6)} durationInFrames={36}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.07} /></Sequence>
    <Sequence from={B(493.4)} durationInFrames={30}><Audio src={staticFile("sfx/b_chain.wav")} volume={0.05} /></Sequence>
  </AbsoluteFill>
);
