// SCENE 082 · "for-a-name" · set: desertDusk · narration 1424.43s → 1436.59s (12.16s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   From the moment he sees that interview, everything he does is for a name and a ledger.
//   He drives back across the country. Then he buys a machine gun, a garage door opener and a car battery.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   From@1425.18 the@1425.55 moment@1425.68 he@1425.98 sees@1426.16 that@1426.37 interview,@1426.66
//   everything@1427.38 he@1427.72 does@1428.09 is@1428.31 for@1428.57 a@1428.87 name@1429.09 and@1429.35 a@1429.64
//   ledger.@1429.77 He@1429.98 drives@1430.53 back@1430.92 across@1431.29 the@1431.53 country.@1431.87
//   Then@1432.66 he@1432.77 buys@1432.96 a@1433.16 machine@1433.33 gun,@1433.59 a@1434.24 garage@1434.24
//   door@1434.44 opener,@1434.85 and@1435.42 a@1435.51 car@1435.59 battery.@1435.77
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H,planePts} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {BarRoom,InterviewTV} from "../../env/d_bar";
import {DesertAll} from "../../env/d_sets";
import {DDefs} from "../../env/d_shared";
import {Chair,Table} from "../../env/d_interiors";
import {Sedan} from "../../props/d_vehicle";
import {Actor} from "../../props/d_actor";
import {extra,sitAtTable,lidsOf} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:82,id:"for-a-name",set:"desertDusk",cutIn:1424.43,cutOut:1436.59};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut),C={drive:beat(1430.53),buy:beat(1432.77)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const seller=extra({height:1.78,skin:"#b48d75",jacket:"#55594d",shirt:"#c3b9a4",pants:"#373c3b",hair:"#514035",age:.5});
const frame=(g:number,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><DDefs tone="dusk"/>{children}</svg><Motes f={g} n={18} color="#f3d5ab" seed={42} drift={.12}/><Finish f={g} vig={.5} grain={.055} shadow="#101827" gradeO={.11}/></AbsoluteFill>;
const Decide:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,t=prog(f,30,135,easeInOut),cam:Cam={x:-.45,y:.95,z:4.1,f:1750,shiftY:30,focus:3,aperture:.4};return frame(g,<><BarRoom cam={cam} f={g}/><Card cam={cam} x={1.6} y={2.45} z={9.8}><InterviewTV f={g} speaker={1}/></Card><Card cam={cam} x={-.6} z={7.15}><Chair/></Card><Actor cam={cam} x={-.6} z={7.1} face={1} view={1} pose={sitAtTable(g,{lean:12-4*t,armL:26,armR:45+10*t,elL:35,elR:55})} look={teacherLook({yaw:.6,lids:lidsOf(g,3,.25,85)-.08*t,brow:.5+.3*t,mouth:"flat",lookY:-.3})} pal={coat} height={TEACHER.height} rimLight="#f6c995"/><Card cam={cam} x={.1} z={6.9}><Table w={.7}/><rect x={-.055} y={-.89} width={.11} height={.14} rx={.01} fill="#d6a968" opacity={.8}/></Card></>)};
const Drive:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.drive+f,cam:Cam={x:0,y:1.1,z:2,f:1100,shiftY:30,focus:6,aperture:.3};return frame(g,<><DesertAll cam={cam} f={g} tone="dusk"/><polygon points={planePts(cam,[[-40,4],[40,4],[40,10],[-40,10]])} fill="#514849"/><Card cam={cam} x={lerp(-1.4,1.2,prog(f,0,65,easeInOut))} z={7.5}><Sedan wheel={f*13} bounce={.008*Math.sin(f*.8)} body="#493e3b" shade="#272529" light="#9d8175"/></Card></>)};
const Items:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.buy+f,cam:Cam={x:0,y:1.12,z:3.1,f:1450,shiftY:35,focus:4.2,aperture:.4},reveal=prog(f,8,30,easeInOut);return frame(g,<><DesertAll cam={cam} f={g} tone="dusk"/><Actor cam={cam} x={-1.1} z={7.2} face={1} view={1} pose={{torso:10,neck:10,shL:30,shR:55,elL:40,elR:65,hipL:5,hipR:8,knL:8,knR:10,breathe:breath(g,.1)}} look={teacherLook({yaw:.6,brow:.55,lookY:.3})} pal={coat} height={TEACHER.height}/><Actor cam={cam} x={1.2} z={7.5} face={-1} view={1} pose={{torso:6,neck:8,shL:52,shR:20,elL:70,elR:35,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...seller.look,yaw:.6,lookY:.3}} pal={seller.pal} height={seller.h}/><Card cam={cam} x={.05} z={6.8}><Table w={1.6}/><g><path d="M-.63,-.86 L.42,-.86 L.42,-.92 L.23,-.93 L.15,-1 L-.27,-1 L-.32,-.92 L-.63,-.92Z" fill="#25292b" stroke="#111" strokeWidth={.015}/><rect x={-.3} y={-.92} width={.22} height={.15} fill="#343838"/><rect x={.55} y={-.99} width={.27} height={.19} rx={.02} fill="#363c3d" stroke="#111" strokeWidth={.015}/><rect x={.58} y={-1.04} width={.04} height={.05} fill="#a3a5a0"/><rect x={.74} y={-1.04} width={.04} height={.05} fill="#a3a5a0"/><rect x={.29} y={-.97} width={.15} height={.09} rx={.01} fill="#686c66"/><circle cx={.37} cy={-.92} r={.015} fill="#c4c5b9"/></g></Card></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.drive}><Decide/></Sequence><Sequence from={C.drive} durationInFrames={C.buy-C.drive}><Drive/></Sequence><Sequence from={C.buy} durationInFrames={DUR-C.buy}><Items/></Sequence><Sequence from={0} durationInFrames={C.drive}><Audio src={staticFile("sfx/d_bar.wav")} volume={.035}/></Sequence><Sequence from={C.drive} durationInFrames={C.buy-C.drive}><Audio src={staticFile("sfx/d_car_arrive.wav")} volume={.1}/></Sequence><Sequence from={C.buy} durationInFrames={DUR-C.buy}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence></AbsoluteFill>;
