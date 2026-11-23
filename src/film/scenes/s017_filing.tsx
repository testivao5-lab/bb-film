// SCENE 017 · "filing" · set: livingroom · narration 237.02s → 253.53s (16.51s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he goes and finds him, the way a schoolteacher finds anything.
//   “You're still in our filing system.”
//   He had seen what this money looked like, and he knew a name to go with it.
//   “You want to cook crystal meth. You. And, uh, and me.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@237.42 he@237.62 goes@237.74 and@237.90 finds@238.06 him.@238.28 The@238.96 way@239.02 a@239.12
//   schoolteacher@239.22 finds@239.78 anything.@240.00 You're@241.20 still@241.54 in@241.76 our@241.94
//   filing@242.04 system.@242.26 He@243.44 had@243.88 seen@243.98 what@244.18 this@244.42 money@244.56
//   looked@244.80 like,@245.02 and@245.34 he@245.92 knew@246.04 a@246.32 name@246.42 to@246.60 go@246.78
//   with@246.92 it.@247.12 You@248.00 want@248.12 to@248.30 cook@248.42 crystal@248.66 meth,@249.16 you,@250.56
//   and@251.48 me.@251.72
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 17, id: "filing", set: "livingroom", cutIn: 237.02, cutOut: 253.53 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
