// SCENE 036 · "tuco-desk" · set: garage · narration 542.29s → 557.11s (14.82s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Inside: a desk, two men, one bag. Out comes one enormous crystal of blue on the blade of a knife, lifted to the light. Then the question. What does he want?
//   “Fifty thousand dollars.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Inside,@542.29 a@543.32 desk@543.39 two@543.58 men,@544.12 one@544.98 bag.@545.03 Outcomes@545.55 one@546.45
//   enormous@546.77 crystal@547.33 of@547.83 blue@548.17 on@548.37 the@548.71 blade@548.81 of@549.09 a@549.33
//   knife@549.41 lifted@549.63 to@550.23 the@550.53 light.@550.63 Then@551.73 the@551.99 question,@552.09
//   what@553.09 does@553.35 he@553.51 want?@553.63 $50@555.01 ,000.@555.49 Tuko@556.63
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 36, id: "tuco-desk", set: "garage", cutIn: 542.29, cutOut: 557.11 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
