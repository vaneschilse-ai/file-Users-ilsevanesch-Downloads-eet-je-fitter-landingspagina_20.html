import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Breakfast } from "./scenes/Scene2Breakfast";
import { Scene3Deficit } from "./scenes/Scene3Deficit";
import { Scene4Benefits } from "./scenes/Scene4Benefits";
import { Scene5CTA } from "./scenes/Scene5CTA";

const scenes = [
  Scene1Hook,
  Scene2Breakfast,
  Scene3Deficit,
  Scene4Benefits,
  Scene5CTA,
];

export const EiwittenExplainer: React.FC = () => {
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
