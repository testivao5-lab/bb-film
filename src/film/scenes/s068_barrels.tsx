// SCENE 068 · "barrels" · set: desertDusk · narration 1128.07s → 1149.38s (21.31s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The number kept changing. In that junkyard it was seven hundred and thirty-seven thousand dollars. Now there are barrels, and he cannot spend a dollar of it. Not a car. Not a house. Not a pool in a yard, because somebody would ask a question.
//   It isn't power. It's inventory, sitting in the ground in a desert, waiting.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1128.40 number@1128.78 kept@1128.96 changing.@1129.16 In@1130.14 that@1130.26 junkyard@1130.36 it@1130.86
//   was@1131.02 $737@1131.14 ,000.@1132.10 Now@1133.52 there@1133.96 are@1134.10 barrels,@1134.24 and@1135.32
//   he@1135.44 cannot@1135.54 spend@1135.76 a@1136.14 dollar@1136.38 of@1136.74 it.@1136.98 Not@1137.46 a@1137.72
//   car,@1137.96 not@1138.60 a@1138.80 house,@1138.90 not@1139.60 a@1139.84 pool@1139.92 in@1140.20 a@1140.40
//   yard@1140.48 because@1140.72 somebody@1141.02 would@1141.40 ask@1141.74 a@1142.04 question.@1142.16 It@1143.24
//   isn't@1143.72 power.@1143.96 It's@1145.00 inventory,@1145.16 sitting@1146.16 in@1146.48 the@1146.70
//   ground,@1146.78 in@1147.54 a@1147.66 desert,@1147.74 waiting.@1148.52
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 68, id: "barrels", set: "desertDusk", cutIn: 1128.07, cutOut: 1149.38 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
