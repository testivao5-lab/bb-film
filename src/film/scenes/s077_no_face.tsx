// SCENE 077 · "no-face" · set: desertDusk · narration 1328.49s → 1340.65s (12.16s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The barrels come out of the hole. Two men go into it.
//   Walter White is left standing in the desert with one barrel and no idea what to do with his face.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1329.12 barrels@1329.24 come@1329.44 out@1329.72 of@1329.90 the@1329.96 hole.@1330.06 Two@1331.08
//   men@1331.12 go@1331.38 into@1331.66 it.@1331.92 Walter@1333.36 White@1333.60 is@1333.90 left@1334.20
//   standing@1334.38 in@1334.84 the@1335.06 desert@1335.14 with@1335.40 one@1335.96 barrel@1336.20 and@1336.48
//   no@1337.00 idea@1337.26 what@1337.56 to@1337.80 do@1337.92 with@1338.06 his@1338.18 face.@1338.28
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, planePts, W, H } from "../../lib/camera";
import { breath, easeInOut, lerp, prog } from "../../lib/anim";
import { TEACHER, teacherLook, BROTHER, brotherLook } from "../../rig/cast";
import { Figure } from "../../rig/Figure";
import { DDefs, Birds } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { Barrel } from "../../props/d_props";
import { Actor } from "../../props/d_actor";
import { extra, lidsOf } from "../../props/d_poses";
import { fitCam } from "../../props/d_cam";
import { Finish, Motes } from "../../fx/Post";
export const META={n:77,id:"no-face",set:"desertDusk",cutIn:1328.49,cutOut:1340.65};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const DUR=beat(META.cutOut), C={bodies:beat(1331.08), alone:beat(1333.36), face:beat(1337.0)};
const worker=extra({height:1.76,skin:"#ad795c",jacket:"#5e6551",shirt:"#9d9986",pants:"#3f423e",hair:"#302920",hairStyle:"swept",age:.38});
const gomez=extra({height:1.8,skin:"#a57457",jacket:"#50575a",shirt:"#c4bba8",pants:"#30383e",hair:"#29251f",hairStyle:"buzz",age:.45});
const finish=(cam:Cam,g:number,children:React.ReactNode)=><AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={g} tone="dusk" sun={[1400,250]}/>{children}<Birds f={g} n={2} y={180} sp={.4} tone="#3a293b"/></svg><Motes f={g} n={24} color="#f9c68c" seed={77} drift={.25}/><Finish f={g} vig={.54} grain={.065} shadow="#2a1838" gradeO={.13}/></AbsoluteFill>;
const pit=(cam:Cam)=> <><polygon points={planePts(cam,[[-1.15,7.1],[1.15,7.1],[1.25,9.0],[-1.25,9.0]],.012)} fill="#a67b5e"/><polygon points={planePts(cam,[[-.95,7.28],[.95,7.28],[1.04,8.82],[-1.04,8.82]],.014)} fill="#43323e"/></>;
const C1:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+f, lift=prog(f,15,55,easeInOut); const cam:Cam={x:.45,y:1.6,z:2.1,f:1450,shiftY:-25,focus:6,aperture:.4};return finish(cam,g,<>{pit(cam)}<Card cam={cam} x={-.4} y={lerp(-.45,.05,lift)} z={8}><Barrel cash={0}/></Card><Card cam={cam} x={.45} y={-.24} z={8.3}><Barrel cash={0}/></Card><Actor cam={cam} x={.95} z={8.15} face={-1} view={1} pose={{torso:lerp(20,6,lift),neck:8,shL:55,shR:70-10*lift,elL:50,elR:58,hipL:8,hipR:12,knL:25,knR:32,breathe:breath(g,.12)}} look={{...worker.look,lookY:.4,brow:.3}} pal={worker.pal} height={worker.h}/></>)};
const C2:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.bodies+f, sink=prog(f,8,56,easeInOut);const cam:Cam={x:.1,y:2.3,z:1.6,f:1250,shiftY:-45,focus:6,aperture:.4};const pose={torso:-90,neck:0,shL:0,shR:0,elL:0,elR:0,hipL:0,hipR:0,knL:0,knR:8}; return finish(cam,g,<>{pit(cam)}{[0,1].map(i=><Card key={i} cam={cam} x={-.6+i*.85} y={lerp(.35,-.58,sink)} z={7.75+i*.45}><g opacity={1-sink*.85}><Figure height={i?gomez.h:BROTHER.height} view={1} pose={pose} pal={i?gomez.pal:BROTHER.pal} look={i?gomez.look:brotherLook({lids:.9,mouth:"flat"})} ground/></g></Card>)}<polygon points={planePts(cam,[[-1.15,7.1],[1.15,7.1],[1.1,7.32],[-1.1,7.32]],.025)} fill="#b68a6a"/><Actor cam={cam} x={1.8} z={8.4} face={-1} view={1} pose={{torso:14,neck:12,shL:38,shR:55,elL:45,elR:50,hipL:8,hipR:16,knL:18,knR:25,breathe:breath(g,.1)}} look={{...worker.look,lookY:.6}} pal={worker.pal} height={worker.h}/></>)};
const C3:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.alone+f;const cam=fitCam({cx:.2,cy:1.1,f:1450,shiftY:25,marginX:180,marginY:110,pts:[[-.7,1.9,7],[1.5,1.2,7],[-.7,0,7],[1.5,0,7]]});const sag=prog(f,18,70,easeInOut); return finish(cam,g,<><Card cam={cam} x={.95} z={7.1}><Barrel cash={0}/></Card><Actor cam={cam} x={-.7} z={7} face={1} view={1} pose={{torso:8+6*sag,neck:4+10*sag,shL:18,shR:112,elL:34,elR:130,hipL:6,hipR:12,knL:12,knR:15,breathe:breath(g,.12)}} look={teacherLook({yaw:.55,lids:.3+.16*sag,brow:.7,mouth:"flat",lookY:.35,sweat:.25})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffd3a0"/></>)};
const C4:React.FC=()=>{const f=useCurrentFrame(),g=Math.round(META.cutIn*30)+C.face+f;const cam:Cam={x:-.4,y:1.45,z:3.9,f:1600,shiftY:40,focus:3.1,aperture:.5};return finish(cam,g,<><Card cam={cam} x={1.1} z={7.3}><Barrel cash={0}/></Card><Actor cam={cam} x={-.4} z={7} face={1} view={.6} pose={{torso:9,neck:6,shL:18,shR:35,elL:34,elR:55,hipL:8,hipR:12,knL:12,knR:15,breathe:breath(g,.13)}} look={teacherLook({yaw:.4,lids:lidsOf(g,3,.37,78),brow:.8,mouth:"open",mouthOpen:.08+.025*Math.sin(g*.12),lookY:.4,sweat:.28})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffd5aa"/></>)};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.bodies}><C1/></Sequence><Sequence from={C.bodies} durationInFrames={C.alone-C.bodies}><C2/></Sequence><Sequence from={C.alone} durationInFrames={C.face-C.alone}><C3/></Sequence><Sequence from={C.face} durationInFrames={DUR-C.face}><C4/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence><Sequence from={12} durationInFrames={40}><Audio src={staticFile("sfx/d_dig.wav")} volume={.1}/></Sequence><Sequence from={C.bodies+28} durationInFrames={20}><Audio src={staticFile("sfx/d_door.wav")} volume={.1}/></Sequence></AbsoluteFill>;
