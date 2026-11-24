// SCENE 036 · "tuco-desk" · set: garage · 542.29s → 557.11s (14.82s) · batch B (rev2)
// Narration: "Inside: a desk, two men, one bag. Out comes one enormous crystal of blue on the blade of a
// knife, lifted to the light. Then the question. What does he want?" / "$50,000." / "Tuko laughs..."
// Staging (rev2 per LEAD_NOTES round 2):
//   S1 (542.29–544.85) Medium-wide establishing with 3 depth layers: Walt steps up from left facing the
//                      salvaged desk and slides the canvas bag forward; distributor behind the desk leans
//                      forward onto his forearms toward Walt under the cage lamp & dusty window shafts.
//   S2 (544.85–546.60) Desk insert ("one bag"): articulated close-up hand holds open the unzipped canvas
//                      bag packed with faceted blue crystal shards; distributor's knife hand dips in.
//   S3 (546.60–552.90) Close-up two-plane shot: jacketed forearm, wrist, 4-finger+thumb fist gripping a
//                      folding lockback knife, lifting a sharp multi-faceted blue crystal prism into the
//                      cage-lamp beam; Walt watches actively behind, leaning onto the desk edge.
//   S4 (552.90–556.35) Tight medium over-desk two-shot: distributor gestures toward Walt asking what he
//                      wants; Walt states "$50,000" with a calm, firm right-hand gesture toward him.
//   S5 (556.35–557.11) Reaction two-shot: distributor throws his head back laughing, slapping the desk;
//                      Walt stands framed cleanly on the left with hand on desk and off-hand at pocket.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeOut, easeInOut, clamp, lerp, blink, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GarageRoom, GarageFore, Desk, DeskKit, Chair } from "../../env/b_garage";
import { Crystal } from "../../props/b_props";
import { chairSit } from "../../props/b_pose";
import { SoftDefs } from "../../env/b_common";
import { Finish, Motes, Streak } from "../../fx/Post";

