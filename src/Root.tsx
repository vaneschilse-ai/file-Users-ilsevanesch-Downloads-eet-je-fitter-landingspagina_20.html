import { Composition, Still } from "remotion";
import { NetwerkmarketingExplainer } from "./Video";
import { EiwittenOntbijtExplainer } from "./VideoOntbijt";
import { OpgeblazenGevoelExplainer } from "./VideoBuik";
import { Cover } from "./Cover";
import { FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NetwerkmarketingExplainer"
        component={NetwerkmarketingExplainer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="EiwittenOntbijtExplainer"
        component={EiwittenOntbijtExplainer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="OpgeblazenGevoelExplainer"
        component={OpgeblazenGevoelExplainer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still id="Cover" component={Cover} width={WIDTH} height={HEIGHT} />
    </>
  );
};
