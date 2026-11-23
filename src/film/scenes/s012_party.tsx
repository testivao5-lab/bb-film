// SCENE 012 · "party" · set: party · narration 163.00s → 176.95s (13.95s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is a birthday party, thrown by his wife, and his brother-in-law is the loudest man in the room.
//   Hank Schrader is DEA. Loud, decent, and divides the world into the people on his side and the people he arrests.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@163.47 was@163.59 a@163.69 birthday@163.79 party@164.00 thrown@164.53 by@164.90 his@165.19 wife@165.38
//   and@165.57 his@166.03 brother@166.16 -in@166.35 -law@166.62 is@166.79 the@166.96 loudest@167.07 man@167.56
//   in@167.75 the@167.96 room.@168.06 Hank@169.12 Schrader@169.12 is@169.51 DEA.@169.91 Loud,@171.46
//   decent,@172.46 and@173.01 divides@173.16 divides@173.38 the@173.57 world@173.66 into@173.85 the@174.09
//   people@174.28 on@174.53 his@174.69 side@174.84 and@175.16 the@175.56 people@175.66 he@176.00 arrests.@176.16
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 12, id: "party", set: "party", cutIn: 163.0, cutOut: 176.95 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
