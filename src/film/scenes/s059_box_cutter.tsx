// SCENE 059 · "box-cutter" · set: superlab · narration 979.90s → 1004.02s (24.12s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he walks behind Victor, takes a box cutter, and opens his throat in one movement, with no more feeling than opening a parcel.
//   Nobody moves. He looks at them for a long moment, with blood on the front of the suit, and then tells them to get back to work.
//   Which is the plainest sentence in all sixty-two episodes: the smartest man in the room is replaceable, and so is everything he says about himself.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@980.34 he@980.50 walks@980.58 behind@980.82 Victor,@981.16 takes@981.96 a@982.20 box@982.38
//   cutter,@982.58 and@983.34 opens@983.44 his@983.82 throat@984.06 in@984.36 one@984.62 movement,@984.88
//   with@985.54 no@985.70 more@985.96 feeling@986.18 than@986.38 opening@986.64 a@986.88 parcel.@987.10 C@987.40
//   C@987.44 C@987.46 C@987.48 C@987.56 Nobody@988.26 moves.@988.66 He@989.85 looks@990.04 at@990.16 them@990.33
//   for@990.45 a@990.57 long@990.68 moment@990.87 with@991.26 blood@991.57 on@991.85 the@992.02 front@992.11
//   of@992.26 the@992.37 suit@992.45 and@992.62 then@993.21 tells@993.35 them@993.57 to@993.76 get@993.92
//   back@994.14 to@994.35 work.@994.50 Which@995.66 is@995.87 the@996.00 plainest@996.14 sentence@996.50 in@996.78
//   all@997.12 62@997.33 episodes.@997.76 The@999.11 smartest@999.14 man@999.33 in@999.75 the@999.88 room@999.97
//   is@1000.16 replaceable@1000.54 and@1001.26 so@1001.88 is@1002.07 everything@1002.21 he@1002.61 says@1002.76
//   about@1002.95 himself.@1003.16
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 59, id: "box-cutter", set: "superlab", cutIn: 979.9, cutOut: 1004.02 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
