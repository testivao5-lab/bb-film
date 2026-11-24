// SCENE 056 · "aztek" · street — the corner standoff is broken by a car. Revised per lead QA:
// figures fill 1/3–2/3 frame height, contact points touch surfaces (hood + pavement), 3 depth
// layers with near-FG silhouettes kept at frame edges, hard cuts on sentence ends, word-synced.
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { breath, blink, clamp, easeIn, easeInOut, easeOut, kf, lerp, noise1, prog } from "../../lib/anim";
import { Figure, Pose, STAND } from "../../rig/Figure";
import type { HeadLook } from "../../rig/Head";
import { PARTNER, partnerLook, TEACHER, teacherLook } from "../../rig/cast";
import { CNightStreet, CStorefront, CParkedCar, CSidewalkBits, CNearFG, CWarmPool, CNightHaze, CCrossover, CGrit } from "../../env/c_street";
import { CSoftDefs, CShadow, CDust } from "../../env/c_common";
import { Finish, Motes, Streak } from "../../fx/Post";

export const META = { n: 56, id: "aztek", set: "street", cutIn: 918.5, cutOut: 943.54 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const T = {
  pont: beat(920.16), aztec: beat(920.64),
  cutB: beat(922.22), one: beat(922.70), under: beat(923.28), wheels: beat(923.60),
  cutC: beat(924.34), over: beat(924.88), hood: beat(925.22), lands: beat(925.78),
  leg: beat(926.36), wrong: beat(927.26), reach: beat(927.96), anyway: beat(928.66),
  cutD: beat(929.66), walks: beat(930.08), picks: beat(931.10), up: beat(931.62),
  shoots: beat(932.08), head: beat(932.78), jesse: beat(933.58),
  cutE: beat(934.80), word: beat(935.52), run: beat(936.80),
  threat: beat(938.42), advice: beat(939.50), given: beat(940.42),
  killed: beat(941.78), men: beat(942.56), end: beat(943.54),
};

/* ── original extras, same rig + palettes as scene 55 for continuity ── */
const DE1 = { skin: "#bc896c", skinShade: "#895e4b", skinLight: "#d7a78b", jacket: "#564d49", jacketShade: "#3b3535", jacketLight: "#74655e", shirt: "#aa8770", shirtShade: "#745946", pants: "#3d4851", pantsShade: "#2c353d", shoes: "#282426", outline: "#1b1717" };
const DE2 = { skin: "#dbb08b", skinShade: "#ae8065", skinLight: "#f1c6a3", jacket: "#384556", jacketShade: "#263441", jacketLight: "#556679", shirt: "#c3b390", shirtShade: "#95866a", pants: "#44454a", pantsShade: "#2f3035", shoes: "#282426", outline: "#181514" };
const darkHair: HeadLook["hair"] = { base: "#25211f", dark: "#141313", light: "#514038", style: "buzz" };
const dLook = (f: number, salt: number, o: Partial<HeadLook> = {}): HeadLook => ({ hair: darkHair, glasses: false, stubble: .5, age: .32, lids: .18 + blink(f, salt) * .72, lookX: -.3, lookY: 0, brow: .38, mouth: "flat" as const, ...o });
const stand: Pose = { ...STAND, breathe: .32 };

/** pistol lying on the pavement (unbranded generic shape) */
const GunProp: React.FC<{ cam: Cam; x: number; z: number; ang?: number; s?: number }> = ({ cam, x, z, ang = -12, s = 1 }) => (
  <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={.16} ry={.035} o={.4}/>
    <g transform={`translate(0,-.028) rotate(${ang}) scale(${s})`}>
      <path d="M-.13,-.032 h.3 q.026,0 .026,.022 v.022 q0,.022 -.026,.022 h-.3 q-.022,0 -.022,-.022 v-.022 q0,-.022 .022,-.022z" fill="#2b2f31" stroke="#111517" strokeWidth=".011"/>
      <path d="M-.04,.028 v.105 q0,.01 .01,.01 h.05 q.01,0 .01,-.01 v-.105z" fill="#4c4036" stroke="#15181c" strokeWidth=".008"/>
    </g>
  </Card>
);

/* ── dealer struck under the wheels: folds below the belt line, occluded by the car body ── */
const StruckMan: React.FC<{ cam: Cam; f: number; x: number; z: number; strike: number }> = ({ cam, f, x, z, strike }) => (
  <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={.36 + .2 * strike} ry={.1} o={.42}/>
    <Figure pose={{
      ...stand, torso: lerp(0, 84, strike), neck: lerp(0, -16, strike),
      shL: lerp(-4, 30, strike), shR: lerp(11, 56, strike), elL: lerp(8, 40, strike), elR: lerp(30, 72, strike),
      hipL: lerp(2, 32, strike), hipR: lerp(-1, -38, strike), knL: lerp(3, 84, strike), knR: lerp(3, 100, strike),
      breathe: breath(f, .1),
    }} view={.86} look={dLook(f, 4, { lookX: -.6, brow: .7, mouth: strike > .3 ? "open" : "flat", mouthOpen: strike * .5 })}
      pal={DE1} height={1.82}/>
  </Card>
);

/* ── dealer tumbling over the hood — contact kept: body rides the surface ── */
const TumbleMan: React.FC<{ cam: Cam; f: number; x: number; y: number; tt: number }> = ({ cam, f, x, y, tt }) => {
  const torso = kf(tt * 100, [[0, -16], [22, -58], [50, -84], [74, -116], [100, -88]]);
  const pose: Pose = {
    ...stand, torso, neck: lerp(4, -10, tt),
    shL: lerp(48, 30, tt), elL: lerp(30, 62, tt), shR: lerp(-40, -22, tt), elR: lerp(20, 54, tt),
    hipL: lerp(30, 18, tt), hipR: lerp(-26, -12, tt), knL: lerp(52, 30, tt), knR: lerp(40, 22, tt), breathe: .05,
  };
  return <Card cam={cam} x={x} y={y} z={9.18} blur={false}>
    <ellipse cx={0} cy={0.02} rx={.52} ry={.1} fill="#0a1117" opacity={.34}/>
    <Figure pose={pose} view={.8} look={dLook(f, 7, { lookX: -.5, lookY: -.4, brow: .8, mouth: "open", mouthOpen: .5 })}
      pal={DE2} height={1.79} ground={false}/>
  </Card>;
};

/* ── dealer down on the pavement, leg bent the wrong way, reaching for the gun ── */
const DownMan: React.FC<{ cam: Cam; f: number; x: number; z: number; reach: number; jolt: number }> = ({ cam, f, x, z, reach, jolt }) => (
  <Card cam={cam} x={x} z={z} blur={false}>
    <CShadow rx={.62} ry={.16} o={.5}/>
    <Figure pose={{
      torso: 84 + jolt * -3, neck: -10, shL: 22, elL: 48, shR: lerp(60, 88, reach), elR: lerp(70, 18, reach), wrR: lerp(0, -14, reach),
      hipL: 34, hipR: -18, knL: 86, knR: -62, breathe: .04 + breath(f, .12) * .03,
    }} view={.9} look={dLook(f, 7, { lookX: -.6, lookY: -.35, brow: .85, mouth: "pain", mouthOpen: .35 + jolt * .3 })}
      pal={DE2} height={1.79}/>
  </Card>
);

/* ───────────────────────── shot A · the car arrives (0–112) ───────────────────────── */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp(f / T.cutB);
  const cam: Cam = { x: lerp(-1.5, -.95, easeInOut(u)), y: 1.3, z: 3.15, f: 1260, shiftY: 42 };
  const drive = prog(f, 0, T.aztec, easeIn);
  const brake = prog(f, T.aztec, T.cutB, easeOut);
  const cx = lerp(-8.6, -1.15, drive) + brake * .55;
  const dip = brake > 0 ? 1 : 0;
  const flash = prog(f, T.pont - 8, T.pont + 22);
  const scared = prog(f, T.pont, T.pont + 16);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CNightHaze f={f} y={H * .58} o={.1}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.85}/>
      <CSidewalkBits cam={cam} x={6.4} z={10.6}/>
      <CParkedCar cam={cam} x={-3.55} z={9.6} f={f} color="#3f515d" flip/>
      <CWarmPool cam={cam} x={-1.2} z={8.7} r={2.3} o={.3} f={f}/>
      {/* the two men at the corner — different reactions when the headlights hit them */}
      <Card cam={cam} x={1.55} z={8.62} blur={false}>
        <CShadow rx={.34} ry={.1} o={.4}/>
        <Figure pose={{ ...stand, torso: -3, neck: lerp(0, 8, scared), shL: lerp(18, 52, scared), elL: lerp(34, 76, scared), shR: lerp(10, 44, scared), elR: lerp(26, 68, scared), breathe: breath(f, .09) }}
          view={.22} look={dLook(f, 2, { yaw: lerp(.55, .2, scared), lookX: lerp(-.4, -.9, scared), brow: .5, mouth: scared > .5 ? "gasp" : "flat" })}
          pal={DE1} height={1.82}/>
      </Card>
      <Card cam={cam} x={3.1} z={8.85} blur={false}>
        <CShadow rx={.34} ry={.1} o={.38}/>
        <Figure pose={{ ...stand, torso: 2, neck: lerp(0, -6, scared), shL: 6, elL: 16, shR: -8, elR: 14, hipL: 6, hipR: -4, breathe: breath(f + 39, .062) }}
          view={.1} look={dLook(f, 13, { yaw: .4, lookX: lerp(-.2, -.75, scared), brow: .42, mouth: "flat" })}
          pal={DE2} height={1.79}/>
      </Card>
      {/* Jesse, gun still low in his fist, recoiling a step */}
      <Card cam={cam} x={lerp(-2.95, -3.15, scared)} z={6.5} blur={false}>
        <CShadow rx={.36} ry={.1} o={.45}/>
        <Figure pose={{ ...stand, torso: -4 - scared * 3, neck: 5, shL: lerp(30, 22, scared), elL: lerp(52, 40, scared), shR: 14, elR: 24, hipL: lerp(8, 14, scared), hipR: -5, knL: lerp(6, 12, scared), breathe: breath(f, .11) }}
          view={.42} look={partnerLook({ yaw: lerp(.62, .3, scared), lids: .2 + blink(f, 9) * .75, lookX: .85, brow: lerp(-.55, -.9, scared), mouth: scared > .5 ? "gasp" : "flat", dirt: .18 })}
          pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
        <g transform="translate(-.16,-.92) rotate(28)"><path d="M-.1,-.03 h.28 v.07 h-.28z" fill="#272b2d" stroke="#111517" strokeWidth=".012"/><path d="M-.01,.025 v.09 h.07 v-.09" fill="#4c4036"/></g>
      </Card>
      {/* the car: headlights sweep the corner, brakes hard on "Aztec" */}
      <CCrossover cam={cam} x={cx} z={9.55} f={f} flash={flash} dip={dip} brake={brake}/>
      <CGrit f={f} cam={cam} x={cx + 1.9} z={9.5} t={prog(f, T.aztec, T.cutB)} n={12} seed={3}/>
      <Streak x={project(cam, cx + 2.2, 1.2, 9.55).x} y={project(cam, cx + 2.2, 1.2, 9.55).y} w={900} color="#ffe7ae" o={.12 + .28 * flash}/>
      <CNearFG cam={cam} x={-1.34} z={4.0} kind="pole" w={.55}/>
    </svg>
    <Motes f={f} n={30} seed={56} color="#d8ccbc" drift={-.9}/>
    <Finish f={f} vig={.72} grain={.075} shadow="#08101c" gradeO={.23}/>
  </>;
};

