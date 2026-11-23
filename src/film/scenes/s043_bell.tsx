// SCENE 043 · "bell" · set: desertDusk · narration 683.17s → 699.42s (16.25s)
// OWNER: batch B (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Walter's way out is a packet of ricin folded into a burrito, and it would have worked, except that the old man in the wheelchair is Tuco's uncle, he cannot speak, and he can still work a bell.
//   The bell rings until the plate is on the floor and the nephew finally understands what he has been told.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Walter's@683.70 way@684.12 out@684.24 is@684.50 a@684.65 packet@684.74 of@685.00 ricin@685.17 folded@685.67
//   it@685.93 into@686.15 a@686.41 burrito,@686.55 and@687.32 it@687.39 would@687.48 have@687.63 worked,@687.74
//   except@688.36 that@688.67 the@688.89 old@688.98 man@689.12 in@689.32 the@689.43 wheelchair@689.50 is@689.77
//   Tuko's@690.22 uncle.@690.70 He@691.43 cannot@691.55 speak,@691.74 and@692.53 he@692.75 can@692.84 still@692.96
//   work@693.24 a@693.53 bell.@693.63 The@694.63 bell@694.72 rings@694.88 until@695.12 the@695.38 plate@695.55
//   is@695.75 on@695.93 the@696.08 floor,@696.17 and@696.48 the@696.74 nephew@696.84 finally@697.01
//   understands@697.48 what@698.03 he@698.43 has@698.55 been@698.65 told.@698.79
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 43, id: "bell", set: "desertDusk", cutIn: 683.17, cutOut: 699.42 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
