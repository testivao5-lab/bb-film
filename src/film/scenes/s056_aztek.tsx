// SCENE 056 · an unbadged compact crossover breaks the corner standoff; impact is staged, not graphic.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeIn, easeInOut, easeOut, lerp, noise1, prog } from "../../lib/anim";
import { Figure, Pose, STAND } from "../../rig/Figure";
import { PARTNER, partnerLook, TEACHER, teacherLook } from "../../rig/cast";
import { CNightStreet } from "../../env/c_street";
import { Finish, Motes, Streak } from "../../fx/Post";

export const META={n:56,id:"aztek",set:"street",cutIn:918.5,cutOut:943.54};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const T={hit:beat(922.22),impact:beat(923.28),flip:beat(925.78),land:beat(927.26),reach:beat(927.96),arrive:beat(929.66),exit:beat(930.08),gun:beat(931.10),shot:beat(932.08),react:beat(934.8),run:beat(936.8),advice:beat(938.06),last:beat(942.8)};
const still:Pose={...STAND,breathe:.32};
const DE1={...PARTNER.pal,skin:"#bc896c",skinShade:"#895e4b",skinLight:"#d7a78b",jacket:"#564d49",jacketShade:"#3b3535",jacketLight:"#74655e",outline:"#1b1717"};
const DE2={...PARTNER.pal,skin:"#dbb08b",skinShade:"#ae8065",skinLight:"#f1c6a3",jacket:"#384556",jacketShade:"#263441",jacketLight:"#556679",outline:"#181514"};
const shortHair={base:"#28211e",dark:"#161313",light:"#5a4439",style:"buzz" as const};
const lookDealer=(f:number,salt:number)=>({hair:shortHair,glasses:false,stubble:.5,age:.3,lids:.18+blink(f,salt)*.72,lookX:-.3,lookY:0,brow:.38,mouth:"flat" as const});
const DealerPerson:React.FC<{cam:Cam;f:number;x:number;z:number;variant:0|1}>=({cam,f,x,z,variant})=><Card cam={cam} x={x} z={z} blur={false}>
 <Figure pose={{...still,shL:variant?8:-4,shR:variant?-8:11,elL:variant?18:8,elR:variant?8:30,breathe:breath(f+variant*39,.062)}} view={.12} look={lookDealer(f,variant?13:2)} pal={variant?DE2:DE1} height={variant?1.79:1.82}/>
</Card>;
const Dodge:React.FC<{cam:Cam;x:number;z:number;f:number;hit:number;roll?:number}> = ({cam,x,z,f,hit,roll=0})=><Card cam={cam} x={x} z={z} blur={false}>
 <g transform={`rotate(${roll} 0 -0.75)`}><g transform="scale(1 .75)">
  {/* 4.55 m long, ~1.75 m tall original rounded compact SUV, deliberately no badging */}
  <ellipse cx="0" cy="-.2" rx="2.45" ry=".33" fill="#0a1117" opacity=".48"/>
  <path d="M-2.25,-.28 l.16,-.69 q.12,-.28 .48,-.35 l.65,-.12 .42,-.62 q.18,-.29 .55,-.3 h1.18 q.38,0 .64,.32 l.67,.72 .66,.13 q.47,.1 .56,.44 l.15,.47 v.45 h-4.55z" fill="#62756d" stroke="#151c20" strokeWidth=".065"/>
  <path d="M-.52,-2.34 h1.44 q.22,0 .38,.19 l.66,.81 h-2.48z" fill="#9ab8bd" opacity=".78" stroke="#202b30" strokeWidth=".035"/>
  <path d="M-.45,-2.22 v.82 M.8,-2.2 v.82" stroke="#394b51" strokeWidth=".045"/>
  <path d="M-2.07,-.72 h4.72" stroke="#a8b9b0" strokeWidth=".045" opacity=".55"/>
  <path d="M-2.18,-.45 h6.0" stroke="#d5c18b" strokeWidth=".04"/>
  <rect x="1.96" y="-1.35" width=".14" height=".25" rx=".03" fill="#edb46c"/>
  <rect x="-2.22" y="-.71" width=".12" height=".22" rx=".03" fill="#e95c48"/>
  {[-1.4,1.28].map((cx,i)=><g key={i}><circle cx={cx} cy="-.16" r=".38" fill="#171b20" stroke="#adb2ac" strokeWidth=".06"/><circle cx={cx} cy="-.16" r=".18" fill="#777d7e"/><path d={`M${cx-.14},-.16 h.28 M${cx},-.3 v.28`} stroke="#d9dedb" strokeWidth=".04"/></g>)}
  {/* headlight spill tracks the front corner */}
  <ellipse cx="2.28" cy="-.91" rx={.3+.4*hit} ry={.1+.12*hit} fill="#fff1c5" opacity={.65+.25*hit}/>
 </g></g>
