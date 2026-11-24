// SCENE 037 · "itemised" · set: garage · 557.11s → 577.07s (19.96s) · batch B
// Narration: "Tuko laughs. It's a good joke. It is not a joke, and the reason is the itemisation.
//   '$35 for the pound you stole, $15 for my partner's pain and suffering.' That sentence does two jobs;
//   it tells a man with a knife how the debt was calculated, and it says that the man opposite him is the
//   sort who calculates debts."
// Staging: the laugh dies in four shots. Walt does not raise his voice — he opens a folded sheet on the
// desk and writes two lines on it, then taps each one. The distributor's knife stays on the table, tapping.
// Beats:
//   b(557.1) "Tuko laughs"              S1 close on the distributor, mouth open, laughing
//   b(559.1) "It is not a joke"         his laugh stops; Walt's flat face in a two-shot
//   b(560.6) "the itemisation"          S3 insert: Walt's pen lays down the first line
//   b(562.4) "$35 for the pound"        the pen underlines the first figure, finger taps it
//   b(564.3) "$15 for my partner's"     second line written under the first
//   b(567.5) "two jobs"                 S4: the knife on the desk, tip tapping — the distributor reading it
//   b(569.5) "how the debt was calculated" his eyes go down the numbers, then up at Walt
//   b(572.7) "the sort who calculates debts" S5 wide: the knife laid flat, pointed away from Walt
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GT, GarageRoom, Desk, DeskKit, Chair } from "../../env/b_garage";
import { SoftDefs } from "../../env/b_common";
import { chairSit } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 37, id: "itemised", set: "garage", cutIn: 557.11, cutOut: 577.07 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(577.07);
const CUTS = { s1: 0, s2: B(559.0), s3: B(561.9), s4: B(567.3), s5: B(572.6), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffdca0", 0.06) : c));

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
const distLook = (o: any = {}) => restaurateurLook({ hair: DIST.hair, beard: "mustache", age: 0.5, ...o });
/** seated behind the desk: thighs down-forward but knees folded so the shins hide behind the desk apron */
const deskSit = (o: Partial<Pose> = {}) => chairSit({ hipL: 62, hipR: 64, knL: 96, knR: 98, ...o });

/** the folded sheet with two written lines; lines appear with progress a (0..1) and c (0..1) */
const Sheet: React.FC<{ a: number; c: number; tap: number; underline: number }> = ({ a, c, tap, underline }) => (
  <g transform="rotate(-3)">
    {/* creases from being folded twice */}
    <rect x={-0.15} y={-0.1} width={0.3} height={0.2} fill="#f4efe0" stroke="#a9a294" strokeWidth={0.0016} />
    <path d="M-0.15,-0.032 L0.15,-0.034" stroke="#ddd6c4" strokeWidth={0.0015} />
    <path d="M-0.15,0.036 L0.15,0.034" stroke="#ddd6c4" strokeWidth={0.0015} />
    <path d="M0.0,-0.1 L0.0,0.1" stroke="#e6dfcd" strokeWidth={0.0012} opacity={0.7} />
    {/* line 1: 35 */}
    <g opacity={a}>
      <path d={`M-0.12,-0.058 L${lerp(-0.12, 0.05, a)},-0.06`} stroke="#2b2a3c" strokeWidth={0.0035} strokeLinecap="round" />
      <g transform="translate(0.075,-0.052) scale(0.00115)" fill="#2b2a3c" fontFamily="DejaVu Sans, Arial" fontSize={20}>35</g>
      <g transform="translate(-0.128,-0.05) scale(0.0008)" fill="#5a586c" fontFamily="DejaVu Sans, Arial" fontSize={12}>POUND</g>
      <path d={`M-0.13,${-0.028 + 0.004 * underline} L${lerp(-0.13, 0.09, underline)},${-0.028 + 0.004 * underline}`} stroke="#2b2a3c" strokeWidth={0.0018} opacity={0.8} />
    </g>
    {/* line 2: 15 */}
    <g opacity={c}>
      <path d={`M-0.12,0.004 L${lerp(-0.12, 0.02, c)},0.002`} stroke="#2b2a3c" strokeWidth={0.0035} strokeLinecap="round" />
      <g transform="translate(0.048,0.014) scale(0.00115)" fill="#2b2a3c" fontFamily="DejaVu Sans, Arial" fontSize={20}>15</g>
      <g transform="translate(-0.128,0.016) scale(0.0008)" fill="#5a586c" fontFamily="DejaVu Sans, Arial" fontSize={12}>P&amp;S</g>
      <path d={`M-0.13,0.032 L${lerp(-0.13, 0.06, Math.max(0, c * 1.4 - 0.4))},0.032`} stroke="#2b2a3c" strokeWidth={0.0016} opacity={0.7} />
    </g>
    {/* a total, circled */}
    <g opacity={Math.max(0, c * 1.5 - 0.5)} transform="translate(0.09,0.066)">
      <g transform="scale(0.00115)" fill="#1d2a52" fontFamily="DejaVu Sans, Arial" fontSize={22}>50</g>
      <ellipse cx={0.012} cy={-0.008} rx={0.036} ry={0.016} fill="none" stroke="#1d2a52" strokeWidth={0.0022} transform="rotate(-6)" />
    </g>
    {/* his fingertip, tapping the second line */}
    <g transform={`translate(${0.0 + 0.004 * Math.sin(tap * 6)},${0.036 - 0.008 * Math.max(0, Math.sin(tap * 6))})`} opacity={Math.min(1, tap * 3)}>
      <path d="M-0.014,0.006 C-0.016,-0.006 -0.008,-0.014 0.002,-0.014 C0.012,-0.012 0.016,-0.004 0.014,0.006 Z" fill="#e0ab86" stroke="#a97350" strokeWidth={0.0014} />
      <path d="M0.0,0.008 L0.006,0.05" stroke="#e0ab86" strokeWidth={0.02} strokeLinecap="round" />
      <path d="M0.006,0.05 L0.012,0.09" stroke="#33435a" strokeWidth={0.024} strokeLinecap="round" />
    </g>
  </g>
);

/** the folding knife, lying on the desk with the blade open, tip tapping the wood */
const DeskKnife: React.FC<{ tap: number; open?: number; rot?: number }> = ({ tap, open = 1, rot = -8 }) => (
  <g transform={`rotate(${rot})`}>
    <ellipse cx={0} cy={0.008} rx={0.1} ry={0.014} fill="#000" opacity={0.25} />
    <rect x={-0.075} y={-0.008} width={0.1} height={0.026} rx={0.008} fill="#4a4a4e" stroke="#191919" strokeWidth={0.003} />
    <g transform={`rotate(${lerp(-96, 0, open)})`} style={{ transformOrigin: "0.025px 0.005px" }}>
      <path d="M0.02,-0.002 L0.19,-0.014 L0.2,-0.006 L0.02,0.006 Z" fill="#cdd6dc" stroke="#47515a" strokeWidth={0.0025} />
      <path d="M0.03,-0.003 L0.19,-0.012" stroke="#f4fbff" strokeWidth={0.002} opacity={0.8} />
    </g>
    <ellipse cx={0.025 + 0.2 * open} cy={-0.01 - 0.008 * Math.abs(Math.sin(tap * 7)) * open} rx={0.012} ry={0.005} fill="#000" opacity={0.2 * open} />
  </g>
);

/* ─────────── S1 · the laugh ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.4, 0.34, easeInOut(t)), y: 1.36, z: lerp(1.75, 1.62, easeInOut(t)), f: 1700, shiftY: 60, focus: 2.6, aperture: 0.9 };
  const stop = prog(g, B(558.6), B(559.0), easeIn);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({
            torso: lerp(-14, -4, stop), neck: lerp(-14, 4, stop),
            shL: lerp(34, 30, stop), shR: lerp(30, 22, stop), elL: lerp(64, 58, stop), elR: lerp(58, 34, stop),
            breathe: 0.5 + 0.4 * Math.sin(f * 0.5) * (1 - stop),
          })} view={0.24} look={distLook({
            yaw: 0.08, lids: lerp(0.02, 0.3, stop), lookX: lerp(0, -0.2, stop), lookY: 0.06, brow: lerp(0.3, 0.45, stop),
            mouth: stop > 0.6 ? "flat" : "laugh", mouthOpen: (0.5 + 0.5 * Math.abs(Math.sin(f * 0.55))) * (1 - stop),
          })} pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        <Motes f={g} n={18} color="#ffe9c0" seed={4} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "it is not a joke" ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-1.1, -1.02, easeInOut(t)), y: 1.44, z: lerp(0.75, 0.68, easeInOut(t)), f: 1100, shiftY: 55, focus: 3.4, aperture: 0.6 };
  const say = prog(g, B(560.0), B(561.0), easeInOut);
  const unfold = prog(g, B(560.6), B(561.9), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({ torso: -4, neck: 4, shL: 26, shR: 18, elL: 56, elR: 30, breathe: 0.5 })}
            view={0.26} look={distLook({ yaw: 0.1, lids: 0.34, lookX: -0.3, lookY: 0.1, brow: 0.5, mouth: "flat" })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        {/* Walt, medium — the flat correction. The sheet comes out of his inside pocket. */}
        <Card cam={cam} x={-1.86} y={0} z={2.62} flip>
          <Figure pose={{
            torso: 4, neck: -3, shL: 5, shR: lerp(5, 34, unfold),
            elL: 16, elR: lerp(14, 66, unfold), hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5, slump: 0.18,
          }} view={0.52} look={teacherLook({
            yaw: 0.14, lids: 0.16, lookX: 0.3, lookY: 0.05, brow: 0.05,
            mouth: say > 0.2 ? "flat" : "neutral",
          })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={18} color="#ffe9c0" seed={8} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · the sheet, two lines ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.6, -0.57, easeInOut(t)), y: lerp(1.1, 1.14, easeInOut(t)), z: lerp(1.95, 1.88, easeInOut(t)), f: 2000, shiftY: -300, focus: 1.15, aperture: 1.0 };
  const a = clamp((g - B(561.9)) / (B(562.6) - B(561.9)));
  const c = clamp((g - B(564.3)) / (B(565.2) - B(564.3)));
  const underline = clamp((g - B(563.4)) / (B(563.9) - B(563.4)));
  const tap = clamp((g - B(565.9)) / 20);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        {/* the sheet, on the desk edge nearest Walt */}
        <Card cam={cam} x={-0.46} y={0.785} z={3.12}>
          <Sheet a={a} c={c} tap={tap} underline={underline} />
        </Card>
        {/* a pencil rolling beside it, out of focus — fine clutter */}
        <Card cam={cam} x={0.04} y={0.785} z={3.06}>
          <g transform="rotate(-14)">
            <rect x={-0.09} y={-0.005} width={0.18} height={0.01} fill="#c8a24a" stroke="#8a6a2a" strokeWidth={0.0015} />
            <path d="M0.09,-0.005 L0.105,0 L0.09,0.005 Z" fill="#e8d9b0" />
          </g>
        </Card>
        {/* knife, waiting, at the far edge */}
        <Card cam={cam} x={0.5} y={0.785} z={3.2}>
          <DeskKnife tap={0.2} open={1} rot={-14} />
        </Card>
        <Motes f={g} n={14} color="#ffe9c0" seed={2} drift={0.4} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#1a1208" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · the knife taps; his eyes come up ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = { x: lerp(0.22, 0.16, easeInOut(t)), y: lerp(1.42, 1.5, easeInOut(t)), z: lerp(2.3, 2.22, easeInOut(t)), f: 1600, shiftY: 95, focus: 2.0, aperture: 1.0 };
  const reads = prog(g, B(569.5), B(571.2), easeInOut);
  const up = prog(g, B(571.2), B(572.4), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={0.34} z={4.4} />
        <Card cam={cam} x={0.34} y={0} z={4.4}>
          <Figure pose={deskSit({ torso: lerp(-4, 5, up), neck: lerp(6, -6, up), shL: 8, shR: 6, elL: 20, elR: 18, breathe: 0.55 })}
            view={0.46} look={distLook({
              yaw: lerp(0.12, -0.04, up), lids: 0.32, lookX: lerp(0.1, -0.2, up), lookY: lerp(-0.55, 0.15, reads),
              brow: lerp(0.5, 0.2, up), mouth: "flat",
            })} pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        {/* his hand flat on the desk beside the knife */}
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <Card cam={cam} x={0.74} y={0.79} z={3.16}>
          <DeskKnife tap={f * 0.08} open={1} rot={-10} />
        </Card>
        <Card cam={cam} x={0.12} y={0.79} z={3.06}>
          <ellipse cx={0.02} cy={0.02} rx={0.13} ry={0.03} fill="#000" opacity={0.2} />
          <path d="M-0.11,0.0 C-0.13,-0.03 -0.08,-0.055 0.0,-0.05 C0.06,-0.045 0.1,-0.02 0.1,0.01 Z" fill="#c08a63" stroke="#7a5335" strokeWidth={0.003} />
          {[-0.055, -0.028, 0.0, 0.028].map((o, i) => <path key={i} d={`M${o},-0.038 L${o + 0.003},-0.012`} stroke="#a97350" strokeWidth={0.0075} strokeLinecap="round" opacity={0.65} />)}
          <path d="M-0.11,0.0 L-0.2,0.009" stroke="#2e2a25" strokeWidth={0.055} strokeLinecap="round" />
        </Card>
        <Motes f={g} n={16} color="#ffe9c0" seed={7} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · wide: the knife laid flat ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.42, -0.3, easeInOut(t)), y: lerp(1.44, 1.52, easeInOut(t)), z: lerp(0.5, 0.72, easeInOut(t)), f: 1000, shiftY: 30, focus: 4, aperture: 0.5 };
  const flat = prog(g, B(573.4), B(575.0), easeOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({ torso: -2, neck: 2, shL: 20 + 14 * flat, shR: 30 + 10 * flat, elL: 46, elR: lerp(26, 70, flat), breathe: 0.5 })}
            view={0.34} look={distLook({ yaw: 0.06, lids: 0.36, lookX: -0.2, lookY: 0.05, brow: 0.25, mouth: "flat" })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        {/* the knife, pushed to the far corner, blade pointing at the wall */}
        <Card cam={cam} x={1.0} y={0.785} z={3.86}>
          <g transform={`translate(${0.06 * flat},${-0.02 * flat}) rotate(${lerp(-10, 34, flat)})`}>
            <DeskKnife tap={0} open={1} rot={0} />
          </g>
        </Card>
        <Card cam={cam} x={-1.32} y={0} z={2.55} flip>
          <Figure pose={{ torso: 4, neck: -2, shL: 5, shR: 4, elL: 15, elR: 14, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5, slump: 0.16 }}
            view={0.5} look={teacherLook({ yaw: 0.16, lids: 0.2, lookX: 0.25, lookY: 0.05, brow: 0.05, mouth: "flat" })} pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={18} color="#ffe9c0" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the laugh"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 not a joke"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 the sheet"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 the knife reads"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 laid flat"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(561.9)} durationInFrames={30}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
    <Sequence from={B(563.4)} durationInFrames={24}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.06} /></Sequence>
    <Sequence from={B(568.6)} durationInFrames={90}><Audio src={staticFile("sfx/b_thunk.wav")} volume={0.045} /></Sequence>
  </AbsoluteFill>
);
