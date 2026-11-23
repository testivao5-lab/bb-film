// SCENE 089 · "handprint" · set: labNight · narration 1528.63s → 1544.01s (15.38s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   And then he walks through the lab, past tanks and hoses, and puts his hand on the side of one, the way a man pats a car he used to own, and the steel comes away red.
//   He goes down on the concrete, and the police will find him there. Which is where we came in.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   And@1529.05 then@1529.16 he@1529.33 walks@1529.46 through@1529.77 the@1530.09 lab,@1530.20 past@1530.74
//   tanks@1530.94 and@1531.31 hoses,@1531.59 and@1532.29 puts@1532.40 his@1532.66 hand@1532.88 on@1533.18
//   the@1533.37 side@1533.46 of@1533.74 one,@1533.88 the@1534.44 way@1534.57 a@1534.70 man@1534.83 pats@1535.09
//   a@1535.40 car@1535.53 he@1535.81 used@1536.09 to@1536.27 own,@1536.42 and@1537.09 the@1537.31 steel@1537.40
//   comes@1537.62 away@1538.05 red.@1538.33 He@1539.38 goes@1539.62 down@1539.77 on@1540.03 the@1540.16
//   concrete,@1540.29 and@1540.92 the@1541.12 police@1541.20 will@1541.44 find@1541.68 him@1541.94 there,@1542.07
//   which@1542.53 is@1542.72 where@1542.83 we@1542.98 came@1543.14 in.@1543.31
import React from "react";
import { Placeholder } from "../Placeholder";

export const META = { n: 89, id: "handprint", set: "labNight", cutIn: 1528.63, cutOut: 1544.01 };
/** narration second → local frame of this scene */
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

export const Scene: React.FC = () => <Placeholder meta={META} />;
