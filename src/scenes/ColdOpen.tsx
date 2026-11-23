// SCENE 01 · COLD OPEN — "There is a man dying in a meth lab." (0.00 s – 22.40 s of narration.wav)
// Shot list (hard cuts, no fades), synced to word timestamps from timing/words.json:
//  S1 0.00–3.10  EXT lab compound, night. Slow push through the fence gap.            "There is a man dying in a meth lab."
//  S2 3.10–9.40  INT lateral dolly behind glass; fluorescent flickers on "blue light";
//                track clears the glass edge to reveal him on "isn't clean" (8.08).     "It is night, the room is glass…"
//  S3 9.40–13.30 Floor-level side close-up. Laboured breathing, eyes go to the door on
//                "running" (10.16), give up and return to the ceiling on "nowhere" (11.58).
//  S4 13.30–17.95 Overhead crane-up; blood pool spreads on "blood" (16.58).              "On his back, on the floor…"
//  S5 17.95–20.75 Tank close-up, rack focus from reflection to the handprint on "red handprint" (18.12–18.48).
//  S6 20.75–22.40 Insert: the hand pressing and sliding down the steel — "where he put his hand on the way down".
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, getInputProps } from "remotion";
const SKIP: string = String((getInputProps() as { skip?: string }).skip ?? "");
const on = (k: string) => !SKIP.includes(k);
import { Cam, Card, project, W, H, Blur, cocBlur } from "../lib/camera";
import { BakedCard } from "../bake/Baked";
import { kf, prog, sec, breath, blink, noise1, easeIn, easeOut, easeInOut, clamp, lerp, rand } from "../lib/anim";
import { Figure, Pose } from "../rig/Figure";
import { TEACHER, teacherLook, tint, mixHex } from "../rig/cast";
import { LabRoom, Tank, Fluoro, LightCone, GlassWall, GlassTable, MaskPost, Hose, BloodPool, FloorGlow, HandSmear, LAB } from "../env/Lab";
import { NightSky, Ridge, LabBuilding, Pickup, FencePosts, DesertGround } from "../env/LabExterior";
import { Finish, Motes, Streak } from "../fx/Post";

export const COLD_OPEN = { start: 0, dur: sec(22.4) };
const CUT = { s1: 0, s2: sec(3.1), s3: sec(9.4), s4: sec(13.3), s5: sec(17.95), s6: sec(20.75), end: sec(22.4) };

// night-lab grade for characters: cool key, blue rim
const LAB_PAL = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#1d3a5c", 0.3) : c));
const RIM = "#a8dcff";
// where he lies (world metres): pelvis x, depth z. Head points to −x.
const MAN = { x: 0.62, z: 5.9 };
const T1 = { x: -0.78, z: 6.35 };

const lyingPose = (f: number, o: Partial<Pose> = {}): Pose => ({
  torso: -90, neck: -6, shL: -6, shR: -18, elL: 6, elR: 56, hipL: 3, hipR: 16, knL: 4, knR: 30,
  breathe: breath(f, 0.16), ...o,
});

