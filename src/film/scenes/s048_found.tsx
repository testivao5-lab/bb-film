// SCENE 048 · "found" · set: bedroom · narration 766.27s → 780.65s (14.38s) · batch B
// Narration:
//   Walter doesn't go there to intervene. He goes because his partner is not answering his phone, and
//   because the two of them have been talking about leaving town. What he finds is both of them out cold,
//   and Jane rolling onto her back.
// Staging:
//   S1 (766.27–768.65) Night duplex porch: Walt walks up to Jesse's dark front door, lowers his unanswered
//                      flip phone, and raps sharply on the wood ("doesn't go there to intervene").
//   S2 (768.65–772.05) Tight moonlit nightstand insert: Jesse's flip phone buzzes & glows unanswered beside
//                      the bronze chip and tarnished spoon ("not answering his phone").
//   S3 (772.05–775.15) Bedroom doorway reveal: Walt eases the bedroom door open, his gaze catching two packed
//                      travel bags & a folded road map by the foot of the bed ("talking about leaving town").
//   S4 (775.15–778.25) High bedside 3/4 shot: Jesse & Jane lie out cold across the moonlit quilt; Walt leans
//                      over and shakes Jesse's limp shoulder ("both of them out cold").
//   S5 (778.25–780.65) Tight pillow-level shot: jostled by the mattress, Jane rolls slackly from her side
//                      onto her back, pale face & throat upturned in cold moonlight ("rolling onto her back").
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, rand } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, PARTNER, partnerLook } from "../../rig/cast";
import {
  JANE, janeLook, BedroomSet, BedroomBed, BedroomFore, CashBundle, nightTint,
} from "../../env/b_bedroom";
import { wallQuad, flatQuad, SoftDefs } from "../../env/b_common";
import { walkPose, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 48, id: "found", set: "bedroom", cutIn: 766.27, cutOut: 780.65 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(780.65);
const CUTS = {
  s1: 0,
  s2: B(768.65),
  s3: B(772.05),
  s4: B(775.15),
  s5: B(778.25),
  end: END,
};

const PAL_T = nightTint(TEACHER.pal);
const PAL_P = nightTint(PARTNER.pal);
const PAL_J = nightTint(JANE.pal);

/* ─────────── S1 · Night duplex porch — "Walter doesn't go there to intervene." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const dur = CUTS.s2 - CUTS.s1;
  const stepStop = prog(f, 0, 34, easeOut);
  const knock = f > 42 ? Math.max(0, Math.sin((f - 42) * 0.9)) : 0;

  const cam: Cam = {
    x: lerp(0.85, 1.25, easeInOut(f / dur)),
    y: 1.38,
    z: lerp(1.55, 1.95, easeInOut(f / dur)),
    f: 1420,
    shiftY: -16,
    focus: 2.8,
    aperture: 0.25,
  };

  const wWalk = walkPose(f * 0.055, 1 - stepStop);
  const poseW: Pose = {
    ...wWalk,
    torso: lerp(wWalk.torso, 4, stepStop),
    neck: 2,
    // Left hand lowering phone from ear; right hand knocking on door
    shL: lerp(108, 28, stepStop),
    elL: lerp(116, 62, stepStop),
    shR: lerp(wWalk.shR, 52 + knock * 14, stepStop),
    elR: lerp(wWalk.elR, 44 - knock * 12, stepStop),
    hipL: lerp(wWalk.hipL, 6, stepStop),
    hipR: lerp(wWalk.hipR, -5, stepStop),
    knL: lerp(wWalk.knL, 5, stepStop),
    knR: lerp(wWalk.knR, 5, stepStop),
    breathe: 0.65,
  };
  const ancW = rigAnchors(poseW, TEACHER.height, 0.58);

  const OL = "#090c14";

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="s048PorchBulb">
            <stop offset="0" stopColor="#ffd89c" stopOpacity={0.55} />
            <stop offset="0.5" stopColor="#d98c46" stopOpacity={0.16} />
            <stop offset="1" stopColor="#d98c46" stopOpacity={0} />
          </radialGradient>
        </defs>
        {/* Starry indigo Albuquerque night sky */}
        <rect x={0} y={0} width={W} height={H} fill="#0c1322" />
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={rand(i, 3) * W} cy={rand(i, 7) * 420} r={1.2} fill="#cfdfff" opacity={0.45} />
        ))}

        {/* Night stucco duplex facade & Jesse's unit door */}
        <polygon points={flatQuad(cam, -12, 12, 2.0, 18, 0)} fill="#1a1d26" />
        <polygon points={wallQuad(cam, -2.8, 6.2, 0, 3.05, 5.2)} fill="#3b3a42" stroke={OL} strokeWidth={2} />
        <polygon points={wallQuad(cam, -3.0, 6.4, 2.88, 3.25, 5.15)} fill="#241c1d" stroke={OL} strokeWidth={2} />
        <polygon points={flatQuad(cam, -2.6, 5.8, 4.15, 5.2, 0.14)} fill="#2b2c34" stroke={OL} strokeWidth={1.6} />

        {/* Left & right duplex doors + darkened windows */}
        <polygon points={wallQuad(cam, -1.55, -0.58, 0.14, 2.18, 5.18)} fill="#241c19" stroke={OL} strokeWidth={1.8} />
        <polygon points={wallQuad(cam, 1.35, 2.32, 0.14, 2.18, 5.18)} fill="#261d1a" stroke={OL} strokeWidth={1.8} />
        <polygon points={wallQuad(cam, 2.68, 3.68, 1.05, 1.98, 5.18)} fill="#141d2e" stroke={OL} strokeWidth={1.8} />

        {/* Warm porch sconce above Jesse's door */}
        <Card cam={cam} x={1.12} y={2.05} z={5.14} blur={false}>
          <rect x={-0.06} y={-0.09} width={0.12} height={0.16} rx={0.02} fill="#ffe0a3" stroke={OL} strokeWidth={0.012} />
        </Card>
        <circle cx={910} cy={315} r={380} fill="url(#s048PorchBulb)" />

        {/* Walt stepping up onto the porch, lowering his phone & knocking on Jesse's door */}
        <Card cam={cam} x={lerp(0.45, 0.92, stepStop)} y={0.14} z={4.48} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.14,
              lookX: 0.36,
              brow: 0.55,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffd89c"
            rimSide={1}
          />
          {/* Small dark flip phone in left hand */}
          <rect
            x={ancW.wristL.x - 0.015}
            y={ancW.wristL.y - 0.04}
            width={0.042}
            height={0.075}
            rx={0.008}
            fill="#242a36"
            stroke="#0b0d12"
            strokeWidth={0.005}
          />
        </Card>

        <Motes f={g} n={14} color="#ffd89c" seed={3} drift={0.35} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#081224" gradeO={0.18} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "...because his partner is not answering his phone..." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  // Two phone vibration bursts across the dark wood nightstand
  const buzz1 = f >= 12 && f <= 38;
  const buzz2 = f >= 54 && f <= 82;
  const buzzing = buzz1 || buzz2;
  const vibX = buzzing ? Math.sin(f * 2.3) * 5.5 : 0;
  const vibRot = buzzing ? Math.cos(f * 1.9) * 1.8 : 0;
  const screenGlow = buzzing ? 0.95 : 0.22;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <defs>
          <radialGradient id="s048PhoneGlow">
            <stop offset="0" stopColor="#9fc8ff" stopOpacity={0.45 * screenGlow} />
            <stop offset="0.6" stopColor="#4f7fc4" stopOpacity={0.14 * screenGlow} />
            <stop offset="1" stopColor="#4f7fc4" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Dark oak nightstand top in cold venetian-blind moonlight */}
        <rect x={0} y={0} width={W} height={H} fill="#141824" />
        {[210, 480, 760].map((ly, i) => (
          <line key={i} x1={0} y1={ly} x2={W} y2={ly + 14} stroke="#0a0d14" strokeWidth={4} opacity={0.7} />
        ))}
        {/* Cool moonlight blind slats */}
        {[140, 360, 580, 800].map((sy, i) => (
          <polygon key={i} points={`0,${sy} 1920,${sy + 120} 1920,${sy + 185} 0,${sy + 65}`} fill="#9fc4ff" opacity={0.08} />
        ))}

        {/* Overturned bronze sobriety chip & darkened spoon at upper-right (continuity from s047!) */}
        <g transform="translate(1410,335)">
          <circle cx={0} cy={0} r={74} fill="#5e462c" stroke="#14100b" strokeWidth={5} />
          <polygon points="0,-52 45,28 -45,28" fill="none" stroke="#362615" strokeWidth={5} />
        </g>
        <g transform="translate(1525,535) rotate(18)" opacity={0.85}>
          <rect x={-165} y={-8} width={185} height={16} rx={7} fill="#4b5566" stroke="#10131a" strokeWidth={4} />
          <ellipse cx={58} cy={0} rx={54} ry={34} fill="#3f4857" stroke="#10131a" strokeWidth={4} />
          <ellipse cx={58} cy={0} rx={36} ry={20} fill="#1f222b" />
        </g>

        {/* Cold blue phone glow pool */}
        <circle cx={835} cy={565} r={420} fill="url(#s048PhoneGlow)" />

        {/* Vibrating unanswered flip phone in foreground-center (zero text — pure call icon + concentric buzz arcs) */}
        <g transform={`translate(${835 + vibX},565) rotate(${-14 + vibRot})`}>
          <rect x={-128} y={-225} width={268} height={462} rx={38} fill="#000" opacity={0.45} />
          <rect x={-135} y={-232} width={270} height={464} rx={38} fill="#252c3a" stroke="#090c12" strokeWidth={6} />
          <rect x={-112} y={-205} width={224} height={410} rx={26} fill="#323b4d" />
          {/* Glowing external caller-ID subscreen */}
          <rect
            x={-78}
            y={-115}
            width={156}
            height={118}
            rx={12}
            fill={buzzing ? "#bfe0ff" : "#223247"}
            stroke="#101622"
            strokeWidth={4}
          />
          {/* Stylized ringing handset icon + signal bars (zero readable text) */}
          <path
            d="M-28,-42 C-34,-58 -18,-76 0,-76 C18,-76 34,-58 28,-42 L14,-40 L10,-54 L-10,-54 L-14,-40 Z"
            fill={buzzing ? "#1b3b66" : "#4b6485"}
          />
          <line x1={-48} y1={-22} x2={48} y2={-22} stroke={buzzing ? "#2c548a" : "#4b6485"} strokeWidth={6} strokeLinecap="round" />

          {/* Vibration ripple arcs around the phone body */}
          {buzzing && (
            <g stroke="#9fc8ff" strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.75}>
              <path d="M-168,-85 A180,180 0 0 0 -168,85" />
              <path d="M-196,-105 A215,215 0 0 0 -196,105" opacity={0.45} />
              <path d="M168,-85 A180,180 0 0 1 168,85" />
              <path d="M196,-105 A215,215 0 0 1 196,105" opacity={0.45} />
            </g>
          )}
        </g>

        <Motes f={g} n={14} color="#9fc4ff" seed={6} drift={0.25} />
      </svg>
      <Finish f={g} vig={0.72} grain={0.08} shadow="#081428" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "...and because the two of them have been talking about leaving town." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const t = f / dur;
  const doorOpen = lerp(0.18, 0.92, prog(f, 0, 38, easeOut));
  const enter = prog(f, 16, 68, easeOut);

  const cam: Cam = {
    x: lerp(-0.55, -0.25, easeInOut(t)),
    y: 1.28,
    z: lerp(0.55, 0.78, easeInOut(t)),
    f: 1220,
    shiftY: -68,
    focus: 3.4,
    aperture: 0.24,
  };

  const wPose = walkPose(f * 0.04, (1 - enter) * 0.75);
  const poseW: Pose = {
    ...wPose,
    torso: lerp(wPose.torso, 6, enter),
    neck: lerp(wPose.neck, 8, enter),
    shL: lerp(wPose.shL, 14, enter),
    shR: lerp(wPose.shR, 22, enter),
    elL: 42,
    elR: 46,
    hipL: lerp(wPose.hipL, 6, enter),
    hipR: lerp(wPose.hipR, -5, enter),
    knL: 6,
    knR: 6,
    breathe: 0.55,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={doorOpen} />
        <BedroomBed cam={cam} x={0.75} z={3.95} night />

        {/* Unconscious silhouettes on the bed in background-right (limp arms resting flat on mattress) */}
        <Card cam={cam} x={1.48} y={0.58} z={3.85} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 4, shL: -4, shR: 6, elL: 12, elR: 14, hipL: 10, hipR: 8, knL: 16, knR: 14, breathe: 0.25 }}
              view={0.68}
              look={partnerLook({ yaw: 0.24, lids: 0.95 })}
              pal={PAL_P}
              height={PARTNER.height}
              rimLight="#9fc4ff"
              rimSide={1}
              outfit="hoodie"
            />
          </g>
        </Card>

        {/* Walt stepping quietly into the bedroom doorway */}
        <Card cam={cam} x={lerp(-1.82, -1.08, enter)} y={0} z={lerp(4.45, 3.65, enter)} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.14,
              lookX: 0.38,
              lookY: 0.16,
              brow: 0.42,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#9fc4ff"
            rimSide={1}
          />
        </Card>

        {/* Foreground storytelling props on the bedroom rug: TWO packed travel duffels + cash + folded road map ("leaving town") */}
        <Card cam={cam} x={-0.32} y={0.02} z={3.42} blur={false}>
          <ellipse cx={0} cy={0} rx={0.42} ry={0.14} fill="#000" opacity={0.45} />
          {/* Olive travel duffel + luggage tag */}
          <path d="M-0.34,0 C-0.36,-0.24 -0.18,-0.28 0,-0.28 C0.18,-0.28 0.36,-0.24 0.34,0 Z" fill="#2c3834" stroke="#0b0e12" strokeWidth={0.012} />
          <path d="M-0.16,-0.26 Q0,-0.38 0.16,-0.26" fill="none" stroke="#181f24" strokeWidth={0.018} />
          {/* Jane's charcoal leather weekender bag + folded southwest highway map */}
          <g transform="translate(0.38,0.03)">
            <path d="M-0.26,0 C-0.28,-0.2 -0.14,-0.23 0,-0.23 C0.14,-0.23 0.28,-0.2 0.26,0 Z" fill="#23202b" stroke="#0b0e12" strokeWidth={0.012} />
            <g transform="translate(-0.08,-0.24) rotate(-8)">
              <rect x={-0.11} y={-0.02} width={0.22} height={0.035} fill="#d8d2c0" stroke="#24221d" strokeWidth={0.006} />
              <line x1={-0.08} y1={-0.005} x2={0.08} y2={-0.008} stroke="#b84a3c" strokeWidth={0.006} />
            </g>
            <g transform="translate(0.12,-0.04)"><CashBundle scale={0.85} /></g>
          </g>
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#9fc4ff" seed={9} drift={0.28} />
      </svg>
      <Finish f={g} vig={0.72} grain={0.08} shadow="#0a1a30" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "What he finds is both of them out cold..." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const shakeJesse = f >= 32 && f <= 74 ? Math.sin((f - 32) * 0.55) : 0;
  const reach = prog(f, 8, 30, easeOut);

  const cam: Cam = {
    x: 0.22,
    y: 1.38,
    z: 1.15,
    f: 1340,
    shiftY: -72,
    focus: 2.5,
    aperture: 0.26,
  };

  // Walt leaning over the left side of the bed shaking Jesse's limp shoulder
  const poseW: Pose = {
    torso: lerp(8, 22, reach),
    neck: 14,
    shL: 16,
    shR: lerp(24, 54, reach) + shakeJesse * 5,
    elL: 42,
    elR: lerp(44, 24, reach) - shakeJesse * 4,
    hipL: 12,
    hipR: -6,
    knL: 14,
    knR: 10,
    breathe: 0.65,
  };

  // Jesse unconscious on the left half of the mattress, limp arms flat along sides
  const poseJesse: Pose = {
    torso: 4 + shakeJesse * 4,
    neck: 8 + shakeJesse * 5,
    shL: -6,
    shR: 6,
    elL: 14,
    elR: 16,
    hipL: 12,
    hipR: 8,
    knL: 18,
    knR: 14,
    breathe: 0.22,
  };

  // Jane unconscious on the back half of the mattress, arms resting limp against the quilt
  const poseJane: Pose = {
    torso: 6,
    neck: 8,
    shL: -4,
    shR: 8,
    elL: 16,
    elR: 18,
    hipL: 16,
    hipR: 12,
    knL: 24,
    knR: 20,
    breathe: 0.22,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={0.85} />
        <BedroomBed cam={cam} x={0.62} z={3.75} w={1.85} night />

        {/* Jane curled on her side on the back half of the bed (head on pillow at left, legs right) */}
        <Card cam={cam} x={1.72} y={0.62} z={3.82} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={poseJane}
              view={0.74}
              look={janeLook({ yaw: 0.3, lids: 0.96, mouth: "flat" })}
              pal={PAL_J}
              height={JANE.height}
              rimLight="#9fc4ff"
              rimSide={1}
            />
          </g>
        </Card>

        {/* Jesse out cold in foreground half of bed (head right by Walt's shaking hand!) */}
        <Card cam={cam} x={1.52 + shakeJesse * 0.025} y={0.6} z={3.48} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={poseJesse}
              view={0.68}
              look={partnerLook({ yaw: 0.25, lids: 0.96, mouth: "open", mouthOpen: 0.12 })}
              pal={PAL_P}
              height={PARTNER.height}
              rimLight="#9fc4ff"
              rimSide={1}
              outfit="hoodie"
            />
          </g>
        </Card>

        {/* Rumpled quilt pulled over their legs on the right side of the bed */}
        <polygon points={flatQuad(cam, 0.58, 1.58, 3.12, 4.38, 0.68)} fill="#29354d" stroke="#0c0e14" strokeWidth={1.8} />

        {/* Walt standing at the left bedside shaking Jesse's shoulder */}
        <Card cam={cam} x={-0.55} y={0} z={3.42} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.12,
              lookX: 0.38,
              lookY: 0.28,
              brow: 0.68,
              mouth: "open",
              mouthOpen: 0.14,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#9fc4ff"
            rimSide={1}
          />
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#9fc4ff" seed={12} drift={0.22} />
      </svg>
      <Finish f={g} vig={0.72} grain={0.08} shadow="#0a1a30" gradeO={0.2} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "...and Jane rolling onto her back." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  // Smooth, heavy unconscious roll from her side (0) onto her back (1) across 778.55s → 779.95s
  const roll = prog(g, B(778.5), B(779.95), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Tight pillow-level overhead/side close-up bathed in cold venetian-blind moonlight */}
        <rect x={0} y={0} width={W} height={H} fill="#161d2e" />

        {/* Wooden headboard at top + soft moonlit pillow & indigo quilt */}
        <rect x={0} y={0} width={W} height={165} fill="#1d1822" stroke="#0a0c12" strokeWidth={5} />
        <rect x={0} y={165} width={W} height={915} fill="#253047" />

        {/*Jesse's unconscious shoulder & curls at far left edge (jostling the mattress as he settles back) */}
        <g transform={`translate(185,${585 + (1 - roll) * 14})`}>
          <ellipse cx={0} cy={0} rx={250} ry={175} fill="#2a3529" stroke="#0c0f14" strokeWidth={5} />
          <circle cx={-35} cy={-185} r={108} fill={PAL_P.skin} stroke="#0c0f14" strokeWidth={5} />
          <circle cx={-55} cy={-215} r={96} fill={PARTNER.hair.base} />
        </g>

        {/* Jane's pillow with soft crease shadow */}
        <g transform="translate(1065,430)">
          <rect x={-430} y={-205} width={860} height={410} rx={68} fill="#7d91b3" stroke="#121826" strokeWidth={5} />
          <ellipse cx={lerp(75, 0, roll)} cy={15} rx={260} ry={125} fill="#5e7294" opacity={0.65} />
        </g>

        {/* Jane rolling slackly from her side (facing right) onto her back (pale face & throat upturned to ceiling) */}
        <g transform={`translate(${lerp(1145, 1055, roll)},515)`}>
          {/* Full jet-black wavy hair fanned across the pillow (solid crown, no forehead gap) */}
          <ellipse cx={lerp(-45, 0, roll)} cy={-112} rx={lerp(155, 192, roll)} ry={162} fill={JANE.hair.base} stroke="#0a0b10" strokeWidth={5} />
          <path
            d="M-175,-95 C-195,10 -165,85 -125,105 L125,105 C165,85 195,10 175,-95 Z"
            fill={JANE.hair.dark}
          />

          {/* Exposed pale throat & collarbone catching the cold moonlight as she rolls flat */}
          <rect
            x={-44}
            y={-18}
            width={88}
            height={115}
            rx={28}
            fill={PAL_J.skin}
            stroke="#0e1017"
            strokeWidth={5}
          />
          <path
            d={`M${-26},${28} Q0,${lerp(24, 42, roll)} ${26},${28}`}
            fill="none"
            stroke={PAL_J.skinShade}
            strokeWidth={4}
            opacity={0.75}
          />

          {/* Charcoal cardigan & deep-plum top across chest/shoulders */}
          <path
            d={`M${lerp(-145, -265, roll)},360 C${lerp(-140, -250, roll)},115 ${lerp(-65, -135, roll)},65 0,68 C${lerp(135, 135, roll)},65 ${lerp(195, 250, roll)},115 ${lerp(205, 265, roll)},360 Z`}
            fill={PAL_J.jacket}
            stroke="#0b0d13"
            strokeWidth={6}
          />
          <polygon
            points={`${lerp(-22, -68, roll)},68 ${lerp(52, 68, roll)},68 ${lerp(24, 0, roll)},225`}
            fill={PAL_J.shirt}
          />

          {/* Jane's sleeping head rotating from side-profile to upturned supine */}
          <g transform={`translate(${lerp(28, 0, roll)},-92)`}>
            <ellipse cx={0} cy={0} rx={lerp(100, 112, roll)} ry={124} fill={PAL_J.skin} stroke="#0e1017" strokeWidth={5} />
            {/* Solid blunt dark bangs & cheek locks matching JANE rig */}
            <path
              d="M-114,-28 C-118,-168 118,-168 114,-28 Z"
              fill={JANE.hair.base}
              stroke="#0a0b10"
              strokeWidth={4}
            />
            <path d="M-112,-36 C-122,18 -108,72 -92,94 C-96,42 -96,-8 -98,-36 Z" fill={JANE.hair.base} />
            <path d="M112,-36 C122,18 108,72 92,94 C96,42 96,-8 98,-36 Z" fill={JANE.hair.base} />
            {/* Brows, closed heavy eyelids, nose bridge & slack parted plum lips */}
            <g transform={`translate(${lerp(30, 0, roll)},4)`}>
              <path d="M-58,-28 Q-35,-36 -14,-28" fill="none" stroke="#18141d" strokeWidth={4} strokeLinecap="round" opacity={lerp(0.25, 0.9, roll)} />
              <path d="M14,-28 Q35,-36 58,-28" fill="none" stroke="#18141d" strokeWidth={4} strokeLinecap="round" />
              <path d="M-54,-10 Q-34,0 -14,-10" fill="none" stroke="#18141d" strokeWidth={4.5} strokeLinecap="round" opacity={lerp(0.25, 1, roll)} />
              <path d="M14,-10 Q34,0 54,-10" fill="none" stroke="#18141d" strokeWidth={4.5} strokeLinecap="round" />
              <path d={`M0,-12 L${lerp(14, 4, roll)},22 L-4,24`} fill="none" stroke={PAL_J.skinShade} strokeWidth={4} strokeLinecap="round" />
              <ellipse cx={0} cy={56} rx={22} ry={lerp(6, 10, roll)} fill="#592332" stroke="#1b1218" strokeWidth={3} />
            </g>
          </g>
        </g>

        {/* Rumpled indigo quilt pulled across lower frame + diagonal moonlight slats */}
        <path d="M0,785 Q960,725 1920,795 L1920,1080 L0,1080 Z" fill="#202b42" stroke="#0b0e17" strokeWidth={6} />
        {[210, 455, 700].map((sy, i) => (
          <polygon key={i} points={`0,${sy} 1920,${sy + 115} 1920,${sy + 185} 0,${sy + 70}`} fill="#9fc4ff" opacity={0.11} />
        ))}

        <Motes f={g} n={16} color="#9fc4ff" seed={16} drift={0.2} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#081428" gradeO={0.22} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 night porch"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 unanswered phone"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 leaving town bags"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 both out cold"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 rolling onto her back"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={42} durationInFrames={22}><Audio src={staticFile("sfx/b_thunk.wav")} volume={0.08} /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={28}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.08} /></Sequence>
  </AbsoluteFill>
);
