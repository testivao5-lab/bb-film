// SCENE 072 · "garage" · set: garage · narration 1220.62s → 1245.11s (24.49s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The confrontation, when it comes, is a garage, in daylight, over a car.
//   “If that's true that you don't know who I am, then maybe your best course would be to tread lightly.”
//   Which is Walter White threatening a man with the only thing he has left, which is a reputation he is talking too loudly about.
//   Hank gets in his car, drives away, pulls over, and is sick on the street.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1221.06 confrontation@1221.54 when@1221.82 it@1222.45 comes@1222.58 is@1222.80 a@1223.32 garage@1223.39
//   in@1223.63 daylight@1224.32 over@1224.58 a@1225.41 car.@1225.56 If@1227.02 that's@1227.15 true@1227.52
//   that@1227.78 you@1228.10 don't@1228.23 know@1228.56 who@1228.69 I@1228.86 am,@1229.04 then@1229.86
//   maybe@1230.10 your@1230.30 best@1230.49 course@1230.67 would@1231.08 be@1231.34 to@1231.47 tread@1231.60
//   lightly,@1231.82 which@1233.02 is@1233.19 Walter@1233.32 White@1233.52 threatening@1233.88 a@1234.17
//   man@1234.41 with@1234.56 the@1234.71 only@1234.84 thing@1235.08 he@1235.36 has@1235.52 left,@1235.65
//   which@1236.41 is@1236.58 a@1236.69 reputation@1236.80 he@1237.13 is@1237.80 talking@1237.89 too@1238.10
//   loudly@1238.39 about.@1238.63 Hank@1240.02 gets@1240.45 in@1240.65 his@1240.80 car,@1240.91 drives@1241.54
//   away,@1241.69 pulls@1242.69 over,@1242.82 and@1243.60 is@1243.67 sick@1243.78 on@1244.04 the@1244.21
//   street.@1244.32
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 72, id: "garage", set: "garage", cutIn: 1220.62, cutOut: 1245.11 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
