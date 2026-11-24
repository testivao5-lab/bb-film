// SCENE 066 · "heisenberg" · set: desert · narration 1095.30s → 1116.28s (20.98s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   There is no plan after this, so he fills the corridor. With Gus gone, nobody owns him any more. And one afternoon in the desert, in front of a man with a lot of money and very little imagination, he is offered the chance to be a chemist again, on a salary.
//   He declines.
//   “And what are you?”
//   “You're Heisenberg.”
//   “You're goddamn right.”
//
// Word timestamps (absolute seconds, from timing/words.json):
//   There@1095.78 is@1096.00 no@1096.10 plan@1096.26 after@1096.56 this,@1096.86 so@1097.28 he@1097.50
//   fills@1097.66 the@1097.86 corridor.@1098.14 With@1099.16 Gus@1099.46 gone,@1099.62 nobody@1100.22 owns@1100.42
//   him@1100.80 anymore.@1101.02 and@1101.34 one@1102.18 afternoon@1102.32 in@1102.58 the@1102.96 desert@1103.04
//   in@1103.32 front@1103.66 of@1103.80 a@1103.94 man@1104.00 with@1104.20 a@1104.34 lot@1104.46 of@1104.68
//   money@1104.78 and@1104.98 very@1105.32 little@1105.52 imagination@1105.82 he's@1106.66 offered@1107.14
//   the@1107.38 chance@1107.54 to@1107.74 be@1107.96 a@1108.06 chemist@1108.14 again@1108.36 on@1108.68 a@1109.06
//   salary.@1109.14 He@1110.28 declines.@1110.38 And@1111.66 what@1111.82 are@1111.96 you?@1112.12 Your@1113.06
//   Heisenberg.@1113.54 Your@1114.86 goddamn@1115.10 right.@1115.46
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, project } from "../../lib/camera";
import { breath, easeInOut, lerp, prog } from "../../lib/anim";
import { Pose } from "../../rig/Figure";
import { TEACHER, PARTNER, teacherLook, partnerLook } from "../../rig/cast";
import { DDefs, Birds } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { Sedan } from "../../props/d_vehicle";
import { Actor } from "../../props/d_actor";
import { extra, handAt, lidsOf, walkPose } from "../../props/d_poses";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 66, id: "heisenberg", set: "desert", cutIn: 1095.3, cutOut: 1116.28 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const C = { desert: beat(1102.18), decline: beat(1110.28), answer: beat(1113.06), right: beat(1114.86), end: beat(META.cutOut) };
const BUYER = extra({height:1.79, skin:"#bb8667", jacket:"#756453", shirt:"#dad0bc", pants:"#4d4540", hair:"#4d352a", hairStyle:"sidepart", age:.48});

