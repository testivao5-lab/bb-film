// SCENE 044 · "run" · set: desertDusk · narration 699.42s → 712.57s (13.15s) · batch B
// Narration:
//   The two of them run. There is barbed wire, a rock in Jesse's hand that goes into the side of Tuco's
//   head, and a gun in Jesse's hand that goes into his stomach. They leave him bleeding in the dirt to die
//   on his own.
// Staging:
//   S1 (699.42–701.65) Shack exterior dusk: the door flies wide open as Walt & Jesse sprint out into the
//                      desert scrub while the distributor storms onto the porch firing after them.
//   S2 (701.65–704.15) Tight ground-level close-up under taut barbed wire: as the distributor's boots close
//                      in, Jesse's olive-sleeved hand scrambles across the gravel and grips a jagged desert rock.
//   S3 (704.15–706.45) Close desert struggle: Jesse swings the heavy rock hard into the side of the
//                      distributor's head (705.25s), staggering him sideways with a dust burst and temple cut.
//   S4 (706.45–709.45) Low-angle reverse: Jesse levels the fallen pistol in both trembling hands and fires
//                      into the distributor's stomach (708.65s — muzzle flash + smoke puff), doubling him over.
//   S5 (709.45–712.57) Wide dusk tableau: the wounded distributor lies bleeding beside the shallow desert ditch
//                      in the foreground while Walt & Jesse hurry away up the twilight road behind him.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import {
  DIST_DUSK, distDuskLook, duskTint, DuskDesert, DesertDitch,
  DesertShack, BarbedFence, DesertDuskFore,
} from "../../env/b_shack";
import { SoftDefs, Puff, Birds } from "../../env/b_common";
import { walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

const camShake = (f: number, hit: number, dur: number, amp: number) => {
  if (f < hit || f > hit + dur) return { x: 0, y: 0 };
  const decay = (1 - (f - hit) / dur) * amp;
  return { x: Math.sin((f - hit) * 2.4) * decay, y: Math.cos((f - hit) * 3.1) * decay * 0.7 };
};

export const META = { n: 44, id: "run", set: "desertDusk", cutIn: 699.42, cutOut: 712.57 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(712.57);
const CUTS = {
  s1: 0,
  s2: B(701.65),
  s3: B(704.15),
  s4: B(706.45),
  s5: B(709.45),
  end: END,
};

const PAL_T = duskTint(TEACHER.pal);
const PAL_P = duskTint(PARTNER.pal);

/** Heavy dark pistol in metre space */
const Pistol: React.FC<{ rot?: number; flash?: number }> = ({ rot = 0, flash = 0 }) => (
  <g transform={`rotate(${rot})`}>
    <rect x={-0.02} y={-0.034} width={0.185} height={0.04} rx={0.005} fill="#3c424a" stroke="#0d0f12" strokeWidth={0.006} />
    <line x1={-0.01} y1={-0.024} x2={0.155} y2={-0.024} stroke="#838e9c" strokeWidth={0.006} />
    <path d="M-0.015,0.004 L0.032,0.004 L0.012,0.095 L-0.036,0.09 Z" fill="#262220" stroke="#0d0f12" strokeWidth={0.006} />
    {flash > 0.05 && (
      <g transform="translate(0.175,-0.016)" opacity={flash}>
        <polygon points="0,-0.065 0.34,-0.018 0.14,0 0.38,0.034 0,0.068 0.05,0" fill="#ff9d2e" />
        <polygon points="0,-0.032 0.22,-0.006 0,0.035" fill="#fffbe0" />
      </g>
    )}
  </g>
);

/** Jagged desert cobble rock in metre space */
const DesertRock: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <polygon
      points="-0.068,-0.018 -0.032,-0.058 0.038,-0.052 0.074,-0.008 0.052,0.044 -0.018,0.052 -0.062,0.026"
      fill="#8c6248"
      stroke="#24160f"
      strokeWidth={0.006}
    />
    <polygon points="-0.03,-0.052 0.035,-0.046 0.055,-0.006 -0.01,-0.004" fill="#b38262" opacity={0.65} />
  </g>
);

/* ─────────── S1 · "The two of them run." — bursting out of the shack into dusk ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2 - CUTS.s1;
  const t = f / dur;
  const shk = camShake(f, 34, 9, 4);
  const cam: Cam = {
    x: lerp(0.8, -0.5, easeInOut(t)) + shk.x * 0.01,
    y: 1.32 + shk.y * 0.008,
    z: lerp(1.2, 0.8, easeInOut(t)),
    f: 1260,
    shiftY: 32,
    focus: 6.5,
    aperture: 0.22,
  };

  const doorOpen = clamp(0.25 + f * 0.09);
  const waltX = lerp(1.55, -1.65, t);
  const waltZ = lerp(9.4, 5.4, t);
  const jesseX = lerp(1.25, -2.25, t);
  const jesseZ = lerp(9.1, 4.9, t);

  const distOut = prog(f, 14, 34, easeOut);
  const wildShot = Math.max(0, 1 - Math.abs(f - 34) / 3.5);

  const poseD: Pose = {
    torso: 12,
    neck: 4,
    shL: -12,
    shR: lerp(38, 68, distOut) + wildShot * 10,
    elL: 44,
    elR: 14,
    hipL: 16,
    hipR: -14,
    knL: 18,
    knR: 12,
    breathe: 0.9,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.62);

  const footPuff = project(cam, jesseX + 0.25, 0.05, jesseZ);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={8.8} n={7} />
        <DesertShack cam={cam} x={1.95} z={10.8} doorOpen={doorOpen} glow={0.95} />

        <Card cam={cam} x={-4.8} y={0} z={7.9} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        {/* Distributor bursting onto the shack porch firing after them */}
        {f > 10 && (
          <Card cam={cam} x={lerp(1.9, 1.25, distOut)} y={0} z={lerp(10.2, 9.2, distOut)} flip blur={false}>
            <Figure
              pose={poseD}
              view={0.62}
              look={distDuskLook({ yaw: 0.24, lids: 0.1, lookX: 0.4, brow: 0.85, mouth: "open", mouthOpen: 0.32 })}
              pal={DIST_DUSK.pal}
              height={DIST_DUSK.height}
              rimLight="#ffb469"
              rimSide={1}
            />
            <g transform={`translate(${ancD.wristR.x + 0.04},${ancD.wristR.y - 0.01})`}>
              <Pistol rot={-8} flash={wildShot} />
            </g>
          </Card>
        )}

        {/* Walt sprinting hard across the dusk desert */}
        <Card cam={cam} x={waltX} y={0} z={waltZ} flip blur={false}>
          <Figure
            pose={walkPose(f * 0.085, 1.55, { torso: 18, elL: 58, elR: 58 })}
            view={0.68}
            look={teacherLook({ yaw: 0.28, lids: 0.1, lookX: 0.35, brow: 0.65, mouth: "open", mouthOpen: 0.22 })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>

        {/* Jesse sprinting ahead kicking up desert dust */}
        <Card cam={cam} x={jesseX} y={0} z={jesseZ} flip blur={false}>
          <Figure
            pose={walkPose(f * 0.09 + 0.35, 1.65, { torso: 20, elL: 62, elR: 62 })}
            view={0.68}
            look={partnerLook({ yaw: 0.28, lids: 0.1, lookX: 0.38, brow: 0.72, mouth: "open", mouthOpen: 0.26 })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        <Puff x={footPuff.x} y={footPuff.y} r={34 + (f % 14) * 3} o={0.38} seed={3} />
        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={22} color="#e8a87c" seed={2} drift={1.2} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.075} shadow="#21121c" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "There is barbed wire, a rock in Jesse's hand..." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const reach = prog(g, B(702.25), B(703.05), easeOut);
  const clench = prog(g, B(702.95), B(703.55), easeInOut);
  const lift = prog(g, B(703.65), B(704.12), easeIn);

  const tremor = noise1(f * 0.6, 4) * 5;
  const bootStep = prog(f, 8, 42, easeOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Low-angle dusk sky strip at top + warm terracotta desert gravel floor */}
        <defs>
          <linearGradient id="s044LowDusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5d3859" />
            <stop offset="0.55" stopColor="#c76b52" />
            <stop offset="1" stopColor="#efb273" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={W} height={360} fill="url(#s044LowDusk)" />
        <polygon points="0,350 420,295 920,335 1480,285 1920,340 1920,380 0,380" fill="#472838" />
        <rect x={0} y={355} width={W} height={725} fill="#8a5d42" />
        <polygon points="0,520 1920,470 1920,1080 0,1080" fill="#6b4530" />

        {/* Pursuing distributor's dark trousers & boots striding closer behind the fence */}
        <g transform={`translate(${lerp(420, 620, bootStep)},${lerp(245, 295, bootStep)})`}>
          <polygon points="-55,-260 12,-260 28,95 -42,95" fill="#201d22" stroke="#0d0b0e" strokeWidth={4} />
          <polygon points="48,-260 115,-260 142,108 68,108" fill="#272329" stroke="#0d0b0e" strokeWidth={4} />
          <path d="M-48,92 L48,92 L58,122 L-52,122 Z" fill="#171312" stroke="#080707" strokeWidth={4} />
          <path d="M64,104 L166,104 L178,136 L60,136 Z" fill="#1c1715" stroke="#080707" strokeWidth={4} />
        </g>

        {/* Taut rusted barbed-wire strands cutting sharply across upper/mid frame */}
        {[215, 415].map((wy, row) => (
          <g key={row}>
            <line x1={0} y1={wy} x2={W} y2={wy + 26} stroke="#1d1614" strokeWidth={row === 1 ? 6 : 4.5} />
            <line x1={0} y1={wy - 1.5} x2={W} y2={wy + 24.5} stroke="#8f6650" strokeWidth={1.6} opacity={0.6} />
            {[240, 640, 1080, 1520].map((bx, bi) => {
              const by = wy + (bx / W) * 26;
              return (
                <g key={bi} stroke="#1d1614" strokeWidth={4.5} strokeLinecap="round">
                  <line x1={bx - 16} y1={by - 18} x2={bx + 16} y2={by + 18} />
                  <line x1={bx - 16} y1={by + 18} x2={bx + 16} y2={by - 18} />
                </g>
              );
            })}
          </g>
        ))}

        {/* Scattered gravel stones */}
        {[
          [320, 780, 26], [560, 890, 19], [1480, 820, 32], [1670, 710, 22], [820, 940, 24],
        ].map(([rx, ry, rr], i) => (
          <ellipse key={i} cx={rx} cy={ry} rx={rr} ry={rr * 0.58} fill="#543524" stroke="#26160e" strokeWidth={3} />
        ))}

        {/* Hero jagged desert cobble rock — clearly visible ahead of Jesse's gripping fingers */}
        <g
          transform={`translate(${835 - 28 * lift},${685 - 92 * lift}) rotate(${-16 * lift})`}
        >
          {lift < 0.4 && <ellipse cx={8} cy={68} rx={155} ry={48} fill="#000" opacity={0.38 * (1 - lift * 2)} />}
          <polygon
            points="-155,-38 -72,-128 86,-114 162,-18 118,96 -42,112 -140,56"
            fill="#8c6248"
            stroke="#1e110b"
            strokeWidth={7}
          />
          <polygon points="-68,-116 78,-102 122,-16 -24,-10" fill="#bf8b6a" opacity={0.72} />
          <line x1={-88} y1={22} x2={58} y2={42} stroke="#4a3020" strokeWidth={6} />
        </g>

        {/* Jesse's olive-hoodie articulated right hand lunging in & clenching around the right flank of the rock */}
        <g
          transform={`translate(${lerp(1440, 1115, reach) - 28 * lift + tremor},${lerp(920, 815, reach) - 92 * lift}) rotate(${lerp(-64, -56, clench)}) scale(2480)`}
        >
          <HandBack
            pal={PAL_P}
            curl={lerp(0.18, 0.78, clench)}
            thumb={lerp(0.32, 0.82, clench)}
            sleeve={PAL_P.jacket}
            sleeveShade={PAL_P.jacketShade}
            cuff={PAL_P.shirt}
            forearm={0.88}
          />
        </g>

        <Motes f={g} n={20} color="#f0ae78" seed={5} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f1116" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "...that goes into the side of Tuco's head..." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const hitFrame = B(705.25) - CUTS.s3;
  const swing = prog(f, hitFrame - 12, hitFrame, easeIn);
  const recoil = prog(f, hitFrame, hitFrame + 18, easeOut);
  const shk = camShake(f, hitFrame, 12, 14);

  const cam: Cam = {
    x: -0.05 + shk.x * 0.008,
    y: 1.24 + shk.y * 0.008,
    z: 1.35,
    f: 1420,
    shiftY: 8,
    focus: 2.4,
    aperture: 0.25,
  };

  // Jesse swinging the heavy rock high upward into the side of the distributor's temple
  const poseJ: Pose = {
    torso: lerp(-10, 14, swing) - 4 * recoil,
    neck: -4,
    shL: lerp(38, 22, swing),
    shR: lerp(-24, 128, swing) - 10 * recoil,
    elL: 52,
    elR: lerp(68, 22, swing) + 12 * recoil,
    hipL: 16,
    hipR: -14,
    knL: 22,
    knR: 16,
    breathe: 0.9,
  };
  const ancJ = rigAnchors(poseJ, PARTNER.height, 0.58);

  // Distributor lunging forward, then snapping sideways at temple impact & dropping pistol
  const poseD: Pose = {
    torso: lerp(16, -24, recoil),
    neck: lerp(6, -16, recoil),
    shL: lerp(54, 72, recoil),
    shR: lerp(48, -14, recoil),
    elL: lerp(24, 58, recoil),
    elR: lerp(22, 42, recoil),
    hipL: lerp(14, -8, recoil),
    hipR: lerp(-10, 18, recoil),
    knL: lerp(14, 24, recoil),
    knR: lerp(10, 22, recoil),
    breathe: 0.85,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  const hitPt = project(cam, 0.18, 1.56, 3.65);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-10} x1={10} z={6.4} n={6} />
        <DesertDitch cam={cam} x={0.45} z={4.35} w={1.8} />

        {/* Distributor reeling sideways from the rock blow to his temple (drawn behind Jesse's swinging arm) */}
        <Card cam={cam} x={0.44 + 0.34 * recoil} y={-0.06 * recoil} z={3.68} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={distDuskLook({
              yaw: 0.24,
              lids: recoil > 0.1 ? 0.65 : 0.1,
              lookX: 0.25,
              brow: 0.88,
              mouth: "open",
              mouthOpen: 0.36,
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          {/* Dark crimson temple cut appearing at impact */}
          {recoil > 0.08 && (
            <path
              d={`M${ancD.head.x - 0.01},${ancD.head.y - 0.05} l0.038,0.048`}
              stroke="#851218"
              strokeWidth={0.016}
              strokeLinecap="round"
            />
          )}
          {recoil < 0.12 ? (
            <g transform={`translate(${ancD.wristR.x + 0.03},${ancD.wristR.y})`}>
              <Pistol rot={12} />
            </g>
          ) : null}
        </Card>

        {/* Jesse at left swinging the jagged rock high into the side of the distributor's head */}
        <Card cam={cam} x={-0.36 + 0.16 * swing} y={0} z={3.58} blur={false}>
          <Figure
            pose={poseJ}
            view={0.58}
            look={partnerLook({ yaw: 0.26, lids: 0.12, lookX: 0.36, lookY: -0.14, brow: 0.85, mouth: "open", mouthOpen: 0.32 })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
          <g transform={`translate(${ancJ.wristR.x + 0.03},${ancJ.wristR.y - 0.03})`}>
            <DesertRock s={1.45} />
          </g>
        </Card>

        {/* Dropped pistol spinning down onto the desert dirt */}
        {recoil >= 0.12 && (
          <Card cam={cam} x={lerp(0.18, -0.05, recoil)} y={lerp(0.95, 0.04, recoil * recoil)} z={3.55} blur={false}>
            <Pistol rot={recoil * 165} />
          </Card>
        )}

        {/* Impact dust burst off the rock strike */}
        {f >= hitFrame && f < hitFrame + 18 && (
          <Puff x={hitPt.x} y={hitPt.y} r={26 + (f - hitFrame) * 7} o={0.55 * (1 - (f - hitFrame) / 18)} seed={7} />
        )}

        <DesertDuskFore variant="wire" />
        <Motes f={g} n={20} color="#e8a87c" seed={7} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "...and a gun in Jesse's hand that goes into his stomach." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const shotFrame = B(708.65) - CUTS.s4;
  const aim = prog(f, 0, 26, easeOut);
  const flash = Math.max(0, 1 - Math.abs(f - shotFrame) / 3.2);
  const gutHit = prog(f, shotFrame, shotFrame + 22, easeOut);
  const shk = camShake(f, shotFrame, 14, 16);

  const cam: Cam = {
    x: 0.06 + shk.x * 0.009,
    y: 1.08 + shk.y * 0.009,
    z: 1.18,
    f: 1380,
    shiftY: -12,
    focus: 2.5,
    aperture: 0.25,
  };

  // Jesse crouched low, gripping the heavy pistol in both trembling hands & firing at 708.65s
  const tremor = f < shotFrame ? noise1(f * 0.8, 3) * 2.2 : 0;
  const poseJ: Pose = {
    torso: lerp(14, 6, aim) - flash * 6,
    neck: -2,
    shL: lerp(28, 54, aim) + tremor + flash * 8,
    shR: lerp(32, 58, aim) + tremor + flash * 10,
    elL: 18,
    elR: 14,
    hipL: 24,
    hipR: -12,
    knL: 32,
    knR: 24,
    breathe: 0.9,
  };
  const ancJ = rigAnchors(poseJ, PARTNER.height, 0.58);

  // Bloodied distributor lunging forward, then doubling over clutching his stomach at gunshot
  const poseD: Pose = {
    torso: lerp(12, 38, gutHit),
    neck: lerp(4, 14, gutHit),
    shL: lerp(42, 26, gutHit),
    shR: lerp(46, 28, gutHit),
    elL: lerp(34, 68, gutHit),
    elR: lerp(32, 66, gutHit),
    hipL: lerp(14, 28, gutHit),
    hipR: lerp(-10, 22, gutHit),
    knL: lerp(12, 42, gutHit),
    knR: lerp(10, 38, gutHit),
    breathe: 0.8,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  const muzzlePt = project(cam, -0.45 + ancJ.wristR.x + 0.18, ancJ.wristR.y - 0.04, 3.55);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-10} x1={10} z={6.8} n={6} />
        <DesertDitch cam={cam} x={0.62} z={4.15} w={1.85} />

        {/* Walt hurrying up in mid-background at left (clear of Jesse's silhouette) */}
        <Card cam={cam} x={-1.62} y={0} z={4.85} blur={false}>
          <Figure
            pose={{ torso: 8, neck: 3, shL: 26, shR: 34, elL: 52, elR: 48, hipL: 10, hipR: -8, knL: 12, knR: 10, breathe: 0.8 }}
            view={0.58}
            look={teacherLook({ yaw: 0.26, lids: 0.1, lookX: 0.38, brow: 0.7, mouth: "open", mouthOpen: 0.22 })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>

        {/* Distributor doubling over clutching his stomach as he stumbles toward the ditch */}
        <Card cam={cam} x={0.68 + 0.22 * gutHit} y={-0.14 * gutHit} z={3.68} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={distDuskLook({
              yaw: 0.22,
              lids: gutHit > 0.1 ? 0.55 : 0.12,
              lookX: 0.32,
              lookY: 0.18 * gutHit,
              brow: 0.88,
              mouth: "open",
              mouthOpen: 0.34,
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          {/* Temple cut + dark crimson gut wound stain */}
          <path d={`M${ancD.head.x - 0.01},${ancD.head.y - 0.05} l0.035,0.045`} stroke="#7a1418" strokeWidth={0.014} strokeLinecap="round" />
          {gutHit > 0.05 && (
            <ellipse cx={0.06} cy={-0.96 + 0.08 * gutHit} rx={0.085 * gutHit} ry={0.072 * gutHit} fill="#6e1017" opacity={0.92} />
          )}
        </Card>

        {/* Jesse in foreground-left firing the heavy pistol unobstructed into the distributor's stomach */}
        <Card cam={cam} x={-0.66} y={-0.04} z={3.52} blur={false}>
          <Figure
            pose={poseJ}
            view={0.58}
            look={partnerLook({
              yaw: 0.24,
              lids: flash > 0.3 ? 0.75 : 0.1,
              lookX: 0.38,
              brow: 0.82,
              mouth: "open",
              mouthOpen: 0.25,
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
          <g transform={`translate(${ancJ.wristR.x + 0.04},${ancJ.wristR.y - 0.01})`}>
            <Pistol rot={4 - flash * 10} flash={flash} />
          </g>
        </Card>

        {/* Gunsmoke puff */}
        {f >= shotFrame && f < shotFrame + 24 && (
          <Puff x={muzzlePt.x + (f - shotFrame) * 3} y={muzzlePt.y - (f - shotFrame) * 2} r={24 + (f - shotFrame) * 5} o={0.5 * (1 - (f - shotFrame) / 24)} light seed={11} />
        )}

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={18} color="#e8a87c" seed={9} drift={0.7} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "They leave him bleeding in the dirt to die on his own." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.15, -0.15, easeInOut(t)),
    y: 1.38,
    z: lerp(0.45, 0.15, easeInOut(t)),
    f: 1240,
    shiftY: 42,
    focus: 4.5,
    aperture: 0.22,
  };

  // Walt & Jesse retreating up the dusk desert track in mid-background
  const retreatZ = lerp(6.8, 9.4, t);
  const retreatX = lerp(-1.25, -2.15, t);

  // Sprawled wounded distributor clutching his bleeding stomach in the foreground dirt
  const ragBreath = Math.sin(f * 0.12) * 2;
  const poseDown: Pose = {
    torso: 16 + ragBreath,
    neck: 12,
    shL: 32,
    shR: 38,
    elL: 68,
    elR: 72,
    hipL: 28,
    hipR: 16,
    knL: 42,
    knR: 28,
    breathe: 0.4,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <Birds f={g} y={205} n={5} speed={0.45} color="#281628" seed={4} scale={0.9} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={10.2} n={7} />
        <DesertShack cam={cam} x={2.85} z={13.5} doorOpen={0.95} glow={0.85} />

        <Card cam={cam} x={-4.8} y={0} z={9.2} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        {/* Retreating Walt & Jesse hurrying away into the desert twilight */}
        <Card cam={cam} x={retreatX} y={0} z={retreatZ} flip blur={false}>
          <Figure
            pose={walkPose(f * 0.045, 0.9)}
            view={0.35}
            look={teacherLook({ yaw: 0.18, lids: 0.12, lookX: 0.25, brow: 0.45, mouth: "flat" })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>
        <Card cam={cam} x={retreatX + 0.62} y={0} z={retreatZ - 0.35} flip blur={false}>
          <Figure
            pose={walkPose(f * 0.045 + 0.4, 0.88)}
            view={0.42}
            look={partnerLook({ yaw: 0.2, lids: 0.14 + blink(g, 5) * 0.4, lookX: -0.25, brow: 0.55, mouth: "flat" })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        {/* Shallow desert ditch + bleeding distributor sprawled horizontally in foreground dirt */}
        <DesertDitch cam={cam} x={0.85} z={5.6} w={2.1} />
        <Card cam={cam} x={0.25} y={0.06} z={5.15} blur={false}>
          {/* Dark crimson pool in the dry dirt */}
          <ellipse cx={0.78} cy={-0.02} rx={0.44} ry={0.11} fill="#4d0b10" opacity={0.9} />
          <g transform="translate(0,-0.12) rotate(82)">
            <Figure
              pose={poseDown}
              view={0.68}
              look={distDuskLook({ yaw: 0.26, lids: 0.68, lookX: 0.2, lookY: 0.22, brow: 0.72, mouth: "open", mouthOpen: 0.18 })}
              pal={DIST_DUSK.pal}
              height={DIST_DUSK.height}
              rimLight="#ffb469"
              rimSide={1}
            />
            <ellipse cx={0.08} cy={-0.92} rx={0.09} ry={0.075} fill="#6e1017" opacity={0.92} />
          </g>
        </Card>

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={20} color="#e8a87c" seed={12} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#21121c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 run from shack"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 barbed wire and rock"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 rock to the head"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 gun into stomach"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 bleeding in the dirt"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.075} /></Sequence>
    <Sequence from={33} durationInFrames={36}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.11} /></Sequence>
    <Sequence from={B(705.2)} durationInFrames={28}><Audio src={staticFile("sfx/b_thunk.wav")} volume={0.14} /></Sequence>
    <Sequence from={B(708.6)} durationInFrames={42}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.16} /></Sequence>
  </AbsoluteFill>
);
