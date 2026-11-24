import React from "react";
import { Cam, Card, project, planePts, W, H } from "../lib/camera";
import { noise1, rand, lerp } from "../lib/anim";
import { flatDisc, CSoftDefs, CGlow, CShadow } from "./c_common";

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
    <rect x={-16.25+i*2.55} y={-4.55-(i%3)*.1} width="1.3" height=".07" fill="#2c2b33"/>
   </g>)}
   {/* roofline parapets + vent stacks */}
   <path d="M-18,-5.8 h5.2 M-8,-4.7 h4 M0,-5.6 h6" stroke="#22222c" strokeWidth=".12"/>
   {[-12.5,-2.2,6.8].map((vx,i)=><rect key={i} x={vx} y={-6.35-(i%2)*.35} width=".42" height=".62" fill="#2c2c36"/>)}
   {/* faint neon glow of a distant sign (colour band only, no letters) */}
   <rect x={3.1} y={-3.7} width="1.7" height=".3" fill="#c8547a" opacity={.16+.07*Math.sin(f*.05)}/>
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
  <ellipse cx={500+Math.sin(f*.013)*25} cy={650} rx={330} ry={100} fill="url(#cstreet_lamp)" opacity={.38*lamp}/>
  {Array.from({length:18},(_,i)=>{const x=(rand(i,90)*W+f*(.25+rand(i,91)*.35))%W,y=470+rand(i,92)*440+noise1(f*.03+i,3)*6;return <circle key={i} cx={x} cy={y} r={1+rand(i,93)*2} fill="#f1c77b" opacity={.12+rand(i,94)*.12}/>;})}
  <rect width={W} height={H} fill="#07111c" opacity=".17"/>
 </g>;
};