/* ─────────────────────────── S1 · exterior ─────────────────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / (CUT.s2 - CUT.s1);
  const cam: Cam = { x: lerp(-0.6, 0.4, easeInOut(t)), y: 1.35, z: lerp(0, 7, easeOut(t)), f: 1350, shiftY: 120, focus: 20, aperture: 0.6 };
  const flick = Math.sin(f * 1.7) > 0.2 || f < 40 ? 1 : 0.3;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <NightSky f={f + 200} cam={cam} />
        <Ridge cam={cam} f={f + 200} />
        <DesertGround cam={cam} f={f} />
        <LabBuilding cam={cam} f={f} x={-1.2} z={27} flicker={flick} />
        <Pickup cam={cam} x={7.6} z={22} color="#4a2a26" />
        {/* yard lamp pole */}
        <Card cam={cam} x={-10.5} z={21}>
          <rect x={-0.07} y={-6} width={0.14} height={6} fill="#243140" />
          <path d="M0,-6 h0.9 v0.15 h-0.9 Z" fill="#243140" />
          <ellipse cx={0.85} cy={-5.8} rx={0.25} ry={0.07} fill="#ffe8b5" />
          <ellipse cx={0.85} cy={-5.4} rx={2.4} ry={2.8} fill="url(#warmGlow)" />
        </Card>
        <FencePosts cam={cam} z={11} x0={-16} x1={-3.2} />
        <FencePosts cam={cam} z={11} x0={3.4} x1={16} />
        {/* open gate leaf, swung inward */}
        <Card cam={cam} x={3.4} z={11.8}><rect x={-0.05} y={-1.9} width={0.1} height={1.9} fill="#4b5763" /><rect x={0} y={-1.9} width={1.4} height={1.9} fill="url(#chain)" opacity={0.5} /></Card>
      </svg>
      <Motes f={f} n={36} color="#c9d8ff" seed={3} drift={2.4} />
      <Finish f={f} vig={0.7} grain={0.08} shadow="#081a33" gradeO={0.25} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S2 · interior dolly ─────────────────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame(); // local
  const g = f + CUT.s2; // global frame for narration-synced beats
  const dur = CUT.s3 - CUT.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-4.6, 0.55, easeInOut(t)), y: 1.45 - 0.15 * easeInOut(t), z: 0.2, f: 1350,
    shiftY: 40 + 50 * easeInOut(t),
    focus: kf(g, [[sec(3.1), 3.4], [sec(7.4), 3.6], [sec(8.3), 5.9]]), aperture: 1.1,
  };
  // flicker on "blue light" (5.24 s)
  const fl0 = sec(5.24);
  const flick = g < fl0 ? 0.15 : g < fl0 + 10 ? (rand(g, 9) > 0.45 ? 1 : 0.1) : 1;
  const steady = 0.92 + 0.08 * noise1(g * 0.6, 2);
  const lights: [number, number, number][] = [[-6, 6, 1], [-2, 6, flick], [2.2, 6, 1], [6, 6, 1], [-4, 10.5, 1], [0, 10.5, 1], [4, 10.5, 1]];
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        {on("room") && <LabRoom cam={cam} f={g} />}
        {on("glow") && lights.map(([x, z, on], i) => <FloorGlow key={`g${i}`} cam={cam} x={x} z={z} o={0.16 * on * steady} w={3} d={2.2} />)}
        {on("tanks") && <><Tank cam={cam} x={4.2} z={11} r={0.6} h={2.0} />
        <Tank cam={cam} x={-5.2} z={10} r={0.55} h={1.8} />
        <Tank cam={cam} x={1.9} z={8.6} r={0.4} h={1.2} gauge={false} /></>}
        {lights.filter((l) => l[1] > 8).map(([x, z, on], i) => <Fluoro key={`f${i}`} cam={cam} x={x} z={z} on={on * steady} />)}
        {lights.filter((l) => l[1] > 8).map(([x, z, on], i) => <LightCone key={`c${i}`} cam={cam} x={x} z={z} on={on * steady * 0.8} />)}
        <Hose cam={cam} pts={[[-3, 8.5], [-2, 7.8], [-1.6, 7.0], [-2.2, 6.6], [-1.3, 6.2], [0.4, 6.9], [1.6, 8.4]]} />
        <Hose cam={cam} pts={[[2.6, 7.4], [2.0, 6.8], [2.9, 6.3], [3.8, 6.8]]} color="#2f6fb0" w={0.03} />
        <Tank cam={cam} x={T1.x} z={T1.z} hand={1} />
        <BloodPool cam={cam} x={MAN.x - 0.05} z={MAN.z + 0.1} t={0.85} />
        {on("man") && <Card cam={cam} x={MAN.x} z={MAN.z}>
          <Figure pose={lyingPose(g)} view={1} look={teacherLook({ yaw: 0.85, lids: 0.45, mouth: "open", mouthOpen: 0.3 + 0.3 * breath(g, 0.16), brow: -0.5 })} pal={LAB_PAL} height={TEACHER.height} blood={0.8} bloodHand={1} rimLight={RIM} rimSide={-1} />
        </Card>}
        {lights.filter((l) => l[1] < 8).map(([x, z, on], i) => <Fluoro key={`n${i}`} cam={cam} x={x} z={z} on={on * steady} />)}
        {lights.filter((l) => l[1] < 8).map(([x, z, on], i) => <LightCone key={`m${i}`} cam={cam} x={x} z={z} on={on * steady} />)}
        {on("glass") && <GlassWall cam={cam} x0={-8} x1={-1.05} z={4.4} f={g} />}
      </svg>
      {/* near-lens foreground: pre-baked defocused bitmaps (see src/bake) */}
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
        {on("near") && <BakedCard cam={cam} id="maskpost" x={-2.4} z={3.2} />}
        {on("near") && <BakedCard cam={cam} id="glasstable24" x={-3.6} z={1.5} />}
      </svg>
      {on("motes") && <Motes f={g} n={60} seed={5} region={[0, 0, W, H * 0.8]} drift={0.6} />}
      <Streak x={project(cam, -2, 3.6, 6).x} y={project(cam, -2, 3.6, 6).y} w={700} o={0.18 * flick} />
      {on("finish") && <Finish f={g} vig={0.68} grain={0.07} shadow="#06213f" gradeO={0.22} />}
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S3 · floor-level close ─────────────────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s3;
  const dur = CUT.s4 - CUT.s3;
  const cam: Cam = { x: lerp(0.05, -0.05, easeInOut(f / dur)), y: 0.3, z: MAN.z - lerp(1.95, 1.7, easeInOut(f / dur)), f: 2350, shiftY: 120, focus: 1.85, aperture: 1.6 };
  // acting beats
  const tRun = sec(10.16), tNowhere = sec(11.58);
  const yaw = kf(g, [[CUT.s3, 0.86], [tRun - 6, 0.86], [tRun + 10, 0.55], [tNowhere + 4, 0.55], [tNowhere + 22, 0.9]]);
  const lookX = kf(g, [[CUT.s3, 0], [tRun - 6, 0], [tRun + 8, 0.9], [tNowhere + 4, 0.9], [tNowhere + 20, -0.2]]);
  const lids = kf(g, [[CUT.s3, 0.4], [tRun, 0.3], [tNowhere + 10, 0.35], [CUT.s4, 0.55]]) + blink(g, 4, 70) * 0.6;
  const neck = kf(g, [[CUT.s3, -6], [tRun + 10, 6], [tNowhere + 22, -8]]);
  // the wounded hand presses harder, then slips to the floor on "nowhere left to run to"
  const slip = prog(g, tNowhere + 6, tNowhere + 26, easeIn);
  const pose = lyingPose(g, { neck, shR: lerp(-18, -22, slip), elR: lerp(56, 8, slip) + 3 * Math.sin(g * 0.3) * (1 - slip), knR: 30 + 3 * noise1(g * 0.05, 1) });
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <LabRoom cam={cam} f={g} />
        <FloorGlow cam={cam} x={-2} z={6.5} w={4} d={2.5} o={0.2} />
        <Tank cam={cam} x={-5.2} z={10} r={0.55} h={1.8} />
        <Tank cam={cam} x={4.2} z={11} r={0.6} h={2.0} />
        {[[-4, 10.5], [0, 10.5], [4, 10.5], [-2, 7.5], [2, 8]].map(([x, z], i) => <Fluoro key={i} cam={cam} x={x} z={z} y={3.4} />)}
        <Tank cam={cam} x={T1.x} z={T1.z} hand={1} />
        <BloodPool cam={cam} x={MAN.x - 0.05} z={MAN.z + 0.1} t={0.85 + 0.05 * (f / dur)} />
        <Card cam={cam} x={MAN.x} z={MAN.z}>
          <Figure pose={pose} view={1}
            look={teacherLook({ yaw, lids, lookX, lookY: -0.4, mouth: g > tNowhere + 10 ? "open" : "pain", mouthOpen: 0.35 + 0.45 * breath(g, 0.16), brow: -0.6, sweat: 1, bloodLip: 0.4 })}
            pal={LAB_PAL} height={TEACHER.height} blood={0.85} bloodHand={1} rimLight={RIM} rimSide={-1} />
        </Card>
        {/* near-lens foreground: out-of-focus hose and broken glass shards glinting */}
        <Hose cam={cam} pts={[[-1.4, 4.6], [-0.4, 4.45], [0.6, 4.7], [1.6, 4.5]]} w={0.05} />
        {[0, 1, 2, 3, 4].map((i) => { const p = project(cam, -0.8 + i * 0.5, 0.01, 4.9 + rand(i, 8) * 0.3); return <polygon key={i} points={`${p.x},${p.y} ${p.x + 14},${p.y - 5} ${p.x + 6},${p.y + 4}`} fill="#d8efff" opacity={0.5 + 0.5 * Math.sin(g * 0.2 + i)} />; })}
      </svg>
      <Motes f={g} n={40} seed={8} region={[0, 0, W, H * 0.7]} drift={0.3} />
      <Finish f={g} vig={0.75} grain={0.07} shadow="#06213f" gradeO={0.25} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S4 · overhead crane ─────────────────────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s4;
  const dur = CUT.s5 - CUT.s4;
  const t = f / dur;
  const h = lerp(1.9, 4.1, easeInOut(t)); // camera height above floor (m)
  const s = 1350 / h; // px per metre on the floor
  const rot = lerp(-4, -14, easeInOut(t));
  const cx = lerp(MAN.x - 0.3, MAN.x - 0.55, easeInOut(t)), cz = MAN.z;
  const P = (x: number, z: number) => [W / 2 + (x - cx) * s, H / 2 + (z - cz) * s] as const;
  const bloodT = 0.55 + 0.45 * prog(g, sec(16.4), sec(17.9), easeOut);
  const pose: Pose = { torso: -90, neck: 0, shL: -55, shR: 18, elL: 10, elR: 62, hipL: -5, hipR: -9, knL: 4, knR: 8, breathe: breath(g, 0.16) };
  const [mx, my] = P(MAN.x, MAN.z);
  const [tx, ty] = P(T1.x, T1.z - 0.95);
  return (
    <AbsoluteFill style={{ background: "#0d1520" }}>
      <svg width={W} height={H}>
        <defs>
          <radialGradient id="ovLight" cx="0.45" cy="0.45" r="0.7"><stop offset="0" stopColor="#2f4458" /><stop offset="0.6" stopColor="#1a2735" /><stop offset="1" stopColor="#0a1018" /></radialGradient>
          <radialGradient id="ovPool"><stop offset="0" stopColor="#4d0a0f" /><stop offset="0.8" stopColor="#3c070b" /><stop offset="1" stopColor="#2a0508" /></radialGradient>
        </defs>
        <g transform={`rotate(${rot} ${W / 2} ${H / 2})`}>
          <rect x={-800} y={-800} width={W + 1600} height={H + 1600} fill="url(#ovLight)" />
          {/* concrete slab joints, stains, drain */}
          {Array.from({ length: 13 }).map((_, i) => { const [x0] = P(-6 + i * 2, 0); return <line key={`v${i}`} x1={x0} y1={-800} x2={x0} y2={H + 800} stroke="#0b121a" strokeWidth={2} />; })}
          {Array.from({ length: 9 }).map((_, i) => { const [, y0] = P(0, cz - 8 + i * 2); return <line key={`h${i}`} x1={-800} y1={y0} x2={W + 800} y2={y0} stroke="#0b121a" strokeWidth={2} />; })}
          {Array.from({ length: 10 }).map((_, i) => { const [sx, sy] = P(-3 + rand(i, 71) * 7, cz - 2.5 + rand(i, 72) * 5); return <ellipse key={i} cx={sx} cy={sy} rx={(0.2 + rand(i, 73) * 0.4) * s} ry={(0.1 + rand(i, 74) * 0.2) * s} fill="#0e161f" opacity={0.5} />; })}
          {(() => { const [dx, dy] = P(2.1, cz + 0.9); return <g transform={`translate(${dx},${dy}) scale(${s})`}><rect x={-0.15} y={-0.15} width={0.3} height={0.3} fill="#121a22" stroke="#33414e" strokeWidth={0.02} />{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-0.12} x2={0.12} y1={-0.12 + i * 0.06} y2={-0.12 + i * 0.06} stroke="#33414e" strokeWidth={0.015} />)}</g>; })()}
          {/* hose coil */}
          {(() => { const [hx, hy] = P(1.9, cz - 1.1); return <g transform={`translate(${hx},${hy}) scale(${s})`} fill="none">{[0.32, 0.26, 0.2].map((r, i) => <ellipse key={i} cx={0} cy={0} rx={r} ry={r * 0.9} stroke="#c94a2a" strokeWidth={0.04} />)}<path d="M0.32,0 C0.7,0.1 0.9,0.5 1.4,0.6" stroke="#c94a2a" strokeWidth={0.04} /></g>; })()}
          {/* blood pool under the right flank */}
          {(() => { const [bx, by] = P(MAN.x - 0.1, MAN.z + 0.12); const R = 0.62 * bloodT * s; return <g transform={`translate(${bx},${by})`}><path d={`M${-R * 1.2},0 C${-R * 1.1},${-R * 0.9} ${R * 0.4},${-R * 1.0} ${R * 1.1},${-R * 0.45} C${R * 1.5},${R * 0.1} ${R * 0.9},${R * 0.95} ${0},${R * 0.85} C${-R * 0.9},${R * 0.9} ${-R * 1.3},${R * 0.5} ${-R * 1.2},0 Z`} fill="url(#ovPool)" /><ellipse cx={-R * 0.3} cy={-R * 0.25} rx={R * 0.4} ry={R * 0.12} fill="#c25560" opacity={0.18} /></g>; })()}
          {/* contact shadow */}
          <ellipse cx={mx - 0.35 * s} cy={my} rx={1.0 * s} ry={0.3 * s} fill="#000" opacity={0.35} />
          {/* the man, seen from above (front view laid flat on the floor plane) */}
          <g transform={`translate(${mx},${my}) scale(${s})`}>
            <Figure pose={pose} view={0} ground={false} look={teacherLook({ yaw: 0, lids: kf(g, [[CUT.s4, 0.45], [sec(16.5), 0.6]]) + blink(g, 6, 80) * 0.4, lookY: -1, lookX: 0.2, mouth: "open", mouthOpen: 0.3 + 0.3 * breath(g, 0.16), brow: -0.4, bloodLip: 0.5 })} pal={LAB_PAL} height={TEACHER.height} blood={0.95} bloodHand={1} />
          </g>
          {/* steel vessel top, beside his head */}
          <g transform={`translate(${tx},${ty}) scale(${s})`}>
            <circle cx={0} cy={0} r={0.47} fill="#000" opacity={0.4} transform="translate(0.06,0.06)" />
            <circle cx={0} cy={0} r={0.47} fill="#7d93a6" stroke={LAB.ol} strokeWidth={0.015} />
            <circle cx={0} cy={0} r={0.4} fill="#a9bdcd" />
            <circle cx={-0.08} cy={-0.08} r={0.25} fill="#d6e6f4" opacity={0.6} />
            {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={Math.cos((i / 12) * 6.283) * 0.44} cy={Math.sin((i / 12) * 6.283) * 0.44} r={0.012} fill="#34424e" />)}
            <circle cx={0} cy={0} r={0.11} fill="none" stroke="#b33a2e" strokeWidth={0.025} />
            <rect x={0.47} y={-0.03} width={0.2} height={0.06} fill="#6f8494" />
          </g>
          {/* dropped respirator + shattered beaker */}
          {(() => { const [rx, ry] = P(MAN.x + 1.35, MAN.z + 0.85); return <g transform={`translate(${rx},${ry}) scale(${s}) rotate(25)`}><path d="M-0.09,-0.08 Q0,-0.14 0.09,-0.08 L0.08,0.06 Q0,0.11 -0.08,0.06 Z" fill="#1d2329" /><circle cx={-0.07} cy={0.04} r={0.045} fill="#d5a530" /><circle cx={0.07} cy={0.04} r={0.045} fill="#d5a530" /></g>; })()}
          {Array.from({ length: 9 }).map((_, i) => { const [gx, gy] = P(MAN.x - 0.9 + rand(i, 81) * 0.7, MAN.z + 0.75 + rand(i, 82) * 0.45); return <polygon key={i} points={`${gx},${gy} ${gx + 0.05 * s},${gy - 0.02 * s} ${gx + 0.02 * s},${gy + 0.03 * s}`} fill="#dff2ff" opacity={0.6} />; })}
        </g>
      </svg>
      {/* overhead fluorescent wash */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 55% at 46% 46%, rgba(150,205,255,0.16), rgba(0,0,0,0) 70%)", mixBlendMode: "screen" }} />
      <Finish f={g} vig={0.8} grain={0.07} shadow="#06213f" gradeO={0.25} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── steel surface helper ─────────────────────────── */
