// SCENE 078 · "cabin" · set: cabin · narration 1340.65s → 1362.54s (21.89s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   New Hampshire. A cabin, a wood stove, a barrel of money, and nothing to do with the time.
//   Once a month a man brings supplies and a chemotherapy dose. In between there is a television, a shelf of films, and no signal.
//   On one visit, Walter White pays ten thousand dollars for one more hour of a man in a chair. He buys somebody to sit there.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   New@1342.78 of@1343.26 money@1343.48 and@1343.70 nothing@1344.08 to@1344.52 do@1344.76 with@1344.90
//   the@1345.10 time.@1345.18 Once@1346.34 a@1346.50 month,@1346.68 a@1346.90 man@1347.06 brings@1347.22
//   supplies@1347.48 and@1347.92 a@1348.30 chemotherapy@1348.36 dose.@1348.60 In@1349.98 between,@1350.04
//   there@1350.50 was@1350.58 a@1350.66 television...@1350.76 a@1351.42 shelf@1351.64 of@1351.85 films@1351.98
//   and@1352.20 no@1352.90 signal.@1353.16 On@1354.66 one@1354.81 visit,@1354.96 Walter@1355.44 White@1355.55
//   pays@1355.85 $10@1356.11 ,000@1356.48 for@1357.09 one@1357.61 more@1357.90 hour@1358.18 of@1358.57 a@1358.83
//   man@1358.90 in@1359.18 a@1359.42 chair.@1359.53 He@1360.48 buys@1360.62 somebody@1360.83 to@1361.18
//   sit@1361.57 there.@1361.77
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 78, id: "cabin", set: "cabin", cutIn: 1340.65, cutOut: 1362.54 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
