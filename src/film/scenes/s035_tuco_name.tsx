// SCENE 035 · "tuco-name" · set: street · narration 525.39s → 542.29s (16.90s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   He needs a distributor. Jesse brings back a name.
//   Tuco Salamanca.
//   Walter has never met him, and handles this by walking up to the first dangerous stranger outside the address and asking whether he is Tuco. It works, which tells you something about that neighbourhood.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   He@526.00 needs@526.10 a@526.25 distributor.@526.41 Jesse@527.32 brings@527.55 back@527.91 a@528.22
//   name.@528.36 Tuko@529.29 Salamanca.@529.58 Walter@531.32 has@531.60 never@531.84 met@532.08 him@532.29
//   and@532.43 handles@532.89 this@533.22 by@533.43 walking@533.62 up@533.88 to@534.12 the@534.24 first@534.32
//   dangerous@534.55 stranger@534.98 outside@535.38 the@535.84 address@536.15 and@536.43 asking@536.93
//   whether@537.29 he@537.58 is@537.77 Tuko.@537.88 It@538.55 works,@539.12 which@539.34 tells@540.03 you@540.36
//   something@540.46 about@540.67 that@540.96 neighborhood.@541.10
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 35, id: "tuco-name", set: "street", cutIn: 525.39, cutOut: 542.29 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
