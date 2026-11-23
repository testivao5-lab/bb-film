// SCENE 096 · "roles" · set: black · narration 1615.83s → 1620.51s (4.68s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   A teacher.
//   A cook.
//   A killer.
//   A father.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   A@1616.35 teacher.@1616.51 A@1617.62 cook.@1617.62 A@1618.64 killer.@1618.68 A@1620.03 father.@1620.07
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 96, id: "roles", set: "black", cutIn: 1615.83, cutOut: 1620.51 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