/** Corner bodega storefront: barred warm windows, awning, door, meter, AC unit. No lettering anywhere. */
export const CStorefront: React.FC<{ cam: Cam; x: number; z: number; f: number; flip?: boolean; lit?: number; dress?: boolean }> = ({ cam, x, z, f, flip = false, lit = 1, dress = true }) => {
 const flick = lit * (0.88 + 0.08 * noise1(f * 0.05, 21) + 0.04 * Math.sin(f * 0.11));
 return <Card cam={cam} x={x} z={z} flip={flip} blur={false}>
  <CSoftDefs/>
  {/* building mass, 8 m wide, 3.8 m parapet */}
  <rect x={-4} y={-3.8} width="8" height="3.8" fill="#6d5f52" stroke="#241f1c" strokeWidth=".07"/>
  <rect x={-4} y={-3.8} width="8" height=".34" fill="#4d4239"/>
  <rect x={-4} y={-3.46} width="8" height=".08" fill="#877463" opacity=".7"/>
  {/* stucco patches */}
  {Array.from({length:6},(_,i)=><rect key={i} x={-3.7+rand(i,31)*7} y={-3.2+rand(i,32)*2.2} width={.7+rand(i,33)*1.3} height={.35+rand(i,34)*.6} fill="#7a6a5b" opacity=".35"/>)}
  {/* awning over the shopfront */}
  <path d="M-3.8,-2.28 h7.4 l-.25,-.5 h-6.9 Z" fill="#7d3f3a" stroke="#2c1b18" strokeWidth=".05"/>
  {Array.from({length:7},(_,i)=><path key={i} d={`M${-3.7+i*1.06},-2.78 l-.12,.5`} stroke="#5d2c29" strokeWidth=".09"/>)}
  <rect x="-3.62" y="-2.28" width="7.1" height=".07" fill="#4c2622"/>
  {/* two barred display windows, warm interior glow */}
  <g>
   <rect x="-3.3" y="-2.05" width="2.7" height="1.5" fill="#3c2c1d" stroke="#241c15" strokeWidth=".06"/>
   <rect x="-3.22" y="-1.97" width="2.54" height="1.34" fill="#e8b46a" opacity={.55*flick}/>
   <rect x="-3.22" y="-1.97" width="2.54" height="1.34" fill="url(#cglowY)" opacity={.5*flick}/>
   {/* shelves + stacked goods as silhouettes in the window */}
   <rect x="-3.1" y="-1.52" width="2.3" height=".05" fill="#5c4128" opacity=".8"/>
   <rect x="-3.1" y="-1.12" width="2.3" height=".05" fill="#5c4128" opacity=".8"/>
   {[0,1,2,3,4,5,6].map(i=><rect key={i} x={-3.05+ (i%4)*.55} y={-1.47+Math.floor(i/4)*.4} width=".34" height=".34" rx=".03" fill={["#a2502f","#4c6d8a","#7c8c3f","#b8893c"][i%4]} opacity=".8"/>)}
   {Array.from({length:5},(_,i)=><rect key={i} x={-3.22+i*.53} y="-1.97" width=".05" height="1.34" fill="#241c15"/>)}
   <rect x="-3.22" y="-1.35" width="2.54" height=".05" fill="#241c15"/>
  </g>
  <g>
   <rect x=".55" y="-2.05" width="2.75" height="1.5" fill="#3c2c1d" stroke="#241c15" strokeWidth=".06"/>
   <rect x=".63" y="-1.97" width="2.59" height="1.34" fill="#e8b46a" opacity={.42*flick}/>
   {Array.from({length:5},(_,i)=><rect key={i} x={.63+i*.53} y="-1.97" width=".05" height="1.34" fill="#241c15"/>)}
   <rect x=".63" y="-1.35" width="2.59" height=".05" fill="#241c15"/>
   {/* neon beer sign: pure colour band, no characters */}
   <rect x="1.7" y="-1.86" width=".9" height=".26" rx=".05" fill="#3b2a33"/>
   <rect x="1.78" y="-1.8" width=".74" height=".14" rx=".04" fill="#d2709b" opacity={.55+.35*Math.sin(f*.09)}/>
  </g>
  {/* door with frame + jamb light */}
  <rect x="-.42" y="-2.18" width=".95" height="2.18" fill="#4a3527" stroke="#241c15" strokeWidth=".06"/>
  <rect x="-.34" y="-2.06" width=".78" height="1.98" fill="#6b4a31"/>
  <rect x="-.3" y="-1.72" width=".5" height=".62" fill="#e8b46a" opacity={.35*flick}/>
  <circle cx=".28" cy="-1.06" r=".045" fill="#d9c27f"/>
  {/* utility meter + AC unit + vent */}
  {dress && <>
  <rect x="2.1" y="-2.9" width=".5" height=".68" rx=".04" fill="#5c554c" stroke="#2a241f" strokeWidth=".05"/>
  <circle cx="2.35" cy="-2.56" r=".13" fill="#cfd2c6" stroke="#2a241f" strokeWidth=".03"/>
  <rect x="2.9" y="-3.22" width=".86" height=".52" rx=".05" fill="#6a6259" stroke="#2a241f" strokeWidth=".05"/>
  <path d="M2.98,-3.1 h.7 M2.98,-2.98 h.7 M2.98,-2.86 h.7" stroke="#453e37" strokeWidth=".045"/>
  </>}
  {/* graffiti scribble: illegible squiggle only */}
  <path d="M-3.6,-.28 q.3,-.2 .55,.02 q.28,.2 .52,-.06 q.3,-.18 .5,.06" stroke="#2c2320" strokeWidth=".07" fill="none" opacity=".5"/>
  {/* ground shadow */}
  <ellipse cx="0" cy="-.02" rx="4.1" ry=".22" fill="#14100c" opacity=".38"/>
 </Card>;
};

