// Batch D: modest rural bar, unbranded, built in real-world metres.
import React from 'react';
import {Cam,Card,planePts,W,H} from '../lib/camera';
import {DDefs} from './d_shared';
import {Figure} from '../rig/Figure';
import {extra} from '../props/d_poses';

export const BarRoom:React.FC<{cam:Cam;f:number}> = ({cam,f}) => <g>
  <DDefs tone="night"/><rect width={W} height={H} fill="#18181e"/>
  <polygon points={planePts(cam,[[-8,2],[8,2],[8,11],[-8,11]],0)} fill="#504139"/>
  <Card cam={cam} x={0} z={10} blur={false}>
    <rect x={-6} y={-3} width={12} height={3} fill="#4b413c"/>
    <rect x={-6} y={-.78} width={12} height={.78} fill="#302824"/>
    {Array.from({length:12}).map((_,i)=><rect key={i} x={-6+i} y={-.78} width={.012} height={.78} fill="#7a5d48" opacity={.5}/>)}
    <rect x={-3.05} y={-2.2} width={1.25} height={1.2} fill="#25384b" stroke="#98816a" strokeWidth={.07}/>
    <path d="M-3,-1.2 L-2.75,-1.8 L-2.58,-1.33 L-2.34,-1.9 L-2.05,-1.25 L-1.85,-1.7 V-1.04 H-3Z" fill="#263d39"/>
    <path d="M-3,-1.04 Q-2.5,-1.24 -1.8,-1.04" stroke="#d2dadd" strokeWidth={.08}/>
    <rect x={.4} y={-2.15} width={2.5} height={1.4} fill="#241d19" stroke="#80634a" strokeWidth={.08}/>
    {[0,1,2].map(r=><g key={r}><rect x={.45} y={-1.75+r*.36} width={2.4} height={.045} fill="#ae7c53"/>{Array.from({length:14}).map((_,i)=><g key={i} transform={`translate(${.55+i*.16},${-1.75+r*.36})`}><rect x={-.045} y={-.19-(i%3)*.015} width={.09} height={.19+(i%3)*.015} rx={.02} fill={['#6f7750','#8a5638','#667c72','#af8b61'][i%4]}/><rect x={-.018} y={-.23-(i%3)*.015} width={.036} height={.05} fill="#c5a477"/></g>)}</g>)}
    <ellipse cx={1.65} cy={-1.5} rx={1.45} ry={.8} fill="url(#dLampGlow)" opacity={.18}/>
  </Card>
  <Card cam={cam} x={1.65} z={8.7} blur={false}><rect x={-1.6} y={-.96} width={3.2} height={.96} fill="#563b2b" stroke="#261c18" strokeWidth={.025}/><rect x={-1.7} y={-1.03} width={3.4} height={.1} fill="#aa7a54" stroke="#30211b" strokeWidth={.02}/><rect x={-1.5} y={-.85} width={2.9} height={.035} fill="#b28e6d" opacity={.35}/></Card>
</g>;
export const Payphone:React.FC = ()=><g><rect x={-.24} y={-1.7} width={.48} height={.77} rx={.045} fill="#535857" stroke="#11191b" strokeWidth={.018}/><rect x={-.19} y={-1.65} width={.38} height={.25} rx={.02} fill="#202a2c"/><rect x={-.15} y={-1.35} width={.25} height={.14} rx={.01} fill="#a9b2a8"/>{[0,1,2].map(i=><circle key={i} cx={-.11+i*.08} cy={-1.29} r={.012} fill="#3b4544"/>)}<rect x={-.13} y={-1.1} width={.23} height={.035} fill="#161b1c"/></g>;

// Two original rigged interview guests on the diegetic television; no captions or marks.
const guestA=extra({height:1.74,skin:"#d3ae93",jacket:"#373d48",hair:"#59473b",age:.5});
const guestB=extra({height:1.66,skin:"#dbb39a",jacket:"#665a5d",hair:"#514139",hairStyle:"long",age:.46});
export const InterviewTV:React.FC<{f:number}> = ({f})=><g>
  <defs><clipPath id="dBarTvClip"><rect x={-.59} y={-.62} width={1.18} height={.61}/></clipPath></defs>
  <rect x={-.68} y={-.7} width={1.36} height={.8} rx={.035} fill="#1b1d20" stroke="#0a0a0b" strokeWidth={.025}/>
  <g clipPath="url(#dBarTvClip)"><rect x={-.59} y={-.62} width={1.18} height={.61} fill="#526a80"/><path d="M-.59,-.25 Q0,-.38 .59,-.25 L.59,-.01 H-.59Z" fill="#687983"/>
  {[guestA,guestB].map((p,i)=><g key={i} transform={`translate(${i? .3:-.3},.26) scale(.36)`}><Figure height={p.h} view={.15} pose={{torso:0,neck:0,shL:i?12:25,shR:i?18:42,elL:i?26:36,elR:i?38:55,hipL:5,hipR:5,knL:10,knR:10,breathe:.1}} look={{...p.look,mouth:i===0&&Math.sin(f*.15)>.1?"open":"flat",mouthOpen:.14}} pal={p.pal}/></g>)}
  <rect x={-.59} y={-.09} width={1.18} height={.08} fill="#394851"/><rect x={-.59} y={-.62} width={1.18} height={.61} fill="#d7e6ff" opacity={.03+.025*Math.sin(f*.3)}/></g>
  <circle cx={.62} cy={.035} r={.015} fill="#a6c7af"/>
</g>;
