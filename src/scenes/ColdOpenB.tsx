// SCENE 01 · COLD OPEN, part B (22.40 s – 37.71 s of narration.wav). Hard cuts; one dissolve for the time jump.
//  S7  22.40–26.00 EXT compound fence, night. The car smashes through the chain-link gate and tears away
//                  ("On the way to the front, the car is pulling away…"). Ref: Felina — partner rams the gate,
//                  laughing / crying / screaming.
//  S8  26.00–30.40 INT car. The partner (ORIGINAL design) laughs-screams, sobs on "still alive" (27.52),
//                  glances to the mirror on "because of him" (28.52); police lights wash past heading the other way.
//  S9  30.40–33.26 Aerial: tail-lights shrinking down the desert highway, police convoy flowing toward the lab.
//                  Dissolve (time jump) on "back" (32.24) →
//  S10 33.26–37.71 Daylight montage of the past, hard cuts on the nouns:
//                  a) chalkboard, chalk writing ("classroom" 33.34)  b) sponge on a car door ("car wash" 34.50)
//                  c) a few bills and coins on a kitchen table ("a very small amount of money" 35.88).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { kf, prog, sec, breath, blink, noise1, easeIn, easeOut, easeInOut, easeOutBack, clamp, lerp, rand } from "../lib/anim";
import { Figure, Pose } from "../rig/Figure";
import { PARTNER, partnerLook, TEACHER, tint, mixHex } from "../rig/cast";
import { NightSky, Ridge, LabBuilding, Pickup } from "../env/LabExterior";
import { Coupe, CoupeFront, CoupeRear } from "../env/Vehicles";
import { HandBack } from "../rig/Hands";
import { Finish, Motes, Streak } from "../fx/Post";

export const CUT_B = { s7: sec(22.4), s7b: sec(24.0), s8: sec(26.0), s9: sec(30.4), diss: sec(32.24), s10a: sec(33.26), s10b: sec(34.4), s10c: sec(35.8), end: sec(37.71) };

/* ───────────────────────── shared night bits ───────────────────────── */
const OL = "#05080d";

/** soft dust puffs share two gradients (defined once per svg via <PuffDefs/>) → cheap & no per-frame id churn */
const PuffDefs: React.FC = () => (
  <defs>
    {[["puffA", "#7b746c"], ["puffB", "#9a9188"]].map(([id, c]) => (
      <radialGradient key={id} id={id}><stop offset="0" stopColor={c} stopOpacity={0.9} /><stop offset="0.6" stopColor={c} stopOpacity={0.35} /><stop offset="1" stopColor={c} stopOpacity={0} /></radialGradient>
    ))}
  </defs>
);
const Puff: React.FC<{ x: number; y: number; r: number; o: number; light?: boolean }> = ({ x, y, r, o, light }) => (
  <ellipse cx={x} cy={y} rx={r} ry={r * 0.72} fill={`url(#${light ? "puffB" : "puffA"})`} opacity={o} />
);

/** chain-link panel on a vertical plane given 4 projected corners */
const quad = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/* ─────────────────────────── S7 · gate crash ─────────────────────────── */
// S7a 22.40–24.00: head-on. The car charges out of the compound, bursts the chain-link gate toward
//                  the lens and blows past camera-left. Cut on "front" (24.12).
// S7b 24.00–26.00: reverse, from the wrecked gate: tail-lights pulling away down the dirt road,
//                  dust rolling back over us ("…the car is pulling away" 24.80–25.62).
const GATE_Z = 12, GATE_HALF = 1.8;
const IMPACT = 20;
const frontZ = (f: number) => (f < IMPACT ? 30 - 0.9 * f : GATE_Z - 0.55 * (f - IMPACT) - 0.004 * (f - IMPACT) ** 2);

/** chain-link gate leaf hinged at (hx, z), swinging toward camera by `ang` degrees. side = −1 left leaf, +1 right */
const GateLeaf: React.FC<{ cam: Cam; hx: number; z: number; ang: number; side: number; w: number }> = ({ cam, hx, z, ang, side, w }) => {
  const a = (ang * Math.PI) / 180;
  const fx = hx - side * Math.cos(a) * w, fz = z - Math.sin(a) * w;
  const c = [project(cam, hx, 0.05, z), project(cam, fx, 0.05, fz), project(cam, fx, 1.9, fz), project(cam, hx, 1.9, z)];
  const sw = Math.max(1.5, 0.05 * c[0].s);
  return (
    <g>
      <polygon points={quad(c)} fill="url(#s7chain)" opacity={0.65} stroke="#5a6672" strokeWidth={sw} strokeLinejoin="round" />
      <line x1={(c[0].x + c[3].x) / 2} y1={(c[0].y + c[3].y) / 2} x2={(c[1].x + c[2].x) / 2} y2={(c[1].y + c[2].y) / 2} stroke="#5a6672" strokeWidth={sw * 0.7} />
      <line x1={c[0].x} y1={c[0].y} x2={c[2].x} y2={c[2].y} stroke="#5a6672" strokeWidth={sw * 0.5} opacity={0.7} />
    </g>
  );
};

