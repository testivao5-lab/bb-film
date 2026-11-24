// SCENE 003 · "fifty" · set: kitchen · narration 47.71s → 63.14s (15.43s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Frames inside components are LOCAL (0 = cut-in).
//
// Narration:
//   Fifty years old, on the morning we meet him. Nervous hands. Glasses. A cough he is already
//   explaining to people. His wife has arranged his birthday bacon into the number fifty on the
//   plate. It is vegetarian bacon. He does not mention that.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   50@47.76 years@48.28 old.@48.70 On@49.38 the@49.42 morning@49.50 we@49.68 meet@49.88 him.@50.12 Nervous@51.00
//   hands,@51.32 glasses,@51.86 a@52.82 cough@52.90 he@53.14 is@53.38 already@53.46 explaining@53.68 to@54.18
//   people.@54.46 His@55.36 wife@55.60 has@55.84 arranged@56.20 his@56.46 birthday@56.72 bacon@56.98 into@57.54
//   the@57.86 number@57.94 50@58.14 on@58.56 the@58.88 plate.@59.00 It@59.96 is@60.06 vegetarian@60.18
//   bacon.@60.50 He@61.74 does@61.78 not@61.94 mention@62.16 that.@62.44
//
// Shot plan (hard cuts on sentence gaps):
//   S1 0–86     morning table — Walt, coffee, "the morning we meet him".
//   S2 86–216   one continuous move: nervous hands insert → tilt to the glasses push →
//               pull back for the cough + the explanation to his wife at the counter.
//   S3 216–354  the wife lays bacon strips into a "50" on the plate (strips land on the beats).
//   S4 354–463  plate close-up (vegetarian bacon) → tilt up: he opens his mouth, closes it,
//               eats a strip instead of mentioning it.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, Audio, staticFile } from "remotion";
import { Cam, Card, project, planePts, W, H } from "../../lib/camera";
import { prog, easeOut, easeInOut, lerp, blink, breath } from "../../lib/anim";
import { TEACHER, WIFE, teacherLook, wifeLook } from "../../rig/cast";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Plate } from "../../props/b_props";
import { KitchenRoom, KitchenChair, KT } from "../../env/a_kitchen";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 3, id: "fifty", set: "kitchen", cutIn: 47.71, cutOut: 63.14 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  fifty: 2, years: 17, old: 30, On: 50, morning: 54, meet: 65, him: 72,
  Nervous: 99, hands: 108, glasses: 125, a: 153, cough: 156, he: 163, is: 170,
  already: 173, explaining: 179, to: 194, people: 203,
  His: 230, wife: 237, has: 244, arranged: 255, his: 263, birthday: 270, bacon: 278,
  into: 295, the: 305, number: 307, fifty50: 313, on: 326, plate: 339,
  It: 368, is2: 371, vegetarian: 374, bacon2: 384,
  He: 421, does: 422, not: 427, mention: 434, that: 442, end: 463,
};
const CUT2 = 86, CUT3 = 216, CUT4 = 354;

/* ── true-perspective round table (works at every camera angle) ── */
const Table: React.FC<{ cam: Cam; x: number; z: number; r?: number }> = ({ cam, x, z, r = 0.6 }) => {
  const ring = (rr: number, y: number) =>
    Array.from({ length: 26 }, (_, i) => {
      const a = (i / 26) * Math.PI * 2;
      return [x + Math.cos(a) * rr, z + Math.sin(a) * rr] as [number, number];
    });
  const top = planePts(cam, ring(r, 0.74), 0.74);
  const lip = planePts(cam, [...ring(r, 0.74), ...ring(r, 0.70).reverse()], 0.72);
  const p = project(cam, x, 0, z);
  return (
    <g>
      <ellipse cx={p.x} cy={p.y} rx={r * 1.15 * p.s} ry={r * 0.3 * p.s} fill="#000" opacity={0.32} />
      {/* pedestal */}
      <path d={`M${project(cam, x - 0.07, 0, z).x},${project(cam, x - 0.07, 0, z).y}
        L${project(cam, x - 0.05, 0.7, z).x},${project(cam, x - 0.05, 0.7, z).y}
        L${project(cam, x + 0.05, 0.7, z).x},${project(cam, x + 0.05, 0.7, z).y}
        L${project(cam, x + 0.07, 0, z).x},${project(cam, x + 0.07, 0, z).y} Z`}
        fill="#8d7048" stroke={KT.ol} strokeWidth={1.5} />
      <polygon points={lip} fill="#8d6a44" />
      <polygon points={top} fill="#c2a171" stroke="#8d6a48" strokeWidth={2} />
      <polygon points={planePts(cam, ring(r * 0.92, 0.74), 0.741)} fill="#b08f61" opacity={0.45} />
    </g>
  );
};

