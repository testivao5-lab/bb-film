// SCENE 052 · "gus-offer" · set: pollos · narration 835.06s → 857.67s (22.61s) · batch B
// Narration:
//   By now, a man with very good manners has noticed the product. Gustavo Fring runs a fried chicken
//   chain, gives money to good causes in public, and is unfailingly polite. He is the most frightening
//   man Walter White will ever meet, and those two facts are not in tension. He buys the entire output.
//   It's a good offer. The cost is that Walter decides nothing.
// Staging:
//   S1 (835.06–839.75) Sunlit table insert: immaculate slate-suited hands smooth a crisp linen napkin
//                      ("very good manners"), then hold a clear pouch of sky-blue crystal shards into a
//                      sunbeam ("has noticed the product").
//   S2 (839.75–845.95) Vibrant 3-layer fried-chicken restaurant ("runs a fried chicken chain, gives money
//                      to good causes in public, and is unfailingly polite"): the Restaurateur drops bills
//                      into the counter charity canister, carries a basket of golden chicken to Walt's
//                      booth, and bows his head with a warm courteous smile.
//   S3 (845.95–851.45) Chilling push-in on the Restaurateur's face ("the most frightening man Walter White
//                      will ever meet, and those two facts are not in tension"): at 847.2s his warm smile
//                      switches off in an instant while a window mullion splits his face half in golden
//                      sunlight, half in cold slate shadow.
//   S4 (851.45–855.15) Across-the-booth two-shot ("He buys the entire output. It's a good offer"): he
//                      slides a thick cream offer envelope smoothly across the table to Walt and folds his
//                      hands calmly while Walt leans in eagerly.
//   S5 (855.15–857.67) Power-shift finale ("The cost is that Walter decides nothing"): the Restaurateur
//                      stands tall, buttoning his suit jacket with quiet authority as his shadow falls
//                      across seated Walt in the booth below.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, blink } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook, mixHex, tint } from "../../rig/cast";
import { PollosSet, PollosBooth, PollosTableTop, PollosFore } from "../../env/b_pollos";
import { Crystal } from "../../props/b_props";
import { SoftDefs } from "../../env/b_common";
import { chairSit, walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 52, id: "gus-offer", set: "pollos", cutIn: 835.06, cutOut: 857.67 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(857.67);
const CUTS = {
  s1: 0,
  s2: B(839.75),
  s3: B(845.95),
  s4: B(851.45),
  s5: B(855.15),
  end: END,
};

const warmTint = (pal: typeof TEACHER.pal) =>
  tint(pal, (c) => (c.startsWith("#") ? mixHex(c, "#ffe3b3", 0.08) : c));

const PAL_T = warmTint(TEACHER.pal);
const PAL_R = warmTint(RESTAURATEUR.pal);

/* ─────────── S1 · "By now, a man with very good manners has noticed the product." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  // First smooth the white napkin (0→65), then bring the clear pouch of blue crystals into the sunbeam (68→135)
  const smoothNapkin = prog(g, B(835.6), B(837.55), easeInOut);
  const liftPouch = prog(g, B(837.65), B(838.95), easeOut);
  const glint = Math.sin(clamp((g - B(838.35)) / 24) * Math.PI);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Clean cream-gold restaurant tabletop bathed in diagonal Albuquerque sunlight */}
        <rect x={0} y={0} width={W} height={H} fill="#d9cbb0" />
        <rect x={0} y={885} width={W} height={38} fill="#a83226" />
        <polygon points="320,0 1480,0 1120,1080 40,1080" fill="#fff9e3" opacity={0.42} />

        {/* Immaculately folded crisp white napkin + aligned stainless fork & knife */}
        <g transform="translate(650,535)">
          <rect x={-215} y={-265} width={430} height={530} rx={8} fill="#000" opacity={0.14} />
          <rect x={-222} y={-272} width={430} height={530} rx={8} fill="#faf9f5" stroke="#c4bfb2" strokeWidth={4} />
          <line x1={-218} y1={0} x2={204} y2={0} stroke="#e3ded2" strokeWidth={3} />
          {/* Stainless fork & knife aligned to the millimetre */}
          <rect x={-115} y={-195} width={12} height={380} rx={5} fill="#9aa4b0" stroke="#363d45" strokeWidth={3} />
          <rect x={-127} y={-225} width={36} height={55} rx={4} fill="#9aa4b0" stroke="#363d45" strokeWidth={3} />
          <rect x={85} y={-215} width={14} height={400} rx={6} fill="#9aa4b0" stroke="#363d45" strokeWidth={3} />
          <path d="M85,-215 C115,-215 118,-75 99,-55 L85,-55 Z" fill="#b4bec9" stroke="#363d45" strokeWidth={3} />
        </g>

        {/* Left manicured slate-suited hand smoothing the white napkin ("very good manners") */}
        <g
          transform={`translate(${lerp(360, 485, smoothNapkin)},${lerp(745, 675, smoothNapkin)}) rotate(28) scale(-2380,2380)`}
        >
          <HandBack
            pal={RESTAURATEUR.pal}
            curl={0.22}
            thumb={0.38}
            sleeve={RESTAURATEUR.pal.jacket}
            sleeveShade={RESTAURATEUR.pal.jacketShade}
            cuff={RESTAURATEUR.pal.shirt}
            forearm={0.82}
          />
        </g>

        {/* Clear sample pouch filled with pure sky-blue crystal shards held into the sunbeam ("noticed the product") */}
        <g
          transform={`translate(${lerp(1540, 1185, liftPouch)},${lerp(690, 445, liftPouch)}) rotate(${lerp(16, -6, liftPouch)})`}
          opacity={clamp(liftPouch * 1.4)}
        >
          <rect x={-175} y={-205} width={350} height={390} rx={12} fill="#dff2ff" opacity={0.58} stroke="#6d8ca6" strokeWidth={4} />
          <line x1={-170} y1={-160} x2={170} y2={-160} stroke="#368ee0" strokeWidth={7} />
          {/* Large faceted sky-blue crystal shards gleaming inside the clear pouch */}
          {[
            [-68, 55, 1.05, -24],
            [42, 68, 1.18, 18],
            [-12, -18, 1.25, 32],
            [68, -22, 0.95, -38],
            [-75, -34, 0.92, 14],
            [5, 92, 0.88, 54],
          ].map(([cx, cy, sc, rot], i) => (
            <g key={i} transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
              <polygon points="-24,-48 18,-56 38,8 8,52 -32,34" fill="#3da5eb" stroke="#16466b" strokeWidth={3.5} />
              <polygon points="-24,-48 18,-56 4,-4 -18,12" fill="#9be0ff" />
              <polygon points="18,-56 38,8 8,52 4,-4" fill="#1e75b8" />
            </g>
          ))}
          {glint > 0.1 && (
            <g stroke="#ffffff" strokeWidth={4.5} opacity={glint}>
              <line x1={-52} y1={-18} x2={28} y2={-18} />
              <line x1={-12} y1={-58} x2={-12} y2={22} />
            </g>
          )}
        </g>

        {/* Right immaculate slate-suited hand pinching the bottom-right corner of the crystal pouch */}
        <g
          transform={`translate(${lerp(1820, 1465, liftPouch)},${lerp(965, 765, liftPouch)}) rotate(-32) scale(2380)`}
        >
          <HandBack
            pal={RESTAURATEUR.pal}
            curl={0.62}
            thumb={0.72}
            sleeve={RESTAURATEUR.pal.jacket}
            sleeveShade={RESTAURATEUR.pal.jacketShade}
            cuff={RESTAURATEUR.pal.shirt}
            forearm={0.85}
          />
        </g>

        <Motes f={g} n={16} color="#fff6d6" seed={3} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.52} grain={0.06} shadow="#2b2015" gradeO={0.08} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...runs a fried chicken chain, gives money to good causes in public, and is unfailingly polite." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  // 0..75: drops folded charity bills into the counter canister; 75..155: walks gracefully to Walt's booth & bows politely
  const donate = prog(g, B(842.2), B(843.55), easeInOut);
  const walkToBooth = prog(g, B(843.65), B(845.15), easeInOut);
  const politeBow = prog(g, B(844.85), B(845.65), easeOut);

  const cam: Cam = {
    x: lerp(-0.55, 0.18, walkToBooth),
    y: 1.36,
    z: lerp(0.65, 0.95, walkToBooth),
    f: 1280,
    shiftY: -22,
    focus: 3.4,
    aperture: 0.22,
  };

  // Restaurateur walking smoothly from the charity canister to Walt's sunlit booth
  const moving = walkToBooth > 0.02 && walkToBooth < 0.96 ? 0.72 : 0;
  const wPose = walkPose(f * 0.045, moving);
  const poseR: Pose = {
    ...wPose,
    torso: lerp(wPose.torso, 10 * politeBow, walkToBooth),
    neck: lerp(wPose.neck, 12 * politeBow, walkToBooth),
    // Right hand drops green bills into charity canister, then carries red chicken basket to table
    shR: walkToBooth < 0.05 ? lerp(28, 52, donate) : lerp(42, 48, politeBow),
    elR: walkToBooth < 0.05 ? 34 : 46,
    shL: 34,
    elL: 52,
    hipL: moving > 0 ? wPose.hipL : 5,
    hipR: moving > 0 ? wPose.hipR : -5,
    knL: moving > 0 ? wPose.knL : 4,
    knR: moving > 0 ? wPose.knR : 4,
    breathe: 0.45,
  };
  const ancR = rigAnchors(poseR, RESTAURATEUR.height, 0.58);

  // Walt seated in the left bench of the sunlit booth looking up warily
  const poseW: Pose = chairSit({
    torso: 6,
    neck: -4,
    shL: 30,
    shR: 34,
    elL: 28,
    elR: 26,
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.55,
  });

  const gusX = lerp(-1.12, 1.06, walkToBooth);
  const gusZ = lerp(4.62, 3.62, walkToBooth);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <PollosSet cam={cam} f={g} />
        <PollosBooth cam={cam} x={0.45} z={3.55} />

        {/* Walt seated on the left red vinyl bench */}
        <Card cam={cam} x={-0.18} y={0} z={3.52} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.14 + blink(g, 3) * 0.4,
              lookX: 0.36,
              lookY: -0.08,
              brow: 0.18,
              mouth: "neutral",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff5d4"
            rimSide={1}
          />
        </Card>

        {/* Restaurateur donating to charity canister, then arriving at Walt's booth with warm polite smile */}
        <Card cam={cam} x={gusX} y={0} z={gusZ} flip={walkToBooth > 0.55} blur={false}>
          <Figure
            pose={poseR}
            view={0.58}
            look={restaurateurLook({
              yaw: 0.24,
              lids: 0.14,
              lookX: 0.34,
              lookY: politeBow * 0.14,
              brow: -0.08,
              mouth: "smile",
            })}
            pal={PAL_R}
            height={RESTAURATEUR.height}
            rimLight="#fff5d4"
            rimSide={1}
          />
          {/* Charity bill in hand during donation -> red basket of golden fried chicken carried to booth */}
          {walkToBooth < 0.15 ? (
            <rect
              x={ancR.wristR.x}
              y={ancR.wristR.y - 0.02}
              width={0.08}
              height={0.04}
              fill="#5e8762"
              stroke="#1d2b1f"
              strokeWidth={0.006}
            />
          ) : politeBow < 0.7 ? (
            <g transform={`translate(${ancR.wristR.x + 0.05},${ancR.wristR.y + 0.01})`}>
              <polygon points="-0.11,0 -0.14,-0.07 0.14,-0.07 0.11,0" fill="#cf3529" stroke="#21150f" strokeWidth={0.008} />
              <ellipse cx={0} cy={-0.085} rx={0.09} ry={0.04} fill="#e39836" stroke="#21150f" strokeWidth={0.007} />
            </g>
          ) : null}
        </Card>

        <PollosTableTop cam={cam} x={0.45} z={3.48} hasBasket={politeBow >= 0.7} />
        <PollosFore />
        <Motes f={g} n={16} color="#fff6d6" seed={7} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.52} grain={0.06} shadow="#2b2015" gradeO={0.08} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "He is the most frightening man Walter White will ever meet, and those two facts are not in tension." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  // At 847.15s ("most frightening man"), the polite mask drops instantly & a window shadow splits the frame in half
  const maskDrop = prog(g, B(847.0), B(847.55), easeInOut);

  const cam: Cam = {
    x: lerp(0.88, 0.94, easeInOut(t)),
    y: 1.24,
    z: lerp(1.75, 2.28, easeInOut(t)),
    f: lerp(1520, 1740, easeInOut(t)),
    shiftY: -34,
    focus: 1.5,
    aperture: 0.3,
  };

  // Restaurateur seated with eerie, absolute stillness
  const poseR: Pose = chairSit({
    torso: 4,
    neck: 2,
    shL: 34,
    shR: 36,
    elL: 28,
    elR: 26,
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.2 * (1 - maskDrop * 0.7),
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <PollosSet cam={cam} f={g} />
        <PollosBooth cam={cam} x={0.35} z={3.55} />

        <Card cam={cam} x={0.96} y={0} z={3.52} flip blur={false}>
          <Figure
            pose={poseR}
            view={0.54}
            look={restaurateurLook({
              yaw: 0.18,
              lids: lerp(0.14, 0.26, maskDrop),
              lookX: 0.32,
              lookY: 0,
              brow: lerp(-0.08, 0.28, maskDrop),
              mouth: maskDrop > 0.45 ? "flat" : "smile",
            })}
            pal={PAL_R}
            height={RESTAURATEUR.height}
            rimLight="#fff5d4"
            rimSide={-1}
          />
        </Card>

        <PollosTableTop cam={cam} x={0.35} z={3.46} hasBasket />

        {/* Razor-sharp window mullion shadow sliding across EXACTLY half of Gus's face ("those two facts are not in tension") */}
        <polygon
          points={`${lerp(1920, 965, maskDrop)},0 1920,0 1920,1080 ${lerp(1920, 885, maskDrop)},1080`}
          fill="#0a1628"
          opacity={0.46 * maskDrop}
        />

        <PollosFore />
        <Motes f={g} n={14} color="#fff6d6" seed={11} drift={0.25} />
      </svg>
      <Finish f={g} vig={lerp(0.54, 0.7, maskDrop)} grain={0.07} shadow="#141c2b" gradeO={lerp(0.08, 0.18, maskDrop)} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "He buys the entire output. It's a good offer." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const slideOffer = prog(g, B(851.85), B(853.25), easeInOut);
  const waltReach = prog(g, B(853.65), B(854.65), easeOut);

  const cam: Cam = {
    x: 0.35,
    y: 1.22,
    z: 1.28,
    f: 1380,
    shiftY: -32,
    focus: 2.2,
    aperture: 0.25,
  };

  // Walt leaning forward across the booth, right hand reaching toward the thick offer envelope
  const poseW: Pose = chairSit({
    torso: lerp(8, 16, waltReach),
    neck: 4,
    shL: 30,
    shR: lerp(32, 44, waltReach),
    elL: 26,
    elR: lerp(26, 18, waltReach),
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.55,
  });

  // Restaurateur sliding the envelope across, then folding his hands with composed precision
  const poseR: Pose = chairSit({
    torso: 5,
    neck: 2,
    shL: 34,
    shR: lerp(34, 46, Math.sin(slideOffer * Math.PI)),
    elL: 28,
    elR: lerp(28, 18, Math.sin(slideOffer * Math.PI)),
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.3,
  });

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <PollosSet cam={cam} f={g} />
        <PollosBooth cam={cam} x={0.35} z={3.55} />

        {/* Walt at left of booth */}
        <Card cam={cam} x={-0.28} y={0} z={3.52} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.12 + blink(g, 4) * 0.4,
              lookX: 0.38,
              lookY: lerp(0.02, 0.18, waltReach),
              brow: -0.05,
              mouth: "neutral",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff5d4"
            rimSide={1}
          />
        </Card>

        {/* Restaurateur at right of booth */}
        <Card cam={cam} x={0.98} y={0} z={3.52} flip blur={false}>
          <Figure
            pose={poseR}
            view={0.58}
            look={restaurateurLook({
              yaw: 0.24,
              lids: 0.22,
              lookX: 0.36,
              lookY: 0.04,
              brow: 0.14,
              mouth: "flat",
            })}
            pal={PAL_R}
            height={RESTAURATEUR.height}
            rimLight="#fff5d4"
            rimSide={-1}
          />
        </Card>

        <PollosTableTop cam={cam} x={0.35} z={3.46} hasBasket offerSlide={slideOffer} />
        <PollosFore />
        <Motes f={g} n={16} color="#fff6d6" seed={15} drift={0.3} />
      </svg>
      <Finish f={g} vig={0.56} grain={0.065} shadow="#241d17" gradeO={0.1} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "The cost is that Walter decides nothing." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const rise = prog(f, 0, 28, easeInOut);
  const buttonCoat = prog(f, 22, 54, easeInOut);

  const cam: Cam = {
    x: 0.32,
    y: 1.26,
    z: lerp(1.18, 0.98, easeOut(f / dur)),
    f: 1320,
    shiftY: -18,
    focus: 2.5,
    aperture: 0.24,
  };

  // Walt remaining seated, small in the booth as Gus rises & towers over the table
  const poseW: Pose = chairSit({
    torso: 6,
    neck: lerp(-2, -12, rise),
    shL: 32,
    shR: 36,
    elL: 28,
    elR: 26,
    hipL: 64, hipR: 66, knL: 92, knR: 94,
    breathe: 0.5,
  });

  // Restaurateur rising smoothly to his full height & resting one hand on his lapel/button while looking down at Walt
  const poseR: Pose = {
    torso: lerp(8, 2, rise),
    neck: lerp(4, 10, rise),
    shL: lerp(34, -10, buttonCoat),
    shR: lerp(34, 18, buttonCoat),
    elL: lerp(28, 24, buttonCoat),
    elR: lerp(28, 108, buttonCoat),
    hipL: lerp(58, 5, rise),
    hipR: lerp(60, -5, rise),
    knL: lerp(88, 4, rise),
    knR: lerp(90, 4, rise),
    breathe: 0.3,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <PollosSet cam={cam} f={g} />
        <PollosBooth cam={cam} x={0.35} z={3.55} />

        {/* Seated Walt looking up in quiet realization as Gus's shadow falls over his side of the booth */}
        <Card cam={cam} x={-0.28} y={0} z={3.52} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.14,
              lookX: 0.38,
              lookY: -0.18 * rise,
              brow: 0.42 * rise,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#fff5d4"
            rimSide={1}
          />
        </Card>

        {/* Restaurateur standing tall above the booth, buttoning his suit jacket with total command */}
        <Card cam={cam} x={lerp(0.98, 0.88, rise)} y={lerp(-0.18, 0, rise)} z={3.48} flip blur={false}>
          <Figure
            pose={poseR}
            view={0.58}
            look={restaurateurLook({
              yaw: 0.24,
              lids: 0.24,
              lookX: 0.36,
              lookY: 0.22 * rise,
              brow: 0.18,
              mouth: "flat",
            })}
            pal={PAL_R}
            height={RESTAURATEUR.height}
            rimLight="#fff5d4"
            rimSide={-1}
          />
        </Card>

        <PollosTableTop cam={cam} x={0.35} z={3.44} hasBasket offerSlide={1} />

        {/* Subtle authority shadow falling across Walt's left half of the booth as Gus stands */}
        <polygon
          points={`0,0 ${lerp(0, 920, rise)},0 ${lerp(0, 740, rise)},1080 0,1080`}
          fill="#101826"
          opacity={0.28 * rise}
        />

        <PollosFore />
        <Motes f={g} n={14} color="#fff6d6" seed={19} drift={0.25} />
      </svg>
      <Finish f={g} vig={0.62} grain={0.07} shadow="#1a1c26" gradeO={0.14} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 manners and product"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 fried chicken and charity"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 most frightening man"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 buys entire output"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 Walter decides nothing"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(852.1)} durationInFrames={32}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