const SteelWall: React.FC<{ id: string; x?: number; w?: number; seamY?: number }> = ({ id, x = 0, w = W, seamY = 300 }) => (
  <g>
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#1f2a35" />
        <stop offset="0.18" stopColor="#5c7285" />
        <stop offset="0.34" stopColor="#c9dcec" />
        <stop offset="0.4" stopColor="#f2f8ff" />
        <stop offset="0.47" stopColor="#9fb3c4" />
        <stop offset="0.7" stopColor="#4c5f70" />
        <stop offset="0.88" stopColor="#8aa0b3" />
        <stop offset="1" stopColor="#25313c" />
      </linearGradient>
    </defs>
    <rect x={x} y={0} width={w} height={H} fill={`url(#${id})`} />
    {/* brushed grain */}
    {Array.from({ length: 70 }).map((_, i) => <line key={i} x1={x + rand(i, 91) * w} y1={0} x2={x + rand(i, 91) * w + 2} y2={H} stroke={i % 2 ? "#ffffff" : "#000000"} strokeOpacity={0.05} strokeWidth={1 + rand(i, 92) * 2} />)}
    <rect x={x} y={seamY} width={w} height={10} fill="#3c4c5a" opacity={0.7} />
    <rect x={x} y={seamY + 10} width={w} height={3} fill="#e6f2ff" opacity={0.4} />
  </g>
);

