// SCENE 091 · "ticket" · set: corporate · narration 1557.69s → 1579.11s (21.42s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The police identify a body. Skyler has been given a lottery ticket whose numbers are not lottery numbers, and she hands it to a prosecutor, and they dig where it points and find two men in a hole.
//   Two people with a laser pointer and a story put nine point seven two million dollars into a trust fund for a boy who will be told it came from a couple who used to know his father.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1558.12 police@1558.55 identify@1558.83 a@1559.33 body.@1559.77 Skylar@1560.53 has@1560.94 been@1561.09
//   given@1561.22 a@1561.37 lottery@1561.55 ticket@1561.77 whose@1562.22 numbers@1562.40 are@1562.68 not@1562.87
//   lottery@1563.16 numbers@1563.61 and@1563.94 she@1564.40 hands@1564.53 it@1564.70 to@1564.87 a@1564.94
//   prosecutor@1565.05 and@1565.42 they@1566.12 dig@1566.22 where@1566.48 it@1566.74 points@1566.85 and@1567.09
//   find@1567.59 two@1567.74 men@1568.07 in@1568.31 a@1568.42 hole.@1568.55 Two@1569.74 people@1570.03
//   with@1570.38 a@1570.55 laser@1570.64 pointer@1570.90 and@1571.22 a@1571.46 story@1571.55 put@1571.87
//   $9@1572.31 .72@1572.72 million@1573.38 into@1573.85 a@1574.57 trust@1574.70 fund@1574.90 for@1575.18 a@1575.40
//   boy@1575.48 who@1575.79 will@1576.18 be@1576.29 told@1576.40 it@1576.66 came@1576.85 from@1577.03 a@1577.22
//   couple@1577.33 who@1577.61 used@1577.83 to@1577.96 know@1578.12 his@1578.27 father.@1578.42
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 91, id: "ticket", set: "corporate", cutIn: 1557.69, cutOut: 1579.11 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
