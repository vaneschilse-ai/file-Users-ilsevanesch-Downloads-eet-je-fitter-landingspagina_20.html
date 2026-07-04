import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATION, TRANSITION } from "../theme";
import { NM1Hook } from "./NM1Hook";
import { NM2Flow } from "./NM2Flow";
import { NM3Team } from "./NM3Team";
import { NM4Leverage } from "./NM4Leverage";
import { NM5CTA } from "./NM5CTA";

const scenes = [NM1Hook, NM2Flow, NM3Team, NM4Leverage, NM5CTA];

export const NetwerkmarketingVideo: React.FC = () => {
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