const NightGround: React.FC<{ cam: Cam; g: number; roadX?: number }> = ({ cam, g, roadX = 0 }) => (
  <g>
    <defs>
      <linearGradient id="s7g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#151c27" /><stop offset="1" stopColor="#2c2a28" /></linearGradient>
      <pattern id="s7chain" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width={9} height={9} fill="none" stroke="#7a8c9e" strokeWidth={1.1} /></pattern>
    </defs>
    <polygon points={planePts(cam, [[-300, cam.z + 0.4], [300, cam.z + 0.4], [300, 500], [-300, 500]])} fill="url(#s7g)" />
    {/* dirt road with two packed tyre ruts, running to the horizon */}
    <polygon points={planePts(cam, [[roadX - 2.2, cam.z + 0.4], [roadX + 2.2, cam.z + 0.4], [roadX + 2.2, 500], [roadX - 2.2, 500]], 0.002)} fill="#24252a" />
    {[-0.8, 0.8].map((o) => <polygon key={o} points={planePts(cam, [[roadX + o - 0.22, cam.z + 0.4], [roadX + o + 0.22, cam.z + 0.4], [roadX + o + 0.22, 500], [roadX + o - 0.22, 500]], 0.003)} fill="#17181c" />)}
    {Array.from({ length: 50 }).map((_, i) => {
      const wx = -45 + rand(i, 71) * 90, wz = cam.z + 2 + rand(i, 72) * 60;
      if (Math.abs(wx - roadX) < 3) return null;
      const p = project(cam, wx, 0, wz);
      if (p.d < 1) return null;
      const sc = 0.5 + rand(i, 73) * 0.7, sw = noise1(g * 0.03 + i, 4) * 0.05;
      return <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * sc})`}><ellipse cx={0.05} cy={0} rx={0.4} ry={0.05} fill="#000" opacity={0.35} /><path d={`M-0.3,0 Q${-0.2 + sw},-0.35 0,-0.42 Q${0.25 + sw},-0.33 0.32,0 Z`} fill="#1f2c22" /><path d={`M-0.12,-0.05 Q${-0.04 + sw},-0.3 0.06,-0.36`} stroke="#3c5244" strokeWidth={0.03} fill="none" /></g>;
    })}
  </g>
);

/** straight fence along x at depth z, from x0 to x1, posts every 2.5 m */
const FenceX: React.FC<{ cam: Cam; z: number; x0: number; x1: number }> = ({ cam, z, x0, x1 }) => {
  const c = [project(cam, x0, 0, z), project(cam, x1, 0, z), project(cam, x1, 1.9, z), project(cam, x0, 1.9, z)];
  const n = Math.max(1, Math.round(Math.abs(x1 - x0) / 2.5));
  return (
    <g>
      <polygon points={quad(c)} fill="url(#s7chain)" opacity={0.55} />
      <line x1={c[3].x} y1={c[3].y} x2={c[2].x} y2={c[2].y} stroke="#5a6672" strokeWidth={Math.max(1.5, 0.05 * c[0].s)} />
      {Array.from({ length: n + 1 }).map((_, i) => { const x = lerp(x0, x1, i / n); const b = project(cam, x, 0, z), t = project(cam, x, 2.05, z); return <line key={i} x1={b.x} y1={b.y} x2={t.x} y2={t.y} stroke="#4b5763" strokeWidth={Math.max(2, 0.09 * b.s)} />; })}
      <path d={`M${c[3].x},${c[3].y - 0.08 * c[3].s} ${Array.from({ length: 24 }).map((_, i) => { const p = project(cam, lerp(x0, x1, (i + 1) / 24), 2.0 + (i % 2) * 0.06, z); return `L${p.x},${p.y}`; }).join(" ")}`} stroke="#6a7682" strokeWidth={1.4} fill="none" />
    </g>
  );
};

const S7a: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s7;
  const shake = f >= IMPACT && f < IMPACT + 12 ? (rand(f, 3) - 0.5) * 0.08 * (1 - (f - IMPACT) / 12) : 0;
  const cam: Cam = { x: 0.6 + shake, y: 0.85 + shake * 0.4, z: 0, f: 1150, shiftY: 90 };
  const z = frontZ(f);
  const x = -2.5 * prog(f, IMPACT + 4, 42, easeIn); // veers to pass camera-left
  const hit = f >= IMPACT ? Math.exp(-(f - IMPACT) / 5) * Math.sin((f - IMPACT) * 1.1) : 0;
  const leafAng = f < IMPACT ? 0 : 105 * easeOutBack(clamp((f - IMPACT) / 8), 2) - 10 * Math.sin((f - IMPACT) * 0.4) * Math.exp(-(f - IMPACT) / 12);
  const leafAngR = f < IMPACT ? 0 : 80 * easeOutBack(clamp((f - IMPACT - 1) / 9), 2.4) - 12 * Math.sin((f - IMPACT) * 0.45) * Math.exp(-(f - IMPACT) / 10);
  const head = project(cam, x, 0.72, z);
  const glare = clamp(1 - (z - 1) / 14); // headlights fill the lens as it nears
  const dust: React.ReactNode[] = [];
  for (let s = 0; s <= f; s += 2) {
    const age = f - s; if (age > 60) continue;
    const zz = frontZ(s) + 4.3, xx = (s > IMPACT + 4 ? -2.5 * prog(s, IMPACT + 4, 42, easeIn) : 0) + (rand(s, 5) - 0.5) * 1.6;
    if (zz - cam.z < 1) continue;
    const p = project(cam, xx, 0.3 + age * 0.015, zz);
    dust.push(<Puff key={s} x={p.x} y={p.y} r={(0.6 + age * 0.04) * p.s} o={(1 - age / 60) * 0.5 * Math.min(1, age / 3)} light={s % 4 === 0} />);
  }
  const sparks = f >= IMPACT && f < IMPACT + 14 ? Array.from({ length: 14 }).map((_, i) => {
    const t = (f - IMPACT) / 14;
    const p0 = project(cam, (rand(i, 10) - 0.5) * 3.4 * (1 + t), 1.0 + t * rand(i, 11) * 1.4 - t * t * 1.6, GATE_Z - t * (1 + rand(i, 12) * 3));
    return <circle key={i} cx={p0.x} cy={p0.y} r={2.4} fill="#ffd27a" opacity={1 - t} />;
  }) : null;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <PuffDefs />
        <NightSky f={g} cam={cam} />
        <Ridge cam={cam} f={g} />
        <NightGround cam={cam} g={g} />
        <LabBuilding cam={cam} f={g} x={3} z={36} />
        <Pickup cam={cam} x={-8} z={26} color="#4a2a26" />
        <Card cam={cam} x={-6} z={22}>
          <rect x={-0.07} y={-6} width={0.14} height={6} fill="#243140" />
          <path d="M0,-6 h0.9 v0.15 h-0.9 Z" fill="#243140" />
          <ellipse cx={0.85} cy={-5.8} rx={0.25} ry={0.07} fill="#ffe8b5" />
          <ellipse cx={0.85} cy={-5.4} rx={2.4} ry={2.8} fill="url(#warmGlow)" />
        </Card>
        {/* car behind the gate until it bursts through */}
        {z > GATE_Z && <Card cam={cam} x={x} z={z}><CoupeFront bounce={hit * 0.04} /></Card>}
        {z > GATE_Z && dust}
        <FenceX cam={cam} z={GATE_Z} x0={-30} x1={-GATE_HALF} />
        <FenceX cam={cam} z={GATE_Z} x0={GATE_HALF} x1={30} />
        <GateLeaf cam={cam} hx={-GATE_HALF} z={GATE_Z} ang={leafAng} side={-1} w={GATE_HALF} />
        <GateLeaf cam={cam} hx={GATE_HALF} z={GATE_Z} ang={leafAngR} side={1} w={GATE_HALF} />
        {z <= GATE_Z && dust}
        {z <= GATE_Z && z > 0.3 && <Card cam={cam} x={x} z={z}><CoupeFront bounce={hit * 0.05} roll={x * 1.2} dents={1} /></Card>}
        {sparks}
        {/* headlight bloom */}
        <defs><radialGradient id="hlGlow"><stop offset="0" stopColor="#fffbe8" stopOpacity={1} /><stop offset="0.25" stopColor="#fff3cc" stopOpacity={0.55} /><stop offset="1" stopColor="#fff3cc" stopOpacity={0} /></radialGradient></defs>
        {z > 0.3 && [-0.69, 0.69].map((o) => <circle key={o} cx={head.x + o * head.s} cy={head.y} r={0.35 * head.s + 30 + glare * 300} fill="url(#hlGlow)" opacity={0.5 + glare * 0.5} />)}
      </svg>
      {z > 0.3 && <Streak x={head.x} y={head.y} w={1100 + glare * 900} color="#fff1c8" o={0.35 + glare * 0.4} />}
      {/* lens whiteout as it passes */}
      <AbsoluteFill style={{ background: "#fff8e6", opacity: clamp((f - 36) / 6) * (1 - clamp((f - 44) / 4)) * 0.85 }} />
      <Motes f={g} n={30} color="#d8cfc4" seed={17} drift={-1.5} />
      <Finish f={g} vig={0.7} grain={0.08} shadow="#081a33" gradeO={0.25} />
    </AbsoluteFill>
  );
};

const S7b: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s7 + (CUT_B.s7b - CUT_B.s7);
  const cam: Cam = { x: -0.3, y: 1.25, z: lerp(0, 0.8, easeOut(f / 60)), f: 1250, shiftY: 70 };
  const rz = 7 + f * 0.32 + f * f * 0.006; // rear bumper depth, accelerating away
  const rx = 0.2 + Math.sin(f * 0.12) * 0.12 * Math.exp(-f / 40); // small fishtail settling
  const roll = Math.sin(f * 0.2) * 1.5 * Math.exp(-f / 30);
  const dust: React.ReactNode[] = [];
  for (let s = -30; s <= f; s += 2) {
    const age = f - s;
    if (age > 70) continue;
    const zz = 7 + Math.max(0, s) * 0.32 + Math.max(0, s) ** 2 * 0.006 - 0.5 - age * 0.04; // rolls back toward us
    const xx = rx + (rand(s + 40, 5) - 0.5) * 2.2;
    if (zz - cam.z < 0.8) continue;
    const p = project(cam, xx, 0.4 + age * 0.018, zz);
    dust.push(<Puff key={s} x={p.x} y={p.y} r={(0.45 + age * 0.03) * p.s} o={(1 - age / 70) * 0.28} light={s % 4 === 0} />);
  }
  const tail = project(cam, rx, 0.8, rz);
  // the broken leaf hanging off its hinge in the foreground, still swinging
  const leafAng = 70 + 16 * Math.sin(f * 0.16 + 1) * Math.exp(-f / 50);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <PuffDefs />
        <NightSky f={g} cam={cam} />
        <Ridge cam={cam} f={g} />
        {/* police lights far up the road, coming this way */}
        {[0, 1, 2].map((i) => { const p = project(cam, -1.5 + i * 0.2, 1.2, 900 - f * 2 - i * 30); const on = Math.sin(g * 1.1 + i * 2) > 0; return <g key={i}><circle cx={p.x + i * 14} cy={p.y} r={2.2} fill={on ? "#ff3048" : "#3a7bff"} /><circle cx={p.x + i * 14} cy={p.y} r={10} fill={on ? "#ff3048" : "#3a7bff"} opacity={0.2} /></g>; })}
        <NightGround cam={cam} g={g} roadX={0.2} />
        <polygon points={planePts(cam, [[rx - 1.2, rz + 0.2], [rx + 1.2, rz + 0.2], [rx + 5, rz + 40], [rx - 5, rz + 40]], 0.01)} fill="#fff1c4" opacity={0.16} />
        {dust.filter((_, i) => i % 2 === 0)}
        <Card cam={cam} x={rx} z={rz}><CoupeRear roll={roll} tail={0.85} /></Card>
        <circle cx={tail.x} cy={tail.y} r={1.6 * tail.s} fill="#ff2a2a" opacity={0.1} />
        {dust.filter((_, i) => i % 2 === 1)}
        {/* foreground: fence posts either side, and the wrecked leaf */}
        <FenceX cam={cam} z={1.6} x0={-14} x1={-GATE_HALF} />
        <FenceX cam={cam} z={1.6} x0={GATE_HALF} x1={14} />
        <GateLeaf cam={cam} hx={GATE_HALF} z={1.6} ang={-leafAng} side={1} w={GATE_HALF} />
      </svg>
      <Motes f={g} n={40} color="#d8cfc4" seed={19} drift={-0.8} />
      <Finish f={g} vig={0.72} grain={0.08} shadow="#081a33" gradeO={0.25} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S8 · in the car ─────────────────────────── */
const CAR_PAL = tint(PARTNER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#1b2d48", 0.28) : c));
const DASH = "#9dffb8";

const S8: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s8;
  const t = (s: number) => sec(s) - CUT_B.s8; // narration seconds → local frame
  // performance beats
  const scream = 1 - prog(f, t(27.3), t(27.7));
  const glance = prog(f, t(28.45), t(28.75)) * (1 - prog(f, t(29.6), t(29.95)));
  const sob = prog(f, t(27.5), t(27.9)) * (1 - glance * 0.7);
  const shakeAmp = 2.2 * scream + 1.2 * sob;
  const shake = noise1(f * 0.9, 3) * shakeAmp;
  const heave = breath(f, 0.5) * (scream * 0.6 + sob);
  const neck = lerp(-4, -13, scream) + 6 * sob * (1 - glance) - 3 * glance + shake * 0.6;
  const road = noise1(f * 0.35, 8) * 1.2; // road vibration
  const pose: Pose = {
    torso: -6 + shake * 0.5 + road * 0.3, neck,
    shL: 66, shR: 72 + shake * 0.6, elL: 26, elR: 18 + heave * 4,
    hipL: 80, hipR: 82, knL: 80, knR: 82, breathe: heave,
  };
  const mouth = scream > 0.5 ? "scream" : glance > 0.5 ? "flat" : "laugh";
  const look = partnerLook({
    yaw: 0.72 - glance * 0.12,
    lids: clamp(0.55 * scream + 0.35 * sob * (1 - glance) + 0.12 + blink(g, 3) * 0.8),
    lookX: glance * 0.9, lookY: -glance * 0.9,
    brow: -0.3 * scream - 0.85 * sob - 0.6 * glance,
    mouth, mouthOpen: scream > 0.5 ? 0.75 + 0.25 * Math.abs(Math.sin(f * 0.6)) : 0.25 + 0.35 * heave * (1 - glance),
    tears: clamp(0.5 + 0.5 * prog(f, t(27.5), t(30.2))), bruise: 1, dirt: 0.8,
  });
  // police lights wash (oncoming convoy passes on "because of him")
  const pol = prog(f, t(28.2), t(28.6)) * (1 - prog(f, t(29.5), t(30.1)));
  const red = Math.sin(g * 1.3) > 0;
  const P = 1500; // px per metre
  const ox = 640, oy = 1420; // pelvis on screen
  // window scenery offsets (car moves to screen right → scenery slides left)
  const ridgeOff = -f * 0.6, postOff = -f * 46;
  return (
    <AbsoluteFill style={{ background: "#03060b" }}>
      <svg width={W} height={H}>
        <defs>
          <linearGradient id="s8sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#050b18" /><stop offset="1" stopColor="#1b3050" /></linearGradient>
          <radialGradient id="s8dash" cx="0.5" cy="1" r="0.8"><stop offset="0" stopColor={DASH} stopOpacity={0.35} /><stop offset="1" stopColor={DASH} stopOpacity={0} /></radialGradient>
          <radialGradient id="s8pol" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={red ? "#ff2b45" : "#2f6dff"} stopOpacity={0.55} /><stop offset="1" stopColor={red ? "#ff2b45" : "#2f6dff"} stopOpacity={0} /></radialGradient>
          <clipPath id="s8win"><path d="M90,170 L1180,150 L1330,620 L90,640 Z" /></clipPath>
          <clipPath id="s8wind"><path d="M1395,150 L1920,120 L1920,700 L1470,640 Z" /></clipPath>
        </defs>
        {/* driver-side window: the desert night streaming past */}
        <g clipPath="url(#s8win)">
          <rect x={0} y={0} width={W} height={H} fill="url(#s8sky)" />
          {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={(rand(i, 3) * 1600 + ridgeOff * 0.2 + 1600) % 1600} cy={170 + rand(i, 4) * 260} r={rand(i, 5) < 0.1 ? 1.5 : 0.9} fill="#dfe9ff" opacity={0.6} />)}
          <path d={`M0,560 ${Array.from({ length: 30 }).map((_, i) => `L${i * 70 + ((ridgeOff % 70) + 70) % 70 - 70},${520 - 50 * Math.abs(noise1(i * 0.5 + Math.floor(-ridgeOff / 70) * 0.5, 2))}`).join(" ")} L2000,560 L2000,700 L0,700 Z`} fill="#0d1828" />
          <rect x={0} y={560} width={W} height={120} fill="#141619" />
          {/* roadside reflector posts whipping past with motion smear */}
          {[0, 1, 2, 3].map((i) => {
            const x = ((i * 520 + postOff) % 2080 + 2080) % 2080 - 80;
            return <g key={i}><rect x={x} y={470} width={22} height={140} fill="#2a2f36" /><rect x={x} y={470} width={180} height={10} fill="#ff5a3a" opacity={0.35} /><rect x={x} y={478} width={22} height={10} fill="#ff6a3a" /></g>;
          })}
          {/* oncoming police lights streak through the side window */}
          {pol > 0 && <rect x={1300 - pol * 1500} y={500} width={420} height={18} rx={9} fill={red ? "#ff2b45" : "#2f6dff"} opacity={0.75 * pol} />}
        </g>
        {/* windshield view ahead: road + headlight pool, oncoming police */}
        <g clipPath="url(#s8wind)">
          <rect x={1300} y={100} width={700} height={620} fill="url(#s8sky)" />
          <polygon points="1300,560 1920,560 1920,720 1300,720" fill="#15171b" />
          <polygon points="1640,560 1700,560 1920,720 1520,720" fill="#fff0c4" opacity={0.18} />
          {[0, 1, 2].map((i) => { const k = ((f * 0.07 + i / 3) % 1); return <polygon key={i} points={`${1668 - 2 - k * 6},${560 + k * k * 160} ${1672 + 2 + k * 6},${560 + k * k * 160} ${1672 + 4 + k * 10},${566 + k * k * 190} ${1668 - 4 - k * 10},${566 + k * k * 190}`} fill="#d8c88a" opacity={0.7} />; })}
          {pol > 0 && <g><circle cx={1600 - pol * 300} cy={556 + pol * 40} r={4 + pol * 30} fill={red ? "#ff2b45" : "#2f6dff"} opacity={0.9} /><circle cx={1600 - pol * 300} cy={556 + pol * 40} r={20 + pol * 120} fill={red ? "#ff2b45" : "#2f6dff"} opacity={0.18} /></g>}
        </g>
        {/* car interior shell: roof liner, B-pillar, door, A-pillar, headrest */}
        <path d="M0,0 L1920,0 L1920,120 L1395,150 L1180,150 L90,170 L0,175 Z" fill="#0b0e13" />
        <path d="M0,175 L90,170 L90,640 L0,650 Z" fill="#0e1218" />
        <path d="M1180,150 L1395,150 L1470,640 L1330,620 Z" fill="#0c1016" />
        <path d="M1330,620 L1470,640 L1920,700 L1920,1080 L0,1080 L0,650 L90,640 Z" fill="#11161d" />
        <path d="M90,640 L1330,620" stroke="#2a3442" strokeWidth={6} />
        <path d="M90,644 L1330,624" stroke="#9fc4ff" strokeWidth={2} opacity={0.25} />
        {/* seat: headrest on posts + seat back behind his shoulders */}
        <rect x={200} y={170} width={250} height={250} rx={70} fill="#161b23" stroke="#06080b" strokeWidth={5} />
        <path d="M250,420 L270,470 M400,420 L380,470" stroke="#8a95a3" strokeWidth={8} />
        <path d="M150,470 Q320,440 520,480 L560,1080 L120,1080 Z" fill="#141920" stroke="#06080b" strokeWidth={5} />
        <path d="M180,520 Q320,495 500,525" stroke="#232a35" strokeWidth={10} fill="none" />
        {/* rear-view mirror: the lab's blue glow receding behind him */}
        <g transform={`translate(1540,210) rotate(-4)`}>
          <rect x={-150} y={-42} width={300} height={84} rx={18} fill="#0a0d12" stroke="#2c3542" strokeWidth={5} />
          <rect x={-138} y={-32} width={276} height={64} rx={12} fill="#0b1626" />
          <ellipse cx={-30 + f * 0.3} cy={8} rx={40 - f * 0.15} ry={10} fill="#6fc0ff" opacity={0.45 + glance * 0.3} />
          <rect x={-60} y={-80} width={18} height={40} fill="#0a0d12" />
        </g>
        {/* dash glow on the cabin */}
        <rect x={700} y={500} width={1220} height={580} fill="url(#s8dash)" />
        {/* the partner */}
        <g transform={`translate(${ox + road * 2},${oy + road * 3}) scale(${P})`}>
          <Figure pose={pose} view={0.72} look={look} pal={CAR_PAL} height={PARTNER.height} ground={false} outfit="hoodie" rimLight="#9cc6ff" rimSide={1} />
        </g>
        {/* steering wheel in front of his hands + column */}
        <g transform={`translate(${1500 + road * 2},${800 + road * 3}) rotate(-16)`}>
          <path d="M10,40 L90,360" stroke="#0a0c10" strokeWidth={60} />
          <ellipse cx={0} cy={0} rx={70} ry={270} fill="none" stroke="#06080b" strokeWidth={50} />
          <ellipse cx={0} cy={0} rx={70} ry={270} fill="none" stroke="#1b2129" strokeWidth={38} />
          <path d="M-60,-200 Q-80,-60 -62,90" stroke="#5a6878" strokeWidth={6} opacity={0.7} fill="none" />
          <path d="M-58,-180 Q-74,-80 -60,10" stroke={DASH} strokeWidth={5} opacity={0.35} fill="none" />
        </g>
        {/* dashboard with glowing gauges */}
        <path d="M1260,860 Q1600,760 1920,780 L1920,1080 L1180,1080 Z" fill="#090b0f" />
        {[1560, 1700].map((x, i) => <g key={i}><circle cx={x} cy={850} r={46} fill="#0f2a1e" stroke="#1d3a2c" strokeWidth={4} /><circle cx={x} cy={850} r={40} fill={DASH} opacity={0.15} /><line x1={x} y1={850} x2={x + 30 * Math.cos(-2.3 + (i ? 0.4 : 1.4 + noise1(f * 0.1, 1) * 0.2))} y2={850 + 30 * Math.sin(-2.3 + (i ? 0.4 : 1.4))} stroke="#ff6a3a" strokeWidth={4} /></g>)}
        {/* police wash over the whole cabin */}
        {pol > 0 && <rect x={0} y={0} width={W} height={H} fill="url(#s8pol)" opacity={pol} />}
      </svg>
      <Finish f={g} vig={0.72} grain={0.085} shadow="#071a30" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S9 · aerial highway ─────────────────────────── */
const S9: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s9;
  const u = f / dur;
  const cam: Cam = { x: lerp(-9, -6, easeInOut(u)), y: lerp(14, 22, easeInOut(u)), z: lerp(-26, -30, easeInOut(u)), f: 1500, shiftY: -260 };
  // highway along z at x = 0 from the lab (z≈0) to the horizon
  const roadL = planePts(cam, [[-3.5, -20], [3.5, -20], [3.5, 3000], [-3.5, 3000]]);
  const carZ = 18 + f * 0.75 + f * f * 0.004; // receding (+z)
  const tl = [project(cam, 1.1, 0.8, carZ), project(cam, 2.4, 0.8, carZ)];
  const beam = planePts(cam, [[1.0, carZ - 2], [2.6, carZ - 2], [4.5, carZ - 30], [-1, carZ - 30]], 0.02);
  // convoy coming down the road toward the lab (−z), lights flashing
  const convoy = [0, 1, 2, 3].map((i) => {
    const z = 900 - f * 2.4 - i * 26;
    const p = project(cam, -1.8, 1.2, z);
    const on = Math.sin(g * 1.2 + i * 1.7) > 0;
    return <g key={i}><circle cx={p.x} cy={p.y} r={Math.max(1.6, 0.6 * p.s)} fill={on ? "#ff3048" : "#3a7bff"} /><circle cx={p.x} cy={p.y} r={Math.max(6, 3 * p.s)} fill={on ? "#ff3048" : "#3a7bff"} opacity={0.22} /><circle cx={p.x + 0.8 * p.s} cy={p.y + 0.4 * p.s} r={Math.max(1, 0.25 * p.s)} fill="#fff6d8" /></g>;
  });
  const lab = project(cam, -16, 0, 6);
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <NightSky f={g} cam={{ ...cam, x: 0 }} />
        <polygon points={planePts(cam, [[-3000, -40], [3000, -40], [3000, 4000], [-3000, 4000]])} fill="#1d2532" />
        <Ridge cam={{ ...cam, x: 0 }} f={g} />
        {/* moonlit desert texture: scrub dots, washes */}
        {Array.from({ length: 160 }).map((_, i) => {
          const wx = -300 + rand(i, 81) * 600, wz = -30 + rand(i, 82) * 700;
          const p = project(cam, wx, 0, wz);
          return <ellipse key={i} cx={p.x} cy={p.y} rx={Math.max(1, 1.2 * p.s)} ry={Math.max(0.6, 0.5 * p.s)} fill={rand(i, 83) > 0.5 ? "#202b26" : "#2b3038"} opacity={0.9} />;
        })}
        {[0, 1].map((i) => <path key={i} d={`M${planePts(cam, Array.from({ length: 12 }).map((_, k) => [-200 + k * 40 + i * 30, 120 + i * 140 + 30 * Math.sin(k * 0.9 + i)] as [number, number]))}`.replace(/ /g, " L")} stroke="#262f3c" strokeWidth={3} fill="none" opacity={0.7} />)}
        <polygon points={roadL} fill="#2a2d33" />
        <polygon points={planePts(cam, [[-3.5, -20], [-3.2, -20], [-3.2, 3000], [-3.5, 3000]], 0.01)} fill="#6f7f95" opacity={0.5} />
        <polygon points={planePts(cam, [[3.2, -20], [3.5, -20], [3.5, 3000], [3.2, 3000]], 0.01)} fill="#6f7f95" opacity={0.5} />
        {/* centre dashes */}
        {Array.from({ length: 60 }).map((_, i) => { const z = i * 12; return <polygon key={i} points={planePts(cam, [[-0.08, z], [0.08, z], [0.08, z + 4], [-0.08, z + 4]], 0.01)} fill="#bfae74" opacity={0.6} />; })}
        {/* the lab, small and blue, where the convoy is heading */}
        <Card cam={cam} x={-16} z={6}>
          <polygon points="-7.3,-6 0,-7.3 7.3,-6" fill="#121b26" />
          <rect x={-7} y={-6} width={14} height={6} fill="#1f2c3c" />
          {[-5, -2.5, 0, 2.5, 5].map((wx) => <rect key={wx} x={wx - 0.9} y={-5.5} width={1.8} height={0.7} fill="#9ad3ff" opacity={0.8} />)}
          <rect x={-3.7} y={-3.4} width={3.4} height={3.4} fill="#0a1119" />
          <rect x={-3.7} y={-2} width={3.4} height={2} fill="#9ad3ff" opacity={0.9} />
        </Card>
        <ellipse cx={lab.x - 0.2 * lab.s} cy={lab.y} rx={12 * lab.s} ry={4 * lab.s} fill="#5fb6ff" opacity={0.12} />
        <polygon points={planePts(cam, [[-24, -2], [-8, -2], [-8, 14], [-24, 14]])} fill="none" stroke="#56616c" strokeWidth={0.8} strokeDasharray="2 3" opacity={0.35} />
        {convoy}
        {/* the car: headlight pool ahead, tail-lights shrinking */}
        <polygon points={beam} fill="#fff1c4" opacity={0.25} />
        {tl.map((p, i) => <g key={i}><circle cx={p.x} cy={p.y} r={Math.max(1.4, 0.18 * p.s)} fill="#ff2a2a" /><circle cx={p.x} cy={p.y} r={Math.max(5, 0.9 * p.s)} fill="#ff2a2a" opacity={0.25} /></g>)}
        {/* dust trail hanging behind the car */}
        {Array.from({ length: 14 }).map((_, i) => { const p = project(cam, 1.7 + Math.sin(i) * 0.6, 0.8, carZ - 5 - i * 6); return <ellipse key={i} cx={p.x} cy={p.y} rx={2.2 * p.s} ry={1.2 * p.s} fill="#6f6a66" opacity={0.18 * (1 - i / 14)} />; })}
      </svg>
      <Finish f={g} vig={0.75} grain={0.08} shadow="#081a33" gradeO={0.25} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S10 · montage of the past (daylight) ─────────────────────────── */
const DAY = TEACHER.pal;

const S10Classroom: React.FC<{ fadeIn: number }> = ({ fadeIn }) => {
  const f = useCurrentFrame();
  const g = f + CUT_B.diss;
  const fade = clamp(f / fadeIn);
  // chalk path: a ring structure written progressively
  const write = prog(f, 14, 60, (x) => x);
  const ring = Array.from({ length: 7 }).map((_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return [760 + Math.cos(a) * 170, 560 + Math.sin(a) * 170]; });
  const segs: [number, number, number, number][] = [];
  for (let i = 0; i < 6; i++) segs.push([ring[i][0], ring[i][1], ring[i + 1][0], ring[i + 1][1]]);
  segs.push([ring[1][0], ring[1][1], ring[1][0] + 180, ring[1][1] - 100]);
  segs.push([ring[1][0] + 180, ring[1][1] - 100, ring[1][0] + 340, ring[1][1] - 10]);
  segs.push([ring[4][0], ring[4][1], ring[4][0] - 180, ring[4][1] + 100]);
  const total = segs.length;
  const drawn = write * total;
  let tip = { x: segs[0][0], y: segs[0][1] };
  const lines = segs.map((s, i) => {
    const k = clamp(drawn - i);
    if (k <= 0) return null;
    const x2 = lerp(s[0], s[2], k), y2 = lerp(s[1], s[3], k);
    if (k < 1 || i === Math.floor(drawn)) tip = { x: x2, y: y2 };
    return <line key={i} x1={s[0]} y1={s[1]} x2={x2} y2={y2} stroke="#eef3ea" strokeWidth={12} strokeLinecap="round" opacity={0.85} />;
  });
  if (drawn >= total) tip = { x: segs[total - 1][2], y: segs[total - 1][3] };
  const handIn = prog(f, 0, 14, easeOut);
  const hx = lerp(1500, tip.x, handIn) + noise1(f * 0.8, 2) * 3, hy = lerp(900, tip.y, handIn);
  const camX = -f * 0.6;
  return (
    <AbsoluteFill style={{ opacity: fade, background: "#000" }}>
      <svg width={W} height={H}>
        <defs>
          <linearGradient id="cb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2f4a3c" /><stop offset="1" stopColor="#1f3329" /></linearGradient>
          <linearGradient id="sunShaft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe6a8" stopOpacity={0.35} /><stop offset="1" stopColor="#ffe6a8" stopOpacity={0} /></linearGradient>
        </defs>
        <g transform={`translate(${camX},0)`}>
          <rect x={-100} y={-50} width={2200} height={1200} fill="url(#cb)" />
          {/* old erased chalk ghosts (storytelling: years of the same lesson) */}
          {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${rand(i, 1) * 1900},${rand(i, 2) * 1000} q${60 + rand(i, 3) * 200},${-40 + rand(i, 4) * 80} ${200 + rand(i, 5) * 300},${-20 + rand(i, 6) * 40}`} stroke="#c9d6c8" strokeWidth={18 + rand(i, 7) * 30} opacity={0.06} fill="none" strokeLinecap="round" />)}
          {/* periodic-table style grid already on the board, top-left */}
          {Array.from({ length: 18 }).map((_, c) => Array.from({ length: 3 }).map((__, r) => <rect key={`${c}-${r}`} x={160 + c * 46} y={120 + r * 46} width={40} height={40} fill="none" stroke="#dfe8dc" strokeWidth={2.5} opacity={c > 1 && c < 12 && r === 0 ? 0 : 0.5} />))}
          {lines}
          <text x={ring[1][0] + 350} y={ring[1][1] + 10} fontSize={76} fontFamily="DejaVu Sans, Arial" fill="#eef3ea" opacity={drawn > total - 0.3 ? 0.85 : 0}>OH</text>
          {/* chalk tray + aluminium frame */}
          <rect x={-100} y={990} width={2200} height={40} fill="#9aa3a8" />
          <rect x={-100} y={1030} width={2200} height={60} fill="#5b4632" />
          {[300, 340, 900].map((x, i) => <rect key={i} x={x} y={976} width={60} height={16} rx={8} fill="#f2efe6" />)}
        </g>
        {/* chalk dust motes where the tip touches */}
        {Array.from({ length: 10 }).map((_, i) => { const a = (f + i * 7) % 24; return <circle key={i} cx={tip.x + camX + (rand(i, 9) - 0.5) * 30} cy={tip.y + a * 2.4} r={2} fill="#ffffff" opacity={write > 0 && write < 1 ? 0.5 * (1 - a / 24) : 0} />; })}
        <g transform={`translate(${hx + camX + 150},${hy + 230}) scale(2600) rotate(-28)`}>
          {/* chalk stick pinched between thumb and index, tip at the board */}
          <g transform="translate(-0.035,-0.1) rotate(-25)"><rect x={-0.007} y={-0.05} width={0.014} height={0.06} rx={0.003} fill="#f4f1e8" stroke="#9a968c" strokeWidth={0.002} /></g>
          <HandBack pal={DAY} curl={0.95} thumb={1} sleeve={DAY.jacket} sleeveShade={DAY.jacketShade} cuff={DAY.shirt} />
        </g>
        <polygon points="0,0 700,0 1500,1080 300,1080" fill="url(#sunShaft)" />
      </svg>
      <Motes f={g} n={40} color="#ffe9b8" seed={23} drift={0.4} />
      <Finish f={g} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

