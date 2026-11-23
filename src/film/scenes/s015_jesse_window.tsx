// SCENE 015 · "jesse-window" · set: suburb · narration 208.29s → 231.45s (23.16s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   While they clear the rooms, a young man climbs out of a second-floor window of the house next door, drops into the yard, and looks up.
//   Jesse Pinkman, clothes too big, sat in Walter White's chemistry class, and failed it.
//   They look at each other across a driveway for one honest second. Then Jesse runs for his car, and Walter says nothing to anybody.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   While@208.60 they@208.84 clear@209.02 the@209.20 rooms,@209.38 a@209.98 young@210.12 man@210.26 climbs@210.54
//   out@210.76 of@211.08 a@211.16 second@211.24 floor@211.46 window@211.76 of@212.04 the@212.26 house@212.34
//   next@212.56 door,@212.78 drops@213.56 into@213.80 the@214.06 yard,@214.22 and@215.00 looks@215.08 up.@215.26
//   Jesse@216.44 Pinkman,@216.64 Clothes@217.60 too@218.00 big,@218.18 sat@218.86 in@219.12 Walter@219.30
//   White's@219.50 chemistry@220.00 class,@220.14 and@221.04 failed@221.24 it.@221.52 They@222.34 look@222.60
//   at@222.78 each@222.92 other@223.04 across@223.20 a@223.54 driveway@223.76 for@223.98 one@224.36 honest@224.58
//   second.@224.86 Then@226.44 Jesse@226.48 runs@226.62 for@226.96 his@227.20 car.@227.32 And@228.68 Walter@228.76
//   says@228.96 nothing@229.84 to@230.30 anybody.@230.48
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 15, id: "jesse-window", set: "suburb", cutIn: 208.29, cutOut: 231.45 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
