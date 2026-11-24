// SCENE 049 · "watch" · set: bedroom · narration 780.65s → 807.11s (26.46s) · batch B
// Narration:
//   There is a thing that happens in the throat. Anybody who has found somebody in that position knows
//   what the next four seconds sound like. He steps forward. He stops. Then he stands in a sleeping house
//   and watches it happen, one hand held slightly out from his side, for about as long as it takes. Then he
//   turns around and leaves. There was a version of this where he simply saves her, and nothing would have
//   happened to him.
// Staging:
//   S1 (780.65–788.75) Tight moonlit quilt-edge close-up: Jane's pale fingers clutch & convulse against the
//                      indigo blanket as her throat strains on the pillow behind; Walt snaps alert in bg.
//   S2 (788.75–791.85) Medium-close on Walt: he lunges forward instinctively at 789.4s ("He steps forward"),
//                      then freezes dead in his tracks at 790.8s ("He stops"), moonlight glinting off his glasses.
//   S3 (791.85–795.05) Wide moonlit bedroom master ("stands in a sleeping house and watches it happen"):
//                      Walt stands rigid at the bedside while faint shudders ripple across the quilt.
//   S4 (795.05–799.55) Close hip-level shot ("one hand held slightly out from his side, for about as long as
//                      it takes"): Walt's trembling articulated hand hovers inches from his jacket until the
//                      bed goes completely still at 798.8s.
//   S5 (799.55–802.65) Bedroom doorway shot ("Then he turns around and leaves"): Walt pivots away from the
//                      silent bed, walks out into the dark hall, and eases the door nearly shut.
//   S6 (802.65–807.11) Counterfactual warm-sepia coda ("a version of this where he simply saves her..."):
//                      a translucent warm vision of Walt gently turns Jane safely onto her side, then fades
//                      out into the cold, empty moonlit room.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeInOut, easeOut, clamp, lerp, blink, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook } from "../../rig/cast";
import {
  JANE, janeLook, BedroomSet, BedroomBed, BedroomFore, nightTint, lampTint,
} from "../../env/b_bedroom";
import { flatQuad, SoftDefs } from "../../env/b_common";
import { walkPose } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 49, id: "watch", set: "bedroom", cutIn: 780.65, cutOut: 807.11 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(807.11);
const CUTS = {
  s1: 0,
  s2: B(788.75),
  s3: B(791.85),
  s4: B(795.05),
  s5: B(799.55),
  s6: B(802.65),
  end: END,
};

const PAL_T = nightTint(TEACHER.pal);
const PAL_P = nightTint(PARTNER.pal);
const PAL_J = nightTint(JANE.pal);
const PAL_T_GHOST = lampTint(TEACHER.pal);
const PAL_J_GHOST = lampTint(JANE.pal);

