// SCENE 042 · "trunk" · set: desertDusk · narration 666.33s → 683.17s (16.84s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then Tuco does what men with knives eventually do.
//   He collects both of them at gunpoint and drives them out of the city in a trunk, to a shack in the desert where an old man sits in a wheelchair with a bell fixed to the arm of it.
//   They are not guests. One of them has stopped being useful.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@666.96 Tuko@667.17 does@667.46 what@667.84 men@668.00 with@668.20 knives@668.39 eventually@668.62
//   do.@669.20 He@669.98 collects@670.20 both@670.39 of@670.74 them@670.88 at@671.01 gunpoint@671.15 and@671.62
//   drives@671.93 them@672.15 out@672.43 of@672.58 the@672.65 city@672.75 in@672.98 a@673.22 trunk.@673.29
//   To@674.01 a@674.05 shack@674.15 in@674.36 the@674.62 desert@674.67 where@675.00 an@675.32 old@675.41
//   man@675.63 sits@675.89 in@676.20 a@676.36 wheelchair@676.43 with@676.65 a@677.32 bell@677.39 fixed@677.70
//   to@677.98 the@678.22 arm@678.32 of@678.46 it.@678.62 They@679.41 are@679.70 not@679.84 guests.@680.05
//   One@681.24 of@681.43 them@681.55 has@681.67 stopped@681.84 being@682.03 useful.@682.32
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 42, id: "trunk", set: "desertDusk", cutIn: 666.33, cutOut: 683.17 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
