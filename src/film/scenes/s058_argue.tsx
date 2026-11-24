// SCENE 058 · Walter's calm case against being replaceable; Gus answers with silence and a suit.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose, STAND } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Finish, Motes } from "../../fx/Post";

export const META={n:58,id:"argue",set:"superlab",cutIn:962.16,cutOut:979.9};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const cut1=beat(970.48),cut2=beat(975.62);
const neutral:Pose={...STAND,breathe:.3};

const Case:React.FC<{f:number}>=({f})=>{
 const numbers=prog(f,beat(965.6),beat(966.58));const chain=prog(f,beat(967.2),beat(969.78));const without=prog(f,beat(969.78),beat(970.48));
 const travel=prog(f,beat(962.76),beat(964.28));
 const cam:Cam={x:lerp(-.45,.35,clamp(f/cut1)),y:1.5,z:2.2,f:1360,shiftY:-45};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near/>
   <Card cam={cam} x={lerp(-3.2,-1.55,travel)} z={7.4} blur={false}>
    <Figure pose={{...neutral,hipL:lerp(8,16,travel),hipR:lerp(-4,-9,travel),shL:lerp(6,34,numbers),elL:lerp(9,57,numbers),wrL:lerp(0,10,numbers),shR:lerp(-8,38,chain),elR:lerp(12,54,chain),wrR:lerp(0,18,chain),torso:lerp(-2,0,without),breathe:breath(f,.075)}} view={.08} look={teacherLook({yaw:.16,lids:.14+blink(f,6)*.78,lookX:lerp(-.3,.3,chain),brow:lerp(-.18,-.26,without),mouth:"open",mouthOpen:.2+.17*Math.sin(f*.18)})} pal={TEACHER.pal} height={TEACHER.height}/>
   </Card>
   {/* equipment rigs form the invisible eight-million-dollar ledger; Walt makes its scale legible without a number on screen */}
   <Card cam={cam} x={1.15} z={11.5} blur={false}>
    <rect x="-2.05" y="-1.04" width="4.1" height=".13" fill="#506773"/><path d="M-1.85,-.91 v.91 M1.85,-.91 v.91" stroke="#546c77" strokeWidth=".12"/>
    {[0,1,2,3].map(i=><g key={i} transform={`translate(${-1.45+i*.96},0)`}>
      <rect x="-.23" y="-1.75" width=".46" height=".7" rx=".08" fill="#e1ebee" stroke="#4c626d" strokeWidth=".04"/>
      <path d="M0,-1.75 v-.42 h.24 v.42 M-.08,-1.46 h.16" fill="none" stroke="#8fb3bd" strokeWidth=".04"/>
    </g>)}
   </Card>
   {/* distribution route reads as actual stainless tubing running out to a secured service door */}
   <Card cam={cam} x={5.2} z={12} blur={false}>
    <path d="M-1.1,-.1 v-2.35 h.6 v-.48 h1.15 v.48 h.42 v2.35" fill="none" stroke="#59818b" strokeWidth=".08"/>
    <path d="M-.56,-2.35 v.4 h.9" fill="none" stroke="#e8c23a" strokeWidth=".07"/>
    <circle cx=".35" cy="-2.03" r=".16" fill="#e4eff0" stroke="#425963" strokeWidth=".04"/><path d="M.35,-2.03 l.06,-.07" stroke="#b74439" strokeWidth=".035"/>
    <rect x=".88" y="-2.3" width="1.08" height="2.3" fill="#33454f" stroke="#15232c" strokeWidth=".05"/><circle cx="1.78" cy="-1.15" r=".05" fill="#eac558"/>
   </Card>
   {/* as he says “without him,” he briefly points to himself, then opens his palm toward the empty workbench */}
   <Card cam={cam} x={-.35} z={6.1} blur={false} opacity={without}>
    <path d="M-.12,-1.13 q.2,-.05 .27,.05 l.17,.17" fill="none" stroke="#e6b28f" strokeWidth=".055"/>
   </Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={31} seed={58} drift={.22}/><Finish f={f} vig={.66} grain={.065} shadow="#102b40" gradeO={.14}/>
 </>;
};

