// SCENE 040 · "junkyard-math" · set: junkyard · narration 615.12s → 645.20s (30.08s) · batch B
// Narration:
//   Now, the arithmetic. It happens in a junkyard, in a car, waiting.
//   Two kids through a good state college, four years each: three hundred and sixty thousand.
//   The mortgage and the home equity line: a hundred and thirty-seven.
//   Food, clothing, utilities, two thousand a month for ten years, so his wife isn't destitute the week
//   after the funeral: two hundred and forty.
//   Seven hundred and thirty-seven thousand dollars. Not a fortune. A comfortable widow.
// Staging:
//   S1 (615.12–620.80) Crane-push into the sunlit Albuquerque auto wrecking yard onto the parked waiting
//                      sedan; Jesse leans impatiently against the front fender while Walt sits at the wheel.
//   S2 (620.80–625.50) Inside the waiting car cab: Walt holds a pocket calculator in his left hand and writes
//                      360 on a canary-yellow legal pad propped against the steering wheel; Jesse paces outside.
//   S3 (625.50–633.60) Steep close-up over the steering wheel: two articulated hands (left thumb pressing
//                      calculator keys, right hand gripping a ballpoint pen) writing 360, 137, and shorthand
//                      waves on the yellow ruled pad.
//   S4 (633.60–636.40) Tight cab close-up on Walt as he pauses on "the week after the funeral", jaw set,
//                      before dropping his eyes back to the column of figures.
//   S5 (636.40–641.50) Return to tight legal-pad insert: pen writes + 240, draws the ledger bar, writes
//                      bold chemist-crossed 737, and double-underlines it.
//   S6 (641.50–645.20) Exterior medium two-shot beside the open car door: Walt holds the yellow pad while
//                      Jesse stares across the dusty hood in quiet disbelief.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeOut, easeInOut, clamp, lerp, blink, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook, tint, mixHex } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import {
  YardSky, YardBack, YardGround, CarStack, CarBody, YardShed, ChainRun,
  YardFore, WaitingCabBack, WaitingCabFore,
} from "../../env/b_junkyard";
import { SoftDefs, Dust } from "../../env/b_common";
import { chairSit, walkPose } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 40, id: "junkyard-math", set: "junkyard", cutIn: 615.12, cutOut: 645.2 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(645.2);
const CUTS = {
  s1: 0,
  s2: B(620.8),
  s3: B(625.5),
  s4: B(633.6),
  s5: B(636.4),
  s6: B(641.5),
  end: END,
};

const DAY = (pal: typeof TEACHER.pal) => tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffe9bf", 0.1) : c));
const PAL_T = DAY(TEACHER.pal);
const PAL_P = DAY(PARTNER.pal);

/** Pure vector handwritten digit (0,1,2,3,4,6,7) — zero <text> tags, chemist's crossed 7 */
const Digit: React.FC<{ d: string; x: number; y: number; w?: number; h?: number; sw?: number; col?: string }> = ({
  d, x, y, w = 22, h = 34, sw = 3.6, col = "#1d2847",
}) => {
  let path = "";
  if (d === "0") {
    return (
      <ellipse
        cx={x + w * 0.5}
        cy={y + h * 0.52}
        rx={w * 0.4}
        ry={h * 0.46}
        fill="none"
        stroke={col}
        strokeWidth={sw}
      />
    );
  } else if (d === "1") {
    path = `M${x + w * 0.22},${y + h * 0.22} L${x + w * 0.52},${y + h * 0.04} L${x + w * 0.52},${y + h} M${x + w * 0.22},${y + h} L${x + w * 0.82},${y + h}`;
  } else if (d === "2") {
    path = `M${x + w * 0.12},${y + h * 0.25} C${x + w * 0.2},${y - h * 0.02} ${x + w * 0.86},${y} ${x + w * 0.84},${y + h * 0.28} C${x + w * 0.82},${y + h * 0.54} ${x + w * 0.16},${y + h * 0.74} ${x + w * 0.1},${y + h} L${x + w * 0.88},${y + h}`;
  } else if (d === "3") {
    path = `M${x + w * 0.14},${y + h * 0.16} C${x + w * 0.3},${y - h * 0.02} ${x + w * 0.86},${y + h * 0.04} ${x + w * 0.8},${y + h * 0.28} C${x + w * 0.76},${y + h * 0.46} ${x + w * 0.42},${y + h * 0.48} ${x + w * 0.34},${y + h * 0.48} C${x + w * 0.8},${y + h * 0.5} ${x + w * 0.9},${y + h * 0.76} ${x + w * 0.76},${y + h * 0.94} C${x + w * 0.6},${y + h * 1.04} ${x + w * 0.2},${y + h} ${x + w * 0.1},${y + h * 0.84}`;
  } else if (d === "4") {
    path = `M${x + w * 0.68},${y + h} L${x + w * 0.68},${y + h * 0.04} L${x + w * 0.08},${y + h * 0.66} L${x + w * 0.92},${y + h * 0.66}`;
  } else if (d === "6") {
    path = `M${x + w * 0.78},${y + h * 0.12} C${x + w * 0.4},${y - h * 0.04} ${x + w * 0.1},${y + h * 0.28} ${x + w * 0.12},${y + h * 0.68} C${x + w * 0.14},${y + h * 1.0} ${x + w * 0.84},${y + h * 1.02} ${x + w * 0.86},${y + h * 0.68} C${x + w * 0.88},${y + h * 0.42} ${x + w * 0.22},${y + h * 0.42} ${x + w * 0.14},${y + h * 0.64}`;
  } else if (d === "7") {
    path = `M${x + w * 0.08},${y + h * 0.08} L${x + w * 0.88},${y + h * 0.05} L${x + w * 0.36},${y + h} M${x + w * 0.28},${y + h * 0.52} L${x + w * 0.74},${y + h * 0.5}`;
  }
  return <path d={path} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />;
};

