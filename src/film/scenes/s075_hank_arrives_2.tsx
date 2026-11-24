// SCENE 075 · "hank-arrives-2" · set: desert · narration 1288.52s → 1305.25s (16.73s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the car arrives, and it is his brother-in-law, and he understands what has happened to him. So he calls the men who work for money and tells them where he is, then sees who is in the car and tells them not to come. He tells them twice. They come anyway.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1289.18 the@1289.50 car@1289.70 arrives,@1290.00 and@1290.90 it@1291.12 is@1291.32 his@1291.48
//   brother@1291.60 -in@1291.90 -law,@1292.20 and@1292.76 he@1293.04 understands@1293.12 what@1293.40 has@1293.78
//   happened@1293.86 to@1294.18 him,@1294.36 so@1294.82 he@1295.06 calls@1295.18 the@1295.42 men@1295.72
//   who@1295.88 work@1296.10 for@1296.32 money@1296.56 and@1296.78 tells@1297.10 them@1297.38 where@1297.56
//   he@1297.72 is,@1297.90 then@1298.58 sees@1298.72 who@1299.00 is@1299.32 in@1299.44 the@1299.56 car@1299.66
//   and@1299.92 tells@1300.40 them@1300.68 not@1300.94 to@1301.10 come.@1301.26 He@1302.02 tells@1302.18
//   them@1302.44 twice,@1302.70 they@1303.64 come@1304.10 anyway.@1304.36
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, planePts, W, H } from "../../lib/camera";
import { prog, breath, noise1, easeOut, easeInOut, lerp, rand, clamp } from "../../lib/anim";
import { Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, BROTHER, brotherLook, PARTNER, partnerLook } from "../../rig/cast";
import { DDefs, Puff, Sky, DuneRidge, DesertFloor, Birds } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { Sedan, SedanFront } from "../../props/d_vehicle";
import { Phone } from "../../props/d_props";
import { Actor } from "../../props/d_actor";
import { lidsOf, handAt } from "../../props/d_poses";
import { fitCam, twoShot } from "../../props/d_cam";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 75, id: "hank-arrives-2", set: "desert", cutIn: 1288.52, cutOut: 1305.25 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const DUR = beat(META.cutOut);
const CUT = { s2: beat(1294.8), s3: beat(1298.6), s4: beat(1301.6) };

const WALT = { pal: TEACHER.pal, h: TEACHER.height };
const HANK = { pal: BROTHER.pal, h: BROTHER.height };

