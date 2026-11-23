// SCENE 026 · "phosphine" · set: desert · narration 373.40s → 396.62s (23.22s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he throws a tin of red phosphorus into the pan and runs, holding his breath, and pulls the door shut behind him.
//   No glassware, no plan B, and no weapon. A reaction.
//   Phosphine gas. One breath of it and you are dead. It fills that RV in seconds, and the two men inside start firing at the door, and then stop firing.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@373.88 he@374.12 throws@374.52 a@374.72 tin@374.88 of@375.18 red@375.46 phosphorous@375.74 into@376.34
//   the@376.66 pan@376.82 and@377.08 runs,@377.46 holding@377.94 his@378.50 breath@378.70 and@378.92 pulls@379.30
//   the@379.54 door@379.76 shut@379.92 behind@380.16 him.@380.44 No@381.50 glassware,@381.68 no@382.52 plan@382.64
//   B,@382.90 and@383.42 no@383.60 weapon.@383.84 A@384.94 reaction.@384.96 Phosphine@386.66 gas.@387.14
//   One@388.46 breath@388.52 of@388.70 it,@388.88 and@389.18 you@389.36 are@389.52 dead.@389.62 It@390.62
//   fills@390.70 that@391.00 RV@391.32 in@391.62 seconds,@391.94 and@392.72 the@392.88 two@392.98 men@393.16
//   inside@393.36 start@393.68 firing@394.04 at@394.42 the@394.68 door@394.78 and@395.02 then@395.40 stop@395.52
//   firing.@395.84
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 26, id: "phosphine", set: "desert", cutIn: 373.4, cutOut: 396.62 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
