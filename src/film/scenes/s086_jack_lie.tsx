// SCENE 086 · "jack-lie" · set: compound · narration 1484.46s → 1500.69s (16.23s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Inside, he accuses Jack of partnering with the boy instead of killing him, which is a lie, and he tells it in front of men whose pride will not allow it to stand.
//   Jesse comes in on a chain, a different person now, and it takes about two seconds for the old man to understand how different.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Inside@1484.86 he@1485.28 accuses@1485.76 Jack@1486.16 of@1486.42 partnering@1486.66 with@1487.00 the@1487.28
//   boy@1487.40 instead@1487.60 of@1488.00 killing@1488.18 him,@1488.42 which@1488.96 is@1489.04 a@1489.16
//   lie,@1489.28 and@1489.90 he@1490.02 tells@1490.10 it@1490.30 in@1490.50 front@1490.62 of@1490.76 men@1490.90
//   whose@1491.06 pride@1491.26 will@1491.58 not@1491.86 allow@1492.14 it@1492.38 to@1492.58 stand.@1492.66
//   Jesse@1493.82 comes@1494.26 in@1494.60 on@1494.78 a@1494.92 chain,@1495.04 a@1495.60 different@1495.78
//   person@1496.10 now,@1496.52 and@1497.12 it@1497.20 takes@1497.30 about@1497.44 two@1497.66 seconds@1498.00
//   for@1498.42 the@1498.64 old@1498.74 man@1498.86 to@1499.08 understand@1499.22 how@1499.54 different.@1499.92
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 86, id: "jack-lie", set: "compound", cutIn: 1484.46, cutOut: 1500.69 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
