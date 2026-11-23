// SCENE 065 · "i-won" · set: kitchenNight · narration 1080.44s → 1095.30s (14.86s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Home, later, to a wife in a house that has stopped being a home and started being an arrangement. She is smoking, staring at a wall. He stands in the doorway.
//   And what comes out of him is two words, and it is not a boast.
//   “I won.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Home@1080.94 later@1081.38 to@1081.80 a@1082.18 wife@1082.30 in@1082.50 a@1082.66 house@1082.74 that@1082.96
//   has@1083.14 stopped@1083.24 being@1083.46 a@1083.74 home@1083.88 and@1084.06 started@1084.22 being@1084.46
//   an@1084.76 arrangement.@1084.94 She@1086.08 is@1086.32 smoking,@1086.42 staring@1087.08 at@1087.36 a@1087.60
//   wall.@1087.64 He@1088.46 stands@1088.64 in@1088.80 the@1089.06 doorway.@1089.14 And@1090.50 what@1090.56
//   comes@1090.66 out@1090.82 of@1091.04 him@1091.16 is@1091.30 two@1091.38 words,@1091.58 and@1092.28 it@1092.46
//   is@1092.56 not@1092.68 a@1093.00 boast.@1093.28 I@1094.52 won.@1094.60
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 65, id: "i-won", set: "kitchenNight", cutIn: 1080.44, cutOut: 1095.3 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
