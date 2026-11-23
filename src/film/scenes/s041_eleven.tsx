// SCENE 041 · "eleven" · set: junkyard · narration 645.20s → 666.33s (21.13s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   “How much did you get for the deal?”
//   “One point two million.”
//   “Six hundred thousand each.”
//   At seventy thousand dollars a week each, that is about eleven more deals. Eleven, and he is done. He believes it. It is the last time in this story that the number is a destination instead of a habit.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   How@645.77 much@645.89 did@646.00 you@646.13 get@646.22 for@646.32 the@646.43 deal?@646.53 1@647.27 .2@647.48
//   million.@648.27 600@649.38 ,000@649.72 each.@650.75 At@652.24 70@652.41 ,000@652.82 dollars@653.27 a@653.63
//   week@653.70 each,@653.88 that@654.84 is@654.96 about@655.05 11@655.24 more@655.77 deals.@656.13 11.@657.01
//   And@657.96 he@658.00 is@658.27 is@658.63 done.@658.74 He@659.86 believes@660.00 it.@660.25 It@661.13 is@661.24
//   the@661.36 last@661.48 time@661.77 in@662.20 this@662.34 story@662.48 that@662.82 the@663.05 number@663.15
//   is@663.43 a@663.72 destination@663.79 instead@664.67 of@665.12 a@665.29 habit.@665.38
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 41, id: "eleven", set: "junkyard", cutIn: 645.2, cutOut: 666.33 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