/** utility pole with transformer and sagging wires */
export const CPowerPole: React.FC<{ cam: Cam; x: number; z: number; wiresTo?: [number, number][]; f?: number }> = ({ cam, x, z, wiresTo, f = 0 }) => (
 <Card cam={cam} x={x} z={z} blur={false}>
  <CShadow rx={0.16} ry={0.05} o={0.35}/>
  <rect x="-.075" y="-6.1" width=".15" height="6.1" fill="#3c3229" stroke="#1d1812" strokeWidth=".02"/>
  <rect x="-.075" y="-6.1" width=".05" height="6.1" fill="#57493b" opacity=".7"/>
  {/* crossarms */}
  <rect x="-1.05" y="-5.72" width="2.1" height=".085" fill="#33291f"/>
  <rect x="-.85" y="-5.18" width="1.7" height=".085" fill="#33291f"/>
  {[-.95,.95,-.75,.75].map((kx,i)=><rect key={i} x={kx-.028} y={-(5.84+(i>1?.54:0))} width=".056" height=".17" fill="#4b4235"/>)}
  {/* insulators */}
  {[-.95,-.35,.35,.95].map((kx,i)=><ellipse key={i} cx={kx} cy={-(5.87)} rx=".07" ry=".05" fill="#8fa9ab"/>)}
  {/* transformer can */}
  <rect x=".18" y="-5.02" width=".5" height=".78" rx=".08" fill="#5c6a63" stroke="#22241f" strokeWidth=".03"/>
  <rect x=".28" y="-5.14" width=".3" height=".12" fill="#45524b"/>
  {/* small street-number plate: plain metal, no digits */}
  <rect x="-.2" y="-3.3" width=".4" height=".24" rx=".03" fill="#7b7367" stroke="#2a241d" strokeWidth=".02"/>
 </Card>
);

/** wires sagging between two world points (call inside svg with both cards' projections implicit) */
export const CWires: React.FC<{ cam: Cam; from: [number, number, number]; to: [number, number, number]; n?: number; sag?: number }> = ({ cam, from, to, n = 3, sag = 0.55 }) => {
 const a = project(cam, from[0], from[1], from[2]), b = project(cam, to[0], to[1], to[2]);
 return <g>{Array.from({ length: n }).map((_, i) => {
  const y0 = a.y - i * 9, y1 = b.y - i * 7;
  return <path key={i} d={`M${a.x},${y0} Q${(a.x + b.x) / 2},${Math.max(y0, y1) + sag * 26} ${b.x},${y1}`} stroke="#141720" strokeWidth={2.4} fill="none" opacity=".85" />;
 })}</g>;
};

/** generic unbadged parked sedan, side view, ~4.6 m */
export const CParkedCar: React.FC<{ cam: Cam; x: number; z: number; f: number; color?: string; flip?: boolean }> = ({ cam, x, z, color = "#4a5560", flip = false }) => (
 <Card cam={cam} x={x} z={z} flip={flip} blur={false}>
  <CShadow rx={2.45} ry={0.5} o={0.42}/>
  <g transform="scale(1 .82)">
   <path d="M-2.3,-.3 l.1,-.5 q.1,-.26 .5,-.32 l.6,-.1 .48,-.5 q.2,-.24 .58,-.24 h.92 q.34,0 .58,.26 l.5,.5 .68,.12 q.42,.08 .5,.4 l.12,.38 v.4 h-5.46z" fill={color} stroke="#12161c" strokeWidth=".055"/>
   <path d="M-.62,-1.42 h1.3 q.2,0 .34,.16 l.5,.6 h-2.2z" fill="#8fa9b6" opacity=".72" stroke="#202b30" strokeWidth=".03"/>
   <path d="M-.55,-1.32 v.72 M.75,-1.3 v.72" stroke="#2c3a41" strokeWidth=".04"/>
   <path d="M-2.18,-.68 h4.85" stroke="#c9d2d6" strokeWidth=".035" opacity=".45"/>
   <rect x="-2.28" y="-.72" width=".1" height=".18" rx=".025" fill="#b8452f"/>
   <rect x="2.14" y="-.72" width=".1" height=".18" rx=".025" fill="#d9a04e"/>
   {[-1.42,1.34].map((cx,i)=><g key={i}><circle cx={cx} cy="-.16" r=".34" fill="#161a1f" stroke="#9aa1a2" strokeWidth=".05"/><circle cx={cx} cy="-.16" r=".15" fill="#6c7476"/><path d={`M${cx-.12},-.16 h.24 M${cx},-.28 v.24`} stroke="#c8cfd0" strokeWidth=".035"/></g>)}
   {/* dust film along the lower body */}
   <path d="M-2.24,-.34 q2.7,-.14 5.4,0" stroke="#b8a184" strokeWidth=".07" opacity=".22" fill="none"/>
  </g>
 </Card>
);

