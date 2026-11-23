// SCENE 021 · "blue" · set: desert · narration 304.81s → 318.05s (13.24s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the trays come out, and the product is blue.
//   Not the blue of a sky, or a swimming pool, or a bird. Blue like something alive and cold that should not be out of the ground.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then,@305.40 the@305.96 trays@306.17 come@306.58 out.@306.82 And@307.00 the@307.76 product@307.87 is@308.17
//   blue.@309.12 Not@310.23 the@310.67 blue@310.79 of@310.93 a@311.06 sky@311.14 or@311.38 a@311.79
//   swimming@311.87 pool@312.08 or@312.43 a@312.70 bird.@312.79 Blue@313.62 likes@313.96 something@314.26
//   alive@314.64 and@315.14 cold@315.67 that@316.05 should@316.37 not@316.58 be@316.76 out@316.96 of@317.11
//   the@317.19 ground.@317.25
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 21, id: "blue", set: "desert", cutIn: 304.81, cutOut: 318.05 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
