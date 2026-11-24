// SCENE 074 · "photo" · set: desert · narration 1260.51s → 1288.52s (28.01s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a photograph arrives on Walter's phone: a barrel of his money, open, in a hole in the ground, with a message that the rest of it is going the same way. The photograph is of a barrel in Hank's own backyard.
//   Which is the whole trick: the money isn't there. But a man who has seven barrels in a hole in the desert cannot stop himself going to look. He races there with the phone still to his ear, and the man on the other end gets him to confess to everything.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1260.98 a@1261.10 photograph@1261.20 arrives@1261.48 on@1261.92 Walter's@1262.12 phone,@1262.54 a@1263.38
//   barrel@1263.42 of@1263.76 his@1263.96 money,@1264.06 open@1264.56 in@1265.08 a@1265.52 hole@1265.60 in@1265.84
//   the@1266.04 ground,@1266.12 with@1266.80 a@1267.02 message@1267.10 that@1267.38 the@1267.82 rest@1267.94
//   of@1268.14 it@1268.34 is@1268.46 going@1268.64 the@1268.78 same@1268.96 way.@1269.14 The@1270.46
//   photograph@1270.56 is@1270.82 of@1271.22 a@1271.38 barrel@1271.46 in@1271.70 Hank's@1271.96 own@1272.34
//   backyard.@1272.52 Which@1273.98 is@1274.14 the@1274.32 whole@1274.44 trick.@1274.66 The@1275.44 money@1275.50
//   isn't@1275.72 there,@1276.08 but@1276.64 a@1276.98 man@1277.06 who@1277.36 has@1277.58 seven@1277.74
//   barrels@1278.14 in@1278.52 a@1278.76 hole@1278.86 in@1279.06 the@1279.24 desert@1279.34 cannot@1279.62
//   stop@1279.84 himself@1280.40 going@1280.62 to@1281.04 look.@1281.26 He@1281.92 races@1282.26 there@1282.60
//   with@1283.06 the@1283.28 phone@1283.40 still@1283.64 to@1283.98 his@1284.06 ear,@1284.38 and@1285.00
//   the@1285.08 man@1285.18 on@1285.44 the@1285.64 other@1285.74 end@1285.98 gets@1286.18 him@1286.42 to@1286.58
//   confess@1286.68 to@1287.06 everything.@1287.40
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, planePts, W, H } from "../../lib/camera";
import { prog, breath, noise1, easeOut, easeInOut, lerp, rand } from "../../lib/anim";
import { Pose } from "../../rig/Figure";
import { TEACHER, teacherLook } from "../../rig/cast";
import { DDefs, Puff, Sky, DuneRidge, DesertFloor, Birds } from "../../env/d_shared";
import { CarWashBay, Backyard, DesertHole, DesertAll } from "../../env/d_sets";
import { Sedan } from "../../props/d_vehicle";
import { Barrel, Phone } from "../../props/d_props";
import { Actor } from "../../props/d_actor";
import { lidsOf, handAt } from "../../props/d_poses";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 74, id: "photo", set: "desert", cutIn: 1260.51, cutOut: 1288.52 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const DUR = beat(META.cutOut);
const CUT = { s2: beat(1263.4), s3: beat(1270.4), s4: beat(1276.0), s5: beat(1283.0) };

const WALT = { pal: TEACHER.pal, h: TEACHER.height };
const walt = (o: Parameters<typeof teacherLook>[0] = {}) => teacherLook(o);

