// SCENE 043 · "bell" · set: desertDusk · narration 683.17s → 699.42s (16.25s) · batch B
// Narration:
//   Walter's way out is a packet of ricin folded into a burrito, and it would have worked, except that
//   the old man in the wheelchair is Tuco's uncle, he cannot speak, and he can still work a bell.
//   The bell rings until the plate is on the floor and the nephew finally understands what he has been told.
// Staging:
//   S1 (683.17–688.10) Steep close-up over the shack kitchenette counter: Walt's two articulated hands tap
//                      white ricin crystals from a small creased paper packet into an open burrito on a
//                      ceramic plate, then fold the tortilla shut.
//   S2 (688.10–692.20) Tight push-in on the mute uncle in his wheelchair: ignoring the flickering CRT TV,
//                      his sharp eyes have caught every move; his jaw strains silently ("cannot speak").
//   S3 (692.20–694.55) Macro close-up on the wheelchair armrest & brass service bell: the uncle's trembling
//                      cardigan-sleeved hand strikes the brass plunger repeatedly ("still work a bell").
//   S4 (694.55–696.45) Medium table shot: frantic bell ringing as the uncle shoves the plate off the wooden
//                      table, shattering ceramic shards and the burrito across the floorboards ("on the floor").
//   S5 (696.45–699.42) Low-angle confrontation over the broken plate: the distributor rises with his pistol,
//                      eyes turning from his glaring uncle onto Walt and Jesse ("finally understands").
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { prog, easeIn, easeOut, easeInOut, clamp, lerp, rand, blink, breath, noise1 } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, teacherLook, PARTNER, partnerLook } from "../../rig/cast";
import {
  UNCLE, DIST_DUSK, distDuskLook, duskTint,
  ShackRoom, ShackFore, ShackTable, WheelchairUncle,
} from "../../env/b_shack";
import { Plate, PlateBurst } from "../../props/b_props";
import { SoftDefs } from "../../env/b_common";
import { chairSit, rigAnchors } from "../../props/b_pose";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 43, id: "bell", set: "desertDusk", cutIn: 683.17, cutOut: 699.42 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const B = beat;
const END = B(699.42);
const CUTS = {
  s1: 0,
  s2: B(688.1),
  s3: B(692.2),
  s4: B(694.55),
  s5: B(696.45),
  end: END,
};

const PAL_T = duskTint(TEACHER.pal);
const PAL_P = duskTint(PARTNER.pal);

/** Heavy dark pistol in metre space */
const Pistol: React.FC<{ rot?: number }> = ({ rot = 0 }) => (
  <g transform={`rotate(${rot})`}>
    <rect x={-0.02} y={-0.028} width={0.145} height={0.032} rx={0.004} fill="#363b42" stroke="#101215" strokeWidth={0.005} />
    <line x1={-0.01} y1={-0.02} x2={0.115} y2={-0.02} stroke="#6c7580" strokeWidth={0.005} />
    <path d="M-0.015,0.002 L0.025,0.002 L0.008,0.078 L-0.032,0.075 Z" fill="#262220" stroke="#101215" strokeWidth={0.005} />
  </g>
);