/* ── mug + bowl props ── */
const Mug: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <Card cam={cam} x={x} y={0.74} z={z}>
    <path d="M-0.045,0 L-0.042,-0.1 L0.042,-0.1 L0.045,0 Z" fill="#efe6d6" stroke="#17130f" strokeWidth={0.006} />
    <ellipse cx={0} cy={-0.1} rx={0.045} ry={0.016} fill="#6b4a2e" stroke="#17130f" strokeWidth={0.005} />
    <path d="M0.045,-0.075 q0.03,0.03 0,0.06" fill="none" stroke="#efe6d6" strokeWidth={0.012} />
    <ellipse cx={0} cy={0.002} rx={0.05} ry={0.014} fill="#000" opacity={0.3} />
  </Card>
);
const Bowl: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <Card cam={cam} x={x} y={0.74} z={z}>
    <ellipse cx={0} cy={0.002} rx={0.09} ry={0.026} fill="#000" opacity={0.3} />
    <path d="M-0.085,-0.01 Q-0.08,-0.075 0,-0.075 Q0.08,-0.075 0.085,-0.01 Q0,0.02 -0.085,-0.01 Z"
      fill="#f2ece0" stroke="#17130f" strokeWidth={0.006} />
    <ellipse cx={0} cy={-0.07} rx={0.082} ry={0.024} fill="#e7dfcd" stroke="#17130f" strokeWidth={0.005} />
    <ellipse cx={0} cy={-0.072} rx={0.06} ry={0.016} fill="#c8a86a" />
  </Card>
);

