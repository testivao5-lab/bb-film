// SCENE 069 · "launder" · set: carwash · narration 1149.38s → 1171.96s (22.58s)
// OWNER: batch C (see docs/AGENT_BRIEF.md). Replace the placeholder with the real scene.
// Frames inside this component are LOCAL: frame 0 = cut-in. Use beat(s) to convert a narration second to a local frame.
//
// Narration:
//   His wife gets him out. The money that buys the car wash they hide in came out of a man whose books she kept. They launder through the till, and the first thing he does as the new owner is refuse to let the previous man take his framed first dollar off the wall. Then he spends that dollar on a soda from the vending machine.
//   Eventually she stops leaving the house at all.
//
// Word timestamps (absolute seconds, from timing/words.json):
//   His@1150.00 wife@1150.48 gets@1150.72 him@1151.00 out.@1151.16 The@1151.86 money@1152.06 that@1152.26
//   buys@1152.42 the@1152.64 car@1152.84 wash@1153.08 they@1153.32 hide@1153.56 in@1153.82 came@1154.04
//   out@1154.40 of@1154.68 a@1154.80 man@1154.88 whose@1155.12 books@1155.34 she@1155.66 kept.@1156.02
//   They@1157.08 laundered@1157.22 through@1157.68 the@1157.86 till,@1158.00 and@1158.66 the@1158.68 first@1158.74
//   thing@1158.94 he@1159.16 does@1159.34 as@1159.52 the@1159.74 new@1159.90 owner@1160.06 is@1160.36
//   refuse@1160.80 to@1161.04 let@1161.40 the@1161.52 previous@1161.64 man@1161.86 take@1162.24 his@1162.48
//   framed@1162.68 first@1162.88 dollar@1163.22 off@1163.66 the@1163.90 wall.@1164.04 Then@1165.17 he@1165.39
//   spends@1165.63 that@1165.88 dollar@1166.19 on@1166.52 a@1166.69 soda@1166.76 from@1166.95 the@1167.26
//   vending@1167.36 machine.@1167.47 Eventually,@1169.12 she@1170.02 stops@1170.13 leaving@1170.38 the@1170.65
//   house@1170.88 at@1171.04 all.@1171.21
import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from "remotion";
import {Cam, Card, W, H, planePts} from "../../lib/camera";
import {breath, easeInOut, lerp, prog} from "../../lib/anim";
import {Pose} from "../../rig/Figure";
import {HandBack} from "../../rig/Hands";
import {TEACHER, WIFE, RESTAURATEUR, teacherLook, wifeLook, restaurateurLook} from "../../rig/cast";
import {Actor} from "../../props/d_actor";
import {handAt, lidsOf} from "../../props/d_poses";
import {KitchenRoom, KitchenTable, KitchenChair} from "../../env/b_kitchen";
import {Motes, Finish} from "../../fx/Post";

export const META={n:69,id:"launder",set:"carwash",cutIn:1149.38,cutOut:1171.96};
export const beat=(sec:number)=>Math.round((sec-META.cutIn)*30);
const cuts={till:beat(1156.9),frame:beat(1161.18),vend:beat(1164.58),home:beat(1168.65),end:beat(META.cutOut)};

