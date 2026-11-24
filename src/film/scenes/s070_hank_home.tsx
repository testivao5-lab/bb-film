// SCENE 070 · "hank-home" · set: livingroom · narration 1171.96s → 1193.35s (21.39s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   Then the thing that ends it. Smaller than a person, quieter than a gun.
//   Hank got suspended for beating Jesse half to death, and then, with no badge and no gun, he got shot in a shopping-centre car park by two men in bulletproof vests, on his way to buy flowers for his wife. He is at home now, sorting a collection of minerals.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   Then@1172.56 the@1172.86 thing@1173.30 that@1173.52 ends@1173.65 it.@1173.89 Smaller@1174.80 than@1175.28
//   a@1175.43 person,@1175.52 quieter@1176.38 than@1176.60 a@1176.99 gun.@1177.10 Hank@1178.34 got@1178.49
//   suspended@1178.73 for@1178.95 beating@1179.49 Jesse@1179.73 half@1180.06 to@1180.36 death,@1180.54 and@1181.02
//   then,@1181.26 with@1181.63 no@1181.86 badge@1182.06 and@1182.34 no@1182.71 gun,@1182.93 he@1183.62 got@1183.67
//   shot@1183.80 in@1184.08 a@1184.38 shopping@1184.45 center@1184.73 car@1185.10 park@1185.36 by@1185.58
//   two@1185.91 men@1186.17 in@1186.41 bulletproof@1186.58 vests,@1187.04 on@1187.86 his@1188.04 way@1188.15
//   to@1188.34 buy@1188.49 flowers@1188.63 for@1188.88 his@1189.23 wife.@1189.34 He@1190.30 is@1190.65 at@1190.76
//   home@1190.88 now,@1191.04 sorting@1191.78 a@1191.97 collection@1192.17 of@1192.43 minerals.@1192.73
import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from "remotion";
import {Cam, Card, W, H, planePts, project} from "../../lib/camera";
import {breath, easeInOut, lerp, prog} from "../../lib/anim";
import {Pose} from "../../rig/Figure";
import {HandBack} from "../../rig/Hands";
import {BROTHER, PARTNER, RESTAURATEUR, brotherLook, partnerLook, restaurateurLook, tint, mixHex} from "../../rig/cast";
import {Actor} from "../../props/d_actor";
import {lidsOf, handAt, headAt} from "../../props/d_poses";
import {DDefs, Sky} from "../../env/d_shared";
import {Sofa, Shelf, LampFloor, Table} from "../../env/d_interiors";
import {Sedan} from "../../props/d_vehicle";
import {Finish, Motes} from "../../fx/Post";

export const META={n:70,id:"hank-home",set:"livingroom",cutIn:1171.96,cutOut:1193.35};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const C={assault:beat(1178.30),badge:beat(1181.45),park:beat(1183.52),home:beat(1190.22),end:beat(META.cutOut)};

