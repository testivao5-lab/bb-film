// Batch B · pose helpers (local: never edits src/rig/*). All angles in degrees for the Figure rig.
// Conventions (see src/rig/Figure.tsx): side view = facing +x. +shoulder = arm forward, +elbow = forearm
// folds forward, +hip = leg forward, +knee = shin folds backward. torso +90 = folded forward.
import { Pose, STAND } from "../rig/Figure";
import { clamp, lerp, smooth, rand, noise1 } from "../lib/anim";

/** one walk cycle: returns hips/knees/shoulders/elbows for a side-view (or 3/4) stride */
export function walkPose(phase: number, amp = 1, o: Partial<Pose> = {}): Pose {
  const p = phase * Math.PI * 2;
  const s = Math.sin(p), c = Math.cos(p);
  const hipF = 21 * amp, hipB = 15 * amp;
  const kneeL = 8 + 34 * amp * Math.max(0, Math.sin(p + 1.15));
  const kneeR = 8 + 34 * amp * Math.max(0, Math.sin(p + 1.15 + Math.PI));
  return {
    torso: 4 + 2 * amp * Math.sin(p * 2),
    neck: 2 - 3 * amp * Math.sin(p * 2),
    shL: -(16 * amp) * s - 6, shR: (16 * amp) * s + 6,
    elL: 20 + 14 * amp * Math.max(0, -s), elR: 20 + 14 * amp * Math.max(0, s),
    hipL: hipF * s + 3, hipR: -hipB * s - 3,
    knL: kneeL, knR: kneeR,
    breathe: 0.5,
    ...o,
  };
}

/** seated on the floor, back against something at +x, knees up (prisoner pose) */
export function floorSit(o: Partial<Pose> = {}): Pose {
  return { torso: -14, neck: 6, shL: -8, shR: -8, elL: 22, elR: 22, hipL: 78, hipR: 80, knL: 92, knR: 94, breathe: 0.4, ...o };
}

/** seated on a chair / chair-height edge, feet on the floor */
export function chairSit(o: Partial<Pose> = {}): Pose {
  return { torso: -4, neck: 2, shL: 4, shR: 4, elL: 26, elR: 26, hipL: 84, hipR: 86, knL: 84, knR: 86, breathe: 0.5, ...o };
}

/** kneeling on one knee, torso upright */
export function kneel(o: Partial<Pose> = {}): Pose {
  return { torso: 8, neck: -4, shL: 10, shR: 10, elL: 30, elR: 30, hipL: 62, hipR: -8, knL: 86, knR: 34, breathe: 0.45, ...o };
}

/** lying on the back, head toward −x */
export function lyingBack(o: Partial<Pose> = {}): Pose {
  return { torso: -90, neck: -4, shL: -8, shR: -8, elL: 14, elR: 20, hipL: 4, hipR: 8, knL: 6, knR: 10, breathe: 0.35, ...o };
}

/** lying face-down / on the side, head toward −x */
export function lyingProne(o: Partial<Pose> = {}): Pose {
  return { torso: -92, neck: 10, shL: -20, shR: 14, elL: 40, elR: 26, hipL: 6, hipR: 14, knL: 18, knR: 26, breathe: 0.3, ...o };
}

/** reached for a fall: knees buckle, torso tips, arms flail forward */
export function collapsing(t: number, o: Partial<Pose> = {}): Pose {
  // t 0 = standing, 1 = on the floor
  const e = smooth(t);
  return {
    torso: lerp(6, 62, e),
    neck: lerp(0, 18, e),
    shL: lerp(6, 54, e), shR: lerp(-6, 40, e),
    elL: lerp(14, 56, e), elR: lerp(14, 30, e),
    hipL: lerp(4, 66, e), hipR: lerp(-4, 52, e),
    knL: lerp(6, 104, e), knR: lerp(6, 96, e),
    breathe: 0.2,
    ...o,
  };
}

/** helper: a held-plate arm pose, both hands out in front at chest height */
export const HOLD_PLATE = { shL: 46, shR: 44, elL: 62, elR: 60 };

/** chatter-free trembling: small deterministic jitter */
export const tremor = (f: number, amp = 1, salt = 0) => noise1(f * 0.7, salt) * amp;

/** Replicates the Figure's ground-contact solve so props can be parented to the hands exactly. */
import { solveSkeleton } from "../rig/Figure";
export function rigAnchors(pose: Pose, height: number, view: number) {
  const S = solveSkeleton(pose, height, view);
  const k = S.k;
  const pts: [[number, number], number][] = [
    [S.pelvis, 0.13 * k], [S.chest, 0.15 * k], [S.headC, 0.13 * k],
    [S.legL.kn, 0.07 * k], [S.legR.kn, 0.07 * k], [S.legL.an, 0.06 * k], [S.legR.an, 0.06 * k],
    [S.armL.el, 0.05 * k], [S.armR.el, 0.05 * k], [S.armL.wr, 0.04 * k], [S.armR.wr, 0.04 * k],
  ];
  const off = -Math.max(...pts.map(([v, r]) => v[1] + r));
  const W = (p: [number, number]) => ({ x: p[0], y: p[1] + off });
  const wl = W(S.armL.wr), wr = W(S.armR.wr);
  return { off, k, wristL: wl, wristR: wr, mid: { x: (wl.x + wr.x) / 2, y: (wl.y + wr.y) / 2 }, head: W(S.headC), pelvis: W(S.pelvis) };
}
