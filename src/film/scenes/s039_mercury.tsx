// SCENE 039 · "mercury" · set: street · 596.97s → 615.79s (18.82s) · batch B
// Narration: "On the way out Tuko asks what that was. Fulminated mercury, and a little tweak of chemistry.
//   Out into a street full of car alarms with blood on his collar and his ears ringing, he had no plan for
//   after the explosion — one handful, one bluff, and a lesson from his own classroom."
// Staging: the front of the house, the roll-up door still swinging. S1 two-shot on the doorstep as Tuco
// asks. S2 insert: what was in his hand — a mercury bead rolling across a coin (the classroom beat paid off
// later in flashback, here only as a bright bead and a coin on the step). S3 he walks out into the street
// through the car alarms, blood at his collar, one hand to his ear.
// Beats:
//   b(597.6) "Tuko asks what that was"   S1: Tuco in the doorway, Walt on the step
//   b(599.9) "fulminated mercury"        S2 insert: a coin on the step, a bead of metal rolling on it
//   b(602.4) "a little tweak of chemistry" S2 the bead splits into two, still rolling
//   b(603.7) "out into a street"         S3: he steps off the curb into the road, alarms going
//   b(606.1) "blood on his collar"       S3 closer: the collar, the ear, the ringing
//   b(608.3) "no plan for after"         S3 the empty street, heat, a chirping alarm
//   b(611.2) "one handful, one bluff"    S3 he stops in the middle of the road
//   b(613.3) "a lesson from his classroom" S3 he looks up; the street holds still
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { ST, StreetSky, StreetRidge, StreetGround, House, BlockWall } from "../../env/b_street";
import { GX } from "../../env/b_garage";
import { SoftDefs, Glow } from "../../env/b_common";
import { walkPose } from "../../props/b_pose";
import { Coupe } from "../../env/Vehicles";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 39, id: "mercury", set: "street", cutIn: 596.97, cutOut: 615.79 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(615.79);
const CUTS = { s1: 0, s2: B(599.6), s3: B(603.5), end: END };

const DAY = (pal: typeof TEACHER.pal) => tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#fff0d2", 0.08) : c));
const PAL_T = DAY(TEACHER.pal);
// smoke-dirtied: the blast has left pale dust on him
const PAL_T_DUST = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(mixHex(c, "#fff0d2", 0.08), "#d8ceb8", 0.18) : c));

const TUCO = {
  height: 1.84,
  pal: {
    skin: "#c08a63", skinShade: "#96633f", skinLight: "#d9a67c",
    jacket: "#3f3a36", jacketShade: "#2a2622", jacketLight: "#5c554e",
    shirt: "#e8e0cb", shirtShade: "#bdb39a",
    pants: "#33302c", pantsShade: "#221f1c",
    shoes: "#1c1917", outline: "#120f0c",
  },
  hair: { base: "#141210", dark: "#0a0908", light: "#2a2522", style: "buzz" as const },
};
const tucoLook = (o: any = {}) => restaurateurLook({ hair: TUCO.hair, beard: "mustache", age: 0.5, ...o });

