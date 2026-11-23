// SCENE 055 · the corner — Jesse sees the child being used, then tries to master his own anger.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Palette, Pose, STAND } from "../../rig/Figure";
import { HeadLook } from "../../rig/Head";
import { PARTNER, partnerLook, BROTHER, brotherLook } from "../../rig/cast";
import { CNightStreet } from "../../env/c_street";
import { Finish, Motes } from "../../fx/Post";

export const META={n:55,id:"tomas",set:"street",cutIn:900.5,cutOut:918.5};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const T={pass:beat(907.48),name:beat(908.48),age:beat(910.34),step:beat(911.28),alone:beat(912.48),gun:beat(913.98),end:beat(918.5)};
const idle:Pose={...STAND,breathe:.32};
const DEAL_A:Palette={skin:"#bc896c",skinShade:"#895e4b",skinLight:"#d7a78b",jacket:"#564d49",jacketShade:"#3b3535",jacketLight:"#74655e",shirt:"#aa8770",shirtShade:"#745946",pants:"#3d4851",pantsShade:"#2c353d",shoes:"#282426",outline:"#1b1717"};
const DEAL_B:Palette={skin:"#dbb08b",skinShade:"#ae8065",skinLight:"#f1c6a3",jacket:"#384556",jacketShade:"#263441",jacketLight:"#556679",shirt:"#c3b390",shirtShade:"#95866a",pants:"#44454a",pantsShade:"#2f3035",shoes:"#282426",outline:"#181514"};
const TOMAS:Palette={skin:"#c7916e",skinShade:"#9a654d",skinLight:"#e1ad89",jacket:"#957744",jacketShade:"#71582f",jacketLight:"#b59b66",shirt:"#ddd6c5",shirtShade:"#aaa394",pants:"#4b5965",pantsShade:"#303b47",shoes:"#34302c",outline:"#211a17"};
const darkHair={base:"#25211f",dark:"#141313",light:"#514038",style:"buzz" as const};
const kidHair={base:"#2c211c",dark:"#161312",light:"#63402c",style:"swept" as const};
const dLook=(o:Partial<HeadLook>={}):HeadLook=>({lids:.18,lookX:0,lookY:0,brow:.25,mouth:"flat",hair:darkHair,glasses:false,stubble:.6,age:.36,...o});
const childLook=(o:Partial<HeadLook>={}):HeadLook=>({lids:.14,lookX:0,lookY:0,brow:-.08,mouth:"neutral",hair:kidHair,glasses:false,stubble:0,age:0,...o});
const KidsBag:React.FC=()=> <g><path d="M-.23,-.57 q-.11,.04 -.1,.18 l.04,.27 h.22 l.05,-.27 q.01,-.15 -.12,-.18z" fill="#53616a" stroke="#211b18" strokeWidth=".018"/><path d="M-.28,-.66 q.14,.13 .29,.1" stroke="#ded3bd" strokeWidth=".025" fill="none"/></g>;
const Child:React.FC<{cam:Cam;f:number;x:number;z:number;offer:number;turn:number}> = ({cam,f,x,z,offer,turn})=><Card cam={cam} x={x} z={z} blur={false}>
 <KidsBag/>
 <Figure pose={{...idle,torso:lerp(0,-4,turn),shL:lerp(4,37,offer),elL:lerp(9,28,offer),wrL:lerp(0,8,offer),shR:lerp(-4,8,turn),hipL:Math.sin(f*.08)*2,hipR:-Math.sin(f*.08)*2,breathe:breath(f+10,.09)}} view={.08} look={childLook({yaw:lerp(.25,.55,turn),lids:.13+blink(f,15,86)*.7,lookX:lerp(.3,-.25,turn),brow:-.12,mouth:"flat"})} pal={TOMAS} height={1.45}/>
</Card>;
const Dealer:React.FC<{cam:Cam;f:number;x:number;z:number;variant:0|1;offer:number}> = ({cam,f,x,z,variant,offer})=><Card cam={cam} x={x} z={z} blur={false}>
 <Figure pose={{...idle,hipL:variant?-2:1,hipR:variant?5:-1,shL:variant?8:-4,shR:variant?-8:11,elL:variant?18:8,elR:variant?8:30,breathe:breath(f+variant*39,.062)}} view={.12} look={variant?dLook({yaw:.5,lids:.17+blink(f,13)*.72,lookX:-.55,brow:.24}):brotherLook({yaw:.61,lids:.18+blink(f,2)*.7,lookX:-.42,brow:.38,mouth:"flat"})} pal={variant?DEAL_B:DEAL_A} height={variant?1.79:1.82}/>
 {/* adult's receiving hand reaches only on the transfer beat */}
 {variant===0&&<g opacity={offer} transform="translate(.12,-.82)"><path d="M0,0 l.21,.05 .22,-.02" fill="none" stroke="#d0a083" strokeWidth=".055" strokeLinecap="round"/><path d="M.17,.02 l.12,.11" fill="none" stroke="#d0a083" strokeWidth=".04"/></g>}
