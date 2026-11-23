import React from "react";
import { AbsoluteFill, Audio, Composition, staticFile } from "remotion";
import { RigTest } from "./RigTest";
import { ColdOpen, COLD_OPEN } from "./scenes/ColdOpen";
import { BakeComp } from "./bake/Baked";
import { BreakingFilm, FILM_FRAMES } from "./film/Film";
import { CastSheet } from "./CastSheet";
import { BAKES } from "./bake/registry";

/** 15–20 s production test: cold open with the real narration, hard-synced from t = 0 */
const TestClip: React.FC = () => (
  <AbsoluteFill>
    <ColdOpen />
    <Audio src={staticFile("narration.wav")} volume={1} endAt={COLD_OPEN.dur} />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="BreakingFilm" component={BreakingFilm} durationInFrames={FILM_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="TestClip" component={TestClip} durationInFrames={COLD_OPEN.dur} fps={30} width={1920} height={1080} />
    <Composition id="Bake" component={BakeComp} durationInFrames={1} fps={30} width={100} height={100}
      defaultProps={{ id: "maskpost", level: 0 }}
      calculateMetadata={({ props }) => { const [x0, y0, x1, y1] = BAKES[props.id].box; const k = BAKES[props.id].ppm; return { width: Math.round((x1 - x0) * k / 2) * 2, height: Math.round((y1 - y0) * k / 2) * 2 }; }} />
    <Composition id="CastSheet" component={CastSheet} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RigTest" component={RigTest} durationInFrames={60} fps={30} width={1920} height={1080} />
  </>
);
