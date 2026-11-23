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

/** "The Partner" – younger lead (mid-20s). ORIGINAL design: lean, 1.74 m, dark-brown messy curls,
 *  freckles, olive-drab hoodie over an oatmeal tee, dark denim. After captivity: bruised, grimy. */
export const PARTNER = {
  height: 1.74,
  pal: {
    skin: "#e2ad8a", skinShade: "#b98163", skinLight: "#f5cfb2",
    jacket: "#5b6b4a", jacketShade: "#3e4a32", jacketLight: "#7a8c64",
    shirt: "#cfc6b2", shirtShade: "#a39a86",
    pants: "#2f3b52", pantsShade: "#1f2839",
    shoes: "#2a2a2e", outline: "#17130f",
  } as Palette,
  hair: { base: "#4a3020", dark: "#2b1b12", light: "#7b5536", style: "curls" } as HairDef,
};

export const partnerLook = (o: Partial<HeadLook> = {}): HeadLook => ({
  lids: 0.1, lookX: 0, lookY: 0, brow: 0, mouth: "neutral", hair: PARTNER.hair, glasses: false, stubble: 0.45, age: 0.12, ...o,
});

/* ── remaining principal roles: ORIGINAL designs (not likenesses of the series' actors or costumes) ── */

/** "The Brother-in-law" (DEA agent role). Broad, 1.83 m, sandy-brown buzz cut, full mustache,
 *  tan short-sleeve camp shirt with a pattern band, khakis, badge on belt. */
export const BROTHER = {
  height: 1.83,
  pal: {
    skin: "#e9b996", skinShade: "#c48c6c", skinLight: "#f8d4b6",
    jacket: "#c9a46a", jacketShade: "#9e7d4a", jacketLight: "#e2c48e",
    shirt: "#7c5a34", shirtShade: "#5a4024",
    pants: "#b9a98a", pantsShade: "#8f8166",
    shoes: "#3a2a1e", outline: "#1b1410",
  } as Palette,
  hair: { base: "#9b7a52", dark: "#6e5236", light: "#c9a87e", style: "buzz" } as HairDef,
};
export const brotherLook = (o: Partial<HeadLook> = {}): HeadLook => ({ lids: 0.1, lookX: 0, lookY: 0, brow: 0.2, mouth: "neutral", hair: BROTHER.hair, beard: "mustache", age: 0.7, ...o });

/** "The Restaurateur" (distributor role). Composed, 1.78 m, neat dark side-part going grey at the temples,
 *  trimmed grey beard, slate-blue suit, crisp white shirt, no tie, pocket square. */
export const RESTAURATEUR = {
  height: 1.78,
  pal: {
    skin: "#a8724f", skinShade: "#83563a", skinLight: "#c48e6a",
    jacket: "#3d4c63", jacketShade: "#2a3547", jacketLight: "#56698a",
    shirt: "#f1f1ec", shirtShade: "#cfd0c8",
    pants: "#3a475c", pantsShade: "#283244",
    shoes: "#1e1a18", outline: "#14100e",
  } as Palette,
  hair: { base: "#2e2a28", dark: "#1a1716", light: "#8f8a84", style: "sidepart" } as HairDef,
};
export const restaurateurLook = (o: Partial<HeadLook> = {}): HeadLook => ({ lids: 0.2, lookX: 0, lookY: 0, brow: 0.1, mouth: "flat", hair: RESTAURATEUR.hair, beard: "trim", age: 0.75, ...o });

/** "The Wife". 1.68 m, shoulder-length auburn waves, sage cardigan over a cream top, dark jeans. */
export const WIFE = {
  height: 1.68,
  pal: {
    skin: "#f0c4a4", skinShade: "#cf9a7c", skinLight: "#fbdcc5",
    jacket: "#8fa58a", jacketShade: "#6c8168", jacketLight: "#adc2a8",
    shirt: "#efe6d4", shirtShade: "#d1c6b0",
    pants: "#34405a", pantsShade: "#252e42",
    shoes: "#5a3a2a", outline: "#1d1512",
  } as Palette,
  hair: { base: "#8a4a2a", dark: "#5e2f1a", light: "#c27a4e", style: "long" } as HairDef,
};
export const wifeLook = (o: Partial<HeadLook> = {}): HeadLook => ({ lids: 0.12, lookX: 0, lookY: 0, brow: 0, mouth: "neutral", hair: WIFE.hair, age: 0.35, lipstick: "#a8484c", ...o });
