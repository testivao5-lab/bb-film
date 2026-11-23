// SCENE 016 · "moment" · set: suburb · narration 231.45s → 237.02s (5.57s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   This is the moment the rest of his life starts. It does not feel like one.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   This@232.00 is@232.28 the@232.42 moment@232.56 the@232.80 rest@233.16 of@233.38 his@233.58 life@233.70
//   starts.@233.94 It@235.38 does@235.44 not@235.58 feel@235.88 like@236.18 one.@236.42
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 16, id: "moment", set: "suburb", cutIn: 231.45, cutOut: 237.02 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
