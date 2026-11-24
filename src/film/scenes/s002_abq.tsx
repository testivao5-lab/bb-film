// SCENE 002 · "abq" · set: desert · narration 37.71s → 47.71s (10.00s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Frames inside components are LOCAL (0 = cut-in).
//
// Narration:
//   Albuquerque. Beige light, dust, heat coming up off the road.
//   Walter White teaches chemistry at a high school that has seen better decades.
//
// Shot plan (hard cuts on sentence gaps):
//   S1 0–159   desert highway — heat shimmer ramps on "heat coming up off the road";
//              the beige sedan passes the lens exactly on "road."
//   S2 159–225 school exterior — Walt crosses the lot; checks his watch on "Walter",
//              looks up at the building on "chemistry".
//   S3 225–300 chemistry classroom — Walt lectures at the board; the failing tube
//              stutters on "has seen better decades" and he glances up at it.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, Audio, staticFile } from "remotion";
import { Cam, Card, project, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, lerp, clamp, blink, breath, noise1, rand } from "../../lib/anim";
import { TEACHER, teacherLook } from "../../rig/cast";
import { Figure, Pose } from "../../rig/Figure";
import { walkPose, chairSit, rigAnchors } from "../../props/b_pose";
import { Sedan, SedanFront } from "../../props/d_vehicle";
import { STUDENTS, studentLook } from "../../props/a_extras";
import { Highway, PowerPoles } from "../../env/a_desert";
import { SchoolExterior, SchoolClassroom, Desk, Chair, SCHOOL } from "../../env/a_school";
import { DDefs, Sky, DuneRidge, DesertFloor, HeatShimmer, Birds, Puff } from "../../env/d_shared";
import { DustDevil } from "../../env/b_street";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 2, id: "abq", set: "desert", cutIn: 37.71, cutOut: 47.71 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  abq: 9, beige: 49, light: 62, dust: 81, heat: 107, road: 140,
  walter: 168, white: 178, teaches: 186, chem: 199, at: 209, a: 224,
  high: 226, school: 231, that: 240, has: 246, seen: 251, better: 259, decades: 270,
  end: 300,
};
const CUT2 = 159, CUT3 = 225;
const BODY = "#c8b896", BODY_D = "#a89878", BODY_L = "#ded0b0"; // the teacher's beige sedan
const groundShadow = (rx: number) => (
  <ellipse cx={0} cy={0.012} rx={rx} ry={rx * 0.3} fill="#4a4038" opacity={0.35} />
);

