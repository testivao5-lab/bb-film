// SCENE 080 · "dea-call" · set: bar · narration 1385.69s → 1399.54s (13.85s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   So he calls the DEA on himself, and gives a name that makes a whole building stand up.
//   And then, waiting for them, at a bar, on a television above the bottles, two people from his old life are being interviewed about their charity.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   So@1386.12 he@1386.38 calls@1386.48 the@1386.64 DEA@1386.87 on@1387.18 himself@1387.46 and@1387.66
//   gives@1388.35 a@1388.46 name@1388.61 that@1388.87 makes@1389.18 a@1389.35 whole@1389.48 building@1389.68
//   stand@1390.14 up.@1390.44 And@1391.64 then,@1391.77 waiting@1392.20 for@1392.57 them,@1392.85 at@1393.20
//   a@1393.51 bar,@1393.57 on@1394.22 a@1394.40 television@1394.48 above@1394.83 the@1395.12 bottles,@1395.33
//   two@1396.22 people@1396.29 from@1396.61 his@1396.79 old@1396.92 life@1397.16 are@1397.46 being@1397.81
//   interviewed@1397.94 about@1398.27 their@1398.59 charity.@1398.74
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 80, id: "dea-call", set: "bar", cutIn: 1385.69, cutOut: 1399.54 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
