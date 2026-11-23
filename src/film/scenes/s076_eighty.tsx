// SCENE 076 · "eighty" · set: desert · narration 1305.25s → 1328.49s (23.24s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   They are not there for Hank. They are there for the money, and the money is in a hole with a witness beside it.
//   Hank is on the ground with a bullet in his leg and the smartest man he knows is on his knees offering eighty million dollars for his life. Hank tells him it was decided ten minutes ago, says his name for the record, and Jack shoots him in the middle of it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   They@1305.86 are@1306.34 not@1306.44 there@1306.60 for@1306.80 Hank,@1313.28 Hank@1313.80 is@1314.28
//   on@1314.50 the@1314.62 ground@1314.74 with@1315.00 a@1315.24 bullet@1315.32 in@1315.62 his@1315.82 leg@1315.94
//   and@1316.18 the@1316.54 smartest@1316.64 man@1316.88 he@1317.32 knows@1317.48 is@1317.74 on@1317.94
//   his@1318.08 knees@1318.20 offering@1318.48 80@1318.96 million@1319.42 dollars@1319.80 for@1320.32 his@1320.50
//   life.@1320.62 Hank@1321.62 tells@1321.96 him@1322.24 it@1322.42 was@1322.56 decided@1322.68 10@1323.08
//   minutes@1323.42 ago,@1323.68 says@1324.36 his@1324.56 name@1324.74 for@1324.96 the@1325.20 record,@1325.32
//   and@1326.10 Jack@1326.18 shoots@1326.46 him@1327.02 in@1327.26 the@1327.34 middle@1327.42 of@1327.60
//   it.@1327.74
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 76, id: "eighty", set: "desert", cutIn: 1305.25, cutOut: 1328.49 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
