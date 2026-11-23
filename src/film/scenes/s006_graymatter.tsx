// SCENE 006 · "graymatter" · set: superlab · narration 79.62s → 94.73s (15.11s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Twenty-five years ago this man was going to be somebody. He helped start a company with two people he had studied with, and half the name was his.
//   Schwartz means black. White is white. Together: Gray Matter.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   finger.@79.62 25@80.90 years@81.30 ago,@81.60 this@82.16 man@82.28 was@82.54 going@82.68 to@82.88 be@83.00
//   somebody.@83.20 He@84.34 helped@84.46 start@84.60 a@84.86 company@84.86 with@85.26 two@85.46 people@85.72
//   he@86.06 had@86.22 studied@86.32 with@86.60 and@86.84 half@87.28 the@87.54 name@87.76 was@87.96 his.@88.20
//   Schwartz@89.50 means@89.50 black.@89.98 White@91.28 is@91.28 white.@91.84 Together...@92.92 Grey@93.38
//   matter.@93.97
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 6, id: "graymatter", set: "superlab", cutIn: 79.62, cutOut: 94.73 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
