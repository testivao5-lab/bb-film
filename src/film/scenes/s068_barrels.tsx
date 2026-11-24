// SCENE 068 · "barrels" · set: desertDusk · narration 1128.07s → 1149.38s (21.31s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   The number kept changing. In that junkyard it was seven hundred and thirty-seven thousand dollars. Now there are barrels, and he cannot spend a dollar of it. Not a car. Not a house. Not a pool in a yard, because somebody would ask a question.
//   It isn't power. It's inventory, sitting in the ground in a desert, waiting.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   The@1128.40 number@1128.78 kept@1128.96 changing.@1129.16 In@1130.14 that@1130.26 junkyard@1130.36 it@1130.86
//   was@1131.02 $737@1131.14 ,000.@1132.10 Now@1133.52 there@1133.96 are@1134.10 barrels,@1134.24 and@1135.32
//   he@1135.44 cannot@1135.54 spend@1135.76 a@1136.14 dollar@1136.38 of@1136.74 it.@1136.98 Not@1137.46 a@1137.72
//   car,@1137.96 not@1138.60 a@1138.80 house,@1138.90 not@1139.60 a@1139.84 pool@1139.92 in@1140.20 a@1140.40
//   yard@1140.48 because@1140.72 somebody@1141.02 would@1141.40 ask@1141.74 a@1142.04 question.@1142.16 It@1143.24
//   isn't@1143.72 power.@1143.96 It's@1145.00 inventory,@1145.16 sitting@1146.16 in@1146.48 the@1146.70
//   ground,@1146.78 in@1147.54 a@1147.66 desert,@1147.74 waiting.@1148.52
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Card, W, H, planePts, project } from "../../lib/camera";
import { breath, easeInOut, lerp, prog } from "../../lib/anim";
import { Figure, Pose } from "../../rig/Figure";
import { TEACHER, PARTNER, teacherLook, partnerLook } from "../../rig/cast";
import { YardSky, YardBack, YardGround, CarStack, WaitingCabBack, WaitingCabFore } from "../../env/b_junkyard";
import { StreetSky, House } from "../../env/b_street";
import { SoftDefs } from "../../env/b_common";
import { DDefs, Birds } from "../../env/d_shared";
import { DesertAll } from "../../env/d_sets";
import { Sedan } from "../../props/d_vehicle";
import { Barrel } from "../../props/d_props";
import { Actor } from "../../props/d_actor";
import { chairSit } from "../../props/b_pose";
import { handAt, lidsOf } from "../../props/d_poses";
import { Finish, Motes } from "../../fx/Post";

export const META = { n: 68, id: "barrels", set: "desertDusk", cutIn: 1128.07, cutOut: 1149.38 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);
const C={barrels:beat(1133.52), wish:beat(1137.46), ground:beat(1143.24), end:beat(META.cutOut)};

