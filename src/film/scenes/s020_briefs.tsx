// SCENE 020 · "briefs" · set: desert · narration 292.18s → 304.81s (12.63s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   They drive out into the desert, and Walter takes off every stitch he is wearing except his underwear. Not a breakdown. A precaution. His clothes will keep the smell and his family will ask.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   They@292.61 drive@292.96 out@293.20 into@293.69 the@293.93 desert,@294.12 and@294.85 Walter@295.02
//   takes@295.26 off@295.69 every@295.88 stitch@296.19 he@296.79 is@296.96 wearing@297.08 except@297.40 his@297.73
//   underwear.@297.93 Not@298.76 a@298.96 breakdown.@299.02 A@300.02 precaution.@300.05 His@301.31 clothes@301.32
//   will@301.62 keep@301.99 the@302.23 smell@302.44 and@302.64 his@303.05 family@303.19 will@303.62 ask.@303.88
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 20, id: "briefs", set: "desert", cutIn: 292.18, cutOut: 304.81 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