/* ═════════════ S1 · the highway · "Albuquerque. Beige light, dust, heat … road." ═════════════ */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const cam: Cam = {
    x: -6.5, y: 1.55, z: prog(f, 0, CUT2, easeInOut) * 0.5,
    f: 1350, shiftY: 110, focus: 40, aperture: 0.35,
  };
  // "beige light": the sun blooms and the frame holds a warm cast
  const warm = prog(f, T.beige, T.light + 10, easeOut) * (1 - 0.4 * prog(f, T.light + 10, T.end, easeInOut));
  // "heat coming up off the road": shimmer intensity ramps with the words
  const heat = 0.045 + 0.13 * prog(f, T.heat, T.road, easeInOut);
  // the sedan: passes the lens at "road." (peak of a_carpass, started at 114)
  const carZ = 14 + 0.925 * (T.road - f);
  const showCar = f >= 108 && f <= 147 && carZ > 3;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs tone="day" />
        <Sky cam={cam} f={f} tone="day" sun={[430, 150]} clouds={4} />
        <DuneRidge cam={cam} f={f} z={900} tone="day" />
        <DesertFloor cam={cam} f={f} tone="day" scrubN={34} />
        <Highway cam={cam} x={0} />
        <PowerPoles cam={cam} x={-8.5} z0={16} step={26} n={6} />
        {/* "dust": a dust devil boils up off the roadside */}
        <DustDevil cam={cam} f={f} x={7} z={52} o={0.55} />
        {/* the beige sedan coming at the lens */}
        {showCar && (
          <Card cam={cam} x={2} z={carZ}>
            <SedanFront body={BODY} shade={BODY_D} lights={0.55} driver />
          </Card>
        )}
        {showCar &&
          [0, 1, 2].map((i) => {
            const p = project(cam, 2 + (rand(i, 71) - 0.5) * 1.6, 0.25, carZ + 1.6 + i * 1.7);
            const t = (f * 0.07 + i * 0.4) % 1;
            return <Puff key={i} x={p.x} y={p.y - t * p.s * 0.4} r={(0.35 + t * 0.9) * p.s} o={0.4 * (1 - t)} />;
          })}
        <HeatShimmer f={f} region={[140, 636, 1780, 420]} n={16} op={heat} />
        <Birds f={f} n={3} y={128} span={1500} sp={0.9} />
        {/* the beige-light wash */}
        {warm > 0.01 && <rect x={0} y={0} width={W} height={H} fill="#fff1c9" opacity={0.22 * warm} />}
      </svg>
      <Motes f={f} n={44} color="#ffe9c4" seed={5} region={[0, 0, W, H * 0.82]} drift={0.7} />
      <Finish f={f} vig={0.55} grain={0.07} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ═════════════ S2 · school exterior · "Walter White teaches chemistry at a" ═════════════ */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const t = prog(f, 0, CUT3 - CUT2, easeInOut);
  const cam: Cam = {
    x: lerp(0, 1.2, t), y: 1.55, z: lerp(10.5, 11.6, t),
    f: 1350, shiftY: 60, focus: 16, aperture: 0.5,
  };
  // Walt crosses the lot toward the entrance
  const wx = lerp(-2.8, 1.6, t);
  const wz = lerp(17.4, 16.6, t);
  const pose = walkPose(f * 0.055, 1);
  // on his name: he checks his watch mid-stride
  const watch = prog(f, T.walter - CUT2, T.walter - CUT2 + 5, easeOut) *
    (1 - prog(f, T.white - CUT2 + 4, T.white - CUT2 + 10, easeInOut));
  pose.shL = lerp(pose.shL, 56, watch);
  pose.elL = lerp(pose.elL, 106, watch);
  pose.torso = lerp(pose.torso, 2, watch);
  // on "chemistry": he looks up at the building
  const lookUp = prog(f, T.chem - CUT2, T.chem - CUT2 + 6, easeOut) *
    (1 - prog(f, T.at - CUT2, T.at - CUT2 + 8, easeInOut));
  const look = teacherLook({
    yaw: 0.3,
    lookX: 0.3,
    lookY: lerp(0.08, 0.6, watch) - 0.55 * lookUp,
    brow: 0.15 * lookUp - 0.1 * watch,
    mouth: watch > 0.4 ? "flat" : "neutral",
    lids: 0.14 + blink(f, 3) * 0.6,
  });
  const anch = rigAnchors(pose, TEACHER.height, 0.62);
  // background students: three distinct actions (never the same idle)
  const leanSway = Math.sin(f * 0.05) * 1.6;
  const leanPose: Pose = {
    torso: 7 + leanSway, neck: -3, shL: 34, shR: 6, elL: 66, elR: 24,
    hipL: 3, hipR: -12, knL: 4, knR: 14, breathe: breath(f, 0.1, 1),
  };
  const doorT = prog(f, 0, CUT3 - CUT2, easeInOut);
  const walkerPose = walkPose(f * 0.06 + 0.4, 1);
  const readerPose: Pose = {
    torso: 4, neck: 9, shL: 52, shR: 46, elL: 72, elR: 66,
    hipL: 2, hipR: -3, knL: 3, knR: 5, breathe: breath(f, 0.12, 3),
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs tone="day" />
        <Sky cam={cam} f={f} tone="day" sun={[430, 150]} clouds={4} />
        <DuneRidge cam={cam} f={f} z={900} tone="day" />
        <SchoolExterior cam={cam} f={f} />
        {/* his beige sedan parked near the walkway */}
        <Card cam={cam} x={-5.5} z={19.4} flip>
          <Sedan body={BODY} shade={BODY_D} light={BODY_L} head={0} tail={0} driver={false} rust={0.15} />
        </Card>
        {/* background students */}
        <Card cam={cam} x={4.6} z={27.7}>
          {groundShadow(0.34)}
          <Figure pose={leanPose} view={0.72} look={studentLook(0, { yaw: -0.35, lookX: -0.3, lids: 0.2 })} pal={STUDENTS[0].pal} height={STUDENTS[0].height} outfit={STUDENTS[0].hoodie ? "hoodie" : "jacket"} rimLight="#fff1c9" />
        </Card>
        <Card cam={cam} x={lerp(7.4, 7.1, doorT)} z={lerp(22.4, 26.4, doorT)}>
          {groundShadow(0.34)}
          <Figure pose={walkerPose} view={0.55} look={studentLook(1, { yaw: 0.2 })} pal={STUDENTS[1].pal} height={STUDENTS[1].height} outfit={STUDENTS[1].hoodie ? "hoodie" : "jacket"} rimLight="#fff1c9" />
        </Card>
        <Card cam={cam} x={3.8} z={21.2}>
          {groundShadow(0.34)}
          <Figure pose={readerPose} view={0.85} look={studentLook(4, { lookY: 0.5, lookX: 0.2, lids: 0.35 })} pal={STUDENTS[4].pal} height={STUDENTS[4].height} rimLight="#fff1c9" />
          {/* notebook in his hands (profile: wrists reach forward) */}
          {(() => {
            const a = rigAnchors(readerPose, STUDENTS[4].height, 0.4);
            return (
              <g transform={`translate(${(a.wristL.x + a.wristR.x) / 2},${(a.wristL.y + a.wristR.y) / 2 - 0.02})`}>
                <rect x={-0.1} y={-0.08} width={0.2} height={0.15} rx={0.012} fill="#e8e2d2" stroke="#17130f" strokeWidth={0.007} transform={`rotate(-18)`} />
              </g>
            );
          })()}
        </Card>
        {/* Walt */}
        <Card cam={cam} x={wx} y={0} z={wz}>
          {groundShadow(0.4)}
          <Figure pose={pose} view={0.62} look={look} pal={TEACHER.pal} height={TEACHER.height} rimLight="#fff1c9" rimSide={1} />
          {/* briefcase swinging from his right hand */}
          <g transform={`translate(${anch.wristR.x},${anch.wristR.y + 0.02}) rotate(${Math.sin(f * 0.11) * 4})`}>
            <path d="M-0.07,-0.02 q0.07,-0.05 0.14,0" stroke="#3a2a1c" strokeWidth={0.022} fill="none" />
            <rect x={-0.2} y={0.0} width={0.4} height={0.3} rx={0.02} fill="#6b4a2e" stroke="#17130f" strokeWidth={0.012} />
            <rect x={-0.2} y={0.1} width={0.4} height={0.045} fill="#553a22" />
            <rect x={-0.03} y={0.12} width={0.06} height={0.05} rx={0.01} fill="#c9b48a" />
          </g>
        </Card>
        {/* near-lens chain-link post (a tight soft mesh patch hugging the post) */}
        {(() => {
          const top = project(cam, 2.1, 2.3, 13.2), base = project(cam, 2.1, 0, 13.2);
          const w = 0.075 * top.s;
          if (top.x < W - 40 && top.x > W * 0.55) {
            const m0 = top.x - 40;
            return (
              <g>
                {Array.from({ length: 4 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <line x1={m0 + i * 55} y1={base.y} x2={m0 + 55 + i * 55} y2={top.y}
                      stroke="#8a9096" strokeWidth={2} opacity={0.3} />
                    <line x1={m0 + i * 55} y1={top.y} x2={m0 + 55 + i * 55} y2={base.y}
                      stroke="#8a9096" strokeWidth={2} opacity={0.3} />
                  </React.Fragment>
                ))}
                <rect x={top.x - w / 2} y={top.y} width={w} height={base.y - top.y} fill="#6a7076" stroke="#3d4248" strokeWidth={2} />
                <ellipse cx={top.x - 30} cy={(top.y + base.y) / 2} rx={330} ry={(base.y - top.y) * 0.7} fill="#57514a" opacity={0.24} />
              </g>
            );
          }
          return null;
        })()}
        <HeatShimmer f={f} region={[0, 700, W, 260]} n={10} op={0.05} />
        <Birds f={f} n={2} y={140} span={1400} sp={1.2} />
      </svg>
      <Motes f={f} n={30} color="#ffe9c4" seed={9} region={[0, 0, W, H * 0.75]} drift={0.5} />
      <Finish f={f} vig={0.55} grain={0.07} shadow="#3a2a10" gradeO={0.13} />
    </AbsoluteFill>
  );
};