// Warm, specific room: furniture, specimen cases, window and practical lamp are
// placed on separate depth planes. The small book is an unlettered visual seed.
const Living:React.FC<{cam:Cam;f:number}>=({cam,f})=><g><DDefs/>
 <polygon points={planePts(cam,[[-6,cam.z+.25],[6,cam.z+.25],[6,8],[-6,8]])} fill="#8e7965"/>
 {Array.from({length:11},(_,i)=><polygon key={i} points={planePts(cam,[[-6+i*1.2,cam.z+.3],[-5.98+i*1.2,cam.z+.3],[-5.98+i*1.2,8],[-6+i*1.2,8]],.003)} fill="#5d4b3d" opacity={.38}/>)}
 <Card cam={cam} x={0} z={8} blur={false}><rect x={-8} y={-3.3} width={16} height={3.3} fill="#bcb19d"/><path d="M-8,-.12 H8 M-8,-2.95 H8" stroke="#887966" strokeWidth={.06}/>
 <rect x={-3.2} y={-2.65} width={2.15} height={1.42} fill="#a8cedb" stroke="#eee2cf" strokeWidth={.09}/><path d="M-3.15,-1.42 L-2.7,-1.8 L-2.15,-1.8 L-1.8,-1.48 L-1.1,-1.48 V-1.25 H-3.15Z" fill="#8ba284"/><path d="M-2.14,-2.65 V-1.23 M-3.2,-1.95 H-1.05" stroke="#eee2cf" strokeWidth={.06}/>{[0,1,2,3,4].map(i=><path key={i} d={`M-3.18,${-2.6+i*.12} H-1.08`} stroke="#e8dec9" strokeWidth={.06}/>)}
 <rect x={1.5} y={-2.45} width={1.25} height={.75} fill="#795f4c" stroke="#504235" strokeWidth={.04}/><rect x={1.58} y={-2.37} width={1.09} height={.59} fill="#d1c6ae"/><path d="M1.65,-1.95 L1.9,-2.2 L2.05,-2.07 L2.23,-2.25 L2.6,-1.95" fill="#8ea081"/>
 <Shelf x={3.65} w={1.4} h={2.0} rows={4} seed={70}/></Card>
 <Card cam={cam} x={-1.4} z={6.8} blur={false}><Sofa x={0} w={2.3} color="#80715f" shade="#65584c"/><rect x={.45} y={-.78} width={.35} height={.29} rx={.04} fill="#b69d81" stroke="#665545" strokeWidth={.012}/><path d="M.5,-.73 L.75,-.54 M.75,-.73 L.5,-.54" stroke="#dfc8a8" strokeWidth={.012} opacity={.6}/><LampFloor x={-1.75} on={.6}/></Card>
 <Card cam={cam} x={2.7} z={6.4} blur={false}><rect x={-.45} y={-.72} width={.9} height={.72} fill="#735942" stroke="#3f3229" strokeWidth={.018}/><path d="M-.44,-.48 H.44 M-.44,-.24 H.44" stroke="#a18568" strokeWidth={.018}/><circle cx={0} cy={-.6} r={.025} fill="#d2b983"/><circle cx={0} cy={-.36} r={.025} fill="#d2b983"/></Card>
 </g>;
const Book:React.FC=()=><g><path d="M-.34,-.14 L.33,-.14 L.35,.12 L-.32,.12Z" fill="#e2d9bd" stroke="#4f463a" strokeWidth={.016}/><path d="M-.36,-.17 L.30,-.17 L.33,-.14 L-.34,-.14Z M-.32,.12 H.35 V.15 H-.32Z" fill="#53695c" stroke="#333d34" strokeWidth={.012}/><path d="M-.28,-.04 H.26 M-.28,.02 H.26 M-.28,.08 H.26" stroke="#aa9e87" strokeWidth={.006}/></g>;
const Mineral:React.FC<{c:string}>=({c})=><g><path d="M-.12,0 L-.14,-.08 L-.07,-.19 L.0,-.27 L.08,-.21 L.15,-.09 L.11,0Z" fill={c} stroke="#413e3c" strokeWidth={.009}/><path d="M0,-.27 L-.02,-.04 L.08,-.21 M-.14,-.08 L-.02,-.04 L.11,0" fill="none" stroke="#e4e2d3" strokeWidth={.012} opacity={.58}/></g>;
const Quiet:React.FC=()=>{
 const f=useCurrentFrame(),g=f,k=prog(g,beat(1173.3),C.assault,easeInOut),cam:Cam={x:lerp(.05,.2,k),y:lerp(1.18,.90,k),z:lerp(1.0,3.0,k),f:1500,shiftY:20};
 return <AbsoluteFill><svg width={W} height={H}><Living cam={cam} f={g}/>
 <Card cam={cam} x={.25} z={4.7} blur={false}><Table w={1.65} h={.6} top="#8c6f50" leg="#534132"/></Card>
 <polygon points={[project(cam,.04,.64,4.70),project(cam,.38,.64,4.70),project(cam,.38,.60,4.70),project(cam,.04,.60,4.70)].map(q=>`${q.x},${q.y}`).join(" ")} fill="#dbd2b9" stroke="#3a493d" strokeWidth={2}/><polygon points={planePts(cam,[[.04,4.70],[.38,4.70],[.38,4.94],[.04,4.94]],.64)} fill="#53695c" stroke="#333d34" strokeWidth={3}/><polygon points={planePts(cam,[[.08,4.76],[.34,4.76],[.34,4.78],[.08,4.78]],.645)} fill="#a9b39b"/>

 <Card cam={cam} x={1.0} y={.62} z={4.65} blur={false}><g transform="scale(.65)"><Mineral c="#9570a0"/></g></Card>
 <Card cam={cam} x={-2.5} z={2.3} blur={false}><path d="M-.12,0 V-2.8 H.12 V0Z" fill="#6e5a49" opacity={.8}/></Card>
 </svg><Motes f={g} n={20} color="#ffe7c4" seed={70} drift={.2}/><Finish f={g} vig={.55} grain={.065} shadow="#352719" gradeO={.12}/></AbsoluteFill>;
};

