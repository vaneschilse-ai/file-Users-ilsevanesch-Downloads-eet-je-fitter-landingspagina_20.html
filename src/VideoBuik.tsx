import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "./theme";
import { Scene1Hook } from "./scenes/buik/Scene1Hook";
import { Scene2Buildup } from "./scenes/buik/Scene2Buildup";
import { Scene3Causes } from "./scenes/buik/Scene3Causes";
import { Scene4Helps } from "./scenes/buik/Scene4Helps";
import { Scene5CTA } from "./scenes/buik/Scene5CTA";

const scenes = [Scene1Hook, Scene2Buildup, Scene3Causes, Scene4Helps, Scene5CTA];

export const OpgeblazenGevoelExplainer: React.FC = () => {
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
