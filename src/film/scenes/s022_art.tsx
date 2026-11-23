// SCENE 022 · "art" · set: desert · narration 318.05s → 338.90s (20.85s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Jesse stares at it and says: “This is pure glass. You're a goddamn artist. This is art, Mr. White.”
//   “It's just basic chemistry,” the man in his underpants says, and means it as modesty, and it is the worst thing he could have said, because it is true and modesty is not what just happened. His face does something it hasn't done in years.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Jesse@318.55 stares@318.90 at@319.23 it@319.61 and@319.73 says,@319.87 this@320.70 is@320.94 pure@321.06
//   glass.@321.35 You@322.32 are@322.49 a@322.56 goddamn@322.70 artist.@323.05 This@323.73 is@323.75 art,@323.87
//   Mr.@324.37 White.@324.73 It's@325.94 just@326.43 basic@326.52 chemistry.@326.76 The@327.69 man@327.75
//   in@327.93 his@328.05 underpants@328.14 says@328.52 and@328.81 means@329.23 it@329.46 as@329.76 modesty,@329.99
//   and@330.88 it@330.90 is@331.00 the@331.08 worst@331.23 thing@331.55 he@331.82 could@332.00 have@332.17
//   said@332.26 because@332.46 it@332.70 is@332.87 true,@332.96 and@333.56 modesty@333.79 is@334.02 not@334.43
//   what@334.73 just@335.00 happened.@335.14 his@336.31 face@336.75 does@336.90 something@337.12 it@337.38
//   hasn't@337.52 done@337.81 in@337.94 years.@338.08
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 22, id: "art", set: "desert", cutIn: 318.05, cutOut: 338.9 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