/* ───────────────────────── shot B · under the wheels (112–175) ───────────────────────── */
const ShotB: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutB) / (T.cutC - T.cutB));
  const shake = f < T.cutB + 16 ? noise1(f * .9, 44) * (1 - (f - T.cutB) / 16) * 2.4 : 0;
  const cam: Cam = { x: lerp(.15, .85, easeInOut(u)) + shake * .004, y: 1.3 + shake * .004, z: 3.35, f: 1240, shiftY: 52 };
  // the car crosses left→right; the man is struck as the nose reaches him
  const roll = prog(f, T.cutB, T.cutC, easeInOut);
  const cx = lerp(-1.7, 2.3, roll);
  const strike = prog(f, T.cutB + 8, T.cutB + 26, easeIn);
  const dip = Math.sin(Math.PI * clamp((f - T.cutB) / 60)) > .3 ? 1 : 0;
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.8}/>
      <CWarmPool cam={cam} x={-1.2} z={8.7} r={2.3} o={.28} f={f}/>
      {/* he folds as the front corner reaches him, then the body passes over him */}
      <StruckMan cam={cam} f={f} x={lerp(.55, 1.05, strike)} z={9.5} strike={strike}/>
      <CCrossover cam={cam} x={cx} z={9.62} f={f} flash={.2} dip={dip} brake={.2}/>
      <CGrit f={f} cam={cam} x={cx + 1.3} z={9.55} t={prog(f, T.cutB + 10, T.cutB + 46)} n={12} seed={5}/>
      <CGrit f={f} cam={cam} x={cx - 1.3} z={9.55} t={prog(f, T.under, T.wheels + 20)} n={10} seed={9}/>
      {/* Jesse at the left edge throws an arm up against the light */}
      <Card cam={cam} x={-3.15} z={6.35} blur={false}>
        <CShadow rx={.36} ry={.1} o={.45}/>
        <Figure pose={{ ...stand, torso: -8, neck: 8, shL: 52, elL: 78, shR: 40, elR: 66, hipL: 16, hipR: -8, knL: 12, breathe: breath(f, .13) }}
          view={.38} look={partnerLook({ yaw: .45, lids: .26 + blink(f, 9) * .8, lookX: .85, lookY: -.1, brow: -.95, mouth: "gasp", dirt: .18 })}
          pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
      </Card>
      <CNearFG cam={cam} x={1.28} z={4.25} kind="bin" w={.8}/>
    </svg>
    <Motes f={f} n={30} seed={562} color="#d9cbbb" drift={-.8}/>
    <Finish f={f} vig={.74} grain={.078} shadow="#08111d" gradeO={.24}/>
  </>;
};

