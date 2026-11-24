// SCENE 067 · "top" · set: suburbNight · narration 1116.28s → 1128.07s (11.79s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   That is the top of the arch. It is the highest his life will ever get.
//   Then the money arrives in quantities that stop making sense. Millions, in bags, into a house with a leaking pool.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   That@1116.74 is@1117.02 the@1117.24 top@1117.38 of@1117.62 the@1117.78 arch.@1117.90 It@1118.62 is@1118.72
//   the@1118.80 highest@1118.92 his@1119.20 life@1119.48 will@1119.74 ever@1119.92 get.@1120.24 Then@1121.42
//   the@1121.70 money@1121.80 arrives@1122.04 in@1122.34 quantities@1122.52 that@1122.82 stop@1123.22
//   making@1123.44 sense.@1123.72 Millions@1124.62 in@1125.00 bags@1125.46 into@1125.80 a@1126.38 house@1126.54
//   with@1126.80 a@1127.02 leaking@1127.14 pool.@1127.38 pool.@1127.74
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, planePts, project } from "../../lib/camera";
import { breath, easeInOut, lerp, prog } from "../../lib/anim";
import { Pose } from "../../rig/Figure";
import { HandBack } from "../../rig/Hands";
import { TEACHER, WIFE, teacherLook, wifeLook } from "../../rig/cast";
import { DDefs, Birds, Sky } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { KitchenRoom, KitchenTable } from "../../env/b_kitchen";
import { Actor } from "../../props/d_actor";
import { Sedan } from "../../props/d_vehicle";
import { handAt, lidsOf, walkPose } from "../../props/d_poses";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 67, id: "top", set: "suburbNight", cutIn: 1116.28, cutOut: 1128.07 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const C={money:beat(1121.42), bags:beat(1124.62), pool:beat(1126.8), end:beat(META.cutOut)};

