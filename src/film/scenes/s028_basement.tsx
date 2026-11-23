// SCENE 028 · "basement" · set: basement · narration 423.52s → 435.82s (12.30s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   One of the two men lived. His name is Krazy-8, and he wakes up in a basement with a bicycle lock around his neck and a support beam behind him.
//   Which gives the man who put him there two days to think about it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   One@424.04 of@424.34 the@424.46 two@424.56 men@424.74 lived.@424.98 His@425.82 name@426.04 is@426.26
//   Crazy@426.42 -Aid,@426.66 and@427.42 he@427.50 wakes@427.62 up@427.78 in@428.00 a@428.12 basement@428.16
//   with@428.40 a@428.74 bicycle@428.84 lock@429.22 around@429.50 his@429.78 neck,@429.94 and@430.58 a@430.62
//   support@430.70 beam@430.98 behind@431.22 him.@431.56 Which@432.56 gives@432.78 the@432.94 man@433.12
//   who@433.26 put@433.38 him@433.58 there@433.72 two@433.90 days@434.40 to@434.70 think@434.90 about@435.10
//   it.@435.32
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 28, id: "basement", set: "basement", cutIn: 423.52, cutOut: 435.82 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
