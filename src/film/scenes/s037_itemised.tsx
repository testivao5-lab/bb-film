// SCENE 037 · "itemised" · set: garage · 557.11s → 577.07s (19.96s) · batch B (rev2)
// Narration: "Tuko laughs. It's a good joke. It is not a joke, and the reason is the itemisation.
//   '$35 for the pound you stole, $15 for my partner's pain and suffering.' That sentence does two jobs;
//   it tells a man with a knife how the debt was calculated, and it says that the man opposite him is the
//   sort who calculates debts."
// Staging (rev2 per LEAD_NOTES rounds 1 & 2):
//   S1 (557.11–559.00) Medium-close on distributor behind the cluttered desk: barking laugh dies abruptly
//                      as he catches Walt's flat stare; Walt's near shoulder frames the left edge.
//   S2 (559.00–561.85) Medium two-shot: Walt unfolds a cream notepad sheet in his hands (parented via
//                      rigAnchors) and lays it flat onto the desk; distributor leans forward over the wood.
//   S3 (561.85–567.30) Steep close-up desk insert: two articulated close-up hands (4 fingers + thumb,
//                      wrist, cuff, sleeve); right hand grips a ballpoint pen writing vector numerals 35,
//                      15, sum bar & circled 50 (no readable words, shorthand scribble waves only), then
//                      taps the total while the distributor's open knife waits at upper-right.
//   S4 (567.30–572.60) Clean medium-close over-the-shoulder on the distributor (full headroom, zero neck
//                      crop): leaning on both forearms over the sheet, knife tip tapping rhythmically on
//                      the wood until the tap stops and his eyes lift slowly onto Walt.
//   S5 (572.60–577.07) Medium two-shot: distributor pushes the knife flat and leans back into his chair;
//                      Walt pockets his pen and rests his hand calmly on the bag strap.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, blink, breath } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, restaurateurLook, tint, mixHex } from "../../rig/cast";
import { GarageRoom, GarageFore, Desk, DeskKit, Chair } from "../../env/b_garage";
import { SoftDefs } from "../../env/b_common";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 37, id: "itemised", set: "garage", cutIn: 557.11, cutOut: 577.07 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(577.07);
const CUTS = { s1: 0, s2: B(559.0), s3: B(561.85), s4: B(567.3), s5: B(572.6), end: END };

const DESK = { x: 0.1, z: 3.5, w: 2.1, d: 1.0 };
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
const distLook = (o: any = {}) => restaurateurLook({ hair: DIST.hair, beard: "mustache", age: 0.5, lips: "#8a5a48", ...o });
const deskSit = (o: Partial<Pose> = {}) => chairSit({ hipL: 62, hipR: 64, knL: 96, knR: 98, ...o });

/** Continuity duffel bag on the desk */
const DuffelBag: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0.014} rx={0.24} ry={0.052} fill="#000" opacity={0.34} />
    <path d="M-0.21,0.008 L-0.18,-0.125 C-0.15,-0.18 0.15,-0.18 0.18,-0.125 L0.21,0.008 Z" fill="#3b4652" stroke="#161b20" strokeWidth={0.007} />
    <path d="M-0.085,0.006 L-0.075,-0.16 M0.085,0.006 L0.075,-0.16" stroke="#252c33" strokeWidth={0.02} />
    <ellipse cx={0} cy={-0.15} rx={0.12} ry={0.025} fill="#0f1419" />
    <ellipse cx={0} cy={-0.146} rx={0.075} ry={0.013} fill="#4dc6e8" opacity={0.65} />
  </g>
);