// Flash back to batch B's waiting car and wrecking yard: the teacher completes
// the original calculation in a physical notebook, not a title or overlay.
const Calculation:React.FC=()=>{
 const f=useCurrentFrame(),g=f,write=prog(g,beat(1130.7),beat(1132.1),easeInOut);
 const cam:Cam={x:0,y:1.3,z:-3.5,f:1300,shiftY:25};
 const pose=chairSit({torso:11+3*write,neck:8,shL:32,shR:34+8*write,elL:58,elR:48-8*write,hipL:64,hipR:66,knL:92,knR:94,breathe:breath(f,.08)});
 return <AbsoluteFill><svg width={W} height={H}><SoftDefs/><YardSky cam={cam} f={f}/><YardBack cam={cam} f={f}/><YardGround cam={cam} f={f}/><CarStack cam={cam} x={-3.8} z={11.5} seed={2}/><CarStack cam={cam} x={4.6} z={10.8} seed={5}/>
 <Actor cam={cam} x={2} z={8.2} face={-1} view={.8} pose={{torso:5,neck:0,shL:15,shR:30,elL:60,elR:45,hipL:4,hipR:8,knL:6,knR:8,breathe:breath(f,.08)}} look={partnerLook({lookX:.3,lids:lidsOf(f,5),brow:.2})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
 <rect width={W} height={H} fill="#e8dfc8" opacity={.08}/><WaitingCabBack/>
 <g transform="translate(690,710) rotate(-10)"><rect x={-152} y={-112} width={304} height={215} rx={4} fill="#f1df94" stroke="#6b5f2e" strokeWidth={3}/><rect x={-152} y={-112} width={304} height={23} fill="#702d28"/>{[-58,-25,8,41,74].map(y=><path key={y} d={`M-142,${y} H142`} stroke="#a6bac0" strokeWidth={1.5} opacity={.6}/>)}<path d="M-125,-55 q20,-12 38,0 t38,0 M-125,-20 q16,-10 32,0 t32,0 M-125,16 q18,-11 36,0 t36,0" fill="none" stroke="#444d5a" strokeWidth={3}/><text x={-10} y={61} fill="#263a4a" fontSize={34} fontFamily="sans-serif" opacity={write}>737,000</text><path d={`M-20,72 L${lerp(-20,130,write)},72`} fill="none" stroke="#263a4a" strokeWidth={3}/></g>
 <g transform="translate(470,1320) scale(610)"><Figure pose={pose} view={.58} look={teacherLook({yaw:.22,lookY:.48,lids:lidsOf(f,3),brow:.2,mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#fff0c2"/><g transform={`translate(${handAt(pose,TEACHER.height,.58,"R").x},${handAt(pose,TEACHER.height,.58,"R").y}) rotate(-25)`}><path d="M0,-.02 L.12,.16" stroke="#263441" strokeWidth={.012}/><path d="M.12,.16 l.01,.025" stroke="#d5c9a3" strokeWidth={.006}/></g></g>
 <WaitingCabFore/>
 </svg><Motes f={f} n={22} color="#ffedc8" seed={75} drift={.4}/><Finish f={f} vig={.56} grain={.06} shadow="#3a2a10" gradeO={.12}/></AbsoluteFill>;
};

// Ground-plane excavation and near lip occlude drum bottoms naturally.
const Pit:React.FC<{cam:Cam; x:number; z:number}> = ({cam,x,z}) => <g>
 <polygon points={planePts(cam,[[x-1.4,z-.95],[x+1.4,z-.95],[x+1.45,z+.95],[x-1.45,z+.95]],.015)} fill="#a77e68"/>
 <polygon points={planePts(cam,[[x-1.2,z-.75],[x+1.2,z-.75],[x+1.22,z+.78],[x-1.22,z+.78]],.022)} fill="#3d2f45"/>
 <polygon points={planePts(cam,[[x-1.05,z-.55],[x+1.05,z-.55],[x+1.06,z+.62],[x-1.06,z+.62]],.025)} fill="#261f30"/>
 </g>;
const PitLip:React.FC<{cam:Cam;x:number;z:number}> = ({cam,x,z}) => <polygon points={planePts(cam,[[x-1.4,z-.96],[x+1.4,z-.96],[x+1.15,z-.66],[x-1.15,z-.66]],.04)} fill="#a67a66"/>;
const PitMask:React.FC<{cam:Cam;x:number;z:number}> = ({cam,x,z}) => {
 const a=project(cam,x-1.4,.035,z-.84), b=project(cam,x+1.4,.035,z-.84);
 return <defs><clipPath id="h068-pit-mask"><polygon points={`0,0 ${W},0 ${W},${b.y} ${b.x},${b.y} ${a.x},${a.y} 0,${a.y}`}/></clipPath></defs>;
};

// Dusk: the teacher is physically pushing a drum towards a pit. The other
// drums stay grounded at metre scale, with the car behind them for scale.
const Drums:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.barrels,push=prog(g,beat(1133.75),beat(1135.15),easeInOut),cam:Cam={x:lerp(-.1,.1,push),y:1.12,z:.0,f:1600,shiftY:25};
 const x=lerp(-1.55,-1.0,push),z=5.8;
 const pose:Pose={torso:lerp(12,22,push),neck:-8,shL:50,shR:65,elL:25,elR:24,hipL:12,hipR:22,knL:18,knR:25,breathe:breath(g,.15)};
 return <AbsoluteFill><svg width={W} height={H}><DDefs tone="dusk"/><DesertAll cam={cam} f={g} tone="dusk" sun={[1500,230]} rut/><Pit cam={cam} x={.75} z={6.4}/>
 <Card cam={cam} x={2.4} z={10.5} blur={false}><Sedan body="#564543" shade="#322d36" driver={false}/></Card>
 {[[-.2,7.5],[.5,7.7],[1.2,7.6],[1.9,7.7]].map(([bx,bz],i)=><Card key={i} cam={cam} x={bx} z={bz} blur={false}><Barrel open={0} cash={0} light={.7}/></Card>)}
 <Actor cam={cam} x={x} z={z} view={.9} pose={pose} look={teacherLook({yaw:.3,lookY:.5,lids:lidsOf(g,3),brow:.35,sweat:.25})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffc990"/>
 <Card cam={cam} x={x+.54} z={z} blur={false}><Barrel open={.03} cash={0} light={.8}/></Card>
 <Birds f={g} n={2} y={180} sp={.3} tone="#352c35"/>
 </svg><Motes f={g} n={32} color="#f7cbaa" seed={76} drift={.6}/><Finish f={g} vig={.5} grain={.06} shadow="#2a1838" gradeO={.15}/></AbsoluteFill>;
};

// One lateral move across real, correctly-scaled objects: car at 1137.96,
// house at 1138.90, then the pool in the yard at 1139.92. No symbols or text.
const Things:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.wish,car=prog(g,beat(1137.46),beat(1138.5),easeInOut),house=prog(g,beat(1138.10),beat(1138.90),easeInOut),pool=prog(g,beat(1139.10),beat(1139.92),easeInOut);
 const cam:Cam={x:-3.2+3.2*house+3.5*pool,y:1.2,z:-1,f:2100,shiftY:15};
 return <AbsoluteFill><svg width={W} height={H}><SoftDefs/><StreetSky cam={cam} f={g}/>
 <polygon points={planePts(cam,[[-60,-3],[60,-3],[60,80],[-60,80]])} fill="#859f62"/>
 <polygon points={planePts(cam,[[-5,-3],[-.7,-3],[-.7,15],[-5,15]],.01)} fill="#a5a29a"/>
 {[-3,0,3,6,9].map(z=><polygon key={z} points={planePts(cam,[[-5,z],[-.7,z],[-.7,z+.025],[-5,z+.025]],.015)} fill="#777d76" opacity={.35}/>)}
 <House cam={cam} x={0} z={13} w={8.6} h={2.7} fence={false}/>
 <Card cam={cam} x={-3.2} z={7.5} blur={false}><Sedan body="#725247" shade="#443330" light="#a88169" driver={false}/></Card>
 <polygon points={planePts(cam,[[2.2,5.4],[5.5,5.4],[5.5,10],[2.2,10]],.04)} fill="#d4c6a8"/><polygon points={planePts(cam,[[2.4,5.6],[5.3,5.6],[5.3,9.8],[2.4,9.8]],.045)} fill="#6ca4b5"/>
 {[0,1,2,3].map(i=>{const a=project(cam,2.65,.05,6+i*.85),b=project(cam,5.0,.05,6+i*.85);return <path key={i} d={`M${a.x},${a.y} Q${(a.x+b.x)/2},${a.y-5} ${b.x},${b.y}`} fill="none" stroke="#e7faf7" strokeWidth={2} opacity={.5}/>})}
 <Card cam={cam} x={5.8} z={4.8} blur={false}><path d="M-.3,0 q.3,-.8 .6,0 Z" fill="#5b7647"/><path d="M0,0 V-.7" fill="none" stroke="#9bb778" strokeWidth={.035}/></Card>
 <Card cam={cam} x={-5.7} z={4.5} blur={false}><path d="M-.5,0 Q0,-1.6 .5,0 Z" fill="#506c3c"/></Card>
 <Birds f={g} n={3} y={170} sp={.4} tone="#50473d"/>
 </svg><Motes f={g} n={16} color="#ffefcd" seed={77} drift={.3}/><Finish f={g} vig={.47} grain={.055} shadow="#3a2a10" gradeO={.1}/></AbsoluteFill>;
};

// At the pit, shovel and hand follow the same rig wrist. Falling sand and
// the dimming drum tops convey the inventory being buried and left waiting.
const Burial:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.ground,t=prog(g,beat(1145.16),beat(1147.5),easeInOut), stroke=Math.sin(f*.13),cam:Cam={x:lerp(.1,.25,t),y:1.0,z:.1,f:1500,shiftY:10};
 const pose:Pose={torso:22+6*stroke,neck:-10,shL:48,shR:66+8*stroke,elL:40,elR:25,hipL:8,hipR:-7,knL:8,knR:7,breathe:breath(g,.15)};
 const hand=handAt(pose,TEACHER.height,.9,"R");
 return <AbsoluteFill><svg width={W} height={H}><DDefs tone="dusk"/><DesertAll cam={cam} f={g} tone="dusk" sun={[1460,220]}/><Pit cam={cam} x={.55} z={6.1}/>
 <PitMask cam={cam} x={.55} z={6.1}/><g clipPath="url(#h068-pit-mask)">{[[-.1,6.12],[.65,6.15],[1.35,6.18]].map(([x,z],i)=><Card key={i} cam={cam} x={x} y={-.15-.28*t} z={z} blur={false}><Barrel open={0} cash={0} light={.55}/></Card>)}</g>
 <PitLip cam={cam} x={.55} z={6.1}/>
 <Actor cam={cam} x={-1.15} z={5.6} view={.9} pose={pose} look={teacherLook({lookY:.6,lids:lidsOf(g,4,.22),brow:.45,sweat:.4,dirt:.2})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffcfaa">
 <g transform={`translate(${hand.x},${hand.y}) rotate(${25+15*stroke})`}><path d="M0,0 L.5,.76" stroke="#735637" strokeWidth={.04}/><path d="M.44,.70 L.58,.78 L.53,.91 L.40,.85 Z" fill="#8b999e" stroke="#2b2d2b" strokeWidth={.015}/></g>
 </Actor>
 {Array.from({length:12},(_,i)=>{const phase=(g*1.3+i*7)%45, p=project(cam,.15+i*.11,.15+Math.sin(phase/45*Math.PI)*.4,5.9+i*.035);return <circle key={i} cx={p.x} cy={p.y} r={2+i%3} fill="#c99a79" opacity={.35*(1-phase/45)}/>})}
 </svg><Motes f={g} n={28} color="#edc1a5" seed={78} drift={.55}/><Finish f={g} vig={.53} grain={.065} shadow="#2a1838" gradeO={.16}/></AbsoluteFill>;
};
export const Scene:React.FC=()=> <AbsoluteFill><Sequence from={0} durationInFrames={C.barrels}><Calculation/></Sequence><Sequence from={C.barrels} durationInFrames={C.wish-C.barrels}><Drums/></Sequence><Sequence from={C.wish} durationInFrames={C.ground-C.wish}><Things/></Sequence><Sequence from={C.ground} durationInFrames={C.end-C.ground}><Burial/></Sequence><Sequence from={C.barrels} durationInFrames={C.wish-C.barrels}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence><Sequence from={C.ground} durationInFrames={C.end-C.ground}><Audio src={staticFile("sfx/d_desert_wind.wav")} volume={.035}/></Sequence></AbsoluteFill>;
