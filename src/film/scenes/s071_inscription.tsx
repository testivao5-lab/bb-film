// SCENE 071 · "inscription" · set: bathroom · narration 1193.35s → 1220.62s (27.27s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is a book on top of the cistern in the bathroom. It is Walt's. It has an inscription in it, in handwriting that Hank has seen before, on a dead man's lab notes.
//   “To W.W., my star, my perfect silence.”
//   Hank reads it twice. Then he starts taking boxes out of storage. Every open file, the surveillance footage again, and the two grainy figures in gas masks stop being grainy.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@1193.80 is@1194.36 a@1194.82 book@1194.91 on@1195.08 top@1195.26 of@1195.45 the@1195.60 cistern@1195.71
//   in@1196.08 the@1196.23 bathroom.@1196.34 It@1197.39 is@1197.45 Waltz.@1197.56 It@1198.63 has@1198.73
//   an@1198.88 inscription@1198.99 in@1199.36 it@1199.69 in@1199.84 handwriting@1200.15 that@1200.52 Hank@1201.04
//   has@1201.21 seen@1201.43 before@1201.63 on@1201.91 a@1202.63 Dead@1202.73 Man's@1202.88 lab@1203.28
//   notes,@1203.47 to@1204.12 www@1204.82 .mystarmyperfectsilence.@1205.52 Hank@1208.86 reads@1209.41 it@1209.63
//   twice.@1209.82 Then@1211.23 he@1211.38 starts@1211.45 taking@1211.63 boxes@1211.97 out@1212.26 of@1212.60
//   storage,@1212.67 every@1213.45 open@1213.73 file,@1214.06 the@1214.80 surveillance@1214.91 footage@1215.19
//   again,@1215.63 and@1216.73 the@1216.84 two@1216.93 grainy@1217.15 figures@1217.56 and@1217.89 gas@1218.08
//   masks@1218.28 stop@1218.84 being@1219.30 grainy.@1219.67
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 71, id: "inscription", set: "bathroom", cutIn: 1193.35, cutOut: 1220.62 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