const S10CarWash: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s10b;
  const dur = CUT_B.s10c - CUT_B.s10b;
  const sweep = prog(f, 2, dur - 4, easeInOut);
  // sponge travels along an arc (arc principle), squashes on contact
  const ang = lerp(-0.9, 0.9, sweep);
  const sx = 960 + Math.sin(ang) * 520, sy = 600 - Math.cos(ang) * 160 + 120;
  const squash = 1 + 0.12 * Math.sin(sweep * Math.PI);
  return (
    <AbsoluteFill style={{ background: "#7fb6e6" }}>
      <svg width={W} height={H}>
        <defs>
          <linearGradient id="door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9dcef" /><stop offset="0.45" stopColor="#9db8d4" /><stop offset="1" stopColor="#5e7c9c" /></linearGradient>
          <linearGradient id="skyRef" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity={0} /><stop offset="0.5" stopColor="#ffffff" stopOpacity={0.55} /><stop offset="1" stopColor="#ffffff" stopOpacity={0} /></linearGradient>
        </defs>
        {/* the car door fills frame: body panel, window line, handle, sky + building reflection */}
        <rect x={0} y={0} width={W} height={H} fill="url(#door)" />
        <rect x={0} y={0} width={W} height={210} fill="#2b3a4a" />
        <rect x={0} y={200} width={W} height={22} fill="#d8e2ea" />
        <path d={`M${-200 + f * 2},380 L${2100 + f * 2},330`} stroke="url(#skyRef)" strokeWidth={60} />
        <path d="M0,760 L1920,720" stroke="#4c6784" strokeWidth={6} opacity={0.6} />
        <rect x={1320} y={420} width={210} height={40} rx={20} fill="#c8d2da" stroke="#5a6672" strokeWidth={4} />
        {/* suds: clusters of bubbles on the unwashed part (to the right of the sponge path) */}
        {Array.from({ length: 160 }).map((_, i) => {
          const cl = i % 8; const bx = 380 + (cl % 4) * 360 + (rand(i, 31) - 0.5) * 260, by = 380 + Math.floor(cl / 4) * 300 + (rand(i, 32) - 0.5) * 220;
          const a = Math.asin(clamp((bx - 960) / 520, -1, 1));
          const cleaned = a < ang && Math.abs(by - (600 - Math.cos(a) * 160 + 120)) < 170;
          if (cleaned) return null;
          const r = 10 + rand(i, 33) * 26;
          return <g key={i}><circle cx={bx} cy={by} r={r} fill="#ffffff" opacity={0.85} /><circle cx={bx - r * 0.3} cy={by - r * 0.3} r={r * 0.25} fill="#ffffff" /><circle cx={bx} cy={by} r={r} fill="none" stroke="#b9d3ea" strokeWidth={2} /></g>;
        })}
        {/* clean wet streak with drips running down (secondary action) */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = lerp(-0.9, ang, i / 8);
          const x = 960 + Math.sin(a) * 520, y = 600 - Math.cos(a) * 160 + 120 + 90;
          const run = Math.max(0, (sweep - (i / 8) * sweep) * 260);
          return <path key={i} d={`M${x},${y} q4,${run * 0.5} 0,${run}`} stroke="#eaf5ff" strokeWidth={6} opacity={0.7} strokeLinecap="round" fill="none" />;
        })}
        <path d={`M${960 + Math.sin(-0.9) * 520},${600 - Math.cos(-0.9) * 160 + 120} ${Array.from({ length: 20 }).map((_, i) => { const a = lerp(-0.9, ang, (i + 1) / 20); return `L${960 + Math.sin(a) * 520},${600 - Math.cos(a) * 160 + 120}`; }).join(" ")}`} stroke="#e3f1ff" strokeWidth={150} opacity={0.18} fill="none" strokeLinecap="round" />
        {/* hose spray mist from the left edge with sparkles */}
        {Array.from({ length: 26 }).map((_, i) => { const k = ((f * 0.05 + i / 26) % 1); return <circle key={i} cx={-20 + k * 520} cy={300 + rand(i, 41) * 140 + k * k * 260} r={3 + rand(i, 42) * 4} fill="#ffffff" opacity={0.6 * (1 - k)} />; })}
        {/* sponge + hand */}
        <g transform={`translate(${sx},${sy}) rotate(${ang * 20}) scale(${squash},${1 / squash})`}>
          <rect x={-160} y={-90} width={320} height={180} rx={44} fill="#f3c63a" stroke="#7a5a10" strokeWidth={6} />
          {Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={-100 + rand(i, 51) * 200} cy={-55 + rand(i, 52) * 110} r={4 + rand(i, 53) * 5} fill="#c99a1e" opacity={0.7} />)}
          <path d="M-120,40 Q0,90 120,40" stroke="#ffffff" strokeWidth={22} opacity={0.75} fill="none" />
        </g>
        <g transform={`translate(${sx + 30 + Math.sin(ang) * 20},${sy + 160}) scale(2300) rotate(${ang * 20 + 6})`}>
          <HandBack pal={DAY} curl={0.8} thumb={0.7} sleeve="#8fb3cf" sleeveShade="#6a8dab" forearm={0.3} />
        </g>
      </svg>
      <Finish f={g} vig={0.4} grain={0.05} shadow="#203a55" gradeO={0.08} />
    </AbsoluteFill>
  );
};

