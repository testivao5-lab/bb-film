// SCENE 011 · "arith" · set: suburbNight · narration 150.25s → 163.00s (12.75s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   It doesn't make him angry. It doesn't make him sad. It makes the arithmetic change.
//   Then he drives home and starts doing arithmetic in his head, and does not like any of the answers.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   It@150.88 doesn't@150.97 make@151.22 him@151.34 angry.@151.46 It@152.57 doesn't@152.72 make@152.97 him@153.12
//   sad.@153.24 It@154.72 makes@154.81 the@154.97 arithmetic@155.19 change.@155.53 Then@157.16 he@157.35
//   drives@157.47 home@157.68 and@158.06 starts@158.50 doing@158.75 arithmetic@159.03 in@159.44 his@159.90
//   head,@160.00 and@160.66 does@160.79 not@160.97 like@161.25 any@161.51 of@161.94 the@162.13 answers.@162.25
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 11, id: "arith", set: "suburbNight", cutIn: 150.25, cutOut: 163.0 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
