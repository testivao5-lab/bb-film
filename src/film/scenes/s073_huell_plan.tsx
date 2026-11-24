// SCENE 073 · "huell-plan" · garage · 1245.11 → 1260.51 (15.40 s) · OWNER batch D
// Research beats (To'hajiilee / Buried): the DEA stashes Saul's bodyguard in a safe-house room, and
// the agent sells him a story with two photographs — the money barrel, and a "dead" man who is not dead.
// Original staging: a seized storage garage used as a holding room; folding table, work lamp, one chair.
// Sync map (absolute narration seconds → local frames, 30 fps):
//   0:16     "The plan is a good one, and it is this:"      Hank walks in, drops the case file on the table.
//   81:122   "He goes after…"                              he spreads the plan out, taps the money photo.
//   122:179  "the only thing… never destroy."              fist comes down on "destroy" (1251.06).
//   179:218  beat / Hank straightens, looks at the big man.
//   218:262  "The big man … is shown a photograph"         OTS: the print is pushed across the table.
//   279:323  "of a dead man who was not dead"              he recoils — chair scrape — looks up.
//   332:403  "and told that the man … is what happens next."  close: finger points at the print.
//   410:462  "He talks."                                   pad slapped down, pen grabbed, he spills it.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, project, planePts, W, H } from "../../lib/camera";
import { kf, prog, sec, breath, blink, noise1, easeIn, easeOut, easeInOut, clamp, lerp, rand } from "../../lib/anim";
import { Figure, Pose, solveSkeleton } from "../../rig/Figure";
import { BROTHER, brotherLook } from "../../rig/cast";
import { DDefs, Puff } from "../../env/d_shared";
import { Table, Chair, Box } from "../../env/d_interiors";
import { PhotoPrint } from "../../props/d_props";
import { extra, sitPose, sitAtTable, headLife, lidsOf } from "../../props/d_poses";
import { Actor } from "../../props/d_actor";
import { twoShot, fitCam, single } from "../../props/d_cam";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 73, id: "huell-plan", set: "garage", cutIn: 1245.11, cutOut: 1260.51 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const DUR = beat(META.cutOut); // 462
const CUT = { s2: 81, s3: 219, s4: 332, s5: 410 };

/* ── the big man who works for Saul (original design: a large, heavy-shouldered man) ── */
const BIG = extra({
  height: 1.93, skin: "#8a5636", skinShade: "#5e3820", skinLight: "#b07a52",
  jacket: "#4a5238", shirt: "#2e2e2a", pants: "#2a2f3a", shoes: "#241a14",
  hair: "#1c1612", hairStyle: "buzz", beard: "trim", age: 0.62, stubble: 0.5,
});

const HANK = { pal: BROTHER.pal, h: BROTHER.height };

/* ── world layout (metres). Camera looks +z at a cinder-block back wall. ── */
const ROOM = { backZ: 7.4, w: 7.2, h: 2.9 };
const TABLE = { x: 0.15, z: 5.0 };
const HANK_POS = { x: -1.05, z: 5.35 };
const BIG_POS = { x: 1.15, z: 4.55 };