/* ─────────────────────────── S1 · the phone: a barrel in a hole (0 → 86) ─────────────────────────── */
// Over-the-shoulder on the car-wash office counter: the screen shows a photograph of an open barrel
// in fresh dirt. He answers on "wrong" and dials back out immediately.
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + beat(META.cutIn);
  const dur = CUT.s2;
  const t = f / dur;
  // camera creeps in over his shoulder toward the phone
  const cam: Cam = { x: lerp(0.3, 0.26, easeInOut(t)), y: lerp(1.16, 1.1, easeInOut(t)), z: lerp(0.15, -0.05, easeOut(t)), f: 1900, shiftY: -30, focus: 1.5, aperture: 1.0 };
  const buzz = Math.max(0, Math.sin(f * 1.8)) * (f > 6 && f < 40 ? 1 : 0);
  const pick = prog(f, 40, 52, easeOut);
  const pose: Pose = {
    torso: 10, neck: 16 - pick * 12,
    shL: 26, shR: lerp(30, 96, pick), elL: 64, elR: lerp(60, 116, pick),
    hipL: 6, hipR: 8, knL: 8, knR: 10, breathe: breath(g, 0.09),
  };
  const look = walt({ yaw: 0.35, lids: lidsOf(g, 3, 0.1, 90) - 0.05, brow: 0.35, mouth: pick > 0.3 ? "open" : "flat", mouthOpen: pick > 0.3 ? 0.2 + 0.12 * breath(g, 0.3) : 0, lookY: -0.3, sweat: 0.35 });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <CarWashBay cam={cam} f={g} wet={1} />
        {/* counter the phone rests on */}
        <Card cam={cam} x={0.2} z={1.3} blur={false}>
          <rect x={-1.4} y={-0.02} width={2.8} height={0.06} fill="#c9c4b8" stroke="#6a655c" strokeWidth={0.01} />
          <rect x={-1.4} y={0.04} width={2.8} height={0.5} fill="#8a857a" />
        </Card>
        {/* the phone, face up: photograph of the barrel */}
        <Card cam={cam} x={lerp(0.22, 0.02, pick)} y={lerp(0.9, 1.2, pick)} z={lerp(1.27, 1.5, pick)} blur={false}>
          <g transform={`translate(0,${buzz * 0.004}) rotate(-6) scale(2.05)`}>
            {/* the phone slab, seen edge-on-ish, screen toward us */}
            <rect x={-0.036} y={-0.075} width={0.072} height={0.15} rx={0.008} fill="#14161a" stroke="#08090b" strokeWidth={0.003} />
            <rect x={-0.031} y={-0.07} width={0.062} height={0.13} rx={0.004} fill="#bfd4e4" />
            {/* the photograph ON the screen: fresh dirt, a blue barrel, thrown-up sod */}
            <rect x={-0.03} y={-0.068} width={0.06} height={0.09} fill="#b08a58" />
            <ellipse cx={0} cy={-0.036} rx={0.024} ry={0.017} fill="#6a4e2a" />
            <ellipse cx={0} cy={-0.038} rx={0.017} ry={0.011} fill="#31240f" />
            <rect x={-0.0085} y={-0.045} width={0.017} height={0.017} rx={0.002} fill="#3d6f9e" stroke="#20344a" strokeWidth={0.0015} />
            <ellipse cx={0} cy={-0.0455} rx={0.0085} ry={0.0035} fill="#c9cfae" />
            {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={-0.018 + i * 0.012} cy={-0.024 + (i % 2) * 0.004} rx={0.005} ry={0.002} fill="#5a7a3a" />)}
            {/* screen glare band */}
            <rect x={-0.03} y={-0.068} width={0.06} height={0.014} fill="#fff" opacity={0.22} />
            <rect x={-0.031} y={0.03} width={0.062} height={0.03} fill="#20303e" />
          </g>
          {/* a soft halo off the glass (no text) */}
          <ellipse cx={0} cy={0} rx={0.24} ry={0.3} fill="url(#dCoolGlow)" opacity={0.35 + buzz * 0.3} />
        </Card>
        <Card cam={cam} x={lerp(0.22, 0.02, pick)} y={lerp(0.9, 1.2, pick)} z={lerp(1.27, 1.5, pick)} blur={false}>
          <g transform={`translate(0,${buzz * 0.004}) rotate(-6) scale(2.05)`}>
            {/* the phone slab, seen edge-on-ish, screen toward us */}
            <rect x={-0.036} y={-0.075} width={0.072} height={0.15} rx={0.008} fill="#14161a" stroke="#08090b" strokeWidth={0.003} />
            <rect x={-0.031} y={-0.07} width={0.062} height={0.13} rx={0.004} fill="#bfd4e4" />
            {/* the photograph ON the screen: fresh dirt, a blue barrel, thrown-up sod */}
            <rect x={-0.03} y={-0.068} width={0.06} height={0.09} fill="#b08a58" />
            <ellipse cx={0} cy={-0.036} rx={0.024} ry={0.017} fill="#6a4e2a" />
            <ellipse cx={0} cy={-0.038} rx={0.017} ry={0.011} fill="#31240f" />
            <rect x={-0.0085} y={-0.045} width={0.017} height={0.017} rx={0.002} fill="#3d6f9e" stroke="#20344a" strokeWidth={0.0015} />
            <ellipse cx={0} cy={-0.0455} rx={0.0085} ry={0.0035} fill="#c9cfae" />
            {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={-0.018 + i * 0.012} cy={-0.024 + (i % 2) * 0.004} rx={0.005} ry={0.002} fill="#5a7a3a" />)}
            {/* screen glare band */}
            <rect x={-0.03} y={-0.068} width={0.06} height={0.014} fill="#fff" opacity={0.22} />
            <rect x={-0.031} y={0.03} width={0.062} height={0.03} fill="#20303e" />
          </g>
          {/* a soft halo off the glass (no text) */}
          <ellipse cx={0} cy={0} rx={0.24} ry={0.3} fill="url(#dCoolGlow)" opacity={0.35 + buzz * 0.3} />
        </Card>
        <Actor cam={cam} x={-0.85} z={2.25} face={1} view={0.3} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#dff0ff" rimSide={1} />
        {/* near layer: wiper squeegee on a bucket, out of focus */}
        <Card cam={cam} x={-0.62} z={0.62} blur>
          <rect x={-0.1} y={-0.5} width={0.2} height={0.5} rx={0.04} fill="#2e6a9a" />
          <rect x={-0.42} y={-0.62} width={0.84} height={0.06} rx={0.03} fill="#1a1a1e" />
        </Card>
      </svg>
      <Motes f={g} n={20} color="#eaf4ff" seed={4} drift={0.3} />
      <Finish f={g} vig={0.45} grain={0.06} shadow="#20304a" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S2 · he takes it (87 → 296) ─────────────────────────── */
