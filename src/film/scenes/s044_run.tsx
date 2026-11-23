// SCENE 044 · "run" · set: desertDusk · narration 699.42s → 712.57s (13.15s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   So the two of them run, and there is barbed wire, and there is a rock in Jesse's hand that goes into the side of Tuco's head, and then there is a gun in Jesse's hand.
//   They leave him bleeding in the dirt. They decide he'll die on his own.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   So@699.82 the@700.22 two@700.39 of@700.53 them@700.63 run,@700.75 and@701.46 there@701.62 is@701.70
//   barbed@701.82 wire,@702.15 and@702.70 there@702.72 is@702.82 a@702.91 rock@703.00 in@703.29 Jesse's@703.48
//   hand@703.88 that@704.10 goes@704.29 into@704.50 the@704.70 side@704.88 of@705.25 Tuko's@705.38 head,@705.77
//   and@706.24 then@706.62 there@706.75 is@706.93 a@707.13 gun@707.22 in@707.46 Jesse's@707.82 hand.@708.22
//   They@708.93 leave@709.24 him@709.38 bleeding@709.51 in@709.75 the@710.03 dirt.@710.13 They@710.79
//   decide@711.03 he'll@711.24 die@711.51 on@711.70 his@711.91 own.@712.01
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 44, id: "run", set: "desertDusk", cutIn: 699.42, cutOut: 712.57 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
