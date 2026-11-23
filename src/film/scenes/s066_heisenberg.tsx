// SCENE 066 · "heisenberg" · set: desert · narration 1095.30s → 1116.28s (20.98s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is no plan after this, so he fills the corridor. With Gus gone, nobody owns him any more. And one afternoon in the desert, in front of a man with a lot of money and very little imagination, he is offered the chance to be a chemist again, on a salary.
//   He declines.
//   “And what are you?”
//   “You're Heisenberg.”
//   “You're goddamn right.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@1095.78 is@1096.00 no@1096.10 plan@1096.26 after@1096.56 this,@1096.86 so@1097.28 he@1097.50
//   fills@1097.66 the@1097.86 corridor.@1098.14 With@1099.16 Gus@1099.46 gone,@1099.62 nobody@1100.22 owns@1100.42
//   him@1100.80 anymore.@1101.02 and@1101.34 one@1102.18 afternoon@1102.32 in@1102.58 the@1102.96 desert@1103.04
//   in@1103.32 front@1103.66 of@1103.80 a@1103.94 man@1104.00 with@1104.20 a@1104.34 lot@1104.46 of@1104.68
//   money@1104.78 and@1104.98 very@1105.32 little@1105.52 imagination@1105.82 he's@1106.66 offered@1107.14
//   the@1107.38 chance@1107.54 to@1107.74 be@1107.96 a@1108.06 chemist@1108.14 again@1108.36 on@1108.68 a@1109.06
//   salary.@1109.14 He@1110.28 declines.@1110.38 And@1111.66 what@1111.82 are@1111.96 you?@1112.12 Your@1113.06
//   Heisenberg.@1113.54 Your@1114.86 goddamn@1115.10 right.@1115.46
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 66, id: "heisenberg", set: "desert", cutIn: 1095.3, cutOut: 1116.28 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
