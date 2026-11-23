// SCENE 069 · "launder" · set: carwash · narration 1149.38s → 1171.96s (22.58s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   His wife gets him out. The money that buys the car wash they hide in came out of a man whose books she kept. They launder through the till, and the first thing he does as the new owner is refuse to let the previous man take his framed first dollar off the wall. Then he spends that dollar on a soda from the vending machine.
//   Eventually she stops leaving the house at all.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   His@1150.00 wife@1150.48 gets@1150.72 him@1151.00 out.@1151.16 The@1151.86 money@1152.06 that@1152.26
//   buys@1152.42 the@1152.64 car@1152.84 wash@1153.08 they@1153.32 hide@1153.56 in@1153.82 came@1154.04
//   out@1154.40 of@1154.68 a@1154.80 man@1154.88 whose@1155.12 books@1155.34 she@1155.66 kept.@1156.02
//   They@1157.08 laundered@1157.22 through@1157.68 the@1157.86 till,@1158.00 and@1158.66 the@1158.68 first@1158.74
//   thing@1158.94 he@1159.16 does@1159.34 as@1159.52 the@1159.74 new@1159.90 owner@1160.06 is@1160.36
//   refuse@1160.80 to@1161.04 let@1161.40 the@1161.52 previous@1161.64 man@1161.86 take@1162.24 his@1162.48
//   framed@1162.68 first@1162.88 dollar@1163.22 off@1163.66 the@1163.90 wall.@1164.04 Then@1165.17 he@1165.39
//   spends@1165.63 that@1165.88 dollar@1166.19 on@1166.52 a@1166.69 soda@1166.76 from@1166.95 the@1167.26
//   vending@1167.36 machine.@1167.47 Eventually,@1169.12 she@1170.02 stops@1170.13 leaving@1170.38 the@1170.65
//   house@1170.88 at@1171.04 all.@1171.21
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 69, id: "launder", set: "carwash", cutIn: 1149.38, cutOut: 1171.96 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