/* ─────────────────────────── the room shell (mid layer) ─────────────────────────── */
const GarageShell: React.FC<{ cam: Cam; f: number; lamp: number }> = ({ cam, f, lamp }) => {
  const back = ROOM.backZ - cam.z;
  return (
    <g>
      {/* floor */}
      <polygon points={planePts(cam, [[-40, cam.z + 0.4], [40, cam.z + 0.4], [40, 40], [-40, 40]])} fill="#6e6a60" />
      <polygon points={planePts(cam, [[-40, cam.z + 0.4], [40, cam.z + 0.4], [40, 40], [-40, 40]], 0.001)} fill="#7a766a" opacity={0.5} />
      {/* oily stains + expansion joints */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -3.2 + rand(i, 71) * 6.4, z = cam.z + 2.2 + rand(i, 72) * 5.5;
        const p = project(cam, x, 0.002, z);
        return <ellipse key={i} cx={p.x} cy={p.y} rx={(0.16 + rand(i, 73) * 0.4) * p.s} ry={(0.06 + rand(i, 74) * 0.14) * p.s} fill="#4a463e" opacity={0.4} />;
      })}
      {[-2.4, 0.6].map((x) => (
        <polygon key={x} points={planePts(cam, [[x, cam.z + 0.4], [x + 0.03, cam.z + 0.4], [x + 0.03, 9], [x, 9]], 0.002)} fill="#54504a" opacity={0.6} />
      ))}
      {/* ceiling plane (closes the top of frame) + beams */}
      <polygon points={planePts(cam, [[-40, cam.z + 0.3], [40, cam.z + 0.3], [40, ROOM.backZ + 0.2], [-40, ROOM.backZ + 0.2]], ROOM.h)} fill="#4a4640" />
      {[-6, -2, 2, 6].map((bx) => (
        <polygon key={bx} points={planePts(cam, [[bx - 0.12, cam.z + 0.3], [bx + 0.12, cam.z + 0.3], [bx + 0.12, ROOM.backZ], [bx - 0.12, ROOM.backZ]], ROOM.h - 0.02)} fill="#3a3630" opacity={0.9} />
      ))}
      {/* two hanging fluorescent tubes */}
      {[-1.5, 1.9].map((tx) => {
        const a = project(cam, tx, ROOM.h - 0.5, 4.6), b = project(cam, tx + 1.2, ROOM.h - 0.5, 4.6);
        return <g key={tx}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#3a3a3a" strokeWidth={Math.max(2, 0.05 * a.s)} strokeLinecap="round" /><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#f2f8e8" strokeWidth={Math.max(1, 0.03 * a.s)} opacity={0.8} /></g>;
      })}
      {/* back wall: cinder block courses */}
      <Card cam={cam} x={0} z={ROOM.backZ} blur={false}>
        <rect x={-ROOM.w} y={-ROOM.h} width={ROOM.w * 2} height={ROOM.h} fill="#9a958a" stroke="#14110e" strokeWidth={0.02} />
        {Array.from({ length: 13 }).map((_, r) =>
          Array.from({ length: 17 }).map((_, c) => {
            const off = r % 2 ? 0.22 : 0;
            const bx = -4 + c * 0.5 + off;
            return <rect key={`${r}-${c}`} x={bx} y={-ROOM.h + 0.1 + r * 0.21} width={0.46} height={0.18} fill={(r + c) % 3 === 0 ? "#8e8a7e" : "#999487"} stroke="#7d7a70" strokeWidth={0.006} />;
          })
        )}
        {/* grime gradient at the base + water stain */}
        <rect x={-ROOM.w} y={-0.5} width={ROOM.w * 2} height={0.5} fill="#5e5a52" opacity={0.55} />
        <path d="M-2.2,-2.1 q0.4,0.5 0.2,1.2 q-0.2,0.6 0.15,1.0 q0.3,0.4 0.05,0.9" stroke="#6e6a5e" strokeWidth={0.5} fill="none" opacity={0.35} />
        {/* shelving unit */}
        <g transform="translate(1.75,0)">
          <rect x={-1.15} y={-2.3} width={2.3} height={0.06} fill="#4a5058" />
          <rect x={-1.15} y={-1.5} width={2.3} height={0.06} fill="#4a5058" />
          <rect x={-1.15} y={-0.7} width={2.3} height={0.06} fill="#4a5058" />
          {[-1.12, 1.08].map((lx) => <rect key={lx} x={lx} y={-2.35} width={0.07} height={2.35} fill="#3e444c" stroke="#14110e" strokeWidth={0.01} />)}
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <rect x={-1.05 + i * 0.3} y={-1.5 - 0.32 - rand(i, 3) * 0.1} width={0.26} height={0.32 + rand(i, 3) * 0.1} fill={i % 2 ? "#8a7a5a" : "#6a7a8a"} stroke="#1b1712" strokeWidth={0.008} opacity={0.95} />
              <rect x={-1.05 + i * 0.3} y={-1.5 - 0.32 - rand(i, 3) * 0.1} width={0.26} height={0.05} fill="#fff" opacity={0.12} />
            </g>
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={`b${i}`} x={-1.0 + i * 0.42} y={-0.7 - 0.3} width={0.34} height={0.3} fill={i % 2 ? "#5a4a3a" : "#4a5a52"} stroke="#1b1712" strokeWidth={0.008} />
          ))}
        </g>
        {/* roller door on the left, daylight leaking underneath */}
        <g transform="translate(-2.75,0)">
          <rect x={-1.35} y={-2.4} width={2.7} height={2.4} fill="#7a8088" stroke="#14110e" strokeWidth={0.02} />
          {Array.from({ length: 17 }).map((_, i) => <rect key={i} x={-1.32} y={-2.4 + i * 0.14} width={2.64} height={0.1} fill={i % 2 ? "#6e747c" : "#7d838b"} opacity={0.9} />)}
          <rect x={-1.35} y={-0.14} width={2.7} height={0.14} fill="#f6e7b8" opacity={0.95} />
          <rect x={-1.35} y={-0.2} width={2.7} height={0.06} fill="#cfc39a" opacity={0.6} />
          {/* light spill on the floor */}
          <polygon points="-1.35,0 1.35,0 2.6,1.9 -2.6,1.9" fill="#f8ecc4" opacity={0.28} />
          {/* hanging chain + tag, swings a hair */}
          <path d={`M1.0,-2.4 q${noise1(f * 0.02, 2) * 0.06},0.3 ${noise1(f * 0.02, 2) * 0.1},0.9`} stroke="#3a3a36" strokeWidth={0.02} fill="none" />
        </g>
        {/* pegboard with a few tools (storytelling: this was a workshop) */}
        <g transform="translate(-0.75,-1.35)">
          <rect x={-0.7} y={-0.5} width={1.4} height={1.0} fill="#a89478" stroke="#14110e" strokeWidth={0.014} />
          {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={-0.62 + (i % 10) * 0.14} cy={-0.42 + Math.floor(i / 10) * 0.24} r={0.012} fill="#8a7458" />)}
          <path d="M-0.4,-0.35 l0.02,0.44" stroke="#4a4a4a" strokeWidth={0.035} />
          <path d="M0.05,-0.34 l0.02,0.36" stroke="#6a5a3a" strokeWidth={0.03} />
        </g>
      </Card>
      {/* high window: a daylight shaft (near-mid layer) */}
      <Card cam={cam} x={-2.9} z={ROOM.backZ - 0.06}>
        <rect x={-0.75} y={-2.6} width={1.5} height={0.9} fill="#dceaf6" opacity={0.9} stroke="#14110e" strokeWidth={0.02} />
        {Array.from({ length: 3 }).map((_, i) => <rect key={i} x={-0.72} y={-2.55 + i * 0.3} width={1.44} height={0.035} fill="#8a929a" />)}
        {Array.from({ length: 2 }).map((_, i) => <rect key={`v${i}`} x={-0.72 + i * 0.72} y={-2.6} width={0.035} height={0.9} fill="#8a929a" />)}
      </Card>
      {/* work lamp: warm pool on the table (drawn in shot space so it sits over the props) */}
      <Card cam={cam} x={TABLE.x + 0.52} z={TABLE.z - 0.12}>
        <rect x={-0.5} y={-0.02} width={0.04} height={0.02} fill="#2a2622" />
        <rect x={-0.5} y={-0.62} width={0.03} height={0.6} fill="#3a3632" />
        <path d="M-0.53,-0.62 q0.16,-0.12 0.3,0.0 l-0.08,0.16 q-0.12,-0.08 -0.22,0.0 Z" fill="#3e5a44" stroke="#14110e" strokeWidth={0.008} />
        <ellipse cx={-0.38} cy={-0.42} rx={0.05} ry={0.02} fill="#fff2cc" opacity={0.95} />
        <ellipse cx={-0.38} cy={-0.3} rx={0.85} ry={0.6} fill="url(#dLampGlow)" opacity={lamp} />
      </Card>
    </g>
  );
};