/* ─────────────────────────── S5 · handprint, rack focus ─────────────────────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s5;
  const dur = CUT.s6 - CUT.s5;
  const rack = prog(g, sec(18.05), sec(18.75), easeInOut); // focus pulls onto the print on "red handprint"
  const ty = lerp(-30, 40, easeInOut(f / dur)); // slow tilt down
  const zoom = lerp(1.0, 1.08, easeInOut(f / dur));
  const s = 2700; // px per metre on the steel
  const drip = clamp((f - 10) / 70);
  return (
    <AbsoluteFill style={{ background: "#0a1118" }}>
      <svg width={W} height={H}>
        <g transform={`translate(${W / 2},${H / 2 + ty}) scale(${zoom}) translate(${-W / 2},${-H / 2})`}>
          <SteelWall id="s5steel" seamY={160} />
          {/* reflection: police-blue tube + his dark distorted silhouette – sharp first, then defocused */}
          <Blur px={lerp(0.5, 12, rack)}>
            <rect x={760} y={-100} width={46} height={H + 200} fill="#e8f6ff" opacity={0.65} />
            <ellipse cx={1340} cy={760} rx={150} ry={420} fill="#0d141c" opacity={0.35} />
            <ellipse cx={1340} cy={330} rx={90} ry={110} fill="#0d141c" opacity={0.3} />
          </Blur>
          {/* gauge at frame edge (foreground, soft) */}
          <Blur px={lerp(3, 9, rack)}>
            <g transform="translate(1720,120)"><circle r={150} fill="#e9eef0" stroke="#2a3540" strokeWidth={22} /><line x1={0} y1={0} x2={70} y2={-80} stroke="#151515" strokeWidth={9} strokeLinecap="round" /><path d="M40,30 A90,90 0 0 0 95,-30" stroke="#c0392b" strokeWidth={10} fill="none" /></g>
          </Blur>
          <defs><filter id="rough5" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={4} /><feDisplacementMap in="SourceGraphic" scale={16} /></filter></defs>
          <Blur px={lerp(10, 0, rack)}>
            <g filter="url(#rough5)"><g transform={`translate(${W * 0.47},${H * 0.42}) scale(${s})`}>
              <HandSmear x={0} y={0} s={1} opacity={1} />
              {/* fresh drip still travelling */}
              <path d={`M0.03,0.17 L0.03,${0.17 + drip * 0.1}`} stroke="#86101a" strokeWidth={0.006} strokeLinecap="round" />
              <circle cx={0.03} cy={0.17 + drip * 0.1} r={0.006} fill="#86101a" />
            </g></g>
          </Blur>
        </g>
      </svg>
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(60,140,255,0.12), rgba(0,0,0,0) 40%, rgba(0,0,0,0) 70%, rgba(60,140,255,0.1))", mixBlendMode: "screen" }} />
      <Finish f={g} vig={0.7} grain={0.075} shadow="#06213f" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S6 · the hand slides down (insert) ─────────────────────────── */
