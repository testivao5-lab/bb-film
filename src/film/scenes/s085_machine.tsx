// SCENE 085 · "machine" · set: compound · narration 1470.67s → 1484.46s (13.79s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then a compound, and a machine in a trunk. The last thing he will ever build, and by a distance the best.
//   Garage-door motor, car battery, machine gun, a key fob in his pocket.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1471.30 a@1471.54 compound@1471.82 and@1472.10 a@1473.00 machine@1473.26 in@1473.60 a@1473.92
//   trunk,@1474.02 the@1474.86 last@1475.00 thing@1475.30 he@1475.66 will@1475.86 ever@1476.02 build@1476.30
//   and@1476.74 by@1477.34 a@1477.50 distance@1477.64 the@1477.88 best.@1478.40 Garage@1479.44 door@1479.84
//   motor,@1480.18 car@1480.82 battery,@1481.04 machine@1481.78 gun,@1482.06 a@1482.90 key@1482.96 fob@1483.20
//   in@1483.50 his@1483.66 pocket.@1483.76
import React from "react";
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from "remotion";
import {Cam,Card,W,H} from "../../lib/camera";
import {breath,easeInOut,lerp,prog} from "../../lib/anim";
import {TEACHER,teacherLook} from "../../rig/cast";
import {Compound,OpenTrunk} from "../../env/d_compound";
import {Sedan} from "../../props/d_vehicle";
import {Actor} from "../../props/d_actor";
import {handAt} from "../../props/d_poses";
import {Finish,Motes} from "../../fx/Post";
export const META={n:85,id:"machine",set:"compound",cutIn:1470.67,cutOut:1484.46};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut),C={trunk:beat(1473.0),build:beat(1475.0),detail:beat(1479.44),fob:beat(1482.90)};
const coat={...TEACHER.pal,jacket:"#4b514d",jacketShade:"#313735",jacketLight:"#69736b"};
const stage=(g:number,cam:Cam,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><Compound cam={cam} f={g}/>{children}</svg><Motes f={g} n={23} color="#f5c996" seed={15} drift={.2}/><Finish f={g} vig={.48} grain={.055} shadow="#171927" gradeO={.12}/></AbsoluteFill>;
const Establish:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f,cam:Cam={x:0,y:1.25,z:0,f:1400,shiftY:20,focus:12,aperture:.3};return stage(g,cam,<Card cam={cam} x={lerp(-3,-.8,prog(f,0,70,easeInOut))} z={11}><Sedan body="#465351" shade="#2a3434" light="#87918c" wheel={f*9} head={.4}/></Card>)};
const Reveal:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.trunk+f,cam:Cam={x:0,y:1.1,z:3.2,f:1450,shiftY:20,focus:4.2,aperture:.35};return stage(g,cam,<><Card cam={cam} x={.2} z={7.7} blur={false}><OpenTrunk sweep={0}/></Card><Actor cam={cam} x={-1.35} z={7.3} face={1} view={1} pose={{torso:10,neck:8,shL:18,shR:50,elL:35,elR:60,hipL:8,hipR:10,knL:12,knR:13,breathe:breath(g,.1)}} look={teacherLook({yaw:.6,brow:.5,lookY:.25})} pal={coat} height={TEACHER.height}/></>)};
const Build:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.build+f,t=prog(f,0,100,easeInOut),cam:Cam={x:-.3,y:1.12,z:4.0,f:1750,shiftY:15,focus:3.4,aperture:.4};return stage(g,cam,<><Actor cam={cam} x={-.88} z={7.5} face={1} view={1} pose={{torso:12+3*Math.sin(f*.035),neck:8,shL:25,shR:55+10*t,elL:45,elR:65,hipL:8,hipR:10,knL:12,knR:13,breathe:breath(g,.1)}} look={teacherLook({yaw:.6,brow:.5,lookY:.3})} pal={coat} height={TEACHER.height}/><Card cam={cam} x={.45} z={7.3} blur={false}><OpenTrunk sweep={0}/></Card></>)};
const Detail:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.detail+f,cam:Cam={x:.2,y:1.14,z:5.1,f:1800,shiftY:0,focus:2.3,aperture:.35};return stage(g,cam,<Card cam={cam} x={.2} z={7.4} blur={false}><OpenTrunk sweep={9*Math.sin(f*.07)}/></Card>)};
const Fob:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.fob+f,cam:Cam={x:-.75,y:1.05,z:4.25,f:1700,shiftY:20,focus:3.1,aperture:.35};const pose={torso:5,neck:8,shL:15,shR:40,elL:30,elR:58,hipL:8,hipR:9,knL:10,knR:11,breathe:breath(g,.1)},h=handAt(pose,TEACHER.height,1,"R");return stage(g,cam,<><Card cam={cam} x={1.15} z={8}><OpenTrunk sweep={6*Math.sin(f*.08)}/></Card><Actor cam={cam} x={-.9} z={7.4} face={1} view={1} pose={pose} look={teacherLook({yaw:.6,brow:.45,lookY:.2})} pal={coat} height={TEACHER.height}><g transform={`translate(${h.x},${h.y}) rotate(-25)`}><rect x={0} y={-.025} width={.1} height={.06} rx={.02} fill="#252929" stroke="#a2a9a0" strokeWidth={.006}/><circle cx={.05} cy={.006} r={.009} fill="#c2c9b7"/></g></Actor></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.trunk}><Establish/></Sequence><Sequence from={C.trunk} durationInFrames={C.build-C.trunk}><Reveal/></Sequence><Sequence from={C.build} durationInFrames={C.detail-C.build}><Build/></Sequence><Sequence from={C.detail} durationInFrames={C.fob-C.detail}><Detail/></Sequence><Sequence from={C.fob} durationInFrames={DUR-C.fob}><Fob/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence><Sequence from={C.detail+4} durationInFrames={60}><Audio src={staticFile("sfx/d_garage.wav")} volume={.1}/></Sequence><Sequence from={C.fob+4} durationInFrames={25}><Audio src={staticFile("sfx/d_fob.wav")} volume={.11}/></Sequence></AbsoluteFill>;
