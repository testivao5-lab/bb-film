// SCENE 051 · "planes" · set: tower · narration 823.27s → 835.06s (11.79s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Two planes, over Albuquerque, at night. One hundred and sixty-seven people. Nobody ever says it out loud.
//   The show just stands a man in a control tower and lets you do it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Two@823.82 planes@823.86 over@824.15 Albuquerque@824.75 at@825.17 night.@825.82 167@826.75 people.@826.84
//   Nobody@829.12 ever@829.43 says@829.84 it@830.15 out@830.34 loud.@830.43 The@831.25 show@831.27 just@831.46
//   stands@831.62 a@831.93 man@832.10 in@832.25 the@832.43 control@832.51 tower@832.75 and@833.08 lets@833.41
//   you@833.62 do@833.88 it.@834.12
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 51, id: "planes", set: "tower", cutIn: 823.27, cutOut: 835.06 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
