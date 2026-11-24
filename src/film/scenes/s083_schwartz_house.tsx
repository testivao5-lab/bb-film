// SCENE 083 · "schwartz-house" · set: mansion · narration 1436.59s → 1460.17s (23.58s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   First, a large house, where he admires the décor and puts nine point seven two million dollars on the coffee table in bags. It is theirs to give to his son on his eighteenth birthday, in a trust fund, under their names, for reasons that are non-negotiable.
//   The reasons are the two best hitmen west of the Mississippi, and two small laser dots on the couple's chests.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   First,@1437.16 a@1437.61 large@1437.72 house.@1437.90 where@1438.80 he@1438.92 admires@1439.04 the@1439.40
//   decor@1439.64 and@1439.76 puts@1440.52 $9@1440.68 .72@1441.08 million@1442.00 on@1442.34 the@1443.06
//   coffee@1443.14 table@1443.30 in@1443.72 bags.@1443.96 It@1445.02 is@1445.10 theirs@1445.22 to@1445.44
//   give@1445.94 to@1446.12 his@1446.28 son@1446.44 on@1446.72 his@1446.96 18th@1447.10 birthday@1447.72
//   in@1448.06 a@1448.52 trust@1448.62 fund@1448.80 under@1449.16 their@1449.78 names,@1450.12 for@1451.00
//   reasons@1451.18 that@1451.44 are@1451.76 non@1451.90 -negotiable.@1452.16 The@1453.92 reasons@1454.02
//   are@1454.30 the@1454.68 two@1454.78 best@1455.00 hitmen@1455.42 west@1455.90 of@1456.20 the@1456.38
//   Mississippi@1456.48 and@1456.84 two@1457.54 small@1457.78 laser@1458.20 dots@1458.56 on@1458.90 the@1459.14
//   couple's@1459.24 chests.@1459.56
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {Mansion,MoneyBags} from "../../env/d_mansion";
import {Table} from "../../env/d_interiors";
import {Actor} from "../../props/d_actor";
import {extra,walkPose,lidsOf} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";

