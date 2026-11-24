// SCENE 038 · "boom" · set: garage · 577.07s → 596.97s (19.90s) · batch B (rev2)
// Narration: "Then Walter White does something that isn't business at all. He throws a handful of crystal
//   at the floor. Not the bag, a handful, like gravel, like it's worth throwing. The windows come out of
//   their frames, half the room goes down and a chair comes apart. And Walter stays exactly where he is
//   standing, because the standing is the point."
// Staging (rev2 per LEAD_NOTES rounds 1 & 2):
//   S1  (577.07–579.60) Medium two-shot: Walt lifts the open crystal bag off the desk into his left arm
//                       and reaches his right hand inside; distributor leans forward suspiciously.
//   S2a (579.60–583.15) Full-figure medium-wide angle (head to shoes + concrete floor, zero leg crop):
//                       Walt winds up and hurls a bright handful of crystal onto the concrete floor.
//   S2b (583.15–587.00) Tight oblique insert: left articulated hand holds the open crystal-filled bag
//                       ("Not the bag") while right articulated hand scatters pale mercury shards like
//                       gravel onto the concrete ("like it's worth throwing").
//   S3  (587.00–591.70) Concussive blast at 587.35s: windows blow out of their frames, pegboard/cabinet/
//                       lamp/desk props wreck & swing, chair splinters apart, distributor is knocked down
//                       behind the desk; Walt stays planted holding the open crystal bag at his chest.
//   S4  (591.70–596.97) Matched framing from S1 pushing slowly onto dust-coated Walt at the exact same
//                       floor coordinates, holding up the open bag of remaining crystals while the stunned
//                       distributor claws at the desk edge in the smoke.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GT, GX, GarageRoom, GarageFore, Desk, DeskKit, Chair } from "../../env/b_garage";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Crystal } from "../../props/b_props";
import { SoftDefs, Puff, Dust } from "../../env/b_common";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 38, id: "boom", set: "garage", cutIn: 577.07, cutOut: 596.97 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(596.97);
const CUTS = { s1: 0, s2a: B(579.6), s2b: B(583.15), s3: B(587.0), s4: B(591.7), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
const WALT_POS = { x: -0.92, z: 2.78 };
const BLAST = B(587.35);

const PAL_T = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffdca0", 0.06) : c));
const PAL_T_DUST = tint(TEACHER.pal, (c) => (c.startsWith("#") ? mixHex(mixHex(c, "#fff0d2", 0.08), "#d8ceb8", 0.2) : c));

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
const PAL_DIST_DUST = tint(DIST.pal, (c) => (c.startsWith("#") ? mixHex(c, "#d8ceb8", 0.24) : c));
const distLook = (o: any = {}) => restaurateurLook({ hair: DIST.hair, beard: "mustache", age: 0.5, lips: "#8a5a48", ...o });
const deskSit = (o: Partial<Pose> = {}) => chairSit({ hipL: 62, hipR: 64, knL: 96, knR: 98, ...o });

/** Blend two character palettes during blast dust-fall */
const lerpPal = (a: typeof PAL_T, b: typeof PAL_T, t: number): typeof PAL_T => {
  if (t <= 0.01) return a;
  if (t >= 0.99) return b;
  const out: any = {};
  for (const k of Object.keys(a) as (keyof typeof PAL_T)[]) {
    const va = a[k], vb = b[k];
    out[k] = typeof va === "string" && va.startsWith("#") && typeof vb === "string" && vb.startsWith("#") ? mixHex(va, vb, t) : va;
  }
  return out;
};

/** Compact crystal-filled duffel bag (sits on desk or in Walt's hand) */
const HeldBag: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <path d="M-0.16,0.09 L-0.14,-0.05 C-0.11,-0.1 0.11,-0.1 0.14,-0.05 L0.16,0.09 Z" fill="#3a4552" stroke="#151a1f" strokeWidth={0.006} />
    <path d="M-0.065,0.085 L-0.058,-0.08 M0.065,0.085 L0.058,-0.08" stroke="#242b33" strokeWidth={0.016} />
    <ellipse cx={0} cy={-0.072} rx={0.095} ry={0.022} fill="#101a22" stroke="#151a1f" strokeWidth={0.004} />
    {/* cloudy silver-blue fulminated mercury crystals visible inside the open mouth */}
    <polygon points="-0.06,-0.068 -0.035,-0.092 -0.008,-0.07" fill="#a8e8f8" stroke="#1e4454" strokeWidth={0.003} />
    <polygon points="-0.015,-0.07 0.012,-0.098 0.04,-0.07" fill="#d8f6ff" stroke="#1e4454" strokeWidth={0.003} />
    <polygon points="0.025,-0.068 0.052,-0.088 0.072,-0.068" fill="#7fd6ee" stroke="#1e4454" strokeWidth={0.003} />
  </g>
);

