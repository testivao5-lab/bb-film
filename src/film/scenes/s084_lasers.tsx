// SCENE 084 · "lasers" · set: suburbNight · narration 1460.17s → 1470.67s (10.50s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There are no hitmen. There is a former student, a man who can do a voice, two laser pointers, and two hundred thousand dollars taken out of the pile to buy the performance.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@1460.58 are@1460.96 no@1461.10 hitmen.@1461.30 There@1462.08 is@1462.38 a@1462.50 former@1462.58
//   student,@1462.78 a@1463.58 man@1463.76 who@1463.94 can@1464.10 do@1464.20 a@1464.34 voice,@1464.44 two@1465.22
//   laser@1465.24 pointers,@1465.48 and@1466.24 $200@1466.44 ,000@1466.88 dollars@1467.74 taken@1468.04
//   out@1468.26 of@1468.62 the@1468.74 pile@1468.82 to@1469.12 buy@1469.32 the@1469.54 performance.@1469.72
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H,planePts} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {DDefs} from "../../env/d_shared";
import {Sedan} from "../../props/d_vehicle";
import {Actor} from "../../props/d_actor";
import {extra,handAt,lidsOf} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:84,id:"lasers",set:"suburbNight",cutIn:1460.17,cutOut:1470.67};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut),C={friends:beat(1462.08),pointers:beat(1465.22),money:beat(1466.24)};
const a=extra({height:1.69,skin:"#c1997e",jacket:"#514c48",shirt:"#aaa695",pants:"#353c41",hair:"#3e3029",hairStyle:"buzz",age:.27});
const b=extra({height:1.84,skin:"#d7af94",jacket:"#4b5752",shirt:"#c3bb9f",pants:"#383c3d",hair:"#62493c",hairStyle:"swept",age:.29});
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const exterior=(cam:Cam,g:number,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><DDefs tone="night"/><rect width={W} height={H} fill="#1b2c3d"/><Card cam={cam} x={0} z={15} blur={false}><rect x={-5} y={-2.6} width={10} height={2.6} fill="#4e514b"/><path d="M-5.2,-2.6 L0,-3.55 L5.2,-2.6Z" fill="#303a3d"/><rect x={-1.5} y={-2.08} width={2.3} height={1.45} fill="#d0b785" stroke="#d2c9ae" strokeWidth={.08}/><path d="M-.35,-2.08 V-.63 M-1.5,-1.35 H.8" stroke="#6e6252" strokeWidth={.055}/><rect x={2.4} y={-2} width={.9} height={2} fill="#333d3f"/></Card><polygon points={planePts(cam,[[-40,cam.z+.2],[40,cam.z+.2],[40,15],[-40,15]])} fill="#33453e"/><Card cam={cam} x={-2} z={11}><path d="M-3,0 Q-2.7,-1.2 -2,-.8 Q-1.8,-1.6 -1,-1 Q-.7,-1.6 .1,-1 Q.7,-1.4 1.5,-.8 Q2,-1.2 3,0Z" fill="#263a31"/></Card>{children}<path d="M0,970 Q200,880 380,1080 H0Z M1920,990 Q1750,900 1600,1080 H1920Z" fill="#172823" opacity={.85}/></svg><Motes f={g} n={16} color="#c9ddca" seed={44} drift={.11}/><Finish f={g} vig={.53} grain={.06} shadow="#081421" gradeO={.16}/></AbsoluteFill>;
const pointer=<g><rect x={-.015} y={-.025} width={.15} height={.035} rx={.012} fill="#1b2020" stroke="#9caaa5" strokeWidth={.006}/><circle cx={.13} cy={-.008} r={.012} fill="#ed3b31"/></g>;
const Watchers:React.FC<{start:number;close?:boolean}>=({start,close=false})=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+start+f,cam:Cam=close?{x:.1,y:1.2,z:4.1,f:1750,shiftY:25,focus:3,aperture:.4}:{x:0,y:1.1,z:3.0,f:1500,shiftY:20,focus:4.4,aperture:.4};const p1={torso:7,neck:2,shL:18,shR:75+4*Math.sin(g*.06),elL:30,elR:55,hipL:8,hipR:11,knL:11,knR:14,breathe:breath(g,.1)},p2={torso:5,neck:1,shL:32,shR:78+3*Math.sin(g*.07),elL:50,elR:47,hipL:7,hipR:9,knL:10,knR:12,breathe:breath(g,.1)};const h1=handAt(p1,a.h,1,"R"),h2=handAt(p2,b.h,1,"R");return exterior(cam,g,<><Actor cam={cam} x={-.55} z={7.3} face={1} view={1} pose={p1} look={{...a.look,yaw:.6,lids:lidsOf(g,2,.2,90),brow:.4,lookX:.5}} pal={a.pal} height={a.h}><g transform={`translate(${h1.x},${h1.y})`}>{pointer}</g></Actor><Actor cam={cam} x={.55} z={7.6} face={1} view={1} pose={p2} look={{...b.look,yaw:.6,brow:.35,mouth:close&&Math.sin(g*.2)>0?"open":"flat",mouthOpen:.18}} pal={b.pal} height={b.h}><g transform={`translate(${h2.x},${h2.y})`}>{pointer}</g></Actor></>)};
const Outside:React.FC=()=> <Watchers start={0}/>;
const Friends:React.FC=()=> <Watchers start={C.friends} close/>;
const PointerCut:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.pointers+f,cam:Cam={x:.2,y:1.22,z:4.65,f:1800,shiftY:25,focus:2.7,aperture:.4};const pose={torso:4,neck:1,shL:25,shR:80,elL:35,elR:50,hipL:7,hipR:9,knL:10,knR:12,breathe:breath(g,.1)},h=handAt(pose,b.h,1,"R");return exterior(cam,g,<Actor cam={cam} x={.1} z={7.4} face={1} view={1} pose={pose} look={{...b.look,yaw:.6,brow:.35,lookX:.5}} pal={b.pal} height={b.h}><g transform={`translate(${h.x},${h.y}) scale(1.2)`}>{pointer}</g></Actor>)};
const Pay:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.money+f,t=prog(f,15,75,easeInOut),cam:Cam={x:.2,y:1.05,z:3.6,f:1500,shiftY:20,focus:4,aperture:.35};const wp={torso:6,neck:2,shL:18,shR:55+10*t,elL:35,elR:60,hipL:7,hipR:9,knL:8,knR:11,breathe:breath(g,.1)},h=handAt(wp,TEACHER.height,1,"R");return exterior(cam,g,<><Card cam={cam} x={.8} z={9.4}><Sedan body="#3d4547" shade="#242a2b" light="#788389" head={0} tail={0}/></Card><Actor cam={cam} x={lerp(-1.05,-.94,t)} z={7.3} face={1} view={1} pose={wp} look={teacherLook({yaw:.6,lids:.25,brow:.4,lookY:.1})} pal={coat} height={TEACHER.height}><g transform={`translate(${h.x},${h.y}) rotate(-15)`}><rect x={0} y={-.04} width={.22} height={.12} rx={.01} fill="#97a587" stroke="#455246" strokeWidth={.01}/><path d="M.03,.01 H.18" stroke="#d1d2b9" strokeWidth={.012}/></g></Actor><Actor cam={cam} x={lerp(.25,.19,t)} z={7.4} face={-1} view={1} pose={{torso:5,neck:2,shL:30,shR:52+8*t,elL:35,elR:65,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...a.look,yaw:.6,brow:.25,lookY:.2}} pal={a.pal} height={a.h}/><Actor cam={cam} x={1.15} z={7.8} face={-1} view={1} pose={{torso:4,neck:0,shL:43,shR:22,elL:65,elR:35,hipL:7,hipR:9,knL:10,knR:12,breathe:breath(g,.1)}} look={{...b.look,yaw:.6,brow:.25,lookY:.2}} pal={b.pal} height={b.h}/></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.friends}><Outside/></Sequence><Sequence from={C.friends} durationInFrames={C.pointers-C.friends}><Friends/></Sequence><Sequence from={C.pointers} durationInFrames={C.money-C.pointers}><PointerCut/></Sequence><Sequence from={C.money} durationInFrames={DUR-C.money}><Pay/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_forest_wind.wav")} volume={.035}/></Sequence><Sequence from={C.money+18} durationInFrames={25}><Audio src={staticFile("sfx/d_paper.wav")} volume={.1}/></Sequence></AbsoluteFill>;