const Steady:React.FC<{f:number}>=({f})=>{
 const duration=prog(f,cut1,cut2);
 const cam:Cam={x:lerp(-.1,.4,duration),y:1.4,z:2.6,f:1490,shiftY:-110};
 const explain=prog(f,beat(970.7),beat(973.92));
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near busy={.8}/>
   <Card cam={cam} x={-1.35} z={6.8} blur={false}>
    <Figure pose={{...neutral,shL:lerp(4,15,explain),elL:lerp(8,28,explain),shR:lerp(-4,16,explain),elR:lerp(8,38,explain),breathe:breath(f,.075)}} view={.06} look={teacherLook({yaw:.2,lids:.16+blink(f,15)*.77,lookX:.3,brow:-.16,mouth:"open",mouthOpen:.22+.15*Math.sin(f*.2)})} pal={TEACHER.pal} height={TEACHER.height}/>
   </Card>
   <Card cam={cam} x={2.1} z={9.1} blur={false}>
    <Figure pose={{...neutral,shL:lerp(-7,5,explain),elL:lerp(8,24,explain),shR:-8,breathe:breath(f+50,.06)}} view={.15} look={restaurateurLook({yaw:.34,lids:.2+blink(f,8,134)*.75,lookX:-.5,brow:.12,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
   </Card>
   {/* soundless, measured pursuit: camera inches toward Gus as he listens without matching Walter's gestures */}
   <path d={`M${600+duration*110},225 Q980,${210+Math.sin(f*.03)*4} ${1400+duration*90},232`} fill="none" stroke="#f4fdff" strokeWidth="2" opacity=".13"/>
   <CFinish f={f}/>
  </svg><Motes f={f} n={25} seed={581} drift={.16}/><Finish f={f} vig={.68} grain={.06} shadow="#102d44" gradeO={.15}/>
 </>;
};

const SuitUp:React.FC<{f:number}>=({f})=>{
 const cam:Cam={x:lerp(1.25,.3,clamp((f-cut2)/(beat(979.9)-cut2))),y:1.45,z:2.4,f:1460,shiftY:-86};
 const remove=prog(f,beat(977.38),beat(978.14));const lift=prog(f,beat(978.14),beat(978.64));const seal=prog(f,beat(978.64),beat(979.2));
 const suit=clamp((remove*.25+lift*.5+seal));
 const reach=lift*(1-seal);
 const waltsTalk=prog(f,beat(975.62),beat(977.12));
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near/>
   <Card cam={cam} x={-2.15} z={7.0} blur={false}>
    <Figure pose={{...neutral,shL:lerp(5,17,waltsTalk),elL:lerp(8,34,waltsTalk),shR:-4,elR:12,breathe:breath(f,.07)}} view={.12} look={teacherLook({yaw:.48,lids:.18+blink(f,4)*.8,lookX:.54,brow:-.28,mouth:"open",mouthOpen:.22})} pal={TEACHER.pal} height={TEACHER.height}/>
   </Card>
   <Card cam={cam} x={2.0} z={7.1} blur={false}>
    <Figure pose={{...neutral,shL:lerp(-5,34,reach),elL:lerp(8,62,reach),wrL:lerp(0,20,reach),shR:lerp(-2,28,reach),elR:lerp(8,42,reach),wrR:lerp(0,14,reach),breathe:breath(f+45,.06)}} view={.12} look={restaurateurLook({yaw:.24,lids:.18+blink(f,7,135)*.72,lookX:-.36,brow:.15,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
    {/* protective coverall is a local costume overlay, drawn over the original silhouette; it closes on the final syllable */}
    <g opacity={suit}>
     <path d="M-.27,-.47 Q-.34,-.55 -.32,-.76 L-.29,-1.2 Q0,-1.31 .29,-1.2 L.32,-.76 Q.34,-.55 .27,-.47 L.25,-.4 H-.25Z" fill="#dfe9ed" stroke="#536a75" strokeWidth=".028"/>
     <path d="M0,-1.25 v.82 M-.21,-.78 h.42 M-.25,-.49 h.5" stroke="#9cb4bd" strokeWidth=".025"/>
     <path d="M-.25,-1.2 q.25,-.14 .5,0" stroke="#b8c8cf" strokeWidth=".03" fill="none"/>
    </g>
    {/* suit rack and sealed gloves, each touched on its narrated verb */}
   </Card>
   <Card cam={cam} x={4.6} z={8.8} blur={false}>
    <rect x="-.75" y="-2.05" width="1.5" height=".09" fill="#4f626b"/><path d="M-.58,-1.96 v1.96 M.58,-1.96 v1.96" stroke="#50646e" strokeWidth=".09"/>
    <path d="M-.35,-1.73 q.1,-.35 .3,-.22 l.3,.14 q.11,.12 .01,.23 l-.26,.2 h-.28z" fill="#e8c23a" stroke="#66572c" strokeWidth=".03"/>
    <rect x="-.22" y="-1.84" width=".44" height=".68" rx=".16" fill="#dfe8eb" stroke="#6e8790" strokeWidth=".04"/>
   </Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={25} seed={582} drift={.16}/><Finish f={f} vig={.68} grain={.06} shadow="#0f293f" gradeO={.15}/>
 </>;
};
export const Scene:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"#243a48"}}>{f<cut1?<Case f={f}/>:f<cut2?<Steady f={f}/>:<SuitUp f={f}/>}</AbsoluteFill>;};
