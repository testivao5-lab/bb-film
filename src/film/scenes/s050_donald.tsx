// SCENE 050 · "donald" · set: tower · narration 807.11s → 823.27s (16.16s) · batch B
// Narration:
//   She had a father. Donald Margolis is an air traffic controller who takes a phone call about his
//   daughter and then keeps going, because somebody has to. He should not have gone back to work that
//   week. He did. A shift, and a job where two seconds is a catastrophe.
// Staging:
//   S1 (807.11–809.65) Quiet morning hallway portrait ("She had a father"): Donald stands beside a framed
//                      portrait of Jane on the credenza, adjusting his collar with tired eyes.
//   S2 (809.65–816.85) Corded telephone call ("takes a phone call about his daughter and then keeps going"):
//                      Donald's hand braces against the table as the news hits at 813.3s, then he hangs up
//                      with hollow, mechanical resolve.
//   S3 (816.85–820.25) Darkened ATC radar room ("should not have gone back to work that week. He did"):
//                      Donald sits at his green-lit radar console and pulls on his boom headset at 819.5s.
//   S4 (820.25–821.45) Tight emerald-lit close-up ("A shift, and a job..."): boom mic at his lip, exhausted
//                      eyes losing focus for a fatal moment in the phosphor glow.
//   S5 (821.45–823.27) Macro radar scope close-up ("...where two seconds is a catastrophe"): two transponder
//                      targets converge onto the exact same point, flashing collision-red as his hand lunges
//                      for the transmit switch.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { JANE } from "../../env/b_bedroom";
import {
  DONALD, donaldLook, radarTint, TowerRadarRoom, RadarConsole, TowerFore,
} from "../../env/b_tower";
import { wallQuad, flatQuad, SoftDefs } from "../../env/b_common";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 50, id: "donald", set: "tower", cutIn: 807.11, cutOut: 823.27 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(823.27);
const CUTS = {
  s1: 0,
  s2: B(809.65),
  s3: B(816.85),
  s4: B(820.25),
  s5: B(821.45),
  end: END,
};

const PAL_D_RADAR = radarTint(DONALD.pal);

/** ATC single-ear boom headset in metre space (anchored to head) */
const BoomHeadset: React.FC = () => (
  <g>
    <path d="M-0.06,-0.095 A0.075,0.085 0 0 1 0.065,-0.04" fill="none" stroke="#181c22" strokeWidth={0.012} />
    <ellipse cx={-0.025} cy={-0.005} rx={0.024} ry={0.032} fill="#232a34" stroke="#0c0e12" strokeWidth={0.006} />
    <path d="M-0.015,0.015 Q0.035,0.055 0.088,0.042" fill="none" stroke="#181c22" strokeWidth={0.007} strokeLinecap="round" />
    <ellipse cx={0.092} cy={0.042} rx={0.012} ry={0.008} fill="#111419" />
  </g>
);

