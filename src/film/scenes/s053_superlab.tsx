// SCENE 053 · superlab — industrial scale becomes intimate leverage; hard cut at the narration pivot.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cam, Card, W, H } from "../../lib/camera";
import { breath, blink, clamp, easeInOut, kf, lerp, prog } from "../../lib/anim";
import { Figure, Pose, STAND } from "../../rig/Figure";
import { TEACHER, teacherLook, RESTAURATEUR, restaurateurLook } from "../../rig/cast";
import { CSuperlab, CFinish } from "../../env/c_superlab";
import { Finish, Motes } from "../../fx/Post";
export const META = { n: 53, id: "superlab", set: "superlab", cutIn: 857.67, cutOut: 881.43 };
export const beat = (sec: number) => Math.round((sec - META.cutIn) * 30);

const GUS_POSE: Pose = { ...STAND, shL: 15, shR: -8, elL: 70, elR: 10, breathe: .35 };
const WALT_POSE: Pose = { ...STAND, shL: 8, shR: -9, elL: 20, elR: 12, breathe: .35 };

const ShotWide: React.FC<{f:number}> = ({f}) => {
  const a = beat(868.79);
  const t = clamp(f / a);
  const cam: Cam = { x: lerp(-1.4,.25,easeInOut(t)), y: 1.7, z: lerp(1.1,2.35,easeInOut(t)), f: 1320, shiftY: 42 };
  const enter = prog(f, beat(862.41), beat(865.4));
  const wx = lerp(-4.0,-1.35,enter);
  const stride = enter < .96 ? Math.sin(f*.23) : 0;
  const nod = prog(f, beat(868.1), beat(869.0));
  return <>
    <svg width={W} height={H}>
      <CSuperlab cam={cam} f={f} near busy={.95}/>
      {/* laundry chute threshold remains visible behind the science floor */}
      <Card cam={cam} x={-7.1} z={12.1} blur={false}>
        <rect x="-1.25" y="-2.9" width="2.5" height="2.9" fill="#657b85" stroke="#273b46" strokeWidth=".08"/>
        <rect x="-1.05" y="-2.72" width="2.1" height="2.52" fill="#344955"/>
        <path d="M-1.08,-2.65 L.98,-.55 M.98,-2.65 L-1.08,-.55" stroke="#93abb3" strokeWidth=".05" opacity=".55"/>
        <circle cx=".87" cy="-1.45" r=".075" fill="#f0cc58"/>
      </Card>
      {/* figures occupy foreground/midground, feet rest on the polished floor plane */}
      <Card cam={cam} x={wx} z={7.5} blur={false}>
        <Figure pose={{...WALT_POSE, hipL: 10+stride*15, hipR:-9-stride*15, knL:Math.max(2,Math.abs(stride)*22),knR:Math.max(2,Math.abs(stride)*18), shL:10+stride*8,shR:-8-stride*8, breathe:breath(f,.07)}} view={.16}
          look={teacherLook({yaw:.13, lids:.18+blink(f,3)*.72, lookX:lerp(-.3,.25,enter), brow:lerp(-.18,-.52,nod), mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/>
      </Card>
      <Card cam={cam} x={2.1} z={8.7} blur={false}>
        <Figure pose={{...GUS_POSE, shL:lerp(15,-5,enter),elL:lerp(70,15,enter), breathe:breath(f+42,.06)}} view={.05}
          look={restaurateurLook({yaw:.08,lids:.2+blink(f,7,126)*.7,lookX:lerp(-.35,-.15,enter),brow:.05,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
      </Card>
      {/* diegetic eyewash/safety stations: simple high-contrast icons, no words */}
      <Card cam={cam} x={-8.5} z={10.5} blur={false}>
        <rect x="-.34" y="-1.65" width=".68" height="1.65" rx=".08" fill="#e8c23a" stroke="#35434a" strokeWidth=".05"/>
        <path d="M-.17,-1.28 V-.84 Q-.17,-.62 0,-.62 Q.17,-.62 .17,-.84 V-1.28 M-.26,-1.3 H.26" fill="none" stroke="#34424a" strokeWidth=".065"/>
        <path d="M-.35,-.25 h.7" stroke="#34424a" strokeWidth=".05"/>
      </Card>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={30} seed={53} color="#f3fbff" drift={.28}/>
    <Finish f={f} vig={.52} grain={.055} shadow="#13334b" gradeO={.11}/>
  </>;
};

const ShotClose: React.FC<{f:number}> = ({f}) => {
  const start = beat(868.79);
  const t = clamp((f-start)/Math.max(1,beat(881.43)-start));
  const cam: Cam = { x: lerp(-.55,.62,easeInOut(t)), y: 1.55, z: 2.4, f: 1320, shiftY: -245 };
  const expense = prog(f,beat(877.24),beat(878.05));
  const available = prog(f,beat(878.48),beat(879.65));
  const distinction = prog(f,beat(879.77),beat(880.98));
  const waltsTurn = prog(f,beat(873.12),beat(874.7));
  const shoulder = lerp(0,14,expense) - 9*available;
  return <>
    <svg width={W} height={H}>
      <CSuperlab cam={cam} f={f} near busy={1-.14*available}/>
      {/* rack focus staged through an empty stainless cylinder in near foreground */}
      <Card cam={cam} x={-2.9} z={4.1} blur={false} opacity={.55}>
        <ellipse cx="0" cy="-1.8" rx=".62" ry=".18" fill="#dce9ed" opacity=".48" stroke="#405862" strokeWidth=".045"/>
        <path d="M-.62,-1.8 v1.6 q.62,.32 1.24,0 v-1.6" fill="#b9c9d0" fillOpacity=".16" stroke="#425963" strokeWidth=".05"/>
      </Card>
      <Card cam={cam} x={-.25} z={6.4} blur={false}>
        <Figure pose={{...WALT_POSE, shL:lerp(6,26,expense),elL:lerp(18,51,expense),wrL:lerp(0,-18,available),shR:lerp(-8,11,distinction),elR:lerp(12,34,distinction),breathe:breath(f,.065)}} view={.04}
          look={teacherLook({yaw:lerp(.1,.68,waltsTurn), lids:.14+blink(f,8)*.76, lookX:lerp(-.2,.72,waltsTurn),lookY:-.12,brow:lerp(-.2,-.55,available),mouth:"flat"})} pal={TEACHER.pal} height={TEACHER.height}/>
      </Card>
      <Card cam={cam} x={2.0} z={8.5} blur={false}>
        <Figure pose={{...GUS_POSE, shL:lerp(-4,28,expense),elL:lerp(15,40,expense),wrL:lerp(0,16,available),shR:lerp(-8,4,distinction),breathe:breath(f+50,.06)}} view={.2}
          look={restaurateurLook({yaw:.36,lids:.2+blink(f,5,131)*.72,lookX:.65,brow:.18,mouth:"flat"})} pal={RESTAURATEUR.pal} height={RESTAURATEUR.height}/>
        {/* key card held out: exact first movement occurs on “available”, not the preceding phrase */}
        <g opacity={available} transform={`translate(.42,-1.03) rotate(-8)`}>
          <rect x="-.2" y="-.1" width=".4" height=".26" rx=".025" fill="#e9e7d8" stroke="#384a54" strokeWidth=".025"/>
          <rect x="-.14" y="-.04" width=".18" height=".035" fill="#68aaba"/>
          <circle cx=".12" cy=".02" r=".025" fill="#e8c23a"/>
        </g>
      </Card>
      {/* expensive is framed as engineering abundance; “two different” lands on separate points of focus */}
      <Card cam={cam} x={4.35} z={9.4} blur={false} opacity={.9}>
        <rect x="-.64" y="-2.18" width="1.28" height="2.1" rx=".12" fill="#e0ebee" stroke="#435d68" strokeWidth=".05"/>
        <ellipse cy="-2.18" rx=".64" ry=".18" fill="#f4fbfd" stroke="#435d68" strokeWidth=".05"/>
        <path d="M-.2,-1.96 v1.45 M.2,-1.96 v1.45" stroke="#82b4c1" strokeWidth=".075"/>
        <circle cx="0" cy="-1.65" r=".13" fill="#e8c23a"/>
      </Card>
      <path d={`M${760+expense*110},${360-distinction*20} Q980,${290-available*35} ${1180+distinction*160},${360}`} fill="none" stroke="#fff" strokeWidth="3" opacity={.13+.12*Math.sin(f*.07)}/>
      <CFinish f={f}/>
    </svg>
    <Motes f={f} n={24} seed={59} color="#edfaff" drift={.2}/>
    <Finish f={f} vig={.68} grain={.06} shadow="#10283b" gradeO={.13}/>
  </>;
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cut = beat(868.79);
  return <AbsoluteFill style={{background:"#223642"}}>{f < cut ? <ShotWide f={f}/> : <ShotClose f={f}/>}</AbsoluteFill>;
};