/* ─────────── S1 · kitchenette close-up: ricin packet shaken into the open burrito, then folded ─────────── */
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  const sprinkle = clamp((g - B(684.55)) / (B(685.65) - B(684.55)));
  const foldWrap = prog(g, B(685.75), B(687.35), easeInOut);

  const tapShake = sprinkle > 0 && sprinkle < 1 ? Math.sin(f * 1.1) * 14 : 0;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Warm dusk-lit weathered wooden counter top */}
        <rect x={0} y={0} width={W} height={H} fill="#463325" />
        {[160, 380, 620, 860].map((ly, i) => (
          <line key={i} x1={0} y1={ly} x2={W} y2={ly + 12} stroke="#2c1f16" strokeWidth={4} opacity={0.65} />
        ))}
        {/* Diagonal sunset slats across the counter */}
        {[120, 290, 460].map((sy, i) => (
          <polygon key={i} points={`0,${sy} 1920,${sy + 140} 1920,${sy + 215} 0,${sy + 75}`} fill="#ffb366" opacity={0.11} />
        ))}
        {/* Cast-iron skillet edge & crumpled foil at upper-left */}
        <circle cx={190} cy={140} r={210} fill="#1f1e20" stroke="#0f0e10" strokeWidth={6} />
        <circle cx={190} cy={140} r={175} fill="#282629" />
        <polygon points="1540,95 1785,135 1820,295 1510,260" fill="#a8b0b6" stroke="#4f565c" strokeWidth={3} opacity={0.75} />

        {/* Ceramic diner plate + open/folding flour tortilla burrito */}
        <g transform="translate(960,575)">
          <ellipse cx={12} cy={18} rx={360} ry={255} fill="#000" opacity={0.34} />
          <ellipse cx={0} cy={0} rx={350} ry={245} fill="#efe7d6" stroke="#8a806e" strokeWidth={5} />
          <ellipse cx={0} cy={-6} rx={265} ry={182} fill="#e3dac6" stroke="#bfb5a0" strokeWidth={3} />

          {/* Warm flour tortilla */}
          <ellipse cx={0} cy={-8} rx={lerp(235, 195, foldWrap)} ry={lerp(155, 86, foldWrap)} fill="#e8cf99" stroke="#8f7242" strokeWidth={4} />
          {/* Charred tortilla toast spots */}
          {[
            [-95, -42, 16], [78, -52, 13], [-45, 48, 14], [105, 34, 18], [12, 58, 11],
          ].map(([cx, cy, r], i) => (
            <ellipse key={i} cx={cx} cy={cy * (1 - 0.45 * foldWrap)} rx={r} ry={r * 0.6} fill="#9c6e38" opacity={0.55} />
          ))}

          {/* Spiced shredded beef, beans & peppers inside (covered as tortilla folds) */}
          {foldWrap < 0.88 && (
            <g opacity={1 - foldWrap * 0.95}>
              <ellipse cx={0} cy={-10} rx={165} ry={58} fill="#6e3624" />
              <ellipse cx={-35} cy={-14} rx={125} ry={38} fill="#8a472e" />
              {[-90, -35, 25, 82].map((gx, i) => (
                <rect key={i} x={gx} y={-24 + (i % 2) * 14} width={28} height={9} rx={4} fill="#5e8742" transform={`rotate(${i * 22} ${gx} -18)`} />
              ))}
              {/* White crystalline ricin granules sprinkled onto the filling */}
              {sprinkle > 0.05 &&
                Array.from({ length: 18 }).map((_, i) => {
                  const appear = clamp((sprinkle - i * 0.04) * 4);
                  const rx = -55 + (rand(i, 11) - 0.5) * 120;
                  const ry = -12 + (rand(i, 12) - 0.5) * 38;
                  return <circle key={i} cx={rx} cy={ry} r={3.6 * appear} fill="#fafcff" opacity={0.95} />;
                })}
            </g>
          )}

          {/* Folded upper tortilla flap closing over the filling */}
          {foldWrap > 0.08 && (
            <path
              d={`M${-195},${-8} Q0,${lerp(-145, 68, foldWrap)} ${195},${-8} Q0,${lerp(-85, -78, foldWrap)} ${-195},${-8} Z`}
              fill="#ebd4a2"
              stroke="#8f7242"
              strokeWidth={4}
            />
          )}
        </g>

        {/* Falling ricin powder grains during sprinkle */}
        {sprinkle > 0.04 &&
          sprinkle < 0.96 &&
          Array.from({ length: 9 }).map((_, i) => {
            const p = ((f * 0.14 + i * 0.13) % 1);
            return (
              <circle
                key={i}
                cx={965 + (rand(i, 21) - 0.5) * 34}
                cy={lerp(395, 555, p)}
                r={3.4}
                fill="#ffffff"
                opacity={0.9 * (1 - p * 0.3)}
              />
            );
          })}

        {/* Walt's left articulated hand steadying & folding the tortilla */}
        <g
          transform={`translate(${lerp(565, 695, foldWrap)},${lerp(760, 675, foldWrap)}) rotate(${lerp(34, 48, foldWrap)}) scale(-2350,2350)`}
        >
          <HandBack pal={PAL_T} curl={lerp(0.28, 0.55, foldWrap)} thumb={0.5} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
        </g>

        {/* Walt's right articulated hand pinching the small creased ricin paper packet, then folding */}
        <g
          transform={`translate(${lerp(1235, 1225, foldWrap) + tapShake},${lerp(585, 685, foldWrap)}) rotate(${lerp(-38, -46, foldWrap)}) scale(2350)`}
        >
          {foldWrap < 0.25 && (
            <g transform="translate(-0.055,-0.085) rotate(-22)">
              <polygon points="-0.028,-0.022 0.026,-0.018 0.022,0.024 -0.024,0.02" fill="#f5f1e6" stroke="#7d7668" strokeWidth={0.0022} />
              <line x1={-0.022} y1={-0.002} x2={0.02} y2={0.002} stroke="#cfc8b6" strokeWidth={0.0018} />
            </g>
          )}
          <HandBack pal={PAL_T} curl={lerp(0.74, 0.52, foldWrap)} thumb={0.82} sleeve={PAL_T.jacket} sleeveShade={PAL_T.jacketShade} cuff={PAL_T.shirt} forearm={0.68} />
        </g>

        <Motes f={g} n={16} color="#ffc482" seed={2} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f110c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S2 · tight push-in on the mute uncle watching: "...Tuco's uncle. He cannot speak..." ─────────── */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s2;
  const dur = CUTS.s3 - CUTS.s2;
  const t = f / dur;
  const e = easeInOut(t);
  const cam: Cam = {
    x: lerp(-0.55, -0.68, e),
    y: lerp(1.18, 1.12, e),
    z: lerp(1.65, 2.22, e),
    f: lerp(1480, 1680, e),
    shiftY: lerp(-45, -55, e),
    focus: 1.6,
    aperture: 0.3,
  };

  const strain = prog(g, B(690.8), B(692.0), easeInOut);
  const tremor = noise1(f * 0.45, 5) * 0.03 * strain;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <ShackRoom cam={cam} f={g} />
        <ShackTable cam={cam} x={0.28} z={3.65} w={1.4} />
        {/* Wrapped burrito plate placed on the table right in front of the uncle */}
        <Card cam={cam} x={-0.12} y={0.785} z={3.55} blur={false}>
          <Plate r={0.14} />
          <ellipse cx={0} cy={-0.018} rx={0.085} ry={0.034} fill="#ebd4a2" stroke="#8f7242" strokeWidth={0.004} />
        </Card>

        <WheelchairUncle
          cam={cam}
          x={-0.72 + tremor * 0.2}
          z={3.62}
          f={g}
          bellHit={0}
          lookX={lerp(0.42, 0.28, e)}
          lookY={lerp(-0.04, 0.14, strain)}
          brow={lerp(0.58, 0.82, strain)}
          mouth="frown"
        />

        <ShackFore />
        <Motes f={g} n={20} color="#ffc482" seed={5} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#1f110c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S3 · macro close-up on the brass service bell: "...and he can still work a bell." ─────────── */
