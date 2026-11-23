// SCENE 081 · "charity" · set: bar · narration 1399.54s → 1424.43s (24.89s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Gretchen and Elliott Schwartz gave twenty-eight million dollars to drug treatment clinics across the southwest, and are being asked whether that was to clean themselves of him.
//   Their answer is that Walter White had virtually nothing to do with building the company. Gretchen is the one who says it: his contribution, as far as she can recall, begins and ends with the name.
//   The police walk into an empty bar.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Gretchen@1400.07 and@1400.31 Elliot@1400.55 Schwartz@1400.87 gave@1401.16 $28@1401.64 million@1402.24
//   to@1402.72 drug@1403.51 treatment@1403.70 clinics@1404.05 across@1404.40 the@1404.70 southwest@1405.03
//   West,@1405.42 and@1405.87 are@1406.16 being@1406.22 asked@1406.38 whether@1406.72 that@1407.07 was@1407.38
//   to@1407.53 clean@1407.70 themselves@1408.22 of@1408.66 him.@1409.14 Their@1410.27 answer@1410.37 is@1410.66
//   that@1410.90 Walter@1411.05 White@1411.31 had@1411.70 virtually@1411.92 nothing@1412.20 to@1412.59 do@1412.90
//   with@1413.05 building@1413.22 the@1413.57 company.@1413.72 Gretchen@1414.62 is@1415.01 the@1415.16 one@1415.27
//   who@1415.40 says@1415.53 it.@1415.72 His@1416.29 contribution,@1416.37 as@1416.83 far@1417.35 as@1417.53
//   she@1417.66 can@1417.77 recall,@1417.88 begins@1418.64 and@1418.96 ends@1419.42 with@1419.83 the@1420.11
//   name.@1420.29 The@1421.72 police@1421.85 walk@1422.09 into@1422.61 an@1422.94 empty@1423.09 bar.@1423.33
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 81, id: "charity", set: "bar", cutIn: 1399.54, cutOut: 1424.43 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
