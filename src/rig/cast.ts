// ORIGINAL cast designs. These are new characters created for this film – they play the
// roles described in the narration but are not likenesses of the TV series' actors or
// costume designs. Heights in metres (1 unit = 1 m).
import type { Palette } from "./Figure";
import type { HairDef, HeadLook } from "./Head";

/** "The Teacher" – lead. Tall, lean, salt-and-pepper swept-back hair, round wire glasses,
 *  navy canvas work jacket over a burgundy henley. */
export const TEACHER = {
  height: 1.8,
  pal: {
    skin: "#e7b792", skinShade: "#c08a6b", skinLight: "#f8d3b3",
    jacket: "#33435a", jacketShade: "#232f40", jacketLight: "#4c6180",
    shirt: "#7a2e38", shirtShade: "#531d25",
    pants: "#45434b", pantsShade: "#2f2d34",
    shoes: "#4a3022", outline: "#1b1418",
  } as Palette,
  hair: { base: "#9a958f", dark: "#5f5852", light: "#cfcac3" } as HairDef,
};

export const teacherLook = (o: Partial<HeadLook> = {}): HeadLook => ({
  lids: 0.15, lookX: 0, lookY: 0, brow: 0, mouth: "neutral", hair: TEACHER.hair, glasses: true, stubble: 0.8, ...o,
});

/** blue-lab night grade applied to a palette (cool key, desaturated) */
export const tint = (pal: Palette, mix: (c: string) => string): Palette =>
  Object.fromEntries(Object.entries(pal).map(([k, v]) => [k, mix(v)])) as unknown as Palette;

export function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t);
  const g = Math.round(((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t);
  const bl = Math.round((pa & 255) * (1 - t) + (pb & 255) * t);
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}