export const META = { n: 36, id: "tuco-desk", set: "garage", cutIn: 542.29, cutOut: 557.11 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(557.11);
const CUTS = { s1: 0, s2: B(544.85), s3: B(546.6), s4: B(552.9), s5: B(556.35), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffdca0", 0.06) : c));

/** Original distributor built on the rig (heavy build, buzzed hair, open collar, mustache) */
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
const deskSit = (o: Partial<Pose> = {}) => chairSit({ hipL: 62, hipR: 64, knL: 96, knR: 98, ...o });

/** Canvas duffel bag on the desk (closed or unzipped) */
const DuffelBag: React.FC<{ open?: number }> = ({ open = 0 }) => (
  <g>
    <ellipse cx={0} cy={0.014} rx={0.25} ry={0.055} fill="#000" opacity={0.34} />
    <path d="M-0.22,0.008 L-0.19,-0.13 C-0.16,-0.185 0.16,-0.185 0.19,-0.13 L0.22,0.008 Z" fill="#3b4652" stroke="#161b20" strokeWidth={0.007} />
    <path d="M-0.18,-0.04 L0.18,-0.04" stroke="#2a333c" strokeWidth={0.009} opacity={0.7} />
    <path d="M-0.09,0.006 L-0.08,-0.165 M0.09,0.006 L0.08,-0.165" stroke="#252c33" strokeWidth={0.022} />
    <path d="M-0.08,-0.165 Q0,-0.225 0.08,-0.165" stroke="#252c33" strokeWidth={0.018} fill="none" />
    {open > 0.02 ? (
      <>
        <ellipse cx={0} cy={-0.155} rx={0.13 * open} ry={0.028 * open} fill="#0f1419" />
        <ellipse cx={0} cy={-0.15} rx={0.08 * open} ry={0.014 * open} fill="#4dc6e8" opacity={0.65 * open} />
      </>
    ) : (
      <path d="M-0.14,-0.155 L0.14,-0.155" stroke="#8d969e" strokeWidth={0.006} strokeDasharray="0.012 0.008" />
    )}
  </g>
);

/* ─────────── S1 · establishing: a desk, two men, one bag ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.52, -0.38, easeInOut(t)),
    y: lerp(1.48, 1.43, easeInOut(t)),
    z: lerp(0.68, 0.94, easeInOut(t)),
    f: 1360, shiftY: 38, focus: 3.2, aperture: 0.35,
  };
  const stepIn = prog(g, 0, B(543.5), easeOut);
  const pushBag = prog(g, B(543.6), B(544.6), easeInOut);
  const leanD = prog(g, B(543.8), B(544.8), easeInOut);

  // Distributor (view=0.55 > 0.5 + flip so both arms reach LEFT onto the desk toward Walt!)
  const poseD: Pose = deskSit({
    torso: lerp(-8, 10, leanD),
    neck: lerp(4, -5, leanD),
    shL: lerp(-10, 26, leanD),
    shR: lerp(22, 34, leanD),
    elL: lerp(46, 30, leanD),
    elR: lerp(34, 24, leanD),
    breathe: breath(g, 0.08),
  });

  // Walt (view=0.58 > 0.5, facing RIGHT): right hand reaches down onto the bag/desk, left elbow back at pocket
  const poseW: Pose = {
    torso: lerp(11, 7, stepIn) + 3 * pushBag,
    neck: lerp(-5, -3, stepIn),
    shL: -16,
    shR: lerp(34, 30, stepIn) + 8 * pushBag,
    elL: 48,
    elR: lerp(20, 14, stepIn) - 4 * pushBag,
    hipL: lerp(12, 5, stepIn),
    hipR: lerp(-10, -5, stepIn),
    knL: lerp(12, 5, stepIn),
    knR: lerp(10, 6, stepIn),
    breathe: breath(g, 0.075, 1.2),
    slump: 0.16,
  };

  const wx = lerp(-1.18, -0.98, stepIn);
  const bagX = lerp(-0.36, -0.14, pushBag);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        <Card cam={cam} x={DESK.x + 0.36} y={0} z={DESK.z + 0.74} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.2, lids: 0.3 + blink(g, 7) * 0.45,
              lookX: 0.28, lookY: lerp(0.02, 0.18, leanD),
              brow: lerp(0.22, 0.4, leanD), mouth: "flat",
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={bagX} y={0.785} z={3.32} blur={false}>
          <DuffelBag open={0} />
        </Card>
        <Card cam={cam} x={wx} y={0} z={2.86} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.22, lids: 0.16 + blink(g, 3) * 0.5,
              lookX: 0.32, lookY: lerp(0.08, 0.22, pushBag),
              brow: 0.08, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
        </Card>
        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={22} color="#ffe9c0" seed={5} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · close-up insert: "one bag" — unzipped, packed with blue crystal ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.16, -0.12, easeInOut(t)),
    y: 1.12,
    z: lerp(2.48, 2.38, easeInOut(t)),
    f: 1850, shiftY: -455, focus: 0.9, aperture: 0.35,
  };
  const open = prog(g, B(544.9), B(545.65), easeOut);
  const dip = prog(g, B(545.75), B(546.58), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />

        <Card cam={cam} x={-0.16} y={0.785} z={3.36} blur={false}>
          <ellipse cx={0.01} cy={0.022} rx={0.29} ry={0.06} fill="#000" opacity={0.36} />
          <path d="M-0.26,0.012 L-0.23,-0.12 C-0.21,-0.19 -0.11,-0.22 0,-0.225 C0.11,-0.22 0.21,-0.19 0.23,-0.12 L0.26,0.012 Z" fill="#38434f" stroke="#15191e" strokeWidth={0.006} />
          <path d="M-0.22,-0.045 C-0.08,-0.03 0.08,-0.03 0.22,-0.045" stroke="#262e37" strokeWidth={0.01} fill="none" />
          <path d="M-0.17,-0.145 C-0.1,-0.11 -0.02,-0.165 0.05,-0.12 C0.1,-0.085 0.16,-0.135 0.2,-0.1" stroke="#4d5b69" strokeWidth={0.006} fill="none" opacity={0.8} />

          {/* Dark bag interior mouth + brass zipper */}
          <ellipse cx={0} cy={-0.175} rx={lerp(0.06, 0.175, open)} ry={lerp(0.014, 0.048, open)} fill="#0d1217" stroke="#222a33" strokeWidth={0.005} />
          <path d={`M${-lerp(0.06, 0.175, open)},-0.175 A${lerp(0.06, 0.175, open)},${lerp(0.014, 0.048, open)} 0 0 0 ${lerp(0.06, 0.175, open)},-0.175`} stroke="#a39368" strokeWidth={0.005} strokeDasharray="0.008 0.005" fill="none" />

          {/* Clear poly-bag rim & crisp faceted blue crystal chunks inside */}
          {open > 0.08 && (
            <g transform={`translate(0,${-0.168 + 0.012 * (1 - open)}) scale(${0.7 + 0.3 * open})`}>
              <path d="M-0.135,-0.006 C-0.09,-0.036 0.09,-0.036 0.135,-0.006 C0.09,0.022 -0.09,0.022 -0.135,-0.006 Z" fill="#183240" stroke="#9be3f7" strokeWidth={0.0025} />
              {[
                [-0.088, 0.004, 1.45, -18], [-0.052, -0.005, 1.7, 12], [-0.014, 0.006, 1.95, -6],
                [0.026, -0.004, 1.8, 16], [0.064, 0.005, 1.55, -14], [0.096, -0.002, 1.3, 22],
                [-0.032, 0.012, 1.5, 8], [0.044, 0.011, 1.6, -10], [0.006, -0.01, 1.65, 4],
              ].map(([cx, cy, sc, rot], i) => (
                <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
                  <Crystal s={sc} hue={i % 2 ? "#5cd4f5" : "#3eb8de"} />
                </g>
              ))}
              <path d="M-0.105,-0.018 L-0.035,-0.026 M0.028,-0.024 L0.1,-0.014" stroke="#ffffff" strokeWidth={0.003} opacity={0.7} strokeLinecap="round" />
            </g>
          )}

          {/* Walt's left hand (sleeve extending cleanly off-frame left!) */}
          <g transform={`translate(${lerp(-0.07, -0.19, open)},${lerp(-0.145, -0.138, open)}) rotate(64) scale(-0.78,0.78)`}>
            <HandBack pal={PAL_T} curl={0.62} thumb={0.7} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
          </g>

          {/* Distributor's right hand + open knife entering physically from upper-right */}
          <g transform={`translate(${lerp(0.54, 0.13, dip)},${lerp(-0.52, -0.225, dip)}) rotate(${lerp(-132, -118, dip)}) scale(0.82)`}>
            <path d="M-0.01,-0.075 L0.01,-0.075 L0.007,-0.225 L-0.002,-0.245 L-0.009,-0.21 Z" fill="#cfd9e0" stroke="#3c464f" strokeWidth={0.0035} />
            <path d="M-0.007,-0.21 L0.004,-0.08" stroke="#f5fcff" strokeWidth={0.004} opacity={0.85} />
            <rect x={-0.014} y={-0.082} width={0.028} height={0.095} rx={0.006} fill="#3d352e" stroke="#171411" strokeWidth={0.0035} />
            <HandBack pal={DIST.pal} curl={0.92} thumb={0.85} sleeve={DIST.pal.jacket} sleeveShade={DIST.pal.jacketShade} cuff={DIST.pal.shirt} forearm={0.55} />
          </g>
        </Card>

        <Motes f={g} n={16} color="#ffe9c0" seed={9} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · close-up: crystal on the blade of a knife, lifted to the light ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.06, 0.14, easeInOut(t)),
    y: lerp(1.36, 1.43, easeInOut(t)),
    z: lerp(1.34, 1.2, easeInOut(t)),
    f: 1680, shiftY: 22, focus: 1.15, aperture: 0.3,
  };
  const lift = prog(g, B(546.65), B(549.3), easeInOut);
  const turn = prog(g, B(549.2), B(551.8), easeInOut);
  const glint = 0.55 + 0.45 * Math.sin(f * 0.2);

  const handY = lerp(1.13, 1.34, lift);
  const tipWorld = project(cam, 0.34, handY + 0.25, 2.35);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="bladeGlow">
            <stop offset="0" stopColor="#c7f4ff" stopOpacity={0.65} />
            <stop offset="0.5" stopColor="#5cc9eb" stopOpacity={0.22} />
            <stop offset="1" stopColor="#5cc9eb" stopOpacity={0} />
          </radialGradient>
        </defs>
        <GarageRoom cam={cam} f={g} fore={false} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />

        {/* Walt in mid-background left: right hand resting down on the desk edge, left hand at coat pocket */}
        <Card cam={cam} x={-0.66} y={0} z={3.38} blur={false} opacity={0.95}>
          <Figure
            pose={{
              torso: 8, neck: lerp(-2, -8, lift),
              shL: -16, shR: 34,
              elL: 48, elR: 16,
              hipL: 5, hipR: -5, knL: 5, knR: 6,
              breathe: breath(g, 0.07), slump: 0.16,
            }}
            view={0.6}
            look={teacherLook({
              yaw: 0.22, lids: 0.14 + blink(g, 4) * 0.45,
              lookX: 0.42, lookY: lerp(-0.04, -0.34, lift),
              brow: 0.16, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
        </Card>

        {/* Foreground hero prop: Distributor's sleeved forearm, wrist, 4-finger+thumb fist, folding knife & crystal */}
        <Card cam={cam} x={0.34} y={handY} z={2.35} blur={false}>
          <g transform={`rotate(${lerp(-22, -7, turn)})`}>
            <path d="M-0.062,0.48 L-0.048,0.135 L0.056,0.135 L0.078,0.48 Z" fill={DIST.pal.jacket} stroke={DIST.pal.outline} strokeWidth={0.004} />
            <path d="M0.012,0.135 L0.024,0.48 L0.078,0.48 L0.056,0.135 Z" fill={DIST.pal.jacketShade} opacity={0.82} />
            <path d="M-0.03,0.22 C-0.005,0.205 0.022,0.21 0.042,0.225" stroke={DIST.pal.jacketLight} strokeWidth={0.004} fill="none" opacity={0.5} />
            <path d="M-0.046,0.112 L0.052,0.112 L0.056,0.138 L-0.049,0.138 Z" fill={DIST.pal.shirt} stroke={DIST.pal.outline} strokeWidth={0.0032} />
            <path d="M-0.043,0.104 Q0.004,0.114 0.048,0.104" stroke="#d4af5a" strokeWidth={0.007} fill="none" />
            <path d="M-0.04,0.032 L-0.045,0.114 L0.049,0.114 L0.043,0.032 Z" fill={DIST.pal.skin} stroke={DIST.pal.outline} strokeWidth={0.0036} />
            <path d="M0.012,0.032 L0.016,0.114 L0.049,0.114 L0.043,0.032 Z" fill={DIST.pal.skinShade} opacity={0.55} />

            <path d="M-0.046,0.036 C-0.052,0.002 -0.052,-0.046 -0.042,-0.072 L0.038,-0.072 C0.05,-0.046 0.05,0.004 0.043,0.036 Z" fill={DIST.pal.skin} stroke={DIST.pal.outline} strokeWidth={0.0038} strokeLinejoin="round" />
            <path d="M0.012,-0.07 L0.038,-0.072 C0.05,-0.046 0.05,0.004 0.043,0.036 L0.016,0.036 Z" fill={DIST.pal.skinShade} opacity={0.48} />

            <g transform="translate(-0.004,-0.055) rotate(8)">
              <rect x={-0.015} y={0.055} width={0.03} height={0.032} rx={0.006} fill="#3b2c20" stroke={DIST.pal.outline} strokeWidth={0.0032} />
              <circle cx={0} cy={0.072} r={0.0035} fill="#c4a45e" />
              <path d="M-0.016,-0.022 L0.016,-0.022 L0.018,-0.052 L-0.018,-0.052 Z" fill="#9da6ad" stroke={DIST.pal.outline} strokeWidth={0.0032} />
              <path d="M-0.013,-0.052 L0.013,-0.052 L0.011,-0.175 C0.009,-0.202 0.003,-0.222 -0.002,-0.236 C-0.009,-0.214 -0.013,-0.185 -0.014,-0.15 Z" fill="#cfd9e0" stroke="#343d45" strokeWidth={0.0034} strokeLinejoin="round" />
              <path d="M-0.003,-0.054 L0.01,-0.054 L0.008,-0.185 L-0.002,-0.226 Z" fill="#eef7fc" opacity={0.78} />
              <path d="M-0.013,-0.054 L-0.003,-0.054 L-0.003,-0.215 L-0.013,-0.155 Z" fill="#8b98a3" opacity={0.65} />
              <ellipse cx={-0.001} cy={-0.215} rx={0.014} ry={0.026} fill="#7ce2ff" opacity={0.38} />

              <g transform={`translate(-0.002,-0.228) rotate(${lerp(-8, 10, turn)})`}>
                <circle cx={0} cy={-0.016} r={0.11} fill="url(#bladeGlow)" opacity={0.55 + 0.35 * lift * glint} />
                <polygon
                  points="-0.019,0.004 -0.024,-0.018 -0.009,-0.044 0.011,-0.048 0.023,-0.024 0.017,0.003 0.001,0.009"
                  fill="#54cdf2"
                  stroke="#123240"
                  strokeWidth={0.0028}
                  strokeLinejoin="round"
                />
                <polygon points="-0.019,0.004 -0.024,-0.018 -0.009,-0.044 -0.002,-0.016" fill="#c7f6ff" opacity={0.9} />
                <polygon points="-0.009,-0.044 0.011,-0.048 0.006,-0.019 -0.002,-0.016" fill="#effdff" opacity={0.85} />
                <polygon points="0.011,-0.048 0.023,-0.024 0.017,0.003 0.006,-0.019" fill="#2792b8" opacity={0.82} />
                <polygon points="-0.019,0.004 -0.002,-0.016 0.006,-0.019 0.017,0.003 0.001,0.009" fill="#3bb1d8" opacity={0.75} />
                <path d="M-0.009,-0.044 L-0.002,-0.016 L0.017,0.003 M-0.022,-0.017 L0.006,-0.019 L0.021,-0.024" stroke="#e8fcff" strokeWidth={0.0016} fill="none" opacity={0.85} />
                <circle cx={-0.005} cy={-0.032} r={0.004 + 0.002 * glint} fill="#ffffff" opacity={0.95} />
              </g>
            </g>

            {[
              { y: -0.056, w: 0.056, h: 0.021 },
              { y: -0.034, w: 0.059, h: 0.021 },
              { y: -0.012, w: 0.056, h: 0.02 },
              { y: 0.009, w: 0.05, h: 0.019 },
            ].map((fg, i) => (
              <g key={i}>
                <rect
                  x={-0.028}
                  y={fg.y}
                  width={fg.w}
                  height={fg.h}
                  rx={0.009}
                  fill={DIST.pal.skin}
                  stroke={DIST.pal.outline}
                  strokeWidth={0.0032}
                />
                <path d={`M${-0.022},${fg.y + 0.005} L${0.016},${fg.y + 0.005}`} stroke={DIST.pal.skinLight} strokeWidth={0.003} strokeLinecap="round" opacity={0.65} />
                <ellipse cx={-0.02} cy={fg.y + fg.h * 0.5} rx={0.005} ry={0.006} fill={DIST.pal.skinLight} opacity={0.55} />
              </g>
            ))}

            <path
              d="M-0.044,0.008 C-0.055,-0.018 -0.052,-0.054 -0.036,-0.078 C-0.024,-0.09 -0.008,-0.086 -0.006,-0.072 C-0.005,-0.055 -0.016,-0.028 -0.024,-0.002 Z"
              fill={DIST.pal.skin}
              stroke={DIST.pal.outline}
              strokeWidth={0.0035}
            />
            <ellipse cx={-0.018} cy={-0.074} rx={0.006} ry={0.008} fill={DIST.pal.skinLight} opacity={0.75} transform="rotate(24 -0.018 -0.074)" />
          </g>
        </Card>

        <Motes f={g} n={24} color="#cfeeff" seed={3} drift={0.7} />
      </svg>
      {lift > 0.65 && <Streak x={tipWorld.x} y={tipWorld.y} w={420} color="#9eeaff" o={0.22 * lift * glint} />}
      <Finish f={g} vig={0.7} grain={0.07} shadow="#101a20" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · tight medium two-shot: "What does he want?" / "$50,000." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.36, -0.28, easeInOut(t)),
    y: 1.42,
    z: lerp(1.16, 1.3, easeInOut(t)),
    f: 1440, shiftY: 36, focus: 2.5, aperture: 0.3,
  };
  const ask = prog(g, B(553.1), B(554.2), easeInOut);
  const ans = prog(g, B(554.85), B(555.55), easeOut);
  const speakD = g > B(553.15) && g < B(554.35) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.55)) : 0;
  const speakW = g > B(554.95) && g < B(555.8) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.52)) : 0;

  // Distributor (view=0.55 > 0.5 + flip): leans onto desk, gestures forward toward Walt
  const poseD: Pose = deskSit({
    torso: lerp(6, 12, ask),
    neck: lerp(-2, -6, ask),
    shL: 28,
    shR: lerp(24, 40, ask) - 8 * ans,
    elL: 26,
    elR: lerp(30, 44, ask) - 10 * ans,
    breathe: breath(g, 0.08),
  });

  // Walt: left hand tucked at coat pocket, right hand lifts from desk edge to chest-high gesture on "$50,000"
  const poseW: Pose = {
    torso: 7 - 2 * ans,
    neck: -2 + 2 * ans,
    shL: -16,
    shR: lerp(32, 38, ans),
    elL: 48,
    elR: lerp(16, 46, ans),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.075, 1),
    slump: 0.14,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        <Card cam={cam} x={DESK.x + 0.36} y={0} z={DESK.z + 0.74} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.2,
              lids: lerp(0.3, 0.14, ans) + blink(g, 9) * 0.4,
              lookX: 0.34, lookY: 0.06,
              brow: lerp(0.35, -0.15, ans),
              mouth: speakD > 0 ? "open" : "flat",
              mouthOpen: 0.22 * speakD,
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.14} y={0.785} z={3.32} blur={false}>
          <DuffelBag open={1} />
        </Card>
        <Card cam={cam} x={-0.88} y={0} z={2.82} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2,
              lids: 0.16 + blink(g, 4) * 0.45,
              lookX: 0.36, lookY: 0.05,
              brow: 0.08 + 0.12 * ans,
              mouth: speakW > 0 ? "open" : "flat",
              mouthOpen: 0.2 * speakW,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
        </Card>
        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={12} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · reaction two-shot: "Tuko laughs..." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.34, -0.28, easeInOut(t)),
    y: 1.42,
    z: lerp(1.24, 1.32, easeInOut(t)),
    f: 1380, shiftY: 38, focus: 2.8, aperture: 0.3,
  };
  const laugh = clamp(f / 10);
  const shake = Math.sin(f * 0.65) * laugh;

  // Distributor rocks back in his chair laughing, slapping one palm on the desk
  const poseD: Pose = deskSit({
    torso: lerp(8, -18, laugh) + 2.5 * shake,
    neck: lerp(-4, -16, laugh) - 2 * shake,
    shL: lerp(28, -8, laugh),
    shR: lerp(32, 38, laugh),
    elL: lerp(26, 54, laugh),
    elR: lerp(34, 22, laugh),
    breathe: 0.65 + 0.35 * Math.abs(shake),
  });

  // Walt: left hand at coat pocket, right hand settling back down onto the desk edge
  const poseW: Pose = {
    torso: 5,
    neck: -2,
    shL: -16,
    shR: lerp(38, 32, easeOut(t)),
    elL: 48,
    elR: lerp(44, 18, easeOut(t)),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: 0.5,
    slump: 0.14,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        <Card cam={cam} x={DESK.x + 0.36} y={0} z={DESK.z + 0.74} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.18,
              lids: lerp(0.24, 0.04, laugh),
              lookX: 0.22, lookY: -0.08, brow: 0.32,
              mouth: "laugh",
              mouthOpen: 0.55 + 0.45 * Math.abs(Math.sin(f * 0.6)),
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.14} y={0.785} z={3.32} blur={false}>
          <DuffelBag open={1} />
        </Card>
        <Card cam={cam} x={-0.88} y={0} z={2.84} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2, lids: 0.22 + blink(g, 2) * 0.4,
              lookX: 0.34, lookY: 0.04, brow: 0.12, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
        </Card>
        <GarageFore cam={cam} f={g} />
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
    <Sequence from={B(544.95)} durationInFrames={26}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.09} /></Sequence>
    <Sequence from={B(549.2)} durationInFrames={36}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.07} /></Sequence>
  </AbsoluteFill>
);
