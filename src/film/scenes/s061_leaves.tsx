// SCENE 061 · "leaves" · set: bedroom · narration 1024.57s → 1037.94s (13.37s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The episode will end with her telling him that somebody has to protect this family from the man who protects it. Here, he tells her the family has nothing to fear from him.
//   Then he leaves the room, and she sits with it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1024.57 episode@1025.03 will@1025.35 end@1025.57 with@1025.83 her@1025.98 telling@1026.12 him@1026.40
//   that@1026.61 somebody@1026.77 has@1027.11 to@1027.46 protect@1027.61 this@1027.87 family@1028.09 from@1028.44
//   the@1028.92 man@1029.09 who@1029.33 protects@1029.55 it.@1029.87 Here,@1030.88 he@1031.53 tells@1031.68
//   her@1031.90 the@1032.05 family@1032.16 has@1032.48 nothing@1032.74 to@1033.11 fear@1033.48 from@1033.66
//   him.@1033.88 Then@1034.87 he@1034.98 leaves@1035.29 the@1035.46 room,@1035.66 and@1036.37 she@1036.53
//   sits@1036.72 with@1036.96 it.@1037.18
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 61, id: "leaves", set: "bedroom", cutIn: 1024.57, cutOut: 1037.94 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
