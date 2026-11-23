// SCENE 045 · "hank-arrives" · set: desertDusk · narration 712.57s → 728.66s (16.09s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   He doesn't. He gets up and takes a rifle off the seat of a car that is still parked where they left it.
//   Then a DEA agent's vehicle comes up the road, because it is not only a car, it is a car with a tracker in it, and a man with a badge has a very good reason to be looking for it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   He@712.89 doesn't.@713.29 He@714.03 gets@714.24 up@714.39 and@714.62 takes@714.89 a@715.05 rifle@715.22
//   off@715.43 the@715.72 seat@715.86 of@716.01 a@716.12 car@716.17 that@716.41 is@716.63 still@716.74
//   parked@716.98 where@717.25 they@717.50 left@717.60 it.@717.77 Then,@718.75 a@719.47 DEA@719.53 agents@719.83
//   vehicle@720.35 comes@720.55 up@721.01 the@721.13 road@721.23 because@721.49 it@722.11 is@722.41 not@722.49
//   only@722.67 a@722.79 car,@722.97 it@723.67 is@723.77 a@723.83 car@723.91 with@724.17 a@724.33 tracker@724.41
//   in@724.69 it,@725.03 and@725.47 a@725.55 man@725.63 with@725.79 a@725.95 badge@726.03 has@726.31 a@726.49
//   very@726.61 good@726.89 reason@727.13 to@727.41 be@727.57 looking@727.67 for@727.85 it.@728.21
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 45, id: "hank-arrives", set: "desertDusk", cutIn: 712.57, cutOut: 728.66 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