const BigHand: React.FC<{ spread: number; curl: number; pal: typeof LAB_PAL }> = ({ spread, curl, pal }) => {
  // back of the right hand pressed flat on steel; units metres, wrist at origin, fingers up (−y)
  const fingers = [
    { x: -0.034, len: 0.075, a: -12 }, { x: -0.012, len: 0.088, a: -4 }, { x: 0.012, len: 0.085, a: 4 }, { x: 0.033, len: 0.07, a: 12 },
  ];
  return (
    <g>
      {/* sleeve cuff with wrinkle lines (secondary action) */}
      <path d="M-0.06,0.02 L-0.07,0.2 L0.07,0.2 L0.06,0.02 Z" fill={pal.jacket} stroke={pal.outline} strokeWidth={0.003} />
      <path d="M-0.055,0.06 q0.03,0.01 0.05,-0.005 M-0.02,0.1 q0.03,0.012 0.06,-0.004" stroke={pal.jacketShade} strokeWidth={0.003} fill="none" />
      <path d="M-0.06,0.02 L0.06,0.02 L0.06,0.04 L-0.06,0.04 Z" fill={pal.jacketShade} />
      {/* palm/back */}
      <path d="M-0.048,0.02 C-0.055,-0.02 -0.05,-0.05 -0.044,-0.07 L0.044,-0.07 C0.05,-0.05 0.055,-0.02 0.048,0.02 Z" fill={pal.skin} stroke={pal.outline} strokeWidth={0.003} />
      {fingers.map((fg, i) => (
        <g key={i} transform={`translate(${fg.x},-0.065) rotate(${fg.a * spread})`}>
          <path d={`M-0.0105,0 L-0.009,${-fg.len * (1 - curl * 0.35)} Q0,${-fg.len * (1 - curl * 0.35) - 0.012} 0.009,${-fg.len * (1 - curl * 0.35)} L0.0105,0 Z`} fill={pal.skin} stroke={pal.outline} strokeWidth={0.003} />
          {/* knuckle creases + fingernail (back of hand faces camera) */}
          <path d={`M-0.006,${-fg.len * 0.42} q0.006,0.003 0.012,0 M-0.005,${-fg.len * 0.47} q0.005,0.002 0.01,0`} stroke={pal.skinShade} strokeWidth={0.0022} fill="none" />
          <path d={`M-0.0065,${-fg.len * (1 - curl * 0.35) + 0.004} L-0.006,${-fg.len * (1 - curl * 0.35) + 0.02} Q0,${-fg.len * (1 - curl * 0.35) + 0.024} 0.006,${-fg.len * (1 - curl * 0.35) + 0.02} L0.0065,${-fg.len * (1 - curl * 0.35) + 0.004} Q0,${-fg.len * (1 - curl * 0.35) - 0.002} -0.0065,${-fg.len * (1 - curl * 0.35) + 0.004} Z`} fill={pal.skinLight} stroke={pal.skinShade} strokeWidth={0.0018} />
        </g>
      ))}
      {/* thumb */}
      <g transform={`translate(-0.046,-0.01) rotate(${-48 - spread * 10})`}>
        <path d="M-0.011,0 L-0.01,-0.06 Q0,-0.072 0.01,-0.06 L0.012,0 Z" fill={pal.skin} stroke={pal.outline} strokeWidth={0.003} />
      </g>
      {/* knuckle shading + blood on the back of the hand */}
      {/* knuckle bumps + extensor tendons */}
      {[-0.034, -0.012, 0.012, 0.033].map((kx, i) => <ellipse key={i} cx={kx} cy={-0.064} rx={0.008} ry={0.005} fill={pal.skinLight} opacity={0.7} />)}
      {[-0.03, -0.01, 0.012, 0.03].map((kx, i) => <path key={`t${i}`} d={`M${kx},-0.058 L${kx * 0.5},0.0`} stroke={pal.skinShade} strokeWidth={0.0022} opacity={0.6} />)}
      {/* blood soaked into the back of the hand and between the fingers */}
      <path d="M0.012,-0.04 C0.034,-0.03 0.044,-0.004 0.04,0.016 C0.024,0.022 0.006,0.004 0.012,-0.04 Z" fill="#8f1418" opacity={0.8} />
      <path d="M-0.022,-0.062 L-0.023,-0.085 M0.0,-0.064 L0.001,-0.09" stroke="#8f1418" strokeWidth={0.004} opacity={0.7} />
    </g>
  );
};

