// SCENE 007 · "sold" · set: kitchenNight · narration 94.73s → 112.08s (17.35s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he sold his share to his partners for five thousand dollars and walked away, for a reason nobody will ever explain.
//   The company is worth two point one six billion now.
//   He looks it up every week. Years later, he will say that out loud to his partner, and it will sound like a confession.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@95.17 he@95.42 sold@95.59 his@95.80 share@95.97 to@96.17 his@96.30 partners@96.42 for@96.66 $5@96.94
//   ,000@97.19 and@97.53 walked@98.00 away.@98.19 For@99.00 a@99.03 reason,@99.14 nobody@99.69 will@99.83
//   ever@100.22 explain.@100.47 The@101.92 company@102.03 is@102.23 worth@102.45 $2@102.59 .16@102.97
//   billion@103.94 now.@104.50 He@105.80 looks@105.97 it@106.09 up@106.28 every@106.38 week.@106.58 Years@107.45
//   later,@107.66 he@108.25 will@108.42 say@108.52 that@108.69 out@108.88 loud@109.11 to@109.38 his@109.59
//   partner,@109.72 and@110.39 it@110.52 will@110.59 sound@110.69 like@110.92 a@111.19 confession.@111.31
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 7, id: "sold", set: "kitchenNight", cutIn: 94.73, cutOut: 112.08 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
