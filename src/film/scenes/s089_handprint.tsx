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
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {LabRoom,Tank,Hose,Fluoro,LightCone,FloorGlow,BloodPool} from "../../env/Lab";
import {Actor} from "../../props/d_actor";
import {walkPose,extra} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:89,id:"handprint",set:"labNight",cutIn:1528.63,cutOut:1544.01};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut),C={touch:beat(1532.29),print:beat(1537.09),fall:beat(1539.38),police:beat(1541.2)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const officer=extra({height:1.8,skin:"#b58c73",jacket:"#273848",shirt:"#a8bbc2",pants:"#202f40",hair:"#312e2c",hairStyle:"buzz",age:.35});
const lab=(cam:Cam,g:number,children:React.ReactNode,hand=0,police=0)=><AbsoluteFill><svg width={W} height={H}><LabRoom cam={cam} f={g} police={police}/><FloorGlow cam={cam} x={0} z={7.2} w={4} d={2.2} o={.2}/><Tank cam={cam} x={-3.2} z={10} r={.55} h={1.8}/><Tank cam={cam} x={3.0} z={10} r={.6} h={1.9}/><Hose cam={cam} pts={[[-2.3,8.2],[-1.6,7.5],[-1.9,6.9],[-.8,6.5],[.5,7.3],[1.3,8.4]]}/><Tank cam={cam} x={.85} z={7.8} hand={hand}/>{children}<Fluoro cam={cam} x={-1.7} z={7.5}/><LightCone cam={cam} x={-1.7} z={7.5} on={.65}/><Hose cam={cam} pts={[[-2,4.7],[-.8,4.5],[.4,4.8],[1.5,4.6]]} w={.05}/></svg><Motes f={g} n={35} color="#c1dcf4" seed={32} drift={.3}/><Finish f={g} vig={.66} grain={.07} shadow="#06213f" gradeO={.22}/></AbsoluteFill>;
const Walk:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,t=prog(f,0,C.touch,easeInOut),cam:Cam={x:-.8+.25*t,y:1.2,z:3.0,f:1450,shiftY:30,focus:4.5,aperture:.4};return lab(cam,g,<Actor cam={cam} x={lerp(-1.7,-.25,t)} z={7.4} face={1} pose={{...walkPose(f*.11,{amp:12,armAmp:9,lean:10}),shL:45,elL:85}} look={teacherLook({yaw:.7,lids:.5,brow:.65,lookY:.25})} pal={coat} height={TEACHER.height} blood={.2} bloodHand={.8}/>)};
const Touch:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.touch+f,t=prog(f,0,50,easeInOut),cam:Cam={x:.15,y:1.25,z:4.0+.12*t,f:1650,shiftY:25,focus:3.6,aperture:.4};return lab(cam,g,<Actor cam={cam} x={.10} z={7.5} face={1} pose={{torso:9,neck:7,shL:55,shR:32+8*t,elL:30,elR:75,hipL:8,hipR:10,knL:12,knR:14,breathe:breath(g,.08)}} look={teacherLook({yaw:.7,lids:.5,brow:.55,lookX:.5})} pal={coat} height={TEACHER.height} blood={.2} bloodHand={1}/>,t*.7)};
const Print:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.print+f,cam:Cam={x:.85,y:1.1,z:5.75+.1*prog(f,0,50),f:1800,shiftY:20,focus:2,aperture:.3};return lab(cam,g,null,1)};
const Fallen:React.FC<{start:number;police?:boolean}>=({start,police=false})=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+start+f,t=police?1:prog(f,0,24,easeInOut),cam:Cam={x:-.2,y:lerp(1.05,.52,t),z:3.8,f:1550,shiftY:40,focus:3.6,aperture:.4};return lab(cam,g,<><BloodPool cam={cam} x={-.1} z={7.4} t={.4+.5*t}/><Actor cam={cam} x={0} z={7.5} face={1} pose={{torso:t<.5?lerp(5,20,t*2):-90,neck:3,shL:t<.5?30:0,shR:t<.5?50:20,elL:35,elR:55,hipL:t<.5?lerp(10,50,t*2):2,hipR:t<.5?lerp(8,35,t*2):8,knL:t<.5?lerp(15,90,t*2):8,knR:t<.5?lerp(18,80,t*2):18,breathe:breath(g,.05)}} look={teacherLook({yaw:.7,lids:.75,brow:.5,mouth:"open",mouthOpen:.12})} pal={coat} height={TEACHER.height} blood={.35} bloodHand={1}/>{police&&<Actor cam={cam} x={1.9} z={9.1} face={-1} pose={{...walkPose(f*.12,{amp:15,lean:4}),shR:50,elR:60}} look={{...officer.look,yaw:.7,brow:.4,lookY:.3}} pal={officer.pal} height={officer.h}/>}</>,1,police?1:0)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.touch}><Walk/></Sequence><Sequence from={C.touch} durationInFrames={C.print-C.touch}><Touch/></Sequence><Sequence from={C.print} durationInFrames={C.fall-C.print}><Print/></Sequence><Sequence from={C.fall} durationInFrames={C.police-C.fall}><Fallen start={C.fall}/></Sequence><Sequence from={C.police} durationInFrames={DUR-C.police}><Fallen start={C.police} police/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_roomtone.wav")} volume={.035}/></Sequence><Sequence from={C.touch+25} durationInFrames={25}><Audio src={staticFile("sfx/d_tap.wav")} volume={.1}/></Sequence><Sequence from={C.police} durationInFrames={75}><Audio src={staticFile("sfx/d_siren_far.wav")} volume={.1}/></Sequence></AbsoluteFill>;