/* ─────────────────────────── characters ─────────────────────────── */

const HankFigure: React.FC<{ f: number; pose: Pose; look: ReturnType<typeof brotherLook>; x: number; z: number; cam: Cam }> = ({ pose, look, x, z, cam }) => (
  <Actor cam={cam} x={x} z={z} face={-1} view={1} pose={pose} look={look} pal={HANK.pal} height={HANK.h} rimLight="#ffe8b8" rimSide={1} />
);

const BigFigure: React.FC<{ pose: Pose; look: ReturnType<typeof extra>["look"]; x: number; z: number; cam: Cam }> = ({ pose, look, x, z, cam }) => (
  <Actor cam={cam} x={x} z={z} face={1} view={1} pose={pose} look={look} pal={BIG.pal} height={BIG.h} rimLight="#ffe8b8" rimSide={1} />
);

/* ── a printed photograph lying on the table: a barrel in a hole (the plan's target) ── */
const BarrelPrint: React.FC<{ glow?: number }> = ({ glow = 1 }) => (
  <g transform="rotate(-6)">
    <rect x={-0.13} y={-0.005} width={0.26} height={0.17} fill="#f2eee2" stroke="#8a8478" strokeWidth={0.006} />
    <rect x={-0.115} y={0.01} width={0.23} height={0.1} fill="#8a6a44" />
    <ellipse cx={0} cy={0.048} rx={0.062} ry={0.022} fill="#4a3620" />
    <rect x={-0.022} y={0.028} width={0.044} height={0.038} fill="#3d6f9e" stroke="#20344a" strokeWidth={0.004} />
    <ellipse cx={0} cy={0.027} rx={0.022} ry={0.008} fill="#c9cfae" />
    <rect x={-0.115} y={0.01} width={0.23} height={0.012} fill="#fff" opacity={0.18 * glow} />
  </g>
);

