// SCENE 064 · "gus-tie" · set: nursing · narration 1065.38s → 1080.44s (15.06s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Gus sits down beside his old enemy and says a few words to him, then decides, correctly, that something is wrong, and begins to leave in a hurry.
//   In the corridor he stops, and straightens his tie. He is dead before the movement finishes.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Gus@1065.81 sits@1066.29 down@1066.64 beside@1066.96 his@1067.14 old@1067.46 enemy@1067.59 and@1067.77
//   says@1068.35 a@1068.48 few@1068.62 words@1068.74 to@1068.98 him,@1069.20 then@1069.72 decides,@1069.90
//   correctly,@1070.22 that@1071.38 something@1071.48 is@1071.72 wrong@1072.05 and@1072.31 begins@1073.12
//   to@1073.35 leave@1073.61 in@1073.81 a@1073.98 hurry.@1074.05 In@1074.80 the@1075.24 corridor@1075.32
//   he@1075.54 stops@1075.88 and@1076.10 straightens@1076.68 his@1077.08 tie.@1077.18 He@1078.32 is@1078.44
//   dead@1078.54 before@1078.76 the@1079.08 movement@1079.28 finishes.@1079.42
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 64, id: "gus-tie", set: "nursing", cutIn: 1065.38, cutOut: 1080.44 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
