// SCENE 067 · "top" · set: suburbNight · narration 1116.28s → 1128.07s (11.79s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   That is the top of the arch. It is the highest his life will ever get.
//   Then the money arrives in quantities that stop making sense. Millions, in bags, into a house with a leaking pool.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   That@1116.74 is@1117.02 the@1117.24 top@1117.38 of@1117.62 the@1117.78 arch.@1117.90 It@1118.62 is@1118.72
//   the@1118.80 highest@1118.92 his@1119.20 life@1119.48 will@1119.74 ever@1119.92 get.@1120.24 Then@1121.42
//   the@1121.70 money@1121.80 arrives@1122.04 in@1122.34 quantities@1122.52 that@1122.82 stop@1123.22
//   making@1123.44 sense.@1123.72 Millions@1124.62 in@1125.00 bags@1125.46 into@1125.80 a@1126.38 house@1126.54
//   with@1126.80 a@1127.02 leaking@1127.14 pool.@1127.38 pool.@1127.74
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 67, id: "top", set: "suburbNight", cutIn: 1116.28, cutOut: 1128.07 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