const Bill: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    {/* generic banknote (no real currency design) */}
    <rect x={-230} y={-100} width={460} height={200} rx={10} fill="#c9d4b8" stroke="#5c6b4c" strokeWidth={4} />
    <rect x={-210} y={-82} width={420} height={164} rx={6} fill="none" stroke="#7f9068" strokeWidth={3} />
    <ellipse cx={0} cy={0} rx={60} ry={70} fill="#aebd98" stroke="#7f9068" strokeWidth={3} />
    <circle cx={-160} cy={-50} r={18} fill="#9fb088" /><circle cx={160} cy={50} r={18} fill="#9fb088" />
  </g>
);

const S10Money: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT_B.s10c;
  const zoom = 1 + 0.06 * prog(f, 0, 57, easeOut);
  const place = prog(f, 0, 14, easeOut);
  const handOut = prog(f, 26, 44, easeIn);
  const coins = [0, 1, 2, 3].map((i) => {
    const t0 = 16 + i * 3;
    const tt = Math.max(0, f - t0);
    const drop = f < t0 ? null : (() => {
      const bounceH = 60 * Math.exp(-tt / 5) * Math.abs(Math.cos(tt * 0.55));
      const x = 1180 + i * 70 + rand(i, 61) * 50 + Math.min(tt, 20) * (i - 1.5) * 1.2;
      const y = 600 + rand(i, 62) * 120 - bounceH;
      const spin = i === 2 ? Math.max(0.15, Math.abs(Math.cos(tt * 0.5)) * Math.exp(-tt / 30)) : 1; // one coin wobbles to rest
      return { x, y, spin };
    })();
    return drop && <g key={i}><ellipse cx={drop.x + 6} cy={drop.y + 8} rx={46} ry={46 * 0.95} fill="#000" opacity={0.18} /><ellipse cx={drop.x} cy={drop.y} rx={46 * (i === 2 ? Math.max(0.3, drop.spin) : 1)} ry={46} fill={i === 3 ? "#c58f4e" : "#c8ccd2"} stroke="#6d6a66" strokeWidth={4} /><ellipse cx={drop.x - 8} cy={drop.y - 8} rx={14 * (i === 2 ? Math.max(0.3, drop.spin) : 1)} ry={10} fill="#fff" opacity={0.5} /></g>;
  });
  return (
    <AbsoluteFill style={{ background: "#2a1d14" }}>
      <svg width={W} height={H}>
        <defs>
          <pattern id="formica" width={60} height={60} patternUnits="userSpaceOnUse"><rect width={60} height={60} fill="#d8c79a" /><circle cx={12} cy={18} r={3} fill="#c4b282" /><circle cx={44} cy={40} r={2} fill="#bfa978" /><path d="M30,8 l6,3" stroke="#b9a473" strokeWidth={2} /></pattern>
          <radialGradient id="morning" cx="0.3" cy="0.2" r="0.9"><stop offset="0" stopColor="#fff2cf" stopOpacity={0.35} /><stop offset="1" stopColor="#000" stopOpacity={0.25} /></radialGradient>
        </defs>
        <g transform={`translate(${W / 2},${H / 2}) scale(${zoom}) translate(${-W / 2},${-H / 2})`}>
          <rect x={-100} y={-100} width={2200} height={1300} fill="url(#formica)" />
          {/* storytelling props: utility bill envelope with red overdue stamp, calculator, coffee ring */}
          <g transform="translate(420,330) rotate(-8)">
            <rect x={-230} y={-140} width={460} height={280} fill="#f3f0e8" stroke="#a49c8c" strokeWidth={4} />
            <path d="M-230,-140 L0,20 L230,-140" stroke="#cfc8b8" strokeWidth={4} fill="none" />
            <rect x={60} y={50} width={140} height={60} rx={6} fill="none" stroke="#c0302e" strokeWidth={8} transform="rotate(-12 130 80)" />
          </g>
          <g transform="translate(1560,300) rotate(10)">
            <rect x={-120} y={-170} width={240} height={340} rx={20} fill="#3b3f46" stroke="#1d2024" strokeWidth={5} />
            <rect x={-95} y={-145} width={190} height={70} fill="#9fb79a" />
            {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-90 + (i % 3) * 64} y={-50 + Math.floor(i / 3) * 52} width={52} height={40} rx={8} fill="#5d636c" />)}
          </g>
          <circle cx={1450} cy={850} r={110} fill="none" stroke="#8a6a3a" strokeWidth={10} opacity={0.35} />
          {/* the small amount of money */}
          <g transform={`translate(0,${(1 - place) * 260})`} opacity={place}>
            <Bill x={980} y={640} r={-6} />
            <Bill x={1000} y={610} r={4} />
            <Bill x={1010} y={590} r={-2} />
          </g>
          {coins}
        </g>
        {/* the hand that set it down, then leaves */}
        <g transform={`translate(${1250 + handOut * 600},${780 + (1 - place) * 200 + handOut * 500}) scale(2600) rotate(-40)`}>
          <HandBack pal={DAY} curl={0.15} thumb={0.3} sleeve={DAY.jacket} sleeveShade={DAY.jacketShade} cuff={DAY.shirt} />
        </g>
        <rect x={0} y={0} width={W} height={H} fill="url(#morning)" />
      </svg>
      <Finish f={g} vig={0.5} grain={0.06} shadow="#3a2a10" gradeO={0.12} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── assembly ─────────────────────────── */
