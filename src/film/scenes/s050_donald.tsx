// SCENE 050 · "donald" · set: tower · narration 807.11s → 823.27s (16.16s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   She had a father.
//   Donald Margolis is an air traffic controller who takes a phone call about his daughter and then keeps going, because somebody has to.
//   He should not have gone back to work that week. He did. A shift, and a job where two seconds is a catastrophe.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   She@807.67 had@808.41 a@808.58 father.@808.65 Donald@809.75 Margolis@809.96 is@810.62 an@810.86 air@810.98
//   traffic@811.17 controller@811.50 who@811.98 takes@812.20 a@812.41 phone@812.58 call@812.79 about@813.03
//   his@813.29 daughter@813.46 and@813.75 then@814.39 keeps@814.48 going@814.70 because@815.15 somebody@815.55
//   has@815.96 to.@816.25 He@817.34 should@817.43 not@817.62 have@817.86 gone@818.08 back@818.24 to@818.41
//   work@818.60 that@818.75 week.@818.93 He@819.55 did.@819.62 A@820.50 shift@820.53 and@820.74 a@820.98
//   job@821.08 where@821.32 two@821.51 seconds@821.70 is@822.03 a@822.36 catastrophe.@822.46
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 50, id: "donald", set: "tower", cutIn: 807.11, cutOut: 823.27 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