/** Folded ledger sheet with pure vector ink numerals (35, 15, sum bar, circled 50) + illegible scribble waves */
const Sheet: React.FC<{ a: number; c: number; underline: number; tot: number; scale?: number }> = ({ a, c, underline, tot, scale = 1 }) => (
  <g transform={`scale(${scale}) rotate(-3)`}>
    {/* drop shadow + cream ruled paper */}
    <rect x={-0.156} y={-0.104} width={0.32} height={0.22} fill="#000" opacity={0.24} />
    <rect x={-0.16} y={-0.11} width={0.32} height={0.22} fill="#f4efe0" stroke="#8f8879" strokeWidth={0.0022} />
    {/* horizontal ruling + vertical margin rule + fold creases */}
    {[-0.075, -0.045, -0.015, 0.015, 0.045, 0.075].map((ry, i) => (
      <line key={i} x1={-0.156} y1={ry} x2={0.156} y2={ry} stroke="#cbd5dc" strokeWidth={0.0012} opacity={0.75} />
    ))}
    <line x1={-0.118} y1={-0.108} x2={-0.118} y2={0.108} stroke="#d99b96" strokeWidth={0.0013} opacity={0.65} />
    <path d="M-0.16,-0.002 L0.16,-0.004 M0,-0.11 L0.002,0.11" stroke="#ddd5c1" strokeWidth={0.0018} />

    {/* Line 1: shorthand scribble wave + vector "35" */}
    {a > 0.02 && (
      <g opacity={clamp(a * 1.6)}>
        <path
          d={`M-0.105,-0.054 q0.011,-0.011 0.021,0 t0.021,0 t0.021,0 t0.021,0 L${lerp(-0.02, 0.028, a)},-0.054`}
          stroke="#252c44"
          strokeWidth={0.0032}
          fill="none"
          strokeLinecap="round"
        />
        {a > 0.45 && (
          <g transform="translate(0.068,-0.068)" stroke="#1f2742" strokeWidth={0.0036} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* numeral 3 */}
            <path d="M0,0.003 C0.008,-0.003 0.018,0.001 0.015,0.009 C0.012,0.014 0.006,0.014 0.004,0.014 C0.014,0.015 0.019,0.023 0.014,0.029 C0.009,0.034 0.001,0.032 -0.002,0.028" />
            {/* numeral 5 */}
            <path d="M0.041,0.002 L0.027,0.002 L0.025,0.014 C0.032,0.011 0.043,0.015 0.041,0.025 C0.039,0.032 0.029,0.034 0.024,0.029" />
          </g>
        )}
        {underline > 0.02 && (
          <path d={`M-0.106,-0.036 L${lerp(-0.106, 0.115, underline)},-0.037`} stroke="#252c44" strokeWidth={0.0022} strokeLinecap="round" opacity={0.85} />
        )}
      </g>
    )}

    {/* Line 2: "+" + shorthand scribble + vector "15" */}
    {c > 0.02 && (
      <g opacity={clamp(c * 1.6)}>
        <path d="M-0.138,0.002 L-0.126,0.002 M-0.132,-0.004 L-0.132,0.008" stroke="#252c44" strokeWidth={0.0026} strokeLinecap="round" />
        <path
          d={`M-0.105,0.004 q0.01,-0.01 0.019,0 t0.019,0 t0.019,0 L${lerp(-0.048, 0.018, c)},0.004`}
          stroke="#252c44"
          strokeWidth={0.0032}
          fill="none"
          strokeLinecap="round"
        />
        {c > 0.45 && (
          <g transform="translate(0.068,-0.01)" stroke="#1f2742" strokeWidth={0.0036} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* numeral 1 */}
            <path d="M0.004,0.007 L0.009,0.001 L0.009,0.031 M0.003,0.031 L0.015,0.031" />
            {/* numeral 5 */}
            <path d="M0.041,0.002 L0.027,0.002 L0.025,0.014 C0.032,0.011 0.043,0.015 0.041,0.025 C0.039,0.032 0.029,0.034 0.024,0.029" />
          </g>
        )}
      </g>
    )}

    {/* Sum bar + vector "50" + hand-drawn circle */}
    {tot > 0.02 && (
      <g opacity={clamp(tot * 1.6)}>
        <path d={`M0.048,0.032 L${lerp(0.048, 0.122, clamp(tot * 2))},0.031`} stroke="#192347" strokeWidth={0.003} strokeLinecap="round" />
        {tot > 0.3 && (
          <g transform="translate(0.066,0.045)" stroke="#192347" strokeWidth={0.0042} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* numeral 5 */}
            <path d="M0.017,0.002 L0.003,0.002 L0.001,0.015 C0.008,0.012 0.02,0.016 0.018,0.027 C0.016,0.034 0.005,0.036 0,0.03" />
            {/* numeral 0 */}
            <ellipse cx={0.035} cy={0.018} rx={0.009} ry={0.015} />
          </g>
        )}
        {tot > 0.55 && (
          <ellipse
            cx={0.088}
            cy={0.063}
            rx={0.042}
            ry={0.024}
            fill="none"
            stroke="#192347"
            strokeWidth={0.0028}
            transform="rotate(-5 0.088 0.063)"
          />
        )}
      </g>
    )}
  </g>
);

