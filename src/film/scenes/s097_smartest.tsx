// SCENE 097 · "smartest" · set: sunset · narration 1620.51s → 1630.28s (9.77s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   His life was never about a widow's pension. It was about being the smartest man in the room on the day he died, with evidence. There was no price he would not pay for that.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   His@1620.70 life@1621.46 was@1621.72 never@1621.88 about@1622.20 a@1622.56 widow's@1622.64 pension.@1622.90
//   It@1623.78 was@1623.82 about@1623.90 being@1624.10 the@1624.32 smartest@1624.42 man@1624.82 in@1625.12
//   the@1625.28 room@1625.34 on@1625.52 the@1625.68 day@1625.74 he@1625.98 died@1626.14 with@1626.42
//   evidence.@1626.88 There@1628.02 was@1628.26 no@1628.34 price@1628.58 he@1628.90 would@1629.08 not@1629.20
//   pay@1629.34 for@1629.52 that.@1629.68
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 97, id: "smartest", set: "sunset", cutIn: 1620.51, cutOut: 1630.28 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
