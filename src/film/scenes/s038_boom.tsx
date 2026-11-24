// SCENE 038 · "boom" · set: garage · 577.07s → 596.97s (19.90s) · batch B
// Narration: "Then Walter White does something that isn't business at all. He throws a handful of crystal
//   at the floor. Not the bag, a handful, like gravel, like it's worth throwing. The windows come out of
//   their frames, half the room goes down and a chair comes apart. And Walter stays exactly where he is
//   standing, because the standing is the point."
// Staging: the handful goes down at 581.2; the blast lands between 587.1 and 589.0 (we hold the throw,
// then cut to the blast, then cut back to Walt exactly where he stood). Original physics, no fire.
// Beats:
//   b(577.1) "doesn't do business at all"  S1: Walt stands, unbuttons, takes the bag off the desk
//   b(580.0) "he throws a handful"         S2 insert: the crystal falls out of his fist, in the light
//   b(581.6) "at the floor"                S2 the handful hits the concrete, skitters
//   b(584.6) "like it's worth throwing"    S2 second handful, careless
//   b(587.1) "the windows come out"        S3 blast: window blows, light floods, chair comes apart
//   b(589.0) "half the room goes down"     S3 debris settles, hiss of glass
//   b(591.9) "Walter stays exactly where"  S4: the same framing as S1 — he has not moved a foot
//   b(594.6) "the standing is the point"   S4 slow push on his face
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GT, GX, GarageRoom, Desk, DeskKit, Chair, GarageWindow } from "../../env/b_garage";
import { chairSit } from "../../props/b_pose";
import { Crystal } from "../../props/b_props";
import { SoftDefs, Glow, Puff, Dust } from "../../env/b_common";
import { Finish, Motes, Streak } from "../../fx/Post";