/** sidewalk dressing: hydrant, trash bags, milk crate, newspaper box (diegetic, no text) */
export const CSidewalkBits: React.FC<{ cam: Cam; x: number; z: number; seed?: number }> = ({ cam, x, z, seed = 1 }) => (
 <Card cam={cam} x={x} z={z} blur={false}>
  {/* fire hydrant */}
  <g transform="translate(-.95,0)">
   <CShadow rx={0.18} ry={0.05} o={0.3}/>
   <rect x="-.13" y="-.72" width=".26" height=".62" rx=".07" fill="#a24636" stroke="#2c1611" strokeWidth=".025"/>
   <rect x="-.17" y="-.47" width=".34" height=".13" rx=".05" fill="#a24636" stroke="#2c1611" strokeWidth=".025"/>
   <circle cx="0" cy="-.78" r=".11" fill="#b95844" stroke="#2c1611" strokeWidth=".025"/>
   <rect x="-.05" y="-.92" width=".1" height=".16" fill="#b95844" stroke="#2c1611" strokeWidth=".02"/>
  </g>
  {/* trash bags (soft lumps) */}
  <g>
   <CShadow cx={.6} rx={0.62} ry={0.12} o={0.32}/>
   <path d="M.15,0 q-.06,-.42 .22,-.58 q.12,-.3 .42,-.22 q.28,-.14 .44,.12 q.3,.06 .22,.38 q.1,.3 -.12,.3 Z" fill="#23262c" stroke="#0f1114" strokeWidth=".022"/>
   <path d="M.98,0 q-.1,-.34 .16,-.5 q.1,-.22 .34,-.14 q.24,-.06 .3,.2 q.12,.22 -.06,.36 q-.08,.14 -.24,.08 Z" fill="#2c3036" stroke="#0f1114" strokeWidth=".022"/>
   <path d="M.35,-.3 q.14,-.08 .3,0 M1.18,-.32 q.12,-.05 .22,.02" stroke="#474d55" strokeWidth=".02" fill="none"/>
  </g>
  {/* milk crate + folded newspaper box */}
  <g transform="translate(1.62,0)">
   <rect x="-.24" y="-.32" width=".48" height=".32" fill="#4a4438" stroke="#221e16" strokeWidth=".022"/>
   <path d="M-.24,-.22 h.48 M-.24,-.12 h.48 M-.1,-.32 v.32 M.1,-.32 v.32" stroke="#6b6250" strokeWidth=".018"/>
   <rect x=".42" y="-.62" width=".4" height=".62" rx=".04" fill="#3c4c58" stroke="#1a242c" strokeWidth=".025"/>
   <rect x=".47" y="-.55" width=".3" height=".22" fill="#7c8b94" opacity=".7"/>
  </g>
 </Card>
);

/** near-lens foreground silhouettes to frame shots (dark, flat, cheap) */
export const CNearFG: React.FC<{ cam: Cam; x: number; z: number; kind: "pole" | "bin" | "fence" | "wheel"; w?: number }> = ({ cam, x, z, kind, w = 1 }) => {
 const p = project(cam, x, 0, z);
 if (p.d < 0.2) return null;
 const s = p.s * w;
 return <g transform={`translate(${p.x},${p.y}) scale(${s})`} opacity=".92">
  {kind === "pole" && <rect x="-.16" y="-4.6" width=".32" height="4.6" fill="#0b0d12" />}
  {kind === "bin" && <g><path d="M-.55,0 v-1.1 q0-.12 .12,-.12 h.86 q.12,0 .12,.12 V0 Z" fill="#0b0d12"/><path d="M-.62,-1.1 h1.24 l-.1,-.2 h-1.04 Z" fill="#10141a"/><rect x="-.2" y="-1.06" width=".4" height=".16" fill="#0b0d12"/></g>}
  {kind === "fence" && <g><rect x="-.05" y="-1.7" width=".1" height="1.7" fill="#0b0d12"/><rect x="1.35" y="-1.7" width=".1" height="1.7" fill="#0b0d12"/><rect x="-.05" y="-1.7" width="1.45" height=".07" fill="#0b0d12"/><rect x="-.05" y="-1.0" width="1.45" height=".05" fill="#0b0d12"/><path d="M0,-1.68 l1.38,.66 M1.38,-1.68 L0,-1.02" stroke="#0b0d12" strokeWidth=".03"/></g>}
  {kind === "wheel" && <g><circle cx="0" cy="-.62" r=".62" fill="#0b0d12"/><circle cx="0" cy="-.62" r=".24" fill="#141821"/><rect x="-.06" y="-2.1" width=".12" height=".9" fill="#0b0d12"/></g>}
 </g>;
};

