// SCENE 040 · "junkyard-math" · set: junkyard · narration 615.12s → 645.20s (30.08s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Now, the arithmetic. It happens in a junkyard, in a car, waiting.
//   Two kids through a good state college, four years each: three hundred and sixty thousand. The mortgage and the home equity line: a hundred and thirty-seven. Food, clothing, utilities, two thousand a month for ten years, so his wife isn't destitute the week after the funeral: two hundred and forty.
//   Seven hundred and thirty-seven thousand dollars. Not a fortune. A comfortable widow.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Now@615.79 the@616.01 arithmetic.@616.71 It@617.87 happens@618.05 in@618.17 a@618.43 junkyard,@618.53
//   in@619.19 a@619.39 car@619.45 waiting.@619.65 Two@621.31 kids@621.57 threw@621.81 a@622.19 good@622.29
//   state@622.53 college,@622.79 four@623.49 years@623.69 each,@623.91 360@624.63 ,000.@624.93 The@625.63
//   mortgage@626.33 and@626.75 the@627.11 home@627.21 equity@627.31 line@627.53 137.@627.97 Food,@629.93
//   clothing,@630.55 utilities.@631.53 2@632.08 ,000@632.32 a@632.65 month@632.72 for@632.86 10@633.01
//   years,@633.27 so@633.93 his@634.05 wife@634.17 isn't@634.38 destitute@634.67 the@635.12 week@635.24
//   after@635.43 the@635.74 funeral.@635.88 240.@636.91 737@639.53 ,000@640.12 dollars.@640.93 Not@641.86 a@642.43
//   fortune.@642.50 A@643.84 comfortable@643.96 widow.@644.32
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 40, id: "junkyard-math", set: "junkyard", cutIn: 615.12, cutOut: 645.2 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