const S3: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s3;
  // Trembling hover before first strike at 693.35s, then rapid strikes peaking at g=315 (frame 20810)
  const active = g >= B(693.35);
  const hitWave = active ? Math.pow(Math.max(0, Math.cos((g - B(693.67)) * 0.65)), 2) : 0;
  const tremorX = noise1(f * 0.55, 3) * 6;
  const tremorY = noise1(f * 0.62, 9) * 5;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        {/* Warm dark shack wood backdrop + sunset slat */}
        <rect x={0} y={0} width={W} height={H} fill="#261b14" />
        <polygon points="0,120 1920,360 1920,560 0,310" fill="#ffb366" opacity={0.14} />
        <polygon points="0,580 1920,820 1920,960 0,720" fill="#ffb366" opacity={0.09} />

        {/* Chrome wheelchair frame tube & worn wooden armrest plank */}
        <line x1={380} y1={790} x2={380} y2={1080} stroke="#7c8790" strokeWidth={54} />
        <line x1={368} y1={790} x2={368} y2={1080} stroke="#b8c4ce" strokeWidth={12} opacity={0.65} />
        <rect x={0} y={735} width={1320} height={96} rx={18} fill="#593f2b" stroke="#1c130d" strokeWidth={5} />
        <line x1={20} y1={758} x2={1295} y2={758} stroke="#78583e" strokeWidth={6} opacity={0.6} />

        {/* Bolted steel clamp + gleaming brass hotel service bell */}
        <g transform="translate(1035,735)">
          {/* steel strap & hex bolts */}
          <rect x={-165} y={-22} width={330} height={28} rx={4} fill="#464b52" stroke="#17191c" strokeWidth={4} />
          <circle cx={-125} cy={-8} r={9} fill="#8c949e" stroke="#17191c" strokeWidth={3} />
          <circle cx={125} cy={-8} r={9} fill="#8c949e" stroke="#17191c" strokeWidth={3} />

          {/* brass bell dome */}
          <g transform={`translate(${hitWave > 0.6 ? Math.sin(f * 2.4) * 3 : 0},0)`}>
            <path d="M-138,-22 A138,118 0 0 1 138,-22 Z" fill="#d8ae44" stroke="#241b08" strokeWidth={5} />
            <path d="M-108,-30 A108,94 0 0 1 -18,-126 L-8,-26 Z" fill="#f5dc84" opacity={0.62} />
            <path d="M45,-122 A112,98 0 0 1 124,-28 L60,-26 Z" fill="#9c7622" opacity={0.55} />
          </g>

          {/* top stem & plunger button */}
          <rect x={-12} y={-172 + 24 * hitWave} width={24} height={38} fill="#b8902e" stroke="#241b08" strokeWidth={4} />
          <ellipse cx={0} cy={-176 + 24 * hitWave} rx={32} ry={12} fill="#f2d679" stroke="#241b08" strokeWidth={4} />

          {/* Metallic acoustic ring arcs on strike */}
          {hitWave > 0.45 && (
            <g stroke="#ffe89e" strokeWidth={5} fill="none" strokeLinecap="round" opacity={hitWave}>
              <path d="M-185,-95 A195,195 0 0 1 -125,-205" />
              <path d="M-225,-75 A235,235 0 0 1 -150,-235" opacity={0.6} />
              <path d="M185,-95 A195,195 0 0 0 125,-205" />
              <path d="M225,-75 A235,235 0 0 0 150,-235" opacity={0.6} />
            </g>
          )}
        </g>

        {/* Uncle's trembling cardigan-sleeved articulated hand striking directly down onto the brass plunger */}
        <g
          transform={`translate(${805 + tremorX},${418 + 38 * hitWave + tremorY}) rotate(118) scale(2550)`}
        >
          <HandBack
            pal={UNCLE.pal}
            curl={0.42 + 0.16 * hitWave}
            thumb={0.62}
            sleeve={UNCLE.pal.jacket}
            sleeveShade={UNCLE.pal.jacketShade}
            cuff={UNCLE.pal.shirt}
            forearm={0.85}
          />
        </g>

        <Motes f={g} n={16} color="#ffc482" seed={9} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.7} grain={0.075} shadow="#1f110c" gradeO={0.15} />
    </AbsoluteFill>
  );
};

