// SCENE 046 · "gunfight" · set: desertDusk · narration 728.66s → 750.65s (21.99s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is a gunfight in the desert. Short. Loud. It ends with a headshot.
//   Hank Schrader, off duty and alone, kills a drug lord in the dirt, and then walks over to look at him, and hears a bell ringing from somewhere inside the shack.
//   He gets a medal, a transfer to El Paso he does not want, and a bill for the therapy. Walter gets a signed card.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@729.01 is@729.15 a@729.27 gunfight@729.35 in@729.79 the@730.01 desert.@730.09 Short,@730.89 loud.@732.03
//   It@732.71 ends@732.75 with@732.97 a@733.17 headshot.@733.27 Hank@734.73 Schrader,@734.73 off@735.33
//   duty@735.43 and@735.65 alone,@735.91 kills@736.39 a@736.61 drug@736.77 lord@736.93 in@737.19 the@737.51
//   dirt,@737.63 and@738.45 then@738.53 walks@738.65 over@738.91 to@739.23 look@739.37 at@739.55 him.@739.73
//   And@740.33 here's@740.37 a@740.57 bell@740.65 ringing@740.89 from@741.15 somewhere@741.47 inside@741.91
//   the@742.19 shack.@742.37 He@743.37 gets@743.65 a@743.77 medal,@743.91 a@744.59 transfer@744.71 to@744.95
//   El@745.21 Paso@745.33 he@745.63 does@745.87 not@745.97 want,@746.21 and@746.85 a@747.05 bill@747.11 for@747.27
//   the@747.49 therapy.@747.59 therapy.@747.85 Walter@748.73 gets@748.99 a@749.25 signed@749.37 card.@749.67
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 46, id: "gunfight", set: "desertDusk", cutIn: 728.66, cutOut: 750.65 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