// A deliberately unbranded office: street seen through a window, tiled wall,
// practical counter lights and a near counter. The money passes through a ledger
// and a till rather than an explanatory title card.
const Office:React.FC<{cam:Cam;f:number}>=({cam,f})=><g>
 <defs><linearGradient id="h69Wall" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ddd1b9"/><stop offset="1" stopColor="#9c927e"/></linearGradient><linearGradient id="h69Glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9ac9dc"/><stop offset="1" stopColor="#dce9dc"/></linearGradient></defs>
 <polygon points={planePts(cam,[[-20,cam.z+.2],[20,cam.z+.2],[20,9],[-20,9]])} fill="#8e897c"/>
 {[1,2,3,4,5,6].map(i=><polygon key={i} points={planePts(cam,[[-12,i+cam.z],[12,i+cam.z],[12,i+cam.z+.018],[-12,i+cam.z+.018]],.003)} fill="#66645e" opacity={.42}/>)}
 <Card cam={cam} x={0} z={8} blur={false}><rect x={-10} y={-3.2} width={20} height={3.2} fill="url(#h69Wall)"/>
 <path d="M-10,-1 H10 M-10,-.75 H10 M-10,-.5 H10 M-10,-.25 H10" stroke="#b3b3a3" strokeWidth={.012}/>
 {Array.from({length:30},(_,i)=><path key={i} d={`M${-10+i*.7},0 v-1`} stroke="#b5b5a4" strokeWidth={.012}/>)}
 <rect x={-3.6} y={-2.65} width={2.5} height={1.55} fill="#6d7977" stroke="#554d42" strokeWidth={.07}/><rect x={-3.48} y={-2.53} width={2.26} height={1.28} fill="url(#h69Glass)"/>
 <path d="M-3.48,-1.55 L-3.0,-1.85 L-2.56,-1.85 L-2.32,-1.57 H-1.22 V-1.25 H-3.48Z" fill="#b9b6a3"/>
 {/* across the glass: a car at the bay, a striped wash brush and a soft daylight reflection */}
 <path d="M-3.33,-1.42 L-3.23,-1.56 L-3.08,-1.69 H-2.7 L-2.58,-1.54 L-2.49,-1.5 V-1.38 H-3.33Z" fill="#738581" stroke="#566563" strokeWidth={.025}/><circle cx={-3.18} cy={-1.38} r={.075} fill="#334746"/><circle cx={-2.65} cy={-1.38} r={.075} fill="#334746"/><path d="M-3.45,-2.48 H-3.32 V-1.8 H-3.45 M-3.46,-2.35 H-3.31 M-3.46,-2.2 H-3.31 M-3.46,-2.05 H-3.31" stroke="#608b97" strokeWidth={.04}/><path d="M-3.42,-2.5 L-2.92,-2.5 L-3.45,-1.42Z" fill="#fff" opacity={.13}/><path d="M-2.35,-2.53 V-1.25 M-3.48,-1.75 H-1.22" stroke="#6b7672" strokeWidth={.06}/>
 <rect x={.4} y={-2.6} width={1.75} height={.12} fill="#695a48"/><rect x={.46} y={-2.51} width={.33} height={.55} fill="#6a7d80"/><rect x={.82} y={-2.51} width={.29} height={.55} fill="#bd956d"/><rect x={1.14} y={-2.51} width={.32} height={.55} fill="#7a8976"/><rect x={1.49} y={-2.51} width={.38} height={.55} fill="#c7b5a0"/>
 <path d="M-1.08,-1.25 L-.2,-1.25 L.42,0 H-.84Z" fill="#fff1c9" opacity={.09}/><rect x={2.65} y={-2.27} width={.8} height={.72} fill="#c9b99e" stroke="#6e5b46" strokeWidth={.04}/><path d="M2.78,-2.12 h.48 M2.78,-2.02 h.31 M2.78,-1.91 h.42 M2.78,-1.8 h.38" stroke="#928475" strokeWidth={.018}/>
 <rect x={-1.0} y={-3.05} width={1.65} height={.12} rx={.06} fill="#f5e8c5"/><path d="M-.8,-2.9 L-2,-.5 H2 L.5,-2.9Z" fill="#fff3c5" opacity={.07}/></Card>
 {/* foreground side doorway */}
 <Card cam={cam} x={-3.1} z={3.0} blur={false} opacity={.8}><rect x={-.11} y={-3.2} width={.22} height={3.2} fill="#585044"/></Card>
 </g>;
const Counter:React.FC<{cam:Cam;register?:boolean}>=({cam,register=false})=><Card cam={cam} x={0} z={4.5} blur={false}>
 <path d="M-3,0 V-.95 H3 V0Z" fill="#675b4c" stroke="#332c28" strokeWidth={.025}/><path d="M-3,-.95 H3 V-.83 H-3Z" fill="#b8a88e"/><path d="M-3,-.78 H3 M-3,-.13 H3" stroke="#8a7a66" strokeWidth={.024}/>
 {register&&<g transform="translate(-1,0)"><rect x={1.25} y={-1.35} width={.68} height={.39} rx={.03} fill="#38474c" stroke="#1f2929" strokeWidth={.015}/><path d="M1.31,-1.31 H1.85 V-1.17 H1.31Z" fill="#91b3a7"/><path d="M1.34,-1.1 H1.84 M1.34,-1.04 H1.84" stroke="#bdc9bd" strokeWidth={.02}/>
 </g>}<g transform="translate(-1.7,-.96)"><rect x={-.1} y={-.23} width={.2} height={.23} rx={.02} fill="#658a7c" stroke="#465f57" strokeWidth={.012}/><rect x={-.07} y={-.31} width={.14} height={.08} fill="#c7c5a4"/><rect x={.2} y={-.17} width={.16} height={.17} fill="#d1c4a7"/><path d="M.2,-.17 q.08,-.12 .16,0" fill="#e8dec2"/></g><rect x={-.6} y={-1.00} width={.5} height={.03} fill="#e1d6bf"/><path d="M-.55,-1.04 h.39 M-.55,-1.08 h.39" stroke="#ece3ce" strokeWidth={.018}/>
 </Card>;
