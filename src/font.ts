import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Self-hosted Inter (400 / 600 / 800) so the video renders fully offline —
// no dependency on Google's font CDN at render time.
export const fontFamily = "Inter";

loadFont({
  family: fontFamily,
  url: staticFile("fonts/inter-latin-400-normal.woff2"),
  weight: "400",
});
loadFont({
  family: fontFamily,
  url: staticFile("fonts/inter-latin-600-normal.woff2"),
  weight: "600",
});
loadFont({
  family: fontFamily,
  url: staticFile("fonts/inter-latin-800-normal.woff2"),
  weight: "800",
});
