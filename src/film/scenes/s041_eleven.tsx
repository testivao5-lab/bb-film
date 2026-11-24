// SCENE 041 · "eleven" · set: junkyard · narration 645.20s → 666.33s (21.13s) · batch B
// Narration:
//   “How much did you get for the deal?”
//   “One point two million.”
//   “Six hundred thousand each.”
//   At seventy thousand dollars a week each, that is about eleven more deals. Eleven, and he is done.
//   He believes it. It is the last time in this story that the number is a destination instead of a habit.
// Staging:
//   S1 (645.20–648.90) Medium two-shot across the hood of the waiting coupe as a dust cloud trails behind
//                      the departed buyer's truck at the far gate; Walt leans over the open cash sack asking,
//                      and Jesse lifts two thick banded stacks ("1.2 million").
//   S2 (648.90–652.10) Steep close-up over the dusty sage-green car hood: Jesse's hoodie-sleeved articulated
//                      hand slides three banded cash bricks across the metal toward Walt's legal pad ("600,000 each").
//   S3 (652.10–657.70) Tight close-up on the canary-yellow legal pad lying on the sunlit hood beside a cash
//                      stack: Walt's articulated hand + pen writes "÷ 70 = 11" beneath the double-underlined
//                      737 and circles "11" firmly on "Eleven."
//   S4 (657.70–661.05) Medium-close push-in on Walt in warm afternoon sun: he folds the yellow pad shut,
//                      exhales in quiet relief, and allows a brief, genuine half-smile ("He believes it").
//   S5 (661.05–666.33) Motivated crane pull-back across the wrecking yard: Walt tucks the pad and takes his
//                      share while Jesse zips his bag, dwarfed by towering walls of crushed steel ("destination
//                      instead of a habit").
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeOut, easeInOut, clamp, lerp, blink, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import {
  YardSky, YardBack, YardGround, CarStack, CarBody, YardShed, ChainRun, YardFore,
} from "../../env/b_junkyard";
import { SoftDefs, Dust, Puff } from "../../env/b_common";
import { rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 41, id: "eleven", set: "junkyard", cutIn: 645.2, cutOut: 666.33 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(666.33);
const CUTS = {
  s1: 0,
  s2: B(648.9),
  s3: B(652.1),
  s4: B(657.7),
  s5: B(661.05),
  end: END,
};

const DAY = (pal: typeof TEACHER.pal) => tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffe9bf", 0.1) : c));
const PAL_T = DAY(TEACHER.pal);
const PAL_P = DAY(PARTNER.pal);

/** Pure vector handwritten digit (0,1,3,7) — zero <text> tags */
const Digit: React.FC<{ d: string; x: number; y: number; w?: number; h?: number; sw?: number; col?: string }> = ({
  d, x, y, w = 24, h = 38, sw = 4, col = "#192445",
}) => {
  if (d === "0") {
    return <ellipse cx={x + w * 0.5} cy={y + h * 0.52} rx={w * 0.4} ry={h * 0.46} fill="none" stroke={col} strokeWidth={sw} />;
  }
  let p = "";
  if (d === "1") {
    p = `M${x + w * 0.22},${y + h * 0.22} L${x + w * 0.54},${y + h * 0.04} L${x + w * 0.54},${y + h} M${x + w * 0.22},${y + h} L${x + w * 0.84},${y + h}`;
  } else if (d === "2") {
    p = `M${x + w * 0.12},${y + h * 0.25} C${x + w * 0.2},${y - h * 0.02} ${x + w * 0.86},${y} ${x + w * 0.84},${y + h * 0.28} C${x + w * 0.82},${y + h * 0.54} ${x + w * 0.16},${y + h * 0.74} ${x + w * 0.1},${y + h} L${x + w * 0.88},${y + h}`;
  } else if (d === "3") {
    p = `M${x + w * 0.14},${y + h * 0.16} C${x + w * 0.3},${y - h * 0.02} ${x + w * 0.86},${y + h * 0.04} ${x + w * 0.8},${y + h * 0.28} C${x + w * 0.76},${y + h * 0.46} ${x + w * 0.42},${y + h * 0.48} ${x + w * 0.34},${y + h * 0.48} C${x + w * 0.8},${y + h * 0.5} ${x + w * 0.9},${y + h * 0.76} ${x + w * 0.76},${y + h * 0.94} C${x + w * 0.6},${y + h * 1.04} ${x + w * 0.2},${y + h} ${x + w * 0.1},${y + h * 0.84}`;
  } else if (d === "4") {
    p = `M${x + w * 0.68},${y + h} L${x + w * 0.68},${y + h * 0.04} L${x + w * 0.08},${y + h * 0.66} L${x + w * 0.92},${y + h * 0.66}`;
  } else if (d === "6") {
    p = `M${x + w * 0.78},${y + h * 0.12} C${x + w * 0.4},${y - h * 0.04} ${x + w * 0.1},${y + h * 0.28} ${x + w * 0.12},${y + h * 0.68} C${x + w * 0.14},${y + h * 1.0} ${x + w * 0.84},${y + h * 1.02} ${x + w * 0.86},${y + h * 0.68} C${x + w * 0.88},${y + h * 0.42} ${x + w * 0.22},${y + h * 0.42} ${x + w * 0.14},${y + h * 0.64}`;
  } else if (d === "7") {
    p = `M${x + w * 0.08},${y + h * 0.08} L${x + w * 0.88},${y + h * 0.05} L${x + w * 0.36},${y + h} M${x + w * 0.28},${y + h * 0.52} L${x + w * 0.74},${y + h * 0.5}`;
  }
  return <path d={p} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />;
};

const NumberRow: React.FC<{ num: string; x: number; y: number; w?: number; h?: number; sw?: number }> = ({
  num, x, y, w = 26, h = 40, sw = 4.2,
}) => (
  <g>
    {num.split("").map((ch, i) => (
      <Digit key={i} d={ch} x={x + i * (w + 6)} y={y} w={w} h={h} sw={sw} />
    ))}
  </g>
);

/** Banded brick of hundred-dollar bills (screen-space or metre-scaled) */
const CashBrick: React.FC<{ s?: number; rot?: number }> = ({ s = 1, rot = 0 }) => (
  <g transform={`scale(${s}) rotate(${rot})`}>
    <rect x={-76} y={-36} width={156} height={82} rx={4} fill="#000" opacity={0.28} transform="translate(5,7)" />
    {/* lower thickness edge */}
    <rect x={-76} y={-24} width={152} height={70} rx={3} fill="#4b6647" stroke="#1b2619" strokeWidth={2.5} />
    {/* top bill face */}
    <rect x={-76} y={-36} width={152} height={68} rx={3} fill="#76996d" stroke="#1b2619" strokeWidth={2.5} />
    <rect x={-66} y={-28} width={132} height={52} rx={2} fill="none" stroke="#4f6d48" strokeWidth={2} />
    <ellipse cx={0} cy={-2} rx={22} ry={17} fill="#5c7b55" stroke="#41593c" strokeWidth={1.8} />
    {/* mustard-cream paper currency strap */}
    <rect x={-18} y={-37} width={36} height={83} fill="#e8d8a8" stroke="#5c5034" strokeWidth={2} />
    <line x1={-10} y1={-14} x2={10} y2={-14} stroke="#8c5a3c" strokeWidth={2.5} />
    <line x1={-10} y1={8} x2={10} y2={8} stroke="#8c5a3c" strokeWidth={2.5} />
  </g>
);

/** World-space open canvas cash bag sitting on the car hood */
const HoodCashSack: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <ellipse cx={0} cy={0.015} rx={0.24} ry={0.048} fill="#000" opacity={0.34} />
    <path d="M-0.21,0.01 L-0.18,-0.13 C-0.14,-0.18 0.14,-0.18 0.18,-0.13 L0.21,0.01 Z" fill="#6b5842" stroke="#231c14" strokeWidth={0.007} />
    <ellipse cx={0} cy={-0.148} rx={0.125} ry={0.026} fill="#261f17" />
    {/* green banded stacks peeking out */}
    <rect x={-0.085} y={-0.168} width={0.075} height={0.032} fill="#76996d" stroke="#1b2619" strokeWidth={0.004} transform="rotate(-6 -0.05 -0.15)" />
    <rect x={0.005} y={-0.172} width={0.075} height={0.032} fill="#7fa376" stroke="#1b2619" strokeWidth={0.004} transform="rotate(5 0.04 -0.15)" />
    <rect x={-0.055} y={-0.169} width={0.016} height={0.033} fill="#e8d8a8" />
    <rect x={0.035} y={-0.173} width={0.016} height={0.033} fill="#e8d8a8" />
  </g>
);

