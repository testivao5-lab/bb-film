// SCENE 046 · "gunfight" · set: desertDusk · narration 728.66s → 750.65s (21.99s) · batch B
// Narration:
//   There is a gunfight in the desert. Short, loud, ending with a headshot. Hank Schrader, the DEA
//   brother-in-law, has just killed a cartel lieutenant in a dusty yard, and when he walks over to look
//   at him, he can hear a bell ringing from inside the shack. Hank gets a medal, a transfer to El Paso,
//   and Jesse gets a bill for the therapy. Walter gets a signed card.
// Staging:
//   S1 (728.66–731.55) Wide desert dusk gunfight: the distributor unloads automatic rifle bursts into the
//                      DEA vehicle (sparks + cracked glass) while the DEA brother-in-law ducks behind his
//                      open door returning sidearm fire.
//   S2 (731.55–734.35) Tight sight-line reverse ("Short, loud, ending with a headshot"): the agent steadies
//                      a two-handed Weaver grip and fires once at 733.20s, dropping the gunman behind the car.
//   S3 (734.35–743.35) Quiet violet-dusk aftermath: gunsmoke drifts as the shaken agent walks slowly over to
//                      look down into the ditch, then lifts his head as faint bell rings pulse from the shack.
//   S4 (743.35–746.25) Desk insert #1: velvet box with a gold valor medal & southwest transfer folder beside
//                      the agent's stiff, uneasy hand.
//   S5 (746.25–748.35) Table insert #2: itemized clinical invoice ($4,800 in vector numerals + illegible rows)
//                      held in Jesse's olive-hoodie hand.
//   S6 (748.35–750.65) Table insert #3: a pastel folded greeting card covered in colourful illegible coworker
//                      scribble-signatures as Walt's hand closes it flat.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, PARTNER, BROTHER, brotherLook } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import { Sedan } from "../../props/d_vehicle";
import {
  DIST_DUSK, distDuskLook, duskTint, DuskDesert, DesertDitch,
  DesertShack, BarbedFence, DesertDuskFore, AssaultRifle, BeltBadge,
} from "../../env/b_shack";
import { SoftDefs, Puff, Birds } from "../../env/b_common";
import { walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 46, id: "gunfight", set: "desertDusk", cutIn: 728.66, cutOut: 750.65 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(750.65);
const CUTS = {
  s1: 0,
  s2: B(731.55),
  s3: B(734.35),
  s4: B(743.35),
  s5: B(746.25),
  s6: B(748.35),
  end: END,
};

const PAL_B = duskTint(BROTHER.pal);

const camShake = (f: number, hit: number, dur: number, amp: number) => {
  if (f < hit || f > hit + dur) return { x: 0, y: 0 };
  const decay = (1 - (f - hit) / dur) * amp;
  return { x: Math.sin((f - hit) * 2.5) * decay, y: Math.cos((f - hit) * 3.2) * decay * 0.7 };
};

/** Service sidearm in metre space */
const Sidearm: React.FC<{ rot?: number; flash?: number }> = ({ rot = 0, flash = 0 }) => (
  <g transform={`rotate(${rot})`}>
    <rect x={-0.02} y={-0.032} width={0.175} height={0.038} rx={0.005} fill="#2d3238" stroke="#0c0e11" strokeWidth={0.006} />
    <line x1={-0.01} y1={-0.022} x2={0.145} y2={-0.022} stroke="#747e8c" strokeWidth={0.005} />
    <path d="M-0.015,0.004 L0.03,0.004 L0.01,0.092 L-0.034,0.088 Z" fill="#1e1c1b" stroke="#0c0e11" strokeWidth={0.006} />
    {flash > 0.05 && (
      <g transform="translate(0.168,-0.015)" opacity={flash}>
        <polygon points="0,-0.062 0.34,-0.016 0.14,0 0.38,0.032 0,0.065 0.05,0" fill="#ff9d2e" />
        <polygon points="0,-0.03 0.22,-0.005 0,0.032" fill="#fffce0" />
      </g>
    )}
  </g>
);

/** Crisp vector numerals for clinical therapy bill (zero text) */
const Digit: React.FC<{ ch: string; x: number; y: number; s?: number; col?: string }> = ({
  ch, x, y, s = 1, col = "#232a34",
}) => {
  const paths: Record<string, string> = {
    "$": "M18,4 C6,4 4,14 14,18 C24,22 22,32 10,32 M14,0 L14,36",
    "4": "M18,34 L18,4 L4,24 L24,24",
    ",": "M10,30 L6,40",
    "8": "M13,18 C5,18 5,4 13,4 C21,4 21,18 13,18 C4,18 4,34 13,34 C22,34 22,18 13,18 Z",
    "0": "M13,4 C5,4 4,34 13,34 C22,34 21,4 13,4 Z",
  };
  return (
    <path
      d={paths[ch] || ""}
      transform={`translate(${x},${y}) scale(${s})`}
      fill="none"
      stroke={col}
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

/* ─────────── S1 · "There is a gunfight in the desert. Short..." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  // Rapid automatic rifle bursts from Tuco (frames 12..68) + return pistol fire from Hank (frames 34, 58)
  const rifleBurst = f >= 10 && f <= 72 ? Math.pow(Math.max(0, Math.sin(f * 1.35)), 3) : 0;
  const hankShot = Math.max(
    Math.max(0, 1 - Math.abs(f - 36) / 3),
    Math.max(0, 1 - Math.abs(f - 62) / 3),
  );
  const jolt = rifleBurst * 5 + hankShot * 7;

  const cam: Cam = {
    x: 0.1 + Math.sin(f * 1.9) * jolt * 0.004,
    y: 1.24 + Math.cos(f * 2.3) * jolt * 0.004,
    z: 0.55,
    f: 1320,
    shiftY: 18,
    focus: 5.2,
    aperture: 0.22,
  };

  // Hank crouched low behind his DEA vehicle firing across the hood (feet planted at y=0)
  const poseB: Pose = {
    torso: 28,
    neck: -10,
    shL: 52,
    shR: 58 + hankShot * 8,
    elL: 18,
    elR: 14,
    hipL: 64,
    hipR: 54,
    knL: 96,
    knR: 86,
    breathe: 0.9,
  };
  const ancB = rigAnchors(poseB, BROTHER.height, 0.58);

  // Distributor unloading the assault rifle across the yard
  const poseD: Pose = {
    torso: 14 - rifleBurst * 4,
    neck: 4,
    shL: 54,
    shR: 46,
    elL: 38,
    elR: 44,
    hipL: 14,
    hipR: -12,
    knL: 18,
    knR: 14,
    breathe: 0.95,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  const sparkPt = project(cam, -0.85, 0.92, 4.85);
  const rifleSmoke = project(cam, 1.35, 1.32, 5.45);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={10.2} n={7} />
        <DesertShack cam={cam} x={3.25} z={13.5} doorOpen={0.95} glow={0.85} />

        {/* Parked maroon coupe at right */}
        <Card cam={cam} x={2.95} y={0} z={6.4} flip blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        {/* Distributor firing automatic rifle bursts from right midground */}
        <Card cam={cam} x={1.55} y={0} z={5.45} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={distDuskLook({ yaw: 0.24, lids: 0.14, lookX: 0.38, brow: 0.9, mouth: "open", mouthOpen: 0.35 })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          <ellipse cx={0.01} cy={-1.08} rx={0.08} ry={0.068} fill="#6e1017" opacity={0.92} />
          <g transform={`translate(${ancD.wristR.x - 0.04},${ancD.wristR.y - 0.04})`}>
            <AssaultRifle rot={-4 + rifleBurst * 3} flash={rifleBurst} s={1.04} />
          </g>
        </Card>

        {/* DEA Agent crouching behind the nose of his charcoal SUV returning pistol fire */}
        <Card cam={cam} x={-1.15} y={0} z={4.95} blur={false}>
          <Figure
            pose={poseB}
            view={0.58}
            look={brotherLook({ yaw: 0.24, lids: 0.12, lookX: 0.38, brow: 0.78, mouth: "open", mouthOpen: 0.18 })}
            pal={PAL_B}
            height={BROTHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
          <g transform={`translate(${ancB.wristR.x + 0.04},${ancB.wristR.y - 0.01})`}>
            <Sidearm rot={-2 - hankShot * 8} flash={hankShot} />
          </g>
        </Card>

        {/* DEA vehicle in left foreground taking rifle impacts */}
        <Card cam={cam} x={-2.55} y={0} z={4.85} blur={false}>
          <Sedan body="#2a323d" shade="#171c24" light="#5c6c80" head={0.85} tail={0.4} driver={false} sedan={false} />
          {/* Bullet spiderwebs in the glass */}
          {f > 18 && (
            <g stroke="#d8e6f2" strokeWidth={0.012} opacity={0.75}>
              <circle cx={0.45} cy={-1.08} r={0.025} fill="#eef6ff" />
              <line x1={0.36} y1={-1.14} x2={0.54} y2={-1.02} />
              <line x1={0.38} y1={-1.01} x2={0.52} y2={-1.15} />
            </g>
          )}
        </Card>

        {/* Bullet ricochet sparks off the DEA car fender */}
        {rifleBurst > 0.35 && (
          <g transform={`translate(${sparkPt.x},${sparkPt.y})`} stroke="#ffd269" strokeWidth={3.5} strokeLinecap="round">
            <line x1={0} y1={0} x2={-38} y2={-28} />
            <line x1={0} y1={0} x2={-46} y2={8} />
            <line x1={0} y1={0} x2={-18} y2={-42} />
            <circle cx={0} cy={0} r={9} fill="#fff8d6" stroke="none" />
          </g>
        )}

        {f > 14 && <Puff x={rifleSmoke.x} y={rifleSmoke.y - 18} r={34 + f * 0.45} o={0.32} light seed={5} />}
        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={22} color="#e8a87c" seed={3} drift={1.1} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...loud, ending with a headshot." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const shotFrame = B(733.2) - CUTS.s2;
  const steady = prog(f, 0, shotFrame - 4, easeOut);
  const flash = Math.max(0, 1 - Math.abs(f - shotFrame) / 3);
  const drop = prog(f, shotFrame, shotFrame + 22, easeIn);
  const shk = camShake(f, shotFrame, 14, 15);

  const cam: Cam = {
    x: -0.15 + shk.x * 0.008,
    y: 1.28 + shk.y * 0.008,
    z: 1.35,
    f: 1460,
    shiftY: -8,
    focus: 2.6,
    aperture: 0.25,
  };

  // Hank planting his feet & locking a steady two-handed Weaver grip, firing once at shotFrame
  const poseB: Pose = {
    torso: lerp(10, 4, steady) - flash * 5,
    neck: -2,
    shL: lerp(46, 56, steady) + flash * 7,
    shR: lerp(50, 60, steady) + flash * 9,
    elL: 16,
    elR: 12,
    hipL: 12,
    hipR: -10,
    knL: 10,
    knR: 8,
    breathe: 0.45,
  };
  const ancB = rigAnchors(poseB, BROTHER.height, 0.58);

  // Distributor rising behind the maroon car in background-right, snapping backward & dropping on headshot
  const poseD: Pose = {
    torso: lerp(12, -38, drop),
    neck: lerp(4, -22, drop),
    shL: lerp(48, 12, drop),
    shR: lerp(42, -18, drop),
    elL: 40,
    elR: 44,
    hipL: 10,
    hipR: -8,
    knL: lerp(12, 34, drop),
    knR: lerp(10, 28, drop),
    breathe: 0.4,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.56);

  const muzzlePt = project(cam, -0.68 + ancB.wristR.x + 0.16, ancB.wristR.y, 3.65);
  const ditchDust = project(cam, 1.35, 0.2, 7.2);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={9.8} n={7} />
        <DesertDitch cam={cam} x={1.45} z={7.5} w={2.0} />

        {/* Distributor in background-right snapping back & dropping out of sight behind the car on headshot */}
        {drop < 0.96 && (
          <Card cam={cam} x={1.25 + 0.28 * drop} y={-1.15 * drop * drop} z={7.15} flip blur={false}>
            <Figure
              pose={poseD}
              view={0.56}
              look={distDuskLook({
                yaw: 0.22,
                lids: drop > 0.05 ? 0.85 : 0.12,
                lookX: 0.35,
                brow: 0.88,
                mouth: "open",
                mouthOpen: 0.28,
              })}
              pal={DIST_DUSK.pal}
              height={DIST_DUSK.height}
              rimLight="#ffb469"
              rimSide={-1}
            />
            <g transform={`translate(${ancD.wristR.x - 0.02},${ancD.wristR.y - 0.02})`}>
              <AssaultRifle rot={lerp(-6, -48, drop)} s={0.98} />
            </g>
          </Card>
        )}

        {/* Parked maroon coupe partially framing the distributor */}
        <Card cam={cam} x={2.75} y={0} z={6.85} flip blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.25} tail={0.55} driver={false} />
        </Card>

        {drop > 0.45 && (
          <Puff x={ditchDust.x} y={ditchDust.y} r={34 + drop * 44} o={0.42 * (1.2 - drop * 0.6)} seed={9} />
        )}

        {/* Hero foreground-left: DEA Agent locking steady aim & firing the decisive shot */}
        <Card cam={cam} x={-0.68} y={0} z={3.65} blur={false}>
          <Figure
            pose={poseB}
            view={0.58}
            look={brotherLook({
              yaw: 0.24,
              lids: flash > 0.4 ? 0.55 : 0.14,
              lookX: 0.4,
              brow: 0.72,
              mouth: "flat",
            })}
            pal={PAL_B}
            height={BROTHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
          <g transform={`translate(${ancB.pelvis.x + 0.075},${ancB.pelvis.y - 0.035})`}>
            <BeltBadge />
          </g>
          <g transform={`translate(${ancB.wristR.x + 0.04},${ancB.wristR.y - 0.01})`}>
            <Sidearm rot={-2 - flash * 9} flash={flash} />
          </g>
        </Card>

        {f >= shotFrame && f < shotFrame + 24 && (
          <Puff x={muzzlePt.x + (f - shotFrame) * 3} y={muzzlePt.y - (f - shotFrame) * 2} r={26 + (f - shotFrame) * 4.5} o={0.48 * (1 - (f - shotFrame) / 24)} light seed={12} />
        )}

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={18} color="#e8a87c" seed={7} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#21121c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "...walks over to look at him, he can hear a bell ringing from inside the shack." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const walkEnd = B(739.55) - CUTS.s3;
  const walkT = clamp(f / walkEnd);
  const stopT = prog(f, walkEnd - 12, walkEnd + 8, easeOut);
  const hearBell = prog(g, B(740.75), B(741.85), easeInOut);
  const ringPulse = g >= B(740.7) ? Math.pow(Math.max(0, Math.sin((g - B(740.7)) * 0.34)), 2) : 0;

  const cam: Cam = {
    x: lerp(-0.35, 0.45, easeInOut(f / dur)),
    y: 1.34,
    z: lerp(0.55, 0.95, easeInOut(f / dur)),
    f: 1320,
    shiftY: 34,
    focus: 4.8,
    aperture: 0.22,
  };

  // Hank walking slowly across the dusty yard to the ditch, stopping to look down, then lifting head at the bell
  const wPose = walkPose(f * 0.035, 0.72 * (1 - stopT));
  const poseB: Pose = {
    ...wPose,
    torso: lerp(wPose.torso, lerp(12, 4, hearBell), stopT),
    neck: lerp(wPose.neck, lerp(16, -3, hearBell), stopT),
    shL: lerp(wPose.shL, 12, stopT),
    shR: lerp(wPose.shR, 28, stopT),
    elL: lerp(wPose.elL, 34, stopT),
    elR: lerp(wPose.elR, 24, stopT),
    hipL: lerp(wPose.hipL, 7, stopT),
    hipR: lerp(wPose.hipR, -6, stopT),
    knL: lerp(wPose.knL, 6, stopT),
    knR: lerp(wPose.knR, 6, stopT),
    breathe: 0.75,
  };
  const ancB = rigAnchors(poseB, BROTHER.height, 0.58);

  const shackPt = project(cam, 2.55, 1.35, 12.2);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} sun={[1520, 465]} />
        <Birds f={g} y={195} n={4} speed={0.38} color="#241428" seed={6} scale={0.85} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={10.2} n={7} />
        <DesertShack cam={cam} x={2.75} z={12.4} doorOpen={0.85} glow={0.95} />

        {/* Subtle golden acoustic ripples outside the shack window when the uncle's bell rings */}
        {ringPulse > 0.12 && (
          <g transform={`translate(${shackPt.x},${shackPt.y})`} fill="none" stroke="#ffd884" strokeWidth={2.5} opacity={ringPulse * 0.65}>
            <circle cx={0} cy={0} r={28 + (1 - ringPulse) * 35} />
            <circle cx={0} cy={0} r={54 + (1 - ringPulse) * 45} opacity={0.5} />
          </g>
        )}

        {/* Parked maroon coupe */}
        <Card cam={cam} x={-3.85} y={0} z={8.4} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.2} tail={0.5} driver={false} />
        </Card>

        {/* Shallow ditch in foreground-right with the fallen assault rifle & boot soles at the rim */}
        <DesertDitch cam={cam} x={1.28} z={4.85} w={1.95} />
        <Card cam={cam} x={1.08} y={0.05} z={4.65} blur={false}>
          <AssaultRifle rot={14} s={0.95} />
          {/* Motionless dark boots protruding from the ditch edge */}
          <path d="M0.48,0.02 L0.62,-0.16 L0.7,-0.12 L0.58,0.04 Z" fill="#181413" stroke="#080707" strokeWidth={0.01} />
          <path d="M0.64,0.03 L0.76,-0.14 L0.84,-0.1 L0.73,0.05 Z" fill="#1d1817" stroke="#080707" strokeWidth={0.01} />
        </Card>

        {/* DEA Agent walking slowly up to the ditch, looking down, then turning his head toward the ringing bell */}
        <Card cam={cam} x={lerp(-1.15, 0.22, walkT)} y={0} z={lerp(5.35, 4.65, walkT)} blur={false}>
          <Figure
            pose={poseB}
            view={0.58}
            look={brotherLook({
              yaw: 0.24,
              lids: 0.14 + blink(g, 6) * 0.4,
              lookX: lerp(0.32, 0.42, hearBell),
              lookY: stopT > 0.5 ? lerp(0.32, -0.06, hearBell) : 0.05,
              brow: lerp(0.55, 0.35, hearBell),
              mouth: "flat",
            })}
            pal={PAL_B}
            height={BROTHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
          <g transform={`translate(${ancB.pelvis.x + 0.075},${ancB.pelvis.y - 0.035})`}>
            <BeltBadge />
          </g>
          <g transform={`translate(${ancB.wristR.x + 0.03},${ancB.wristR.y + 0.01})`}>
            <Sidearm rot={38} />
          </g>
        </Card>

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={20} color="#e8a87c" seed={14} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#21121c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "Hank gets a medal, a transfer to El Paso..." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const tap = Math.sin(clamp((f - 28) / 14) * Math.PI);
  const slideIn = prog(f, 0, 26, easeOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Polished mahogany office desk surface */}
        <rect x={0} y={0} width={W} height={H} fill="#3b261c" />
        {[190, 450, 730, 960].map((ly, i) => (
          <line key={i} x1={0} y1={ly} x2={W} y2={ly + 14} stroke="#261710" strokeWidth={4} opacity={0.6} />
        ))}
        <polygon points="0,0 1180,0 820,1080 0,1080" fill="#ffe2b5" opacity={0.07} />

        {/* Cream official transfer dossier folder (stylized map-pin border icon + illegible ink lines; zero text) */}
        <g transform={`translate(${lerp(1320, 1215, slideIn)},545) rotate(6)`}>
          <rect x={-305} y={-355} width={620} height={730} rx={12} fill="#d8c396" stroke="#635133" strokeWidth={5} />
          <rect x={-275} y={-325} width={560} height={670} fill="#f4efe4" stroke="#aba290" strokeWidth={3} />
          {/* Official gold-and-navy circular seal */}
          <circle cx={-175} cy={-235} r={42} fill="#253b5e" stroke="#c99e38" strokeWidth={6} />
          <polygon points="-175,-262 -166,-242 -145,-242 -162,-229 -155,-209 -175,-221 -195,-209 -188,-229 -205,-242 -184,-242" fill="#e8c35a" />
          {/* Stylized southwest route line + destination pin (visual "transfer" icon, zero text) */}
          <rect x={-95} y={-275} width={325} height={95} rx={6} fill="#ebe3d1" stroke="#b8ae99" strokeWidth={2.5} />
          <path d="M-65,-215 Q35,-255 145,-220" fill="none" stroke="#8a4b38" strokeWidth={5} strokeDasharray="12 8" />
          <circle cx={-65} cy={-215} r={8} fill="#3d526e" />
          <path d="M145,-220 C133,-238 133,-256 145,-256 C157,-256 157,-238 145,-220 Z" fill="#c43b31" stroke="#261210" strokeWidth={3} />
          {/* Illegible ruled lines + red approval stamp box */}
          {[-125, -75, -25, 25, 75, 125, 175].map((ry, i) => (
            <line key={i} x1={-225} y1={ry} x2={i % 2 === 0 ? 225 : 145} y2={ry} stroke="#7c828c" strokeWidth={5} strokeLinecap="round" opacity={0.65} />
          ))}
          <g transform="translate(115,245) rotate(-11)">
            <rect x={-95} y={-32} width={190} height={64} rx={6} fill="none" stroke="#b8342b" strokeWidth={6} opacity={0.8} />
            <line x1={-68} y1={0} x2={68} y2={0} stroke="#b8342b" strokeWidth={8} strokeLinecap="round" opacity={0.75} />
          </g>
        </g>

        {/* Open navy-velvet presentation case holding the gleaming gold valor medal */}
        <g transform="translate(650,535) rotate(-5)">
          <rect x={-235} y={-285} width={490} height={590} rx={22} fill="#000" opacity={0.38} />
          <rect x={-245} y={-295} width={490} height={590} rx={22} fill="#182236" stroke="#090d16" strokeWidth={6} />
          <rect x={-212} y={-262} width={424} height={524} rx={14} fill="#223252" stroke="#c9a242" strokeWidth={4} />
          {/* Blue-white-gold grosgrain ribbon */}
          <polygon points="-78,-215 78,-215 54,18 -54,18" fill="#2c538a" stroke="#101c30" strokeWidth={4} />
          <rect x={-22} y={-213} width={44} height={228} fill="#f2efe6" />
          <rect x={-8} y={-213} width={16} height={228} fill="#d9af42" />
          {/* Brass clasp bar */}
          <rect x={-88} y={-222} width={176} height={28} rx={5} fill="#e0b84c" stroke="#2b2008" strokeWidth={4} />
          {/* Gold valor starburst medallion */}
          <g transform="translate(0,95)">
            <circle cx={0} cy={6} r={98} fill="#000" opacity={0.32} />
            <circle cx={0} cy={0} r={96} fill="#deb443" stroke="#2b2008" strokeWidth={5} />
            <circle cx={0} cy={0} r={74} fill="#f4d678" stroke="#9e7820" strokeWidth={3.5} />
            <polygon
              points="0,-64 16,-20 62,-20 25,8 39,54 0,26 -39,54 -25,8 -62,-20 -16,-20"
              fill="#fff1b8"
              stroke="#7d5c12"
              strokeWidth={3.5}
            />
          </g>
        </g>

        {/* Agent's stiff, uneasy tan-sleeved hand resting on the desk edge */}
        <g transform={`translate(285,${845 - 12 * tap}) rotate(26) scale(-2350,2350)`}>
          <HandBack
            pal={BROTHER.pal}
            curl={0.48 + 0.14 * tap}
            thumb={0.55}
            sleeve={BROTHER.pal.jacket}
            sleeveShade={BROTHER.pal.jacketShade}
            cuff={BROTHER.pal.shirt}
            forearm={0.78}
          />
        </g>

        <Motes f={g} n={14} color="#ffdba8" seed={17} drift={0.4} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.07} shadow="#1a110d" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "...and Jesse gets a bill for the therapy." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const flinch = prog(f, 12, 36, easeOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Cool worn laminate table surface */}
        <rect x={0} y={0} width={W} height={H} fill="#282f38" />
        <polygon points="340,0 1920,0 1560,1080 120,1080" fill="#9cc4e8" opacity={0.06} />

        {/* Torn-open window envelope behind */}
        <g transform="translate(820,490) rotate(-9)">
          <rect x={-380} y={-210} width={760} height={380} rx={8} fill="#dce3ea" stroke="#697380" strokeWidth={4} />
          <rect x={-310} y={-65} width={280} height={115} rx={10} fill="#bac5d1" stroke="#7d8896" strokeWidth={3} />
        </g>

        {/* Itemized clinical therapy invoice sheet (medical cross emblem + illegible rows + $4,800 vector numerals) */}
        <g transform={`translate(985,${lerp(565, 545, flinch)}) rotate(${lerp(3, 1.5, flinch)})`}>
          <rect x={-335} y={-425} width={690} height={860} fill="#000" opacity={0.35} />
          <rect x={-345} y={-435} width={690} height={860} fill="#f7f9fc" stroke="#7b8490" strokeWidth={4} />

          {/* Clinical header band + medical cross emblem (zero text) */}
          <rect x={-345} y={-435} width={690} height={108} fill="#dce6f2" />
          <g transform="translate(-255,-381)">
            <circle cx={0} cy={0} r={34} fill="#315c8a" />
            <rect x={-8} y={-22} width={16} height={44} rx={2} fill="#ffffff" />
            <rect x={-22} y={-8} width={44} height={16} rx={2} fill="#ffffff" />
          </g>
          <line x1={-190} y1={-392} x2={85} y2={-392} stroke="#315c8a" strokeWidth={9} strokeLinecap="round" />
          <line x1={-190} y1={-366} x2={-15} y2={-366} stroke="#6d8299" strokeWidth={6} strokeLinecap="round" />

          {/* Itemized billing table grid & illegible rows */}
          <rect x={-295} y={-285} width={590} height={470} fill="none" stroke="#9aa5b4" strokeWidth={3} />
          <line x1={125} y1={-285} x2={125} y2={185} stroke="#9aa5b4" strokeWidth={3} />
          {[-225, -155, -85, -15, 55, 125].map((ry, i) => (
            <g key={i}>
              <line x1={-265} y1={ry} x2={45 - (i % 3) * 35} y2={ry} stroke="#687382" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
              <line x1={165} y1={ry} x2={265} y2={ry} stroke="#424b57" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
              <line x1={-295} y1={ry + 34} x2={295} y2={ry + 34} stroke="#cfd7e2" strokeWidth={2} />
            </g>
          ))}

          {/* Highlighted total-due box at bottom with crisp vector "$ 4,800" */}
          <rect x={25} y={225} width={275} height={96} rx={8} fill="#fce8e6" stroke="#c94438" strokeWidth={4} />
          <g transform="translate(52,246)">
            <Digit ch="$" x={0} y={0} s={1.35} col="#b82c22" />
            <Digit ch="4" x={42} y={0} s={1.35} col="#b82c22" />
            <Digit ch="," x={78} y={0} s={1.35} col="#b82c22" />
            <Digit ch="8" x={102} y={0} s={1.35} col="#b82c22" />
            <Digit ch="0" x={142} y={0} s={1.35} col="#b82c22" />
            <Digit ch="0" x={182} y={0} s={1.35} col="#b82c22" />
          </g>
        </g>

        {/* Jesse's olive-hoodie articulated hand gripping the lower-left corner of the bill */}
        <g transform={`translate(${lerp(565, 585, flinch)},${lerp(775, 755, flinch)}) rotate(38) scale(-2380,2380)`}>
          <HandBack
            pal={PARTNER.pal}
            curl={0.62}
            thumb={0.74}
            sleeve={PARTNER.pal.jacket}
            sleeveShade={PARTNER.pal.jacketShade}
            cuff={PARTNER.pal.shirt}
            forearm={0.78}
          />
        </g>

        <Motes f={g} n={12} color="#bfd8f2" seed={21} drift={0.4} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.07} shadow="#11161f" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S6 · "Walter gets a signed card." ─────────── */
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s6;
  const closeCard = prog(g, B(749.15), B(750.25), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Quiet warm oak bedside/kitchen table bridging into scene 047 bedroom */}
        <rect x={0} y={0} width={W} height={H} fill="#4a3728" />
        {[175, 435, 695, 935].map((ly, i) => (
          <line key={i} x1={0} y1={ly} x2={W} y2={ly + 10} stroke="#302218" strokeWidth={4} opacity={0.55} />
        ))}
        <polygon points="0,0 1350,0 980,1080 0,1080" fill="#ffe4bd" opacity={0.08} />

        {/* Pastel envelope beside the card */}
        <g transform="translate(560,555) rotate(-12)">
          <rect x={-260} y={-175} width={520} height={350} rx={10} fill="#e8dfc8" stroke="#8c8068" strokeWidth={4} />
          <polygon points="-256,-172 0,18 256,-172" fill="#dfd4b8" stroke="#8c8068" strokeWidth={3.5} />
        </g>

        {/* Open pastel greeting card covered in colourful illegible coworker scribble-signatures */}
        <g transform="translate(1015,535) rotate(3)">
          <ellipse cx={16} cy={22} rx={420} ry={340} fill="#000" opacity={0.32} />

          {/* Right inside panel with dozens of colourful overlapping scribble-signatures (zero readable words) */}
          <rect x={0} y={-325} width={410} height={650} rx={8} fill="#fcf9f0" stroke="#8d8575" strokeWidth={4} />
          {/* Decorative printed floral/sunburst header emblem */}
          <circle cx={205} cy={-245} r={34} fill="#f2c45a" opacity={0.85} />
          <circle cx={205} cy={-245} r={18} fill="#e88a48" />
          {[
            [55, -155, "#2b4d8c"], [215, -140, "#8c2b48"], [75, -75, "#2d6e4e"],
            [235, -62, "#4a3878"], [48, 8, "#8c4a27"], [205, 22, "#1f5a73"],
            [82, 95, "#7a2c64"], [228, 108, "#38424d"], [62, 178, "#2b4d8c"],
            [218, 192, "#9c3832"], [115, 255, "#426b38"],
          ].map(([sx, sy, col], i) => (
            <path
              key={i}
              d={`M${sx},${sy} q18,-24 34,-4 t28,-8 t26,6 q14,-12 28,2`}
              fill="none"
              stroke={col as string}
              strokeWidth={4.2}
              strokeLinecap="round"
              opacity={0.85}
            />
          ))}

          {/* Left cover panel folding shut over the right panel as Walt's hand closes it */}
          <g transform={`scale(${lerp(-1, 0.96, closeCard)},1)`}>
            <rect
              x={0}
              y={-325}
              width={410}
              height={650}
              rx={8}
              fill={closeCard > 0.52 ? "#d6e6de" : "#f7f3e6"}
              stroke="#7e8c85"
              strokeWidth={4}
            />
            {closeCard > 0.52 ? (
              /* Pastel front cover artwork: simple geometric sunburst & ribbon motif (zero text) */
              <g transform="translate(205,0)">
                <rect x={-145} y={-235} width={290} height={470} rx={12} fill="#eef5f1" stroke="#9ab5a8" strokeWidth={3} />
                <circle cx={0} cy={-35} r={72} fill="#f4ca64" stroke="#b88d2e" strokeWidth={4} />
                {Array.from({ length: 8 }).map((_, ri) => {
                  const a = (ri * Math.PI) / 4;
                  return (
                    <line
                      key={ri}
                      x1={Math.cos(a) * 86}
                      y1={-35 + Math.sin(a) * 86}
                      x2={Math.cos(a) * 112}
                      y2={-35 + Math.sin(a) * 112}
                      stroke="#e39a44"
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  );
                })}
                <path d="M-85,125 Q0,95 85,125" fill="none" stroke="#6c9482" strokeWidth={8} strokeLinecap="round" />
              </g>
            ) : (
              /* Left inside panel signatures */
              <g>
                {[
                  [65, -140, "#3d4f6e"], [195, -55, "#85384c"], [75, 45, "#2f6b52"], [185, 145, "#6b482b"],
                ].map(([sx, sy, col], i) => (
                  <path
                    key={i}
                    d={`M${sx},${sy} q22,-22 38,-2 t32,-6 t28,8`}
                    fill="none"
                    stroke={col as string}
                    strokeWidth={4}
                    strokeLinecap="round"
                    opacity={0.8}
                  />
                ))}
              </g>
            )}
          </g>
        </g>

        {/* Walt's navy-jacket articulated hand pushing the greeting card closed */}
        <g
          transform={`translate(${lerp(560, 1025, closeCard)},${lerp(785, 745, closeCard)}) rotate(${lerp(42, 24, closeCard)}) scale(-2380,2380)`}
        >
          <HandBack
            pal={TEACHER.pal}
            curl={lerp(0.35, 0.52, closeCard)}
            thumb={0.58}
            sleeve={TEACHER.pal.jacket}
            sleeveShade={TEACHER.pal.jacketShade}
            cuff={TEACHER.pal.shirt}
            forearm={0.82}
          />
        </g>

        <Motes f={g} n={12} color="#ffe0b2" seed={25} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.07} shadow="#1c130e" gradeO={0.12} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 gunfight in the desert"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 headshot"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 bell from the shack"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 medal and transfer"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.s6 - CUTS.s5} name="S5 bill for therapy"><S5 /></Sequence>
    <Sequence from={CUTS.s6} durationInFrames={CUTS.end - CUTS.s6} name="S6 signed card"><S6 /></Sequence>
    <Sequence from={0} durationInFrames={CUTS.s4}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.065} /></Sequence>
    <Sequence from={12} durationInFrames={36}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.14} /></Sequence>
    <Sequence from={36} durationInFrames={36}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.14} /></Sequence>
    <Sequence from={58} durationInFrames={36}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.13} /></Sequence>
    <Sequence from={B(733.15)} durationInFrames={45}><Audio src={staticFile("sfx/b_gunshot.wav")} volume={0.17} /></Sequence>
    <Sequence from={B(740.75)} durationInFrames={36}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.075} /></Sequence>
    <Sequence from={B(741.95)} durationInFrames={36}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.065} /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={34}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.075} /></Sequence>
    <Sequence from={B(749.2)} durationInFrames={34}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.075} /></Sequence>
  </AbsoluteFill>
);
