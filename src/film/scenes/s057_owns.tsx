// SCENE 057 · ownership, silence, and the witness — told in gestures and empty space.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose, STAND, Palette } from "../../rig/Figure";
import { HeadLook } from "../../rig/Head";
import { TEACHER, teacherLook, PARTNER, partnerLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Finish, Motes } from "../../fx/Post";

export const META={n:57,id:"owns",set:"superlab",cutIn:943.54,cutOut:962.16};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const c1=beat(950.98),c2=beat(954.4);
const hold:Pose={...STAND,breathe:.3};
const VIC:Palette={skin:"#d3a78b",skinShade:"#9f735c",skinLight:"#edc3a3",jacket:"#55504b",jacketShade:"#38383a",jacketLight:"#706960",shirt:"#b6a98e",shirtShade:"#877b65",pants:"#363c43",pantsShade:"#282d33",shoes:"#272626",outline:"#171516"};
const vHair={base:"#342a25",dark:"#1c1715",light:"#756052",style:"buzz" as const};
const vLook=(o:Partial<HeadLook>={}):HeadLook=>({hair:vHair,glasses:false,stubble:.5,age:.44,lids:.17,lookX:0,lookY:0,brow:.12,mouth:"flat",...o});
const helper=prog;

const Bond:React.FC<{f:number}>=({f})=>{
 const claim=prog(f,beat(946.52),beat(949.24));
 const cam:Cam={x:lerp(-.1,.15,clamp(f/c1)),y:1.4,z:2.1,f:1370,shiftY:-85};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near={false}/>
   {/* Walter keeps his distance at first; Jesse crosses the empty floor and deliberately takes the nearer position. */}
   <Card cam={cam} x={-2.4} z={8.3} blur={false}><Figure pose={{...hold,shL:lerp(4,14,claim),elL:lerp(8,32,claim),torso:lerp(0,-2,claim),breathe:breath(f,.07)}} view={.12} look={teacherLook({yaw:.52,lids:.2+blink(f,17)*.7,lookX:.5,brow:-.5,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/></Card>
   <Card cam={cam} x={lerp(2.1,-.6,claim)} z={7.4} blur={false}><Figure pose={{...hold,shL:lerp(8,24,claim),elL:lerp(8,45,claim),shR:lerp(-3,10,claim),elR:lerp(9,28,claim),hipL:lerp(2,12,claim),hipR:-4,breathe:breath(f+24,.1)}} view={.18} look={partnerLook({yaw:.18,lids:.22+blink(f,12)*.8,lookX:-.4,brow:-.65,mouth:"flat",bruise:.12})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
   {/* Jesse lays a protective forearm across the gap—not a victory pose. */}
   <Card cam={cam} x={1.65} z={6.1} blur={false} opacity={claim*.9}>
    <path d="M-.45,-1.04 q.42,-.18 .9,-.24" stroke="#d9a383" strokeWidth=".06" fill="none" strokeLinecap="round"/>
   </Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={22} seed={571} drift={.18}/><Finish f={f} vig={.68} grain={.06} shadow="#102c43" gradeO={.16}/>
 </>;
};
const Wait:React.FC<{f:number}>=({f})=>{
 const hush=prog(f,beat(951.0),beat(953.4));
 const cam:Cam={x:.15,y:1.45,z:2.25,f:1400,shiftY:-105};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near/>
   {/* two empty positions under the lights; Gus lets the silence do the talking. */}
   <ellipse cx="784" cy="807" rx="100" ry="28" fill="#ed3434" opacity={.05*(.5+.5*Math.sin(f*.04))}/>
   <ellipse cx="1154" cy="807" rx="100" ry="28" fill="#ed3434" opacity={.05*(.5+.5*Math.sin(f*.04+1))}/>
   <Card cam={cam} x={-2.15} z={8.4} blur={false}><Figure pose={{...hold,shL:lerp(4,-6,hush),elL:lerp(10,18,hush),shR:-7,breathe:breath(f,.07)}} view={.1} look={teacherLook({yaw:.53,lids:.22+blink(f,11)*.78,lookX:.5,brow:-.52,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/></Card>
   <Card cam={cam} x={-.1} z={7.8} blur={false}><Figure pose={{...hold,torso:-2,shL:22,elL:42,shR:16,elR:34,breathe:breath(f+20,.09)}} view={.3} look={partnerLook({yaw:.08,lids:.26+blink(f,8)*.8,lookX:.4,brow:-.7,mouth:"flat",bruise:.15})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
   <Card cam={cam} x={2.2} z={8.8} blur={false}><Figure pose={{...hold,shL:lerp(-8,2,hush),elL:lerp(8,22,hush),shR:-8,breathe:breath(f+55,.06)}} view={.16} look={restaurateurLook({yaw:.42,lids:.21+blink(f,4,145)*.7,lookX:-.55,brow:.14,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/></Card>
   <Card cam={cam} x={5.2} z={14} blur={false}><rect x="-1.25" y="-1.02" width="2.5" height=".12" fill="#526973"/><path d="M-1.05,-.9 v.9 M1.05,-.9 v.9" stroke="#50636c" strokeWidth=".1"/><rect x="-.25" y="-1.73" width=".5" height=".72" rx=".13" fill="#dce8ea" stroke="#5a6e78" strokeWidth=".04"/></Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={29} seed={572} color="#e9f5fa" drift={.1}/><Finish f={f} vig={.68} grain={.065} shadow="#0b273b" gradeO={.15}/>
 </>;
};
const Witness:React.FC<{f:number}>=({f})=>{
 const entry=prog(f,beat(958.76),beat(959.22));const retreat=prog(f,beat(959.22),beat(960.42));const enterLab=prog(f,beat(960.42),beat(961.36));
 const cam:Cam={x:lerp(-.25,.9,clamp((f-c2)/(beat(962.16)-c2))),y:1.4,z:2.05,f:1390,shiftY:-105};
 return <>
  <svg width={W} height={H}><CSuperlab cam={cam} f={f} near={false}/>
   {/* Foreground chemistry station is left conspicuously cold: abandoned glassware, untouched notebook, empty stool. */}
   <Card cam={cam} x={-4.1} z={5.1} blur={false}>
    <rect x="-1.5" y="-1.08" width="3" height=".12" rx=".02" fill="#4d626d"/><path d="M-1.25,-.96 v.96 M1.25,-.96 v.96" stroke="#4d626d" strokeWidth=".1"/>
    <path d="M-.92,-1.1 v-.6 q0-.12 .12-.12 h.45 q.12 0 .12 .12 v.6 M-.8,-1.82 v-.44 h.22 v.44" fill="none" stroke="#819ca5" strokeWidth=".045"/>
    <path d="M.2,-1.0 l1.04,-.08 l.12,.74 l-1.04,.08z" fill="#eee9dc" stroke="#736f65" strokeWidth=".025"/><path d="M.35,-.83 l.65,-.05 M.37,-.65 l.65,-.05" stroke="#959184" strokeWidth=".02"/>
    <path d="M1.75,-.5 v.48 h.6" stroke="#e4bd63" strokeWidth=".07" fill="none"/>
   </Card>
   {/* Rectangular observation pane with no UI or labels: an apartment corridor tableau, then the witness runs out. */}
   <Card cam={cam} x={2.2} z={6.8} blur={false}>
    <rect x="-2.0" y="-2.35" width="4.0" height="2.3" rx=".08" fill="#28323a" stroke="#98aab0" strokeWidth=".055"/>
    <rect x="-1.88" y="-2.22" width="3.76" height="2.04" fill="#483e39"/>
    <path d="M-1.88,-.42 L-.35,-2.22 H.02 L1.58,-.42" fill="#67594d" opacity=".55"/>
    <rect x=".82" y="-1.98" width=".72" height="1.55" fill="#2d2421" stroke="#ad8964" strokeWidth=".035"/>
    {/* neighbors as silhouettes at the far doorway; one head turns toward movement */}
    <g fill="#17222a"><circle cx="-1.18" cy="-1.35" r=".19"/><path d="M-1.45,-1.13 q.25,-.2 .53,0 l.14,.73 h-.8z"/><circle cx="-1.64" cy="-1.4" r=".13"/><path d="M-1.82,-1.23 q.18,-.13 .36,0 l.1,.65 h-.56z"/></g>
    <g transform={`translate(${lerp(.36,1.4,retreat)},0)`} opacity={clamp(entry+retreat)}>
     <Figure pose={{...hold,torso:lerp(-7,8,retreat),shL:lerp(5,28,retreat),shR:lerp(-4,18,retreat),elL:lerp(10,42,retreat),hipL:lerp(4,19,retreat),knL:lerp(5,35,retreat),breathe:breath(f+7,.1)}} view={.78} look={vLook({yaw:.84,lids:.16+blink(f,18)*.72,lookX:.7,brow:-.38})} pal={VIC} height={1.8}/>
    </g>
    {/* the apartment door falls shut after Victor retreats; the witnesses stay behind glass */}
    <path d={`M${.82+retreat*.45},-1.98 v1.55`} stroke="#b99b77" strokeWidth=".04"/>
   </Card>
   {/* Victor returns under lab lights; Gus' eyes shift first, with no other reaction. */}
   <Card cam={cam} x={lerp(6.4,3.5,enterLab)} z={8.8} blur={false} opacity={enterLab}>
    <Figure pose={{...hold,shL:lerp(-8,10,enterLab),elL:lerp(8,32,enterLab),hipL:lerp(0,12,enterLab),knL:lerp(2,22,enterLab),breathe:breath(f+18,.085)}} view={.75} look={vLook({yaw:.78,lids:.18+blink(f,17)*.7,lookX:-.6,brow:.2})} pal={VIC} height={1.8}/>
   </Card>
   <Card cam={cam} x={-.45} z={9.1} blur={false}><Figure pose={{...hold,shL:-7,shR:5,breathe:breath(f+55,.06)}} view={.16} look={restaurateurLook({yaw:.44,lids:.2+blink(f,5,145)*.7,lookX:lerp(.05,-.45,enterLab),brow:.12,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/></Card>
   <CFinish f={f}/>
  </svg><Motes f={f} n={23} seed={573} drift={.2}/><Finish f={f} vig={.7} grain={.07} shadow="#112b40" gradeO={.16}/>
 </>;
};
export const Scene:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"#223744"}}>{f<c1?<Bond f={f}/>:f<c2?<Wait f={f}/>:<Witness f={f}/>}</AbsoluteFill>;};
