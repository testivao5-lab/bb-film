// SCENE 075 · "hank-arrives-2" · set: desert · narration 1288.52s → 1305.25s (16.73s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the car arrives, and it is his brother-in-law, and he understands what has happened to him. So he calls the men who work for money and tells them where he is, then sees who is in the car and tells them not to come. He tells them twice. They come anyway.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1289.18 the@1289.50 car@1289.70 arrives,@1290.00 and@1290.90 it@1291.12 is@1291.32 his@1291.48
//   brother@1291.60 -in@1291.90 -law,@1292.20 and@1292.76 he@1293.04 understands@1293.12 what@1293.40 has@1293.78
//   happened@1293.86 to@1294.18 him,@1294.36 so@1294.82 he@1295.06 calls@1295.18 the@1295.42 men@1295.72
//   who@1295.88 work@1296.10 for@1296.32 money@1296.56 and@1296.78 tells@1297.10 them@1297.38 where@1297.56
//   he@1297.72 is,@1297.90 then@1298.58 sees@1298.72 who@1299.00 is@1299.32 in@1299.44 the@1299.56 car@1299.66
//   and@1299.92 tells@1300.40 them@1300.68 not@1300.94 to@1301.10 come.@1301.26 He@1302.02 tells@1302.18
//   them@1302.44 twice,@1302.70 they@1303.64 come@1304.10 anyway.@1304.36
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 75, id: "hank-arrives-2", set: "desert", cutIn: 1288.52, cutOut: 1305.25 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