// A stainless service corridor after the lab owner's death. Architectural points are
// projected in metres, matching the cool steel lab vocabulary without altering the kit.
const Corridor:React.FC = () => {
  const f=useCurrentFrame(), t=prog(f,0,C.desert,easeInOut);
  const cam:Cam={x:lerp(.16,0,t),y:1.48,z:lerp(-2,-1.2,t),f:1250,shiftY:10};
  const point=(x:number,y:number,z:number)=>{const p=project(cam,x,y,z);return `${p.x},${p.y}`};
  const poly=(pts:[number,number,number][])=>pts.map(([x,y,z])=>point(x,y,z)).join(' ');
  const walk=prog(f,beat(1096.7),beat(1099.25),easeInOut);
  return <AbsoluteFill><svg width={W} height={H}>
    <defs><linearGradient id="h66hall" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#2d424e"/><stop offset=".48" stopColor="#a8bec6"/><stop offset="1" stopColor="#415866"/></linearGradient></defs>
    <rect width={W} height={H} fill="#24343c"/>
    <polygon points={poly([[-2,0,1],[-2,2.7,1],[-2,2.7,12],[-2,0,12]])} fill="#71858d"/>
    <polygon points={poly([[2,0,1],[2,2.7,1],[2,2.7,12],[2,0,12]])} fill="#536c79"/>
    <polygon points={poly([[-2,2.7,1],[2,2.7,1],[2,2.7,12],[-2,2.7,12]])} fill="#324752"/>
    <polygon points={poly([[-2,0,1],[2,0,1],[2,0,12],[-2,0,12]])} fill="url(#h66hall)"/>
    <Card cam={cam} x={0} z={12} blur={false}><rect x={-2} y={-2.7} width={4} height={2.7} fill="#aebfc5"/><rect x={-.65} y={-2.05} width={1.3} height={2.05} fill="#3c5663" stroke="#283c48" strokeWidth={.06}/><rect x={-.48} y={-1.83} width={.96} height={.75} fill="#b8d5de" opacity={.75}/></Card>
    {[3,5,7,9].map(z=><g key={`wall${z}`}>
      <line x1={project(cam,-1.99,0,z).x} y1={project(cam,-1.99,0,z).y} x2={project(cam,-1.99,2.65,z).x} y2={project(cam,-1.99,2.65,z).y} stroke="#3a5660" strokeWidth="5"/>
      <line x1={project(cam,1.99,0,z).x} y1={project(cam,1.99,0,z).y} x2={project(cam,1.99,2.65,z).x} y2={project(cam,1.99,2.65,z).y} stroke="#364e5a" strokeWidth="5"/>
    </g>)}
    {/* Utility conduits, warm emergency fittings and filtered ceiling light. */}
    {[3,6,9].map(z=><polygon key={`cone${z}`} points={poly([[-.65,2.68,z],[.65,2.68,z], [1.55,0,z+1.8],[-1.55,0,z+1.8]])} fill="#d8f5ff" opacity={.055}/>)}
    <Card cam={cam} x={-1.67} z={8} blur={false}>
      <rect x={-.22} y={-1.95} width={.44} height={.66} rx={.025} fill="#455d67" stroke="#253a43" strokeWidth={.018}/>
      <rect x={-.15} y={-1.87} width={.3} height={.19} fill="#9ac1c4"/>
      <circle cx={-.07} cy={-1.51} r={.035} fill="#dfa95d"/><circle cx={.07} cy={-1.51} r={.035} fill="#77958e"/>
      <path d="M0,-1.29 v.75" stroke="#455e67" strokeWidth={.05}/>
    </Card>
    <Card cam={cam} x={1.65} z={7} blur={false}>
      <rect x={-.16} y={-1.45} width={.32} height={.48} rx={.07} fill="#a54f42" stroke="#58332f" strokeWidth={.018}/>
      <path d="M-.07,-1.45 v-.12 h.15 M.08,-1.53 q.16,.08 .1,.2" fill="none" stroke="#38474a" strokeWidth={.025}/>
      <rect x={-.1} y={-1.32} width={.2} height={.13} fill="#e6ddc4" opacity={.8}/>
    </Card>
    <line x1={project(cam,-1.98,2.3,1).x} y1={project(cam,-1.98,2.3,1).y} x2={project(cam,-1.98,2.3,12).x} y2={project(cam,-1.98,2.3,12).y} stroke="#d3e5e8" strokeWidth="8" opacity=".5"/>
    {[2,4,6,8,10].map(z=><g key={z}><polygon points={poly([[-1.1,2.68,z], [1.1,2.68,z], [1.1,2.68,z+.18],[-1.1,2.68,z+.18]])} fill="#e7f5f7"/><polygon points={poly([[-1,0,z], [1,0,z], [1,0,z+1],[-1,0,z+1]])} fill="#d5ecf0" opacity={.16}/><line x1={project(cam,-2,0,z).x} y1={project(cam,-2,0,z).y} x2={project(cam,2,0,z).x} y2={project(cam,2,0,z).y} stroke="#536a74" strokeWidth="2" opacity=".38"/></g>)}
    <Actor cam={cam} x={lerp(-.4,.35,walk)} z={lerp(4.5,3.25,walk)} view={.68} pose={{...walkPose(f*.11,{amp:14,armAmp:8}),shL:25,elL:40}} look={teacherLook({lids:lidsOf(f,3),brow:.2,lookX:.1})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#d7f6ff"/>
    <Card cam={cam} x={-1.86} z={2.1} blur={false}><rect x={-.14} y={-2.7} width={.28} height={2.7} fill="#273d47"/><path d="M-.6,-2.5 h1.2" stroke="#b8d6dd" strokeWidth={.06}/></Card>
    <Card cam={cam} x={1.86} z={2.1} blur={false}><rect x={-.12} y={-2.7} width={.24} height={2.7} fill="#2a424d"/></Card>
  </svg><Motes f={f} n={20} color="#d8f4ff" seed={66} drift={.25}/><Finish f={f} vig={.52} grain={.06} shadow="#102b3a" gradeO={.12}/></AbsoluteFill>;
};

// Desert confrontation: establish geography and the other crew; the buyer makes
// a deliberate cash offer rather than two characters idling in the same pose.
const Negotiation:React.FC = () => {
  const f=useCurrentFrame(), g=f+C.desert, t=prog(f,0,C.decline-C.desert,easeInOut);
  const cam:Cam={x:lerp(0,.12,t),y:1.35,z:lerp(.35,1.1,t),f:1550,shiftY:0,focus:7,aperture:.3};
  const offer=prog(g,beat(1106.66),beat(1108.68),easeInOut);
  const buyer:Pose={torso:lerp(-3,7,offer),neck:-3,shL:12,shR:lerp(18,56,offer),elL:35,elR:lerp(65,22,offer),hipL:5,hipR:10,knL:6,knR:9,breathe:breath(g,.12)};
  const teacher:Pose={torso:3,neck:-3,shL:12,shR:32,elL:30,elR:42,hipL:5,hipR:9,knL:5,knR:7,breathe:breath(g,.08)};
  const hand=handAt(buyer,BUYER.h,.83,"L");
  const open=prog(g,beat(1104.25),beat(1104.78),easeInOut);
  return <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={g} tone="day" sun={[1530,160]} rut/>
    <Card cam={cam} x={2.6} z={11} blur={false}><Sedan body="#746c60" shade="#474139" light="#a69b88" driver={false}/></Card>
    <Actor cam={cam} x={-2.0} z={8.2} view={.72} pose={{torso:-5,neck:4,shL:28,shR:18,elL:65,elR:40,hipL:5,hipR:10,knL:5,knR:7,breathe:breath(g,.06)}} look={partnerLook({lookX:.6,lids:lidsOf(g,7),brow:.35})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie" rimLight="#ffe7bb"/>
    <Actor cam={cam} x={-1.05} z={6.4} view={.82} pose={teacher} look={teacherLook({yaw:.25,lookX:.4,lids:lidsOf(g,4),brow:.15})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffe8bb"/>
    <Actor cam={cam} x={1.22} z={6.6} face={-1} view={.83} pose={buyer} look={{...BUYER.look,yaw:.3,lookX:.35,lids:lidsOf(g,9),brow:.28,mouth:offer>.1?"open":"flat",mouthOpen:.12+.1*Math.abs(Math.sin(g*.23))}} pal={BUYER.pal} height={BUYER.h} rimLight="#ffe8bb">
      {/* Hand follows the rig: a shallow open cash case travels with the wrist. */}
      <g transform={`translate(${hand.x},${hand.y})`}><path d="M-.055,.015 q.055,-.08 .11,0" fill="none" stroke="#201915" strokeWidth=".02"/><rect x={-.24} y={.02} width={.48} height={.25} rx={.02} fill="#392f29" stroke="#201915" strokeWidth={.018}/><path d={`M-.24,.02 L-.22,${.02-.20*open} L.22,${.02-.20*open} L.24,.02 Z`} fill="#51453a" stroke="#201915" strokeWidth={.016}/>{[-.16,-.05,.06].map((x,i)=><g key={i} opacity={open}><rect x={x} y={.06} width={.1} height={.12} fill="#91a37d" stroke="#455d46" strokeWidth={.008}/><path d={`M${x+.05},.06 v.12`} stroke="#ddd8bb" strokeWidth={.016}/></g>)}</g>
    </Actor>
    <Birds f={g} n={3} y={210} sp={.45} tone="#5e4d3b"/>
  </svg><Motes f={g} n={22} color="#ffedcc" seed={67} drift={.45}/><Finish f={g} vig={.45} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};

// Close compositions share only the location kit. They are separate story beats:
// refusal, buyer's recognition, teacher's confirmation, each with independent acting.
const Refusal:React.FC = () => {
  const f=useCurrentFrame(),g=f+C.decline, k=prog(g,beat(1110.28),beat(1110.75),easeInOut), q=prog(g,beat(1111.66),beat(1112.12),easeInOut);
  const cam:Cam={x:-.42,y:1.37,z:3.35+f*.0018,f:1800,shiftY:0};
  const p:Pose={torso:lerp(2,-3,k),neck:lerp(0,-8,k)+4*q,shL:12,shR:lerp(24,55,k)+8*q,elL:28,elR:lerp(40,26,k),hipL:5,hipR:8,knL:6,knR:8,breathe:breath(g,.08)};
  return <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={g} sun={[1530,160]}/><Card cam={cam} x={1.9} z={12} blur={false}><Sedan body="#746c60" shade="#474139" driver={false}/></Card><Actor cam={cam} x={-.52} z={6} view={.8} pose={p} look={teacherLook({yaw:.15,lids:lidsOf(g,4),lookX:.5,brow:.25,mouth:q>.1?"open":"flat",mouthOpen:.12+.1*Math.abs(Math.sin(g*.24))})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffe8bb"/><Card cam={cam} x={1.45} z={4.8} blur={false} opacity={.55}><path d="M-.26,0 L-.3,-1.3 Q0,-1.55 .3,-1.3 L.4,0 Z" fill="#594c41"/></Card></svg><Motes f={g} n={18} color="#ffebc5" seed={68}/><Finish f={g} vig={.5} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};
const Recognition:React.FC = () => {
 const f=useCurrentFrame(),g=f+C.answer, k=prog(g,beat(1113.06),beat(1113.54),easeInOut); const cam:Cam={x:.60,y:1.37,z:3.35+f*.002,f:1800,shiftY:0};
 const p:Pose={torso:lerp(-8,-2,k),neck:lerp(10,-5,k),shL:12,shR:lerp(15,55,k),elL:20,elR:lerp(38,94,k),hipL:5,hipR:8,knL:6,knR:8,breathe:breath(g,.09)};
 return <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={g} sun={[1480,160]}/><Card cam={cam} x={-1.5} z={12} blur={false}><Sedan body="#746c60" shade="#474139" driver={false}/></Card><Actor cam={cam} x={.58} z={6} face={-1} view={.8} pose={p} look={{...BUYER.look,yaw:.17,lids:lidsOf(g,9),lookX:.45,brow:lerp(.55,.15,k),mouth:"open",mouthOpen:.1+.14*Math.abs(Math.sin(g*.3))}} pal={BUYER.pal} height={BUYER.h} rimLight="#ffe8bb"/><Card cam={cam} x={-1.3} z={4.8} blur={false} opacity={.5}><path d="M-.3,0 L-.25,-1.3 Q0,-1.52 .28,-1.3 L.4,0 Z" fill="#263648"/></Card></svg><Motes f={g} n={18} color="#ffebc5" seed={69}/><Finish f={g} vig={.5} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};
const Confirmation:React.FC = () => {
 const f=useCurrentFrame(),g=f+C.right,k=prog(g,beat(1114.86),beat(1115.46),easeInOut); const cam:Cam={x:-.4,y:1.38,z:3.50+f*.002,f:1800,shiftY:0};
 const p:Pose={torso:2,neck:lerp(-4,3,k),shL:16,shR:lerp(30,15,k),elL:64,elR:lerp(55,85,k),hipL:5,hipR:8,knL:6,knR:8,breathe:breath(g,.06)};
 return <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={g} sun={[1510,170]}/><Card cam={cam} x={2.3} z={12} blur={false}><Sedan body="#746c60" shade="#474139" driver={false}/></Card><Actor cam={cam} x={-.4} z={6} view={.78} pose={p} look={teacherLook({yaw:.12,lids:lidsOf(g,5,.2),lookX:.45,brow:-.05,mouth:"open",mouthOpen:.1+.12*Math.abs(Math.sin(g*.26))})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffe8bb"/></svg><Motes f={g} n={18} color="#ffebc5" seed={70}/><Finish f={g} vig={.55} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.desert}><Corridor/></Sequence><Sequence from={C.desert} durationInFrames={C.decline-C.desert}><Negotiation/></Sequence><Sequence from={C.decline} durationInFrames={C.answer-C.decline}><Refusal/></Sequence><Sequence from={C.answer} durationInFrames={C.right-C.answer}><Recognition/></Sequence><Sequence from={C.right} durationInFrames={C.end-C.right}><Confirmation/></Sequence><Sequence from={C.desert} durationInFrames={C.end-C.desert}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence></AbsoluteFill>;