const Assault:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.assault,hit=prog(g,beat(1179.05),beat(1179.35),easeInOut)*(.4+.6*(.5+.5*Math.sin((g-beat(1179.18))*.12))),cam:Cam={x:.05,y:1.1,z:1.25,f:1450,shiftY:20};
 const p:Pose={torso:2+4*hit,neck:-6,shL:12,elL:38,shR:lerp(42,100,hit),elR:lerp(60,20,hit),hipL:3,hipR:-3,knL:3,knR:3,breathe:breath(g,.08)};
 const prone:Pose={torso:-4-4*hit,neck:8,shL:45,elL:55,shR:75,elR:65,hipL:3,hipR:-3,knL:3,knR:3,breathe:breath(g,.08)};
 return <AbsoluteFill><svg width={W} height={H}><DDefs/>
 <polygon points={planePts(cam,[[-12,1.5],[12,1.5],[12,8],[-12,8]])} fill="#97836c"/>
 <Card cam={cam} x={0} z={8} blur={false}><rect x={-8} y={-3} width={16} height={3} fill="#b3a894"/><rect x={-.9} y={-2.25} width={1.8} height={2.25} fill="#654e3f" stroke="#e3d5bd" strokeWidth={.08}/><rect x={-.72} y={-2.04} width={1.44} height={1.9} fill="#4d3e37"/><circle cx={.5} cy={-1.05} r={.035} fill="#e3cd8e"/><path d="M-8,-.1 H8 M-8,-2.85 H8" stroke="#776959" strokeWidth={.07}/><path d="M-3.5,-2.2 L-1.5,-2.2 L-.7,0 H-4.6Z" fill="#fff0cf" opacity={.09}/><rect x={-3.1} y={-1.7} width={.85} height={.65} fill="#8b7763" stroke="#e2d4bd" strokeWidth={.06}/><path d="M-3.02,-1.14 L-2.75,-1.5 L-2.62,-1.36 L-2.36,-1.56 L-2.3,-1.14Z" fill="#c6bda4"/><rect x={1.12} y={-1.43} width={.13} height={.20} rx={.01} fill="#e4dbc8" stroke="#8f8574" strokeWidth={.01}/><rect x={2.3} y={-1.75} width={1.05} height={.75} fill="#596b70" stroke="#e1d4bd" strokeWidth={.07}/><path d="M2.83,-1.75 V-1 M2.3,-1.36 H3.35" stroke="#dfd1ba" strokeWidth={.045}/></Card>
 <polygon points={planePts(cam,[[-1.4,4.45],[1.4,4.45],[1.2,6.7],[-1.2,6.7]],.004)} fill="#76675c" opacity={.55}/><Actor cam={cam} x={.4} z={5.35} face={-1} view={.9} pose={prone} look={partnerLook({yaw:.4,lids:.4,brow:.5,mouth:"flat"})} pal={PARTNER.pal} height={PARTNER.height} outfit="hoodie"/>
 <Actor cam={cam} x={-.35} z={5.25} view={.9} pose={p} look={brotherLook({yaw:.25,lookY:.5,brow:.6,lids:lidsOf(g,3)})} pal={BROTHER.pal} height={BROTHER.height} rimLight="#f4e3c4"/>
 <Card cam={cam} x={-2.4} z={2.5} blur={false}><path d="M-.1,0 V-2.8 H.1 V0Z" fill="#50443c"/></Card>
 </svg><Motes f={g} n={14} color="#fbe9ca" seed={71}/><Finish f={g} vig={.6} grain={.07} shadow="#2a211c" gradeO={.13}/></AbsoluteFill>;
};

