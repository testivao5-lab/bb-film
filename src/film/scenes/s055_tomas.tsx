// SCENE 055 · "tomas" · set: street · narration 900.50s → 918.50s (18.00s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then there is a corner in a neighbourhood Jesse knows, where two of Gus's men work it, and they use a child to make the drops. The child's name is Tomás, he is eleven, and Jesse cannot leave it alone.
//   He is going to shoot them, both of them, on a corner, at night, and die doing it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@900.80 there@901.70 is@901.88 a@902.00 corner@902.10 in@902.38 a@902.76 neighborhood@902.84 Jesse@903.14
//   knows@903.46 where@903.82 two@904.34 of@904.58 Gus's@904.76 men@905.12 work@905.32 it@905.66 and@905.84
//   they@906.26 use@906.34 a@906.52 child@906.64 to@907.00 make@907.24 the@907.36 drops@907.48 The@907.70
//   child's@908.48 name@908.84 is@909.04 Tomas.@909.24 He@910.12 is@910.20 11@910.34 and@910.62 Jesse@911.28
//   cannot@911.54 leave@911.92 it@912.34 alone@912.48 He@912.66 is@913.58 going@913.70 to@913.86 shoot@913.98
//   them@914.14 both@914.34 of@914.78 them@914.96 on@915.14 a@915.50 corner@915.56 at@915.92 night@916.24
//   and@916.50 die@916.94 doing@917.34 it@917.76
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 55, id: "tomas", set: "street", cutIn: 900.5, cutOut: 918.5 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
