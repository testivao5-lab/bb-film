// SCENE 033 · "plate" · set: kitchenNight · narration 494.83s → 511.37s (16.54s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Upstairs, Walter picks the broken plate out of the trash and starts fitting the pieces back together.
//   One is missing. A long, sharp one, and it is not in the trash.
//   He goes back down, and asks him, politely, whether he is going to stick him with it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Upstairs,@495.30 Walter@496.12 picks@496.31 the@496.63 broken@496.83 plate@497.04 out@497.36 of@497.54
//   the@497.65 trash@497.74 and@497.89 starts@498.45 fitting@498.65 the@498.89 pieces@499.10 back@499.36
//   together.@499.60 One@500.80 is@501.07 missing.@501.30 A@502.50 long,@502.56 sharp@502.71 one,@503.10
//   and@504.00 it@504.19 is@504.30 not@504.42 in@504.71 the@504.95 trash.@505.04 He@506.18 goes@506.50 back@506.63
//   down@506.86 and@507.10 asks@507.69 him@507.98 politely@508.24 whether@508.69 he@509.63 is@509.92 going@510.04
//   to@510.21 stick@510.36 him@510.56 with@510.69 it.@510.88
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 33, id: "plate", set: "kitchenNight", cutIn: 494.83, cutOut: 511.37 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
