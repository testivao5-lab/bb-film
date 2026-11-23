// SCENE 047 · "jane" · set: bedroom · narration 750.65s → 766.27s (15.62s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Jane is Jesse's landlord, then his girlfriend, then the only person in that house with any idea what is going on. A recovering addict who has decided, the way someone who has already been sober once decides, that a little would be fine.
//   It is not fine.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Jane@751.25 is@751.59 Jesse's@751.95 landlord,@752.37 then@753.23 his@753.35 girlfriend,@753.45 then@754.39
//   the@754.53 only@754.65 person@754.89 in@755.33 that@755.47 house@755.61 with@755.89 any@756.05 idea@756.29
//   what@756.71 is@756.95 going@757.03 on.@757.19 A@758.27 recovering@758.35 addict@758.61 who@759.07 has@759.31
//   decided,@759.39 the@760.11 way@760.23 someone@760.33 who@760.57 has@760.77 already@760.89 been@761.13
//   sober@761.33 once@761.55 decides,@761.91 that@762.81 a@762.95 little@763.05 would@763.25 be@763.49
//   fine.@763.63 It@765.01 is@765.13 not@765.23 fine.@765.43
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 47, id: "jane", set: "bedroom", cutIn: 750.65, cutOut: 766.27 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
