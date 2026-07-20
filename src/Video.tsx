import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Difference } from "./scenes/Scene2Difference";
import { Scene3Mechanism } from "./scenes/Scene3Mechanism";
import { Scene4Leverage } from "./scenes/Scene4Leverage";
import { Scene5CTA } from "./scenes/Scene5CTA";

const scenes = [
  Scene1Hook,
  Scene2Difference,
  Scene3Mechanism,
  Scene4Leverage,
  Scene5CTA,
];

export const NetwerkmarketingExplainer: React.FC = () => {
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
