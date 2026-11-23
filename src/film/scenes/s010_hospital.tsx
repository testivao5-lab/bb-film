// SCENE 010 · "hospital" · set: hospital · narration 135.92s → 150.25s (14.33s)
// OWNER: batch A (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a hospital corridor, and a stranger explaining his own body to him.
//   Lung cancer. Stage three. Inoperable. With treatment, two years, and they say it the way you would read out a bus timetable.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@136.34 a@136.50 hospital@136.59 corridor,@136.91 and@137.81 a@137.94 stranger@138.03 explaining@138.25
//   his@138.84 own@139.19 body@139.35 to@139.68 him.@139.94 Lung@140.96 cancer.@141.12 Stage@142.51 3.@142.51
//   Inoperable.@143.97 With@145.38 treatment,@145.38 two@146.18 years.@146.38 And@147.50 they@147.62 say@147.72
//   it@147.90 the@148.01 way@148.09 you@148.24 would@148.38 read@148.50 read@148.69 out@148.84 a@148.96 bus@149.06
//   timetable.@149.29
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 10, id: "hospital", set: "hospital", cutIn: 135.92, cutOut: 150.25 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