/** warm lamp light pool on the ground (needs CSoftDefs in the svg) */
export const CWarmPool: React.FC<{ cam: Cam; x: number; z: number; r?: number; o?: number; f?: number }> = ({ cam, x, z, r = 2.6, o = 0.3, f = 0 }) => {
 const pts = flatDisc(cam, x, z, r, 0.02, 20, 0.18, 4);
 const pts2 = flatDisc(cam, x, z, r * 0.55, 0.025, 18, 0.15, 9);
 return <g opacity={o * (0.9 + 0.1 * Math.sin(f * 0.045))}>
  <polygon points={pts} fill="url(#cglowW)" opacity=".55"/>
  <polygon points={pts2} fill="url(#cglowW)" opacity=".7"/>
 </g>;
};

/** slow drifting low haze bands near the ground (no blur filters) */
export const CNightHaze: React.FC<{ f: number; y?: number; o?: number }> = ({ f, y = 0, o = 0.1 }) => (
 <g opacity={o}>
  {[0, 1, 2, 3].map((i) => {
   const yy = y + i * 46 + Math.sin(f * 0.011 + i * 1.7) * 10;
   const x = ((f * (0.22 + i * 0.07) + i * 640) % (W + 700)) - 350;
   return <ellipse key={i} cx={x} cy={yy} rx={420 + i * 60} ry={34 + i * 8} fill="#2c3a52" opacity=".55" />;
  })}
 </g>
);

/** moths / insects circling a lamp (screen space, deterministic) */
export const CMoths: React.FC<{ f: number; x: number; y: number; n?: number; r?: number; seed?: number }> = ({ f, x, y, n = 6, r = 60, seed = 3 }) => (
 <g>
  {Array.from({ length: n }).map((_, i) => {
   const a = f * 0.07 + i * 2.1 + rand(i, seed) * 6.28;
   const rr = r * (0.5 + 0.5 * Math.sin(f * 0.023 + i * 1.3));
   const px = x + Math.cos(a) * rr, py = y + Math.sin(a * 1.3) * rr * 0.55;
   return <circle key={i} cx={px} cy={py} r={1.6 + rand(i, seed + 1) * 1.6} fill="#ffe9b8" opacity={0.32 + 0.28 * Math.abs(Math.sin(f * 0.11 + i))} />;
  })}
 </g>
);

/** Original unbadged compact crossover, side profile: 4.5 m long, 1.62 m tall, hood at .98 m.
 *  Deliberately generic — no brand marks, no lettering. Faces +x (front to the right). */
