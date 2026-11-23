// SCENE 084 · "lasers" · set: suburbNight · narration 1460.17s → 1470.67s (10.50s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There are no hitmen. There is a former student, a man who can do a voice, two laser pointers, and two hundred thousand dollars taken out of the pile to buy the performance.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@1460.58 are@1460.96 no@1461.10 hitmen.@1461.30 There@1462.08 is@1462.38 a@1462.50 former@1462.58
//   student,@1462.78 a@1463.58 man@1463.76 who@1463.94 can@1464.10 do@1464.20 a@1464.34 voice,@1464.44 two@1465.22
//   laser@1465.24 pointers,@1465.48 and@1466.24 $200@1466.44 ,000@1466.88 dollars@1467.74 taken@1468.04
//   out@1468.26 of@1468.62 the@1468.74 pile@1468.82 to@1469.12 buy@1469.32 the@1469.54 performance.@1469.72
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 84, id: "lasers", set: "suburbNight", cutIn: 1460.17, cutOut: 1470.67 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
