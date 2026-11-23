// SCENE 054 · Gale — an original lab assistant is introduced through his hands, curiosity and craft.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose, Palette, STAND } from "../../rig/Figure";
import { HeadLook } from "../../rig/Head";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 54, id: "gale", set: "superlab", cutIn: 881.43, cutOut: 900.5 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

// A fresh, non-likeness design for the assistant: warm copper curls, sea-green lab overshirt.
const ASSIST: Palette = {skin:"#e9c2a3",skinShade:"#bd9074",skinLight:"#f8d7ba",jacket:"#829783",jacketShade:"#5d7164",jacketLight:"#a6bba7",shirt:"#d8d5c9",shirtShade:"#aaa999",pants:"#58616a",pantsShade:"#3d454c",shoes:"#3c3430",outline:"#231b19"};
const HAIR = {base:"#9b5f37",dark:"#60391f",light:"#d18a53",style:"curls" as const};
const assistLook = (o:Partial<HeadLook>={}):HeadLook=>({lids:.12,lookX:0,lookY:0,brow:.05,mouth:"smile",hair:HAIR,glasses:false,stubble:.05,age:.15,...o});
const upright:Pose={...STAND,breathe:.35};
const s1=beat(884.32), s2=beat(891.13), s3=beat(895.08);

const Wide:React.FC<{f:number}> = ({f})=>{
 const u=clamp(f/s1), cam:Cam={x:lerp(-.55,.15,easeInOut(u)),y:1.55,z:1.8,f:1350,shiftY:40};
 const draw=prog(f,beat(882.48),beat(884.32));
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near/>
   <Card cam={cam} x={-2.65} z={8.1} blur={false}><Figure pose={{...upright,shL:lerp(4,22,draw),elL:lerp(8,52,draw),shR:-5,breathe:breath(f,.07)}} view={.15} look={teacherLook({yaw:.48,lids:.18+blink(f,14)*.7,lookX:.5,brow:-.15,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/></Card>
   <Card cam={cam} x={1.55} z={8.4} blur={false}><Figure pose={{...upright,shL:lerp(-2,12,draw),elL:lerp(8,35,draw),shR:-7,breathe:breath(f+22,.065)}} view={.1} look={assistLook({yaw:.28,lids:.14+blink(f,5,93)*.7,lookX:-.55,brow:.1,mouth:"smile"})} pal={ASSIST} height={1.73}/></Card>
   {/* silent Gus stays peripheral, observing the introduction rather than joining it */}
   <Card cam={cam} x={6.2} z={12.5} blur={false} opacity={.8}><Figure pose={{...upright,shL:-5,shR:7,breathe:breath(f+50,.06)}} view={.2} look={restaurateurLook({yaw:.7,lids:.2,lookX:-.3,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/></Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={24} seed={54} drift={.26}/><Finish f={f} vig={.55} grain={.055} shadow="#17334a" gradeO={.12}/>
 </>;
};
const Machine:React.FC<{f:number}> = ({f})=>{
 const coffee=prog(f,beat(886.9),beat(888.4));
 const cur=prog(f,beat(888.82),beat(891.13));
 const cam:Cam={x:lerp(-.55,.45,clamp((f-s1)/(s2-s1))),y:1.45,z:2.15,f:1420,shiftY:-175};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near={false}/>
   <Card cam={cam} x={-3.15} z={7.4} blur={false}>
    <Figure pose={{...upright,shL:lerp(10,58,coffee),elL:lerp(24,66,coffee),wrL:lerp(0,14,coffee),shR:lerp(-4,30,cur),elR:lerp(8,43,cur),breathe:breath(f,.07)}} view={.05} look={teacherLook({yaw:.38,lids:.16+blink(f,18)*.74,lookX:.7,brow:-.12,mouth:"open",mouthOpen:.25+.18*Math.sin(f*.16)})} pal={TEACHER.pal} height={TEACHER.height}/>
   </Card>
   <Card cam={cam} x={2.15} z={7.6} blur={false}>
    <Figure pose={{...upright,shL:lerp(5,54,coffee),elL:lerp(12,46,coffee),shR:lerp(4,42,cur),elR:lerp(8,28,cur),wrR:lerp(0,28,cur),breathe:breath(f+30,.065)}} view={.04} look={assistLook({yaw:.1,lids:.1+blink(f,8,106)*.76,lookX:.8,brow:.24,mouth:"smile"})} pal={ASSIST} height={1.73}/>
   </Card>
   {/* home-built vacuum coffee apparatus: glass, copper coil, pressure gauge; gentle boil pulse */}
   <Card cam={cam} x={.15} z={5.6} blur={false}>
    <g transform="scale(1 .52)">
     <rect x="-1.24" y="-1.22" width="2.48" height=".13" rx=".03" fill="#4b5b61"/><path d="M-.94,-1.22 v1.22 M.94,-1.22 v1.22" stroke="#4b5b61" strokeWidth=".11"/>
     <path d="M-.55,-1.35 v-.46 q0-.2 .2-.2 h.7 q.2 0 .2 .2 v.46 M-.35,-2.01 v-.8 h.7 v.8" fill="none" stroke="#637d87" strokeWidth=".055"/>
     <rect x="-.47" y="-2.35" width=".94" height=".72" rx=".1" fill="#9cc9cf" fillOpacity=".35" stroke="#435963" strokeWidth=".05"/>
     <path d="M-.36,-1.88 q.36,.2 .72,0" stroke="#8bd6c8" strokeWidth=".06" fill="none"/>
     <path d={`M-.29,-2.25 C-.5,-2.48 -.06,-2.6 -.25,-2.86 C-.43,-3.12 .06,-3.19 .08,-3.45`} stroke="#bb7740" strokeWidth=".07" fill="none"/>
     <circle cx=".73" cy="-2.12" r=".27" fill="#e8ece9" stroke="#455760" strokeWidth=".06"/><path d="M.73,-2.12 l${.11+.03*Math.sin(f*.15)},-.09" stroke="#b64536" strokeWidth=".035"/>
     {[0,1,2].map(i=><circle key={i} cx={-.12+i*.14} cy={-1.99} r={.022+(coffee>.2? .013*Math.sin(f*.2+i):0)} fill="#e6ffff" opacity=".9"/>)}
    </g>
   </Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={20} seed={55} drift={.18}/><Finish f={f} vig={.58} grain={.06} shadow="#15354c" gradeO={.13}/>
 </>;
};
const Sheet:React.FC<{f:number}> = ({f})=>{
 const verse=prog(f,beat(889.48),beat(891.13));
 const work=prog(f,beat(892.63),beat(895.08));
 const cam:Cam={x:.0,y:1.5,z:2.5,f:1360,shiftY:-155};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near={false}/>
   <Card cam={cam} x={-2.3} z={7.5} blur={false}><Figure pose={{...upright,shL:lerp(4,42,work),elL:lerp(8,40,work),wrL:lerp(0,-20,work),shR:lerp(-6,18,verse),elR:lerp(8,55,verse),wrR:lerp(0,-5,verse),breathe:breath(f,.07)}} view={.05} look={teacherLook({yaw:.38,lids:.16+blink(f,9)*.7,lookX:.65,brow:-.05,mouth:verse>.25?"open":"flat",mouthOpen:.2+.16*Math.sin(f*.13)})} pal={TEACHER.pal} height={TEACHER.height}/></Card>
   <Card cam={cam} x={1.9} z={7.2} blur={false}><Figure pose={{...upright,shL:lerp(7,40,work),elL:lerp(8,52,work),shR:lerp(2,38,verse),elR:lerp(8,54,verse),wrR:lerp(0,-12,verse),breathe:breath(f+20,.067)}} view={.05} look={assistLook({yaw:.25,lids:.14+blink(f,12)*.72,lookX:-.65,brow:.14,mouth:"smile"})} pal={ASSIST} height={1.73}/></Card>
   {/* batch record and pencil: only diegetic marks, no legible overlays */}
   <Card cam={cam} x={1.0} z={5.3} blur={false}>
    <path d="M-.68,-.95 L.66,-1.02 L.83,.16 L-.52,.24 Z" fill="#eee7d7" stroke="#5c544b" strokeWidth=".045"/>
    <path d="M-.38,-.66 L.43,-.7 M-.34,-.42 L.48,-.47 M-.3,-.18 L.51,-.23 M-.26,.03 L.53,-.01" stroke="#8e8b80" strokeWidth=".022" opacity=".7"/>
    <path d={`M${-.32+verse*.2},${-.69+verse*.6} l.56,-.11`} stroke="#403b35" strokeWidth=".025"/>
    <path d="M.52,-1.02 l.78,-.24" stroke="#a77a46" strokeWidth=".055"/>
   </Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={19} seed={56} drift={.2}/><Finish f={f} vig={.62} grain={.06} shadow="#143349" gradeO={.12}/>
 </>;
};
const Ready:React.FC<{f:number}> = ({f})=>{
 const cut=beat(896.24), cam:Cam={x:lerp(.1,.8,clamp((f-cut)/(beat(900.5)-cut))),y:1.5,z:2.55,f:1370,shiftY:-175};
 const gus=prog(f,beat(899.5),beat(899.91));
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near/>
   <Card cam={cam} x={-2.4} z={7.4} blur={false}><Figure pose={{...upright,shL:lerp(4,16,gus),elL:lerp(8,30,gus),breathe:breath(f,.07)}} view={.05} look={teacherLook({yaw:.48,lids:.2+blink(f,3)*.7,lookX:.45,brow:-.24,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/></Card>
   <Card cam={cam} x={1.7} z={7.4} blur={false}><Figure pose={{...upright,shL:lerp(5,17,gus),elL:lerp(8,32,gus),shR:-4,breathe:breath(f+25,.06)}} view={.08} look={assistLook({yaw:.16,lids:.15+blink(f,6)*.7,lookX:-.42,brow:.03,mouth:"smile"})} pal={ASSIST} height={1.73}/></Card>
   <Card cam={cam} x={4.5} z={9.2} blur={false}><Figure pose={{...upright,shL:lerp(-6,20,gus),elL:lerp(7,42,gus),breathe:breath(f+55,.06)}} view={.15} look={restaurateurLook({yaw:.45,lids:.2+blink(f,11,129)*.7,lookX:-.4,brow:.13,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/></Card>
   {/* second spotless work station and the clean empty lane from the entrance */}
   <Card cam={cam} x={6.5} z={13} blur={false}><rect x="-1.2" y="-1.1" width="2.4" height=".12" fill="#50656f"/><rect x="-.95" y="-1.8" width=".7" height=".7" rx=".12" fill="#dce7ea" stroke="#516b75" strokeWidth=".05"/><path d="M-1,-1.0 v1 M1,-1 v1" stroke="#526773" strokeWidth=".11"/></Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={23} seed={57} drift={.18}/><Finish f={f} vig={.62} grain={.06} shadow="#17334a" gradeO={.13}/>
 </>;
};
export const Scene:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"#243b49"}}>{f<s1?<Wide f={f}/>:f<s2?<Machine f={f}/>:f<s3?<Sheet f={f}/>:<Ready f={f}/>}</AbsoluteFill>;};