/* ─────────── S1 · "There is a thing that happens in the throat... next four seconds sound like." ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  // Subtle distressed spasms across the quilt & Jane's clutching fingers (restrained, dignified, harrowing)
  const spasm = Math.pow(Math.max(0, Math.sin(f * 0.24)), 3) * (f > 18 ? 1 : 0);
  const tremorY = noise1(f * 0.55, 4) * 5 * (f > 18 ? 1 : 0);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Dark moonlit bedroom backdrop */}
        <rect x={0} y={0} width={W} height={H} fill="#131929" />
        {[150, 390, 630].map((sy, i) => (
          <polygon key={i} points={`0,${sy} 1920,${sy + 115} 1920,${sy + 180} 0,${sy + 65}`} fill="#9fc4ff" opacity={0.09} />
        ))}

        {/* Softly shadowed headboard & pillow in upper-center where Jane's upturned face & throat strain */}
        <rect x={280} y={55} width={1460} height={245} fill="#1b1724" stroke="#090b12" strokeWidth={4} />
        <rect x={630} y={195} width={680} height={295} rx={58} fill="#5e7294" stroke="#0e131f" strokeWidth={4} opacity={0.88} />
        <g transform={`translate(970,${335 - spasm * 14 + tremorY * 0.5})`}>
          <ellipse cx={0} cy={-55} rx={152} ry={128} fill={JANE.hair.base} stroke="#090b10" strokeWidth={4} />
          {/* Upturned strained throat catching a cold rim of moonlight */}
          <rect x={-36} y={32} width={72} height={110} rx={24} fill={PAL_J.skin} stroke="#0d1018" strokeWidth={4} />
          <line x1={-12} y1={44} x2={-12} y2={118} stroke={PAL_J.skinLight} strokeWidth={4} opacity={0.65} />
          <path d="M-22,68 Q0,82 22,68" fill="none" stroke={PAL_J.skinShade} strokeWidth={4} />
          {/* Jane's upturned face with blunt bangs, furrowed brows, tight closed lids & parted lips */}
          <ellipse cx={0} cy={-44} rx={92} ry={102} fill={PAL_J.skin} stroke="#0d1018" strokeWidth={4} />
          <path d="M-94,-66 C-98,-178 98,-178 94,-66 Z" fill={JANE.hair.base} stroke="#090b10" strokeWidth={3.5} />
          <path d="M-46,-56 Q-28,-66 -12,-54" fill="none" stroke="#18141d" strokeWidth={3.8} strokeLinecap="round" />
          <path d="M12,-54 Q28,-66 46,-56" fill="none" stroke="#18141d" strokeWidth={3.8} strokeLinecap="round" />
          <path d="M-44,-40 Q-28,-32 -12,-40" fill="none" stroke="#18141d" strokeWidth={4} strokeLinecap="round" />
          <path d="M12,-40 Q28,-32 44,-40" fill="none" stroke="#18141d" strokeWidth={4} strokeLinecap="round" />
          <path d="M0,-42 L3,-14 L-4,-12" fill="none" stroke={PAL_J.skinShade} strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={0} cy={14} rx={20} ry={8 + spasm * 5} fill="#592332" stroke="#1b1218" strokeWidth={3} />
        </g>

        {/* Jane's pale porcelain hand emerging from underneath the top edge of the quilt, clutching the blanket */}
        <g
          transform={`translate(${735 + tremorY * 0.6},${545 - spasm * 16}) rotate(${-22 - spasm * 6}) scale(1650)`}
        >
          <HandBack
            pal={PAL_J}
            curl={0.62 + spasm * 0.3}
            thumb={0.68 + spasm * 0.22}
            sleeve={PAL_J.jacket}
            sleeveShade={PAL_J.jacketShade}
            cuff={PAL_J.shirt}
            forearm={0.45}
          />
        </g>

        {/* Rumpled indigo quilt across lower half of frame (covering her forearm below wrist), shuddering faintly */}
        <path
          d={`M0,${505 - spasm * 8} Q960,${465 + tremorY} 1920,${515 - spasm * 6} L1920,1080 L0,1080 Z`}
          fill="#222e47"
          stroke="#0a0d16"
          strokeWidth={6}
        />
        <path
          d={`M380,${635 - spasm * 10} Q980,${585 + tremorY} 1680,${655 - spasm * 8}`}
          fill="none"
          stroke="#3c4f75"
          strokeWidth={6}
          opacity={0.65}
        />

        <BedroomFore />
        <Motes f={g} n={14} color="#9fc4ff" seed={3} drift={0.2} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#081428" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · "He steps forward. He stops." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  // Instinctive lunge forward at 789.15→789.85s, then abrupt arrest at 790.65s ("He stops.")
  const lunge = prog(g, B(789.1), B(789.85), easeOut);
  const arrest = prog(g, B(790.55), B(791.15), easeInOut);

  const cam: Cam = {
    x: lerp(-0.35, -0.18, lunge),
    y: 1.38,
    z: lerp(1.55, 1.85, lunge),
    f: 1520,
    shiftY: -32,
    focus: 1.9,
    aperture: 0.28,
  };

  const poseW: Pose = {
    torso: lerp(4, 18, lunge) - 11 * arrest,
    neck: lerp(6, 12, lunge) - 4 * arrest,
    shL: lerp(12, 36, lunge) - 22 * arrest,
    shR: lerp(16, 56, lunge) - 34 * arrest,
    elL: lerp(38, 28, lunge) + 18 * arrest,
    elR: lerp(42, 20, lunge) + 28 * arrest,
    hipL: lerp(5, 22, lunge) - 12 * arrest,
    hipR: lerp(-5, -14, lunge) + 6 * arrest,
    knL: lerp(5, 24, lunge) - 14 * arrest,
    knR: lerp(5, 12, lunge) - 6 * arrest,
    breathe: 0.5 * (1 - arrest * 0.6),
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={0.85} />
        <BedroomBed cam={cam} x={0.75} z={3.85} w={1.85} night />

        {/* Walt lunging one urgent step toward the bed, then freezing dead in his tracks */}
        <Card cam={cam} x={lerp(-0.68, -0.28, lunge)} y={0} z={3.38} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: lerp(0.08, 0.22, arrest),
              lookX: 0.38,
              lookY: 0.22,
              brow: lerp(0.75, 0.38, arrest),
              mouth: arrest > 0.5 ? "flat" : "open",
              mouthOpen: 0.16 * (1 - arrest),
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#9fc4ff"
            rimSide={1}
          />
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#9fc4ff" seed={7} drift={0.2} />
      </svg>
      <Finish f={g} vig={0.74} grain={0.08} shadow="#0a1a30" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · "Then he stands in a sleeping house and watches it happen..." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  const dur = CUTS.s4 - CUTS.s3;
  const decay = 1 - clamp(f / (dur * 1.15));
  const shudder = Math.pow(Math.max(0, Math.sin(f * 0.28)), 3) * decay;

  const cam: Cam = {
    x: 0.18,
    y: 1.34,
    z: lerp(0.85, 0.72, easeInOut(f / dur)),
    f: 1260,
    shiftY: -62,
    focus: 3.2,
    aperture: 0.22,
  };

  // Walt frozen upright at the bedside, right hand held slightly out from his side
  const poseW: Pose = {
    torso: 5,
    neck: 10,
    shL: -8,
    shR: 18,
    elL: 22,
    elR: 28,
    hipL: 8,
    hipR: -6,
    knL: 6,
    knR: 6,
    breathe: 0.35,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={0.85} />
        <BedroomBed cam={cam} x={0.68} z={3.85} w={1.85} night />

        {/* Jane & Jesse on the moonlit bed — faint decaying shudder on Jane */}
        <Card cam={cam} x={1.74} y={0.62 + shudder * 0.025} z={3.85} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4 + shudder * 4, neck: 6, shL: -4, shR: 8, elL: 14, elR: 16, hipL: 12, hipR: 10, knL: 18, knR: 16, breathe: 0.2 * decay }}
              view={0.35}
              look={janeLook({ yaw: 0.12, lids: 0.96, mouth: "open", mouthOpen: 0.14 * decay })}
              pal={PAL_J}
              height={JANE.height}
              rimLight="#9fc4ff"
              rimSide={1}
            />
          </g>
        </Card>

        <Card cam={cam} x={1.54} y={0.6} z={3.52} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 6, shL: -6, shR: 6, elL: 14, elR: 16, hipL: 12, hipR: 8, knL: 18, knR: 14, breathe: 0.22 }}
              view={0.68}
              look={partnerLook({ yaw: 0.25, lids: 0.96, mouth: "flat" })}
              pal={PAL_P}
              height={PARTNER.height}
              rimLight="#9fc4ff"
              rimSide={1}
              outfit="hoodie"
            />
          </g>
        </Card>

        <polygon points={flatQuad(cam, 0.58, 1.62, 3.18, 4.42, 0.68 + shudder * 0.015)} fill="#29354d" stroke="#0c0e14" strokeWidth={1.8} />

        {/* Walt standing motionless in the sleeping house watching */}
        <Card cam={cam} x={-0.52} y={0} z={3.45} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({
              yaw: 0.24,
              lids: 0.16 + blink(g, 9) * 0.4,
              lookX: 0.38,
              lookY: 0.26,
              brow: 0.45,
              mouth: "flat",
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#9fc4ff"
            rimSide={1}
          />
        </Card>

        <BedroomFore />
        <Motes f={g} n={16} color="#9fc4ff" seed={11} drift={0.18} />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#0a1a30" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "...one hand held slightly out from his side, for about as long as it takes." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  // Movement on the bed behind ceases completely by 798.5s ("as long as it takes")
  const lifeLeft = 1 - prog(g, B(795.2), B(798.55), easeOut);
  const bedTremor = Math.pow(Math.max(0, Math.sin(f * 0.25)), 3) * lifeLeft;
  const handTremor = noise1(f * 0.65, 8) * 6 * (0.25 + 0.75 * lifeLeft);
  const lowerHand = prog(g, B(798.55), B(799.45), easeInOut);

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Deep moonlit bedroom shadow with blurred bed silhouette at right */}
        <rect x={0} y={0} width={W} height={H} fill="#101624" />
        {[220, 490, 760].map((sy, i) => (
          <polygon key={i} points={`0,${sy} 1920,${sy + 110} 1920,${sy + 175} 0,${sy + 65}`} fill="#9fc4ff" opacity={0.07} />
        ))}

        {/* Moonlit mattress & quilt edge at right — going eerily, completely motionless at 798.55s */}
        <g transform={`translate(0,${-bedTremor * 9})`}>
          <path d="M980,535 Q1440,495 1920,530 L1920,1080 L940,1080 Z" fill="#222d45" stroke="#0a0e17" strokeWidth={5} />
          <path d="M1020,545 Q1450,510 1920,542" fill="none" stroke="#5c759e" strokeWidth={4} opacity={0.45} />
        </g>

        {/* Walt's navy canvas work jacket torso & dark trousers at left */}
        <polygon points="0,0 485,0 455,685 0,685" fill={PAL_T.jacket} stroke="#0a0d14" strokeWidth={6} />
        <polygon points="395,0 485,0 455,685 375,685" fill={PAL_T.jacketLight} opacity={0.35} />
        <polygon points="0,685 455,685 435,1080 0,1080" fill={PAL_T.pants} stroke="#0a0d14" strokeWidth={6} />

        {/* Hero detail: Walt's right hand held slightly out from his side, trembling, then closing at his hip */}
        <g
          transform={`translate(${lerp(665, 575, lowerHand) + handTremor},${lerp(565, 635, lowerHand)}) rotate(${lerp(152, 168, lowerHand)}) scale(2480)`}
        >
          <HandBack
            pal={PAL_T}
            curl={lerp(0.36, 0.76, lowerHand)}
            thumb={lerp(0.42, 0.78, lowerHand)}
            sleeve={PAL_T.jacket}
            sleeveShade={PAL_T.jacketShade}
            cuff={PAL_T.shirt}
            forearm={0.95}
          />
        </g>

        <Motes f={g} n={14} color="#9fc4ff" seed={15} drift={0.16} />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#081428" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "Then he turns around and leaves." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.s6 - CUTS.s5;
  const turn = prog(f, 4, 22, easeInOut);
  const walkOut = prog(f, 18, dur - 6, easeInOut);
  const doorClose = prog(f, dur - 28, dur - 2, easeInOut);

  const cam: Cam = {
    x: lerp(-0.35, -0.65, easeInOut(f / dur)),
    y: 1.32,
    z: 0.78,
    f: 1260,
    shiftY: -58,
    focus: 3.4,
    aperture: 0.22,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={lerp(0.88, 0.16, doorClose)} />
        <BedroomBed cam={cam} x={0.75} z={3.85} w={1.85} night />

        {/* Still, silent figures under the moonlit quilt */}
        <Card cam={cam} x={1.74} y={0.62} z={3.85} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 6, shL: -4, shR: 8, elL: 14, elR: 16, hipL: 12, hipR: 10, knL: 18, knR: 16, breathe: 0 }}
              view={0.35}
              look={janeLook({ yaw: 0.12, lids: 1.0, mouth: "flat" })}
              pal={PAL_J}
              height={JANE.height}
              rimLight="#9fc4ff"
              rimSide={1}
            />
          </g>
        </Card>
        <Card cam={cam} x={1.54} y={0.6} z={3.52} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 6, shL: -6, shR: 6, elL: 14, elR: 16, hipL: 12, hipR: 8, knL: 18, knR: 14, breathe: 0.22 }}
              view={0.68}
              look={partnerLook({ yaw: 0.25, lids: 0.96, mouth: "flat" })}
              pal={PAL_P}
              height={PARTNER.height}
              rimLight="#9fc4ff"
              rimSide={1}
              outfit="hoodie"
            />
          </g>
        </Card>
        <polygon points={flatQuad(cam, 0.58, 1.62, 3.18, 4.42, 0.68)} fill="#29354d" stroke="#0c0e14" strokeWidth={1.8} />

        {/* Walt turning his back on the bed & walking out through the dark bedroom doorway */}
        {walkOut < 0.96 && (
          <Card
            cam={cam}
            x={lerp(-0.52, -1.92, walkOut)}
            y={0}
            z={lerp(3.45, 4.55, walkOut)}
            flip={turn > 0.45}
            blur={false}
          >
            <Figure
              pose={walkPose(f * 0.045, walkOut > 0.02 ? 0.78 : 0, { torso: 6, neck: 8 })}
              view={0.58}
              look={teacherLook({ yaw: 0.24, lids: 0.22, lookX: 0.25, lookY: 0.18, brow: 0.35, mouth: "flat" })}
              pal={PAL_T}
              height={TEACHER.height}
              rimLight="#9fc4ff"
              rimSide={-1}
            />
          </Card>
        )}

        <BedroomFore />
        <Motes f={g} n={14} color="#9fc4ff" seed={19} drift={0.16} />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#0a1a30" gradeO={0.22} />
    </AbsoluteFill>
  );
};

