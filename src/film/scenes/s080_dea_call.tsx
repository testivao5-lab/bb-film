// SCENE 080 · "dea-call" · set: bar · narration 1385.69s → 1399.54s (13.85s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   So he calls the DEA on himself, and gives a name that makes a whole building stand up.
//   And then, waiting for them, at a bar, on a television above the bottles, two people from his old life are being interviewed about their charity.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   So@1386.12 he@1386.38 calls@1386.48 the@1386.64 DEA@1386.87 on@1387.18 himself@1387.46 and@1387.66
//   gives@1388.35 a@1388.46 name@1388.61 that@1388.87 makes@1389.18 a@1389.35 whole@1389.48 building@1389.68
//   stand@1390.14 up.@1390.44 And@1391.64 then,@1391.77 waiting@1392.20 for@1392.57 them,@1392.85 at@1393.20
//   a@1393.51 bar,@1393.57 on@1394.22 a@1394.40 television@1394.48 above@1394.83 the@1395.12 bottles,@1395.33
//   two@1396.22 people@1396.29 from@1396.61 his@1396.79 old@1396.92 life@1397.16 are@1397.46 being@1397.81
//   interviewed@1397.94 about@1398.27 their@1398.59 charity.@1398.74
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,project,W,H} from "../../lib/camera";
import {breath,easeInOut,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {DDefs} from "../../env/d_shared";
import {BarRoom,Payphone,InterviewTV} from "../../env/d_bar";
import {Chair,Table} from "../../env/d_interiors";
import {Actor} from "../../props/d_actor";
import {extra,handAt,sitAtTable,lidsOf} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:80,id:"dea-call",set:"bar",cutIn:1385.69,cutOut:1399.54};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut),C={office:beat(1389.18),bar:beat(1391.64),tv:beat(1395.33)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const staff=[extra({height:1.76,skin:"#a77961",jacket:"#4d5963",shirt:"#dad5c6",pants:"#303940",hair:"#292524",age:.35}),extra({height:1.7,skin:"#d9b39b",jacket:"#5c535d",shirt:"#d0c8bf",pants:"#3e3a44",hair:"#483529",hairStyle:"long",age:.34}),extra({height:1.8,skin:"#b99d7f",jacket:"#555949",shirt:"#d3ccbb",pants:"#343932",hair:"#453c2d",age:.46})];
const finish=(g:number,children:React.ReactNode)=><AbsoluteFill>{children}<Motes f={g} n={18} color="#e7c595" seed={18} drift={.12}/><Finish f={g} vig={.5} grain={.055} shadow="#101827" gradeO={.11}/></AbsoluteFill>;
const Call:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,cam:Cam={x:-.25,y:1.35,z:4,f:1600,shiftY:35,focus:3.1,aperture:.4};const pose={torso:8,neck:-3,shL:135,shR:24,elL:130,elR:42,hipL:8,hipR:13,knL:12,knR:17,breathe:breath(g,.14)},h=handAt(pose,TEACHER.height,1,"L"),hp=project(cam,-.55,0,7.1),bp=project(cam,.95,1.03,8.7);return finish(g,<svg width={W} height={H}><BarRoom cam={cam} f={g}/><Card cam={cam} x={.95} z={8.7}><Payphone/></Card><path d={`M${bp.x},${bp.y} Q${(bp.x+hp.x)/2},${bp.y+130} ${hp.x+h.x*hp.s},${hp.y+h.y*hp.s}`} fill="none" stroke="#191c1c" strokeWidth={5}/><Actor cam={cam} x={-.55} z={7.1} face={1} view={1} pose={pose} look={teacherLook({yaw:.6,lids:lidsOf(g,4,.27,75),brow:.6,mouth:"open",mouthOpen:.1+.15*Math.abs(Math.sin(g*.3)),lookY:.1})} pal={coat} height={TEACHER.height}><g transform={`translate(${h.x},${h.y}) rotate(-45)`}><path d="M-.035,-.13 Q-.09,-.12 -.085,-.07 L-.055,-.04 Q-.015,-.08 .025,-.09 Q.065,-.07 .085,-.04 L.115,-.075 Q.09,-.13 .035,-.13 Z" fill="#171b1c" stroke="#090b0b" strokeWidth={.008}/></g></Actor></svg>)};
const Office:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.office+f,up=prog(f,20,50,easeInOut);const cam:Cam={x:0,y:1.1,z:4.0,f:1500,shiftY:20,focus:4,aperture:.3};return finish(g,<svg width={W} height={H}><DDefs tone="clean"/><rect width={W} height={H} fill="#c5c9c4"/><Card cam={cam} x={0} z={10}><rect x={-5} y={-2.8} width={10} height={2.8} fill="#b5c0be"/><rect x={-1} y={-2.5} width={2} height={1.2} fill="#6f8992" stroke="#e0e4dd" strokeWidth={.07}/><path d="M-1,-1.9 H1 M0,-2.5 V-1.3" stroke="#d4dad6" strokeWidth={.04}/><rect x={-5} y={-.08} width={10} height={.08} fill="#737c77"/><rect x={-4.4} y={-1.9} width={1.5} height={1.15} fill="#84948c" stroke="#e0e5dd" strokeWidth={.04}/>{[0,1,2,3].map(i=><rect key={i} x={-4.2+i*.3} y={-1.75+(i%2)*.15} width={.22} height={.3} fill="#e6e5d9"/>)}<rect x={2.4} y={-1.65} width={1.15} height={1.65} fill="#74817c" stroke="#596762" strokeWidth={.04}/>{[0,1,2].map(i=><g key={i}><rect x={2.45} y={-1.55+i*.5} width={1.05} height={.4} fill="#8c9b94" stroke="#687771" strokeWidth={.02}/><rect x={2.9} y={-1.4+i*.5} width={.15} height={.025} fill="#d4ddd7"/></g>)}</Card>{staff.map((p,i)=>{const rise=prog(f,12+i*9,40+i*9,easeInOut);return <g key={i}><Card cam={cam} x={-1.6+i*1.55} z={7.8+i*.25}><Chair/></Card><Actor cam={cam} x={-1.6+i*1.55} z={7.8+i*.25} face={i===1?-1:1} view={1} pose={{torso:8,neck:-5,shL:25,shR:30+i*12+20*rise,elL:35,elR:45,hipL:lerpNum(88,10,rise),hipR:lerpNum(86,12,rise),knL:lerpNum(86,14,rise),knR:lerpNum(88,16,rise),breathe:breath(g,.1)}} look={{...p.look,yaw:.35,brow:.45,lookX:.4}} pal={p.pal} height={p.h}/><Card cam={cam} x={-1.2+i*1.55} z={7.45+i*.25}><Table w={.9}/><rect x={-.24} y={-1.17} width={.48} height={.34} fill="#283b46" stroke="#263238" strokeWidth={.02}/></Card></g>})}</svg>)};
const lerpNum=(a:number,b:number,t:number)=>a+(b-a)*t;
const Bar:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.bar+f,cam:Cam={x:.25,y:1.2,z:3.5,f:1450,shiftY:30,focus:4,aperture:.4};return finish(g,<svg width={W} height={H}><BarRoom cam={cam} f={g}/><Card cam={cam} x={1.6} y={2.45} z={9.8}><InterviewTV f={g}/></Card><Card cam={cam} x={-.6} z={7.15}><Chair/></Card><Actor cam={cam} x={-.6} z={7.1} face={1} view={1} pose={sitAtTable(g,{lean:12,armL:26,armR:45,elL:35,elR:55})} look={teacherLook({yaw:.6,lids:.28,brow:.45,mouth:"flat",lookY:-.3})} pal={coat} height={TEACHER.height}/><Card cam={cam} x={.1} z={6.9}><Table w={.7}/><rect x={-.055} y={-.89} width={.11} height={.14} rx={.01} fill="#d6a968" opacity={.8}/></Card></svg>)};
const Tv:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.tv+f,cam:Cam={x:1.6,y:2.35,z:6.9,f:1600,shiftY:30,focus:2.9,aperture:.3};return finish(g,<svg width={W} height={H}><BarRoom cam={cam} f={g}/><Card cam={cam} x={1.6} y={2.45} z={9.8}><InterviewTV f={g}/></Card></svg>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.office}><Call/></Sequence><Sequence from={C.office} durationInFrames={C.bar-C.office}><Office/></Sequence><Sequence from={C.bar} durationInFrames={C.tv-C.bar}><Bar/></Sequence><Sequence from={C.tv} durationInFrames={DUR-C.tv}><Tv/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_bar.wav")} volume={.035}/></Sequence><Sequence from={2} durationInFrames={25}><Audio src={staticFile("sfx/d_tap.wav")} volume={.1}/></Sequence><Sequence from={C.office+25} durationInFrames={30}><Audio src={staticFile("sfx/d_chair.wav")} volume={.1}/></Sequence></AbsoluteFill>;
