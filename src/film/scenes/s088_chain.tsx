// SCENE 088 · "chain" · set: compound · narration 1517.54s → 1528.63s (11.09s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Bleeding on the concrete, he watches a boy he ruined take a chain off his own neck. Then he does one last thing with a gun that isn't a threat. He gives it away.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Bleeding@1518.24 on@1518.48 the@1518.62 concrete,@1518.72 he@1519.40 watches@1519.52 a@1519.72 boy@1519.94
//   he@1520.18 ruined@1520.38 take@1520.68 a@1521.20 chain@1521.34 off@1521.60 his@1521.82 own@1522.00
//   neck.@1522.12 Then@1523.14 he@1523.38 does@1523.74 one@1523.94 last@1524.36 thing@1524.86 with@1525.36
//   a@1525.58 gun@1525.66 that@1525.94 isn't@1526.16 a@1526.60 threat.@1526.66 He@1527.22 gives@1527.55 it@1527.83
//   away.@1528.03
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 88, id: "chain", set: "compound", cutIn: 1517.54, cutOut: 1528.63 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
