// SCENE 082 · "for-a-name" · set: desertDusk · narration 1424.43s → 1436.59s (12.16s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   From the moment he sees that interview, everything he does is for a name and a ledger.
//   He drives back across the country. Then he buys a machine gun, a garage door opener and a car battery.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   From@1425.18 the@1425.55 moment@1425.68 he@1425.98 sees@1426.16 that@1426.37 interview,@1426.66
//   everything@1427.38 he@1427.72 does@1428.09 is@1428.31 for@1428.57 a@1428.87 name@1429.09 and@1429.35 a@1429.64
//   ledger.@1429.77 He@1429.98 drives@1430.53 back@1430.92 across@1431.29 the@1431.53 country.@1431.87
//   Then@1432.66 he@1432.77 buys@1432.96 a@1433.16 machine@1433.33 gun,@1433.59 a@1434.24 garage@1434.24
//   door@1434.44 opener,@1434.85 and@1435.42 a@1435.51 car@1435.59 battery.@1435.77
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 82, id: "for-a-name", set: "desertDusk", cutIn: 1424.43, cutOut: 1436.59 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