export const CCrossover: React.FC<{
  cam: Cam; x: number; z: number; f: number; body?: string; brake?: number; dip?: number; flash?: number; door?: number; flip?: boolean;
}> = ({ cam, x, z, f, body = "#62756d", brake = 0, dip = 0, flash = 0, door = 0, flip = false }) => (
  <Card cam={cam} x={x} z={z} flip={flip} blur={false}>
    <CShadow rx={2.28} ry={.52} o={.46}/>
    <g transform={`scale(1 .78) rotate(${dip * 1.6} -2.25 -0.3)`}>
      {/* body mass with wheel-arch notches */}
      <path d="M-2.25,-.3 l.12,-.58 q.1,-.3 .5,-.38 l.52,-.1 .38,-.5 q.16,-.3 .52,-.32 h1.16 q.36,0 .6,.3 l.62,.7 .58,.12 q.46,.1 .54,.44 l.1,.32 v.48 h-4.94z"
        fill={body} stroke="#141a1e" strokeWidth=".06" strokeLinejoin="round"/>
      {/* greenhouse: windshield, side glass, pillars */}
      <path d="M-.62,-2.28 h1.42 q.2,0 .34,.16 l.62,.78 h-2.52 q-.06,-.5 .14,-.94z" fill="#9ab8bd" opacity=".72" stroke="#202b30" strokeWidth=".035"/>
      <path d="M-.36,-2.24 l.14,.84 M.72,-2.2 l.28,.8" stroke="#3b4d53" strokeWidth=".05"/>
      <path d="M-1.52,-1.48 q.36,-.28 .8,-.3 l.42,-.52 q.14,-.24 .42,-.24" fill="none" stroke="#202b30" strokeWidth=".05"/>
      {/* hood line + shoulder crease */}
      <path d="M.96,-1.42 h1.42 q.36,0 .5,.3" fill="none" stroke="#222c31" strokeWidth=".045"/>
      <path d="M-2.02,-.78 h4.62" stroke="#a8b9b0" strokeWidth=".045" opacity=".5"/>
      <path d="M-2.1,-.5 h4.8" stroke="#d5c18b" strokeWidth=".03" opacity=".28"/>
      {/* door seam + handle (door can swing open via `door`) */}
      <g transform={`translate(${door * .12},${-door * .02}) rotate(${-door * 8} .88 -1.42)`}>
        <path d="M-.62,-1.42 h1.5 v1.2 q0,.06 -.06,.06 h-1.38 q-.06,0 -.06,-.06 Z" fill={body} stroke="#222c31" strokeWidth=".035"/>
        <path d="M-.5,-1.32 h1.2 v.5 h-1.2 Z" fill="#9ab8bd" opacity=".55" stroke="#202b30" strokeWidth=".022"/>
        <path d="M.28,-.72 h.26 v.09 h-.26z" fill="#c9d2d0" stroke="#222c31" strokeWidth=".02"/>
      </g>
      {/* lights */}
      <rect x="1.98" y="-1.3" width=".16" height=".28" rx=".04" fill="#edb46c" opacity={.55 + .45 * flash}/>
      <ellipse cx="2.2" cy="-1.18" rx={.16 + .3 * flash} ry={.09 + .1 * flash} fill="#fff1c5" opacity={.5 + .4 * flash}/>
      <rect x="-2.2" y="-.74" width=".13" height=".24" rx=".035" fill={brake > 0 ? "#e95c48" : "#a2463c"} opacity={.75 + .25 * brake}/>
      <ellipse cx="-2.18" cy="-.62" rx={.16 + .2 * brake} ry={.1 + .12 * brake} fill="#e95c48" opacity={.3 * brake}/>
      {/* wheels with simple hub geometry */}
      {[-1.32, 1.3].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="-.16" r=".38" fill="#171b20" stroke="#adb2ac" strokeWidth=".055"/>
          <circle cx={cx} cy="-.16" r=".18" fill="#777d7e"/>
          <path d={`M${cx - .13},-.16 h.26 M${cx},-.29 v.26`} stroke="#d9dedb" strokeWidth=".038"/>
          <circle cx={cx} cy="-.16" r=".045" fill="#3c4448"/>
        </g>
      ))}
      {/* sill shadow */}
      <path d="M-2.22,-.24 q2.2,-.12 4.5,0" stroke="#141a1e" strokeWidth=".08" opacity=".5" fill="none"/>
    </g>
  </Card>
);

/** dust/grit kicked up at a point on the road (needs CSoftDefs) */
export const CGrit: React.FC<{ f: number; cam: Cam; x: number; z: number; t: number; n?: number; seed?: number }> = ({ f, cam, x, z, t, n = 10, seed = 2 }) => {
  if (t <= 0 || t >= 1) return null;
  return <g>{Array.from({ length: n }).map((_, i) => {
    const a = rand(i, seed) * Math.PI * 2;
    const sp = 0.5 + rand(i, seed + 1) * 1.3;
    const px = x + Math.cos(a) * t * sp * 1.6, pz = z + Math.sin(a) * t * sp * 0.6;
    const h = 0.05 + rand(i, seed + 2) * 0.4 * Math.sin(Math.PI * t);
    const p = project(cam, px, h, pz);
    return <circle key={i} cx={p.x} cy={p.y} r={(0.02 + rand(i, seed + 3) * 0.05) * p.s} fill={i % 2 ? "#c9b9a0" : "#8f8069"} opacity={0.5 * (1 - t)} />;
  })}</g>;
};
