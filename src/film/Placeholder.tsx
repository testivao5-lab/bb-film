// Temporary card shown for scenes that are not built yet (internal only — never ships).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Placeholder: React.FC<{ meta: { n: number; id: string; set: string; cutIn: number; cutOut: number } }> = ({ meta }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#101418", color: "#56606a", fontFamily: "DejaVu Sans, Arial", justifyContent: "center", alignItems: "center", fontSize: 44 }}>
      <div>SCENE {meta.n} · {meta.id} · {meta.set}</div>
      <div style={{ fontSize: 28, marginTop: 16 }}>{(meta.cutIn + f / 30).toFixed(2)} s</div>
    </AbsoluteFill>
  );
};
