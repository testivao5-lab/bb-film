// Batch A · original background people (students) — generic designs built on the shared
// rig by varying palettes, hair and height (brief §4.1). No likenesses.
import type { Palette } from "../rig/Figure";
import type { HairDef, HeadLook } from "../rig/Head";
import { rand } from "../lib/anim";

export interface StudentDef {
  pal: Palette;
  hair: HairDef;
  height: number;
  hoodie?: boolean;
}

const mk = (
  skin: [string, string, string], top: [string, string, string], pants: [string, string],
  shoes = "#2a2a2e", outline = "#17130f",
): Palette => ({
  skin: skin[0], skinShade: skin[1], skinLight: skin[2],
  jacket: top[0], jacketShade: top[1], jacketLight: top[2],
  shirt: top[1], shirtShade: top[1],
  pants: pants[0], pantsShade: pants[1],
  shoes, outline,
});

export const STUDENTS: StudentDef[] = [
  {
    pal: mk(["#e0b18a", "#b98a68", "#f4d0b0"], ["#6a8a5a", "#4a6440", "#87a874"], ["#3a4250", "#2a3140"]),
    hair: { base: "#3a2a1c", dark: "#241812", light: "#5f4630", style: "long" },
    height: 1.66,
  },
  {
    pal: mk(["#8a5a3c", "#6a422c", "#a87450"], ["#c8a03a", "#9c7c2c", "#e0bc5c"], ["#4a4a52", "#34343c"]),
    hair: { base: "#1e1612", dark: "#120d0a", light: "#3c3028", style: "buzz" },
    height: 1.79,
    hoodie: true,
  },
  {
    pal: mk(["#f0c4a4", "#cd9a7c", "#fbdcc4"], ["#7a5a8a", "#5a4064", "#9a7aa8"], ["#2f3b52", "#212a3c"]),
    hair: { base: "#6b4a2f", dark: "#4a3020", light: "#9a7450", style: "long" },
    height: 1.62,
  },
  {
    pal: mk(["#c68a5e", "#9c6844", "#e0a878"], ["#a84a44", "#7c342f", "#c86a60"], ["#37424e", "#262e38"]),
    hair: { base: "#2b1b12", dark: "#1a110c", light: "#4a3020", style: "curls" },
    height: 1.74,
    hoodie: true,
  },
  {
    pal: mk(["#e8c39a", "#c49a74", "#f7dcbc"], ["#4a6a8a", "#35506a", "#6888a8"], ["#5a5248", "#403a32"]),
    hair: { base: "#4a3a2a", dark: "#2e241a", light: "#6f5a42", style: "sidepart" },
    height: 1.71,
  },
];

export const studentLook = (i: number, o: Partial<HeadLook> = {}): HeadLook => ({
  lids: 0.12,
  lookX: 0,
  lookY: 0,
  brow: 0,
  mouth: "neutral",
  hair: STUDENTS[i % STUDENTS.length].hair,
  glasses: i % 5 === 3,
  stubble: 0,
  age: 0.05,
  ...o,
});

/** a desk-side seated pose (b_pose.chairSit with per-student variation) */
export const seatVary = (i: number) => (rand(i, 5) - 0.5) * 6;