/* ── one bacon strip (vegetarian: uniform, pale-edged) ── */
const Strip: React.FC<{ w: number; h: number; o: number; s: number; seed: number }> = ({ w, h, o, s, seed }) => (
  <g opacity={o} transform={`scale(${s})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h * 0.45}
      fill={seed % 2 ? "#b06a4e" : "#a85f46"} stroke="#5e3122" strokeWidth={h * 0.14} />
    <rect x={-w * 0.34} y={-h * 0.16} width={w * 0.62} height={h * 0.26} rx={h * 0.13}
      fill="#e8c9a4" opacity={0.75} />
  </g>
);

/** the "50" spelled in bacon strips on the plate (pop-in per strip) */
const Plate50: React.FC<{ cam: Cam; x: number; z: number; f: number; from: number }> = ({ cam, x, z, f, from }) => {
  const SQ = 0.62; // squash matching the plate's view
  // layout in plate-plane metres; y multiplied by SQ at render
  const FIVE: [number, number, number, number][] = [
    [-0.05, -0.03, 0.062, 0.016], // top bar
    [-0.077, -0.012, 0.016, 0.036], // upper left
    [-0.052, 0.004, 0.056, 0.016], // middle
    [-0.026, 0.02, 0.016, 0.036], // lower right
    [-0.052, 0.036, 0.062, 0.016], // bottom bar
  ];
  const ZERO: [number, number, number, number, number][] = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + 0.2;
    return [0.055 + Math.cos(a) * 0.032, Math.sin(a) * 0.034, 0.03, 0.015, (a * 180) / Math.PI + 90];
  });
  const items: { x: number; y: number; w: number; h: number; rot: number; i: number }[] = [
    ...FIVE.map((s, i) => ({ x: s[0], y: s[1], w: s[2], h: s[3], rot: 0, i })),
    ...ZERO.map((s, i) => ({ x: s[0], y: s[1], w: s[2], h: s[3], rot: s[4], i: i + 5 })),
  ];
  const step = (T.fifty50 - T.arranged - 6) / items.length;
  return (
    <Card cam={cam} x={x} y={0.755} z={z}>
      <Plate r={0.145} squash={SQ} />
      {items.map((it) => {
        const appear = from + Math.round(step * it.i);
        const g = prog(f, appear, appear + 4, easeOut);
        if (g <= 0.01) return null;
        return (
          <g key={it.i} transform={`translate(${it.x},${it.y * SQ}) rotate(${it.rot})`}>
            <Strip w={it.w} h={it.h} o={g} s={lerp(0.55, 1, g)} seed={it.i} />
          </g>
        );
      })}
    </Card>
  );
};

/* ═════════════ S1 · "Fifty years old, on the morning we meet him." ═════════════ */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const cam: Cam = {
    x: lerp(1.5, 1.56, prog(f, 0, CUT2, easeInOut)),
    y: lerp(1.26, 1.22, prog(f, 0, CUT2, easeInOut)),
    z: lerp(2.25, 2.0, prog(f, 0, CUT2, easeInOut)),
    f: 1400, shiftY: lerp(-30, -14, prog(f, 0, CUT2, easeInOut)),
    focus: 2.3, aperture: 0.55,
  };
  // tired morning: eyes down in the bowl → lifts them on "morning … meet him"
  const lift = prog(f, T.morning, T.meet + 6, easeInOut);
  const sip = prog(f, T.On, T.On + 6, easeOut) * (1 - prog(f, T.morning - 4, T.morning + 4, easeInOut));
  const pose: Pose = {
    ...chairSit(),
    torso: 4 + Math.sin(f * 0.07) * 1.4 + 3 * sip,
    neck: 8 - 6 * lift - 2 * sip,
    shR: 18 + 6 * sip, elR: 54 - 4 * sip,
    shL: 20 + Math.sin(f * 0.1) * 2, elL: 66,
    breathe: breath(f, 0.12, 0),
  };
  const look = teacherLook({
    age: 0.92,
    yaw: 0.12,
    lookX: 0.1,
    lookY: lerp(0.5, 0.02, lift) + 0.1 * sip,
    brow: -0.12 + 0.16 * lift,
    mouth: "neutral",
    lids: 0.2 + 0.35 * (1 - lift) + blink(f, 4) * 0.5,
  });
  const anch = rigAnchors(pose, TEACHER.height, 0.16);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <KitchenRoom cam={cam} f={f} light={0.16} />
        <KitchenChair cam={cam} x={1.62} z={4.52} />
        <Card cam={cam} x={1.62} y={0} z={4.42}>
          <ellipse cx={0} cy={0.012} rx={0.4} ry={0.11} fill="#4a4038" opacity={0.3} />
          <Figure pose={pose} view={0.16} look={look} pal={TEACHER.pal} height={TEACHER.height}
            rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <Table cam={cam} x={1.62} z={3.72} />
        <Mug cam={cam} x={1.35 + 0.02 * prog(f, T.On - 6, T.On + 4, easeOut)} z={3.98} />
        <Bowl cam={cam} x={1.95} z={4.02} />
        <Card cam={cam} x={1.62} y={0.755} z={4.2}><Plate r={0.145} squash={0.62} /></Card>
        {/* his hand resting by the mug */}
        <Card cam={cam} x={1.62} y={0} z={4.42} blur={false}>
          <g transform={`translate(${anch.wristR.x},${anch.wristR.y}) rotate(${lerp(196, 176, sip)})`}>
            <HandBack pal={TEACHER.pal} curl={lerp(0.3, 0.44, sip)} thumb={0.45}
              sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={0} />
          </g>
        </Card>
      </svg>
      <Motes f={f} n={22} color="#ffe9c4" seed={4} region={[0, 0, W, H * 0.8]} drift={0.5} />
      <Finish f={f} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ═════════════ S2 · hands → glasses → cough → explaining (one continuous move) ═════════════ */
const S2: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = global 86
  const g = (a: number, b: number, e = easeInOut) => prog(f, a, b, e);
  const cam: Cam = {
    x: lerp(1.55, 1.35, g(57, 87)),
    y: lerp(lerp(0.99, 1.3, g(18, 38)), 1.35, g(57, 87)),
    z: lerp(lerp(2.85, 2.55, g(18, 38)), 1.7, g(57, 87)),
    f: 1500, shiftY: lerp(lerp(-120, -46, g(18, 38)), -20, g(57, 87)),
    focus: lerp(1.3, 2.6, g(57, 87)), aperture: 0.85,
  };
  // choreography
  const tap = (ph: number) => Math.max(0, Math.sin(f * 0.85 + ph));
  const glassesUp = prog(f, T.glasses - CUT2 - 9, T.glasses - CUT2, easeOut);
  const glassesDn = prog(f, T.glasses - CUT2 + 5, T.glasses - CUT2 + 18, easeInOut);
  const glasses = glassesUp * (1 - glassesDn); // hand to the frames, pushes, returns
  // double cough on the word
  const c1 = prog(f, T.cough - CUT2, T.cough - CUT2 + 3, easeOut) * (1 - prog(f, T.cough - CUT2 + 5, T.cough - CUT2 + 9, easeInOut));
  const c2 = prog(f, T.cough - CUT2 + 7, T.cough - CUT2 + 9, easeOut) * (1 - prog(f, T.cough - CUT2 + 12, T.cough - CUT2 + 16, easeInOut));
  const cough = Math.max(c1, c2);
  const talk = prog(f, T.already - CUT2, T.already - CUT2 + 5, easeOut) *
    (1 - prog(f, T.people - CUT2 + 4, T.people - CUT2 + 12, easeInOut)) *
    (0.35 + 0.65 * Math.abs(Math.sin(f * 0.5)));
  const pose: Pose = {
    ...chairSit(),
    torso: 6 + 10 * cough + 2 * Math.sin(f * 0.08) - 4 * talk,
    neck: 6 - 14 * glasses + 9 * cough - 6 * talk,
    // right arm: on the table → up to the glasses → presenting gesture
    shR: lerp(lerp(18, 79, glasses), 31, talk) + 5 * Math.sin(f * 0.4) * talk + 3 * tap(0),
    elR: lerp(lerp(54, 128, glasses), 121, talk) + 9 * Math.sin(f * 0.4 + 1) * talk,
    shL: 20 + 4 * tap(2.1) + 12 * talk,
    elL: 66 + 5 * tap(2.1) * 0.4 + 6 * talk,
    breathe: breath(f, 0.11, 1) + 6 * cough,
  };
  const look = teacherLook({
    age: 0.92,
    yaw: 0.1,
    lookX: lerp(0.06, -0.4, talk),
    lookY: lerp(0.42, -0.5, glasses) + 0.24 * cough + 0.1 * talk,
    brow: 0.1 * glasses + 0.3 * cough + 0.2 * talk,
    mouth: cough > 0.4 ? "open" : talk > 0.3 ? "neutral" : "flat",
    mouthOpen: 0.75 * cough + 1.0 * talk,
    lids: 0.16 + blink(f, 5) * 0.55 - 0.1 * glasses,
  });
  const anch = rigAnchors(pose, TEACHER.height, 0.16);
  const handsOnTable = 1 - glasses; // detailed hands while they rest on the table
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <KitchenRoom cam={cam} f={f} light={0.16} />
        {/* wife at the counter — the "people" he explains to */}
        <Card cam={cam} x={-0.95} y={0} z={5.35}>
          <ellipse cx={0} cy={0.012} rx={0.34} ry={0.1} fill="#4a4038" opacity={0.3} />
          <Figure
            pose={{ torso: 3, neck: -3, shL: 14, elL: 38, shR: 12, elR: 30,
              hipL: 4, hipR: -4, knL: 3, knR: 3, breathe: breath(f, 0.13, 3) } as Pose}
            view={0.85}
            look={wifeLook({ yaw: 0.2, lookX: 0.42, lids: 0.14 + blink(f, 6) * 0.5, mouth: talk > 0.3 ? "neutral" : "flat" })}
            pal={WIFE.pal} height={WIFE.height} rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <KitchenChair cam={cam} x={1.62} z={4.52} />
        <Card cam={cam} x={1.62} y={0} z={4.42}>
          <ellipse cx={0} cy={0.012} rx={0.4} ry={0.11} fill="#4a4038" opacity={0.3} />
          <Figure pose={pose} view={0.16} look={look} pal={TEACHER.pal} height={TEACHER.height}
            rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <Table cam={cam} x={1.62} z={3.72} />
        <Mug cam={cam} x={1.35 + 0.02 * prog(f, T.On - 6, T.On + 4, easeOut)} z={3.98} />
        <Bowl cam={cam} x={1.95} z={4.02} />
        <Card cam={cam} x={1.62} y={0.755} z={4.2}><Plate r={0.145} squash={0.62} /></Card>
        {/* close-up hands: 4 fingers + thumb + wrist + sleeve, over the tabletop */}
        <Card cam={cam} x={1.62} y={0} z={4.42} blur={false}>
          <g transform={`translate(${anch.wristL.x},${anch.wristL.y - 0.01}) rotate(${lerp(186, 174, tap(0))}) scale(-1,1)`}>
            <g opacity={handsOnTable}>
              <HandBack pal={TEACHER.pal} curl={0.12 + 0.18 * tap(0)} thumb={0.5}
                sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={0} />
            </g>
          </g>
          <g transform={`translate(${anch.wristR.x},${anch.wristR.y - 0.01}) rotate(${lerp(178, 74, glasses)})`}>
            <HandBack pal={TEACHER.pal} curl={lerp(0.16 + 0.18 * tap(2.1), 0.4, glasses)} thumb={lerp(0.5, 0.75, glasses)}
              sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={0} />
          </g>
        </Card>
      </svg>
      <Motes f={f} n={20} color="#ffe9c4" seed={8} region={[0, 0, W, H * 0.75]} drift={0.5} />
      <Finish f={f} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};
/* ═════════════ S3 · "His wife has arranged … the number fifty on the plate." ═════════════ */
const S3: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = global 216
  const push = prog(f, T.into - CUT3, T.fifty50 - CUT3 + 4, easeInOut);
  const cam: Cam = {
    x: lerp(1.7, 1.78, push),
    y: lerp(1.78, 1.9, push),
    z: lerp(1.4, 2.3, push),
    f: 1400, shiftY: lerp(-420, -770, push),
    focus: lerp(2.4, 1.5, push), aperture: 0.8,
  };
  // her placing rhythm: a strip every ~4 frames, then the hand pulls away so the "50" reads
  const placing = f >= T.arranged - CUT3 - 4 && f <= 84;
  const bob = placing ? Math.sin((f - (T.arranged - CUT3)) * 1.26) : 0;
  const ret = prog(f, 84, 93, easeInOut);
  const wifePose: Pose = {
    ...chairSit(),
    torso: -5 + 2 * Math.sin(f * 0.08),
    neck: 12 + 3 * bob,
    shR: 0 + 5 * bob - 45 * ret, elR: 70 + 8 * bob + 34 * ret,
    shL: 6 + Math.sin(f * 0.1) * 2, elL: 40,
    breathe: breath(f, 0.12, 2),
  };
  const wifePos = wifeLook({
    yaw: 0.1, lookX: -0.24, lookY: 0.3,
    mouth: "flat", lids: 0.13 + blink(f, 7) * 0.5,
  });
  const anch = rigAnchors(wifePose, WIFE.height, 0.2);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <KitchenRoom cam={cam} f={f} light={0.16} />
        {/* wife seated behind the table — drawn before the table so it occludes her legs */}
        <KitchenChair cam={cam} x={2.05} z={4.6} />
        <Card cam={cam} x={2.0} y={0} z={4.45}>
          <ellipse cx={0} cy={0.012} rx={0.36} ry={0.1} fill="#4a4038" opacity={0.3} />
          <Figure pose={wifePose} view={0.2} look={wifePos} pal={WIFE.pal} height={WIFE.height}
            rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <Table cam={cam} x={1.62} z={3.72} />
        <Mug cam={cam} x={1.35 + 0.02 * prog(f, T.On - 6, T.On + 4, easeOut)} z={3.98} />
        <Bowl cam={cam} x={1.95} z={4.02} />
        <Plate50 cam={cam} x={1.62} z={4.2} f={f} from={T.arranged - CUT3} />
        {/* her reaching hand + a strip between finger and thumb (drawn over the table) */}
        <Card cam={cam} x={2.0} y={0} z={4.45} blur={false}>
          <g transform={`translate(${anch.wristR.x},${anch.wristR.y}) rotate(${lerp(186, 174, bob * 0.5 + 0.5)})`}>
            <HandBack pal={WIFE.pal} curl={0.55} thumb={0.6}
              sleeve={WIFE.pal.jacket} sleeveShade={WIFE.pal.jacketShade} forearm={0} />
          </g>
        </Card>
      </svg>
      <Motes f={f} n={20} color="#ffe9c4" seed={12} region={[0, 0, W, H * 0.75]} drift={0.5} />
      <Finish f={f} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ═════════════ S4 · "It is vegetarian bacon. He does not mention that." ═════════════ */
const S4: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = global 354
  const rise = prog(f, 410 - CUT4, 440 - CUT4, easeInOut);
  const cam: Cam = {
    x: lerp(1.72, 1.6, rise),
    y: lerp(1.9, 1.3, rise),
    z: lerp(2.3, 2.6, rise),
    f: 1400, shiftY: lerp(-770, -55, rise),
    focus: lerp(1.5, 2.2, rise), aperture: 0.8,
  };
  // he considers mentioning it — and doesn't
  const opens = prog(f, T.does - CUT4, T.mention - CUT4, easeInOut);
  const closes = prog(f, T.mention - CUT4, T.that - CUT4, easeInOut);
  const mouthOpen = 1.0 * opens * (1 - closes);
  const chew = f > T.that - CUT4 + 6 ? Math.max(0, Math.sin((f - T.that - CUT4 - 6) * 0.5)) * 0.3 : 0;
  const take = prog(f, T.that - CUT4 - 2, T.that - CUT4 + 8, easeInOut) *
    (1 - prog(f, T.that - CUT4 + 14, T.that - CUT4 + 22, easeInOut));
  const pose: Pose = {
    ...chairSit(),
    torso: 4 + 4 * take + Math.sin(f * 0.07) * 1.2,
    neck: 6 - 4 * rise + 7 * take,
    shR: lerp(16, 152, take), elR: lerp(40, 122, take),
    shL: 9, elL: 27,
    breathe: breath(f, 0.12, 3),
  };
  const look = teacherLook({
    age: 0.92,
    yaw: 0.08,
    lookX: lerp(0.14, 0.32, rise),
    lookY: lerp(0.5, 0.04, rise),
    brow: -0.06 + 0.14 * opens * (1 - closes),
    mouth: "neutral",
    mouthOpen: mouthOpen + chew,
    lids: 0.15 + blink(f, 6) * 0.5,
  });
  const anch = rigAnchors(pose, TEACHER.height, 0.16);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <KitchenRoom cam={cam} f={f} light={0.16} />
        {/* wife watching from the right — waiting for a mention that doesn't come */}
        <Card cam={cam} x={2.55} y={0} z={4.5}>
          <Figure
            pose={{ torso: -2, neck: 4, shL: 8, elL: 30, shR: 7, elR: 26,
              hipL: 3, hipR: -3, knL: 3, knR: 3, breathe: breath(f, 0.14, 5) } as Pose}
            view={0.22}
            look={wifeLook({ yaw: -0.1, lookX: -0.42, lids: 0.14 + blink(f, 9) * 0.5,
              mouth: "flat", brow: 0.1 })}
            pal={WIFE.pal} height={WIFE.height} rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <KitchenChair cam={cam} x={1.62} z={4.52} />
        <Card cam={cam} x={1.62} y={0} z={4.42}>
          <ellipse cx={0} cy={0.012} rx={0.4} ry={0.11} fill="#4a4038" opacity={0.3} />
          <Figure pose={pose} view={0.16} look={look} pal={TEACHER.pal} height={TEACHER.height}
            rimLight="#ffe9c0" rimSide={-1} />
        </Card>
        <Table cam={cam} x={1.62} z={3.72} />
        <Mug cam={cam} x={1.35 + 0.02 * prog(f, T.On - 6, T.On + 4, easeOut)} z={3.98} />
        <Bowl cam={cam} x={1.95} z={4.02} />
        <Card cam={cam} x={1.62} y={0.755} z={4.2}><Plate r={0.145} squash={0.62} /></Card>
        <Plate50 cam={cam} x={1.62} z={4.2} f={999} from={0} />
        {/* the strip he lifts instead of speaking */}
        <Card cam={cam} x={1.62} y={0} z={4.42} blur={false}>
          <g transform={`translate(${anch.wristR.x},${anch.wristR.y}) rotate(${lerp(188, -14, take)})`}>
            <HandBack pal={TEACHER.pal} curl={lerp(0.3, 0.62, take)} thumb={0.55}
              sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={0} />
            {take > 0.5 && (
              <g transform="translate(0.01,-0.13) rotate(20)">
                <Strip w={0.055} h={0.014} o={1} s={1} seed={3} />
              </g>
            )}
          </g>
        </Card>
      </svg>
      <Motes f={f} n={20} color="#ffe9c4" seed={15} region={[0, 0, W, H * 0.75]} drift={0.5} />
      <Finish f={f} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ═════════════════════════ assembly + sound ═════════════════════════ */
export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0b09" }}>
    <Sequence from={0} durationInFrames={CUT2} name="S1 morning"><S1 /></Sequence>
    <Sequence from={CUT2} durationInFrames={CUT3 - CUT2} name="S2 hands"><S2 /></Sequence>
    <Sequence from={CUT3} durationInFrames={CUT4 - CUT3} name="S3 the fifty"><S3 /></Sequence>
    <Sequence from={CUT4} durationInFrames={T.end - CUT4} name="S4 mention"><S4 /></Sequence>
    <Sequence from={0} durationInFrames={T.end}>
      <Audio src={staticFile("sfx/a_room.wav")} volume={0.035} loop />
    </Sequence>
    <Sequence from={T.On} durationInFrames={16}>
      <Audio src={staticFile("sfx/a_clink.wav")} volume={0.11} />
    </Sequence>
    <Sequence from={T.cough} durationInFrames={36}>
      <Audio src={staticFile("sfx/a_cough.wav")} volume={0.13} />
    </Sequence>
    <Sequence from={T.arranged - 4} durationInFrames={T.fifty50 - T.arranged + 14}>
      <Audio src={staticFile("sfx/a_sizzle.wav")} volume={0.1} />
    </Sequence>
    <Sequence from={T.fifty50} durationInFrames={18}>
      <Audio src={staticFile("sfx/a_clink.wav")} volume={0.1} />
    </Sequence>
    <Sequence from={T.that + 8} durationInFrames={20}>
      <Audio src={staticFile("sfx/a_clink.wav")} volume={0.09} />
    </Sequence>
  </AbsoluteFill>
);
