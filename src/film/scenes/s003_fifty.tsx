// SCENE 003 · "fifty" · set: kitchen · narration 47.71s → 63.14s (15.43s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Fifty years old, on the morning we meet him. Nervous hands. Glasses. A cough he is already explaining to people.
//   His wife has arranged his birthday bacon into the number fifty on the plate. It is vegetarian bacon. He does not mention that.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   50@47.76 years@48.28 old.@48.70 On@49.38 the@49.42 morning@49.50 we@49.68 meet@49.88 him.@50.12 Nervous@51.00
//   hands,@51.32 glasses,@51.86 a@52.82 cough@52.90 he@53.14 is@53.38 already@53.46 explaining@53.68 to@54.18
//   people.@54.46 His@55.36 wife@55.60 has@55.84 arranged@56.20 his@56.46 birthday@56.72 bacon@56.98 into@57.54
//   the@57.86 number@57.94 50@58.14 on@58.56 the@58.88 plate.@59.00 It@59.96 is@60.06 vegetarian@60.18
//   bacon.@60.50 He@61.74 does@61.78 not@61.94 mention@62.16 that.@62.44
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 3, id: "fifty", set: "kitchen", cutIn: 47.71, cutOut: 63.14 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
