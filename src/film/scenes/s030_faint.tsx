// SCENE 030 · "faint" · set: basement · narration 452.74s → 457.60s (4.86s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he faints at the bottom of the stairs holding a sandwich, and the plate breaks.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@453.18 he@453.38 faints@453.52 at@453.74 the@453.94 bottom@453.98 of@454.24 the@454.34 stairs,@454.42
//   holding@454.98 a@455.30 sandwich,@455.38 and@456.32 the@456.50 plate@456.60 breaks.@456.78
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 30, id: "faint", set: "basement", cutIn: 452.74, cutOut: 457.6 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
