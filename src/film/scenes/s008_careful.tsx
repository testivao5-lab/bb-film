// SCENE 008 · "careful" · set: kitchen · narration 112.08s → 120.89s (8.81s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Careful is the word for it, rather than poor.
//   He clips coupons, keeps receipts, and would rather die than ask anybody for help.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Careful@112.64 is@113.03 the@113.23 word@113.38 for@113.58 it@113.80 rather@113.94 than@114.16 poor.@114.45
//   He@115.78 clips@115.83 coupons,@116.08 keeps@116.83 receipts,@117.03 and@117.88 would@118.00 rather@118.09
//   die@118.39 than@118.67 ask@119.02 anybody@119.30 for@119.66 help.@120.02
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 8, id: "careful", set: "kitchen", cutIn: 112.08, cutOut: 120.89 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