/** Continuity sheet & flat knife on desk (pre-blast) */
const ContinuityProps: React.FC<{ cam: Cam; wreck?: number }> = ({ cam, wreck = 0 }) => (
  <>
    <Card cam={cam} x={-0.44 - 0.25 * wreck} y={0.786} z={3.18 + 0.12 * wreck} blur={false}>
      <g transform={`scale(0.62) rotate(${-3 + 28 * wreck})`}>
        <rect x={-0.16} y={-0.11} width={0.32} height={0.22} fill="#f4efe0" stroke="#8f8879" strokeWidth={0.003} />
        <path d="M-0.1,-0.05 L0.02,-0.05 M-0.1,0.005 L0.01,0.005 M0.05,0.032 L0.12,0.032" stroke="#252c44" strokeWidth={0.004} />
        <ellipse cx={0.088} cy={0.062} rx={0.04} ry={0.022} fill="none" stroke="#192347" strokeWidth={0.0035} />
      </g>
    </Card>
    <Card cam={cam} x={0.3 + 0.22 * wreck} y={0.786} z={3.68} blur={false}>
      <g transform={`rotate(${-95 + 42 * wreck})`}>
        <rect x={-0.095} y={-0.013} width={0.115} height={0.026} rx={0.007} fill="#3d2e22" stroke="#171310" strokeWidth={0.003} />
        <path d="M0.02,-0.011 L0.155,-0.013 L0.185,-0.002 L0.15,0.01 L0.02,0.011 Z" fill="#cfd9e0" stroke="#39434c" strokeWidth={0.003} />
      </g>
    </Card>
  </>
);

/** Splintered executive chair debris ("and a chair comes apart") */
const ChairWreck: React.FC<{ cam: Cam; k: number }> = ({ cam, k }) => {
  const pieces = [
    { x0: 0.46, y0: 0.72, z0: 4.24, dx: -0.68, dz: 0.35, w: 0.46, h: 0.52, r: -74, col: "#2a221c" }, // torn leather backrest
    { x0: 0.46, y0: 0.44, z0: 4.24, dx: 0.62, dz: 0.28, w: 0.48, h: 0.11, r: 38, col: "#362b23" },  // seat cushion
    { x0: 0.32, y0: 0.24, z0: 4.18, dx: -0.82, dz: -0.15, w: 0.045, h: 0.44, r: -112, col: GT.steel }, // leg 1
    { x0: 0.60, y0: 0.24, z0: 4.18, dx: 0.78, dz: -0.12, w: 0.045, h: 0.44, r: 104, col: GT.steel },  // leg 2
    { x0: 0.38, y0: 0.32, z0: 4.28, dx: -0.38, dz: 0.48, w: 0.05, h: 0.38, r: 66, col: GT.woodDark },     // armrest 1
    { x0: 0.56, y0: 0.32, z0: 4.28, dx: 0.44, dz: 0.42, w: 0.05, h: 0.38, r: -58, col: GT.woodDark },     // armrest 2
  ];
  return (
    <g>
      {pieces.map((o, i) => {
        const arc = Math.sin(clamp(k * 1.25) * Math.PI) * 0.32;
        const x = o.x0 + o.dx * k;
        const y = Math.max(0.05, lerp(o.y0, 0.07 + (i < 2 ? 0.05 : 0), k) + arc);
        const z = o.z0 + o.dz * k;
        const p = project(cam, x, y, z);
        if (p.d <= 0.1) return null;
        return (
          <rect
            key={i}
            x={p.x - (o.w * 0.5) * p.s}
            y={p.y - (o.h * 0.5) * p.s}
            width={o.w * p.s}
            height={o.h * p.s}
            rx={0.015 * p.s}
            fill={o.col}
            stroke={GT.ol}
            strokeWidth={1.1}
            transform={`rotate(${o.r * k} ${p.x} ${p.y})`}
          />
        );
      })}
    </g>
  );
};