const Surrender:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.badge,release=prog(g,beat(1181.75),beat(1182.3),easeInOut);
 return <AbsoluteFill><svg width={W} height={H}><rect width={W} height={H} fill="#6e685d"/><path d="M0,200 H1920 M0,760 H1920" stroke="#857d70" strokeWidth={8}/><path d="M0,340 H1920 M0,930 H1920" stroke="#514c45" strokeWidth={5} opacity={.5}/>
 <g transform="translate(850,500) rotate(-12)"><path d="M-130,-130 H130 V150 H-130Z" fill="#2a2420" stroke="#181617" strokeWidth={12}/><path d="M0,-110 L100,-64 L80,50 L0,120 L-80,50 L-100,-64Z" fill="#c0a363" stroke="#e3cc90" strokeWidth={9}/><circle r={42} fill="#756c51" stroke="#e6d8aa" strokeWidth={7}/><path d="M-43,66 H43" stroke="#e6d8aa" strokeWidth={8}/></g>
 <g transform="translate(1290,575) rotate(9)"><path d="M-220,-45 H110 L160,-20 V25 H25 L-20,145 H-95 L-80,18 H-220Z" fill="#29313a" stroke="#171b20" strokeWidth={12}/><path d="M-205,-28 H110 M-65,10 H10" stroke="#879197" strokeWidth={8}/></g>
 <g transform={`translate(${600+release*120},${900-release*90}) rotate(-28) scale(1200)`}><HandBack pal={BROTHER.pal} curl={.5-.3*release} thumb={.25} sleeve={BROTHER.pal.jacket} sleeveShade={BROTHER.pal.jacketShade} forearm={.5}/></g>
 </svg><Finish f={g} vig={.56} grain={.065} shadow="#272420" gradeO={.13}/></AbsoluteFill>;
};

