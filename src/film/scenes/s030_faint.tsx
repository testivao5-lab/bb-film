// SCENE 030 · "faint" · set: basement · narration 452.74s → 457.60s (4.86s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration: "Then he faints at the bottom of the stairs holding a sandwich, and the plate breaks."
// Research (S01E03): Walt carries a crustless sandwich down the basement stairs, has a coughing fit,
// passes out on the slab and the plate shatters.
// Beat map (local frames = beat(narration second)):
//   b(453.18) "Then"       starts down the last steps, plate held out in both hands
//   b(453.52) "faints"     the cough folds him — anticipation, then the knees go
//   b(454.42) "stairs,"    he pitches off the treads
//   b(454.98) "holding a"  (slow) the plate leaves his fingers, still perfectly level
//   b(455.38) "sandwich,"  impact on the slab; the sandwich tumbles away
//   b(456.60) "plate breaks" crockery bursts across the floor
// Hard cuts only; no text.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { kf, prog, sec, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, rand, noise1, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, tint, mixHex } from "../../rig/cast";
import {
  BS, BasementRoom, Stairs, Post, WaterHeater, Furnace, Shelves, CardboardBox, Bucket, FloorStain, PlasticPool,
} from "../../env/b_basement";
import { SoftDefs, Dust } from "../../env/b_common";
import { Plate, Sandwich, PlateBurst } from "../../props/b_props";
import { rigAnchors } from "../../props/b_pose";
import { Finish } from "../../fx/Post";

export const META = { n: 30, id: "faint", set: "basement", cutIn: 452.74, cutOut: 457.6 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const B = beat;
const END = B(457.6);
const CUTS = { s1: 0, s2: B(454.08), s3: B(455.62), end: END };

const PAL = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.1) : c));
const RIM = "#ffd9a0";

// set numbers (metres) — stairs climb away from camera on the right
const ST = { x0: 0.35, width: 1.25, z0: 4.0, run: 0.27, steps: 12, rise: BS.ceil };
const DY = ST.rise / ST.steps;
const stepTop = (i: number) => (i + 1) * DY;
const sx = ST.x0 + ST.width * 0.5;        // stair centre-line
const MAN = { x: -1.65, z: 4.5 };        // the post / where he ends up
const PLATE = { x: 0.05, z: 3.35 };       // where the plate lands

