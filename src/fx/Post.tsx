// Film finishing: grain, vignette, colour grade, drifting dust. Cinematic, never "pop-up".
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { rand, noise1 } from "../lib/anim";
import { W, H } from "../lib/camera";

export const Grain: React.FC<{ f: number; o?: number }> = ({ f, o = 0.07 }) => (
  <AbsoluteFill style={{ opacity: o, mixBlendMode: "overlay", overflow: "hidden" }}>
    <div style={{
      position: "absolute", inset: -256,
      backgroundImage: `url(${staticFile("fx/grain.png")})`, backgroundSize: "512px 512px",
      transform: `translate(${Math.floor(rand(f, 1) * 256)}px, ${Math.floor(rand(f, 2) * 256)}px)`,
    }} />
  </AbsoluteFill>
);

export const Vignette: React.FC<{ o?: number; color?: string }> = ({ o = 0.65, color = "0,0,0" }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 70% at 50% 48%, rgba(${color},0) 55%, rgba(${color},${o}) 100%)`, pointerEvents: "none" }} />
);

/** colour grade overlay: tints shadows / lifts highlights */
export const Grade: React.FC<{ shadow?: string; o?: number; light?: string; lo?: number }> = ({ shadow = "#0a2440", o = 0.18, light, lo = 0.08 }) => (
  <>
    <AbsoluteFill style={{ background: shadow, mixBlendMode: "soft-light", opacity: o }} />
    {light && <AbsoluteFill style={{ background: light, mixBlendMode: "screen", opacity: lo }} />}
  </>
);

/** dust motes floating through light (screen-space, depth-scaled sizes) */
export const Motes: React.FC<{ f: number; n?: number; color?: string; seed?: number; region?: [number, number, number, number]; drift?: number }> = ({ f, n = 50, color = "#cfe9ff", seed = 1, region = [0, 0, W, H], drift = 1 }) => {
  const [rx, ry, rw, rh] = region;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const depth = 0.3 + rand(i, seed) * 0.7;
        const x = rx + ((rand(i, seed + 1) * rw + f * 0.25 * drift * depth + noise1(f * 0.01 + i, seed) * 30) % rw + rw) % rw;
        const y = ry + ((rand(i, seed + 2) * rh - f * 0.12 * depth + noise1(f * 0.013 + i * 3, seed + 5) * 24) % rh + rh) % rh;
        const r = 0.8 + depth * 2.4;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.05 + i));
        return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={0.18 * tw * depth} />;
      })}
    </svg>
  );
};

/** anamorphic-ish horizontal streak for strong light sources */
export const Streak: React.FC<{ x: number; y: number; w?: number; color?: string; o?: number }> = ({ x, y, w = 600, color = "#9fd8ff", o = 0.25 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - 3, width: w, height: 6, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: o, mixBlendMode: "screen", filter: "blur(2px)" }} />
);

export const Finish: React.FC<{ f: number; vig?: number; grain?: number; shadow?: string; gradeO?: number }> = ({ f, vig = 0.6, grain = 0.07, shadow, gradeO }) => (
  <>
    <Grade shadow={shadow} o={gradeO} />
    <Vignette o={vig} />
    <Grain f={f} o={grain} />
  </>
);

export { Img };
