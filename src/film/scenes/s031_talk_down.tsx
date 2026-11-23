// SCENE 031 · "talk-down" · set: basement · narration 457.60s → 478.69s (21.09s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Afterwards he is decent about it. He sits down there and talks to the man about family, about business, about being underestimated by people who are slower than you. He even tells him about the cancer. It is almost warm down there.
//   Krazy-8 doesn't want that. Krazy-8 tells him plainly that getting to know him is not going to make this any easier.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Afterwards,@458.07 he@458.83 is@458.92 decent@459.10 about@459.31 it.@459.68 He@460.25 sits@460.31 down@460.48
//   there@460.81 and@461.01 talks@461.18 to@461.42 the@461.63 man,@461.74 about@462.36 family,@462.48 about@463.36
//   business,@463.50 about@464.30 being@464.51 underestimated@464.71 by@465.12 people@465.63 who@465.94 are@466.10
//   slower@466.19 than@466.44 you.@466.74 He@467.51 even@467.77 tells@467.92 him@468.13 about@468.30 the@468.48
//   cancer.@468.62 It@469.77 is@469.88 almost@469.98 warm@470.18 down@470.81 there.@471.13 Crazy@472.30 8@472.44
//   doesn't@472.77 want@473.07 that.@473.30 Crazy@474.24 8@474.30 tells@474.60 him@474.81 plainly@474.94
//   that@475.18 getting@475.71 to@475.89 know@476.07 him@476.25 is@476.44 not@476.63 going@476.86 to@477.06
//   make@477.18 this@477.27 any@477.44 easier.@477.65
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 31, id: "talk-down", set: "basement", cutIn: 457.6, cutOut: 478.69 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