/** Open folding lockback knife lying on the desk; `tap` lifts & drops the blade tip */
const DeskKnife: React.FC<{ tap: number; rot?: number }> = ({ tap, rot = -10 }) => {
  const liftDeg = -7 * Math.abs(Math.sin(tap));
  return (
    <g transform={`rotate(${rot})`}>
      <ellipse cx={0.04} cy={0.01} rx={0.13} ry={0.018} fill="#000" opacity={0.28} />
      <g transform={`rotate(${liftDeg})`}>
        {/* walnut & brass handle */}
        <rect x={-0.095} y={-0.013} width={0.115} height={0.026} rx={0.007} fill="#3d2e22" stroke="#171310" strokeWidth={0.0032} />
        <rect x={-0.002} y={-0.014} width={0.024} height={0.028} rx={0.003} fill="#9ca5ad" stroke="#171310" strokeWidth={0.0028} />
        <circle cx={-0.065} cy={0} r={0.0032} fill="#c4a45e" />
        <circle cx={-0.03} cy={0} r={0.0032} fill="#c4a45e" />
        {/* steel clip-point blade */}
        <path d="M0.022,-0.011 L0.155,-0.013 L0.185,-0.002 L0.15,0.01 L0.022,0.011 Z" fill="#cfd9e0" stroke="#39434c" strokeWidth={0.003} strokeLinejoin="round" />
        <path d="M0.026,-0.007 L0.168,-0.004" stroke="#f5fcff" strokeWidth={0.0035} opacity={0.85} />
      </g>
    </g>
  );
};

