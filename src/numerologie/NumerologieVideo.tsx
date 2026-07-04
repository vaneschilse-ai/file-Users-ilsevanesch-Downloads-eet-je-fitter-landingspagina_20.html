import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "../theme";
import { NUM1Hook } from "./NUM1Hook";
import { NUM2Levenspad } from "./NUM2Levenspad";
import { NUM3Getallen } from "./NUM3Getallen";
import { NUM4Spiegel } from "./NUM4Spiegel";
import { NUM5CTA } from "./NUM5CTA";

const scenes = [NUM1Hook, NUM2Levenspad, NUM3Getallen, NUM4Spiegel, NUM5CTA];

export const NumerologieVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {scenes.map((Scene, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
            <Scene />
          </TransitionSeries.Sequence>
          {i < scenes.length - 1 ? (
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />
          ) : null}
        </React.Fragment>
      ))}
    </TransitionSeries>
  );
};
