import { Composition, Still } from "remotion";
import { EiwittenExplainer } from "./Video";
import { Cover } from "./Cover";
import { NetwerkmarketingVideo } from "./netwerkmarketing/NetwerkmarketingVideo";
import { NMCover } from "./netwerkmarketing/NMCover";
import { NumerologieVideo } from "./numerologie/NumerologieVideo";
import { NumCover } from "./numerologie/NumCover";
import { FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EiwittenExplainer"
        component={EiwittenExplainer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still id="Cover" component={Cover} width={WIDTH} height={HEIGHT} />
      <Composition
        id="Netwerkmarketing"
        component={NetwerkmarketingVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still id="NetwerkmarketingCover" component={NMCover} width={WIDTH} height={HEIGHT} />
      <Composition
        id="Numerologie"
        component={NumerologieVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still id="NumerologieCover" component={NumCover} width={WIDTH} height={HEIGHT} />
    </>
  );
};
