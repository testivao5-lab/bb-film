// SCENE 052 · "gus-offer" · set: pollos · narration 835.06s → 857.67s (22.61s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   By now, a man with very good manners has noticed the product.
//   Gustavo Fring runs a fried chicken chain, gives money to good causes in public, and is unfailingly polite. He is the most frightening man Walter White will ever meet, and those two facts are not in tension. He buys the entire output. It's a good offer. The cost is that Walter decides nothing.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   By@835.86 now,@836.38 a@836.89 man@836.93 with@837.20 very@837.32 good@837.58 manners@837.77 has@838.03
//   noticed@838.36 the@838.65 product.@838.98 Gustavo@839.96 Fring@840.48 runs@840.77 a@841.05 fried@841.12
//   chicken@841.36 chain,@841.84 gives@842.55 money@842.70 to@843.01 good@843.24 causes@843.38 in@843.72
//   public,@843.98 and@844.46 is@844.50 unfailingly@844.60 polite.@845.41 He@846.70 is@846.79 the@847.00
//   most@847.13 frightening@847.29 man@847.74 Walter@848.08 White@848.32 will@848.62 ever@848.79 meet,@849.08
//   and@849.55 those@849.74 two@849.88 facts@850.03 are@850.22 not@850.58 in@850.74 tension.@850.86 He@851.86
//   buys@852.03 the@852.24 entire@852.60 output.@852.89 It's@854.03 a@854.12 good@854.17 offer.@854.29 The@855.36
//   cost@855.39 is@855.62 that@855.89 Walter@856.03 decides@856.25 nothing.@856.75
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 52, id: "gus-offer", set: "pollos", cutIn: 835.06, cutOut: 857.67 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
