// SCENE 024 · "first-sale" · set: desert · narration 346.62s → 358.72s (12.10s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The first sale goes wrong in a way that is almost boring. The wrong person recognises him.
//   One of the buyers was in that house. Now there are two guns and an RV that has seen too much.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@347.23 first@347.55 sale@347.70 goes@347.93 wrong@348.17 in@348.62 a@348.96 way@349.05 that@349.20
//   is@349.37 almost@349.49 boring.@349.85 The@351.00 wrong@351.02 person@351.19 recognizes@351.64 him.@352.08
//   One@353.02 of@353.02 the@353.12 buyers@353.20 was@353.38 in@353.64 that@353.88 house.@354.06 Now@355.26
//   there@355.38 are@355.50 two@355.64 guns@355.82 and@356.02 an@356.69 RV@356.81 that@357.00 is@357.32
//   seen@357.43 too@357.61 much.@357.82
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 24, id: "first-sale", set: "desert", cutIn: 346.62, cutOut: 358.72 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