/* ───────────────────────── shot C · over the hood (175–316) ───────────────────────── */
const ShotC: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutC) / (T.cutD - T.cutC));
  const cam: Cam = { x: lerp(1.4, 3.35, easeInOut(u)), y: 1.22, z: 3.0, f: 1280, shiftY: 38 };
  const cx = kf(f, [[T.cutC, 2.0], [T.hood + 20, 3.05], [T.lands + 30, 3.3]]);
  // the second man rides the hood (contact kept), arcs off, lands, then reaches
  const tt = prog(f, T.cutC, T.lands, easeInOut);
  const tx = kf(tt * 100, [[0, 2.6], [30, 3.9], [55, 4.7], [100, 5.5]]);
  const ty = kf(tt * 100, [[0, 0], [16, .98], [34, 1.04], [56, 1.0], [74, 1.18], [100, 0]]);
  const down = f >= T.lands;
  const reach = prog(f, T.reach, T.anyway + 12);
  const jolt = prog(f, T.lands, T.lands + 6) * (1 - prog(f, T.lands + 6, T.lands + 20));
  const drag = prog(f, T.reach, T.anyway + 24, easeOut);
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.8}/>
      <CSidewalkBits cam={cam} x={7.2} z={10.4}/>
      <CWarmPool cam={cam} x={-1.2} z={8.7} r={2.3} o={.26} f={f}/>
      <CCrossover cam={cam} x={cx} z={9.55} f={f} flash={.12} brake={.35}/>
      {!down && <GunProp cam={cam} x={lerp(3.6, 5.9, tt)} z={8.24} ang={-18 + 260 * tt} s={.9}/>}
      {down && reach < .9 && <GunProp cam={cam} x={6.12} z={8.24} ang={-12} s={.9}/>}
      {!down ? <TumbleMan cam={cam} f={f} x={tx} y={ty} tt={tt}/>
        : <DownMan cam={cam} f={f} x={5.52 + drag * .18} z={8.35} reach={reach} jolt={jolt}/>}
      <CGrit f={f} cam={cam} x={5.55} z={8.4} t={prog(f, T.lands, T.lands + 26)} n={14} seed={11}/>
      {/* Jesse follows the fall from the left, gun still in his fist */}
      <Card cam={cam} x={-1.05} z={5.9} blur={false} opacity={1 - u * .3}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{ ...stand, torso: -6, neck: 7, shL: 34, elL: 56, shR: 16, elR: 28, hipL: 12, hipR: -6, breathe: breath(f, .12) }}
          view={.5} look={partnerLook({ yaw: .72, lids: .22 + blink(f, 21) * .78, lookX: .88, lookY: -.12, brow: -.88, mouth: "flat", dirt: .18 })}
          pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
      </Card>
    </svg>
    <Motes f={f} n={32} seed={563} color="#d8cbb8" drift={-.8}/>
    <Finish f={f} vig={.74} grain={.078} shadow="#08111d" gradeO={.24}/>
  </>;
};

