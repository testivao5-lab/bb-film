// SCENE 042 · "trunk" · set: desertDusk · narration 666.33s → 683.17s (16.84s) · batch B
// Narration:
//   Then Tuco does what men with knives eventually do.
//   He collects both of them at gunpoint and drives them out of the city in a trunk, to a shack in the
//   desert where an old man sits in a wheelchair with a bell fixed to the arm of it.
//   They are not guests. One of them has stopped being useful.
// Staging:
//   S1 (666.33–671.55) Dusk pull-off: distributor levels a steel pistol, forcing Walt and Jesse (hands
//                      raised) toward the open rear trunk of his dark maroon coupe.
//   S2 (671.55–674.00) Claustrophobic inside-the-trunk shot jolting over desert ruts: amber tail-light &
//                      dusk light bleed through the seam across Walt and Jesse crammed beside a spare tyre,
//                      before the trunk lid pops open against the burning dusk sky.
//   S3 (674.00–676.20) Wide-medium desertDusk exterior: distributor marches Walt and Jesse past barbed wire
//                      toward the isolated clapboard desert shack glowing amber under crimson-violet skies.
//   S4 (676.20–679.35) Inside the sun-slatted shack: push-in on the mute uncle in his spoked wheelchair,
//                      gnarled hand poised over the brass service bell bolted to the wooden armrest.
//   S5 (679.35–683.17) Tense interior medium shot: emptied wallets/watches lie on the table; Walt and Jesse
//                      sit captive while the distributor looms behind Jesse with the pistol ("stopped being useful").
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, blink, breath, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook, mixHex, tint } from "../../rig/cast";
import { Coupe } from "../../env/Vehicles";
import {
  ST_SHACK, DIST_DUSK, distDuskLook, duskTint, DuskDesert,
  DesertShack, BarbedFence, DesertDuskFore, ShackRoom, ShackFore, ShackTable, WheelchairUncle,
} from "../../env/b_shack";
import { SoftDefs, Dust } from "../../env/b_common";
import { chairSit, walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 42, id: "trunk", set: "desertDusk", cutIn: 666.33, cutOut: 683.17 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(683.17);
const CUTS = {
  s1: 0,
  s2: B(671.55),
  s3: B(674.0),
  s4: B(676.2),
  s5: B(679.35),
  end: END,
};

const PAL_T = duskTint(TEACHER.pal);
const PAL_P = duskTint(PARTNER.pal);
const PAL_T_DARK = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#1a1224", 0.42) : c));
const PAL_P_DARK = tint(PARTNER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#1a1224", 0.42) : c));

/** Heavy dark semi-auto pistol in metre space */
const Pistol: React.FC<{ rot?: number; s?: number }> = ({ rot = 0, s = 1 }) => (
  <g transform={`scale(${s}) rotate(${rot})`}>
    <rect x={-0.02} y={-0.028} width={0.145} height={0.032} rx={0.004} fill="#363b42" stroke="#101215" strokeWidth={0.005} />
    <line x1={-0.01} y1={-0.02} x2={0.115} y2={-0.02} stroke="#6c7580" strokeWidth={0.005} />
    <path d="M-0.015,0.002 L0.025,0.002 L0.008,0.078 L-0.032,0.075 Z" fill="#262220" stroke="#101215" strokeWidth={0.005} />
    <path d="M0.024,0.004 Q0.048,0.028 0.02,0.032" fill="none" stroke="#26292e" strokeWidth={0.005} />
  </g>
);

/* ─────────── S1 · dusk abduction at gunpoint beside the open trunk ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.15, 0.35, easeInOut(t)),
    y: 1.44,
    z: lerp(1.05, 1.35, easeInOut(t)),
    f: 1320,
    shiftY: 36,
    focus: 3.8,
    aperture: 0.3,
  };

  const shove = prog(g, B(669.8), B(671.3), easeInOut);

  // Distributor on right, pistol leveled straight at Walt & Jesse ("collects both of them at gunpoint")
  const poseD: Pose = {
    torso: lerp(5, 10, shove),
    neck: -3,
    shL: lerp(22, 38, shove),
    shR: 68,
    elL: 44,
    elR: 12,
    hipL: 8, hipR: -7, knL: 6, knR: 8,
    breathe: breath(g, 0.09),
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  // Walt & Jesse backing toward the open trunk with hands raised
  const poseW: Pose = {
    torso: -4,
    neck: 3,
    shL: 58, shR: 64,
    elL: 78, elR: 82,
    hipL: 5, hipR: -6, knL: 7, knR: 6,
    breathe: breath(g, 0.1),
  };
  const poseJ: Pose = {
    torso: -6,
    neck: 4,
    shL: 66, shR: 72,
    elL: 84, elR: 86,
    hipL: 7, hipR: -5, knL: 8, knR: 6,
    breathe: breath(g, 0.11, 1),
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />

        {/* Distributor's dark maroon coupe (flipped so rear trunk faces right toward Walt & Jesse; driver=false) */}
        <Card cam={cam} x={-2.25} y={0} z={4.65} flip blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.4} tail={0.95} driver={false} />
          {/* Popped rear trunk lid (-x in Coupe coords, flipped to +x toward Walt & Jesse) */}
          <path d="M-1.55,-0.58 L-2.28,-1.22 L-2.34,-1.15 L-1.65,-0.52 Z" fill="#4d242a" stroke="#180b0d" strokeWidth={0.025} />
        </Card>

        {/* Jesse backing toward the trunk */}
        <Card cam={cam} x={lerp(0.18, -0.18, shove)} y={0} z={4.45} blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.06} fill="#26182e" opacity={0.45} />
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.12 + blink(g, 5) * 0.4,
              lookX: 0.35,
              lookY: 0.02,
              brow: 0.55,
              mouth: "open",
              mouthOpen: 0.14,
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        {/* Walt in foreground-left with hands raised */}
        <Card cam={cam} x={lerp(-0.42, -0.74, shove)} y={0} z={4.12} blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.06} fill="#26182e" opacity={0.45} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.22,
              lids: 0.14 + blink(g, 3) * 0.4,
              lookX: 0.36,
              lookY: 0.02,
              brow: 0.45,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={1}
          />
        </Card>

        {/* Distributor on right leveling the pistol */}
        <Card cam={cam} x={lerp(1.52, 1.18, shove)} y={0} z={4.18} flip blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.34} ry={0.065} fill="#26182e" opacity={0.48} />
          <Figure
            pose={poseD}
            view={0.58}
            look={distDuskLook({
              yaw: 0.2,
              lids: 0.22,
              lookX: 0.36,
              lookY: 0.04,
              brow: 0.65,
              mouth: shove > 0.3 ? "open" : "flat",
              mouthOpen: 0.22 * shove,
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={-1}
          />
          <g transform={`translate(${ancD.wristR.x + 0.04},${ancD.wristR.y - 0.01})`}>
            <Pistol rot={-8} />
          </g>
        </Card>

        <DesertDuskFore variant="scrub" />
        <Motes f={g} n={18} color="#ffb978" seed={4} drift={0.8} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow={ST_SHACK.duskShadow} gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · inside the jolting trunk -> lid pops open into desert dusk ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const openLid = prog(g, B(673.35), B(673.95), easeOut);
  const roadJolt = (1 - openLid * 0.85) * (noise1(f * 0.48, 2) * 14 + Math.sin(f * 0.85) * 5);
  const roadSway = (1 - openLid * 0.85) * noise1(f * 0.26, 7) * 10;

  // Walt & Jesse cramped inside the dark carpeted trunk, squinting as dusk light floods in
  const poseW: Pose = chairSit({
    torso: 18,
    neck: lerp(8, -6, openLid),
    shL: 34, shR: lerp(28, 56, openLid),
    elL: 68, elR: lerp(64, 82, openLid),
    hipL: 74, hipR: 72, knL: 108, knR: 104,
    breathe: 0.65,
  });
  const poseJ: Pose = chairSit({
    torso: 16,
    neck: lerp(6, -5, openLid),
    shL: lerp(30, 58, openLid), shR: 32,
    elL: lerp(62, 84, openLid), elR: 68,
    hipL: 72, hipR: 74, knL: 106, knR: 108,
    breathe: 0.7,
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <linearGradient id="trunkDuskSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2f5a" />
            <stop offset="0.55" stopColor="#e0785a" />
            <stop offset="1" stopColor="#f6c27a" />
          </linearGradient>
        </defs>

        {/* Burning desertDusk sky revealed as trunk lid swings up at 673.35s */}
        <rect x={0} y={0} width={W} height={H} fill="#0e0b12" />
        {openLid > 0.01 && (
          <g>
            <rect x={120} y={0} width={1680} height={lerp(36, 620, openLid)} fill="url(#trunkDuskSky)" />
            {/* Silhouette of the distributor standing outside against the sunset */}
            <g transform={`translate(980,${lerp(660, 560, openLid)}) scale(270)`} opacity={clamp(openLid * 1.6)}>
              <Figure
                pose={{ torso: 6, neck: 8, shL: -10, shR: 48, elL: 46, elR: 24, hipL: 5, hipR: -5, knL: 5, knR: 5, breathe: 0.5 }}
                view={0.54}
                look={distDuskLook({ yaw: 0.1, lids: 0.25, brow: 0.6, mouth: "flat" })}
                pal={tint(DIST_DUSK.pal, () => "#1c1222")}
                height={DIST_DUSK.height}
              />
            </g>
          </g>
        )}

        {/* Trunk interior floor, carpeted walls, spare tyre, & lug wrench */}
        <g transform={`translate(${roadSway},${roadJolt})`}>
          <polygon points="0,340 210,490 1710,490 1920,340 1920,1080 0,1080" fill="#1b1720" stroke="#0b090e" strokeWidth={4} />
          {/* rubber spare tyre & steel lug wrench on left floor */}
          <ellipse cx={310} cy={875} rx={235} ry={88} fill="#141216" stroke="#09080b" strokeWidth={4} />
          <ellipse cx={310} cy={868} rx={115} ry={42} fill="#2c2e34" stroke="#09080b" strokeWidth={3} />
          <line x1={180} y1={945} x2={470} y2={895} stroke="#59616b" strokeWidth={14} strokeLinecap="round" />

          {/* Red tail-light wiring bleed at right corner */}
          <ellipse cx={1730} cy={620} rx={210} ry={130} fill="#c9342b" opacity={0.18} />

          {/* Walt (left-center) & Jesse (right-center) crammed inside the trunk */}
          <g transform="translate(740,1275) scale(520) rotate(6)">
            <Figure
              pose={poseW}
              view={0.56}
              look={teacherLook({
                yaw: 0.18,
                lids: lerp(0.28, 0.48, openLid),
                lookX: 0.15,
                lookY: lerp(0.1, -0.25, openLid),
                brow: 0.42,
                mouth: "flat",
              })}
              pal={lerp(0, 1, openLid) > 0.4 ? PAL_T : PAL_T_DARK}
              height={TEACHER.height}
              rimLight="#ff9b5e"
              rimSide={1}
            />
          </g>

          <g transform="translate(1240,1290) scale(-510,510) rotate(5)">
            <Figure
              pose={poseJ}
              view={0.56}
              look={partnerLook({
                yaw: 0.2,
                lids: lerp(0.24, 0.46, openLid),
                lookX: 0.2,
                lookY: lerp(0.1, -0.25, openLid),
                brow: 0.5,
                mouth: "open",
                mouthOpen: 0.12,
              })}
              pal={openLid > 0.4 ? PAL_P : PAL_P_DARK}
              height={PARTNER.height}
              rimLight="#ff9b5e"
              rimSide={1}
              outfit="hoodie"
            />
          </g>

          {/* Upper trunk lid & steel latch lifting open */}
          <g transform={`translate(0,${-540 * openLid})`}>
            <polygon points="0,0 1920,0 1920,455 1680,485 240,485 0,455" fill="#120f16" stroke="#070509" strokeWidth={4} />
            {/* thin orange weatherstrip seam glow before lid opens */}
            <rect x={230} y={481} width={1460} height={8} rx={4} fill="#ff8e47" opacity={0.75 * (1 - openLid)} />
            {/* trunk latch mechanism */}
            <rect x={928} y={465} width={64} height={44} rx={6} fill="#25272e" stroke="#09080c" strokeWidth={3} />
          </g>

          {/* Lower trunk lip silhouette */}
          <polygon points="0,955 220,920 1700,920 1920,955 1920,1080 0,1080" fill="#0d0a10" />
        </g>
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#1a0f24" gradeO={0.18} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · desert dusk exterior: marched past barbed wire to the shack ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-1.2, -0.65, easeInOut(t)),
    y: lerp(1.55, 1.46, easeInOut(t)),
    z: lerp(-0.6, 0.35, easeInOut(t)),
    f: 1220,
    shiftY: 42,
    focus: 7,
    aperture: 0.3,
  };

  const march = easeInOut(t);
  const mx = lerp(-2.6, -0.35, march);

  const poseW = walkPose(f * 0.068, 0.9, { torso: 5, shL: 16, shR: 18, elL: 42, elR: 40 });
  const poseJ = walkPose(f * 0.068 + 1.4, 0.9, { torso: 6, shL: -10, shR: 14, elL: 46, elR: 42 });
  const poseD = walkPose(f * 0.068 + 0.7, 0.9, { torso: 5, shL: -12, shR: 58, elL: 44, elR: 16 });
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.58);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <DuskDesert cam={cam} f={g} />
        <BarbedFence cam={cam} x0={-12} x1={12} z={9.5} n={7} />

        {/* Weathered desert shack glowing warm amber against the dusk horizon */}
        <DesertShack cam={cam} x={2.35} z={12.8} doorOpen={0.25} glow={0.9} />

        {/* Parked maroon coupe off to the left (empty cabin) */}
        <Card cam={cam} x={-4.6} y={0} z={8.2} blur={false}>
          <Coupe color="#4d242a" shade="#2b1216" light="#7a3e46" wheel={0} headlights={0.2} tail={0.5} driver={false} />
        </Card>

        {/* Jesse, Walt, and Distributor marching right toward the shack */}
        <Card cam={cam} x={mx + 0.78} y={0} z={6.4} blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.06} fill="#26182e" opacity={0.45} />
          <Figure
            pose={poseJ}
            view={0.62}
            look={partnerLook({ yaw: 0.26, lids: 0.2, lookX: 0.3, lookY: 0.04, brow: 0.35, mouth: "flat" })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        <Card cam={cam} x={mx} y={0} z={6.1} blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.06} fill="#26182e" opacity={0.45} />
          <Figure
            pose={poseW}
            view={0.62}
            look={teacherLook({ yaw: 0.26, lids: 0.18, lookX: 0.32, lookY: 0.04, brow: 0.25, mouth: "flat" })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={1}
          />
        </Card>

        <Card cam={cam} x={mx - 0.92} y={0} z={6.25} blur={false}>
          <ellipse cx={0} cy={0.01} rx={0.32} ry={0.06} fill="#26182e" opacity={0.45} />
          <Figure
            pose={poseD}
            view={0.62}
            look={distDuskLook({ yaw: 0.26, lids: 0.2, lookX: 0.34, lookY: 0.04, brow: 0.5, mouth: "flat" })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight={ST_SHACK.duskRim}
            rimSide={1}
          />
          <g transform={`translate(${ancD.wristR.x + 0.04},${ancD.wristR.y - 0.01})`}>
            <Pistol rot={-6} />
          </g>
        </Card>

        <Dust cam={cam} f={g} n={22} x0={-6} x1={6} z0={3} z1={11} h={1.8} seed={6} color="#d99a7c" />
        <DesertDuskFore variant="wire" />
        <Motes f={g} n={18} color="#ffb978" seed={8} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.64} grain={0.07} shadow={ST_SHACK.duskShadow} gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · inside the shack: push-in on the wheelchair & the brass armrest bell ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const e = easeInOut(t);
  const cam: Cam = {
    x: lerp(-0.35, -0.62, e),
    y: lerp(1.22, 1.06, e),
    z: lerp(1.25, 2.02, e),
    f: lerp(1360, 1620, e),
    shiftY: lerp(-35, -65, e),
    focus: 2.1,
    aperture: 0.3,
  };

  // Single ominous test tap on "bell" at 677.45s
  const ding = Math.sin(clamp((g - B(677.4)) / 10) * Math.PI);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <ShackRoom cam={cam} f={g} />
        <ShackTable cam={cam} x={0.28} z={3.75} w={1.4} />
        <WheelchairUncle
          cam={cam}
          x={-0.72}
          z={3.65}
          f={g}
          bellHit={ding}
          lookX={0.34}
          lookY={0.06}
          brow={0.55}
          mouth="frown"
        />
        <ShackFore />
        <Motes f={g} n={22} color="#ffc482" seed={3} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f110c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "They are not guests. One of them has stopped being useful." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.18, 0.34, easeInOut(t)),
    y: 1.32,
    z: lerp(1.28, 1.52, easeInOut(t)),
    f: 1380,
    shiftY: -30,
    focus: 2.6,
    aperture: 0.3,
  };

  const threat = prog(g, B(680.8), B(682.4), easeInOut);

  // Walt seated at left of table, hands tensely clasped on the wood, watching the pistol
  const poseW: Pose = chairSit({
    torso: 9,
    neck: -2,
    shL: 32, shR: 34,
    elL: 24, elR: 22,
    hipL: 64, hipR: 66, knL: 94, knR: 96,
    breathe: breath(g, 0.08),
  });

  // Jesse seated at right, flinching slightly as the distributor rests the pistol barrel by his shoulder
  const poseJ: Pose = chairSit({
    torso: lerp(6, 2, threat),
    neck: lerp(2, 6, threat),
    shL: 28, shR: 26,
    elL: 34, elR: 36,
    hipL: 64, hipR: 66, knL: 94, knR: 96,
    breathe: breath(g, 0.11, 1),
  });

  // Distributor standing behind Jesse, left hand gripping Jesse's shoulder, right hand pointing pistol down at Jesse
  const poseD: Pose = {
    torso: lerp(4, 10, threat),
    neck: 6,
    shL: 34,
    shR: lerp(38, 48, threat),
    elL: 32,
    elR: lerp(52, 36, threat),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.085),
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.56);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <ShackRoom cam={cam} f={g} />

        {/* Uncle watching from background-left in his wheelchair */}
        <WheelchairUncle cam={cam} x={-1.08} z={4.15} f={g} bellHit={0} lookX={0.38} lookY={0.04} />

        {/* Distributor looming directly behind Jesse */}
        <Card cam={cam} x={1.12} y={0} z={3.92} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={distDuskLook({
              yaw: 0.2,
              lids: 0.24,
              lookX: 0.28,
              lookY: 0.22,
              brow: 0.62,
              mouth: "flat",
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          <g transform={`translate(${ancD.wristR.x + 0.03},${ancD.wristR.y + 0.01})`}>
            <Pistol rot={28} />
          </g>
        </Card>

        {/* Captives Walt & Jesse seated at the wooden table */}
        <Card cam={cam} x={-0.38} y={0} z={3.58} blur={false}>
          <Figure
            pose={poseW}
            view={0.56}
            look={teacherLook({
              yaw: 0.22,
              lids: 0.16 + blink(g, 4) * 0.4,
              lookX: 0.36,
              lookY: 0.02,
              brow: 0.38,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>

        <Card cam={cam} x={0.86} y={0} z={3.62} flip blur={false}>
          <Figure
            pose={poseJ}
            view={0.56}
            look={partnerLook({
              yaw: 0.22,
              lids: 0.14 + blink(g, 6) * 0.4,
              lookX: lerp(0.28, -0.2, threat),
              lookY: lerp(0.06, -0.1, threat),
              brow: 0.6,
              mouth: "flat",
            })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={-1}
            outfit="hoodie"
          />
        </Card>

        <ShackTable cam={cam} x={0.24} z={3.42} w={1.45} />
        {/* Confiscated leather wallets, wristwatch & flip-phones piled on the table ("They are not guests") */}
        <Card cam={cam} x={0.22} y={0.785} z={3.38} blur={false}>
          <rect x={-0.14} y={-0.026} width={0.11} height={0.026} rx={0.004} fill="#3d261a" stroke="#140d09" strokeWidth={0.004} />
          <rect x={-0.01} y={-0.022} width={0.1} height={0.022} rx={0.004} fill="#26292e" stroke="#101214" strokeWidth={0.004} />
          <circle cx={0.15} cy={-0.012} r={0.018} fill="#c9b06b" stroke="#1a150d" strokeWidth={0.004} />
        </Card>

        <ShackFore />
        <Motes f={g} n={20} color="#ffc482" seed={7} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f110c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 gunpoint"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 in a trunk"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 desert shack"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 wheelchair and bell"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 not guests"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={CUTS.s2}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.035} /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2}><Audio src={staticFile("sfx/car_interior.wav")} volume={0.06} /></Sequence>
    <Sequence from={B(673.35)} durationInFrames={24}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.11} /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={END - CUTS.s3}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.03} /></Sequence>
    <Sequence from={B(677.4)} durationInFrames={36}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.12} /></Sequence>
  </AbsoluteFill>
);
