import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Self-hosted brand fonts so the video renders fully offline.
// Playfair Display for headlines, DM Sans for body/labels.
export const HEADLINE_FONT = "Playfair Display";
export const BODY_FONT = "DM Sans";

loadFont({
  family: HEADLINE_FONT,
  url: staticFile("fonts/playfair-display-latin-700-normal.woff2"),
  weight: "700",
});
loadFont({
  family: HEADLINE_FONT,
  url: staticFile("fonts/playfair-display-latin-800-normal.woff2"),
  weight: "800",
});
loadFont({
  family: BODY_FONT,
  url: staticFile("fonts/dm-sans-latin-400-normal.woff2"),
  weight: "400",
});
loadFont({
  family: BODY_FONT,
  url: staticFile("fonts/dm-sans-latin-500-normal.woff2"),
  weight: "500",
});
loadFont({
  family: BODY_FONT,
  url: staticFile("fonts/dm-sans-latin-600-normal.woff2"),
  weight: "600",
});