/* ─────────── S4 · "The bell rings until the plate is on the floor..." ─────────── */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s4;
  const dur = CUTS.s5 - CUTS.s4;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(-0.1, 0.05, easeInOut(t)),
    y: 1.12,
    z: lerp(0.55, 0.68, easeInOut(t)),
    f: 1180,
    shiftY: -55,
    focus: 2.8,
    aperture: 0.3,
  };

  const shove = prog(g, B(695.3), B(695.75), easeIn);
  const fall = prog(g, B(695.65), B(696.05), easeIn);
  const burst = clamp((g - B(696.05)) / 18);
  const bellPulse = g < B(695.45) ? Math.pow(Math.max(0, Math.sin(f * 0.72)), 2) : 0;

  // Distributor seated at right side of table, jolting back as his uncle knocks the plate onto the floor
  const poseD: Pose = chairSit({
    torso: lerp(10, -8, fall),
    neck: lerp(4, 10, fall),
    shL: lerp(34, 18, fall),
    shR: lerp(36, 24, fall),
    elL: 28,
    elR: 26,
    hipL: 62, hipR: 64, knL: 94, knR: 96,
    breathe: 0.6,
  });

  // Walt standing/seated back-center watching the plan unravel
  const poseW: Pose = {
    torso: 4,
    neck: 5,
    shL: 24, shR: 28,
    elL: 48, elR: 46,
    hipL: 5, hipR: -5, knL: 5, knR: 6,
    breathe: 0.65,
  };

  const plateX = lerp(-0.08, 0.28, shove);
  const plateY = fall > 0 ? lerp(0.785, 0.02, fall * fall) : 0.785;

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <ShackRoom cam={cam} f={g} />

        {/* Walt in mid-background watching in alarm */}
        <Card cam={cam} x={0.05} y={0} z={4.25} blur={false}>
          <Figure
            pose={poseW}
            view={0.54}
            look={teacherLook({
              yaw: 0.14,
              lids: 0.1,
              lookX: 0.05,
              lookY: lerp(0.1, 0.35, fall),
              brow: 0.55,
              mouth: fall > 0.5 ? "open" : "flat",
              mouthOpen: 0.14 * fall,
            })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
        </Card>

        {/* Uncle at left of table: ringing furiously, then sweeping the plate off the edge */}
        <WheelchairUncle
          cam={cam}
          x={-0.78 + 0.12 * shove}
          z={3.58}
          f={g}
          bellHit={bellPulse}
          lookX={0.38}
          lookY={lerp(0.06, 0.34, fall)}
          brow={0.82}
          mouth="frown"
        />

        {/* Distributor at right of table */}
        <Card cam={cam} x={0.88} y={0} z={3.62} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={distDuskLook({
              yaw: 0.2,
              lids: 0.12,
              lookX: 0.32,
              lookY: lerp(0.08, 0.38, fall),
              brow: 0.68,
              mouth: "open",
              mouthOpen: 0.22,
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
        </Card>

        <ShackTable cam={cam} x={0.16} z={3.48} w={1.4} />

        {/* Plate + burrito flying off the table and shattering on the floorboards at y=0.02 */}
        {burst <= 0.01 ? (
          <Card cam={cam} x={plateX} y={plateY} z={3.32} blur={false}>
            <g transform={`rotate(${shove * 38})`}>
              <Plate r={0.14} shadow={fall < 0.1} />
              <ellipse cx={0} cy={-0.018} rx={0.085} ry={0.034} fill="#ebd4a2" stroke="#8f7242" strokeWidth={0.004} />
            </g>
          </Card>
        ) : (
          <Card cam={cam} x={0.24} y={0.04} z={3.22} blur={false}>
            <PlateBurst t={burst} n={12} r={0.22} seed={4} />
            {/* Spilled burrito & scattered filling on the wood floor */}
            <g transform={`translate(${0.08 * burst},-0.01) rotate(14)`}>
              <ellipse cx={0} cy={0} rx={0.11} ry={0.042} fill="#ebd4a2" stroke="#8f7242" strokeWidth={0.005} />
              <ellipse cx={0.07} cy={0.014} rx={0.055} ry={0.02} fill="#6e3624" />
            </g>
          </Card>
        )}

        <ShackFore />
        <Motes f={g} n={20} color="#ffc482" seed={6} drift={0.6} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f110c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

/* ─────────── S5 · "...and the nephew finally understands what he has been told." ─────────── */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + CUTS.s5;
  const dur = CUTS.end - CUTS.s5;
  const t = f / dur;
  const cam: Cam = {
    x: lerp(0.04, 0.16, easeInOut(t)),
    y: 1.16,
    z: lerp(0.68, 0.86, easeInOut(t)),
    f: 1220,
    shiftY: -45,
    focus: 2.8,
    aperture: 0.3,
  };

  const rise = prog(g, B(696.6), B(697.8), easeOut);
  const turnHead = prog(g, B(697.4), B(698.6), easeInOut);
  const ding = Math.sin(clamp((g - B(696.8)) / 10) * Math.PI);

  // Distributor stands up from table, drawing his pistol and turning his glare onto Walt & Jesse
  const poseD: Pose = {
    torso: lerp(12, 4, rise),
    neck: lerp(6, -3, turnHead),
    shL: lerp(28, -10, rise),
    shR: lerp(34, 62, rise),
    elL: lerp(32, 48, rise),
    elR: lerp(28, 16, rise),
    hipL: lerp(54, 6, rise),
    hipR: lerp(56, -5, rise),
    knL: lerp(84, 5, rise),
    knR: lerp(86, 6, rise),
    breathe: 0.75,
  };
  const ancD = rigAnchors(poseD, DIST_DUSK.height, 0.56);

  // Walt & Jesse tensing to bolt on the left (hands clear of Uncle's face)
  const poseW: Pose = {
    torso: -4,
    neck: 2,
    shL: 16, shR: 22,
    elL: 48, elR: 52,
    hipL: 7, hipR: -6, knL: 8, knR: 7,
    breathe: 0.7,
  };
  const poseJ: Pose = {
    torso: -6,
    neck: 3,
    shL: 30, shR: 36,
    elL: 58, elR: 54,
    hipL: 8, hipR: -7, knL: 10, knR: 8,
    breathe: 0.75,
  };

  return (
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SoftDefs />
        <ShackRoom cam={cam} f={g} />

        {/* Uncle in background-center glaring at Walt & ringing once to point him out */}
        <WheelchairUncle
          cam={cam}
          x={0.12}
          z={4.15}
          flip
          f={g}
          bellHit={ding}
          lookX={0.38}
          lookY={0.02}
          brow={0.85}
          mouth="frown"
        />

        {/* Jesse & Walt on the left backing half a step toward the door */}
        <Card cam={cam} x={-0.95} y={0} z={3.85} blur={false}>
          <Figure
            pose={poseJ}
            view={0.58}
            look={partnerLook({ yaw: 0.24, lids: 0.1, lookX: 0.36, lookY: 0.02, brow: 0.65, mouth: "open", mouthOpen: 0.14 })}
            pal={PAL_P}
            height={PARTNER.height}
            rimLight="#ffb469"
            rimSide={1}
            outfit="hoodie"
          />
        </Card>

        <Card cam={cam} x={-0.42} y={0} z={3.58} blur={false}>
          <Figure
            pose={poseW}
            view={0.58}
            look={teacherLook({ yaw: 0.24, lids: 0.12 + blink(g, 3) * 0.4, lookX: 0.38, lookY: 0.02, brow: 0.52, mouth: "flat" })}
            pal={PAL_T}
            height={TEACHER.height}
            rimLight="#ffb469"
            rimSide={1}
          />
        </Card>

        <ShackTable cam={cam} x={0.32} z={3.65} w={1.35} />

        {/* Distributor rising at right with leveled pistol */}
        <Card cam={cam} x={0.96} y={lerp(-0.22, 0, rise)} z={3.55} flip blur={false}>
          <Figure
            pose={poseD}
            view={0.56}
            look={distDuskLook({
              yaw: 0.22,
              lids: 0.14,
              lookX: lerp(-0.18, 0.38, turnHead),
              lookY: lerp(0.24, 0.02, turnHead),
              brow: lerp(0.45, 0.85, turnHead),
              mouth: turnHead > 0.5 ? "open" : "flat",
              mouthOpen: 0.24 * turnHead,
            })}
            pal={DIST_DUSK.pal}
            height={DIST_DUSK.height}
            rimLight="#ffb469"
            rimSide={-1}
          />
          <g transform={`translate(${ancD.wristR.x + 0.04},${ancD.wristR.y - 0.01})`}>
            <Pistol rot={lerp(24, -6, turnHead)} />
          </g>
        </Card>

        {/* Shattered plate shards & spilled burrito in lower foreground */}
        <Card cam={cam} x={0.28} y={0.04} z={3.18} blur={false}>
          <PlateBurst t={1} n={12} r={0.22} seed={4} />
          <ellipse cx={0.08} cy={-0.01} rx={0.11} ry={0.042} fill="#ebd4a2" stroke="#8f7242" strokeWidth={0.005} />
          <ellipse cx={0.14} cy={0.005} rx={0.055} ry={0.02} fill="#6e3624" />
        </Card>

        <ShackFore />
        <Motes f={g} n={20} color="#ffc482" seed={8} drift={0.5} />
      </svg>
      <Finish f={g} vig={0.68} grain={0.075} shadow="#1f110c" gradeO={0.16} />
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={CUTS.s1} durationInFrames={CUTS.s2 - CUTS.s1} name="S1 ricin burrito"><S1 /></Sequence>
    <Sequence from={CUTS.s2} durationInFrames={CUTS.s3 - CUTS.s2} name="S2 uncle watches"><S2 /></Sequence>
    <Sequence from={CUTS.s3} durationInFrames={CUTS.s4 - CUTS.s3} name="S3 work a bell"><S3 /></Sequence>
    <Sequence from={CUTS.s4} durationInFrames={CUTS.s5 - CUTS.s4} name="S4 plate on the floor"><S4 /></Sequence>
    <Sequence from={CUTS.s5} durationInFrames={CUTS.end - CUTS.s5} name="S5 nephew understands"><S5 /></Sequence>
    <Sequence from={0} durationInFrames={END}><Audio src={staticFile("sfx/b_room_house.wav")} volume={0.035} /></Sequence>
    <Sequence from={B(685.6)} durationInFrames={36}><Audio src={staticFile("sfx/b_paper.wav")} volume={0.07} /></Sequence>
    <Sequence from={B(693.45)} durationInFrames={34}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.13} /></Sequence>
    <Sequence from={B(694.6)} durationInFrames={34}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.13} /></Sequence>
    <Sequence from={B(696.0)} durationInFrames={42}><Audio src={staticFile("sfx/b_faint_crash.wav")} volume={0.13} /></Sequence>
    <Sequence from={B(696.8)} durationInFrames={28}><Audio src={staticFile("sfx/b_bell.wav")} volume={0.11} /></Sequence>
  </AbsoluteFill>
);