const CarPark:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.park,shot=prog(g,beat(1183.72),beat(1184.25),easeInOut),flowers=prog(g,beat(1187.9),beat(1188.7),easeInOut),cam:Cam={x:lerp(.1,-.62,flowers),y:lerp(1.35,1.22,flowers),z:lerp(1.0,2.75,flowers),f:1450,shiftY:30};
 const duck=prog(g,beat(1184.35),beat(1185.7),easeInOut);
 const p:Pose={torso:2+4*duck,neck:-6,shL:lerp(15,-18,shot),elL:lerp(45,125,shot),shR:50-18*shot,elR:48,hipL:3+duck*28,hipR:-3+duck*20,knL:3+duck*27,knR:3+duck*20,breathe:breath(g,.08)};
 const hand=handAt(p,BROTHER.height,.9,"R");
 return <AbsoluteFill><svg width={W} height={H}><DDefs/><Sky cam={cam} f={g} tone="day" clouds={3}/>
 <polygon points={planePts(cam,[[-50,1.1],[50,1.1],[50,40],[-50,40]])} fill="#a8a79b"/>
 {[0,1,2,3,4].map(i=><polygon key={i} points={planePts(cam,[[-8+i*3,1.2],[-7.94+i*3,1.2],[-7.94+i*3,20],[-8+i*3,20]],.003)} fill="#dedbd0" opacity={.65}/>)}
 <Card cam={cam} x={0} z={24} blur={false}><path d="M-18,0 V-3.3 H18 V0Z" fill="#c4b59c"/><path d="M-18,-3.3 H18 V-2.85 H-18Z" fill="#806d59"/>{[-5,-1,3,7].map(x=><rect key={x} x={x} y={-2.5} width={2.1} height={1.8} fill="#526d72" stroke="#e3d8bf" strokeWidth={.05}/>)}</Card>
 <Card cam={cam} x={-5.4} z={11} blur={false}><Sedan body="#849295" shade="#596c70" driver={false} head={0} tail={0}/></Card>
 <Card cam={cam} x={3.7} z={11} blur={false}><Sedan body="#aa9f8e" shade="#766b5e" driver={false} head={0} tail={0}/></Card>
 <Card cam={cam} x={-.1} z={6.5} blur={false}><Sedan body="#52666a" shade="#36484c" head={0} tail={0} driver={false}/></Card>
 {/* Two original rigged figures in dark ballistic vests, both facing the brother. */}
 {[1.2,2.65].map((x,i)=>{const pose:Pose={torso:i?3:-2,neck:0,shL:i?12:24,elL:i?45:65,shR:i?79:84,elR:i?30:15,hipL:i?8:3,hipR:i?-5:-3,knL:i?8:3,knR:3,breathe:breath(g,.04)};const cast=i?PARTNER:RESTAURATEUR;const h=handAt(pose,cast.height,.9,"R"),head=headAt(pose,cast.height,.9);const flash=(g>=beat(1183.8)&&g<beat(1183.9))||(g>=beat(1184.12)&&g<beat(1184.2))||(g>=beat(1186.25)&&g<beat(1186.34));return <Actor key={i} cam={cam} x={x} z={6.15+i*.25} face={-1} view={.9} pose={pose} look={i?partnerLook({yaw:.5,brow:.5}):restaurateurLook({yaw:.5,brow:.5})} pal={tint(cast.pal,c=>mixHex(c,"#222927",.7))} height={cast.height}><g transform={`translate(${head.x},${head.y})`}><path d="M-.16,.08 Q-.18,-.22 0,-.22 Q.18,-.22 .17,.10 L.08,.16 H-.10Z" fill="#303936" stroke="#202723" strokeWidth={.012}/><path d="M-.12,-.035 H.12 V.015 H-.12Z" fill="#121c1d"/><circle cx={.055} cy={-.01} r={.009} fill="#aab2a6"/></g><path d="M-.15,-1.45 L.15,-1.45 L.2,-.96 H-.19Z" fill="#3d4945" stroke="#202925" strokeWidth={.016}/><path d="M-.15,-1.12 H.16" stroke="#67716a" strokeWidth={.015}/><g transform={`translate(${h.x+.04},${h.y})`}><path d="M0,-.025 H.22 L.26,0 H.08 L.05,.09 H0Z" fill="#222728" stroke="#0e1414" strokeWidth={.012}/>{flash&&<path d="M.26,0 L.40,-.07 L.35,0 L.43,.04 L.33,.03 L.37,.09Z" fill="#ffefa0"/>}</g></Actor>})}

 <Actor cam={cam} x={-.95} z={4.8} view={.9} pose={p} look={brotherLook({yaw:.2,lookX:.5,lookY:shot*.25,lids:lidsOf(g,4),brow:.7,mouth:shot>.5?"open":"flat",mouthOpen:shot*.35})} pal={BROTHER.pal} height={BROTHER.height} rimLight="#fff2d7">{shot>.8&&<path d="M-.07,-1.09 q-.025,-.024 -.004,-.04 q.02,-.012 .036,.007 q.03,.006 .018,.033 q-.01,.019 -.05,0Z" fill="#7b302c"/>}<g transform={`translate(${hand.x+.08},${hand.y+.03}) rotate(20)`}><path d="M0,0 L.05,.34 M0,0 L-.07,.29 M0,0 L.12,.32" stroke="#567b4c" strokeWidth={.018}/>{[[-.07,.29],[.05,.34],[.12,.32]].map(([x,y],i)=><g key={i} transform={`translate(${x},${y})`}>{[0,72,144,216,288].map(a=><ellipse key={a} cx={0} cy={-.035} rx={.018} ry={.034} transform={`rotate(${a})`} fill={i%2?"#e5c16d":"#d89a8c"}/>)}<circle r={.014} fill="#f8dea0"/></g>)}</g></Actor>
 {shot>.5&&shot<.78&&<rect width={W} height={H} fill="#fff5dc" opacity={.24}/>}
 </svg><Motes f={g} n={16} color="#fff8df" seed={72}/><Finish f={g} vig={.5} grain={.065} shadow="#38423c" gradeO={.09}/></AbsoluteFill>;
};

