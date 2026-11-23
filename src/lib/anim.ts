// Animation helpers – every value is a pure function of the frame number.
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => { t = clamp(t); return t * t * (3 - 2 * t); };
export const easeInOut = (t: number) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
export const easeIn = (t: number) => Math.pow(clamp(t), 3);
/** overshoot (follow-through) */
export const easeOutBack = (t: number, k = 1.70158) => { t = clamp(t) - 1; return t * t * ((k + 1) * t + k) + 1; };

export type Ease = (t: number) => number;
/** piece-wise keyframes [[frame, value], ...] eased between keys, held outside */
export function kf(f: number, keys: [number, number][], ease: Ease = easeInOut): number {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, v0] = keys[i], [f1, v1] = keys[i + 1];
    if (f <= f1) return lerp(v0, v1, ease((f - f0) / (f1 - f0)));
  }
  return keys[keys.length - 1][1];
}
/** progress 0..1 between two frames */
export const prog = (f: number, a: number, b: number, ease: Ease = easeInOut) => ease((f - a) / (b - a));

// deterministic value noise (for wobble, flicker, dust)
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
export const rand = (i: number, salt = 0) => hash(i * 17.17 + salt * 101.3);
export function noise1(x: number, salt = 0) {
  const i = Math.floor(x), t = x - i, u = t * t * (3 - 2 * t);
  return lerp(hash(i + salt * 57.3), hash(i + 1 + salt * 57.3), u) * 2 - 1;
}
/** natural blink: returns 0..1 lid closure */
export function blink(f: number, salt = 0, every = 110) {
  const cyc = Math.floor(f / every), off = Math.floor(rand(cyc, salt) * (every - 12));
  const t = f - cyc * every - off;
  return t >= 0 && t < 7 ? Math.sin((t / 7) * Math.PI) : 0;
}
/** breathing 0..1 */
export const breath = (f: number, rate = 0.075, phase = 0) => (Math.sin(f * rate + phase) + 1) / 2;
