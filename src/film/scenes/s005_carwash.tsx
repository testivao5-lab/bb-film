// SCENE 005 · "carwash" · set: carwash · narration 68.19s → 79.62s (11.43s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he drives to his second job and washes cars. Not manages the car wash. Washes them, for cash, after school, for a man named Bogdan who inspects the work with one finger.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@68.64 he@68.86 drives@69.28 to@69.50 a@69.68 second@69.78 job@70.08 and@70.36 washes@70.60 cars.@71.00
//   Not@71.98 manages@72.24 the@72.86 car@73.20 wash,@73.40 washes@74.08 them.@74.56 For@75.24 cash,@75.24
//   after@75.98 school@76.20 for@76.46 a@76.76 man@76.88 named@77.10 Bogdan@77.30 who@77.84 inspects@78.32
//   the@78.86 work@78.98 with@79.18 one@79.38
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 5, id: "carwash", set: "carwash", cutIn: 68.19, cutOut: 79.62 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
