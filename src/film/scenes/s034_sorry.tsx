// SCENE 034 · "sorry" · set: basement · narration 511.37s → 525.39s (14.02s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   It takes a long time. Somewhere in the middle of it he starts apologising, and he does not stop.
//   “I'm sorry. I'm sorry. I'm so sorry.”
//   No rage anywhere near that basement. It was procedure.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   It@511.74 takes@512.10 a@512.24 long@512.39 time.@512.55 Somewhere@513.55 in@513.77 the@514.01 middle@514.08
//   of@514.24 it,@514.38 he@514.60 starts@514.67 apologizing,@514.86 apologizing,@515.17 and@515.93 he@516.39
//   does@516.48 not@516.60 stop.@516.79 I'm@517.86 sorry.@518.00 I'm@518.74 so@519.10 sorry.@519.43 I'm@520.13
//   so@520.24 sorry.@520.46 No@521.63 rage@521.91 anywhere@522.20 near@522.75 that@523.05 basement.@523.22
//   It@524.05 was@524.25 procedure.@524.36
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 34, id: "sorry", set: "basement", cutIn: 511.37, cutOut: 525.39 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