/* ─────────────── S1 · down the last steps, then the cough wins ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const cough = (t0: number) => clamp(1 - Math.abs(f - t0) / 8);
  const seal = Math.max(cough(B(453.4)), cough(B(453.62)) * 1.1, cough(B(453.86)) * 1.25);
  const cam: Cam = { x: 0.25 + 0.05 * seal, y: 1.2, z: lerp(1.35, 0.95, easeInOut(clamp(f / dur))) + 0.1 * seal, f: 1380, shiftY: 140, focus: 3.4, aperture: 0.7 };
  // he walks down: tread index falls, anticipation on the cough, then the knees buckle
  const buck = prog(g, B(453.7), B(454.08), easeIn);
  const walkT = clamp(f / B(453.7));
  const ti = lerp(6.4, 4.0, walkT);                       // tread index (from the bottom)
  const y = lerp(stepTop(Math.round(ti)), stepTop(Math.round(ti) + 1), 0.5) * (1 - buck * 0.55) + buck * 0.12;
  const stride = 3.6 * Math.sin(f * 0.42) * (1 - buck);
  const pose: Pose = {
    torso: 5 + 12 * seal + 58 * buck,
    neck: 4 + 14 * seal + 16 * buck,
    shL: 36 + 20 * seal + 34 * buck, shR: 34 + 8 * seal + 26 * buck,
    elL: 86 + 10 * seal + 10 * buck, elR: 82 + 6 * seal + 8 * buck,
    hipL: 5 + stride + 44 * buck, hipR: -5 - stride + 34 * buck,
    knL: 8 + 22 * Math.max(0, stride / 3.6) + 66 * buck, knR: 8 + 22 * Math.max(0, -stride / 3.6) + 56 * buck,
    breathe: 0.3 + seal * 0.55,
  };
  const look = teacherLook({
    yaw: 0.66, lids: clamp(0.1 + 0.5 * seal + 0.5 * buck),
    lookX: 0.05, lookY: 0.1 + 0.5 * buck,
    brow: -0.2 - 0.7 * seal, mouth: seal > 0.3 ? "pain" : "open", mouthOpen: 0.12 + 0.5 * seal,
    sweat: 0.45 * seal,
  });
  const z = ST.z0 + ti * ST.run + 0.05;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BasementRoom cam={cam} f={g} bulb={1} shaft={0.55} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
        <Shelves cam={cam} x={-3.0} z={5.4} w={1.1} seed={4} />
        <Furnace cam={cam} x={-1.5} z={6.6} />
        <WaterHeater cam={cam} x={-0.5} z={7.0} />
        <Post cam={cam} x={MAN.x} z={MAN.z} />
        <Bucket cam={cam} x={MAN.x + 0.42} z={MAN.z + 0.2} />
        <CardboardBox cam={cam} x={-2.6} z={4.6} seed={3} />
        <CardboardBox cam={cam} x={-2.1} z={4.45} w={0.42} h={0.34} seed={5} rot={-7} />
        <PlasticPool cam={cam} x={-1.9} z={5.9} r={0.6} seed={2} />
        <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
        {/* he is on the treads, plate level in both hands */}
        <Card cam={cam} x={sx} y={y} z={z} flip>
          <Figure pose={pose} view={0.9} look={look} pal={PAL} height={TEACHER.height} rimLight={RIM} rimSide={1} />
          {(() => {
            const a = rigAnchors(pose, TEACHER.height, 0.9);
            return (
              <g transform={`translate(${(a.wristL.x + a.wristR.x) / 2 + 0.06},${(a.wristL.y + a.wristR.y) / 2 + 0.02}) scale(1.0)`}>
                <Plate r={0.115} />
                <g transform="translate(0,-0.014)"><Sandwich s={1.45} tilt={-8} /></g>
              </g>
            );
          })()}
          {/* contact shadow keeping him attached to the treads */}
          <ellipse cx={-0.08} cy={0.01} rx={0.3} ry={0.05} fill="#000" opacity={0.32} />
        </Card>
        <Dust f={g} cam={cam} n={24} seed={9} color="#f6ecd9" z0={1.6} z1={6} x0={-2.4} x1={2.2} h={1.7} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · he goes over the edge of the treads ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.15, 0.0, easeInOut(t)), y: 0.86, z: lerp(2.05, 2.35, easeInOut(t)), f: 1300, shiftY: 40, focus: 2.6, aperture: 0.9 };
  // fall: tips off the tread, slides, hits the slab on "holding a"
  const tip = prog(g, B(454.15), B(454.6), easeIn);
  const fall = prog(g, B(454.6), B(455.0), easeIn);
  const hit = prog(g, B(455.0), B(455.3), easeOut);
  const settle = prog(g, B(455.3), B(456.4), easeOut);
  const bodyY = lerp(lerp(0.95, 0.6, tip), 0, fall);
  const x = lerp(1.0, 0.35, fall);
  const z = lerp(4.45, 4.15, fall);
  const pose: Pose = {
    torso: lerp(lerp(50, 74, tip), 86, hit),
    neck: lerp(lerp(14, -4, tip), -14, hit),
    shL: lerp(lerp(66, 84, tip), 18, settle), shR: lerp(lerp(50, 60, tip), -6, settle),
    elL: lerp(lerp(40, 20, tip), 34, settle), elR: lerp(lerp(30, 26, tip), 8, settle),
    hipL: lerp(lerp(54, 40, tip), 8, hit), hipR: lerp(lerp(40, 26, tip), 2, hit),
    knL: lerp(lerp(88, 60, tip), 12, hit), knR: lerp(lerp(74, 44, tip), 22, hit),
    breathe: 0.22,
  };
  // the plate: leaves his hands at "holding a", arcs down to the slab
  const pf = prog(g, B(454.98), B(455.62), easeIn);
  const px = lerp(0.95, PLATE.x, pf), pz = lerp(4.2, PLATE.z, pf);
  const py = lerp(0.74, 0.0, pf) - Math.sin(pf * Math.PI) * 0.1;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BasementRoom cam={cam} f={g} bulb={1} shaft={0.5} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
        <Shelves cam={cam} x={-3.0} z={5.4} w={1.1} seed={4} />
        <Furnace cam={cam} x={-1.5} z={6.6} />
        <WaterHeater cam={cam} x={-0.5} z={7.0} />
        <Post cam={cam} x={MAN.x} z={MAN.z} />
        <Bucket cam={cam} x={MAN.x + 0.42} z={MAN.z + 0.2} />
        <CardboardBox cam={cam} x={-2.6} z={4.6} seed={3} />
        <PlasticPool cam={cam} x={-1.9} z={5.9} r={0.6} seed={2} />
        <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
        <FloorStain cam={cam} x={x - 0.1} z={z + 0.1} r={0.5} color="#4a4034" o={0.25} seed={3} />
        <Card cam={cam} x={x} y={bodyY} z={z} flip>
          <Figure pose={pose} view={0.92} look={teacherLook({
            yaw: 0.5, lids: lerp(0.55, 0.97, hit), lookX: 0, lookY: 0.5,
            brow: -0.7, mouth: "pain", mouthOpen: 0.25, sweat: 1,
          })} pal={PAL} height={TEACHER.height} rimLight={RIM} rimSide={-1} />
        </Card>
        {pf < 1 && (
          <Card cam={cam} x={px} y={py} z={pz}>
            <g transform={`rotate(${pf * 150})`}>
              <Plate r={0.115} shadow={false} />
              <g transform="translate(0,-0.014)"><Sandwich s={1.45} tilt={-14} /></g>
            </g>
          </Card>
        )}
        <Dust f={g} cam={cam} n={20} seed={12} color="#f6ecd9" z0={1.6} z1={5} x0={-2} x1={2} h={1.2} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · floor level: the plate breaks, then the long shard slides away ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  // low, waisted camera looking across the slab; slow push-in as the plate goes
  const cam: Cam = { x: lerp(-0.4, -0.32, easeInOut(t)), y: 0.34, z: 1.6, f: 1300, shiftY: 40, focus: 2.2, aperture: 1.0 };
  const burst = prog(g, B(456.56), B(457.02), easeOut);
  const settle = prog(g, B(457.02), B(457.4), easeOut);
  const sandT = prog(g, B(455.66), B(456.35), easeOutBack);
  // the long shard: skitters toward the lens and out of frame (paid off in scene 33)
  const skid = prog(g, B(456.7), B(457.5), easeOut);
  const lying: Pose = {
    torso: -84, neck: -12, shL: -30, shR: 16, elL: 44, elR: 26,
    hipL: 26, hipR: 10, knL: 62, knR: 34, breathe: 0.2,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BasementRoom cam={cam} f={g} bulb={1} shaft={0.62} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
        <Post cam={cam} x={MAN.x} z={MAN.z} />
        <Bucket cam={cam} x={MAN.x + 0.42} z={MAN.z + 0.2} />
        <CardboardBox cam={cam} x={-2.5} z={5.0} seed={3} />
        <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
        {/* he lies on the slab beyond the plate — head toward camera-left */}
        <Card cam={cam} x={-0.5} y={0} z={MAN.z + 0.1} flip>
          <Figure pose={lying} view={0.9} look={teacherLook({
            yaw: 0.45, lids: 0.95, lookX: 0, lookY: 0.35, brow: -0.35, mouth: "open", mouthOpen: 0.1, sweat: 0.85,
          })} pal={PAL} height={TEACHER.height} rimLight={RIM} rimSide={-1} />
        </Card>
        {/* the plate on the slab, just off his hand */}
        <Card cam={cam} x={PLATE.x} y={0.01} z={PLATE.z}>
          {burst < 0.02 ? <Plate r={0.115} /> : <PlateBurst t={burst} n={11} seed={12} />}
          <g transform={`translate(${lerp(0.02, 0.22, sandT)},${-0.02 - (1 - sandT) * 0.3}) rotate(${lerp(-10, 40, sandT)})`}>
            <ellipse cx={0} cy={0.006} rx={0.05} ry={0.016} fill="#000" opacity={0.3 * sandT} />
            <Sandwich s={1.45} tilt={lerp(-16, 8, sandT)} />
          </g>
          {Array.from({ length: 7 }).map((_, i) => {
            const a = rand(i, 21) * Math.PI * 2;
            const d = 0.05 + rand(i, 22) * 0.18;
            return <circle key={i} cx={Math.cos(a) * d * (0.4 + 0.6 * burst)} cy={Math.sin(a) * d * 0.42} r={0.0035} fill="#c9a86a" opacity={0.85 * (1 - settle * 0.2)} />;
          })}
        </Card>
        {/* the long, sharp shard — the one that will be missing */}
        <Card cam={cam} x={lerp(PLATE.x - 0.1, PLATE.x + 0.05, skid)} y={0.006} z={lerp(PLATE.z - 0.3, PLATE.z + 0.55, skid)}>
          <g transform={`rotate(${lerp(-40, 8, skid)})`}>
            <path d="M0,0 L0.022,-0.004 L0.11,0.002 L0.086,0.011 L0.014,0.012 Z" fill="#f4eee1" stroke="#8b8474" strokeWidth={0.0022} />
            <path d="M0.02,-0.002 L0.1,0.002" stroke="#fff" strokeWidth={0.003} opacity={0.7} />
          </g>
        </Card>
        {/* near-lens depth: a crate corner out of focus */}
        <Card cam={cam} x={-1.35} y={0} z={2.5}>
          <path d="M-0.3,0 L-0.26,-0.24 L0.28,-0.22 L0.3,0.02 Z" fill="#6e5d45" stroke="#221a12" strokeWidth={0.012} />
          <path d="M-0.24,-0.22 L0.26,-0.2" stroke="#a89273" strokeWidth={0.02} opacity={0.5} />
        </Card>
        <Dust f={g} cam={cam} n={18} seed={15} color="#f6ecd9" z0={1.2} z1={3.5} x0={-1.2} x1={1.2} h={0.8} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 down the stairs"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 he goes over"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 plate breaks"><S3 /></Sequence>
    <Audio src={staticFile("sfx/b_room_basement.wav")} volume={0.035} />
    <Sequence from={B(453.4)} durationInFrames={54}><Audio src={staticFile("sfx/b_chain.wav")} volume={0.05} /></Sequence>
    <Sequence from={B(455.0)} durationInFrames={66}><Audio src={staticFile("sfx/b_faint_crash.wav")} volume={0.14} /></Sequence>
  </AbsoluteFill>
);