/* ═════════════ S3 · chemistry classroom · "high school that has seen better decades" ═════════════ */
const S3: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = global 225
  const cam: Cam = {
    x: 0.6, y: 1.5, z: lerp(1.2, 0.55, prog(f, 15, 45, easeInOut)),
    f: 1400, shiftY: -70, focus: 6, aperture: 0.5,
  };
  // the failing fluorescent tube stutters through "has seen better decades"
  const flEnv = prog(f, T.has - CUT3, T.has - CUT3 + 3, easeOut) *
    (1 - prog(f, T.decades - CUT3 - 2, T.decades - CUT3 + 3, easeInOut));
  const flicker = flEnv * (noise1(f * 2.1, 9) > -0.25 ? 1 : 0.08);

  // Walt: lecture gesture → glances up at the tube → settles back to the class
  const up = prog(f, T.better - CUT3 - 6, T.better - CUT3, easeOut) *
    (1 - prog(f, T.decades - CUT3 - 8, T.decades - CUT3 - 2, easeInOut));
  const settle = prog(f, T.decades - CUT3, T.decades - CUT3 + 10, easeInOut);
  const talk = (1 - up) * (0.3 + 0.7 * Math.abs(Math.sin(f * 0.47)));
  const wPose: Pose = {
    torso: lerp(4, -1, settle) + Math.sin(f * 0.06) * 1.2,
    neck: lerp(2, -7, up),
    // right arm: raised open hand presenting (front view: +sh = out, +el folds the forearm up-in)
    shR: lerp(lerp(112 + Math.sin(f * 0.3) * 7, 38, up), 58, settle),
    elR: lerp(lerp(34 + Math.sin(f * 0.3 + 0.7) * 9, 16, up), 32, settle),
    shL: lerp(9 + Math.sin(f * 0.13) * 3, 6, settle),
    elL: lerp(27 + Math.sin(f * 0.16 + 1) * 4, 20, settle),
    hipL: 3, hipR: -3, knL: 4, knR: 4,
    breathe: breath(f, 0.1, 0),
  };
  const wLook = teacherLook({
    yaw: lerp(0.2, 0.05, settle),
    lookX: 0.24 + 0.1 * Math.sin(f * 0.05),
    lookY: -0.5 * up + 0.1,
    brow: 0.35 * up,
    mouth: up > 0.5 ? "flat" : "neutral",
    mouthOpen: talk * 0.5,
    lids: 0.12 + blink(f, 7) * 0.6,
  });

  // students — five distinct seated actions (arms kept low; one hand up)
  const raise = prog(f, 16, 24, easeOut);
  const whisper = 0.4 + 0.6 * Math.abs(Math.sin(f * 0.42));
  const whisper2 = 0.4 + 0.6 * Math.abs(Math.sin(f * 0.42 + 1.6));
  const sWrite: Pose = { ...chairSit(), torso: 8 + Math.sin(f * 0.09) * 1.5, neck: 11,
    shR: 16 + Math.sin(f * 0.85) * 5, elR: 44, shL: 9, elL: 30, breathe: breath(f, 0.11, 0) };
  const sBored: Pose = { ...chairSit(), torso: 12, neck: 5, shR: 20, elR: 50, shL: 7, elL: 26,
    hipL: 5, hipR: -2, breathe: breath(f, 0.09, 1) };
  const sWhL: Pose = { ...chairSit(), torso: 10, neck: -5, shL: 13, elL: 38, shR: 21, elR: 52,
    breathe: breath(f, 0.1, 2) };
  const sWhR: Pose = { ...chairSit(), torso: -7, neck: 6, shL: 15, elL: 42, shR: 11, elR: 34,
    breathe: breath(f, 0.11, 3) };
  const sHand: Pose = { ...chairSit(),
    shL: lerp(13, 165, raise), elL: lerp(38, 12, raise),
    shR: 14, elR: 42, neck: lerp(7, -3, raise),
    breathe: breath(f, 0.12, 4) };
  const sLooks = [
    studentLook(0, { lookY: 0.5, lookX: 0.15, lids: 0.32 }),
    studentLook(1, { lookX: -0.35, lookY: 0.15, lids: 0.55, brow: -0.15, mouth: "flat" }),
    studentLook(2, { lookX: 0.35, yaw: 0.2, mouth: "neutral", mouthOpen: 0.4 * whisper }),
    studentLook(3, { lookX: -0.3, yaw: -0.2, mouth: "neutral", mouthOpen: 0.3 * whisper2 }),
    studentLook(4, { lookX: -0.3, lookY: lerp(0.15, -0.25, raise), lids: lerp(0.4, 0.1, raise),
      mouth: raise > 0.5 ? "flat" : "neutral" }),
  ];
  const poses = [sWrite, sBored, sWhL, sWhR, sHand];
  const heights = STUDENTS.map((s) => s.height);
  // drawn farthest-first: back row, Walt (deepest), front row
  const BACK = [{ x: 0.1, z: 6.0, i: 1 }];
  const FRONT = [
    { x: -1.6, z: 4.65, i: 0 },
    { x: -0.35, z: 4.65, i: 2 },
    { x: 0.9, z: 4.65, i: 3 },
    { x: 2.3, z: 4.55, i: 4 },
  ];
  const student = (st: { x: number; z: number; i: number }, key: string) => (
    <g key={key}>
      <Chair cam={cam} x={st.x} z={st.z} />
      <Card cam={cam} x={st.x} y={0} z={st.z}>
        <Figure pose={poses[st.i]} view={0.14 + (st.i % 3) * 0.08} look={sLooks[st.i]}
          pal={STUDENTS[st.i].pal} height={heights[st.i]}
          outfit={STUDENTS[st.i].hoodie ? "hoodie" : "jacket"} rimLight="#ffe8b8" rimSide={-1} />
      </Card>
      <Desk cam={cam} x={st.x} z={st.z - 0.5} />
    </g>
  );

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SchoolClassroom cam={cam} f={f} flicker={flicker} />
        {/* Walt at the board — deepest figure, drawn before the class */}
        <Card cam={cam} x={-1.9} y={0} z={7.3 - 0.2 * settle}>
          {groundShadow(0.42)}
          <Figure pose={wPose} view={0.18} look={wLook} pal={TEACHER.pal} height={TEACHER.height}
            rimLight="#ffe8b8" rimSide={-1} />
        </Card>
        {BACK.map((st) => student(st, "b"))}
        {FRONT.map((st) => student(st, `f${st.i}`))}
        {/* foreground: a near student's head-and-shoulders silhouette (near layer) */}
        {(() => {
          const p = project(cam, 1.35, 1.02, 2.6);
          const r = 0.15 * p.s;
          return (
            <g>
              <ellipse cx={p.x} cy={p.y + r * 1.15} rx={r * 2.2} ry={r * 1.0} fill="#26221c" />
              <ellipse cx={p.x} cy={p.y} rx={r} ry={r * 1.12} fill="#26221c" />
            </g>
          );
        })()}
      </svg>
      <Motes f={f} n={26} color="#ffe8b8" seed={13} region={[80, 320, 760, 620]} drift={0.4} />
      <Finish f={f} vig={0.6} grain={0.07} shadow="#3a3228" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ═════════════════════════ assembly + sound ═════════════════════════ */
