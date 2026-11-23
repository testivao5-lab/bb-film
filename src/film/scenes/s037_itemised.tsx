// SCENE 037 · "itemised" · set: garage · narration 557.11s → 576.50s (19.39s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Tuco laughs. It's a good joke. It is not a joke, and the reason is the itemisation.
//   “Thirty-five for the pound you stole. Fifteen for my partner's pain and suffering.”
//   That sentence does two jobs. It tells a man with a knife how the debt was calculated, and it says that the man opposite him is the sort who calculates debts.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   laughs,@557.11 it's@557.69 a@557.83 good@557.89 joke.@557.95 It@559.05 is@559.11 not@559.27 a@559.53
//   joke@559.79 and@559.97 the@560.23 reason@560.31 is@560.55 the@560.93 itemization.@561.05 $35@562.43 for@562.83
//   the@563.15 pound@563.25 you@563.47 stole,@563.61 $15@564.33 for@564.63 my@565.05 partner's@565.19 pain@565.59
//   and@565.75 suffering.@565.93 That@567.45 sentence@567.57 does@567.85 two@568.17 jobs.@568.43 It@569.47
//   tells@569.53 a@569.69 man@569.85 with@569.97 a@570.13 knife@570.25 how@570.51 the@570.93 debt@571.11
//   was@571.27 calculated@571.43 and@571.81 it@572.73 says@572.87 that@573.05 the@573.21 man@573.33
//   opposite@573.51 opposite@573.79 him@573.97 is@574.19 the@574.59 sort@574.71 who@574.91 calculates@575.13
//   debts.@575.49
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 37, id: "itemised", set: "garage", cutIn: 557.11, cutOut: 576.5 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
