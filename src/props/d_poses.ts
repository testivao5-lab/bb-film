// BATCH D kit · pose vocabulary + original extra-cast builder.
// Everything is a pure function of time. Units are metres / degrees (see src/rig/Figure.tsx).
import type { Palette } from "../rig/Figure";
import type { HeadLook, HairDef } from "../rig/Head";
import { mixHex } from "../rig/cast";
import { breath, blink, noise1, clamp, lerp } from "../lib/anim";

export interface ExtraDef { h: number; pal: Palette; look: HeadLook }

/** Original background person: same rig, new palette / hair / height. Never a likeness. */
export const extra = (o: {
  height?: number;
  skin?: string; skinShade?: string; skinLight?: string;
  jacket?: string; shirt?: string; pants?: string; shoes?: string;
  hair?: string; hairStyle?: HairDef["style"]; beard?: HeadLook["beard"];
  age?: number; stubble?: number; glasses?: boolean; lipstick?: string;
  sleeves?: boolean;
}): ExtraDef => {
  const skin = o.skin ?? "#d9a077";
  const jacket = o.jacket ?? "#4a5058";
  const shirt = o.shirt ?? "#c9c2b2";
  const pants = o.pants ?? "#3a4050";
  const shoes = o.shoes ?? "#2a2018";
  const hair = o.hair ?? "#2e2620";
  const pal: Palette = {
    skin,
    skinShade: o.skinShade ?? mixHex(skin, "#7a4028", 0.32),
    skinLight: o.skinLight ?? mixHex(skin, "#ffe9d0", 0.35),
    jacket,
    jacketShade: mixHex(jacket, "#0d1220", 0.42),
    jacketLight: mixHex(jacket, "#ffffff", 0.28),
    shirt,
    shirtShade: mixHex(shirt, "#100e12", 0.3),
    pants,
    pantsShade: mixHex(pants, "#080a12", 0.4),
    shoes,
    outline: "#15100e",
  };
  const look: HeadLook = {
    lids: 0.12, lookX: 0, lookY: 0, brow: 0, mouth: "neutral",
    hair: { base: hair, dark: mixHex(hair, "#080604", 0.55), light: mixHex(hair, "#f0e2cc", 0.35), style: o.hairStyle ?? "swept" },
    glasses: o.glasses ?? false, stubble: o.stubble ?? 0.25, age: o.age ?? 0.4,
    beard: o.beard ?? "none", lipstick: o.lipstick,
  };
  return { h: o.height ?? 1.75, pal, look };
};

/* ───────────────────────────── walk / run cycles ───────────────────────────── */

/** walk cycle, phase in radians. Returns a relaxed, weight-shifting gait (feet land on the floor via ground snap). */
export const walkPose = (ph: number, o: { amp?: number; armAmp?: number; lean?: number; look?: boolean } = {}) => {
  const a = o.amp ?? 24, aa = o.armAmp ?? 22;
  const s = Math.sin(ph), c = Math.cos(ph);
  return {
    torso: (o.lean ?? 2) + 1.2 * Math.cos(ph * 2),
    neck: 1.5 * s,
    shL: -aa * s * 0.9 + 4, shR: aa * s * 0.9 - 4,
    elL: 16 + 12 * Math.max(0, -s), elR: 16 + 12 * Math.max(0, s),
    hipL: a * s, hipR: -a * s,
    knL: 12 + 34 * Math.max(0, -c), knR: 12 + 34 * Math.max(0, c),
    anL: 6 * s, anR: -6 * s,
    breathe: 0.4 + 0.3 * Math.sin(ph),
  };
};

export const runPose = (ph: number, o: { lean?: number } = {}) => {
  const s = Math.sin(ph), c = Math.cos(ph);
  return {
    torso: (o.lean ?? 14) + 2 * Math.cos(ph * 2),
    neck: -6,
    shL: 52 * s + 6, shR: -52 * s - 6,
    elL: 62 + 14 * Math.max(0, -s), elR: 62 + 14 * Math.max(0, s),
    hipL: 40 * s, hipR: -40 * s,
    knL: 24 + 62 * Math.max(0, -c), knR: 24 + 62 * Math.max(0, c),
    anL: 8 * s, anR: -8 * s,
    breathe: 0.8,
  };
};

