// Batch D · an original, upscale living room. All world dimensions are metres.
import React from 'react';
import {Cam,Card,W,H,planePts} from '../lib/camera';
import {DDefs} from './d_shared';

export const Mansion:React.FC<{cam:Cam; f:number}>=({cam,f})=><g>
  <DDefs tone="clean"/><rect width={W} height={H} fill="#343c42"/>
  <Card cam={cam} x={0} z={10.5} blur={false}>
    <rect x={-8} y={-3.3} width={16} height={3.3} fill="#b4aa9a"/>
    <rect x={-8} y={-.08} width={16} height={.08} fill="#706b62"/>
    <rect x={-3.4} y={-2.7} width={2.1} height={1.75} fill="#263a47" stroke="#d8cdbb" strokeWidth={.09}/>
    <path d="M-3.4,-1.65 Q-3.1,-2.25 -2.9,-1.85 Q-2.55,-2.55 -2.35,-1.85 Q-2.05,-2.1 -1.8,-1.7 L-1.3,-1.65 V-.95 H-3.4Z" fill="#394d4c"/>
    <path d="M-2.35,-2.7 V-.95 M-3.4,-1.75 H-1.3" stroke="#c8bcaa" strokeWidth={.035}/>
    <rect x={.8} y={-2.65} width={1.8} height={1.3} fill="#e2d8c8" stroke="#6c5a47" strokeWidth={.06}/>
    <path d="M.91,-1.48 Q1.28,-2.36 1.64,-1.89 T2.48,-2.35" stroke="#857e72" fill="none" strokeWidth={.075}/>
    <rect x={3.3} y={-1.25} width={1.1} height={1.25} fill="#736553"/><rect x={3.25} y={-1.3} width={1.2} height={.07} fill="#c6b497"/>
    <path d="M3.7,-1.31 Q3.5,-1.8 3.6,-1.95 Q3.9,-2.04 4.1,-1.95 Q4.2,-1.8 4,-1.31Z" fill="#a9a095"/>
  </Card>
  <polygon points={planePts(cam,[[-30,cam.z+.2],[30,cam.z+.2],[30,10.5],[-30,10.5]])} fill="#796a5c"/>
  {[0,1,2,3,4].map(i=><path key={i} d={`M${i*470-120},${H} L${i*265+320},${H*.56}`} stroke="#a3937d" strokeWidth={2} opacity={.18}/>)}
  <Card cam={cam} x={.1} z={9.4} blur={false}><rect x={-1.65} y={-.77} width={3.3} height={.64} rx={.13} fill="#a69b8c" stroke="#6e6458" strokeWidth={.025}/><rect x={-1.45} y={-.9} width={2.9} height={.45} rx={.1} fill="#c2b5a1" stroke="#817567" strokeWidth={.018}/><path d="M-1.35,-.48 H1.35" stroke="#e0d4c0" strokeWidth={.025}/></Card>
  <Card cam={cam} x={-4.2} z={7.9} blur={false}><rect x={-.04} y={-1.7} width={.08} height={1.65} fill="#665d50"/><path d="M-.3,-1.7 L-.18,-2.05 H.18 L.3,-1.7 Z" fill="#d8c8aa"/><ellipse cx={0} cy={-.02} rx={.45} ry={.08} fill="#312c29" opacity={.35}/></Card>
  <ellipse cx={W*.16} cy={H*.14} rx={W*.17} ry={H*.22} fill="#f7dca4" opacity={.04+.01*Math.sin(f*.03)}/>
</g>;
export const MoneyBags:React.FC=()=> <g>
  {[-.39,.28].map((x,i)=><g key={x} transform={`translate(${x},0)`}><path d="M-.29,-.53 Q-.31,-.72 -.18,-.76 H.18 Q.31,-.72 .3,-.53 L.29,-.43 H-.29Z" fill={i?'#4c4e48':'#53554e'} stroke="#252925" strokeWidth={.018}/><path d="M-.15,-.75 Q-.14,-.88 0,-.88 Q.14,-.88 .15,-.75" fill="none" stroke="#2b302d" strokeWidth={.025}/><path d="M-.24,-.61 H.24" stroke="#8a8980" strokeWidth={.012}/><rect x={-.16} y={-.78} width={.3} height={.08} fill="#8c9a7b"/><path d="M-.12,-.76 h.22" stroke="#d8dac1" strokeWidth={.015}/></g>)}
</g>;
