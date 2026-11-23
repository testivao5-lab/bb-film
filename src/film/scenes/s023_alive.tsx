// SCENE 023 · "alive" · set: desert · narration 338.90s → 346.62s (7.72s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   It isn't the money, which is months away and theoretical. It's being good at something again, in front of a witness, out loud.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   It@339.40 isn't@339.44 the@339.62 money,@339.70 which@340.23 is@340.40 months@340.52 away@340.70 and@341.05
//   theoretical.@341.31 It's@342.31 being@342.50 good@342.69 at@343.08 something@343.20 again,@343.40 in@344.32
//   front@344.40 of@344.56 a@344.70 witness,@344.76 out@345.56 loud.@345.75
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 23, id: "alive", set: "desert", cutIn: 338.9, cutOut: 346.62 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
