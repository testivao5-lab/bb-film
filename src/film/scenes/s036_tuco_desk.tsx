// SCENE 036 · "tuco-desk" · set: garage · 542.29s → 557.11s (14.82s) · batch B
// Narration: "Inside: a desk, two men, one bag. Out comes one enormous crystal of blue on the blade of a
// knife, lifted to the light. Then the question. What does he want?" / "$50,000." / "Tuko laughs..."
// Staging: the distributor's front room. He sits behind a salvaged desk; Walt stands opposite with a bag.
// The big crystal comes out of a folding knife; the knife tip holds it up into the cage-lamp light.
// Cast: TEACHER (Walt) + an original distributor built from the rig (RESTAURATEUR palette, shaved head,
// narrow eyes, open shirt) — no likeness. Beats:
//   b(543.4) "a desk"            S1 wide: the desk, both men, the bag on the wood
//   b(544.1) "two men"           the distributor leans back, Walt's hands flat on the desk
//   b(545.0) "one bag"           insert: the gym bag's zip pulled open, bundles inside
//   b(546.8) "one enormous crystal" S3: the knife comes up out of the bag, crystal on the tip
//   b(550.2) "lifted to the light" the crystal turns in the lamp light, blue fire
//   b(553.1) "what does he want?" Walt says it; the distributor's eyes come off the crystal
//   b(555.0) "$50,000"           Walt: two fingers, flat
//   b(556.6) "Tuko laughs"       cut wide: the distributor's head goes back
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GT, GarageRoom, Desk, DeskKit, Chair } from "../../env/b_garage";
import { Crystal } from "../../props/b_props";
import { chairSit } from "../../props/b_pose";
import { SoftDefs, Glow, Puff } from "../../env/b_common";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 36, id: "tuco-desk", set: "garage", cutIn: 542.29, cutOut: 557.11 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(557.11);
const CUTS = { s1: 0, s2: B(544.9), s3: B(546.6), s4: B(552.9), s5: B(556.4), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffdca0", 0.06) : c));

/** the distributor: original design built on the rig (heavy, shaved head, open collar, gold chain) */
const DIST = {
  height: 1.84,
  pal: {
    skin: "#c08a63", skinShade: "#96633f", skinLight: "#d9a67c",
    jacket: "#3f3a36", jacketShade: "#2a2622", jacketLight: "#5c554e",
    shirt: "#e8e0cb", shirtShade: "#bdb39a",
    pants: "#33302c", pantsShade: "#221f1c",
    shoes: "#1c1917", outline: "#120f0c",
  },
  hair: { base: "#141210", dark: "#0a0908", light: "#2a2522", style: "buzz" as const },
};
const distLook = (o: any = {}) => restaurateurLook({ hair: DIST.hair, beard: "mustache", age: 0.5, lips: "#8a5a48", ...o });

/* ─────────── S1 · wide: desk, two men, one bag ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.85, -0.68, easeInOut(t)), y: lerp(1.58, 1.5, easeInOut(t)), z: lerp(0.5, 0.75, easeInOut(t)), f: 1300, shiftY: 45, focus: 3.6, aperture: 0.5 };
  const lean = prog(g, B(544.1), B(545.4), easeInOut);
  const handsFlat = prog(g, B(544.4), B(545.2), easeInOut);
  const poseD: Pose = chairSit({ torso: lerp(-4, -12, lean), neck: lerp(0, 8, lean), shL: lerp(20, 30, lean), shR: lerp(6, 12, lean), elL: lerp(46, 60, lean), elR: lerp(30, 24, lean), breathe: 0.6 });
  const poseW: Pose = {
    torso: 5, neck: -4, shL: lerp(6, 22, handsFlat), shR: lerp(6, 20, handsFlat),
    elL: lerp(14, 52, handsFlat), elR: lerp(14, 48, handsFlat),
    hipL: 6, hipR: -6, knL: 5, knR: 6, breathe: 0.6, slump: 0.25,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="puffA"><stop offset="0" stopColor="#ffe0a0" stopOpacity={0.5} /><stop offset="1" stopColor="#ffe0a0" stopOpacity={0} /></radialGradient>
        </defs>
        <GarageRoom cam={cam} f={g} />
        {/* seated man and his chair, behind the desk — the desk is drawn later so it occludes his legs */}
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={poseD} view={0.42} look={distLook({ yaw: 0.08, lids: 0.34 + blink(g, 7) * 0.4, lookX: -0.25, lookY: -0.1, brow: 0.25, mouth: "flat" })} pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        {/* the bag, dumped on the desk */}
        <Card cam={cam} x={0.72} y={0.78} z={3.42}>
          <ellipse cx={0} cy={0.012} rx={0.24} ry={0.06} fill="#000" opacity={0.3} />
          <path d="M-0.2,0 L-0.17,-0.14 Q0,-0.19 0.17,-0.14 L0.2,0 Z" fill="#3f4a56" stroke="#191d21" strokeWidth={0.008} />
          <path d="M-0.17,-0.14 Q0,-0.2 0.17,-0.14" stroke="#5e6b78" strokeWidth={0.012} fill="none" />
          <path d="M-0.06,-0.16 L0.06,-0.16" stroke="#20262c" strokeWidth={0.02} />
        </Card>
        <Card cam={cam} x={-1.5} y={0} z={2.62} flip>
          <Figure pose={poseW} view={0.5} look={teacherLook({ yaw: 0.18, lids: 0.18 + blink(g, 3) * 0.5, lookX: 0.3, lookY: 0.2, brow: 0.05, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={20} color="#ffe9c0" seed={5} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · insert: the bag opens, the bundles ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.68, 0.72, easeInOut(t)), y: 1.18, z: lerp(2.7, 2.58, easeInOut(t)), f: 1750, shiftY: -300, focus: 1.2, aperture: 1.0 };
  const open = prog(g, B(545.0), B(545.8), easeOut);
  const reach = prog(g, B(546.0), B(546.6), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        <Card cam={cam} x={0.74} y={0.78} z={3.44}>
          <ellipse cx={0.02} cy={0.02} rx={0.26} ry={0.05} fill="#000" opacity={0.28} />
          {/* bag body, rumpled */}
          <path d="M-0.24,0.01 L-0.21,-0.1 C-0.2,-0.16 -0.13,-0.19 0,-0.2 C0.13,-0.19 0.2,-0.16 0.21,-0.1 L0.24,0.01 Z" fill="#3d4753" stroke="#171b1f" strokeWidth={0.006} />
          <path d="M-0.16,-0.14 C-0.1,-0.1 -0.02,-0.16 0.04,-0.11 C0.09,-0.07 0.15,-0.13 0.19,-0.09" stroke="#4e5b68" strokeWidth={0.006} fill="none" opacity={0.8} />
          {/* the mouth: an ellipse opening on the top face, widening as the zip goes */}
          <ellipse cx={0} cy={-0.16} rx={lerp(0.07, 0.15, open)} ry={lerp(0.018, 0.04, open)} fill="#0d1114" />
          <path d={`M${-lerp(0.07, 0.15, open)},-0.16 A${lerp(0.07, 0.15, open)},${lerp(0.018, 0.04, open)} 0 0 0 ${lerp(0.07, 0.15, open)},-0.16`} stroke="#5b6673" strokeWidth={0.006} fill="none" />
          {/* banded bundles standing up out of the mouth */}
          {[-0.062, 0.0, 0.06].map((bx, i) => (
            <g key={i} transform={`translate(${bx + 0.006 * i},${-0.15 - 0.006 * (1 - open) + i * 0.004}) rotate(${-9 + i * 8})`} opacity={0.35 + 0.65 * open}>
              <rect x={-0.042} y={-0.046} width={0.084} height={0.05} fill={i === 1 ? "#cfd9c0" : "#d9d3ad"} stroke="#5b5741" strokeWidth={0.0026} />
              <rect x={-0.011} y={-0.047} width={0.022} height={0.052} fill={i === 1 ? "#5d7a50" : "#8b7b4a"} />
              <path d="M-0.038,-0.03 L0.038,-0.031" stroke="#b8b28c" strokeWidth={0.002} />
            </g>
          ))}
          {/* his hand, tipping the mouth open */}
          <g transform={`translate(${lerp(0.26, 0.13, reach)},${lerp(-0.03, -0.19, reach)})`} opacity={0.35 + 0.65 * reach}>
            <path d="M-0.012,0.012 C-0.05,0.006 -0.06,-0.02 -0.05,-0.04 C-0.03,-0.055 0.0,-0.05 0.012,-0.03 Z" fill="#c08a63" stroke="#7a5335" strokeWidth={0.003} />
            {[-0.042, -0.024, -0.006, 0.012].map((fx, i) => <path key={i} d={`M${fx},-0.026 L${fx - 0.002},-0.004`} stroke="#c08a63" strokeWidth={0.013} strokeLinecap="round" />)}
            <path d="M0.02,-0.03 L0.08,-0.045" stroke="#c08a63" strokeWidth={0.036} strokeLinecap="round" />
            <path d="M0.06,-0.04 L0.1,-0.05" stroke="#2e2a25" strokeWidth={0.038} strokeLinecap="round" />
          </g>
        </Card>
        <Motes f={g} n={16} color="#ffe9c0" seed={9} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · the knife, the crystal, the light ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  // slow push as the blade rises and turns
  const cam: Cam = { x: lerp(0.28, 0.34, easeInOut(t)), y: lerp(1.24, 1.32, easeInOut(t)), z: lerp(1.05, 0.92, easeInOut(t)), f: 1800, shiftY: lerp(-20, 60, easeInOut(t)), focus: 1.6, aperture: 0.8 };
  const lift = prog(g, B(546.7), B(549.3), easeInOut);
  const turn = prog(g, B(549.2), B(551.4), easeInOut);
  const glint = 0.6 + 0.4 * Math.sin(f * 0.22);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="bladeGlow"><stop offset="0" stopColor="#bff2ff" stopOpacity={0.75} /><stop offset="1" stopColor="#4fb8de" stopOpacity={0} /></radialGradient>
        </defs>
        <GarageRoom cam={cam} f={g} />
        {/* the distributor's big hand and the folding knife. Everything in one card so the grip is true. */}
        <Card cam={cam} x={0.42} y={lerp(0.82, 1.24, lift)} z={2.55}>
          <g transform={`rotate(${lerp(-16, 6, turn)})`}>
            {/* sleeve + bare forearm coming up out of the bottom of frame */}
            <path d="M0.03,0.6 C0.02,0.44 0.01,0.3 -0.005,0.2" stroke="#2e2a25" strokeWidth={0.19} strokeLinecap="round" fill="none" />
            <path d="M0.03,0.6 C0.02,0.44 0.01,0.3 -0.005,0.2" stroke="#4a443c" strokeWidth={0.05} strokeLinecap="round" fill="none" opacity={0.5} />
            <path d="M-0.002,0.235 C-0.004,0.2 -0.002,0.16 0.0,0.135" stroke="#c08a63" strokeWidth={0.115} strokeLinecap="round" fill="none" />
            <path d="M-0.04,0.2 C-0.034,0.175 -0.028,0.155 -0.024,0.14" stroke="#96633f" strokeWidth={0.025} strokeLinecap="round" fill="none" opacity={0.4} />
            {/* fist: knuckles in front of the handle, thumb along the side */}
            <path d="M-0.052,0.135 C-0.058,0.1 -0.052,0.06 -0.04,0.035 L0.04,0.035 C0.052,0.06 0.058,0.1 0.052,0.135 Z" fill="#c08a63" stroke="#7a5335" strokeWidth={0.005} />
            {[-0.036, -0.013, 0.011, 0.034].map((o, i) => <path key={i} d={`M${o},0.05 L${o},0.088`} stroke="#a97350" strokeWidth={0.012} strokeLinecap="round" />)}
            <path d="M-0.05,0.07 C-0.058,0.09 -0.058,0.115 -0.05,0.135" stroke="#c08a63" strokeWidth={0.024} strokeLinecap="round" fill="none" />
            <path d="M0.046,0.06 C0.056,0.082 0.056,0.11 0.048,0.13" stroke="#c08a63" strokeWidth={0.02} strokeLinecap="round" fill="none" />
            {/* the knife: handle in the fist, blade up past the fist */}
            <g>
              <rect x={-0.014} y={0.005} width={0.028} height={0.075} rx={0.006} fill="#4a4a4e" stroke="#191919" strokeWidth={0.004} transform="rotate(-6)" />
              <path d="M-0.012,-0.018 L0.012,-0.018 L0.009,-0.33 L0,-0.348 L-0.01,-0.31 Z" fill="#cdd6dc" stroke="#47515a" strokeWidth={0.0035} />
              <path d="M-0.01,-0.31 L0.006,-0.02" stroke="#f4fbff" strokeWidth={0.005} opacity={0.8} />
              <path d="M-0.012,-0.02 L-0.008,-0.3" stroke="#8f9aa2" strokeWidth={0.003} opacity={0.7} />
              <path d="M-0.004,-0.24 L0.007,-0.245" stroke="#6f7a82" strokeWidth={0.003} />
            </g>
            {/* the crystal, skewered on the tip */}
            <g transform="translate(0.002,-0.352) scale(3.3)">
              <Crystal hue="#63d6f5" />
            </g>

            <circle cx={0} cy={-0.4} r={0.22} fill="url(#bladeGlow)" opacity={0.55 + 0.25 * glint} />
          </g>
        </Card>
        {/* Walt behind, out of focus, watching the crystal */}
        <Card cam={cam} x={-1.15} y={0} z={4.3} flip>
          <Figure pose={{ torso: 4, neck: -6, shL: 8, shR: 6, elL: 16, elR: 14, hipL: 4, hipR: -4, knL: 5, knR: 5, breathe: 0.5, slump: 0.2 }}
            view={0.6} look={teacherLook({ yaw: 0.12, lids: 0.12, lookX: 0.45, lookY: 0.55, brow: 0.15, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={22} color="#cfeeff" seed={3} drift={0.7} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#101a20" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "what does he want?" — the answer ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.92, -0.86, easeInOut(t)), y: 1.45, z: lerp(0.62, 0.55, easeInOut(t)), f: 900, shiftY: 25, focus: 3.2, aperture: 0.6 };
  const ask = prog(g, B(553.1), B(553.9), easeInOut);
  const ans = prog(g, B(554.9), B(555.6), easeInOut);
  const poseW: Pose = {
    torso: 4, neck: -2 + 4 * ask, shL: 5, shR: lerp(4, 30, ans),
    elL: 16, elR: lerp(14, 58, ans), hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.55, slump: 0.2,
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={0.34} y={0} z={4.4}>
          <Figure pose={chairSit({ torso: -10, neck: 6, shL: 30, shR: 14, elL: 58, elR: 26, breathe: 0.6 })}
            view={0.3} look={distLook({ yaw: -0.12, lids: 0.3 + blink(g, 9) * 0.4, lookX: -0.45, lookY: 0.1, brow: 0.35, mouth: ans > 0.4 ? "flat" : "neutral" })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        {/* Walt, medium: the question, then the number on two fingers */}
        <Card cam={cam} x={-1.22} y={0} z={3.0} flip>
          <Figure pose={poseW} view={0.55} look={teacherLook({
            yaw: 0.16, lids: 0.2 + blink(g, 4) * 0.4, lookX: 0.4, lookY: 0.1, brow: 0.1 + 0.2 * ask,
            mouth: ans > 0.4 ? "flat" : "open", mouthOpen: 0.06 + 0.16 * Math.abs(Math.sin(g * 0.5)) * ask * (1 - ans),
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={18} color="#ffe9c0" seed={12} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · wide: the laugh ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.62, -0.46, easeInOut(t)), y: 1.5, z: lerp(0.9, 1.0, easeInOut(t)), f: 1450, shiftY: 45, focus: 3.2, aperture: 0.5 };
  const laugh = clamp((f - 12) / 30);
  const poseD: Pose = chairSit({
    torso: lerp(-6, -22, laugh), neck: lerp(4, -16, laugh),
    shL: lerp(28, 12, laugh), shR: lerp(14, 40, laugh), elL: lerp(56, 74, laugh), elR: lerp(24, 62, laugh),
    breathe: 0.6 + 0.4 * Math.sin(f * 0.5),
  });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={poseD} view={0.4} look={distLook({
            yaw: 0.1, lids: lerp(0.36, 0.02, laugh), lookX: 0, lookY: 0.1, brow: 0.3,
            mouth: "laugh", mouthOpen: 0.5 + 0.5 * Math.abs(Math.sin(f * 0.55)),
          })} pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        <Card cam={cam} x={-1.28} y={0} z={2.55} flip>
          <Figure pose={{ torso: 5, neck: -2, shL: 6, shR: 5, elL: 15, elR: 14, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5, slump: 0.25 }}
            view={0.5} look={teacherLook({ yaw: 0.16, lids: 0.24, lookX: 0.2, lookY: 0, brow: 0.1, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={20} color="#ffe9c0" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 desk two men bag"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the bag"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 crystal on the blade"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 fifty thousand"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 the laugh"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(545.0)} durationInFrames={26}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.09} /></Sequence>
    <Sequence from={B(549.2)} durationInFrames={36}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.06} /></Sequence>
  </AbsoluteFill>
);
