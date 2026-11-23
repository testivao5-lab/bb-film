// SCENE 074 · "photo" · set: desert · narration 1260.51s → 1288.52s (28.01s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a photograph arrives on Walter's phone: a barrel of his money, open, in a hole in the ground, with a message that the rest of it is going the same way. The photograph is of a barrel in Hank's own backyard.
//   Which is the whole trick: the money isn't there. But a man who has seven barrels in a hole in the desert cannot stop himself going to look. He races there with the phone still to his ear, and the man on the other end gets him to confess to everything.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1260.98 a@1261.10 photograph@1261.20 arrives@1261.48 on@1261.92 Walter's@1262.12 phone,@1262.54 a@1263.38
//   barrel@1263.42 of@1263.76 his@1263.96 money,@1264.06 open@1264.56 in@1265.08 a@1265.52 hole@1265.60 in@1265.84
//   the@1266.04 ground,@1266.12 with@1266.80 a@1267.02 message@1267.10 that@1267.38 the@1267.82 rest@1267.94
//   of@1268.14 it@1268.34 is@1268.46 going@1268.64 the@1268.78 same@1268.96 way.@1269.14 The@1270.46
//   photograph@1270.56 is@1270.82 of@1271.22 a@1271.38 barrel@1271.46 in@1271.70 Hank's@1271.96 own@1272.34
//   backyard.@1272.52 Which@1273.98 is@1274.14 the@1274.32 whole@1274.44 trick.@1274.66 The@1275.44 money@1275.50
//   isn't@1275.72 there,@1276.08 but@1276.64 a@1276.98 man@1277.06 who@1277.36 has@1277.58 seven@1277.74
//   barrels@1278.14 in@1278.52 a@1278.76 hole@1278.86 in@1279.06 the@1279.24 desert@1279.34 cannot@1279.62
//   stop@1279.84 himself@1280.40 going@1280.62 to@1281.04 look.@1281.26 He@1281.92 races@1282.26 there@1282.60
//   with@1283.06 the@1283.28 phone@1283.40 still@1283.64 to@1283.98 his@1284.06 ear,@1284.38 and@1285.00
//   the@1285.08 man@1285.18 on@1285.44 the@1285.64 other@1285.74 end@1285.98 gets@1286.18 him@1286.42 to@1286.58
//   confess@1286.68 to@1287.06 everything.@1287.40
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 74, id: "photo", set: "desert", cutIn: 1260.51, cutOut: 1288.52 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