const Sorting:React.FC=()=>{
 const f=useCurrentFrame(),g=f+C.home,reach=prog(g,beat(1191.5),beat(1192.2),easeInOut),cam:Cam={x:0,y:1.28,z:1.55,f:1600,shiftY:30};
 const p:Pose={torso:7,neck:-12,shL:12,elL:45,shR:48+reach*8,elR:38,hipL:3,hipR:-3,knL:3,knR:3,breathe:breath(g,.08)};
 const hand=handAt(p,BROTHER.height,.82,"R");
 return <AbsoluteFill><svg width={W} height={H}><Living cam={cam} f={g}/>
 <Actor cam={cam} x={-.35} z={5.25} view={.82} pose={p} look={brotherLook({yaw:.25,lookY:.5,lids:lidsOf(g,8),brow:.25})} pal={BROTHER.pal} height={BROTHER.height} rimLight="#ffe6c1"><g transform={`translate(${hand.x+.06},${hand.y+.02}) scale(.35)`}><Mineral c="#a080b0"/></g></Actor>
 <Card cam={cam} x={.25} z={4.55} blur={false}><Table w={1.85} h={.76} top="#967353"/></Card>
 {[[-.35,"#a080b0"],[0,"#85aeb1"],[.35,"#c69a69"],[.7,"#8d9a73"]].map(([x,c],i)=><Card key={i} cam={cam} x={Number(x)} y={.78} z={4.49} blur={false}><g transform="scale(.62)"><Mineral c={String(c)}/></g></Card>)}
 <Card cam={cam} x={1.1} y={.77} z={4.48} blur={false}><path d="M-.22,0 H.22 V-.1 H-.22Z" fill="#c0a482" stroke="#574937" strokeWidth={.012}/><path d="M-.18,-.11 h.32" stroke="#ebdbbd" strokeWidth={.018}/></Card>
 </svg><Motes f={g} n={20} color="#ffe6c0" seed={73}/><Finish f={g} vig={.56} grain={.06} shadow="#342719" gradeO={.13}/></AbsoluteFill>;
};
export const Scene:React.FC=()=><AbsoluteFill>
 <Sequence from={0} durationInFrames={C.assault}><Quiet/></Sequence>
 <Sequence from={C.assault} durationInFrames={C.badge-C.assault}><Assault/></Sequence>
 <Sequence from={C.badge} durationInFrames={C.park-C.badge}><Surrender/></Sequence>
 <Sequence from={C.park} durationInFrames={C.home-C.park}><CarPark/></Sequence>
 <Sequence from={C.home} durationInFrames={C.end-C.home}><Sorting/></Sequence>
 <Sequence from={0} durationInFrames={C.assault}><Audio src={staticFile("sfx/b_room_house.wav")} volume={.025}/></Sequence>
 <Sequence from={C.park} durationInFrames={C.home-C.park}><Audio src={staticFile("sfx/a_carpass.wav")} volume={.025}/></Sequence>
 <Sequence from={C.home} durationInFrames={C.end-C.home}><Audio src={staticFile("sfx/b_room_house.wav")} volume={.025}/></Sequence>
 </AbsoluteFill>;