/* ─────────── S1 · the doorstep ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.7, -0.52, easeInOut(t)), y: 1.5, z: lerp(3.1, 2.7, easeInOut(t)), f: 1350, shiftY: 40, focus: 4.6, aperture: 0.6 };
  const ask = prog(g, B(597.6), B(598.4), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <StreetSky f={g} cam={cam} />
        <StreetRidge cam={cam} />
        <StreetGround cam={cam} f={g} />
        <House cam={cam} x={-4.2} z={12} w={9} h={3.1} seed={3} pal={["#d8c4a2", "#b9a480", "#7d5b45"]} />
        {/* the doorway they came out of, near-left, half in frame */}
        <Card cam={cam} x={-2.6} y={0} z={8.6}>
          <rect x={-0.8} y={-2.5} width={1.6} height={2.5} fill="#7c5636" stroke="#2a241d" strokeWidth={0.03} />
          <rect x={-1.0} y={-2.66} width={2.0} height={0.18} fill="#8a6a4a" stroke="#2a241d" strokeWidth={0.02} />
          <rect x={-0.62} y={-2.2} width={1.24} height={1.05} fill="#1b1a17" />
          {/* smoke still coming out past them */}
          <ellipse cx={0.1} cy={-1.9} rx={0.5} ry={0.3} fill="#cfc6b2" opacity={0.18} />
        </Card>
        <Card cam={cam} x={2.9} z={9.4}><Coupe color="#4a2a26" shade="#2a1613" light="#7a4a44" wheel={12} headlights={0} tail={0.2} /></Card>
        {/* Tuco in the doorway, arms folded, not coming any closer */}
        <Card cam={cam} x={-2.15} y={0} z={8.1} flip>
          <Figure pose={{ torso: lerp(-4, 2, ask), neck: lerp(2, -4, ask), shL: 10, shR: 8, elL: 20, elR: 18, hipL: 4, hipR: -4, knL: 4, knR: 5, breathe: 0.55 }}
            view={0.62} look={tucoLook({ yaw: 0.24, lids: lerp(0.36, 0.14, ask), lookX: 0.3, lookY: 0.05, brow: 0.45, mouth: "open", mouthOpen: 0.1 + 0.14 * Math.abs(Math.sin(g * 0.4)) })}
            pal={TUCO.pal} height={TUCO.height} rimLight="#fff6d8" rimSide={-1} />
        </Card>
        {/* Walt on the step, dusty, one ear still ringing */}
        <Card cam={cam} x={-0.5} y={0} z={7.4} flip>
          <Figure pose={{ torso: 4, neck: -4, shL: lerp(8, 26, prog(g, B(598.4), B(599.2))), shR: 6, elL: lerp(16, 54, prog(g, B(598.4), B(599.2))), elR: 15, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5 }}
            view={0.72} look={teacherLook({ yaw: 0.24, lids: 0.2, lookX: 0.3, lookY: 0.1, brow: 0.08, mouth: "open", mouthOpen: 0.09 + 0.1 * Math.abs(Math.sin(g * 0.45)) })}
            pal={PAL_T_DUST} height={TEACHER.height} rimLight="#fff6d8" rimSide={1} />
        </Card>
        <Motes f={g} n={24} color="#fff6d8" seed={4} drift={0.9} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.065} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · the bead on the coin ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.5, -0.47, easeInOut(t)), y: 1.6, z: lerp(5.24, 5.18, easeInOut(t)), f: 1150, shiftY: -3900, focus: 0.8, aperture: 1.15 };
  const roll = prog(g, B(600.2), B(602.4), easeOut);
  const split = prog(g, B(602.4), B(603.2), easeOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="puffA"><stop offset="0" stopColor="#ffe0a0" stopOpacity={0.4} /><stop offset="1" stopColor="#ffe0a0" stopOpacity={0} /></radialGradient>
        </defs>
        <StreetSky f={g} cam={cam} />
        <StreetGround cam={cam} f={g} />
        {/* a concrete step slab filling the frame */}
        <polygon points="0,0 0,0 0,0" fill="none" />
        <Card cam={cam} x={-0.48} y={0.02} z={5.7}>
          <rect x={-0.7} y={-0.05} width={1.4} height={0.4} fill="#b7ab94" stroke="#6a6154" strokeWidth={0.006} />
          <path d="M-0.7,0.18 L0.7,0.18" stroke="#9b9080" strokeWidth={0.004} />
          {/* a coin lying flat: an ellipse with a rim and a worn face */}
          <ellipse cx={0.0} cy={0.1} rx={0.16} ry={0.055} fill="#8a7250" opacity={0.35} />
          <ellipse cx={0.0} cy={0.072} rx={0.155} ry={0.05} fill="#b9a06a" stroke="#6b5836" strokeWidth={0.004} />
          <ellipse cx={0.0} cy={0.068} rx={0.134} ry={0.04} fill="#cbb47c" />
          <path d="M-0.075,0.068 L0.075,0.068" stroke="#8a7448" strokeWidth={0.004} opacity={0.7} />
          <path d="M-0.05,0.05 L0.06,0.05" stroke="#a08c56" strokeWidth={0.003} opacity={0.6} />
          {/* two beads of mercury, one rolling, then two */}
          {[0, 1].map((i) => {
            const px = lerp(-0.03, 0.07, easeOut(roll)) * (i ? -0.9 : 1) + (i ? 0.026 * split : 0) + noise1(g * 0.3 + i, 4) * 0.002;
            const py = 0.052 - (i ? 0.012 * split : 0) + Math.sin(g * 0.3 + i) * 0.001;
            const r = (0.026 + 0.005 * (1 - split)) * (i ? 0.82 : 1);
            return (
              <g key={i}>
                <ellipse cx={px + 0.004} cy={py + 0.008} rx={r * 1.5} ry={r * 0.5} fill="#5a5038" opacity={0.4} />
                <circle cx={px} cy={py} r={r} fill="#cfd6da" stroke="#5d666b" strokeWidth={0.002} />
                <circle cx={px} cy={py} r={r * 0.82} fill="#eef4f6" />
                <circle cx={px - r * 0.3} cy={py - r * 0.34} r={r * 0.34} fill="#fff" opacity={0.95} />
                <path d={`M${px - r * 0.7},${py + r * 0.5} A${r * 0.9},${r * 0.5} 0 0 0 ${px + r * 0.7},${py + r * 0.45}`} stroke="#9aa4a8" strokeWidth={0.0018} fill="none" opacity={0.7} />
              </g>
            );
          })}
          {/* a scatter of fine dust around them */}
          {/* a fingertip resting at the edge of the step */}
          <g transform={`translate(${lerp(0.26, 0.2, easeOut(roll))},${0.14})`}>
            <path d="M-0.02,0 C-0.03,-0.02 -0.02,-0.04 0.0,-0.042 C0.024,-0.04 0.03,-0.02 0.028,0 Z" fill="#e0ab86" stroke="#a97350" strokeWidth={0.002} />
            <path d="M0.01,0.002 L0.05,0.13" stroke="#e0ab86" strokeWidth={0.028} strokeLinecap="round" />
            <path d="M0.05,0.13 L0.06,0.2" stroke="#3a3f4a" strokeWidth={0.034} strokeLinecap="round" />
          </g>
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i} cx={(rand(i, 7) - 0.5) * 0.9} cy={0.06 + rand(i, 8) * 0.2} r={0.002 + rand(i, 9) * 0.002} fill="#6f6656" opacity={0.35} />
          ))}
        </Card>
        <Motes f={g} n={16} color="#fff6d8" seed={8} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#3a2a10" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · the street full of car alarms ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.end - CUTS.s3;
  const t = f / dur;
  // tracking him out into the road, then holding as he stops
  const follow = clamp(f / 120);
  const wx = lerp(-1.4, -0.1, easeInOut(follow));
  const stopped = f > 122;
  const cam: Cam = {
    x: lerp(-0.9, 0.0, easeInOut(follow)), y: lerp(1.55, 1.6, easeInOut(follow)),
    z: lerp(1.9, 1.4, easeInOut(follow)), f: 1400, shiftY: -30, focus: 5, aperture: 0.5,
  };
  const lookUp = prog(g, B(613.3), B(614.6), easeInOut);
  const pose: Pose = stopped
    ? { torso: 3, neck: lerp(-4, -14, lookUp), shL: 6, shR: 5, elL: 16, elR: 15, hipL: 4, hipR: -4, knL: 4, knR: 5, breathe: 0.5, slump: 0.15 }
    : walkPose(f * 0.055, 1, { torso: 5, neck: -6, shL: 8, shR: 6, elL: 18, elR: 16, breathe: 0.5 });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <StreetSky f={g} cam={cam} />
        <StreetRidge cam={cam} />
        <StreetGround cam={cam} f={g} />
        <House cam={cam} x={-11} z={16} w={11} h={3.1} seed={3} pal={["#d8c4a2", "#b9a480", "#7d5b45"]} />
        <House cam={cam} x={11} z={19} w={10} h={3.0} seed={5} pal={["#e6d3b3", "#cbb28e", "#9b6b4f"]} />
        {/* parked cars on both curbs — the alarms are theirs */}
        <Card cam={cam} x={6.4} z={7.2}><Coupe color="#3f4a58" shade="#252d36" light="#617282" wheel={0} headlights={0.1} tail={0.9} /></Card>
        <Card cam={cam} x={-6.8} z={8.4}><Coupe color="#6a4a3a" shade="#3f2a20" light="#8f6a55" wheel={0} headlights={0.05} tail={0.75} /></Card>
        <Card cam={cam} x={7.4} z={14.5}><Coupe color="#c9c4b4" shade="#8e8a7c" light="#e8e4d6" wheel={0} headlights={0} tail={0.4} /></Card>
        {/* an alarm going: tiny light pulses on the lamps */}
        {[6.4, -6.8, 7.4].map((cx, i) => {
          const p = project(cam, cx + 0.55, 0.62, i === 2 ? 14.5 : i === 0 ? 7.2 : 8.4);
          const on = (Math.sin(g * 0.35 + i * 2.1) > 0.2) ? 1 : 0.15;
          return <Glow key={i} x={p.x} y={p.y} r={0.35 * p.s} o={0.5 * on} id="glowW" />;
        })}
        {/* Walt, walking out of the lot into the road */}
        <Card cam={cam} x={wx} y={0} z={4.4} flip>
          <ellipse cx={0.04} cy={0.008} rx={0.3} ry={0.06} fill="#7a5a34" opacity={0.3} />
          {/* blood at the collar and a smear up the jaw */}
          <path d="M-0.005,-1.47 C0.02,-1.49 0.045,-1.47 0.05,-1.44 C0.035,-1.4 0.005,-1.41 -0.005,-1.44 Z" fill="#8e2f2c" opacity={0.9} />
          <path d="M0.028,-1.44 L0.04,-1.36 L0.026,-1.37 Z" fill="#7a2825" opacity={0.75} />
          <path d="M0.05,-1.42 C0.075,-1.41 0.085,-1.38 0.08,-1.35" stroke="#8e2f2c" strokeWidth={0.012} fill="none" opacity={0.7} />
          <Figure pose={pose} view={0.7} look={teacherLook({
            yaw: lerp(0.14, 0.2, lookUp), lids: 0.22 + blink(g, 3) * 0.4, lookX: lerp(0.2, 0.1, lookUp), lookY: lerp(0.05, -0.5, lookUp),
            brow: lerp(0.1, 0.02, lookUp), mouth: "flat",
          })} pal={PAL_T_DUST} height={TEACHER.height} rimLight="#fff6d8" rimSide={1} />
        </Card>
        <Motes f={g} n={30} color="#fff6d8" seed={6} drift={1.2} />
      </svg>
      <Finish f={g} vig={0.6} grain={0.07} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the doorstep"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 mercury"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.end - CUTS.s3} name="S3 car alarms"><S3 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_wind_desert.wav")} volume={0.03} /></Sequence>
    <Sequence from={B(603.6)} durationInFrames={B(608.5) - B(603.6)}><Audio src={staticFile("sfx/b_car_alarms.wav")} volume={0.075} /></Sequence>
    <Sequence from={B(602.3)} durationInFrames={20}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.05} /></Sequence>
  </AbsoluteFill>
);
