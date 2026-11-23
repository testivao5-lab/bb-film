import React from "react";
import { Cam, Card, planePts, W, H } from "../lib/camera";
import { noise1, rand } from "../lib/anim";

/** Original Albuquerque-inspired night block: layered stucco, curb, parked traffic and moving haze. */
export const CNightStreet:React.FC<{cam:Cam;f:number;traffic?:boolean}> = ({cam,f,traffic=true})=>{
 const lamp=.84+.1*Math.sin(f*.028);
 return <g>
  <defs>
   <linearGradient id="cstreet_sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#101a2b"/><stop offset=".58" stopColor="#29364a"/><stop offset="1" stopColor="#725741"/></linearGradient>
   <linearGradient id="cstreet_asphalt" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#35363b"/><stop offset="1" stopColor="#171b24"/></linearGradient>
   <radialGradient id="cstreet_lamp"><stop stopColor="#f5c77a" stopOpacity=".3"/><stop offset="1" stopColor="#f5c77a" stopOpacity="0"/></radialGradient>
  </defs>
  <rect width={W} height={H} fill="url(#cstreet_sky)"/>
  {/* far: low stucco blocks, a hill cut and sparse windows */}
  <path d="M0 410 Q220 350 410 394 T820 390 T1290 376 T1920 398 V620 H0Z" fill="#252b39" opacity=".9"/>
  <Card cam={cam} x={0} z={35} blur={false}>
   <path d="M-18,-.5 V-5.8 Q-13,-7 -8,-5.8 V-.5 Z" fill="#554f4e" stroke="#201f29" strokeWidth=".1"/>
   <path d="M-8,-.5 V-4.7 Q-4,-6.2 0,-4.7 V-.5Z" fill="#77736a" stroke="#292834" strokeWidth=".1"/>
   <path d="M0,-.5 V-5.6 Q6,-6.8 12,-5.6 V-.5Z" fill="#635c56" stroke="#292834" strokeWidth=".1"/>
   {Array.from({length:13},(_,i)=><g key={i}>
    <rect x={-16+i*2.55} y={-4.3-(i%3)*.1} width=".8" height="1.2" fill={i%4===0?"#b88551":"#263447"} stroke="#292c35" strokeWidth=".06"/>
    <rect x={-15.9+i*2.55} y={-4.2-(i%3)*.1} width=".58" height=".9" fill={i%4===0?"#f1c77b":"#8bb1c6"} opacity={i%4===0?.62:.5}/>
   </g>)}
   <path d="M-18,-.5 H16" stroke="#927c65" strokeWidth=".12"/>
  </Card>
  {/* midground street and sidewalk, with a real 0.15m curb and road sheen */}
  <polygon points={planePts(cam,[[-24,4],[24,4],[20,44],[-20,44]],0)} fill="url(#cstreet_asphalt)"/>
  <polygon points={planePts(cam,[[-24,4],[24,4],[24,8],[-24,8]],.14)} fill="#6f6a62"/>
  <path d="M0 0" stroke="none"/>
  <polygon points={planePts(cam,[[-24,11],[24,11],[24,11.12],[-24,11.12]],.015)} fill="#d0b57c" opacity=".5"/>
  <polygon points={planePts(cam,[[-17,21],[-16.9,21],[-8,40],[-8.1,40]],.02)} fill="#f5ddac" opacity=".42"/>
  <polygon points={planePts(cam,[[16,21],[16.1,21],[8,40],[7.9,40]],.02)} fill="#f5ddac" opacity=".38"/>
  {/* far traffic: tiny lights drift across the distant cross street */}
  {traffic&&[0,1,2,3].map(i=>{const x=((i*7.2+f*.015)%30)-15;return <g key={i}><ellipse cx={960+x*18} cy={535+i*4} rx={13+i} ry={3} fill={i%2?"#c94b40":"#efd49d"} opacity={.18}/><circle cx={960+x*18} cy={534+i*4} r={2.2} fill={i%2?"#e34e49":"#ffe5aa"} opacity={.75}/></g>;})}
  {/* amber street lamp and drifting insect specks */}
  <Card cam={cam} x={-8.5} z={14} blur={false}>
   <rect x="-.055" y="-5.4" width=".11" height="5.4" fill="#30343c"/><path d="M0,-5.35 h.7 v.09 h-.7" stroke="#30343c" strokeWidth=".09" fill="none"/>
   <ellipse cx=".63" cy="-5.2" rx=".19" ry=".07" fill="#fff0c9" opacity={lamp}/>
   <ellipse cx=".6" cy="-4.7" rx="4.2" ry="3" fill="url(#cstreet_lamp)" opacity={lamp}/>
  </Card>
  {/* ambient moving warm pools and low night haze */}
  <ellipse cx={500+Math.sin(f*.013)*25} cy="650" rx="330" ry="100" fill="url(#cstreet_lamp)" opacity={.38*lamp}/>
  {Array.from({length:18},(_,i)=>{const x=(rand(i,90)*W+f*(.25+rand(i,91)*.35))%W,y=470+rand(i,92)*440+noise1(f*.03+i,3)*6;return <circle key={i} cx={x} cy={y} r={1+rand(i,93)*2} fill="#f1c77b" opacity={.12+rand(i,94)*.12}/>;})}
  <rect width={W} height={H} fill="#07111c" opacity=".17"/>
 </g>;
};
