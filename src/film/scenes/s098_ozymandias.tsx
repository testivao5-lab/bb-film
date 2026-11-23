// SCENE 098 · "ozymandias" · set: sunset · narration 1630.28s → 1644.32s (14.04s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The episode that takes everything from him is called Ozymandias. It is named after a poem about a king whose monument is in ruins in a desert, with nothing left on it but a name and a warning.
//   Same rules. Different monster.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1630.70 episode@1630.82 that@1631.18 takes@1631.40 everything@1631.62 from@1632.06 him@1632.54 is@1632.74
//   called@1633.10 Ozamandias.@1633.26 It@1634.66 is@1634.80 named@1634.90 after@1635.06 a@1635.32 poem@1635.42
//   about@1635.68 a@1635.98 king@1636.06 whose@1636.30 monument@1636.60 is@1637.06 in@1637.32 ruins@1637.42
//   in@1637.66 a@1637.96 desert,@1638.04 with@1638.76 nothing@1638.82 left@1639.14 on@1639.38 it@1639.56
//   but@1639.68 a@1639.82 name@1639.92 and@1640.16 a@1640.44 warning.@1640.56 Same@1641.92 rules.@1642.06
//   Different@1643.42 monster.@1643.42 monster.@1643.62
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 98, id: "ozymandias", set: "sunset", cutIn: 1630.28, cutOut: 1644.32 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