/* ─────────────────────────── S1 · the car arrives (0 → 188) ─────────────────────────── */
// He is still at the empty hole. Hank's car rolls up the track. He watches it come, and the moment
// he sees who is driving ("it is his brother-in-law", 1291.12) the phone comes down from his ear.
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + beat(META.cutIn);
  const dur = CUT.s2;
  const t = f / dur;
  const arrive = prog(f, 6, 96, easeOut);
  const carZ = lerp(26, 15.0, arrive);
  const cam: Cam = { x: lerp(1.34, 1.22, easeInOut(t)), y: 1.05, z: lerp(5.5, 5.7, easeInOut(t)), f: 1500, shiftY: 0, focus: 4.0, aperture: 0.5 };
  // his acting: still talking on the phone, then the phone lowers, shoulders drop
  const lower = prog(f, 52, 74, easeInOut);
  const hollow = prog(f, 96, 140, easeInOut);
  const seeIt = prog(f, 80, 104, easeInOut);
  const pose: Pose = {
    torso: 4 + 10 * hollow, neck: -4 + 6 * seeIt - 8 * hollow,
    shL: 25 + 10 * hollow, shR: 18 + 12 * lower, elL: 38 + 12 * hollow, elR: 45 + 10 * lower,
    hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.2) + 0.2 * hollow,
  };
  const look = teacherLook({
    yaw: 0.75 - 0.15 * lower, lids: lidsOf(g, 3, 0.06, 74) + 0.25 * hollow, brow: -0.5 - 0.3 * hollow,
    mouth: (lower > 0.4 ? "flat" : "open") as "flat" | "open", mouthOpen: lower > 0.4 ? 0.05 : 0.2 + 0.15 * Math.abs(Math.sin(g * 0.3)),
    lookX: 0.7, lookY: -0.1, sweat: 0.5, dirt: 0.15,
  });
  const hand = handAt(pose, WALT.h, 1, "R");
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <DesertAll cam={cam} f={g} tone="day" sun={[1420, 200]} />
        {/* Hank's sedan coming up the track (far → near), dust rolling off it */}
        <Card cam={cam} x={0.9} z={carZ} blur={false}>
          <SedanFront body="#2e3a44" shade="#1a222a" lights={0.6 + 0.4 * arrive} />
        </Card>
        {Array.from({ length: 14 }).map((_, i) => {
          const age = (g * 0.8 + i * 9) % 90;
          const p = project(cam, 0.9 + (rand(i, 4) - 0.5) * 1.6, 0.22 + age * 0.004, carZ + 1.6 + age * 0.05);
          return <Puff key={i} x={p.x} y={p.y} r={(0.5 + age * 0.02) * p.s} o={0.32 * (1 - age / 90)} light={i % 3 === 0} />;
        })}
        <Actor cam={cam} x={0.0} z={9.6} face={1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={-1}>
          <g transform={`translate(${hand.x.toFixed(3)},${hand.y.toFixed(3)}) rotate(${hand.ang - 90}) scale(1.3)`}>
            <Phone glow={0} screen="dark" />
          </g>
        </Actor>
        <Birds f={g} n={3} y={190} sp={0.7} tone="#3a3028" />
      </svg>
      <Motes f={g} n={34} color="#ffe9b8" seed={31} drift={0.5} />
      <Finish f={g} vig={0.5} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S2 · the call to the men (189 → 302) ─────────────────────────── */
// Close on him: the second burner at his ear. He gives the coordinates.
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s2 + beat(META.cutIn);
  const dur = CUT.s3 - CUT.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.05, 0.02, easeInOut(t)), y: 1.5, z: lerp(2.55, 2.25, easeInOut(t)), f: 1550, shiftY: 30, focus: 2.8, aperture: 0.7 };
  const tell = 0.5 + 0.5 * Math.sin(g * 0.5);
  const pose: Pose = {
    torso: 8 + 2 * noise1(g * 0.07, 2), neck: -8,
    shL: 7, shR: 112, elL: 16, elR: 130,
    hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.2),
  };
  const look = teacherLook({ yaw: 0.5, lids: lidsOf(g, 3, 0.1, 70) - 0.04, brow: 0.35, mouth: "open", mouthOpen: 0.16 + 0.2 * tell, lookX: -0.2, lookY: 0.1, sweat: 0.45 });
  const hand = handAt(pose, WALT.h, 1, "R");
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <Sky cam={{ ...cam, y: 2.0, shiftY: 220 }} f={g} tone="day" sun={[1500, 230]} par={10} />
        <DuneRidge cam={cam} f={g} tone="day" />
        <DesertFloor cam={cam} f={g} tone="day" scrubN={24} near={22} seed={14} />
        <Actor cam={cam} x={-0.35} z={5.0} face={1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={-1}>
          <g transform={`translate(${hand.x.toFixed(3)},${hand.y.toFixed(3)}) rotate(${hand.ang - 90}) scale(1.3)`}>
            <Phone glow={0.85} screen="call" />
          </g>
        </Actor>
        {/* near foreground: a desert shrub cropping the frame edge, soft */}
        <Card cam={cam} x={-0.9} z={3.9} blur>
          <path d="M-0.5,0 Q-0.3,-0.7 0,-0.85 Q0.34,-0.6 0.5,0 Z" fill="#5a6a3a" />
        </Card>
      </svg>
      <Motes f={g} n={26} color="#ffe9b8" seed={33} drift={0.4} />
      <Finish f={g} vig={0.55} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S3 · then he sees who is in the car (303 → 389) ─────────────────────────── */
// Over his shoulder at the car: Hank is out, standing by the open door. Walt half-turns, phone still up,
// then it drops from his ear — he's already telling them to stay away.
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s3 + beat(META.cutIn);
  const dur = CUT.s4 - CUT.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.52, -0.38, easeInOut(t)), y: 1.5, z: 6.05, f: 1400, shiftY: 0, focus: 6.2, aperture: 0.55 };
  const see = prog(f, 8, 30, easeOut);
  const drop = 0; // keep the phone to his ear while he calls the men off
  const say = prog(f, 52, 70, easeInOut);
  const pose: Pose = {
    torso: 2 + 5 * say, neck: -4 + 10 * see - 4 * drop,
    shL: 7, shR: lerp(112, 28, drop), elL: 16, elR: lerp(130, 44, drop),
    hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.22),
  };
  const look = teacherLook({ yaw: 0.9 - 0.35 * see, lids: lidsOf(g, 3, 0.08, 66), brow: 0.2 + 0.3 * say, mouth: "open", mouthOpen: 0.14 + 0.22 * Math.abs(Math.sin(g * 0.44)), lookX: 0.6 * (1 - see * 0.4), lookY: 0, sweat: 0.5 });
  const hand = handAt(pose, WALT.h, 1, "R");
  // Hank steps out of the car and puts on his sunglasses-break stance: hand on the open door
  const hStep = prog(f, 20, 46, easeOut);
  const hankPose: Pose = {
    torso: 4, neck: -2 + 4 * hStep,
    shL: 16, shR: 32 + 14 * hStep, elL: 35, elR: 42 + 15 * hStep,
    hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.1),
  };
  const hankLook = brotherLook({ yaw: -0.55, lids: lidsOf(g, 8, 0.12, 88), brow: 0.55, mouth: "flat", lookX: -0.6, lookY: 0.1 });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <DesertAll cam={cam} f={g} tone="day" sun={[1400, 210]} />
        {/* Hank's car, parked, driver door hanging open */}
        <Card cam={cam} x={2.15} z={12.9} blur={false}>
          <Sedan body="#2e3a44" shade="#1a222a" light="#5a6a74" head={0.4} tail={0.2} driver={false} />
        </Card>
        {/* The partner emerges from the passenger side with the agent; Walt now sees who is with him. */}
        <Actor cam={cam} x={2.55} z={12.25} face={-1} view={1}
          pose={{ torso: -3 + 5 * hStep, neck: 3, shL: 22, shR: 38, elL: 35, elR: 54, hipL: 12, hipR: 19, knL: 16, knR: 26, breathe: breath(g, 0.1) }}
          look={partnerLook({ yaw: -0.45, brow: 0.45, mouth: "flat", lookX: -0.5, lids: lidsOf(g, 6, 0.1, 80) })}
          pal={PARTNER.pal} height={PARTNER.height} rimLight="#ffe8b8" rimSide={1} />
        <Actor cam={cam} x={0.77} z={12.2} face={-1} view={1} pose={hankPose} look={hankLook} pal={HANK.pal} height={HANK.h} rimLight="#ffe8b8" rimSide={1} />
        <Actor cam={cam} x={-1.05} z={8.3} face={1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={1} blurCard>
          <g transform={`translate(${hand.x.toFixed(3)},${hand.y.toFixed(3)}) rotate(${hand.ang - 90}) scale(1.3)`}>
            <Phone glow={drop < 0.5 ? 0.8 : 0.3} screen="call" />
          </g>
        </Actor>
        <Birds f={g} n={2} y={180} sp={0.5} tone="#3a3028" />
      </svg>
      <Motes f={g} n={30} color="#ffe9b8" seed={35} drift={0.45} />
      <Finish f={g} vig={0.5} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S4 · twice — and they come anyway (390 → 501) ─────────────────────────── */
// Two beats in one shot: he says it again into the phone ("tells them twice", 1302.18), then, far up the
// track, headlights and a dust plume — "they come anyway" (1304.10).
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s4 + beat(META.cutIn);
  const dur = DUR - CUT.s4;
  const t = f / dur;
  const arrive = prog(f, 26, dur, easeInOut);
  const camBase = twoShot({ a: [-0.95, 6.4], b: [1.6, 6.76], ha: WALT.h, hb: HANK.h, f: 1320, cy: 1.18, marginX: 150, shiftY: 46 });
  const cam: Cam = { ...camBase, x: camBase.x - lerp(0, 0.45, easeInOut(t)), y: camBase.y + lerp(0, 0.12, easeInOut(t)), focus: 5.2, aperture: 0.5 };
  const say2 = 0.5 + 0.5 * Math.sin(g * 0.55);
  const pose: Pose = {
    torso: 6 + 4 * arrive, neck: -6 + 10 * arrive,
    shL: 7, shR: lerp(112, 104, arrive), elL: 16, elR: lerp(130, 126, arrive),
    hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.24),
  };
  const look = teacherLook({ yaw: lerp(0.35, 0.95, arrive), lids: lidsOf(g, 3, 0.14, 64), brow: 0.35 + 0.3 * arrive, mouth: "open", mouthOpen: 0.14 + 0.24 * say2 * (1 - arrive * 0.6), lookX: lerp(-0.2, 0.8, arrive), sweat: 0.6 });
  const hand = handAt(pose, WALT.h, 1, "R");
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <DesertAll cam={cam} f={g} tone="day" sun={[1380, 215]} />
        {/* the money men's car coming in over the flats — they come anyway */}
        <Card cam={cam} x={0.72} z={lerp(92, 10.6, arrive)} blur={arrive < 0.45}>
          <SedanFront body="#8a8f96" shade="#5a6068" lights={1} driver />
        </Card>
        {Array.from({ length: 12 }).map((_, i) => {
          const zc = lerp(92, 10.6, arrive) + 2.4 + rand(i, 43) * 2.6;
          const p = project(cam, 0.72 + (rand(i, 41) - 0.5) * 2.0, 0.18 + rand(i, 42) * 0.5, zc);
          return <Puff key={i} x={p.x} y={p.y} r={(0.28 + rand(i, 44) * 0.4) * Math.max(0.1, p.s)} o={0.14 + 0.3 * arrive} light={i % 3 === 0} />;
        })}
        <Actor cam={cam} x={-0.95} z={6.4} face={1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={-1}>
          <g transform={`translate(${hand.x.toFixed(3)},${hand.y.toFixed(3)}) rotate(${hand.ang - 90}) scale(1.3)`}>
            <Phone glow={0.7} screen="call" />
          </g>
        </Actor>
        <Actor cam={cam} x={1.6} z={6.76} face={-1} view={1} pose={{ torso: 4, neck: 0, shL: 16, shR: 28 + 9 * arrive, elL: 26, elR: 44, hipL: 10, hipR: 12, knL: 14, knR: 16, breathe: breath(g, 0.09) }} look={brotherLook({ yaw: -0.5, lids: lidsOf(g, 8, 0.12, 88), brow: 0.6, mouth: "flat", lookX: -0.5 })} pal={HANK.pal} height={HANK.h} rimLight="#ffe8b8" rimSide={1} />
      </svg>
      <Motes f={g} n={30} color="#ffe9b8" seed={37} drift={0.5} />
      <Finish f={g} vig={0.5} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── assembly + sound ─────────────────────────── */
export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b0c0e" }}>
    <Sequence from={0} durationInFrames={CUT.s2} name="S1 the car arrives"><S1 /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.s3 - CUT.s2} name="S2 the call"><S2 /></Sequence>
    <Sequence from={CUT.s3} durationInFrames={CUT.s4 - CUT.s3} name="S3 who is in the car"><S3 /></Sequence>
    <Sequence from={CUT.s4} durationInFrames={DUR - CUT.s4} name="S4 they come anyway"><S4 /></Sequence>
    <Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={0.035} /></Sequence>
    <Sequence from={6} durationInFrames={100}><Audio src={staticFile("sfx/d_car_arrive.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={20}><Audio src={staticFile("sfx/d_tap.wav")} volume={0.1} /></Sequence>
    <Sequence from={CUT.s3 + 18} durationInFrames={24}><Audio src={staticFile("sfx/d_car_door.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s4 + 30} durationInFrames={90}><Audio src={staticFile("sfx/engine.wav")} volume={0.1} /></Sequence>
  </AbsoluteFill>
);