/* ─────────────────────────── S1 · the plan (0–80) ─────────────────────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + beat(META.cutIn);
  const t = f / CUT.s2;
  const c1 = twoShot({ a: [HANK_POS.x, HANK_POS.z], b: [BIG_POS.x, BIG_POS.z], ha: HANK.h, hb: BIG.h, f: 1450, shiftY: -40 });
  const cam: Cam = { ...c1, x: c1.x - lerp(0.9, 0.35, easeInOut(t)), z: c1.z + lerp(-0.6, 0.15, easeInOut(t)), y: lerp(1.42, 1.34, easeInOut(t)) };
  const walkIn = prog(f, 6, 44, easeOut);
  const hx = lerp(-4.6, HANK_POS.x, walkIn);
  const hz = lerp(6.1, HANK_POS.z, walkIn);
  const step = Math.sin(f * 0.42) * (1 - walkIn);
  const hankPose: Pose = {
    torso: 3 + step * 2, neck: -4 + Math.sin(f * 0.42) * 2,
    shL: 14 + step * 10, shR: 10 - step * 10, elL: 26, elR: 34,
    hipL: 20 * Math.sin(f * 0.42) * (1 - walkIn * 0.9), hipR: -20 * Math.sin(f * 0.42) * (1 - walkIn * 0.9),
    knL: 8 + 16 * Math.max(0, -Math.cos((f % 30) / 30 * Math.PI * 2)) * (1 - walkIn), knR: 8 + 16 * Math.max(0, Math.cos((f % 30) / 30 * Math.PI * 2)) * (1 - walkIn),
    breathe: breath(f, 0.08),
  };
  // lays the case folder down at 12–26, then plants both hands on the table at 44–60
  const lay = prog(f, 12, 30, easeOut);
  const plant = prog(f, 46, 66, easeInOut);
  hankPose.shL = lerp(hankPose.shL, 52, lay) - plant * 6;
  hankPose.shR = lerp(hankPose.shR, 44, lay) - plant * 6;
  hankPose.elL = lerp(hankPose.elL, 30, lay) + plant * 26;
  hankPose.elR = lerp(hankPose.elR, 30, lay) + plant * 26;
  hankPose.torso = lerp(hankPose.torso, 12, plant);
  const bigSit = sitAtTable(g, { lean: 7 + 1.2 * Math.sin(g * 0.04), armL: 40, armR: 36, elL: 58, elR: 54 });
  const bigLook = BIG.look;
  const look = { ...bigLook, lids: lidsOf(g, 7, 0.2, 110), yaw: 0.18 + 0.06 * Math.sin(g * 0.02), brow: -0.35, mouth: "flat" as const, lookY: 0.55 };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <GarageShell cam={cam} f={g} lamp={1} />
        {/* table + props */}
        <Card cam={cam} x={TABLE.x} z={TABLE.z}>
          <Table w={1.5} top="#8a8a80" leg="#4a4e52" />
          {/* map sheet with generic road lines (no text) */}
          <g transform="translate(-0.1,-0.79) rotate(-2)">
            <rect x={-0.34} y={0.0} width={0.68} height={0.34} fill="#e8e2ce" stroke="#9a9282" strokeWidth={0.006} />
            <path d="M-0.3,0.06 q0.2,0.12 0.32,0.06 q0.18,-0.08 0.26,0.06 M-0.28,0.24 q0.24,-0.06 0.34,0.02 q0.16,0.1 0.2,-0.02" stroke="#b8a882" strokeWidth={0.012} fill="none" />
            <path d="M-0.02,0.02 q0.02,0.14 -0.04,0.3" stroke="#c07a5a" strokeWidth={0.008} fill="none" />
            <circle cx={0.14} cy={0.18} r={0.02} fill="none" stroke="#b0442e" strokeWidth={0.008} />
          </g>
          <g transform="translate(-0.34,-0.8)"><BarrelPrint /></g>
          {/* folder: slapped down on "plan" (16) */}
          <g transform={`translate(0.42,${-0.79 - 0.06 * (1 - prog(f, 16, 26, easeOut))}) rotate(${-8 + 10 * (1 - prog(f, 16, 26, easeOut))})`} opacity={f > 10 ? 1 : 0}>
            <rect x={-0.2} y={0.0} width={0.4} height={0.28} fill="#b8a06a" stroke="#6a5a38" strokeWidth={0.006} />
            <rect x={-0.185} y={0.02} width={0.37} height={0.02} fill="#8a7448" />
            <rect x={-0.04} y={0.08} width={0.12} height={0.03} fill="#a89058" />
          </g>
          <rect x={0.62} y={-0.86} width={0.11} height={0.14} rx={0.02} fill="#3a4a52" stroke="#14110e" strokeWidth={0.006} />
          <rect x={0.62} y={-0.9} width={0.11} height={0.05} rx={0.015} fill="#26323a" />
        </Card>
        {/* chair for the big man */}
        <Card cam={cam} x={BIG_POS.x + 0.05} z={BIG_POS.z - 0.1} blur={false}><Chair seat="#4a4038" frame="#2e2a26" facing={-1} /></Card>
        <BigFigure pose={bigSit} look={look} x={BIG_POS.x} z={BIG_POS.z} cam={cam} />
        <HankFigure f={f} pose={hankPose} look={brotherLook({ yaw: 0.55, lids: lidsOf(g, 2, 0.12, 96), brow: 0.3, mouth: f > 40 ? "flat" : "neutral", lookY: 0.35, mouthOpen: f > 44 ? 0.16 + 0.12 * breath(g, 0.2) : 0 })} x={hx} z={hz} cam={cam} />
        {/* foreground: a stack of seized boxes (near layer, softly out) */}
        <Card cam={cam} x={-2.9} z={1.9} blur>
          <Box x={0} z={0} w={0.9} h={0.66} color="#a8926a" top="#c2ab80" side="#8a7452" />
          <g transform="translate(0.15,-0.66)"><Box x={0} z={0} w={0.7} h={0.52} color="#9c8a66" top="#b8a67e" side="#7f6f50" /></g>
        </Card>
        {/* dust in the window shaft */}
        {Array.from({ length: 26 }).map((_, i) => {
          const p = project(cam, -3.4 + rand(i, 31) * 1.4 + Math.sin(f * 0.02 + i) * 0.1, 1.2 + rand(i, 32) * 1.4 - ((f * 0.004 + i * 0.03) % 0.5), 6.6);
          return <circle key={i} cx={p.x} cy={p.y} r={1 + rand(i, 33) * 2} fill="#fff6dc" opacity={0.35 * (0.4 + 0.6 * Math.abs(Math.sin(f * 0.05 + i)))} />;
        })}
        {/* a bulb on a cord, swinging a touch (secondary action) */}
        <Card cam={cam} x={0.9} z={6.2} blur={false}>
          <path d={`M0,-2.9 Q${0.05 * Math.sin(f * 0.03)},-2.4 ${0.12 * Math.sin(f * 0.03)},-2.05`} stroke="#2a2622" strokeWidth={0.014} fill="none" />
          <circle cx={0.12 * Math.sin(f * 0.03)} cy={-2.0} r={0.05} fill="#fff2cc" opacity={0.95} />
          <circle cx={0.12 * Math.sin(f * 0.03)} cy={-2.0} r={0.3} fill="url(#dLampGlow)" opacity={0.5} />
        </Card>
        {/* a fly circling the lamp (ambient life) */}
        {(() => {
          const a = f * 0.28;
          const p = project(cam, TABLE.x + 0.4 + Math.cos(a) * 0.34, 0.95 + Math.sin(a * 1.7) * 0.16, TABLE.z - 0.2);
          return <circle cx={p.x} cy={p.y} r={2.2} fill="#1a1612" opacity={0.8} />;
        })()}
      </svg>
      <Motes f={g} n={26} color="#fff2cf" seed={6} region={[300, 120, 1200, 700]} drift={0.4} />
      <Finish f={g} vig={0.55} grain={0.065} shadow="#2a1d0c" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S2 · the only thing (81–218) ─────────────────────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s2 + beat(META.cutIn);
  const dur = CUT.s3 - CUT.s2;
  const t = f / dur;
  const c2 = fitCam({ cx: 0.35, cy: 1.02, f: 1900, shiftY: 20, marginX: 230, marginY: 70, pts: [[HANK_POS.x - 0.35, 1.8, HANK_POS.z], [BIG_POS.x, 1.95, BIG_POS.z], [TABLE.x, 0.78, TABLE.z]] });
  const cam: Cam = { ...c2, z: c2.z - lerp(0, 0.25, easeInOut(t)), x: c2.x + lerp(0, 0.12, easeInOut(t)) };
  const tap = prog(f, 44, 58, easeOut) * (1 - prog(f, 62, 70, easeInOut)) + prog(f, 74, 86, easeOut) * (1 - prog(f, 90, 104));
  const slam = prog(f, 96, 99, easeIn) * (1 - prog(f, 106, 124, easeOut));
  const hankPose: Pose = {
    torso: 11 + 2 * noise1(f * 0.05, 2) - slam * 5, neck: -16,
    shL: 40, shR: 30, elL: 74, elR: 66,
    hipL: 12, hipR: 14, knL: 18, knR: 20, breathe: breath(f, 0.09),
  };
  hankPose.shR = lerp(hankPose.shR, 52, tap) - slam * 26;
  hankPose.elR = lerp(hankPose.elR, 52, tap) + slam * 10;
  const bigSit = sitAtTable(g, { lean: 6, armL: 38, armR: 34, elL: 56, elR: 52 });
  // the big man shakes his head on "never destroy" (1250.82), then looks away
  const no = prog(f, 55, 60, easeOut) * (1 - prog(f, 82, 92, easeInOut)) ;
  const away = prog(f, 112, 134, easeInOut);
  const bigLook = {
    ...BIG.look, yaw: 0.22 - no * 0.34 + away * 0.12, lids: lidsOf(g, 7, 0.24, 104) + away * 0.2,
    brow: -0.4 - away * 0.2, mouth: (no > 0.2 ? "flat" : "neutral") as "flat" | "neutral", lookX: -no * 0.6 + away * 0.4, lookY: 0.4 - no * 0.2,
  };
  const paper = slam > 0 ? Math.exp(-(f - 99) / 6) * Math.sin((f - 99) * 1.6) : 0;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <GarageShell cam={cam} f={g} lamp={1} />
        <Card cam={cam} x={TABLE.x} z={TABLE.z}>
          <Table w={1.5} top="#8a8a80" leg="#4a4e52" />
          <g transform={`translate(-0.18,${-0.79 - paper * 0.03}) rotate(${-3 + paper * 4})`}>
            <rect x={-0.34} y={0.0} width={0.68} height={0.34} fill="#e8e2ce" stroke="#9a9282" strokeWidth={0.006} />
            <path d="M-0.3,0.06 q0.2,0.12 0.32,0.06 q0.18,-0.08 0.26,0.06 M-0.28,0.24 q0.24,-0.06 0.34,0.02 q0.16,0.1 0.2,-0.02" stroke="#b8a882" strokeWidth={0.012} fill="none" />
          </g>
          <g transform={`translate(0.3,${-0.8 - paper * 0.04}) rotate(${4 + paper * 5}) scale(1.5)`}><BarrelPrint glow={1 + slam} /></g>
        </Card>
        <Card cam={cam} x={BIG_POS.x + 0.05} z={BIG_POS.z - 0.1} blur={false}><Chair seat="#4a4038" frame="#2e2a26" facing={-1} /></Card>
        <BigFigure pose={bigSit} look={bigLook} x={BIG_POS.x} z={BIG_POS.z} cam={cam} />
        <HankFigure f={f} pose={hankPose} look={brotherLook({ yaw: 0.42, lids: lidsOf(g, 2, 0.18, 96), brow: 0.55, mouth: slam > 0.1 ? "open" : "flat", mouthOpen: slam > 0.1 ? 0.4 : 0.1 + 0.1 * breath(g, 0.22), lookY: 0.55 })} x={HANK_POS.x} z={HANK_POS.z} cam={cam} />
        {/* near layer: a dark chair back at frame edge + cable coil on the floor */}
        <Card cam={cam} x={2.75} z={2.0} blur>
          <rect x={-0.28} y={-1.05} width={0.56} height={1.05} rx={0.06} fill="#2e2a26" />
          <rect x={-0.22} y={-0.98} width={0.44} height={0.32} rx={0.04} fill="#3a342c" opacity={0.8} />
        </Card>
        <Card cam={cam} x={-1.9} z={2.3} blur>
          <ellipse cx={0} cy={-0.02} rx={0.34} ry={0.1} fill="none" stroke="#b06a2a" strokeWidth={0.05} />
          <ellipse cx={0} cy={-0.02} rx={0.26} ry={0.075} fill="none" stroke="#b06a2a" strokeWidth={0.05} />
        </Card>
      </svg>
      <Motes f={g} n={30} color="#fff2cf" seed={9} drift={0.3} />
      <Finish f={g} vig={0.58} grain={0.065} shadow="#2a1d0c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S3 · shown the photograph (219–331) ─────────────────────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s3 + beat(META.cutIn);
  const dur = CUT.s4 - CUT.s3;
  const t = f / dur;
  const c3 = twoShot({ a: [BIG_POS.x - 0.15, BIG_POS.z], b: [2.25, 5.2], ha: BIG.h - 0.35, hb: HANK.h * 0.97, f: 1500, shiftY: 40, marginX: 70 });
  const cam: Cam = { ...c3, x: c3.x + lerp(0.1, 0.2, easeInOut(t)), focus: kf(g, [[CUT.s3, c3.focus ?? 4], [beat(1254.3), 4.2], [beat(1255.3), 2.9]]) };
  // the print slides across on "is shown" (1253.84), big hand takes it, then recoil on "dead man" (1254.8)
  const push = prog(f, 8, 26, easeInOut);
  const grip = prog(f, 30, 44, easeOut);
  const recoil = prog(f, 74, 90, easeOut);
  const up = prog(f, 94, 112, easeInOut);
  const bigPose: Pose = {
    torso: 8 - recoil * 18 + up * 6, neck: 2 + recoil * 14 - up * 10,
    shL: 36 + push * 26 + up * 30, shR: 32 + push * 30 + up * 34,
    elL: 56 - push * 24 + recoil * 20, elR: 54 - push * 22 + recoil * 18,
    hipL: 88, hipR: 86, knL: 88 + recoil * 6, knR: 90, breathe: breath(g, 0.16) + recoil * 0.3,
  };
  const bigLook = {
    ...BIG.look, yaw: 0.1, lids: lidsOf(g, 7, 0.12, 96) + recoil * 0.15 - up * 0.1,
    brow: -0.3 - recoil * 0.45 + up * 0.2, mouth: (recoil > 0.2 ? "open" : "flat") as "open" | "flat",
    mouthOpen: recoil * (0.4 + 0.2 * breath(g, 0.3)), lookY: 0.5 - recoil * 0.1, lookX: 0.2,
    sweat: 0.4 + recoil * 0.4,
  };
  // Hank leans in over the table and holds the print out, then plants a finger on it
  const hankPose: Pose = {
    torso: 7, neck: -10,
    shL: 34, shR: 70, elL: 58, elR: 34,
    hipL: 12, hipR: 14, knL: 18, knR: 20, breathe: breath(g, 0.1),
  };
  hankPose.shR = 62 + push * 22 + path(prog(f, 96, 118, easeOut)) * 16;
  hankPose.elR = 30 - push * 12;
  hankPose.torso = 7 + push * 4;
  const printX = lerp(1.15, 0.42, push), printLift = 0.04 + push * 0.02 + up * 0.14;
  const trembling = recoil * Math.sin(f * 2.4) * 0.006;
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <GarageShell cam={cam} f={g} lamp={1} />
        <Card cam={cam} x={TABLE.x} z={TABLE.z}>
          <Table w={1.5} top="#8a8a80" leg="#4a4e52" />
        </Card>
        <Card cam={cam} x={BIG_POS.x} z={BIG_POS.z} blur={false}><Chair seat="#4a4038" frame="#2e2a26" facing={1} /></Card>
        <BigFigure pose={bigPose} look={bigLook} x={BIG_POS.x} z={BIG_POS.z} cam={cam} />
        {/* the photograph, travelling from Hank's hand into the big man's */}
        <Card cam={cam} x={BIG_POS.x + printX} y={1.0 + printLift} z={BIG_POS.z + 0.6} blur={false}>
          <g transform={`translate(0,${trembling}) rotate(${-14 + push * 10 + up * 8}) scale(1.15)`}>
            <PhotoPrint w={0.24} />
          </g>
        </Card>
        <HankFigure f={f} pose={hankPose} look={brotherLook({ yaw: 0.48, lids: lidsOf(g, 2, 0.1, 92), brow: 0.5, mouth: "flat", lookY: 0.6, mouthOpen: 0.12 + 0.1 * breath(g, 0.24) })} x={2.25} z={5.2} cam={cam} />
        {/* near foreground: shelving upright + a dangling cable, thrown out of focus */}
        <Card cam={cam} x={-2.35} z={1.15} blur>
          <rect x={-0.16} y={-2.4} width={0.32} height={2.4} fill="#3a4048" />
          <rect x={-0.16} y={-1.62} width={1.5} height={0.06} fill="#4a5058" />
          <rect x={-0.14} y={-1.5} width={0.6} height={0.24} fill="#5a6280" opacity={0.8} />
          <path d="M0.9,-2.4 q0.1,0.5 -0.02,0.9" stroke="#20242a" strokeWidth={0.03} fill="none" />
        </Card>
      </svg>
      <Motes f={g} n={34} color="#fff2cf" seed={12} drift={0.25} />
      <Finish f={g} vig={0.6} grain={0.07} shadow="#2a1d0c" gradeO={0.16} />
    </AbsoluteFill>
  );
};
const path = (x: number) => x;

