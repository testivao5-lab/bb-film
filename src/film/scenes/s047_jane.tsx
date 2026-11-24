// SCENE 047 · "jane" · set: bedroom · narration 750.65s → 766.27s (15.62s) · batch B
// Narration:
//   Jane is Jesse's landlord, then his girlfriend, then the only person in that house with any idea what
//   is going on. A recovering addict who has decided, the way someone who has already been sober once
//   decides, that a little would be fine. It is not fine.
// Staging:
//   S1 (750.65–753.15) Sunny duplex porch: Jane holds a lease clipboard & hands the brass unit key to Jesse
//                      ("Jane is Jesse's landlord").
//   S2 (753.15–754.45) Warm lamplit bedroom: Jane & Jesse sit close on the edge of the bed sharing her open
//                      charcoal sketchbook ("then his girlfriend").
//   S3 (754.45–758.15) Across the bedroom: Jesse checks a canvas duffel stuffed with banded cash bricks while
//                      Jane watches sharply from the doorway ("the only person in that house with any idea...").
//   S4 (758.15–764.45) Macro nightstand close-up: Jane's articulated hand turns a worn bronze circle-triangle
//                      sobriety medallion, then sets it face-down beside a folded foil packet & spoon
//                      ("already been sober once decides, that a little would be fine").
//   S5 (764.45–766.27) Stark wide bedroom cut ("It is not fine"): the warm bedside lamp clicks off at 764.95s,
//                      leaving Jesse & Jane shadowed in cold venetian-blind moonlight as the door swings shut.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { PARTNER, partnerLook } from "../../rig/cast";
import {
  JANE, janeLook, DuplexPorchDay, BedroomSet, BedroomBed, BedroomFore, CashBundle, lampTint, nightTint,
} from "../../env/b_bedroom";
import { SoftDefs } from "../../env/b_common";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 47, id: "jane", set: "bedroom", cutIn: 750.65, cutOut: 766.27 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(766.27);
const CUTS = {
  s1: 0,
  s2: B(753.15),
  s3: B(754.45),
  s4: B(758.15),
  s5: B(764.45),
  end: END,
};

const PAL_P_LAMP = lampTint(PARTNER.pal);
const PAL_J_LAMP = lampTint(JANE.pal);
const PAL_P_NIGHT = nightTint(PARTNER.pal);
const PAL_J_NIGHT = nightTint(JANE.pal);