const NumberRow: React.FC<{ num: string; x: number; y: number; w?: number; h?: number; sw?: number }> = ({
  num, x, y, w = 24, h = 36, sw = 3.8,
}) => (
  <g>
    {num.split("").map((ch, i) => (
      <Digit key={i} d={ch} x={x + i * (w + 6)} y={y} w={w} h={h} sw={sw} />
    ))}
  </g>
);

/** Canary-yellow legal pad in screen space for S3 & S5 inserts */
const LegalPad: React.FC<{
  l1: number; l2: number; l3Wave: number; l3Num: number; bar: number; total: number; under: number;
}> = ({ l1, l2, l3Wave, l3Num, bar, total, under }) => (
  <g transform="translate(970,555) rotate(-4)">
    {/* drop shadow + chipboard backing + gummed maroon top binding + canary yellow pad */}
    <rect x={-328} y={-288} width={665} height={560} rx={6} fill="#000" opacity={0.34} transform="translate(12,16)" />
    <rect x={-330} y={-292} width={660} height={560} rx={4} fill="#f5e58e" stroke="#7d7038" strokeWidth={3} />
    <rect x={-330} y={-292} width={660} height={46} rx={3} fill="#6e2a26" stroke="#2c110f" strokeWidth={3} />
    <line x1={-328} y1={-242} x2={328} y2={-242} stroke="#9c8a44" strokeWidth={2} />
    {/* blue horizontal rulings + double pink left margin rule */}
    {[-185, -125, -65, -5, 55, 115, 175, 235].map((ry, i) => (
      <line key={i} x1={-326} y1={ry} x2={326} y2={ry} stroke="#9ab5ba" strokeWidth={1.6} opacity={0.65} />
    ))}
    <line x1={-232} y1={-244} x2={-232} y2={266} stroke="#cf7872" strokeWidth={1.8} opacity={0.7} />
    <line x1={-224} y1={-244} x2={-224} y2={266} stroke="#cf7872" strokeWidth={1.4} opacity={0.55} />

    {/* Row 1: college shorthand scribble + "360" */}
    {l1 > 0.02 && (
      <g opacity={clamp(l1 * 1.5)}>
        <path
          d={`M-205,-142 q18,-18 36,0 t36,0 t36,0 t36,0 L${lerp(-60, 45, l1)},-142`}
          fill="none"
          stroke="#1d2847"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {l1 > 0.45 && <NumberRow num="360" x={125} y={-168} w={28} h={42} sw={4.4} />}
      </g>
    )}

    {/* Row 2: mortgage shorthand scribble + "137" */}
    {l2 > 0.02 && (
      <g opacity={clamp(l2 * 1.5)}>
        <path
          d={`M-205,-80 q16,-16 32,0 t32,0 t32,0 L${lerp(-105, 28, l2)},-80`}
          fill="none"
          stroke="#1d2847"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {l2 > 0.45 && <NumberRow num="137" x={125} y={-106} w={28} h={42} sw={4.4} />}
      </g>
    )}

    {/* Row 3: living-expenses shorthand scribble + "+" + "240" */}
    {l3Wave > 0.02 && (
      <g opacity={clamp(l3Wave * 1.5)}>
        <path d="M-265,-18 L-243,-18 M-254,-29 L-254,-7" stroke="#1d2847" strokeWidth={3.8} strokeLinecap="round" />
        <path
          d={`M-205,-18 q17,-16 34,0 t34,0 t34,0 t34,0 L${lerp(-65, 52, l3Wave)},-18`}
          fill="none"
          stroke="#1d2847"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
    )}
    {l3Num > 0.02 && (
      <g opacity={clamp(l3Num * 1.6)}>
        <NumberRow num="240" x={125} y={-44} w={28} h={42} sw={4.4} />
      </g>
    )}

    {/* Ledger sum rule + bold "737" + double underline */}
    {bar > 0.02 && (
      <line x1={95} y1={22} x2={lerp(95, 255, bar)} y2={20} stroke="#162040" strokeWidth={4.8} strokeLinecap="round" />
    )}
    {total > 0.02 && (
      <g opacity={clamp(total * 1.6)}>
        <NumberRow num="737" x={116} y={42} w={36} h={56} sw={5.8} />
      </g>
    )}
    {under > 0.02 && (
      <g>
        <line x1={105} y1={114} x2={lerp(105, 252, clamp(under * 1.8))} y2={112} stroke="#162040" strokeWidth={4.6} strokeLinecap="round" />
        {under > 0.45 && (
          <line x1={108} y1={126} x2={lerp(108, 250, clamp((under - 0.45) * 1.9))} y2={124} stroke="#162040" strokeWidth={4.4} strokeLinecap="round" />
        )}
      </g>
    )}
  </g>
);