/* ─────────── S1 · medium-close on distributor: "Tuko laughs. It's a good joke." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.1, 0.05, easeInOut(t)),
    y: 1.36,
    z: lerp(1.98, 1.88, easeInOut(t)),
    f: 1420, shiftY: -135, focus: 2.2, aperture: 0.3,
  };
  const stop = prog(g, B(558.45), B(558.95), easeIn);
  const shake = Math.sin(f * 0.62) * (1 - stop);

  // Distributor (view=0.55 > 0.5 + flip): rocks with laughter, then abruptly leans forward onto forearms
  const poseD: Pose = deskSit({
    torso: lerp(-15, 7, stop) + 2.5 * shake,
    neck: lerp(-13, -3, stop) - 2 * shake,
    shL: lerp(-8, 26, stop),
    shR: lerp(34, 34, stop),
    elL: lerp(52, 28, stop),
    elR: lerp(20, 22, stop),
    breathe: 0.55 + 0.35 * Math.abs(shake),
  });

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
              yaw: 0.18,
              lids: lerp(0.04, 0.3, stop),
              lookX: lerp(0.18, 0.32, stop),
              lookY: lerp(-0.08, 0.05, stop),
              brow: lerp(0.28, 0.48, stop),
              mouth: stop > 0.62 ? "flat" : "laugh",
              mouthOpen: (0.5 + 0.48 * Math.abs(Math.sin(f * 0.58))) * (1 - stop),
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.14} y={0.785} z={3.38} blur={false}><DuffelBag /></Card>
        <Card cam={cam} x={0.22} y={0.786} z={3.58} blur={false}><DeskKnife tap={0} rot={-155} /></Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={4} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · medium two-shot: "It is not a joke, and the reason is the itemisation." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.38, -0.3, easeInOut(t)),
    y: 1.42,
    z: lerp(1.18, 1.32, easeInOut(t)),
    f: 1420, shiftY: 38, focus: 2.6, aperture: 0.3,
  };
  const drawOut = prog(g, B(559.05), B(560.15), easeOut);
  const layDown = prog(g, B(560.45), B(561.65), easeInOut);
  const speakW = g > B(559.1) && g < B(561.55) ? 0.5 + 0.5 * Math.abs(Math.sin(g * 0.52)) : 0;

  const poseD: Pose = deskSit({
    torso: lerp(7, 11, layDown),
    neck: lerp(-3, 5, layDown),
    shL: 26,
    shR: 34,
    elL: 28,
    elR: 22,
    breathe: breath(g, 0.08),
  });

  // Walt draws the folded cream notepad sheet from his coat and lays it flat on the desk
  const poseW: Pose = {
    torso: lerp(5, 13, layDown),
    neck: lerp(-2, 6, layDown),
    shL: lerp(-12, 24, drawOut * (1 - 0.5 * layDown)),
    shR: lerp(20, 38, drawOut) + 4 * layDown,
    elL: lerp(50, 40, drawOut),
    elR: lerp(66, 44, drawOut) - 28 * layDown,
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.075, 1),
    slump: 0.15,
  };

  const anc = rigAnchors(poseW, TEACHER.height, 0.58);
  const onDesk = layDown > 0.82;

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
              yaw: 0.18, lids: 0.32 + blink(g, 8) * 0.4,
              lookX: 0.3, lookY: lerp(0.05, 0.28, layDown),
              brow: 0.48, mouth: "flat",
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.06} y={0.785} z={3.34} blur={false}><DuffelBag /></Card>
        <Card cam={cam} x={0.22} y={0.786} z={3.58} blur={false}><DeskKnife tap={0} rot={-155} /></Card>

        {/* Sheet resting on desk once laid down */}
        {onDesk && (
          <Card cam={cam} x={-0.44} y={0.786} z={3.18} blur={false}>
            <Sheet a={0} c={0} underline={0} tot={0} scale={0.62} />
          </Card>
        )}

        <Card cam={cam} x={-0.88} y={0} z={2.84} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2, lids: 0.16 + blink(g, 3) * 0.45,
              lookX: 0.35, lookY: lerp(0.05, 0.28, layDown),
              brow: 0.1,
              mouth: speakW > 0 ? "open" : "flat",
              mouthOpen: 0.16 * speakW,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
          {/* Continuity prop: the cream sheet in Walt's right hand until it touches the desktop */}
          {!onDesk && (
            <g transform={`translate(${anc.wristR.x + 0.045},${anc.wristR.y + 0.02}) rotate(${lerp(-38, -8, layDown)})`}>
              <rect x={-0.065} y={-0.045} width={0.13 * lerp(0.65, 1, drawOut)} height={0.09} fill="#f4efe0" stroke="#8f8879" strokeWidth={0.003} />
              <line x1={-0.055} y1={-0.015} x2={0.045} y2={-0.015} stroke="#cbd5dc" strokeWidth={0.002} />
            </g>
          )}
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={8} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · close-up desk insert: "$35 for the pound... $15 for my partner's..." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.3, -0.25, easeInOut(t)),
    y: 1.18,
    z: lerp(2.34, 2.26, easeInOut(t)),
    f: 1950, shiftY: -770, focus: 0.9, aperture: 0.3,
  };

  const a = clamp((g - B(561.95)) / (B(562.85) - B(561.95)));
  const underline = clamp((g - B(563.25)) / (B(563.75) - B(563.25)));
  const c = clamp((g - B(564.25)) / (B(565.15) - B(564.25)));
  const tot = clamp((g - B(565.35)) / (B(566.15) - B(565.35)));
  const tapPhase = clamp((g - B(566.25)) / 26);
  const tapBounce = tapPhase > 0 ? Math.abs(Math.sin(tapPhase * Math.PI * 2.2)) * 0.018 : 0;

  // Pen tip trajectory across line 1 -> line 2 -> total -> double tap
  let penX = lerp(-0.1, 0.095, a);
  let penY = -0.052 + 0.004 * Math.sin(f * 0.7) * (a > 0 && a < 1 ? 1 : 0);
  if (g >= B(563.2) && g < B(564.1)) {
    penX = lerp(-0.1, 0.11, underline);
    penY = -0.035;
  } else if (g >= B(564.1) && g < B(565.3)) {
    penX = lerp(-0.1, 0.095, c);
    penY = 0.006 + 0.004 * Math.sin(f * 0.7) * (c > 0 && c < 1 ? 1 : 0);
  } else if (g >= B(565.3)) {
    penX = lerp(0.065, 0.095, tot);
    penY = 0.062 - tapBounce;
  }

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <GarageRoom cam={cam} f={g} fore={false} />
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />

        {/* Waiting open knife near upper-right corner of frame */}
        <Card cam={cam} x={0.07} y={0.786} z={3.28} blur={false}>
          <DeskKnife tap={0} rot={-152} />
        </Card>

        {/* Itemised ledger sheet + TWO articulated close-up hands */}
        <Card cam={cam} x={-0.34} y={0.786} z={3.16} blur={false}>
          <Sheet a={a} c={c} underline={underline} tot={tot} scale={1} />

          {/* Walt's left hand steadying the lower-left edge of the paper (4 fingers + thumb + cuff + sleeve) */}
          <g transform="translate(-0.195,0.062) rotate(36) scale(-0.76,0.76)">
            <HandBack pal={PAL_T} curl={0.18} thumb={0.4} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.62} />
          </g>

          {/* Walt's right hand gripping a ballpoint pen, writing & tapping the figures */}
          <g transform={`translate(${penX + 0.096},${penY + 0.106}) rotate(-32) scale(0.8)`}>
            {/* ballpoint pen barrel + brass nib */}
            <g transform="translate(-0.048,-0.072) rotate(-32)">
              <rect x={-0.0055} y={-0.055} width={0.011} height={0.165} rx={0.003} fill="#253b59" stroke="#101824" strokeWidth={0.0025} />
              <rect x={-0.0055} y={-0.055} width={0.011} height={0.032} fill="#aeb8c2" stroke="#101824" strokeWidth={0.002} />
              <polygon points="-0.004,-0.055 0.004,-0.055 0,-0.074" fill="#c9ae6a" stroke="#101824" strokeWidth={0.0018} />
              <circle cx={0} cy={-0.075} r={0.0018} fill="#192347" />
            </g>
            <HandBack pal={PAL_T} curl={0.76} thumb={0.85} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.62} />
          </g>
        </Card>

        <Motes f={g} n={14} color="#ffe9c0" seed={2} drift={0.4} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.07} shadow="#1a1208" gradeO={0.14} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · medium-close on distributor: knife taps, eyes lift from sheet to Walt ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.08, 0.03, easeInOut(t)),
    y: 1.36,
    z: lerp(1.98, 1.88, easeInOut(t)),
    f: 1420, shiftY: -135, focus: 2.2, aperture: 0.3,
  };
  const up = prog(g, B(570.6), B(572.1), easeInOut);
  const tapping = 1 - prog(g, B(570.3), B(570.8), easeOut);
  const tapArg = f * 0.22 * tapping;

  const poseD: Pose = deskSit({
    torso: lerp(10, 5, up),
    neck: lerp(7, -3, up),
    shL: 28,
    shR: 36,
    elL: 26,
    elR: 20 + 2 * Math.abs(Math.sin(tapArg)),
    breathe: breath(g, 0.08),
  });

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
              yaw: 0.18,
              lids: lerp(0.36, 0.24, up) + blink(g, 9) * 0.4,
              lookX: lerp(0.18, 0.34, up),
              lookY: lerp(0.34, 0.02, up),
              brow: lerp(0.5, 0.28, up),
              mouth: "flat",
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.02} y={0.785} z={3.42} blur={false}><DuffelBag /></Card>
        <Card cam={cam} x={-0.3} y={0.786} z={3.44} blur={false}>
          <Sheet a={1} c={1} underline={1} tot={1} scale={0.66} />
        </Card>
        {/* Tapping folding knife right in front of the distributor's right hand on the wood */}
        <Card cam={cam} x={0.24} y={0.788} z={3.58} blur={false}>
          <DeskKnife tap={tapArg} rot={-154} />
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={16} color="#ffe9c0" seed={7} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.07} shadow="#1a1208" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · medium two-shot: "...is the sort who calculates debts." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.34, -0.26, easeInOut(t)),
    y: 1.42,
    z: lerp(1.16, 1.32, easeInOut(t)),
    f: 1400, shiftY: 38, focus: 2.7, aperture: 0.3,
  };
  const flat = prog(g, B(573.2), B(575.0), easeOut);
  const tuck = prog(g, B(572.8), B(574.6), easeInOut);
  const rest = prog(g, B(574.6), B(576.2), easeInOut);

  // Distributor pushes the knife aside and settles back into his leather chair
  const poseD: Pose = deskSit({
    torso: lerp(7, -8, flat),
    neck: lerp(-2, 3, flat),
    shL: lerp(28, -8, flat),
    shR: lerp(36, 26, flat),
    elL: lerp(26, 48, flat),
    elR: lerp(20, 30, flat),
    breathe: breath(g, 0.075),
  });

  // Walt pockets his pen, then rests his right hand calmly on the duffel bag strap
  const poseW: Pose = {
    torso: lerp(6, 4, rest),
    neck: -2,
    shL: -16,
    shR: lerp(lerp(32, 18, tuck), 32, rest),
    elL: 48,
    elR: lerp(lerp(24, 66, tuck), 18, rest),
    hipL: 6, hipR: -5, knL: 5, knR: 6,
    breathe: breath(g, 0.07, 1.4),
    slump: 0.14,
  };

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
              yaw: 0.18, lids: 0.32 + blink(g, 5) * 0.4,
              lookX: 0.32, lookY: 0.04, brow: 0.24, mouth: "flat",
            })}
            pal={DIST.pal}
            height={DIST.height}
            rimLight="#ffd58a"
            rimSide={-1}
          />
        </Card>
        <Desk cam={cam} x={DESK.x} z={DESK.z} w={DESK.w} d={DESK.d} />
        <DeskKit cam={cam} x={DESK.x} z={DESK.z} f={g} />
        <Card cam={cam} x={-0.06} y={0.785} z={3.34} blur={false}><DuffelBag /></Card>
        <Card cam={cam} x={-0.44} y={0.786} z={3.18} blur={false}>
          <Sheet a={1} c={1} underline={1} tot={1} scale={0.62} />
        </Card>
        {/* Knife pushed flat and rotated away from Walt */}
        <Card cam={cam} x={lerp(0.14, 0.3, flat)} y={0.786} z={lerp(3.58, 3.68, flat)} blur={false}>
          <DeskKnife tap={0} rot={lerp(-154, -95, flat)} />
        </Card>

        <Card cam={cam} x={-0.88} y={0} z={2.84} blur={false}>
          <ellipse cx={0.02} cy={0.008} rx={0.32} ry={0.065} fill="#1b1510" opacity={0.4} />
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.2, lids: 0.18 + blink(g, 4) * 0.45,
              lookX: 0.34, lookY: 0.04, brow: 0.06, mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd58a"
            rimSide={1}
          />
        </Card>

        <GarageFore cam={cam} f={g} />
        <Motes f={g} n={18} color="#ffe9c0" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.66} grain={0.07} shadow="#1a1208" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 the laugh"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 not a joke"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 the sheet"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 the knife reads"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 laid flat"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(561.9)} durationInFrames={30}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
    <Sequence from={B(564.25)} durationInFrames={26}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.065} /></Sequence>
    <Sequence from={B(568.2)} durationInFrames={70}><Audio src={staticFile("sfx/b_thunk.wav")} volume={0.045} /></Sequence>
  </AbsoluteFill>
);
