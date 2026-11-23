// SCENE 070 · "hank-home" · set: livingroom · narration 1171.96s → 1193.35s (21.39s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the thing that ends it. Smaller than a person, quieter than a gun.
//   Hank got suspended for beating Jesse half to death, and then, with no badge and no gun, he got shot in a shopping-centre car park by two men in bulletproof vests, on his way to buy flowers for his wife. He is at home now, sorting a collection of minerals.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1172.56 the@1172.86 thing@1173.30 that@1173.52 ends@1173.65 it.@1173.89 Smaller@1174.80 than@1175.28
//   a@1175.43 person,@1175.52 quieter@1176.38 than@1176.60 a@1176.99 gun.@1177.10 Hank@1178.34 got@1178.49
//   suspended@1178.73 for@1178.95 beating@1179.49 Jesse@1179.73 half@1180.06 to@1180.36 death,@1180.54 and@1181.02
//   then,@1181.26 with@1181.63 no@1181.86 badge@1182.06 and@1182.34 no@1182.71 gun,@1182.93 he@1183.62 got@1183.67
//   shot@1183.80 in@1184.08 a@1184.38 shopping@1184.45 center@1184.73 car@1185.10 park@1185.36 by@1185.58
//   two@1185.91 men@1186.17 in@1186.41 bulletproof@1186.58 vests,@1187.04 on@1187.86 his@1188.04 way@1188.15
//   to@1188.34 buy@1188.49 flowers@1188.63 for@1188.88 his@1189.23 wife.@1189.34 He@1190.30 is@1190.65 at@1190.76
//   home@1190.88 now,@1191.04 sorting@1191.78 a@1191.97 collection@1192.17 of@1192.43 minerals.@1192.73
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 70, id: "hank-home", set: "livingroom", cutIn: 1171.96, cutOut: 1193.35 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
