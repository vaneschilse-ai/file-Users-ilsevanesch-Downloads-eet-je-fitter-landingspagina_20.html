// ---------------------------------------------------------------------------
// Global video specs
// ---------------------------------------------------------------------------
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const SCENE_DURATION = 180; // 6s per scene
export const TRANSITION = 12; // 12-frame fade
// 5 scenes of 180 frames, overlapping by 12 frames on each of the 4 joins.
export const DURATION_IN_FRAMES = SCENE_DURATION * 5 - TRANSITION * 4; // 852

// ---------------------------------------------------------------------------
// Brand colour system — Ilse Vanesch / Level Up by Fitmarathon
//   blush #E48D8E · cream #FAF7F6 · ink #1A1717
// ---------------------------------------------------------------------------
export const COLORS = {
  bg: "#FAF7F6", // cream
  bgSoft: "#FFFFFF", // card surface
  bgWarm: "#F3ECEA", // warm cream tint
  text: "#1A1717", // ink
  textDim: "#8A807D", // muted ink
  accent: "#E48D8E", // blush
  accentDeep: "#C56B6C", // deeper blush for emphasis
  accentSoft: "#F7E4E4", // pale blush tint (pills, icon backdrops)
  accentGlow: "rgba(228,141,142,0.35)",
  // "emphasis" tokens map to the deep blush (brand has no green)
  success: "#C56B6C",
  successSoft: "#F7E4E4",
  successGlow: "rgba(197,107,108,0.35)",
  track: "#EBE1DE", // light track on cream
  cardBorder: "rgba(26,23,23,0.08)",
  shadow: "rgba(26,23,23,0.10)",
};

// ---------------------------------------------------------------------------
// Safe zone (px) — nothing important outside this box
// ---------------------------------------------------------------------------
export const SAFE = {
  top: 150,
  bottom: 170,
  side: 60,
};

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const FONT = {
  headline: 800 as const,
  semi: 600 as const,
  body: 400 as const,
};
