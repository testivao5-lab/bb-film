// SCENE 013 · "tvnews" · set: livingroom · narration 176.95s → 196.66s (19.71s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The story is on the news: a meth lab, and about seven hundred thousand dollars in cash on a table, and Hank on the television in the corner being interviewed about it.
//   Walt asks how much money that is. Hank tells him, then makes an offer in the same breath. Come along next time. See what real men do.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@177.44 story@177.53 is@177.88 on@178.13 the@178.25 news,@178.38 a@179.13 meth@179.18 lab,@179.44
//   and@180.22 about@180.28 $700@180.44 ,000@180.90 in@181.66 cash@182.07 on@182.34 a@182.75 table,@182.85
//   and@183.79 Hank@184.00 on@184.22 the@184.47 television@184.57 in@184.97 the@185.18 corner@185.28 being@185.51
//   interviewed@185.81 about@186.18 it.@186.59 Walt@187.60 asks@187.84 how@188.22 much@188.44 money@188.60
//   that@188.96 is.@189.12 Hank@190.08 tells@190.22 him,@190.48 then@191.12 makes@191.38 an@191.60 offer@191.74
//   in@192.04 the@192.34 same@192.44 breath.@192.64 Come@193.76 along@193.90 next@194.10 time,@194.34 see@195.00
//   what@195.22 real@195.38 men@195.62 do.@195.92
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 13, id: "tvnews", set: "livingroom", cutIn: 176.95, cutOut: 196.66 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
