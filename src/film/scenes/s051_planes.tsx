// SCENE 051 · "planes" · set: tower · narration 823.27s → 835.06s (11.79s) · batch B
// Narration:
//   Two planes, over Albuquerque, at night. One hundred and sixty-seven people. Nobody ever says it out
//   loud. The show just stands a man in a control tower and lets you do it.
// Staging:
//   S1 (823.27–826.55) Wide night sky over Albuquerque's glittering street grid: two distant navigation-lit
//                      airliners converge high in the clouds; at 825.85s a silent white-amber bloom lights
//                      the cloud deck from within.
//   S2 (826.55–828.95) Quiet suburban backyard pool reflection ("One hundred and sixty-seven people"):
//                      dark stucco eaves & power lines frame two drifting ember plumes reflected in still
//                      blue night water.
//   S3 (828.95–831.15) Tight close-up on Donald inside the tower ("Nobody ever says it out loud"): distant
//                      orange sky-glow flickers across his frozen, wordless face as the headset slips loose.
//   S4 (831.15–835.06) Symmetrical wide pull-back inside the panoramic glass control tower cab ("just stands
//                      a man in a control tower and lets you do it"): Donald stands alone in silhouette
//                      against the night sky and the city below, headset dangling by its cord from his hand.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, rand } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { DONALD, donaldLook, TowerCabNight, TowerFore } from "../../env/b_tower";
import { SoftDefs, Puff } from "../../env/b_common";
import { rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 51, id: "planes", set: "tower", cutIn: 823.27, cutOut: 835.06 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(835.06);
const CUTS = {
  s1: 0,
  s2: B(826.55),
  s3: B(828.95),
  s4: B(831.15),
  end: END,
};

/* ─────────── S1 · "Two planes, over Albuquerque, at night." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const meetFrame = B(825.82);
  const approach = clamp(f / meetFrame);
  const flash = f >= meetFrame ? Math.exp(-(f - meetFrame) * 0.085) : 0;
  const afterGlow = f >= meetFrame ? clamp((f - meetFrame) / 14) * 0.65 : 0;
  const strobe = Math.sin(f * 0.65) > 0.7 ? 1 : 0.25;

  const p1x = lerp(420, 958, approach);
  const p1y = lerp(245, 318, approach);
  const p2x = lerp(1510, 962, approach);
  const p2y = lerp(385, 322, approach);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <linearGradient id="s051AbqNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#050812" />
            <stop offset="0.65" stopColor="#0d162b" />
            <stop offset="1" stopColor="#1e2740" />
          </linearGradient>
          <radialGradient id="s051CloudFlash">
            <stop offset="0" stopColor="#fff9e6" stopOpacity={0.95 * flash + 0.35 * afterGlow} />
            <stop offset="0.35" stopColor="#ff9a42" stopOpacity={0.65 * flash + 0.32 * afterGlow} />
            <stop offset="0.75" stopColor="#b83f28" stopOpacity={0.25 * (flash + afterGlow)} />
            <stop offset="1" stopColor="#b83f28" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width={W} height={H} fill="url(#s051AbqNight)" />

        {/* Starfield */}
        {Array.from({ length: 75 }).map((_, i) => (
          <circle key={i} cx={rand(i, 3) * W} cy={rand(i, 8) * 620} r={rand(i, 11) < 0.2 ? 1.5 : 0.9} fill="#dce8ff" opacity={0.45} />
        ))}

        {/* High night cloud strata */}
        {[
          [540, 290, 340, 28], [980, 335, 420, 34], [1390, 275, 310, 24],
        ].map(([cx, cy, rx, ry], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={flash > 0.1 || afterGlow > 0.1 ? "#4a2c33" : "#121c33"}
            opacity={0.75}
          />
        ))}

        {/* Two distant airliners with faint contrails & navigation strobes prior to convergence */}
        {f < meetFrame && (
          <g>
            <line x1={260} y1={224} x2={p1x} y2={p1y} stroke="#7d95b8" strokeWidth={2} opacity={0.28} />
            <g transform={`translate(${p1x},${p1y}) rotate(8)`}>
              <polygon points="-22,-2 18,0 -22,2" fill="#cfdcf0" />
              <polygon points="-4,-14 4,0 -4,14" fill="#9fb2cf" />
              <circle cx={18} cy={0} r={3.5} fill="#ffffff" opacity={0.9} />
              <circle cx={-4} cy={-14} r={3} fill="#ff3b30" opacity={strobe} />
            </g>

            <line x1={1680} y1={404} x2={p2x} y2={p2y} stroke="#7d95b8" strokeWidth={2} opacity={0.28} />
            <g transform={`translate(${p2x},${p2y}) rotate(187)`}>
              <polygon points="-22,-2 18,0 -22,2" fill="#cfdcf0" />
              <polygon points="-4,-14 4,0 -4,14" fill="#9fb2cf" />
              <circle cx={18} cy={0} r={3.5} fill="#ffffff" opacity={0.9} />
              <circle cx={-4} cy={14} r={3} fill="#4ef29c" opacity={strobe} />
            </g>
          </g>
        )}

        {/* Silent high-altitude white-amber bloom inside the night clouds at 825.82s */}
        {f >= meetFrame && (
          <g>
            <circle cx={960} cy={320} r={420 + (f - meetFrame) * 4} fill="url(#s051CloudFlash)" />
            <Puff x={960} y={320} r={38 + (f - meetFrame) * 2.2} o={0.55} light seed={4} />
          </g>
        )}

        {/* Sandia mountain silhouette + glittering Albuquerque street-light grid below */}
        <polygon points="0,735 340,675 790,712 1280,655 1690,698 1920,680 1920,785 0,785" fill="#090e1a" />
        <rect x={0} y={745} width={W} height={335} fill="#070a12" />
        {/* Perspective avenues of streetlights */}
        {[-3, -2, -1, 0, 1, 2, 3].map((lane) => (
          <line
            key={lane}
            x1={960 + lane * 145}
            y1={752}
            x2={960 + lane * 460}
            y2={1080}
            stroke="#ff9e4a"
            strokeWidth={1.6}
            opacity={0.28}
          />
        ))}
        {Array.from({ length: 140 }).map((_, i) => {
          const row = i % 9;
          const gy = 755 + row * 34 + rand(i, 31) * 12;
          const gx = rand(i, 32) * W;
          const col = i % 4 === 0 ? "#ffd996" : i % 6 === 0 ? "#9ecaff" : "#ff9b4e";
          return <circle key={i} cx={gx} cy={gy} r={1.2 + row * 0.25} fill={col} opacity={0.65} />;
        })}
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#050b18" gradeO={0.18} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "One hundred and sixty-seven people." — dark rooftops & backyard pool reflection ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <linearGradient id="s051PoolSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070c1a" />
            <stop offset="0.55" stopColor="#141e36" />
            <stop offset="1" stopColor="#262038" />
          </linearGradient>
          <radialGradient id="s051EmberSky">
            <stop offset="0" stopColor="#ff8842" stopOpacity={0.42} />
            <stop offset="0.6" stopColor="#9e3628" stopOpacity={0.14} />
            <stop offset="1" stopColor="#9e3628" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect x={0} y={0} width={W} height={640} fill="url(#s051PoolSky)" />
        <circle cx={1040} cy={180} r={420} fill="url(#s051EmberSky)" />

        {/* Two silent, diverging ember-smoke trails high in the night sky */}
        <path
          d={`M980,120 Q${lerp(910, 860, t)},215 ${lerp(845, 785, t)},325`}
          fill="none"
          stroke="#d96b38"
          strokeWidth={6}
          opacity={0.55}
          strokeLinecap="round"
        />
        <path
          d={`M1015,125 Q${lerp(1095, 1145, t)},225 ${lerp(1165, 1235, t)},345`}
          fill="none"
          stroke="#d96b38"
          strokeWidth={5}
          opacity={0.48}
          strokeLinecap="round"
        />
        <circle cx={lerp(845, 785, t)} cy={325} r={5} fill="#ffbe78" />
        <circle cx={lerp(1165, 1235, t)} cy={345} r={4.5} fill="#ffbe78" />

        {/* Dark suburban stucco rooflines & utility wires */}
        <polygon points="0,385 480,315 620,465 0,465" fill="#0b0f18" />
        <polygon points="1380,355 1920,295 1920,465 1310,465" fill="#0b0f18" />
        <path d="M0,225 Q960,295 1920,210" fill="none" stroke="#080b12" strokeWidth={3} />
        <rect x={0} y={455} width={W} height={175} fill="#121724" stroke="#07090f" strokeWidth={4} />

        {/* Still suburban swimming pool reflecting the orange ember plumes upside-down in dark blue water */}
        <polygon points="140,630 1780,630 1920,1080 0,1080" fill="#232a38" stroke="#090c14" strokeWidth={5} />
        <polygon points="235,665 1685,665 1840,1080 80,1080" fill="#0d1d33" stroke="#182b47" strokeWidth={5} />
        {/* Reflected orange sky glow & water ripples */}
        <ellipse cx={1040} cy={845} rx={290} ry={95} fill="#ff843d" opacity={0.18} />
        {[-45, 0, 48, 95].map((ry, i) => (
          <ellipse
            key={i}
            cx={1040 + Math.sin(f * 0.08 + i) * 14}
            cy={835 + ry}
            rx={180 - Math.abs(ry)}
            ry={8}
            fill="none"
            stroke="#ffae6b"
            strokeWidth={2}
            opacity={0.28}
          />
        ))}
      </svg>
      <Finish f={g} vig={0.72} grain={0.08} shadow="#060e1f" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "Nobody ever says it out loud." — tight close-up on Donald in the tower ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const flicker = 0.55 + 0.25 * Math.sin(f * 0.22);
  const cam: Cam = {
    x: 0,
    y: 1.48,
    z: lerp(1.85, 2.02, easeOut(f / dur)),
    f: 1620,
    shiftY: 24,
    focus: 1.6,
    aperture: 0.3,
  };

  const poseD: Pose = {
    torso: 3,
    neck: -2,
    shL: -10,
    shR: 24,
    elL: 22,
    elR: 58,
    hipL: 5,
    hipR: -5,
    knL: 4,
    knR: 4,
    breathe: 0.2,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <TowerCabNight cam={cam} f={g} skyFlash={flicker * 0.65} />

        {/* Donald standing frozen, distant orange reflection flickering across his face */}
        <Card cam={cam} x={0} y={0} z={3.45} blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={donaldLook({
              yaw: 0.2,
              lids: 0.06,
              lookX: 0.22,
              lookY: -0.06,
              brow: 0.48,
              mouth: "flat",
            })}
            pal={DONALD.pal}
            height={DONALD.height}
            rimLight="#ff9b52"
            rimSide={1}
          />
        </Card>

        <TowerFore />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#060d1c" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "The show just stands a man in a control tower and lets you do it." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.end - CUTS.s4;
  const t = f / dur;
  const cam: Cam = {
    x: 0,
    y: 1.38,
    z: lerp(1.35, 0.75, easeInOut(t)),
    f: 1280,
    shiftY: -18,
    focus: 3.6,
    aperture: 0.2,
  };

  const poseD: Pose = {
    torso: 3,
    neck: -2,
    shL: -8,
    shR: 18,
    elL: 18,
    elR: 34,
    hipL: 5,
    hipR: -4,
    knL: 4,
    knR: 4,
    breathe: 0.22,
  };
  const ancD = rigAnchors(poseD, DONALD.height, 0.16);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <TowerCabNight cam={cam} f={g} skyFlash={0.42} />

        {/* Two faint smoke trails visible outside the panoramic tower windows */}
        <path d="M845,255 Q805,340 775,435" fill="none" stroke="#c96538" strokeWidth={4} opacity={0.42} strokeLinecap="round" />
        <path d="M1075,260 Q1120,345 1155,445" fill="none" stroke="#c96538" strokeWidth={4} opacity={0.38} strokeLinecap="round" />

        {/* Solitary silhouette of Donald standing center-frame in the control tower cab */}
        <Card cam={cam} x={0} y={0} z={3.85} blur={false}>
          <Figure
            pose={poseD}
            view={0.16}
            look={donaldLook({ yaw: 0.06, lids: 0.2, brow: 0.3, mouth: "flat" })}
            pal={{
              ...DONALD.pal,
              skin: "#3a3438",
              skinShade: "#242026",
              skinLight: "#594842",
              jacket: "#141822",
              jacketShade: "#0b0e15",
              jacketLight: "#282f40",
              shirt: "#2d384a",
              pants: "#10141d",
            }}
            height={DONALD.height}
            rimLight="#ff9b52"
            rimSide={1}
          />
          {/* ATC boom headset dangling motionless from his right hand by its cord */}
          <g transform={`translate(${ancD.wristR.x + 0.02},${ancD.wristR.y})`}>
            <path d="M0,0 Q0.02,0.12 -0.01,0.22" fill="none" stroke="#0c0f16" strokeWidth={0.008} />
            <circle cx={-0.01} cy={0.25} r={0.038} fill="none" stroke="#181e2b" strokeWidth={0.012} />
            <ellipse cx={-0.04} cy={0.26} rx={0.018} ry={0.024} fill="#181e2b" />
          </g>
        </Card>

        <TowerFore />
        <Motes f={g} n={12} color="#ffae70" seed={12} drift={0.15} />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#050b18" gradeO={0.22} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 two planes at night"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 167 people"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 nobody says it out loud"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.end - CUTS.s4} name="S4 man in control tower"><S4 /></Sequence>
    {/* Delayed distant thunderous rumble arriving seconds after the high-altitude flash */}
    <Sequence from={B(826.25)} durationInFrames={65}><Audio src={staticFile("sfx/b_faint_crash.wav")} volume={0.11} /></Sequence>
  </AbsoluteFill>
);
