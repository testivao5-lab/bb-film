// SCENE 048 · "found" · set: bedroom · narration 766.27s → 780.65s (14.38s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Walter doesn't go there to intervene. He goes because his partner is not answering his phone, and because the two of them have been talking about leaving town.
//   What he finds is both of them out cold, and Jane rolling onto her back.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Walter@766.71 doesn't@766.97 go@767.33 there@767.47 to@767.65 intervene.@767.75 He@768.79 goes@768.91
//   because@769.11 his@769.51 partner@769.79 is@770.23 not@770.51 answering@770.79 his@771.25 phone,@771.49
//   and@772.07 because@772.29 the@772.51 two@772.67 of@772.83 them@772.95 have@773.07 been@773.19 talking@773.33
//   about@773.51 leaving@773.83 town.@774.13 What@775.25 he@775.73 finds@775.85 lines@776.09 is@776.27 both@776.51
//   of@776.79 them@776.99 out@777.15 cold@777.37 and@777.69 Jane@778.49 rolling@778.75 onto@779.43 her@779.67
//   back.@779.89
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 48, id: "found", set: "bedroom", cutIn: 766.27, cutOut: 780.65 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