/* ─────────── S1 · "Then Walter White does something that isn't business at all." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2a;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.32, -0.42, easeInOut(t)),
    y: 1.42,
    z: lerp(1.18, 1.05, easeInOut(t)),
    f: 1360, shiftY: 36, focus: 2.7, aperture: 0.3,
  };
  const grab = prog(g, B(577.35), B(578.55), easeInOut);
  const reachIn = prog(g, B(578.55), B(579.55), easeInOut);
  const lifted = grab > 0.48;

  const poseD: Pose = deskSit({
    torso: lerp(-6, 7, grab),
    neck: lerp(2, -2, grab),
    shL: lerp(-6, 24, grab),
    shR: 28,
    elL: lerp(48, 30, grab),
    elR: 24,
    breathe: breath(g, 0.08),
  });

  // Walt picks the open crystal bag off the desk into his left arm and dips his right hand inside
  const poseW: Pose = {
    torso: lerp(5, 3, reachIn),
    neck: lerp(-1, 4, reachIn),
    shL: lifted ? lerp(36, 28, reachIn) : lerp(-14, 36, grab * 2),
    shR: lifted ? lerp(34, 28, reachIn) : lerp(32, 36, grab * 2),
    elL: lifted ? lerp(24, 58, reachIn) : lerp(48, 24, grab * 2),
    elR: lifted ? lerp(22, 64, reachIn) : lerp(18, 22, grab * 2),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.075, 1),
    slump: 0.14,
  };
  const anc = rigAnchors(poseW, TEACHER.height, 0.58);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        <Card cam={cam} x={DESK.x + 0.36} y={0} z={DESK.z + 0.74} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.18, lids: 0.3 + blink(g, 6) * 0.4,
              lookX: 0.34, lookY: lerp(0.04, 0.14, reachIn),
              brow: lerp(0.24, 0.44, grab), mouth: "flat",
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <ContinuityProps cam={cam} />

        {/* Bag on the desk until Walt's hand lifts it */}
        {!lifted && (
          <Card cam={cam} x={-0.36} y={0.785} z={3.14} blur={false}>
            <HeldBag scale={1.15} />
          </Card>
        )}

        <Card cam={cam} x={WALT_POS.x} y={0} z={WALT_POS.z} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2, lids: 0.16 + blink(g, 2) * 0.45,
              lookX: 0.32, lookY: lerp(0.05, 0.24, reachIn),
              brow: 0.1, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
          {lifted && (
            <g transform={`translate(${anc.wristL.x + 0.05},${anc.wristL.y + 0.03})`}>
              <HeldBag scale={0.95} />
            </g>
          )}
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={5} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2a · full-body medium-wide throw: "He throws a handful of crystal at the floor." ─────────── */
const S2a: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2a;
  const dur = CUTS.s2b - CUTS.s2a;
  const t = f / dur;
  // Framed to include Walt head-to-shoes AND the concrete floor impact zone in front of the desk
  const cam: Cam = {
    x: lerp(-0.46, -0.38, easeInOut(t)),
    y: 1.02,
    z: lerp(0.55, 0.68, easeInOut(t)),
    f: 1120, shiftY: -35, focus: 2.3, aperture: 0.3,
  };

  const windUp = prog(g, B(579.62), B(579.98), easeInOut);
  const hurl = prog(g, B(580.0), B(580.42), easeOut);
  const settleArm = prog(g, B(581.4), B(582.6), easeInOut);
  const joltD = prog(g, B(580.2), B(581.1), easeOut);

  const poseD: Pose = deskSit({
    torso: lerp(6, 15, joltD),
    neck: lerp(-2, 7, joltD),
    shL: 28, shR: 36, elL: 26, elR: 18,
    breathe: breath(g, 0.09),
  });

  // Walt: left hand cradles the open crystal bag; right arm winds up and hurls a handful at the floor
  const shRThrow = hurl > 0 ? lerp(-24, 54, hurl) : lerp(28, -24, windUp);
  const elRThrow = hurl > 0 ? lerp(78, 12, hurl) : lerp(64, 78, windUp);
  const poseW: Pose = {
    torso: lerp(lerp(3, -5, windUp), 12, hurl) - 6 * settleArm,
    neck: lerp(2, 8, hurl),
    shL: 28,
    shR: lerp(shRThrow, 32, settleArm),
    elL: 58,
    elR: lerp(elRThrow, 38, settleArm),
    hipL: 7, hipR: -6, knL: 6, knR: 8,
    breathe: breath(g, 0.08, 1),
    slump: 0.14,
  };
  const anc = rigAnchors(poseW, TEACHER.height, 0.58);

  // Falling & skittering crystal shards from Walt's thrown handful at 580.1s
  const tThrow = Math.max(0, (g - B(580.12)) / 30);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        <Card cam={cam} x={DESK.x + 0.36} y={0} z={DESK.z + 0.74} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.18, lids: lerp(0.28, 0.12, joltD),
              lookX: 0.32, lookY: lerp(0.08, 0.36, joltD),
              brow: lerp(0.4, 0.65, joltD),
              mouth: joltD > 0.5 ? "open" : "flat",
              mouthOpen: 0.18 * joltD,
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <ContinuityProps cam={cam} />

        <Card cam={cam} x={WALT_POS.x} y={0} z={WALT_POS.z} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.44} />
          {/* Open crystal bag held in Walt's left arm */}
          <g transform={`translate(${anc.wristL.x + 0.055},${anc.wristL.y + 0.025})`}>
            <HeldBag scale={0.95} />
          </g>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2, lids: 0.14 + blink(g, 5) * 0.4,
              lookX: 0.35, lookY: lerp(0.12, 0.36, hurl),
              brow: 0.22, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
          {/* Crystal glinting in Walt's right hand during wind-up */}
          {g < B(580.15) && (
            <g transform={`translate(${anc.wristR.x + 0.02},${anc.wristR.y})`}>
              <Crystal s={1.6} hue="#a4ecff" />
            </g>
          )}
        </Card>

        {/* Thrown crystal cluster arcing to the concrete floor and skittering */}
        {tThrow > 0 && (
          <g>
            {Array.from({ length: 11 }).map((_, i) => {
              const delay = rand(i, 2) * 0.04;
              const life = Math.max(0, tThrow - delay);
              if (life <= 0) return null;
              const hitT = 0.34;
              const flight = clamp(life / hitT);
              const post = Math.max(0, life - hitT);
              const skitter = Math.min(0.45, post * 0.85) * (0.45 + rand(i, 3));
              const bounce = post > 0 ? Math.abs(Math.sin(post * 11)) * 0.09 * Math.exp(-post * 6) : 0;
              const x = lerp(-0.62, -0.34 + (rand(i, 4) - 0.35) * 0.32, flight) + skitter * (rand(i, 5) - 0.2);
              const y = post > 0 ? 0.012 + bounce : lerp(1.08, 0.015, flight * flight);
              const z = lerp(2.78, 2.92 + (rand(i, 6) - 0.5) * 0.22, flight) + skitter * 0.18;
              const p = project(cam, x, y, z);
              return (
                <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * (0.75 + 0.4 * rand(i, 7))})`}>
                  <Crystal s={1.3} hue="#a4ecff" />
                </g>
              );
            })}
          </g>
        )}

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={4} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2b · close oblique insert: "Not the bag, a handful, like gravel, like it's worth throwing." ─────────── */
const S2b: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2b;
  const dur = CUTS.s3 - CUTS.s2b;
  const t = f / dur;
  // Tight oblique insert looking down at the held open crystal bag, Walt's throwing hand, and the concrete floor
  const cam: Cam = {
    x: lerp(-0.56, -0.5, easeInOut(t)),
    y: 0.72,
    z: lerp(1.88, 1.8, easeInOut(t)),
    f: 1650, shiftY: -660, focus: 1.05, aperture: 0.3,
  };

  const bagHeft = Math.sin(clamp((g - B(583.25)) / 18) * Math.PI) * 0.018;
  const openFist = prog(g, B(584.5), B(584.95), easeOut);
  const tDrop = Math.max(0, (g - B(584.58)) / 30);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />

        {/* First handful already glinting like gravel on the concrete floor */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = -0.42 + (rand(i, 31) - 0.45) * 0.62;
          const z = 2.88 + (rand(i, 32) - 0.5) * 0.32;
          const p = project(cam, x, 0.012, z);
          if (p.d <= 0.1) return null;
          return (
            <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * (0.75 + 0.45 * rand(i, 33))})`}>
              <ellipse cx={0} cy={0.004} rx={0.016} ry={0.005} fill="#000" opacity={0.38} />
              <Crystal s={1.45} hue="#a4ecff" />
            </g>
          );
        })}

        {/* Second careless handful dropping & skittering across the concrete ("like gravel, like it's worth throwing") */}
        {tDrop > 0 &&
          Array.from({ length: 10 }).map((_, i) => {
            const delay = rand(i, 41) * 0.05;
            const life = Math.max(0, tDrop - delay);
            if (life <= 0) return null;
            const hitT = 0.28;
            const fl = clamp(life / hitT);
            const post = Math.max(0, life - hitT);
            const bounce = post > 0 ? Math.abs(Math.sin(post * 12)) * 0.065 * Math.exp(-post * 6.5) : 0;
            const sk = Math.min(0.34, post * 0.72) * (0.4 + rand(i, 42));
            const x = lerp(-0.42 + (rand(i, 43) - 0.5) * 0.07, -0.34 + (rand(i, 44) - 0.4) * 0.36, fl) + sk * (rand(i, 45) - 0.3);
            const y = post > 0 ? 0.012 + bounce : lerp(0.36, 0.014, fl * fl);
            const z = 2.84 + (rand(i, 46) - 0.5) * 0.2 + sk * 0.12;
            const p = project(cam, x, y, z);
            return (
              <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.s * (0.8 + 0.35 * rand(i, 47))})`}>
                <Crystal s={1.5} hue="#b8f0ff" />
              </g>
            );
          })}

        {/* Left foreground: open crystal-packed bag + Walt's articulated left hand ("Not the bag...") */}
        <Card cam={cam} x={-0.84} y={0.25 + bagHeft} z={2.68} blur={false}>
          <HeldBag scale={1.38} />
          <g transform="translate(-0.16,0.02) rotate(72) scale(0.92)">
            <HandBack pal={PAL_T} curl={0.68} thumb={0.75} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
          </g>
        </Card>

        {/* Upper-left/center: Walt's articulated right hand opening to scatter the crystals */}
        <Card cam={cam} x={lerp(-0.52, -0.42, openFist)} y={lerp(0.42, 0.34, openFist)} z={2.74} blur={false}>
          <g transform={`rotate(${lerp(112, 134, openFist)}) scale(0.95)`}>
            {openFist < 0.35 && (
              <g transform="translate(0.02,-0.12)">
                <Crystal s={1.6} hue="#b8f0ff" />
              </g>
            )}
            <HandBack
              pal={PAL_T}
              curl={lerp(0.84, 0.16, openFist)}
              thumb={lerp(0.85, 0.25, openFist)}
              sleeve={PAL_T.jacket}
              sleeveShade={PAL_T.jacketShade}
              cuff={PAL_T.shirt}
              forearm={0.68}
            />
          </g>
        </Card>

        <Motes f={g} n={18} color="#cfeeff" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#121a20" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · the blast: "The windows come out... half the room goes down and a chair comes apart." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;

  const post = Math.max(0, g - BLAST);
  const burst = clamp(post / 10);
  const wreck = prog(g, BLAST, BLAST + 22, easeOut);
  const shake = g >= BLAST ? 1 - clamp(post / 28) : 0;
  const swing = g >= BLAST ? Math.sin(post * 0.24) * Math.exp(-post * 0.018) * 1.1 : 0;

  const cam: Cam = {
    x: lerp(-0.34, -0.22, easeInOut(t)) + Math.sin(f * 2.3) * 0.045 * shake,
    y: 1.46 + Math.sin(f * 3.1) * 0.032 * shake,
    z: lerp(0.68, 0.92, easeInOut(t)),
    f: 1180, shiftY: 36 + Math.sin(f * 2.7) * 9 * shake, focus: 3.4, aperture: 0.3,
  };

  // Pre-blast anticipation vs post-blast knockdown for distributor
  const duck = prog(g, CUTS.s3, BLAST, easeIn);
  const poseD: Pose =
    g < BLAST + 2
      ? deskSit({ torso: lerp(10, 22, duck), neck: lerp(4, 12, duck), shL: 36, shR: 40, elL: 24, elR: 20, breathe: 0.7 })
      : {
          torso: lerp(14, -44, wreck),
          neck: lerp(4, 16, wreck),
          shL: lerp(36, 68, wreck),
          shR: lerp(40, 62, wreck),
          elL: lerp(24, 82, wreck),
          elR: lerp(20, 78, wreck),
          hipL: 48, hipR: 38, knL: 72, knR: 64,
          breathe: 0.8,
        };

  // Walt stays planted at WALT_POS, left arm cradling the crystal bag at chest, right forearm braced against blast wave
  const brace = Math.sin(clamp(post / 20) * Math.PI);
  const poseW: Pose = {
    torso: 3 - 4 * brace,
    neck: -2 + 3 * brace,
    shL: 28,
    shR: lerp(28, 36, brace),
    elL: 58,
    elR: lerp(44, 62, brace),
    hipL: 7, hipR: -6, knL: 6, knR: 7,
    breathe: 0.55,
    slump: 0.12,
  };
  const anc = rigAnchors(poseW, TEACHER.height, 0.56);
  const dustAmt = clamp(post / 38);

  const pBlast = project(cam, -0.35, 0.55, 2.95);
  const pWin = project(cam, -2.15, 1.7, GX.zBack - 0.3);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="boomFlash">
            <stop offset="0" stopColor="#fffbe0" stopOpacity={0.95} />
            <stop offset="0.4" stopColor="#ffe09c" stopOpacity={0.55} />
            <stop offset="1" stopColor="#ffb868" stopOpacity={0} />
          </radialGradient>
        </defs>

        <GarageRoom cam={cam} f={g} burst={burst} wreck={wreck} swing={swing} fore={false} />

        {/* Intact chair ONLY before blast; after blast, splintered chair pieces fly outward */}
        {g < BLAST + 2 ? (
          <Chair cam={cam} x={DESK.x + 0.36} z={DESK.z + 0.74} />
        ) : (
          <ChairWreck cam={cam} k={wreck} />
        )}

        {/* Distributor knocked backward/down behind the desk */}
        <Card
          cam={cam}
          x={DESK.x + 0.36 + 0.22 * wreck}
          y={-0.48 * wreck}
          z={DESK.z + 0.74 + 0.18 * wreck}
          flip
          blur={false}
        >
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.18, lids: 0.08,
              lookX: 0.3, lookY: 0.2,
              brow: 0.75, mouth: "open", mouthOpen: 0.45,
            })}
            pal={lerpPal(DIST.pal as any, PAL_DIST_DUST as any, dustAmt)}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>

        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} wreck={wreck} />
        <ContinuityProps cam={cam} wreck={wreck} />

        {/* Concussive mercury shock-flash & billowing plaster smoke */}
        {g >= BLAST && (
          <g>
            <ellipse
              cx={pBlast.x}
              cy={pBlast.y}
              rx={3.4 * pBlast.s}
              ry={2.3 * pBlast.s}
              fill="url(#boomFlash)"
              opacity={clamp(post / 4) * (1 - clamp(post / 22))}
            />
            <Puff x={pBlast.x} y={pBlast.y - 0.3 * pBlast.s} r={(0.8 + 2.4 * clamp(post / 42)) * pBlast.s * 0.55} o={0.52 * (1 - clamp(post / 55))} seed={3} />
            <Puff x={pWin.x} y={pWin.y} r={(0.7 + 2.1 * clamp(post / 48)) * pWin.s * 0.55} o={0.44 * (1 - clamp(post / 62))} seed={9} />
            <Dust cam={cam} f={g} n={42} x0={-3.8} x1={3.8} z0={1.4} z1={4.4} h={2.8} seed={12} color="#e6ddc6" />
          </g>
        )}

        {/* Walt planted at exact same floor position, cradling the open bag of remaining crystals */}
        <Card cam={cam} x={WALT_POS.x} y={0} z={WALT_POS.z} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.42} />
          <g transform={`translate(${anc.wristL.x + 0.055},${anc.wristL.y + 0.025})`}>
            <HeldBag scale={0.95} />
          </g>
          <Figure
            pose={poseW}
            view={0.56}
            look={teacherLook({
              yaw: 0.2, lids: brace > 0.4 ? 0.38 : 0.14,
              lookX: 0.35, lookY: 0.02,
              brow: 0.12, mouth: "flat",
            })}
            pal={lerpPal(PAL_T, PAL_T_DUST, dustAmt)}
            height={TEACHER.height}
            rimLight="#ffe6b0"
            rimSide={1}
          />
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={34} color="#ffe9c0" seed={7} drift={1.5} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.08} shadow="#261808" gradeO={0.18} />
      <AbsoluteFill
        style={{
          background: "#fff0c4",
          opacity: clamp(post / 4) * (1 - clamp(post / 14)) * 0.58,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "And Walter stays exactly where he is standing, because the standing is the point." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.end - CUTS.s4;
  const t = f / dur;

  // Starts from S1's exact framing, then pushes steadily toward dust-coated Walt
  const push = easeInOut(t);
  const cam: Cam = {
    x: lerp(-0.42, -0.62, push),
    y: lerp(1.42, 1.46, push),
    z: lerp(1.05, 1.46, push),
    f: lerp(1360, 1480, push),
    shiftY: lerp(36, 42, push),
    focus: lerp(2.7, 1.4, push),
    aperture: 0.3,
  };

  const post = g - BLAST;
  const swing = Math.sin(post * 0.22) * Math.exp(-post * 0.014) * 0.85;
  const haulUp = prog(g, B(592.0), B(595.5), easeOut);
  const showBag = prog(g, B(594.0), B(596.0), easeInOut);

  // Stunned, dust-covered distributor hauling himself partway up behind the desk corner
  const poseD: Pose = {
    torso: lerp(-22, 8, haulUp),
    neck: lerp(10, -4, haulUp),
    shL: 22,
    shR: 38,
    elL: 46,
    elR: 22,
    hipL: 42, hipR: 34, knL: 68, knR: 62,
    breathe: breath(g, 0.11),
  };

  // Walt hasn't moved a millimetre from WALT_POS; lifts the open bag of remaining crystals slightly
  const poseW: Pose = {
    torso: 4,
    neck: -2,
    shL: lerp(28, 32, showBag),
    shR: lerp(24, 34, showBag),
    elL: lerp(58, 52, showBag),
    elR: lerp(48, 40, showBag),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.065, 1),
    slump: 0.1,
  };
  const anc = rigAnchors(poseW, TEACHER.height, 0.56);
  const pSmoke = project(cam, -2.0, 1.75, GX.zBack - 0.45);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} burst={1} wreck={1} swing={swing} fore={false} />
        <ChairWreck cam={cam} k={1} />

        {/* Stunned distributor clawing up behind the desk */}
        <Card cam={cam} x={DESK.x + 0.56} y={lerp(-0.42, -0.24, haulUp)} z={DESK.z + 0.88} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.55}
            look={distLook({
              yaw: 0.18,
              lids: lerp(0.42, 0.16, haulUp) + blink(g, 7) * 0.35,
              lookX: 0.36, lookY: -0.04,
              brow: 0.65, mouth: "open", mouthOpen: 0.2,
            })}
            pal={PAL_DIST_DUST as any}
            height={DIST.height}
            rimLight="#ffe6b0"
            rimSide={-1}
          />
        </Card>

        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} wreck={1} />
        <ContinuityProps cam={cam} wreck={1} />

        {/* Residual smoke & plaster dust drifting through blown-out daylight shafts */}
        <Puff x={pSmoke.x} y={pSmoke.y} r={(1.1 + 0.25 * Math.sin(g * 0.03)) * pSmoke.s * 0.5} o={0.22 * (1 - 0.35 * push)} seed={5} />
        <Dust cam={cam} f={g} n={28} x0={-3.5} x1={3.5} z0={1.3} z1={4.2} h={2.6} seed={15} color="#e6ddc6" />

        {/* Walt at exact same coordinates WALT_POS, holding the bag of remaining mercury crystals */}
        <Card cam={cam} x={WALT_POS.x} y={0} z={WALT_POS.z} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.42} />
          <g transform={`translate(${anc.wristL.x + 0.06},${anc.wristL.y + 0.02})`}>
            <HeldBag scale={0.98} />
          </g>
          <Figure
            pose={poseW}
            view={0.56}
            look={teacherLook({
              yaw: 0.2, lids: 0.14 + blink(g, 3) * 0.42,
              lookX: 0.34, lookY: 0.03,
              brow: 0.08, mouth: "flat",
            })}
            pal={PAL_T_DUST}
            height={TEACHER.height}
            rimLight="#ffe8b8"
            rimSide={1}
          />
          {/* Small glass-nick blood trace at collar matching s039 continuity */}
          <path d="M0.035,-1.445 L0.044,-1.425 L0.031,-1.422 Z" fill="#8b1e1e" opacity={0.85} />
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={28} color="#e8dfc8" seed={9} drift={1.1} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.075} shadow="#241708" gradeO={0.18} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2a - CUTS.s1} name="S1 the decision"><S1 /></Sequence>
    <Sequence from={CUTS.s2a} durationInFrames={CUTS.s2b - CUTS.s2a} name="S2a the throw"><S2a /></Sequence>
    <Sequence from={CUTS.s2b} durationInFrames={CUTS.s3 - CUTS.s2b} name="S2b like gravel"><S2b /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 the blast"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.end - CUTS.s4} name="S4 the standing"><S4 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(580.1)} durationInFrames={40}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.09} /></Sequence>
    <Sequence from={B(584.55)} durationInFrames={40}><Audio src={staticFile("sfx/b_crystal_tink.wav")} volume={0.085} /></Sequence>
    <Sequence from={BLAST} durationInFrames={90}><Audio src={staticFile("sfx/b_explosion.wav")} volume={0.15} /></Sequence>
    <Sequence from={BLAST + 20} durationInFrames={120}><Audio src={staticFile("sfx/b_car_alarms.wav")} volume={0.055} /></Sequence>
  </AbsoluteFill>
);
