// SCENE 063 · "hector-bomb" · set: nursing · narration 1052.16s → 1065.38s (13.22s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   An old man in another wheelchair, in a nursing home across town, who cannot speak, and whose only way of speaking is a bell on the arm of that chair.
//   A bomb wired to the bell, and the old man rings it himself.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   An@1052.64 old@1052.87 man@1053.01 in@1053.31 another@1053.66 wheelchair,@1053.98 in@1054.88 a@1055.01
//   nursing@1055.09 home@1055.27 across@1055.55 town,@1055.79 who@1056.61 cannot@1056.72 speak,@1056.90
//   and@1057.68 whose@1057.87 only@1058.03 way@1058.35 of@1058.61 speaking@1058.68 is@1058.92 a@1059.29
//   bell@1059.37 on@1059.61 the@1059.88 arm@1060.01 of@1060.22 that@1060.38 chair.@1060.53 A@1061.87 bomb@1061.90
//   wired@1062.12 to@1062.59 the@1062.83 bell,@1062.92 and@1063.40 the@1063.74 old@1063.85 man@1063.98
//   rings@1064.33 it@1064.57 himself.@1064.77
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 63, id: "hector-bomb", set: "nursing", cutIn: 1052.16, cutOut: 1065.38 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
