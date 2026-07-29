import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "./theme";
import { Scene1Hook } from "./scenes/ontbijt/Scene1Hook";
import { Scene2Crash } from "./scenes/ontbijt/Scene2Crash";
import { Scene3Benefits } from "./scenes/ontbijt/Scene3Benefits";
import { Scene4Sources } from "./scenes/ontbijt/Scene4Sources";
import { Scene5CTA } from "./scenes/ontbijt/Scene5CTA";

const scenes = [Scene1Hook, Scene2Crash, Scene3Benefits, Scene4Sources, Scene5CTA];

export const EiwittenOntbijtExplainer: React.FC = () => {
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
