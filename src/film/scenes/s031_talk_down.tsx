// SCENE 031 · "talk-down" · set: basement · narration 457.60s → 478.69s (21.09s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration:
//   "Afterwards he is decent about it. He sits down there and talks to the man about family, about
//    business, about being underestimated by people who are slower than you. He even tells him about the
//    cancer. It is almost warm down there."
//   "Krazy-8 doesn't want that. Krazy-8 tells him plainly that getting to know him is not going to make
//    this any easier."
// Research (S01E03): Walt brings a sandwich and a six-pack down, sits on a plastic chair / the steps and
// talks to the chained man — family, his father's furniture business, being underestimated, his cancer.
// The prisoner (Domingo) is not interested in the intimacy; he wants to be let go.
// Beat map (local = beat(sec)):
//   b(458.07) "Afterwards"   he wakes on the slab, lifts his head, looks at the prisoner, gets up
//   b(460.31) "sits down"    he drags the folding chair over and sits, both hands on his knees
//   b(462.36) "family"       he holds up his wedding band
//   b(463.36) "business"     he gestures the shape of a counter / talks with his hands
//   b(464.51) "underestimated"  he laughs, hands open, then the laugh dies
//   b(468.48) "the cancer"   he taps his own chest; the prisoner's eyes drop
//   b(470.18) "warm down there" a beat of quiet: two men breathing in a lit basement
//   b(472.30) "Krazy-8"      reverse: the prisoner leans in
//   b(474.60) "tells him plainly" he shakes his head — no deal, no friendship
//   b(477.65) "easier"       the prisoner sits back against the post. Cold.
// 3 shots, hard cuts, no text.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { kf, prog, sec, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, rand, noise1, breath, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import {
  BS, BasementRoom, Stairs, Post, WaterHeater, Furnace, Shelves, CardboardBox, Bucket, PlasticPool, Chain, FloorStain,
} from "../../env/b_basement";
import { SoftDefs, Dust, flatDisc } from "../../env/b_common";
import { Plate, Sandwich } from "../../props/b_props";
import { floorSit, chairSit, rigAnchors } from "../../props/b_pose";
import { Finish } from "../../fx/Post";

export const META = { n: 31, id: "talk-down", set: "basement", cutIn: 457.6, cutOut: 478.69 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(478.69);
const CUTS = { s1: 0, s2: B(461.1), s3: B(471.9), end: END };

const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.1) : c));
// the prisoner: an original supporting design built on the PARTNER rig, derelict-basement tinted
const PRISONER = {
  ...PARTNER,
  height: 1.71,
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
    <CardboardBox cam={cam} x={-2.35} z={6.2} w={0.46} h={0.38} seed={8} rot={5} />
    <PlasticPool cam={cam} x={-1.9} z={5.4} r={0.58} seed={2} />
    <Post cam={cam} x={POST.x} z={POST.z} />
    <Bucket cam={cam} x={POST.x - 0.42} z={POST.z + 0.25} />
    <FloorStain cam={cam} x={-0.1} z={4.4} r={0.5} color="#3f382d" o={0.25} seed={5} />
  </>
);

const Prisoner: React.FC<{ cam: Cam; g: number; pose: Pose; look: ReturnType<typeof prisonerLook>; view?: number; x?: number; z?: number }> = ({ cam, g, pose, look, view = 0.35, x = POST.x + 0.4, z = POST.z + 0.05 }) => (
  <Card cam={cam} x={x} z={z}>
    {/* contact shadow keeps him welded to the slab */}
    <ellipse cx={0.1} cy={0.008} rx={0.52} ry={0.1} fill="#000" opacity={0.4} />
    <ellipse cx={0.16} cy={0.006} rx={0.3} ry={0.06} fill="#000" opacity={0.3} />
    <g transform="translate(0,0.12)">
      <Figure pose={pose} view={view} look={look} pal={PRISONER.pal} height={PRISONER.height} rimLight={RIM} rimSide={1} />
    </g>
  </Card>
);