/* ─────────────────────────── S4 · what happens next (332–409) ─────────────────────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s4 + beat(META.cutIn);
  const dur = CUT.s5 - CUT.s4;
  const t = f / dur;
  // over Hank's near shoulder into the big man's face: he reads the print, swallows, answers
  const cam: Cam = single({ x: BIG_POS.x - 0.22, z: BIG_POS.z, h: 2.15, f: 2100, cover: lerp(1.85, 1.7, easeOut(t)), cy: 1.42, shiftY: 60 });
  const flick = Math.max(0, Math.sin(prog(f, 6, 34, easeInOut) * Math.PI * 2)) * 0.8;
  const swallow = prog(f, 34, 46, easeOut) * (1 - prog(f, 62, 72, easeInOut));
  const talk = prog(f, 54, 68, easeInOut);
  const bigPose: Pose = {
    torso: 2 + swallow * 3, neck: 12 - talk * 4,
    shL: 62 + talk * 10, shR: 58, elL: 66, elR: 40,
    hipL: 88, hipR: 86, knL: 88, knR: 90, breathe: breath(g, 0.2) + swallow * 0.22,
  };
  const look = {
    ...BIG.look, yaw: 0.22, lids: lidsOf(g, 7, 0.08, 88) + swallow * 0.22,
    brow: -0.4 - talk * 0.25, mouth: (talk > 0.15 ? "open" : "flat") as "open" | "flat",
    mouthOpen: talk * (0.22 + 0.2 * Math.abs(Math.sin(g * 0.5))),
    lookX: flick * 0.5 - 0.12, lookY: 0.4 - flick * 0.35, sweat: 0.85, dirt: 0.12,
  };
  const hankPose: Pose = {
    torso: 9, neck: -12,
    shL: 26, shR: 74 + 3 * Math.sin(f * 0.06), elL: 64, elR: lerp(26, 8, prog(f, 40, 52, easeOut)),
    hipL: 12, hipR: 14, knL: 18, knR: 20, breathe: breath(g, 0.11),
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <GarageShell cam={cam} f={g} lamp={1} />
        <Card cam={cam} x={BIG_POS.x} z={BIG_POS.z} blur={false}><Chair seat="#4a4038" frame="#2e2a26" facing={1} /></Card>
        <BigFigure pose={bigPose} look={look} x={BIG_POS.x} z={BIG_POS.z} cam={cam} />
        {/* Hank's near shoulder + pointing arm, cropped by the frame edge (over-the-shoulder) */}
        <Actor cam={cam} x={BIG_POS.x - 1.32} z={BIG_POS.z + 0.5} face={1} view={1} pose={hankPose} blurCard
          look={brotherLook({ yaw: 0.55, lids: 0.35, brow: 0.5, mouth: "flat" })} pal={HANK.pal} height={HANK.h} rimLight="#ffe8b8" rimSide={1} />
        <Motes f={g} n={22} color="#ffe9c0" seed={15} region={[200, 0, 1400, 900]} drift={0.2} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.07} shadow="#2a1d0c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── S5 · he talks (410–461) ─────────────────────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUT.s5 + beat(META.cutIn);
  const dur = DUR - CUT.s5;
  const t = f / dur;
  const c5 = fitCam({ cx: 1.55, cy: 1.0, f: 1500, shiftY: 30, marginX: 150, marginY: 60, pts: [[BIG_POS.x, 1.6, BIG_POS.z], [2.5, 1.75, 5.2], [BIG_POS.x, 0.3, BIG_POS.z], [2.5, 0.05, 5.2]] });
  const cam: Cam = { ...c5, z: c5.z + lerp(0, 0.3, easeInOut(t)), y: lerp(1.3, 1.4, easeInOut(t)) };
  const slamPad = prog(f, 4, 7, easeIn) * (1 - prog(f, 9, 18, easeOut));
  const write = prog(f, 14, 44, easeOut);
  const bigPose: Pose = {
    ...sitAtTable(g, { lean: 12, armL: 30 + 4 * Math.sin(f * 0.5), armR: 26 + 4 * Math.cos(f * 0.45), elL: 68, elR: 64 }),
    torso: 13 + 2 * Math.sin(f * 0.05), neck: -8, breathe: breath(g, 0.3),
  };
  const look = {
    ...BIG.look, yaw: 0.24, lids: lidsOf(g, 7, 0.22, 80) - 0.06,
    brow: 0.2, mouth: "open" as const, mouthOpen: 0.18 + 0.2 * Math.abs(Math.sin(g * 0.62)), sweat: 0.6, lookY: 0.35,
  };
  const point = prog(f, 44, 58, easeOut) * (1 - prog(f, 120, 136, easeInOut));
  const hankPose: Pose = {
    torso: lerp(12, 6, prog(f, 0, 20, easeInOut)) + point * 2, neck: -8,
    shL: lerp(44, 30, prog(f, 0, 18, easeOut)) + 2 * Math.sin(f * 0.07),
    shR: lerp(46, 22, prog(f, 0, 18, easeOut)) + point * 46,
    elL: lerp(38, 66, prog(f, 0, 18, easeOut)), elR: lerp(40, 70, prog(f, 0, 18, easeOut)) - point * 56,
    hipL: 12, hipR: 14, knL: 18, knR: 20, breathe: breath(g, 0.09),
  };
  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <DDefs />
        <GarageShell cam={cam} f={g} lamp={1} />
        <Card cam={cam} x={TABLE.x} z={TABLE.z}>
          <Table w={1.5} top="#8a8a80" leg="#4a4e52" />
          {/* notepad slapped down, pen scribbling */}
          <g transform="translate(-0.34,-0.8) rotate(5) scale(1.3)"><PhotoPrint w={0.2} /></g>
          <g transform={`translate(-0.02,${-0.79}) rotate(${-4 - slamPad * 4})`}>
            <rect x={-0.14} y={0.0} width={0.28} height={0.2} fill="#f2eee2" stroke="#9a9282" strokeWidth={0.005} />
            {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M-0.11,${0.03 + i * 0.03} q0.08,${0.006} 0.2,-0.002`} stroke="#5a6a8a" strokeWidth={0.004} fill="none" opacity={write > i * 0.18 ? 0.9 : 0.15} />)}
          </g>
          <g transform={`translate(${0.1 + write * 0.06},${-0.66 + Math.sin(f * 0.9) * 0.004}) rotate(${32 + write * 8})`}>
            <rect x={-0.005} y={-0.14} width={0.012} height={0.14} fill="#2a3a5a" />
            <path d="M-0.006,-0.14 L0.006,-0.14 L0.004,-0.16 L-0.004,-0.16 Z" fill="#8a8a90" />
          </g>
        </Card>
        <Card cam={cam} x={BIG_POS.x + 0.05} z={BIG_POS.z - 0.1} blur={false}><Chair seat="#4a4038" frame="#2e2a26" facing={-1} /></Card>
        <BigFigure pose={bigPose} look={look} x={BIG_POS.x} z={BIG_POS.z} cam={cam} />
        <HankFigure f={f} pose={hankPose} look={brotherLook({ yaw: 0.35, lids: lidsOf(g, 2, 0.26, 88), brow: 0.35, mouth: "smile", lookY: 0.3, mouthOpen: 0.05 })} x={2.3} z={5.2} cam={cam} />
        <Card cam={cam} x={-0.6} z={1.35} blur>
          <Box x={0} z={0} w={0.8} h={0.62} color="#a8926a" top="#c2ab80" side="#8a7452" />
        </Card>
        <Card cam={cam} x={3.05} z={1.6} blur>
          <rect x={-0.2} y={-1.9} width={0.4} height={1.9} fill="#3a4048" />
          <rect x={-0.2} y={-1.4} width={0.5} height={0.06} fill="#4a5058" />
        </Card>
      </svg>
      <Motes f={g} n={24} color="#fff2cf" seed={18} drift={0.3} />
      <Finish f={g} vig={0.56} grain={0.065} shadow="#2a1d0c" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────── assembly + sound ─────────────────────────── */
export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#12100c" }}>
    <Sequence from={0} durationInFrames={CUT.s2} name="S1 the plan"><S1 /></Sequence>
    <Sequence from={CUT.s2} durationInFrames={CUT.s3 - CUT.s2} name="S2 the only thing"><S2 /></Sequence>
    <Sequence from={CUT.s3} durationInFrames={CUT.s4 - CUT.s3} name="S3 the photograph"><S3 /></Sequence>
    <Sequence from={CUT.s4} durationInFrames={CUT.s5 - CUT.s4} name="S4 what happens next"><S4 /></Sequence>
    <Sequence from={CUT.s5} durationInFrames={DUR - CUT.s5} name="S5 he talks"><S5 /></Sequence>
    {/* ambience at 3–4 %, key beats at 10–15 % */}
    <Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_garage.wav")} volume={0.035} /></Sequence>
    <Sequence from={12} durationInFrames={30}><Audio src={staticFile("sfx/d_paper.wav")} volume={0.11} /></Sequence>
    <Sequence from={95} durationInFrames={24}><Audio src={staticFile("sfx/thump.wav")} volume={0.13} /></Sequence>
    <Sequence from={CUT.s3 + 70} durationInFrames={26}><Audio src={staticFile("sfx/d_chair.wav")} volume={0.12} /></Sequence>
    <Sequence from={CUT.s5 + 2} durationInFrames={24}><Audio src={staticFile("sfx/d_paper.wav")} volume={0.12} /></Sequence>
  </AbsoluteFill>
);
