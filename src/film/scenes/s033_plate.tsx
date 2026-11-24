// SCENE 033 · "plate" · set: kitchenNight · narration 494.83s → 511.37s (16.54s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration:
//   "Upstairs, Walter picks the broken plate out of the trash and starts fitting the pieces back together."
//   "One is missing. A long, sharp one, and it is not in the trash."
//   "He goes back down, and asks him, politely, whether he is going to stick him with it."
// Research (S01E03): he retrieves the shards from the bin, puzzles them together on the counter like a
// jigsaw, finds the long jagged piece missing, checks the bin again, then goes down holding the key.
// Beat map (local = beat(sec)):
//   b(495.30) "Upstairs"      kitchen at night, the bin open, shards on the counter
//   b(496.31) "picks"         his hand goes into the bin, comes up with a shard
//   b(497.04) "plate"         he empties them out onto the counter
//   b(498.45) "starts fitting" pieces slide together into a broken circle
//   b(500.80) "One"           his finger stops: a gap, plate-shaped
//   b(501.30) "is missing"    he lifts the whole ring, tilts it; the hole is obvious
//   b(502.71) "sharp"         insert: the gap's shape — long, tapered, a blade
//   b(504.00) "and it is not" he digs through the bin again, faster, nothing
//   b(506.18) "He goes back down" he leaves the kitchen, the key in his fist
//   b(507.69) "asks him"      basement: he asks, quietly
//   b(508.69) "politely"      the prisoner's hand slides toward his pocket
//   b(510.36) "stick"         the shard appears in the prisoner's hand
// 4 shots, hard cuts, no text.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, rand, breath, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import { KT, KitchenRoom, KitchenTable, KitchenChair } from "../../env/b_kitchen";
import { BS, BasementRoom, Stairs, Post, WaterHeater, Bucket, Chain, Shelves } from "../../env/b_basement";
import { SoftDefs, Dust } from "../../env/b_common";
import { Shard, Plate } from "../../props/b_props";
import { chairSit, floorSit } from "../../props/b_pose";
import { Finish } from "../../fx/Post";