</Card>;

const Wide:React.FC<{f:number}>=({f})=>{
 const u=clamp(f/T.name),cam:Cam={x:lerp(-.4,.1,easeInOut(u)),y:1.45,z:1.8,f:1290,shiftY:48};
 const offer=prog(f,beat(906.52),T.pass), move=prog(f,beat(906.26),T.pass);
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   {/* Jesse studies the exchange through the open window of a plain, unbadged car. */}
   <Card cam={cam} x={-2.7} z={6.42} blur={false}><Figure pose={{...idle,torso:-4,hipL:70,hipR:76,knL:68,knR:73,shL:40,elL:60,shR:53,elR:65,breathe:breath(f+11,.12)}} view={.82} look={partnerLook({yaw:.68,lids:.2+blink(f,29)*.78,lookX:.85,brow:-.58,mouth:"flat",dirt:.18})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
   <Card cam={cam} x={-2.7} z={6.3} blur={false}>
    <ellipse cx="0" cy="-.34" rx="1.75" ry=".42" fill="#0e141c" opacity=".4"/>
    <path d="M-1.65,-.38 l.28,-.48 q.22,-.28 .62,-.3 h1.18 q.36,.02 .64,.34 l.48,.44 .33,.12 v.42 h-3.64 v-.42z" fill="#3f515d" stroke="#151b22" strokeWidth=".06"/>
    <path d="M-.84,-1.08 h1.05 l.48,.62 h-2.05z" fill="#7891a0" opacity=".7"/>
    <path d="M-.15,-1.08 h.52 v.52 h-.52z" fill="#17232e" stroke="#a2a9a7" strokeWidth=".025"/>
    <circle cx="-1.05" cy=".04" r=".22" fill="#16191d" stroke="#979087" strokeWidth=".05"/><circle cx="1.05" cy=".04" r=".22" fill="#16191d" stroke="#979087" strokeWidth=".05"/>
   </Card>
   <Dealer cam={cam} f={f} x={1.0} z={9.5} variant={0} offer={offer}/>
   <Dealer cam={cam} f={f} x={2.65} z={9.7} variant={1} offer={0}/>
   <Child cam={cam} f={f} x={4.3-1.25*move} z={9.0} offer={offer} turn={prog(f,beat(908.48),beat(910.12))}/>
   {/* store-side bollard and curb mark foreground depth without blocking the exchange */}
   <Card cam={cam} x={-.9} z={4.7} blur={false}><rect x="-.055" y="-1.05" width=".11" height="1.05" rx=".04" fill="#66605a"/><rect x="-.14" y="-.72" width=".28" height=".16" fill="#d6bb83"/><ellipse cy="-.02" rx=".17" ry=".06" fill="#343138"/></Card>
  </svg><Motes f={f} n={32} seed={55} color="#ead7bb" drift={-.18}/><Finish f={f} vig={.66} grain={.07} shadow="#071426" gradeO={.22}/>
 </>;
};

const ChildInsert:React.FC<{f:number}>=({f})=>{
 const offer=prog(f,T.pass,T.name+Math.round(.28*30));
 const cam:Cam={x:2.2,y:1.4,z:3,f:1480,shiftY:-28};
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Dealer cam={cam} f={f} x={4.1} z={9.8} variant={0} offer={offer}/>
   <Dealer cam={cam} f={f} x={5.35} z={10.3} variant={1} offer={0}/>
   <Child cam={cam} f={f} x={2.45} z={7.15} offer={prog(f,T.pass,T.name)} turn={prog(f,T.age,beat(911.0))}/>
   {/* A tiny folded paper packet changes hands; no labels or readable writing. */}
   <Card cam={cam} x={3.15} z={7.05} blur={false} opacity={offer}>
    <path d="M-.12,-.91 L.13,-.94 L.16,-.73 L-.1,-.71 Z" fill="#e5d8bc" stroke="#4e463c" strokeWidth=".025"/>
    <path d="M-.08,-.84 l.2,-.02" stroke="#aa9a7e" strokeWidth=".014"/>
   </Card>
   <path d={`M0,${220+Math.sin(f*.06)*5} Q430,190 800,220`} fill="none" stroke="#ffe1aa" strokeWidth="2" opacity=".12"/>
  </svg><Motes f={f} n={25} seed={556} color="#edd7b0" drift={-.1}/><Finish f={f} vig={.72} grain={.07} shadow="#091421" gradeO={.23}/>
 </>;
};

const JesseClose:React.FC<{f:number}>=({f})=>{
 const step=prog(f,T.step,T.alone),freeze=prog(f,T.alone,beat(913.58));
 const cam:Cam={x:lerp(-3.65,-2.4,easeInOut(step)),y:1.35,z:2.6,f:1430,shiftY:-60};
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Card cam={cam} x={-3.35+step*.42} z={6.8} blur={false}>
    <Figure pose={{...idle,torso:lerp(0,-6,step),neck:lerp(0,7,step),shL:lerp(-3,30,step),elL:lerp(8,40,step),shR:lerp(-5,24,step),elR:lerp(8,28,step),hipL:lerp(2,21,step)*(1-freeze),hipR:lerp(-2,-8,step),knL:lerp(3,27,step)*(1-freeze),knR:lerp(3,5,step),breathe:breath(f,.12)}} view={.35} look={partnerLook({yaw:lerp(.48,.18,step),lids:.18+blink(f,5)*.8,lookX:lerp(.75,.25,step),lookY:-.2,brow:lerp(-.2,-.68,step),mouth:"flat",bruise:.1,dirt:.15})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
    {/* his fist hovers at the hidden pistol, then relaxes by a fraction — the decision is not casual */}
    <path d="M.18,-.92 q.08,.09 .18,.04 l.12,.04" stroke="#d49e7e" strokeWidth=".05" fill="none" opacity={prog(f,T.alone,T.gun)}/>
   </Card>
   <Dealer cam={cam} f={f} x={1.4} z={9.6} variant={0} offer={0}/><Dealer cam={cam} f={f} x={2.95} z={9.7} variant={1} offer={0}/>
  </svg><Motes f={f} n={24} seed={155} color="#e7d4bd" drift={-.12}/><Finish f={f} vig={.72} grain={.075} shadow="#091421" gradeO={.24}/>
 </>;
};
const Resolve:React.FC<{f:number}>=({f})=>{
 const aim=prog(f,T.gun,beat(915.56));const cam:Cam={x:-2.1,y:1.25,z:3,f:1550,shiftY:-105};
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Card cam={cam} x={-2.6} z={6.6} blur={false}>
    <Figure pose={{...idle,torso:-3,shL:lerp(4,31,aim),elL:lerp(8,41,aim),wrL:lerp(0,-12,aim),shR:lerp(-4,18,aim),elR:lerp(8,28,aim),breathe:breath(f,.14)}} view={.12} look={partnerLook({yaw:.25,lids:.22+blink(f,5)*.8,lookX:.9,brow:-.8,mouth:"flat",dirt:.18})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
    <path d="M.18,-.94 h.32 v.08 h-.32z" fill="#303339" stroke="#17191d" strokeWidth=".018" opacity={aim}/>
   </Card>
   <Dealer cam={cam} f={f} x={1.0} z={9.4} variant={0} offer={0}/><Dealer cam={cam} f={f} x={2.5} z={9.6} variant={1} offer={0}/>
   <Child cam={cam} f={f} x={3.9} z={9.1} offer={0} turn={.72}/>
   <path d={`M0 ${250+Math.sin(f*.03)*12} L1920 ${330+Math.sin(f*.03)*12}`} stroke="#ffd99a" strokeWidth="3" opacity=".08"/>
  </svg><Motes f={f} n={26} seed={57} color="#ead5b8" drift={-.1}/><Finish f={f} vig={.74} grain={.075} shadow="#080f1b" gradeO={.26}/>
 </>;
};
export const Scene:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"#101b2a"}}>{f<T.name?<Wide f={f}/>:f<T.step?<ChildInsert f={f}/>:f<T.alone?<JesseClose f={f}/>:<Resolve f={f}/>}</AbsoluteFill>;};
