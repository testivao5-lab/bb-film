// SCENE 027 · "fire" · set: desert · narration 396.62s → 423.52s (26.90s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the cigarette that got thrown out of the window does what cigarettes do in a desert in July. Walter drags his unconscious partner into the passenger seat, puts a respirator on his face, and drives away from a fire with a body on the floor between the trays.
//   He gets the RV into a ditch and stands in the middle of an empty road with a gun he does not know how to use, and tries it.
//   The safety is on. He is still here.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@397.04 the@397.56 cigarette@397.78 that@398.08 got@398.34 thrown@398.50 out@398.76 of@399.04 the@399.14
//   window@399.22 does@399.50 what@399.82 cigarettes@400.08 do@400.40 in@400.82 a@401.04 desert@401.10 in@401.38
//   July.@401.62 Walter@402.80 drags@403.24 his@403.78 unconscious@403.86 partner@404.12 into@404.76 the@405.12
//   passenger@405.34 seat,@405.58 puts@406.36 a@406.60 respirator@406.72 on@407.22 his@407.42 face,@407.54
//   and@408.02 drives@408.20 away@408.42 from@408.78 a@409.06 fire@409.16 with@409.36 a@409.70 body@409.76
//   on@410.08 the@410.30 floor@410.40 between@410.66 the@411.00 trays.@411.20 He@412.40 gets@412.70 the@412.86
//   RV@413.06 into@413.22 a@413.62 ditch@413.76 and@413.98 stands@414.48 in@414.74 the@415.16 middle@415.24
//   of@415.50 an@415.68 empty@415.78 road@416.06 with@416.36 a@416.60 gun@416.68 he@416.94 does@417.20 not@417.38
//   know@417.56 how@417.82 to@417.96 use,@418.08 and@418.82 tries@419.06 it.@419.30 The@420.26 safety@420.56
//   is@420.76 on.@421.06 He@421.98 is@422.14 still@422.28 here.@422.60 here.@423.00
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 27, id: "fire", set: "desert", cutIn: 396.62, cutOut: 423.52 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
