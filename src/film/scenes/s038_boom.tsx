// SCENE 038 · "boom" · set: garage · narration 576.50s → 596.47s (19.97s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then Walter White does something that isn't business at all. He throws a handful of crystal at the floor.
//   Not the bag. A handful, like gravel, like it's worth throwing.
//   The windows come out of their frames. Half the room goes down, and a chair comes apart, and Walter stays exactly where he is standing, because the standing is the point.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@577.07 Walter@577.25 White@577.41 does@577.71 something@577.85 that@578.05 isn't@578.37 business@578.59
//   at@578.83 all.@579.11 He@579.71 throws@579.93 a@580.27 handful@580.53 of@580.81 crystal@581.07 at@581.23
//   the@581.59 floor.@581.69 Not@582.71 the@582.87 bag,@583.01 a@583.51 handful,@583.87 like@584.59 gravel,@584.77
//   like@585.45 it's@585.61 worth@585.75 throwing.@585.85 The@587.05 windows@587.35 come@587.59 out@587.87
//   of@588.09 their@588.17 frames,@588.29 half@589.03 the@589.05 room@589.21 goes@589.37 down@589.57 and@589.79
//   a@590.17 chair@590.27 comes@590.55 apart.@590.85 And@591.87 Walter@591.95 stays@592.13 exactly@592.51
//   where@593.07 he@593.49 is@593.67 standing,@593.81 because@594.43 the@594.65 standing@594.79 is@595.17
//   the@595.59 point.@595.73
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 38, id: "boom", set: "garage", cutIn: 576.5, cutOut: 596.47 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
