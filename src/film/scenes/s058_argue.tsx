// SCENE 058 · "argue" · set: superlab · narration 962.16s → 979.90s (17.74s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The next morning Walter argues his case in the lab. Eight million dollars of equipment, a distribution chain, a business that disappears without him. He is calm, he is completely right, and he talks for a long time.
//   Gus listens to all of it, in silence, while he puts a lab suit on over his clothes.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@962.76 next@962.90 morning@963.02 Walter@963.32 argues@963.56 his@964.06 case@964.28 in@964.52 the@964.72
//   lab,@964.80 $8@965.60 million@965.72 of@966.04 equipment,@966.58 a@967.20 distribution@967.30 chain,@967.60
//   a@968.42 business@968.46 that@968.70 disappears@968.96 without@969.30 him.@969.78 He@970.48 is@970.60
//   calm,@970.70 he@971.38 is@971.42 completely@971.50 right,@971.88 and@972.76 he@972.84 talks@972.92 for@973.18
//   a@973.50 long@973.60 time.@973.92 Gus@975.62 listens@975.78 to@976.04 all@976.34 of@976.56 it,@976.68
//   in@976.96 silence@977.12 while@977.38 he@977.86 puts@977.98 a@978.14 lab@978.24 suit@978.42 on@978.64
//   over@978.82 his@979.06 clothes.@979.20
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 58, id: "argue", set: "superlab", cutIn: 962.16, cutOut: 979.9 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
