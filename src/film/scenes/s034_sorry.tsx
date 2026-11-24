// SCENE 034 · "sorry" · set: basement · narration 511.37s → 525.39s (14.02s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration:
//   "It takes a long time. Somewhere in the middle of it he starts apologising, and he does not stop."
//   "'I'm sorry. I'm sorry. I'm so sorry.'"
//   "No rage anywhere near that basement. It was procedure."
// Research (S01E03): Walt pulls the bike lock tight from behind; the prisoner fights, jabs a shard
// backward into Walt's leg, then goes limp. Walt crouches against the post afterwards, saying it.
// Beat map (local = beat(sec)):
//   b(511.74) "It takes a long time"  wide: the two of them locked together against the post
//   b(514.60) "he starts apologising" the pull goes tight; his face is not angry, it is working
//   b(517.86) "I'm sorry"             close: his mouth moves; the words are not for the prisoner
//   b(519.10) "so sorry"              the hand at the lock is steady
//   b(520.13) "I'm so sorry"          the struggle slows, the body slackens
//   b(521.63) "No rage"               he lets go; the prisoner slumps against the post
//   b(524.05) "It was procedure"      he sits back against the post, breathing, saying it
// Hard cuts, no text. Blood only where the story puts it.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, breath, blink, noise1, rand } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import { BS, BasementRoom, Stairs, Post, WaterHeater, Bucket, Chain, Shelves, CardboardBox, FloorStain } from "../../env/b_basement";
import { SoftDefs, Dust } from "../../env/b_common";
import { Finish } from "../../fx/Post";

export const META = { n: 34, id: "sorry", set: "basement", cutIn: 511.37, cutOut: 525.39 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(525.39);
const CUTS = { s1: 0, s2: B(517.1), s3: B(521.5), end: END };

const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.1) : c));
const PRISONER = {
  ...PARTNER, height: 1.71,
  pal: tint(PARTNER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.18) : c)),
  hair: { base: "#241a14", dark: "#150e0a", light: "#4a3324", style: "buzz" as const },
};
const prisonerLook = (o: Partial<Parameters<typeof partnerLook>[0]> = {}) => partnerLook({ hair: PRISONER.hair, stubble: 0.9, dirt: 0.55, age: 0.2, ...o });
const POST = { x: 0.1, z: 4.0 };
const ST = { x0: 1.55, width: 1.2, z0: 3.6, run: 0.26, steps: 12, rise: BS.ceil };

const SetBits: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => (
  <>
    <SoftDefs />
    <BasementRoom cam={cam} f={f} bulb={1} shaft={0.42} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
    <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
    <Shelves cam={cam} x={-2.85} z={4.6} w={1.1} seed={4} />
    <WaterHeater cam={cam} x={-1.4} z={6.4} />
    <CardboardBox cam={cam} x={-2.4} z={4.0} seed={3} />
    <Post cam={cam} x={POST.x} z={POST.z} />
    <Bucket cam={cam} x={POST.x - 0.55} z={POST.z + 0.3} />
    <FloorStain cam={cam} x={POST.x + 0.2} z={POST.z - 0.5} r={0.3} color="#4b2a20" o={0.4} seed={7} />
  </>
);

