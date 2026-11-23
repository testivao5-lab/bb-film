// SCENE 094 · "for-me" · set: black · narration 1599.88s → 1604.81s (4.93s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   “I did it for me.”
//   “I liked it.”
//   “I was good at it.”
//   “I was alive.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   I@1600.44 did@1600.55 it@1600.68 for@1600.81 me.@1600.92 I@1601.90 liked@1601.92 it.@1602.16 I@1602.87
//   was@1602.98 good@1603.09 at@1603.33 it.@1603.53 I@1604.31 was@1604.44 alive.@1604.53 The@1604.81
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 94, id: "for-me", set: "black", cutIn: 1599.88, cutOut: 1604.81 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
