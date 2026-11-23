// SCENE 019 · "rv-buy" · set: junkyard · narration 279.11s → 292.18s (13.07s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The money comes out of an emptied savings account, seven thousand dollars, everything, and hands it to a man he failed, to buy an RV.
//   Then he breaks into the school's stockroom at night and takes the glassware.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@279.52 money@280.11 comes@280.37 out@280.75 of@281.02 an@281.14 emptied@281.23 savings@281.58
//   account,@281.87 $7@282.64 ,000,@282.99 everything,@283.85 and@284.67 hands@284.79 it@285.12 to@285.26 a@285.44
//   man@285.56 he@285.82 failed@286.08 to@286.52 buy@287.05 an@287.23 RV.@287.40 Then@288.35 he@288.56
//   breaks@288.67 into@288.85 the@289.08 school's@289.19 stockroom@289.52 at@290.00 night@290.19 and@290.38
//   takes@290.87 the@291.08 glassware.@291.26
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 19, id: "rv-buy", set: "junkyard", cutIn: 279.11, cutOut: 292.18 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