const S6: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s6;
  const dur = CUT.end - CUT.s6;
  // 12 principles: anticipation (press/spread), slow-in, drag accelerates (ease-in), follow-through (curl as it leaves)
  const press = prog(f, 0, 9, easeOut);
  const slide = prog(f, 10, dur - 4, easeIn);
  const s = 3600;
  const startY = H * 0.36;
  const y = startY + slide * 0.36 * s;
  const x = W * 0.5 + Math.sin(slide * 1.4) * 40; // slight arc
  const spread = press * (1 - slide * 0.6);
  const curl = clamp(slide * 1.4 - 0.4);
  const smearLen = Math.max(0, y - startY);
  return (
    <AbsoluteFill style={{ background: "#0a1118" }}>
      <svg width={W} height={H}>
        <SteelWall id="s6steel" seamY={880} />
        <Blur px={6}><ellipse cx={1450} cy={620} rx={230} ry={600} fill="#0d141c" opacity={0.35} /><rect x={420} y={-50} width={40} height={H + 100} fill="#e8f6ff" opacity={0.55} /></Blur>
        {/* smear trail revealed behind the hand */}
        <defs><filter id="rough6" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={9} /><feDisplacementMap in="SourceGraphic" scale={18} /></filter></defs>
        <g opacity={0.9} filter="url(#rough6)">
          {[-0.034, -0.012, 0.012, 0.033].map((fx, i) => (
            <rect key={i} x={x + fx * s - 0.008 * s} y={startY - 0.14 * s} width={0.016 * s} height={smearLen + 0.06 * s} rx={0.008 * s} fill="#8d1016" opacity={0.6 + 0.1 * i} />
          ))}
          <rect x={x - 0.045 * s} y={startY - 0.06 * s} width={0.09 * s} height={smearLen * 0.9} rx={0.04 * s} fill="#7a0c12" opacity={0.55} />
        </g>
        {/* contact shadow + hand */}
        <ellipse cx={x + 14} cy={y - 0.02 * s} rx={0.06 * s} ry={0.1 * s} fill="#000" opacity={0.25} />
        <g transform={`translate(${x},${y}) scale(${s * (1 + 0.03 * press)},${s * (1 - 0.03 * press + 0.02 * slide)})`}>
          <BigHand spread={spread} curl={curl} pal={LAB_PAL} />
        </g>
      </svg>
      <Finish f={g} vig={0.72} grain={0.075} shadow="#06213f" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── assembly + sound ─────────────────────────── */
export const ColdOpen: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUT.s1} durationInFrames={CUT.s2 - CUT.s1} name="S1 EXT compound"><S1 /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.s3 - CUT.s2} name="S2 INT dolly"><S2 /></Sequence>
    <Sequence from={CUT.s3} durationInFrames={CUT.s4 - CUT.s3} name="S3 floor close"><S3 /></Sequence>
    <Sequence from={CUT.s4} durationInFrames={CUT.s5 - CUT.s4} name="S4 overhead"><S4 /></Sequence>
    <Sequence from={CUT.s5} durationInFrames={CUT.s6 - CUT.s5} name="S5 handprint"><S5 /></Sequence>
    <Sequence from={CUT.s6} durationInFrames={CUT.end - CUT.s6} name="S6 hand insert"><S6 /></Sequence>
    {/* ambient beds – barely audible (narration = 1.0) */}
    <Sequence from={0} durationInFrames={CUT.s2 + 6}><Audio src={staticFile("sfx/night_wind.wav")} volume={(fr) => 0.035 * Math.min(1, (CUT.s2 + 6 - fr) / 6)} /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.end - CUT.s2}><Audio src={staticFile("sfx/roomtone_lab.wav")} volume={0.04} /></Sequence>
    {/* key-moment SFX at 10–15 % of narration level */}
    <Sequence from={sec(5.2)} durationInFrames={20}><Audio src={staticFile("sfx/flicker.wav")} volume={0.12} /></Sequence>
    <Sequence from={sec(16.5)} durationInFrames={30}><Audio src={staticFile("sfx/thump.wav")} volume={0.1} /></Sequence>
  </AbsoluteFill>
);
