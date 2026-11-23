// SCENE 025 · "stall" · set: rvInside · narration 358.72s → 373.40s (14.68s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Walter talks them into watching him cook instead. It is not a plan, it is a stall.
//   He asks the man with the cigarette to put it out, and gets smoke in his face, and then the cigarette goes out of the window, which turns out to be the worst possible place for it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Walter@359.32 talks@359.62 them@359.96 into@360.26 watching@360.44 him@360.73 cook@361.00 instead.@361.29
//   It@362.40 is@362.46 not@362.55 a@362.69 plan,@362.76 it@363.32 is@363.38 a@365.50 with@365.50 the@365.73
//   cigarette@365.81 to@366.05 put@366.29 it@366.46 out@366.55 and@366.73 get@367.12 smokin'@367.25 his@367.88
//   face.@367.99 And@368.70 then@368.84 the@368.96 cigarette@369.00 goes@369.24 out@369.48 of@369.66 the@369.72
//   window,@369.80 which@370.22 turns@370.30 out@370.72 to@370.88 be@370.96 the@371.06 worst@371.14
//   possible@371.52 place@372.02 for@372.58 it.@372.78
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 25, id: "stall", set: "rvInside", cutIn: 358.72, cutOut: 373.4 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
