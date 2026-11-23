// SCENE 029 · "list" · set: kitchenNight · narration 435.82s → 452.74s (16.92s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   So he makes a list. On paper. Pro, and con.
//   Under the column for letting him live, he fills half a page. Under the column for killing him there is one line: he will kill your entire family if you let him go. One line is enough.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   So@436.14 he@436.58 makes@436.74 a@436.88 list.@437.06 On@437.98 paper,@438.00 pro,@438.78 and@439.40
//   con.@439.60 Under@440.70 the@440.90 column@441.08 for@441.30 letting@441.50 him@441.68 live,@441.90 he@442.54
//   fills@442.62 half@442.86 a@443.28 page.@443.46 Under@444.56 the@444.74 column@444.88 for@445.08 killing@445.26
//   him,@445.52 there@446.10 is@446.24 one@446.36 line.@446.58 He@447.54 will@447.70 kill@447.88 your@448.12
//   entire@448.44 family@448.62 if@449.32 you@449.74 let@449.88 him@450.06 go.@450.20 One@451.28 One@451.50
//   line@451.56 is@451.80 enough.@452.04
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 29, id: "list", set: "kitchenNight", cutIn: 435.82, cutOut: 452.74 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
