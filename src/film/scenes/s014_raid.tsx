// SCENE 014 · "raid" · set: suburb · narration 196.66s → 208.29s (11.63s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a door goes in on a house, and the agents carry what they find out to the cars in bags.
//   Walter stays in the car, where nobody is looking. Nobody ever looks at him.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@197.10 a@197.26 door@197.38 goes@197.58 in@197.90 on@198.10 a@198.22 house,@198.32 and@198.94 the@199.12
//   agents@199.22 carry@199.52 what@199.92 they@200.18 find@200.32 out@200.58 to@200.84 the@201.08 cars@201.18
//   and@201.42 bags.@201.68 Walter@203.04 stays@203.04 in@203.44 the@203.76 car,@203.86 where@204.48 nobody@204.66
//   is@204.90 looking.@205.22 Nobody@206.40 ever@206.80 looks@207.28 at@207.62 him.@207.78
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 14, id: "raid", set: "suburb", cutIn: 196.66, cutOut: 208.29 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
