// SCENE 009 · "family" · set: livingroom · narration 120.89s → 135.92s (15.03s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Skyler is pregnant again, and tired in the specific way of people who have stopped expecting anything to change.
//   Walter Jr. is fifteen, has cerebral palsy, and asks his father direct questions his father cannot answer.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Schuyler@120.94 is@121.53 pregnant@121.72 again,@122.03 and@122.73 tired@122.83 in@123.17 the@123.44
//   specific@123.52 way@123.94 of@124.33 people@124.53 who@124.83 have@125.08 stopped@125.16 expecting@125.44
//   anything@126.02 to@126.58 change.@126.89 Walter@128.00 Jr.@128.19 is@128.94 15,@129.00 has@129.94
//   cerebral@130.24 palsy,@130.51 and@131.56 asks@131.75 his@132.07 father@132.34 direct@132.62 questions,@133.01
//   his@134.13 father@134.24 cannot@134.57 answer.@134.79
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 9, id: "family", set: "livingroom", cutIn: 120.89, cutOut: 135.92 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