export const ColdOpenB: React.FC = () => {
  const B = CUT_B;
  const fadeIn = B.s10a - B.diss;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={0} durationInFrames={B.s7b - B.s7} name="S7a gate crash"><S7a /></Sequence>
      <Sequence from={B.s7b - B.s7} durationInFrames={B.s8 - B.s7b} name="S7b pulling away"><S7b /></Sequence>
      <Sequence from={B.s8 - B.s7} durationInFrames={B.s9 - B.s8} name="S8 in the car"><S8 /></Sequence>
      <Sequence from={B.s9 - B.s7} durationInFrames={B.s10a - B.s9} name="S9 aerial"><S9 dur={B.s10a - B.s9} /></Sequence>
      {/* time-jump dissolve into the past */}
      <Sequence from={B.diss - B.s7} durationInFrames={B.s10b - B.diss} name="S10a classroom"><S10Classroom fadeIn={fadeIn} /></Sequence>
      <Sequence from={B.s10b - B.s7} durationInFrames={B.s10c - B.s10b} name="S10b car wash"><S10CarWash /></Sequence>
      <Sequence from={B.s10c - B.s7} durationInFrames={B.end - B.s10c} name="S10c money"><S10Money /></Sequence>
      {/* SFX — key moments only, 10–15 % of narration */}
      <Sequence from={0} durationInFrames={B.s8 - B.s7}><Audio src={staticFile("sfx/night_wind.wav")} volume={0.03} /></Sequence>
      <Sequence from={IMPACT - 2} durationInFrames={45}><Audio src={staticFile("sfx/gate_crash.wav")} volume={0.13} /></Sequence>
      <Sequence from={0} durationInFrames={B.s8 - B.s7 + 4}><Audio src={staticFile("sfx/engine.wav")} volume={(fr) => 0.1 * Math.min(1, fr / 6) * Math.max(0.3, 1 - fr / 140)} /></Sequence>
      <Sequence from={B.s8 - B.s7} durationInFrames={B.s9 - B.s8}><Audio src={staticFile("sfx/car_interior.wav")} volume={0.04} /></Sequence>
      <Sequence from={sec(28.2) - B.s7} durationInFrames={sec(1.9)}><Audio src={staticFile("sfx/siren_pass.wav")} volume={0.06} /></Sequence>
      <Sequence from={sec(35.9) - B.s7 + 14} durationInFrames={30}><Audio src={staticFile("sfx/coins.wav")} volume={0.1} /></Sequence>
    </AbsoluteFill>
  );
};
