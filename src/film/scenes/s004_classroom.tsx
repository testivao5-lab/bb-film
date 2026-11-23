// SCENE 004 · "classroom" · set: classroom · narration 63.14s → 68.19s (5.05s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   He is very good at chemistry. Nobody has noticed for twenty-five years.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   He@63.54 is@63.74 very@63.90 good@64.30 at@64.62 chemistry.@64.72 Nobody@65.84 has@66.18 noticed@66.48
//   for@66.74 25@66.98 years.@67.24
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 4, id: "classroom", set: "classroom", cutIn: 63.14, cutOut: 68.19 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