export const META = { n: 38, id: "boom", set: "garage", cutIn: 577.07, cutOut: 596.97 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(596.97);
const CUTS = { s1: 0, s2: B(579.6), s3: B(587.0), s4: B(591.7), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
const BLAST = B(587.35);
const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffdca0", 0.06) : c));

const DIST = {
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
const distLook = (o: any = {}) => restaurateurLook({ hair: DIST.hair, beard: "mustache", age: 0.5, ...o });
const deskSit = (o: Partial<Pose> = {}) => chairSit({ hipL: 62, hipR: 64, knL: 96, knR: 98, ...o });

/* ─────────── S1 · the decision ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.9, -0.78, easeInOut(t)), y: lerp(1.5, 1.44, easeInOut(t)), z: lerp(0.55, 0.7, easeInOut(t)), f: 1250, shiftY: 45, focus: 3.4, aperture: 0.5 };
  const pick = prog(g, B(578.6), B(579.6), easeInOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <GarageWindow cam={cam} x={-2.3} w={2.0} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({ torso: -4, neck: 4, shL: 26, shR: 20, elL: 56, elR: 34, breathe: 0.55 })}
            view={0.28} look={distLook({ yaw: 0.1, lids: 0.36, lookX: -0.2, lookY: 0.05, brow: 0.3, mouth: "flat" })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        {/* the bag on the desk, its mouth open */}
        <Card cam={cam} x={0.74} y={0.78} z={3.44}>
          <ellipse cx={0} cy={0.015} rx={0.24} ry={0.05} fill="#000" opacity={0.26} />
          <path d="M-0.23,0.01 L-0.2,-0.11 C-0.17,-0.16 0,-0.18 0.2,-0.11 L0.23,0.01 Z" fill="#3d4753" stroke="#171b1f" strokeWidth={0.006} />
          <ellipse cx={0} cy={-0.145} rx={0.12} ry={0.03} fill="#0d1114" />
        </Card>
        {/* Walt: takes the bag's weight in his left hand — the decision */}
        <Card cam={cam} x={-1.34} y={0} z={2.6} flip>
          <Figure pose={{
            torso: 4, neck: -2, shL: lerp(6, 34, pick), shR: lerp(4, 10, pick),
            elL: lerp(16, 44, pick), elR: 16, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5, slump: 0.18,
          }} view={0.5} look={teacherLook({ yaw: 0.16, lids: 0.16, lookX: 0.35, lookY: 0.1, brow: 0.06, mouth: "flat" })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={18} color="#ffe9c0" seed={5} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · the handful ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  // low, tight on the floor by his feet
  const cam: Cam = { x: lerp(-1.1, -1.02, easeInOut(t)), y: 0.92, z: lerp(1.0, 0.9, easeInOut(t)), f: 1350, shiftY: -190, focus: 2.0, aperture: 0.9 };
  const rel1 = clamp((g - B(580.0)) / 10);
  const rel2 = clamp((g - B(584.6)) / 10);
  const fall1 = prog(g, B(580.0), B(580.7), easeIn);
  const fall2 = prog(g, B(584.6), B(585.3), easeIn);
  /** one release: n crystals falling from the fist to the floor, then bouncing out */
  const Throw: React.FC<{ t0: number; n: number; seed: number }> = ({ t0, n, seed }) => {
    const tt = Math.max(0, (g - t0) / 30);
    return (
      <g>
        {Array.from({ length: n }).map((_, i) => {
          const delay = rand(i, seed) * 0.06;
          const life = Math.max(0, tt - delay);
          const h = 0.95 - 4.4 * life * life * 0.5;
          const hit = 0.32;
          const onFloor = life > hit;
          const bounce = onFloor ? Math.abs(Math.sin((life - hit) * 9)) * 0.07 * Math.exp(-(life - hit) * 7) : 0;
          const y = Math.max(0.005, onFloor ? bounce : h);
          const spread = (onFloor ? Math.min(0.42, (life - hit) * 0.9) : 0) * (0.4 + rand(i, seed + 1));
          const dir = rand(i, seed + 2) > 0.5 ? 1 : -1;
          const x = -1.16 + dir * spread * 0.7 + (rand(i, seed + 3) - 0.5) * 0.06;
          const p = project(cam, x, y, 2.56 + spread * 0.35);
          return (
            <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s})`} opacity={life < 0.02 ? 0 : 1}>
              <path d="M-0.012,0.003 L-0.015,-0.019 L0,-0.034 L0.014,-0.016 L0.011,0.003 Z" fill="#63d6f5" stroke="#12303d" strokeWidth={0.0022} />
              <path d="M-0.012,0.003 L-0.015,-0.019 L-0.002,-0.009 Z" fill="#c8f4ff" opacity={0.9} />
            </g>
          );
        })}
      </g>
    );
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        {/* Walt's legs and the fist at frame left, cropped */}
        <Card cam={cam} x={-1.62} y={0} z={2.92} flip>
          <Figure pose={{
            torso: 3, neck: -2, shL: lerp(30, 74, rel1), shR: lerp(30, 70, rel2),
            elL: lerp(40, 20, rel1), elR: lerp(40, 22, rel2), hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5,
          }} view={0.9} look={teacherLook({ yaw: 0.4, lids: 0.18, lookX: 0.2, lookY: -0.4, brow: 0.1, mouth: "flat" })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Throw t0={B(580.0)} n={9} seed={2} />
        <Throw t0={B(584.6)} n={7} seed={11} />
        {/* the handfuls on the concrete, still bright */}
        <Card cam={cam} x={-1.12} y={0.004} z={2.6}>
          {Array.from({ length: 14 }).map((_, i) => {
            const x = (rand(i, 31) - 0.5) * 0.6, z = (rand(i, 32) - 0.5) * 0.24;
            return <path key={i} d="M-0.008,0.004 L-0.01,-0.012 L0,-0.02 L0.01,-0.01 L0.008,0.004 Z" transform={`translate(${x},${-z})`} fill="#63d6f5" stroke="#12303d" strokeWidth={0.002} opacity={fall1 > 0.5 ? 0.95 : 0} />;
          })}
        </Card>
        <Dust cam={cam} f={g} n={18} x0={-1.8} x1={0.2} z0={2.0} z1={3.4} h={1.2} seed={3} color="#ffe9c0" />
        <Motes f={g} n={20} color="#cfeeff" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#101a20" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · the blast ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const burst = clamp((g - BLAST) / 14);
  const shake = g > BLAST ? (1 - clamp((g - BLAST) / 26)) : 0;
  const cam: Cam = {
    x: lerp(-0.5, -0.2, easeInOut(t)) + Math.sin(f * 2.3) * 0.04 * shake,
    y: 1.5 + Math.sin(f * 3.1) * 0.03 * shake,
    z: lerp(0.6, 0.9, easeInOut(t)),
    f: 1150, shiftY: 40 + Math.sin(f * 2.7) * 8 * shake, focus: 4, aperture: 0.5,
  };
  const knock = prog(g, BLAST, BLAST + 20, easeOut);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="flash"><stop offset="0" stopColor="#fff6d0" stopOpacity={0.95} /><stop offset="0.45" stopColor="#ffd88a" stopOpacity={0.5} /><stop offset="1" stopColor="#ffb060" stopOpacity={0} /></radialGradient>
        </defs>
        <GarageRoom cam={cam} f={g} />
        <GarageWindow cam={cam} x={-2.3} w={2.0} burst={burst} />
        <GarageWindow cam={cam} x={1.9} w={1.4} burst={burst} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({ torso: lerp(-4, 14, knock), neck: lerp(4, -6, knock), shL: lerp(26, 48, knock), shR: lerp(20, 44, knock), elL: lerp(56, 76, knock), elR: lerp(34, 70, knock), breathe: 0.7 })}
            view={0.28} look={distLook({ yaw: 0.1, lids: 0.1, lookX: -0.3, lookY: 0.1, brow: 0.7, mouth: "open", mouthOpen: 0.4 })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        {/* the room goes down: a shelf collapses, boxes tumble */}
        <Card cam={cam} x={-5.0} z={2.4} opacity={1 - knock * 0.2}>
          <g transform={`rotate(${knock * 26} 0 -1.2)`}>
            <rect x={0} y={-1.5 + knock * 0.5} width={-0.4} height={0.06} fill={GT.woodDark} />
            <rect x={-0.3} y={-0.24 + knock * 0.6} width={0.18} height={0.24} fill={GT.rust} transform={`rotate(${knock * 40})`} />
          </g>
        </Card>
        {/* the chair comes apart: seat, back, and four legs thrown */}
        <g>
          {[
            { dx: -0.5, dy: -0.3, r: -30 },
            { dx: 0.55, dy: -0.18, r: 42 },
            { dx: -0.24, dy: 0.24, r: 70 },
            { dx: 0.3, dy: 0.3, r: -64 },
          ].map((o, i) => {
            const p = project(cam, 0.42 + o.dx * knock, Math.max(0.03, 0.44 + o.dy * knock - 0.5 * knock * knock), 4.4 + knock * 0.6);
            return <rect key={i} x={p.x - 0.02 * p.s} y={p.y - 0.23 * p.s} width={0.04 * p.s} height={0.46 * p.s} fill={GT.woodDark} stroke={GT.ol} strokeWidth={0.5} transform={`rotate(${o.r * knock} ${p.x} ${p.y})`} />;
          })}
          {(() => {
            const p = project(cam, 0.42 + 0.5 * knock, Math.max(0.05, 0.46 + 0.2 * knock), 4.4);
            return <polygon points={`${p.x - 0.23 * p.s},${p.y} ${p.x + 0.23 * p.s},${p.y} ${p.x + 0.2 * p.s},${p.y - 0.05 * p.s} ${p.x - 0.2 * p.s},${p.y - 0.05 * p.s}`} fill={GT.wood} stroke={GT.ol} strokeWidth={0.8} transform={`rotate(${-24 * knock} ${p.x} ${p.y})`} />;
          })()}
        </g>
        {/* fireball: warm light, not flame */}
        <ellipse cx={project(cam, -2.3, 1.6, GX.zBack).x} cy={project(cam, -2.3, 1.6, GX.zBack).y} rx={3.6 * project(cam, -2.3, 1.6, GX.zBack).s} ry={2.4 * project(cam, -2.3, 1.6, GX.zBack).s} fill="url(#flash)" opacity={clamp((g - BLAST) / 6) * (1 - clamp((g - BLAST) / 26))} />
        {(() => { const p = project(cam, -2.0, 1.5, GX.zBack - 0.6); return <Puff x={p.x} y={p.y} r={(0.9 + 2.6 * clamp((g - BLAST) / 40)) * p.s * 0.55} o={0.5 * (1 - clamp((g - BLAST) / 46))} seed={3} />; })()}
        {(() => { const p = project(cam, -0.4, 1.1, GX.zBack - 1.4); return <Puff x={p.x} y={p.y} r={(0.8 + 2.2 * clamp((g - BLAST) / 50)) * p.s * 0.5} o={0.35 * (1 - clamp((g - BLAST) / 52))} seed={9} />; })()}
        {/* dust sheet falling from the ceiling */}
        <Dust cam={cam} f={g} n={40} x0={-4} x1={4} z0={1.2} z1={4} h={2.8} seed={12} color="#e6ddc6" />
        {/* Walt, standing exactly where he was, arms down */}
        <Card cam={cam} x={-1.34} y={0} z={2.6} flip>
          <Figure pose={{ torso: 3, neck: -2, shL: 6, shR: 5, elL: 15, elR: 14, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.5, slump: 0.12 }}
            view={0.5} look={teacherLook({ yaw: 0.16, lids: 0.1, lookX: 0.4, lookY: 0.0, brow: 0.05, mouth: "flat" })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        <Motes f={g} n={34} color="#ffe9c0" seed={7} drift={1.6} />
      </svg>
      <Finish f={g} vig={0.6} grain={0.08} shadow="#2a1a08" gradeO={0.2} />
      {/* the flash, as a screen-space wash on top of the grade */}
      <AbsoluteFill style={{ background: "#ffe9b8", mixBlendMode: undefined as any, opacity: clamp((g - BLAST) / 6) * (1 - clamp((g - BLAST) / 16)) * 0.62, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · the standing ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.end - CUTS.s4;
  const t = f / dur;
  const cam: Cam = { x: lerp(-0.9, -0.84, easeInOut(t)), y: lerp(1.46, 1.5, easeInOut(t)), z: lerp(0.62, 0.5, easeInOut(t)), f: 1400, shiftY: 50, focus: 3.2, aperture: 0.55 };
  const settle = clamp((g - CUTS.s4) / 60);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} />
        <GarageWindow cam={cam} x={-2.3} w={2.0} burst={1} />
        <GarageWindow cam={cam} x={1.9} w={1.4} burst={1} />
        <Chair cam={cam} x={DESK.x + 0.32} z={DESK.z + 0.9} />
        <Card cam={cam} x={DESK.x + 0.32} y={0} z={DESK.z + 0.9}>
          <Figure pose={deskSit({ torso: lerp(-4, 8, settle), neck: lerp(4, -2, settle), shL: 30, shR: 24, elL: 58, elR: 44, breathe: 0.6 })}
            view={0.28} look={distLook({ yaw: lerp(0.1, 0.16, settle), lids: 0.4, lookX: -0.3, lookY: 0.05, brow: 0.55, mouth: "open", mouthOpen: 0.15 })}
            pal={DIST.pal} height={DIST.height} rimLight="#ffd58a" rimSide={1} />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} />
        <Card cam={cam} x={-1.34} y={0} z={2.6} flip>
          <Figure pose={{ torso: 3, neck: -2, shL: 6, shR: 5, elL: 15, elR: 14, hipL: 5, hipR: -5, knL: 5, knR: 6, breathe: 0.45, slump: 0.1 }}
            view={0.46} look={teacherLook({ yaw: 0.14, lids: 0.12 + blink(g, 3) * 0.4, lookX: 0.3, lookY: 0.05, brow: 0.04, mouth: "flat" })}
            pal={PAL_T} height={TEACHER.height} rimLight="#ffd58a" rimSide={-1} />
        </Card>
        {/* drifting smoke from the window sill */}
        {(() => { const p = project(cam, -2.2, 1.9, GX.zBack - 0.4); return <Puff x={p.x} y={p.y} r={(1.1 + 0.6 * Math.sin(g * 0.04)) * p.s * 0.45} o={0.16 * (1 - settle * 0.5)} seed={5} />; })()}
        <Motes f={g} n={26} color="#e6ddc6" seed={9} drift={1.2} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#241708" gradeO={0.18} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the decision"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 the handful"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 the blast"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.end - CUTS.s4} name="S4 the standing"><S4 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(580.0)} durationInFrames={40}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.09} /></Sequence>
    <Sequence from={B(584.6)} durationInFrames={40}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.08} /></Sequence>
    <Sequence from={BLAST} durationInFrames={90}><Audio src={staticFile("sfx/b_explosion.wav")} volume={0.16} /></Sequence>
    <Sequence from={BLAST + 20} durationInFrames={120}><Audio src={staticFile("sfx/b_car_alarms.wav")} volume={0.055} /></Sequence>
  </AbsoluteFill>
);