const Bill:React.FC=()=><g><rect x={-.16} y={-.08} width={.32} height={.16} rx={.009} fill="#ced4aa" stroke="#61775c" strokeWidth={.006}/><rect x={-.145} y={-.065} width={.29} height={.13} fill="none" stroke="#899b76" strokeWidth={.004}/><ellipse rx={.038} ry={.052} fill="#8c9d78"/><path d="M-.12,-.04 h.06 M.06,.04 h.06" stroke="#78916f" strokeWidth={.006}/></g>;
const Frame:React.FC=()=><g><rect x={-.31} y={-.20} width={.62} height={.4} fill="#523e30" stroke="#2d2722" strokeWidth={.018}/><rect x={-.27} y={-.16} width={.54} height={.32} fill="#e0d5b8"/><Bill/><path d="M-.25,-.14 L.1,-.14 L-.2,.14 H-.25Z" fill="#fff" opacity={.18}/></g>;
const Ledger:React.FC=()=><g><rect x={-.3} y={-.22} width={.6} height={.44} fill="#784c36" stroke="#342720" strokeWidth={.012}/><rect x={-.27} y={-.19} width={.54} height={.38} fill="#e4d4b1"/><path d="M0,-.19 V.19 M-.25,-.11 H.25 M-.25,-.04 H.25 M-.25,.03 H.25 M-.25,.10 H.25" stroke="#aca28b" strokeWidth={.009}/><path d="M-.21,-.14 h.13 M.05,-.06 h.12 M-.21,.07 h.10 M.06,.14 h.13" stroke="#695b50" strokeWidth={.012}/></g>;

// Bookkeeping / purchase, with her hand resting on the paperwork.
const Books:React.FC=()=>{
 const f=useCurrentFrame(),g=f, read=prog(g,beat(1151.86),beat(1152.6),easeInOut),point=prog(g,beat(1154.85),beat(1155.8),easeInOut);
 const cam:Cam={x:lerp(-.35,-.2,read),y:1.34,z:lerp(1.65,1.85,read),f:1550,shiftY:80};
 const p:Pose={torso:10,neck:-12,shL:12,elL:38,shR:50+point*12,elR:35,hipL:4,hipR:9,knL:6,knR:8,breathe:breath(g,.08)};
 return <AbsoluteFill><svg width={W} height={H}><Office cam={cam} f={g}/>
 <Actor cam={cam} x={-.55} z={5.45} view={.75} pose={p} look={wifeLook({yaw:.2,lookY:.55,brow:.25,lids:lidsOf(g,9)})} pal={WIFE.pal} height={WIFE.height} rimLight="#fff0cd"><g transform={`translate(${handAt(p,WIFE.height,.75,"R").x+.08},${handAt(p,WIFE.height,.75,"R").y+.05}) rotate(-8) scale(.65)`}><Ledger/></g></Actor>
 <Counter cam={cam}/><Card cam={cam} x={-.1} y={.98} z={4.49} blur={false}><g transform="scale(.45)"><Bill/></g></Card>
 </svg><Motes f={g} n={18} color="#fff0cf" seed={69} drift={.25}/><Finish f={g} vig={.48} grain={.06} shadow="#30251d" gradeO={.08}/></AbsoluteFill>;
};