/** Pocket solar calculator held at left of the steering wheel */
const PocketCalc: React.FC<{ val: string; pressKey: number }> = ({ val, pressKey }) => (
  <g>
    <rect x={-106} y={-162} width={212} height={320} rx={16} fill="#000" opacity={0.35} transform="translate(8,10)" />
    <rect x={-106} y={-162} width={212} height={320} rx={16} fill="#464c54" stroke="#181b1f" strokeWidth={3.5} />
    <rect x={-92} y={-146} width={184} height={92} rx={8} fill="#2c3136" stroke="#181b1f" strokeWidth={2.5} />
    {/* solar strip + green-grey LCD */}
    <rect x={14} y={-138} width={68} height={18} rx={3} fill="#3d2c28" stroke="#181b1f" strokeWidth={1.5} />
    <rect x={-82} y={-110} width={164} height={46} rx={4} fill="#9eb09c" stroke="#1d241d" strokeWidth={2} />
    <g transform="translate(10,-103)">
      <NumberRow num={val} x={0} y={0} w={16} h={28} sw={3.2} />
    </g>
    {/* 4x4 keypad */}
    {Array.from({ length: 16 }).map((_, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      const active = i === pressKey;
      return (
        <rect
          key={i}
          x={-84 + c * 44}
          y={-36 + r * 44 + (active ? 3 : 0)}
          width={34}
          height={30}
          rx={5}
          fill={c === 3 ? "#8c523e" : "#6c737c"}
          stroke="#181b1f"
          strokeWidth={2}
        />
      );
    })}
  </g>
);