/* ─────────── S1 · "Jane is Jesse's landlord..." — sunny duplex porch ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2 - CUTS.s1;
  const t = f / dur;
  const handKey = prog(g, B(751.85), B(752.75), easeInOut);

  const cam: Cam = {
    x: lerp(0.15, 0.28, easeInOut(t)),
    y: 1.38,
    z: lerp(1.65, 1.95, easeInOut(t)),
    f: 1420,
    shiftY: -18,
    focus: 2.8,
    aperture: 0.25,
  };

  // Jane on her porch holding lease clipboard in left arm & extending brass key in right hand
  const poseJane: Pose = {
    torso: 2,
    neck: 2,
    shL: 34,
    shR: lerp(18, 54, handKey),
    elL: 72,
    elR: lerp(42, 22, handKey),
    hipL: 5,
    hipR: -6,
    knL: 4,
    knR: 6,
    breathe: 0.55,
  };
  const ancJ = rigAnchors(poseJane, JANE.height, 0.58);

  // Jesse reaching out politely to take the unit key
  const poseJesse: Pose = {
    torso: 4,
    neck: -2,
    shL: -14,
    shR: lerp(12, 48, handKey),
    elL: 44,
    elR: lerp(38, 24, handKey),
    hipL: 6,
    hipR: -5,
    knL: 6,
    knR: 5,
    breathe: 0.65,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuplexPorchDay cam={cam} f={g} />

        {/* Jane on porch step with lease clipboard & dangling brass key */}
        <Card cam={cam} x={-0.25} y={0.14} z={4.45} blur={false}>
          <Figure
            pose={poseJane}
            view={0.58}
            look={janeLook({
              yaw: 0.24,
              lids: 0.14 + blink(g, 2) * 0.4,
              lookX: 0.34,
              brow: 0.18,
              mouth: "flat",
            })}
            pal={JANE.pal}
            height={JANE.height}
            rimLight="#fff3cf"
            rimSide={1}
          />
          {/* Wooden lease clipboard against left forearm */}
          <g transform={`translate(${ancJ.wristL.x - 0.02},${ancJ.wristL.y - 0.04}) rotate(-18)`}>
            <rect x={-0.08} y={-0.12} width={0.16} height={0.22} rx={0.01} fill="#8f6842" stroke="#241911" strokeWidth={0.008} />
            <rect x={-0.065} y={-0.1} width={0.13} height={0.18} fill="#f5efe2" />
          </g>
          {/* Brass house key on ring */}
          <g transform={`translate(${ancJ.wristR.x + 0.03},${ancJ.wristR.y + 0.01})`}>
            <circle cx={0} cy={0} r={0.018} fill="none" stroke="#d9af3b" strokeWidth={0.006} />
            <line x1={0} y1={0.018} x2={0} y2={0.068} stroke="#e3bc4b" strokeWidth={0.008} />
            <line x1={0} y1={0.056} x2={0.016} y2={0.056} stroke="#e3bc4b" strokeWidth={0.007} />
          </g>
        </Card>

        {/* Jesse facing Jane on the right side of the porch */}
        <Card cam={cam} x={0.78} y={0.14} z={4.48} flip blur={false}>
          <Figure
            pose={poseJesse}
            view={0.58}
            look={partnerLook({
              yaw: 0.24,
              lids: 0.1,
              lookX: 0.34,
              brow: -0.08,
              mouth: "smile",
            })}
            pal={PARTNER.pal}
            height={PARTNER.height}
            rimLight="#fff3cf"
            rimSide={-1}
            outfit="hoodie"
          />
        </Card>

        <Motes f={g} n={12} color="#fff1c9" seed={2} drift={0.4} />
      </svg>
      <Finish f={g} vig={0.54} grain={0.06} shadow="#2e2214" gradeO={0.08} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...then his girlfriend..." — warm lamplit bedroom sketchbook beat ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const sketch = Math.sin(f * 0.38) * 3;

  const cam: Cam = {
    x: 0.42,
    y: 1.12,
    z: lerp(1.35, 1.52, easeInOut(t)),
    f: 1460,
    shiftY: -35,
    focus: 2.2,
    aperture: 0.28,
  };

  const poseJane: Pose = chairSit({
    torso: 10,
    neck: 12,
    shL: 36,
    shR: 40 + sketch,
    elL: 48,
    elR: 52 - sketch,
    hipL: 66, hipR: 68, knL: 94, knR: 96,
    breathe: 0.5,
  });
  const ancJane = rigAnchors(poseJane, JANE.height, 0.56);

  const poseJesse: Pose = chairSit({
    torso: 8,
    neck: 10,
    shL: 26,
    shR: 18,
    elL: 38,
    elR: 42,
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.55,
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="lamp" doorOpen={0.2} />
        <BedroomBed cam={cam} x={0.55} z={3.85} night={false} />

        {/* Jesse seated close beside Jane on the mattress edge */}
        <Card cam={cam} x={0.78} y={0.06} z={3.22} flip blur={false}>
          <Figure
            pose={poseJesse}
            view={0.56}
            look={partnerLook({ yaw: 0.2, lids: 0.14, lookX: 0.28, lookY: 0.25, brow: -0.1, mouth: "smile" })}
            pal={PAL_P_LAMP}
            height={PARTNER.height}
            rimLight="#ffd9a0"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        {/* Jane leaning close, drawing in her open sketchbook */}
        <Card cam={cam} x={0.14} y={0.06} z={3.18} blur={false}>
          <Figure
            pose={poseJane}
            view={0.56}
            look={janeLook({ yaw: 0.22, lids: 0.16, lookX: 0.24, lookY: 0.28, brow: -0.05, mouth: "smile" })}
            pal={PAL_J_LAMP}
            height={JANE.height}
            rimLight="#ffd9a0"
            rimSide={-1}
          />
          {/* Open spiral sketchbook across her lap */}
          <g transform={`translate(${ancJane.wristL.x + 0.05},${ancJane.wristL.y + 0.02}) rotate(14)`}>
            <rect x={-0.14} y={-0.025} width={0.28} height={0.04} rx={0.006} fill="#f4efe4" stroke="#2b2520" strokeWidth={0.008} />
            <line x1={-0.11} y1={-0.028} x2={0.11} y2={-0.028} stroke="#574e46" strokeWidth={0.005} />
          </g>
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#ffd9a0" seed={4} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#1a120e" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "...then the only person in that house with any idea what is going on." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const zipClose = prog(f, 38, 86, easeInOut);

  const cam: Cam = {
    x: lerp(-0.35, -0.15, easeInOut(t)),
    y: 1.24,
    z: lerp(0.95, 1.18, easeInOut(t)),
    f: 1360,
    shiftY: -22,
    focus: 2.6,
    aperture: 0.26,
  };

  // Jane standing in the left midground, one hand on hip, watching Jesse & the cash duffel with clear-eyed certainty
  const poseJane: Pose = {
    torso: 2,
    neck: 2,
    shL: -16,
    shR: 18,
    elL: 52,
    elR: 48,
    hipL: 5,
    hipR: -6,
    knL: 4,
    knR: 6,
    breathe: 0.45,
  };

  // Jesse bent over the open cash duffel on the bed at right, glancing nervously over his shoulder
  const poseJesse: Pose = {
    torso: lerp(22, 12, zipClose),
    neck: -6,
    shL: 38,
    shR: 42,
    elL: 34,
    elR: 32,
    hipL: 14,
    hipR: -8,
    knL: 16,
    knR: 12,
    breathe: 0.7,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="lamp" doorOpen={0.45} />
        <BedroomBed cam={cam} x={0.75} z={3.95} night={false} />

        {/* Canvas duffel on the bed stuffed with banded cash bricks */}
        <Card cam={cam} x={0.45} y={0.56} z={3.65} blur={false}>
          <ellipse cx={0} cy={0} rx={0.34} ry={0.14} fill="#1f242c" stroke="#0c0e12" strokeWidth={0.012} />
          <g opacity={1 - zipClose * 0.75} transform="translate(-0.08,-0.04)">
            <CashBundle scale={0.95} />
            <g transform="translate(0.15,0.01)"><CashBundle scale={0.95} /></g>
          </g>
          <path d={`M-0.28,-0.04 Q0,${lerp(-0.18, -0.03, zipClose)} 0.28,-0.04`} fill="none" stroke="#4d5666" strokeWidth={0.014} />
        </Card>

        {/* Jesse zipping the duffel & looking back uneasily */}
        <Card cam={cam} x={1.05} y={0} z={3.72} flip blur={false}>
          <Figure
            pose={poseJesse}
            view={0.58}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.12,
              lookX: 0.36,
              brow: 0.42,
              mouth: "flat",
            })}
            pal={PAL_P_LAMP}
            height={PARTNER.height}
            rimLight="#ffd9a0"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        {/* Hero left foreground-mid: Jane watching with sharp, knowing eyes */}
        <Card cam={cam} x={-0.88} y={0} z={3.05} blur={false}>
          <Figure
            pose={poseJane}
            view={0.58}
            look={janeLook({
              yaw: 0.24,
              lids: 0.18 + blink(g, 5) * 0.4,
              lookX: 0.38,
              brow: 0.38,
              mouth: "flat",
            })}
            pal={PAL_J_LAMP}
            height={JANE.height}
            rimLight="#ffd9a0"
            rimSide={1}
          />
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#ffd9a0" seed={7} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a120e" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "A recovering addict who has decided... that a little would be fine." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  // Turn the bronze sobriety chip slowly between fingers, then set it down toward the foil packet at 762.5s
  const turnChip = Math.sin(f * 0.08) * 0.35;
  const setDown = prog(g, B(762.35), B(763.75), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Dark oak nightstand top split between warm lamp key (left) and cool night shadow (right) */}
        <rect x={0} y={0} width={W} height={H} fill="#261c17" />
        {[190, 440, 710, 950].map((ly, i) => (
          <line key={i} x1={0} y1={ly} x2={W} y2={ly + 12} stroke="#17100c" strokeWidth={4} opacity={0.65} />
        ))}
        <polygon points="0,0 1050,0 740,1080 0,1080" fill="#ffd9a0" opacity={0.1} />
        <polygon points="1050,0 1920,0 1920,1080 740,1080" fill="#18243b" opacity={0.38} />

        {/* Right side of the nightstand in cool shadow: small folded foil square & darkened metal spoon */}
        <g transform="translate(1385,465) rotate(-14)">
          <polygon points="-95,-75 88,-82 102,72 -84,84" fill="#8fa0b5" stroke="#232a36" strokeWidth={4} />
          <polygon points="-88,-68 78,-74 12,8 -78,12" fill="#c8d6e8" opacity={0.55} />
          <line x1={-82} y1={4} x2={92} y2={-4} stroke="#4e5b6e" strokeWidth={3} />
        </g>
        <g transform="translate(1485,685) rotate(22)">
          <rect x={-195} y={-10} width={220} height={20} rx={8} fill="#768191" stroke="#1e2229" strokeWidth={4} />
          <ellipse cx={72} cy={0} rx={68} ry={44} fill="#687282" stroke="#1e2229" strokeWidth={4} />
          <ellipse cx={72} cy={0} rx={48} ry={28} fill="#3a3d45" />
        </g>

        {/* Worn bronze circle-and-triangle sobriety medallion (pure geometric emblem, zero text) */}
        <g
          transform={`translate(${lerp(825, 985, setDown)},${lerp(565, 615, setDown)}) scale(${lerp(1 + turnChip * 0.18, 1, setDown)},1)`}
        >
          <ellipse cx={8} cy={12} rx={118} ry={114} fill="#000" opacity={0.38} />
          <circle cx={0} cy={0} r={112} fill="#b88446" stroke="#2b1b0a" strokeWidth={6} />
          <circle cx={0} cy={0} r={92} fill="#cf9a58" stroke="#7d5322" strokeWidth={4} />
          {/* Inscribed sobriety triangle */}
          <polygon
            points="0,-78 68,42 -68,42"
            fill="none"
            stroke="#593814"
            strokeWidth={7}
            strokeLinejoin="round"
          />
          <circle cx={0} cy={2} r={18} fill="#e8ba78" opacity={0.7 * (1 - setDown * 0.5)} />
        </g>

        {/* Jane's pale porcelain articulated hand holding, then releasing the sobriety chip & drifting right */}
        <g
          transform={`translate(${lerp(545, 765, setDown)},${lerp(785, 775, setDown)}) rotate(${lerp(36, 48, setDown)}) scale(-2420,2420)`}
        >
          <HandBack
            pal={JANE.pal}
            curl={lerp(0.66, 0.34, setDown)}
            thumb={lerp(0.72, 0.45, setDown)}
            sleeve={JANE.pal.jacket}
            sleeveShade={JANE.pal.jacketShade}
            cuff={JANE.pal.shirt}
            forearm={0.85}
          />
        </g>

        <Motes f={g} n={14} color="#ffd9a0" seed={11} drift={0.3} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#0d1526" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "It is not fine." — lamp clicks off into cold moonlit shadow ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const lampOff = g >= B(764.95);
  const doorShut = prog(f, 8, dur - 4, easeInOut);

  const cam: Cam = {
    x: 0.25,
    y: 1.28,
    z: lerp(0.85, 0.55, easeOut(f / dur)),
    f: 1280,
    shiftY: -18,
    focus: 3.6,
    aperture: 0.22,
  };

  const palJ = lampOff ? PAL_J_NIGHT : PAL_J_LAMP;
  const palP = lampOff ? PAL_P_NIGHT : PAL_P_LAMP;
  const rim = lampOff ? "#9fc4ff" : "#ffd9a0";

  const poseJane: Pose = chairSit({
    torso: 16,
    neck: 14,
    shL: 34, shR: 36,
    elL: 58, elR: 56,
    hipL: 66, hipR: 68, knL: 94, knR: 96,
    breathe: 0.35,
  });
  const poseJesse: Pose = chairSit({
    torso: 18,
    neck: 16,
    shL: 30, shR: 32,
    elL: 54, elR: 52,
    hipL: 66, hipR: 68, knL: 94, knR: 96,
    breathe: 0.35,
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode={lampOff ? "night" : "lamp"} doorOpen={0.15} />
        <BedroomBed cam={cam} x={0.55} z={3.85} night={lampOff} />

        {/* Jesse & Jane slumped quietly on the edge of the bed in cold moonlight */}
        <Card cam={cam} x={0.94} y={0.06} z={3.25} flip blur={false}>
          <Figure
            pose={poseJesse}
            view={0.56}
            look={partnerLook({ yaw: 0.2, lids: 0.45, lookX: 0.15, lookY: 0.28, brow: 0.25, mouth: "flat" })}
            pal={palP}
            height={PARTNER.height}
            rimLight={rim}
            rimSide={-1}
            outfit="hoodie"
          />
        </Card>
        <Card cam={cam} x={0.12} y={0.06} z={3.22} blur={false}>
          <Figure
            pose={poseJane}
            view={0.56}
            look={janeLook({ yaw: 0.2, lids: 0.48, lookX: 0.15, lookY: 0.28, brow: 0.22, mouth: "flat" })}
            pal={palJ}
            height={JANE.height}
            rimLight={rim}
            rimSide={1}
          />
        </Card>

        <BedroomFore closing={doorShut * 0.55} />
        <Motes f={g} n={14} color={rim} seed={15} drift={0.25} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#0a1a30" gradeO={lampOff ? 0.22 : 0.14} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 landlord"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 girlfriend"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 knows what is going on"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 sobriety chip"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 it is not fine"><S5 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={END - CUTS.s2}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(764.92)} durationInFrames={22}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.11} /></Sequence>
  </AbsoluteFill>
);
