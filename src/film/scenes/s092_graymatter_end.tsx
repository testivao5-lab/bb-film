// SCENE 092 · "graymatter-end" · set: corporate · narration 1579.11s → 1588.81s (9.70s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Gray Matter has his chemistry and somebody else's name on it, in a building he is not allowed inside. On his, nobody's name is on anything at all.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Gray@1579.44 matter@1579.88 has@1580.16 his@1580.46 chemistry@1580.61 and@1581.07 somebody@1581.27
//   else's@1581.48 name@1581.88 on@1582.22 it@1582.42 in@1582.55 a@1582.87 building@1582.92 he@1583.14 is@1583.44
//   not@1583.55 allowed@1583.72 inside.@1583.87 On@1585.35 his?@1585.48 Nobody's@1586.46 name@1586.90 is@1587.09
//   on@1587.35 anything@1587.48 at@1587.88 all.@1588.16
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 92, id: "graymatter-end", set: "corporate", cutIn: 1579.11, cutOut: 1588.81 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
