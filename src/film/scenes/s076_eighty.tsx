// SCENE 076 · "eighty" · set: desert · narration 1305.25s → 1328.49s (23.24s)
// OWNER: batch D (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   They are not there for Hank. They are there for the money, and the money is in a hole with a witness beside it.
//   Hank is on the ground with a bullet in his leg and the smartest man he knows is on his knees offering eighty million dollars for his life. Hank tells him it was decided ten minutes ago, says his name for the record, and Jack shoots him in the middle of it.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   They@1305.86 are@1306.34 not@1306.44 there@1306.60 for@1306.80 Hank,@1313.28 Hank@1313.80 is@1314.28
//   on@1314.50 the@1314.62 ground@1314.74 with@1315.00 a@1315.24 bullet@1315.32 in@1315.62 his@1315.82 leg@1315.94
//   and@1316.18 the@1316.54 smartest@1316.64 man@1316.88 he@1317.32 knows@1317.48 is@1317.74 on@1317.94
//   his@1318.08 knees@1318.20 offering@1318.48 80@1318.96 million@1319.42 dollars@1319.80 for@1320.32 his@1320.50
//   life.@1320.62 Hank@1321.62 tells@1321.96 him@1322.24 it@1322.42 was@1322.56 decided@1322.68 10@1323.08
//   minutes@1323.42 ago,@1323.68 says@1324.36 his@1324.56 name@1324.74 for@1324.96 the@1325.20 record,@1325.32
//   and@1326.10 Jack@1326.18 shoots@1326.46 him@1327.02 in@1327.26 the@1327.34 middle@1327.42 of@1327.60
//   it.@1327.74
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, planePts, W, H } from "../../lib/camera";
import { breath, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, teacherLook, BROTHER, brotherLook } from "../../rig/cast";
import { DDefs, Birds } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { Sedan } from "../../props/d_vehicle";
import { Barrel } from "../../props/d_props";
import { Actor } from "../../props/d_actor";
import { BOTH_KNEES, SPRAWLED, extra, handAt, lidsOf } from "../../props/d_poses";
import { fitCam } from "../../props/d_cam";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 76, id: "eighty", set: "desert", cutIn: 1305.25, cutOut: 1328.49 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const DUR = beat(META.cutOut);
const C = { money: beat(1308.3), hank: beat(1313.8), plea: beat(1317.6), verdict: beat(1321.6), shot: beat(1326.18) };
const JACK = extra({height:1.82, skin:"#b98466", jacket:"#55473f", shirt:"#a2967c", pants:"#373531", hair:"#494139", hairStyle:"buzz", beard:"trim", age:0.58});
const GANG = extra({height:1.76, skin:"#ad795c", jacket:"#5e6551", shirt:"#9d9986", pants:"#3f423e", hair:"#302920", hairStyle:"swept", age:0.38});
const groundCam = (pts:[number,number,number][], cx:number, cy:number, f=1450):Cam => ({...fitCam({cx,cy,f,pts,marginX:150,marginY:115,shiftY:0}),focus:6,aperture:0.4});
const stage = (cam:Cam, f:number, children:React.ReactNode) => <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={f} tone="day" sun={[1450,190]}/>{children}<Birds f={f} n={2} y={185} sp={0.45} tone="#5a4838"/></svg><Motes f={f} n={20} color="#ffe6b4" seed={70} drift={0.35}/><Finish f={f} vig={0.48} grain={0.06} shadow="#3a2a10" gradeO={0.12}/></AbsoluteFill>;
const pistol = <g><path d="M0,-0.025 L0.19,-0.025 L0.19,0.018 L0.07,0.018 L0.055,0.09 L0.005,0.08 L0.025,0.015 L0,0.015 Z" fill="#25282a" stroke="#111" strokeWidth={0.008}/></g>;
const GunHand:React.FC<{pose:Pose;height:number}> = ({pose,height})=>{const h=handAt(pose,height,1,"R"); return <g transform={`translate(${h.x},${h.y}) rotate(28)`}>{pistol}</g>};
// A ground shadow spans the full prone body, rather than the standing rig's foot-sized shadow.
const WoundedActor:React.FC<{cam:Cam;x:number;z:number;f:number;face?:1|-1; silent?:boolean}> = ({cam,x,z,f,face=1,silent=false}) => <Card cam={cam} x={x} z={z} flip={face===-1} blur={false}><ellipse cx={.05} cy={.025} rx={1.05} ry={.13} fill="#241a11" opacity={.36}/><Figure pose={{torso:-90,neck:0,shL:0,shR:silent?0:20,elL:0,elR:silent?0:50,hipL:0,hipR:0,knL:0,knR:8,breathe:breath(f,.08)}} look={brotherLook({yaw:.5,lids:silent?.85:.32,brow:.6,mouth:silent?"flat":"open",mouthOpen:silent?0:.12+.16*Math.abs(Math.sin(f*.27)),lookX:.6})} pal={BROTHER.pal} height={BROTHER.height} view={1} ground rimLight="#ffe8b8"/></Card>;
const Pit:React.FC<{cam:Cam}> = ({cam}) => <g><polygon points={planePts(cam,[[-1.1,7.2],[1.25,7.2],[1.35,9.5],[-1.2,9.5]],0.01)} fill="#9a784d"/><polygon points={planePts(cam,[[-0.94,7.38],[1.05,7.38],[1.15,9.33],[-1.04,9.33]],0.015)} fill="#51412d"/><polygon points={planePts(cam,[[-0.75,7.6],[0.85,7.6],[0.95,9.14],[-0.85,9.14]],0.02)} fill="#30281e"/></g>;

