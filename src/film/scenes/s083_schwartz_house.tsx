// SCENE 083 · "schwartz-house" · set: mansion · narration 1436.59s → 1460.17s (23.58s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   First, a large house, where he admires the décor and puts nine point seven two million dollars on the coffee table in bags. It is theirs to give to his son on his eighteenth birthday, in a trust fund, under their names, for reasons that are non-negotiable.
//   The reasons are the two best hitmen west of the Mississippi, and two small laser dots on the couple's chests.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   First,@1437.16 a@1437.61 large@1437.72 house.@1437.90 where@1438.80 he@1438.92 admires@1439.04 the@1439.40
//   decor@1439.64 and@1439.76 puts@1440.52 $9@1440.68 .72@1441.08 million@1442.00 on@1442.34 the@1443.06
//   coffee@1443.14 table@1443.30 in@1443.72 bags.@1443.96 It@1445.02 is@1445.10 theirs@1445.22 to@1445.44
//   give@1445.94 to@1446.12 his@1446.28 son@1446.44 on@1446.72 his@1446.96 18th@1447.10 birthday@1447.72
//   in@1448.06 a@1448.52 trust@1448.62 fund@1448.80 under@1449.16 their@1449.78 names,@1450.12 for@1451.00
//   reasons@1451.18 that@1451.44 are@1451.76 non@1451.90 -negotiable.@1452.16 The@1453.92 reasons@1454.02
//   are@1454.30 the@1454.68 two@1454.78 best@1455.00 hitmen@1455.42 west@1455.90 of@1456.20 the@1456.38
//   Mississippi@1456.48 and@1456.84 two@1457.54 small@1457.78 laser@1458.20 dots@1458.56 on@1458.90 the@1459.14
//   couple's@1459.24 chests.@1459.56
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 83, id: "schwartz-house", set: "mansion", cutIn: 1436.59, cutOut: 1460.17 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