</Card>;
const Dealers:React.FC<{cam:Cam;f:number;carX:number;struck:number;flying:number;landed:number;reaching:number}> = ({cam,f,carX,struck,flying,landed,reaching})=>{
 const ax=lerp(-.65,carX-.1,struck);
 return <>
  {/* First man folds below the visible belt line as the nearside wheel crosses; vehicle occludes the impact. */}
  <Card cam={cam} x={ax} z={7.55} blur={false}>
   <Figure pose={{...still,torso:lerp(0,86,struck),neck:lerp(0,-13,struck),shL:lerp(-4,22,struck),shR:lerp(8,48,struck),elL:lerp(8,32,struck),elR:lerp(22,66,struck),hipL:lerp(2,28,struck),hipR:lerp(-1,-38,struck),knL:lerp(3,78,struck),knR:lerp(3,94,struck),breathe:breath(f,.1)}} view={.9} look={lookDealer(f,4)} pal={DE1} height={1.82}/>
  </Card>
  {/* Second man takes an arc over the hood, then lands awkwardly and reaches for the dropped pistol. */}
  <Card cam={cam} x={lerp(2.6,4.15,flying)} y={1.46*Math.sin(flying*Math.PI*.9)*(1-landed)+.12*landed} z={7.2} blur={false}>
   <Figure pose={{...still,torso:lerp(-26,8,landed),neck:lerp(12,-5,landed),shL:lerp(48,8,landed),shR:lerp(-46,16,landed),elL:lerp(62,22,landed),elR:lerp(22,55,landed),hipL:lerp(45,28,landed),hipR:lerp(-30,-8,landed),knL:lerp(58,97,landed),knR:lerp(44,24,landed),breathe:breath(f+12,.13)}} view={.82} look={lookDealer(f,7)} pal={DE2} height={1.79}/>
   <g opacity={reaching} transform="translate(.33,-.95) rotate(18)"><path d="M-.08,-.03 h.38 v.12 h-.38z" fill="#292c31" stroke="#0f1418" strokeWidth=".022"/><path d="M.04,.08 v.13 h.1 v-.13" fill="#51453a"/></g>
  </Card>
 </>;
};
const A:React.FC<{f:number}>=({f})=>{
 const drive=prog(f,beat(920.16),T.hit,easeIn); const x=lerp(-8.1,-1.8,drive);
 const shake=drive>.97?noise1(f*.7,2)*.04:0;
 const cam:Cam={x:lerp(-.8,-.1,clamp(f/T.hit)),y:1.2+shake,z:1.75,f:1300,shiftY:70};
 const light=prog(f,beat(920.64),T.hit);
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Card cam={cam} x={-4.1} z={7.8} blur={false}><Figure pose={{...still,torso:-3,shL:lerp(4,20,light),elL:lerp(8,38,light),shR:lerp(-4,18,light),elR:lerp(8,28,light),breathe:breath(f,.12)}} view={.26} look={partnerLook({yaw:.62,lids:.2+blink(f,9)*.8,lookX:.9,brow:-.68,mouth:"flat",dirt:.12})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
   <Dodge cam={cam} x={x} z={7.25} f={f} hit={light}/>
   <DealerPerson cam={cam} f={f} x={1.0} z={8.5} variant={0}/><DealerPerson cam={cam} f={f} x={2.7} z={8.7} variant={1}/>
   <path d={`M${960+600*light},${500+Math.sin(f*.35)*6} L${1400+300*light},${500+Math.sin(f*.35)*6}`} stroke="#fff0c4" strokeWidth={12+26*light} opacity={.1+.25*light}/>
  </svg><Streak x={1330} y={460} w={1200} color="#ffe7ae" o={.12+.35*light}/><Motes f={f} n={32} seed={56} color="#d8ccbc" drift={-1}/><Finish f={f} vig={.74} grain={.075} shadow="#08101c" gradeO={.23}/>
 </>;
};
const B:React.FC<{f:number}>=({f})=>{
 const move=prog(f,T.impact,beat(926.88));const stop=prog(f,beat(926.0),beat(928.0));
 const carX=lerp(-1.65,1.35,prog(f,T.impact,beat(925.0),easeOut));
 const cam:Cam={x:lerp(.2,1.1,clamp(move)),y:1.1,z:2.25,f:1380,shiftY:44};
 const struck=prog(f,T.impact,beat(923.95));const flying=prog(f,T.flip,beat(926.6));const landed=prog(f,beat(926.6),T.land);const reaching=prog(f,T.reach,beat(929.0));
 const shake= f<T.impact+20 ? noise1(f*.9,44)*2*(1-(f-T.impact)/20):0;
 return <>
  <svg width={W} height={H}><CNightStreet cam={{...cam,x:cam.x+shake*.003}} f={f}/>
   <Dealers cam={cam} f={f} carX={carX} struck={struck} flying={flying} landed={landed} reaching={reaching}/>
   <Dodge cam={cam} x={carX} z={7.5} f={f} hit={prog(f,T.impact,T.impact+9)} roll={shake*.8}/>
   {/* tire grit, a few quick specks rather than a graphic impact cloud */}
   {Array.from({length:9},(_,i)=>{const p=prog(f,T.impact,T.impact+12);return <circle key={i} cx={930+(i-4)*27+(i%2?shake*4:0)} cy={600+(i%3)*35-p*80} r={2+(i%3)} fill={i%2?"#d9cab2":"#e7b86f"} opacity={p*(1-p)*.52}/>;})}
   <Card cam={cam} x={-4.2} z={10} blur={false} opacity={.8}><Figure pose={{...still,torso:-3,shL:20,elL:38,shR:14,elR:24,breathe:breath(f+8,.1)}} view={.2} look={partnerLook({yaw:.65,lids:.23+blink(f,9)*.75,lookX:.9,brow:-.8,mouth:"gasp"})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
  </svg><Motes f={f} n={36} seed={65} color="#d9cbbb" drift={-.8}/><Finish f={f} vig={.76} grain={.08} shadow="#08111d" gradeO={.24}/>
 </>;
};
const C:React.FC<{f:number}>=({f})=>{
 const pull=prog(f,T.exit,T.gun), shoot=prog(f,T.shot,T.shot+7),end=prog(f,T.react,T.run);
 const carX=1.2;
 const cam:Cam={x:lerp(1.3,.15,clamp(end)),y:1.25,z:2.6,f:1510,shiftY:22};
 const wx=lerp(-1.05,1.4,pull);
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Dodge cam={cam} x={carX} z={7.7} f={f} hit={.35}/>
   {/* survivor on pavement: his reach and Walt's retrieval read clearly, no gore */}
   <Card cam={cam} x={3.3} y={.06} z={7.45} blur={false}>
    <Figure pose={{...still,torso:83,neck:-8,shL:22,elL:46,shR:64,elR:72,hipL:38,hipR:-20,knL:84,knR:19,breathe:.03}} view={.9} look={lookDealer(f,7)} pal={DE2} height={1.79}/>
   </Card>
   {/* Walt exits on the first named movement, circles the vehicle, then bends to lift the dropped gun. */}
   <Card cam={cam} x={wx} z={6.65} blur={false}>
    <Figure pose={{...still,torso:lerp(-2,16,pull),shL:lerp(18,56,pull),elL:lerp(32,58,pull),wrL:lerp(0,-12,pull),shR:lerp(15,52,pull),elR:lerp(24,72,pull),wrR:lerp(0,22,pull),hipL:lerp(7,23,pull),hipR:lerp(-2,-8,pull),knL:lerp(6,23,pull),knR:lerp(3,11,pull),breathe:breath(f,.09)}} view={.28} look={teacherLook({yaw:.62,lids:.18+blink(f,15)*.75,lookX:.62,brow:-.42,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/>
    {/* generic compact pistol shape, kept small and unbranded */}
    <g opacity={prog(f,T.gun,T.shot+4)} transform="translate(.23,-.86) rotate(-8)"><path d="M-.12,-.05 h.34 v.09 h-.34z" fill="#272b2d" stroke="#111517" strokeWidth=".016"/><path d="M-.02,.02 v.12 h.09 v-.12" fill="#4c4036"/></g>
   </Card>
   {/* shot is a tight white-hot blink over the target's shoulder, not an explicit wound */}
   <circle cx={projectShot(cam,3.3).x} cy={projectShot(cam,3.3).y} r={36+shoot*24} fill="#fff4d0" opacity={shoot*(1-shoot)*.88}/>
   <Card cam={cam} x={-4.0} z={10} blur={false} opacity={1-end}><Figure pose={{...still,shL:18,elL:35,breathe:breath(f+10,.12)}} view={.15} look={partnerLook({yaw:.65,lids:.27+blink(f,29)*.8,lookX:.92,brow:-.9,mouth:"open"})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/></Card>
  </svg><Motes f={f} n={30} seed={66} color="#d7ccbd" drift={-.9}/><Finish f={f} vig={.77} grain={.08} shadow="#08111d" gradeO={.24}/>
 </>;
};
function projectShot(cam:Cam,x:number){const d=7.45-cam.z,s=cam.f/d;return {x:960+(x-cam.x)*s,y:540+22+(cam.y-1.2)*s};}
const D:React.FC<{f:number}>=({f})=>{
 const run=prog(f,T.run,T.last,easeIn);const cam:Cam={x:lerp(-.5,-3.8,run),y:1.3,z:2.2,f:1350,shiftY:50};
 const wx=lerp(-2.4,-9.8,run);
 return <>
  <svg width={W} height={H}><CNightStreet cam={cam} f={f}/>
   <Dodge cam={cam} x={1.1} z={8} f={f} hit={.18}/>
   {/* Walt's “run” is a firm open-palmed cue; Jesse looks back once, then breaks into a full sprint. */}
   <Card cam={cam} x={1.25} z={7.2} blur={false}>
    <Figure pose={{...still,shL:lerp(8,38,prog(f,T.advice,T.advice+14)),elL:lerp(14,48,prog(f,T.advice,T.advice+14)),shR:-6,elR:12,breathe:breath(f,.075)}} view={.22} look={teacherLook({yaw:.7,lids:.2+blink(f,5)*.74,lookX:-.75,brow:-.55,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/>
   </Card>
   <Card cam={cam} x={wx} z={6.8} blur={false}>
    <Figure pose={{...still,torso:-7+run*10,neck:lerp(8,-5,run),shL:lerp(-8,54,run)+Math.sin(f*.38)*22*run,shR:lerp(12,-45,run)-Math.sin(f*.38)*22*run,elL:lerp(16,34,run),elR:lerp(24,58,run),hipL:lerp(8,32,run)+Math.sin(f*.38)*26*run,hipR:lerp(-5,-25,run)-Math.sin(f*.38)*26*run,knL:lerp(9,70,run),knR:lerp(8,64,run),breathe:breath(f,.18)}} view={.35} look={partnerLook({yaw:lerp(.35,.8,run),lids:.23+blink(f,29)*.8,lookX:lerp(.8,-.7,run),brow:-.86,mouth:"gasp"})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
   </Card>
   <path d={`M${projectShot(cam,-3).x},${projectShot(cam,-3).y} L${projectShot(cam,4).x},${projectShot(cam,4).y}`} stroke="#f0c888" strokeWidth="2" opacity={.08}/>
  </svg><Motes f={f} n={35} seed={67} color="#dfd2c0" drift={-1.2}/><Finish f={f} vig={.75} grain={.08} shadow="#08111d" gradeO={.23}/>
 </>;
};
export const Scene:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:"#101b2a"}}>{f<T.hit?<A f={f}/>:f<T.arrive?<B f={f}/>:f<T.react?<C f={f}/>:<D f={f}/>}</AbsoluteFill>;};