const Standoff:React.FC=()=>{const f=useCurrentFrame(),g=f+Math.round(META.cutIn*30), t=prog(f,0,C.money,easeInOut); const cam=groundCam([[-1.9,1.85,7],[2,1.85,7],[-1.9,0,7],[2,0,7]],0,1.05); const p:Pose={torso:4,neck:-3,shL:24,shR:75+8*t,elL:32,elR:30,hipL:6,hipR:12,knL:12,knR:17,breathe:breath(g,.1)}; const h=handAt(p,JACK.h,1,"R"); return stage(cam,g,<><Card cam={cam} x={0.4} z={12}><Sedan body="#6c716e" shade="#444844" light="#a3a79d" driver={false}/></Card><Actor cam={cam} x={-1.25} z={7.3} face={1} view={1} pose={p} look={{...JACK.look,lookX:0.6,brow:.5}} pal={JACK.pal} height={JACK.h}><g transform={`translate(${h.x},${h.y}) rotate(28)`}>{pistol}</g></Actor><Actor cam={cam} x={1.45} z={7.8} face={-1} view={1} pose={{...p,shR:42,elR:55,torso:7}} look={{...GANG.look,lookX:-.5}} pal={GANG.pal} height={GANG.h}/></>)};
const Money:React.FC=()=>{const f=useCurrentFrame(),g=f+C.money+Math.round(META.cutIn*30); const cam:Cam={x:.4,y:1.55,z:2.0,f:1400,shiftY:-25,focus:6.4,aperture:.45}; const lean=prog(f,10,55,easeInOut); return stage(cam,g,<><Pit cam={cam}/>{[-.65,0,.65].map((x,i)=><Card key={i} cam={cam} x={x} z={8.55} y={-.08}><Barrel open={i===1?.65:0} cash={i===1?.12:0}/></Card>)}<Actor cam={cam} x={1.85} z={8.2} face={-1} view={1} pose={{torso:8+10*lean,neck:10,shL:22,shR:55,elL:34,elR:45,hipL:10,hipR:14,knL:18,knR:23,breathe:breath(g,.12)}} look={{...GANG.look,lookY:.5,brow:.4}} pal={GANG.pal} height={GANG.h}/></>)};
const Wounded:React.FC=()=>{const f=useCurrentFrame(),g=f+C.hank+Math.round(META.cutIn*30); const cam=groundCam([[-1.7,1.4,7],[1.5,1.3,7],[-1.7,0,7],[1.5,0,7]],0,0.8,1500); const p=SPRAWLED(g); return stage(cam,g,<><Card cam={cam} x={1.3} z={10}><Sedan body="#303c46" shade="#1a242c" driver={false}/></Card><WoundedActor cam={cam} x={-.75} z={7.5} f={g}/><Card cam={cam} x={-.35} y={.13} z={7.45}><ellipse cx={0} cy={0} rx={.15} ry={.065} fill="#8c2928" opacity={.85}/></Card></>)};
const Plea:React.FC=()=>{const f=useCurrentFrame(),g=f+C.plea+Math.round(META.cutIn*30), t=prog(f,10,60,easeInOut); const cam=groundCam([[-1.2,1.35,7],[1.2,1.85,7],[-1.2,0,7],[1.2,0,7]],0,1.02); const wp=BOTH_KNEES(g,[55+10*t,50+14*t],[48,55],10+5*t); return stage(cam,g,<><Actor cam={cam} x={-1.0} z={7} face={1} view={1} pose={wp} look={teacherLook({yaw:.65,brow:.65,mouth:"open",mouthOpen:.14+.2*Math.abs(Math.sin(g*.3)),lids:.08,sweat:.35})} pal={TEACHER.pal} height={TEACHER.height}/><Actor cam={cam} x={1.05} z={7.1} face={-1} view={1} pose={{torso:3,neck:8,shL:14,shR:30,elL:25,elR:45,hipL:5,hipR:12,knL:12,knR:15,breathe:breath(g,.08)}} look={{...JACK.look,brow:.4,lookY:.4}} pal={JACK.pal} height={JACK.h}/></>)};
const Verdict:React.FC=()=>{const f=useCurrentFrame(),g=f+C.verdict+Math.round(META.cutIn*30); const cam:Cam={x:-.55,y:.4,z:4.6,f:1700,focus:2.6,aperture:.45,shiftY:-100}; return stage(cam,g,<><WoundedActor cam={cam} x={-.45} z={7.2} f={g}/></>)};
const Shot:React.FC=()=>{const f=useCurrentFrame(),g=f+C.shot+Math.round(META.cutIn*30), fire=prog(f,23,27,easeInOut); const cam=groundCam([[-1.4,1.8,7],[1.4,1,7],[-1.4,0,7],[1.4,0,7]],0,.95); const pose:Pose={torso:3,neck:8,shL:20,shR:56,elL:25,elR:12-7*fire,hipL:8,hipR:11,knL:12,knR:15,breathe:breath(g,.08)}; const h=handAt(pose,JACK.h,1,"R"); return stage(cam,g,<><Actor cam={cam} x={-1.05} z={7.2} face={1} view={1} pose={pose} look={{...JACK.look,brow:.55,lookY:.3}} pal={JACK.pal} height={JACK.h}><GunHand pose={pose} height={JACK.h}/>{f>=24&&f<27&&<g transform={`translate(${h.x+.17},${h.y+.09}) rotate(28)`}><path d="M0,0 L.25,-.08 L.13,0 L.26,.08 Z" fill="#ffe6a0"/></g>}</Actor><WoundedActor cam={cam} x={1.1} z={7.3} f={g} face={-1} silent={fire>.5}/></>)};
export const Scene:React.FC=()=> <AbsoluteFill style={{background:"#14120f"}}><Sequence from={0} durationInFrames={C.money}><Standoff/></Sequence><Sequence from={C.money} durationInFrames={C.hank-C.money}><Money/></Sequence><Sequence from={C.hank} durationInFrames={C.plea-C.hank}><Wounded/></Sequence><Sequence from={C.plea} durationInFrames={C.verdict-C.plea}><Plea/></Sequence><Sequence from={C.verdict} durationInFrames={C.shot-C.verdict}><Verdict/></Sequence><Sequence from={C.shot} durationInFrames={DUR-C.shot}><Shot/></Sequence><Sequence from={0} durationInFrames={DUR}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence><Sequence from={C.shot+24} durationInFrames={22}><Audio src={staticFile("sfx/d_gunfire.wav")} volume={.12}/></Sequence></AbsoluteFill>;
