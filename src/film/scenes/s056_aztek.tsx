// SCENE 056 · "aztek" · set: street · narration 918.50s → 943.54s (25.04s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then there is a Pontiac Aztek.
//   One dealer goes under the wheels. The other goes over the hood and lands with his leg bent the wrong way, and reaches for his gun anyway, and the driver walks over, picks it up, and shoots him in the head in front of Jesse.
//   Then he says one word. “Run.”
//   Not a threat. Advice, given to a boy he has just killed two men for.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@918.98 there@919.46 was@919.94 a@920.06 Pontiac@920.16 Aztec@920.64 One@922.22 dealer@922.70 goes@922.96
//   under@923.28 the@923.46 wheels.@923.60 The@924.34 other@924.56 goes@924.72 over@924.88 the@925.10 hood@925.22
//   and@925.44 lands@925.78 with@926.00 his@926.24 leg@926.36 bent@926.60 the@926.88 wrong@927.10 way@927.26
//   and@927.60 reaches@927.96 for@928.14 his@928.44 gun@928.54 anyway@928.66 away,@929.04 and@929.66 the@929.80
//   driver@929.88 walks@930.08 over,@930.46 picks@931.10 it@931.40 up,@931.62 and@932.00 shoots@932.08 him@932.40
//   in@932.62 the@932.70 head@932.78 in@933.06 front@933.28 of@933.46 Jesse.@933.58 Then@934.80 he@934.96
//   says@935.04 one@935.22 word,@935.52 run.@936.80 Not@938.06 a@938.34 threat.@938.42 Advice.@939.50 Given@940.42
//   to@940.58 a@940.80 boy@940.92 he@941.14 has@941.40 just@941.56 killed@941.78 two@942.12 men@942.56 for.@942.80
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 56, id: "aztek", set: "street", cutIn: 918.5, cutOut: 943.54 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
