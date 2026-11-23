// SCENE 060 · "danger" · set: bedroom · narration 1004.02s → 1024.57s (20.55s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   In their bedroom, his wife suggests they go to the police. He stands up and gives her the speech he has been composing his entire life.
//   “I am not in danger, Skyler. I am the danger.”
//   “A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   In@1004.68 their@1005.09 bedroom@1005.18 his@1005.49 wife@1005.92 suggests@1006.12 they@1006.47 go@1006.88
//   to@1007.02 the@1007.12 police.@1007.23 He@1008.21 stands@1008.28 up@1008.47 and@1008.71 gives@1008.85
//   her@1009.00 the@1009.16 speech@1009.28 he@1009.54 has@1009.76 been@1009.87 composing@1009.99 his@1010.35
//   entire@1010.66 life.@1010.97 I@1012.14 am@1012.62 not@1012.73 in@1012.85 danger,@1013.00 Skylar.@1013.71
//   I@1014.45 am@1014.61 the@1015.11 danger.@1015.52 A@1016.54 guy@1016.62 opens@1016.87 his@1017.30 door@1017.54
//   and@1017.83 gets@1018.04 shot.@1018.21 And@1019.14 you@1019.23 think@1019.42 that@1019.68 of@1020.00
//   me?@1020.26 No.@1021.11 I@1022.11 am@1022.38 the@1022.95 one@1023.07 who@1023.26 knocks."@1023.45 The@1024.57
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 60, id: "danger", set: "bedroom", cutIn: 1004.02, cutOut: 1024.57 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