/* ─────────── S1 · "She had a father." — quiet morning credenza & framed portrait of Jane ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2 - CUTS.s1;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.08, 0.05, easeInOut(t)),
    y: 1.32,
    z: lerp(1.55, 1.78, easeInOut(t)),
    f: 1480,
    shiftY: -35,
    focus: 2.1,
    aperture: 0.26,
  };

  const poseD: Pose = {
    torso: 4,
    neck: 8,
    shL: -12,
    shR: 36,
    elL: 36,
    elR: 24,
    hipL: 5,
    hipR: -5,
    knL: 4,
    knR: 5,
    breathe: 0.55,
  };

  const OL = "#1c1714";

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <rect x={0} y={0} width={W} height={H} fill="#2e2925" />
        {/* Muted pale morning hallway wall & warm window shaft */}
        <polygon points={wallQuad(cam, -3.8, 3.8, 0, 2.75, 4.45)} fill="#544d46" stroke={OL} strokeWidth={2} />
        <polygon points={flatQuad(cam, -3.8, 3.8, 1.8, 4.45, 0)} fill="#3b2c22" stroke={OL} strokeWidth={1.5} />
        <polygon points="0,80 1280,260 1280,580 0,380" fill="#fff0cf" opacity={0.09} />

        {/* Donald standing quietly beside the hallway credenza */}
        <Card cam={cam} x={-0.38} y={0} z={3.65} blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={donaldLook({
              yaw: 0.24,
              lids: 0.22 + blink(g, 2) * 0.4,
              lookX: 0.34,
              lookY: 0.22,
              brow: 0.18,
              mouth: "flat",
            })}
            pal={DONALD.pal}
            height={DONALD.height}
            rimLight="#ffecc4"
            rimSide={1}
          />
        </Card>

        {/* Wooden hallway credenza in right foreground-mid with framed portrait of Jane */}
        <Card cam={cam} x={0.48} y={0} z={3.45} blur={false}>
          <rect x={-0.55} y={-0.82} width={1.1} height={0.82} fill="#593f2d" stroke={OL} strokeWidth={0.012} />
          <rect x={-0.58} y={-0.86} width={1.16} height={0.045} fill="#6e503a" stroke={OL} strokeWidth={0.01} />
          {/* Silver-framed photo of Jane (her unmistakable black bangs, pale skin & plum top) */}
          <g transform="translate(-0.12,-1.04) rotate(-4)">
            <rect x={-0.12} y={-0.16} width={0.24} height={0.3} rx={0.01} fill="#b8c0cc" stroke={OL} strokeWidth={0.01} />
            <rect x={-0.095} y={-0.135} width={0.19} height={0.25} fill="#d8e0eb" />
            <path d="M-0.075,0.115 C-0.07,0.03 0.07,0.03 0.075,0.115 Z" fill={JANE.pal.jacket} />
            <circle cx={0} cy={-0.025} r={0.058} fill={JANE.hair.base} />
            <ellipse cx={0} cy={-0.015} rx={0.042} ry={0.048} fill={JANE.pal.skin} />
            <path d="M-0.044,-0.028 C-0.044,-0.075 0.044,-0.075 0.044,-0.028 Z" fill={JANE.hair.base} />
            <circle cx={-0.014} cy={-0.014} r={0.004} fill="#18141c" />
            <circle cx={0.014} cy={-0.014} r={0.004} fill="#18141c" />
            <path d="M-0.012,0.008 Q0,0.015 0.012,0.008" fill="none" stroke="#823646" strokeWidth={0.004} />
          </g>
          {/* Ceramic coffee mug */}
          <rect x={0.22} y={-0.98} width={0.09} height={0.12} rx={0.012} fill="#e6dfd1" stroke={OL} strokeWidth={0.008} />
        </Card>

        <Motes f={g} n={14} color="#fff0cf" seed={2} drift={0.3} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.07} shadow="#1a1614" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...takes a phone call about his daughter and then keeps going..." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  // News hits at 813.1s ("about his daughter"); hangs up & straightens with hollow resolve at 814.8s ("keeps going")
  const shock = prog(g, B(812.95), B(813.85), easeOut);
  const hangUp = prog(g, B(814.65), B(816.15), easeInOut);

  const cam: Cam = {
    x: 0.08,
    y: 1.36,
    z: lerp(1.65, 1.92, easeInOut(f / (CUTS.s3 - CUTS.s2))),
    f: 1520,
    shiftY: -32,
    focus: 1.9,
    aperture: 0.28,
  };

  const poseD: Pose = {
    torso: lerp(3, 16, shock) - 10 * hangUp,
    neck: lerp(2, 12, shock) - 6 * hangUp,
    // Left (far) hand holds corded phone to left ear so Donald's face stays 100% unobstructed; lowers onto cradle on "keeps going"
    shL: lerp(78, 42, hangUp),
    elL: lerp(124, 30, hangUp),
    // Right hand braces hard onto the phone table edge on shock
    shR: lerp(14, 44, shock),
    elR: lerp(38, 24, shock),
    hipL: 6,
    hipR: -5,
    knL: lerp(4, 14, shock) - 10 * hangUp,
    knR: lerp(4, 12, shock) - 8 * hangUp,
    breathe: 0.45,
  };
  const ancD = rigAnchors(poseD, DONALD.height, 0.58);
  const OL = "#171412";

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <rect x={0} y={0} width={W} height={H} fill="#252220" />
        <polygon points={wallQuad(cam, -3.5, 3.5, 0, 2.75, 4.35)} fill="#45403c" stroke={OL} strokeWidth={2} />
        <polygon points={flatQuad(cam, -3.5, 3.5, 1.9, 4.35, 0)} fill="#30251e" />

        {/* Donald taking the devastating call, bracing on the table, then setting the phone down */}
        <Card cam={cam} x={-0.18} y={0} z={3.55} blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={donaldLook({
              yaw: 0.24,
              lids: lerp(0.2, 0.88, shock) - 0.52 * hangUp,
              lookX: 0.28,
              lookY: lerp(0.04, 0.32, shock),
              brow: lerp(0.25, 0.82, shock),
              mouth: shock > 0.3 && hangUp < 0.4 ? "open" : "flat",
              mouthOpen: 0.16 * shock * (1 - hangUp),
            })}
            pal={DONALD.pal}
            height={DONALD.height}
            rimLight="#d8e4f2"
            rimSide={1}
          />
          {/* Corded handset in left hand + coiled cord down to the table base */}
          <path
            d={`M${ancD.wristL.x + 0.02},${ancD.wristL.y + 0.02} Q0.32,-0.62 0.48,-0.84`}
            fill="none"
            stroke="#16181f"
            strokeWidth={0.01}
          />
          <rect
            x={ancD.wristL.x - 0.015}
            y={ancD.wristL.y - 0.055}
            width={0.045}
            height={0.11}
            rx={0.015}
            fill="#1e222b"
            stroke="#0b0d12"
            strokeWidth={0.006}
          />
        </Card>

        {/* Side table with landline phone base */}
        <Card cam={cam} x={0.36} y={0} z={3.48} blur={false}>
          <rect x={-0.32} y={-0.78} width={0.64} height={0.78} fill="#4d3728" stroke={OL} strokeWidth={0.012} />
          <rect x={-0.12} y={-0.85} width={0.24} height={0.07} rx={0.012} fill="#1e222b" stroke="#0b0d12" strokeWidth={0.008} />
        </Card>

        <Motes f={g} n={12} color="#dce6f2" seed={5} drift={0.22} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#121622" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "He should not have gone back to work that week. He did." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const headsetOn = prog(g, B(819.1), B(819.85), easeInOut);

  const cam: Cam = {
    x: 0.05,
    y: 1.26,
    z: lerp(0.95, 1.25, easeInOut(f / (CUTS.s4 - CUTS.s3))),
    f: 1360,
    shiftY: -28,
    focus: 2.6,
    aperture: 0.25,
  };

  // Donald seated at his primary ATC radar console, raising the boom headset onto his head at "He did."
  const poseD: Pose = chairSit({
    torso: 8,
    neck: 4,
    shL: 34,
    shR: lerp(104, 38, headsetOn),
    elL: 32,
    elR: lerp(112, 34, headsetOn),
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.45,
  });
  const ancD = rigAnchors(poseD, DONALD.height, 0.58);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <TowerRadarRoom cam={cam} f={g} />

        {/* Swivel ATC chair + Donald seated before the glowing green radar console */}
        <Card cam={cam} x={-0.12} y={0} z={3.58} blur={false}>
          <rect x={-0.24} y={-1.08} width={0.12} height={0.64} rx={0.03} fill="#18202c" stroke="#070a0f" strokeWidth={0.01} />
          <rect x={-0.22} y={-0.48} width={0.44} height={0.06} rx={0.02} fill="#18202c" stroke="#070a0f" strokeWidth={0.01} />
          <line x1={0} y1={-0.42} x2={0} y2={0} stroke="#2b3545" strokeWidth={0.035} />
          <line x1={-0.22} y1={0} x2={0.22} y2={0} stroke="#2b3545" strokeWidth={0.025} />

          <Figure
            pose={poseD}
            view={0.58}
            look={donaldLook({
              yaw: 0.24,
              lids: 0.28 + blink(g, 4) * 0.4,
              lookX: 0.36,
              lookY: 0.08,
              brow: 0.38,
              mouth: "flat",
            })}
            pal={PAL_D_RADAR}
            height={DONALD.height}
            rimLight="#5ef5a0"
            rimSide={1}
          />
          {headsetOn > 0.35 && (
            <g transform={`translate(${ancD.head.x},${ancD.head.y})`}>
              <BoomHeadset />
            </g>
          )}
        </Card>

        <RadarConsole cam={cam} x={0.62} z={3.55} f={g} />
        <TowerFore />
        <Motes f={g} n={14} color="#5ef5a0" seed={8} drift={0.25} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#06121a" gradeO={0.18} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "A shift, and a job..." — tight phosphor-lit close-up on Donald's exhausted eyes ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  // Long heavy blink / loss of focus in the green radar light
  const daze = Math.sin((f / dur) * Math.PI);

  const cam: Cam = {
    x: -0.02,
    y: 1.24,
    z: 2.15,
    f: 1680,
    shiftY: -36,
    focus: 1.4,
    aperture: 0.32,
  };

  const poseD: Pose = chairSit({
    torso: 10,
    neck: 6 + daze * 4,
    shL: 36,
    shR: 40,
    elL: 34,
    elR: 36,
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.4,
  });
  const ancD = rigAnchors(poseD, DONALD.height, 0.58);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <TowerRadarRoom cam={cam} f={g} />

        <Card cam={cam} x={-0.12} y={0} z={3.58} blur={false}>
          <Figure
            pose={poseD}
            view={0.58}
            look={donaldLook({
              yaw: 0.24,
              lids: 0.32 + daze * 0.48,
              lookX: 0.34,
              lookY: 0.12,
              brow: 0.42,
              mouth: "flat",
            })}
            pal={PAL_D_RADAR}
            height={DONALD.height}
            rimLight="#5ef5a0"
            rimSide={1}
          />
          <g transform={`translate(${ancD.head.x},${ancD.head.y})`}>
            <BoomHeadset />
          </g>
        </Card>

        <RadarConsole cam={cam} x={0.62} z={3.55} f={g} />
        <TowerFore />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#06121a" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "...where two seconds is a catastrophe." — macro radar scope collision alert ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = clamp(f / dur);
  const sweepDeg = -65 + f * 4.2;
  const alert = g >= B(821.85);
  const flash = alert ? 0.55 + 0.45 * Math.sin(f * 1.1) : 0;
  const handLunge = prog(g, B(822.05), B(822.95), easeOut);

  // Two aircraft transponder blips converging inexorably toward center (960, 540)
  const p1x = lerp(745, 942, t);
  const p1y = lerp(415, 530, t);
  const p2x = lerp(1195, 978, t);
  const p2y = lerp(655, 550, t);
  const blipCol = alert ? "#ff4638" : "#5ef5a0";

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Brushed dark steel radar console face */}
        <rect x={0} y={0} width={W} height={H} fill="#10161f" />

        {/* Circular CRT radar bezel & deep phosphor glass */}
        <g transform="translate(960,540)">
          <circle cx={0} cy={0} r={478} fill="#1c2636" stroke="#070a0f" strokeWidth={10} />
          <circle cx={0} cy={0} r={442} fill="#061711" stroke="#2c3d52" strokeWidth={6} />

          {/* Concentric range rings & crosshair axes */}
          {[115, 230, 345].map((rr, i) => (
            <circle key={i} cx={0} cy={0} r={rr} fill="none" stroke="#185239" strokeWidth={2.2} />
          ))}
          <line x1={-430} y1={0} x2={430} y2={0} stroke="#164732" strokeWidth={2} />
          <line x1={0} y1={-430} x2={0} y2={430} stroke="#164732" strokeWidth={2} />

          {/* Compass degree ticks around outer ring */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * Math.PI) / 18;
            const r0 = i % 3 === 0 ? 416 : 426;
            return (
              <line
                key={i}
                x1={Math.cos(a) * r0}
                y1={Math.sin(a) * r0}
                x2={Math.cos(a) * 438}
                y2={Math.sin(a) * 438}
                stroke="#2c8a5e"
                strokeWidth={2.2}
              />
            );
          })}

          {/* Rotating phosphor sweep arm & trailing wedge */}
          <g transform={`rotate(${sweepDeg})`}>
            <path d="M0,0 L435,-55 A438,438 0 0 1 438,0 Z" fill="#4ef29c" opacity={0.14} />
            <line x1={0} y1={0} x2={438} y2={0} stroke="#6bffb3" strokeWidth={3.5} />
          </g>
        </g>

        {/* Non-conflicting distant traffic blips */}
        {[
          [680, 720], [1220, 340], [790, 260],
        ].map(([bx, by], i) => (
          <g key={i} transform={`translate(${bx},${by})`} opacity={0.65}>
            <rect x={-6} y={-6} width={12} height={12} fill="none" stroke="#42ba7d" strokeWidth={2.2} transform="rotate(45)" />
            <line x1={0} y1={0} x2={24} y2={-14} stroke="#42ba7d" strokeWidth={2} />
          </g>
        ))}

        {/* CONVERGING TARGET #1 (upper-left → center) */}
        <g>
          {/* Breadcrumb phosphor trail */}
          {[0.25, 0.5, 0.75].map((bt, i) => (
            <circle key={i} cx={lerp(700, p1x, bt)} cy={lerp(390, p1y, bt)} r={3.5} fill={blipCol} opacity={0.3 + i * 0.2} />
          ))}
          <line x1={p1x} y1={p1y} x2={960} y2={540} stroke={blipCol} strokeWidth={2.5} strokeDasharray="6 5" />
          <g transform={`translate(${p1x},${p1y})`}>
            <rect x={-9} y={-9} width={18} height={18} fill="none" stroke={blipCol} strokeWidth={3.2} transform="rotate(45)" />
            {/* Pure vector data tag block (illegible bars, zero show text) */}
            <line x1={-12} y1={-12} x2={-38} y2={-34} stroke={blipCol} strokeWidth={2} />
            <rect x={-112} y={-66} width={74} height={38} rx={4} fill="#081f17" stroke={blipCol} strokeWidth={2} />
            <line x1={-100} y1={-52} x2={-52} y2={-52} stroke={blipCol} strokeWidth={3.5} />
            <line x1={-100} y1={-39} x2={-64} y2={-39} stroke={blipCol} strokeWidth={3.5} />
          </g>
        </g>

        {/* CONVERGING TARGET #2 (lower-right → center) */}
        <g>
          {[0.25, 0.5, 0.75].map((bt, i) => (
            <circle key={i} cx={lerp(1240, p2x, bt)} cy={lerp(680, p2y, bt)} r={3.5} fill={blipCol} opacity={0.3 + i * 0.2} />
          ))}
          <line x1={p2x} y1={p2y} x2={960} y2={540} stroke={blipCol} strokeWidth={2.5} strokeDasharray="6 5" />
          <g transform={`translate(${p2x},${p2y})`}>
            <rect x={-9} y={-9} width={18} height={18} fill="none" stroke={blipCol} strokeWidth={3.2} transform="rotate(45)" />
            <line x1={12} y1={12} x2={38} y2={34} stroke={blipCol} strokeWidth={2} />
            <rect x={38} y={24} width={74} height={38} rx={4} fill="#081f17" stroke={blipCol} strokeWidth={2} />
            <line x1={50} y1={38} x2={98} y2={38} stroke={blipCol} strokeWidth={3.5} />
            <line x1={50} y1={51} x2={86} y2={51} stroke={blipCol} strokeWidth={3.5} />
          </g>
        </g>

        {/* Flashing conflict-alert ring around the convergence point */}
        {alert && (
          <g transform="translate(960,540)" opacity={flash}>
            <circle cx={0} cy={0} r={54} fill="none" stroke="#ff4638" strokeWidth={4} strokeDasharray="14 8" />
            <circle cx={0} cy={0} r={82} fill="none" stroke="#ff4638" strokeWidth={2.5} opacity={0.6} />
          </g>
        )}

        {/* Donald's hand lunging urgently into the lower-left edge toward the console transmit key */}
        {handLunge > 0.02 && (
          <g
            transform={`translate(${lerp(280, 485, handLunge)},${lerp(1060, 845, handLunge)}) rotate(32) scale(-2250,2250)`}
          >
            <HandBack
              pal={PAL_D_RADAR}
              curl={0.42}
              thumb={0.55}
              sleeve={PAL_D_RADAR.jacket}
              sleeveShade={PAL_D_RADAR.jacketShade}
              cuff={PAL_D_RADAR.shirt}
              forearm={0.72}
            />
          </g>
        )}
      </svg>
      <Finish f={g} vig={0.72} grain={0.075} shadow="#050e14" gradeO={0.18} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 she had a father"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 phone call"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 gone back to work"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 two seconds"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 catastrophe"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={CUTS.s3}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(815.8)} durationInFrames={22}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.08} /></Sequence>
    <Sequence from={B(819.5)} durationInFrames={22}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.09} /></Sequence>
  </AbsoluteFill>
);
