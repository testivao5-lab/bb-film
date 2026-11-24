// SCENE 081 · "charity" · set: bar · narration 1399.54s → 1424.43s (24.89s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Gretchen and Elliott Schwartz gave twenty-eight million dollars to drug treatment clinics across the southwest, and are being asked whether that was to clean themselves of him.
//   Their answer is that Walter White had virtually nothing to do with building the company. Gretchen is the one who says it: his contribution, as far as she can recall, begins and ends with the name.
//   The police walk into an empty bar.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Gretchen@1400.07 and@1400.31 Elliot@1400.55 Schwartz@1400.87 gave@1401.16 $28@1401.64 million@1402.24
//   to@1402.72 drug@1403.51 treatment@1403.70 clinics@1404.05 across@1404.40 the@1404.70 southwest@1405.03
//   West,@1405.42 and@1405.87 are@1406.16 being@1406.22 asked@1406.38 whether@1406.72 that@1407.07 was@1407.38
//   to@1407.53 clean@1407.70 themselves@1408.22 of@1408.66 him.@1409.14 Their@1410.27 answer@1410.37 is@1410.66
//   that@1410.90 Walter@1411.05 White@1411.31 had@1411.70 virtually@1411.92 nothing@1412.20 to@1412.59 do@1412.90
//   with@1413.05 building@1413.22 the@1413.57 company.@1413.72 Gretchen@1414.62 is@1415.01 the@1415.16 one@1415.27
//   who@1415.40 says@1415.53 it.@1415.72 His@1416.29 contribution,@1416.37 as@1416.83 far@1417.35 as@1417.53
//   she@1417.66 can@1417.77 recall,@1417.88 begins@1418.64 and@1418.96 ends@1419.42 with@1419.83 the@1420.11
//   name.@1420.29 The@1421.72 police@1421.85 walk@1422.09 into@1422.61 an@1422.94 empty@1423.09 bar.@1423.33
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {BarRoom,InterviewTV} from "../../env/d_bar";
import {Chair,Table} from "../../env/d_interiors";
import {Actor} from "../../props/d_actor";
import {extra,sitAtTable,walkPose,lidsOf} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:81,id:"charity",set:"bar",cutIn:1399.54,cutOut:1424.43};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut), C={question:beat(1406.16),reaction:beat(1410.27),female:beat(1414.62),resolve:beat(1418.64),police:beat(1421.72)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const COP1=extra({height:1.8,skin:"#a67a62",jacket:"#273749",shirt:"#c5d1da",pants:"#27333f",hair:"#292421",hairStyle:"buzz",age:.36});
const COP2=extra({height:1.72,skin:"#d3af99",jacket:"#34475a",shirt:"#c5d1da",pants:"#27333f",hair:"#594533",hairStyle:"swept",age:.3});
const stage=(cam:Cam,g:number,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><BarRoom cam={cam} f={g}/>{children}</svg><Motes f={g} n={18} color="#e7c595" seed={28} drift={.12}/><Finish f={g} vig={.5} grain={.055} shadow="#101827" gradeO={.11}/></AbsoluteFill>;
const TVClose:React.FC<{start:number;speaker:0|1}> =({start,speaker})=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+start+f,cam:Cam={x:1.6,y:2.6,z:7.7,f:1600,shiftY:30,focus:2.1,aperture:.35};return stage(cam,g,<Card cam={cam} x={1.6} y={2.45} z={9.8}><InterviewTV f={g} speaker={speaker}/></Card>)};
const Interview:React.FC=()=> <TVClose start={0} speaker={0}/>;
const Female:React.FC=()=> <TVClose start={C.female} speaker={1}/>;
const Watching:React.FC<{start:number;resolve?:boolean}>=({start,resolve=false})=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+start+f,t=prog(f,5,45,easeInOut);const push=prog(f,0,90,easeInOut);const cam:Cam=resolve?{x:-.55,y:1.27,z:4.55+.25*push,f:1700,shiftY:30,focus:2.5,aperture:.4}:start===C.reaction?{x:-.45,y:1.18,z:4.05+.25*push,f:1700,shiftY:30,focus:3,aperture:.4}:{x:-.55,y:1.08,z:3.5,f:1600,shiftY:30,focus:3.6,aperture:.4};return stage(cam,g,<><Card cam={cam} x={1.6} y={2.45} z={9.8}><InterviewTV f={g} speaker={resolve?1:0}/></Card><Card cam={cam} x={-.6} z={7.15}><Chair/></Card><Actor cam={cam} x={-.6} z={7.1} face={1} view={1} pose={sitAtTable(g,{lean:12-4*t,armL:26,armR:45+12*t,elL:35,elR:55})} look={teacherLook({yaw:.6,lids:lidsOf(g,3,.24,85)-.08*t,brow:.45+.35*t,mouth:"flat",lookY:-.3})} pal={coat} height={TEACHER.height} rimLight="#f6c995"/><Card cam={cam} x={.12} z={6.9}><Table w={.7}/><rect x={-.055} y={-.89} width={.11} height={.14} rx={.01} fill="#d6a968" opacity={.8}/></Card></>)};
const Police:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.police+f,t=prog(f,0,65,easeInOut);const cam:Cam={x:0,y:1.2,z:2.4,f:1400,shiftY:25,focus:5,aperture:.4};return stage(cam,g,<><Card cam={cam} x={-1.45} z={8.7}><rect x={-.45} y={-2.05} width={.9} height={2.05} fill="#202b35" stroke="#77614f" strokeWidth={.08}/><rect x={-.34} y={-1.9} width={.68} height={.8} fill="#8193a0"/><path d="M-.34,-1.25 Q0,-1.37 .34,-1.25" stroke="#e2e7e4" strokeWidth={.08} fill="none"/></Card><Actor cam={cam} x={lerp(-2.2,-.95,t)} z={7.3} face={1} view={1} pose={walkPose(g*.16,{amp:20,armAmp:15,lean:3})} look={{...COP1.look,yaw:.6,lookX:.5,brow:.45}} pal={COP1.pal} height={COP1.h}/><Actor cam={cam} x={lerp(-3,-1.9,t)} z={7.8} face={1} view={1} pose={walkPose(g*.16+1.1,{amp:18,armAmp:17,lean:3})} look={{...COP2.look,yaw:.6,lookX:.5,brow:.35}} pal={COP2.pal} height={COP2.h}/><Card cam={cam} x={.25} z={7.05}><Table w={.7}/><rect x={-.055} y={-.89} width={.11} height={.14} rx={.01} fill="#d6a968" opacity={.8}/></Card></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.question}><Interview/></Sequence><Sequence from={C.question} durationInFrames={C.reaction-C.question}><Watching start={C.question}/></Sequence><Sequence from={C.reaction} durationInFrames={C.female-C.reaction}><Watching start={C.reaction}/></Sequence><Sequence from={C.female} durationInFrames={C.resolve-C.female}><Female/></Sequence><Sequence from={C.resolve} durationInFrames={C.police-C.resolve}><Watching start={C.resolve} resolve/></Sequence><Sequence from={C.police} durationInFrames={DUR-C.police}><Police/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_bar.wav")} volume={.035}/></Sequence><Sequence from={C.police+4} durationInFrames={40}><Audio src={staticFile("sfx/d_door.wav")} volume={.11}/></Sequence><Sequence from={C.police} durationInFrames={80}><Audio src={staticFile("sfx/d_siren_far.wav")} volume={.1}/></Sequence></AbsoluteFill>;
