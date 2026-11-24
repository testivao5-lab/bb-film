// Batch D compound set: unbranded industrial buildings and desert at dusk, dimensions in metres.
import React from 'react';
import {Cam,Card,W,H,planePts} from '../lib/camera';
import {DDefs} from './d_shared';
export const Compound:React.FC<{cam:Cam; f:number}> = ({cam,f})=><g>
  <DDefs tone="dusk"/><rect width={W} height={H} fill="url(#dSkyDusk)"/>
  <path d="M0 550 L170 410 L370 530 L570 380 L820 540 L1060 420 L1300 545 L1570 390 L1920 545 V780 H0Z" fill="#725867"/>
  <polygon points={planePts(cam,[[-50,cam.z+.3],[50,cam.z+.3],[50,100],[-50,100]])} fill="#8e7766"/>
  <Card cam={cam} x={.5} z={18} blur={false}><rect x={-5} y={-3.0} width={10} height={3.0} fill="#736c5f" stroke="#4b4943" strokeWidth={.035}/><path d="M-5,-3 L-4.6,-3.7 H4.6 L5,-3Z" fill="#4b4b45"/><rect x={-.8} y={-2.3} width={1.6} height={2.3} fill="#393e3b" stroke="#928a75" strokeWidth={.05}/><rect x={-3.9} y={-2.3} width={1.4} height={.9} fill="#cebb89" stroke="#504d40" strokeWidth={.06}/><path d="M-3.9,-1.85 H-2.5 M-3.2,-2.3 V-1.4" stroke="#4a4840" strokeWidth={.035}/><rect x={2.2} y={-2.1} width={1.45} height={1.0} fill="#3d4846" stroke="#a39982" strokeWidth={.05}/>{[0,1,2,3,4].map(i=><path key={i} d={`M-5,${-2.7+i*.48} H5`} stroke="#958b78" strokeWidth={.018} opacity={.5}/>)}</Card>
  <Card cam={cam} x={-4.8} z={12}><path d="M0,0 V-2.6 M-.6,-2.45 H.6" stroke="#4a4942" strokeWidth={.08}/><path d="M-.45,-2.43 H.35 L.18,-2.23 H-.3Z" fill="#dbc798"/><path d="M-.3,-2.24 L-1.1,0 H1Z" fill="#efd7a0" opacity={.08+.01*Math.sin(f*.08)}/></Card>
  <path d="M0,990 Q120,870 300,1080 H0Z M1920,1000 Q1740,910 1610,1080 H1920Z" fill="#3b3a35" opacity={.7}/>
</g>;
// Rear cutaway silhouette; the mechanism itself remains a simple diegetic shape, not an assembly diagram.
export const OpenTrunk:React.FC<{sweep:number}>=({sweep})=><g transform="scale(.75)">
  <ellipse cy={0} rx={1.55} ry={.15} fill="#101719" opacity={.5}/>
  {[-.9,.9].map(x=><rect key={x} x={x-.19} y={-.53} width={.38} height={.53} rx={.08} fill="#151a19"/>)}<path d="M-1.3,-.47 H1.3 L1.18,-.12 H-1.18Z" fill="#293a3c" stroke="#151a19" strokeWidth={.035}/><path d="M-1.3,-.38 L-1.22,-1.05 L1.22,-1.05 L1.3,-.38 Z" fill="#394c51" stroke="#15191b" strokeWidth={.04}/>
  <path d="M-1.2,-1.04 L-1.05,-1.65 L1,-1.65 L1.18,-1.04Z" fill="#27363b" stroke="#111719" strokeWidth={.035}/>
  <path d="M-1.05,-1.63 L-.85,-2.12 L.9,-2.12 L1,-1.63 Z" fill="#4b5f61" stroke="#172021" strokeWidth={.035}/>
  <path d="M-.9,-1.64 H.85" stroke="#91a39b" strokeWidth={.03} opacity={.5}/>
  <rect x={-.94} y={-.91} width={1.88} height={.27} rx={.04} fill="#141d1d"/>
  <g transform={`translate(0,-.91) rotate(${sweep})`}><rect x={-.17} y={-.35} width={.38} height={.24} rx={.03} fill="#303b39" stroke="#0a1010" strokeWidth={.02}/><rect x={.1} y={-.3} width={.85} height={.07} fill="#192323"/><rect x={-.08} y={-.13} width={.12} height={.16} fill="#434a42"/><path d="M-.2,-.3 H.23" stroke="#84918a" strokeWidth={.012}/></g>
  <rect x={-.9} y={-.9} width={.34} height={.22} rx={.025} fill="#303b3a" stroke="#121819" strokeWidth={.015}/><circle cx={-.82} cy={-.92} r={.025} fill="#c5a27f"/><circle cx={-.64} cy={-.92} r={.025} fill="#9daca0"/>
  <rect x={.55} y={-.9} width={.31} height={.21} rx={.025} fill="#565b50" stroke="#171b18" strokeWidth={.015}/><path d="M.6,-.85 h.2" stroke="#a8aa91" strokeWidth={.02}/>
  <rect x={-1.25} y={-.55} width={2.5} height={.12} rx={.04} fill="#9baba5"/><rect x={-1.22} y={-.95} width={.19} height={.2} fill="#a65342"/><rect x={1.03} y={-.95} width={.19} height={.2} fill="#a65342"/>
</g>;