export const META = { n: 33, id: "plate", set: "kitchenNight", cutIn: 494.83, cutOut: 511.37 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(511.37);
const CUTS = { s1: 0, s2: B(502.5), s3: B(505.6), s4: B(507.3), end: END };

const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#40331f", 0.06) : c));
const PRISONER = {
  ...PARTNER, height: 1.71,
  pal: tint(PARTNER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#3a2f24", 0.16) : c)),
  hair: { base: "#241a14", dark: "#150e0a", light: "#4a3324", style: "buzz" as const },
};
const prisonerLook = (o: Partial<Parameters<typeof partnerLook>[0]> = {}) => partnerLook({ hair: PRISONER.hair, stubble: 0.9, dirt: 0.5, age: 0.2, ...o });
const POST = { x: -0.62, z: 3.95 };
const ST = { x0: 1.55, width: 1.2, z0: 3.6, run: 0.26, steps: 12, rise: BS.ceil };


/** one wedge of the broken plate (annular sector), drawn in the card's own frame */
const Wedge: React.FC<{ a0: number; a1: number; r0?: number; r1?: number; fill?: string }> = ({ a0, a1, r0 = 0.055, r1 = 0.135, fill = "#f2ecdf" }) => {
  const P = (a: number, r: number) => `${(Math.cos(a) * r).toFixed(4)},${(Math.sin(a) * r * 0.42).toFixed(4)}`;
  return (
    <path d={`M${P(a0, r0)} L${P(a0, r1)} A${r1},${r1 * 0.42} 0 0 1 ${P(a1, r1)} L${P(a1, r0)} A${r0},${r0 * 0.42} 0 0 0 ${P(a0, r0)} Z`}
      fill={fill} stroke="#8b8474" strokeWidth={0.0022} strokeLinejoin="round" />
  );
};
/** the missing piece: a long, tapered, blade-like wedge */
const MissingWedge: React.FC<{ o?: number; stroke?: string }> = ({ o = 1, stroke = "#b8452f" }) => (
  <path d={`M${0.02},-0.004 L${0.148},-0.012 L${0.152},0.004 L${0.02},0.006 Z`} fill="none" stroke={stroke} strokeWidth={0.0038} strokeDasharray="0.009 0.007" opacity={o} strokeLinejoin="round" />
);

/* the plate puzzle: n pieces around a circle, with one wedge (the long shard) missing */
const PW = { r: 0.135, gap: 0.34 }; // gap = half-angle of the missing wedge (radians)
const PIECE = (i: number, n: number) => {
  const a0 = PW.gap + (i / n) * (Math.PI * 2 - PW.gap * 2);
  const a1 = PW.gap + ((i + 1) / n) * (Math.PI * 2 - PW.gap * 2);
  return { a0, a1, mid: (a0 + a1) / 2 };
};

/* ─────────────── S1 · the kitchen counter: fitting the plate together ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(1.5, 1.56, easeInOut(t)), y: lerp(1.5, 1.34, easeInOut(t)), z: lerp(1.5, 1.32, easeInOut(t)), f: 1500, shiftY: lerp(-20, 25, easeInOut(t)), focus: 2.1, aperture: 0.9 };
  // beats
  const reachIn = prog(g, B(496.3), B(496.9), easeInOut) * (1 - prog(g, B(497.3), B(497.9), easeInOut));
  const fit = prog(g, B(498.45), B(500.4), easeInOut);          // pieces slide together
  const stop = prog(g, B(500.75), B(501.2), easeOut);           // his finger finds the gap
  const lift = prog(g, B(501.35), B(502.3), easeInOut);         // he lifts the ring, tilts it
  // pieces: start scattered, end in the ring
  const n = 8;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <KitchenRoom cam={cam} f={g} light={1} />
        <KitchenTable cam={cam} x={1.62} z={3.72} r={0.6} />
        <KitchenChair cam={cam} x={2.6} z={3.4} />
        {/* Walt at the counter, working — waist up, sleeves, hands over the shards */}
        <Card cam={cam} x={0.98} y={0} z={3.5}>
          <ellipse cx={0.02} cy={0.008} rx={0.34} ry={0.08} fill="#000" opacity={0.35} />
          <Figure pose={{
            torso: 16 + 6 * fit, neck: 22 - 6 * lift,
            shL: 40 + 26 * reachIn, shR: 38 + 18 * fit - 14 * lift,
            elL: 26 + 30 * reachIn - 6 * fit, elR: 24 + 40 * fit + 26 * lift,
            hipL: 4, hipR: -4, knL: 4, knR: 4, breathe: 0.4 + 0.3 * breath(g, 0.19), slump: 0.4,
          }} view={0.55} look={teacherLook({
            yaw: 0.5, lids: 0.16 + blink(g, 3) * 0.6, lookX: 0.1, lookY: 0.8, brow: 0.1 + 0.3 * stop,
            mouth: "flat", mouthOpen: 0.04, sweat: 0.2, glasses: lift < 0.5,
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={-1} />
        </Card>
        {/* the counter-top work surface: a plate puzzle building itself */}
        <Card cam={cam} x={1.52} y={0.74} z={3.68}>
          {/* the bin lid, open, and the shards coming out of it */}
          <g transform="translate(-0.34,0.02)">
            <ellipse cx={0} cy={0} rx={0.16} ry={0.06} fill="#4a5257" opacity={0.5} />
          </g>
          {Array.from({ length: n }).map((_, i) => {
            const P = PIECE(i, n);
            const scatterA = rand(i, 3) * Math.PI * 2;
            const scatterD = 0.09 + rand(i, 4) * 0.14;
            const sx0 = Math.cos(scatterA) * scatterD, sy0 = Math.sin(scatterA) * scatterD * 0.4;
            const homeR = 0.075;
            const tx = Math.cos(P.mid) * homeR - Math.cos(P.mid) * homeR, ty = 0;
            const px = lerp(sx0, tx, fit), py = lerp(sy0, ty, fit) - lift * 0.14;
            const rot = lerp(rand(i, 5) * 360, 0, fit);
            return (
              <g key={i} transform={`translate(${px},${py}) rotate(${rot})`}>
                <Wedge a0={P.a0} a1={P.a1} />
              </g>
            );
          })}
          {/* the missing wedge: the gap stays empty */}
          <g transform={`translate(0,${-lift * 0.14})`} opacity={0.25 + 0.75 * stop}>
            <MissingWedge o={0.55 + 0.45 * stop} />
          </g>
          {/* his fingertip arriving at the gap */}
          <g transform={`translate(${lerp(0.1, 0.06, stop)},${lerp(0.08, 0.0, stop)})`} opacity={0.92}>
            <ellipse cx={0} cy={0} rx={0.019} ry={0.013} fill="#e7b792" stroke="#6d4a34" strokeWidth={0.0022} />
          </g>
        </Card>
        <Dust f={g} cam={cam} n={16} seed={33} color="#fff1d4" z0={1.8} z1={4.6} x0={0.5} x1={2.4} h={1.9} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#241a10" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · insert: the shape of the gap ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  // macro on the counter: the ring of shards and the empty wedge between his fingers
  const cam: Cam = { x: lerp(1.52, 1.5, easeInOut(t)), y: 1.02, z: lerp(2.92, 2.84, easeInOut(t)), f: 1600, shiftY: -470, focus: 0.8, aperture: 1.3 };
  const drawShard = prog(g, B(502.7), B(503.5), easeOut);
  const n = 8;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <KitchenRoom cam={cam} f={g} light={1} />
        <Card cam={cam} x={1.52} y={0.74} z={3.68}>
          {Array.from({ length: n }).map((_, i) => {
            const P = PIECE(i, n);
            return <g key={i}><Wedge a0={P.a0} a1={P.a1} r0={0.062} r1={0.14} /></g>;
          })}
          {/* the gap, then the ghost of the piece that fits it — drawn on as he realises */}
          {/* the gap itself: a dark slot where a long piece should be — his finger arrives at it */}
          <path d="M0.055,-0.004 L0.152,-0.013 L0.157,0.004 L0.055,0.007 Z" fill="#2a231c" opacity={0.55} />
          <path d="M0.055,-0.004 L0.152,-0.013" stroke="#f6f0e2" strokeWidth={0.0028} opacity={0.5} />
          <g transform={`translate(${lerp(0.19, 0.15, drawShard)},${lerp(0.05, 0.012, drawShard)}) rotate(${lerp(-24, -6, drawShard)})`} opacity={lerp(0, 1, drawShard)}>
            <path d="M0,0 C-0.02,-0.008 -0.05,-0.006 -0.062,0.004 C-0.05,0.016 -0.02,0.014 0,0.008 Z" fill="#e7b792" stroke="#6d4a34" strokeWidth={0.0022} />
            <path d="M-0.062,0.004 L-0.09,0.002" stroke="#e7b792" strokeWidth={0.011} strokeLinecap="round" />
          </g>
        </Card>
        <Dust f={g} cam={cam} n={12} seed={37} color="#fff1d4" z0={2.6} z1={3.3} x0={1.1} x1={1.9} h={1.4} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.075} shadow="#3a2a12" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · he digs through the bin: it is not in the trash ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(2.45, 2.35, easeInOut(t)), y: 1.0, z: lerp(0.9, 0.75, easeInOut(t)), f: 1500, shiftY: 95, focus: 2.4, aperture: 1.0 };
  const dig = Math.abs(Math.sin(f * 0.42)) * (1 - prog(g, B(505.4), B(505.9), easeInOut));
  const giveUp = prog(g, B(505.5), B(506.1), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <KitchenRoom cam={cam} f={g} light={1} />
        {/* the bin, in the foreground, tipped slightly and open */}
        <Card cam={cam} x={2.62} y={0} z={2.42}>
          <ellipse cx={0} cy={0.01} rx={0.3} ry={0.07} fill="#000" opacity={0.4} />
          <path d="M-0.24,0 L-0.28,-0.56 L0.28,-0.56 L0.24,0 Z" fill="#7d878c" stroke="#241c14" strokeWidth={0.008} />
          <ellipse cx={0} cy={-0.56} rx={0.28} ry={0.09} fill="#3d4549" stroke="#241c14" strokeWidth={0.008} />
          <ellipse cx={0} cy={-0.555} rx={0.23} ry={0.07} fill="#1d2325" />
          {/* crumpled paper + a few shards in the bin */}
          {[0, 1, 2].map((i) => <ellipse key={i} cx={-0.1 + i * 0.1} cy={-0.545 + (i % 2) * 0.01} rx={0.055} ry={0.02} fill={i === 1 ? "#e6dfd0" : "#c9bda3"} opacity={0.85} />)}
          <path d="M-0.05,-0.55 l0.05,-0.008 l0.02,0.006 Z" fill="#f2ecdf" opacity={0.9} />
          <path d="M-0.28,-0.56 L-0.34,-0.62 L0.34,-0.62 L0.28,-0.56 Z" fill="#94a0a5" stroke="#241c14" strokeWidth={0.006} />
          <ellipse cx={0.3} cy={-0.6} rx={0.03} ry={0.012} fill="#241c14" opacity={0.6} />
        </Card>
        <Card cam={cam} x={3.0} y={0} z={2.9} flip>
          <Figure pose={{
            torso: 34 + 8 * dig, neck: 26 - 8 * giveUp,
            shL: 74 + 20 * dig, shR: 66 + 34 * dig - 14 * giveUp,
            elL: 40 - 20 * dig, elR: 46 - 26 * dig + 40 * giveUp,
            hipL: 6, hipR: -6, knL: 8, knR: 8, breathe: 0.45, slump: 0.6,
          }} view={0.7} look={teacherLook({
            yaw: 0.4, lids: 0.2 + 0.2 * giveUp + blink(g, 3) * 0.5, lookX: -0.1, lookY: 0.9,
            brow: 0.3 + 0.3 * dig - 0.3 * giveUp, mouth: "flat", mouthOpen: 0.06, sweat: 0.6, glasses: false,
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={1} />
        </Card>
        <Dust f={g} cam={cam} n={16} seed={39} color="#fff1d4" z0={1.2} z1={4.0} x0={1.8} x1={3.2} h={1.9} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#241a10" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────────── S4 · back down: "are you going to stick me with it?" ─────────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.end - CUTS.s4;
  const t = f / dur;
  // two-shot in the basement: Walt standing with the key, the prisoner seated
  const cam: Cam = { x: lerp(1.42, 1.5, easeInOut(t)), y: 1.42, z: lerp(1.7, 1.55, easeInOut(t)), f: 1400, shiftY: -60, focus: 3.0, aperture: 0.8 };
  const ask = prog(g, B(507.7), B(508.5), easeInOut);
  const revealShard = prog(g, B(510.3), B(510.9), easeOut);
  const poseW: Pose = {
    torso: 4 + 5 * ask, neck: 8 - 4 * ask,
    shL: 6, shR: 26 + 20 * ask, elL: 18, elR: 56 + 20 * ask,
    hipL: 3, hipR: -3, knL: 4, knR: 4, breathe: 0.4 + 0.2 * breath(g, 0.2),
  };
  const poseP: Pose = floorSit({
    torso: -12 + 4 * ask, neck: 4 + 6 * ask,
    shL: -6, shR: 10 + 46 * revealShard, elL: 22, elR: 34 + 40 * revealShard,
    hipL: 84, hipR: 76, knL: 28, knR: 46, breathe: breath(g, 0.14, 1),
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BasementRoom cam={cam} f={g} bulb={1} shaft={0.45} holeX={[ST.x0 - 0.15, ST.x0 + ST.width + 0.15]} />
        <Stairs cam={cam} x0={ST.x0} z0={ST.z0} run={ST.run} steps={ST.steps} rise={ST.rise} width={ST.width} />
        <Shelves cam={cam} x={-2.85} z={4.6} w={1.1} seed={4} />
        <WaterHeater cam={cam} x={0.9} z={6.4} />
        <Post cam={cam} x={POST.x} z={POST.z} />
        <Bucket cam={cam} x={POST.x - 0.42} z={POST.z + 0.25} />
        {/* the prisoner */}
        <Card cam={cam} x={POST.x + 0.4} z={POST.z + 0.05}>
          <ellipse cx={0.1} cy={0.008} rx={0.52} ry={0.1} fill="#000" opacity={0.4} />
          <g transform="translate(0,0.12)">
            <Figure pose={poseP} view={0.55} look={prisonerLook({
              yaw: 0.1, lids: 0.18 + blink(g, 7) * 0.5, lookX: 0.2, lookY: 0.1,
              brow: 0.2, mouth: "flat", bruise: 0.6, sweat: 0.35, dirt: 0.5,
            })} pal={PRISONER.pal} height={PRISONER.height} rimLight="#ffd9a0" rimSide={1} />
            {/* the long shard, coming out of his pocket when Walt asks */}
            <g transform={`translate(${lerp(0.08, 0.2, revealShard)},${lerp(-0.42, -0.5, revealShard)}) rotate(${lerp(70, -14, revealShard)})`} opacity={revealShard}>
              <path d="M0,0 L0.02,-0.005 L0.115,0.002 L0.09,0.012 L0.012,0.011 Z" fill="#f4eee1" stroke="#8b8474" strokeWidth={0.0022} />
              <path d="M0.02,-0.002 L0.1,0.002" stroke="#fff" strokeWidth={0.003} opacity={0.7} />
            </g>
          </g>
        </Card>
        <Chain cam={cam} from={[POST.x + 0.06, 0.24, POST.z + 0.02]} to={[POST.x + 0.5, 0.1, POST.z + 0.22]} sag={0.05} />
        {/* Walt, standing, the key in his fist */}
        <Card cam={cam} x={1.15} y={0} z={3.35}>
          <Figure pose={poseW} view={0.5} look={teacherLook({
            yaw: 0.32, lids: 0.22 + blink(g, 3) * 0.5, lookX: 0.24, lookY: 0.24,
            brow: 0.35, mouth: "open", mouthOpen: 0.08 + 0.2 * ask, sweat: 0.4,
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd9a0" rimSide={-1} />
          <g transform="translate(0.2,-1.02)">
            <rect x={-0.02} y={-0.012} width={0.04} height={0.024} rx={0.006} fill="#b9c0c6" stroke="#241c14" strokeWidth={0.003} />
          </g>
        </Card>
        <Dust f={g} cam={cam} n={20} seed={41} color="#f6ecd9" z0={1.2} z1={5} x0={-2} x1={2} h={1.6} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#2a2118" gradeO={0.17} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 fitting the plate"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the gap"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 not in the trash"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.end - CUTS.s4} name="S4 back down"><S4 /></Sequence>
    <Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} />
    <Sequence from={B(496.3)} durationInFrames={50}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.09} /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={100}><Audio src={staticFile("sfx/b_room_basement.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(510.3)} durationInFrames={26}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
