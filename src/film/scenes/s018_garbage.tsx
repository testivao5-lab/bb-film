// SCENE 018 · "garbage" · set: livingroom · narration 253.53s → 279.11s (25.58s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Jesse laughs at him, which is fair. Then the laughing stops, because the teacher says something that isn't funny at all.
//   “You and I will not make garbage. We will produce a chemically pure and stable product that performs as advertised. No adulterants.”
//   He means it. There is a version of the crime that is just an old man refusing to make a bad product.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Jesse@254.26 laughs@254.62 at@254.94 him,@255.22 which@255.62 is@255.80 fair.@255.94 Then@257.18 the@257.40
//   laughing@257.50 stops,@257.68 because@258.56 the@259.14 teacher@259.28 says@259.50 something@259.78
//   that@260.41 isn't@260.70 funny@261.18 at@261.46 all.@261.68 You@262.52 and@262.74 I@262.90 will@263.18
//   not@263.50 make@263.86 garbage.@264.20 We@265.10 will@265.26 produce@265.48 a@265.86 chemically@266.14
//   pure@266.54 and@267.00 stable@267.32 product@267.72 that@268.22 performs@268.64 as@269.06 advertised,@269.68
//   no@270.82 adulterance.@271.08 He@272.57 means@272.86 it.@273.06 There@273.30 is@274.02 a@274.24 version@274.32
//   of@274.64 the@274.88 crime@274.98 that@275.20 is@275.50 just@275.62 an@275.90 old@276.08 man@276.36
//   refusing@276.80 to@277.06 make@277.74 a@277.90 bad@278.04 product.@278.22
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 18, id: "garbage", set: "livingroom", cutIn: 253.53, cutOut: 279.11 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
