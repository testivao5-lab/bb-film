// SCENE 054 · "gale" · set: superlab · narration 881.43s → 900.50s (19.07s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   And there is a young man in the corner named Gale Boetticher. Polite, curious, owns a very good coffee machine, and writes a line of Walt Whitman at the top of every batch sheet. He is also, quietly, being trained to do what Walter does.
//   Gus did not bring him in to insult anybody. Gus is prepared.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   And@881.93 there@882.17 is@882.27 a@882.39 young@882.48 man@882.62 in@882.86 the@883.05 corner@883.13
//   named@883.38 Gail@884.03 Boydisher.@884.32 polite,@885.41 curious,@886.24 owns@887.29 a@887.29 very@887.39
//   good@887.60 coffee@887.84 machine@888.03 and@888.39 writes@888.82 a@889.01 line@889.17 of@889.34 Walt@889.48
//   Whitman@889.67 at@889.89 the@890.20 top@890.27 of@890.48 every@890.60 batch@890.91 sheet.@891.13 He@891.39
//   is@892.10 also@892.27 quietly@892.63 being@893.03 trained@893.60 to@893.91 do@894.27 what@894.55 Walter@894.86
//   does.@895.08 Gus@896.24 did@896.51 not@896.79 bring@897.00 him@897.27 in@897.46 to@897.63 insult@897.86
//   anybody.@898.22 Gus@899.50 is@899.62 prepared.@899.91
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 54, id: "gale", set: "superlab", cutIn: 881.43, cutOut: 900.5 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