/* ─────────── S6 · "There was a version of this where he simply saves her..." ─────────── */
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s6;
  const dur = CUTS.end - CUTS.s6;
  // Warm counterfactual memory appears (0→28), rolls Jane safely onto her side, then fades away into empty cold night
  const ghostIn = prog(f, 0, 24, easeOut);
  const ghostOut = prog(g, B(805.25), B(806.75), easeInOut);
  const ghostOp = ghostIn * (1 - ghostOut) * 0.78;
  const saveRoll = prog(g, B(803.55), B(804.85), easeInOut);

  const cam: Cam = {
    x: 0.18,
    y: 1.36,
    z: lerp(1.05, 0.85, easeInOut(f / dur)),
    f: 1320,
    shiftY: -66,
    focus: 2.8,
    aperture: 0.24,
  };

  // Ghost Walt leaning gently over the bed with both hands supporting Jane's shoulder onto her side
  const poseGhostW: Pose = {
    torso: lerp(16, 26, saveRoll),
    neck: 14,
    shL: lerp(34, 52, saveRoll),
    shR: lerp(38, 58, saveRoll),
    elL: 28,
    elR: 24,
    hipL: 14,
    hipR: -8,
    knL: 16,
    knR: 10,
    breathe: 0.5,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Base reality: cold, empty moonlit bedroom with closed door */}
        <BedroomSet cam={cam} f={g} mode="night" doorOpen={0.12} />
        <BedroomBed cam={cam} x={0.68} z={3.85} w={1.85} night />

        {/* Reality: motionless bed */}
        <Card cam={cam} x={1.74} y={0.62} z={3.85} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 6, shL: -4, shR: 8, elL: 14, elR: 16, hipL: 12, hipR: 10, knL: 18, knR: 16, breathe: 0 }}
              view={0.35}
              look={janeLook({ yaw: 0.12, lids: 1.0, mouth: "flat" })}
              pal={PAL_J}
              height={JANE.height}
              rimLight="#9fc4ff"
              rimSide={1}
            />
          </g>
        </Card>
        <Card cam={cam} x={1.54} y={0.6} z={3.52} blur={false}>
          <g transform="rotate(-84)">
            <Figure
              pose={{ torso: 4, neck: 6, shL: -6, shR: 6, elL: 14, elR: 16, hipL: 12, hipR: 8, knL: 18, knR: 14, breathe: 0.2 }}
              view={0.68}
              look={partnerLook({ yaw: 0.25, lids: 0.96, mouth: "flat" })}
              pal={PAL_P}
              height={PARTNER.height}
              rimLight="#9fc4ff"
              rimSide={1}
              outfit="hoodie"
            />
          </g>
        </Card>
        <polygon points={flatQuad(cam, 0.58, 1.62, 3.18, 4.42, 0.68)} fill="#29354d" stroke="#0c0e14" strokeWidth={1.8} />

        {/* Translucent warm counterfactual overlay: "the version of this where he simply saves her" */}
        {ghostOp > 0.02 && (
          <g opacity={ghostOp}>
            <rect x={0} y={0} width={W} height={H} fill="#ffd599" opacity={0.14} />
            {/* Ghost Jane safely turned back onto her side, legs tucked under warm quilt */}
            <Card cam={cam} x={1.74} y={0.62} z={3.84} blur={false}>
              <g transform="rotate(-84)">
                <Figure
                  pose={{ torso: lerp(4, 12, saveRoll), neck: 8, shL: -4, shR: 10, elL: 18, elR: 22, hipL: 18, hipR: 14, knL: 28, knR: 24, breathe: 0.45 }}
                  view={lerp(0.35, 0.78, saveRoll)}
                  look={janeLook({ yaw: lerp(0.12, 0.3, saveRoll), lids: 0.92, mouth: "neutral" })}
                  pal={PAL_J_GHOST}
                  height={JANE.height}
                  rimLight="#ffd9a0"
                  rimSide={1}
                />
              </g>
            </Card>
            <polygon points={flatQuad(cam, 0.58, 1.62, 3.18, 4.42, 0.69)} fill="#3b445e" stroke="#0c0e14" strokeWidth={1.8} />
            {/* Ghost Walt leaning across the bedside saving her */}
            <Card cam={cam} x={-0.38 + 0.14 * saveRoll} y={0} z={3.58} blur={false}>
              <Figure
                pose={poseGhostW}
                view={0.58}
                look={teacherLook({
                  yaw: 0.24,
                  lids: 0.14,
                  lookX: 0.38,
                  lookY: 0.24,
                  brow: 0.35,
                  mouth: "neutral",
                })}
                pal={PAL_T_GHOST}
                height={TEACHER.height}
                rimLight="#ffd9a0"
                rimSide={1}
              />
            </Card>
          </g>
        )}

        <BedroomFore />
        <Motes f={g} n={16} color={ghostOp > 0.2 ? "#ffd9a0" : "#9fc4ff"} seed={23} drift={0.18} />
      </svg>
      <Finish f={g} vig={0.76} grain={0.08} shadow="#0a1a30" gradeO={0.22} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 throat"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 steps forward stops"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 watches it happen"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 one hand held out"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.s6 - CUTS.s5} name="S5 turns around and leaves"><S5 /></Sequence>
    <Sequence from={CUTS.s6} durationInFrames={CUTS.end - CUTS.s6} name="S6 version where he saves her"><S6 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(801.7)} durationInFrames={24}><Audio src={staticFile("sfx/b_lock_click.wav")} volume={0.075} /></Sequence>
  </AbsoluteFill>
);