// Till and transfer of control: two very different reactions and a live register.
const Till:React.FC=()=>{
 const f=useCurrentFrame(),g=f+cuts.till,click=prog(g,beat(1157.35),beat(1158.1),easeInOut),refuse=prog(g,beat(1160.25),beat(1160.95),easeInOut);
 const cam:Cam={x:.55,y:1.33,z:1.65,f:1550,shiftY:80};
 const tp:Pose={torso:5,neck:-5,shL:10,elL:45,shR:48+refuse*25,elR:38-refuse*10,hipL:4,hipR:8,knL:6,knR:7,breathe:breath(g,.08)};
 const wp:Pose={torso:9,neck:-11,shL:12,elL:38,shR:48+click*8,elR:38,hipL:8,hipR:5,knL:7,knR:6,breathe:breath(g,.07)};
 return <AbsoluteFill><svg width={W} height={H}><Office cam={cam} f={g}/>
 <Actor cam={cam} x={-.38} z={5.5} view={.72} pose={wp} look={wifeLook({yaw:.3,lookY:.5,lids:lidsOf(g,8),brow:.12})} pal={WIFE.pal} height={WIFE.height} rimLight="#fff0cb"/>
 <Actor cam={cam} x={1.15} z={5.55} face={-1} view={.8} pose={tp} look={teacherLook({yaw:.25,lookX:.35,brow:.27,lids:lidsOf(g,1)})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffe9c2"/>
 <Counter cam={cam} register/><Card cam={cam} x={.55} y={1.0} z={4.38} blur={false}><path d={`M-.38,0 H.38 V${.18*click} H-.38Z`} fill="#333f40" stroke="#182123" strokeWidth={.012}/>{click>.3&&[-.23,-.07,.09].map((x,i)=><g key={i} transform={`translate(${x},.07) scale(.45)`}><Bill/></g>)}</Card>
 </svg><Motes f={g} n={16} color="#fff0cf" seed={74}/><Finish f={g} vig={.48} grain={.06} shadow="#30251d" gradeO={.08}/></AbsoluteFill>;
};

// A framed dollar, old owner reaching and the teacher's clear stop gesture.
const Refusal:React.FC=()=>{
 const f=useCurrentFrame(),g=f+cuts.frame,stop=prog(g,beat(1161.64),beat(1162.4),easeInOut);
 const cam:Cam={x:0,y:1.43,z:2.1,f:1650,shiftY:75};
 const tp:Pose={torso:3,neck:-4,shL:12,elL:40,shR:lerp(50,83,stop),elR:lerp(48,10,stop),hipL:5,hipR:7,knL:7,knR:8,breathe:breath(g,.06)};
 const old:Pose={torso:8,neck:-7,shL:14,elL:45,shR:lerp(35,68,stop),elR:lerp(50,20,stop),hipL:7,hipR:5,knL:6,knR:8,breathe:breath(g,.08)};
 return <AbsoluteFill><svg width={W} height={H}><Office cam={cam} f={g}/>
 <Card cam={cam} x={0} y={1.72} z={7.8} blur={false}><Frame/></Card>
 <Actor cam={cam} x={-.92} z={5.5} view={.9} pose={tp} look={teacherLook({yaw:.35,lookX:.5,brow:.42,lids:lidsOf(g,6)})} pal={TEACHER.pal} height={TEACHER.height} rimLight="#ffeacb"/>
 <Actor cam={cam} x={1.06} z={5.7} face={-1} view={.9} pose={old} look={restaurateurLook({yaw:.25,lookX:.5,brow:.4,lids:lidsOf(g,4)})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height} rimLight="#ffeacb"/>
 <Counter cam={cam}/><Card cam={cam} x={0} y={1.73} z={7.7} blur={false}><Frame/></Card>
 </svg><Motes f={g} n={15} color="#fff0cf" seed={75}/><Finish f={g} vig={.5} grain={.06} shadow="#30251d" gradeO={.08}/></AbsoluteFill>;
};

// Close insert: a real hand feeds the same bill to an invented, unbranded machine.
const Vending:React.FC=()=>{
 const f=useCurrentFrame(),g=f+cuts.vend,feed=prog(g,beat(1165.4),beat(1166.5),easeInOut),can=prog(g,beat(1166.7),beat(1167.5),easeInOut);
 return <AbsoluteFill><svg width={W} height={H} viewBox="0 0 1920 1080">
 <rect width={W} height={H} fill="#343e42"/><rect x={240} y={-120} width={1440} height={1330} rx={48} fill="#3b6572" stroke="#1a282e" strokeWidth={20}/><rect x={305} y={0} width={960} height={680} fill="#1b343c" stroke="#72949b" strokeWidth={14}/>
 {Array.from({length:12},(_,i)=><g key={i} transform={`translate(${365+(i%4)*205},${75+Math.floor(i/4)*180})`}><rect x={0} y={0} width={110} height={130} rx={12} fill={["#c96548","#cbb35f","#85a69e"][i%3]} stroke="#1f353a" strokeWidth={5}/><path d="M8,33 h94 M8,96 h94" stroke="#e9e2c3" strokeWidth={8} opacity={.6}/><ellipse cx={55} cy={2} rx={48} ry={9} fill="#d3d1bc"/></g>)}
 <path d="M317,0 L845,0 L365,670 H317Z" fill="#e1f5f5" opacity={.08}/><rect x={1310} y={150} width={260} height={350} rx={12} fill="#b5c6b8"/><circle cx={1370} cy={230} r={23} fill="#617c6e"/><circle cx={1450} cy={230} r={23} fill="#c1aa77"/><circle cx={1530} cy={230} r={23} fill="#a77967"/><rect x={1335} y={330} width={210} height={37} rx={7} fill="#1c292b"/><path d="M1344,348 H1536" stroke="#d5debc" strokeWidth={4}/>
 <rect x={660} y={760} width={510} height={190} rx={12} fill="#15272c" stroke="#8ba4a2" strokeWidth={12}/><path d="M670,780 H1160 V840 Q900,900 670,840Z" fill="#263b40"/>
 {feed<.96&&<g transform={`translate(${1120+220*feed},${376-22*feed}) rotate(-8) scale(520)`}><Bill/></g>}
 <g transform={`translate(${1000+235*feed},${520-120*feed}) rotate(30) scale(1250)`}><HandBack pal={TEACHER.pal} curl={.28+feed*.35} thumb={.28} sleeve={TEACHER.pal.jacket} sleeveShade={TEACHER.pal.jacketShade} forearm={.55}/></g>
 <g opacity={can} transform={`translate(900,${858+20*can})`}><rect x={-62} y={-70} width={124} height={135} rx={12} fill="#c96f52" stroke="#56392f" strokeWidth={5}/><ellipse cy={-70} rx={57} ry={11} fill="#e6e2ca"/><path d="M-54,-20 H54" stroke="#f2e3c4" strokeWidth={12}/></g>
 </svg><Finish f={g} vig={.49} grain={.06} shadow="#10232b" gradeO={.08}/></AbsoluteFill>;
};

// The final cut removes the busy shop: the wife alone in the familiar kitchen,
// one arm braced against the table as the daylight disappears into night.
const House:React.FC=()=>{
 const f=useCurrentFrame(),g=f+cuts.home,k=prog(g,cuts.home,cuts.end,easeInOut);
 const cam:Cam={x:lerp(.35,.25,k),y:1.34,z:lerp(1.0,1.35,k),f:1600,shiftY:45};
 const p:Pose={torso:12,neck:-13,shL:12,elL:45,shR:58,elR:30,hipL:6,hipR:8,knL:7,knR:8,breathe:breath(g,.05)};
 return <AbsoluteFill><svg width={W} height={H}><KitchenRoom cam={cam} f={g} light={.65}/><KitchenChair cam={cam} x={1.4} z={4.55}/>
 <Actor cam={cam} x={-.25} z={4.85} view={.8} pose={p} look={wifeLook({yaw:.22,lookY:.5,brow:.4,lids:lidsOf(g,2,.45),mouth:"flat"})} pal={WIFE.pal} height={WIFE.height} rimLight="#e9d4ad"/>
 <KitchenTable cam={cam} x={.25} z={3.95} r={.7}/><Card cam={cam} x={.25} y={.76} z={3.94} blur={false}><path d="M-.12,0 H.12 L.09,-.13 H-.09Z" fill="#e6dbca" stroke="#8b8074" strokeWidth={.009}/><path d="M.09,-.1 q.12,-.01 .08,.07 q-.02,.04 -.07,.02" fill="none" stroke="#e6dbca" strokeWidth={.025}/></Card>
 </svg><Motes f={g} n={14} color="#e8d4a8" seed={76} drift={.15}/><Finish f={g} vig={.58} grain={.06} shadow="#192337" gradeO={.16}/></AbsoluteFill>;
};
export const Scene:React.FC=()=><AbsoluteFill>
 <Sequence from={0} durationInFrames={cuts.till}><Books/></Sequence>
 <Sequence from={cuts.till} durationInFrames={cuts.frame-cuts.till}><Till/></Sequence>
 <Sequence from={cuts.frame} durationInFrames={cuts.vend-cuts.frame}><Refusal/></Sequence>
 <Sequence from={cuts.vend} durationInFrames={cuts.home-cuts.vend}><Vending/></Sequence>
 <Sequence from={cuts.home} durationInFrames={cuts.end-cuts.home}><House/></Sequence>
 <Sequence from={0} durationInFrames={cuts.vend}><Audio src={staticFile("sfx/d_office.wav")} volume={.025}/></Sequence>
 <Sequence from={cuts.home} durationInFrames={cuts.end-cuts.home}><Audio src={staticFile("sfx/b_room_house.wav")} volume={.025}/></Sequence>
 </AbsoluteFill>;