/* ───────────────────────────── seated / kneeling / floor ───────────────────────────── */

/** seated on a 0.46 m chair: thighs forward, shins down; pelvis ends up ~0.46 m above the floor */
export const sitPose = (f: number, o: { lean?: number; armL?: number; armR?: number; elL?: number; elR?: number; kn?: number } = {}) => ({
  torso: o.lean ?? 4,
  neck: 0,
  shL: o.armL ?? 8, shR: o.armR ?? -8,
  elL: o.elL ?? 46, elR: o.elR ?? 46,
  hipL: 88, hipR: 86,
  knL: o.kn ?? 86, knR: (o.kn ?? 86) + 2,
  anL: 0, anR: 0,
  breathe: breath(f, 0.07),
});

/** one knee down, one foot planted (works on the floor via ground snap) */
export const kneelPose = (f: number, o: { lean?: number; arms?: [number, number]; elbows?: [number, number] } = {}) => ({
  torso: o.lean ?? 10, neck: -4,
  shL: o.arms?.[0] ?? 8, shR: o.arms?.[1] ?? -8,
  elL: o.elbows?.[0] ?? 30, elR: o.elbows?.[1] ?? 30,
  hipL: 92, hipR: 6,
  knL: 88, knR: 168,
  anL: 0, anR: 0,
  breathe: breath(f, 0.09),
});

export const BOTH_KNEES = (f: number, arms: [number, number] = [50, 50], elbows: [number, number] = [78, 78], lean = 6) => ({
  torso: lean, neck: -14,
  shL: arms[0], shR: arms[1], elL: elbows[0], elR: elbows[1],
  hipL: 6, hipR: 6, knL: 168, knR: 168, anL: 0, anR: 0,
  breathe: breath(f, 0.12),
});

/** seated at a table (0.74 m top): forearms angle forward-down so the hands land on the edge */
export const sitAtTable = (f: number, o: { lean?: number; reach?: number; armL?: number; armR?: number; elL?: number; elR?: number } = {}) => {
  const reach = o.reach ?? 0;
  return {
    torso: (o.lean ?? 8) + reach * 4, neck: -2,
    shL: (o.armL ?? 34) + reach * 10, shR: (o.armR ?? 30) + reach * 10,
    elL: o.elL ?? 62, elR: o.elR ?? 58,
    hipL: 88, hipR: 86, knL: 86, knR: 88, anL: 2, anR: 2,
    breathe: breath(f, 0.075),
  };
};

export const LYING = (f: number, o: Record<string, number> = {}) => ({
  torso: -90, neck: -8, shL: -6, shR: 12, elL: 8, elR: 40, hipL: 3, hipR: 14, knL: 4, knR: 24,
  breathe: breath(f, 0.14), ...o,
});

/** spilled onto the floor, not quite flat: torso propped, one arm out */
export const SPRAWLED = (f: number) => ({
  torso: -76, neck: 26, shL: -34, shR: 20, elL: 18, elR: 54, hipL: 16, hipR: -4, knL: 36, knR: 12,
  breathe: breath(f, 0.2),
});

/* ───────────────────────────── eyes ───────────────────────────── */

export const lookAt = (from: [number, number], to: [number, number], maxYaw = 1, maxTilt = 1) => {
  const dx = to[0] - from[0], dy = to[1] - from[1], d = Math.hypot(dx, dy) || 1;
  return { yaw: clamp(dx / d, -1, 1) * maxYaw, tilt: clamp(dy / d, -1, 1) * maxTilt };
};

/** natural lid + blink mix, salted per character so two people never blink together */
export const lidsOf = (f: number, salt: number, base = 0.15, every = 96) => clamp(base + blink(f, salt, every) * 0.85);

/** subtle continuous head life (moving hold) */
export const headLife = (f: number, salt: number, amp = 1) => ({
  yaw: noise1(f * 0.02, salt) * 0.05 * amp,
  rot: noise1(f * 0.017, salt + 3) * 1.6 * amp,
});

/** forearm swing helper for pointing / holding at a screen-space-ish direction on the body */
export const lerpPose = (a: number, b: number, t: number) => lerp(a, b, clamp(t));
