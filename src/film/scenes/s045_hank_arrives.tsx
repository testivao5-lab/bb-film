// SCENE 045 · "hank-arrives" · set: desertDusk · narration 712.57s → 728.66s (16.09s) · batch B
// Narration:
//   He doesn't. He gets up and takes a rifle off the seat of a car. When a DEA agent's vehicle comes up
//   the road looking for a missing teenager's car with a tracker in it, he finds a man with a badge
//   instead of the two men who shot him.
// Staging:
//   S1 (712.57–715.05) Tight desert-dirt shot: the wounded distributor's eyes snap open ("He doesn't");
//                      clutching his bleeding gut, he hauls himself upright out of the dust ("He gets up").
//   S2 (715.05–717.75) Close-up into the open passenger seat of the maroon car: a black tactical rifle lies
//                      across the vinyl bench; his blood-smudged hand clamps around the receiver and lifts it.
//   S3 (717.75–722.35) Telephoto dusk road shot: cradling the assault rifle beside the fender, the distributor
//                      squints as a dark charcoal DEA vehicle crests the ruts in a plume of dust while Walt &
//                      Jesse drop low behind scrub rocks off-road.
//   S4 (722.35–725.35) Over-dash close-up inside the DEA vehicle: an electronic signal-strength tracker unit
//                      pulses bright red bars as the maroon car comes into view through the windshield.
//   S5 (725.35–728.66) Low-angle standoff reveal: the DEA brother-in-law steps out onto the dusk road, gold
//                      belt badge catching the sunset ("a man with a badge"), hand hovering near his holster
//                      as he faces the wounded gunman by the car.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook, BROTHER, brotherLook } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import { Sedan } from "../../props/d_vehicle";
import {
  DIST_DUSK, distDuskLook, duskTint, DuskDesert, DesertDitch,
  DesertShack, BarbedFence, DesertDuskFore, AssaultRifle, BeltBadge,
} from "../../env/b_shack";
import { SoftDefs, Puff } from "../../env/b_common";
import { walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 45, id: "hank-arrives", set: "desertDusk", cutIn: 712.57, cutOut: 728.66 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(728.66);
const CUTS = {
  s1: 0,
  s2: B(715.05),
  s3: B(717.75),
  s4: B(722.35),
  s5: B(725.35),
  end: END,
};

const PAL_T = duskTint(TEACHER.pal);
const PAL_P = duskTint(PARTNER.pal);
const PAL_B = duskTint(BROTHER.pal);

/* ─────────── S1 · "He doesn't. He gets up..." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const eyesOpen = prog(g, B(712.75), B(713.25), easeOut);
  const rise = prog(g, B(713.85), B(714.95), easeInOut);

  const cam: Cam = {
    x: lerp(0.18, 0.05, rise),
    y: lerp(0.88, 1.18, rise),
    z: 1.45,
    f: 1380,
    shiftY: lerp(-25, 8, rise),
    focus: 2.3,
    aperture: 0.25,
  };

  // Distributor hauling himself up from the dirt, left hand clutching his bleeding gut
  const poseD: Pose = {
    torso: lerp(54, 24, rise),
    neck: lerp(14, 4, rise),
    shL: 34,
    shR: lerp(52, 16, rise),
    elL: 68,
    elR: lerp(38, 42, rise),
    hipL: lerp(58, 16, rise),
    hipR: lerp(42, -8, rise),
    knL: lerp(78, 22, rise),
    knR: lerp(62, 14, rise),
    breathe: 0.85,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  const dustPt = project(cam, 0.15, 0.08, 3.65);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-10} x1={10} z={7.8} n={6} />
        <DesertShack cam={cam} x={2.6} z={11.5} doorOpen={0.95} glow={0.85} />

        <Card cam={cam} x={-3.4} y={0} z={6.4} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        <DesertDitch cam={cam} x={0.62} z={4.15} w={1.85} />

        {/* Blood stain left on the desert dirt */}
        <Card cam={cam} x={0.18} y={0.02} z={3.72} blur={false}>
          <ellipse cx={0} cy={0} rx={0.34} ry={0.09} fill="#4d0b10" opacity={0.88} />
        </Card>

        {/* Wounded distributor staggering upright out of the dust */}
        <Card cam={cam} x={0.12 - 0.18 * rise} y={lerp(-0.34, 0, rise)} z={3.62} flip blur={false}>
          <g transform={`rotate(${lerp(28, 0, rise)})`}>
            <Figure
              pose={poseD}
              view={0.58}
              look={distDuskLook({
                yaw: 0.24,
                lids: lerp(0.76, 0.08, eyesOpen),
                lookX: 0.36,
                lookY: lerp(0.18, -0.02, rise),
                brow: 0.9,
                mouth: "open",
                mouthOpen: 0.24 + 0.1 * rise,
              })}
              pal={DIST_DUSK.pal}
              height={DIST_DUSK.height}
              rimLight="#ffb469"
              rimSide={-1}
            />
            <path d={`M${ancD.head.x - 0.01},${ancD.head.y - 0.05} l0.036,0.046`} stroke="#851218" strokeWidth={0.015} strokeLinecap="round" />
            <ellipse cx={0.06} cy={-0.92} rx={0.088} ry={0.074} fill="#6e1017" opacity={0.92} />
          </g>
        </Card>

        {rise > 0.15 && rise < 0.85 && (
          <Puff x={dustPt.x} y={dustPt.y} r={32 + rise * 45} o={0.38 * Math.sin(rise * Math.PI)} seed={4} />
        )}

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={18} color="#e8a87c" seed={3} drift={0.7} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...and takes a rifle off the seat of a car." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const reach = prog(g, B(715.15), B(715.85), easeOut);
  const grip = prog(g, B(715.75), B(716.25), easeInOut);
  const lift = prog(g, B(716.3), B(717.55), easeInOut);

  const rifleX = 935 + 65 * lift;
  const rifleY = 675 - 195 * lift;
  const rifleRot = lerp(-5, -18, lift);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Open car door frame + warm vinyl bench seat interior at dusk */}
        <rect x={0} y={0} width={W} height={H} fill="#1b1216" />
        {/* Rear window dusk glow */}
        <polygon points="240,0 1680,0 1560,255 340,255" fill="#7d4354" opacity={0.75} />
        <polygon points="240,140 1680,140 1560,255 340,255" fill="#e0895e" opacity={0.65} />

        {/* Maroon roof pillar & door sill */}
        <polygon points="0,0 350,0 245,1080 0,1080" fill="#421e24" stroke="#12080a" strokeWidth={6} />
        <rect x={0} y={935} width={W} height={145} fill="#2e1519" stroke="#12080a" strokeWidth={5} />

        {/* Tan pleated vinyl bench backrest & seat cushion */}
        <polygon points="260,255 1760,255 1860,615 215,615" fill="#6e503c" stroke="#1f1510" strokeWidth={5} />
        {[520, 820, 1120, 1420].map((sx, i) => (
          <line key={i} x1={sx} y1={262} x2={sx - 24} y2={608} stroke="#4a3426" strokeWidth={4} opacity={0.75} />
        ))}
        <polygon points="215,615 1860,615 1920,935 180,935" fill="#85624a" stroke="#1f1510" strokeWidth={5} />
        <polygon points="215,615 1860,615 1885,675 200,675" fill="#9c765b" opacity={0.55} />

        {/* Rifle shadow on the vinyl cushion (fades as rifle is lifted) */}
        <ellipse
          cx={940}
          cy={715}
          rx={470}
          ry={42}
          fill="#000"
          opacity={0.42 * (1 - lift * 0.75)}
        />

        {/* Matte-black tactical assault rifle resting on the seat, then hoisted up */}
        <g transform={`translate(${rifleX},${rifleY})`}>
          <AssaultRifle rot={rifleRot} s={1580} />
        </g>

        {/* Distributor's dark-sleeved articulated hand reaching in, clamping the receiver & lifting */}
        <g
          transform={`translate(${lerp(1520, 1020, reach) + 65 * lift},${lerp(280, 485, reach) - 195 * lift}) rotate(${lerp(148, 158, grip)}) scale(2420)`}
        >
          <HandBack
            pal={DIST_DUSK.pal}
            curl={lerp(0.22, 0.82, grip)}
            thumb={lerp(0.35, 0.84, grip)}
            sleeve={DIST_DUSK.pal.jacket}
            sleeveShade={DIST_DUSK.pal.jacketShade}
            cuff={DIST_DUSK.pal.shirt}
            forearm={0.92}
          />
        </g>

        <Motes f={g} n={16} color="#f0ae78" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#1b0e12" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "When a DEA agent's vehicle comes up the road..." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const e = easeOut(t);
  const cam: Cam = {
    x: lerp(0.35, 0.15, easeInOut(t)),
    y: 1.32,
    z: 0.55,
    f: 1420,
    shiftY: 36,
    focus: 8.5,
    aperture: 0.2,
  };

  // DEA charcoal SUV/sedan cresting the desert road from far distance
  const suvZ = lerp(24, 9.2, e);
  const suvX = lerp(-1.8, -0.95, e);
  const dustPt = project(cam, suvX - 1.8, 0.25, suvZ + 1.2);

  // Distributor leaning against the maroon car fender in right foreground cradling the assault rifle
  const poseD: Pose = {
    torso: 12,
    neck: -4,
    shL: 42,
    shR: 28,
    elL: 48,
    elR: 54,
    hipL: 8,
    hipR: -6,
    knL: 14,
    knR: 10,
    breathe: 0.85,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.56);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-14} x1={14} z={12.5} n={8} />

        {/* Dust plume trailing behind the approaching DEA vehicle */}
        <Puff x={dustPt.x - 35} y={dustPt.y} r={48 + 34 * e} o={0.42} seed={8} />
        <Puff x={dustPt.x - 95} y={dustPt.y - 12} r={64 + 42 * e} o={0.28} seed={14} />

        {/* Approaching charcoal DEA vehicle with bright headlights */}
        <Card cam={cam} x={suvX} y={0} z={suvZ} blur={false}>
          <Sedan
            body="#2a323d"
            shade="#171c24"
            light="#5c6c80"
            head={1}
            tail={0.3}
            wheel={f * 14}
            bounce={Math.sin(f * 0.45) * 0.015}
            sedan={false}
          />
        </Card>

        {/* Walt & Jesse ducking low behind desert scrub & boulders off to the left */}
        <Card cam={cam} x={-4.2} y={-0.38} z={8.2} blur={false}>
          <Figure
            pose={{ torso: 36, neck: -8, shL: 24, shR: 28, elL: 58, elR: 54, hipL: 52, hipR: 48, knL: 82, knR: 78, breathe: 0.5 }}
            view={0.56}
            look={teacherLook({ yaw: 0.22, lids: 0.12, lookX: 0.35, brow: 0.55, mouth: "flat" })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>
        <Card cam={cam} x={-4.85} y={-0.42} z={8.45} blur={false}>
          <Figure
            pose={{ torso: 40, neck: -10, shL: 26, shR: 32, elL: 62, elR: 58, hipL: 56, hipR: 52, knL: 86, knR: 82, breathe: 0.5 }}
            view={0.56}
            look={partnerLook({ yaw: 0.22, lids: 0.12, lookX: 0.35, brow: 0.62, mouth: "flat" })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>
        {/* Desert boulder concealing Walt & Jesse from the road */}
        <Card cam={cam} x={-4.35} y={0} z={7.85} blur={false}>
          <polygon points="-0.95,0 -0.78,-0.62 -0.15,-0.78 0.58,-0.66 0.92,0" fill="#5e3f2d" stroke="#1f130d" strokeWidth={0.025} />
        </Card>

        {/* Parked maroon car at right foreground + wounded distributor holding the assault rifle */}
        <Card cam={cam} x={2.65} y={0} z={4.85} flip blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        <Card cam={cam} x={1.15} y={0} z={4.35} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={distDuskLook({ yaw: 0.24, lids: 0.22, lookX: 0.4, brow: 0.85, mouth: "flat" })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={1}
          />
          <ellipse cx={0.01} cy={-1.08} rx={0.08} ry={0.068} fill="#6e1017" opacity={0.92} />
          <g transform={`translate(${ancD.wristR.x + 0.06},${ancD.wristR.y - 0.04})`}>
            <AssaultRifle rot={-18} s={1.05} />
          </g>
        </Card>

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={20} color="#e8a87c" seed={9} drift={0.7} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "...looking for a missing teenager's car with a tracker in it..." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const pulse = 0.5 + 0.5 * Math.sin(f * 0.55);
  const barsLit = Math.min(8, 5 + Math.floor(t * 4));

  const cam: Cam = {
    x: 0,
    y: 1.35,
    z: lerp(-1.2, 0.4, easeOut(t)),
    f: 1320,
    shiftY: -45,
    focus: 8,
    aperture: 0.2,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* View through the DEA vehicle's windshield: dusk desert, shack, & the tracked maroon car */}
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={10.5} n={7} />
        <DesertShack cam={cam} x={3.2} z={13.8} doorOpen={0.95} glow={0.85} />

        {/* Tracked maroon car parked ahead in front of the shack */}
        <Card cam={cam} x={-0.45} y={0} z={8.8} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>
        {/* Wounded distributor standing beside the car ahead */}
        <Card cam={cam} x={1.45} y={0} z={8.6} flip blur={false}>
          <Figure
            pose={{ torso: 10, neck: 2, shL: 36, shR: 26, elL: 48, elR: 52, hipL: 6, hipR: -5, knL: 10, knR: 8, breathe: 0.7 }}
            view={0.56}
            look={distDuskLook({ yaw: 0.2, lids: 0.18, lookX: 0.3, brow: 0.8 })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>

        {/* Windshield A-pillars, rearview mirror & dark charcoal dashboard */}
        <polygon points="0,0 165,0 85,740 0,740" fill="#12151a" />
        <polygon points="1755,0 1920,0 1920,740 1835,740" fill="#12151a" />
        <rect x={0} y={0} width={W} height={46} fill="#101318" />
        <rect x={820} y={38} width={280} height={68} rx={12} fill="#181c22" stroke="#090b0e" strokeWidth={4} />

        {/* Subtle windshield glass sheen */}
        <polygon points="180,60 440,60 260,680 95,680" fill="#ffd4a8" opacity={0.05} />

        {/* Molded charcoal dashboard cowl */}
        <path d="M0,705 Q960,645 1920,705 L1920,1080 L0,1080 Z" fill="#1b2028" stroke="#0b0d11" strokeWidth={5} />
        <path d="M220,735 Q540,655 860,735 Z" fill="#12161c" stroke="#090b0e" strokeWidth={4} />
        {/* Steering wheel upper rim at left */}
        <path d="M245,1080 A310,310 0 0 1 835,1080" fill="none" stroke="#111419" strokeWidth={52} />

        {/* Electronic LoJack signal-homing tracker unit mounted center-dash (zero show text: pure LED bars + directional arrows) */}
        <g transform="translate(1165,675)">
          {/* Twin whip antennas */}
          <line x1={-120} y1={-32} x2={-135} y2={-165} stroke="#3c434e" strokeWidth={6} strokeLinecap="round" />
          <line x1={120} y1={-32} x2={135} y2={-165} stroke="#3c434e" strokeWidth={6} strokeLinecap="round" />
          <circle cx={-135} cy={-168} r={7} fill="#6c7685" />
          <circle cx={135} cy={-168} r={7} fill="#6c7685" />

          {/* Rugged matte-black housing */}
          <rect x={-195} y={-42} width={390} height={168} rx={14} fill="#232830" stroke="#0a0c10" strokeWidth={5} />
          <rect x={-172} y={-22} width={344} height={96} rx={8} fill="#0d1214" stroke="#363e4a" strokeWidth={3} />

          {/* Directional forward lock arrow */}
          <polygon
            points="0,-12 24,14 9,14 9,34 -9,34 -9,14 -24,14"
            fill="#ff4638"
            opacity={0.65 + 0.35 * pulse}
          />

          {/* 8-segment signal strength LED bar graph */}
          {Array.from({ length: 8 }).map((_, i) => {
            const lit = i < barsLit;
            const col = i < 4 ? "#4ad66d" : i < 6 ? "#f5b838" : "#ff3b30";
            return (
              <rect
                key={i}
                x={-148 + i * 38}
                y={46 - i * 3}
                width={26}
                height={18 + i * 3}
                rx={3}
                fill={lit ? col : "#1c2426"}
                opacity={lit ? (i === barsLit - 1 ? 0.55 + 0.45 * pulse : 0.95) : 0.45}
              />
            );
          })}

          {/* Rotary squelch knobs */}
          <circle cx={-135} cy={100} r={14} fill="#3a414d" stroke="#0d1014" strokeWidth={3} />
          <circle cx={135} cy={100} r={14} fill="#3a414d" stroke="#0d1014" strokeWidth={3} />
          <circle cx={0} cy={100} r={7} fill="#ff3b30" opacity={0.45 + 0.55 * pulse} />
        </g>

        {/* Agent's tan-sleeved hand shifting vehicle into park */}
        <g transform={`translate(${lerp(855, 895, easeOut(t))},${lerp(945, 905, easeOut(t))}) rotate(-28) scale(2150)`}>
          <HandBack
            pal={PAL_B}
            curl={0.65}
            thumb={0.7}
            sleeve={PAL_B.jacket}
            sleeveShade={PAL_B.jacketShade}
            cuff={PAL_B.shirt}
            forearm={0.65}
          />
        </g>
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#1b1218" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "...he finds a man with a badge instead of the two men who shot him." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const stepStop = prog(f, 0, 38, easeOut);
  const badgeGlint = Math.sin(clamp((g - B(726.15)) / 18) * Math.PI);

  const cam: Cam = {
    x: lerp(-0.15, 0.08, easeInOut(t)),
    y: 1.18,
    z: lerp(0.85, 1.15, easeInOut(t)),
    f: 1380,
    shiftY: 6,
    focus: 3.8,
    aperture: 0.22,
  };

  // DEA Brother-in-law stepping out & planting his stance, right hand hovering over his hip holster
  const walkAmt = 1 - stepStop;
  const baseWalk = walkPose(f * 0.055, walkAmt);
  const poseB: Pose = {
    ...baseWalk,
    torso: lerp(baseWalk.torso, 3, stepStop),
    neck: 2,
    shL: lerp(baseWalk.shL, 18, stepStop),
    shR: lerp(baseWalk.shR, -14, stepStop),
    elL: lerp(baseWalk.elL, 38, stepStop),
    elR: lerp(baseWalk.elR, 52, stepStop),
    hipL: lerp(baseWalk.hipL, 8, stepStop),
    hipR: lerp(baseWalk.hipR, -8, stepStop),
    knL: lerp(baseWalk.knL, 6, stepStop),
    knR: lerp(baseWalk.knR, 6, stepStop),
    breathe: 0.7,
  };
  const ancB = rigAnchors(poseB, BROTHER.height, 0.58);

  // Wounded distributor across the yard by the maroon car, rifle held low & tense behind his thigh
  const poseD: Pose = {
    torso: 12,
    neck: 3,
    shL: 34,
    shR: 18,
    elL: 58,
    elR: 34,
    hipL: 8,
    hipR: -6,
    knL: 12,
    knR: 10,
    breathe: 0.85,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.56);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={9.5} n={7} />
        <DesertShack cam={cam} x={3.1} z={12.8} doorOpen={0.95} glow={0.85} />

        {/* Parked maroon coupe & wounded distributor in right midground */}
        <Card cam={cam} x={2.65} y={0} z={6.8} flip blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        <Card cam={cam} x={1.28} y={0} z={5.85} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={distDuskLook({ yaw: 0.22, lids: 0.16, lookX: 0.36, brow: 0.85, mouth: "flat" })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          <ellipse cx={0.01} cy={-1.08} rx={0.078} ry={0.066} fill="#6e1017" opacity={0.92} />
          <g transform={`translate(${ancD.wristR.x + 0.04},${ancD.wristR.y - 0.02})`}>
            <AssaultRifle rot={22} s={0.98} />
          </g>
        </Card>

        {/* Agent's charcoal DEA vehicle parked at left */}
        <Card cam={cam} x={-2.85} y={0} z={5.35} blur={false}>
          <Sedan body="#2a323d" shade="#171c24" light="#5c6c80" head={0.85} tail={0.4} driver={false} sedan={false} />
        </Card>

        {/* Hero reveal: DEA Brother-in-law stepping forward with gleaming gold belt badge & sidearm holster */}
        <Card cam={cam} x={lerp(-0.92, -0.58, stepStop)} y={0} z={3.95} blur={false}>
          <Figure
            pose={poseB}
            view={0.58}
            look={brotherLook({
              yaw: 0.24,
              lids: 0.12 + blink(g, 4) * 0.4,
              lookX: 0.36,
              lookY: -0.02,
              brow: 0.52,
              mouth: "flat",
            })}
            pal={PAL_B}
            height={BROTHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
          {/* Holstered sidearm at right hip + gleaming gold DEA belt badge */}
          <rect x={ancB.pelvis.x - 0.09} y={ancB.pelvis.y - 0.04} width={0.048} height={0.095} rx={0.008} fill="#1f1c1a" stroke="#0c0a09" strokeWidth={0.005} />
          <g transform={`translate(${ancB.pelvis.x + 0.075},${ancB.pelvis.y - 0.035})`}>
            <BeltBadge glint={badgeGlint} />
          </g>
        </Card>

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={20} color="#e8a87c" seed={11} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 he gets up"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 rifle off the seat"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 vehicle comes up the road"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 tracker in it"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 man with a badge"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.07} /></Sequence>
    <Sequence from={B(716.0)} durationInFrames={28}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={160}><Audio src={staticFile("sfx/engine.wav")} volume={0.08} /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={85}><Audio src={staticFile("sfx/car_interior.wav")} volume={0.06} /></Sequence>
  </AbsoluteFill>
);
