// SCENE 049 · "watch" · set: bedroom · narration 780.65s → 807.11s (26.46s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is a thing that happens in the throat. Anybody who has found somebody in that position knows what the next four seconds sound like.
//   He steps forward. He stops.
//   Then he stands in a sleeping house and watches it happen, one hand held slightly out from his side, for about as long as it takes. Then he turns around and leaves.
//   There was a version of this where he simply saves her, and nothing would have happened to him.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@781.21 is@781.39 a@781.51 thing@781.59 that@781.79 happens@781.97 in@782.27 the@782.47 throat.@782.63
//   Anybody@783.73 who@784.15 has@784.33 found@784.41 somebody@784.65 in@784.93 that@785.17 position@785.27
//   knows@785.71 what@786.17 the@786.49 next@786.59 four@786.77 seconds@787.13 sound@787.59 like.@787.91 He@789.11
//   steps@789.43 forward.@789.61 He@790.77 stops.@790.87 Then@792.07 he@792.19 stands@792.31 in@792.57 a@792.87
//   sleeping@792.95 house@793.21 and@793.59 watches@793.95 it@794.23 happen.@794.55 One@795.19 hand@795.39
//   held@795.77 slightly@796.01 out@796.47 from@796.85 his@797.05 side@797.21 for@797.51 about@798.15 as@798.33
//   long@798.47 as@798.65 it@798.83 takes.@798.91 Then@799.75 he@800.23 turns@800.33 around@800.51 and@800.79
//   leaves.@801.55 There@802.77 was@803.25 a@803.37 version@803.45 of@803.69 this@803.87 where@804.03 he@804.21
//   simply@804.33 saves@804.59 her@804.95 and@805.17 nothing@805.35 would@805.65 have@805.85 happened@805.95
//   to@806.21 him.@806.41
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 49, id: "watch", set: "bedroom", cutIn: 780.65, cutOut: 807.11 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
