// SCENE 077 · "no-face" · set: desertDusk · narration 1328.49s → 1340.65s (12.16s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The barrels come out of the hole. Two men go into it.
//   Walter White is left standing in the desert with one barrel and no idea what to do with his face.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1329.12 barrels@1329.24 come@1329.44 out@1329.72 of@1329.90 the@1329.96 hole.@1330.06 Two@1331.08
//   men@1331.12 go@1331.38 into@1331.66 it.@1331.92 Walter@1333.36 White@1333.60 is@1333.90 left@1334.20
//   standing@1334.38 in@1334.84 the@1335.06 desert@1335.14 with@1335.40 one@1335.96 barrel@1336.20 and@1336.48
//   no@1337.00 idea@1337.26 what@1337.56 to@1337.80 do@1337.92 with@1338.06 his@1338.18 face.@1338.28
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 77, id: "no-face", set: "desertDusk", cutIn: 1328.49, cutOut: 1340.65 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
