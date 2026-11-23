// SCENE 073 · "huell-plan" · set: garage · narration 1245.11s → 1260.51s (15.40s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The plan is a good one, and it is this: he goes after the only thing Walter White will never destroy. The big man who works for Saul is shown a photograph of a dead man who is not dead, and told that the man in the photograph is what happens next. He talks.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1245.65 plan@1246.13 is@1246.30 a@1246.47 good@1246.56 one,@1246.69 and@1247.13 it@1247.39 is@1247.52
//   this.@1247.65 He@1247.82 goes@1248.43 after@1248.91 the@1249.17 only@1249.39 thing@1249.65 Walter@1249.99
//   White@1250.26 will@1250.60 never@1250.82 destroy.@1251.06 The@1252.38 big@1252.52 man@1252.65 who@1252.88
//   works@1253.04 for@1253.19 Saul@1253.39 is@1253.60 shown@1253.84 a@1253.99 photograph@1254.12 of@1254.41
//   a@1254.71 dead@1254.80 man@1254.93 who@1255.15 was@1255.52 not@1255.63 dead@1255.86 and@1256.17 told@1256.69
//   that@1256.86 the@1257.04 man@1257.12 in@1257.34 the@1257.43 photograph@1257.49 is@1257.76 what@1258.12
//   happens@1258.26 next.@1258.54 He@1259.60 talks.@1259.84
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 73, id: "huell-plan", set: "garage", cutIn: 1245.11, cutOut: 1260.51 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
