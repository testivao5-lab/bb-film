// SCENE 002 · "abq" · set: desert · narration 37.71s → 47.71s (10.00s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Albuquerque. Beige light, dust, heat coming up off the road.
//   Walter White teaches chemistry at a high school that has seen better decades.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Albuquerque,@38.02 beige@39.34 light,@39.76 dust,@40.40 heat@41.26 coming@41.56 up@41.86 off@42.10 the@42.22
//   road.@42.36 Walter@43.30 White@43.64 teaches@43.92 chemistry@44.34 at@44.68 a@45.16 high@45.24 school@45.42
//   that@45.70 has@45.92 seen@46.06 better@46.34 decades.@46.70
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 2, id: "abq", set: "desert", cutIn: 37.71, cutOut: 47.71 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