/* ─────────────── S1 · he comes to, gets up, drags the chair over, sits ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  // he wakes at 458.07, sits up, stands, walks two steps, drags the chair, sits at 460.31
  const wake = prog(g, B(458.1), B(458.6), easeInOut);
  const sitUp = prog(g, B(458.5), B(459.2), easeInOut);
  const stand = prog(g, B(459.3), B(459.85), easeInOut);
  const walk = clamp((g - B(459.85)) / (B(460.31) - B(459.85)));
  const sit = prog(g, B(460.3), B(461.0), easeInOut);
  const cam: Cam = {
    x: lerp(-0.15, -0.05, easeInOut(t)), y: lerp(1.5, 1.15, easeInOut(t)),
    z: lerp(-0.35, 0.05, easeInOut(t)), f: 1350, shiftY: lerp(130, 60, easeInOut(t)), focus: 4.2, aperture: 0.7,
  };
  // pose blend: lying → sitting up → standing → walk → sit on the chair
  const base = { torso: lerp(lerp(-84, -20, sitUp), lerp(4, -4, sit), Math.max(stand, walk)), neck: lerp(-10, 4, sitUp) };
  // blend standing/walking (sw) against the seated pose (sit)
  const sw = Math.max(stand * (1 - sit), walk * (1 - sit));
  const walkP = (amp: number) => amp * Math.sin(g * 0.34);
  const pose: Pose = {
    torso: lerp(lerp(-84, -20, sitUp), lerp(4, -4, sit), sw) ,
    neck: lerp(lerp(-10, 4, sitUp), 3, sw),
    shL: lerp(lerp(-20, 26, sitUp), lerp(8 + walkP(16), 26, sit), sw),
    shR: lerp(lerp(14, 30, sitUp), lerp(-8 - walkP(16), 24, sit), sw),
    elL: lerp(lerp(34, 46, sitUp), lerp(18, 62, sit), sw),
    elR: lerp(lerp(24, 40, sitUp), lerp(18, 58, sit), sw),
    hipL: lerp(lerp(18, 74, sitUp), lerp(4 + walkP(18), 84, sit), sw),
    hipR: lerp(lerp(4, 72, sitUp), lerp(-4 - walkP(18), 86, sit), sw),
    knL: lerp(lerp(46, 78, sitUp), lerp(10 + 26 * Math.max(0, Math.sin(g * 0.34)), 84, sit), sw),
    knR: lerp(lerp(30, 74, sitUp), lerp(10 + 26 * Math.max(0, -Math.sin(g * 0.34)), 86, sit), sw),
    breathe: 0.3 + 0.4 * wake,
  };
  const look = teacherLook({
    yaw: lerp(0.5, 0.28, sitUp), lids: lerp(0.85, 0.22, wake) + blink(g, 3) * 0.5,
    lookX: lerp(0.2, 0.3, sitUp), lookY: lerp(0.3, 0.0, sitUp),
    brow: lerp(-0.2, 0.1, wake), mouth: "open", mouthOpen: 0.14 + 0.16 * breath(g, 0.2),
  });
  // the chair is dragged in the last beat (it slides with him)
  const chairX = CHAIR.x;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <CardboardBox cam={cam} x={chairX} z={CHAIR.z + 0.1} w={0.52} h={0.4} d={0.42} seed={12} />
        <Prisoner cam={cam} g={g} pose={floorSit({ torso: -16, neck: 4, shL: -6, shR: 20, elL: 24, elR: 44, knL: 88, knR: 96, breathe: breath(g, 0.14) })}
          look={prisonerLook({ yaw: 0.1, lids: 0.28 + blink(g, 7) * 0.6, lookX: 0.1, lookY: -0.1, brow: 0.2, mouth: "flat" })} />
        <Chain cam={cam} from={[POST.x + 0.05, 0.24, POST.z - 0.02]} to={[POST.x + 0.3, 0.11, POST.z - 0.5]} sag={0.05} />
        <Card cam={cam} x={lerp(CHAIR.x - 0.75, CHAIR.x, stand)} y={0} z={lerp(CHAIR.z + 0.9, CHAIR.z + 0.02, stand)} flip>
          <ellipse cx={0.05} cy={0.008} rx={0.4} ry={0.09} fill="#000" opacity={0.38} />
          <g transform="translate(0,0.06)"><Figure pose={pose} view={0.42} look={look} pal={PAL_T} height={TEACHER.height} rimLight={RIM} rimSide={-1} /></g>
        </Card>
        <Dust f={g} cam={cam} n={22} seed={9} color="#f6ecd9" z0={1.4} z1={6} x0={-2.4} x1={2.2} h={1.7} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · the talk: family, business, being underestimated, the cancer ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.05, 0.02, easeInOut(t)), y: 1.02, z: lerp(0.15, 0.5, easeInOut(t)),
    f: 1500, shiftY: 30, focus: 3.4, aperture: 0.8,
  };
  // acting beats on the narration
  const bandLift = prog(g, B(462.36), B(462.7), easeOut) * (1 - prog(g, B(463.2), B(463.5), easeOut));
  const biz = prog(g, B(463.36), B(463.7), easeOutBack) * (1 - prog(g, B(464.2), B(464.55), easeOut));
  const laugh = prog(g, B(464.51), B(464.8), easeOut) * (1 - prog(g, B(466.1), B(466.5), easeIn));
  const chest = prog(g, B(468.48), B(468.9), easeOut) * (1 - prog(g, B(469.9), B(470.6), easeOut));
  const photo = prog(g, B(462.3), B(462.8), easeOutBack) * (1 - prog(g, B(463.5), B(464.1), easeOut));
  const cough2 = clamp(1 - Math.abs(g - B(468.75)) / 7) + clamp(1 - Math.abs(g - B(469.15)) / 7);
  const settleIn = prog(g, B(470.18), B(471.3), easeInOut);
  const pose: Pose = {
    torso: 2 + 3 * laugh + 4 * chest + 7 * cough2,
    neck: 4 - 6 * laugh + 2 * chest + 9 * cough2,
    shL: 46 + 42 * bandLift + 26 * biz + 18 * laugh + 10 * chest,
    shR: 42 + 10 * bandLift + 34 * biz + 14 * laugh + 46 * chest,
    elL: 62 + 34 * bandLift - 26 * biz + 20 * laugh + 20 * chest,
    elR: 58 + 8 * bandLift - 18 * biz + 16 * laugh + 74 * chest,
    hipL: 84, hipR: 86, knL: 84, knR: 86,
    breathe: 0.35 + 0.4 * laugh + 0.3 * breath(g, 0.16),
    slump: 0.15 + 0.5 * settleIn,
  };
  const look = teacherLook({
    yaw: lerp(0.42, 0.3, settleIn), lids: clamp(0.18 + 0.2 * laugh + 0.15 * settleIn + blink(g, 3) * 0.6),
    lookX: 0.18 - 0.1 * settleIn, lookY: 0.06 + 0.1 * chest,
    brow: 0.15 - 0.25 * laugh - 0.2 * settleIn,
    mouth: laugh > 0.4 ? "laugh" : "open",
    mouthOpen: 0.18 + 0.3 * laugh + 0.2 * Math.abs(Math.sin(g * 0.32)) * (1 - laugh) + 0.1 * chest,
  });
  // the prisoner across from him: listening, unmoved, then he answers
  const pLean = prog(g, B(463.9), B(464.4), easeInOut);
  const pShake = prog(g, B(474.6), B(475.4), easeInOut);
  const pReturn = prog(g, B(477.1), B(478.0), easeInOut);
  const pPose = floorSit({
    torso: -14 + 5 * pLean - 6 * pReturn,
    neck: 2 - 4 * pLean,
    shL: -8 + 8 * pLean, shR: 22 + 14 * pShake,
    elL: 26 + 10 * pLean, elR: 46 + 30 * pShake,
    knL: lerp(88, 100, pLean), knR: lerp(96, 106, pLean),
    breathe: breath(g, 0.13, 1),
  });
  const pLook = prisonerLook({
    yaw: 0.12 + 0.16 * pShake, lids: 0.2 + blink(g, 7) * 0.6 + 0.15 * pReturn,
    lookX: 0.12, lookY: -0.05, brow: 0.25 + 0.2 * pShake,
    mouth: pShake > 0.25 ? "open" : "flat",
    mouthOpen: pShake > 0.25 ? 0.12 + 0.14 * Math.abs(Math.sin(g * 0.3)) : 0.0,
    sweat: 0.35, bruise: 0.55,
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <CardboardBox cam={cam} x={CHAIR.x} z={CHAIR.z + 0.1} w={0.52} h={0.4} d={0.42} seed={12} />
        <Prisoner cam={cam} g={g} pose={pPose} look={pLook} view={0.5} />
        <Chain cam={cam} from={[POST.x + 0.06, 0.24, POST.z + 0.02]} to={[POST.x + 0.5, 0.1, POST.z + 0.2]} sag={0.05} />
        <Card cam={cam} x={CHAIR.x} y={0} z={CHAIR.z + 0.02} flip>
          <ellipse cx={0.05} cy={0.008} rx={0.4} ry={0.09} fill="#000" opacity={0.38} />
          <g transform="translate(0,0.06)"><Figure pose={pose} view={0.55} look={look} pal={PAL_T} height={TEACHER.height} rimLight={RIM} rimSide={-1} /></g>
          {/* the sandwich on his knee (he brought it down; secondary business) */}
          <g transform="translate(0.12,-0.72)"><Sandwich s={1.3} tilt={-6} /></g>
          {/* "about family" — a creased snapshot comes out of his jacket and is held up to the light */}
          <g transform={`translate(${lerp(0.16, 0.34, photo)} ,${lerp(-0.62, -0.9, photo)}) rotate(${lerp(0, -7, photo)}) scale(${lerp(0.9, 1.15, photo)})`}
             opacity={photo > 0.02 ? 1 : 0}>
            <rect x={-0.037} y={-0.052} width={0.074} height={0.104} rx={0.004} fill="#f4efe2" stroke="#8a8272" strokeWidth={0.003} />
            <rect x={-0.03} y={-0.045} width={0.06} height={0.052} fill="#8fa7bd" />
            <circle cx={-0.014} cy={-0.026} r={0.009} fill="#e2b48f" />
            <circle cx={0.014} cy={-0.024} r={0.009} fill="#e8c0a0" />
            <circle cx={0.0} cy={-0.008} r={0.007} fill="#eec7a6" />
            <path d="M-0.03,0.03 h0.06" stroke="#b9ad96" strokeWidth={0.004} />
            <path d="M-0.02,0.046 h0.04" stroke="#cfc4ac" strokeWidth={0.003} />
          </g>
        </Card>
        {/* the six-pack at his feet (props that tell the story) */}
        <Card cam={cam} x={CHAIR.x - 0.34} y={0} z={CHAIR.z + 0.42}>
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${i * 0.075 - 0.075},0)`}>
                <path d="M-0.03,0 L-0.03,-0.12 Q0,-0.13 0.03,-0.12 L0.03,0 Z" fill={i === 1 ? "#6f4a22" : "#5c3c1c"} stroke="#2b1f12" strokeWidth={0.004} />
                <rect x={-0.024} y={-0.11} width={0.048} height={0.06} fill="#c9a24a" opacity={0.75} />
              </g>
            ))}
            <path d="M-0.11,0 L0.11,0 L0.1,-0.03 L-0.1,-0.03 Z" fill="#8a6a3a" opacity={0.6} />
          </g>
        </Card>
        <Dust f={g} cam={cam} n={20} seed={14} color="#f6ecd9" z0={1.2} z1={5} x0={-2} x1={2} h={1.6} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#2a2118" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · reverse: the prisoner refuses the friendship ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.62, -0.56, easeInOut(t)), y: 0.95, z: lerp(2.15, 2.0, easeInOut(t)), f: 2100, shiftY: 60, focus: 1.95, aperture: 1.0 };
  const speak = (g > B(472.3) && g < B(475.2)) || (g > B(474.6) && g < B(478.0));
  const lean = prog(g, B(473.9), B(474.5), easeInOut);
  const shakeHead = prog(g, B(474.6), B(475.5), easeInOut);
  const pullBack = prog(g, B(477.2), B(478.2), easeInOut);
  const pose: Pose = floorSit({
    torso: -18 + 6 * lean - 10 * pullBack,
    neck: 6 - 8 * shakeHead + 6 * pullBack,
    shL: -6 + 10 * lean, shR: 26 + 26 * shakeHead,
    elL: 24 + 12 * lean, elR: 48 + 26 * shakeHead,
    hipL: 84 + 4 * pullBack, hipR: 74 + 6 * pullBack,
    knL: 26 - 10 * pullBack, knR: 44 - 12 * pullBack,
    breathe: breath(g, 0.13, 1),
  });
  const look = prisonerLook({
    yaw: 0.16 + 0.2 * pullBack, lids: 0.16 + 0.2 * pullBack + blink(g, 7) * 0.5,
    lookX: lerp(0.16, -0.05, pullBack), lookY: lerp(-0.1, 0.05, pullBack),
    brow: 0.15 + 0.3 * shakeHead,
    mouth: speak ? "open" : "flat",
    mouthOpen: speak ? 0.12 + 0.16 * Math.abs(Math.sin(g * 0.42)) : 0.0,
    sweat: 0.3, bruise: 0.6, dirt: 0.55,
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        {/* Walt, out of focus in the foreground: the back of his shoulder, listening */}
        <Card cam={cam} x={1.55} y={0} z={2.45} flip>
          <Figure pose={chairSit({ torso: -2, neck: 6, shL: 30, shR: 28, elL: 60, elR: 58, breathe: breath(g, 0.16) })}
            view={0.9} look={teacherLook({ yaw: -0.7, lids: 0.3, lookX: 0.6, lookY: 0, brow: -0.1, mouth: "flat" })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffcf8a" rimSide={1} />
        </Card>
        <Prisoner cam={cam} g={g} pose={pose} look={look} view={0.42} />
        <Dust f={g} cam={cam} n={18} seed={17} color="#f6ecd9" z0={1.2} z1={4} x0={-2} x1={1.6} h={1.3} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#2a2118" gradeO={0.18} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 he sits down"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the talk"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 the refusal"><S3 /></Sequence>
    <Audio src={staticFile("sfx/b_room_basement.wav")} volume={0.035} />
    <Sequence from={B(458.2)} durationInFrames={44}><Audio src={staticFile("sfx/b_chain.wav")} volume={0.05} /></Sequence>
    <Sequence from={B(459.6)} durationInFrames={40}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