export const META={n:83,id:"schwartz-house",set:"mansion",cutIn:1436.59,cutOut:1460.17};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut), C={money:beat(1440.52),terms:beat(1445.02),couple:beat(1449.16),threat:beat(1453.92),dots:beat(1457.54)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const man=extra({height:1.74,skin:"#d3ae93",jacket:"#373d48",hair:"#59473b",age:.5});
const woman=extra({height:1.66,skin:"#dbb39a",jacket:"#665a5d",hair:"#514139",hairStyle:"long",age:.46});
const stage=(g:number,cam:Cam,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><Mansion cam={cam} f={g}/>{children}</svg><Motes f={g} n={22} color="#f7d9aa" seed={33} drift={.09}/><Finish f={g} vig={.42} grain={.052} shadow="#182129" gradeO={.09}/></AbsoluteFill>;
const Entry:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,t=prog(f,0,82,easeInOut),cam:Cam={x:0,y:1.15,z:3.5,f:1500,shiftY:20,focus:4.2,aperture:.3};return stage(g,cam,<><Actor cam={cam} x={lerp(-1.8,-1.0,t)} z={7.4} face={1} view={1} pose={{...walkPose(g*.12,{amp:13*(1-t),armAmp:15,lean:3}),shR:30+12*t,elR:48}} look={teacherLook({yaw:.6,lids:lidsOf(g,4,.22,85),brow:.35,lookY:-.2})} pal={coat} height={TEACHER.height}/><Actor cam={cam} x={1.35} z={8.2} face={-1} view={1} pose={{torso:3,neck:0,shL:22,shR:40,elL:40,elR:65,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...man.look,yaw:.6,brow:.55}} pal={man.pal} height={man.h}/><Actor cam={cam} x={2.1} z={8.5} face={-1} view={1} pose={{torso:3,neck:0,shL:45,shR:15,elL:70,elR:30,hipL:7,hipR:8,knL:8,knR:10,breathe:breath(g,.1)}} look={{...woman.look,yaw:.6,brow:.6}} pal={woman.pal} height={woman.h}/></>)};
const Money:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.money+f,cam:Cam={x:0,y:.9,z:4.5,f:1600,shiftY:20,focus:2.5,aperture:.35};return stage(g,cam,<><Actor cam={cam} x={-.95} z={7.4} face={1} view={1} pose={{torso:14,neck:8,shL:26,shR:58,elL:45,elR:65,hipL:8,hipR:9,knL:10,knR:11,breathe:breath(g,.1)}} look={teacherLook({yaw:.6,brow:.4,lookY:.25})} pal={coat} height={TEACHER.height}/><Card cam={cam} x={.15} z={7.0} blur={false}><Table w={1.9} h={.44} top="#b79c7b"/><g transform={`translate(0,${lerp(-.36,0,prog(f,0,30,easeInOut))})`}><MoneyBags/></g></Card></>)};
const Terms:React.FC<{start:number;dots?:boolean;threat?:boolean;close?:boolean}>=({start,dots=false,threat=false,close=false})=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+start+f,t=prog(f,10,45,easeInOut),cam:Cam=close?{x:1.15,y:.86,z:4.1,f:1900,shiftY:20,focus:3.8,aperture:.35}:{x:.3,y:1.05,z:3.4,f:1500,shiftY:20,focus:4.4,aperture:.35};return stage(g,cam,<><Actor cam={cam} x={-1.55} z={7.6} face={1} view={1} pose={{torso:6,neck:-3,shL:20,shR:45+18*t,elL:40,elR:65,hipL:7,hipR:9,knL:8,knR:10,breathe:breath(g,.1)}} look={teacherLook({yaw:.6,lids:.22,brow:.45,mouth:Math.sin(g*.17)>0?"open":"flat",mouthOpen:.14})} pal={coat} height={TEACHER.height}/><Actor cam={cam} x={.8} z={7.9} face={-1} view={.65} pose={{torso:-3-4*t,neck:3,shL:25,shR:42,elL:45,elR:75,hipL:8,hipR:11,knL:10,knR:14,breathe:breath(g,.1)}} look={{...man.look,yaw:.4,brow:.75,lids:.1,lookX:.5}} pal={man.pal} height={man.h}>{dots&&<circle cx={.03} cy={-1.18} r={.023} fill="#ff2520" stroke="#ffd2c1" strokeWidth={.008}/>}</Actor><Actor cam={cam} x={1.72} z={8.0} face={-1} view={.65} pose={{torso:-4-3*t,neck:4,shL:44,shR:22,elL:75,elR:45,hipL:9,hipR:10,knL:12,knR:12,breathe:breath(g,.1)}} look={{...woman.look,yaw:.4,brow:.8,lids:.08,mouth:threat?"open":"flat",mouthOpen:.13}} pal={woman.pal} height={woman.h}>{dots&&<circle cx={.03} cy={-1.13} r={.023} fill="#ff2520" stroke="#ffd2c1" strokeWidth={.008}/>}</Actor><Card cam={cam} x={-.05} z={7.2} blur={false}><Table w={1.7} h={.44} top="#b79c7b"/><MoneyBags/></Card></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.money}><Entry/></Sequence><Sequence from={C.money} durationInFrames={C.terms-C.money}><Money/></Sequence><Sequence from={C.terms} durationInFrames={C.couple-C.terms}><Terms start={C.terms}/></Sequence><Sequence from={C.couple} durationInFrames={C.threat-C.couple}><Terms start={C.couple} close/></Sequence><Sequence from={C.threat} durationInFrames={C.dots-C.threat}><Terms start={C.threat} threat/></Sequence><Sequence from={C.dots} durationInFrames={DUR-C.dots}><Terms start={C.dots} dots threat/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_roomtone.wav")} volume={.035}/></Sequence><Sequence from={C.money+10} durationInFrames={30}><Audio src={staticFile("sfx/d_paper.wav")} volume={.1}/></Sequence><Sequence from={C.dots} durationInFrames={20}><Audio src={staticFile("sfx/d_tap.wav")} volume={.1}/></Sequence></AbsoluteFill>;
