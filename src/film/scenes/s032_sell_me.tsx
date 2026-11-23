// SCENE 032 · "sell-me" · set: basement · narration 478.69s → 494.83s (16.14s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   So Walter White says the truest sentence of his life: “I sure as hell am looking for any reason not to. Sell me.”
//   And Krazy-8 sells him a promise, and admits in the same breath that any man in his position would make it, so it is worth nothing.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   So@479.27 Walter@479.33 White@479.57 says@479.88 the@480.13 truest@480.30 sentence@480.77 of@481.01 his@481.38
//   life.@481.45 I@482.54 sure@482.98 as@483.21 hell@483.42 am@483.68 looking@483.80 for@483.98 any@484.24
//   reason@484.48 not@484.81 to.@485.06 Sell@486.13 me.@486.44 and@487.27 crazier@487.71 sells@488.15 him@488.51
//   a@488.71 promise@488.80 and@489.12 admits@489.95 in@490.21 the@490.48 same@490.56 breath@490.74 that@490.98
//   any@491.18 man@491.39 in@491.65 his@491.80 position@491.92 would@492.30 make@492.50 it,@492.68 so@493.25
//   it@493.50 is@493.62 worth@493.69 nothing.@493.89
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 32, id: "sell-me", set: "basement", cutIn: 478.69, cutOut: 494.83 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
