import React from "react";
import { Cam, Card, planePts, W, H } from "../lib/camera";
import { noise1, rand } from "../lib/anim";

/** Clean, original industrial meth-lab set: all spatial props are drawn at world scale. */
export const CSuperlab: React.FC<{ cam: Cam; f: number; near?: boolean; busy?: number }> = ({ cam, f, near = true, busy = 1 }) => {
  const shimmer = 0.72 + 0.08 * noise1(f * 0.04, 13);
  return <g>
    <defs>
      <linearGradient id="csl_bg" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#263844"/><stop offset="0.5" stopColor="#dfe8ee"/><stop offset="1" stopColor="#8598a4"/></linearGradient>
      <linearGradient id="csl_floor" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c6d2d9"/><stop offset="1" stopColor="#758791"/></linearGradient>
      <linearGradient id="csl_steel" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#607986"/><stop offset="0.28" stopColor="#edf4f5"/><stop offset="0.6" stopColor="#9eafb8"/><stop offset="1" stopColor="#526b78"/></linearGradient>
      <radialGradient id="csl_beam"><stop stopColor="#f5ffff" stopOpacity=".32"/><stop offset="1" stopColor="#d5f2ff" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#csl_bg)"/>
    {/* FAR: high industrial walls, clerestory panes and service door */}
    <Card cam={cam} x={0} z={34} blur={false}>
      <rect x={-15} y={-9} width={30} height={9} fill="#cbd6dc" stroke="#566d79" strokeWidth=".08"/>
      {Array.from({length:12},(_,i)=><g key={i}>
        <rect x={-14+i*2.45} y={-7.8} width="1.42" height="1.48" fill={i%3===0?"#a7d4e9":"#c9e5f0"} stroke="#708894" strokeWidth=".055"/>
        <path d={`M${-13.29+i*2.45},-7.8 v1.48`} stroke="#f4fcff" strokeWidth=".035" opacity=".8"/>
      </g>)}
      <rect x="-13.8" y="-5.8" width="27.6" height=".16" fill="#738b96"/>
      <rect x="8.4" y="-5.75" width="3.4" height="5.6" rx=".04" fill="#b6c4ca" stroke="#536a76" strokeWidth=".08"/>
      <rect x="9.0" y="-4.0" width="2.2" height="3.85" fill="#344a55"/>
      <circle cx="10.8" cy="-2.0" r=".08" fill="#f6cd56"/>
      {/* repeated vertical wall ribs */}
      {Array.from({length:15},(_,i)=><path key={i} d={`M${-13+i*1.85},-5.6 v5.5`} stroke="#879ba5" strokeWidth=".05" opacity=".8"/>)}
      <path d="M-14,-5.5 H14 M-14,-.15 H14" stroke="#f5fbfc" strokeWidth=".08" opacity=".7"/>
    </Card>
    {/* FAR floor plane catches long cool reflections */}
    <polygon points={planePts(cam,[[-20,8],[20,8],[14,38],[-14,38]],0)} fill="url(#csl_floor)"/>
    <polygon points={planePts(cam,[[-14,9],[-12,9],[0,36],[-1.6,36]],.012)} fill="#eaf7fb" opacity=".16"/>
    {[-10,-6,-2,2,6,10].map((x,i)=><polygon key={i} points={planePts(cam,[[x,9],[x+.025,9],[x+.12,38],[x+.08,38]],.015)} fill="#526d79" opacity=".27"/>)}
    {/* MID: work islands, stainless vessels and color-coded process pipes */}
    {[-7.7,-4.3,0,4.2,7.5].map((x,i)=><Card key={`tank${i}`} cam={cam} x={x} z={15.5+(i%2)*1.4} blur={false}>
      <ellipse cx="0" cy="-2.2" rx=".77" ry=".22" fill="#526873" opacity=".22"/>
      <rect x="-.62" y="-2.27" width="1.24" height="2.05" rx=".13" fill="url(#csl_steel)" stroke="#344a55" strokeWidth=".045"/>
      <ellipse cy="-2.25" rx=".62" ry=".2" fill="#e6eff2" stroke="#344a55" strokeWidth=".045"/>
      <ellipse cy="-.22" rx=".62" ry=".2" fill="#81949d" stroke="#344a55" strokeWidth=".04"/>
      <path d="M-.39,-2.03 v1.63" stroke="#f7ffff" strokeWidth=".05" opacity=".8"/>
      <circle cx=".27" cy="-1.86" r=".12" fill="#e8c23a" stroke="#47545a" strokeWidth=".03"/>
      <path d="M-.3,-2.48 v-.27 h.6 v.27" fill="none" stroke="#607680" strokeWidth=".055"/>
      <path d={`M${-.48},-.08 v.24 h.96 v-.24`} fill="#657b85"/>
    </Card>)}
    <Card cam={cam} x={-1.9} z={13.2} blur={false}>
      <rect x="-2.4" y="-1.12" width="4.8" height=".14" rx=".03" fill="#536a74"/>
      <rect x="-2.22" y="-1.95" width="4.44" height=".82" fill="#d9e4e8" stroke="#667c86" strokeWidth=".05"/>
      <path d="M-2.18,-1.1 v1.1 M2.18,-1.1 v1.1" stroke="#50636d" strokeWidth=".12"/>
      {[0,1,2,3].map(i=><g key={i}><rect x={-1.8+i*.92} y="-2.35" width=".45" height=".4" rx=".04" fill="#f7fbf8" stroke="#586d78" strokeWidth=".035"/><path d={`M${-1.58+i*.92},-2.34 v-.5 h.03 v.5`} stroke="#67818c" strokeWidth=".045" fill="none"/></g>)}
    </Card>
    {/* hanging utility rails and tubing: slow machine pulse is ambient life */}
    <Card cam={cam} x={0} z={21} blur={false}>
      <path d="M-13,-5.7 H13 M-12,-5.42 v.35 h3.1 v-.35 M-2,-5.42 v.52 h4 v-.52 M7,-5.42 v.36 h4 v-.36" fill="none" stroke="#718792" strokeWidth=".13"/>
      <path d="M-10,-5.2 C-8,-4.8 -8,-4.4 -7,-4.5 L-4,-5.45 M3,-5.45 C4,-4.7 6,-4.7 7,-5.45" fill="none" stroke="#58a9ad" strokeWidth=".075" opacity=".9"/>
      <path d="M-13,-5.1 H13" stroke="#e8c23a" strokeWidth=".045" strokeDasharray=".35 .22" opacity=".75"/>
    </Card>
    {/* NEAR foreground layer: pipe bundle, blurred only by depth-independent scale, anchored to floor */}
    {near && <Card cam={cam} x={-8.8+0.15*Math.sin(f*.025)} z={5.1} blur={false} opacity={.9}>
      <path d="M-.56,0 v-2.8 q0-.3 .3-.3 h.2 q.28 0 .28 .3 V0 M-.1,-2.8 v-.45 h1.1 v.45" fill="none" stroke="#4a606c" strokeWidth=".18"/>
      <path d="M-.58,-1.1 H.5" stroke="#dce9ed" strokeWidth=".06"/>
      <rect x=".42" y="-3.42" width=".09" height="3.42" fill="#566c77"/>
    </Card>}
    {near && <Card cam={cam} x={8.6} z={4.7} blur={false} opacity={.95}>
      <path d="M-.5,0 V-3.6 H-.36 V0 M-.42,-3.2 h1.45 v.14 h-1.45 M-.42,-2.2 h1.45 v.14 h-1.45" fill="none" stroke="#526773" strokeWidth=".14"/>
      <path d="M.3,-3.08 C.84,-2.8 .82,-2.3 .3,-2.05 C-.2,-1.75 -.14,-1.24 .45,-1.0" fill="none" stroke="#d7ae34" strokeWidth=".045" opacity=".85"/>
    </Card>}
    {/* clean overhead softbox pools, shimmering on polished metal */}
    <ellipse cx={930+90*Math.sin(f*.012)} cy="325" rx="390" ry="210" fill="url(#csl_beam)" opacity={shimmer*busy}/>
    <ellipse cx="1320" cy="380" rx="230" ry="170" fill="url(#csl_beam)" opacity={.55*busy}/>
    {/* floating dust and drifting filtered steam, fixed deterministic particles */}
    {Array.from({length:14},(_,i)=>{
      const x=(rand(i,31)*W+f*(.18+i%3*.07))%W, y=(rand(i,32)*H*.7+H*.08+Math.sin(f*.025+i)*10)%H;
      return <circle key={`d${i}`} cx={x} cy={y} r={1.1+rand(i,33)*2.4} fill="#f2fbff" opacity={.12+rand(i,34)*.2}/>;
    })}
  </g>;
};

/** Layered graphic finishing and pale daylight in the controlled lab. */
export const CFinish: React.FC<{f:number}> = ({f}) => <>
  <rect width={W} height={H} fill="#c8e7f5" opacity=".045"/>
  <path d={`M0 ${660+Math.sin(f*.035)*8} Q500 620 960 676 T1920 650`} fill="none" stroke="#effbff" strokeWidth="2" opacity=".14"/>
</>;
