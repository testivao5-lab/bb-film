// SCENE 085 · "machine" · set: compound · narration 1470.67s → 1484.46s (13.79s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a compound, and a machine in a trunk. The last thing he will ever build, and by a distance the best.
//   Garage-door motor, car battery, machine gun, a key fob in his pocket.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1471.30 a@1471.54 compound@1471.82 and@1472.10 a@1473.00 machine@1473.26 in@1473.60 a@1473.92
//   trunk,@1474.02 the@1474.86 last@1475.00 thing@1475.30 he@1475.66 will@1475.86 ever@1476.02 build@1476.30
//   and@1476.74 by@1477.34 a@1477.50 distance@1477.64 the@1477.88 best.@1478.40 Garage@1479.44 door@1479.84
//   motor,@1480.18 car@1480.82 battery,@1481.04 machine@1481.78 gun,@1482.06 a@1482.90 key@1482.96 fob@1483.20
//   in@1483.50 his@1483.66 pocket.@1483.76
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 85, id: "machine", set: "compound", cutIn: 1470.67, cutOut: 1484.46 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