/* ─────────────── S1 · the long struggle against the post (profile two-shot) ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  // a locked-off profile that creeps in: no cuts inside the act, nothing to look at but them
  const cam: Cam = { x: lerp(-0.7, -0.62, easeInOut(t)), y: 1.02, z: lerp(1.55, 1.35, easeInOut(t)), f: 1400, shiftY: 20, focus: 2.5, aperture: 0.85 };
  const pull = prog(g, B(511.7), B(514.6), easeInOut);
  const fight = (1 - prog(g, B(519.6), B(520.6), easeInOut));
  const struggle = fight * (0.5 + 0.5 * Math.sin(g * 0.5)) * (0.35 + 0.65 * pull);
  const slack = prog(g, B(520.2), B(521.4), easeInOut);
  // the prisoner: kneeling, back arched, both hands up at the lock, facing the post (+x)
  const poseP: Pose = {
    torso: -26 - 6 * pull + 5 * struggle,
    neck: -22 - 10 * pull + 8 * struggle + 26 * slack,
    shL: 118 + 22 * struggle - 30 * slack, shR: 104 + 26 * struggle - 34 * slack,
    elL: 76 + 16 * struggle, elR: 68 + 18 * struggle,
    hipL: 66, hipR: 58, knL: 116 + 8 * struggle, knR: 104,
    breathe: 0.55 + 0.45 * struggle,
  };
  // Walt: standing behind him, arms reaching forward and down around the throat
  const poseW: Pose = {
    torso: 22 + 6 * pull + 3 * struggle,
    neck: 16 + 4 * pull,
    shL: 98 + 6 * pull - 6 * slack, shR: 92 + 8 * pull - 8 * slack,
    elL: 14 + 6 * pull + 10 * struggle, elR: 18 + 6 * pull + 12 * struggle,
    hipL: 14, hipR: -8, knL: 16, knR: 12,
    breathe: 0.6 + 0.3 * struggle, slump: 0.25,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        {/* prisoner, kneeling against the post */}
        <Card cam={cam} x={POST.x - 0.5} z={POST.z} flip>
          <ellipse cx={0.16} cy={0.008} rx={0.44} ry={0.08} fill="#000" opacity={0.42} />
          <Figure pose={poseP} view={1} look={prisonerLook({
            yaw: 0.92, lids: lerp(0.3, 0.88, slack) + blink(g, 7) * 0.3,
            lookX: 0, lookY: lerp(-0.2, 0.35, slack), brow: 0.2 + 0.5 * struggle,
            mouth: slack > 0.4 ? "pain" : "open", mouthOpen: 0.24 + 0.3 * struggle - 0.12 * slack,
            bruise: 0.7, bloodLip: 0.5, sweat: 0.9,
          })} pal={PRISONER.pal} height={PRISONER.height} rimLight="#ffd9a0" rimSide={1} />
        </Card>
        <Chain cam={cam} from={[POST.x - 0.02, 1.0, POST.z]} to={[POST.x - 0.3, 0.9, POST.z]} sag={0.02} />
        {/* Walt right behind him, the lock in both fists at his throat */}
        <Card cam={cam} x={POST.x - 0.66} z={POST.z + 0.06} flip>
          <ellipse cx={0.16} cy={0.008} rx={0.36} ry={0.08} fill="#000" opacity={0.36} />
          <Figure pose={poseW} view={1} look={teacherLook({
            yaw: 0.86, lids: 0.36 + 0.2 * pull + blink(g, 3) * 0.4, lookX: 0, lookY: 0.55,
            brow: -0.1, mouth: "open", mouthOpen: 0.1 + 0.16 * Math.abs(Math.sin(g * 0.33)),
            sweat: 0.85, glasses: false,
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={-1} />
          {/* the bike lock: a taut steel cable from his fists to the prisoner's throat */}
          <path d="M0.46,-0.99 L0.86,-0.97" stroke="#9aa2a8" strokeWidth={0.016} strokeLinecap="round" />
          <path d="M0.46,-0.99 L0.86,-0.97" stroke="#e2e8ec" strokeWidth={0.005} strokeLinecap="round" opacity={0.7} />
          <rect x={0.48} y={-1.0} width={0.05} height={0.05} rx={0.01} fill="#7b838a" stroke="#1b1410" strokeWidth={0.004} />
        </Card>
        <Dust f={g} cam={cam} n={22} seed={51} color="#f6ecd9" z0={1.2} z1={5} x0={-2} x1={2} h={1.7} />
      </svg>
      <Finish f={g} vig={0.72} grain={0.08} shadow="#2a2118" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · close on Walt: "I'm sorry. I'm sorry. I'm so sorry." ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.78, -0.74, easeInOut(t)), y: 1.62, z: lerp(2.2, 2.08, easeInOut(t)), f: 1600, shiftY: -300, focus: 1.5, aperture: 1.1 };
  const strain = 1 - prog(g, B(520.3), B(521.2), easeInOut);
  const words = (t0: number, t1: number) => (g > B(t0) && g < B(t1)) ? 0.5 + 0.5 * Math.sin(g * 0.6) : 0;
  const talk = Math.max(words(517.86, 518.7), words(519.1, 519.6), words(520.13, 520.6), 0.2);
  const poseW: Pose = {
    torso: 24, neck: 18 - 6 * strain,
    shL: 100 - 6 * strain, shR: 94 + 6 * strain, elL: 12, elR: 16,
    hipL: 14, hipR: -8, knL: 16, knR: 12, breathe: 0.6, slump: 0.3,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        <Card cam={cam} x={POST.x - 0.5} z={POST.z} flip>
          <Figure pose={{ torso: -30, neck: -26, shL: 130, shR: 118, elL: 80, elR: 72, hipL: 66, hipR: 58, knL: 118, knR: 106, breathe: 0.4 }} view={1} look={prisonerLook({ yaw: 0.95, lids: 0.55, lookX: 0, lookY: 0.2, brow: 0.4, mouth: "pain", mouthOpen: 0.18, bruise: 0.7, bloodLip: 0.6, sweat: 1 })} pal={PRISONER.pal} height={PRISONER.height} rimLight="#ffd9a0" rimSide={1} />
        </Card>
        <Card cam={cam} x={POST.x - 0.66} z={POST.z + 0.06} flip>
          <Figure pose={poseW}
            view={0.55} look={teacherLook({
              yaw: 0.3, lids: 0.4 + 0.1 * strain, lookX: 0.1, lookY: 0.5,
              brow: -0.6, mouth: "open", mouthOpen: 0.12 + 0.3 * talk,
              sweat: 1, tears: 0.4, glasses: false,
            })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={-1} />
        </Card>
        <Dust f={g} cam={cam} n={16} seed={53} color="#f6ecd9" z0={1.4} z1={4} x0={-1} x1={1.6} h={1.8} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#2a2118" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · it is over; he sits with it ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.25, -0.1, easeInOut(t)), y: 0.9, z: lerp(0.7, 0.95, easeInOut(t)), f: 1400, shiftY: 55, focus: 3.0, aperture: 0.8 };
  const words = 0.5 + 0.5 * Math.sin(g * 0.5);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SetBits cam={cam} f={g} />
        {/* the body, folded over against the post — head down, arm trailing */}
        <Card cam={cam} x={POST.x - 0.62} z={POST.z + 0.18} flip>
          <ellipse cx={0.24} cy={0.008} rx={0.56} ry={0.1} fill="#000" opacity={0.42} />
          <Figure pose={{ torso: -90, neck: 14, shL: -26, shR: 12, elL: 12, elR: 26, hipL: 8, hipR: 16, knL: 14, knR: 30, breathe: 0 }} view={0.95} look={prisonerLook({ yaw: 0.9, lids: 1, lookX: 0, lookY: 0.4, brow: 0.1, mouth: "flat", bruise: 0.7, bloodLip: 0.4, sweat: 0.8 })} pal={PRISONER.pal} height={PRISONER.height} rimLight="#ffd9a0" rimSide={1} />
        </Card>
        {/* Walt, sitting back on the slab, hands loose, talking to nobody */}
        <Card cam={cam} x={POST.x + 0.72} y={0} z={POST.z + 0.62}>
          <ellipse cx={0.05} cy={0.008} rx={0.42} ry={0.09} fill="#000" opacity={0.38} />
          <g transform="translate(0,0.1)">
            <Figure pose={{ torso: -20, neck: 14, shL: -2, shR: -4, elL: 20, elR: 16, hipL: 92, hipR: 86, knL: 62, knR: 74, breathe: 0.7, slump: 0.6 }}
              view={0.62} look={teacherLook({
                yaw: 0.34, lids: 0.55 + blink(g, 3) * 0.4, lookX: 0.1, lookY: 0.2,
                brow: -0.6, mouth: "open", mouthOpen: 0.08 + 0.22 * words,
                sweat: 0.8, tears: 0.25, glasses: false,
              })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={-1} />
          </g>
        </Card>
        <Dust f={g} cam={cam} n={20} seed={57} color="#f6ecd9" z0={1.2} z1={5} x0={-1.6} x1={2} h={1.6} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#2a2118" gradeO={0.22} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the struggle"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 I'm sorry"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 procedure"><S3 /></Sequence>
    <Audio src={staticFile("sfx/b_room_basement.wav")} volume={0.035} />
    <Sequence from={0} durationInFrames={90}><Audio src={staticFile("sfx/b_chain.wav")} volume={0.11} /></Sequence>
    <Sequence from={B(519.6)} durationInFrames={60}><Audio src={staticFile("sfx/b_chain.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