// Int. sedan, day: on "a man who has seven barrels in a hole in the desert" he can't stay put —
// he pulls out and drives, the phone pinned to his ear.
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s2 + beat(META.cutIn);
  const dur = CUT.s3 - CUT.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.1, 0.06, easeInOut(t)), y: 1.28, z: lerp(-1.1, -0.85, easeInOut(t)), f: 1700, shiftY: 0, focus: 2.4, aperture: 0.8 };
  const talk = 0.5 + 0.5 * Math.sin(g * 0.42);
  const pose: Pose = {
    torso: 2 + 1.2 * noise1(g * 0.08, 2), neck: -4,
    shL: 42 + 2 * Math.sin(g * 0.05), shR: 104, elL: 74, elR: 126,
    hipL: 84, hipR: 86, knL: 90, knR: 92, breathe: breath(g, 0.16),
  };
  const look = walt({ yaw: 0.62, lids: lidsOf(g, 3, 0.12, 76), brow: 0.4, mouth: "open", mouthOpen: 0.2 + 0.18 * talk, lookX: 0.3, lookY: 0.1, sweat: 0.4 });
  const hand = handAt(pose, WALT.h, 0.85, "R");
  return (
    <AbsoluteFill style={{ background: "#0b0e12" }}>
      <svg width={W} height={H}>
        <DDefs />
        {/* windscreen: the road ahead, rushing */}
        <g>
          <rect x={0} y={0} width={W} height={640} fill="#c8d8e2" />
          <Sky cam={{ ...cam, x: 0, y: 2.4, z: cam.z, shiftY: 260 }} f={g} tone="day" par={14} clouds={3} />
          {/* the road: a grey band with dashed centre */}
          <polygon points="0,470 1920,470 1920,660 0,660" fill="#6e6e72" />
          {Array.from({ length: 7 }).map((_, i) => {
            const k = ((g * 0.06 + i / 7) % 1);
            const y = 480 + k * k * 150, w = 6 + k * 40;
            return <polygon key={i} points={`${956 - w / 2},${y} ${956 + w / 2},${y} ${960 + w * 0.8},${y + 22} ${960 - w * 0.8},${y + 22}`} fill="#e8e0b0" opacity={0.8} />;
          })}
          {/* roadside posts whipping past */}
          {[0, 1, 2, 3].map((i) => {
            const x = ((i * 520 - g * 46) % 2080 + 2080) % 2080 - 80;
            return <g key={i}><rect x={x} y={430} width={14} height={110} fill="#8a8a7a" /><rect x={x} y={430} width={14} height={12} fill="#d84a3a" /></g>;
          })}
          {/* glass tint + reflection */}
          <rect x={0} y={0} width={W} height={660} fill="#a8d0f0" opacity={0.16} />
          <polygon points="120,0 420,0 180,660 0,660" fill="#fff" opacity={0.06} />
          {/* wiper blades parked at the base */}
          <path d="M120,700 L520,650 L540,668 L140,714 Z" fill="#14161a" />
          <path d="M1500,700 L1120,646 L1104,664 L1482,716 Z" fill="#14161a" />
        </g>
        {/* cabin: roof line, A-pillars, door cards */}
        <path d="M0,0 L1920,0 L1920,120 L1420,150 L980,150 L180,110 L0,120 Z" fill="#1a1d22" />
        <path d="M0,120 L180,110 L140,660 L0,640 Z" fill="#22262c" />
        <path d="M1420,150 L1920,120 L1920,640 L1490,680 Z" fill="#22262c" />
        <path d="M0,640 L1490,680 L1920,640 L1920,1080 L0,1080 Z" fill="#161a1f" />
        {/* dash + wheel + console */}
        <path d="M420,780 Q900,700 1420,760 L1920,800 L1920,1080 L260,1080 Z" fill="#0e1116" />
        {[-1, 1].map((sx) => (
          <g key={sx} transform={`translate(${960 + sx * 300},820)`}>
            <circle r={60} fill="#0a2a22" stroke="#1d3a2c" strokeWidth={6} />
            <circle r={52} fill="#3ad0a0" opacity={0.12} />
            <line x1={0} y1={0} x2={34 * Math.cos(-2.2 + talk * 0.6)} y2={34 * Math.sin(-2.2 + talk * 0.6)} stroke="#ff8a3a" strokeWidth={5} />
          </g>
        ))}
        <g transform="translate(960,1010) rotate(-8)">
          <ellipse rx={232} ry={128} fill="none" stroke="#0a0d10" strokeWidth={46} />
          <ellipse rx={232} ry={128} fill="none" stroke="#1b2129" strokeWidth={34} />
          <path d="M-140,-60 L-70,-10 M140,-60 L70,-10 M0,120 L0,60" stroke="#1b2129" strokeWidth={22} />
          <ellipse cx={-140} cy={-64} rx={26} ry={20} fill="#2a3038" />
          <ellipse cx={140} cy={-64} rx={26} ry={20} fill="#2a3038" />
        </g>
        {/* the phone in his hand: screen light on his jaw */}
        <Actor cam={cam} x={0.05} z={0.55} face={1} view={0.85} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#bfe0ff" rimSide={1} />
        <Card cam={cam} x={0.05} z={0.55} blur={false} y={0}>
          <g transform={`translate(${hand.x.toFixed(3)},${(hand.y - WALT.h * 0.0).toFixed(3)}) rotate(${hand.ang - 90}) scale(1.35)`}>
            <Phone glow={1} screen="call" />
          </g>
        </Card>
        <ellipse cx={1180} cy={360} rx={260} ry={220} fill="url(#dCoolGlow)" opacity={0.25} />
      </svg>
      <Motes f={g} n={16} color="#e8f2ff" seed={8} drift={0.2} />
      <Finish f={g} vig={0.5} grain={0.06} shadow="#1a2438" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S3 · the photograph is of Hank's backyard (297 → 484) ─────────────────────────── */
// The reveal, hard cut: the same photo's subject, in Hank's garden, with the grill at frame edge.
// Camera trucks along the yard and settles on the barrel sunk in the grass, the sod thrown up beside it.
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s3 + beat(META.cutIn);
  const dur = CUT.s4 - CUT.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(-1.12, -0.42, easeInOut(t)), y: lerp(1.4, 1.1, easeInOut(t)), z: lerp(-2.7, -2.3, easeInOut(t)), f: 1700, shiftY: 0, focus: 4.6, aperture: 0.6 };
  // the barrel: pushed up out of the turf on "a barrel" (1271.46), lid ajar
  const up = prog(f, 26, 54, easeInOut);
  const lid = 0.25 + 0.45 * prog(f, 40, 70, easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <Sky cam={{ ...cam, y: 2.2, shiftY: 230 }} f={g} tone="day" sun={[1520, 210]} par={10} clouds={4} />
        <Backyard cam={cam} f={g} />
        {/* the barrel in the lawn, cash showing */}
        <Card cam={cam} x={-0.62} y={-0.24 + 0.26 * up} z={cam.z + 3.05} blur={false}>
          <g transform="scale(1.05)"><Barrel open={lid} cash={0.12} light={1} /></g>
        </Card>
        <Birds f={g} n={4} y={150} sp={0.9} />
        {/* near foreground: the grill partially cropped at right, out of focus (it's HIS yard) */}
        <Card cam={cam} x={0.62} z={cam.z + 4.1} blur={false}>
          <ellipse cx={0} cy={0} rx={0.7} ry={0.2} fill="#000" opacity={0.3} />
          <path d="M-0.62,-0.9 L-0.74,0 M0.62,-0.9 L0.74,0" stroke="#2a2a2e" strokeWidth={0.09} />
          <ellipse cx={0} cy={-0.95} rx={0.68} ry={0.24} fill="#2a2a2e" />
          <path d="M-0.68,-0.95 Q0,-1.55 0.68,-0.95 Z" fill="#3a3a3e" stroke="#14100c" strokeWidth={0.02} />
        </Card>
      </svg>
      <Motes f={g} n={26} color="#fff0c8" seed={21} drift={0.35} />
      <Finish f={g} vig={0.45} grain={0.06} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S4 · the confession (485 → 974) ─────────────────────────── */
// Desert, hard light, late afternoon. He races in on "races" (1282.26) and is out of the car with the
// phone at his ear by "confess" (1286.7): hands on the car roof, head down, talking.
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s4 + beat(META.cutIn);
  const dur = CUT.s5 - CUT.s4;
  const t = f / dur;
  const carIn = prog(f, 0, 34, easeOut);
  const out = prog(f, 40, 96, easeInOut);
  const carX = lerp(-12, 1.2, carIn);
  const cam: Cam = { x: lerp(-0.9, -1.15, easeInOut(t)), y: lerp(1.35, 1.25, easeInOut(t)), z: lerp(-3.4, -2.6, easeInOut(t)), f: 1450, shiftY: 30, focus: 6.5, aperture: 0.5 };
  // he walks around the door and puts both hands on the roof
  const px = lerp(carX + 1.5, carX - 0.75, out);
  const pz = lerp(5.2, 5.0, out);
  const pose: Pose = out < 0.55
    ? {
        torso: 16, neck: -10,
        shL: 48 * Math.sin(g * 0.5) + 6, shR: -44 * Math.sin(g * 0.5) + 6,
        elL: 74, elR: 74,
        hipL: 36 * Math.sin(g * 0.5), hipR: -36 * Math.sin(g * 0.5),
        knL: 24 + 54 * Math.max(0, -Math.cos(g * 0.5)), knR: 24 + 54 * Math.max(0, Math.cos(g * 0.5)),
        breathe: breath(g, 0.4),
      }
    : {
        torso: 22 + 1.4 * noise1(g * 0.06, 3), neck: -18,
        shL: 76, shR: 88,
        elL: 30, elR: 22,
        hipL: 16, hipR: 18, knL: 22, knR: 24, breathe: breath(g, 0.24),
      };
  const look = walt({ yaw: 0.5, lids: lidsOf(g, 3, 0.06, 80) + 0.1 * out, brow: 0.45, mouth: "open", mouthOpen: 0.2 + 0.2 * Math.abs(Math.sin(g * 0.33)), lookY: 0.35, sweat: 0.5, dirt: 0.15 });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <DesertAll cam={cam} f={g} tone="day" sun={[1500, 190]} rut />
        {/* dust plume following the car */}
        {Array.from({ length: 16 }).map((_, i) => {
          const age = (g * 0.9 + i * 7) % 120;
          const p = project(cam, carX - 2.4 - age * 0.05, 0.5 + age * 0.006, 5.6 + rand(i, 5) * 0.8);
          return <Puff key={i} x={p.x} y={p.y} r={(0.5 + age * 0.02) * p.s} o={0.3 * (1 - age / 120)} light={i % 3 === 0} />;
        })}
        <Card cam={cam} x={carX} z={5.4} blur={false}>
          <Sedan body="#6a2a24" shade="#3c1612" light="#a05a4a" head={0.9} tail={0.6} pitch={-carIn * 2} bounce={Math.sin(f * 0.6) * 0.004} rust={0.4} />
        </Card>
        {/* heat haze over the hood */}
        <Card cam={cam} x={carX + 1.9} y={0.2} z={5.4} blur>
          <ellipse cx={0} cy={-0.2} rx={0.9} ry={0.22} fill="#fff2cc" opacity={0.1 + 0.05 * Math.sin(g * 0.2)} />
        </Card>
        <Actor cam={cam} x={px} z={pz} face={1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={-1} />
        {/* the phone at his ear: a small glowing slab */}
        <Card cam={cam} x={px + 0.06} y={1.6} z={pz + 0.1} blur={false}>
          <g transform="rotate(-14) scale(0.9)"><Phone glow={0.7} screen="call" /></g>
        </Card>
        <Birds f={g} n={3} y={200} sp={0.6} tone="#3a3028" />
      </svg>
      <Motes f={g} n={40} color="#ffe9b8" seed={24} drift={0.6} />
      <Finish f={g} vig={0.5} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S5 · the hole, and it is empty (975 → 839) ─────────────────────────── */
// Insert on the ground: the dug hole, the sod, a shovel — no barrels. He stands at the rim, still talking.
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s5 + beat(META.cutIn);
  const dur = DUR - CUT.s5;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.15, 0.4, easeInOut(t)), y: lerp(1.55, 1.05, easeInOut(t)), z: lerp(-2.2, -1.6, easeInOut(t)), f: 1700, shiftY: lerp(-10, 20, easeInOut(t)), focus: 5.2, aperture: 0.7 };
  const pose: Pose = {
    torso: 22 + 3 * noise1(g * 0.07, 4), neck: -20,
    shL: 30, shR: 112, elL: 48, elR: 132,
    hipL: 18, hipR: 20, knL: 26, knR: 28, breathe: breath(g, 0.24),
  };
  const look = walt({ yaw: 0.55, lids: lidsOf(g, 3, 0.06, 70) + 0.15, brow: 0.4, mouth: "open", mouthOpen: 0.18 + 0.18 * Math.abs(Math.sin(g * 0.3)), lookY: 0.8, sweat: 0.6, dirt: 0.2 });
  const hand = handAt(pose, WALT.h, 1, "R");
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <DesertAll cam={cam} f={g} tone="day" sun={[1500, 210]} />
        <DesertHole cam={cam} f={g} tone="day" x={0.2} z={4.2} depth={1} />
        <Actor cam={cam} x={1.45} z={4.9} face={-1} view={1} pose={pose} look={look} pal={WALT.pal} height={WALT.h} rimLight="#ffe8b8" rimSide={1}>
          <g transform={`translate(${hand.x.toFixed(3)},${hand.y.toFixed(3)}) rotate(${hand.ang - 90}) scale(1.3)`}>
            <Phone glow={0.8} screen="call" />
          </g>
        </Actor>
      </svg>
      <Motes f={g} n={36} color="#ffe9b8" seed={27} drift={0.5} />
      <Finish f={g} vig={0.5} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── assembly + sound ─────────────────────────── */