// The last look back in the desert, followed by a quiet hard cut into the house.
const Summit:React.FC=()=>{
 const f=useCurrentFrame(),k=prog(f,0,C.money,easeInOut);
 const cam:Cam={x:lerp(-.45,-.2,k),y:1.32,z:lerp(2.35,3.1,k),f:1600,shiftY:10};
 const p:Pose={torso:lerp(1,-2,k),neck:lerp(-4,3,k),shL:18,shR:lerp(38,20,k),elL:66,elR:lerp(42,75,k),hipL:4,hipR:9,knL:7,knR:8,breathe:breath(f,.06)};
 return <AbsoluteFill><svg width={W} height={H}><DDefs/><DesertAll cam={cam} f={f} tone="day" sun={[1460,170]}/><Birds f={f} n={3} y={225} sp={.4} tone="#584937"/><Card cam={cam} x={2.4} z={12} blur={false}><Sedan body="#746c60" shade="#474139" driver={false}/></Card>
 <Actor cam={cam} x={-.35} z={6} view={.76} pose={p} look={teacherLook({yaw:.18,lookX:.4,lids:lidsOf(f,3,.18),brow:-.05,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffeac2"><g transform={`translate(${handAt(p,TEACHER.height,.76,"R").x},${handAt(p,TEACHER.height,.76,"R").y})`}><circle cx=".04" cy=".035" r=".025" fill="none" stroke="#bdb8a8" strokeWidth=".01"/><path d="M.05,.05 l.06,.08 l.016,-.01 l-.01,-.018 l.013,-.01 l-.02,-.02" fill="#b3b2aa" stroke="#434441" strokeWidth=".006"/></g></Actor>
 <Card cam={cam} x={2.0} z={4.7} blur={false}><path d="M-.4,0 Q-.18,-.38 0,-.42 Q.15,-.2 .4,0Z" fill="#53643f"/><path d="M-.25,-.05 Q0,-.2 .14,-.29" fill="none" stroke="#aaba78" strokeWidth={.025} opacity={.65}/></Card>
 </svg><Motes f={f} n={24} color="#ffedc5" seed={67} drift={.4}/><Finish f={f} vig={.5} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};

const Bag:React.FC<{open?:number;cash?:number}> = ({open=0,cash=0})=><g>
 <ellipse cx={0} cy={.012} rx={.42} ry={.08} fill="#100f12" opacity={.32}/>
 <path d="M-.4,0 L-.34,-.26 Q-.25,-.34 0,-.32 Q.25,-.34 .34,-.26 L.4,0 Z" fill="#34424c" stroke="#151b20" strokeWidth={.014}/>
 <path d="M-.32,-.05 Q0,-.01 .32,-.05" fill="none" stroke="#657480" strokeWidth={.016} opacity={.5}/>
 <path d="M-.19,-.27 v.22 M.19,-.27 v.22 M-.19,-.27 Q0,-.45 .19,-.27" fill="none" stroke="#1e2a33" strokeWidth={.035}/>
 <ellipse cx={0} cy={-.29} rx={.27} ry={.055+open*.045} fill="#131d20" stroke="#7d8069" strokeWidth={.009}/>
 {cash>0 && [-.16,-.055,.05,.15].map((x,i)=><g key={i} transform={`translate(${x},${-.30-.025*(i%2)}) rotate(${(i-2)*7})`}><rect x={-.065} y={-.035} width={.13} height={.07} rx={.004} fill={i%2?"#c7cda9":"#a3b78f"} stroke="#5e7154" strokeWidth={.004}/><rect x={-.012} y={-.034} width={.024} height={.068} fill="#d9c995"/></g>)}
 </g>;

// Wife is sorting while the teacher arrives carrying another bag. Each figure has
// different timing and a physical task; the kitchen is batch B's existing set.
const Arrival:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.money,walk=prog(g,beat(1121.42),beat(1122.52),easeInOut),put=prog(g,beat(1122.3),beat(1123.3),easeInOut);
 const cam:Cam={x:lerp(-.2,0,walk),y:1.38,z:-1.45,f:1450,shiftY:35};
 const teacher:Pose={...walkPose(f*.19,{amp:12,armAmp:8}),torso:lerp(4,12,put),shL:25,elL:60,shR:lerp(25,57,put),elR:lerp(48,30,put),hipL:lerp(5,9,walk),hipR:lerp(9,6,walk),knL:8,knR:8,breathe:breath(g,.08)};
 const wife:Pose={torso:8,neck:-12,shL:32,shR:50+7*Math.sin(f*.08),elL:45,elR:35,hipL:6,hipR:8,knL:8,knR:9,breathe:breath(g,.09)};
 const hand=handAt(teacher,TEACHER.height,.8,"R");
 return <AbsoluteFill><svg width={W} height={H}><KitchenRoom cam={cam} f={g} light={.8}/>
 <Actor cam={cam} x={.73} z={4.65} face={-1} view={.76} pose={wife} look={wifeLook({lookY:.5,lids:lidsOf(g,8),brow:.35})} pal={WIFE.pal} height={WIFE.height} rimLight="#ffe3ad"/>
 <Actor cam={cam} x={lerp(-1.4,-.92,walk)} z={4.4} view={.8} pose={teacher} look={teacherLook({yaw:.3,lookX:.4,lids:lidsOf(g,4),brow:.18})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffe3ad">
 {put<.95&&<g opacity={1-put} transform={`translate(${hand.x},${hand.y}) scale(.8)`}><Bag/></g>}</Actor>
 <Card cam={cam} x={1.3} z={3.9} blur={false}><g transform="scale(.8)"><Bag/></g></Card>
 <Card cam={cam} x={1.85} z={4.1} blur={false}><g transform="scale(.9)"><Bag/></g></Card>
 <KitchenTable cam={cam} x={.0} z={3.55} r={.72}/>
 {put>.1&&<Card cam={cam} x={-.14} y={.75} z={3.56} blur={false} opacity={put}><Bag open={.75} cash={1}/></Card>}
 {[0,1,2].map(i=><Card key={i} cam={cam} x={.26+i*.16} y={.755} z={3.5+i*.08} blur={false}><rect x={-.07} y={-.035} width={.14} height={.07} rx={.005} fill="#a8bd97" stroke="#536b4b" strokeWidth={.006}/><rect x={-.015} y={-.035} width={.03} height={.07} fill="#d7c89d"/></Card>)}
 <Card cam={cam} x={-2.0} z={1.1} blur={false} opacity={.8}><rect x={-.12} y={-2.8} width={.24} height={2.8} fill="#5a4b3b"/></Card>
 </svg><Motes f={g} n={24} color="#ffdfab" seed={71} drift={.22}/><Finish f={g} vig={.52} grain={.06} shadow="#26180f" gradeO={.14}/></AbsoluteFill>;
};

// Over-table money insert: sleeve, wrist, thumb and four fingers read clearly.
const Unpack:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.bags,reach=prog(g,beat(1124.62),beat(1125.18),easeInOut), pull=prog(g,beat(1125.32),beat(1126.32),easeInOut);
 const cam:Cam={x:0,y:1.04,z:2.5,f:1700,shiftY:-20};
 return <AbsoluteFill><svg width={W} height={H}><KitchenRoom cam={cam} f={g} light={.8}/><KitchenTable cam={cam} x={0} z={4} r={.8}/>
 <Card cam={cam} x={0} y={.75} z={4} blur={false}><g transform="scale(1.16)"><Bag open={1} cash={1}/></g></Card>
 <Card cam={cam} x={.24-.07*reach+.16*pull} y={.98-.09*reach+.16*pull} z={3.75} blur={false}><g transform="rotate(-23) scale(1.9)"><g opacity={pull}><rect x={-.065} y={-.16} width={.13} height={.07} rx={.005} fill="#b8c7a1" stroke="#596e51" strokeWidth={.004}/><rect x={-.012} y={-.16} width={.024} height={.07} fill="#dacb9d"/></g><HandBack pal={TEACHER.pal} curl={.12+.38*reach} thumb={.25} sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={.42}/></g></Card>
 </svg><Motes f={g} n={18} color="#ffe5b9" seed={72} drift={.2}/><Finish f={g} vig={.56} grain={.06} shadow="#26180f" gradeO={.15}/></AbsoluteFill>;
};

// Night backyard, house in the far layer; the broken coping leaks into the patio
// while water and reflected light move. No labels or copied signage.
const LeakingPool:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.pool,cam:Cam={x:0,y:1.55,z:-2,f:1250,shiftY:-125};
 const q=(x:number,y:number,z:number)=>project(cam,x,y,z);
 const ripple=Math.sin(f*.17);
 return <AbsoluteFill><svg width={W} height={H}><DDefs tone="night"/>
 <Sky cam={cam} f={g} tone="night" clouds={3}/>
 {/* Fence, trees and porch are behind the house and pool. */}
 <Card cam={cam} x={0} z={16} blur={false}><rect x={-20} y={-1.8} width={40} height={1.8} fill="#303b3c"/>{Array.from({length:40},(_,i)=><path key={i} d={`M${-19+i},0 v-1.8`} stroke="#56635c" strokeWidth={.035} opacity={.7}/>)}</Card>
 <Card cam={cam} x={-6.8} z={14} blur={false}><path d="M-.12,0 v-2.9" stroke="#2a3030" strokeWidth={.22}/><ellipse cy={-2.9} rx={1.3} ry={.85} fill="#223d38"/><ellipse cx={-.5} cy={-3.2} rx={.8} ry={.6} fill="#2c4e43"/></Card>
 <Card cam={cam} x={6.4} z={14} blur={false}><path d="M-.1,0 v-3.1" stroke="#252d2d" strokeWidth={.18}/><ellipse cy={-3.2} rx={1.15} ry={.82} fill="#284239"/></Card>
 <Card cam={cam} x={0} z={13} blur={false}><path d="M-7,0 V-2.8 L-5,-3.65 H4.5 L7,-2.8 V0 Z" fill="#514c49" stroke="#19212b" strokeWidth={.06}/><path d="M-7,-2.8 L-5,-3.65 H4.5 L7,-2.8 Z" fill="#40383b"/><rect x={-4.4} y={-2.1} width={1.65} height={1.3} fill="#ffd6a1" stroke="#2d343a" strokeWidth={.1}/><path d="M-3.55,-2.1 v1.3 M-4.4,-1.45 h1.65" stroke="#6b655c" strokeWidth={.06}/><rect x={1.4} y={-2.25} width={1.25} height={2.25} fill="#354047" stroke="#1b2229" strokeWidth={.09}/><rect x={3.4} y={-1.65} width={1.5} height={.9} fill="#a5c0cd" opacity={.38}/><path d="M-6.8,-.12 H6.8 M-6.8,-2.65 H6.8" stroke="#93857b" strokeWidth={.055} opacity={.6}/><circle cx={.92} cy={-2.05} r={.08} fill="#ffe3a2"/><path d="M-1.8,-.12 q-.18,-.65 .1,-.85 q.26,.2 .22,.85" fill="#415144"/><path d="M4.8,-.12 q-.26,-.8 .02,-1.0 q.3,.2 .24,1" fill="#3b5547"/></Card>
 <polygon points={planePts(cam,[[-20,.5],[20,.5],[20,13],[-20,13]])} fill="#776f64"/>
 {[1,2,3,4].map(i=><polygon key={i} points={planePts(cam,[[-12,i*2],[12,i*2],[12,i*2+.025],[-12,i*2+.025]],.006)} fill="#393d3d" opacity={.45}/>)}
 <Card cam={cam} x={4.25} z={7.5} blur={false}><path d="M-.58,0 L-.45,-.65 L.45,-.65 L.58,0 M-.45,-.65 L-.65,-1.15 M.45,-.65 L.27,-1.15" fill="none" stroke="#1f292b" strokeWidth={.055}/><path d="M-.65,-1.15 H.27 L.45,-.65 H-.45 Z" fill="#687d7b" stroke="#30393a" strokeWidth={.025}/><path d="M-.42,-1.1 L-.23,-.7 M-.13,-1.1 L.04,-.7" stroke="#b6c9bc" strokeWidth={.035}/></Card>
 <polygon points={planePts(cam,[[-3,3],[3,3],[3,9],[-3,9]],.03)} fill="#ddd1b7"/>
 <polygon points={planePts(cam,[[-2.72,3.25],[2.72,3.25],[2.72,8.75],[-2.72,8.75]],.035)} fill="#315c72"/>
 {Array.from({length:8},(_,i)=>{const z=3.7+i*.58, a=q(cam.x-2.25,.04,z),b=q(cam.x+2.25,.04,z+.12);return <path key={i} d={`M${a.x},${a.y} Q${(a.x+b.x)/2},${a.y-9-6*ripple} ${b.x},${b.y}`} fill="none" stroke="#b6dcec" strokeWidth={3-i*.2} opacity={.2}/>})}
 <polygon points={planePts(cam,[[.5,2.7],[1.4,2.7],[1.9,1.4],[-.1,1.4]],.04)} fill="#89b6c7" opacity={.44}/>
 {[0,1,2].map(i=>{const a=q(.65+i*.13,.07,2.1-i*.15);return <ellipse key={i} cx={a.x} cy={a.y} rx={14+i*6+Math.sin(g*.15+i)*4} ry={4+i*2} stroke="#c9ecf5" strokeWidth={2} fill="none" opacity={.55}/>})}
 <path d={`M${q(1,.05,3.15).x},${q(1,.05,3.15).y} L${q(.9,.05,2.85).x},${q(.9,.05,2.85).y} L${q(1.08,.05,2.58).x},${q(1.08,.05,2.58).y}`} fill="none" stroke="#2b3f4a" strokeWidth={3}/>
 <path d={`M${q(1,.07,2.65).x},${q(1,.07,2.65).y} Q${q(.8,.06,2.2).x},${q(.8,.06,2.2).y} ${q(.65,.06,1.6).x},${q(.65,.06,1.6).y}`} stroke="#b5d8e8" strokeWidth={4} opacity={.7} fill="none"/>
 {Array.from({length:3},(_,i)=>{const t=((g*.035+i*.32)%1), z=2.65-t*.9, a=q(1-.35*t,.08,z);return <ellipse key={`drop${i}`} cx={a.x} cy={a.y} rx={5} ry={3} fill="#d5f2ff" opacity={.75*(1-t*.4)}/>})}
 <Card cam={cam} x={-3.8} z={3.2} blur={false}><path d="M-.5,0 Q0,-1.5 .52,0 Z" fill="#253e36"/><path d="M-.22,-.25 Q0,-.8 .15,-1.05" fill="none" stroke="#577663" strokeWidth={.025}/></Card>
 </svg><Motes f={g} n={16} color="#d0e9fb" seed={73} drift={.2}/><Finish f={g} vig={.56} grain={.06} shadow="#0a1a30" gradeO={.15}/></AbsoluteFill>;
};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.money}><Summit/></Sequence><Sequence from={C.money} durationInFrames={C.bags-C.money}><Arrival/></Sequence><Sequence from={C.bags} durationInFrames={C.pool-C.bags}><Unpack/></Sequence><Sequence from={C.pool} durationInFrames={C.end-C.pool}><LeakingPool/></Sequence><Sequence from={0} durationInFrames={C.money}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.03}/></Sequence><Sequence from={C.money} durationInFrames={C.pool-C.money}><Audio src={staticFile("sfx/b_room_house.wav")} volume={.03}/></Sequence></AbsoluteFill>;