/* ─────────── S1 · wide-to-medium push into the junkyard onto the waiting car ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const e = easeInOut(t);
  const cam: Cam = {
    x: lerp(-1.4, -0.35, e),
    y: lerp(2.15, 1.48, e),
    z: lerp(-1.2, 1.35, e),
    f: lerp(1120, 1280, e),
    shiftY: lerp(65, 38, e),
    focus: 6,
    aperture: 0.3,
  };

  // Jesse leans impatiently against the nose of the parked car, checking his wrist then looking down the dirt track
  const check = Math.sin(clamp((g - B(617.2)) / 55) * Math.PI);
  const poseJ: Pose = {
    torso: -6,
    neck: lerp(4, -5, check),
    shL: -14,
    shR: lerp(22, 42, check),
    elL: 50,
    elR: lerp(46, 74, check),
    hipL: 8, hipR: -4, knL: 10, knR: 4,
    breathe: breath(g, 0.08),
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
        <CarBody cam={cam} x={4.4} z={7.8} rot={-4} wheels={1} pal="#8a745d" />
        <CarBody cam={cam} x={-5.2} z={7.4} rot={3} wheels={2} open={0.45} pal="#67757d" />

        {/* The parked waiting sedan (sage-beige) with Walt visible at the wheel */}
        <Card cam={cam} x={-0.65} y={0} z={5.4} blur={false}>
          <Coupe color="#7f876d" shade="#4e5442" light="#a8b094" wheel={0} headlights={0} tail={0.15} />
        </Card>

        {/* Jesse leaning by the front bumper in the sun */}
        <Card cam={cam} x={1.55} y={0} z={5.15} flip blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.38} />
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.18 + blink(g, 5) * 0.45,
              lookX: lerp(0.28, -0.25, check),
              lookY: lerp(0.05, 0.28, check),
              brow: 0.22,
              mouth: "flat",
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#fff3cf"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        <Dust cam={cam} f={g} n={26} x0={-8} x1={8} z0={2.5} z1={14} h={2.2} seed={5} color="#ebd8b5" />
        <YardFore />
        <Motes f={g} n={22} color="#fff2cf" seed={7} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · inside the waiting car cab: "Two kids through a good state college... 360,000." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const bgCam: Cam = {
    x: lerp(0.2, 0.35, easeInOut(t)),
    y: 1.38,
    z: 2.2,
    f: 1180,
    shiftY: -20,
    focus: 6,
    aperture: 0.3,
  };

  const write = prog(g, B(623.8), B(625.1), easeInOut);
  const speak = g > B(621.25) && g < B(625.1) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.46)) : 0;

  // Walt seated in driver's seat: left hand holds pocket calculator, right hand writes on yellow legal pad
  const poseW: Pose = chairSit({
    torso: lerp(6, 11, write),
    neck: lerp(4, 9, write),
    shL: 32,
    shR: lerp(34, 42, write) + 2 * Math.sin(f * 0.45) * write,
    elL: 58,
    elR: lerp(52, 42, write),
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: breath(g, 0.075),
  });

  // Jesse pacing outside past the passenger window
  const jx = lerp(2.2, 0.85, easeInOut(t));
  const poseJ = walkPose(f * 0.06, 0.85, { torso: 3, shL: -10, shR: -10, elL: 46, elR: 44 });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Exterior junkyard seen through the car windows */}
        <YardSky cam={bgCam} f={g} />
        <YardBack cam={bgCam} f={g} />
        <YardGround cam={bgCam} f={g} />
        <CarStack cam={bgCam} x={-3.8} z={11.5} seed={2} />
        <CarStack cam={bgCam} x={4.6} z={10.8} seed={5} />
        <Card cam={bgCam} x={jx} y={0} z={6.8} flip blur={false}>
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({ yaw: 0.22, lids: 0.18 + blink(g, 4) * 0.4, lookX: 0.2, lookY: 0.05, brow: 0.2, mouth: "flat" })}
            pal={PAL_P}
            height={PARTNER.height}
            outfit="hoodie"
          />
        </Card>
        {/* subtle sun-warmed windshield tint */}
        <rect x={0} y={0} width={W} height={H} fill="#e8dfc8" opacity={0.1} />

        {/* Car cabin back layer */}
        <WaitingCabBack />

        {/* Walt in driver's seat (scaled in cab space) */}
        <g transform="translate(470,1320) scale(610)">
          <Figure
            pose={poseW}
            view={0.56}
            look={teacherLook({
              yaw: 0.22,
              lids: 0.2 + blink(g, 3) * 0.45,
              lookX: 0.34,
              lookY: lerp(0.18, 0.36, write),
              brow: 0.12,
              mouth: speak > 0 ? "open" : "flat",
              mouthOpen: 0.14 * speak,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff0c2"
            rimSide={1}
          />
        </g>

        {/* Top corner of the yellow legal pad propped against the steering wheel */}
        <g transform="translate(835,845) rotate(-10)">
          <rect x={-125} y={-95} width={250} height={180} rx={3} fill="#f5e58e" stroke="#6b5f2e" strokeWidth={2.5} />
          <rect x={-125} y={-95} width={250} height={22} fill="#6e2a26" stroke="#2c110f" strokeWidth={2} />
          {write > 0.3 && <line x1={-95} y1={-42} x2={lerp(-95, 75, write)} y2={-42} stroke="#1d2847" strokeWidth={3} />}
        </g>

        <WaitingCabFore />
        <Motes f={g} n={18} color="#fff2cf" seed={4} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.065} shadow="#3a2a10" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · close-up steering-wheel insert: calculator + yellow pad (360, 137, 2000x10yr) ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const l2 = clamp((g - B(626.35)) / (B(628.25) - B(626.35)));
  const l3Wave = clamp((g - B(630.0)) / (B(633.2) - B(630.0)));

  const calcVal = g < B(627.4) ? "360" : g < B(631.9) ? "137" : "240";
  const keyIdx = g > B(627.1) && g < B(627.8) ? Math.floor(f / 4) % 12 : g > B(631.7) && g < B(632.9) ? (Math.floor(f / 4) + 3) % 12 : -1;
  const thumbTap = keyIdx >= 0 ? Math.abs(Math.sin(f * 0.7)) * 10 : 0;

  // Pen trajectory across Row 2 ("137") then Row 3 shorthand wave
  const onRow3 = g >= B(629.8);
  const px = onRow3 ? lerp(830, 1040, l3Wave) : lerp(825, 1175, l2);
  const py = (onRow3 ? 535 : 468) + Math.sin(f * 0.75) * 4 * (l2 > 0 && l2 < 1 ? 1 : l3Wave > 0 && l3Wave < 1 ? 1 : 0);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Dashboard leather & steering wheel backdrop */}
        <rect x={0} y={0} width={W} height={H} fill="#2b2621" />
        <path d="M0,0 L1920,0 L1920,260 Q960,340 0,280 Z" fill="#3a332b" stroke="#171411" strokeWidth={3} />
        {/* steering wheel rim arc & center horn pad */}
        <circle cx={960} cy={690} r={540} fill="none" stroke="#1b1917" strokeWidth={74} />
        <circle cx={960} cy={690} r={540} fill="none" stroke="#3c3732" strokeWidth={10} opacity={0.45} />
        <rect x={680} y={560} width={560} height={240} rx={42} fill="#23201d" stroke="#12100e" strokeWidth={4} />
        {/* warm daylight band across the pad */}
        <polygon points="340,0 1680,0 1480,1080 180,1080" fill="#ffe9ba" opacity={0.07} />

        {/* Yellow legal pad propped on the steering wheel */}
        <LegalPad l1={1} l2={l2} l3Wave={l3Wave} l3Num={0} bar={0} total={0} under={0} />

        {/* Pocket calculator + Walt's articulated left hand (true 1:1 human scale ~2400 px/m) */}
        <g transform="translate(455,645) rotate(-12)">
          <PocketCalc val={calcVal} pressKey={keyIdx} />
          <g transform={`translate(-135,${175 - thumbTap}) rotate(34) scale(-2300,2300)`}>
            <HandBack pal={PAL_T} curl={0.52} thumb={0.68} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.65} />
          </g>
        </g>

        {/* Walt's articulated right hand + ballpoint pen writing on the legal pad (true 1:1 human scale) */}
        <g transform={`translate(${px + 255},${py + 285}) rotate(-32) scale(2450)`}>
          <g transform="translate(-0.048,-0.072) rotate(-32)">
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.165} rx={0.003} fill="#253b59" stroke="#101824" strokeWidth={0.0025} />
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.032} fill="#aeb8c2" stroke="#101824" strokeWidth={0.002} />
            <polygon points="-0.004,-0.055 0.004,-0.055 0,-0.074" fill="#c9ae6a" stroke="#101824" strokeWidth={0.0018} />
            <circle cx={0} cy={-0.075} r={0.0018} fill="#192347" />
          </g>
          <HandBack pal={PAL_T} curl={0.76} thumb={0.84} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.65} />
        </g>

        <Motes f={g} n={14} color="#fff2cf" seed={9} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#2c1f0c" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · tight cab close-up on Walt: "...so his wife isn't destitute the week after the funeral..." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const pause = prog(g, B(634.9), B(635.9), easeInOut);
  const bgCam: Cam = { x: 0.4, y: 1.4, z: 2.6, f: 1320, shiftY: -10, focus: 7, aperture: 0.3 };

  const poseW: Pose = chairSit({
    torso: lerp(10, 6, pause),
    neck: lerp(8, 2, pause),
    shL: 30,
    shR: lerp(40, 32, pause),
    elL: 58,
    elR: lerp(44, 54, pause),
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: breath(g, 0.065),
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <YardSky cam={bgCam} f={g} />
        <YardBack cam={bgCam} f={g} />
        <YardGround cam={bgCam} f={g} />
        <CarStack cam={bgCam} x={3.8} z={10.2} seed={3} />
        <rect x={0} y={0} width={W} height={H} fill="#e8dfc8" opacity={0.12} />
        <WaitingCabBack />

        {/* Tighter push on Walt's upper body & glasses */}
        <g transform={`translate(${lerp(560, 585, easeInOut(t))},1560) scale(${lerp(760, 795, easeInOut(t))})`}>
          <Figure
            pose={poseW}
            view={0.54}
            look={teacherLook({
              yaw: 0.2,
              lids: lerp(0.2, 0.34, pause) + blink(g, 6) * 0.4,
              lookX: lerp(0.32, 0.18, pause),
              lookY: lerp(0.32, 0.08, pause),
              brow: lerp(0.14, 0.34, pause),
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff1c4"
            rimSide={1}
          />
        </g>

        <WaitingCabFore />
        <Motes f={g} n={16} color="#fff2cf" seed={3} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#3a2a10" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · tight legal-pad insert: "+ 240" -> sum bar -> bold "737" double-underlined ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const l3Num = clamp((g - B(636.75)) / (B(637.55) - B(636.75)));
  const bar = clamp((g - B(638.25)) / (B(638.85) - B(638.25)));
  const total = clamp((g - B(639.35)) / (B(640.35) - B(639.35)));
  const under = clamp((g - B(640.45)) / (B(641.25) - B(640.45)));

  const calcVal = g < B(638.9) ? "240" : "737";

  // Pen trajectory: 240 -> sum bar -> 737 -> double underline
  let px = lerp(1100, 1210, l3Num);
  let py = 530;
  if (g >= B(638.2) && g < B(639.2)) {
    px = lerp(1070, 1230, bar);
    py = 582;
  } else if (g >= B(639.2) && g < B(640.45)) {
    px = lerp(1090, 1235, total);
    py = 626 + Math.sin(f * 0.8) * 4;
  } else if (g >= B(640.45)) {
    px = lerp(1080, 1235, (under * 2) % 1);
    py = under < 0.5 ? 672 : 684;
  }

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <rect x={0} y={0} width={W} height={H} fill="#2b2621" />
        <path d="M0,0 L1920,0 L1920,260 Q960,340 0,280 Z" fill="#3a332b" stroke="#171411" strokeWidth={3} />
        <circle cx={960} cy={690} r={540} fill="none" stroke="#1b1917" strokeWidth={74} />
        <rect x={680} y={560} width={560} height={240} rx={42} fill="#23201d" stroke="#12100e" strokeWidth={4} />
        <polygon points="340,0 1680,0 1480,1080 180,1080" fill="#ffe9ba" opacity={0.08} />

        <LegalPad l1={1} l2={1} l3Wave={1} l3Num={l3Num} bar={bar} total={total} under={under} />

        <g transform="translate(455,645) rotate(-12)">
          <PocketCalc val={calcVal} pressKey={-1} />
          <g transform="translate(-135,175) rotate(34) scale(-2300,2300)">
            <HandBack pal={PAL_T} curl={0.52} thumb={0.65} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.65} />
          </g>
        </g>

        <g transform={`translate(${px + 255},${py + 285}) rotate(-32) scale(2450)`}>
          <g transform="translate(-0.048,-0.072) rotate(-32)">
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.165} rx={0.003} fill="#253b59" stroke="#101824" strokeWidth={0.0025} />
            <rect x={-0.0055} y={-0.055} width={0.011} height={0.032} fill="#aeb8c2" stroke="#101824" strokeWidth={0.002} />
            <polygon points="-0.004,-0.055 0.004,-0.055 0,-0.074" fill="#c9ae6a" stroke="#101824" strokeWidth={0.0018} />
            <circle cx={0} cy={-0.075} r={0.0018} fill="#192347" />
          </g>
          <HandBack pal={PAL_T} curl={0.76} thumb={0.84} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.65} />
        </g>

        <Motes f={g} n={14} color="#fff2cf" seed={6} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#2c1f0c" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ─────────── S6 · exterior medium two-shot: "Not a fortune. A comfortable widow." ─────────── */
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s6;
  const dur = CUTS.end - CUTS.s6;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.18, -0.06, easeInOut(t)),
    y: 1.46,
    z: lerp(1.45, 1.25, easeInOut(t)),
    f: 1350,
    shiftY: 38,
    focus: 3.4,
    aperture: 0.3,
  };

  const gesture = prog(g, B(641.8), B(643.1), easeOut);
  const settle = prog(g, B(643.7), B(644.9), easeInOut);

  // Walt stands beside the car holding the yellow legal pad at his chest, gesturing calmly toward Jesse
  const poseW: Pose = {
    torso: 4,
    neck: -2,
    shL: 28,
    shR: lerp(lerp(24, 38, gesture), 26, settle),
    elL: 58,
    elR: lerp(lerp(46, 36, gesture), 52, settle),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.07),
    slump: 0.12,
  };

  // Jesse opposite him, weight shifted, gesturing incredulously at the notepad then hooking thumb in hoodie
  const poseJ: Pose = {
    torso: lerp(-5, -2, settle),
    neck: lerp(4, -2, settle),
    shL: -12,
    shR: lerp(34, 18, settle),
    elL: 52,
    elR: lerp(42, 56, settle),
    hipL: 7, hipR: -5, knL: 8, knR: 4,
    breathe: breath(g, 0.08, 1.2),
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
        <CarStack cam={cam} x={-6.2} z={10.8} seed={1} />
        <CarStack cam={cam} x={5.4} z={11.2} seed={4} />

        {/* Waiting car parked just behind them */}
        <Card cam={cam} x={-1.55} y={0} z={5.45} blur={false}>
          <Coupe color="#7f876d" shade="#4e5442" light="#a8b094" wheel={0} headlights={0} tail={0.15} />
        </Card>

        {/* Walt on the left facing Jesse, holding the canary-yellow legal pad */}
        <Card cam={cam} x={-0.88} y={0} z={4.15} blur={false}>
          <ellipse cx={0.02} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.22,
              lids: 0.18 + blink(g, 3) * 0.45,
              lookX: 0.34,
              lookY: 0.04,
              brow: 0.08,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff3cf"
            rimSide={1}
          />
          {/* Held yellow legal pad at Walt's left forearm */}
          <g transform="translate(0.16,-1.04) rotate(14)">
            <rect x={-0.08} y={-0.11} width={0.16} height={0.22} fill="#f5e58e" stroke="#6b5f2e" strokeWidth={0.004} />
            <rect x={-0.08} y={-0.11} width={0.16} height={0.024} fill="#6e2a26" />
            <path d="M-0.05,-0.05 L0.05,-0.05 M-0.05,-0.01 L0.05,-0.01 M0.01,0.04 L0.06,0.04 M0.01,0.075 L0.06,0.075" stroke="#1d2847" strokeWidth={0.004} />
          </g>
        </Card>

        {/* Jesse on the right facing Walt */}
        <Card cam={cam} x={0.78} y={0} z={4.35} flip blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.065} fill="#59452e" opacity={0.4} />
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.16 + blink(g, 5) * 0.45,
              lookX: 0.32,
              lookY: -0.04,
              brow: 0.28,
              mouth: "flat",
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#fff3cf"
            rimSide={-1}
            outfit="hoodie"
          />
        </Card>

        <Dust cam={cam} f={g} n={22} x0={-6} x1={6} z0={2.5} z1={11} h={2.0} seed={2} color="#ebd8b5" />
        <YardFore />
        <Motes f={g} n={20} color="#fff2cf" seed={5} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#3a2a10" gradeO={0.13} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the yard"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 waiting in the car"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 360 and 137"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 after the funeral"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.s6 - CUTS.s5} name="S5 737 thousand"><S5 /></Sequence>
    <Sequence from={CUTS.s6} durationInFrames={CUTS.end - CUTS.s6} name="S6 comfortable widow"><S6 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.032} /></Sequence>
    <Sequence from={B(624.2)} durationInFrames={36}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.065} /></Sequence>
    <Sequence from={B(627.6)} durationInFrames={32}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.065} /></Sequence>
    <Sequence from={B(639.3)} durationInFrames={42}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.075} /></Sequence>
  </AbsoluteFill>
);
