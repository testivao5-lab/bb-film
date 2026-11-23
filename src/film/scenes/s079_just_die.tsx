// SCENE 079 · "just-die" · set: bar · narration 1362.54s → 1385.69s (23.15s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he walks eight miles into town, in a coat, and uses a payphone in a bar.
//   His son has legally changed his own name, and he is not Walter Jr. any more.
//   He has one request, and it is delivered with more force than anything anybody says in the whole runtime.
//   “Just die.”
//   Nobody had told him to get on with it until his son did.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1363.03 he@1363.27 walks@1363.46 eight@1363.66 miles@1364.01 into@1364.31 town@1364.55 in@1364.90
//   a@1365.22 coat@1365.31 and@1365.53 uses@1366.05 a@1366.31 payphone@1366.48 in@1366.88 a@1367.05 bar.@1367.11
//   His@1368.29 son@1368.40 has@1368.70 legally@1369.01 changed@1369.37 his@1369.88 own@1370.14 name@1370.38
//   and@1370.70 he@1371.27 has@1371.37 not@1371.46 Walter@1371.72 Jr.@1372.12 anymore.@1372.79 He@1373.85
//   has@1374.27 one@1374.37 request@1374.59 and@1374.87 it@1375.61 is@1375.72 delivered@1375.85 with@1376.16
//   more@1376.40 force@1376.64 than@1376.96 anything@1377.37 anybody@1377.72 says@1378.24 in@1378.61 the@1378.83
//   run@1379.11 time.@1379.37 Just@1380.70 die.@1381.14 Nobody@1382.59 had@1382.90 told@1383.12 him@1383.35
//   to@1383.51 get@1383.61 on@1383.83 with@1384.05 it@1384.22 until@1384.37 his@1384.64 son@1384.81 did.@1385.07
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 79, id: "just-die", set: "bar", cutIn: 1362.54, cutOut: 1385.69 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
