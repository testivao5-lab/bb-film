// The full film: every scene placed at its narration cut-in, plus the narration track.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SCENES, FILM_END } from "./registry";

const fr = (s: number) => Math.round(s * 30);
export const FILM_FRAMES = fr(FILM_END);

export const BreakingFilm: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {SCENES.map((s, i) => {
      const from = fr(s.cutIn);
      const next = i + 1 < SCENES.length ? fr(SCENES[i + 1].cutIn) : FILM_FRAMES;
      return <Sequence key={s.n} from={from} durationInFrames={Math.max(1, next - from)} name={`${s.n} ${s.id}`}><s.Scene /></Sequence>;
    })}
    <Audio src={staticFile("narration.wav")} />
  </AbsoluteFill>
);