export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b0c0e" }}>
    <Sequence from={0} durationInFrames={CUT.s2} name="S1 the message"><S1 /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.s3 - CUT.s2} name="S2 he takes it"><S2 /></Sequence>
    <Sequence from={CUT.s3} durationInFrames={CUT.s4 - CUT.s3} name="S3 Hank's backyard"><S3 /></Sequence>
    <Sequence from={CUT.s4} durationInFrames={CUT.s5 - CUT.s4} name="S4 the confession"><S4 /></Sequence>
    <Sequence from={CUT.s5} durationInFrames={DUR - CUT.s5} name="S5 the empty hole"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={86}><Audio src={staticFile("sfx/d_roomtone.wav")} volume={0.03} /></Sequence>
    <Sequence from={4} durationInFrames={40}><Audio src={staticFile("sfx/d_phone_ring.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.s3 - CUT.s2}><Audio src={staticFile("sfx/car_interior.wav")} volume={0.04} /></Sequence>
    <Sequence from={CUT.s2 + 10} durationInFrames={40}><Audio src={staticFile("sfx/engine.wav")} volume={0.1} /></Sequence>
    <Sequence from={CUT.s3} durationInFrames={CUT.s4 - CUT.s3}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={0.035} /></Sequence>
    <Sequence from={CUT.s3 + 20} durationInFrames={30}><Audio src={staticFile("sfx/d_latch.wav")} volume={0.11} /></Sequence>
    <Sequence from={CUT.s4} durationInFrames={CUT.s5 - CUT.s4}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={0.03} /></Sequence>
    <Sequence from={CUT.s4 + 2} durationInFrames={50}><Audio src={staticFile("sfx/d_car_arrive.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s4 + 54} durationInFrames={24}><Audio src={staticFile("sfx/d_car_door.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s5} durationInFrames={DUR - CUT.s5}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={0.03} /></Sequence>
    <Sequence from={CUT.s5 + 6} durationInFrames={26}><Audio src={staticFile("sfx/d_dig.wav")} volume={0.1} /></Sequence>
  </AbsoluteFill>
);
