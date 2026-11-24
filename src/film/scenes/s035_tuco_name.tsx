// SCENE 035 · "tuco-name" · set: street · narration 525.39s → 542.29s (16.90s)  ·  batch B
// OWNER: batch B (see docs/AGENT_BRIEF.md).
// Narration:
//   "He needs a distributor. Jesse brings back a name. Tuco Salamanca."
//   "Walter has never met him, and handles this by walking up to the first dangerous stranger outside the
//    address and asking whether he is Tuco. It works, which tells you something about that neighbourhood."
// Research (S01E06): Jesse gets the name from his contacts; Walt goes to the address alone, walks up to the
// men loitering outside and asks for Tuco — and is let in. Original staging/art; the men outside are
// generic originals built from the cast rig (no likenesses).
// Beat map (local = beat(sec)):
//   b(526.00) "He needs a distributor"   Walt waits on the sidewalk, checking his watch
//   b(527.32) "Jesse"                    Jesse walks in fast, hands him a folded slip
//   b(529.29) "Tuko Salamanca"           insert: the slip, the name written in ballpoint
//   b(531.32) "Walter has never met him" wide of the address: a shabby house, three men on the wall
//   b(533.62) "walking up to"            he walks up the sidewalk, straight at them
//   b(536.93) "asking whether he is Tuko" he stops in front of the biggest one and asks
//   b(537.88) "Tuko."                    the man looks him over, then jerks his head at the door
//   b(539.12) "It works"                 the others step aside; one of them smiles
//   b(540.46) "that neighbourhood"       pull back: the street, the heat, a dog, eyes on him
// 3 shots, hard cuts, no text except the small diegetic slip.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H, planePts } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, rand, breath, blink, noise1, kf } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook, BROTHER, brotherLook, tint, mixHex } from "../../rig/cast";
import { ST, StreetSky, StreetRidge, StreetGround, House, BlockWall, DustDevil } from "../../env/b_street";
import { SoftDefs, Dust, Birds, Shimmer } from "../../env/b_common";
import { walkPose } from "../../props/b_pose";
import { Coupe } from "../../env/Vehicles";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 35, id: "tuco-name", set: "street", cutIn: 525.39, cutOut: 542.29 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(542.29);
const CUTS = { s1: 0, s2: B(529.0), s3: B(531.2), end: END };

const DAY = (pal: typeof TEACHER.pal) => tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#fff0d2", 0.08) : c));
const PAL_T = DAY(TEACHER.pal);
const PAL_P = DAY(PARTNER.pal);

// the three men outside the address: generic originals on the same rig
const EXTRA_A = { // the big one Walt mistakes for Tuco
  height: 1.85,
  pal: { ...BROTHER.pal, jacket: "#5c6f74", jacketShade: "#3f4e52", jacketLight: "#7d9298", shirt: "#d8d2c2", shirtShade: "#a9a294", pants: "#3c4356", pantsShade: "#282d3c" },
  hair: { base: "#241c16", dark: "#15100c", light: "#4a3a2c", style: "buzz" as const },
};
const EXTRA_B = {
  height: 1.74,
  pal: { ...PARTNER.pal, jacket: "#8a4a3a", jacketShade: "#66352a", jacketLight: "#a86a55", shirt: "#e2dccb", shirtShade: "#b3ac9a", pants: "#3a4250", pantsShade: "#262c38" },
  hair: { base: "#2b2118", dark: "#191310", light: "#4f3a28", style: "curls" as const },
};
const EXTRA_C = {
  height: 1.68,
  pal: { ...PARTNER.pal, jacket: "#4a5a3a", jacketShade: "#333f28", jacketLight: "#6c7d55", shirt: "#cfc6b2", shirtShade: "#a39a86", pants: "#44403a", pantsShade: "#2e2b26" },
  hair: { base: "#17120f", dark: "#0c0908", light: "#3a2c22", style: "buzz" as const },
};

