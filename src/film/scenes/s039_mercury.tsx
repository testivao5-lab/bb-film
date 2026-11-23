// SCENE 039 · "mercury" · set: street · narration 596.47s → 615.12s (18.65s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   On the way out, Tuco asks what that was.
//   “Fulminated mercury. And a little tweak of chemistry.”
//   Out into a street full of car alarms, with blood on his collar and his ears ringing. He had no plan for after the explosion. One handful, one bluff, and a lesson from his own classroom.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   On@596.97 the@597.19 way@597.29 out@597.39 Tuko@597.59 asks@597.71 what@598.01 that@598.33 was.@598.47
//   fulminated@599.89 mercury,@600.41 and@601.37 a@601.57 little@601.65 tweak@601.79 of@602.15 chemistry.@602.37
//   Out@603.67 into@603.93 a@604.11 street@604.25 full@604.45 of@604.79 car@604.93 alarms@605.13 with@605.43
//   blood@605.69 on@605.97 his@606.13 collar@606.25 and@606.51 his@606.77 ears@606.87 ringing,@607.13 he@608.25
//   had@608.39 no@608.53 plan@608.85 for@609.17 after@609.41 the@609.67 explosion,@610.03 one@611.17
//   handful,@611.39 one@612.13 bluff,@612.41 and@613.01 a@613.23 lesson@613.31 from@613.55 his@613.77 own@613.93
//   classroom.@614.15
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 39, id: "mercury", set: "street", cutIn: 596.47, cutOut: 615.12 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
