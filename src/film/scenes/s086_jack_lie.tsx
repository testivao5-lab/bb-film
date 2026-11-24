// SCENE 086 · "jack-lie" · set: compound · narration 1484.46s → 1500.69s (16.23s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Inside, he accuses Jack of partnering with the boy instead of killing him, which is a lie, and he tells it in front of men whose pride will not allow it to stand.
//   Jesse comes in on a chain, a different person now, and it takes about two seconds for the old man to understand how different.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Inside@1484.86 he@1485.28 accuses@1485.76 Jack@1486.16 of@1486.42 partnering@1486.66 with@1487.00 the@1487.28
//   boy@1487.40 instead@1487.60 of@1488.00 killing@1488.18 him,@1488.42 which@1488.96 is@1489.04 a@1489.16
//   lie,@1489.28 and@1489.90 he@1490.02 tells@1490.10 it@1490.30 in@1490.50 front@1490.62 of@1490.76 men@1490.90
//   whose@1491.06 pride@1491.26 will@1491.58 not@1491.86 allow@1492.14 it@1492.38 to@1492.58 stand.@1492.66
//   Jesse@1493.82 comes@1494.26 in@1494.60 on@1494.78 a@1494.92 chain,@1495.04 a@1495.60 different@1495.78
//   person@1496.10 now,@1496.52 and@1497.12 it@1497.20 takes@1497.30 about@1497.44 two@1497.66 seconds@1498.00
//   for@1498.42 the@1498.64 old@1498.74 man@1498.86 to@1499.08 understand@1499.22 how@1499.54 different.@1499.92
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H,planePts} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,PARTNER,teacherLook,partnerLook} from "../../rig/cast";
import {Actor} from "../../props/d_actor";
import {extra,handAt,headAt} from "../../props/d_poses";
import {Table,Chair} from "../../env/d_interiors";
import {Finish,Motes} from "../../fx/Post";
export const META={n:86,id:"jack-lie",set:"compound",cutIn:1484.46,cutOut:1500.69};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut), C={leader:beat(1488.96),entry:beat(1493.82),recognition:beat(1497.12)};
const boss=extra({height:1.82,skin:"#c49478",jacket:"#564b42",shirt:"#9c9584",pants:"#343735",hair:"#796b5e",hairStyle:"buzz",age:.65});
const guard=extra({height:1.78,skin:"#b4896d",jacket:"#45463d",shirt:"#aaa397",pants:"#353631",hair:"#41372c",hairStyle:"buzz",age:.4});
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const captive={...PARTNER.pal,jacket:"#686b60",jacketShade:"#444a43",jacketLight:"#888a7a"};
const room=(cam:Cam,g:number,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><rect width={W} height={H} fill="#514a40"/><polygon points={planePts(cam,[[-30,cam.z+.2],[30,cam.z+.2],[30,11],[-30,11]])} fill="#62594b"/><Card cam={cam} x={0} z={11} blur={false}><rect x={-5} y={-3.1} width={10} height={3.1} fill="#71695b"/><path d="M-5,-1 H5 M-5,-2 H5 M-3,-3 V0 M0,-3 V0 M3,-3 V0" stroke="#514c43" strokeWidth={.018}/><rect x={2} y={-2.1} width={1} height={2.1} fill="#343b37" stroke="#aaa08c" strokeWidth={.045}/><circle cx={2.8} cy={-1} r={.035} fill="#bbab83"/><rect x={-3.8} y={-2.45} width={1.55} height={.8} fill="#424a42" stroke="#8c8170" strokeWidth={.05}/><path d="M-3.8,-2.05 H-2.25 M-3,-2.45 V-1.65" stroke="#9a9b83" strokeWidth={.03}/><path d="M-1.1,-3.1 L-2.4,0 H1.6 L.2,-3.1Z" fill="#f1d39a" opacity={.065}/><rect x={-1} y={-2.75} width={1.6} height={.07} fill="#d9d0a6"/><path d="M-4,-.13 H4" stroke="#a3987f" strokeWidth={.04}/></Card><Card cam={cam} x={-2.6} z={8.8}><Chair/><Table x={.8} w={1.5}/><rect x={.6} y={-.87} width={.12} height={.13} rx={.02} fill="#9a8a72"/></Card>{children}<path d="M0 1020 Q180 880 380 1080 H0 M1920 940 Q1740 960 1600 1080 H1920Z" fill="#252a27" opacity={.72}/></svg><Motes f={g} n={22} color="#e8ce9b" seed={17} drift={.15}/><Finish f={g} vig={.47} grain={.055} shadow="#171a17" gradeO={.12}/></AbsoluteFill>;
const Confront:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,cam:Cam={x:0,y:1.2,z:3.2+.3*prog(f,0,C.leader),f:1550,shiftY:20,focus:4,aperture:.3};return room(cam,g,<><Actor cam={cam} x={1.1} z={7.9} face={-1} pose={{torso:-2,neck:1,shL:42,shR:30,elL:60,elR:48,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...boss.look,yaw:.7,brow:.6,lookX:-.4}} pal={boss.pal} height={boss.h}/><Actor cam={cam} x={-.95} z={7.4} face={1} pose={{torso:5,neck:2,shL:15,shR:70+5*Math.sin(f*.08),elL:35,elR:55,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={teacherLook({yaw:.7,brow:.7,mouth:Math.sin(f*.18)>0?"open":"flat",mouthOpen:.15})} pal={coat} height={TEACHER.height}/></>)};
const Pride:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.leader+f,cam:Cam={x:.7,y:1.25,z:4.4,f:1750,shiftY:20,focus:3.3,aperture:.3};return room(cam,g,<><Actor cam={cam} x={-.9} z={8.5} face={1} pose={{torso:2,neck:0,shL:35,shR:38,elL:65,elR:55,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...guard.look,yaw:.6,brow:.5}} pal={guard.pal} height={guard.h}/><Actor cam={cam} x={.75} z={7.7} face={-1} pose={{torso:5,neck:3,shL:45,shR:65+7*Math.sin(f*.07),elL:55,elR:50,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.1)}} look={{...boss.look,yaw:.7,brow:.8,mouth:Math.sin(f*.16)>0?"open":"flat",mouthOpen:.18}} pal={boss.pal} height={boss.h}/></>)};
const Arrival:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.entry+f,t=prog(f,0,75,easeInOut),cam:Cam={x:1.1,y:1.15,z:3.3,f:1500,shiftY:20,focus:4.3,aperture:.3};const p={torso:14,neck:12,shL:38,shR:45,elL:60,elR:66,hipL:10+6*Math.sin(f*.12),hipR:12-6*Math.sin(f*.12),knL:15,knR:16,breathe:breath(g,.08)},h=handAt(p,PARTNER.height,1,"R"),head=headAt(p,PARTNER.height,1);return room(cam,g,<><Actor cam={cam} x={lerp(2.0,.65,t)} z={7.7} face={-1} pose={p} look={partnerLook({yaw:.7,lids:.55,brow:.7,lookY:.4})} pal={captive} height={PARTNER.height}><ellipse cx={head.x-.05} cy={head.y+.16} rx={.06} ry={.025} fill="none" stroke="#b8b6a5" strokeWidth={.022}/><path d={`M${head.x-.09},${head.y+.17} q-.2,.10 -.35,.20 q-.15,.07 -.3,.02`} fill="none" stroke="#b8b6a5" strokeWidth={.025} strokeDasharray=".055 .035"/></Actor><Actor cam={cam} x={lerp(2.8,1.5,t)} z={8} face={-1} pose={{torso:4,neck:2,shL:24,shR:65,elL:40,elR:50,hipL:8,hipR:11,knL:12,knR:14,breathe:breath(g,.1)}} look={{...guard.look,yaw:.7,brow:.5}} pal={guard.pal} height={guard.h}/></>)};
const Recognition:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.recognition+f,cam:Cam={x:-.8,y:1.3,z:4.55+.25*prog(f,0,75),f:1750,shiftY:20,focus:2.8,aperture:.3};return room(cam,g,<Actor cam={cam} x={-.8} z={7.5} face={1} pose={{torso:3,neck:8,shL:25,shR:35,elL:45,elR:52,hipL:8,hipR:10,knL:10,knR:12,breathe:breath(g,.08)}} look={teacherLook({yaw:.6,lids:.35,brow:.8,lookX:.5,mouth:"flat"})} pal={coat} height={TEACHER.height}/>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.leader}><Confront/></Sequence><Sequence from={C.leader} durationInFrames={C.entry-C.leader}><Pride/></Sequence><Sequence from={C.entry} durationInFrames={C.recognition-C.entry}><Arrival/></Sequence><Sequence from={C.recognition} durationInFrames={DUR-C.recognition}><Recognition/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_roomtone.wav")} volume={.035}/></Sequence><Sequence from={C.entry+10} durationInFrames={65}><Audio src={staticFile("sfx/d_chain.wav")} volume={.11}/></Sequence></AbsoluteFill>;