/* ─────────────── S1 · the hand-off on the sidewalk ─────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.05, 0.15, easeInOut(t)), y: 1.55, z: lerp(2.5, 1.95, easeInOut(t)), f: 1350, shiftY: 55, focus: 5, aperture: 0.6 };
  // Jesse arrives from camera-left at 527.3, hands over, then rocks back on his heels
  const arrive = clamp((g - B(526.6)) / (B(528.0) - B(526.6)));
  const jx = lerp(-2.6, -0.62, easeOut(arrive));
  const handoff = prog(g, B(528.0), B(528.5), easeInOut);
  const back = prog(g, B(528.6), B(529.0), easeInOut);
  const poseJ: Pose = walkPose(arrive < 1 ? g * 0.055 : 0, arrive < 1 ? 1 : 0, {
    torso: lerp(6, 2, arrive), neck: lerp(0, 4, arrive),
    shL: lerp(0, 34, handoff) - 10 * back, shR: lerp(0, 30, handoff) - 8 * back,
    elL: lerp(20, 62, handoff), elR: lerp(20, 58, handoff),
    breathe: 0.6,
  });
  const poseW: Pose = {
    torso: 3, neck: 4 - 4 * handoff,
    shL: -14 + 26 * handoff, shR: 26 + 14 * handoff,
    elL: 48, elR: 38 - 12 * handoff,
    hipL: 4, hipR: -4, knL: 4, knR: 5, breathe: 0.5,
  };
  const slip = prog(g, B(528.4), B(528.9), easeOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <pattern id="stchain" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={9} height={9} fill="none" stroke="#8a9297" strokeWidth={1.1} />
          </pattern>
        </defs>
        <StreetSky f={g} cam={cam} />
        <StreetRidge cam={cam} />
        <StreetGround cam={cam} f={g} />
        <House cam={cam} x={-11} z={17} w={11} h={3.1} seed={1} pal={["#e6d3b3", "#cbb28e", "#9b6b4f"]} />
        <House cam={cam} x={11.5} z={20} w={10} h={3.0} seed={2} pal={["#dcc7a2", "#bfa881", "#8a5f47"]} />
        <House cam={cam} x={-12} z={30} w={12} h={3.2} seed={4} pal={["#d8c4a2", "#b9a480", "#7d5b45"]} fence={false} />
        <Card cam={cam} x={7.2} z={9.0}><Coupe color="#5b3a2c" shade="#33201a" light="#8a6152" wheel={0} headlights={0} tail={0.2} /></Card>
        {/* near foreground layer: a mailbox on the verge, soft */}
        <Card cam={cam} x={5.6} z={4.6}>
          <rect x={-0.05} y={-1.05} width={0.1} height={1.05} fill="#6b5b48" />
          <path d="M-0.16,-1.05 L0.16,-1.05 L0.14,-1.28 L-0.14,-1.28 Z" fill="#8a949c" stroke="#2b2118" strokeWidth={0.012} />
          <rect x={0.16} y={-1.24} width={0.05} height={0.2} fill="#c25b4a" />
        </Card>
        {/* Walt waits, then takes the slip */}
        <Card cam={cam} x={0.42} y={0} z={5.6} flip>
          <ellipse cx={0.04} cy={0.008} rx={0.3} ry={0.06} fill="#6a4a2a" opacity={0.35} />
          <Figure pose={poseW} view={0.62} look={teacherLook({ yaw: 0.28, lids: 0.2 + blink(g, 3) * 0.5, lookX: -0.3, lookY: 0.1, brow: 0.1, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} rimLight="#fff6d8" rimSide={-1} />
        </Card>
        {/* Jesse arrives with the name */}
        <Card cam={cam} x={jx} y={0} z={5.2}>
          <ellipse cx={0.04} cy={0.008} rx={0.3} ry={0.06} fill="#6a4a2a" opacity={0.35} />
          <Figure pose={poseJ} view={0.75} look={partnerLook({
            yaw: 0.34, lids: 0.16 + blink(g, 5) * 0.5, lookX: 0.3, lookY: 0.06, brow: 0.2,
            mouth: arrive < 1 ? "open" : "smile", mouthOpen: 0.1 + 0.1 * Math.abs(Math.sin(g * 0.4)),
          })} pal={PAL_P} height={PARTNER.height} rimLight="#fff6d8" rimSide={1} outfit="hoodie" />
          {/* the folded slip passed hand to hand */}
          <g transform={`translate(${lerp(0.24, 0.4, slip)},${lerp(-0.9, -0.86, slip)}) rotate(${lerp(-20, 8, slip)})`} opacity={1 - Math.max(0, prog(g, B(529.0), B(530.0)))}>
            <rect x={-0.045} y={-0.03} width={0.09} height={0.06} fill="#f6f1e2" stroke="#8a8272" strokeWidth={0.003} transform="rotate(-6)" />
          </g>
        </Card>
        <Motes f={g} n={22} color="#fff6d8" seed={7} drift={0.8} />
      </svg>
      <Finish f={g} vig={0.6} grain={0.06} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────── S2 · insert: the name on the slip ─────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  // over-the-shoulder close-up on the slip in his fingers, street soft behind
  const cam: Cam = { x: lerp(-0.06, 0.0, easeInOut(t)), y: 1.5, z: lerp(2.2, 2.12, easeInOut(t)), f: 1900, shiftY: -210, focus: 0.55, aperture: 1.3 };
  const tremble = noise1(f * 0.18, 3) * 0.0035;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <pattern id="stchain" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={9} height={9} fill="none" stroke="#8a9297" strokeWidth={1.1} />
          </pattern>
        </defs>
        <StreetSky f={g} cam={cam} />
        <StreetRidge cam={cam} />
        <StreetGround cam={cam} f={g} />
        <House cam={cam} x={-11} z={17} w={11} h={3.1} seed={1} />
        <House cam={cam} x={11.5} z={20} w={10} h={3.0} seed={2} />
        {/* Walt's shoulder, soft, bottom-left */}
        <Card cam={cam} x={-1.35} y={0} z={3.15} blur={false}>
          <Figure pose={{ torso: 4, neck: 8, shL: 26, shR: 40, elL: 40, elR: 70, hipL: 3, hipR: -3, knL: 4, knR: 4, breathe: 0.5 }} view={0.85}
            look={teacherLook({ yaw: 0.35, lids: 0.2, lookX: 0.4, lookY: 0.4, brow: 0.1, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} />
        </Card>
        {/* the folded slip held up in Walt's articulated close-up hand (scribble + street-corner mark, zero readable name) */}
        <Card cam={cam} x={-0.04} y={1.43} z={2.75} blur={false}>
          <g transform={`translate(${tremble},0) rotate(-4)`}>
            {/* torn-edge notepad slip + fold crease */}
            <rect x={-0.068} y={-0.048} width={0.144} height={0.094} fill="#000" opacity={0.22} transform="translate(0.004,0.005)" />
            <rect x={-0.07} y={-0.05} width={0.144} height={0.094} fill="#f7f2e4" stroke="#8a8272" strokeWidth={0.0018} />
            <line x1={-0.068} y1={-0.022} x2={0.072} y2={-0.022} stroke="#cbd5dc" strokeWidth={0.001} />
            <line x1={-0.068} y1={0.004} x2={0.072} y2={0.004} stroke="#cbd5dc" strokeWidth={0.001} />
            <line x1={-0.068} y1={0.028} x2={0.072} y2={0.028} stroke="#cbd5dc" strokeWidth={0.001} />
            <path d="M-0.07,-0.003 L0.074,-0.006" stroke="#ddd4c0" strokeWidth={0.0016} />
            {/* ballpoint illegible cursive scribble for name + small street-corner cross sketch */}
            <path
              d="M-0.052,-0.014 c0.006,-0.014 0.014,0.004 0.02,-0.006 c0.005,-0.008 0.011,0.008 0.018,0 c0.006,-0.007 0.012,0.006 0.019,-0.002 M-0.006,-0.015 c0.007,-0.013 0.015,0.005 0.022,-0.005 c0.006,-0.008 0.013,0.007 0.02,-0.001 c0.006,-0.006 0.012,0.005 0.019,0"
              stroke="#24335c"
              strokeWidth={0.0028}
              fill="none"
              strokeLinecap="round"
            />
            <path d="M-0.052,-0.006 L0.054,-0.008" stroke="#24335c" strokeWidth={0.0016} opacity={0.75} strokeLinecap="round" />
            {/* second line: tiny street cross + shorthand scribble */}
            <path d="M-0.048,0.018 L-0.028,0.018 M-0.038,0.009 L-0.038,0.027" stroke="#24335c" strokeWidth={0.0018} strokeLinecap="round" />
            <circle cx={-0.033} cy={0.013} r={0.0025} fill="#24335c" />
            <path d="M-0.018,0.019 q0.008,-0.008 0.016,0 t0.016,0 t0.016,0" stroke="#24335c" strokeWidth={0.0022} fill="none" strokeLinecap="round" />

            {/* Articulated close-up left hand (4 fingers + thumb, wrist, shirt cuff, blue jacket sleeve) */}
            <g transform="translate(-0.088,0.052) rotate(36) scale(-0.46,0.46)">
              <HandBack
                pal={PAL_T}
                curl={0.62}
                thumb={0.78}
                sleeve={PAL_T.jacket}
                sleeveShade={PAL_T.jacketShade}
                cuff={PAL_T.shirt}
                forearm={0.85}
              />
            </g>
          </g>
        </Card>
        <Motes f={g} n={14} color="#fff6d8" seed={11} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.065} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ─────────────── S3 · he walks up and asks the first dangerous stranger ─────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  // truck right with him, from the block wall out to a wide at the end
  const cam: Cam = {
    x: lerp(-2.6, 0.2, easeInOut(t)), y: lerp(1.6, 1.55, easeInOut(t)), z: lerp(3.2, 4.1, easeInOut(t)),
    f: 1350, shiftY: 45, focus: 9, aperture: 0.5,
  };
  const wx = lerp(-5.4, -2.55, easeInOut(clamp(f / 160)));
  const walking = f < 162 ? 1 : 0;
  const ask = prog(g, B(536.85), B(537.75), easeInOut);
  const lookOver = prog(g, B(537.65), B(538.5), easeInOut);
  const nod = prog(g, B(538.3), B(539.05), easeOutBack);
  const stepAside = prog(g, B(539.1), B(540.3), easeInOut);
  const poseW: Pose = walking ? walkPose(f * 0.07, 1, {
    torso: 5, neck: -2, shL: -12, shR: 22,
    elL: 44, elR: 38, breathe: 0.5,
  }) : {
    torso: 4, neck: -3 + 4 * ask, shL: -14, shR: lerp(22, 36, ask),
    elL: 48, elR: lerp(42, 46, ask), hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.55,
  };
  // the three men: distinct active poses (thumbs in belt + thumb-jerk at door; crossed arms; leaning on wall)
  const poseA: Pose = {
    torso: lerp(-4, 4, lookOver), neck: lerp(-4, 4, lookOver) + 5 * nod,
    shL: lerp(-12, -16, nod), shR: lerp(22, 34, lookOver) - 18 * nod,
    elL: lerp(54, 62, nod), elR: lerp(48, 58, nod),
    hipL: 4, hipR: -5 - 5 * stepAside, knL: 4 + 7 * stepAside, knR: 5, breathe: 0.5,
  };
  const poseB: Pose = { // one thumb hooked in belt, other hand resting at collarbone
    torso: -5 + 5 * stepAside, neck: -4 + 6 * stepAside,
    shL: -12, shR: 16, elL: 54, elR: 72,
    hipL: 6, hipR: -5, knL: 7, knR: 4, breathe: 0.45,
  };
  const poseC: Pose = { // hands tucked in jacket pockets, leaning back against block wall
    torso: -9, neck: 5 + 5 * lookOver,
    shL: -16, shR: -14, elL: 52, elR: 48,
    hipL: 8, hipR: -3, knL: 10, knR: 4, breathe: 0.5,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <pattern id="stchain" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={9} height={9} fill="none" stroke="#8a9297" strokeWidth={1.1} />
          </pattern>
        </defs>
        <StreetSky f={g} cam={cam} />
        <StreetRidge cam={cam} />
        <StreetGround cam={cam} f={g} />
        {/* the address: a shabby house with a sagging porch, men on the wall in front */}
        <House cam={cam} x={1.4} z={16} w={9} h={3.0} seed={3} pal={["#d8c4a2", "#b9a480", "#7d5b45"]} />
        <House cam={cam} x={-13} z={19} w={11} h={3.1} seed={6} pal={["#e6d3b3", "#cbb28e", "#9b6b4f"]} />
        <Card cam={cam} x={4.2} z={11.5}><Coupe color="#4a2a26" shade="#2a1613" light="#7a4a44" wheel={18} headlights={0} tail={0.2} /></Card>
        <BlockWall cam={cam} x={-0.9} z={8.6} w={7.4} />
        {/* the men */}
        {/* ground contact shadows */}
        {[[-1.55, 8.1], [-0.45, 8.85], [0.95, 8.35], [wx, 7.6]].map(([sx2, sz], i) => (
          <polygon key={i} points={planePts(cam, Array.from({ length: 12 }).map((_, k) => { const a = (k / 12) * Math.PI * 2; return [sx2 + Math.cos(a) * 0.32, sz + Math.sin(a) * 0.14] as [number, number]; }), 0.012)} fill="#8a6a42" opacity={0.3} />
        ))}
        <Card cam={cam} x={-1.55} y={0} z={8.1} flip>
          <Figure pose={poseA} view={0.56} look={brotherLook({ yaw: 0.24, lids: 0.15 + blink(g, 9) * 0.5, lookX: 0.3, lookY: 0.06, brow: 0.3 + 0.4 * lookOver, mouth: nod > 0.3 ? "flat" : "neutral" })} pal={EXTRA_A.pal} height={EXTRA_A.height} rimLight="#fff6d8" rimSide={-1} />
        </Card>
        <Card cam={cam} x={-0.45} y={0} z={8.85} flip>
          <Figure pose={poseB} view={0.54} look={partnerLook({ yaw: 0.2, lids: 0.2 + blink(g, 6) * 0.5, lookX: 0.25, lookY: 0, brow: 0.2, mouth: "flat", hair: EXTRA_B.hair })} pal={EXTRA_B.pal} height={EXTRA_B.height} rimLight="#fff6d8" rimSide={-1} />
        </Card>
        <Card cam={cam} x={0.95} y={0} z={8.35} flip>
          <Figure pose={poseC} view={0.55} look={partnerLook({ yaw: 0.2, lids: 0.3 + blink(g, 4) * 0.5, lookX: 0.25, lookY: 0.08, brow: 0.1, mouth: "smile", hair: EXTRA_C.hair })} pal={EXTRA_C.pal} height={EXTRA_C.height} rimLight="#fff6d8" rimSide={-1} />
        </Card>
        {/* Walt walks up the sidewalk from left and stops facing the big stranger */}
        <Card cam={cam} x={wx} y={0} z={7.6}>
          <ellipse cx={0.04} cy={0.008} rx={0.3} ry={0.06} fill="#6a4a2a" opacity={0.32} />
          <Figure pose={poseW} view={0.62} look={teacherLook({
            yaw: 0.22, lids: 0.16 + blink(g, 3) * 0.5, lookX: 0.3, lookY: -0.04, brow: 0.1 + 0.2 * ask,
            mouth: "open", mouthOpen: 0.1 + 0.2 * Math.abs(Math.sin(g * 0.34)) * ask,
          })} pal={PAL_T} height={TEACHER.height} rimLight="#fff6d8" rimSide={1} />
        </Card>
        <DustDevil cam={cam} f={g} x={6.5} z={12} o={0.22} />
        {/* a dog trots across the far sidewalk — ambient life for the neighbourhood */}
        <Card cam={cam} x={lerp(-9, 7, clamp((f - 90) / 200))} y={0} z={6.9}>
          <ellipse cx={0} cy={0.01} rx={0.36} ry={0.05} fill="#6a4a2a" opacity={0.3} />
          <path d="M-0.3,-0.2 L0.26,-0.22 L0.3,-0.36 L-0.1,-0.38 Z" fill="#8a6a4a" stroke="#2b2118" strokeWidth={0.008} />
          <circle cx={0.34} cy={-0.42} r={0.1} fill="#8a6a4a" stroke="#2b2118" strokeWidth={0.008} />
          <path d="M0.3,-0.5 l0.03,-0.09 l0.05,0.09" fill="#6b4f36" />
          {[-0.24, -0.1, 0.14, 0.24].map((lx, i) => <path key={i} d={`M${lx},-0.2 L${lx + 0.03 * Math.sin(f * 0.3 + i)},0`} stroke="#8a6a4a" strokeWidth={0.03} />)}
          <path d="M-0.3,-0.3 q-0.1,-0.08 -0.14,-0.02" stroke="#8a6a4a" strokeWidth={0.03} fill="none" />
        </Card>
        <Motes f={g} n={26} color="#fff6d8" seed={13} drift={1.1} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the hand-off"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the name"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 is that Tuco"><S3 /></Sequence>
    <Sequence from={0} durationInFrames={CUTS.s2}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.03} /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.end - CUTS.s2}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.032} /></Sequence>
    <Sequence from={B(528.0)} durationInFrames={24}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
    <Sequence from={B(539.0)} durationInFrames={30}><Audio src={staticFile("sfx/b_thunk.wav")} volume={0.07} /></Sequence>
  </AbsoluteFill>
);