/* ───────────────────────── shot D · walks over, picks it up, shoots (335–489) ───────────────────────── */
const ShotD: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutD) / (T.cutE - T.cutD));
  const cam: Cam = { x: lerp(2.6, 3.35, easeInOut(u)), y: 1.42, z: 3.3, f: 1360, shiftY: -18 };
  const out = prog(f, T.cutD, T.walks + 6);
  const walk = prog(f, T.walks + 4, T.picks - 4, easeInOut);
  const bend = prog(f, T.picks - 2, T.picks + 8, easeInOut);
  const lift = prog(f, T.up, T.shoots, easeOut);
  const shoot = prog(f, T.shoots, T.shoots + 8);
  const shot = shoot * (1 - prog(f, T.shoots + 8, T.shoots + 22));
  const flinch = prog(f, T.jesse - 6, T.jesse + 12);
  const jolt = prog(f, T.shoots + 3, T.shoots + 7) * (1 - prog(f, T.shoots + 7, T.shoots + 18));
  const wx = lerp(3.8, 5.22, walk);
  const gait = Math.sin(f * .22) * 8 * walk * (1 - bend); // measured walk cycle
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.8}/>
      <CWarmPool cam={cam} x={1.2} z={8.7} r={2.3} o={.28} f={f}/>
      <CCrossover cam={cam} x={3.3} z={9.55} f={f} flash={.08} brake={.5} door={out}/>
      <DownMan cam={cam} f={f} x={5.52} z={8.35} reach={1} jolt={jolt}/>
      {!lift && <GunProp cam={cam} x={6.12} z={8.24} ang={-12} s={.9}/>}
      {/* the driver walks over, bends, picks the gun up, straightens and fires */}
      <Card cam={cam} x={wx} z={8.1} blur={false}>
        <CShadow rx={.36} ry={.1} o={.42}/>
        <Figure pose={{
          ...stand, torso: lerp(-2, -58, bend) * (1 - lift) + lift * -2,
          neck: lerp(6, -8, bend) * (1 - lift) + lift * 4,
          shL: lerp(16, 40, bend) * (1 - lift) + lift * 62, elL: lerp(28, 16, bend) * (1 - lift) + lift * 12,
          shR: lerp(12, 46, bend) * (1 - lift) + lift * 58, elR: lerp(22, 12, bend) * (1 - lift) + lift * 10,
          hipL: lerp(8 + gait, 26, bend) * (1 - lift) + lift * 8, hipR: lerp(-3 - gait, -10, bend) * (1 - lift) + lift * -3,
          knL: lerp(6, 30, bend) * (1 - lift) + lift * 6, knR: lerp(3, 18, bend) * (1 - lift) + lift * 3,
          breathe: breath(f, .07),
        }} view={.32} look={teacherLook({
          yaw: lerp(.6, .5, lift), lids: .18 + blink(f, 15) * .7, lookX: lerp(.55, .72, lift), lookY: lerp(-.35, -.22, lift),
          brow: lerp(-.15, -.28, shoot), mouth: "flat",
        })} pal={TEACHER.pal} height={TEACHER.height}/>
        <g opacity={lift} transform={`translate(${lerp(.22, .3, lift)},${lerp(-1.02, -1.16, lift)}) rotate(${-8 + shoot * -2})`}>
          <path d="M-.12,-.035 h.3 v.075 h-.3z" fill="#272b2d" stroke="#111517" strokeWidth=".012"/>
          <path d="M-.015,.028 v.1 h.07 v-.1" fill="#4c4036"/>
        </g>
      </Card>
      {shot > 0 && (() => { const gp = project(cam, wx + .34, 1.12, 8.1); return <g>
        <circle cx={gp.x} cy={gp.y} r={14 + shot * 18} fill="#fff6d8" opacity={shot * .9}/>
        {[0, 1, 2, 3, 4].map(i => { const a = -1.2 + i * .55 + shot; return <line key={i} x1={gp.x + Math.cos(a) * 12} y1={gp.y + Math.sin(a) * 12} x2={gp.x + Math.cos(a) * (36 + shot * 30)} y2={gp.y + Math.sin(a) * (36 + shot * 30)} stroke="#ffe9a8" strokeWidth={3.4 * shot} strokeLinecap="round"/>; })}
      </g>; })()}
      {/* Jesse in the near-left watches; he flinches at the shot */}
      <Card cam={cam} x={.1} z={5.15} blur={false}>
        <CShadow rx={.36} ry={.1} o={.5}/>
        <Figure pose={{
          ...stand, torso: -4 - flinch * 5, neck: 5 + flinch * 6,
          shL: lerp(30, 58, flinch), elL: lerp(52, 86, flinch), shR: lerp(16, 48, flinch), elR: lerp(26, 80, flinch),
          hipL: 10, hipR: -6, breathe: breath(f, .12),
        }} view={.62} look={partnerLook({
          yaw: .78, lids: .24 + blink(f, 9) * .8 + flinch * .18, lookX: .85, lookY: -.1,
          brow: -.95, mouth: flinch > .5 ? "open" : "flat", mouthOpen: flinch * .4, dirt: .18,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
      </Card>
    </svg>
    <Motes f={f} n={28} seed={564} color="#d7ccbd" drift={-.9}/>
    <Finish f={f} vig={.75} grain={.08} shadow="#08111d" gradeO={.24}/>
  </>;
};

/* ───────────────────────── shot E · one word: run (489–751) ───────────────────────── */
const ShotE: React.FC<{ f: number }> = ({ f }) => {
  const u = clamp((f - T.cutE) / (T.end - T.cutE));
  // one motivated move: close on his face, then crane back to the whole tableau
  const pull = prog(f, T.advice - 20, T.end, easeInOut);
  const cam: Cam = {
    x: lerp(5.05, 2.2, pull), y: lerp(1.56, 2.75, pull), z: lerp(6.15, 2.4, pull),
    f: lerp(2350, 950, pull), shiftY: lerp(-40, 60, pull),
  };
  const say = prog(f, T.word - 8, T.word + 16) * (1 - prog(f, T.run - 6, T.run + 10));
  const soften = prog(f, T.threat, T.advice + 8);
  const nod = prog(f, T.advice, T.advice + 18);
  const run = prog(f, T.given + 10, T.end, easeIn);
  const cyc = f * .42;
  return <>
    <svg width={W} height={H}>
      <CSoftDefs/>
      <CNightStreet cam={cam} f={f}/>
      <CStorefront cam={cam} x={2.6} z={12.4} f={f} lit={.8}/>
      <CSidewalkBits cam={cam} x={6.4} z={10.6}/>
      <CParkedCar cam={cam} x={-3.55} z={9.6} f={f} color="#3f515d" flip/>
      <CWarmPool cam={cam} x={2.2} z={8.8} r={2.5} o={.28} f={f}/>
      <CCrossover cam={cam} x={3.3} z={9.55} f={f} brake={.45} door={.8}/>
      {/* the tableau revealed by the crane: two men down, the driver standing */}
      <Card cam={cam} x={1.9} z={9.1} blur={false} opacity={.95}>
        <CShadow rx={.36} ry={.1} o={.35}/>
        <Figure pose={{ ...stand, torso: 80, neck: -12, shL: 26, elL: 52, shR: 48, elR: 64, hipL: 28, hipR: -16, knL: 82, knR: 60, breathe: .03 }}
          view={.82} look={dLook(f, 4, { lookX: -.5, brow: .6, mouth: "flat" })} pal={DE1} height={1.82}/>
      </Card>
      <DownMan cam={cam} f={f} x={5.52} z={8.35} reach={1} jolt={0}/>
      <GunProp cam={cam} x={6.12} z={8.24} ang={-12} s={.9}/>
      {/* the driver — close at first, then a figure in the wide */}
      <Card cam={cam} x={5.22} z={8.05} blur={false}>
        <CShadow rx={.38} ry={.1} o={.4}/>
        <Figure pose={{
          ...stand, torso: -2 + nod * 2, neck: 4 - nod * 5,
          shL: 14, elL: 26, shR: lerp(58, 30, soften), elR: lerp(12, 22, soften), wrR: lerp(6, 0, soften),
          breathe: breath(f, .062),
        }} view={.3} look={teacherLook({
          yaw: .42, lids: .16 + blink(f, 15, 130) * .65 + soften * .12,
          lookX: lerp(.2, -.55, soften), lookY: lerp(-.12, -.05, soften),
          brow: lerp(-.2, .06, soften), mouth: say > .5 ? "open" : "flat", mouthOpen: say * .3 * (1 - nod),
        })} pal={TEACHER.pal} height={TEACHER.height}/>
      </Card>
      {/* Jesse breaks into a run across the empty street */}
      <Card cam={cam} x={lerp(-.4, -2.2, run)} z={6.3} blur={false}>
        <CShadow rx={.4} ry={.11} o={.4}/>
        <Figure pose={{
          ...stand, torso: -8 + run * 12, neck: lerp(8, -6, run),
          shL: lerp(30, 56, run) + Math.sin(cyc) * 26 * run, shR: lerp(18, -46, run) - Math.sin(cyc) * 26 * run,
          elL: lerp(48, 34, run), elR: lerp(30, 58, run),
          hipL: lerp(12, 34, run) + Math.sin(cyc) * 28 * run, hipR: lerp(-6, -26, run) - Math.sin(cyc) * 28 * run,
          knL: lerp(8, 72, run), knR: lerp(6, 66, run), breathe: breath(f, .16),
        }} view={.38} look={partnerLook({
          yaw: lerp(.3, .8, run), lids: .24 + blink(f, 29) * .78, lookX: lerp(.6, -.7, run),
          brow: -.88, mouth: "gasp", dirt: .18,
        })} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
      </Card>
      <CDust f={f} cam={cam} n={16} seed={565} color="#e2d2ba" z0={4} z1={10} x0={-3} x1={6} h={2.4}/>
    </svg>
    <Motes f={f} n={30} seed={566} color="#dfd2c0" drift={-1.1}/>
    <Finish f={f} vig={lerp(.72, .7, u)} grain={.08} shadow="#08111d" gradeO={.23}/>
  </>;
};

/* ───────────────────────── assembly + sound ───────────────────────── */
export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#101b2a" }}>
      <Sequence from={0} durationInFrames={T.cutB} name="A the car"><ShotA f={f} /></Sequence>
      <Sequence from={T.cutB} durationInFrames={T.cutC - T.cutB} name="B under the wheels"><ShotB f={f} /></Sequence>
      <Sequence from={T.cutC} durationInFrames={T.cutD - T.cutC} name="C over the hood"><ShotC f={f} /></Sequence>
      <Sequence from={T.cutD} durationInFrames={T.cutE - T.cutD} name="D picks it up"><ShotD f={f} /></Sequence>
      <Sequence from={T.cutE} durationInFrames={T.end - T.cutE} name="E one word"><ShotE f={f} /></Sequence>
      <Sequence from={0} durationInFrames={T.end}><Audio src={staticFile("sfx/c_night_bed.wav")} volume={(fr) => 0.035 * clamp((T.end - fr) / 40)} /></Sequence>
      <Sequence from={20} durationInFrames={90}><Audio src={staticFile("sfx/c_engine_stop.wav")} volume={0.11} /></Sequence>
      <Sequence from={T.cutB} durationInFrames={30}><Audio src={staticFile("sfx/c_impact_thud.wav")} volume={0.13} /></Sequence>
      <Sequence from={T.lands} durationInFrames={26}><Audio src={staticFile("sfx/c_impact_thud.wav")} volume={0.11} /></Sequence>
      <Sequence from={T.shoots} durationInFrames={26}><Audio src={staticFile("sfx/c_gunshot.wav")} volume={0.13} /></Sequence>
    </AbsoluteFill>
  );
};
