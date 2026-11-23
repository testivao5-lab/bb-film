// SCENE 090 · "diner" · set: diner · narration 1544.01s → 1557.69s (13.68s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   A year before all this, in a diner, he arranged his bacon into the number fifty-two. He was alone then too. Nobody asked.
//   Fifty-two. Two years after a doctor used the word inoperable.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   A@1544.48 year@1544.77 before@1544.98 all@1545.18 this,@1545.53 in@1545.81 a@1546.03 diner,@1546.12 he@1546.79
//   arranged@1546.87 his@1547.07 bacon@1547.38 into@1547.62 the@1547.96 number@1548.07 52.@1548.29 He@1549.66
//   was@1549.85 alone@1549.94 then@1550.22 too.@1550.62 Nobody@1551.44 asked.@1551.70 asked.@1552.03 52.@1552.90
//   Two@1554.11 years@1554.46 after@1554.79 a@1555.18 doctor@1555.33 used@1555.61 the@1555.98 word@1556.16
//   inoperable.@1556.37
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 90, id: "diner", set: "diner", cutIn: 1544.01, cutOut: 1557.69 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
