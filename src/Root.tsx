import { Composition } from "remotion";
import { EiwittenExplainer } from "./Video";
import { FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EiwittenExplainer"
      component={EiwittenExplainer}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
