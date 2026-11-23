// SCENE 087 · "circle" · set: compound · narration 1500.69s → 1517.54s (16.85s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then he is on the floor with his arms around him, the fob is in his fingers, the trunk is opening, and the bullets go round the room in a circle. One of them is for him. He has already thrown his body over the boy, and it is the one act in the whole story that needs no justification.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1501.12 he@1501.34 is@1501.68 on@1501.76 the@1501.90 floor@1502.02 with@1502.32 his@1502.54 arms@1502.66
//   around@1503.00 him.@1503.30 The@1503.84 fob@1503.90 is@1504.14 in@1504.32 his@1504.44 fingers,@1504.52
//   the@1505.30 trunk@1505.38 is@1505.62 opening,@1505.88 and@1506.66 the@1506.70 bullets@1506.80 go@1507.08
//   round@1507.34 the@1507.68 room@1507.92 in@1508.14 a@1508.32 circle.@1508.38 One@1509.30 of@1509.36
//   them@1509.48 is@1509.60 for@1509.88 him.@1510.04 He@1510.98 has@1511.10 already@1511.20 thrown@1511.46
//   his@1511.80 body@1512.12 over@1512.42 the@1512.62 boy,@1512.78 and@1513.54 it@1513.68 is@1513.78 the@1513.88
//   one@1514.02 act@1514.24 in@1514.54 the@1514.76 whole@1514.84 story@1515.10 that@1515.60 needs@1515.76
//   no@1515.96 justification.@1516.40
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 87, id: "circle", set: "compound", cutIn: 1500.69, cutOut: 1517.54 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