/* ─────────── S1 · "How much did you get for the deal?" "One point two million." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.12, -0.04, easeInOut(t)),
    y: 1.44,
    z: lerp(1.35, 1.18, easeInOut(t)),
    f: 1360,
    shiftY: 36,
    focus: 3.3,
    aperture: 0.3,
  };

  const askW = g >= B(645.7) && g <= B(646.7) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.55)) : 0;
  const liftCash = prog(g, B(647.0), B(648.1), easeOut);
  const speakJ = g >= B(647.2) && g <= B(648.6) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.52)) : 0;

  // Walt leans across the hood over the open sack, looking sharply at Jesse
  const poseW: Pose = {
    torso: 8,
    neck: -3,
    shL: 30,
    shR: lerp(34, 28, liftCash),
    elL: 48,
    elR: lerp(32, 42, liftCash),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.075),
    slump: 0.12,
  };

  // Jesse lifts two thick banded cash bricks out of the sack on "1.2 million"
  const poseJ: Pose = {
    torso: lerp(6, -3, liftCash),
    neck: lerp(4, -2, liftCash),
    shL: lerp(28, 34, liftCash),
    shR: lerp(30, 42, liftCash),
    elL: lerp(28, 52, liftCash),
    elR: lerp(24, 58, liftCash),
    hipL: 6, hipR: -5, knL: 6, knR: 5,
    breathe: breath(g, 0.09, 1),
  };
  const ancJ = rigAnchors(poseJ, PARTNER.height, 0.56);

  // Trailing dust cloud from the departed distributor SUV out past the chain-link gate
  const pDust = project(cam, 2.4 + t * 2.2, 0.8, 16.5);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <YardSky cam={cam} f={g} />
        <YardBack cam={cam} f={g} />
        <YardGround cam={cam} f={g} />
        <YardShed cam={cam} x={-9.2} z={17} />
        <ChainRun cam={cam} x0={-16} x1={12} z={14.5} />
        <Puff x={pDust.x} y={pDust.y} r={1.8 * pDust.s * 0.55} o={0.32 * (1 - 0.4 * t)} seed={4} />

        <CarStack cam={cam} x={-6.2} z={10.8} seed={1} />
        <CarStack cam={cam} x={5.4} z={11.2} seed={4} />

        {/* Waiting coupe parked behind them; nose/hood serves as their table */}
        <Card cam={cam} x={-1.15} y={0} z={4.85} blur={false}>
          <Coupe color="#7f876d" shade="#4e5442" light="#a8b094" wheel={0} headlights={0} tail={0.15} />
        </Card>
        <Card cam={cam} x={-0.02} y={0.82} z={4.55} blur={false}>
          <HoodCashSack scale={1.05} />
        </Card>

        {/* Walt on left */}
        <Card cam={cam} x={-0.86} y={0} z={4.18} blur={false}>
          <ellipse cx={0.02} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.22,
              lids: 0.16 + blink(g, 4) * 0.45,
              lookX: 0.35,
              lookY: 0.04,
              brow: 0.22,
              mouth: askW > 0 ? "open" : "flat",
              mouthOpen: 0.16 * askW,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff3cf"
            rimSide={1}
          />
          {/* Yellow legal pad tucked at Walt's left hand */}
          <g transform="translate(0.18,-0.98) rotate(16)">
            <rect x={-0.075} y={-0.1} width={0.15} height={0.2} fill="#f5e58e" stroke="#6b5f2e" strokeWidth={0.004} />
            <rect x={-0.075} y={-0.1} width={0.15} height={0.022} fill="#6e2a26" />
          </g>
        </Card>

        {/* Jesse on right, lifting banded green cash stacks */}
        <Card cam={cam} x={0.78} y={0} z={4.28} flip blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.12 + blink(g, 7) * 0.4,
              lookX: 0.34,
              lookY: lerp(0.18, -0.02, liftCash),
              brow: -0.1,
              mouth: speakJ > 0 ? "open" : "flat",
              mouthOpen: 0.18 * speakJ,
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#fff3cf"
            rimSide={-1}
            outfit="hoodie"
          />
          {liftCash > 0.15 && (
            <g transform={`translate(${ancJ.wristR.x + 0.045},${ancJ.wristR.y - 0.01}) scale(0.0011)`}>
              <CashBrick rot={-12} />
            </g>
          )}
        </Card>

        <Dust cam={cam} f={g} n={22} x0={-6} x1={6} z0={2.5} z1={11} h={2.0} seed={3} color="#ebd8b5" />
        <YardFore />
        <Motes f={g} n={20} color="#fff2cf" seed={6} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · steep close-up on the car hood: "Six hundred thousand each." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const slide = prog(g, B(649.15), B(650.55), easeOut);
  const waltRest = prog(g, B(650.4), B(651.5), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Sunlit sage-green painted car hood from above */}
        <rect x={0} y={0} width={W} height={H} fill="#6f775e" />
        {/* windshield cowl + black wiper arm along top edge */}
        <path d="M0,0 L1920,0 L1920,135 Q960,185 0,145 Z" fill="#252826" stroke="#121413" strokeWidth={4} />
        <line x1={280} y1={96} x2={920} y2={62} stroke="#141615" strokeWidth={14} strokeLinecap="round" />
        <line x1={1080} y1={102} x2={1710} y2={68} stroke="#141615" strokeWidth={14} strokeLinecap="round" />
        {/* subtle hood center crease + sun sheen + desert dust */}
        <path d="M120,160 Q960,210 1800,150 L1880,1080 L40,1080 Z" fill="#7f876d" opacity={0.75} />
        <line x1={960} y1={170} x2={960} y2={1080} stroke="#5d644f" strokeWidth={5} opacity={0.65} />
        <ellipse cx={1280} cy={440} rx={520} ry={220} fill="#e8e2c4" opacity={0.14} />

        {/* Walt's yellow legal pad resting on the left half of the hood (showing 737 from s040) */}
        <g transform="translate(470,585) rotate(-6) scale(0.72)">
          <rect x={-328} y={-288} width={660} height={540} rx={5} fill="#000" opacity={0.28} transform="translate(10,14)" />
          <rect x={-330} y={-292} width={660} height={540} rx={4} fill="#f5e58e" stroke="#6d6130" strokeWidth={3.5} />
          <rect x={-330} y={-292} width={660} height={44} fill="#6e2a26" />
          {[-180, -120, -60, 0, 60, 120, 180].map((ry, i) => (
            <line key={i} x1={-325} y1={ry} x2={325} y2={ry} stroke="#9ab5ba" strokeWidth={1.6} opacity={0.6} />
          ))}
          <NumberRow num="360" x={115} y={-165} w={26} h={38} sw={4.2} />
          <NumberRow num="137" x={115} y={-105} w={26} h={38} sw={4.2} />
          <NumberRow num="240" x={115} y={-45} w={26} h={38} sw={4.2} />
          <line x1={95} y1={14} x2={245} y2={12} stroke="#162040" strokeWidth={4.5} />
          <NumberRow num="737" x={110} y={30} w={32} h={48} sw={5.2} />
          <line x1={102} y1={92} x2={242} y2={90} stroke="#162040" strokeWidth={4.2} />
          <line x1={105} y1={102} x2={240} y2={100} stroke="#162040" strokeWidth={4.2} />
        </g>

        {/* Jesse's half of the cash stacks at upper-right */}
        <g transform="translate(1410,360)">
          <CashBrick s={1.25} rot={8} />
          <g transform="translate(45,65)">
            <CashBrick s={1.25} rot={-5} />
          </g>
          <g transform="translate(-30,115)">
            <CashBrick s={1.25} rot={3} />
          </g>
        </g>

        {/* Three thick banded cash bricks slid across the hood to Walt's side ("Six hundred thousand each") */}
        <g transform={`translate(${lerp(1290, 935, slide)},${lerp(560, 615, slide)})`}>
          <CashBrick s={1.28} rot={lerp(10, -4, slide)} />
          <g transform="translate(38,68)">
            <CashBrick s={1.28} rot={lerp(4, -9, slide)} />
          </g>
          <g transform="translate(-26,122)">
            <CashBrick s={1.28} rot={lerp(14, 2, slide)} />
          </g>

          {/* Jesse's articulated right hand (olive hoodie sleeve) pushing the stacks across */}
          <g transform={`translate(${lerp(310, 385, waltRest)},${lerp(185, 225, waltRest)}) rotate(-48) scale(2350)`}>
            <HandBack
              pal={PAL_P}
              curl={0.32}
              thumb={0.48}
              sleeve={PAL_P.jacket}
              sleeveShade={PAL_P.jacketShade}
              cuff="#465239"
              forearm={0.68}
            />
          </g>
        </g>

        {/* Walt's articulated left hand entering from bottom-left to rest on his share */}
        <g transform={`translate(${lerp(660, 775, waltRest)},${lerp(960, 845, waltRest)}) rotate(32) scale(-2350,2350)`}>
          <HandBack
            pal={PAL_T}
            curl={0.28}
            thumb={0.45}
            sleeve={PAL_T.jacket}
            sleeveShade={PAL_T.jacketShade}
            cuff={PAL_T.shirt}
            forearm={0.68}
          />
        </g>

        <Motes f={g} n={14} color="#fff2cf" seed={8} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#322610" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · tight close-up on the yellow pad: "At $70,000 a week... about 11 more deals. Eleven." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;

  const div70 = clamp((g - B(652.35)) / (B(653.85) - B(652.35)));
  const eq11 = clamp((g - B(655.05)) / (B(656.05) - B(655.05)));
  const ring = clamp((g - B(656.9)) / (B(657.55) - B(656.9)));

  // Pen trajectory across "÷ 70" -> "= 11" -> circle around 11
  let px = lerp(740, 945, div70);
  let py = 665 + Math.sin(f * 0.75) * 4 * (div70 > 0 && div70 < 1 ? 1 : 0);
  if (g >= B(654.9) && g < B(656.8)) {
    px = lerp(985, 1155, eq11);
    py = 665 + Math.sin(f * 0.8) * 4 * (eq11 > 0 && eq11 < 1 ? 1 : 0);
  } else if (g >= B(656.8)) {
    const ang = -Math.PI * 0.8 + ring * Math.PI * 2.05;
    px = 1118 + Math.cos(ang) * 76;
    py = 662 + Math.sin(ang) * 48;
  }

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Painted sage-green car hood backdrop */}
        <rect x={0} y={0} width={W} height={H} fill="#788066" />
        <line x1={1340} y1={0} x2={1390} y2={1080} stroke="#59604b" strokeWidth={5} opacity={0.6} />

        {/* Banded stack of $100 bills resting right next to the legal pad */}
        <g transform="translate(1545,485)">
          <CashBrick s={1.55} rot={-8} />
          <g transform="translate(36,88)">
            <CashBrick s={1.55} rot={4} />
          </g>
        </g>

        {/* Canary-yellow legal pad zoomed in on the bottom calculation */}
        <g transform="translate(830,515) rotate(-4)">
          <rect x={-435} y={-375} width={870} height={730} rx={6} fill="#000" opacity={0.3} transform="translate(14,18)" />
          <rect x={-440} y={-380} width={870} height={730} rx={5} fill="#f5e58e" stroke="#6d6130" strokeWidth={3.5} />
          <rect x={-440} y={-380} width={870} height={54} fill="#6e2a26" />
          {[-245, -165, -85, -5, 75, 155, 235, 315].map((ry, i) => (
            <line key={i} x1={-434} y1={ry} x2={424} y2={ry} stroke="#9ab5ba" strokeWidth={1.8} opacity={0.65} />
          ))}
          <line x1={-305} y1={-324} x2={-305} y2={346} stroke="#cf7872" strokeWidth={2} opacity={0.7} />

          {/* Existing 360 + 137 + 240 = 737 from s040 */}
          <path d="M-265,-185 q22,-18 44,0 t44,0 t44,0 L45,-185" fill="none" stroke="#1d2847" strokeWidth={4.5} strokeLinecap="round" />
          <NumberRow num="360" x={135} y={-218} w={32} h={48} sw={4.8} />

          <path d="M-265,-105 q20,-16 40,0 t40,0 L25,-105" fill="none" stroke="#1d2847" strokeWidth={4.5} strokeLinecap="round" />
          <NumberRow num="137" x={135} y={-138} w={32} h={48} sw={4.8} />

          <path d="M-340,-25 L-314,-25 M-327,-38 L-327,-12" stroke="#1d2847" strokeWidth={4.2} strokeLinecap="round" />
          <path d="M-265,-25 q22,-18 44,0 t44,0 t44,0 L55,-25" fill="none" stroke="#1d2847" strokeWidth={4.5} strokeLinecap="round" />
          <NumberRow num="240" x={135} y={-58} w={32} h={48} sw={4.8} />

          <line x1={105} y1={14} x2={295} y2={12} stroke="#162040" strokeWidth={5.2} strokeLinecap="round" />
          <NumberRow num="737" x={122} y={32} w={42} h={64} sw={6.2} />
          <line x1={112} y1={110} x2={292} y2={108} stroke="#162040" strokeWidth={4.8} strokeLinecap="round" />
          <line x1={115} y1={122} x2={288} y2={120} stroke="#162040" strokeWidth={4.6} strokeLinecap="round" />

          {/* NEW LINE: "÷ 70" -> "= 11" -> heavy hand-drawn circle around "11" */}
          {div70 > 0.02 && (
            <g opacity={clamp(div70 * 1.6)}>
              {/* division symbol ÷ */}
              <line x1={-125} y1={196} x2={-85} y2={196} stroke="#162040" strokeWidth={5.2} strokeLinecap="round" />
              <circle cx={-105} cy={180} r={4.2} fill="#162040" />
              <circle cx={-105} cy={212} r={4.2} fill="#162040" />
              {div70 > 0.35 && <NumberRow num="70" x={-55} y={168} w={38} h={58} sw={5.6} />}
            </g>
          )}

          {eq11 > 0.02 && (
            <g opacity={clamp(eq11 * 1.6)}>
              {/* approx-equals sign ≈ / = */}
              <path d="M78,186 Q92,178 106,186 T134,186 M78,204 Q92,196 106,204 T134,204" fill="none" stroke="#162040" strokeWidth={5} strokeLinecap="round" />
              {eq11 > 0.35 && <NumberRow num="11" x={172} y={164} w={44} h={68} sw={6.8} />}
            </g>
          )}

          {ring > 0.02 && (
            <g>
              {(() => {
                const n = 36;
                const upto = Math.max(2, Math.round(n * ring));
                const pts = Array.from({ length: upto }).map((_, i) => {
                  const a = -Math.PI * 0.85 + (i / (n - 1)) * Math.PI * 2.08;
                  return `${222 + Math.cos(a) * 78},${198 + Math.sin(a) * 48}`;
                });
                return (
                  <polyline
                    points={pts.join(" ")}
                    fill="none"
                    stroke="#162040"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })()}
            </g>
          )}
        </g>

        {/* Walt's left hand steadying the lower-left edge of the legal pad */}
        <g transform="translate(345,795) rotate(32) scale(-2350,2350)">
          <HandBack pal={PAL_T} curl={0.2} thumb={0.42} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
        </g>

        {/* Walt's right hand + ballpoint pen writing and circling "11" */}
        <g transform={`translate(${px + 255},${py + 285}) rotate(-32) scale(2450)`}>
          <g transform="translate(-0.048,-0.072) rotate(-32)">
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.165} rx={0.003} fill="#253b59" stroke="#101824" strokeWidth={0.0025} />
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.032} fill="#aeb8c2" stroke="#101824" strokeWidth={0.002} />
            <polygon points="-0.004,-0.055 0.004,-0.055 0,-0.074" fill="#c9ae6a" stroke="#101824" strokeWidth={0.0018} />
            <circle cx={0} cy={-0.075} r={0.0018} fill="#192347" />
          </g>
          <HandBack pal={PAL_T} curl={0.76} thumb={0.84} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
        </g>

        <Motes f={g} n={14} color="#fff2cf" seed={5} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#2c1f0c" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · medium-close on Walt: "...and he is done. He believes it." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.74, -0.78, easeInOut(t)),
    y: 1.48,
    z: lerp(2.35, 2.12, easeInOut(t)),
    f: 1560,
    shiftY: 42,
    focus: 2.0,
    aperture: 0.3,
  };

  const foldShut = prog(g, B(657.85), B(659.1), easeInOut);
  const believe = prog(g, B(659.5), B(660.6), easeOut);

  // Walt folds the legal pad shut in his hands and exhales with quiet certainty
  const poseW: Pose = {
    torso: lerp(7, 2, foldShut),
    neck: lerp(6, -2, believe),
    shL: lerp(24, 28, foldShut),
    shR: lerp(34, 26, foldShut),
    elL: 48,
    elR: lerp(38, 46, foldShut),
    hipL: 5, hipR: -5, knL: 5, knR: 5,
    breathe: breath(g, 0.065),
    slump: lerp(0.15, 0.06, believe),
  };
  const ancW = rigAnchors(poseW, TEACHER.height, 0.54);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <YardSky cam={cam} f={g} />
        <YardBack cam={cam} f={g} />
        <YardGround cam={cam} f={g} />
        <ChainRun cam={cam} x0={-16} x1={12} z={14.5} />
        <CarStack cam={cam} x={-4.8} z={10.5} seed={1} />
        <CarStack cam={cam} x={2.6} z={11.0} seed={3} />

        <Card cam={cam} x={-1.15} y={0} z={4.85} blur={false}>
          <Coupe color="#7f876d" shade="#4e5442" light="#a8b094" wheel={0} headlights={0} tail={0.15} />
        </Card>

        <Card cam={cam} x={-0.86} y={0} z={4.15} blur={false}>
          <ellipse cx={0.02} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.54}
            look={teacherLook({
              yaw: 0.18,
              lids: lerp(0.24, 0.14, believe) + blink(g, 5) * 0.45,
              lookX: lerp(0.28, 0.18, believe),
              lookY: lerp(0.24, -0.02, believe),
              brow: lerp(0.14, -0.06, believe),
              mouth: believe > 0.45 ? "smile" : "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff3cf"
            rimSide={1}
          />
          {/* Folded legal pad held right in Walt's hands */}
          <g transform={`translate(${ancW.wristR.x + 0.03},${ancW.wristR.y + 0.02}) rotate(${lerp(24, 10, foldShut)})`}>
            <rect x={-0.08} y={-0.105} width={0.16} height={0.21} fill={foldShut > 0.6 ? "#c4b68c" : "#f5e58e"} stroke="#5c522c" strokeWidth={0.004} />
            <rect x={-0.08} y={-0.105} width={0.16} height={0.024} fill="#6e2a26" />
          </g>
        </Card>

        <YardFore />
        <Motes f={g} n={20} color="#fff2cf" seed={4} drift={0.7} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.065} shadow="#3a2a10" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · crane pull-back across the labyrinth of wrecked cars: "...destination instead of a habit." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const e = easeInOut(t);
  const cam: Cam = {
    x: lerp(-0.15, -0.55, e),
    y: lerp(1.48, 2.25, e),
    z: lerp(1.25, -1.6, e),
    f: lerp(1340, 1080, e),
    shiftY: lerp(38, 72, e),
    focus: 6,
    aperture: 0.3,
  };

  const pack = prog(g, B(661.2), B(663.4), easeInOut);
  const lookOut = prog(g, B(663.6), B(665.6), easeInOut);

  // Walt lifts his canvas bag of cash with his right hand, yellow pad under left arm, pausing to gaze across the yard
  const poseW: Pose = {
    torso: lerp(7, 2, pack),
    neck: lerp(4, -3, lookOut),
    shL: 26,
    shR: lerp(34, 16, pack),
    elL: 58,
    elR: lerp(26, 36, pack),
    hipL: 5, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.07),
  };

  // Jesse zips his bag on the hood, then slings it onto his shoulder
  const poseJ: Pose = {
    torso: lerp(8, -4, pack),
    neck: lerp(6, 2, pack),
    shL: lerp(30, -10, pack),
    shR: lerp(34, 28, pack),
    elL: lerp(26, 48, pack),
    elR: lerp(24, 64, pack),
    hipL: 6, hipR: -5, knL: 6, knR: 5,
    breathe: breath(g, 0.08, 1.3),
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <YardSky cam={cam} f={g} />
        <YardBack cam={cam} f={g} />
        <YardGround cam={cam} f={g} />
        <YardShed cam={cam} x={-9.2} z={17} />
        <ChainRun cam={cam} x0={-16} x1={12} z={14.5} />

        <CarStack cam={cam} x={-6.4} z={10.8} seed={1} />
        <CarStack cam={cam} x={5.8} z={11.4} seed={4} />
        <CarBody cam={cam} x={4.5} z={7.6} rot={-4} wheels={1} pal="#8a745d" />
        <CarBody cam={cam} x={-5.4} z={7.2} rot={3} wheels={2} open={0.45} pal="#67757d" />

        <Card cam={cam} x={-1.15} y={0} z={4.85} blur={false}>
          <Coupe color="#7f876d" shade="#4e5442" light="#a8b094" wheel={0} headlights={0} tail={0.15} />
        </Card>

        {/* Walt on left with folded pad & cash sack */}
        <Card cam={cam} x={-0.86} y={0} z={4.18} blur={false}>
          <ellipse cx={0.02} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: lerp(0.22, 0.3, lookOut),
              lids: 0.18 + blink(g, 4) * 0.45,
              lookX: lerp(0.32, 0.42, lookOut),
              lookY: lerp(0.12, -0.06, lookOut),
              brow: 0.08,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff3cf"
            rimSide={1}
          />
          <g transform="translate(0.15,-1.04) rotate(10)">
            <rect x={-0.07} y={-0.095} width={0.14} height={0.19} fill="#c4b68c" stroke="#5c522c" strokeWidth={0.004} />
          </g>
          <g transform={`translate(${lerp(0.26, 0.18, pack)},${lerp(-0.84, -0.78, pack)})`}>
            <HoodCashSack scale={0.72} />
          </g>
        </Card>

        {/* Jesse on right slinging his bag */}
        <Card cam={cam} x={0.78} y={0} z={4.28} flip blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.18 + blink(g, 6) * 0.45,
              lookX: 0.28,
              lookY: 0.04,
              brow: 0.16,
              mouth: "flat",
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#fff3cf"
            rimSide={-1}
            outfit="hoodie"
          />
          <g transform={`translate(${lerp(-0.26, -0.1, pack)},${lerp(-0.84, -1.08, pack)})`}>
            <HoodCashSack scale={0.72} />
          </g>
        </Card>

        <Dust cam={cam} f={g} n={28} x0={-8} x1={8} z0={2.2} z1={14} h={2.3} seed={9} color="#ebd8b5" />
        <YardFore />
        <Motes f={g} n={24} color="#fff2cf" seed={11} drift={1.0} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.065} shadow="#3a2a10" gradeO={0.14} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 one point two million"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 six hundred thousand each"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 eleven more deals"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 he believes it"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 destination vs habit"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.032} /></Sequence>
    <Sequence from={B(649.2)} durationInFrames={36}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.075} /></Sequence>
    <Sequence from={B(655.0)} durationInFrames={32}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.07} /></Sequence>
    <Sequence from={B(656.9)} durationInFrames={24}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