export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0b09" }}>
    <Sequence from={0} durationInFrames={CUT2} name="S1 highway"><S1 /></Sequence>
    <Sequence from={CUT2} durationInFrames={CUT3 - CUT2} name="S2 school"><S2 /></Sequence>
    <Sequence from={CUT3} durationInFrames={T.end - CUT3} name="S3 classroom"><S3 /></Sequence>
    <Sequence from={0} durationInFrames={CUT2 + 20}>
      <Audio src={staticFile("sfx/a_wind.wav")} volume={0.035} />
    </Sequence>
    <Sequence from={114} durationInFrames={74}>
      <Audio src={staticFile("sfx/a_carpass.wav")} volume={0.11} />
    </Sequence>
    <Sequence from={CUT3} durationInFrames={T.end - CUT3}>
      <Audio src={staticFile("sfx/a_room.wav")} volume={0.035} />
    </Sequence>
    <Sequence from={CUT3 + 6} durationInFrames={32}>
      <Audio src={staticFile("sfx/a_chalk.wav")} volume={0.1} />
    </Sequence>
    <Sequence from={CUT3 + 21} durationInFrames={56}>
      <Audio src={staticFile("sfx/a_flicker.wav")} volume={0.1} />
    </Sequence>
  </AbsoluteFill>
);
