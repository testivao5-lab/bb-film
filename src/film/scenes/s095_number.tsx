// SCENE 095 · "number" · set: black · narration 1604.81s → 1615.83s (11.02s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The number kept changing. First seven hundred and thirty-seven thousand dollars. Then eighty million.
//   Then it wasn't money any more, and it stopped changing.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1604.81 number@1605.98 kept@1606.62 changing.@1606.83 First,@1608.01 $737@1608.31 ,000.@1609.27
//   Then,@1610.77 80@1611.18 million.@1611.51 Then@1612.74 it@1612.94 wasn't@1613.05 money@1613.27
//   anymore.@1613.48 And@1614.51 it@1614.51 stopped@1614.61 changing.@1614.83
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 95, id: "number", set: "black", cutIn: 1604.81, cutOut: 1615.83 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
